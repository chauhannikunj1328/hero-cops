import Link from "next/link";
import { getStories } from "@/lib/stories";
import { VerificationRecord } from "@/components/VerificationRecord";
import { CarSeatIllustration } from "@/components/CarSeatIllustration";

const steps = [
  { title: "Submitted", body: "A department, a witness or the person helped sends us the story and any links." },
  { title: "Verification", body: "We open every source and check it actually supports what happened." },
  { title: "Department contact", body: "We confirm the facts with the department's PIO and ask the officer's consent." },
  { title: "Approved", body: "Privacy review is done. The department sees the final copy." },
  { title: "Published", body: "The story goes live with its sources listed underneath." },
];

const kinds = [
  {
    title: "Practical help, right then",
    body: "A car seat bought after a traffic stop. Groceries for a family instead of a jail cell. Small acts, often paid for out of the officer's own pocket.",
  },
  {
    title: "Years of mentoring",
    body: "An officer who built a boxing gym for kids in his city and sold his own home to keep it open.",
  },
  {
    title: "Care that keeps going",
    body: "Months of off-duty errands for a widow first met on a welfare check. No rescue, no headline moment, just showing up.",
  },
];

export default function Home() {
  const [featured] = getStories();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <h1 className="display text-[3rem] sm:text-[4.5rem] lg:text-[5.25rem]">
            Officers who went beyond the call. Checked before we tell it.
          </h1>
          <p className="mt-6 text-[19px] leading-relaxed text-ink-soft max-w-xl">
            Hero Cops publishes true stories of compassion, courage and service by law-enforcement officers. Every story
            is verified with the department before it appears here.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center h-12 px-6 rounded-sm bg-badge text-white font-semibold text-[17px] hover:bg-badge-deep"
            >
              Submit a story
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center justify-center h-12 px-6 rounded-sm border border-line-strong font-semibold text-[17px] hover:border-ink"
            >
              Read verified stories
            </Link>
          </div>
        </div>
        {featured && (
          <div className="lg:pl-4">
            <VerificationRecord story={featured} />
            <p className="mt-3 text-[13px] text-muted">
              Every story carries a record like this, so readers can see what was checked.
            </p>
          </div>
        )}
      </section>

      {/* Who submits and why */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="display text-[2.25rem] sm:text-[2.75rem]">For departments</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              A trusted place to send the good work your officers do that rarely reaches the news. There is no cost, you
              confirm every fact, and you see the final story before it goes live.
            </p>
            <Link href="/#departments" className="mt-5 inline-block font-semibold text-badge underline underline-offset-4 decoration-badge/30 hover:decoration-badge">
              How we work with PIOs
            </Link>
          </div>
          <div>
            <h2 className="display text-[2.25rem] sm:text-[2.75rem]">For the public</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Saw an officer help someone, or were you the one helped? Tell us. We do the checking with the department,
              so the officer gets credit that holds up.
            </p>
            <Link href="/submit" className="mt-5 inline-block font-semibold text-badge underline underline-offset-4 decoration-badge/30 hover:decoration-badge">
              Share what you saw
            </Link>
          </div>
        </div>
      </section>

      {/* Verification process: a real sequence, so numbered */}
      <section id="verification" className="scroll-mt-20 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="display text-[2.5rem] sm:text-[3.25rem] max-w-2xl">How a story gets verified</h2>
        <p className="mt-4 text-[17px] text-ink-soft max-w-2xl">
          Nothing is published on a submitter&apos;s word alone. A story moves through five stages, and can be paused or
          declined at any of them.
        </p>
        <ol className="mt-12 grid gap-px bg-line border border-line rounded-md overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-ground p-5 sm:p-6">
              <span className="display text-[2.5rem] text-badge tabular-nums">{i + 1}</span>
              <h3 className="font-semibold text-[17px] mt-3">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[14px] text-muted max-w-2xl">
          When an officer spent their own money, we record the amount during verification. Any future reimbursement is
          handled separately and only after the story is approved.
        </p>
      </section>

      {/* Featured story */}
      {featured && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-24">
          <h2 className="text-[15px] font-semibold text-ink-soft mb-4">Featured story</h2>
          <Link href={`/stories/${featured.slug}`} className="group grid md:grid-cols-[1.1fr_1fr] bg-surface border border-line rounded-md overflow-hidden hover:border-line-strong">
            <CarSeatIllustration className="w-full h-full min-h-[220px] object-cover" />
            <div className="p-6 sm:p-10 flex flex-col">
              <p className="text-[14px] text-muted">
                {featured.city}, {featured.state}, {featured.incidentDate}
              </p>
              <h3 className="display text-[2rem] sm:text-[2.5rem] mt-3 group-hover:text-badge">{featured.title}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{featured.dek}</p>
              <span className="mt-auto pt-6 font-semibold text-badge">Read the story</span>
            </div>
          </Link>
        </section>
      )}

      {/* What qualifies */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <h2 className="display text-[2.5rem] sm:text-[3.25rem] max-w-2xl">What counts as a Hero Cops story</h2>
          <p className="mt-4 text-[17px] text-white/75 max-w-2xl">
            Not only dramatic rescues. Most of the stories we look for are quiet, and many happen off duty.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {kinds.map((k) => (
              <div key={k.title} className="border-t border-white/25 pt-5">
                <h3 className="font-semibold text-[19px]">{k.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/75">{k.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For departments */}
      <section id="departments" className="scroll-mt-20 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-[1fr_1.1fr] gap-12">
        <div>
          <h2 className="display text-[2.5rem] sm:text-[3.25rem]">Working with public information officers</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            We want to be the easiest place for a communications team to send a good story, and a careful one.
          </p>
        </div>
        <ul className="space-y-6">
          {[
            ["No cost to submit.", "We are not asking departments for money. Sending a story is free."],
            ["You confirm the facts.", "We contact your office before anything is published, and we name who confirmed it."],
            ["You see the final copy.", "Corrections and concerns are handled before the story goes live, not after."],
            ["You can say no.", "If the officer or department declines, the story is archived and never published."],
          ].map(([t, b]) => (
            <li key={t} className="flex gap-4">
              <span className="mt-2 w-2 h-2 rounded-full bg-badge shrink-0" aria-hidden="true" />
              <p className="text-[17px] leading-relaxed">
                <span className="font-semibold">{t}</span> <span className="text-ink-soft">{b}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Privacy */}
      <section id="privacy" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <h2 className="display text-[2.25rem] sm:text-[2.75rem]">Privacy and permissions</h2>
          <ul className="space-y-4 text-[16px] leading-relaxed text-ink-soft list-disc pl-5">
            <li>We never publish a child&apos;s name or an identifiable image of a child without a guardian&apos;s permission.</li>
            <li>People accused of an offense, unwell or in crisis are not named unless they chose to tell the story themselves.</li>
            <li>Photos and video are used only when the owner gives permission. News photos are never reused without a license.</li>
            <li>Submitter contact details are used for verification only and are never published.</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-md bg-badge text-white px-6 py-12 sm:px-12 sm:py-16 grid md:grid-cols-[1.4fr_auto] gap-8 items-center">
          <div>
            <h2 className="display text-[2.25rem] sm:text-[3rem]">Know an officer who went beyond the call?</h2>
            <p className="mt-3 text-[17px] text-white/80">It takes about 10 minutes. We handle the verification.</p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center h-12 px-6 rounded-sm bg-white text-badge font-semibold text-[17px] hover:bg-badge-tint"
          >
            Submit a story
          </Link>
        </div>
      </section>
    </>
  );
}
