import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

const included = [
  "Unlimited locations",
  "QR code generation and download",
  "Custom rating-based routing threshold",
  "Private feedback inbox",
  "Filter feedback by location, rating & keyword",
  "Dashboard analytics overview",
  "Unlimited review link clicks",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#060818] text-white">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-10 pt-20">
        <div className="orb h-[500px] w-[500px] bg-indigo-600/25 -top-32 left-1/3" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Pricing</p>
          <h1 className="mt-4 text-5xl font-bold md:text-6xl">Simple. Always free.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            No credit card. No hidden fees. No limits. Everything is free for early adopters.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-lg">
          <div className="animate-glow relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-transparent p-8 shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/40">
                Current plan
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-indigo-400">Free Plan</p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-6xl font-bold text-white">$0</span>
              <span className="mb-2 text-slate-400">/ month</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">Forever free for all businesses.</p>

            <div className="my-6 h-px bg-white/10" />

            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <svg className="h-4 w-4 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/signup" className="btn-primary w-full justify-center py-3.5 text-sm">
                Create free account
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-slate-400">
            Paid plans with team features and advanced analytics are on the roadmap. Early users will keep free access.
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">Frequently asked</h2>
          <div className="mt-10 space-y-5">
            {[
              ["Do I need a credit card?", "No. Sign up with your email and password. No billing info required."],
              ["Is there a location limit?", "No limit. Create as many locations as your business needs."],
              ["What happens when I delete a location?", "The QR link stops working and all associated data is removed."],
              ["Can I change the rating threshold later?", "Yes, any time from the Locations tab in your dashboard."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-sm text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
