# Health Vault

Personal healthcare records management platform built with Lovable + Supabase.

## Live Product

- App includes an in-product `Documentation` page (sidebar) with the walkthrough note.
- The same walkthrough is summarized below for submission convenience.

## Brief Walkthrough Note

### What was built

- User authentication (sign up/sign in) and profile management
- Records library with secure report upload and metadata
- Secure file storage integration with Supabase Storage
- Vitals logging flow with timeline/list experience
- Clinical UI polish across app pages (trust-first visual tone)
- Dedicated in-app `Documentation` page for assessment summary

### What was skipped (or kept partial) and why

- Advanced report filters/search/sorting are basic/partial
- Full report detail view (preview + edit/share/delete) is deferred
- Vitals charts/trend visuals are deferred (list/timeline is implemented)
- Password reset flow is not fully integrated in this pass

Reason for these tradeoffs:
- Prioritized reliable end-to-end core flows first (auth, upload, retrieval, vitals)
- Focused on attention to detail and trust-oriented UX under time constraints
- Chose polished, functional scope over broad but incomplete implementation

### What I would improve with more time (V2)

- Full report detail + metadata editing + secure sharing links
- Rich search/filter/sort and expanded clinical categorization model
- Vitals graphing, trend analysis, and threshold alerts
- Password reset and deeper edge-case handling in upload/retry flows
- Optional roadmap items: family accounts, device integrations, offline mode

## Supabase Project Access / Schema Export

You can submit either read access to Supabase or a schema export.
If dashboard access is unavailable, include `SUPABASE_SUBMISSION.md` from this repository as the technical backend handover note.

### Option A: Share Supabase project access (read access)

1. Open Supabase Dashboard and select your project.
2. Go to `Project Settings` -> `Members` (or Team access).
3. Invite reviewer email with the lowest permission needed (read-only if available).
4. Include project URL in submission note.

### Option B: Share schema export (SQL)

Use Supabase CLI:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db dump --linked --schema public -f supabase/schema.sql
```

Then include `supabase/schema.sql` in your repository or submission package.

If CLI is not available, you can export schema from Supabase SQL editor by generating DDL for core tables (`profiles`, `health_records`, `vitals`) and associated policies.

## Notes for Evaluators

- Walkthrough details are available in two places:
  - This `README.md`
  - In-app `Documentation` page (inside the website/app)
