import Link from "next/link";
import { getStories } from "@/lib/stories";
import { ImageSlot, IndexRow, SectionTitle, ServiceRow } from "@/components/blocks";
import { StoryCard, SubmitCard } from "@/components/StoryCard";
import { PhotoCredit, StoryPhoto } from "@/components/StoryPhoto";
import { ABOUT_PHOTO } from "@/lib/photos";

/*
  Section order follows the OrngLab template:
  Hero > About > Services > Latest works > Why choose us > Working process > FAQ > Contact
  Template sections without real Hero Cops content (stats counters, client reviews,
  gallery, blog) are left out rather than filled with invented numbers or quotes.
*/

const audiences = [
  {
    title: "Departments",
    items: ["Public information officers", "Chiefs and sheriffs", "Communications teams"],
    body: "A trusted place to send the good work your officers do that rarely reaches the news. Sending a story is free, and you confirm every fact before it goes live.",
  },
  {
    title: "The public",
    items: ["Witnesses", "People who were helped", "Neighbors and families"],
    body: "Saw an officer help someone, or were you the one helped? Tell us. We check every detail with the department, so the credit holds up.",
  },
  {
    title: "What qualifies",
    items: ["Immediate practical help", "Long-term mentoring", "Ongoing care", "Acts of courage"],
    body: "Not only dramatic rescues. A car seat bought after a traffic stop, years spent mentoring kids at a boxing gym, or months of off-duty errands for a widow all count.",
  },
];

const trust = [
  { title: "No cost to submit", body: "We are not asking departments for money. Sending a story, and having it verified and published, is free." },
  { title: "You confirm the facts", body: "We contact your office before anything is published, and the story names who confirmed it." },
  { title: "You see the final copy", body: "Corrections and concerns are handled before the story goes live, not after." },
  { title: "You can say no", body: "If the officer or the department declines, the story is archived and never published." },
];

const steps = [
  { title: "Submitted", body: "A department, a witness or the person who was helped sends us the story, with any links, photos or video." },
  { title: "Verification", body: "We open every source and check that it actually supports what happened. Two independent sources, or one from the department." },
  { title: "Department contact", body: "We confirm the facts with the department's public information officer and ask whether the officer agrees to be featured." },
  { title: "Approved", body: "Privacy review is done and image permissions are cleared. The department sees the final copy." },
  { title: "Published", body: "The story goes live with its sources listed underneath, so readers can see what was checked." },
];

const faqs = [
  {
    q: "Do departments pay anything?",
    a: "No. Submitting, verification and publishing are free. Hero Cops is not asking departments for money.",
  },
  {
    q: "Who verifies a story, and how?",
    a: "A Hero Cops editor checks each source link, then confirms the facts with the department's public information officer. Nothing is published on a submitter's word alone.",
  },
  {
    q: "Will you publish the names of children or the people who were helped?",
    a: "Not without permission. We never publish a child's name or an identifiable image of a child without a guardian's consent. People accused of an offense, unwell or in crisis are not named unless they chose to tell the story themselves.",
  },
  {
    q: "Can we use our department's own photos?",
    a: "Yes, and they are preferred. We record who owns each photo or video and only publish once the owner has given permission. News photos are never reused without a license.",
  },
  {
    q: "What if the officer paid for something out of pocket?",
    a: "Tell us roughly what was spent and whether they were paid back. We record it during verification. Any future reimbursement program will run separately, and only after a story is approved.",
  },
  {
    q: "Can a published story be removed?",
    a: "Yes. If the officer, the department or a person in the story asks, we review it and archive it if needed.",
  },
];

export default function Home() {
  const stories = getStories();

  return (
    <>
      {/* Hero */}
      <section className="wrap pt-10 md:pt-16">
        <h1 className="t-display max-w-[1240px]">Officers who went beyond the call.</h1>
      </section>

      {/* About */}
      <section id="about" className="wrap pt-12 md:pt-20 grid lg:grid-cols-[690px_1fr] gap-10 lg:gap-[30px]">
        <div>
          <ImageSlot label="Illustrative photo" ratio="4 / 3.4" className="rounded-none">
            <StoryPhoto photo={ABOUT_PHOTO} sizes="(min-width: 1024px) 690px, 100vw" priority />
          </ImageSlot>
          <p className="t-small text-muted mt-3"><PhotoCredit photo={ABOUT_PHOTO} /></p>
        </div>
        <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 lg:pl-[30px] content-start">
          <h2 className="t-h4 whitespace-nowrap">About Hero Cops</h2>
          <div className="space-y-5 max-w-md">
            <p className="t-body text-ink">
              Hero Cops is a public-service storytelling platform. We publish true stories of compassion, courage and
              service by law-enforcement officers.
            </p>
            <p className="t-body">
              Every story is verified with the department before it appears here. Departments get a trusted place to
              send the work their people do. The public gets stories they can rely on.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link href="/submit" className="btn">Submit a story</Link>
              <Link href="/stories" className="btn btn-outline">Read stories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services > Who sends stories */}
      <section id="departments" className="wrap section scroll-mt-20">
        <SectionTitle>Who sends stories</SectionTitle>
        <div className="mt-8 md:mt-12 border-t border-line">
          {audiences.map((a) => (
            <ServiceRow key={a.title} {...a} />
          ))}
        </div>
      </section>

      {/* Latest works > Verified stories */}
      <section id="stories" className="wrap pb-[72px] md:pb-[120px] scroll-mt-20">
        <SectionTitle>Verified stories</SectionTitle>
        <ul className="mt-8 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-14">
          {stories.map((s) => (
            <li key={s.slug}>
              <StoryCard story={s} />
            </li>
          ))}
          <li>
            <SubmitCard />
          </li>
        </ul>
      </section>

      {/* Why choose us > Why departments trust us */}
      <section className="wrap pb-[72px] md:pb-[120px]">
        <SectionTitle>Why departments trust us</SectionTitle>
        <ol className="mt-8 md:mt-12 border-t border-line">
          {trust.map((t, i) => (
            <IndexRow key={t.title} index={`/0${i + 1}`} title={t.title} body={t.body} />
          ))}
        </ol>
      </section>

      {/* Working process > How verification works */}
      <section id="process" className="wrap pb-[72px] md:pb-[120px] scroll-mt-20">
        <SectionTitle>How a story gets verified</SectionTitle>
        <ol className="mt-8 md:mt-12 border-t border-line">
          {steps.map((s, i) => (
            <IndexRow key={s.title} index={`/STEP-${i + 1}`} title={s.title} body={s.body} wide />
          ))}
        </ol>
        <p className="t-body mt-6 max-w-2xl lg:ml-[590px]">
          When an officer spent their own money, we record the amount during verification. Any future reimbursement is
          handled separately and only after the story is approved.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap pb-[72px] md:pb-[120px] grid lg:grid-cols-[440px_1fr] gap-8 lg:gap-10 scroll-mt-20">
        <SectionTitle>FAQ</SectionTitle>
        <div className="border-t border-line lg:mt-6">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq border-b border-line" open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-6">
                <span className="t-h5">{f.q}</span>
                <svg className="faq-icon shrink-0 mt-1" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="t-body pb-6 max-w-2xl -mt-1">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact us > Submit a story */}
      <section className="wrap pb-[72px] md:pb-[120px]">
        <div className="border-t border-line pt-14 md:pt-20 grid lg:grid-cols-[1fr_500px] gap-12">
          <div className="flex flex-col justify-between gap-10">
            <SectionTitle>Know a story like this?</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-xl">
              <div>
                <p className="t-small text-muted">Main</p>
                <ul className="mt-3 space-y-2 t-label">
                  <li><Link href="/" className="hover:opacity-60">Home</Link></li>
                  <li><Link href="/stories" className="hover:opacity-60">Stories</Link></li>
                </ul>
              </div>
              <div>
                <p className="t-small text-muted">How it works</p>
                <ul className="mt-3 space-y-2 t-label">
                  <li><Link href="/#process" className="hover:opacity-60">Verification</Link></li>
                  <li><Link href="/#faq" className="hover:opacity-60">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <p className="t-small text-muted">Departments</p>
                <ul className="mt-3 space-y-2 t-label">
                  <li><Link href="/#departments" className="hover:opacity-60">For PIOs</Link></li>
                  <li><Link href="/submit" className="hover:opacity-60">Submit</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="t-h4">Send us a story about an officer</h3>
            <p className="t-body mt-4">
              It takes about 10 minutes. Tell us what happened and who can confirm it. We handle the verification with
              the department, and nothing is published until they confirm it.
            </p>
            <Link href="/submit" className="btn w-full mt-8">Submit a story</Link>
          </div>
        </div>
      </section>
    </>
  );
}
