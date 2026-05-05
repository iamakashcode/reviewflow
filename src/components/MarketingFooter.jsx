import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060818]">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/40">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">ReviewFlow</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              Smart QR-powered feedback routing for local businesses. Grow your online reputation on autopilot.
            </p>
          </div>

          {/* Product links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Product</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["/features", "Features"],
                ["/pricing", "Pricing"],
                ["/dashboard", "Dashboard"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Company</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["/contact", "Contact"],
                ["/signup", "Sign up free"],
                ["/login", "Sign in"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ReviewFlow. All rights reserved.</p>
          <p>Built for modern local businesses.</p>
        </div>
      </div>
    </footer>
  );
}
