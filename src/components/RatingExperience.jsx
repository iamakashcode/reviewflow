"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`text-3xl transition ${s <= value ? "text-amber-300" : "text-slate-500"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function RatingExperience({ slug, locationName }) {
  const [rating, setRating] = useState(0);
  const [stage, setStage] = useState("rating");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submitRating = async () => {
    setError("");
    const res = await fetch(`/api/public/${slug}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();

    if (!res.ok && !data.destination) {
      setError(data.error || "Failed to submit rating.");
      return;
    }

    if (data.destination === "google") {
      setStage("google");
      setTimeout(() => window.location.assign(data.googleReviewUrl), 1200);
      return;
    }

    setStage("feedback");
  };

  const submitFeedback = async () => {
    setError("");
    const res = await fetch(`/api/public/${slug}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, name, message }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to submit feedback.");
      return;
    }
    setStage("done");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-white shadow-2xl backdrop-blur"
    >
      <h1 className="text-2xl font-semibold">{locationName}</h1>
      <p className="mt-1 text-sm text-slate-300">How was your experience today?</p>

      {stage === "rating" && (
        <div className="mt-6 space-y-4">
          <StarPicker value={rating} onChange={setRating} />
          <button
            disabled={!rating}
            onClick={submitRating}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold hover:bg-indigo-400 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {stage === "google" && (
        <div className="mt-6 space-y-2">
          <p>Thanks! Would you like to leave a review on Google?</p>
          <p className="text-sm text-slate-300">Redirecting you now...</p>
        </div>
      )}

      {stage === "feedback" && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-slate-200">
            Thanks for sharing. Tell us how we can improve.
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your feedback"
            required
            className="h-32 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
          <button
            onClick={submitFeedback}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold hover:bg-indigo-400"
          >
            Submit feedback
          </button>
        </div>
      )}

      {stage === "done" && (
        <div className="mt-6">
          <p className="text-emerald-300">Thank you. Your feedback has been submitted.</p>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
    </motion.div>
  );
}
