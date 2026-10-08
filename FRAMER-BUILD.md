# Building Hero Cops in Framer (OrngLab template)

Template: https://independent-methods-730718.framer.app/
This Next.js build uses the template's type, color, spacing and section patterns, so every block below is an
existing template section with Hero Cops content swapped in.

## 1. Styles

### Colors (Assets > Colors)

| Style name | Value | Used for |
| --- | --- | --- |
| Ink | #0C0407 | Headings, body text on white, buttons |
| Ink 2 | #4C4C4C | Body copy, secondary text |
| Muted | #999999 | Labels, hints, placeholders |
| Line | #E6E6E6 | Hairline dividers, input underlines |
| Fill | #F4F4F4 | Image placeholders, info panels |
| Status / Verified | #1E7A55 | Workflow tags only |
| Status / Pending | #8A5A00 | Workflow tags only |
| Status / Alert | #B3261E | Form errors only |

### Text styles (Inter)

| Style | Desktop | Tablet (810-1199) | Phone (<810) | Weight | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display | 164 / 0.93 | 112 | 56 / 1.0 | 700 | -6% |
| H1 (section title) | 120 / 1.2 | 88 | 48 / 1.1 | 700 | -6% |
| H2 (row title) | 60 / 1.1 | 48 | 32 | 600 | -3% |
| H3 | 40 / 1.2 | 40 | 28 | 600 | -3% |
| H4 | 32 / 36 | 32 | 24 / 30 | 600 | -3% |
| H5 (card title, FAQ) | 24 / 28 | 24 | 24 | 600 | -3% |
| Label | 16 / 22 | | | 600 | -2% |
| Body | 16 / 24, Ink 2 | | | 400 | -1% |
| Small | 14 / 20 | | | 500 | -2% |

### Layout
- Full-width stacks with 30px side padding (16px on phone). No max-width container, as in the template.
- Section gap 120px desktop, 72px phone.
- Buttons: black pill (48px tall, 28px side padding) and outline pill. Header CTA is an underlined text link.

## 2. Pages and section mapping

### Home (`/`)

| Order | Hero Cops section | Template section to duplicate | Notes |
| --- | --- | --- | --- |
| 1 | Hero: "Officers who went beyond the call." | Hero | Display style |
| 2 | About Hero Cops | About us (image left, text right) | Image slot: department-supplied photo |
| 3 | Who sends stories (Departments, The public, What qualifies) | Our services | Same rows: H2 left, pipe list + body right |
| 4 | Verified stories | Latest works | Connect to the Stories CMS; second card is a "Submit a story" CTA |
| 5 | Why departments trust us (/01 to /04) | Why choose us? | Content column starts at 440px |
| 6 | How a story gets verified (/STEP-1 to /STEP-5) | Working process | Add a 5th step; content column at 560px |
| 7 | FAQ | FAQ | 6 questions, first open |
| 8 | Know a story like this? | Contact us | Link groups left; right side links to /submit instead of the short form |

Template sections removed: stats counters, "Have a look inside" gallery, client reviews, blog. Hero Cops has no
real numbers, quotes or articles for them yet, and invented ones would undermine a verification-first brand.

### Stories (`/stories`) = template Projects page
Display title + CMS grid of story cards (image, title, status tag, category/location/date tags).

### Story detail (`/stories/[slug]`) = template Project detail page
Title (H1) > "About the story" + meta grid (Officer, Department, Location, Date, Type of act, Stage) >
full-width image > What happened > Verification (stage list + facts) > Sources > Privacy notes > CTA.

### Submit (`/submit`) = template Contact page
Display title + intro > section index left (/01 to /06) > form right (690px). Underline inputs, pill radio
choices, black full-width submit.

## 3. Stories CMS collection

Fields match `src/lib/stories.ts` and the Airtable Stories table:

| Framer field | Type | Airtable source |
| --- | --- | --- |
| Title | Plain text | Story title |
| Slug | Slug | Website slug |
| Dek | Plain text | Public summary |
| Officer name / Rank | Plain text | Officer name / Officer rank or title |
| Department | Plain text | Department (linked) |
| City / State | Plain text | City / State |
| Date | Plain text | Incident date note |
| Type of act | Option | Category |
| Stage | Option | Status |
| Body | Formatted text | Edited from What happened |
| Image + Credit | Image + Plain text | Media Assets with permission granted |
| Sources | Formatted text, or a separate Sources collection | Sources table |
| Privacy notes | Formatted text | Privacy notes (public-safe version) |

Publish only records with Status = Published. Sync options: Airtable's Framer CMS plugin, or a Make/Zapier
scenario that upserts Framer CMS items when Status changes to Published.

## 4. The form in Framer

Framer's native form can't do the conditional fields or write to five linked Airtable tables. Two options:

1. **Recommended:** keep this Next.js `/api/submit` route deployed (for example on Vercel) and point a Framer code
   component form at it. All validation and Airtable logic stays in one place.
2. Framer form > webhook > Make scenario that recreates the `writeSubmission` steps in `src/lib/airtable.ts`
   (find or create Department, create Story, split Sources, create Media Assets, open a Reimbursement claim).
