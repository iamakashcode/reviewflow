"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((s) => {
        const active = s <= (hovered || value);
        return (
          <button
            key={s}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(s)}
            className={`text-4xl transition-all duration-150 hover:scale-125 ${
              active ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,.6)]" : "text-slate-600"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

const stageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function RatingExperience({ slug, locationName }) {
  const [rating, setRating] = useState(0);
  const [stage, setStage] = useState("rating");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitRating = async () => {
    setError("");
    setSubmitting(true);
    const res = await fetch(`/api/public/${slug}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok && !data.destination) {
      setError(data.error || "Failed to submit rating.");
      return;
    }
    if (data.destination === "google") {
      setStage("google");
      setTimeout(() => window.location.assign(data.googleReviewUrl), 1500);
      return;
    }
    setStage("feedback");
  };

  const submitFeedback = async () => {
    setError("");
    setSubmitting(true);
    const res = await fetch(`/api/public/${slug}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, name, message }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) { setError(data.error || "Failed to submit feedback."); return; }
    setStage("done");
  };

  const ratingLabels = ["", "Poor", "Fair", "Okay", "Good", "Excellent"];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060818] p-6">
      {/* Background orbs */}
      <div className="orb h-[500px] w-[500px] bg-indigo-600/20 -top-40 -left-40" />
      <div className="orb h-[400px] w-[400px] bg-violet-500/15 bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl"
      >
        {/* Top brand bar */}
        <div className="border-b border-white/10 bg-indigo-600/10 px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">ReviewFlow</span>
          </div>
        </div>

        <div className="px-8 py-8 text-white">
          <h1 className="text-xl font-bold text-white">{locationName}</h1>
          <p className="mt-1 text-sm text-slate-400">Share your experience with us</p>

          <AnimatePresence mode="wait">
            {stage === "rating" && (
              <motion.div key="rating" variants={stageVariants} initial="initial" animate="animate" exit="exit" className="mt-8 space-y-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-slate-300">How would you rate your visit?</p>
                  <StarPicker value={rating} onChange={setRating} />
                  {rating > 0 && (
                    <p className="mt-2 text-sm font-semibold text-amber-400">{ratingLabels[rating]}</p>
                  )}
                </div>
                <button
                  disabled={!rating || submitting}
                  onClick={submitRating}
                  className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-40"
                >
                  {submitting ? "Submitting..." : "Continue"}
                  {!submitting && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>
              </motion.div>
            )}

            {stage === "google" && (
              <motion.div key="google" variants={stageVariants} initial="initial" animate="animate" exit="exit" className="mt-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
                  🎉
                </div>
                <h2 className="text-xl font-bold text-white">Thanks for the great rating!</h2>
                <p className="mt-2 text-slate-400">We are taking you to Google Reviews to share your experience publicly.</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-indigo-400">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Redirecting...
                </div>
              </motion.div>
            )}

            {stage === "feedback" && (
              <motion.div key="feedback" variants={stageVariants} initial="initial" animate="animate" exit="exit" className="mt-8 space-y-4">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  Thank you for your feedback. We take every comment seriously.
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">Your name (optional)</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane"
                    className="input-field text-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">What could we improve? <span className="text-rose-400">*</span></label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what happened..."
                    required
                    className="input-field h-28 resize-none text-white"
                  />
                </div>
                <button
                  onClick={submitFeedback}
                  disabled={!message.trim() || submitting}
                  className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-40"
                >
                  {submitting ? "Sending..." : "Submit feedback"}
                </button>
              </motion.div>
            )}

            {stage === "done" && (
              <motion.div key="done" variants={stageVariants} initial="initial" animate="animate" exit="exit" className="mt-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
                  ✅
                </div>
                <h2 className="text-xl font-bold text-white">Feedback received</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Thank you. Your private feedback has been shared with the team. We appreciate your honesty.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" /></svg>
              {error}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
