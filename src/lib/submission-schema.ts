import { z } from "zod";

/**
 * Single source of truth for the Submit a Hero Story form.
 * The same option lists feed the form UI and the Airtable single-select fields,
 * so the labels here must match the Airtable choices exactly.
 */

export const SUBMITTER_TYPES = [
  "Department PIO or communications",
  "Department leadership",
  "Other department staff",
  "Person who was helped",
  "Witness or member of the public",
  "Media",
] as const;

export const AGENCY_TYPES = [
  "Police department",
  "Sheriff's office",
  "State police or patrol",
  "Other",
] as const;

export const CATEGORIES = [
  "Immediate practical help",
  "Long-term mentoring",
  "Ongoing care",
  "Act of courage",
  "Compassionate discretion",
  "Other",
] as const;

export const YES_NO_UNSURE = ["Yes", "No", "Not sure"] as const;
export const YES_NO_UNKNOWN = ["Yes", "No", "Unknown"] as const;
export const REIMBURSED = ["Yes", "No", "Partially", "Unknown"] as const;

export const RIGHTS_HOLDERS = [
  "Department",
  "Submitter",
  "Bystander or third party",
  "News organization",
  "Unknown",
] as const;

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
] as const;

export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 5 * 1024 * 1024; // Airtable direct upload limit
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "video/mp4", "video/quicktime", "application/pdf"];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

const urlList = z
  .string()
  .trim()
  .optional()
  .transform((v) =>
    (v ?? "")
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .refine((list) => list.every((u) => /^https?:\/\/\S+\.\S+/i.test(u)), {
    message: "Each link must start with http:// or https://. Put one link per line.",
  })
  .refine((list) => list.length <= 10, { message: "Add up to 10 links." });

export const submissionSchema = z
  .object({
    // About you
    submitterType: z.enum(SUBMITTER_TYPES, { message: "Choose who you are." }),
    submitterName: z.string({ message: "Enter your full name." }).trim().min(2, "Enter your full name.").max(120),
    submitterRole: optionalText(120),
    submitterOrg: optionalText(160),
    submitterEmail: z.string({ message: "Enter a valid email address." }).trim().email("Enter a valid email address."),
    submitterPhone: optionalText(40),

    // Officer and department
    officerName: z.string({ message: "Enter the officer's name." }).trim().min(2, "Enter the officer's name.").max(120),
    officerRank: optionalText(80),
    departmentName: z.string({ message: "Enter the department or agency name." }).trim().min(3, "Enter the department or agency name.").max(160),
    agencyType: z.enum(AGENCY_TYPES, { message: "Choose the agency type." }),
    city: z.string({ message: "Enter the city." }).trim().min(2, "Enter the city.").max(80),
    state: z.enum(US_STATES, { message: "Choose a state." }),
    deptContactName: optionalText(120),
    deptContactEmail: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || z.string().email().safeParse(v).success, "Enter a valid email address."),
    deptContactPhone: optionalText(40),
    departmentAware: z.enum(YES_NO_UNSURE, { message: "Tell us if the department knows." }),

    // What happened
    headline: z.string({ message: "Give the story a short title." }).trim().min(10, "Give the story a short title (at least 10 characters).").max(140),
    incidentDate: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || (!Number.isNaN(Date.parse(v)) && new Date(v) <= new Date()), "Date can't be in the future."),
    incidentDateNote: optionalText(80),
    category: z.enum(CATEGORIES, { message: "Choose the type of act." }),
    description: z
      .string({ message: "Describe what happened." })
      .trim()
      .min(80, "Describe what happened in at least 80 characters.")
      .max(5000, "Keep the description under 5,000 characters."),

    // Sources and media
    sourceLinks: urlList,
    mediaLinks: urlList,
    mediaRightsHolder: z.enum(RIGHTS_HOLDERS).optional(),

    // Privacy
    involvesMinors: z.enum(YES_NO_UNKNOWN, { message: "Answer whether children are involved." }),
    vulnerablePerson: z.enum(YES_NO_UNKNOWN, { message: "Answer this privacy question." }),
    privacyNotes: optionalText(2000),
    officerConsent: z.enum(["Yes", "No", "Unknown"], { message: "Tell us if the officer agreed." }),

    // Personal spending
    personalFunds: z.enum(YES_NO_UNKNOWN, { message: "Tell us if the officer used their own money." }),
    approxAmount: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? Number(v.replace(/[$,]/g, "")) : undefined))
      .refine((v) => v === undefined || (Number.isFinite(v) && v >= 0 && v < 1_000_000), "Enter an amount in dollars."),
    purchased: optionalText(200),
    alreadyReimbursed: z.enum(REIMBURSED).optional(),

    // Consent
    confirmAccurate: z.literal("on", { message: "Confirm the information is accurate." }),
    consentToContact: z.literal("on", { message: "We need permission to contact you and the department." }),

    // Spam trap (must stay empty)
    website: z.string().max(0).optional(),
  })
  .superRefine((d, ctx) => {
    if (d.personalFunds === "Yes" && !d.alreadyReimbursed) {
      ctx.addIssue({
        code: "custom",
        path: ["alreadyReimbursed"],
        message: "Tell us if the officer has already been paid back.",
      });
    }
  });

export type Submission = z.infer<typeof submissionSchema>;

export type SubmitResult =
  | { ok: true; reference: string; mode: "airtable" | "demo"; warnings: string[] }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };
