import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,.35),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,.25),transparent_30%)]" />
      <main className="relative z-10 w-full max-w-3xl animate-[fadeIn_.4s_ease-out] rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">ReviewFlow</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">
          Grow your online reputation with smart QR feedback routing.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Collect customer sentiment in seconds. Happy customers go to Google reviews.
          Unhappy customers share private feedback with your team.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold hover:bg-indigo-400">
            Start free
          </Link>
          <Link href="/login" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10">
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
