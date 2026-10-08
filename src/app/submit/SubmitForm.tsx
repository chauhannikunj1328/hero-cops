"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AGENCY_TYPES,
  CATEGORIES,
  MAX_FILES,
  REIMBURSED,
  RIGHTS_HOLDERS,
  SUBMITTER_TYPES,
  US_STATES,
  YES_NO_UNKNOWN,
  YES_NO_UNSURE,
  type SubmitResult,
} from "@/lib/submission-schema";

type Errors = Record<string, string>;

const SECTIONS = [
  { id: "about-you", label: "About you" },
  { id: "officer", label: "Officer and department" },
  { id: "what-happened", label: "What happened" },
  { id: "sources", label: "Sources and media" },
  { id: "spending", label: "Personal spending" },
  { id: "privacy", label: "Privacy and consent" },
];

export function SubmitForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Extract<SubmitResult, { ok: true }> | null>(null);
  const [personalFunds, setPersonalFunds] = useState<string>("");
  const [hasMedia, setHasMedia] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/submit", { method: "POST", body: new FormData(form) });
      const data = (await res.json()) as SubmitResult;
      if (data.ok) {
        setResult(data);
        setStatus("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setErrors(data.fieldErrors ?? {});
      setMessage(data.message);
      setStatus("error");
      const first = data.fieldErrors ? Object.keys(data.fieldErrors)[0] : undefined;
      if (first) {
        const el = form.querySelector<HTMLElement>(`[name="${first}"]`);
        el?.focus();
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    } catch {
      setMessage("We couldn't reach the server. Check your connection and send again. Your answers are still here.");
      setStatus("error");
    }
  }

  if (status === "done" && result) {
    return (
      <div className="max-w-2xl" role="status">
        <p className="t-label text-st-verified">Story received</p>
        <h2 className="t-h2 mt-3">Thank you. Reference {result.reference}</h2>
        <p className="t-body mt-5">
          Your story is now in our verification queue. An editor will check the sources and contact the department
          before anything is published. We will email you if we need more detail.
        </p>
        {result.mode === "demo" && (
          <p className="t-small mt-5 bg-fill px-4 py-3">
            Test mode: the form validated correctly, but no database is connected to this preview, so nothing was
            stored.
          </p>
        )}
        {result.warnings.length > 0 && (
          <ul className="t-small mt-4 text-st-pending list-disc pl-5">
            {result.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        )}
        <h3 className="t-h5 mt-12">What happens next</h3>
        <ol className="mt-4 border-t border-line">
          {[
            "We open every source link and check it supports the story.",
            "We contact the department to confirm the facts and the officer's consent.",
            "We review privacy: names of children or people in hard situations are left out.",
            "The department sees the final copy before we publish.",
          ].map((t, i) => (
            <li key={t} className="grid grid-cols-[72px_1fr] gap-4 py-4 border-b border-line">
              <span className="t-label text-ink-2">/STEP-{i + 1}</span>
              <span className="t-body text-ink">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setResult(null);
              setPersonalFunds("");
              setHasMedia(false);
            }}
            className="btn btn-outline"
          >
            Submit another story
          </button>
          <Link href="/stories" className="btn">
            Read verified stories
          </Link>
        </div>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    ) : null;
  const a = (name: string) => ({
    name,
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <div className="grid lg:grid-cols-[1fr_690px] gap-12 lg:gap-[30px]">
      <nav aria-label="Form sections" className="hidden lg:block">
        <ol className="sticky top-28 border-t border-line max-w-sm">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="flex gap-6 py-4 border-b border-line t-label hover:opacity-60 transition-opacity">
                <span className="text-ink-2 w-8">/0{i + 1}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-20" encType="multipart/form-data">
        {status === "error" && message && (
          <div role="alert" className="border-l-2 border-st-alert bg-fill px-4 py-3 t-small text-ink">
            {message}
          </div>
        )}

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <Section id="about-you" n={1} title="About you" hint="So we can follow up. Your contact details are never published.">
          <fieldset>
            <legend className="field-label">Who are you?</legend>
            <div className="flex flex-wrap gap-2 mt-2">
              {SUBMITTER_TYPES.map((t) => (
                <label key={t} className="choice">
                  <input type="radio" name="submitterType" value={t} required />
                  {t}
                </label>
              ))}
            </div>
            {err("submitterType")}
          </fieldset>
          <Row>
            <Field label="Full name" error={err("submitterName")}>
              <input {...a("submitterName")} className="field-input" autoComplete="name" required />
            </Field>
            <Field label="Role or title" optional>
              <input {...a("submitterRole")} className="field-input" autoComplete="organization-title" placeholder="e.g. Public Information Officer" />
            </Field>
          </Row>
          <Field label="Organization" optional>
            <input {...a("submitterOrg")} className="field-input" autoComplete="organization" />
          </Field>
          <Row>
            <Field label="Email" error={err("submitterEmail")}>
              <input {...a("submitterEmail")} type="email" className="field-input" autoComplete="email" required />
            </Field>
            <Field label="Phone" optional>
              <input {...a("submitterPhone")} type="tel" className="field-input" autoComplete="tel" />
            </Field>
          </Row>
        </Section>

        <Section id="officer" n={2} title="Officer and department">
          <Row>
            <Field label="Officer's name" error={err("officerName")}>
              <input {...a("officerName")} className="field-input" required />
            </Field>
            <Field label="Rank or title" optional>
              <input {...a("officerRank")} className="field-input" placeholder="e.g. Officer, Deputy, Sergeant" />
            </Field>
          </Row>
          <Field label="Department or agency" error={err("departmentName")}>
            <input {...a("departmentName")} className="field-input" placeholder="e.g. Westland Police Department" required />
          </Field>
          <Row>
            <Field label="Agency type" error={err("agencyType")}>
              <select {...a("agencyType")} className="field-input" defaultValue="" required>
                <option value="" disabled>Choose one</option>
                {AGENCY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-[1fr_96px] gap-3">
              <Field label="City" error={err("city")}>
                <input {...a("city")} className="field-input" autoComplete="address-level2" required />
              </Field>
              <Field label="State" error={err("state")}>
                <select {...a("state")} className="field-input" defaultValue="" required>
                  <option value="" disabled>–</option>
                  {US_STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
          </Row>
          <div className="bg-fill p-5 sm:p-6 space-y-5">
            <p className="t-body">
              Who at the department can confirm this? Usually the public information officer or communications
              director. Leave blank if you don&apos;t know and we&apos;ll find them.
            </p>
            <Field label="Department contact name" optional>
              <input {...a("deptContactName")} className="field-input" />
            </Field>
            <Row>
              <Field label="Contact email" optional error={err("deptContactEmail")}>
                <input {...a("deptContactEmail")} type="email" className="field-input" />
              </Field>
              <Field label="Contact phone" optional>
                <input {...a("deptContactPhone")} type="tel" className="field-input" />
              </Field>
            </Row>
          </div>
          <fieldset>
            <legend className="field-label">Does the department know you are submitting this?</legend>
            <Choices name="departmentAware" options={YES_NO_UNSURE} />
            {err("departmentAware")}
          </fieldset>
        </Section>

        <Section id="what-happened" n={3} title="What happened">
          <Field label="Short title for the story" error={err("headline")} hint="One line, like a headline.">
            <input {...a("headline")} className="field-input" maxLength={140} required />
          </Field>
          <Row>
            <Field label="Date it happened" optional error={err("incidentDate")}>
              <input {...a("incidentDate")} type="date" className="field-input" />
            </Field>
            <Field label="Or approximate date" optional hint="e.g. Spring 2024">
              <input {...a("incidentDateNote")} className="field-input" />
            </Field>
          </Row>
          <Field label="Type of act" error={err("category")}>
            <select {...a("category")} className="field-input" defaultValue="" required>
              <option value="" disabled>Choose one</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field
            label="Describe what happened"
            error={err("description")}
            hint="Who was helped, what the officer did, and why it went beyond the job. Plain facts are best."
          >
            <textarea {...a("description")} rows={7} className="field-input" required />
          </Field>
        </Section>

        <Section id="sources" n={4} title="Sources and media" hint="Links help us verify faster. Photos are only published once we have permission.">
          <Field label="Links to news reports, posts or press releases" optional error={err("sourceLinks")} hint="One link per line.">
            <textarea {...a("sourceLinks")} rows={3} className="field-input" placeholder="https://" />
          </Field>
          <Field label="Photos, video or documents" optional error={err("media")} hint={`Up to ${MAX_FILES} files, 5 MB each. Share larger videos as a link below.`}>
            <input
              {...a("media")}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/heic,video/mp4,video/quicktime,application/pdf"
              className="field-input file:mr-4 file:rounded-full file:border-0 file:bg-ink file:text-white file:px-4 file:py-2 file:font-semibold"
              onChange={(e) => {
                const files = e.currentTarget.files?.length ?? 0;
                const links = formRef.current?.querySelector<HTMLTextAreaElement>("#mediaLinks")?.value.trim() ?? "";
                setHasMedia(files > 0 || links.length > 0);
              }}
            />
          </Field>
          <Field label="Links to photos or video" optional error={err("mediaLinks")} hint="Google Drive, Dropbox, YouTube. One per line.">
            <textarea
              {...a("mediaLinks")}
              rows={2}
              className="field-input"
              placeholder="https://"
              onChange={(e) => {
                const hasLinks = e.currentTarget.value.trim().length > 0;
                const files = formRef.current?.querySelector<HTMLInputElement>("#media")?.files?.length ?? 0;
                setHasMedia(hasLinks || files > 0);
              }}
            />
          </Field>
          {hasMedia && (
            <fieldset>
              <legend className="field-label">Who owns these photos or videos?</legend>
              <Choices name="mediaRightsHolder" options={RIGHTS_HOLDERS} />
              <span className="field-hint">If a news outlet or a bystander took them, we&apos;ll ask them for permission before using them.</span>
            </fieldset>
          )}
        </Section>

        <Section id="spending" n={5} title="Personal spending" hint="Some officers pay out of pocket to help. We record it now so it can be verified later.">
          <fieldset>
            <legend className="field-label">Did the officer use their own money?</legend>
            <Choices name="personalFunds" options={YES_NO_UNKNOWN} onChange={setPersonalFunds} />
            {err("personalFunds")}
          </fieldset>
          {personalFunds === "Yes" && (
            <div className="space-y-6 border-l border-ink pl-5 sm:pl-6">
              <Row>
                <Field label="Approximate amount (USD)" optional error={err("approxAmount")}>
                  <input {...a("approxAmount")} inputMode="decimal" className="field-input" placeholder="$" />
                </Field>
                <Field label="What was bought" optional>
                  <input {...a("purchased")} className="field-input" placeholder="e.g. Car seat, groceries" />
                </Field>
              </Row>
              <fieldset>
                <legend className="field-label">Has the officer already been paid back?</legend>
                <Choices name="alreadyReimbursed" options={REIMBURSED} />
                {err("alreadyReimbursed")}
              </fieldset>
              <p className="t-small text-muted">
                Hero Cops does not collect or send money through this form. Spending is recorded only so it can be
                verified.
              </p>
            </div>
          )}
        </Section>

        <Section id="privacy" n={6} title="Privacy and consent">
          <fieldset>
            <legend className="field-label">Are children involved in the story?</legend>
            <Choices name="involvesMinors" options={YES_NO_UNKNOWN} />
            {err("involvesMinors")}
          </fieldset>
          <fieldset>
            <legend className="field-label">
              Could anyone be identified in a difficult situation? For example someone accused of an offense, unwell or
              in crisis.
            </legend>
            <Choices name="vulnerablePerson" options={YES_NO_UNKNOWN} />
            {err("vulnerablePerson")}
          </fieldset>
          <fieldset>
            <legend className="field-label">Has the officer agreed to be featured?</legend>
            <Choices name="officerConsent" options={["Yes", "No", "Unknown"] as const} />
            {err("officerConsent")}
          </fieldset>
          <Field label="Anything we should keep private?" optional hint="Names to leave out, details that could cause harm, requests from the family.">
            <textarea {...a("privacyNotes")} rows={3} className="field-input" />
          </Field>
          <div className="space-y-4 pt-2">
            <label className="check">
              <input type="checkbox" name="confirmAccurate" aria-invalid={errors.confirmAccurate ? true : undefined} />
              <span>The information I&apos;ve given is accurate to the best of my knowledge.</span>
            </label>
            {err("confirmAccurate")}
            <label className="check">
              <input type="checkbox" name="consentToContact" aria-invalid={errors.consentToContact ? true : undefined} />
              <span>Hero Cops may contact me and the department to verify this story before anything is published.</span>
            </label>
            {err("consentToContact")}
          </div>
        </Section>

        <div className="border-t border-line pt-10">
          <button type="submit" disabled={status === "sending"} className="btn w-full disabled:opacity-60">
            {status === "sending" ? "Sending story…" : "Send story for verification"}
          </button>
          <p className="t-small text-muted mt-4 text-center">Nothing is published until the department confirms it.</p>
        </div>
      </form>
    </div>
  );
}

function Section({ id, n, title, hint, children }: { id: string; n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 space-y-7">
      <div className="border-t border-ink pt-5">
        <p className="t-label text-ink-2">/0{n} <span className="sr-only">of 6</span></p>
        <h2 id={`${id}-title`} className="t-h3 mt-3">{title}</h2>
        {hint && <p className="t-body mt-3">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-7 sm:gap-[30px]">{children}</div>;
}

function Field({ label, optional, hint, error, children }: { label: string; optional?: boolean; hint?: string; error?: React.ReactNode; children: React.ReactElement<{ id?: string }> }) {
  const id = children.props.id;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error}
    </div>
  );
}

function Choices<T extends string>({ name, options, onChange }: { name: string; options: readonly T[]; onChange?: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((o) => (
        <label key={o} className="choice">
          <input type="radio" name={name} value={o} onChange={() => onChange?.(o)} />
          {o}
        </label>
      ))}
    </div>
  );
}
