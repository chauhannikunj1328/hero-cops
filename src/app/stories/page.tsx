import type { Metadata } from "next";
import Link from "next/link";
import { getStories } from "@/lib/stories";
import { CarSeatIllustration } from "@/components/CarSeatIllustration";

export const metadata: Metadata = {
  title: "Stories",
  description: "Verified stories of officers serving beyond the call.",
};

export default function StoriesPage() {
  const stories = getStories();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16">
      <h1 className="display text-[2.75rem] sm:text-[4rem]">Stories</h1>
      <p className="mt-4 text-[18px] text-ink-soft max-w-2xl">
        Each story lists its sources and how far it has been verified. This test build contains one working example
        from the CMS collection.
      </p>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {stories.map((s) => (
          <li key={s.slug}>
            <Link href={`/stories/${s.slug}`} className="group block bg-surface border border-line rounded-md overflow-hidden hover:border-line-strong h-full">
              <CarSeatIllustration className="w-full h-auto block" />
              <div className="p-6">
                <p className="text-[14px] text-muted">
                  {s.city}, {s.state}, {s.incidentDate}
                </p>
                <h2 className="display text-[1.875rem] mt-2 group-hover:text-badge">{s.title}</h2>
                <p className="mt-3 text-[16px] text-ink-soft">{s.dek}</p>
                <p className="mt-4 text-[13px] font-semibold text-st-verify">{s.verification.status}</p>
              </div>
            </Link>
          </li>
        ))}
        <li className="rounded-md border border-dashed border-line-strong p-6 flex flex-col justify-center">
          <h2 className="font-semibold text-[19px]">More stories are in verification</h2>
          <p className="mt-2 text-[16px] text-ink-soft">
            They appear here once a department confirms them. Have one to add?
          </p>
          <Link href="/submit" className="mt-5 self-start h-11 px-5 rounded-sm bg-badge text-white font-semibold inline-flex items-center">
            Submit a story
          </Link>
        </li>
      </ul>
    </div>
  );
}
