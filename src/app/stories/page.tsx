import type { Metadata } from "next";
import Link from "next/link";
import { getAllStories, getStories } from "@/lib/stories";
import { StoryCard, SubmitCard } from "@/components/StoryCard";

export const metadata: Metadata = {
  title: "Stories",
  description: "Verified stories of officers serving beyond the call.",
};

// Template "Projects" page: giant title, then the CMS card grid.
export default function StoriesPage() {
  const stories = getStories();
  const archived = getAllStories().filter((s) => s.verification.status === "Archived");

  return (
    <div className="wrap pt-10 md:pt-16 pb-[72px] md:pb-[120px]">
      <h1 className="t-display">Stories</h1>
      <p className="t-body mt-8 max-w-xl">
        Every story lists its sources and how far it has been verified. In this test build the six stories from the
        brief are shown at different workflow stages; on the live site only Published stories would appear.
      </p>
      <ul className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-14">
        {stories.map((s) => (
          <li key={s.slug}>
            <StoryCard story={s} />
          </li>
        ))}
        <li>
          <SubmitCard />
        </li>
      </ul>

      {archived.length > 0 && (
        <section className="mt-20 md:mt-28 border-t border-line pt-8">
          <h2 className="t-h4">Archived</h2>
          <p className="t-body mt-3 max-w-2xl">
            Archived stories are kept in the workflow but are never public. They are listed here only to show the end
            state of the test workflow.
          </p>
          <ul className="mt-6 border-t border-line">
            {archived.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/stories/${s.slug}`} className="flex flex-wrap items-center justify-between gap-3 py-5 hover:opacity-60 transition-opacity">
                  <span className="t-label">{s.title}</span>
                  <span className="t-small text-ink-2">{s.privacySummary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
