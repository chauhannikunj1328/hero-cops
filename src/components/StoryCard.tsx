import Link from "next/link";
import type { Story } from "@/lib/stories";
import { statusTone } from "@/lib/stories";
import { ImageSlot, StatusTag } from "./blocks";
import { StoryArt } from "./StoryArt";

/** Template "Latest works" card, bound to one Stories CMS item. */
export function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <ImageSlot label="Placeholder image" ratio="4 / 3">
        <StoryArt kind={story.art} className="absolute inset-0 w-full h-full group-hover:scale-[1.02] transition-transform duration-500" />
      </ImageSlot>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
        <h3 className="t-h5 max-w-md">{story.title}</h3>
        <StatusTag tone={statusTone(story.verification.status)}>{story.verification.status}</StatusTag>
      </div>
      <p className="t-label mt-2">
        {story.officerRank} {story.officerName}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {[story.category, `${story.city}, ${story.state}`].map((t) => (
          <li key={t} className="t-small text-ink-2 rounded-full border border-line px-3 py-1">{t}</li>
        ))}
      </ul>
    </Link>
  );
}

/** Closing CTA card used at the end of story grids */
export function SubmitCard() {
  return (
    <Link href="/submit" className="block">
      <div className="ph grid place-items-center text-center px-8" style={{ aspectRatio: "4 / 3" }}>
        <div>
          <p className="t-h3 max-w-sm mx-auto">The next story could come from your department.</p>
          <span className="btn mt-6">Submit a story</span>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="t-h5">Know an officer like this?</h3>
        <p className="t-body mt-2">Stories appear here once a department confirms them.</p>
      </div>
    </Link>
  );
}
