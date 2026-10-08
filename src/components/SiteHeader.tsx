"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { href: "/stories", label: "Stories" },
  { href: "/#verification", label: "How verification works" },
  { href: "/#departments", label: "For departments" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ground/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <Logo />
          <span className="display text-[1.375rem] tracking-tight">Hero Cops</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-7 text-[15px] text-ink-soft">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/submit"
            className="hidden sm:inline-flex items-center h-10 px-4 rounded-sm bg-badge text-white text-[15px] font-semibold hover:bg-badge-deep"
          >
            Submit a story
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-line-strong"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden border-t border-line bg-ground">
          <ul className="px-4 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[17px] border-b border-line"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link
                href="/submit"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center h-12 rounded-sm bg-badge text-white font-semibold"
              >
                Submit a story
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
