"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthForm({ mode = "login" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
    const payload = isSignup
      ? form
      : { email: form.email, password: form.password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur"
    >
      {isSignup && (
        <div>
          <label className="mb-1 block text-sm text-slate-300">Business name</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm outline-none ring-indigo-500 focus:ring"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Acme Coffee"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-slate-300">Email</label>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm outline-none ring-indigo-500 focus:ring"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          placeholder="owner@business.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Password</label>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm outline-none ring-indigo-500 focus:ring"
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          placeholder="At least 8 characters"
        />
      </div>

      {error && <p className="text-sm text-rose-300">{error}</p>}

      <button
        className="w-full rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-70"
        disabled={loading}
      >
        {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
      </button>
    </motion.form>
  );
}
