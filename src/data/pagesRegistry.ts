import { COMPETITORS, type CompetitorProfile } from './competitorsData';
import { SITE_CONFIG } from './siteConfig';
import type { LocaleCode } from '../utils/formatting';

export type PageCategory =
  | 'home'
  | 'product'
  | 'solution'
  | 'pricing'
  | 'compare'
  | 'alternatives'
  | 'resources'
  | 'blog'
  | 'guide'
  | 'glossary'
  | 'case-studies'
  | 'about'
  | 'security'
  | 'contact'
  | 'changelog'
  | 'help'
  | 'legal';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AtAGlanceBox {
  whatItIs: string;
  whoItIsFor: string;
  keyCapabilities: string[];
  pricingModel: string;
  regionAndCompliance: string;
  integrations: string;
}

export interface PageSection {
  heading: string;
  directAnswer: string;
  bullets?: string[];
  numberedSteps?: { title: string; detail: string }[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

export interface PageMetadataEntry {
  path: string; // canonical path e.g. '/product/revenue-recognition'
  category: PageCategory;
  locale: LocaleCode;
  title: string;
  description: string;
  h1: string;
  aeoSummary: string; // 40-60 word direct answer opening
  breadcrumbs: { label: string; href: string }[];
  lastUpdated: string;
  authorId: string;
  atAGlance?: AtAGlanceBox;
  sections: PageSection[];
  faqs: FAQItem[];
  competitorData?: CompetitorProfile;
  isAltPage?: boolean;
  priority: number; // for sitemap.xml
}

const DEFAULT_AUTHOR = SITE_CONFIG.authors[0].id;
const TECH_AUTHOR = SITE_CONFIG.authors[1].id;

const CORE_PAGES: PageMetadataEntry[] = [
  // 1. HOME (EN)
  {
    path: '/',
    category: 'home',
    locale: 'en',
    title: 'MYFUNDBOX | Subscription Billing & Revenue Management Platform',
    description:
      'Manage subscriptions, recurring billing, payments, dunning and revenue reporting in one platform. Works with Stripe, GoCardless, Mollie, PayPal and Checkout.com.',
    h1: 'Take Control of Your Revenue. Focus on Growing Your Business.',
    aeoSummary:
      'MYFUNDBOX is a revenue management platform for subscription businesses. It brings plans, one-time and recurring billing, payments through Stripe, GoCardless, Mollie, PayPal and Checkout.com, automatic failed-payment recovery, a customer self-service portal and revenue reporting into one place, with data stored in Frankfurt.',
    breadcrumbs: [{ label: 'Home', href: '/' }],
    lastUpdated: '2026-11-19',
    authorId: DEFAULT_AUTHOR,
    priority: 1.0,
    atAGlance: {
      whatItIs: 'A subscription billing and revenue management platform: plans, billing, payments, dunning, customer portal and reporting in one place.',
      whoItIsFor: 'SaaS companies, subscription and membership businesses, digital businesses and agencies with recurring revenue.',
      keyCapabilities: [
        'One-time and recurring billing with plans, add-ons, coupons and trials',
        'Payments through multiple gateways and methods',
        'Smart dunning with automatic retries and reminders',
        'Hosted checkout, pay links and a customer portal',
      ],
      pricingModel: 'Free plan for up to 25 subscribers; paid plans billed monthly or annually. See the pricing page for current plans.',
      regionAndCompliance: 'Data stored in Frankfurt, Germany · GDPR Data Processing Agreement · Two-factor authentication',
      integrations: 'Stripe, GoCardless, Mollie, PayPal, Checkout.com, QuickBooks, Xero, sevdesk, Lexware, Avalara, REST API & webhooks',
    },
    sections: [
      {
        heading: 'Why does subscription revenue get hard to manage?',
        directAnswer:
          'As a subscription business grows, plans, invoices, payments and customer changes end up spread across separate tools. Failed payments slip through, customers wait on support for simple changes, and revenue figures have to be rebuilt by hand. MYFUNDBOX brings all of it into one platform.',
        bullets: [
          'Plans, billing and payments are managed in one place instead of several tools.',
          'Failed payments are retried and followed up automatically.',
          'Customers update cards, plans and details themselves in a self-service portal.',
        ],
      },
      {
        heading: 'How does MYFUNDBOX work?',
        directAnswer:
          'Set up your plans, connect the payment gateways you already use, and MYFUNDBOX runs billing, collection and reporting automatically from then on.',
        numberedSteps: [
          {
            title: 'Create your plans and checkout',
            detail: 'Define one-time or recurring products with add-ons, coupons and trials, then publish a hosted checkout or pay link.',
          },
          {
            title: 'Connect your payment gateways',
            detail: 'Link Stripe, GoCardless, Mollie, PayPal or Checkout.com and offer cards, SEPA, ACH, bank transfer or open banking.',
          },
          {
            title: 'Automate billing and track revenue',
            detail: 'Renewals, invoices and failed-payment recovery run on their own while you follow revenue, subscriptions and payments live.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is MYFUNDBOX?',
        answer:
          'MYFUNDBOX is a revenue management platform for subscription businesses. It handles plans, one-time and recurring billing, payments, failed-payment recovery, a customer portal and revenue reporting in one place.',
      },
      {
        question: 'Which payment gateways does MYFUNDBOX work with?',
        answer:
          'MYFUNDBOX works with Stripe, GoCardless, Mollie, PayPal and Checkout.com. Depending on the gateway, customers can pay by card, SEPA Direct Debit, ACH, bank transfer or open banking.',
      },
      {
        question: 'What happens when a customer’s payment fails?',
        answer:
          'Smart dunning retries the payment automatically and sends reminder emails on the schedule you set, so customers can update their payment details before the subscription lapses.',
      },
      {
        question: 'Can customers manage their own subscriptions?',
        answer:
          'Yes. The customer portal lets customers update their card, change plans and view invoices without contacting your team.',
      },
      {
        question: 'Where is my data stored?',
        answer:
          'MYFUNDBOX stores data in Frankfurt, Germany, and offers a Data Processing Agreement for GDPR. Accounts can be protected with two-factor authentication.',
      },
      {
        question: 'Is there a free plan?',
        answer:
          'Yes. The Free plan covers up to 25 subscribers. Paid plans add more subscribers and features; see the pricing page for current plans.',
      },
      {
        question: 'Does MYFUNDBOX have an API?',
        answer:
          'Yes. A REST API and webhooks are available, with documentation at docs.myfundbox.com.',
      },
    ],
  },

  // 1b. PRODUCT OVERVIEW
  {
    path: '/product',
    category: 'product',
    locale: 'en',
    title: 'Product Overview | MYFUNDBOX Subscription Billing Platform',
    description:
      'Explore the full MYFUNDBOX platform: subscription management, multi-gateway payments, hosted checkout, pay links, smart dunning, and customer self-service.',
    h1: 'Everything you need to launch, bill, and retain subscriptions',
    aeoSummary:
      'The MYFUNDBOX product suite combines subscription lifecycle management, multi-gateway payment processing across Stripe, GoCardless, Mollie, and PayPal, hosted checkout, shareable pay links, automated dunning, customer self-service, and European accounting sync into one unified platform with zero revenue fees.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product' },
    ],
    lastUpdated: '2026-11-19',
    authorId: DEFAULT_AUTHOR,
    priority: 0.95,
    atAGlance: {
      whatItIs: 'Unified European subscription billing and multi-gateway payment management platform.',
      whoItIsFor: 'SaaS companies, digital subscription businesses, agencies, and membership organizations.',
      keyCapabilities: [
        'Multi-gateway payment orchestration (Stripe, GoCardless, Mollie, PayPal)',
        'Subscription plan builder, trials, discount coupons, and add-ons',
        'Mobile-optimized hosted checkout and instant shareable Pay Links',
        'Smart dunning with automated retry schedules and card recovery',
        'White-labeled customer self-service portal (My Portal)',
        'European VAT ID validation and accounting sync (sevDesk, Lexware, Xero, QBO)',
      ],
      pricingModel: 'Free tier up to 25 subscribers; Professional €199/mo; Advanced €399/mo. 0% volume cut.',
      regionAndCompliance: 'Frankfurt am Maln, Germany · GDPR Data Processing Agreement · 3DS2 & 2FA',
      integrations: 'Stripe, GoCardless, Mollie, PayPal, Checkout.com, QuickBooks, Xero, sevDesk, Lexware, Avalara, REST API & Webhooks',
    },
    sections: [
      {
        heading: 'How do the MYFUNDBOX platform modules connect together?',
        directAnswer:
          'MYFUNDBOX coordinates the entire subscription lifecycle: customer signup via hosted checkout or Pay Links, recurring charge execution across your chosen payment gateway, automated invoice generation with EU VAT validation, and self-service account management through the customer portal.',
        bullets: [
          'Choose your payment gateway for each currency or payment rail (cards, SEPA, iDEAL).',
          'Automate recurring billing schedules with prorated upgrades, downgrades, and trial conversions.',
          'Protect recurring revenue with automated card expiration reminders and smart retries.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I connect multiple payment gateways simultaneously?',
        answer:
          'Yes. MYFUNDBOX lets you run Stripe, GoCardless (SEPA), Mollie, and PayPal side-by-side on the same account, routing customers to the best local payment rail.',
      },
      {
        question: 'Does MYFUNDBOX hold or delay customer funds?',
        answer:
          'No. Payments process directly through your connected merchant accounts and deposit into your corporate bank account according to your standard processor schedule.',
      },
      {
        question: 'How does the customer self-service portal work?',
        answer:
          'Subscribers receive a secure link or portal login where they can update payment cards, view billing history, download VAT invoices, and manage plan tiers without contacting support.',
      },
    ],
  },

  // 2. PRODUCT PAGES (5)
  {
    path: '/product/revenue-recognition',
    category: 'product',
    locale: 'en',
    title: 'IFRS 15 Revenue Recognition Software | MYFUNDBOX',
    description:
      'Automate IFRS 15 and HGB revenue recognition across subscriptions, setups, and mid-term modifications with full audit trails in EUR.',
    h1: 'Automated IFRS 15 revenue recognition software for European finance teams',
    aeoSummary:
      'MYFUNDBOX Revenue Recognition translates raw subscription, contract, and credit note events into IFRS 15 and HGB-compliant recognition schedules. Finance controllers configure rule-based performance obligations once and generate immutable monthly journal entries without manual spreadsheet waterfalls.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product/revenue-recognition' },
      { label: 'Revenue Recognition', href: '/product/revenue-recognition' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.95,
    atAGlance: {
      whatItIs: 'Rule-based IFRS 15 & HGB revenue recognition engine built for recurring and contract-based businesses.',
      whoItIsFor: 'Controllers, Chief Accountants, and CFOs preparing monthly closes and annual statutory audits.',
      keyCapabilities: [
        'Daily exact-day and monthly straight-line recognition',
        'Performance obligation bundling & standalone selling price (SSP) splits',
        'Mid-term contract upgrades, downgrades, pauses & credit notes',
        'Immutable audit trail linked to source invoice IDs',
      ],
      pricingModel: 'Included in MYFUNDBOX platform plans [ADD: Tier pricing]',
      regionAndCompliance: 'IFRS 15 · German HGB · GoBD-aligned immutability · EU VAT separation',
      integrations: 'DATEV, SAP, Xero, Exact, NetSuite, Stripe Billing, Chargebee, HubSpot, Salesforce',
    },
    sections: [
      {
        heading: 'How does MYFUNDBOX handle the 5-step IFRS 15 model?',
        directAnswer:
          'MYFUNDBOX operationalizes the five-step IFRS 15 framework by linking CRM deal terms and billing line items to standardized performance obligations, transaction prices net of EU VAT, and automated over-time or point-in-time recognition schedules.',
        table: {
          caption: 'IFRS 15 workflow mapping inside MYFUNDBOX',
          headers: ['IFRS 15 Step', 'Accounting Requirement', 'How MYFUNDBOX Automates It'],
          rows: [
            ['1. Identify Contract', 'Approve commercial terms and collectability', 'Ingests signed CRM/ERP contract and subscription records with effective dates'],
            ['2. Performance Obligations', 'Separate distinct SaaS, onboarding, and support services', 'Maps SKU and line-item rules to distinct recognition templates'],
            ['3. Transaction Price', 'Determine consideration net of discounts and VAT', 'Strips EU VAT, applies credit notes, and isolates net consideration in EUR'],
            ['4. Allocate Price', 'Distribute transaction price across obligations', 'Applies configurable SSP allocation rules across bundled line items'],
            ['5. Recognize Revenue', 'Recognize as obligations are satisfied over time or point-in-time', 'Generates daily/monthly pro-rata schedules and period-close GL journals'],
          ],
        },
      },
      {
        heading: 'How are contract modifications and cancellations processed?',
        directAnswer:
          'When a customer upgrades seats, switches from monthly to annual billing, or receives a partial credit note, MYFUNDBOX recalculates remaining unrecognized revenue prospectively or via catch-up adjustment while preserving locked historical periods.',
        bullets: [
          'Closed accounting periods remain strictly locked to protect GoBD and statutory audit integrity.',
          'Prospective adjustments flow transparently into future months without retroactively rewriting past trial balances.',
          'Every rule override requires role-based permission and records user ID, timestamp, and reason code.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can MYFUNDBOX split onboarding fees from recurring SaaS subscriptions?',
        answer:
          'Yes. Distinct line items can follow separate recognition schedules—for example, recognizing implementation milestones upon delivery while amortizing the software subscription straight-line over 12 months.',
      },
      {
        question: 'Does MYFUNDBOX support daily exact-day proration as well as monthly?',
        answer:
          'Yes. Controllers can select exact daily proration (e.g., 28/30/31-day or 365-day conventions) or standard 1/12th monthly recognition per entity policy.',
      },
      {
        question: 'How does the system protect closed months during an audit?',
        answer:
          'Once a period is closed in MYFUNDBOX, journal entries are locked; any subsequent invoice backdating posts as a documented adjustment in the current open period.',
      },
      {
        question: 'Does MYFUNDBOX generate customer invoices?',
        answer:
          'No. MYFUNDBOX reads invoice data from your billing or ERP system and never sends invoices or processes customer payments.',
      },
      {
        question: 'Is US GAAP ASC 606 supported for EU subsidiaries with US parents?',
        answer:
          'Yes. The underlying five-step contract and performance obligation framework aligns closely with both IFRS 15 and ASC 606 reporting needs.',
      },
    ],
  },
  {
    path: '/product/revenue-reporting',
    category: 'product',
    locale: 'en',
    title: 'Recurring Revenue Reporting & MRR/ARR Analytics | MYFUNDBOX',
    description:
      'Audit-ready MRR, ARR, NRR, churn, expansion, and cohort dashboards reconciled directly to recognized revenue in EUR.',
    h1: 'Recurring revenue reporting and SaaS analytics reconciled to your ledger',
    aeoSummary:
      'MYFUNDBOX Revenue Reporting unifies board-level SaaS KPIs—MRR, ARR, Net Revenue Retention, churn, and cohorts—with your GAAP/IFRS recognized revenue sub-ledger. Unlike standalone dashboard tools, every movement traces down to verified invoices, contract dates, and net-of-VAT amounts.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product/revenue-reporting' },
      { label: 'Revenue Reporting & Analytics', href: '/product/revenue-reporting' },
    ],
    lastUpdated: '2026-11-18',
    authorId: TECH_AUTHOR,
    priority: 0.9,
    atAGlance: {
      whatItIs: 'Finance-grade recurring revenue analytics bridging RevOps KPIs and statutory accounting.',
      whoItIsFor: 'CFOs, FP&A leads, RevOps managers, and board-reporting finance teams.',
      keyCapabilities: [
        'MRR & ARR waterfall bridges (New, Expansion, Contraction, Churn)',
        'Gross and Net Revenue Retention (GRR / NRR) by cohort',
        'Billings vs. Bookings vs. Recognized Revenue reconciliation',
        'Role-based board and investor CSV/PDF/API exports',
      ],
      pricingModel: 'Included in MYFUNDBOX plans [ADD: Tier details]',
      regionAndCompliance: 'EUR default · European number/date conventions · EU VAT excluded from MRR/ARR',
      integrations: 'HubSpot, Salesforce, Stripe Billing, Chargebee, ERP invoice feeds',
    },
    sections: [
      {
        heading: 'Why do RevOps MRR dashboards often disagree with Accounting revenue?',
        directAnswer:
          'CRM and payment-gateway dashboards frequently mix gross invoiced amounts (including VAT), one-time setup fees, and cash collection dates with recurring run-rate. MYFUNDBOX normalizes contracts cleanly so RevOps and Controllers report from one reconciled definition.',
        bullets: [
          'Excludes one-time implementation fees and EU VAT from MRR/ARR calculations automatically.',
          'Links every MRR bridge movement directly to customer IDs and underlying contract modifications.',
          'Provides side-by-side reconciliation between Bookings, Billings, Cash Collected, and IFRS 15 Recognized Revenue.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which recurring revenue metrics are tracked natively?',
        answer:
          'MYFUNDBOX tracks MRR, ARR, New Business, Expansion, Contraction, Logo Churn, Revenue Churn, GRR, NRR, ARPA, and time-based cohort retention.',
      },
      {
        question: 'Can we segment cohorts by customer tier, country, or sales channel?',
        answer:
          'Yes. Dimensions synced from your CRM or ERP (region, plan, segment, billing cadence) filter all waterfalls and cohort tables.',
      },
      {
        question: 'Are one-time fees excluded from MRR and ARR?',
        answer:
          'Yes. Non-recurring implementation or setup items are categorized separately from recurring subscription MRR/ARR.',
      },
      {
        question: 'Can stakeholders view read-only dashboards without editing accounting rules?',
        answer:
          'Yes. Role-based permissions separate controller/admin rule-editing rights from executive and RevOps read-only analytics access.',
      },
      {
        question: 'Does MYFUNDBOX replace our payment gateway analytics?',
        answer:
          'It consolidates recurring revenue across all payment gateways and manual SEPA/ERP invoices into one finance-approved view.',
      },
    ],
  },
  {
    path: '/product/revenue-forecasting',
    category: 'product',
    locale: 'en',
    title: 'SaaS & Subscription Revenue Forecasting Software | MYFUNDBOX',
    description:
      'Forecast recognized revenue, deferred revenue burn-down, and recurring renewals using live contract data and retention scenarios.',
    h1: 'Revenue forecasting grounded in contracted schedules and cohort retention',
    aeoSummary:
      'MYFUNDBOX Revenue Forecasting projects future recognized revenue, deferred revenue burn-down, and renewal cash inflows directly from active customer contracts. Finance teams model conservative, base, and expansion scenarios without rebuilding fragile multi-tab spreadsheet forecasts every month.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product/revenue-forecasting' },
      { label: 'Revenue Forecasting', href: '/product/revenue-forecasting' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.9,
    atAGlance: {
      whatItIs: 'Contract-driven recognized revenue and recurring renewal forecasting engine.',
      whoItIsFor: 'CFOs, FP&A managers, and finance leaders running rolling 12–36 month plans.',
      keyCapabilities: [
        'Contracted backlog & deferred revenue burn-down projections',
        'Renewal, churn, and expansion scenario assumptions',
        'Actuals vs. forecast variance tracking by month',
        'Separation of contracted committed revenue vs. pipeline upside',
      ],
      pricingModel: 'Included / Add-on module [ADD: tier specification]',
      regionAndCompliance: 'EUR consolidated forecasting · EU multi-entity support [CONFIRM]',
      integrations: 'CRM pipeline (HubSpot/Salesforce) + live sub-ledger schedules',
    },
    sections: [
      {
        heading: 'How is revenue forecasting different from cash flow forecasting?',
        directAnswer:
          'Cash flow forecasting estimates when invoices are paid in the bank, whereas revenue forecasting projects when contracted obligations become earned P&L revenue under IFRS 15. MYFUNDBOX separates committed deferred burn-down from renewal and new-business assumptions.',
        numberedSteps: [
          {
            title: 'Lock committed backlog from deferred revenue',
            detail: 'Automatically project guaranteed future recognition from signed, non-cancellable contracts already in your sub-ledger.',
          },
          {
            title: 'Layer empirical cohort retention and expansion',
            detail: 'Apply historical GRR/NRR benchmarks or custom renewal probabilities to upcoming contract end dates.',
          },
          {
            title: 'Compare forecast vs. actual close monthly',
            detail: 'Track P&L variance between prior forecast snapshots and actual closed IFRS 15 recognized revenue.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Does MYFUNDBOX separate committed revenue from projected renewals?',
        answer:
          'Yes. Forecasts clearly distinguish locked contracted backlog from assumption-based renewals and CRM pipeline scenarios.',
      },
      {
        question: 'Can we run sensitivity scenarios for churn or annual billing mix?',
        answer:
          'Yes. Finance teams can adjust churn, expansion, and annual-prepaid mix drivers to compare upside and downside P&L cases.',
      },
      {
        question: 'How far ahead can MYFUNDBOX project deferred revenue burn-down?',
        answer:
          'Schedules project across the full remaining life of active contracts (12, 24, or 36+ months).',
      },
      {
        question: 'Are forecast snapshots archived for board comparisons?',
        answer:
          'Yes. Monthly forecast baselines can be saved to compare actual close performance against prior budget versions.',
      },
      {
        question: 'Can forecast tables be exported for FP&A consolidation?',
        answer:
          'Yes, monthly P&L and balance-sheet roll-forward projections export cleanly to CSV/Excel or via API.',
      },
    ],
  },
  {
    path: '/product/deferred-revenue-accruals',
    category: 'product',
    locale: 'en',
    title: 'Deferred Revenue & Accruals Automation Software | MYFUNDBOX',
    description:
      'Automate deferred revenue roll-forwards, unbilled receivables, and HGB/IFRS 15 period-end accruals with full invoice traceability.',
    h1: 'Automated deferred revenue schedules and period-end accruals',
    aeoSummary:
      'MYFUNDBOX automates deferred revenue (passive Rechnungsabgrenzungsposten / PRAP) and accrued unbilled revenue schedules at customer and contract level. Controllers eliminate manual month-end cutoff spreadsheets and reconcile opening-to-closing balance sheet movements down to every individual invoice.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product/deferred-revenue-accruals' },
      { label: 'Deferred Revenue & Accruals', href: '/product/deferred-revenue-accruals' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.9,
    atAGlance: {
      whatItIs: 'Sub-ledger engine for deferred revenue liabilities, contract assets, and monthly accruals.',
      whoItIsFor: 'Financial controllers, senior accountants, and external auditors.',
      keyCapabilities: [
        'Opening + Billings - Recognized = Closing roll-forward reports',
        'Short-term (<12m) vs. long-term (>12m) deferred split',
        'Unbilled revenue (accrued assets) when delivery precedes invoicing',
        'Customer-level balance sheet tie-out for year-end audits',
      ],
      pricingModel: 'Included in core MYFUNDBOX platform [ADD: tier details]',
      regionAndCompliance: 'IFRS 15 contract liabilities/assets · German HGB PRAP/ARAP · DATEV-ready structure',
      integrations: 'DATEV, SAP, Exact, Xero, NetSuite, Stripe Billing, Chargebee',
    },
    sections: [
      {
        heading: 'How does the deferred revenue roll-forward tie out to your balance sheet?',
        directAnswer:
          'Every euro billed in advance enters the deferred revenue liability account (net of VAT) and amortizes cleanly into recognized revenue over the service period. MYFUNDBOX generates an auditable waterfall connecting opening balance, new billings, adjustments, recognized revenue, and ending balance.',
        bullets: [
          'Separates current (≤12 months) and non-current (>12 months) deferred revenue for multi-year prepayments.',
          'Tracks accrued/unbilled receivables when service delivery starts before the billing run.',
          'Drill down from any general ledger balance directly to the underlying contracts and invoices.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does MYFUNDBOX distinguish short-term and long-term deferred revenue?',
        answer:
          'Yes. Multi-year prepaid contracts automatically split recognition schedules between current (<12 months) and non-current (>12 months) liabilities.',
      },
      {
        question: 'What happens if a service begins before an invoice is issued?',
        answer:
          'MYFUNDBOX records accrued (unbilled) revenue for the delivered period and reverses it automatically once the invoice posts.',
      },
      {
        question: 'How does this align with German HGB Rechnungsabgrenzungsposten (PRAP)?',
        answer:
          'Prepaid annual or multi-year fees collected before the balance-sheet date are systematically deferred across future periods in line with HGB accrual principles.',
      },
      {
        question: 'Can auditors inspect individual contract schedules in read-only mode?',
        answer:
          'Yes. Role-based permissions allow external auditors or tax advisors read-only access to schedules and audit logs.',
      },
      {
        question: 'How are credit notes handled in deferred revenue?',
        answer:
          'Credit notes reduce remaining unrecognized deferred revenue or post documented catch-up reversals depending on your policy configuration.',
      },
    ],
  },
  {
    path: '/product/integrations-api',
    category: 'product',
    locale: 'en',
    title: 'Revenue Management Integrations & REST API | MYFUNDBOX',
    description:
      'Connect billing, CRM, and European accounting tools like DATEV, SAP, Xero, Exact, Stripe Billing, and HubSpot via connectors or REST API.',
    h1: 'Integrations and API for your existing billing, CRM, and EU accounting stack',
    aeoSummary:
      'MYFUNDBOX connects in read-only mode to your upstream billing and CRM tools while exporting balanced revenue journals to your European accounting or ERP system. Keep your existing payment gateways and invoicing workflows intact while unifying revenue accounting through native connectors, webhooks, and REST APIs.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Product', href: '/product/integrations-api' },
      { label: 'Integrations & API', href: '/product/integrations-api' },
    ],
    lastUpdated: '2026-11-18',
    authorId: TECH_AUTHOR,
    priority: 0.85,
    atAGlance: {
      whatItIs: 'Non-intrusive integration layer linking upstream revenue data with downstream EU accounting.',
      whoItIsFor: 'Finance Systems Leads, Controllers, RevOps Engineers, and CTOs.',
      keyCapabilities: [
        'Upstream billing & payment data sync (read-only)',
        'CRM contract & amendment ingestion',
        'Downstream GL journal exports (DATEV, ERP, CSV)',
        'REST API & idempotent webhooks for custom pipelines',
      ],
      pricingModel: 'Standard connectors included; custom API volume [ADD: tier details]',
      regionAndCompliance: 'EU-hosted API endpoints · Encrypted transit/rest · Role-scoped API keys',
      integrations: 'DATEV [CONFIRM], SAP [CONFIRM], Xero, Exact, NetSuite, Stripe Billing, Chargebee, HubSpot, Salesforce',
    },
    sections: [
      {
        heading: 'Which systems integrate with MYFUNDBOX?',
        directAnswer:
          'MYFUNDBOX bridges upstream commercial systems (where deals and invoices originate) with downstream general ledgers (where statutory books live). Integration scopes below mark items requiring confirmation against your specific tenant configuration.',
        table: {
          caption: 'Integration matrix by stack layer (confirm active tenant connectors during demo)',
          headers: ['Stack Layer', 'Systems', 'Direction & Purpose', 'Status'],
          rows: [
            ['Accounting & ERP', 'DATEV, SAP, Exact Online, Xero, NetSuite', 'Outbound journal entries (recognized, deferred, VAT-netted)', '[CONFIRM specific connector availability]'],
            ['Billing & Subscriptions', 'Stripe Billing, Chargebee, custom ERP invoices', 'Inbound invoices, credit notes, subscriptions, proration events', '[CONFIRM active billing sources]'],
            ['CRM & Contracts', 'HubSpot, Salesforce', 'Inbound deal dates, contract terms, expansion amendments', '[CONFIRM CRM mapping scope]'],
            ['Custom Data Pipeline', 'REST API, Webhooks, CSV / SFTP Batch', 'Programmatic contract & usage-invoice ingestion', '[CONFIRM OpenAPI documentation access]'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Does MYFUNDBOX write changes back into our billing system or charge customers?',
        answer:
          'Never. Upstream billing integrations are strictly read-only. MYFUNDBOX never triggers charges, modifies customer payment methods, or sends invoices.',
      },
      {
        question: 'How does DATEV export work for German tax advisors (Steuerberater)?',
        answer:
          'MYFUNDBOX structures monthly recognition, deferral, and reversal entries mapped to SKR03/SKR04-style account structures [CONFIRM exact DATEV Buchungsstapel CSV/API spec].',
      },
      {
        question: 'Can we push custom enterprise contracts via REST API?',
        answer:
          'Yes. Custom back-office or proprietary billing systems can stream contract and invoice events into MYFUNDBOX via authenticated REST endpoints.',
      },
      {
        question: 'How are duplicate events prevented?',
        answer:
          'Ingestion pipelines enforce idempotency keys on invoice and contract event IDs so retries never double-count recognized revenue.',
      },
      {
        question: 'Can we import historical CSV data during onboarding?',
        answer:
          'Yes. Historical open contracts and opening deferred revenue balances can be imported via validated CSV templates.',
      },
    ],
  },

  // 3. SOLUTIONS PAGES (5)
  {
    path: '/solutions/saas',
    category: 'solution',
    locale: 'en',
    title: 'Revenue Management Software for B2B SaaS | MYFUNDBOX',
    description:
      'Automate IFRS 15 revenue recognition, seat-upgrade proration, ARR waterfalls, and forecasts for European B2B SaaS teams.',
    h1: 'Revenue management for European B2B SaaS companies',
    aeoSummary:
      'European B2B SaaS companies use MYFUNDBOX to reconcile self-serve subscription billing with sales-led annual SEPA contracts in one sub-ledger. Automate IFRS 15 recognition across seat upgrades, ramp deals, and multi-year prepayments while tracking unified MRR, ARR, and Net Revenue Retention.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions/saas' },
      { label: 'B2B SaaS', href: '/solutions/saas' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [
      {
        heading: 'What SaaS revenue challenges does MYFUNDBOX solve?',
        directAnswer:
          'Hybrid B2B SaaS businesses outgrow gateway-only metrics the moment enterprise deals are closed via CRM contracts and SEPA bank transfers. MYFUNDBOX unifies PLG subscriptions and enterprise orders into a single IFRS 15 recognition and ARR analytics engine.',
        bullets: [
          'Handles mid-cycle seat upgrades, downgrades, and annual-to-multi-year switches without manual spreadsheets.',
          'Separates one-time implementation fees from recurring SaaS licenses under IFRS 15.',
          'Delivers investor-grade ARR bridges and NRR cohorts in EUR.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can MYFUNDBOX handle ramped multi-year SaaS contracts?',
        answer:
          'Yes. Custom contract schedules accommodate stepped pricing, free trial months, and multi-year upfront prepayments.',
      },
      {
        question: 'How does it combine Stripe self-serve and SEPA enterprise invoices?',
        answer:
          'Both streams normalize into one customer-level revenue ledger without changing how customers pay.',
      },
      {
        question: 'Does MYFUNDBOX calculate Net Revenue Retention (NRR)?',
        answer:
          'Yes, NRR and GRR are computed automatically across monthly and annual customer cohorts.',
      },
      {
        question: 'Is MYFUNDBOX suited for Seed to Series C European SaaS?',
        answer:
          'Yes, particularly once annual prepayments, multi-entity audits, or hybrid billing break manual Excel models.',
      },
      {
        question: 'Can we track EUR alongside USD or GBP contracts?',
        answer:
          'Yes, multi-currency agreements convert cleanly to EUR for consolidated SaaS reporting [CONFIRM FX policy].',
      },
    ],
  },
  {
    path: '/solutions/digital-services',
    category: 'solution',
    locale: 'en',
    title: 'Revenue Management for Digital Services & Media | MYFUNDBOX',
    description:
      'Recognize prepaid digital subscriptions, bundle offers, and multi-country EU VAT-adjusted revenue accurately with MYFUNDBOX.',
    h1: 'Revenue recognition and analytics for digital services and media',
    aeoSummary:
      'Digital publishers, software marketplaces, and media platforms rely on MYFUNDBOX to amortize prepaid annual passes, isolate cross-border EU VAT rates before recognizing revenue, and track subscriber cohort retention across European markets without touching checkout or payment processing.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions/digital-services' },
      { label: 'Digital Services & Media', href: '/solutions/digital-services' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.8,
    sections: [
      {
        heading: 'Why is EU VAT separation critical in digital media revenue reporting?',
        directAnswer:
          'Digital services sold across EU member states carry varying local VAT rates (OSS/MOSS). Reporting gross checkout totals as MRR distorts unit economics and violates IFRS 15; MYFUNDBOX isolates net revenue per jurisdiction automatically.',
        bullets: [
          'Tracks high-volume consumer and prosumer prepaid subscriptions without slowing down close.',
          'Separates promotional discount periods and partial refunds cleanly.',
          'Forecasts renewal cohorts by acquisition period and billing cadence.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does MYFUNDBOX strip varying EU VAT rates automatically?',
        answer:
          'Yes. Tax amounts on ingested invoices are mapped to VAT liability accounts so recognized revenue and MRR always reflect net consideration.',
      },
      {
        question: 'Can it handle high-volume annual digital passes?',
        answer:
          'Yes. Prepaid annual subscriptions amortize automatically over 12 months with consolidated monthly GL journal summaries.',
      },
      {
        question: 'Does MYFUNDBOX replace our paywall or payment gateway?',
        answer:
          'No. You keep your existing paywall, app store, or payment provider and feed finalized billing events into MYFUNDBOX.',
      },
      {
        question: 'How are refunds and chargebacks reflected?',
        answer:
          'Refunds and credit notes adjust deferred liabilities or recognized periods cleanly with full audit linkage.',
      },
      {
        question: 'Can media teams forecast subscription renewals?',
        answer:
          'Yes, cohort retention models project expected renewal revenue across monthly and annual subscriber groups.',
      },
    ],
  },
  {
    path: '/solutions/memberships',
    category: 'solution',
    locale: 'en',
    title: 'Deferred Revenue Software for Memberships & Associations | MYFUNDBOX',
    description:
      'Prorate annual membership dues, manage deferred liability schedules, and track renewal retention under European accounting rules.',
    h1: 'Deferred revenue and retention clarity for membership organizations',
    aeoSummary:
      'Membership organizations, B2B networks, and professional associations collect annual dues upfront while delivering member benefits over twelve months. MYFUNDBOX automates straight-line dues recognition, tracks deferred liabilities cleanly for year-end audits, and forecasts member renewal retention.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions/memberships' },
      { label: 'Memberships', href: '/solutions/memberships' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.8,
    sections: [
      {
        heading: 'How should annual membership dues be recognized?',
        directAnswer:
          'Under IFRS 15 and European accrual accounting (HGB), annual membership fees collected upfront represent deferred revenue (a liability) on day one and must be recognized proportionally across the twelve-month membership term.',
        bullets: [
          'Separates recurring membership dues from point-in-time event tickets or sponsorships.',
          'Eliminates year-end audit scrambling over active vs. expired member periods.',
          'Provides clear renewal rate and cohort retention tracking by member tier.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can MYFUNDBOX separate annual dues from one-off conference fees?',
        answer:
          'Yes. Dues amortize over the membership term while event fees recognize on the event delivery date.',
      },
      {
        question: 'What if members join mid-month?',
        answer:
          'Daily proration options recognize exact service days in the joining and expiring months.',
      },
      {
        question: 'Does MYFUNDBOX collect membership payments?',
        answer:
          'No. It connects to your existing membership or billing platform purely for revenue accounting and forecasting.',
      },
      {
        question: 'Is it compliant with German HGB accrual rules?',
        answer:
          'Yes, automated PRAP schedules align with period-accurate accrual accounting.',
      },
      {
        question: 'Can finance committees view renewal forecasts?',
        answer:
          'Yes, read-only forecast and retention dashboards export cleanly for board and committee reviews.',
      },
    ],
  },
  {
    path: '/solutions/agencies',
    category: 'solution',
    locale: 'en',
    title: 'Retainer & Milestone Revenue Management for Agencies | MYFUNDBOX',
    description:
      'Track recurring retainers, project milestones, and accrued unbilled revenue accurately across European agency operations.',
    h1: 'Retainer and milestone revenue tracking for modern agencies',
    aeoSummary:
      'Digital, consulting, and creative agencies run on a blend of monthly retainers, quarterly prepayments, and milestone-based projects. MYFUNDBOX gives agency finance leads accurate recognized revenue schedules, accrued unbilled tracking, and forward-looking retainer forecasts without spreadsheet reconciliation.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions/agencies' },
      { label: 'Agencies', href: '/solutions/agencies' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.8,
    sections: [
      {
        heading: 'How does MYFUNDBOX unify retainers and milestone projects?',
        directAnswer:
          'Agencies often invoice quarterly in advance for retainers while billing projects upon completion. MYFUNDBOX smooths quarterly retainers into monthly earned revenue and surfaces unbilled accruals when project work finishes ahead of invoicing.',
        bullets: [
          'Distinguishes guaranteed recurring retainer revenue from one-off project scopes.',
          'Tracks client retention, retainer expansion, and contraction across service lines.',
          'Exports period-end accrual and deferral journals directly to your accounting system.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can MYFUNDBOX handle quarterly or annual prepaid retainers?',
        answer:
          'Yes. Upfront retainer invoices automatically spread monthly across the contracted service period.',
      },
      {
        question: 'What if a client project is delivered before the invoice is issued?',
        answer:
          'Accrued (unbilled) revenue rules recognize earned work in the delivery month and clear once invoiced.',
      },
      {
        question: 'Does MYFUNDBOX track agency retainer churn and expansion?',
        answer:
          'Yes. Retainer MRR bridges highlight upgraded scopes, paused retainers, and lost accounts.',
      },
      {
        question: 'Do we need to stop invoicing from our current ERP or PSA tool?',
        answer:
          'No. MYFUNDBOX ingests invoice and contract data from your existing systems.',
      },
      {
        question: 'Can we forecast committed retainer revenue for the next 6–12 months?',
        answer:
          'Yes, active retainer contracts populate committed forward revenue automatically.',
      },
    ],
  },
  {
    path: '/solutions/finance-teams-cfo',
    category: 'solution',
    locale: 'en',
    title: 'Revenue Management for CFOs & Controllers | MYFUNDBOX',
    description:
      'Close the books faster, maintain audit-ready IFRS 15 & HGB trails, and unify board metrics with MYFUNDBOX.',
    h1: 'Built for European CFOs, financial controllers, and accounting teams',
    aeoSummary:
      'CFOs and controllers face growing audit scrutiny over deferred revenue, EU VAT separation, and SaaS KPI accuracy. MYFUNDBOX delivers an immutable, role-governed revenue sub-ledger in EUR that cuts manual close time, satisfies external auditors, and aligns finance with RevOps.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions/finance-teams-cfo' },
      { label: 'Finance Teams & CFOs', href: '/solutions/finance-teams-cfo' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.9,
    sections: [
      {
        heading: 'How does MYFUNDBOX reduce month-end close risk for controllers?',
        directAnswer:
          'Instead of auditing 500-row Excel schedules under time pressure every month, controllers review automated exception alerts, verify period-close roll-forwards, lock the accounting period, and export balanced journals ready for statutory review.',
        bullets: [
          'Enforces period locks and role-based approval permissions across finance staff.',
          'Provides invoice-to-GL lineage for every euro of recognized and deferred revenue.',
          'Supports German HGB/GoBD expectations and IFRS 15 disclosures [CONFIRM exact export templates].',
        ],
      },
    ],
    faqs: [
      {
        question: 'How does MYFUNDBOX help during annual statutory audits?',
        answer:
          'Auditors can verify opening-to-closing deferred revenue roll-forwards and trace any journal line back to source contract and invoice records.',
      },
      {
        question: 'Are permissions separated between RevOps viewers and Controllers?',
        answer:
          'Yes. Role-based access controls restrict period closing, rule editing, and journal approvals to authorized finance roles.',
      },
      {
        question: 'Does MYFUNDBOX require IT engineering to run monthly closes?',
        answer:
          'No. After initial connector setup, controllers manage rules, period locks, and exports directly in the finance UI.',
      },
      {
        question: 'Can CFOs track forecast variance over time?',
        answer:
          'Yes, saved forecast baselines compare directly against closed IFRS 15 actuals.',
      },
      {
        question: 'Is a Data Processing Agreement (DPA) available?',
        answer:
          'Yes, GDPR-compliant DPAs with EU hosting details are available for legal review.',
      },
    ],
  },

  // 4. PRICING
  {
    path: '/pricing',
    category: 'pricing',
    locale: 'en',
    title: 'Pricing & Plans | MYFUNDBOX Subscription Billing',
    description:
      'Predictable flat EUR pricing for subscription businesses. Free up to 25 subscribers, €199/mo Professional, €399/mo Advanced. Zero percentage cut of your revenue.',
    h1: 'Predictable flat pricing with 0% revenue cut',
    aeoSummary:
      'MYFUNDBOX offers transparent, flat EUR pricing based on active subscriber count—never taking a percentage of your gross revenue or transaction volume. Start free with up to 25 subscribers, scale to Professional (€199/mo billed annually) or Advanced (€399/mo billed annually) with unlimited subscribers.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
    lastUpdated: '2026-11-19',
    authorId: DEFAULT_AUTHOR,
    priority: 0.95,
    sections: [
      {
        heading: 'Why does MYFUNDBOX use flat subscriber pricing instead of percentage fees?',
        directAnswer:
          'Most subscription billing platforms charge 0.7% to 5.0% of your gross billing volume, which functions as an increasing tax on your growth. MYFUNDBOX charges a flat rate based on active subscribers so your software costs remain predictable as your revenue scales.',
        table: {
          caption: 'MYFUNDBOX Plan Matrix — Flat EUR Pricing by Subscriber Count',
          headers: ['Plan Feature', 'Free Tier', 'Professional Tier', 'Advanced Tier'],
          rows: [
            ['Active Subscribers', 'Up to 25 subscribers', 'Up to 500 subscribers', 'Unlimited subscribers'],
            ['Annual Price (Billed Annually)', '0 € / month', '199 € / month', '399 € / month'],
            ['Monthly Price (Billed Monthly)', '0 € / month', '249 € / month', '499 € / month'],
            ['Platform Revenue Cut', '0% (Keep 100% of revenue)', '0% (Keep 100% of revenue)', '0% (Keep 100% of revenue)'],
            ['Multi-Gateway Rails', 'Stripe, GoCardless, Mollie, PayPal', 'Stripe, GoCardless, Mollie, PayPal', 'All Gateways + Checkout.com'],
            ['Hosted Checkout & Pay Links', 'Included', 'Included (+ Custom Domain)', 'Included (+ Custom Domain)'],
            ['Smart Dunning & Card Recovery', 'Standard', 'Included', 'Included (+ Advanced Schedules)'],
            ['Customer Self-Service Portal', 'Standard', 'Included', 'Included (+ Custom Styling)'],
            ['Accounting Sync', 'PDF & CSV Export', 'sevDesk, Lexware, Xero, QBO', 'All Connectors + Custom Webhooks'],
            ['Support Level', 'Standard Email Support', 'Priority Email & Chat', 'Dedicated Onboarding Specialist & SLA'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Does MYFUNDBOX charge a percentage of my transaction volume (GMV)?',
        answer:
          'No. MYFUNDBOX takes 0% of your transaction volume. You pay only the flat monthly or annual fee for your subscriber tier plus the standard merchant processing fees charged by your gateway (e.g. Stripe, GoCardless).',
      },
      {
        question: 'What happens when I exceed 25 or 500 subscribers?',
        answer:
          'When your subscriber count grows past your tier limit, you can upgrade seamlessly to the next plan from your dashboard. We never interrupt your customer billing or cancel active subscriptions.',
      },
      {
        question: 'Are gateway processing fees included in MYFUNDBOX pricing?',
        answer:
          'No. You connect your own merchant accounts (Stripe, GoCardless, Mollie, PayPal), and standard processor interchange fees are settled directly with those providers with zero markup from MYFUNDBOX.',
      },
      {
        question: 'Can I cancel or switch my plan at any time?',
        answer:
          'Yes. Monthly plans can be cancelled at any time before the next billing cycle. Annual plans include a 20% discount (2 months free) and remain active through the prepaid annual term.',
      },
      {
        question: 'Is there a free trial for the paid plans?',
        answer:
          'You can start immediately on our Free plan with up to 25 real, paying subscribers to test all core billing and payment features before upgrading to Professional.',
      },
    ],
  },

  // 5. COMPETITOR & ALTERNATIVES PAGES (generated from COMPETITORS)
  ...COMPETITORS.flatMap((comp): PageMetadataEntry[] => [
    {
      path: `/compare/${comp.slug}`,
      category: 'compare',
      locale: 'en',
      title: `MYFUNDBOX vs ${comp.competitorName} (2026) | Comparison`,
      description: `Neutral comparison of MYFUNDBOX vs ${comp.competitorName} on IFRS 15 revenue recognition, EU compliance, forecasting, and pricing models.`,
      h1: `MYFUNDBOX vs ${comp.competitorName}: Revenue Management Comparison`,
      aeoSummary: comp.twoSentenceSummary,
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Compare', href: '/compare/myfundbox-vs-chargebee-revrec' },
        { label: `vs ${comp.competitorName}`, href: `/compare/${comp.slug}` },
      ],
      lastUpdated: comp.lastReviewed,
      authorId: DEFAULT_AUTHOR,
      competitorData: comp,
      isAltPage: false,
      priority: 0.85,
      sections: [],
      faqs: comp.faqs,
    },
    {
      path: `/alternatives/${comp.altSlug}`,
      category: 'alternatives',
      locale: 'en',
      title: `Top ${comp.competitorName} Alternatives in Europe (2026) | MYFUNDBOX`,
      description: `Evaluating ${comp.competitorName} alternatives for EU revenue recognition, IFRS 15 compliance, and forecasting? Compare capabilities and migration steps.`,
      h1: `${comp.competitorName} alternatives for European revenue management`,
      aeoSummary: comp.twoSentenceSummary,
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Alternatives', href: `/alternatives/${comp.altSlug}` },
        { label: `${comp.competitorName} Alternatives`, href: `/alternatives/${comp.altSlug}` },
      ],
      lastUpdated: comp.lastReviewed,
      authorId: DEFAULT_AUTHOR,
      competitorData: comp,
      isAltPage: true,
      priority: 0.8,
      sections: [],
      faqs: comp.faqs,
    },
  ]),

  // 6. RESOURCES HUB, BLOG, 5 PILLAR GUIDES, GLOSSARY, CASE STUDIES
  {
    path: '/resources',
    category: 'resources',
    locale: 'en',
    title: 'Revenue Management Resources, Guides & Glossary | MYFUNDBOX',
    description:
      'In-depth guides on IFRS 15 SaaS revenue recognition, deferred revenue calculations, MRR vs ARR, and forecasting for European finance teams.',
    h1: 'Revenue accounting guides, glossary, and CFO resources',
    aeoSummary:
      'Explore technical finance guides, statutory IFRS 15 and HGB explainers, glossary definitions, and customer workflow benchmarks authored for European CFOs, controllers, and RevOps leaders.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [],
    faqs: [
      {
        question: 'Who authors MYFUNDBOX technical finance guides?',
        answer:
          'All accounting and compliance guides are authored and reviewed by revenue accounting specialists and financial systems architects [ADD: verified author credentials].',
      },
      {
        question: 'Are the guides focused on IFRS 15 or US GAAP?',
        answer:
          'Guides prioritize European IFRS 15 and German HGB/GoBD perspectives while noting where US GAAP ASC 606 parallels apply.',
      },
      {
        question: 'Can we share these definitions with our external auditor?',
        answer:
          'Yes, every guide links to primary authoritative sources such as the IFRS Foundation and EU regulatory texts.',
      },
      {
        question: 'Where can we test deferred revenue schedules interactively?',
        answer:
          'Use the interactive Deferred Revenue & Close-Time Estimator on our Home page.',
      },
      {
        question: 'How often are compliance articles reviewed?',
        answer:
          'Core compliance guides include an explicit Last Updated timestamp and undergo periodic technical review.',
      },
    ],
  },
  {
    path: '/blog',
    category: 'blog',
    locale: 'en',
    title: 'Finance & Revenue Accounting Blog | MYFUNDBOX',
    description:
      'Practical articles on European SaaS close automation, IFRS 15 audits, EU VAT treatment, and CFO forecasting.',
    h1: 'MYFUNDBOX Finance & Revenue Accounting Blog',
    aeoSummary:
      'Read concise, practitioner-written briefs on European recurring revenue accounting, GoBD audit readiness, DATEV journal workflows, and unifying RevOps metrics with statutory general ledgers.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.75,
    sections: [
      {
        heading: 'Why billing exports alone fail IFRS 15 and HGB audits',
        directAnswer:
          'Billing exports capture invoice issuance and cash settlement—not the delivery of performance obligations over time. Closing books solely from Stripe or PSP CSVs leaves controllers reconciling credit notes, VAT rates, and multi-year prepayments manually.',
        bullets: [
          'Separate cash collection dates from revenue start and end service dates.',
          'Isolate VAT liabilities across EU member states before calculating MRR.',
          'Lock historical periods to preserve audit integrity.',
        ],
      },
      {
        heading: 'Aligning German DATEV workflows with SaaS ARR reporting',
        directAnswer:
          'German GmbHs frequently maintain statutory books in DATEV via an external Steuerberater while investors ask for real-time ARR waterfalls. A dedicated revenue sub-ledger bridges monthly Buchungsstapel journal exports with operational cohort analytics.',
        bullets: [
          'Keep Steuerberater workflows consistent while automating PRAP deferred revenue schedules.',
          'Maintain a clear tie-out between monthly P&L revenue and board ARR decks.',
        ],
      },
    ],
    faqs: [],
  },
  {
    path: '/guides/what-is-revenue-management-software',
    category: 'guide',
    locale: 'en',
    title: 'What Is Revenue Management Software? | MYFUNDBOX Guide',
    description:
      'Definition, core capabilities, and architectural differences between revenue management software, billing engines, and ERPs.',
    h1: 'What is revenue management software?',
    aeoSummary:
      'Revenue management software is a specialized financial sub-ledger that tracks, recognizes, forecasts, and reports earned revenue under standards like IFRS 15 and HGB. Unlike payment processors or billing tools, it sits between commercial systems and your general ledger to automate deferred revenue, accruals, and recurring revenue analytics.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'What Is Revenue Management Software?', href: '/guides/what-is-revenue-management-software' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [
      {
        heading: 'How does revenue management software differ from billing and payment tools?',
        directAnswer:
          'Payment gateways move money, billing engines issue invoices, and general ledgers record statutory trial balances. Revenue management software translates complex contracts and invoices into compliant recognition schedules, KPIs, and forecasts.',
        table: {
          caption: 'Finance stack comparison: Payments vs. Billing vs. Revenue Management vs. ERP',
          headers: ['System Layer', 'Primary Job', 'Example Outputs'],
          rows: [
            ['Payment Gateway', 'Collect cards, SEPA, wires', 'Settlement payouts, bank fees'],
            ['Billing Engine', 'Generate customer invoices & dunning', 'PDF invoices, tax calculation, retries'],
            ['Revenue Management (MYFUNDBOX)', 'Recognize, defer, forecast & analyze revenue', 'IFRS 15 waterfalls, PRAP schedules, ARR bridges, forecasts'],
            ['Accounting / ERP (GL)', 'Statutory books, AP, payroll, tax filings', 'Trial balance, statutory P&L and balance sheet'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'When should a SaaS company adopt dedicated revenue management software?',
        answer:
          'Most teams adopt it once annual prepaid contracts, mid-term upgrades, multiple billing channels, or external audits make spreadsheet waterfalls error-prone.',
      },
      {
        question: 'Does revenue management software replace our ERP or Steuerberater?',
        answer:
          'No. It acts as the specialized revenue sub-ledger feeding clean, summarized journal entries into your ERP or accounting package.',
      },
      {
        question: 'What standards govern revenue management in Europe?',
        answer:
          'International and listed European groups typically follow IFRS 15 (issued by the IASB / IFRS Foundation), while local statutory entities follow national GAAP such as German HGB.',
      },
      {
        question: 'Are MRR and recognized revenue the same thing?',
        answer:
          'No. MRR measures normalized recurring contract run-rate, while recognized revenue measures accounting revenue earned under IFRS 15/HGB during a calendar period.',
      },
      {
        question: 'Can MYFUNDBOX manage both historical close and future forecasts?',
        answer:
          'Yes, uniting actual closed sub-ledger schedules with rolling renewal forecasts eliminates spreadsheet duplication.',
      },
    ],
  },
  {
    path: '/guides/revenue-recognition-saas-ifrs-15',
    category: 'guide',
    locale: 'en',
    title: 'Revenue Recognition for SaaS Under IFRS 15 | MYFUNDBOX',
    description:
      'Complete guide to applying IFRS 15 five-step revenue recognition for B2B SaaS contracts, onboarding fees, and modifications.',
    h1: 'Revenue recognition for SaaS under IFRS 15',
    aeoSummary:
      'Under IFRS 15, SaaS providers recognize subscription revenue over time as the customer simultaneously receives and consumes access to the software. Upfront annual payments create a contract liability (deferred revenue), while distinct onboarding services, discounts, and contract modifications follow the IFRS Foundation five-step allocation framework.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'SaaS Revenue Recognition (IFRS 15)', href: '/guides/revenue-recognition-saas-ifrs-15' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [
      {
        heading: 'How do the 5 steps of IFRS 15 apply to a B2B SaaS contract?',
        directAnswer:
          'Per the IFRS Foundation standard IFRS 15 (Revenue from Contracts with Customers), entities identify enforceable contracts, separate distinct obligations (such as SaaS access vs. custom setup), determine net transaction price excluding VAT, allocate based on standalone selling price, and recognize revenue as control transfers.',
        numberedSteps: [
          { title: 'Identify the contract with the customer', detail: 'Verify commercial substance, payment terms, and enforceable rights across signed order forms or self-serve terms.' },
          { title: 'Identify separate performance obligations', detail: 'Evaluate whether implementation or training is distinct from the core SaaS subscription or bundled as one combined obligation.' },
          { title: 'Determine the transaction price', detail: 'Exclude third-party collections such as EU VAT (USt/TVA) and account for variable consideration or volume rebates.' },
          { title: 'Allocate transaction price via SSP', detail: 'Allocate bundled discounts proportionally based on standalone selling prices of each obligation.' },
          { title: 'Recognize revenue over time or point-in-time', detail: 'Amortize continuous cloud access ratably across the subscription term.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Should SaaS onboarding fees be recognized upfront under IFRS 15?',
        answer:
          'Only if the onboarding service transfers a distinct good or service the customer could benefit from separately. Otherwise, non-refundable setup fees are often recognized over the expected customer benefit period.',
      },
      {
        question: 'How does IFRS 15 treat EU VAT on SaaS invoices?',
        answer:
          'Amounts collected on behalf of tax authorities such as VAT are excluded from transaction price and recognized revenue.',
      },
      {
        question: 'What happens when a customer upgrades mid-year?',
        answer:
          'Depending on whether additional seats are priced at standalone selling price, the change is accounted for either as a separate contract or a prospective modification.',
      },
      {
        question: 'Is IFRS 15 identical to US GAAP ASC 606?',
        answer:
          'IFRS 15 and ASC 606 share a largely converged five-step model, though minor guidance differences exist around interim disclosures and specific contract cost rules.',
      },
      {
        question: 'How does MYFUNDBOX verify IFRS 15 compliance?',
        answer:
          'MYFUNDBOX applies configurable performance-obligation rules consistently across every invoice and preserves an auditable tie-out to source contracts.',
      },
    ],
  },
  {
    path: '/guides/how-to-calculate-deferred-revenue',
    category: 'guide',
    locale: 'en',
    title: 'How to Calculate Deferred Revenue (Formula & Example) | MYFUNDBOX',
    description:
      'Step-by-step deferred revenue formula, EUR journal entry example, and monthly roll-forward guide for subscription businesses.',
    h1: 'How to calculate deferred revenue for subscription contracts',
    aeoSummary:
      'Deferred revenue equals upfront cash billed or collected for goods or services not yet delivered. Calculate ending deferred revenue using the roll-forward formula: Beginning Deferred Revenue + New Billings (net of VAT) − Recognized Revenue = Ending Deferred Revenue. Under IFRS 15 and HGB, it sits as a liability on the balance sheet.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'How to Calculate Deferred Revenue', href: '/guides/how-to-calculate-deferred-revenue' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [
      {
        heading: 'What is a worked EUR example of deferred revenue recognition?',
        directAnswer:
          'Suppose a German B2B SaaS customer signs a €12.000 net annual subscription (plus 19% VAT = €14.280 gross) starting 1 January. VAT (€2.280) posts to VAT payable, €12.000 enters Deferred Revenue, and €1.000 is recognized to P&L revenue each month.',
        table: {
          caption: 'Illustrative €12.000 annual contract deferred revenue schedule (net of VAT)',
          headers: ['Period', 'Beginning Deferred', 'Net Billed', 'Recognized Revenue', 'Ending Deferred'],
          rows: [
            ['Month 1 (Jan)', '€0', '€12.000', '€1.000', '€11.000'],
            ['Month 2 (Feb)', '€11.000', '€0', '€1.000', '€10.000'],
            ['Month 6 (Jun)', '€7.000', '€0', '€1.000', '€6.000'],
            ['Month 12 (Dec)', '€1.000', '€0', '€1.000', '€0'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Is deferred revenue an asset or a liability?',
        answer:
          'Deferred revenue is a liability on the balance sheet because the company owes future software access or service delivery to the customer.',
      },
      {
        question: 'Does VAT enter deferred revenue?',
        answer:
          'No. Statutory VAT is booked to a tax payable account, never into deferred or recognized revenue.',
      },
      {
        question: 'What is the difference between deferred revenue and accrued revenue?',
        answer:
          'Deferred revenue arises when billing happens before delivery (liability). Accrued or unbilled revenue arises when delivery happens before billing (asset).',
      },
      {
        question: 'Should annual prepayments be recognized daily or monthly?',
        answer:
          'Both are acceptable if applied consistently; daily exact-day proration is recommended when contracts start mid-month and vary materially across 28/30/31-day months.',
      },
      {
        question: 'How can I model our portfolio deferred balance right now?',
        answer:
          'Use the interactive Deferred Revenue & Close-Time Estimator on the MYFUNDBOX Home page.',
      },
    ],
  },
  {
    path: '/guides/mrr-vs-arr-vs-recognized-revenue',
    category: 'guide',
    locale: 'en',
    title: 'MRR vs ARR vs Recognized Revenue Explained | MYFUNDBOX',
    description:
      'Understand the exact differences between Bookings, Billings, MRR, ARR, and IFRS 15 Recognized Revenue for SaaS finance teams.',
    h1: 'MRR vs ARR vs recognized revenue: why finance teams track all three',
    aeoSummary:
      'MRR and ARR are non-GAAP operational run-rate metrics measuring active recurring subscription value at a point in time, whereas Recognized Revenue is the statutory accounting revenue earned during a period under IFRS 15 or HGB. Confusing run-rate metrics with P&L revenue causes board and audit discrepancies.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'MRR vs ARR vs Recognized Revenue', href: '/guides/mrr-vs-arr-vs-recognized-revenue' },
    ],
    lastUpdated: '2026-11-18',
    authorId: TECH_AUTHOR,
    priority: 0.8,
    sections: [
      {
        heading: 'How do Bookings, Billings, MRR, ARR, and Recognized Revenue differ?',
        directAnswer:
          'Each metric captures a distinct moment in the customer lifecycle: signed commitment (Bookings), invoice issued (Billings), normalized run-rate (MRR/ARR), and statutory service delivery (Recognized Revenue).',
        table: {
          caption: 'Metric comparison across SaaS commercial and accounting definitions',
          headers: ['Metric', 'Type', 'Includes One-Time Fees?', 'Primary Audience'],
          rows: [
            ['Bookings', 'Commercial commitment', 'Yes (total contract value)', 'Sales & Executive Leadership'],
            ['Billings', 'Invoiced cash claim', 'Yes (plus VAT on invoice)', 'AR & Treasury'],
            ['MRR / ARR', 'Operational recurring run-rate', 'No (recurring only, net of VAT)', 'CFO, RevOps & Investors'],
            ['Recognized Revenue', 'Statutory P&L revenue (IFRS 15 / HGB)', 'Yes (when obligation satisfied)', 'Auditors, Tax Advisors & Statutory P&L'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Can ARR ever exceed annual recognized revenue?',
        answer:
          'Yes. In a fast-growing SaaS business, year-end ARR reflects December run-rate × 12, which is typically higher than trailing twelve-month recognized revenue.',
      },
      {
        question: 'Why does a 28-day February affect daily recognized revenue but not MRR?',
        answer:
          'Standard MRR represents a normalized monthly run-rate, whereas exact-day accounting recognition allocates 28/365ths of an annual contract to February.',
      },
      {
        question: 'Should discounts be netted out of MRR and ARR?',
        answer:
          'Yes, recurring contractual discounts reduce net MRR/ARR; temporary one-time credits should be disclosed clearly.',
      },
      {
        question: 'How does MYFUNDBOX keep MRR and recognized revenue reconciled?',
        answer:
          'Both metrics compute from the same normalized contract and invoice sub-ledger, guaranteeing transparent reconciliation.',
      },
      {
        question: 'Is VAT ever included in MRR or recognized revenue?',
        answer:
          'No. Both operational recurring metrics and statutory revenue must exclude statutory VAT.',
      },
    ],
  },
  {
    path: '/guides/revenue-forecasting-methods-subscription',
    category: 'guide',
    locale: 'en',
    title: 'Revenue Forecasting Methods for Subscription Businesses | MYFUNDBOX',
    description:
      'Compare bottom-up contract backlog, cohort retention, and pipeline-weighted forecasting methods for recurring-revenue CFOs.',
    h1: 'Revenue forecasting methods for subscription businesses',
    aeoSummary:
      'Accurate subscription revenue forecasting combines three distinct layers: deterministic burn-down of existing deferred revenue backlog, cohort-based renewal and expansion modeling on active contracts, and probability-weighted new business from the CRM pipeline—projected separately for recognized P&L revenue and cash billings.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'Revenue Forecasting Methods', href: '/guides/revenue-forecasting-methods-subscription' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.8,
    sections: [
      {
        heading: 'Which forecasting method fits each time horizon?',
        directAnswer:
          'Near-term quarter forecasts rely heavily on contracted deferred revenue burn-down, whereas 12–36 month strategic plans depend on cohort NRR assumptions and sales capacity.',
        numberedSteps: [
          { title: 'Layer 1: Contracted Backlog (0–12 months)', detail: 'Project guaranteed recognition already sitting in deferred revenue and non-cancellable contracts.' },
          { title: 'Layer 2: Renewal & NRR Cohort Model (3–24 months)', detail: 'Apply segment-specific gross churn and expansion rates to upcoming renewal dates.' },
          { title: 'Layer 3: Pipeline & New ARR Ramp (6–36 months)', detail: 'Layer weighted CRM opportunities and billing-mix assumptions (monthly vs. annual prepaid).' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Why do top-down ARR growth multipliers fail at audit or board level?',
        answer:
          'Flat percentage multipliers ignore renewal cliffs, annual billing seasonality, and the lag between new bookings and IFRS 15 revenue recognition.',
      },
      {
        question: 'How does billing cadence affect recognized revenue vs. cash?',
        answer:
          'Switching customers from monthly to annual upfront billing accelerates cash collection immediately while recognized P&L revenue stays flat month-to-month.',
      },
      {
        question: 'What retention rate should baseline models use?',
        answer:
          'Use trailing 4-quarter empirical segment GRR and NRR rather than aspirational targets for base-case financial plans.',
      },
      {
        question: 'Does MYFUNDBOX separate committed backlog from modeled pipeline?',
        answer:
          'Yes, keeping deterministic backlog cleanly separated from assumption-driven upside.',
      },
      {
        question: 'How often should forecasts be re-baselined?',
        answer:
          'Monthly after period close, saving each snapshot to measure actual variance.',
      },
    ],
  },
  {
    path: '/glossary',
    category: 'glossary',
    locale: 'en',
    title: 'Revenue Management & IFRS 15 Glossary | MYFUNDBOX',
    description:
      'Clear finance definitions for revenue recognition, deferred revenue, accruals, MRR, ARR, NRR, churn, and performance obligations.',
    h1: 'Revenue management, IFRS 15, and SaaS finance glossary',
    aeoSummary:
      'A concise, audit-grounded glossary defining essential European recurring-revenue accounting and FP&A terms—from IFRS 15 performance obligations and German HGB Rechnungsabgrenzungsposten to MRR, ARR, NRR, and churn.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'Glossary', href: '/glossary' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [
      {
        heading: 'Core accounting and SaaS revenue definitions',
        directAnswer:
          'Standardized definitions prevent misalignment between Controllers, FP&A, RevOps, and external auditors when reporting recurring revenue across European entities.',
        table: {
          caption: 'MYFUNDBOX Authoritative Finance Glossary',
          headers: ['Term', 'Definition', 'Accounting / Metric Category'],
          rows: [
            ['Revenue Recognition', 'The accounting principle governing when earned revenue is recorded on the income statement as obligations are satisfied (IFRS 15 / HGB).', 'Statutory Accounting'],
            ['Deferred Revenue', 'A balance sheet liability representing upfront billings or payments received before software/services are delivered (German: PRAP).', 'Balance Sheet Liability'],
            ['Accrued (Unbilled) Revenue', 'A balance sheet asset recorded when services have been delivered before the customer invoice is issued (German: ARAP / unfertige Leistungen).', 'Balance Sheet Asset'],
            ['Performance Obligation', 'A distinct promise in a customer contract to transfer a good or service under IFRS 15 Step 2.', 'IFRS 15 Framework'],
            ['Standalone Selling Price (SSP)', 'The price at which an entity would sell a promised good or service separately, used to allocate bundled discounts.', 'IFRS 15 Allocation'],
            ['MRR (Monthly Recurring Revenue)', 'Normalized monthly recurring contract value net of VAT and one-time fees.', 'SaaS Operational Metric'],
            ['ARR (Annual Recurring Revenue)', 'Annualized recurring revenue run-rate (MRR × 12) for active subscriptions at a measurement date.', 'SaaS Operational Metric'],
            ['NRR (Net Revenue Retention)', 'Percentage of recurring revenue retained from an existing cohort after accounting for expansion, contraction, and churn.', 'Retention Cohort KPI'],
            ['Revenue Churn', 'Recurring revenue lost from cancellations and downgrades over a measurement period.', 'Retention KPI'],
            ['GoBD', 'German tax authority principles for orderly electronic bookkeeping, immutability, and digital audit traceability.', 'German Compliance'],
          ],
        },
      },
    ],
    faqs: [],
  },
  {
    path: '/case-studies',
    category: 'case-studies',
    locale: 'en',
    title: 'Customer Case Studies [Placeholders] | MYFUNDBOX',
    description:
      'Structured customer case study templates awaiting verified European customer stories and quantified close metrics.',
    h1: 'Customer stories & implementation benchmarks [ADD: Verified Case Studies]',
    aeoSummary:
      'In accordance with strict accuracy standards, verified customer names, quotes, and quantified outcomes are not fabricated. Below are structured case-study slots prepared for [ADD: Approved Customer Stories] across European SaaS, membership, and agency finance teams.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.7,
    sections: [
      {
        heading: 'Case study slot 01: [ADD: European B2B SaaS Customer Name]',
        directAnswer:
          '[ADD: Customer 1-sentence profile, e.g., Berlin-based B2B workflow SaaS with €X M ARR]. Challenge: [ADD: Manual Excel deferred revenue reconciliation across Stripe and SEPA invoices]. Outcome: [ADD: Verified close-time reduction and audit outcome].',
        bullets: [
          'Industry: [ADD: B2B SaaS · Country]',
          'Billing Stack Connected: [ADD: e.g., Stripe Billing + HubSpot → DATEV]',
          'Verified Result: [ADD: e.g., Reduced close from X days to Y days]',
        ],
      },
      {
        heading: 'Case study slot 02: [ADD: EU Membership / Digital Services Customer Name]',
        directAnswer:
          '[ADD: Customer profile]. Challenge: [ADD: Annual prepaid membership prorations and multi-country EU VAT separation]. Outcome: [ADD: Verified audit & reporting impact].',
        bullets: [
          'Industry: [ADD: Digital Services / Memberships]',
          'ERP Export: [ADD: e.g., Exact Online / SAP / Xero]',
          'Verified Result: [ADD: Approved metric]',
        ],
      },
    ],
    faqs: [],
  },

  // 7. ABOUT, SECURITY, CONTACT, CHANGELOG, HELP
  {
    path: '/about',
    category: 'about',
    locale: 'en',
    title: 'About MYFUNDBOX | EU Revenue Management Software',
    description:
      'Built in Germany for European finance teams. Learn about MYFUNDBOX’s mission, leadership, and strict focus on revenue management.',
    h1: 'Built in Germany for European financial precision',
    aeoSummary:
      'MYFUNDBOX is a German-based software company dedicated exclusively to revenue management for recurring-revenue businesses. Founded in [ADD: Founding Year], MYFUNDBOX focuses solely on helping CFOs and controllers track, recognize, forecast, and audit revenue—never competing as a payment gateway or billing tool.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.75,
    sections: [
      {
        heading: 'Why we built a dedicated revenue layer separate from billing',
        directAnswer:
          'Most revenue tools force finance teams to switch payment processors or replace billing systems before automating IFRS 15 accounting. We built MYFUNDBOX so European finance leaders keep their existing commercial stack while gaining a compliant revenue sub-ledger.',
        bullets: [
          `Entity: ${SITE_CONFIG.legalEntityName}`,
          `Location: ${SITE_CONFIG.headquartersLocation}`,
          `Founding Year: ${SITE_CONFIG.foundingYear}`,
          `Data Residency: ${SITE_CONFIG.euDataResidency}`,
        ],
      },
    ],
    faqs: [],
  },
  {
    path: '/security',
    category: 'security',
    locale: 'en',
    title: 'Security, GDPR & EU Compliance | MYFUNDBOX',
    description:
      'EU data residency, GDPR/DPA availability, encryption controls, role-based access, and zero pre-consent tracking at MYFUNDBOX.',
    h1: 'Security, GDPR compliance, and EU data residency',
    aeoSummary:
      'MYFUNDBOX is engineered for European regulatory expectations: EU data residency [CONFIRM: Frankfurt, Germany], signed GDPR Data Processing Agreements (DPA), granular role-based permissions, immutable audit logging, and strict zero-tracker defaults prior to cookie consent.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Security & Compliance', href: '/security' },
    ],
    lastUpdated: '2026-11-18',
    authorId: TECH_AUTHOR,
    priority: 0.85,
    sections: [
      {
        heading: 'How does MYFUNDBOX protect financial and personal data?',
        directAnswer:
          'Financial sub-ledger data is isolated per tenant, encrypted in transit and at rest, and hosted within the European Union. Administrative, controller, and read-only auditor roles enforce least-privilege access across every workflow.',
        table: {
          caption: 'Security & Regulatory Control Summary',
          headers: ['Control Area', 'Implementation / Posture', 'Verification / Document'],
          rows: [
            ['EU Data Residency', SITE_CONFIG.euDataResidency, 'Confirm region in signed DPA'],
            ['GDPR & DPA', 'Standard Art. 28 GDPR Data Processing Agreement available', 'View /dpa'],
            ['Audit Trail & Immutability', 'Timestamped, user-attributed logs on rule changes & period closes', 'Built into sub-ledger'],
            ['Encryption & Access', 'TLS 1.2+/1.3 in transit, AES-256 at rest, RBAC & SSO [CONFIRM SSO tier]', '[ADD: Pen-test / SOC 2 / ISO 27001 report status]'],
            ['Pre-Consent Tracking', 'Zero third-party analytics or advertising scripts load before consent', 'Enforced by CMP'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Can we sign a GDPR Data Processing Agreement (DPA) before onboarding?',
        answer:
          'Yes. Our standard Art. 28 GDPR DPA detailing EU sub-processors and hosting region is available for legal review.',
      },
      {
        question: 'Does MYFUNDBOX store raw credit card numbers (PAN)?',
        answer:
          'No. MYFUNDBOX is not a payment processor and never handles or stores cardholder credentials or CVV data.',
      },
      {
        question: 'Are ISO 27001 or SOC 2 attestations available?',
        answer:
          '[ADD: Insert verified ISO 27001 / SOC 2 Type II status and hosting infrastructure certifications here].',
      },
      {
        question: 'How are audit trails protected against tampering?',
        answer:
          'Closed periods lock accounting outputs; subsequent edits record immutable adjustment entries with user ID and timestamp.',
      },
      {
        question: 'Who acts as Data Protection Officer (DPO)?',
        answer:
          `Contact our privacy team at ${SITE_CONFIG.dpoEmail} [ADD: External/Internal DPO contact details].`,
      },
    ],
  },
  {
    path: '/book-a-demo',
    category: 'contact',
    locale: 'en',
    title: 'Book a Demo | MYFUNDBOX Subscription Billing',
    description:
      'Schedule a 30-minute tailored walkthrough of MYFUNDBOX. See how to connect your payment gateways, launch subscription plans, and automate EU invoicing.',
    h1: 'Book a tailored walkthrough of MYFUNDBOX',
    aeoSummary:
      'Schedule a 30-minute one-on-one session with our European subscription billing specialists. We will review your current payment gateways, subscription plans, and European tax requirements, and demonstrate how MYFUNDBOX eliminates revenue fees and automates recurring billing.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Book a demo', href: '/book-a-demo' },
    ],
    lastUpdated: '2026-11-19',
    authorId: DEFAULT_AUTHOR,
    priority: 0.9,
    sections: [],
    faqs: [
      {
        question: 'What happens during the demo?',
        answer:
          'We walk through a live screen-share tailored to your business model: connecting your gateways (Stripe, GoCardless, Mollie, PayPal), configuring your plans, setting up EU VAT rules, and reviewing your migration timeline.',
      },
      {
        question: 'How long does the session take?',
        answer:
          'A typical session takes approximately 30 minutes, with plenty of time reserved for your specific technical and billing questions.',
      },
    ],
  },
  {
    path: '/contact',
    category: 'contact',
    locale: 'en',
    title: 'Contact Sales & Support | MYFUNDBOX',
    description:
      'Get in touch with the MYFUNDBOX team for sales consultations, customer support, partnership inquiries, or custom enterprise requirements.',
    h1: 'Get in touch with the MYFUNDBOX team',
    aeoSummary:
      'Connect directly with MYFUNDBOX sales, technical support, and partnership teams. Located in Germany with European cloud infrastructure, we help subscription businesses launch recurring billing in under 30 minutes with zero percentage-based transaction fees.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
    lastUpdated: '2026-11-19',
    authorId: DEFAULT_AUTHOR,
    priority: 0.85,
    sections: [],
    faqs: [
      {
        question: 'How quickly does MYFUNDBOX support respond?',
        answer:
          'Our European support team responds to sales inquiries and customer tickets within one business day during standard European business hours (CET).',
      },
      {
        question: 'Where can I find developer documentation and API guides?',
        answer:
          'Complete developer documentation, REST endpoint references, and webhook payloads are available at docs.myfundbox.com.',
      },
    ],
  },
  {
    path: '/changelog',
    category: 'changelog',
    locale: 'en',
    title: 'Product Changelog & Releases | MYFUNDBOX',
    description:
      'Release notes covering IFRS 15 recognition rules, ERP connectors, forecasting enhancements, and audit controls.',
    h1: 'Product changelog and platform updates',
    aeoSummary:
      'Track verified product releases across the MYFUNDBOX revenue sub-ledger, forecasting engine, ERP exports, and audit controls. [ADD: Connect live release feed or confirm historical release milestones].',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Changelog', href: '/changelog' },
    ],
    lastUpdated: '2026-11-18',
    authorId: TECH_AUTHOR,
    priority: 0.65,
    sections: [
      {
        heading: 'Recent platform milestones [ADD: Confirm live release dates]',
        directAnswer:
          'Release summaries below document planned and baseline capabilities for the MYFUNDBOX revenue management platform.',
        bullets: [
          '18.11.2026 — Multi-source EU VAT separation and net-of-tax MRR waterfall reconciliation.',
          '[ADD: Date] — Enhanced short-term vs. long-term deferred revenue split for multi-year prepayments.',
          '[ADD: Date] — Read-only external auditor role and period-lock verification report.',
        ],
      },
    ],
    faqs: [],
  },
  {
    path: '/help',
    category: 'help',
    locale: 'en',
    title: 'Help Center & Frequently Asked Questions | MYFUNDBOX',
    description:
      'Answers on MYFUNDBOX setup, IFRS 15 rule configuration, billing data sync, EU compliance, and accounting exports.',
    h1: 'Help center and frequently asked questions',
    aeoSummary:
      'Find direct answers on connecting billing and CRM sources, configuring IFRS 15 and HGB revenue recognition rules, migrating opening deferred balances, and managing GDPR compliance inside MYFUNDBOX.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Help & FAQ', href: '/help' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.75,
    sections: [],
    faqs: [
      {
        question: 'What is the fastest way to get started with MYFUNDBOX?',
        answer:
          'Book a demo with sample contract structures; we walk through source connection, recognition rule mapping, and historical opening balance reconciliation.',
      },
      {
        question: 'Does MYFUNDBOX require changing our payment service provider?',
        answer:
          'No. MYFUNDBOX is never in the payment flow and works alongside Stripe, Adyen, GoCardless, Mollie, or direct SEPA bank transfers.',
      },
      {
        question: 'Can we test opening deferred revenue tie-outs before switching off spreadsheets?',
        answer:
          'Yes. Most finance teams run a parallel close for one period to confirm 100% tie-out with prior spreadsheet schedules.',
      },
      {
        question: 'How does MYFUNDBOX handle multi-currency EUR consolidation?',
        answer:
          'Foreign-currency contracts convert using configurable monthly average or spot rates [CONFIRM ECB rate feed].',
      },
      {
        question: 'Who do we contact for DPA or security questionnaires?',
        answer:
          `Reach out via our Contact page or email ${SITE_CONFIG.dpoEmail}.`,
      },
    ],
  },

  // 8. LEGAL PAGES (5)
  {
    path: '/imprint',
    category: 'legal',
    locale: 'en',
    title: 'Imprint (Impressum) | MYFUNDBOX',
    description: 'Statutory corporate information and Impressum disclosures pursuant to § 5 DDG / German law for MYFUNDBOX.',
    h1: 'Imprint (Impressum)',
    aeoSummary:
      'Statutory corporate disclosures pursuant to § 5 DDG (Digitale-Dienste-Gesetz) and § 18 MStV for MYFUNDBOX. Replace all bracketed [ADD: ...] fields with verified German Handelsregister and USt-IdNr. details prior to public production launch.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Legal', href: '/imprint' },
      { label: 'Imprint', href: '/imprint' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.4,
    sections: [
      {
        heading: 'Mandatory Statutory Disclosures (§ 5 DDG)',
        directAnswer: 'Complete verified German corporate registry details below prior to production go-live.',
        bullets: [
          `Company Name: ${SITE_CONFIG.legalEntityName}`,
          `Registered Address: ${SITE_CONFIG.headquartersLocation}`,
          'Managing Directors (Geschäftsführer): [ADD: Full Name(s)]',
          'Commercial Register (Handelsregister): [ADD: Amtsgericht & HRB Number]',
          'VAT ID (USt-IdNr. pursuant to § 27a UStG): [ADD: DE XXXXXXXXX]',
          `Contact Email & Phone: ${SITE_CONFIG.contactEmail} · [ADD: +49 ...]`,
        ],
      },
    ],
    faqs: [],
  },
  {
    path: '/privacy-policy',
    category: 'legal',
    locale: 'en',
    title: 'Privacy Policy (GDPR / DSGVO) | MYFUNDBOX',
    description: 'How MYFUNDBOX processes personal data under GDPR Art. 13/14, data subject rights, and EU hosting commitments.',
    h1: 'Privacy Policy (Datenschutzerklärung)',
    aeoSummary:
      'MYFUNDBOX processes personal data strictly in compliance with the EU General Data Protection Regulation (GDPR) and German BDSG. No third-party analytics or marketing scripts are activated before explicit user consent.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Legal', href: '/privacy-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.4,
    sections: [
      {
        heading: 'Controller, legal bases, and data subject rights',
        directAnswer:
          'Personal data submitted via demo forms is processed solely under Art. 6(1)(a) / (b) GDPR to fulfill your inquiry without third-party brokerage. [ADD: Full legal review by EU counsel before launch].',
        bullets: [
          `Data Controller: ${SITE_CONFIG.legalEntityName}, ${SITE_CONFIG.headquartersLocation}`,
          `Data Protection Contact: ${SITE_CONFIG.dpoEmail}`,
          'Hosting & Sub-processors: [ADD: Verified list of EU-resident sub-processors]',
          'Rights: Access (Art. 15), Rectification (Art. 16), Erasure (Art. 17), Restriction (Art. 18), Portability (Art. 20), Objection (Art. 21), Complaint to Supervisory Authority.',
        ],
      },
    ],
    faqs: [],
  },
  {
    path: '/terms-of-service',
    category: 'legal',
    locale: 'en',
    title: 'Terms of Service | MYFUNDBOX',
    description: 'Standard B2B SaaS subscription terms placeholder for MYFUNDBOX revenue management software.',
    h1: 'Terms of Service (AGB)',
    aeoSummary:
      'B2B Software-as-a-Service terms governing access to the MYFUNDBOX revenue management platform. Replace placeholder clauses with counsel-approved German/EU B2B commercial terms before customer onboarding.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Legal', href: '/terms-of-service' },
      { label: 'Terms', href: '/terms-of-service' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.4,
    sections: [
      {
        heading: 'Key B2B commercial placeholders',
        directAnswer:
          'All commercial subscriptions are strictly B2B (Unternehmer § 14 BGB) under German law unless otherwise agreed in writing.',
        bullets: [
          '1. Scope of Software: Revenue management sub-ledger, recognition, analytics, and forecasting (non-payment, non-advisory).',
          '2. Accounting Disclaimer: MYFUNDBOX provides configurable automation tools; statutory sign-off remains with your Steuerberater / auditor.',
          '3. Service Levels & Availability: [ADD: Verified SLA uptime % and maintenance windows].',
          '4. Governing Law & Venue: [ADD: Federal Republic of Germany, City Court].',
        ],
      },
    ],
    faqs: [],
  },
  {
    path: '/cookies',
    category: 'legal',
    locale: 'en',
    title: 'Cookie Policy (GDPR & TDDDG) | MYFUNDBOX',
    description: 'Transparent inventory of strictly necessary storage and optional consent-gated analytics cookies on MYFUNDBOX.',
    h1: 'Cookie Policy',
    aeoSummary:
      'MYFUNDBOX respects EU ePrivacy and German TDDDG (§ 25) requirements: strictly necessary local storage saves only your theme and consent preferences, and zero third-party cookies or analytics beacons execute prior to opt-in.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Legal', href: '/cookies' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.4,
    sections: [
      {
        heading: 'Cookie and local storage inventory',
        directAnswer: 'Only essential preference storage is active by default; analytics remain disabled until explicit consent.',
        table: {
          caption: 'Storage Inventory',
          headers: ['Key / Cookie', 'Purpose', 'Category', 'Duration'],
          rows: [
            ['myfundbox_cookie_consent', 'Stores GDPR/TDDDG consent decision', 'Strictly Necessary', '12 months'],
            ['myfundbox_theme', 'Remembers Light/Dark display preference', 'Strictly Necessary', 'Persistent local preference'],
            ['[ADD: EU Analytics Tool]', 'Privacy-friendly aggregated usage metrics (loads only after consent)', 'Analytics (Opt-In)', '[ADD: Duration]'],
          ],
        },
      },
    ],
    faqs: [],
  },
  {
    path: '/dpa',
    category: 'legal',
    locale: 'en',
    title: 'Data Processing Agreement (DPA / AVV) | MYFUNDBOX',
    description: 'Overview of MYFUNDBOX Art. 28 GDPR Data Processing Agreement (Auftragsverarbeitungsvertrag) and EU sub-processors.',
    h1: 'Data Processing Agreement (GDPR Art. 28 / AVV)',
    aeoSummary:
      'Every MYFUNDBOX commercial customer receives an Art. 28 GDPR Data Processing Agreement (Auftragsverarbeitungsvertrag / AVV) documenting EU hosting residency, technical and organizational measures (TOMs), and authorized sub-processors.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Legal', href: '/dpa' },
      { label: 'DPA', href: '/dpa' },
    ],
    lastUpdated: '2026-11-18',
    authorId: DEFAULT_AUTHOR,
    priority: 0.45,
    sections: [
      {
        heading: 'Standard DPA schedule & Technical and Organizational Measures (TOMs)',
        directAnswer:
          'This page summarizes our standard AVV structure; request the countersignable PDF copy during security review.',
        bullets: [
          `Processing Location: ${SITE_CONFIG.euDataResidency}`,
          'Subject Matter: Ingestion and processing of B2B subscription, contract, and invoice records for revenue accounting.',
          'TOMs (Art. 32 GDPR): Encryption at rest & transit, tenant isolation, RBAC, immutable access logs [ADD: Full TOMs Annex].',
          'Sub-processor List: [ADD: Verified EU infrastructure and support sub-processors].',
        ],
      },
    ],
    faqs: [],
  },
];

// German pages. English lives at the root and German under /de (matches the live
// myfundbox.com URL scheme). FR/ES were dropped for launch, see docs/02-sitemap-and-roadmap.md.
// A /de URL only resolves when a German entry exists here: we never serve English
// content under a German URL, because that creates duplicate, mislabelled pages.
const LOCALIZED_HOME_PAGES: PageMetadataEntry[] = [
  {
    ...CORE_PAGES[0],
    path: '/de',
    locale: 'de',
    title: 'MYFUNDBOX | Abo-Abrechnung & Revenue-Management-Plattform',
    description:
      'Abonnements, wiederkehrende Abrechnung, Zahlungen, Mahnwesen und Umsatz-Reporting auf einer Plattform. Mit Stripe, GoCardless, Mollie, PayPal und Checkout.com.',
    h1: 'Behalten Sie Ihren Umsatz im Griff. Konzentrieren Sie sich auf Ihr Wachstum.',
    aeoSummary:
      'MYFUNDBOX ist eine Revenue-Management-Plattform für Abo-Unternehmen. Tarife, einmalige und wiederkehrende Abrechnung, Zahlungen über Stripe, GoCardless, Mollie, PayPal und Checkout.com, automatisches Mahnwesen, ein Self-Service-Kundenportal und Umsatz-Reporting – an einem Ort, mit Datenspeicherung in Frankfurt.',
    breadcrumbs: [{ label: 'Startseite', href: '/de' }],
    atAGlance: {
      whatItIs: 'Eine Plattform für Abo-Abrechnung und Revenue Management: Tarife, Abrechnung, Zahlungen, Mahnwesen, Kundenportal und Reporting an einem Ort.',
      whoItIsFor: 'SaaS-Unternehmen, Abo- und Mitgliedschaftsmodelle, digitale Unternehmen und Agenturen mit wiederkehrenden Umsätzen.',
      keyCapabilities: [
        'Einmalige und wiederkehrende Abrechnung mit Tarifen, Add-ons, Gutscheinen und Testphasen',
        'Zahlungen über mehrere Anbieter und Zahlungsarten',
        'Smartes Mahnwesen mit automatischen Wiederholungen und Erinnerungen',
        'Gehosteter Checkout, Zahlungslinks und Kundenportal',
      ],
      pricingModel: 'Kostenloser Tarif für bis zu 25 Abonnenten; kostenpflichtige Tarife monatlich oder jährlich. Aktuelle Tarife auf der Preisseite.',
      regionAndCompliance: 'Datenspeicherung in Frankfurt · Auftragsverarbeitungsvertrag nach DSGVO · Zwei-Faktor-Authentifizierung',
      integrations: 'Stripe, GoCardless, Mollie, PayPal, Checkout.com, QuickBooks, Xero, sevdesk, Lexware, Avalara, REST-API & Webhooks',
    },
    sections: [
      {
        heading: 'Warum wird die Verwaltung von Abo-Umsätzen so schnell kompliziert?',
        directAnswer:
          'Mit dem Wachstum verteilen sich Tarife, Rechnungen, Zahlungen und Kundenänderungen auf viele Tools. Fehlgeschlagene Zahlungen gehen unter, Kunden warten auf den Support und Umsatzzahlen entstehen in Handarbeit. MYFUNDBOX bündelt alles auf einer Plattform.',
        bullets: [
          'Tarife, Abrechnung und Zahlungen an einem Ort statt in mehreren Tools.',
          'Fehlgeschlagene Zahlungen werden automatisch wiederholt und nachverfolgt.',
          'Kunden ändern Karte, Tarif und Daten selbst im Kundenportal.',
        ],
      },
      {
        heading: 'Wie funktioniert MYFUNDBOX?',
        directAnswer:
          'Tarife anlegen, vorhandene Zahlungsanbieter verbinden – ab dann laufen Abrechnung, Zahlungseinzug und Reporting automatisch.',
        numberedSteps: [
          {
            title: 'Tarife und Checkout erstellen',
            detail: 'Einmalige oder wiederkehrende Produkte mit Add-ons, Gutscheinen und Testphasen anlegen und als Checkout oder Zahlungslink veröffentlichen.',
          },
          {
            title: 'Zahlungsanbieter verbinden',
            detail: 'Stripe, GoCardless, Mollie, PayPal oder Checkout.com verknüpfen und Karte, SEPA, ACH, Überweisung oder Open Banking anbieten.',
          },
          {
            title: 'Abrechnung automatisieren, Umsatz verfolgen',
            detail: 'Verlängerungen, Rechnungen und Mahnwesen laufen automatisch, während Sie Umsatz, Abos und Zahlungen live verfolgen.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Was ist MYFUNDBOX?',
        answer:
          'MYFUNDBOX ist eine Revenue-Management-Plattform für Abo-Unternehmen: Tarife, einmalige und wiederkehrende Abrechnung, Zahlungen, Mahnwesen, Kundenportal und Umsatz-Reporting an einem Ort.',
      },
      {
        question: 'Mit welchen Zahlungsanbietern funktioniert MYFUNDBOX?',
        answer:
          'MYFUNDBOX funktioniert mit Stripe, GoCardless, Mollie, PayPal und Checkout.com. Je nach Anbieter zahlen Kunden per Karte, SEPA-Lastschrift, ACH, Überweisung oder Open Banking.',
      },
      {
        question: 'Was passiert, wenn eine Zahlung fehlschlägt?',
        answer:
          'Das Mahnwesen wiederholt die Zahlung automatisch und versendet Erinnerungen nach Ihrem Zeitplan, damit Kunden ihre Zahlungsdaten aktualisieren können.',
      },
      {
        question: 'Können Kunden ihre Abos selbst verwalten?',
        answer:
          'Ja. Im Kundenportal ändern Kunden ihre Karte, wechseln den Tarif und sehen ihre Rechnungen ein – ohne Ihr Team zu kontaktieren.',
      },
      {
        question: 'Wo werden meine Daten gespeichert?',
        answer:
          'MYFUNDBOX speichert Daten in Frankfurt und bietet einen Auftragsverarbeitungsvertrag nach DSGVO. Konten lassen sich per Zwei-Faktor-Authentifizierung schützen.',
      },
      {
        question: 'Gibt es einen kostenlosen Tarif?',
        answer:
          'Ja. Der kostenlose Tarif umfasst bis zu 25 Abonnenten. Kostenpflichtige Tarife bieten mehr Abonnenten und Funktionen; aktuelle Tarife finden Sie auf der Preisseite.',
      },
      {
        question: 'Hat MYFUNDBOX eine API?',
        answer:
          'Ja. Eine REST-API und Webhooks stehen zur Verfügung, dokumentiert unter docs.myfundbox.com.',
      },
    ],
  },
];

export const ALL_PAGES: PageMetadataEntry[] = [...CORE_PAGES, ...LOCALIZED_HOME_PAGES];

const PAGES_BY_PATH = new Map(ALL_PAGES.map((p) => [p.path, p]));

/** Strips query, hash and trailing slashes. The root stays '/'. */
export function normalizeRoutePath(pathname: string): string {
  return pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
}

export function resolvePageByPath(pathname: string): PageMetadataEntry | undefined {
  return PAGES_BY_PATH.get(normalizeRoutePath(pathname));
}

export function pageExists(pathname: string): boolean {
  return PAGES_BY_PATH.has(normalizeRoutePath(pathname));
}

/** Splits '/de/pricing' into { locale: 'de', suffix: '/pricing' } and '/pricing' into { locale: 'en', suffix: '/pricing' }. */
export function splitLocale(pathname: string): { locale: LocaleCode; suffix: string } {
  const clean = normalizeRoutePath(pathname);
  const m = clean.match(/^\/de(\/.*)?$/);
  if (m) return { locale: 'de', suffix: m[1] || '/' };
  return { locale: 'en', suffix: clean };
}

/** Builds the URL of an English canonical path for a locale. English is at the root, German under /de. */
export function pathForLocale(locale: LocaleCode, suffix: string): string {
  const clean = normalizeRoutePath(suffix);
  if (locale === 'en') return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Link target for an English canonical path, seen from a page in `locale`.
 * Uses the localized page when one exists, otherwise falls back to English,
 * so a link never points to a German URL that has no page.
 */
export function localizeHref(locale: LocaleCode, englishPath: string): string {
  if (locale === 'en') return englishPath;
  const [pathPart, hash] = englishPath.split('#');
  const localized = pathForLocale(locale, pathPart);
  const target = pageExists(localized) ? localized : pathPart;
  return hash ? `${target}#${hash}` : target;
}
