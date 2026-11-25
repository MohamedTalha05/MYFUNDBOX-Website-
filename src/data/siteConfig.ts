import type { LocaleCode } from '../utils/formatting';
import { CONFIRMED_INTEGRATIONS, liveIntegrationUrl, type ConfirmedIntegration } from './liveSite';

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
  /** Positioning approved for Phase 3A (2026-11-25). Used in structured data and llms.txt. */
  tagline: 'The Revenue Infrastructure for Modern Businesses.',
  oneLineDescription:
    'MYFUNDBOX is a revenue management platform for modern businesses: subscription management, recurring billing, quantity-based subscriptions, payments across multiple gateways, failed-payment recovery and revenue reporting in one place.',
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
  | 'paymentIntegrations' | 'accounting' | 'tax' | 'integrations'
  | 'blog' | 'guides' | 'docs' | 'faq'
  | 'about' | 'contact' | 'demo';

export interface NavMenuItem {
  label: string;
  description: string;
  href: string;
  fallbackHref?: string;
  /** German destination for external links (e.g. the live /de/integrations/* pages). */
  deHref?: string;
  icon: NavIconKey;
  /** Partner logo shown instead of the icon (integrations menu). */
  logoSrc?: string;
  de?: { label: string; description: string };
}

export interface NavMenu {
  key: 'platform' | 'solutions' | 'integrations' | 'resources' | 'company';
  items: NavMenuItem[];
}

const CATEGORY_DESC: Record<ConfirmedIntegration['category'], { en: string; de: string }> = {
  payments: { en: 'Payment gateway', de: 'Zahlungsanbieter' },
  accounting: { en: 'Accounting', de: 'Buchhaltung' },
  tax: { en: 'Tax calculation', de: 'Steuerberechnung' },
  automation: { en: 'Workflow automation', de: 'Workflow-Automatisierung' },
};

/**
 * Integrations menu: only team-confirmed integrations that have a live page on myfundbox.com
 * (src/data/liveSite.ts). They link to those existing pages; this repo has no /integrations routes.
 */
const INTEGRATION_MENU_ITEMS: NavMenuItem[] = [
  ...CONFIRMED_INTEGRATIONS.map(
    (i): NavMenuItem => ({
      label: i.name,
      description: CATEGORY_DESC[i.category].en,
      href: liveIntegrationUrl(i.slug, 'en'),
      deHref: liveIntegrationUrl(i.slug, 'de'),
      icon: i.category === 'payments' ? 'paymentIntegrations' : i.category === 'tax' ? 'tax' : 'accounting',
      logoSrc: i.logoSrc,
      de: { label: i.name, description: CATEGORY_DESC[i.category].de },
    })
  ),
  {
    label: 'All integrations',
    description: 'Browse the full integrations directory.',
    href: liveIntegrationUrl(null, 'en'),
    deHref: liveIntegrationUrl(null, 'de'),
    icon: 'integrations',
    de: { label: 'Alle Integrationen', description: 'Das vollständige Integrationsverzeichnis.' },
  },
];

export const NAV_MENUS: NavMenu[] = [
  {
    key: 'platform',
    items: [
      {
        label: 'Platform Overview',
        description: 'One connected platform for recurring revenue.',
        href: '/product',
        icon: 'revenue',
        de: { label: 'Plattform-Überblick', description: 'Eine vernetzte Plattform für wiederkehrende Umsätze.' },
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
        label: 'Recurring Billing',
        description: 'One-time and recurring invoicing, automated.',
        href: '/recurring-billing',
        fallbackHref: '/product',
        icon: 'billing',
        de: { label: 'Wiederkehrende Abrechnung', description: 'Einmalige und wiederkehrende Rechnungen, automatisiert.' },
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
        label: 'Payment Recovery',
        description: 'Automatic retries for failed card payments.',
        href: '/dunning-management',
        fallbackHref: '/product',
        icon: 'dunning',
        de: { label: 'Zahlungswiederherstellung', description: 'Automatische Wiederholung fehlgeschlagener Kartenzahlungen.' },
      },
      {
        label: 'Revenue Reporting',
        description: 'Revenue, subscriptions and payments at a glance.',
        href: '/revenue-analytics',
        fallbackHref: '/product',
        icon: 'analytics',
        de: { label: 'Umsatz-Reporting', description: 'Umsatz, Abos und Zahlungen auf einen Blick.' },
      },
    ],
  },
  {
    key: 'solutions',
    items: [
      {
        label: 'SaaS Businesses',
        description: 'Plans, seats, trials and upgrades for software.',
        href: '/solutions/saas',
        icon: 'saas',
        de: { label: 'SaaS-Unternehmen', description: 'Tarife, Lizenzen, Testphasen und Upgrades für Software.' },
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
        description: 'Courses, content and digital services.',
        href: '/solutions/digital-businesses',
        fallbackHref: '/solutions/digital-services',
        icon: 'digital',
        de: { label: 'Digitale Unternehmen', description: 'Kurse, Inhalte und digitale Services.' },
      },
    ],
  },
  { key: 'integrations', items: INTEGRATION_MENU_ITEMS },
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
        label: 'FAQs',
        description: 'Answers to common questions.',
        href: '/help',
        icon: 'faq',
        de: { label: 'FAQs', description: 'Antworten auf häufige Fragen.' },
      },
      // "Documentation" (docs.myfundbox.com) removed 2026-11-25: the docs site serves an empty
      // placeholder page. Re-add it once the documentation is published.
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
      {
        label: 'Book a Demo',
        description: 'A walkthrough tailored to your business.',
        href: '/book-a-demo',
        icon: 'demo',
        de: { label: 'Demo buchen', description: 'Eine Tour, zugeschnitten auf Ihr Geschäft.' },
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
// Footer (rebuilt 2026-11-25). Columns reuse the header menu items (same pages, fallbacks and
// German labels). Internal links resolve through resolveNavHref, so an unbuilt page uses its
// fallback or is hidden; app links use APP_LINKS (existing app flow); integration links go to
// the existing live integration pages.
// ---------------------------------------------------------------------------

export interface FooterLink {
  label: string;
  de?: string;
  href: string;
  /** German destination for external links. */
  deHref?: string;
  fallbackHref?: string;
}

export interface FooterColumn {
  key: 'platform' | 'solutions' | 'integrations' | 'resources' | 'company';
  title: string;
  titleDe: string;
  links: FooterLink[];
}

const menuLinks = (key: NavMenu['key']): FooterLink[] =>
  (NAV_MENUS.find((m) => m.key === key)?.items ?? []).map((i) => ({
    label: i.label,
    de: i.de?.label,
    href: i.href,
    deHref: i.deHref,
    fallbackHref: i.fallbackHref,
  }));

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    key: 'platform',
    title: 'Platform',
    titleDe: 'Plattform',
    links: [...menuLinks('platform'), { label: 'Pricing', de: 'Preise', href: '/pricing' }],
  },
  { key: 'solutions', title: 'Solutions', titleDe: 'Lösungen', links: menuLinks('solutions') },
  {
    key: 'integrations',
    title: 'Integrations',
    titleDe: 'Integrationen',
    // Payment gateways + the directory; the full confirmed list is in the header menu.
    links: menuLinks('integrations').filter(
      (l) => CONFIRMED_INTEGRATIONS.some((i) => i.name === l.label && i.category === 'payments') || l.label === 'All integrations'
    ),
  },
  { key: 'resources', title: 'Resources', titleDe: 'Ressourcen', links: menuLinks('resources') },
  {
    key: 'company',
    title: 'Company',
    titleDe: 'Unternehmen',
    links: [...menuLinks('company'), { label: 'Login', de: 'Anmelden', href: APP_LINKS.login }],
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
    description: 'The revenue infrastructure for modern businesses: subscriptions, recurring billing, payments and revenue operations in one platform.',
    rights: 'All rights reserved.',
    followUs: 'Follow MYFUNDBOX',
    legal: 'Legal',
  },
  de: {
    description: 'Die Revenue-Infrastruktur für moderne Unternehmen: Abonnements, wiederkehrende Abrechnung, Zahlungen und Umsatzprozesse auf einer Plattform.',
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
      platform: string;
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
      platform: 'Platform',
      solutions: 'Solutions',
      pricing: 'Pricing',
      developers: 'Developers',
      resources: 'Resources',
      integrations: 'Integrations',
      company: 'Company',
      login: 'Login',
      getStarted: 'Get Started',
      bookDemo: 'Book a Demo',
    },
    // Homepage copy now lives in src/data/homeContent.ts; these remain for other consumers.
    heroEyebrow: 'The Revenue Infrastructure for Modern Businesses',
    heroTitle: 'Your Business. Your Revenue Models. One Powerful Platform.',
    heroSubtitle:
      'Manage subscriptions, recurring payments and revenue operations with MYFUNDBOX. One flexible platform designed to support the way modern businesses grow.',
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
      platform: 'Plattform',
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
    heroEyebrow: 'Die Revenue-Infrastruktur für moderne Unternehmen',
    heroTitle: 'Ihr Unternehmen. Ihre Umsatzmodelle. Eine starke Plattform.',
    heroSubtitle:
      'Verwalten Sie Abonnements, wiederkehrende Zahlungen und Umsatzprozesse mit MYFUNDBOX. Eine flexible Plattform, die mit Ihrem Unternehmen wächst.',
    secondaryCta: 'Plattform entdecken',
    cookieBannerTitle: 'Datenschutz- & Cookie-Einstellungen',
    cookieBannerText:
      'MYFUNDBOX lädt vor Ihrer Einwilligung keine Drittanbieter-Tracker. Technisch notwendiger Speicher sichert nur Ihr Farbschema und Ihre Einwilligung.',
    acceptEssential: 'Nur notwendige',
    acceptAll: 'Analyse akzeptieren',
    cookieSettings: 'Einstellungen',
  },
};
