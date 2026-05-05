import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingNav />
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <h1 className="text-4xl font-semibold">Simple pricing for every business size</h1>
        <p className="mt-3 text-slate-300">Start free, then scale as your locations and review volume grows.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Starter", "$0/mo", "1 location, QR routing, basic insights"],
            ["Growth", "$29/mo", "Up to 10 locations, filtered feedback dashboard"],
            ["Scale", "$99/mo", "Unlimited locations, priority support, advanced analytics"],
          ].map(([name, price, desc]) => (
            <div key={name} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="mt-2 text-3xl font-bold">{price}</p>
              <p className="mt-3 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/signup" className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400">
            Create account
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
