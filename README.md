# Hero Cops: trial build (Next.js + Airtable)

Test environment only. Does not touch HeroCops.us, its WordPress install, domain, DNS or hosting.

## What's here

| Route | What it is |
| --- | --- |
| `/` | Landing page: what Hero Cops is, why departments and the public submit, how verification works |
| `/stories` | Story index (CMS collection) |
| `/stories/officer-joshua-scaglione-car-seat` | Working CMS story page with sources, privacy notes and a public verification record |
| `/submit` | Submit a Hero Story form (6 sections, validated client and server side) |
| `/api/submit` | Writes a submission into the Airtable workflow base |

## Run it

```bash
npm install
cp .env.example .env.local   # paste your Airtable token
npm run dev                  # http://localhost:3000
```

Without `AIRTABLE_TOKEN` the form still validates and shows a "Test mode: nothing was stored" confirmation.

### Airtable token

1. Go to airtable.com/create/tokens and create a Personal Access Token.
2. Scopes: `data.records:read`, `data.records:write`.
3. Access: only the base **Hero Cops – Story Workflow (TEST)** (`appps7h31nIkBuNfU`).
4. Put it in `.env.local` as `AIRTABLE_TOKEN`. Never commit it.

## What a submission writes

1. **Departments**: finds the agency by name + state, or creates it (`Relationship stage = Not contacted`).
2. **Stories**: new record at `Status = Submitted`, with a dated **Next action**.
3. **Sources**: one record per link, unchecked.
4. **Media Assets**: one record per upload or media link, `Permission status = Not requested`. Uploads go to Airtable's attachment endpoint (5 MB limit each).
5. **Reimbursements (Phase 2)**: a stub claim only if the officer spent their own money and wasn't paid back. No payments.

Field IDs (not names) are used in `src/lib/airtable.ts`, so columns can be renamed in Airtable safely.

## Key files

- `src/lib/submission-schema.ts`: form fields, options and validation (zod)
- `src/lib/airtable.ts`: Airtable writes
- `src/lib/stories.ts`: story CMS collection (mirrors Airtable "Published" fields)
- `src/components/VerificationRecord.tsx`: the public verification record

## Fonts

Archivo and Source Serif 4 (SIL Open Font License), self-hosted in `src/fonts`.
