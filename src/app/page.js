import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingNav />
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,.25),transparent_30%)]" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <main className="animate-[fadeIn_.45s_ease-out] rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">ReviewFlow</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
              Build a 5-star reputation while capturing honest private feedback.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Turn every QR scan into a smart journey. High ratings are guided to Google. Lower
              ratings stay private so your team can fix issues before they become public.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400"
              >
                Start free
              </Link>
              <Link
                href="/features"
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                View features
              </Link>
            </div>
          </main>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Smart Routing", "Automatically send high ratings to Google links."],
              ["Private Insights", "Capture low-rating feedback with required comments."],
              ["Location Analytics", "Track scans, average ratings, and review sentiment."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
