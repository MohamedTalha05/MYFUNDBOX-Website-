# MYFUNDBOX Rebuild — Project Progress

Last updated: 2026-11-19

Status key: ✅ done · 🟡 in progress · ⏳ pending · ⛔ blocked

| Step | Description | Status |
|---|---|---|
| 1 | Inspect existing codebase | ✅ (this repo) / ⛔ (application codebase not available) |
| 2 | Competitor research & matrix | ✅ [01-competitor-research.md](01-competitor-research.md) |
| 3 | Audit existing MYFUNDBOX functionality | 🟡 public website checked (below); application not yet audited |
| 4 | Identify stack & architecture | 🟡 this repo identified; application stack only inferred |
| 5–6 | Three visual directions + recommendation | ✅ [design-directions.html](design-directions.html); A recommended, waiting for sign-off |
| 7 | Sitemap & application architecture | ✅ [02-sitemap-and-roadmap.md](02-sitemap-and-roadmap.md) |
| 8 | Implementation roadmap | ✅ milestones M0–M7 in the same file |
| 9 | Marketing website | 🟡 M1 foundation ✅; M2 core pages ✅ (2026-11-19); M3 product pages next |
| 10–11 | Revenue management application | ⛔ needs application codebase / API access |
| 12 | Test & optimise | ⏳ |
| 13 | Deployment docs | ⏳ |

---

## 1. What this repository is

This repository holds **only the marketing website**. It contains no billing application, database, authentication, payment-gateway or customer-portal code.

| Area | Finding |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 4, `motion`, `lucide-react`. Fonts: DM Sans, Plus Jakarta Sans, JetBrains Mono. |
| Server | `server.ts`: Express server that renders pages before sending them (SSR). Serves `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` and `.md` versions of pages. |
| Routing | Custom client router (`src/context/RouterContext.tsx`). Locales: `en`, `de`, `fr`, `es`. |
| Content | Pages come from data files: `src/data/pagesRegistry.ts` (~98 KB) and `src/data/competitorsData.ts` (~46 KB), rendered by `GenericContentPage` and `ComparePage`. |
| Backend endpoints | Only `POST /api/demo-request`. It validates the form, then keeps submissions **in memory**, so they are lost when the server restarts. Nothing is emailed or forwarded to a CRM. |
| Tests | `*.test.ts` files exist in `src/utils/`, but `package.json` has no test runner or `test` script. |
| Environment | `.env.example` lists `GEMINI_API_KEY` and `APP_URL`. The project scaffold came from Google AI Studio. |
| Version control | `git` is not on PATH on this machine, so history couldn't be checked. |

## 2. Critical finding: the site's content describes the wrong product

The current repo describes MYFUNDBOX as an **IFRS 15 revenue-recognition sub-ledger** (a tool that books revenue under accounting standards) for EU CFOs. `llms.txt` says it is *"NOT a payment processor, payment gateway, or billing engine"*. The integrations it lists are DATEV, SAP, Xero, NetSuite, HubSpot and Salesforce. It compares MYFUNDBOX with Zuora Revenue, NetSuite ARM and Sage Intacct.

The live site (myfundbox.com, read on 2026-11-19) presents MYFUNDBOX as a **subscription billing and payments platform**: *"Subscription billing, fully automated"*. That matches the master brief.

**Consequences:**
- Most copy, the menus, comparison pages, `llms.txt`, `llms-full.txt` and the structured data contradict what the product actually is. Publishing them would misinform search engines and AI search tools.
- `siteConfig.ts` contains unfilled placeholders: `[ADD: …]` for the legal entity, address, founding year, emails and social profiles, and `[CONFIRM: …]` for every integration and certification. Some author names and credentials are placeholders as well.

## 3. Existing capabilities: brief vs. live public site

This compares the brief with the public website only. Neither column has been checked against the application yet.

| Capability (from brief) | On live site? | Notes |
|---|---|---|
| One-time payments | ✅ | "One Time and Recurring" |
| Recurring subscriptions | ✅ | |
| Instalment payments | ❓ not found | Needs app verification |
| Quantity-based billing | ❓ not found | Needs app verification |
| Flexible plans, add-ons, coupons, trials | ✅ | Manage Plans, Trial Management |
| Customisable / hosted checkout | ✅ | Hosted checkout, iFrame embed, brand control |
| Payment links | ✅ | "Pay Link" |
| Custom domains | ✅ | Professional plan and above |
| Customer portal ("My Portal") | ✅ | Called "Customer Portal" on the site |
| Dunning / failed-payment recovery | ✅ | "Smart Dunning", automated card retries |
| Billing analytics / revenue reporting | 🟡 | Only "real-time insights"; no named analytics module |
| Invoicing, tax, EU VAT validation, refunds | ✅ | Not listed in the brief, but on the site |
| 2FA | ✅ | |
| 3D Secure | ❓ not found | Needs verification |
| REST API & webhooks | ✅ claimed | On all plans. Docs: docs.myfundbox.com. The brief says the API covers only Plans and Pay Links. |

| Payment gateway | Brief | Live site |
|---|---|---|
| Stripe, GoCardless, Mollie, PayPal | ✅ | ✅ |
| Instamojo | ✅ | ❌ not found |
| Checkout.com | — | ✅ listed |
| ACH, SEPA, bank transfer, open banking | — | ✅ |

| Integration | Brief | Live site |
|---|---|---|
| QuickBooks, Sevdesk, Avalara | ✅ | ✅ |
| Xero, Lexware | — | ✅ |
| Zapier | ✅ | ⚠️ shown only as a customer logo, not as an integration |
| Microsoft Azure | ✅ | ✅ Azure Marketplace listing |
| Google Cloud | ✅ | ✅ hosting ("Data stored in Frankfurt") |
| IONOS, GitHub | ✅ | ❌ not found |

**Live pricing:** Free (0 €, up to 25 subscribers), Professional (199 €/mo billed annually, up to 500), Advanced (399 €/mo billed annually, unlimited).

**Marketing claims on the live site:** 750+ members, €25m+ volume, 118k users, G2 4.9. These are the company's own figures. They must be verified before they're reused, as the brief requires.

**Inconsistent app hostnames:** `app.myfundbox.com`, `subscription.myfundbox.com`, `app.subscriptionbilling.eu`, `www.myfundbox.com/login-mfb`. The redirect flows must be preserved, so we need to confirm which hostnames are the real ones.

**Related products:** Donorfit and MFB Donate (donorfit.com).

## 4. Blockers

1. ⛔ **Application codebase / API.** The brief's Phases 4 and 8 (dashboard, subscriptions, billing, portal and so on, all running on real data) need the real MYFUNDBOX application. It appears to be a Java web app (`Signup.jsf`) and is not in this repo. To proceed we need **one** of:
   - (a) access to the application repo; or
   - (b) API documentation plus sandbox credentials that cover the needed endpoints.
2. ⛔ **Company facts.** Legal entity, address, founding year, contact emails, verified customer figures, certifications, and a confirmed integration list with live/beta/roadmap status. These are needed for structured data, the Imprint page and anything else that claims facts about the company.
3. ⚠️ **Tooling.** `git` is not installed or not on PATH, so changes can't be committed or reviewed through history.

## 5. Decisions log

| Date | Decision | By |
|---|---|---|
| 2026-11-19 | Navbar: transparent over the home hero, solid on scroll or on other pages | User |
| 2026-11-19 | Replace the IFRS 15 / revenue-recognition content with billing-platform positioning that matches the live product and the brief | User |
| 2026-11-19 | Website first (Phases 1–3, 5–7, 9). Application modules stay blocked until the app repo or API access is provided | User |
| 2026-11-19 | Design: Direction A, Modern Minimal (Geist + Inter, off-white, charcoal, brand red) | User |
| 2026-11-19 | URL plan: English at the root, German under `/de`, FR/ES dropped for launch, 301 map for live URLs | User |
| 2026-11-19 | Log in and Sign up go to `https://app.subscriptionbilling.eu/?app=1` "for now". The live paths `/login-mfb` and `/sign-up` (and their `/de` versions) 302 there, passing UTM and other query strings through | User |
| 2026-11-19 | Official logo confirmed: the existing `logo_mfb_2225b714.png`. The navbar and footer wordmarks are crops of it, with a dark-text recolour for light backgrounds | User |
| 2026-11-19 | Demo-request destination **on hold**. The user will advise; the Book a demo form work waits for it | User |
| 2026-11-19 | Design direction changed from Direction A (white/red) to **"Midnight Violet"**: navy/indigo/violet/cyan palette, Sora + Inter + Geist, dark hero bands, motion. Supersedes the Direction A decision | User |

## 7. Visual redesign "Midnight Violet": done 2026-11-19

- **Design system** (`src/index.css`): brand palette and 4 gradients as CSS variables; light and dark token sets; type scale (`display-xl/lg/md`, `lead`, `eyebrow`); buttons (`btn-primary` violet gradient, `btn-secondary`, `btn-light`, `btn-ghost`); cards (`card`, `card-interactive`, `card-glow`, `glass`); backgrounds (`bg-midnight-strong`, `bg-lavender-wash`, grid patterns, ambient `orb`s); motion tokens and keyframes. Any element with the `dark` class renders its subtree in the dark tokens, which keeps the hero bands, "Why" section, CTA and footer navy in both themes.
- **Motion** (`src/components/motion.tsx`): IntersectionObserver scroll reveals with stagger, count-up numbers, chart draw-in. No animation library added. Content is hidden for reveals only after JS adds `reveal-ready`, so SSR, crawlers and `prefers-reduced-motion` visitors see everything.
- **Homepage** rebuilt with billing-platform content (EN + DE, `src/data/homeContent.ts` plus the home entries in `pagesRegistry.ts`): hero with an illustrative dashboard, trust strip, problem, platform/lifecycle, 4 alternating features with product mock-ups, tabbed dashboard showcase, integrations, solutions, "Why MYFUNDBOX" stats, FAQ accordion, comparison links and final CTA.
- **Inner pages**: dark `PageHero` band, card system, FAQ accordion (answers stay in the HTML). Navbar is transparent over the hero bands and solid on scroll; the footer is dark navy.
- **Honesty rules**: mock-ups are labelled "Illustrative data". Only capabilities listed on the live site are named. Live-site company figures (750+ members etc.) are not used. The testimonials section renders only when `VERIFIED_TESTIMONIALS` has entries (currently empty, so hidden).

**Hero redesign (2026-11-19, later the same day):** the homepage hero is now `HomeHero` + `RevenueDashboardPreview`. New H1 "Take Control of Your Revenue. Focus on Growing Your Business." (DE translated) in `pagesRegistry.ts`, hero copy in `homeContent.ts`. "Get Started" → `APP_LINKS.signUp`; "Explore the Platform" → `/product`. Framer Motion (`motion/react`, LazyMotion + domAnimation) animates only the dashboard; the headline/copy entrance is CSS so text is in the first paint. The hero no longer shows the AEO summary, the author line or the "0 % Provision / Frankfurt / 25 customers" strip; the summary is still in the meta tags, schema, `llms.txt` and the `.md` page. `HeroBillingPreview` is now unused.

**Premium navbar (2026-11-19):** header rebuilt from `NAV_MENUS` in `siteConfig.ts` (Product, Solutions, Integrations, Resources, Company). Always dark: translucent navy with blur at the top, solid on scroll. Centred dropdowns with icons and animations, always in the DOM (crawlable) and `inert` while closed; animated hamburger with accordion sections on mobile/tablet (<1024px). Login is a text link and Get Started a violet gradient button, both still `APP_LINKS` (guarded by a test). Items without their own page use `fallbackHref` (Product modules → `/product`, Subscription businesses → `/solutions/memberships`, Digital businesses → `/solutions/digital-services`, integrations → `/product/integrations-api`, Guides → `/resources`) and switch automatically once the page exists. Pricing and Book a demo moved from the top bar into the Product panel's footer strip. `MEGA_MENU_*` / `NAV_LINKS` still feed the footer.

**Integrations strip (2026-11-19):** `IntegrationsStrip` replaces the homepage "payment rails" bar. Data in `src/data/integrationsEcosystem.ts`; every logo has its own role caption plus the note "capabilities and availability differ by integration and region". Instamojo and Zapier were confirmed as verified integrations by the MYFUNDBOX team (2026-11-19). IONOS and GitHub are configured but hidden (`show: false`) until their role is confirmed. Logos: official marks from Simple Icons v16.36.0 (CC0) for Stripe, PayPal, QuickBooks, Zapier and Google Cloud, in `src/data/brandMarks.ts`. Mollie, GoCardless, Instamojo, sevdesk, Avalara and Microsoft Azure have no Simple Icons mark, so they render as a name lockup until official wordmark files are added (`logoSrc`).

**Open items:** official wordmark SVGs from partner brand kits for the integrations strip; IONOS/GitHub role; real app screenshots to replace the HTML mock-ups; logo SVG files for the integration grid (text wordmarks are used for now); verified testimonials; inner-page *content* is still the old revenue-recognition copy (M3+); `DeferredRevenueEstimator` and `HeroLedgerPreview` are no longer used.

---

## 6. M1 Foundation: done 2026-11-19

**Delivered**
- **Design tokens** (`src/index.css`): Direction A colours as semantic utilities (`bg-canvas`, `bg-surface`, `text-ink`, `text-muted`, `text-subtle`, `border-line`, `text-accent`, …), with dark-theme values. Primary button is charcoal, secondary is outline, and the red is used only for accents. Fonts: Geist (headings) and Inter (body), self-hosted.
- **Navbar**: transparent at the top, white with a border when scrolled or when a menu is open. Product and Solutions menus, then Pricing, Developers and Resources; on the right, Log in, Book a demo and Get started. Includes a mobile drawer.
- **Footer**: five columns (Product, Solutions, Resources, Company, Legal), social links from the live site, EN/DE switch, theme toggle and cookie preferences.
- **"No dead links" rule**: menu and footer items whose page isn't built yet are hidden automatically and appear once the page exists. Developers falls back to docs.myfundbox.com. A test enforces this.
- **URL scheme**: English at the root, German under `/de`. A `/de` URL resolves only if a German page exists, never English content under a German URL. Legal pages moved to the live-site URLs `/imprint`, `/privacy-policy`, `/terms-of-service`, `/cookies` and `/dpa`.
- **301 redirects** (`src/data/redirects.ts` plus server middleware): `/en/*`, `/fr/*` and `/es/*` go to the root path, moved live-site URLs go to their new pages, and trailing slashes are removed. Query strings are kept. A redirect fires only when its target page exists.
- **SEO**: hreflang tags only for language versions that exist; home and canonical URLs without a trailing slash; `llms.txt` and `llms-full.txt` describe the billing platform. Deleted the stale `public/` copies of `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt`, which Vite and `express.static` were serving in place of the generated versions.
- **Logo**: interim cropped and recoloured wordmarks in `public/assets/brand/` (dark text for light backgrounds, light text for dark).
- **Tests**: `npm test` runs Node's test runner through tsx. 25 tests pass (10 before), covering redirects, locale helpers, nav links and SEO output.

**Verified:** `tsc --noEmit` clean; `npm test` 25/25 passing; `npm run build` OK; on the dev server, the status codes and redirects above behave as expected and the rendered nav and footer contain only working links.
**Not verified:** visual check in a browser (no browser tool was available in this session).

**Interim states (expected until later milestones)**
- Page *content* is still the old revenue-recognition copy. It is replaced in M2–M5.
- The homepage keeps its old layout and a dark hero (now charcoal, no gradients) until it is rebuilt in M2.
- The Product menu is hidden because none of its pages exist yet. The Solutions menu shows only the three existing pages.
- The demo form still asks IFRS-specific questions and stores submissions in memory. Both are fixed in M2 (Book a demo page).

**Open items**
- ✅ Log in / Sign up URLs: resolved (see Decisions).
- ✅ Logo: the official PNG is confirmed. An SVG version would still be nicer for sharpness, but it's optional.
- ⏸ Demo-request destination: on hold until the user advises.


---

## 8. M2 Core Pages: done 2026-11-19

**Delivered**
- **Homepage (`/`)**: Rebuilt in Direction A (Modern Minimal: off-white canvas, clean borders, crisp typography, brand red accent) with all 13 sections for the genuine MYFUNDBOX subscription billing platform:
  1. Hero section with `HeroBillingPreview` (live MRR, active subscriptions, and multi-gateway activity)
  2. Gateway partner bar (Stripe, GoCardless, Mollie, PayPal, sevDesk)
  3. At-a-glance GEO/AI fact box
  4. Problem vs. Solution (eliminating %-of-revenue cuts and gateway lock-in)
  5. 6-pillar key capabilities bento grid
  6. 3-step setup walkthrough
  7. Interactive Subscription Savings Calculator comparing flat pricing vs Stripe (0.7%), Paddle (5%), and Recurly (0.9%)
  8. European compliance, security & Frankfurt data sovereignty
  9. Payment gateway and DACH accounting integrations matrix
  10. Transparent flat pricing teaser
  11. Competitor comparison strip
  12. FAQ accordion with direct, crawlable answers
  13. High-contrast final CTA
- **Product Overview Page (`/product`)**: Full platform tour with interactive module explorer for Multi-Gateway Orchestration, Plans & Trials, Hosted Checkout & Pay Links, Smart Dunning, Customer Portal, EU VAT & Accounting, and Developer APIs.
- **Pricing Page (`/pricing`)**: Complete pricing experience featuring annual/monthly toggle, three transparent flat tiers (Free up to 25 subscribers, €199/mo Professional, €399/mo Advanced with 0% revenue cut), detailed feature comparison table, and embedded savings estimator.
- **Book a Demo Page (`/book-a-demo`)**: Dedicated walkthrough scheduling page with updated GDPR-compliant demo request form tailored to subscriber volume and billing gateways, plus a detailed 4-point session agenda.
- **Contact Page (`/contact`)**: Dedicated contact channels for sales, developer support, and data protection with direct inquiry submission.
- **German Homepage (`/de`)**: Complete German translation of the subscription billing value proposition.
- **Routing & Navigation**: `App.tsx` routes all 5 core pages to dedicated components; Navbar and Footer updated so "Book a demo" links to `/book-a-demo` and the Product dropdown reveals the `/product` overview.
- **Tests**: 30/30 unit tests passing cleanly (`npm test`); `tsc --noEmit` clean; production build OK; all 5 pages verified returning HTTP 200 on the live dev server with correct SSR titles and metadata.
