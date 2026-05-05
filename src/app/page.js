import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060818] text-white">
      <MarketingNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pb-16 pt-10">
        {/* Animated gradient orbs */}
        <div className="orb h-[600px] w-[600px] bg-indigo-600/30 -top-40 -left-40" />
        <div className="orb h-[500px] w-[500px] bg-violet-500/20 top-20 right-0" />
        <div className="orb h-[400px] w-[400px] bg-cyan-500/15 bottom-0 left-1/3" />

        {/* Spinning ring decoration */}
        <div className="animate-spin-slow pointer-events-none absolute h-[700px] w-[700px] rounded-full border border-indigo-500/10" />
        <div className="animate-spin-slow pointer-events-none absolute h-[900px] w-[900px] rounded-full border border-violet-500/5" style={{ animationDirection: "reverse" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div className="animate-fade-up text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse-slow" />
                Free for all businesses · No credit card required
              </div>
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                Turn every scan into a
                <span className="block text-shimmer mt-1">5-star review</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400 lg:mx-0">
                Collect customer feedback via QR codes. Happy customers go to Google.
                Unhappy ones share private feedback — only your team sees it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link href="/signup" className="btn-primary text-sm px-6 py-3">
                  Start for free
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/features" className="btn-ghost text-sm px-6 py-3">
                  See how it works
                </Link>
              </div>
              {/* Social proof */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <div className="flex -space-x-2">
                  {["bg-indigo-400","bg-violet-400","bg-cyan-400","bg-pink-400"].map((c,i) => (
                    <div key={i} className={`h-7 w-7 rounded-full border-2 border-[#060818] ${c}`} />
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="font-semibold text-white">500+</span> businesses collecting smarter reviews
                </p>
              </div>
            </div>

            {/* Right — animated dashboard card */}
            <div className="animate-slide-left delay-200 relative">
              <div className="animate-float relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm">
                {/* Card header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Live Performance</p>
                    <p className="mt-0.5 text-lg font-semibold">Acme Coffee — Main St.</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["1,284", "QR scans this month", "text-indigo-400"],
                    ["4.7 ★", "Average rating", "text-amber-400"],
                    ["73%", "Sent to Google", "text-emerald-400"],
                    ["27%", "Private feedback", "text-violet-400"],
                  ].map(([v, l, c]) => (
                    <div key={l} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className={`text-xl font-bold ${c}`}>{v}</p>
                      <p className="mt-1 text-xs text-slate-400">{l}</p>
                    </div>
                  ))}
                </div>
                {/* Rating bar */}
                <div className="mt-4 rounded-xl border border-white/8 bg-white/5 p-4">
                  <p className="mb-2 text-xs text-slate-400">Rating distribution</p>
                  {[
                    [5, 68],
                    [4, 18],
                    [3, 9],
                    [2, 3],
                    [1, 2],
                  ].map(([star, pct]) => (
                    <div key={star} className="mb-1.5 flex items-center gap-2 text-xs">
                      <span className="w-3 text-slate-400">{star}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${star >= 4 ? "bg-indigo-500" : "bg-slate-600"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-7 text-right text-slate-400">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="animate-float delay-300 absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl">
                <p className="text-xs text-slate-400">New feedback</p>
                <p className="text-sm font-medium text-white">Great coffee, fast service!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="relative bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">How it works</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
              Simple. Smart. Automatic.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Three steps that take minutes to set up and run on autopilot forever.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create your location",
                desc: "Add your business, paste your Google review link, and pick your rating threshold.",
                icon: "🏪",
                gradient: "from-indigo-50 to-violet-50",
              },
              {
                step: "02",
                title: "Print your QR code",
                desc: "Download a print-ready QR code and place it on tables, receipts, or your counter.",
                icon: "📲",
                gradient: "from-violet-50 to-cyan-50",
              },
              {
                step: "03",
                title: "Reviews route themselves",
                desc: "Happy customers go to Google. Others share private feedback only you can read.",
                icon: "⭐",
                gradient: "from-cyan-50 to-indigo-50",
              },
            ].map(({ step, title, desc, icon, gradient }) => (
              <div key={step} className={`group rounded-3xl bg-gradient-to-br ${gradient} p-8 border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl`}>
                <div className="mb-4 text-4xl">{icon}</div>
                <p className="text-xs font-bold tracking-widest text-indigo-400">{step}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features strip ────────────────────────────────────────────────── */}
      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Features</p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Built for real businesses</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Smart Routing", "Rate >= threshold → Google. Rate below → private feedback form. Fully automatic.", "📡"],
              ["Custom Threshold", "Set from 1–5. Send 3-star and above, or 4-star and above. You choose.", "🎚️"],
              ["Private Feedback Inbox", "Low-rating responses land in your dashboard. Search, filter by location and rating.", "📥"],
              ["QR Code Downloads", "One-click PNG download per location. Print and display anywhere.", "🔲"],
              ["Dashboard Analytics", "Total scans, average rating, positive ratio, and feedback count in one view.", "📊"],
              ["Multi-location Support", "Manage multiple branches. Each gets its own QR, link, and settings.", "🗺️"],
            ].map(([title, desc, icon]) => (
              <div key={title} className="group glass rounded-2xl p-6 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5">
                <div className="mb-3 text-3xl">{icon}</div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,.12),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Ready to grow your reputation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Free, fast, and no credit card required. Start collecting smarter feedback in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn-primary text-sm px-7 py-3.5 animate-glow">
              Create free account
            </Link>
            <Link href="/login" className="btn-ghost-dark text-sm px-7 py-3.5">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
