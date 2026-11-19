# Sitemap, Architecture & Implementation Roadmap

## 1. URL strategy (decide before building)

The live site, myfundbox.com, serves English at the root (`/subscription-billing`, `/pay-links`, `/customer-portal`, `/pricing-pages/subscription-billing`) and German at `/de/...`. This repo uses `/en/...`, `/de/...`, `/fr/...` and `/es/...`.

**Recommendation**
- **English at the root, German under `/de`**, matching the live site. Where a page's purpose is unchanged, keep the live URL exactly.
- Add a **301 redirect map** for every live URL that changes, plus every `/en/...` URL this repo has generated, so search engines move existing rankings to the new pages.
- **Drop FR and ES for launch.** The live site has no French or Spanish pages, and machine-translated pages hurt quality signals. Add them later with real translations.
- **Login and Sign up link to the existing app.** The marketing site does no authentication of its own, so current login and sign-up redirects keep working unchanged. *The canonical app hostname still needs confirming* (see Open questions).

## 2. Sitemap

`●` = from the brief · `○` = carried over from the live site or recommended

| # | Page | Proposed URL | Live URL (keep or 301) |
|---|---|---|---|
| 1 | ● Homepage | `/` | `/` |
| 2 | ● Product overview | `/product` | — |
| 3 | ● Revenue management | `/revenue-management` | — |
| 4 | ● Subscription management | `/subscription-management` | `/subscription-billing` ❓ (keep live URL if it ranks) |
| 5 | ● Recurring billing | `/recurring-billing` | `/recurring-payments` → 301 |
| 6 | ● Payment management | `/payment-management` | — |
| 7 | ○ Payment links | `/pay-links` | `/pay-links` (keep) |
| 8 | ● Dunning management | `/dunning-management` | — |
| 9 | ● Revenue analytics | `/revenue-analytics` | — |
| 10 | ● Customer portal | `/customer-portal` | `/customer-portal` (keep) |
| 11 | ○ Plans, trials & coupons | `/plans-and-trials` | `/manage-plans`, `/trial-management` → 301 |
| 12 | ● Payment integrations (hub) | `/integrations/payments` | `/integrations` |
| 12a | ○ Gateway pages | `/integrations/stripe`, `/gocardless`, `/mollie`, `/paypal`, `/checkout` | same (keep) |
| 13 | ● Accounting & tax integrations | `/integrations/accounting` | — |
| 13a | ○ Pages per tool | `/integrations/quickbooks`, `/xero`, `/sevdesk`, `/lexware`, `/avalara` | same (keep) |
| 14 | ● Developers / API | `/developers` (links to docs.myfundbox.com) | — |
| 15–17 | ● Solutions: SaaS / Subscription / Digital | `/solutions/saas`, `/solutions/subscription-businesses`, `/solutions/digital-businesses` | — |
| 18 | ○ Solutions: Memberships, Agencies | `/solutions/memberships`, `/solutions/agencies` | — |
| 19 | ● Pricing | `/pricing` | `/pricing-pages/subscription-billing` → 301 |
| 20 | ○ Compare | `/compare/myfundbox-vs-{chargebee,recurly,stripe-billing,paddle,billsby}` | — |
| 21 | ● Resources hub | `/resources` | — |
| 22 | ● Blog | `/blog`, `/blog/{slug}` | ❓ need the live blog URL list |
| 23 | ○ Guides & glossary | `/guides/{slug}`, `/glossary` | — |
| 24 | ● About us | `/about` | — |
| 25 | ○ Security & compliance | `/security` | `/security-compliance` → 301 |
| 26 | ● Contact | `/contact` | — |
| 27 | ● Book a demo | `/book-a-demo` (form + Calendly link) | — |
| 28 | ● Login | external → existing login URL | `/login-mfb` (keep redirect) |
| 29 | ● Sign up | external → existing sign-up URL | `/sign-up` (keep redirect) |
| 30 | ○ Legal | `/imprint`, `/privacy-policy`, `/terms-of-service`, `/agb`, `/cookies` | same (keep) |
| — | ✂ Removed: all IFRS 15 / rev-rec pages | `/en/product/revenue-recognition`, `/en/compare/*-zuora`, … | 301 to the closest new page |

**Internal linking model:** homepage → pillar pages (3–10) → integration and solution pages → compare, guides and pricing. Every product page ends with *Get started* and *Book a demo* buttons and links to 2–3 related pages.

**Navigation (5 items, Paddle-style):** Product · Solutions · Pricing · Developers · Resources. On the right: *Log in* and **Get started**.

## 3. Website architecture (this repo)

The existing stack is kept: React 19, Vite, Tailwind 4, and the Express server that renders pages before sending them (SSR). It already works and already generates the SEO files.

| Layer | Change |
|---|---|
| Design system | Replace the rose/amber gradients with Direction A tokens (CSS variables in `@theme`). Fonts: Geist + Inter, self-hosted through `@fontsource`. |
| Content | Rewrite `pagesRegistry.ts`, `siteConfig.ts` and `competitorsData.ts` for the billing positioning. Every factual claim is tagged with a verification status in the data. |
| Routing | Root-level English, `/de` for German, plus an Express middleware that applies the 301 redirect map. |
| SEO | Keep the existing generators for sitemap, robots, llms.txt, page Markdown and JSON-LD. Fix the schema types (Organization, WebSite, SoftwareApplication, BreadcrumbList, Article). No `aggregateRating` until a verified source exists. |
| Forms | `/api/demo-request` currently stores submissions in memory and loses them on restart. It needs a real destination: an email service, a CRM webhook or a database. The provider needs deciding. |
| Tests | Add Vitest and a `test` script so the existing `*.test.ts` files actually run. Add link-check and metadata tests. |

## 4. Application architecture (blocked until app access)

The modules A–J in the brief map to these app areas. None will be built until the app codebase or API is available, because building them would require mock data, which the brief prohibits.

| Module | Depends on |
|---|---|
| Revenue dashboard (MRR, ARR, churn, LTV…) | Subscription and transaction data; metric definitions agreed with the product team |
| Subscriptions; products & pricing | Existing app models and API (the API today covers only Plans and Pay Links) |
| Billing & invoicing; payments; refunds | Gateway adapters inside the app (never in the browser) |
| Customers; portal | Existing auth and portal; preserve current flows |
| Dunning | Existing smart-dunning engine |
| Analytics & exports | Read-only reporting store, or queries against the app's database |
| Developer centre | docs.myfundbox.com, API key and webhook management in the app |

## 5. Roadmap

| Milestone | Scope | Status |
|---|---|---|
| **M0 — Discovery** | Codebase inspection, live-site audit, competitor matrix, design directions, sitemap | ✅ done 2026-11-19 |
| **M1 — Foundation** | Design tokens (Direction A), fonts, navbar, footer, page shell, URL scheme + 301 middleware, test runner | ✅ done 2026-11-19 |
| **M2 — Core pages** | Homepage (13 sections), product overview, pricing, book a demo, contact | ✅ done 2026-11-19 |
| **M3 — Product pages** | Subscription, recurring billing, payments, pay links, dunning, analytics, portal, plans | ⏳ |
| **M4 — Integrations & solutions** | Gateway and accounting hubs plus per-tool pages; five solution pages; developers page | ⏳ |
| **M5 — Content & SEO/GEO** | Compare pages, resources, blog, guides, glossary, llms.txt, JSON-LD, sitemap, DE locale | ⏳ |
| **M6 — QA & launch prep** | Link check, metadata tests, Lighthouse / Core Web Vitals, accessibility, redirect verification, deployment docs | ⏳ |
| **M7+ — Application** | Modules A–J | ⛔ needs app repo or API access |

## 6. Open questions for the MYFUNDBOX team

1. **Canonical app URLs** for log in and sign up: `app.myfundbox.com`, `subscription.myfundbox.com` or `app.subscriptionbilling.eu`?
2. **Pricing model:** the price table shows flat tiers by subscriber count, but the FAQ says pricing is "based on revenue". Which is correct?
3. **Feature status:** is each of these live, in beta or planned? Instalments, quantity-based billing, 3D Secure, Instamojo, Zapier, IONOS, GitHub, usage-based billing, analytics dashboards.
4. **Company facts** for the Imprint and structured data: legal entity, registered address, founding year, contact emails.
5. **Proof points:** can "750+ members, €25m+ volume, 118k users, G2 4.9" be verified with a source? If not, they stay off the site.
6. **Assets:** a dark-text SVG logo, real product screenshots, and customer logos with permission to use them.
7. **Demo form destination:** email address, CRM (HubSpot?) or database?
8. **Hosting and deployment target** for this site, and whether it replaces myfundbox.com or runs alongside it.
