import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStories, getStory, WORKFLOW } from "@/lib/stories";
import { VerificationRecord } from "@/components/VerificationRecord";
import { CarSeatIllustration } from "@/components/CarSeatIllustration";

export function generateStaticParams() {
  return getStories().map((s) => ({ slug: s.slug }));
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

  const stageIndex = WORKFLOW.indexOf(story.verification.status);
  const isPublished = story.verification.status === "Published";

  return (
    <article>
      {!isPublished && (
        <div className="bg-st-verify-tint border-b border-st-verify/30">
          <p className="mx-auto max-w-6xl px-4 sm:px-6 py-3 text-[14px] text-st-verify">
            <span className="font-semibold">Preview.</span> This story is at the {story.verification.status} stage and
            has not been confirmed by the department yet. It would not be public on the live site.
          </p>
        </div>
      )}

      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-[14px] text-muted">
          <Link href="/stories" className="hover:text-ink underline underline-offset-4 decoration-line-strong">
            Stories
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{story.category}</span>
        </nav>
        <h1 className="display text-[2.75rem] sm:text-[4rem] lg:text-[4.5rem] mt-5 max-w-4xl">{story.title}</h1>
        <p className="mt-5 text-[19px] sm:text-[21px] leading-relaxed text-ink-soft max-w-3xl">{story.dek}</p>
        <dl className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-4 text-[15px] border-t border-line pt-5">
          <div>
            <dt className="text-muted">{story.officerRank}</dt>
            <dd className="font-semibold">{story.officerName}</dd>
          </div>
          <div>
            <dt className="text-muted">Department</dt>
            <dd className="font-semibold">{story.department}</dd>
          </div>
          <div>
            <dt className="text-muted">Where</dt>
            <dd className="font-semibold">
              {story.city}, {story.state}
            </dd>
          </div>
          <div>
            <dt className="text-muted">When</dt>
            <dd className="font-semibold">{story.incidentDate}</dd>
          </div>
        </dl>
      </header>

      <figure className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <div className="relative rounded-md overflow-hidden border border-line">
          <CarSeatIllustration className="w-full h-auto block" />
          <span className="absolute top-3 left-3 rounded-sm bg-ink/85 text-white text-[12px] font-semibold px-2.5 py-1">
            Temporary placeholder image
          </span>
        </div>
        <figcaption className="mt-3 text-[13px] text-muted max-w-3xl">
          {story.image.credit}. {story.image.rightsNote}
        </figcaption>
      </figure>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
        <div className="max-w-[68ch]">
          <div className="prose-story">
            {story.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {story.pullQuote && (
            <blockquote className="my-10 border-l-4 border-badge pl-5 sm:pl-6">
              <p className="display text-[1.75rem] sm:text-[2.125rem] leading-[1.1]">{story.pullQuote}</p>
              <footer className="mt-3 text-[14px] text-muted">Hero Cops editorial summary</footer>
            </blockquote>
          )}

          {story.video && (
            <div className="mt-10 rounded-md border border-dashed border-line-strong bg-surface p-5 flex gap-4 items-start">
              <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
                <rect width="36" height="36" rx="6" fill="var(--color-badge-tint)" />
                <path d="M14 11.5v13l11-6.5z" fill="var(--color-badge)" />
              </svg>
              <div>
                <p className="font-semibold">{story.video.label}</p>
                <p className="text-[14px] text-ink-soft mt-1">
                  {story.video.url ? (
                    <a href={story.video.url} className="text-badge underline" target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  ) : (
                    "Embed slot. The video link is listed in the brief and will be added once the owner's embed permission is confirmed."
                  )}
                </p>
              </div>
            </div>
          )}

          <section aria-labelledby="sources-title" className="mt-14">
            <h2 id="sources-title" className="display text-[1.75rem]">Sources</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {story.sources.map((s) => (
                <li key={s.label} className="py-4 flex gap-4 items-start">
                  <span
                    className={`mt-1 shrink-0 text-[12px] font-semibold px-2 py-0.5 rounded-sm ${
                      s.checked ? "bg-st-verified-tint text-st-verified" : "bg-st-verify-tint text-st-verify"
                    }`}
                  >
                    {s.checked ? "Checked" : "To check"}
                  </span>
                  <div className="min-w-0">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 decoration-line-strong hover:decoration-ink break-words">
                        {s.label}
                      </a>
                    ) : (
                      <p className="font-semibold">{s.label}</p>
                    )}
                    <p className="text-[14px] text-muted mt-0.5">
                      {s.outlet}, {s.kind.toLowerCase()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="privacy-title" className="mt-12">
            <h2 id="privacy-title" className="display text-[1.75rem]">Privacy notes</h2>
            <ul className="mt-4 space-y-2 text-[16px] text-ink-soft list-disc pl-5">
              {story.privacy.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 self-start space-y-6">
          <VerificationRecord story={story} compact />

          <div className="bg-surface border border-line rounded-md p-5">
            <p className="text-[13px] font-semibold text-ink-soft">Where this story is</p>
            <ol className="mt-3 space-y-2">
              {WORKFLOW.filter((s) => s !== "Archived" && s !== "Reimbursement Candidate").map((s) => {
                const i = WORKFLOW.indexOf(s);
                const state = i < stageIndex ? "done" : i === stageIndex ? "current" : "todo";
                return (
                  <li key={s} className="flex items-center gap-3 text-[14px]">
                    <span
                      aria-hidden="true"
                      className={`w-2.5 h-2.5 rounded-full ${
                        state === "done" ? "bg-st-verified" : state === "current" ? "bg-st-verify ring-4 ring-st-verify-tint" : "bg-line-strong"
                      }`}
                    />
                    <span className={state === "todo" ? "text-muted" : state === "current" ? "font-semibold" : ""}>
                      {s}
                      {state === "current" && <span className="sr-only"> (current stage)</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-[13px] text-muted">{story.verification.departmentNote}</p>
          </div>

          <div className="rounded-md bg-ink text-white p-5">
            <p className="font-semibold">Know a story like this?</p>
            <p className="text-[14px] text-white/75 mt-1">Departments and the public can send one in.</p>
            <Link href="/submit" className="mt-4 flex items-center justify-center h-11 rounded-sm bg-white text-ink font-semibold">
              Submit a story
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
