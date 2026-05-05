import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MarketingNav />
      <section className="mx-auto w-full max-w-4xl px-6 py-14">
        <h1 className="text-4xl font-semibold">Contact sales</h1>
        <p className="mt-3 text-slate-300">
          Want help onboarding multiple business locations? Send us your details and use-case.
        </p>
        <form className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Your name" />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Work email" />
          <textarea className="h-36 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm" placeholder="Tell us about your business goals" />
          <button type="button" className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400">
            Send inquiry
          </button>
        </form>
      </section>
      <MarketingFooter />
    </div>
  );
}
