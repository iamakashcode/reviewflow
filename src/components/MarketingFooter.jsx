export default function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} ReviewFlow. All rights reserved.</p>
        <p>Built for modern local businesses.</p>
      </div>
    </footer>
  );
}
