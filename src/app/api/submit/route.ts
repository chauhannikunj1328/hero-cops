import { NextResponse } from "next/server";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILES,
  MAX_FILE_BYTES,
  submissionSchema,
  type SubmitResult,
} from "@/lib/submission-schema";
import { airtableConfigured, writeSubmission } from "@/lib/airtable";

export async function POST(request: Request): Promise<NextResponse<SubmitResult>> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "The form could not be read. Try again." }, { status: 400 });
  }

  // Spam trap: real people never fill the hidden "website" field.
  if (String(form.get("website") ?? "").length > 0) {
    return NextResponse.json({ ok: true, reference: "HC-0", mode: "demo", warnings: [] });
  }

  const raw: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") raw[key] = value;
  }

  const parsed = submissionSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json(
      { ok: false, message: "Some answers need fixing before we can send your story.", fieldErrors },
      { status: 422 },
    );
  }

  const files = form
    .getAll("media")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { ok: false, message: `Upload up to ${MAX_FILES} files.`, fieldErrors: { media: `Upload up to ${MAX_FILES} files.` } },
      { status: 422 },
    );
  }
  for (const f of files) {
    if (f.size > MAX_FILE_BYTES || !ALLOWED_FILE_TYPES.includes(f.type)) {
      const msg = `${f.name} must be a photo, MP4/MOV video or PDF under 5 MB. Share larger videos as a link instead.`;
      return NextResponse.json({ ok: false, message: msg, fieldErrors: { media: msg } }, { status: 422 });
    }
  }

  // No credentials: accept and validate, but say clearly that nothing was stored.
  if (!airtableConfigured()) {
    return NextResponse.json({ ok: true, reference: "HC-DEMO", mode: "demo", warnings: [] });
  }

  try {
    const { reference, warnings } = await writeSubmission(parsed.data, files);
    return NextResponse.json({ ok: true, reference, mode: "airtable", warnings });
  } catch (err) {
    console.error("[submit] Airtable write failed", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your story was not saved because our database did not respond. Your answers are still on this page, so try sending again in a minute.",
      },
      { status: 502 },
    );
  }
}
