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
    'MYFUNDBOX is EU-based revenue management software built in Germany for CFOs, controllers, and RevOps teams to track, recognize, forecast, and report recurring revenue.',
  headquartersLocation: 'Germany [ADD: City & Street Address]',
  foundingYear: '[ADD: Founding Year]',
  euDataResidency: '[CONFIRM: Frankfurt am Main, Germany (AWS eu-central-1 / EU ISO-27001 region)]',
  defaultCurrency: 'EUR' as const,
  contactEmail: '[ADD: finance-team@myfundbox.example]',
  dpoEmail: '[ADD: privacy@myfundbox.example]',
  demoEndpoint: '/api/demo-request',
  lastUpdatedIso: '2026-11-18',
  sameAs: [
    '[ADD: https://www.linkedin.com/company/myfundbox]',
    '[ADD: https://www.g2.com/products/myfundbox]',
    '[ADD: https://www.capterra.com/p/myfundbox]',
    '[ADD: https://www.trustpilot.com/review/myfundbox]',
    '[ADD: https://www.crunchbase.com/organization/myfundbox]',
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

export interface NavDropdownItem {
  label: string;
  description: string;
  href: string;
}

export const MEGA_MENU_PRODUCT: NavDropdownItem[] = [
  {
    label: 'Revenue Recognition',
    description: 'IFRS 15 and HGB-compliant recognition rules across subscriptions and contracts.',
    href: '/en/product/revenue-recognition',
  },
  {
    label: 'Deferred Revenue & Accruals',
    description: 'Automated roll-forward schedules, unbilled receivables, and period-end cutoffs.',
    href: '/en/product/deferred-revenue-accruals',
  },
  {
    label: 'Revenue Reporting & Analytics',
    description: 'Audit-ready MRR, ARR, NRR, churn, expansion, and cohort reporting in EUR.',
    href: '/en/product/revenue-reporting',
  },
  {
    label: 'Revenue Forecasting',
    description: 'Contract-level backlog projections and cash vs. recognized revenue scenarios.',
    href: '/en/product/revenue-forecasting',
  },
  {
    label: 'Integrations & API',
    description: 'Connect billing, CRM, and European accounting/ERP exports including DATEV.',
    href: '/en/product/integrations-api',
  },
];

export const MEGA_MENU_SOLUTIONS: NavDropdownItem[] = [
  {
    label: 'B2B SaaS Companies',
    description: 'Multi-year contracts, seat upgrades, and IFRS 15 waterfall automation.',
    href: '/en/solutions/saas',
  },
  {
    label: 'Finance Teams & CFOs',
    description: 'Immutable audit trails, board-ready SaaS KPIs, and faster month-end close.',
    href: '/en/solutions/finance-teams-cfo',
  },
  {
    label: 'Digital Services & Media',
    description: 'Prepaid annual subscriptions, usage tiers, and EU VAT net-revenue separation.',
    href: '/en/solutions/digital-services',
  },
  {
    label: 'Memberships & Associations',
    description: 'Prorated annual dues, deferred liability tracking, and cohort retention.',
    href: '/en/solutions/memberships',
  },
  {
    label: 'Agencies & Retainers',
    description: 'Milestone-based and recurring retainer recognition with accrued revenue visibility.',
    href: '/en/solutions/agencies',
  },
];

export const LOCALE_UI_COPY: Record<
  LocaleCode,
  {
    languageName: string;
    nav: { product: string; solutions: string; compare: string; pricing: string; resources: string; bookDemo: string };
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
      compare: 'Compare',
      pricing: 'Pricing',
      resources: 'Resources',
      bookDemo: 'Book a demo',
    },
    heroEyebrow: 'EU-Based Revenue Management Software · Built in Germany',
    heroTitle: 'Audit-ready revenue recognition and forecasting for European finance teams',
    heroSubtitle:
      'MYFUNDBOX helps CFOs, controllers, and RevOps teams track, recognize, forecast, and report recurring revenue under IFRS 15 and HGB/GoBD—without replacing your billing or payment stack.',
    secondaryCta: 'Estimate deferred revenue',
    cookieBannerTitle: 'Privacy & Cookie Preferences (GDPR / ePrivacy)',
    cookieBannerText:
      'MYFUNDBOX loads zero third-party analytics or marketing trackers before your explicit consent. Strictly necessary cookies store only your theme and consent choice.',
    acceptEssential: 'Essential only',
    acceptAll: 'Accept analytics',
    cookieSettings: 'Preferences',
  },
  de: {
    languageName: 'Deutsch',
    nav: {
      product: 'Produkt',
      solutions: 'Lösungen',
      compare: 'Vergleich',
      pricing: 'Preise',
      resources: 'Ressourcen',
      bookDemo: 'Demo buchen',
    },
    heroEyebrow: 'EU-Revenue-Management-Software · Entwickelt in Deutschland',
    heroTitle: 'Prüfungssichere Umsatzabgrenzung und Prognosen für Finanzteams',
    heroSubtitle:
      'MYFUNDBOX unterstützt CFOs, Controller und Buchhaltung bei Umsatzrealisierung (IFRS 15 & HGB/GoBD), Abgrenzungsposten, MRR/ARR-Reporting und Forecasting – unabhängig von Ihrem Zahlungsanbieter.',
    secondaryCta: 'Abgrenzung berechnen',
    cookieBannerTitle: 'Datenschutz & Cookie-Einstellungen (DSGVO / TTDSG)',
    cookieBannerText:
      'MYFUNDBOX lädt vor Ihrer ausdrücklichen Einwilligung keine Drittanbieter-Tracker. Technisch notwendige Cookies speichern ausschließlich Ihre Auswahl.',
    acceptEssential: 'Nur notwendige',
    acceptAll: 'Analyse akzeptieren',
    cookieSettings: 'Einstellungen',
  },
  fr: {
    languageName: 'Français',
    nav: {
      product: 'Produit',
      solutions: 'Solutions',
      compare: 'Comparer',
      pricing: 'Tarifs',
      resources: 'Ressources',
      bookDemo: 'Réserver une démo',
    },
    heroEyebrow: 'Logiciel européen de gestion des revenus · Basé en Allemagne',
    heroTitle: 'Reconnaissance des revenus conforme IFRS 15 et prévisions financières',
    heroSubtitle:
      'MYFUNDBOX aide les directions financières et contrôleurs européens à suivre, reconnaître, prévoir et auditer leurs revenus récurrents—sans remplacer votre outil de facturation.',
    secondaryCta: 'Estimer les PCA',
    cookieBannerTitle: 'Confidentialité et gestion des cookies (RGPD)',
    cookieBannerText:
      'MYFUNDBOX ne déclenche aucun traceur tiers avant votre consentement explicite. Les cookies essentiels mémorisent uniquement vos préférences.',
    acceptEssential: 'Essentiels uniquement',
    acceptAll: 'Accepter la mesure',
    cookieSettings: 'Préférences',
  },
  es: {
    languageName: 'Español',
    nav: {
      product: 'Producto',
      solutions: 'Soluciones',
      compare: 'Comparar',
      pricing: 'Precios',
      resources: 'Recursos',
      bookDemo: 'Solicitar demo',
    },
    heroEyebrow: 'Software europeo de gestión de ingresos · Con sede en Alemania',
    heroTitle: 'Reconocimiento de ingresos IFRS 15 y previsión para equipos financieros',
    heroSubtitle:
      'MYFUNDBOX permite a CFOs y controllers europeos contabilizar ingresos diferidos, analizar MRR/ARR y generar cierres auditables sin sustituir su pasarela de pagos.',
    secondaryCta: 'Estimar ingresos diferidos',
    cookieBannerTitle: 'Preferencias de privacidad y cookies (RGPD)',
    cookieBannerText:
      'MYFUNDBOX no carga rastreadores de terceros sin su consentimiento explícito. Las cookies esenciales solo guardan sus preferencias locales.',
    acceptEssential: 'Solo esenciales',
    acceptAll: 'Aceptar analítica',
    cookieSettings: 'Configurar',
  },
};
