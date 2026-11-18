export interface ComparisonFeatureRow {
  capability: string;
  myfundbox: string;
  competitor: string;
}

export interface CompetitorFAQ {
  question: string;
  answer: string;
}

export interface CompetitorProfile {
  slug: string; // e.g. 'myfundbox-vs-chargebee-revrec'
  altSlug: string; // e.g. 'chargebee-revrec-alternatives'
  competitorName: string;
  competitorCategory: string;
  targetSegment: string;
  competitorPricingModel: string;
  lastReviewed: string;
  overlapNote: string;
  twoSentenceSummary: string;
  competitorStrengths: string[];
  competitorWeaknesses: string[];
  myfundboxAngle: string;
  featureComparison: ComparisonFeatureRow[];
  bestForMyfundbox: string[];
  bestForCompetitor: string[];
  migrationSteps: string[];
  pricingComparison: {
    myfundboxModel: string;
    competitorModel: string;
    summaryNote: string;
  };
  faqs: CompetitorFAQ[];
}

export const COMPETITOR_DISCLAIMER =
  'Information about third-party software is compiled from publicly available documentation and vendor pages as of the review date shown. Features, pricing models, and compliance certifications may change; confirm current specifications directly with each vendor.';

export const COMPETITORS: CompetitorProfile[] = [
  {
    slug: 'myfundbox-vs-zuora',
    altSlug: 'zuora-alternatives',
    competitorName: 'Zuora (Zuora Revenue)',
    competitorCategory: 'Enterprise Subscription & Revenue Automation Suite',
    targetSegment: 'Upper mid-market and global public enterprises',
    competitorPricingModel: 'Custom enterprise annual contract [ADD: Verified enterprise quote range]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Full overlap on standalone IFRS 15 / ASC 606 revenue recognition sub-ledger capabilities.',
    twoSentenceSummary:
      'Zuora Revenue is an enterprise-grade revenue recognition engine built primarily for large global corporations running multi-product quote-to-cash ecosystems. MYFUNDBOX focuses on European finance teams that need IFRS 15, HGB/GoBD, and recurring revenue forecasting without multi-quarter enterprise ERP implementation cycles.',
    competitorStrengths: [
      'Deep standalone selling price (SSP) allocation for complex multi-element enterprise bundles',
      'Established public-company ASC 606 and IFRS 15 compliance workflows',
      'Broad enterprise CRM and ERP ecosystem connectors',
    ],
    competitorWeaknesses: [
      'Implementation timelines and total cost of ownership are structured for large enterprises',
      'Often paired with broader Zuora Billing / CPQ suite complexity',
      'Less tailored out-of-the-box to German HGB/DATEV mid-market workflows',
    ],
    myfundboxAngle:
      'Purpose-built for EU mid-market and scaling finance teams seeking fast deployment, EU data residency, DATEV/EU ERP alignment, and transparent EUR reporting without enterprise suite bloat.',
    featureComparison: [
      { capability: 'Primary Focus', myfundbox: 'EU-first revenue management & sub-ledger', competitor: 'Enterprise quote-to-revenue suite' },
      { capability: 'Payment Processing / Billing', myfundbox: 'No (connects to existing billing tools)', competitor: 'Yes (via Zuora Billing)' },
      { capability: 'IFRS 15 / Deferred Revenue Rules', myfundbox: 'Included in core platform', competitor: 'Included via Zuora Revenue' },
      { capability: 'EU Compliance (HGB / GoBD / DATEV focus)', myfundbox: 'Designed for EU & DACH controllers [CONFIRM exports]', competitor: 'Configured via enterprise SI partners' },
      { capability: 'MRR / ARR / Cohort Analytics', myfundbox: 'Unified with recognized revenue ledger', competitor: 'Available across Zuora Analytics' },
      { capability: 'Typical Implementation Footprint', myfundbox: 'Finance-led onboarding [ADD: typical timeline]', competitor: 'Multi-month enterprise deployment' },
    ],
    bestForMyfundbox: [
      'EU-based SaaS and recurring-revenue companies (€1M–€100M ARR) prioritizing GDPR residency and IFRS 15 / HGB workflows',
      'Finance teams wanting to keep their existing billing, CRM, and ERP tools intact',
      'Controllers who need audit-ready deferred revenue schedules without dedicated SI consultants',
    ],
    bestForCompetitor: [
      'Global public enterprises managing high-volume multi-entity quote-to-cash transformations',
      'Organizations already standardized on Zuora Billing and Zuora CPQ',
      'Complex hardware-plus-software SSP allocation scenarios requiring custom SI architecture',
    ],
    migrationSteps: [
      'Export historical contract schedules, open deferred revenue balances, and active performance obligations as of your cutoff period.',
      'Connect your upstream billing and CRM data sources to MYFUNDBOX via native connectors or API.',
      'Map general ledger revenue, deferred revenue, and EU VAT accounts to match your chart of accounts.',
      'Run a parallel month-end close reconciliation comparing opening deferred balances before locking the live period.',
    ],
    pricingComparison: {
      myfundboxModel: 'Transparent EUR pricing model [ADD: tier structure / custom quote details] with no payment processing percentage fees.',
      competitorModel: 'Custom enterprise annual licensing based on revenue volume and module selection.',
      summaryNote: 'Verify current multi-year licensing and implementation fees directly with Zuora for your entity count.',
    },
    faqs: [
      {
        question: 'Is MYFUNDBOX a replacement for Zuora Billing?',
        answer:
          'No. MYFUNDBOX is revenue management software, not a billing engine or payment gateway. It compares directly with Zuora Revenue by ingesting data from your existing billing tools.',
      },
      {
        question: 'How does MYFUNDBOX differ from Zuora Revenue for German companies?',
        answer:
          'MYFUNDBOX is engineered in Germany with EU data residency, EUR defaults, EU VAT separation, and HGB/GoBD-aligned audit trails built for European controllers.',
      },
      {
        question: 'Can we migrate open deferred revenue balances from Zuora to MYFUNDBOX?',
        answer:
          'Yes. During onboarding, opening deferred revenue balances and active contract schedules are imported at a clean cutoff date and reconciled before going live.',
      },
      {
        question: 'Does MYFUNDBOX charge a percentage of payment volume?',
        answer:
          'No. Because MYFUNDBOX does not process payments, pricing is never tied to payment gateway transaction fees [ADD: confirm exact billing tier basis].',
      },
      {
        question: 'Which platform is better for a 3-person finance team?',
        answer:
          'MYFUNDBOX is built so lean CFO and controller teams can configure recognition rules and close books without a full-time systems administrator.',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-chargebee-revrec',
    altSlug: 'chargebee-revrec-alternatives',
    competitorName: 'Chargebee RevRec',
    competitorCategory: 'Subscription Billing Add-On Revenue Recognition',
    targetSegment: 'SaaS businesses, especially existing Chargebee Billing users',
    competitorPricingModel: 'Custom / tiered add-on pricing alongside or separate from Chargebee Billing [Verify]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Direct overlap on automated SaaS revenue recognition, deferred revenue waterfalls, and audit trails.',
    twoSentenceSummary:
      'Chargebee RevRec (formerly RevLock) is a revenue recognition product closely aligned with the Chargebee subscription billing ecosystem and US/global ASC 606 workflows. MYFUNDBOX is a standalone, billing-agnostic EU revenue management platform built in Germany for IFRS 15, HGB/GoBD accounting workflows, and integrated SaaS revenue forecasting.',
    competitorStrengths: [
      'Tight native workflow for companies already using Chargebee Billing',
      'Automated ASC 606 and IFRS 15 revenue schedules and journal entries',
      'Handles mid-cycle subscription upgrades, downgrades, and proration',
    ],
    competitorWeaknesses: [
      'Optimized primarily around Chargebee-centric billing stacks and US GAAP/ASC 606 framing',
      'Teams seeking unified CFO forecasting, MRR/ARR cohorts, and German HGB/DATEV alignment often require additional tooling',
      'Separate billing + revrec packaging can create vendor lock-in',
    ],
    myfundboxAngle:
      'Billing-agnostic EU revenue management uniting IFRS 15 recognition, recurring revenue metrics, forecasting, and European compliance in one GDPR-native platform.',
    featureComparison: [
      { capability: 'Independence from Billing Vendor', myfundbox: '100% billing-agnostic across sources', competitor: 'Tightly aligned with Chargebee ecosystem' },
      { capability: 'EU Residency & German HGB/GoBD Focus', myfundbox: 'Built in Germany; EU-first compliance', competitor: 'Global SaaS compliance focus' },
      { capability: 'IFRS 15 Recognition & Waterfalls', myfundbox: 'Core capability with full audit trail', competitor: 'Core capability (ASC 606 / IFRS 15)' },
      { capability: 'Revenue Forecasting & Scenario Planning', myfundbox: 'Integrated contract & cohort forecasting', competitor: 'Primarily focused on historical & scheduled rec' },
      { capability: 'MRR / ARR / NRR / Cohort Reporting', myfundbox: 'Unified with recognized ledger', competitor: 'Requires Chargebee Billing / Metrics pairing' },
      { capability: 'Payment Processing Role', myfundbox: 'None (pure revenue management)', competitor: 'Part of Chargebee billing/payment suite' },
    ],
    bestForMyfundbox: [
      'European finance teams combining multiple billing or invoicing sources (CRM contracts, Stripe, Chargebee, manual enterprise invoices)',
      'Controllers requiring IFRS 15 plus German HGB/GoBD audit readiness and EUR-first reporting',
      'CFOs wanting recognized revenue, SaaS KPIs, and revenue forecasting in a single source of truth',
    ],
    bestForCompetitor: [
      'Companies fully standardized on Chargebee Billing who want a native add-on from the same vendor',
      'US-headquartered SaaS businesses prioritizing ASC 606 over European local GAAP workflows',
    ],
    migrationSteps: [
      'Keep Chargebee Billing running if you use it for invoicing—MYFUNDBOX does not replace your billing engine.',
      'Connect your billing source and CRM contract data into MYFUNDBOX in read-only mode.',
      'Configure IFRS 15 / HGB recognition rules and reconcile one historical period against your existing waterfall.',
      'Enable automated monthly journal exports to your EU accounting or ERP system.',
    ],
    pricingComparison: {
      myfundboxModel: 'Dedicated revenue management pricing [ADD: pricing tier structure] independent of billing transaction fees.',
      competitorModel: 'Quoted based on revenue volume and Chargebee plan tier (often bundled with Chargebee Billing).',
      summaryNote: 'If you already pay for Chargebee Billing, compare standalone Chargebee RevRec add-on fees against MYFUNDBOX.',
    },
    faqs: [
      {
        question: 'Do I have to leave Chargebee Billing to use MYFUNDBOX?',
        answer:
          'No. MYFUNDBOX is not a billing engine. You can continue invoicing in Chargebee or any other billing system while managing revenue recognition and forecasting in MYFUNDBOX.',
      },
      {
        question: 'How does MYFUNDBOX compare to Chargebee RevRec on forecasting?',
        answer:
          'MYFUNDBOX combines backward-looking IFRS 15 revenue recognition with forward-looking contract backlog and cohort revenue forecasting in one workspace.',
      },
      {
        question: 'Does Chargebee RevRec support German HGB and DATEV?',
        answer:
          'Chargebee RevRec focuses primarily on ASC 606 and IFRS 15 journal exports for global ERPs; MYFUNDBOX is designed specifically around European compliance and accounting exports [CONFIRM exact DATEV spec].',
      },
      {
        question: 'Can MYFUNDBOX consolidate revenue from both Chargebee and custom enterprise invoices?',
        answer:
          'Yes. Multi-source ingestion allows self-serve subscriptions and sales-led enterprise PDFs/ERP invoices to flow into one unified revenue sub-ledger.',
      },
      {
        question: 'Which option avoids billing vendor lock-in?',
        answer:
          'MYFUNDBOX keeps your revenue sub-ledger independent from your billing and payment providers, making future billing changes non-disruptive to audit history.',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-maxio',
    altSlug: 'maxio-alternatives',
    competitorName: 'Maxio',
    competitorCategory: 'B2B SaaS Financial Operations (Billing + RevRec + Metrics)',
    targetSegment: 'US and global B2B SaaS companies (Series A–D)',
    competitorPricingModel: 'Tiered subscription based on annual billings/revenue volume [Verify public starting tiers]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Strong overlap on B2B SaaS MRR/ARR metrics, deferred revenue schedules, and audit-ready recognition.',
    twoSentenceSummary:
      'Maxio (formed from Chargify and SaaSOptics) combines B2B subscription billing, SaaS metrics, and GAAP revenue recognition primarily for North American B2B SaaS companies. MYFUNDBOX focuses strictly on pure-play EU revenue management—delivering IFRS 15, HGB/GoBD alignment, and European data residency without bundling billing.',
    competitorStrengths: [
      'Deep B2B SaaS metrics heritage from SaaSOptics (cohort retention, ARR bridges)',
      'Combines billing and revenue recognition for teams wanting both from one US vendor',
      'Strong ASC 606 audit schedules and investor reporting packs',
    ],
    competitorWeaknesses: [
      'US-first orientation (ASC 606, USD-centric defaults, US data/support alignment)',
      'Bundled billing + financial ops footprint can overlap with existing EU billing tools',
      'Limited native orientation around German HGB/GoBD and European VAT separation nuances',
    ],
    myfundboxAngle:
      'Pure EU revenue management built in Germany: get SaaS metrics, IFRS 15 recognition, and forecasting with EU data residency and without migrating off your billing tool.',
    featureComparison: [
      { capability: 'Geographic & Regulatory Center of Gravity', myfundbox: 'EU / Germany (IFRS 15, HGB, GDPR)', competitor: 'US-first (ASC 606, GAAP)' },
      { capability: 'Billing Engine Included', myfundbox: 'No (non-intrusive overlay)', competitor: 'Yes (Chargify billing heritage)' },
      { capability: 'MRR / ARR / Churn / Expansion Bridges', myfundbox: 'Included in EUR & multi-currency', competitor: 'Included (SaaSOptics heritage)' },
      { capability: 'Deferred Revenue & Accruals', myfundbox: 'Automated schedules & roll-forwards', competitor: 'Automated schedules & waterfalls' },
      { capability: 'EU VAT Separation in Revenue Reports', myfundbox: 'Native net revenue vs. VAT handling', competitor: 'Requires tax/ERP configuration' },
      { capability: 'Data Residency', myfundbox: 'EU-based hosting [CONFIRM Frankfurt]', competitor: 'US / multi-region hosting' },
    ],
    bestForMyfundbox: [
      'European B2B SaaS companies needing GDPR-native EU residency and IFRS 15 / HGB compliance',
      'Teams that already have a billing or ERP invoicing setup and do not want to adopt another billing engine',
      'German, DACH, and EU controllers seeking clean EUR and European date/number reporting',
    ],
    bestForCompetitor: [
      'US-based B2B SaaS teams seeking a single vendor for both Chargify billing and ASC 606 financial reporting',
      'Companies reporting primarily under US GAAP to North American investors',
    ],
    migrationSteps: [
      'Export active contract and ARR bridge schedules from your existing metrics or billing tool.',
      'Connect CRM and billing feeds into MYFUNDBOX without altering customer invoicing.',
      'Validate IFRS 15 recognition mappings and reconcile MRR/ARR definitions.',
      'Publish board-ready ARR bridges and period-close journal entries from MYFUNDBOX.',
    ],
    pricingComparison: {
      myfundboxModel: 'Modular EU revenue management pricing [ADD: pricing tiers] with no billing lock-in.',
      competitorModel: 'Volume-based annual SaaS contracts scaling with annual billings and add-on modules.',
      summaryNote: 'Always compare total annual cost when excluding billing modules you do not intend to use.',
    },
    faqs: [
      {
        question: 'Does MYFUNDBOX replace Chargify/Maxio billing?',
        answer:
          'No. MYFUNDBOX never issues invoices or processes payments; it serves as your revenue recognition, analytics, and forecasting layer.',
      },
      {
        question: 'Why do European SaaS CFOs choose MYFUNDBOX over US-first tools like Maxio?',
        answer:
          'EU data residency, GDPR alignment, native EUR reporting, EU VAT separation, and IFRS 15 / German HGB compliance reduce friction with European auditors.',
      },
      {
        question: 'Can MYFUNDBOX generate SaaSOptics-style ARR bridges and cohorts?',
        answer:
          'Yes. MYFUNDBOX tracks New, Expansion, Contraction, Churn, and Net Revenue Retention alongside recognized revenue.',
      },
      {
        question: 'How does audit trail documentation work?',
        answer:
          'Every recognition adjustment, contract modification, and period close entry is logged with user attribution and timestamps.',
      },
      {
        question: 'Can MYFUNDBOX handle multi-currency contracts alongside EUR?',
        answer:
          'Yes, multi-currency contracts are supported with EUR consolidated reporting [CONFIRM FX rate source].',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-stripe-revenue-recognition',
    altSlug: 'stripe-revenue-recognition-alternatives',
    competitorName: 'Stripe Revenue Recognition',
    competitorCategory: 'Payment-Gateway Native Revenue Recognition',
    targetSegment: 'Businesses processing payments primarily through Stripe',
    competitorPricingModel: 'Percentage of Stripe Billing / payment volume or custom enterprise add-on [Verify current Stripe fee schedule]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Direct overlap on automated accrual revenue waterfalls, deferred revenue tracking, and audit logs.',
    twoSentenceSummary:
      'Stripe Revenue Recognition automates accrual accounting and deferred revenue waterfalls directly for transactions processed inside the Stripe ecosystem. MYFUNDBOX is a standalone, payment-agnostic European revenue management platform that unifies revenue across Stripe, bank transfers, ERP invoices, and multiple billing tools while adding forecasting and EU compliance.',
    competitorStrengths: [
      'Zero setup friction if 100% of revenue runs through Stripe Billing and Stripe Invoicing',
      'Clean automated waterfall reports and journal entry exports for Stripe transactions',
      'Strong developer documentation and native event fidelity within Stripe',
    ],
    competitorWeaknesses: [
      'Tied to Stripe—enterprise SEPA wire transfers, custom ERP invoices, or external billing tools require workarounds',
      'Limited forward-looking revenue forecasting and CFO cohort planning compared to dedicated platforms',
      'Percentage-of-volume add-on pricing can grow rapidly as ARR scales',
    ],
    myfundboxAngle:
      'Ideal when your B2B revenue extends beyond Stripe card/checkout transactions into SEPA bank transfers, enterprise contracts, and EU ERP workflows.',
    featureComparison: [
      { capability: 'Multi-Source / Non-Stripe Revenue (SEPA, ERP, CRM)', myfundbox: 'Native multi-source ingestion', competitor: 'Primarily Stripe transactions (manual CSV import for external)' },
      { capability: 'Payment Gateway Lock-in', myfundbox: 'None (works with any PSP or bank)', competitor: 'Built around Stripe ecosystem' },
      { capability: 'Revenue Forecasting & Scenario Modeling', myfundbox: 'Dedicated forecasting engine', competitor: 'Historical & scheduled recognition only' },
      { capability: 'EU Compliance (HGB / GoBD / DATEV)', myfundbox: 'EU-first accounting structure', competitor: 'General global accrual templates' },
      { capability: 'MRR / ARR / NRR & Executive Dashboards', myfundbox: 'Full CFO & RevOps analytics suite', competitor: 'Basic SaaS metrics via Stripe Billing' },
      { capability: 'Pricing Scaling', myfundbox: 'Fixed/tiered SaaS model [ADD: model]', competitor: 'Percentage of processed volume / custom' },
    ],
    bestForMyfundbox: [
      'B2B SaaS companies mixing Stripe self-serve revenue with sales-led annual SEPA wire contracts',
      'EU controllers needing unified DATEV/ERP exports and HGB/GoBD audit documentation',
      'Finance leaders who want forecasting, SaaS KPIs, and revenue recognition in one tool',
    ],
    bestForCompetitor: [
      'Early-stage or PLG SaaS companies where virtually 100% of revenue flows through Stripe Billing',
      'Teams needing only basic monthly Stripe deferred revenue waterfalls without multi-source consolidation',
    ],
    migrationSteps: [
      'Connect your Stripe account in read-only mode alongside your CRM or ERP invoice feed.',
      'Import historical open annual contracts and non-Stripe wire-transfer agreements.',
      'Verify deferred revenue balances match your prior Stripe waterfall at cutoff.',
      'Run unified month-end close across all payment channels in MYFUNDBOX.',
    ],
    pricingComparison: {
      myfundboxModel: 'Predictable SaaS pricing [ADD: pricing structure] never taxed as a percentage of payment processing.',
      competitorModel: 'Typically priced as a percentage of Stripe volume (e.g., 0.25% per public Stripe Billing add-on listings; verify current rates).',
      summaryNote: 'As B2B ACV grows, percentage-of-volume revrec fees often exceed dedicated revenue management software.',
    },
    faqs: [
      {
        question: 'Can MYFUNDBOX ingest Stripe Billing data automatically?',
        answer:
          'Yes. MYFUNDBOX reads subscription, invoice, credit note, and refund events from Stripe while remaining completely independent of payment processing.',
      },
      {
        question: 'Why do companies outgrow Stripe Revenue Recognition?',
        answer:
          'Once B2B teams close enterprise deals via SEPA bank transfer, multi-year CRM contracts, or external invoicing, Stripe no longer sees 100% of revenue—creating manual spreadsheet gaps.',
      },
      {
        question: 'Does MYFUNDBOX handle Stripe credit notes and partial refunds?',
        answer:
          'Yes. Credit notes, proration, and partial refunds adjust future recognition and deferred revenue schedules automatically with an audit trail.',
      },
      {
        question: 'Is MYFUNDBOX a Stripe competitor for payments?',
        answer:
          'No. MYFUNDBOX does not process payments or act as a PSP. You keep Stripe (or Adyen, Mollie, GoCardless) for payments.',
      },
      {
        question: 'Does MYFUNDBOX offer revenue forecasting beyond scheduled recognition?',
        answer:
          'Yes, MYFUNDBOX includes forward-looking revenue and retention forecasting beyond existing contracted schedules.',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-netsuite-arm',
    altSlug: 'netsuite-arm-alternatives',
    competitorName: 'NetSuite Advanced Revenue Management (ARM)',
    competitorCategory: 'ERP-Embedded Revenue Recognition Module',
    targetSegment: 'Mid-market to enterprise organizations running Oracle NetSuite ERP',
    competitorPricingModel: 'Base NetSuite ERP license + ARM module license + implementation fees [Verify with Oracle NetSuite]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Direct overlap on rule-based IFRS 15 performance obligations, deferred revenue sub-ledgers, and revenue reclassification.',
    twoSentenceSummary:
      'NetSuite Advanced Revenue Management (ARM) embeds IFRS 15 and ASC 606 revenue rules directly inside the Oracle NetSuite ERP environment. MYFUNDBOX gives European finance teams a faster, dedicated revenue management layer that works with any accounting/ERP system—including DATEV, Exact, Xero, SAP, or NetSuite—while adding modern SaaS KPIs and forecasting.',
    competitorStrengths: [
      'Natively lives inside the NetSuite general ledger for organizations fully committed to NetSuite ERP',
      'Strong multi-element fair value / SSP allocation and multi-book accounting',
      'Enterprise-level multi-subsidiary consolidation inside Oracle NetSuite',
    ],
    competitorWeaknesses: [
      'Requires purchasing and implementing NetSuite ERP (high implementation cost and consultant dependency)',
      'Lacks native B2B SaaS operational analytics (MRR/ARR waterfalls, cohort retention, RevOps forecasting) without separate BI or SuiteApps',
      'Overkill for companies happy with DATEV, Xero, Exact, or existing European accounting setups',
    ],
    myfundboxAngle:
      'Get dedicated IFRS 15 revenue recognition, SaaS metrics, and forecasting in weeks—without migrating your entire general ledger to NetSuite.',
    featureComparison: [
      { capability: 'ERP Lock-in', myfundbox: 'Works alongside DATEV, SAP, Xero, Exact, or NetSuite', competitor: 'Requires Oracle NetSuite ERP' },
      { capability: 'IFRS 15 Performance Obligations', myfundbox: 'Rule-based sub-ledger schedules', competitor: 'NetSuite ARM rule engine' },
      { capability: 'SaaS Metrics (MRR, ARR, NRR, Cohorts)', myfundbox: 'Built-in natively', competitor: 'Requires custom reports or SuiteApps' },
      { capability: 'Revenue Forecasting', myfundbox: 'Built-in scenario & backlog forecasting', competitor: 'Limited outside NetSuite Planning/PBCS' },
      { capability: 'Deployment Effort', myfundbox: 'Focused finance onboarding [ADD: timeline]', competitor: 'ERP + ARM consultant implementation' },
      { capability: 'German HGB / DATEV Readiness', myfundbox: 'Built for European accounting stacks', competitor: 'Requires NetSuite DACH localization' },
    ],
    bestForMyfundbox: [
      'Companies on DATEV, Exact, Xero, or SAP that want automated revenue recognition without a full ERP migration',
      'Teams already on NetSuite who lack granular SaaS MRR/ARR cohort analytics and agile revenue forecasting',
      'CFOs seeking a single revenue workspace usable by both Accounting and RevOps',
    ],
    bestForCompetitor: [
      'Global multi-subsidiary enterprises already running NetSuite OneWorld and standardized on SuiteSuccess ERP workflows',
      'Organizations with complex physical-goods + software multi-book ERP requirements inside NetSuite',
    ],
    migrationSteps: [
      'Connect your billing and CRM systems to MYFUNDBOX without touching your underlying general ledger vendor.',
      'Map MYFUNDBOX revenue and deferred revenue accounts to your existing ERP chart of accounts.',
      'Reconcile historical deferred balances and generate clean monthly summary or detail journal exports.',
    ],
    pricingComparison: {
      myfundboxModel: 'Dedicated SaaS platform pricing [ADD: pricing details] without mandatory ERP seat or consultant overhead.',
      competitorModel: 'Annual NetSuite platform + ARM module licensing + third-party implementation fees.',
      summaryNote: 'For companies not already using NetSuite, adopting MYFUNDBOX avoids full ERP replacement costs.',
    },
    faqs: [
      {
        question: 'Do I need to replace my accounting software to use MYFUNDBOX?',
        answer:
          'No. MYFUNDBOX acts as a specialized revenue sub-ledger that exports clean journal entries into DATEV, SAP, Xero, Exact, or NetSuite.',
      },
      {
        question: 'Can MYFUNDBOX work alongside NetSuite?',
        answer:
          'Yes. Some finance teams use MYFUNDBOX to normalize multi-source SaaS contracts, calculate MRR/ARR cohorts, and feed summarized IFRS 15 journals into NetSuite.',
      },
      {
        question: 'Does NetSuite ARM include MRR, NRR, and churn dashboards out of the box?',
        answer:
          'NetSuite ARM focuses on general-ledger accounting schedules; SaaS operational metrics typically require separate SuiteApps or BI tools, whereas MYFUNDBOX includes both.',
      },
      {
        question: 'Is MYFUNDBOX suitable for German GmbHs using DATEV?',
        answer:
          'Yes. MYFUNDBOX is designed in Germany with European chart-of-accounts structures and DATEV-compatible export workflows [CONFIRM exact DATEV format].',
      },
      {
        question: 'How long does onboarding take compared to NetSuite ARM?',
        answer:
          'Because MYFUNDBOX does not replace your core ERP or banking feeds, onboarding focuses solely on revenue data and accounting rules [ADD: typical onboarding weeks].',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-sage-intacct',
    altSlug: 'sage-intacct-alternatives',
    competitorName: 'Sage Intacct',
    competitorCategory: 'Cloud ERP with Contract & Revenue Management',
    targetSegment: 'Mid-market companies in North America, UK, and expanding global teams',
    competitorPricingModel: 'Custom annual ERP + Contract Revenue Management module quote [Verify with Sage]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Overlap on SaaS contract revenue recognition, deferred revenue schedules, and SaaS financial metrics.',
    twoSentenceSummary:
      'Sage Intacct is a full cloud financial management ERP popular in the US and UK that offers an add-on Contracts & Revenue Management module for ASC 606 and IFRS 15. MYFUNDBOX delivers dedicated EU-first revenue recognition, recurring revenue analytics, and forecasting as a lightweight layer over your existing continental European accounting stack.',
    competitorStrengths: [
      'Complete cloud GL, AP/AR, and multi-entity consolidation inside one ERP',
      'Strong ASC 606 / IFRS 15 contract revenue templates and Digital Board Book for SaaS',
      'Well-established in UK, US, and English-speaking mid-market finance teams',
    ],
    competitorWeaknesses: [
      'Requires migrating your entire core general ledger to Sage Intacct',
      'Less common in continental EU / DACH accounting ecosystems built around DATEV, Exact, or SAP',
      'Higher implementation cost when you only need revenue management automation',
    ],
    myfundboxAngle:
      'Purpose-built for continental European and UK finance teams that want automated revenue recognition and SaaS forecasting without ripping out their core accounting system.',
    featureComparison: [
      { capability: 'Core Scope', myfundbox: 'Dedicated revenue management sub-ledger', competitor: 'Full cloud ERP + optional Contracts module' },
      { capability: 'EU Data Residency & Continental Compliance', myfundbox: 'German-built, GDPR & HGB/GoBD aligned', competitor: 'Strongest in US/UK GAAP markets' },
      { capability: 'IFRS 15 Recognition & Schedules', myfundbox: 'Included in core product', competitor: 'Available via Contracts add-on' },
      { capability: 'MRR / ARR / Churn / Expansion', myfundbox: 'Native real-time dashboards', competitor: 'Via Sage Intacct SaaS Intelligence / Board Book' },
      { capability: 'Works with DATEV / Exact / Xero', myfundbox: 'Yes (exports clean journals)', competitor: 'Replaces your existing GL' },
      { capability: 'Revenue Forecasting', myfundbox: 'Contract backlog + scenario modeling', competitor: 'Basic contract forecasts; advanced via Sage Planning' },
    ],
    bestForMyfundbox: [
      'EU finance teams keeping DATEV, Exact, Xero, or SAP as their statutory general ledger',
      'Fast-growing SaaS and membership businesses needing IFRS 15 automation within weeks',
      'Controllers seeking unified revenue recognition, forecasting, and SaaS metrics in EUR',
    ],
    bestForCompetitor: [
      'US or UK mid-market organizations actively replacing their entire accounting ERP (GL, AP, AR, Consolidation)',
      'Companies needing Sage Intacct Digital Board Book within an all-Sage finance suite',
    ],
    migrationSteps: [
      'Keep your statutory GL intact and connect billing/CRM data into MYFUNDBOX.',
      'Establish IFRS 15 recognition templates and deferred revenue account mappings.',
      'Reconcile historical periods and automate monthly journal exports into your GL.',
    ],
    pricingComparison: {
      myfundboxModel: 'Modular revenue management pricing [ADD: pricing tiers] without ERP replacement fees.',
      competitorModel: 'Annual ERP core + user seats + Contract Revenue Management add-on + partner implementation.',
      summaryNote: 'If you are not shopping for a new general ledger, MYFUNDBOX avoids full ERP licensing.',
    },
    faqs: [
      {
        question: 'Is MYFUNDBOX an accounting ERP like Sage Intacct?',
        answer:
          'No. MYFUNDBOX focuses exclusively on revenue management—tracking, recognizing, forecasting, and reporting revenue—and integrates with your accounting ERP.',
      },
      {
        question: 'Why might a DACH or EU team choose MYFUNDBOX over Sage Intacct?',
        answer:
          'In Germany and continental Europe, tax advisors and auditors often require keeping DATEV, Exact, or local statutory GLs. MYFUNDBOX automates revenue without forcing a GL switch.',
      },
      {
        question: 'Does MYFUNDBOX provide SaaS board metrics like ARR and NRR?',
        answer:
          'Yes. MYFUNDBOX links board-level SaaS KPIs directly to underlying recognized and contracted ledger records.',
      },
      {
        question: 'How does MYFUNDBOX handle multi-entity European groups?',
        answer:
          'Entities can be tracked separately with consolidated EUR reporting views [CONFIRM multi-entity tier availability].',
      },
      {
        question: 'Can MYFUNDBOX integrate with Sage Intacct if we already use it?',
        answer:
          'Journal export structures can be mapped to Sage Intacct GL accounts via CSV or API [CONFIRM native connector roadmap].',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-vayu',
    altSlug: 'vayu-alternatives',
    competitorName: 'Vayu',
    competitorCategory: 'B2B Usage & Contract Revenue Management',
    targetSegment: 'Modern B2B SaaS and AI/usage-based software companies',
    competitorPricingModel: 'Custom B2B SaaS pricing [Verify current Vayu tiers]',
    lastReviewed: '2026-11-18',
    overlapNote: 'Overlap on automated B2B contract ingestion, revenue recognition, and billing-to-revenue reconciliation.',
    twoSentenceSummary:
      'Vayu is a modern B2B revenue management and billing-automation platform focused heavily on complex usage-based pricing, contract-to-cash, and automated reconciliation. MYFUNDBOX differentiates as an EU-based, German-engineered revenue sub-ledger built explicitly around European compliance (IFRS 15, HGB/GoBD, EU VAT, GDPR residency) without functioning as a billing engine.',
    competitorStrengths: [
      'Strong support for complex hybrid and usage-based B2B pricing transformations',
      'Automated contract-to-billing validation and revenue reconciliation',
      'Modern API-first architecture for high-volume event metering',
    ],
    competitorWeaknesses: [
      'Heavier emphasis on usage metering & billing workflow automation than pure European statutory compliance',
      'Less tailored out of the box to German HGB/GoBD and DATEV-centric finance teams',
      'Newer vendor footprint; verify regional EU data residency and local accounting support',
    ],
    myfundboxAngle:
      'Pure revenue management built for EU finance controllers: strict separation from billing/payment execution, German HGB/GoBD and IFRS 15 rigor, and GDPR-first EU residency.',
    featureComparison: [
      { capability: 'Primary Architecture', myfundbox: 'Pure EU revenue sub-ledger & forecasting', competitor: 'Usage/contract billing & revenue automation' },
      { capability: 'EU Data Residency & German HGB/GoBD', myfundbox: 'Core product pillar', competitor: 'Global SaaS compliance focus [Verify]' },
      { capability: 'IFRS 15 Revenue Recognition', myfundbox: 'Included with audit-ready trails', competitor: 'Supported for contract & usage models' },
      { capability: 'MRR / ARR / Cohort Analytics', myfundbox: 'Included across subscriptions & retainers', competitor: 'Focused on usage & B2B contract metrics' },
      { capability: 'DATEV & European Accounting Alignment', myfundbox: 'Designed for EU controllers [CONFIRM specs]', competitor: 'General ERP integrations' },
      { capability: 'Billing / Metering Engine Role', myfundbox: 'None (pure revenue layer)', competitor: 'Includes billing & rating workflows' },
    ],
    bestForMyfundbox: [
      'EU finance leaders who want a dedicated accounting, IFRS 15, and forecasting sub-ledger separate from billing',
      'German and European companies requiring GDPR residency, EU VAT separation, and GoBD-aligned auditability',
      'Subscription, membership, and agency models needing fast time-to-value without custom usage-rating pipelines',
    ],
    bestForCompetitor: [
      'AI or infrastructure SaaS teams whose primary bottleneck is real-time usage metering and custom rating before invoicing',
      'US/global teams looking to overhaul contract-to-billing and revrec together',
    ],
    migrationSteps: [
      'Keep your current invoicing or metering setup and connect finalized invoice/contract events to MYFUNDBOX.',
      'Define IFRS 15 / HGB recognition schedules for subscriptions, setups, and recurring retainers.',
      'Reconcile deferred revenue and unbilled accruals before locking your monthly close.',
    ],
    pricingComparison: {
      myfundboxModel: 'Transparent EUR-denominated subscription [ADD: pricing model] decoupled from usage-metering infrastructure.',
      competitorModel: 'Custom enterprise quotes based on contract and event volume.',
      summaryNote: 'Confirm whether your team needs usage-billing rating or dedicated EU revenue accounting.',
    },
    faqs: [
      {
        question: 'Does MYFUNDBOX perform usage metering and invoice generation like Vayu?',
        answer:
          'No. MYFUNDBOX is strictly revenue management software—not a billing or metering engine. It ingests finalized contract, usage-invoice, and subscription data to manage recognition, analytics, and forecasting.',
      },
      {
        question: 'Which platform is more focused on German and EU statutory accounting?',
        answer:
          'MYFUNDBOX is built in Germany with EUR defaults, EU VAT separation, GDPR data residency, and IFRS 15 / HGB-oriented journal workflows.',
      },
      {
        question: 'Can MYFUNDBOX recognize revenue from usage-based invoices?',
        answer:
          'Yes. When usage charges arrive from your billing system, MYFUNDBOX recognizes them according to period-end cutoff rules alongside recurring subscriptions.',
      },
      {
        question: 'Is there an API for custom contract events?',
        answer:
          'Yes, MYFUNDBOX provides REST API and webhook ingestion alongside native connectors [CONFIRM endpoint specs].',
      },
      {
        question: 'How should CFOs decide between Vayu and MYFUNDBOX?',
        answer:
          'Choose Vayu if you need to rebuild usage-based billing and rating. Choose MYFUNDBOX if your billing works today and you need EU-compliant revenue recognition, forecasting, and SaaS analytics.',
      },
    ],
  },
  {
    slug: 'myfundbox-vs-billwerk-plus',
    altSlug: 'billwerk-plus-alternatives',
    competitorName: 'Billwerk+',
    competitorCategory: 'European Subscription Billing & Payment Management',
    targetSegment: 'DACH and European subscription businesses needing recurring billing and PSP orchestration',
    competitorPricingModel: 'Tiered subscription + payment/transaction volume pricing [Verify current Billwerk+ plans]',
    lastReviewed: '2026-11-18',
    overlapNote:
      'Partial overlap only: Billwerk+ is primarily a subscription billing and payment platform (with basic DACH accounting exports), whereas MYFUNDBOX is pure revenue management software.',
    twoSentenceSummary:
      'Billwerk+ is a European subscription management, recurring billing, and payment gateway platform built for automating checkout, invoicing, and dunning. MYFUNDBOX is not a billing engine or payment processor—it is specialized revenue management software for IFRS 15 revenue recognition, deferred revenue accruals, forecasting, and multi-source SaaS analytics.',
    competitorStrengths: [
      'Full European subscription billing, dunning, SEPA/PSP orchestration, and self-service checkout',
      'Strong DACH presence with DATEV accounting export capabilities for billed invoices',
      'GDPR-aligned European hosting and multi-currency European payment methods',
    ],
    competitorWeaknesses: [
      'Primary architecture is billing and payments—not a deep multi-source IFRS 15 revenue sub-ledger or CFO forecasting suite',
      'Does not consolidate revenue from non-Billwerk+ contracts (e.g., CRM enterprise deals or external ERPs)',
      'Limited cohort forecasting and multi-element revenue recognition rule flexibility compared to dedicated revrec platforms',
    ],
    myfundboxAngle:
      'Complementary or alternative depending on your need: keep Billwerk+ for billing if you like it, and add MYFUNDBOX for true IFRS 15 recognition, multi-source reconciliation, and revenue forecasting.',
    featureComparison: [
      { capability: 'Core Product Category', myfundbox: 'Pure revenue management (tracking, recognition, forecasting)', competitor: 'Subscription billing, invoicing & payment orchestration' },
      { capability: 'Processes Payments / Issues Customer Invoices', myfundbox: 'No', competitor: 'Yes (core function)' },
      { capability: 'IFRS 15 / HGB Deferred Revenue Engine', myfundbox: 'Deep contract & accrual sub-ledger', competitor: 'Basic billing-level accounting exports' },
      { capability: 'Multi-Source Revenue Consolidation', myfundbox: 'Unifies billing, CRM, and ERP invoices', competitor: 'Scoped to transactions billed in Billwerk+' },
      { capability: 'Revenue Forecasting & Scenario Modeling', myfundbox: 'Dedicated CFO forecasting module', competitor: 'Limited billing-side MRR reporting' },
      { capability: 'EU Residency & DACH Compliance', myfundbox: 'Germany-based, GDPR & HGB/GoBD aligned', competitor: 'European-hosted, DACH billing compliant' },
    ],
    bestForMyfundbox: [
      'Finance teams that already have billing/payments sorted (including Billwerk+ or Stripe) and need true IFRS 15 recognition and forecasting',
      'B2B companies combining subscription billing with sales-led annual contracts and manual ERP invoices',
      'Controllers requiring granular accrual schedules, unbilled receivables, and cohort forecasting',
    ],
    bestForCompetitor: [
      'Teams whose immediate priority is launching subscription checkout, SEPA Direct Debit collection, dunning, and automated customer invoicing in Europe',
    ],
    migrationSteps: [
      'Note: You do not need to replace Billwerk+ billing to adopt MYFUNDBOX.',
      'Export or sync subscription and invoice records from Billwerk+ (and any additional ERP/CRM sources) into MYFUNDBOX.',
      'Configure IFRS 15 recognition rules, deferred revenue accounts, and forecast assumptions inside MYFUNDBOX.',
    ],
    pricingComparison: {
      myfundboxModel: 'Dedicated revenue management software fee [ADD: pricing model]; zero payment transaction markups.',
      competitorModel: 'Subscription billing platform fee plus payment/transaction volume fees.',
      summaryNote: 'Billwerk+ and MYFUNDBOX solve different layers of the finance stack—billing execution vs. revenue accounting and forecasting.',
    },
    faqs: [
      {
        question: 'Are MYFUNDBOX and Billwerk+ direct competitors?',
        answer:
          'Only partially. Billwerk+ is a European subscription billing and payment platform. MYFUNDBOX does not process payments or send invoices—it manages revenue recognition, deferred revenue, analytics, and forecasting.',
      },
      {
        question: 'Can we use MYFUNDBOX together with Billwerk+?',
        answer:
          'Yes. You can continue billing customers via Billwerk+ while syncing finalized invoice data into MYFUNDBOX for IFRS 15 recognition, SaaS cohort analytics, and forecasting.',
      },
      {
        question: 'Why isn’t a billing system’s MRR report enough for financial close?',
        answer:
          'Billing tools track cash collected and invoice dates, whereas IFRS 15 and HGB require performance-obligation schedules, deferred revenue roll-forwards, unbilled accruals, and audit trails across all revenue channels.',
      },
      {
        question: 'Does MYFUNDBOX support German DATEV workflows like DACH billing tools?',
        answer:
          'Yes, MYFUNDBOX structures recognized and deferred journal exports for European accounting workflows including DATEV [CONFIRM exact DATEV export format].',
      },
      {
        question: 'When should a company look for a Billwerk+ alternative for revenue analytics?',
        answer:
          'When spreadsheets are still needed at month-end to reconcile Billwerk+ invoices with enterprise contracts, deferred revenue, and board forecasts.',
      },
    ],
  },
];

export function getCompetitorBySlug(slug: string): CompetitorProfile | undefined {
  return COMPETITORS.find((c) => c.slug === slug || c.altSlug === slug);
}
