import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

const features = [
  {
    icon: "📡",
    label: "Smart QR Routing",
    desc: "Every rating is routed automatically. High ratings go to Google. Low ratings stay private inside your dashboard.",
    dark: true,
  },
  {
    icon: "🎚️",
    label: "Adjustable Threshold",
    desc: "Choose whether 3+, 4+, or 5-star ratings redirect to Google. Full control over what goes public.",
    dark: false,
  },
  {
    icon: "📥",
    label: "Private Feedback Inbox",
    desc: "Every low-rating comment lands in a searchable, filterable dashboard. Filter by location, rating, and keyword.",
    dark: true,
  },
  {
    icon: "🔲",
    label: "Instant QR Downloads",
    desc: "One click downloads a high-res PNG QR code per location. Print and place it anywhere customers can see.",
    dark: false,
  },
  {
    icon: "📊",
    label: "Analytics Overview",
    desc: "See total scans, average rating, Google redirects, and private feedback counts — all in one clean dashboard.",
    dark: true,
  },
  {
    icon: "🗺️",
    label: "Multi-location",
    desc: "Create unlimited business locations, each with its own QR code, Google link, and routing configuration.",
    dark: false,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#060818] text-white">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        <div className="orb h-[500px] w-[500px] bg-indigo-600/25 -top-32 left-1/3" />
        <div className="orb h-[350px] w-[350px] bg-violet-500/15 top-10 right-0" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Features</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Everything you need to
            <span className="block text-shimmer">grow on Google</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            ReviewFlow takes the manual work out of online reputation management. Set it up once. Let it run.
          </p>
          <div className="mt-8">
            <Link href="/signup" className="btn-primary text-sm px-7 py-3.5 animate-glow">
              Start free today
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid — alternating dark/light */}
      {features.map(({ icon, label, desc, dark }, i) => (
        <section
          key={label}
          className={`px-6 py-16 ${dark ? "bg-slate-950" : "bg-white"}`}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-10">
            <div className={`order-${i % 2 === 0 ? "1" : "2"} flex-1 min-w-[260px]`}>
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${dark ? "bg-indigo-600/20 border border-indigo-500/30" : "bg-indigo-50"}`}>
                {icon}
              </div>
              <h2 className={`mt-4 text-3xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>{label}</h2>
              <p className={`mt-3 text-lg ${dark ? "text-slate-400" : "text-slate-600"}`}>{desc}</p>
              <Link
                href="/signup"
                className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${dark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"}`}
              >
                Try it free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className={`order-${i % 2 === 0 ? "2" : "1"} flex flex-1 min-w-[260px] items-center justify-center`}>
              <div className={`w-full max-w-sm rounded-3xl p-8 text-center text-6xl ${dark ? "glass" : "border border-slate-100 bg-slate-50 shadow-sm"}`}>
                {icon}
                <p className={`mt-4 text-sm font-medium ${dark ? "text-slate-300" : "text-slate-600"}`}>{label}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#060818] px-6 py-20">
        <div className="relative overflow-hidden mx-auto max-w-4xl rounded-3xl border border-indigo-500/20 bg-indigo-600/10 p-12 text-center backdrop-blur">
          <div className="orb h-[300px] w-[300px] bg-indigo-500/20 -top-20 left-1/2 -translate-x-1/2" />
          <h2 className="relative z-10 text-3xl font-bold text-white md:text-4xl">Ready to see it in action?</h2>
          <p className="relative z-10 mx-auto mt-3 max-w-xl text-slate-300">
            Set up your first location in under 3 minutes. Completely free.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn-primary px-7 py-3.5">Create free account</Link>
            <Link href="/pricing" className="btn-ghost px-7 py-3.5">View pricing</Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
