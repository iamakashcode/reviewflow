"use client";

import { useMemo, useState } from "react";
import QRCode from "qrcode";
import { getBaseUrl } from "@/lib/utils";

const initialForm = {
  name: "",
  googleReviewUrl: "",
  redirectThreshold: 4,
};

export default function LocationManager({ initialLocations = [] }) {
  const [locations, setLocations] = useState(initialLocations);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const baseUrl = useMemo(() => getBaseUrl(), []);

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

    setLocations((s) => [data.location, ...s]);
    setForm(initialForm);
    setSuccess("Location created.");
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
    setLocations((s) => s.map((l) => (l.id === id ? data.location : l)));
  };

  const deleteLocation = async (id) => {
    const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete location.");
      return;
    }
    setLocations((s) => s.filter((l) => l.id !== id));
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
    <div className="space-y-8">
      <form
        onSubmit={createLocation}
        className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur md:grid-cols-2"
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
          onChange={(e) =>
            setForm((s) => ({ ...s, googleReviewUrl: e.target.value }))
          }
        />
        <div className="md:col-span-2">
          <label className="text-sm text-slate-300">
            Redirect threshold (customers with this rating and above are sent to Google)
          </label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            value={form.redirectThreshold}
            onChange={(e) =>
              setForm((s) => ({ ...s, redirectThreshold: Number(e.target.value) }))
            }
          >
            {[1, 2, 3, 4, 5].map((x) => (
              <option key={x} value={x}>
                {x} and above
              </option>
            ))}
          </select>
        </div>
        <button
          className="md:col-span-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
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
            <div
              key={location.id}
              className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <button
                  className="rounded-md border border-rose-400/30 px-3 py-1 text-xs text-rose-300"
                  onClick={() => deleteLocation(location.id)}
                >
                  Delete
                </button>
              </div>

              <p className="text-xs text-slate-300">Review URL: {reviewUrl}</p>

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
    </div>
  );
}
