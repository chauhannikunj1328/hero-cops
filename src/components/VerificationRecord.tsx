import Link from "next/link";
import type { Story } from "@/lib/stories";

type Tone = "done" | "pending" | "note";

function Mark({ tone }: { tone: Tone }) {
  if (tone === "done")
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 mt-0.5">
        <circle cx="9" cy="9" r="9" fill="var(--color-st-verified)" />
        <path d="M5 9.3l2.6 2.5L13 6.4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (tone === "pending")
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 mt-0.5">
        <circle cx="9" cy="9" r="8" fill="none" stroke="var(--color-st-verify)" strokeWidth="2" strokeDasharray="3 2.4" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="8" fill="none" stroke="var(--color-muted)" strokeWidth="2" />
      <path d="M9 5.5v4.2M9 12.3v.2" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The verification record: the signature element of the site.
 * It shows the public exactly what has and hasn't been checked for a story.
 */
export function VerificationRecord({ story, compact = false }: { story: Story; compact?: boolean }) {
  const checked = story.sources.filter((s) => s.checked).length;
  const rows: { tone: Tone; label: string; detail: string }[] = [
    {
      tone: checked >= 2 ? "done" : "pending",
      label: "Sources",
      detail: `${checked} of ${story.sources.length} checked`,
    },
    {
      tone: story.verification.departmentConfirmed ? "done" : "pending",
      label: "Department confirmation",
      detail: story.verification.departmentConfirmed ? "Confirmed" : "Requested, awaiting reply",
    },
    {
      tone: "done",
      label: "Privacy review",
      detail: story.privacySummary,
    },
    {
      tone: "note",
      label: "Personal spending",
      detail: story.personalSpending.involved
        ? `${story.personalSpending.description}. Reimbursement not yet reviewed`
        : "None reported",
    },
  ];

  return (
    <div className="bg-surface border border-line rounded-md shadow-[0_1px_0_var(--color-line),0_12px_32px_-18px_rgba(18,26,36,0.35)]">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-line">
        <p className="text-[13px] font-semibold text-ink-soft">Verification record</p>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-st-verify-tint text-st-verify text-[12px] font-semibold px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-st-verify" aria-hidden="true" />
          {story.verification.status}
        </span>
      </div>
      <div className="px-5 pt-4 pb-5">
        {!compact && (
          <>
            <p className="text-[13px] text-muted">
              {story.department}, {story.state}
            </p>
            <p className="font-semibold text-[17px] leading-snug mt-1">
              {story.officerRank} {story.officerName}
            </p>
          </>
        )}
        <ul className={`${compact ? "" : "mt-4"} space-y-3`}>
          {rows.map((r) => (
            <li key={r.label} className="flex gap-3 text-[14px]">
              <Mark tone={r.tone} />
              <span>
                <span className="font-semibold block">{r.label}</span>
                <span className="text-ink-soft">{r.detail}</span>
              </span>
            </li>
          ))}
        </ul>
        {!compact && (
          <Link
            href={`/stories/${story.slug}`}
            className="mt-5 inline-flex text-[14px] font-semibold text-badge underline underline-offset-4 decoration-badge/30 hover:decoration-badge"
          >
            Read the story
          </Link>
        )}
      </div>
    </div>
  );
}
