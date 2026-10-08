import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/75 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 text-white">
            <Logo />
            <span className="display text-[1.375rem]">Hero Cops</span>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed">
            A public-service storytelling platform recognizing verified acts of compassion,
            courage and service by law-enforcement officers.
          </p>
        </div>
        <div>
          <h2 className="text-white font-semibold text-[15px]">Stories</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link href="/stories" className="hover:text-white">All verified stories</Link></li>
            <li><Link href="/submit" className="hover:text-white">Submit a story</Link></li>
            <li><Link href="/#verification" className="hover:text-white">How verification works</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold text-[15px]">Departments</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link href="/#departments" className="hover:text-white">For public information officers</Link></li>
            <li><Link href="/#privacy" className="hover:text-white">Privacy and permissions</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-[13px] text-white/55">
          Test build. Story content is drawn from public reporting and is pending department verification.
        </p>
      </div>
    </footer>
  );
}
