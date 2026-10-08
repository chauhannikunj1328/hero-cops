import type { Metadata } from "next";
import Link from "next/link";
import { getStories } from "@/lib/stories";
import { ImageSlot, StatusTag } from "@/components/blocks";
import { CarSeatIllustration } from "@/components/CarSeatIllustration";

export const metadata: Metadata = {
  title: "Stories",
  description: "Verified stories of officers serving beyond the call.",
};

// Template "Projects" page: giant title, then the CMS card grid.
export default function StoriesPage() {
  const stories = getStories();
  return (
    <div className="wrap pt-10 md:pt-16 pb-[72px] md:pb-[120px]">
      <h1 className="t-display">Stories</h1>
      <p className="t-body mt-8 max-w-xl">
        Each story lists its sources and how far it has been verified. This test build contains one working example from
        the CMS collection.
      </p>
      <ul className="mt-12 md:mt-16 grid md:grid-cols-2 gap-x-[30px] gap-y-12">
        {stories.map((s) => (
          <li key={s.slug}>
            <Link href={`/stories/${s.slug}`} className="group block">
              <ImageSlot label="Temporary placeholder image" ratio="4 / 3">
                <CarSeatIllustration className="absolute inset-0 w-full h-full group-hover:scale-[1.02] transition-transform duration-500" />
              </ImageSlot>
              <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
                <h2 className="t-h5 max-w-md">{s.title}</h2>
                <StatusTag tone="pending">{s.verification.status}</StatusTag>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[s.category, `${s.city}, ${s.state}`, s.incidentDate].map((t) => (
                  <li key={t} className="t-small text-ink-2 rounded-full border border-line px-3 py-1">{t}</li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/submit" className="block">
            <div className="ph grid place-items-center text-center px-8" style={{ aspectRatio: "4 / 3" }}>
              <div>
                <p className="t-h3 max-w-sm mx-auto">More stories are in verification</p>
                <span className="btn mt-6">Submit a story</span>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
