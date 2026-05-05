"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { getBaseUrl } from "@/lib/utils";

const initialForm = { name: "", googleReviewUrl: "", redirectThreshold: 4 };

function StatCard({ label, value, hint, accent = "indigo" }) {
  const colors = {
    indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-400",
    rose: "from-rose-500/20 to-rose-500/5 border-rose-500/20 text-rose-400",
  };
  return (
    <div className={`rounded-2xl border bg-gradient-to-b p-5 ${colors[accent]}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${colors[accent].split(" ").pop()}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

const tabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "locations", label: "Locations", icon: "🏪" },
  { id: "feedback", label: "Reviews", icon: "📥" },
];

export default function DashboardWorkspace({ initialLocations = [], initialFeedbacks = [], stats }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [locations, setLocations] = useState(initialLocations);
  const [feedbacks] = useState(initialFeedbacks);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [query, setQuery] = useState("");
  const baseUrl = useMemo(() => getBaseUrl(), []);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((item) => {
      if (ratingFilter !== "all" && item.rating !== Number(ratingFilter)) return false;
      if (locationFilter !== "all" && item.locationId !== locationFilter) return false;
      if (query) {
        const text = `${item.message} ${item.name || ""} ${item.location?.name || ""}`.toLowerCase();
        if (!text.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [feedbacks, ratingFilter, locationFilter, query]);

  const createLocation = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || "Failed to create location."); return; }
    setLocations((s) => [{ ...data.location, _count: { feedbacks: 0, reviewOpens: 0 } }, ...s]);
    setForm(initialForm);
    setSuccess("Location created successfully.");
  };

  const updateLocation = async (id, payload) => {
    const res = await fetch(`/api/locations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || "Failed to update."); return; }
    setLocations((s) => s.map((l) => (l.id === id ? { ...l, ...data.location } : l)));
  };

  const deleteLocation = async (id) => {
    const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
    if (!res.ok) { setError("Failed to delete location."); return; }
    setLocations((s) => s.filter((l) => l.id !== id));
    setSuccess("Location deleted.");
  };

  const downloadQr = async (slug) => {
    const url = `${baseUrl}/r/${slug}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 512, margin: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${slug}-qr.png`;
    a.click();
  };

  const copyLink = (slug) => {
    navigator.clipboard.writeText(`${baseUrl}/r/${slug}`);
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1.5 rounded-2xl border border-white/10 bg-slate-900/60 p-1.5">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Overview ────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard label="Locations" value={stats.totalLocations} hint="Active business branches" accent="indigo" />
              <StatCard label="Total scans" value={stats.totalScans} hint="Ratings submitted" accent="violet" />
              <StatCard label="Positive" value={stats.positiveScans} hint="Likely Google redirects" accent="emerald" />
              <StatCard label="Feedback" value={stats.feedbackCount} hint="Saved privately" accent="amber" />
              <StatCard label="Avg rating" value={stats.avgRating} hint="Across all submissions" accent="rose" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-6">
              <h3 className="text-lg font-semibold text-white">Snapshot</h3>
              <p className="mt-1.5 text-sm text-slate-400">
                Use the <strong className="text-white">Reviews</strong> tab to inspect private feedback and filter by location or rating.
                Use the <strong className="text-white">Locations</strong> tab to download QR codes and update routing thresholds.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Locations ───────────────────────────────────────────────── */}
        {activeTab === "locations" && (
          <motion.div key="locations" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            {/* Create form */}
            <form onSubmit={createLocation} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="mb-4 text-base font-semibold text-white">Add new location</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="input-field text-white placeholder:text-slate-500"
                  placeholder="Location name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                />
                <input
                  className="input-field text-white placeholder:text-slate-500"
                  placeholder="Google review URL"
                  type="url"
                  required
                  value={form.googleReviewUrl}
                  onChange={(e) => setForm((s) => ({ ...s, googleReviewUrl: e.target.value }))}
                />
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Redirect threshold — ratings at or above this go to Google
                  </label>
                  <select
                    className="input-field text-white"
                    value={form.redirectThreshold}
                    onChange={(e) => setForm((s) => ({ ...s, redirectThreshold: Number(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5].map((x) => (
                      <option key={x} value={x}>{x} and above go to Google</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button className="btn-primary text-sm py-2.5 px-5" disabled={saving}>
                  {saving ? "Creating..." : "Create location"}
                </button>
                {error && <p className="text-sm text-rose-400">{error}</p>}
                {success && <p className="text-sm text-emerald-400">{success}</p>}
              </div>
            </form>

            {/* Location cards */}
            <div className="grid gap-4">
              {locations.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500">
                  No locations yet. Create one above.
                </div>
              )}
              {locations.map((loc) => {
                const reviewUrl = `${baseUrl}/r/${loc.slug}`;
                return (
                  <div key={loc.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-white">{loc.name}</h3>
                        <p className="mt-0.5 max-w-xs truncate text-xs text-slate-500">{reviewUrl}</p>
                      </div>
                      <button
                        onClick={() => deleteLocation(loc.id)}
                        className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400 hover:bg-rose-500/20 transition"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <select
                        className="rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs text-white"
                        value={loc.redirectThreshold}
                        onChange={(e) =>
                          updateLocation(loc.id, {
                            name: loc.name,
                            googleReviewUrl: loc.googleReviewUrl,
                            redirectThreshold: Number(e.target.value),
                          })
                        }
                      >
                        {[1, 2, 3, 4, 5].map((x) => (
                          <option key={x} value={x}>{x}+ → Google</option>
                        ))}
                      </select>
                      <button
                        onClick={() => downloadQr(loc.slug)}
                        className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition"
                      >
                        Download QR
                      </button>
                      <button
                        onClick={() => copyLink(loc.slug)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition"
                      >
                        Copy link
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Feedback / Reviews ──────────────────────────────────────── */}
        {activeTab === "feedback" && (
          <motion.div key="feedback" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Filters */}
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:grid-cols-4">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
              >
                <option value="all">All locations</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
              >
                <option value="all">All ratings</option>
                {[1, 2, 3, 4, 5].map((x) => (
                  <option key={x} value={x}>{x} star</option>
                ))}
              </select>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or message..."
                className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 md:col-span-2"
              />
            </div>

            {/* Results */}
            <div className="space-y-3">
              {filteredFeedbacks.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500">
                  No feedback matches your filters.
                </div>
              )}
              {filteredFeedbacks.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-white">
                      {item.name || "Anonymous"} · <span className="text-sm text-slate-400">{item.location?.name}</span>
                    </p>
                    <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                      {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)} {item.rating}/5
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{item.message}</p>
                  <p className="mt-3 text-xs text-slate-600">
                    {new Date(item.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
