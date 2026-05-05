import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingNav />
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <h1 className="text-4xl font-semibold">Everything you need for reputation growth</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          ReviewFlow helps local businesses increase public ratings while collecting private feedback that drives service improvements.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["QR Review Flow", "Generate per-location QR links customers can scan instantly."],
            ["Custom Rating Threshold", "Choose what rating and above goes to Google reviews."],
            ["Private Feedback Capture", "Low ratings stay internal with required message fields."],
            ["Dashboard Analytics", "Track scans, rating trends, and sentiment in one place."],
            ["Location Controls", "Manage multiple branches and settings from one dashboard."],
            ["Fast Deploy", "Built for modern cloud deployment with Next.js and PostgreSQL."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/signup" className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400">
            Start free trial
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
