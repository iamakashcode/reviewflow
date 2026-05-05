"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function MarketingNav({ showMarketingLinks = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let active = true;
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!active) return;
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        if (active) setUser(null);
      }
    };
    loadSession();
    return () => {
      active = false;
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#060818]/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/40">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">ReviewFlow</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          {[
            ["/features", "Features"],
            ["/pricing", "Pricing"],
            ["/contact", "Contact"],
          ]
            .filter(() => showMarketingLinks)
            .map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {label}
            </Link>
            ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {user === undefined && <div className="h-9 w-28 animate-pulse rounded-lg bg-white/10" />}

          {user && (
            <>
              <Link
                href="/dashboard"
                className="hidden text-sm font-medium text-slate-300 transition hover:text-white md:block"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          )}

          {user === null && (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-slate-300 transition hover:text-white md:block"
              >
                Sign in
              </Link>
              <Link href="/signup" className="btn-primary text-xs py-2 px-4">
                Get started free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
