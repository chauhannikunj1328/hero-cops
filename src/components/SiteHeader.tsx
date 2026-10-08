"use client";

import Link from "next/link";
import { useState } from "react";

// Template navbar: wordmark left, centered links, "Contact Now" text link right.
const nav = [
  { href: "/stories", label: "Stories" },
  { href: "/#process", label: "Process" },
  { href: "/#departments", label: "Departments" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur">
      <div className="wrap h-[76px] flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link href="/" className="justify-self-start text-[22px] font-bold tracking-[-0.04em]" onClick={() => setOpen(false)}>
          Hero Cops
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="t-label hover:opacity-60 transition-opacity">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-3">
          <Link href="/submit" className="hidden sm:inline t-small link-u">
            Submit a story
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {open ? (
                <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 8h16M3 14h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="md:hidden border-t border-line bg-bg">
          <ul className="wrap py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-3 t-h4 border-b border-line">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6 pb-2">
              <Link href="/submit" onClick={() => setOpen(false)} className="btn w-full">
                Submit a story
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
