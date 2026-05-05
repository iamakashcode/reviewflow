import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060818] text-white">
      <MarketingNav />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="orb h-[500px] w-[500px] bg-violet-600/20 -top-32 -right-20" />
        <div className="orb h-[400px] w-[400px] bg-indigo-600/15 bottom-0 left-0" />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Contact</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-slate-400">
              Have a question, a specific use case, or want to share feedback about ReviewFlow? We would love to hear from you.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ["💬", "Feature requests", "Tell us what would make ReviewFlow better for your business."],
                ["🤝", "Partnership", "Interested in integrating or partnering? Reach out."],
                ["🐛", "Report a bug", "Found something broken? Let us know and we will fix it fast."],
              ].map(([icon, label, sub]) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="text-sm text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="animate-slide-left delay-100">
            <form className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Your name</label>
                <input className="input-field" placeholder="Jane Smith" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Email address</label>
                <input className="input-field" type="email" placeholder="jane@business.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Subject</label>
                <input className="input-field" placeholder="What is this about?" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Message</label>
                <textarea className="input-field h-32 resize-none" placeholder="Tell us more..." />
              </div>
              <button type="button" className="btn-primary w-full justify-center py-3 text-sm">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
