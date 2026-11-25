# Phase 3A: Outstanding Evidence & Open Issues (internal)

Last updated: 2026-11-25 · Scope: shared foundation, navigation, footer, homepage

This file is internal. None of it is published on the website. Everything listed under §1 has been
**kept out of public copy, structured data and llms.txt** until evidence is provided.

## 1. Claims withheld pending evidence

| Item | Status given in the brief | What is needed to publish |
|---|---|---|
| Usage-based metering & rating | Admin-confirmed, not documented | Product documentation of metering and rating (units, aggregation, pricing rules) |
| DATEV | Admin-confirmed, evidence pending | Link to the live integration or export documentation; scope (export file vs. API) |
| XRechnung / ZUGFeRD | Admin-confirmed, evidence pending | Documentation or sample invoices showing the e-invoice formats produced |
| Comprehensive API / developer platform | Not documented | `docs.myfundbox.com` returns an empty page (checked 2026-11-25). Published API reference first; no endpoints are named on the site |
| AI-driven payment intelligence | Future / unverified | Not presented as live anywhere. The AI audience section covers subscription monetisation only |
| End-to-end Quote-to-Cash | Not verified | "How it works" shows Configure → Connect Payments → Manage Billing → Track Revenue only |
| Certifications (PCI DSS, ISO 27001, SOC 2, …) | None verified | Certificates or attestation letters. The trust section lists only team-confirmed security capabilities |
| Country / currency counts | Live site inconsistent (135+ vs 100+) | A single documented figure from the product team |
| Payment "orchestration" | Wording only | The site uses it to mean "several connected gateways managed in one place". Confirm before claiming routing, failover or smart retries across gateways |
| Specific reporting metrics (MRR, ARR, churn, LTV) | Live site says only "real-time insights" | Confirm which metrics the reporting module shows. The hero mock-up now avoids ARR and growth percentages |
| Instalment plans | Not found on the live site | Confirm in the app. Removed from homepage copy in this phase |

## 2. Integrations

- The live site (myfundbox.com/sitemap.xml, read 2026-11-25) has the `/integrations` index plus **34** `/integrations/<slug>` pages, each with a `/de/` twin. The brief mentions 37, but only 34 detail pages are in the live sitemap (36 including the EN and DE index pages). **Please confirm the expected count.**
- This repo has **no** `/integrations/*` routes. Nav, footer and homepage link to the existing live pages (absolute `https://myfundbox.com/integrations/...`). Inventory: `src/data/liveSite.ts`. Guard tests: `src/data/liveSite.test.ts`.
- Named publicly: only the team-confirmed integrations that also have a live page: Stripe, GoCardless, Mollie, PayPal, Checkout.com, QuickBooks, Xero, sevdesk, Lexware Office, Avalara, Zapier. None is labelled an official partner.
- Not named (status unknown; the live directory has a "Coming Soon" tab without per-card status): 2Checkout, Adyen, Brevo, BuchhaltungsButler, DocuSign, Fastbill, FreshBooks, HubSpot, Mailchimp, Micropayment, Microsoft 365, orgaMAX, Papierkram, Payrexx, Pipedrive, Razorpay, Sage Active, Salesforce, Stripe Invoicing, Telegram, WhatsApp, WISO Buhl, Zoho Books. **Need: live / beta / coming-soon status for each.**
- Instamojo (team-confirmed) has no live integration page, so it isn't in the integrations wall; it still appears in Global Payments.
- **Decision needed:** `src/data/redirects.ts` still maps `/integrations` → `/integrations/payments` (from the Phase 1 plan). It is dormant, because the target page doesn't exist, and was left untouched as instructed ("keep existing redirects"). If `/integrations/payments` is ever built, the live `/integrations` index URL would start 301-ing. Remove the mapping if the index URL must be kept.
- **Cutover requirement:** if this site replaces myfundbox.com, every URL in `LIVE_INTEGRATION_PATHS` must keep resolving (rebuild at the same path or keep the live pages).

## 3. Lead capture (demo form): unchanged, still a limitation

- `POST /api/demo-request` (server.ts) validates the form and keeps submissions **in memory only**. They are lost on restart and are not emailed or forwarded. On the static GitHub Pages build there is no `/api` at all unless `VITE_DEMO_ENDPOINT` is set at build time.
- Not changed in Phase 3A, as instructed. The homepage makes no claim that demo requests are stored or delivered; it only links to `/book-a-demo`.
- **Needed:** a decision on the destination (email, CRM or database) before launch.

## 4. Company facts & legal placeholders

- `siteConfig.ts` still holds `[ADD: …]` for the legal entity, address, founding year and contact emails, and `[ADD: …]` author names.
- Phase 3A change: structured data **omits** placeholder fields (legalName, foundingDate, address) and no longer emits `Person` author nodes with placeholder names. Articles are attributed to the Organization. Covered by a test.
- Legal pages (`/imprint`, `/privacy-policy`, `/terms-of-service`, `/cookies`, `/dpa`) still contain placeholders. Not edited; nothing was invented. **Needed:** verified company details for the Imprint and policies before launch.
- robots.txt: the `[CONFIRM crawler policy]` marker is removed from the public file. The policy itself (all AI crawlers allowed) still needs sign-off.

## 5. Pages linked from the new nav/footer that still carry legacy copy

These are existing routes, kept as they are (rebuilding them is out of scope for 3A). Their content still reflects the retired revenue-recognition positioning in places:
`/solutions/saas`, `/solutions/digital-services`, `/solutions/memberships`, `/blog` (index page; the real blog is myfundbox.com/blog-myfundbox), `/resources`, `/help`, `/about`. `/product`, `/subscription-management`, `/recurring-billing` and `/pricing` were rebuilt for billing in M2. Rebuild the rest in the next phase.

## 6. Removed links

- "Documentation" (`docs.myfundbox.com`) is removed from the Resources menu, and "Developer Resources" from the footer, because the docs site serves an empty placeholder page. `APP_LINKS.docs` is kept for when the docs are published. Inner pages (outside 3A scope) may still link to it.
- Homepage "REST API" integration tile removed for the same reason.

## 7. Assets

- Hero and capability visuals are HTML mock-ups with clearly labelled sample data for a fictional business. Replace them with approved app screenshots when available.
- Official SVG wordmarks for partner logos are still wanted (PNG icons from the live site are used now).
