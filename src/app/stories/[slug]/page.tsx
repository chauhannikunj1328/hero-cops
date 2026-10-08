import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStories, getStory, statusTone, WORKFLOW } from "@/lib/stories";
import { ImageSlot, StatusTag } from "@/components/blocks";
import { PhotoCredit, StoryPhoto } from "@/components/StoryPhoto";
import { STOCK_PHOTOS } from "@/lib/photos";

/*
  Layout follows the template's project detail page (/project/vortex):
  giant title > "About Project" copy left + meta grid right > full-width image > titled sections.
*/

export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return { title: story.title, description: story.dek };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  // Reimbursement Candidate is a side track after Approved, so the public stage list shows Approved as current.
  const stageIndex = WORKFLOW.indexOf(story.verification.status === "Reimbursement Candidate" ? "Approved" : story.verification.status);
  const isPublished = story.verification.status === "Published";
  const isArchived = story.verification.status === "Archived";
  const all = getAllStories();
  const idx = all.findIndex((s) => s.slug === story.slug);
  const next = all[(idx + 1) % all.length];
  const stages = WORKFLOW.filter((s) => s !== "Archived" && s !== "Reimbursement Candidate");
  const checked = story.sources.filter((s) => s.checked).length;

  const meta = [
    { k: story.officerRank, v: story.officerName },
    { k: "Department", v: story.department },
    { k: "Location", v: `${story.city}, ${story.state}` },
    { k: "Date", v: story.incidentDate },
    { k: "Type of act", v: story.category },
    { k: "Stage", v: story.verification.status },
  ];

  return (
    <article>
      {!isPublished && (
        <div className="wrap">
          <p className={`border-b border-line py-3 t-small ${isArchived ? "text-ink-2" : "text-st-pending"}`}>
            {isArchived
              ? "Archived. This story is kept in the workflow for reference and would never be public on the live site."
              : `Preview. This story is at the ${story.verification.status} stage, so it would not be public on the live site yet.`}
          </p>
        </div>
      )}

      <header className="wrap pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="t-small text-ink-2">
          <Link href="/stories" className="link-u">Stories</Link>
          <span aria-hidden="true"> / </span>
          <span>{story.category}</span>
        </nav>
        <h1 className="t-h1 mt-6 max-w-[1300px]">{story.title}</h1>
      </header>

      {/* About Project + meta grid */}
      <section className="wrap pt-12 md:pt-20 grid lg:grid-cols-[670px_1fr] gap-12 lg:gap-[240px]">
        <div>
          <h2 className="t-h3">About the story</h2>
          <p className="t-body text-ink mt-6">{story.dek}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-10 gap-y-8 content-start lg:pt-2">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="t-label">{m.k}</dt>
              <dd className="t-body mt-1">{m.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Full-width image */}
      <div className="wrap pt-12 md:pt-20">
        <ImageSlot label="Illustrative photo" ratio="16 / 8">
          <StoryPhoto photo={STOCK_PHOTOS[story.art]} sizes="(min-width: 1512px) 1452px, 100vw" priority />
        </ImageSlot>
        <p className="t-small text-muted mt-3 max-w-3xl">
          Illustrative stock photo, not from the event. <PhotoCredit photo={STOCK_PHOTOS[story.art]} />. {story.imageNote}
        </p>
      </div>

      {/* What happened */}
      <section className="wrap pt-16 md:pt-24">
        <h2 className="t-h3">What happened</h2>
        <div className="mt-6 space-y-5 max-w-[1200px]">
          {story.body.map((p, i) => (
            <p key={i} className={i === 0 ? "t-body text-ink" : "t-body"}>{p}</p>
          ))}
        </div>
        {story.video && (
          <div className="mt-10 border-y border-line py-6 flex flex-wrap items-center justify-between gap-4 max-w-[1200px]">
            <p className="t-label">{story.video.label}</p>
            {story.video.url ? (
              <a href={story.video.url} className="btn btn-outline" target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
            ) : (
              <p className="t-small text-muted max-w-md">
                Video slot. Link to be added once the owner&apos;s permission to embed is confirmed.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Verification */}
      <section className="wrap pt-16 md:pt-24 grid lg:grid-cols-[670px_1fr] gap-12 lg:gap-[240px]">
        <div>
          <h2 className="t-h3">Verification</h2>
          <p className="t-body mt-6">{story.verification.departmentNote}</p>
          <ol className="mt-8 border-t border-line">
            {stages.map((s) => {
              const i = WORKFLOW.indexOf(s);
              const state = isArchived ? "todo" : i < stageIndex ? "done" : i === stageIndex ? "current" : "todo";
              return (
                <li key={s} className="flex items-center justify-between gap-4 py-4 border-b border-line">
                  <span className={state === "todo" ? "t-label text-muted" : "t-label"}>{s}</span>
                  {state === "done" && <StatusTag tone="verified">Done</StatusTag>}
                  {state === "current" && <StatusTag tone={statusTone(story.verification.status)}>Current stage</StatusTag>}
                </li>
              );
            })}
          </ol>
        </div>
        <dl className="grid grid-cols-2 gap-x-10 gap-y-8 content-start">
          <div>
            <dt className="t-label">Sources checked</dt>
            <dd className="t-body mt-1">{checked} of {story.sources.length}</dd>
          </div>
          <div>
            <dt className="t-label">Department</dt>
            <dd className="t-body mt-1">{story.verification.departmentConfirmed ? "Confirmed" : "Awaiting reply"}</dd>
          </div>
          <div>
            <dt className="t-label">Privacy review</dt>
            <dd className="t-body mt-1">{story.privacySummary}</dd>
          </div>
          <div>
            <dt className="t-label">Personal spending</dt>
            <dd className="t-body mt-1">
              {story.personalSpending.involved ? `${story.personalSpending.description}. ${story.personalSpending.reimbursement}` : "None reported"}
            </dd>
          </div>
        </dl>
      </section>

      {/* Sources */}
      <section className="wrap pt-16 md:pt-24">
        <h2 className="t-h3">Sources</h2>
        <ul className="mt-6 border-t border-line max-w-[1200px]">
          {story.sources.map((s) => (
            <li key={s.label} className="grid sm:grid-cols-[1fr_auto] gap-3 sm:gap-8 py-5 border-b border-line">
              <div className="min-w-0">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="t-label link-u break-words">{s.label}</a>
                ) : (
                  <p className="t-label">{s.label}</p>
                )}
                <p className="t-small text-ink-2 mt-1">{s.outlet}, {s.kind.toLowerCase()}</p>
              </div>
              <div className="sm:pt-0.5">
                <StatusTag tone={s.checked ? "verified" : "pending"}>{s.checked ? "Checked" : "To check"}</StatusTag>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Privacy */}
      <section className="wrap pt-16 md:pt-24">
        <h2 className="t-h3">Privacy notes</h2>
        <ul className="mt-6 space-y-3 max-w-[1200px]">
          {story.privacy.map((p) => (
            <li key={p} className="t-body flex gap-3">
              <span aria-hidden="true" className="mt-[11px] w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Next story (CMS pagination) */}
      <nav aria-label="Next story" className="wrap pt-16 md:pt-24">
        <Link href={`/stories/${next.slug}`} className="group flex flex-wrap items-end justify-between gap-4 border-y border-line py-8">
          <span>
            <span className="t-small text-ink-2 block">Next story</span>
            <span className="t-h4 block mt-2 group-hover:opacity-60 transition-opacity">{next.title}</span>
          </span>
          <span className="t-label link-u">{next.officerRank} {next.officerName}</span>
        </Link>
      </nav>

      {/* CTA */}
      <section className="wrap section">
        <div className="border-t border-line pt-14 md:pt-20 grid lg:grid-cols-[1fr_500px] gap-10 items-end">
          <h2 className="t-h1">Know a story like this?</h2>
          <div>
            <p className="t-body">Departments and the public can send one in. We verify it with the department before anything is published.</p>
            <Link href="/submit" className="btn w-full mt-6">Submit a story</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
