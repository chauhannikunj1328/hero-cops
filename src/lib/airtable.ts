import "server-only";
import type { Submission } from "./submission-schema";

/**
 * Airtable client for the Hero Cops workflow base.
 *
 * Writes use field IDs (not names) so editors can rename columns in Airtable
 * without breaking the website. IDs below come from the base
 * "Hero Cops – Story Workflow (TEST)".
 */

const API = "https://api.airtable.com/v0";
const CONTENT_API = "https://content.airtable.com/v0";

export const AT = {
  stories: {
    id: "tblDFMazBDVV4Ebou",
    title: "fldVxgLvwhE5deOBq",
    ref: "fldKCrr3D8PMa6YTE",
    status: "fldY5kfECDUDwKDiw",
    nextAction: "fld6gaDQRwvjMHgM8",
    nextActionDue: "fldXIsc8CHKtc7uKw",
    officerName: "fldMh2bbjvMofHV23",
    officerRank: "fldXY1jrwJaEUduGT",
    city: "fld0bVzZXteJHCOxT",
    state: "fld6OjVoBeBhCVtCf",
    incidentDate: "fldbifmCQLAH3znvo",
    incidentDateNote: "fldXteZSzKAx8K2uN",
    category: "fldj5zSeHvaVdPUWx",
    whatHappened: "fldiSaam3R1ZceSRj",
    publicSummary: "fldwNQB5pW1baALwr",
    slug: "fld9LxUplaey7NzHE",
    submitterType: "fldNEQEXzQc5MkFLJ",
    submitterName: "fldsrat8TYRF9FnRq",
    submitterRole: "flddYOvZKVfmcfR4y",
    submitterOrg: "flddD4hcHfHWWWNv9",
    submitterEmail: "fld0JugQfJ5j54O2e",
    submitterPhone: "fldrwQLhh8C9j7UsX",
    deptContactName: "fldZxaZgvlgxUp0XS",
    deptContactEmail: "fld2VKhgcbpYKSAkR",
    deptContactPhone: "fldEueAIAl17sGbvv",
    departmentAware: "fldU5KUYrgZbis117",
    departmentVerification: "fldfb1K9dfDLxFT8c",
    sourceLinksRaw: "fldRRFAQ5Vs0Jgi44",
    mediaLinksRaw: "fldVUAVsBICUAUe62",
    involvesMinors: "fldiClPcXFlSyk5pi",
    vulnerablePerson: "fld4CRcwqF1Ij7bMO",
    privacyNotes: "fldxho7WPtI1X7zum",
    privacyReview: "fldpXD9aU7jZ6jO6k",
    officerConsent: "fldiDsuWza154enSZ",
    personalFunds: "fld3IPG8i7jU56yRp",
    approxAmount: "fld8oWAzEfo4yREH3",
    purchased: "fldFLC1hwg2jK4EN3",
    alreadyReimbursed: "fld9KWGM8amC34Bx8",
    consentToContact: "fldzB3CQoNyBhWWDa",
    department: "fld3jcjJKDPuxnhOo",
    reference: "fldB5IRqiWY4jgCZt",
  },
  departments: {
    id: "tblgysBqdOga0JBAq",
    name: "fldw3d6c9LoMMYQds",
    agencyType: "fldrFvT2v0TutBkLo",
    city: "fldMIbjOy0z2ATqLb",
    state: "fldO9uZ2FBhB8fEPE",
    contactName: "flduSy6XbRgRXTAcN",
    contactEmail: "fld5PTDQSZnBnxxWw",
    contactPhone: "fldLnIOHzHQy5nxfT",
    relationshipStage: "fldFacw42pkGgRcDS",
    commsInterest: "fldzCHm8fBXSxs4fl",
  },
  sources: {
    id: "tbljpzg5K4el5VRvV",
    title: "fldtX94eIFYU2DWSs",
    story: "fldALK3CIwzkgesZU",
    url: "fldgHpPr71z1pcFVq",
    type: "fldbs35gppNMRtqZG",
    checked: "fldMb59z9gUuMpLIH",
  },
  media: {
    id: "tblXEKb9SCnzstFxP",
    asset: "fld9GTBUJYBR1Tnjy",
    story: "fld3d8ucc3LfJKqQp",
    file: "fldqxlRiAK1v83uYQ",
    link: "fldOvFKYWmeH32Y9l",
    type: "fldHouvtuFwPKNjdB",
    rightsHolder: "fldbBeM4LwwQpgWnR",
    permission: "fld3badsj0DLmE18c",
    showsMinors: "fldDZPotNMbXcCTJy",
  },
  reimbursements: {
    id: "tbl92oFyCGEofxVrl",
    claim: "fldE4jio1gIxhxjLz",
    story: "fldwCSlXPeuhnw2gK",
    officer: "fldglYq7MbCxEQFok",
    amountClaimed: "fldMCo9tBD0IvDEtI",
    status: "fldBcJxLq4wnbcyck",
    expenseVerification: "fldliD0FOjmy4e3FF",
    notes: "fldRDSOpJWhKSljui",
  },
} as const;

type Fields = Record<string, unknown>;
type AirtableRecord = { id: string; fields: Fields };

function config() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!token || !baseId) return null;
  return { token, baseId };
}

export function airtableConfigured() {
  return config() !== null;
}

async function request<T>(url: string, init: RequestInit): Promise<T> {
  const cfg = config()!;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    // Never echo the token; the body contains only Airtable's error object.
    throw new Error(`Airtable ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}

async function createRecords(tableId: string, records: Fields[]): Promise<AirtableRecord[]> {
  const { baseId } = config()!;
  const out: AirtableRecord[] = [];
  // Airtable accepts up to 10 records per create call.
  for (let i = 0; i < records.length; i += 10) {
    const batch = records.slice(i, i + 10);
    const data = await request<{ records: AirtableRecord[] }>(`${API}/${baseId}/${tableId}`, {
      method: "POST",
      body: JSON.stringify({
        records: batch.map((fields) => ({ fields })),
        typecast: true,
        returnFieldsByFieldId: true,
      }),
    });
    out.push(...data.records);
  }
  return out;
}

async function findDepartment(name: string, state: string): Promise<string | null> {
  const { baseId } = config()!;
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const formula = `AND(LOWER({Department name})=LOWER("${esc(name)}"),{State}="${esc(state)}")`;
  const params = new URLSearchParams({ filterByFormula: formula, maxRecords: "1" });
  const data = await request<{ records: AirtableRecord[] }>(
    `${API}/${baseId}/${AT.departments.id}?${params}`,
    { method: "GET" },
  );
  return data.records[0]?.id ?? null;
}

async function uploadAttachment(recordId: string, fieldId: string, file: File) {
  const { baseId } = config()!;
  const buf = Buffer.from(await file.arrayBuffer());
  await request(`${CONTENT_API}/${baseId}/${recordId}/${fieldId}/uploadAttachment`, {
    method: "POST",
    body: JSON.stringify({
      contentType: file.type || "application/octet-stream",
      filename: file.name,
      file: buf.toString("base64"),
    }),
  });
}

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Writes one form submission into the workflow base:
 *  1. Finds or creates the Department (relationship record, never duplicated)
 *  2. Creates the Story at Status = Submitted with a dated Next action
 *  3. Splits each source link into its own Sources record (unchecked)
 *  4. Creates one Media Assets record per upload or link, permission = Not requested
 *  5. If personal money was spent, opens a Phase 2 Reimbursements stub (no payments)
 */
export async function writeSubmission(s: Submission, files: File[]) {
  const S = AT.stories;
  const warnings: string[] = [];

  // 1. Department
  let departmentId = await findDepartment(s.departmentName, s.state);
  if (!departmentId) {
    const [dept] = await createRecords(AT.departments.id, [
      {
        [AT.departments.name]: s.departmentName,
        [AT.departments.agencyType]: s.agencyType,
        [AT.departments.city]: s.city,
        [AT.departments.state]: s.state,
        [AT.departments.contactName]: s.deptContactName,
        [AT.departments.contactEmail]: s.deptContactEmail,
        [AT.departments.contactPhone]: s.deptContactPhone,
        [AT.departments.relationshipStage]: "Not contacted",
        [AT.departments.commsInterest]: "Not discussed",
      },
    ]);
    departmentId = dept.id;
  }

  // 2. Story
  const isDepartmentSubmitter =
    s.submitterType === "Department PIO or communications" || s.submitterType === "Department leadership";
  const [story] = await createRecords(S.id, [
    {
      [S.title]: s.headline,
      [S.status]: "Submitted",
      [S.nextAction]: isDepartmentSubmitter
        ? "Check sources, then reply to the submitting PIO to confirm details"
        : "Check sources, then find the department PIO to verify",
      [S.nextActionDue]: addDays(2),
      [S.officerName]: s.officerName,
      [S.officerRank]: s.officerRank,
      [S.city]: s.city,
      [S.state]: s.state,
      [S.incidentDate]: s.incidentDate,
      [S.incidentDateNote]: s.incidentDateNote,
      [S.category]: s.category,
      [S.whatHappened]: s.description,
      [S.submitterType]: s.submitterType,
      [S.submitterName]: s.submitterName,
      [S.submitterRole]: s.submitterRole,
      [S.submitterOrg]: s.submitterOrg,
      [S.submitterEmail]: s.submitterEmail,
      [S.submitterPhone]: s.submitterPhone,
      [S.deptContactName]: s.deptContactName,
      [S.deptContactEmail]: s.deptContactEmail,
      [S.deptContactPhone]: s.deptContactPhone,
      [S.departmentAware]: s.departmentAware,
      [S.departmentVerification]: "Not started",
      [S.sourceLinksRaw]: s.sourceLinks.join("\n") || undefined,
      [S.mediaLinksRaw]: s.mediaLinks.join("\n") || undefined,
      [S.involvesMinors]: s.involvesMinors,
      [S.vulnerablePerson]: s.vulnerablePerson,
      [S.privacyNotes]: s.privacyNotes,
      [S.privacyReview]: "Not reviewed",
      [S.officerConsent]: s.officerConsent,
      [S.personalFunds]: s.personalFunds,
      [S.approxAmount]: s.approxAmount,
      [S.purchased]: s.purchased,
      [S.alreadyReimbursed]: s.alreadyReimbursed,
      [S.consentToContact]: true,
      [S.department]: [departmentId],
    },
  ]);

  // 3. Sources
  if (s.sourceLinks.length) {
    await createRecords(
      AT.sources.id,
      s.sourceLinks.map((url) => ({
        [AT.sources.title]: `Submitted link: ${new URL(url).hostname}`,
        [AT.sources.story]: [story.id],
        [AT.sources.url]: url,
        [AT.sources.checked]: false,
      })),
    );
  }

  // 4. Media (uploads and links), each tracked for rights separately
  const rights = s.mediaRightsHolder ?? "Unknown";
  const mediaRows: Fields[] = [
    ...files.map((f) => ({
      [AT.media.asset]: f.name,
      [AT.media.story]: [story.id],
      [AT.media.type]: f.type.startsWith("video") ? "Video" : "Photo",
      [AT.media.rightsHolder]: rights,
      [AT.media.permission]: "Not requested",
      [AT.media.showsMinors]: s.involvesMinors,
    })),
    ...s.mediaLinks.map((url) => ({
      [AT.media.asset]: `Linked media: ${new URL(url).hostname}`,
      [AT.media.story]: [story.id],
      [AT.media.link]: url,
      [AT.media.rightsHolder]: rights,
      [AT.media.permission]: "Not requested",
      [AT.media.showsMinors]: s.involvesMinors,
    })),
  ];
  if (mediaRows.length) {
    const created = await createRecords(AT.media.id, mediaRows);
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadAttachment(created[i].id, AT.media.file, files[i]);
      } catch {
        warnings.push(`${files[i].name} could not be attached. The record was saved without it.`);
      }
    }
  }

  // 5. Phase 2 hook: open a reimbursement stub, never a payment
  if (s.personalFunds === "Yes" && s.alreadyReimbursed !== "Yes") {
    await createRecords(AT.reimbursements.id, [
      {
        [AT.reimbursements.claim]: `${s.officerName}: ${s.purchased ?? "personal expense"}`,
        [AT.reimbursements.story]: [story.id],
        [AT.reimbursements.officer]: s.officerName,
        [AT.reimbursements.amountClaimed]: s.approxAmount,
        [AT.reimbursements.status]: "Not reviewed",
        [AT.reimbursements.expenseVerification]: "Not started",
        [AT.reimbursements.notes]: "Created from website form. Review only after the story is Approved.",
      },
    ]);
  }

  const ref = story.fields[S.ref];
  return { reference: ref ? `HC-${ref}` : story.id, warnings };
}
