import Link from "next/link";

export default function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          ReviewFlow
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-300">
          <Link href="/features" className="hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/login" className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
