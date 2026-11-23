import type { LocaleCode } from '../utils/formatting';

export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

export const SITE_CONFIG = {
  brandName: 'MYFUNDBOX',
  legalEntityName: '[ADD: MYFUNDBOX Legal Entity GmbH]',
  oneLineDescription:
    'MYFUNDBOX is a revenue management platform for subscription businesses: recurring billing, payments across multiple gateways, dunning, customer self-service and revenue reporting in one place.',
  headquartersLocation: 'Germany [ADD: City & Street Address]',
  foundingYear: '[ADD: Founding Year]',
  euDataResidency: '[CONFIRM: Frankfurt am Main, Germany (AWS eu-central-1 / EU ISO-27001 region)]',
  defaultCurrency: 'EUR' as const,
  contactEmail: '[ADD: finance-team@myfundbox.example]',
  dpoEmail: '[ADD: privacy@myfundbox.example]',
  // On a static host (GitHub Pages) there is no /api, so set VITE_DEMO_ENDPOINT at build time
  // to a form service that accepts JSON POSTs (e.g. https://formspree.io/f/xxxx).
  demoEndpoint:
    ((import.meta as { env?: Record<string, string | undefined> }).env?.VITE_DEMO_ENDPOINT) || '/api/demo-request',
  lastUpdatedIso: '2026-11-18',
  // Official profiles linked from the live myfundbox.com footer (checked 2026-11-19).
  // Review-site profiles (G2 etc.) are left out until their exact URLs are confirmed.
  sameAs: [
    'https://www.linkedin.com/company/myfundbox',
    'https://twitter.com/MYFUNDBOX_Subs',
    'https://www.facebook.com/myfundbox',
    'https://www.instagram.com/myfundbox',
    'https://www.youtube.com/channel/UCd3Q_JlwprHHhA4JsNdxccw',
  ],
  supportedIntegrations: [
    { name: 'DATEV', category: 'German Accounting & Tax', status: '[CONFIRM: Export / API]' },
    { name: 'SAP Business One / S/4HANA', category: 'Enterprise ERP', status: '[CONFIRM: Connector]' },
    { name: 'Xero', category: 'Cloud Accounting', status: '[CONFIRM: Connector]' },
    { name: 'Exact Online', category: 'Benelux Accounting', status: '[CONFIRM: Connector]' },
    { name: 'NetSuite', category: 'Cloud ERP', status: '[CONFIRM: Connector]' },
    { name: 'Stripe Billing & Invoices', category: 'Billing Data Source', status: '[CONFIRM: Read-Only Sync]' },
    { name: 'Chargebee', category: 'Subscription Billing Source', status: '[CONFIRM: Read-Only Sync]' },
    { name: 'HubSpot', category: 'CRM / Deal Pipeline', status: '[CONFIRM: Connector]' },
    { name: 'Salesforce', category: 'Enterprise CRM', status: '[CONFIRM: Connector]' },
    { name: 'REST API & Webhooks', category: 'Custom Data Ingestion', status: '[CONFIRM: OpenAPI Spec]' },
  ],
  complianceStandards: [
    { name: 'IFRS 15', scope: '5-step revenue recognition & performance obligations', status: 'Supported by rule engine' },
    { name: 'German HGB & GoBD', scope: 'Immutability, audit trail, DATEV-ready journal structure', status: '[CONFIRM: External GoBD attestation status]' },
    { name: 'GDPR (DSGVO)', scope: 'EU data residency, DPA available, zero third-party trackers before consent', status: 'EU-first architecture' },
    { name: 'EU VAT Handling', scope: 'Separates net recognized revenue from VAT liability in journal schedules', status: 'Built-in net/tax separation' },
    { name: 'ISO 27001 / SOC 2', scope: 'Information security management & infrastructure controls', status: '[ADD: Certification / Hosting Attestation]' },
  ],
  authors: [
    {
      id: 'elena-bauer',
      name: '[ADD: Author Name — Revenue Accounting Lead]',
      role: 'Head of Revenue Accounting Advisory',
      credentials: '[ADD: Wirtschaftsprüfer / CPA / IFRS 15 Specialist]',
      bio: 'Advises European B2B SaaS finance teams on IFRS 15 contract modifications, multi-element arrangements, and HGB/GoBD audit readiness.',
    },
    {
      id: 'tobias-richter',
      name: '[ADD: Author Name — Financial Systems Architect]',
      role: 'Principal Product Architect, Revenue Sub-Ledger',
      credentials: '[ADD: M.Sc. Finance & Information Systems]',
      bio: 'Designs deterministic double-entry revenue recognition pipelines, ERP journal mappings, and API data ingestion architectures for EU controllers.',
    },
  ] satisfies AuthorProfile[],
};

// ---------------------------------------------------------------------------
// External destinations
// ---------------------------------------------------------------------------

/**
 * Log-in and sign-up live in the existing MYFUNDBOX app, not on this site, so current
 * accounts and their flows keep working unchanged.
 * Both point at the app entry point, as instructed by the MYFUNDBOX team on 2026-11-19 ("for now").
 * The live-site paths /login-mfb and /sign-up are also redirected there (see redirects.ts).
 */
export const APP_LINKS = {
  login: 'https://app.subscriptionbilling.eu/?app=1',
  signUp: 'https://app.subscriptionbilling.eu/?app=1',
  docs: 'https://docs.myfundbox.com/',
} as const;

// ---------------------------------------------------------------------------
// Navigation. All hrefs are English canonical paths. Components localize them
// with localizeHref(), and hide internal links whose page doesn't exist yet,
// so the menus never link to a 404 while pages are being built.
// ---------------------------------------------------------------------------

export interface NavDropdownItem {
  label: string;
  description: string;
  href: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  /** Used when `href` is an internal page that doesn't exist yet. */
  fallbackHref?: string;
  /** Key into LOCALE_UI_COPY[locale].nav for a translated label. */
  copyKey?: 'pricing' | 'developers' | 'resources';
}

export const MEGA_MENU_PRODUCT: NavDropdownItem[] = [
  {
    label: 'Overview',
    description: 'Explore the full subscription billing platform architecture.',
    href: '/product',
  },
  {
    label: 'Subscription management',
    description: 'Plans, renewals, upgrades and cancellations in one place.',
    href: '/subscription-management',
  },
  {
    label: 'Recurring billing',
    description: 'One-time and recurring charges, billed automatically.',
    href: '/recurring-billing',
  },
  {
    label: 'Payment management',
    description: 'Stripe, GoCardless, Mollie, PayPal and more, side by side.',
    href: '/payment-management',
  },
  {
    label: 'Pay links',
    description: 'Send a link and get paid, no website needed.',
    href: '/pay-links',
  },
  {
    label: 'Dunning management',
    description: 'Automatic retries and reminders for failed payments.',
    href: '/dunning-management',
  },
  {
    label: 'Customer portal',
    description: 'Customers update cards, plans and details themselves.',
    href: '/customer-portal',
  },
  {
    label: 'Revenue analytics',
    description: 'Revenue, subscriptions and failed payments at a glance.',
    href: '/revenue-analytics',
  },
  {
    label: 'Integrations',
    description: 'Payment gateways, accounting and tax tools.',
    href: '/integrations/payments',
  },
];

export const MEGA_MENU_SOLUTIONS: NavDropdownItem[] = [
  {
    label: 'SaaS businesses',
    description: 'Plans, trials and upgrades for software products.',
    href: '/solutions/saas',
  },
  {
    label: 'Subscription businesses',
    description: 'Boxes, services and memberships billed every cycle.',
    href: '/solutions/subscription-businesses',
  },
  {
    label: 'Digital businesses',
    description: 'Courses, content and downloads sold worldwide.',
    href: '/solutions/digital-businesses',
  },
  {
    label: 'Memberships',
    description: 'Recurring dues for clubs, communities and associations.',
    href: '/solutions/memberships',
  },
  {
    label: 'Agencies',
    description: 'Retainers and recurring client billing.',
    href: '/solutions/agencies',
  },
];

// ---------------------------------------------------------------------------
// Header navigation (premium navbar, 2026-11-19).
// Each item points at its own canonical page. While that page is unbuilt, `fallbackHref`
// sends visitors to the closest existing page instead of a 404; once the page exists the
// nav switches to it automatically (see resolveNavHref). Items with neither are hidden.
// ---------------------------------------------------------------------------

export type NavIconKey =
  | 'revenue' | 'subscriptions' | 'billing' | 'payments' | 'dunning' | 'analytics'
  | 'saas' | 'subscriptionBusiness' | 'digital'
  | 'paymentIntegrations' | 'accounting' | 'tax'
  | 'blog' | 'guides' | 'docs' | 'faq'
  | 'about' | 'contact';

export interface NavMenuItem {
  label: string;
  description: string;
  href: string;
  fallbackHref?: string;
  icon: NavIconKey;
  de?: { label: string; description: string };
}

export interface NavMenu {
  key: 'product' | 'solutions' | 'integrations' | 'resources' | 'company';
  items: NavMenuItem[];
}

export const NAV_MENUS: NavMenu[] = [
  {
    key: 'product',
    items: [
      {
        label: 'Revenue Management',
        description: 'The complete platform for recurring revenue.',
        href: '/product',
        icon: 'revenue',
        de: { label: 'Revenue Management', description: 'Die komplette Plattform für wiederkehrende Umsätze.' },
      },
      {
        label: 'Subscription Management',
        description: 'Plans, trials, upgrades and renewals.',
        href: '/subscription-management',
        fallbackHref: '/product',
        icon: 'subscriptions',
        de: { label: 'Abo-Verwaltung', description: 'Tarife, Testphasen, Upgrades und Verlängerungen.' },
      },
      {
        label: 'Billing Management',
        description: 'One-time and recurring invoicing, automated.',
        href: '/recurring-billing',
        fallbackHref: '/product',
        icon: 'billing',
        de: { label: 'Abrechnung', description: 'Einmalige und wiederkehrende Rechnungen, automatisiert.' },
      },
      {
        label: 'Payment Management',
        description: 'Multiple gateways and payment methods.',
        href: '/payment-management',
        fallbackHref: '/product',
        icon: 'payments',
        de: { label: 'Zahlungsmanagement', description: 'Mehrere Zahlungsanbieter und Zahlungsarten.' },
      },
      {
        label: 'Dunning Management',
        description: 'Recover failed payments automatically.',
        href: '/dunning-management',
        fallbackHref: '/product',
        icon: 'dunning',
        de: { label: 'Mahnwesen', description: 'Fehlgeschlagene Zahlungen automatisch zurückholen.' },
      },
      {
        label: 'Revenue Analytics',
        description: 'MRR, subscriptions and payments at a glance.',
        href: '/revenue-analytics',
        fallbackHref: '/product',
        icon: 'analytics',
        de: { label: 'Umsatzanalysen', description: 'MRR, Abos und Zahlungen auf einen Blick.' },
      },
    ],
  },
  {
    key: 'solutions',
    items: [
      {
        label: 'SaaS Businesses',
        description: 'Plans, trials and upgrades for software.',
        href: '/solutions/saas',
        icon: 'saas',
        de: { label: 'SaaS-Unternehmen', description: 'Tarife, Testphasen und Upgrades für Software.' },
      },
      {
        label: 'Subscription Businesses',
        description: 'Boxes, services and memberships.',
        href: '/solutions/subscription-businesses',
        fallbackHref: '/solutions/memberships',
        icon: 'subscriptionBusiness',
        de: { label: 'Abo-Unternehmen', description: 'Boxen, Services und Mitgliedschaften.' },
      },
      {
        label: 'Digital Businesses',
        description: 'Courses, content and downloads.',
        href: '/solutions/digital-businesses',
        fallbackHref: '/solutions/digital-services',
        icon: 'digital',
        de: { label: 'Digitale Unternehmen', description: 'Kurse, Inhalte und Downloads.' },
      },
    ],
  },
  {
    key: 'integrations',
    items: [
      {
        label: 'Payment Integrations',
        description: 'Stripe, GoCardless, Mollie, PayPal, Checkout.com.',
        href: '/integrations/payments',
        fallbackHref: '/product/integrations-api',
        icon: 'paymentIntegrations',
        de: { label: 'Zahlungsintegrationen', description: 'Stripe, GoCardless, Mollie, PayPal, Checkout.com.' },
      },
      {
        label: 'Accounting Integrations',
        description: 'QuickBooks, Xero, sevdesk, Lexware.',
        href: '/integrations/accounting',
        fallbackHref: '/product/integrations-api',
        icon: 'accounting',
        de: { label: 'Buchhaltungsintegrationen', description: 'QuickBooks, Xero, sevdesk, Lexware.' },
      },
      {
        label: 'Tax Integrations',
        description: 'Automated tax calculation with Avalara.',
        href: '/integrations/tax',
        fallbackHref: '/product/integrations-api',
        icon: 'tax',
        de: { label: 'Steuerintegrationen', description: 'Automatische Steuerberechnung mit Avalara.' },
      },
    ],
  },
  {
    key: 'resources',
    items: [
      {
        label: 'Blog',
        description: 'Insights on billing and recurring revenue.',
        href: '/blog',
        icon: 'blog',
        de: { label: 'Blog', description: 'Wissen rund um Abrechnung und wiederkehrende Umsätze.' },
      },
      {
        label: 'Guides',
        description: 'In-depth guides for subscription businesses.',
        href: '/guides',
        fallbackHref: '/resources',
        icon: 'guides',
        de: { label: 'Leitfäden', description: 'Ausführliche Leitfäden für Abo-Unternehmen.' },
      },
      {
        label: 'Documentation',
        description: 'API reference, webhooks and setup.',
        href: APP_LINKS.docs,
        icon: 'docs',
        de: { label: 'Dokumentation', description: 'API-Referenz, Webhooks und Einrichtung.' },
      },
      {
        label: 'FAQs',
        description: 'Answers to common questions.',
        href: '/help',
        icon: 'faq',
        de: { label: 'FAQs', description: 'Antworten auf häufige Fragen.' },
      },
    ],
  },
  {
    key: 'company',
    items: [
      {
        label: 'About Us',
        description: 'Who we are and what we build.',
        href: '/about',
        icon: 'about',
        de: { label: 'Über uns', description: 'Wer wir sind und was wir bauen.' },
      },
      {
        label: 'Contact',
        description: 'Talk to our team.',
        href: '/contact',
        icon: 'contact',
        de: { label: 'Kontakt', description: 'Sprechen Sie mit unserem Team.' },
      },
    ],
  },
];

/** Top-level links after the Product and Solutions menus. (Used by tests; the header now uses NAV_MENUS.) */
export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Pricing', href: '/pricing', copyKey: 'pricing' },
  { label: 'Developers', href: '/developers', fallbackHref: APP_LINKS.docs, copyKey: 'developers' },
  { label: 'Resources', href: '/resources', copyKey: 'resources' },
];

// ---------------------------------------------------------------------------
// Footer (2026-11-20). Columns reuse the header menu items (same pages, fallbacks and German
// labels), plus a few footer-only links. Internal links resolve through resolveNavHref, so an
// unbuilt page uses its fallback or is hidden; app links use APP_LINKS (existing app flow).
// ---------------------------------------------------------------------------

export interface FooterLink {
  label: string;
  de?: string;
  href: string;
  fallbackHref?: string;
}

export interface FooterColumn {
  key: 'product' | 'solutions' | 'integrations' | 'resources' | 'company';
  title: string;
  titleDe: string;
  links: FooterLink[];
}

const menuLinks = (key: NavMenu['key']): FooterLink[] =>
  (NAV_MENUS.find((m) => m.key === key)?.items ?? []).map((i) => ({
    label: i.label,
    de: i.de?.label,
    href: i.href,
    fallbackHref: i.fallbackHref,
  }));

export const FOOTER_COLUMNS: FooterColumn[] = [
  { key: 'product', title: 'Product', titleDe: 'Produkt', links: menuLinks('product') },
  { key: 'solutions', title: 'Solutions', titleDe: 'Lösungen', links: menuLinks('solutions') },
  {
    key: 'integrations',
    title: 'Integrations',
    titleDe: 'Integrationen',
    links: [
      ...menuLinks('integrations'),
      { label: 'Developer Resources', de: 'Entwickler-Ressourcen', href: '/developers', fallbackHref: APP_LINKS.docs },
    ],
  },
  { key: 'resources', title: 'Resources', titleDe: 'Ressourcen', links: menuLinks('resources') },
  {
    key: 'company',
    title: 'Company',
    titleDe: 'Unternehmen',
    links: [
      ...menuLinks('company'),
      { label: 'Book a Demo', de: 'Demo buchen', href: '/book-a-demo' },
      { label: 'Login', de: 'Anmelden', href: APP_LINKS.login },
    ],
  },
];

/** Legal pages. All existing legal URLs are kept (Imprint/DPA included; Impressum is mandatory in Germany). */
export const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', de: 'Datenschutz', href: '/privacy-policy' },
  { label: 'Terms and Conditions', de: 'AGB', href: '/terms-of-service' },
  { label: 'Cookie Policy', de: 'Cookie-Richtlinie', href: '/cookies' },
  { label: 'Imprint', de: 'Impressum', href: '/imprint' },
  { label: 'Data Processing Agreement', de: 'Auftragsverarbeitung (AVV)', href: '/dpa' },
];

export const FOOTER_COPY: Record<LocaleCode, { description: string; rights: string; followUs: string; legal: string }> = {
  en: {
    description: 'Your complete revenue management platform for subscriptions, billing and payments.',
    rights: 'All rights reserved.',
    followUs: 'Follow MYFUNDBOX',
    legal: 'Legal',
  },
  de: {
    description: 'Ihre komplette Revenue-Management-Plattform für Abonnements, Abrechnung und Zahlungen.',
    rights: 'Alle Rechte vorbehalten.',
    followUs: 'MYFUNDBOX folgen',
    legal: 'Rechtliches',
  },
};

/** Approved social profiles shown in the footer (unchanged; from the live myfundbox.com footer). */
export const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/myfundbox' },
  { key: 'x', label: 'X (Twitter)', href: 'https://twitter.com/MYFUNDBOX_Subs' },
  { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/channel/UCd3Q_JlwprHHhA4JsNdxccw' },
] as const;

// ---------------------------------------------------------------------------
// UI copy per locale
// ---------------------------------------------------------------------------

export const LOCALE_UI_COPY: Record<
  LocaleCode,
  {
    languageName: string;
    nav: {
      product: string;
      solutions: string;
      pricing: string;
      developers: string;
      resources: string;
      integrations: string;
      company: string;
      login: string;
      getStarted: string;
      bookDemo: string;
    };
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    secondaryCta: string;
    cookieBannerTitle: string;
    cookieBannerText: string;
    acceptEssential: string;
    acceptAll: string;
    cookieSettings: string;
  }
> = {
  en: {
    languageName: 'English',
    nav: {
      product: 'Product',
      solutions: 'Solutions',
      pricing: 'Pricing',
      developers: 'Developers',
      resources: 'Resources',
      integrations: 'Integrations',
      company: 'Company',
      login: 'Log in',
      getStarted: 'Get started',
      bookDemo: 'Book a demo',
    },
    // Homepage copy now lives in src/data/homeContent.ts; these remain for other consumers.
    heroEyebrow: 'Subscription billing · Payments · Revenue insights',
    heroTitle: 'Take Control of Your Revenue. Focus on Growing Your Business.',
    heroSubtitle:
      'Take control of subscriptions, billing, payments, and revenue performance with one intelligent revenue management platform.',
    secondaryCta: 'Explore the platform',
    cookieBannerTitle: 'Privacy & cookie preferences',
    cookieBannerText:
      'MYFUNDBOX loads no third-party analytics or marketing trackers before you consent. Strictly necessary storage keeps only your theme and consent choice.',
    acceptEssential: 'Essential only',
    acceptAll: 'Accept analytics',
    cookieSettings: 'Preferences',
  },
  de: {
    languageName: 'Deutsch',
    nav: {
      product: 'Produkt',
      solutions: 'Lösungen',
      pricing: 'Preise',
      developers: 'Entwickler',
      resources: 'Ressourcen',
      integrations: 'Integrationen',
      company: 'Unternehmen',
      login: 'Anmelden',
      getStarted: 'Kostenlos starten',
      bookDemo: 'Demo buchen',
    },
    heroEyebrow: 'Abo-Abrechnung · Zahlungen · Umsatz-Insights',
    heroTitle: 'Behalten Sie Ihren Umsatz im Griff. Konzentrieren Sie sich auf Ihr Wachstum.',
    heroSubtitle:
      'Behalten Sie Abonnements, Abrechnung, Zahlungen und Umsatzentwicklung im Griff – mit einer intelligenten Revenue-Management-Plattform.',
    secondaryCta: 'Plattform entdecken',
    cookieBannerTitle: 'Datenschutz- & Cookie-Einstellungen',
    cookieBannerText:
      'MYFUNDBOX lädt vor Ihrer Einwilligung keine Drittanbieter-Tracker. Technisch notwendiger Speicher sichert nur Ihr Farbschema und Ihre Einwilligung.',
    acceptEssential: 'Nur notwendige',
    acceptAll: 'Analyse akzeptieren',
    cookieSettings: 'Einstellungen',
  },
};
