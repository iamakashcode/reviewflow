"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { getBaseUrl } from "@/lib/utils";

const initialForm = {
  name: "",
  googleReviewUrl: "",
  redirectThreshold: 4,
};

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  );
}

export default function DashboardWorkspace({
  initialLocations = [],
  initialFeedbacks = [],
  stats,
}) {
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
    if (!res.ok) {
      setError(data.error || "Failed to create location.");
      return;
    }
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
    if (!res.ok) {
      setError(data.error || "Failed to update location.");
      return;
    }
    setLocations((s) => s.map((l) => (l.id === id ? { ...l, ...data.location } : l)));
  };

  const deleteLocation = async (id) => {
    const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete location.");
      return;
    }
    setLocations((s) => s.filter((l) => l.id !== id));
    setSuccess("Location deleted.");
  };

  const downloadQr = async (slug) => {
    const url = `${baseUrl}/r/${slug}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 512, margin: 1 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${slug}-qr.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          ["overview", "Overview"],
          ["locations", "Locations"],
          ["feedback", "Filtered Reviews"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              activeTab === id
                ? "bg-indigo-500 text-white"
                : "border border-white/20 text-slate-300 hover:bg-white/5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Locations" value={stats.totalLocations} hint="Active business branches" />
            <StatCard label="QR Scans" value={stats.totalScans} hint="Total ratings submitted" />
            <StatCard label="Positive Ratings" value={stats.positiveScans} hint="Likely Google redirects" />
            <StatCard label="Private Feedback" value={stats.feedbackCount} hint="Saved internally" />
            <StatCard label="Avg Rating" value={stats.avgRating} hint="Across all rating submissions" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/20 to-cyan-400/10 p-6">
            <h3 className="text-xl font-semibold">Performance Snapshot</h3>
            <p className="mt-2 text-sm text-slate-300">
              Track conversion from QR scan to positive reviews. Use filtered reviews tab to inspect low-rating feedback and improve operations.
            </p>
          </div>
        </motion.div>
      )}

      {activeTab === "locations" && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <form
            onSubmit={createLocation}
            className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-6 md:grid-cols-2"
          >
            <input
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Location name"
              required
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
            <input
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Google review link"
              type="url"
              required
              value={form.googleReviewUrl}
              onChange={(e) => setForm((s) => ({ ...s, googleReviewUrl: e.target.value }))}
            />
            <div className="md:col-span-2">
              <label className="text-sm text-slate-300">Redirect threshold</label>
              <select
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                value={form.redirectThreshold}
                onChange={(e) => setForm((s) => ({ ...s, redirectThreshold: Number(e.target.value) }))}
              >
                {[1, 2, 3, 4, 5].map((x) => (
                  <option key={x} value={x}>
                    {x} and above go to Google
                  </option>
                ))}
              </select>
            </div>
            <button
              className="md:col-span-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold hover:bg-indigo-400"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create location"}
            </button>
            {error && <p className="md:col-span-2 text-sm text-rose-300">{error}</p>}
            {success && <p className="md:col-span-2 text-sm text-emerald-300">{success}</p>}
          </form>

          <div className="grid gap-4">
            {locations.map((location) => {
              const reviewUrl = `${baseUrl}/r/${location.slug}`;
              return (
                <div key={location.id} className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{location.name}</h3>
                      <p className="text-xs text-slate-400">{reviewUrl}</p>
                    </div>
                    <button
                      className="rounded-md border border-rose-400/30 px-3 py-1 text-xs text-rose-300"
                      onClick={() => deleteLocation(location.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs"
                      value={location.redirectThreshold}
                      onChange={(e) =>
                        updateLocation(location.id, {
                          name: location.name,
                          googleReviewUrl: location.googleReviewUrl,
                          redirectThreshold: Number(e.target.value),
                        })
                      }
                    >
                      {[1, 2, 3, 4, 5].map((x) => (
                        <option key={x} value={x}>
                          {x}+ goes to Google
                        </option>
                      ))}
                    </select>
                    <button
                      className="rounded-md border border-indigo-300/30 px-3 py-1 text-xs text-indigo-200"
                      onClick={() => downloadQr(location.slug)}
                    >
                      Download QR
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {activeTab === "feedback" && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:grid-cols-4">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            >
              <option value="all">All locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            >
              <option value="all">All ratings</option>
              {[1, 2, 3, 4, 5].map((x) => (
                <option key={x} value={x}>
                  {x} star
                </option>
              ))}
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search message or name"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm md:col-span-2"
            />
          </div>
          <div className="space-y-3">
            {filteredFeedbacks.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
                No feedback matches your filters.
              </div>
            )}
            {filteredFeedbacks.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-200">
                    {item.name || "Anonymous"} · {item.location?.name}
                  </p>
                  <span className="rounded-md border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-xs text-amber-200">
                    {item.rating} star
                  </span>
                </div>
                <p className="text-sm text-slate-300">{item.message}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
