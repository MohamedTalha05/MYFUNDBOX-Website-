import type { LocaleCode } from '../utils/formatting';

/**
 * Homepage copy (EN/DE) that isn't part of the SEO page entry in pagesRegistry.ts.
 *
 * Every capability named here is listed on the live myfundbox.com site (checked
 * 2026-11-19, see docs/PROJECT_PROGRESS.md §3). Company figures from the live site
 * (members, volume, users, ratings) are deliberately NOT used until they are verified.
 */

/** Payment gateways and finance tools listed on the live site. */
export const HOME_INTEGRATIONS = {
  payments: ['Stripe', 'GoCardless', 'Mollie', 'PayPal', 'Checkout.com'],
  finance: ['QuickBooks', 'Xero', 'sevdesk', 'Lexware', 'Avalara'],
  methods: ['Cards', 'SEPA Direct Debit', 'ACH', 'Bank transfer', 'Open banking'],
} as const;

/**
 * Approved customer testimonials ONLY. Each entry must be a real, verbatim quote from a named
 * customer who gave written permission to publish it (and, separately, to use their logo/video).
 * `approval` is required so every entry can be traced; it is never rendered.
 *
 * Checked 2026-11-20: no approved testimonials, case studies or customer videos exist in this repo
 * or on myfundbox.com (the live logo strip is unlabelled and has no recorded permission; the G2
 * rating and member/volume figures are unverified). So this list is empty and the customer
 * stories section shows example workflows instead. Never add placeholder or invented entries.
 */
export type ApprovedTestimonial = {
  id: string;
  /** Verbatim quote, in the language the customer gave it. Do not translate or edit. */
  quote: string;
  quoteLang: LocaleCode;
  name: string;
  role?: string;
  company: string;
  /** Only with the company's permission to use its logo. Path under /public. */
  logo?: { src: string; alt: string };
  /** Optional customer video; opened on the hosting site (no embed before cookie consent). */
  video?: { url: string; thumbnail: string; title: string };
  /** Optional link to an approved, published case study. */
  caseStudyHref?: string;
  approval: { approvedBy: string; approvedOn: string; source: string };
};

export const APPROVED_TESTIMONIALS: ApprovedTestimonial[] = [];

/** Testimonial cards replace the example workflows once at least this many are approved. */
export const MIN_TESTIMONIALS_FOR_CAROUSEL = 2;

/**
 * Homepage customer stories section. Until approved testimonials exist, it shows example
 * workflows built only from capabilities listed on the live site (docs/PROJECT_PROGRESS.md §3).
 * They carry no customer names, logos, quotes, ratings or results, and are labelled as examples.
 */
export type WorkflowStoryKey = 'launch' | 'recover' | 'portal' | 'connect' | 'invoicing';

export const CUSTOMER_STORIES_COPY: Record<
  LocaleCode,
  {
    heading: string;
    body: string;
    eyebrowTestimonials: string;
    eyebrowWorkflows: string;
    workflowKicker: string;
    workflowNote: string;
    workflows: { key: WorkflowStoryKey; title: string; body: string; steps: [string, string, string]; tags: string[] }[];
    ui: { carousel: string; prev: string; next: string; slideOf: string; goTo: string; watchVideo: string; external: string; readCaseStudy: string };
  }
> = {
  en: {
    heading: 'Helping Businesses Simplify Their Revenue Operations.',
    body: 'Discover how businesses use MYFUNDBOX to manage their subscription and payment workflows.',
    eyebrowTestimonials: 'Customer stories',
    eyebrowWorkflows: 'How businesses use MYFUNDBOX',
    workflowKicker: 'Example workflow',
    workflowNote: 'Example workflows built from MYFUNDBOX features. They are not individual customer results.',
    workflows: [
      {
        key: 'launch',
        title: 'Launch subscription offers',
        body: 'Create plans with add-ons, coupons and trials, then sell through a hosted checkout or a Pay Link.',
        steps: ['Create plan', 'Share checkout', 'Start billing'],
        tags: ['Plans & trials', 'Hosted checkout', 'Pay Links'],
      },
      {
        key: 'recover',
        title: 'Follow up on failed payments',
        body: 'Smart Dunning retries failed card payments automatically, so follow-up runs without manual steps.',
        steps: ['Payment fails', 'Automatic retry', 'Status updated'],
        tags: ['Smart Dunning', 'Card retries'],
      },
      {
        key: 'portal',
        title: 'Let customers serve themselves',
        body: 'Customers view their subscriptions and invoices, and update payment details where supported, in My Portal.',
        steps: ['Customer signs in', 'Views invoices', 'Updates details'],
        tags: ['My Portal', 'Invoices'],
      },
      {
        key: 'connect',
        title: 'Connect payments and accounting',
        body: 'Use supported gateways such as Stripe, GoCardless, Mollie and PayPal with accounting tools like QuickBooks, Xero, sevdesk and Lexware.',
        steps: ['Connect gateway', 'Collect payments', 'Connect accounting'],
        tags: ['Payment gateways', 'Accounting integrations'],
      },
      {
        key: 'invoicing',
        title: 'Keep invoicing and VAT in order',
        body: 'Issue invoices with EU VAT validation and handle refunds in the same place you manage subscriptions.',
        steps: ['Validate VAT', 'Issue invoice', 'Handle refunds'],
        tags: ['Invoicing', 'EU VAT validation', 'Refunds'],
      },
    ],
    ui: {
      carousel: 'Customer stories',
      prev: 'Previous',
      next: 'Next',
      slideOf: 'of',
      goTo: 'Go to slide',
      watchVideo: 'Watch video',
      external: 'opens on an external site',
      readCaseStudy: 'Read the case study',
    },
  },
  de: {
    heading: 'Wir helfen Unternehmen, ihre Umsatzprozesse zu vereinfachen.',
    body: 'Erfahren Sie, wie Unternehmen ihre Abo- und Zahlungsabläufe mit MYFUNDBOX verwalten.',
    eyebrowTestimonials: 'Kundenstimmen',
    eyebrowWorkflows: 'So nutzen Unternehmen MYFUNDBOX',
    workflowKicker: 'Beispiel-Ablauf',
    workflowNote: 'Beispielabläufe auf Basis der MYFUNDBOX-Funktionen. Es handelt sich nicht um Ergebnisse einzelner Kunden.',
    workflows: [
      {
        key: 'launch',
        title: 'Abo-Angebote starten',
        body: 'Erstellen Sie Tarife mit Add-ons, Gutscheinen und Testphasen und verkaufen Sie über einen gehosteten Checkout oder einen Pay Link.',
        steps: ['Tarif anlegen', 'Checkout teilen', 'Abrechnung starten'],
        tags: ['Tarife & Testphasen', 'Gehosteter Checkout', 'Pay Links'],
      },
      {
        key: 'recover',
        title: 'Fehlgeschlagene Zahlungen nachverfolgen',
        body: 'Smart Dunning wiederholt fehlgeschlagene Kartenzahlungen automatisch, ohne manuelle Zwischenschritte.',
        steps: ['Zahlung schlägt fehl', 'Automatischer Neuversuch', 'Status aktualisiert'],
        tags: ['Smart Dunning', 'Karten-Neuversuche'],
      },
      {
        key: 'portal',
        title: 'Kunden-Self-Service ermöglichen',
        body: 'Kunden sehen ihre Abonnements und Rechnungen ein und aktualisieren Zahlungsdaten, sofern unterstützt, in My Portal.',
        steps: ['Kunde meldet sich an', 'Rechnungen ansehen', 'Daten aktualisieren'],
        tags: ['My Portal', 'Rechnungen'],
      },
      {
        key: 'connect',
        title: 'Zahlungen und Buchhaltung verbinden',
        body: 'Nutzen Sie unterstützte Gateways wie Stripe, GoCardless, Mollie und PayPal zusammen mit Buchhaltungstools wie QuickBooks, Xero, sevdesk und Lexware.',
        steps: ['Gateway verbinden', 'Zahlungen einziehen', 'Buchhaltung anbinden'],
        tags: ['Zahlungsanbieter', 'Buchhaltungs-Integrationen'],
      },
      {
        key: 'invoicing',
        title: 'Rechnungen und Umsatzsteuer im Griff',
        body: 'Stellen Sie Rechnungen mit EU-USt-Prüfung aus und wickeln Sie Erstattungen dort ab, wo Sie auch Ihre Abos verwalten.',
        steps: ['USt prüfen', 'Rechnung stellen', 'Erstattung abwickeln'],
        tags: ['Rechnungen', 'EU-USt-Prüfung', 'Erstattungen'],
      },
    ],
    ui: {
      carousel: 'Kundenstimmen',
      prev: 'Zurück',
      next: 'Weiter',
      slideOf: 'von',
      goTo: 'Gehe zu Folie',
      watchVideo: 'Video ansehen',
      external: 'öffnet eine externe Website',
      readCaseStudy: 'Fallstudie lesen',
    },
  },
};

export type FeatureVisual = 'billing' | 'payments' | 'checkout' | 'dunning';

/**
 * Homepage customer self-service portal showcase ("My Portal").
 * Marketing mock-up only: it illustrates the existing My Portal, contains no forms or login,
 * and is not a separate account system. Capability list as confirmed by the MYFUNDBOX team.
 */
export type PortalFeatureKey = 'subscriptions' | 'billing' | 'invoices' | 'account' | 'payment' | 'actions';

export const PORTAL_SHOWCASE_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    features: { key: PortalFeatureKey; title: string; body: string }[];
    cta: string;
    previewLabel: string;
  }
> = {
  en: {
    eyebrow: 'My Portal',
    heading: 'Give Your Customers More Control.',
    body: 'Make it easier for customers to access their subscription and payment information through a convenient self-service experience.',
    features: [
      { key: 'subscriptions', title: 'View subscriptions', body: 'Plans, status and next payment dates.' },
      { key: 'billing', title: 'Access billing history', body: 'Past payments, whenever they need them.' },
      { key: 'invoices', title: 'View available invoices', body: 'Open and download invoices.' },
      { key: 'account', title: 'Manage account details', body: 'Keep contact and billing details current.' },
      { key: 'payment', title: 'Update payment information', body: 'Change payment details, where supported.' },
      { key: 'actions', title: 'Manage subscription actions', body: 'Use the actions you make available.' },
    ],
    cta: 'Explore Customer Portal',
    previewLabel: 'Illustrative preview',
  },
  de: {
    eyebrow: 'My Portal',
    heading: 'Geben Sie Ihren Kunden mehr Kontrolle.',
    body: 'Ihre Kunden greifen bequem per Self-Service auf ihre Abonnement- und Zahlungsinformationen zu.',
    features: [
      { key: 'subscriptions', title: 'Abonnements ansehen', body: 'Tarife, Status und nächste Zahlungstermine.' },
      { key: 'billing', title: 'Zahlungshistorie abrufen', body: 'Vergangene Zahlungen jederzeit einsehen.' },
      { key: 'invoices', title: 'Verfügbare Rechnungen ansehen', body: 'Rechnungen öffnen und herunterladen.' },
      { key: 'account', title: 'Kontodaten verwalten', body: 'Kontakt- und Rechnungsdaten aktuell halten.' },
      { key: 'payment', title: 'Zahlungsdaten aktualisieren', body: 'Zahlungsdaten ändern, sofern unterstützt.' },
      { key: 'actions', title: 'Abo-Aktionen verwalten', body: 'Die Aktionen nutzen, die Sie freigeben.' },
    ],
    cta: 'Kundenportal entdecken',
    previewLabel: 'Illustrative Vorschau',
  },
};

/**
 * Homepage industry solutions section. Card links come from the Solutions entries in
 * NAV_MENUS (siteConfig.ts), so each card goes to its own planned SEO landing page and
 * falls back to the closest existing page until that page is built.
 */
export type SolutionKey = 'saas' | 'subscriptionBusiness' | 'digital';

export const SOLUTIONS_SECTION_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    linkLabel: string;
    cards: { key: SolutionKey; title: string; body: string }[];
  }
> = {
  en: {
    eyebrow: 'Solutions',
    heading: 'Revenue Management That Adapts to Your Business.',
    body: 'Whether you run a SaaS company, subscription service or digital business, manage your revenue operations with greater clarity.',
    linkLabel: 'Explore Solution',
    cards: [
      { key: 'saas', title: 'For SaaS Companies', body: 'Manage recurring revenue, flexible plans, subscription billing and payment operations.' },
      { key: 'subscriptionBusiness', title: 'For Subscription Businesses', body: 'Simplify recurring payments, renewals, customer management and billing workflows.' },
      { key: 'digital', title: 'For Digital Businesses', body: 'Manage flexible payment models, customers and recurring revenue operations.' },
    ],
  },
  de: {
    eyebrow: 'Lösungen',
    heading: 'Revenue Management, das sich Ihrem Geschäft anpasst.',
    body: 'Ob SaaS-Unternehmen, Abo-Service oder digitales Geschäft: Steuern Sie Ihre Umsatzprozesse mit mehr Klarheit.',
    linkLabel: 'Lösung entdecken',
    cards: [
      { key: 'saas', title: 'Für SaaS-Unternehmen', body: 'Wiederkehrende Umsätze, flexible Tarife, Abo-Abrechnung und Zahlungen verwalten.' },
      { key: 'subscriptionBusiness', title: 'Für Abo-Unternehmen', body: 'Wiederkehrende Zahlungen, Verlängerungen, Kundenverwaltung und Abrechnung vereinfachen.' },
      { key: 'digital', title: 'Für digitale Unternehmen', body: 'Flexible Zahlungsmodelle, Kunden und wiederkehrende Umsätze verwalten.' },
    ],
  },
};

/**
 * Homepage global payments section.
 * The live site's "40+ countries" and "135+ currencies" claims are NOT shown: they could not be
 * verified against product documentation (docs.myfundbox.com returned no content on 2026-11-20),
 * and the live site itself is inconsistent (homepage says 135+ currencies, /other says 100+).
 * Map pins show only examples backed by the live site: Frankfurt hosting, SEPA/iDEAL (Europe),
 * ACH (US) and Instamojo (India). They are not a coverage map.
 */
export type GlobalCapabilityIcon = 'gateways' | 'methods' | 'currencies' | 'global' | 'central';

export const GLOBAL_PAYMENTS_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    capabilities: { icon: GlobalCapabilityIcon; title: string; body: string }[];
    gatewaysLabel: string;
    andMore: string;
    pins: { frankfurt: string; europe: string; us: string; india: string };
    note: string;
    mapCaption: string;
  }
> = {
  en: {
    eyebrow: 'Global payments',
    heading: 'Built for Businesses That Think Beyond Borders.',
    body: 'Manage international subscription payments with flexible payment gateway connections and multi-currency capabilities.',
    capabilities: [
      { icon: 'gateways', title: 'Multiple payment gateways', body: 'Connect the supported gateways your business uses.' },
      { icon: 'methods', title: 'International payment methods', body: 'Cards and wallets, SEPA, iDEAL, ACH and open banking.' },
      { icon: 'currencies', title: 'Multi-currency support', body: 'Bill subscriptions in more than one currency.' },
      { icon: 'global', title: 'Global subscription operations', body: 'Run recurring billing for customers in different markets.' },
      { icon: 'central', title: 'Centralised payment management', body: 'Follow payments from every gateway in one place.' },
    ],
    gatewaysLabel: 'Supported gateways include',
    andMore: 'and more',
    pins: { frankfurt: 'Data hosted in Frankfurt', europe: 'SEPA · iDEAL', us: 'ACH', india: 'Instamojo' },
    note: 'Currencies, payment methods and availability depend on your payment gateway and region.',
    mapCaption: 'Illustrative. Pins show examples, not a coverage map.',
  },
  de: {
    eyebrow: 'Globale Zahlungen',
    heading: 'Für Unternehmen, die über Grenzen hinaus denken.',
    body: 'Verwalten Sie internationale Abo-Zahlungen mit flexiblen Gateway-Anbindungen und Mehrwährungsfunktionen.',
    capabilities: [
      { icon: 'gateways', title: 'Mehrere Zahlungsanbieter', body: 'Verbinden Sie die unterstützten Gateways, die Ihr Unternehmen nutzt.' },
      { icon: 'methods', title: 'Internationale Zahlarten', body: 'Karten und Wallets, SEPA, iDEAL, ACH und Open Banking.' },
      { icon: 'currencies', title: 'Mehrwährungsfähig', body: 'Abonnements in mehr als einer Währung abrechnen.' },
      { icon: 'global', title: 'Globale Abo-Abwicklung', body: 'Wiederkehrende Abrechnung für Kunden in verschiedenen Märkten.' },
      { icon: 'central', title: 'Zentrales Zahlungsmanagement', body: 'Zahlungen aller Gateways an einem Ort verfolgen.' },
    ],
    gatewaysLabel: 'Unterstützte Gateways, u. a.',
    andMore: 'und weitere',
    pins: { frankfurt: 'Datenspeicherung in Frankfurt', europe: 'SEPA · iDEAL', us: 'ACH', india: 'Instamojo' },
    note: 'Währungen, Zahlarten und Verfügbarkeit hängen von Ihrem Zahlungsanbieter und Ihrer Region ab.',
    mapCaption: 'Illustrativ. Die Punkte zeigen Beispiele, keine Abdeckungskarte.',
  },
};

/**
 * Homepage security & reliability section.
 * Lists ONLY the security capabilities confirmed by the MYFUNDBOX team (2026-11-20):
 * two-factor authentication, 3D Secure, secure payment gateway integrations, protected
 * customer information and security-conscious payment workflows.
 * Deliberately contains no certifications (ISO 27001, SOC 2, PCI DSS), audit results,
 * uptime figures, encryption specifics or regulatory compliance claims. Add them only once
 * they are verified and documented (see docs/PROJECT_PROGRESS.md §3).
 */
export type SecurityFeatureIcon = 'twoFactor' | 'threeDS' | 'gateways' | 'customerData' | 'workflows';

export const SECURITY_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    features: { icon: SecurityFeatureIcon; title: string; body: string }[];
    note: string;
    chips: { twoFactor: string; threeDS: string; threeDSDetail: string };
  }
> = {
  en: {
    eyebrow: 'Security & reliability',
    heading: 'Built With Security at Every Step.',
    body: 'Protect payment experiences and support secure revenue operations with established security measures.',
    features: [
      { icon: 'twoFactor', title: 'Two-factor authentication', body: 'An extra verification step when signing in.' },
      { icon: 'threeDS', title: '3D Secure', body: 'Cardholder authentication for card payments.' },
      { icon: 'gateways', title: 'Secure payment gateway integrations', body: 'Connect the supported gateways your business uses.' },
      { icon: 'customerData', title: 'Protected customer information', body: 'Customer details handled with care in your account.' },
      { icon: 'workflows', title: 'Security-conscious payment workflows', body: 'Payment processes designed with security in mind.' },
    ],
    note: 'Availability of 3D Secure and other payment authentication depends on your payment gateway, card issuer and configuration.',
    chips: { twoFactor: 'Two-factor sign-in', threeDS: '3D Secure', threeDSDetail: 'Cardholder authentication' },
  },
  de: {
    eyebrow: 'Sicherheit & Zuverlässigkeit',
    heading: 'Sicherheit in jedem Schritt.',
    body: 'Schützen Sie Ihre Zahlungserlebnisse und unterstützen Sie sichere Umsatzprozesse mit bewährten Sicherheitsmaßnahmen.',
    features: [
      { icon: 'twoFactor', title: 'Zwei-Faktor-Authentifizierung', body: 'Ein zusätzlicher Bestätigungsschritt bei der Anmeldung.' },
      { icon: 'threeDS', title: '3D Secure', body: 'Karteninhaber-Authentifizierung bei Kartenzahlungen.' },
      { icon: 'gateways', title: 'Sichere Gateway-Anbindungen', body: 'Verbinden Sie die unterstützten Zahlungsanbieter, die Sie nutzen.' },
      { icon: 'customerData', title: 'Geschützte Kundendaten', body: 'Sorgfältiger Umgang mit Kundendaten in Ihrem Konto.' },
      { icon: 'workflows', title: 'Sicherheitsbewusste Zahlungsabläufe', body: 'Zahlungsprozesse, bei denen Sicherheit mitgedacht ist.' },
    ],
    note: 'Die Verfügbarkeit von 3D Secure und weiterer Zahlungsauthentifizierung hängt von Zahlungsanbieter, kartenausgebender Bank und Konfiguration ab.',
    chips: { twoFactor: 'Zwei-Faktor-Login', threeDS: '3D Secure', threeDSDetail: 'Karteninhaber-Authentifizierung' },
  },
};

/**
 * Homepage differentiation section ("More than billing"). Describes MYFUNDBOX's own
 * capabilities only: no comparisons with, or superiority claims over, named competitors.
 * NOTE: instalment plans are in the brief but were not found on the live site
 * (docs/PROJECT_PROGRESS.md §3). Confirm them in the app before launch, or remove them from
 * the `models` body and tags.
 */
export type DifferentiatorKey = 'unified' | 'models' | 'global' | 'customer';

export const DIFFERENTIATION_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: [string, string];
    body: string;
    hubLabel: string;
    items: { key: DifferentiatorKey; short: string; title: string; body: string; tags: string[] }[];
  }
> = {
  en: {
    eyebrow: 'Why MYFUNDBOX',
    heading: ['More Than Billing.', 'A Better Way to Manage Revenue.'],
    body: 'Bring essential revenue operations together in one platform designed to simplify the way businesses manage subscriptions, payments and customers.',
    hubLabel: 'One platform',
    items: [
      {
        key: 'unified',
        short: 'Operations',
        title: 'Unified Revenue Operations',
        body: 'Manage connected billing, payment and subscription workflows.',
        tags: ['Billing', 'Payments', 'Subscriptions'],
      },
      {
        key: 'models',
        short: 'Models',
        title: 'Flexible Business Models',
        body: 'Support different payment structures, from one-time to recurring and instalment plans.',
        tags: ['One-time', 'Recurring', 'Instalments'],
      },
      {
        key: 'global',
        short: 'Payments',
        title: 'Global Payment Infrastructure',
        body: 'Work with supported gateways and international payment methods.',
        tags: ['Supported gateways', 'International methods', 'Multi-currency'],
      },
      {
        key: 'customer',
        short: 'Customers',
        title: 'Connected Customer Experience',
        body: 'Bring customer information, payment activity and self-service together.',
        tags: ['Customer records', 'Payment activity', 'My Portal'],
      },
    ],
  },
  de: {
    eyebrow: 'Warum MYFUNDBOX',
    heading: ['Mehr als Abrechnung.', 'Ein besserer Weg, Umsatz zu managen.'],
    body: 'Führen Sie zentrale Umsatzprozesse auf einer Plattform zusammen, die die Verwaltung von Abonnements, Zahlungen und Kunden vereinfacht.',
    hubLabel: 'Eine Plattform',
    items: [
      {
        key: 'unified',
        short: 'Prozesse',
        title: 'Vereinte Umsatzprozesse',
        body: 'Verwalten Sie verbundene Abrechnungs-, Zahlungs- und Abo-Abläufe.',
        tags: ['Abrechnung', 'Zahlungen', 'Abonnements'],
      },
      {
        key: 'models',
        short: 'Modelle',
        title: 'Flexible Geschäftsmodelle',
        body: 'Unterstützen Sie verschiedene Zahlungsstrukturen, von Einmalzahlungen bis zu wiederkehrenden Zahlungen und Ratenplänen.',
        tags: ['Einmalig', 'Wiederkehrend', 'Raten'],
      },
      {
        key: 'global',
        short: 'Zahlungen',
        title: 'Globale Zahlungsinfrastruktur',
        body: 'Arbeiten Sie mit unterstützten Gateways und internationalen Zahlarten.',
        tags: ['Unterstützte Gateways', 'Internationale Zahlarten', 'Mehrwährungsfähig'],
      },
      {
        key: 'customer',
        short: 'Kunden',
        title: 'Vernetztes Kundenerlebnis',
        body: 'Führen Sie Kundendaten, Zahlungsaktivitäten und Self-Service zusammen.',
        tags: ['Kundendaten', 'Zahlungsaktivität', 'My Portal'],
      },
    ],
  },
};

/**
 * Homepage resources & insights section. Articles come from the live blog via
 * `npm run sync:blog` (see src/data/blogArticles.ts); this is only the surrounding copy.
 */
export const RESOURCES_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    readArticle: string;
    viewAll: string;
    latest: string;
    fallbackCategory: string;
    published: string;
    updated: string;
  }
> = {
  en: {
    eyebrow: 'Resources & insights',
    heading: 'Insights to Help You Manage Revenue Better.',
    body: 'Explore practical insights, guides and resources for subscription businesses and growing companies.',
    readArticle: 'Read Article',
    viewAll: 'View All Resources',
    latest: 'Latest',
    fallbackCategory: 'Blog',
    published: 'Published',
    updated: 'Updated',
  },
  de: {
    eyebrow: 'Ressourcen & Insights',
    heading: 'Insights für ein besseres Umsatzmanagement.',
    body: 'Entdecken Sie praxisnahe Insights, Leitfäden und Ressourcen für Abo-Unternehmen und wachsende Firmen.',
    readArticle: 'Artikel lesen',
    viewAll: 'Alle Ressourcen ansehen',
    latest: 'Neu',
    fallbackCategory: 'Blog',
    published: 'Veröffentlicht',
    updated: 'Aktualisiert',
  },
};

/** Homepage FAQ section copy. The questions and answers live in the page entry (pagesRegistry.ts). */
export const HOME_FAQ_COPY: Record<
  LocaleCode,
  { eyebrow: string; heading: string; body: string; contactPrompt: string; contactCta: string }
> = {
  en: {
    eyebrow: 'FAQ',
    heading: 'Frequently Asked Questions.',
    body: 'Find answers to common questions about revenue management, subscriptions, billing and payments.',
    contactPrompt: 'Still have a question?',
    contactCta: 'Contact our team',
  },
  de: {
    eyebrow: 'FAQ',
    heading: 'Häufig gestellte Fragen.',
    body: 'Antworten auf häufige Fragen zu Revenue Management, Abonnements, Abrechnung und Zahlungen.',
    contactPrompt: 'Noch eine Frage offen?',
    contactCta: 'Kontaktieren Sie unser Team',
  },
};

/** Homepage final conversion section. "Get Started" uses APP_LINKS.signUp (existing app flow). */
export const FINAL_CTA_COPY: Record<
  LocaleCode,
  { heading: [string, string]; body: string; primary: string; secondary: string }
> = {
  en: {
    heading: ['Ready to simplify', 'your revenue operations?'],
    body: 'Bring your subscription and payment operations together with MYFUNDBOX.',
    primary: 'Get Started',
    secondary: 'Book a Demo',
  },
  de: {
    heading: ['Bereit, Ihre Umsatzprozesse', 'zu vereinfachen?'],
    body: 'Führen Sie Ihre Abo- und Zahlungsprozesse mit MYFUNDBOX zusammen.',
    primary: 'Jetzt starten',
    secondary: 'Demo buchen',
  },
};

/**
 * Homepage how-it-works section (four connected steps with mini UI previews).
 * Phase 3A journey: Configure → Connect Payments → Manage Billing → Track Revenue.
 * Deliberately not presented as a complete Quote-to-Cash workflow.
 */
export type HowStepKey = 'connect' | 'plans' | 'manage' | 'monitor';

export const HOW_IT_WORKS_COPY: Record<
  LocaleCode,
  { eyebrow: string; heading: string; steps: { key: HowStepKey; title: string; body: string }[]; cta: string; sample: string }
> = {
  en: {
    eyebrow: 'How it works',
    heading: 'From setup to revenue, in four steps.',
    steps: [
      { key: 'plans', title: 'Configure', body: 'Set up products, plans, prices and billing intervals: recurring, one-time or quantity-based.' },
      { key: 'connect', title: 'Connect Payments', body: 'Connect the supported payment gateways and payment methods your business uses.' },
      { key: 'manage', title: 'Manage Billing', body: 'Run subscriptions, invoices and failed-payment follow-up from one place.' },
      { key: 'monitor', title: 'Track Revenue', body: 'Follow revenue, subscription and payment activity as your business grows.' },
    ],
    cta: 'Get Started',
    sample: 'Sample',
  },
  de: {
    eyebrow: 'So funktioniert’s',
    heading: 'Von der Einrichtung zum Umsatz – in vier Schritten.',
    steps: [
      { key: 'plans', title: 'Konfigurieren', body: 'Produkte, Tarife, Preise und Abrechnungsintervalle anlegen: wiederkehrend, einmalig oder mengenbasiert.' },
      { key: 'connect', title: 'Zahlungen verbinden', body: 'Die unterstützten Zahlungsanbieter und Zahlarten verbinden, die Ihr Unternehmen nutzt.' },
      { key: 'manage', title: 'Abrechnung steuern', body: 'Abonnements, Rechnungen und die Nachverfolgung fehlgeschlagener Zahlungen an einem Ort.' },
      { key: 'monitor', title: 'Umsatz verfolgen', body: 'Umsatz, Abos und Zahlungsaktivität im Blick behalten, während Ihr Unternehmen wächst.' },
    ],
    cta: 'Jetzt starten',
    sample: 'Beispiel',
  },
};

/**
 * Homepage product showcase (tabbed, illustrative interface). No real app screenshots exist
 * in the repo yet, so previews are HTML components with clearly labelled sample data that
 * describe a fictional business — never MYFUNDBOX performance figures.
 */
export type ShowcaseTabKey = 'overview' | 'subscriptions' | 'payments' | 'customers' | 'analytics';

export const PRODUCT_SHOWCASE_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    tabs: Record<ShowcaseTabKey, string>;
    badge: string;
    disclaimer: string;
    cta: string;
  }
> = {
  en: {
    eyebrow: 'Product tour',
    heading: 'Your Revenue Operations. Beautifully Connected.',
    body: 'Get a clearer view of your business through a unified revenue management experience.',
    tabs: {
      overview: 'Revenue Overview',
      subscriptions: 'Subscriptions',
      payments: 'Payments',
      customers: 'Customers',
      analytics: 'Analytics',
    },
    badge: 'Illustrative preview',
    disclaimer: 'Illustrative interface with sample data for a fictional business. Not real customer data or product performance figures.',
    cta: 'Explore MYFUNDBOX',
  },
  de: {
    eyebrow: 'Produkttour',
    heading: 'Ihr Revenue Management. Elegant vernetzt.',
    body: 'Behalten Sie Ihr Geschäft im Blick – mit einer einheitlichen Revenue-Management-Oberfläche.',
    tabs: {
      overview: 'Umsatzübersicht',
      subscriptions: 'Abonnements',
      payments: 'Zahlungen',
      customers: 'Kunden',
      analytics: 'Analysen',
    },
    badge: 'Illustrative Vorschau',
    disclaimer: 'Illustrative Oberfläche mit Beispieldaten eines fiktiven Unternehmens. Keine echten Kundendaten oder Leistungskennzahlen.',
    cta: 'MYFUNDBOX entdecken',
  },
};

/**
 * Homepage core capabilities grid. Copy supplied by the MYFUNDBOX team (2026-11-19).
 * Links go to each feature's planned page and fall back to /product until it exists.
 * NOTE: instalments and quantity-based pricing were not found on the live site when it was
 * checked (PROJECT_PROGRESS §3); confirm in the app before launch.
 */
export type CapabilityKey = 'subscriptions' | 'billing' | 'payments' | 'customers' | 'dunning' | 'analytics';

export const CAPABILITY_LINKS: Record<CapabilityKey, { href: string; fallbackHref: string }> = {
  subscriptions: { href: '/subscription-management', fallbackHref: '/product' },
  billing: { href: '/recurring-billing', fallbackHref: '/product' },
  payments: { href: '/payment-management', fallbackHref: '/product' },
  customers: { href: '/customer-portal', fallbackHref: '/product' },
  dunning: { href: '/dunning-management', fallbackHref: '/product' },
  analytics: { href: '/revenue-analytics', fallbackHref: '/product' },
};

export const CAPABILITIES_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    linkLabel: string;
    sample: string;
    cards: { key: CapabilityKey; title: string; body: string }[];
  }
> = {
  en: {
    eyebrow: 'Core capabilities',
    heading: 'Everything You Need to Manage Revenue, In One Place.',
    body: 'From subscription creation to payment recovery, manage essential revenue operations through one connected platform.',
    linkLabel: 'Explore Feature',
    sample: 'Sample',
    cards: [
      { key: 'subscriptions', title: 'Subscription Management', body: 'Manage recurring subscriptions, one-time plans, instalments and quantity-based pricing.' },
      { key: 'billing', title: 'Billing Management', body: 'Organise billing schedules, recurring payments and billing operations.' },
      { key: 'payments', title: 'Payment Management', body: 'Connect supported payment gateways and manage payment activity.' },
      { key: 'customers', title: 'Customer Management', body: 'Manage customer information, subscriptions and payment history.' },
      { key: 'dunning', title: 'Dunning Management', body: 'Monitor failed payments and manage recovery workflows.' },
      { key: 'analytics', title: 'Revenue Analytics', body: 'Understand revenue trends, subscription performance and payment activity.' },
    ],
  },
  de: {
    eyebrow: 'Kernfunktionen',
    heading: 'Alles, was Sie für Ihr Revenue Management brauchen – an einem Ort.',
    body: 'Von der Abo-Erstellung bis zur Zahlungswiederherstellung: Steuern Sie zentrale Umsatzprozesse über eine vernetzte Plattform.',
    linkLabel: 'Funktion entdecken',
    sample: 'Beispiel',
    cards: [
      { key: 'subscriptions', title: 'Abo-Verwaltung', body: 'Wiederkehrende Abonnements, einmalige Tarife, Ratenzahlungen und mengenbasierte Preise verwalten.' },
      { key: 'billing', title: 'Abrechnungsmanagement', body: 'Abrechnungspläne, wiederkehrende Zahlungen und Abrechnungsvorgänge organisieren.' },
      { key: 'payments', title: 'Zahlungsmanagement', body: 'Unterstützte Zahlungsanbieter verbinden und Zahlungsaktivitäten verwalten.' },
      { key: 'customers', title: 'Kundenverwaltung', body: 'Kundendaten, Abonnements und Zahlungshistorie verwalten.' },
      { key: 'dunning', title: 'Mahnwesen', body: 'Fehlgeschlagene Zahlungen überwachen und Wiederherstellungsabläufe steuern.' },
      { key: 'analytics', title: 'Umsatzanalysen', body: 'Umsatzentwicklung, Abo-Performance und Zahlungsaktivität verstehen.' },
    ],
  },
};

/** Homepage platform introduction (hub diagram with six modules). */
export type PlatformModuleKey = 'subscriptions' | 'billing' | 'payments' | 'customers' | 'dunning' | 'analytics';

export const PLATFORM_INTRO_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    coreLabel: string;
    modules: { key: PlatformModuleKey; title: string; body: string }[];
    cta: string;
  }
> = {
  en: {
    eyebrow: 'The MYFUNDBOX platform',
    heading: 'One Platform. Every Part of Your Revenue Operations.',
    body: 'Bring subscriptions, billing, payments, customers and revenue insights together through one connected platform.',
    coreLabel: 'Revenue platform',
    modules: [
      { key: 'subscriptions', title: 'Subscription Management', body: 'Plans, trials, upgrades and renewals.' },
      { key: 'billing', title: 'Billing Operations', body: 'One-time and recurring invoicing.' },
      { key: 'payments', title: 'Payment Management', body: 'Multiple gateways and payment methods.' },
      { key: 'customers', title: 'Customer Management', body: 'Customer records and self-service portal.' },
      { key: 'dunning', title: 'Dunning Management', body: 'Automatic retries and reminders.' },
      { key: 'analytics', title: 'Revenue Analytics', body: 'Revenue, subscription and payment insights.' },
    ],
    cta: 'Explore the Platform',
  },
  de: {
    eyebrow: 'Die MYFUNDBOX-Plattform',
    heading: 'Eine Plattform. Ihr gesamtes Revenue Management.',
    body: 'Abonnements, Abrechnung, Zahlungen, Kunden und Umsatz-Insights – vereint auf einer vernetzten Plattform.',
    coreLabel: 'Revenue-Plattform',
    modules: [
      { key: 'subscriptions', title: 'Abo-Verwaltung', body: 'Tarife, Testphasen, Upgrades und Verlängerungen.' },
      { key: 'billing', title: 'Abrechnung', body: 'Einmalige und wiederkehrende Rechnungen.' },
      { key: 'payments', title: 'Zahlungsmanagement', body: 'Mehrere Zahlungsanbieter und Zahlarten.' },
      { key: 'customers', title: 'Kundenverwaltung', body: 'Kundendaten und Self-Service-Portal.' },
      { key: 'dunning', title: 'Mahnwesen', body: 'Automatische Wiederholungen und Erinnerungen.' },
      { key: 'analytics', title: 'Umsatzanalysen', body: 'Einblicke in Umsatz, Abos und Zahlungen.' },
    ],
    cta: 'Plattform entdecken',
  },
};

/** Homepage problem section ("Growing Revenue Shouldn't Mean Managing More Complexity."). */
export type ProblemIcon = 'subscriptions' | 'payments' | 'visibility' | 'systems';

export const PROBLEM_SECTION_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    cards: { icon: ProblemIcon; title: string; body: string }[];
    transition: string;
  }
> = {
  en: {
    eyebrow: 'The challenge',
    heading: 'Growing Revenue Shouldn’t Mean Managing More Complexity.',
    body:
      'As businesses grow, managing subscriptions, billing, payments and customer relationships across disconnected systems becomes increasingly complicated.',
    cards: [
      {
        icon: 'subscriptions',
        title: 'Complex Subscriptions',
        body: 'Managing multiple plans, renewals, pricing models and billing cycles.',
      },
      {
        icon: 'payments',
        title: 'Payment Challenges',
        body: 'Handling multiple gateways, failed transactions and international payment methods.',
      },
      {
        icon: 'visibility',
        title: 'Limited Revenue Visibility',
        body: 'Understanding recurring revenue, customer activity and subscription performance.',
      },
      {
        icon: 'systems',
        title: 'Disconnected Systems',
        body: 'Managing customer information, payments and billing across different platforms.',
      },
    ],
    transition: 'There’s a simpler way',
  },
  de: {
    eyebrow: 'Die Herausforderung',
    heading: 'Wachsender Umsatz sollte nicht mehr Komplexität bedeuten.',
    body:
      'Mit dem Wachstum wird es immer aufwendiger, Abonnements, Abrechnung, Zahlungen und Kundenbeziehungen über getrennte Systeme hinweg zu verwalten.',
    cards: [
      {
        icon: 'subscriptions',
        title: 'Komplexe Abonnements',
        body: 'Mehrere Tarife, Verlängerungen, Preismodelle und Abrechnungszyklen verwalten.',
      },
      {
        icon: 'payments',
        title: 'Zahlungsprobleme',
        body: 'Mehrere Zahlungsanbieter, fehlgeschlagene Transaktionen und internationale Zahlarten im Griff behalten.',
      },
      {
        icon: 'visibility',
        title: 'Wenig Umsatztransparenz',
        body: 'Wiederkehrende Umsätze, Kundenaktivität und Abo-Entwicklung verstehen.',
      },
      {
        icon: 'systems',
        title: 'Getrennte Systeme',
        body: 'Kundendaten, Zahlungen und Abrechnung über verschiedene Plattformen hinweg verwalten.',
      },
    ],
    transition: 'Es geht auch einfacher',
  },
};

export interface HomeCopy {
  /** `highlight` is the phrase inside the page H1 that gets the violet-to-cyan gradient. */
  hero: { eyebrow: string; highlight: string; subtitle: string; primaryCta: string; secondaryCta: string; note: string; previewLabel: string };
  trust: { label: string; payments: string; finance: string };
  problem: { eyebrow: string; beforeTitle: string; beforeItems: string[]; afterTitle: string; afterItems: string[] };
  platform: { eyebrow: string; heading: string; body: string; lifecycle: string[]; stepsHeading: string };
  features: { eyebrow: string; heading: string; items: { visual: FeatureVisual; eyebrow: string; title: string; body: string; points: string[]; href: string; linkLabel: string }[] };
  showcase: { eyebrow: string; heading: string; body: string; tabs: { overview: string; subscriptions: string; payments: string }; disclaimer: string };
  integrations: { eyebrow: string; heading: string; body: string; paymentsTitle: string; financeTitle: string; methodsTitle: string; apiTitle: string; apiBody: string; apiCta: string; matrixCta: string };
  solutions: { eyebrow: string; heading: string; body: string; learnMore: string };
  why: { eyebrow: string; heading: string; body: string; stats: { value: number | null; text?: string; prefix?: string; label: string }[]; points: { title: string; body: string }[] };
  compare: { heading: string; body: string };
  faq: { heading: string; intro: string };
  cta: { eyebrow: string; heading: string; body: string; primary: string; secondary: string; note: string };
  illustrative: string;
}

export const HOME_COPY: Record<LocaleCode, HomeCopy> = {
  en: {
    // Phase 3A positioning (2026-11-25). The H1 lives in pagesRegistry.ts.
    hero: {
      eyebrow: 'The Revenue Infrastructure for Modern Businesses',
      highlight: 'One Powerful Platform.',
      subtitle:
        'Manage subscriptions, recurring payments and revenue operations with MYFUNDBOX. One flexible platform designed to support the way modern businesses grow.',
      primaryCta: 'Get Started',
      secondaryCta: 'Book a Demo',
      note: 'Connect, monetise, automate and grow: subscriptions, recurring payments, billing operations and revenue workflows in one place.',
      previewLabel: 'Illustrative · sample data',
    },
    trust: {
      label: 'Works with the payment and finance tools you already use',
      payments: 'Payment gateways',
      finance: 'Accounting & tax',
    },
    problem: {
      eyebrow: 'The problem',
      beforeTitle: 'A patchwork of tools',
      beforeItems: [
        'Plans, invoices and payments live in different systems',
        'Failed payments are chased by hand, or not at all',
        'Customers email support to change a card or a plan',
        'Revenue numbers are rebuilt in spreadsheets every month',
      ],
      afterTitle: 'One platform with MYFUNDBOX',
      afterItems: [
        'Plans, billing and payments managed in one place',
        'Automatic retries and reminders recover failed payments',
        'A self-service portal for cards, plans and invoices',
        'Live revenue, subscription and payment reporting',
      ],
    },
    platform: {
      eyebrow: 'The platform',
      heading: 'Every step of the revenue lifecycle, connected',
      body:
        'From the moment a customer picks a plan to the payment landing in your account, MYFUNDBOX keeps every step connected, automated and visible.',
      lifecycle: ['Plans & pricing', 'Checkout', 'Recurring billing', 'Payments', 'Dunning', 'Customer portal', 'Reporting'],
      stepsHeading: 'Up and running in three steps',
    },
    features: {
      eyebrow: 'Features',
      heading: 'Built for how subscription businesses actually run',
      items: [
        {
          visual: 'billing',
          eyebrow: 'Subscriptions & billing',
          title: 'Flexible plans, billed automatically',
          body:
            'Sell one-time and recurring products with the plans your business needs. MYFUNDBOX handles renewals, upgrades and invoices on schedule.',
          points: ['One-time and recurring charges', 'Add-ons, coupons and free trials', 'Invoicing, tax and EU VAT validation'],
          href: '/recurring-billing',
          linkLabel: 'Explore recurring billing',
        },
        {
          visual: 'payments',
          eyebrow: 'Payments',
          title: 'Your gateways, side by side',
          body:
            'Connect the payment providers you already trust and offer the methods your customers prefer, without locking your billing into a single gateway.',
          points: ['Stripe, GoCardless, Mollie, PayPal and Checkout.com', 'Cards, SEPA, ACH, bank transfer and open banking', 'Refunds handled from one dashboard'],
          href: '/payment-management',
          linkLabel: 'Explore payment management',
        },
        {
          visual: 'checkout',
          eyebrow: 'Checkout & self-service',
          title: 'Branded checkout, pay links and a customer portal',
          body:
            'Get paid from your website, a link or an email. Customers manage their own cards, plans and invoices, so your team doesn’t have to.',
          points: ['Hosted checkout or iFrame embed', 'Pay links, no website needed', 'Custom domains on Professional and above'],
          href: '/customer-portal',
          linkLabel: 'Explore the customer portal',
        },
        {
          visual: 'dunning',
          eyebrow: 'Smart dunning',
          title: 'Recover failed payments automatically',
          body:
            'When a payment fails, MYFUNDBOX retries the card and reminds the customer on a schedule you set, so revenue isn’t lost to expired cards.',
          points: ['Automated card retries', 'Reminder emails on your schedule', 'Clear status for every failed payment'],
          href: '/dunning-management',
          linkLabel: 'Explore dunning management',
        },
      ],
    },
    showcase: {
      eyebrow: 'Inside the product',
      heading: 'Your whole revenue picture, in real time',
      body: 'See revenue, subscriptions and payments in one dashboard, and drill into any customer or transaction.',
      tabs: { overview: 'Revenue', subscriptions: 'Subscriptions', payments: 'Payments' },
      disclaimer: 'Illustrative interface preview with sample data.',
    },
    integrations: {
      eyebrow: 'Integrations',
      heading: 'Fits into the stack you already have',
      body: 'Connect payment gateways, accounting and tax tools in a few clicks, or build your own workflow with the API.',
      paymentsTitle: 'Payment gateways',
      financeTitle: 'Accounting & tax',
      methodsTitle: 'Payment methods',
      apiTitle: 'REST API & webhooks',
      apiBody: 'Automate plans, pay links and events from your own systems.',
      apiCta: 'Read the developer docs',
      matrixCta: 'See all integrations',
    },
    solutions: {
      eyebrow: 'Solutions',
      heading: 'Made for every kind of recurring revenue',
      body: 'Whether you sell software, memberships or services, MYFUNDBOX adapts to how you bill.',
      learnMore: 'Learn more',
    },
    why: {
      eyebrow: 'Why MYFUNDBOX',
      heading: 'European by design. Flexible by default.',
      body: 'A revenue platform built around your gateways, your customers and European data protection.',
      stats: [
        { value: 5, label: 'payment gateways supported' },
        { value: 5, label: 'accounting & tax integrations' },
        { value: 0, prefix: '€', label: 'to start on the Free plan' },
        { value: null, text: 'FRA', label: 'data stored in Frankfurt' },
      ],
      points: [
        { title: 'No gateway lock-in', body: 'Use several payment providers at once and change them without rebuilding your billing.' },
        { title: 'EU data protection', body: 'Data stored in Frankfurt, with a Data Processing Agreement for GDPR.' },
        { title: 'Secure access', body: 'Two-factor authentication protects every account.' },
        { title: 'Developer-ready', body: 'A REST API and webhooks on every plan.' },
      ],
    },
    compare: {
      heading: 'Comparing options?',
      body: 'Neutral comparisons compiled from public documentation.',
    },
    faq: {
      heading: 'Questions, answered',
      intro: 'Short, direct answers about MYFUNDBOX. Can’t find what you need? Book a demo and ask us directly.',
    },
    cta: {
      eyebrow: 'Get started',
      heading: 'Start growing your recurring revenue today',
      body: 'Set up plans, connect your gateway and take your first payment. Start free, upgrade when you grow.',
      primary: 'Get started free',
      secondary: 'Book a demo',
      note: 'Free plan for up to 25 subscribers',
    },
    illustrative: 'Illustrative data',
  },
  de: {
    hero: {
      eyebrow: 'Die Revenue-Infrastruktur für moderne Unternehmen',
      highlight: 'Eine starke Plattform.',
      subtitle:
        'Verwalten Sie Abonnements, wiederkehrende Zahlungen und Umsatzprozesse mit MYFUNDBOX. Eine flexible Plattform, die mit Ihrem Unternehmen wächst.',
      primaryCta: 'Jetzt starten',
      secondaryCta: 'Demo buchen',
      note: 'Verbinden, monetarisieren, automatisieren und wachsen: Abonnements, wiederkehrende Zahlungen, Abrechnung und Umsatzprozesse an einem Ort.',
      previewLabel: 'Illustrativ · Beispieldaten',
    },
    trust: {
      label: 'Funktioniert mit den Zahlungs- und Finanztools, die Sie bereits nutzen',
      payments: 'Zahlungsanbieter',
      finance: 'Buchhaltung & Steuern',
    },
    problem: {
      eyebrow: 'Die Herausforderung',
      beforeTitle: 'Ein Flickenteppich aus Tools',
      beforeItems: [
        'Tarife, Rechnungen und Zahlungen liegen in verschiedenen Systemen',
        'Fehlgeschlagene Zahlungen werden manuell verfolgt – oder gar nicht',
        'Kunden schreiben dem Support, um Karte oder Tarif zu ändern',
        'Umsatzzahlen werden jeden Monat in Tabellen neu gebaut',
      ],
      afterTitle: 'Eine Plattform mit MYFUNDBOX',
      afterItems: [
        'Tarife, Abrechnung und Zahlungen an einem Ort',
        'Automatische Wiederholungen und Erinnerungen holen Zahlungen zurück',
        'Ein Self-Service-Portal für Karten, Tarife und Rechnungen',
        'Live-Reporting zu Umsatz, Abos und Zahlungen',
      ],
    },
    platform: {
      eyebrow: 'Die Plattform',
      heading: 'Jeder Schritt im Umsatzzyklus – verbunden',
      body:
        'Von der Tarifwahl bis zum Zahlungseingang: MYFUNDBOX verbindet, automatisiert und macht jeden Schritt sichtbar.',
      lifecycle: ['Tarife & Preise', 'Checkout', 'Wiederkehrende Abrechnung', 'Zahlungen', 'Mahnwesen', 'Kundenportal', 'Reporting'],
      stepsHeading: 'In drei Schritten startklar',
    },
    features: {
      eyebrow: 'Funktionen',
      heading: 'Gebaut für den Alltag von Abo-Unternehmen',
      items: [
        {
          visual: 'billing',
          eyebrow: 'Abos & Abrechnung',
          title: 'Flexible Tarife, automatisch abgerechnet',
          body:
            'Verkaufen Sie einmalige und wiederkehrende Produkte mit den Tarifen, die Ihr Geschäft braucht. Verlängerungen, Upgrades und Rechnungen laufen automatisch.',
          points: ['Einmalige und wiederkehrende Zahlungen', 'Add-ons, Gutscheine und Testphasen', 'Rechnungen, Steuern und EU-USt-ID-Prüfung'],
          href: '/recurring-billing',
          linkLabel: 'Wiederkehrende Abrechnung ansehen',
        },
        {
          visual: 'payments',
          eyebrow: 'Zahlungen',
          title: 'Ihre Zahlungsanbieter, nebeneinander',
          body:
            'Verbinden Sie die Anbieter, denen Sie vertrauen, und bieten Sie die Zahlungsarten an, die Ihre Kunden bevorzugen – ohne Bindung an ein einziges Gateway.',
          points: ['Stripe, GoCardless, Mollie, PayPal und Checkout.com', 'Karte, SEPA, ACH, Überweisung und Open Banking', 'Erstattungen aus einem Dashboard'],
          href: '/payment-management',
          linkLabel: 'Zahlungsmanagement ansehen',
        },
        {
          visual: 'checkout',
          eyebrow: 'Checkout & Self-Service',
          title: 'Checkout im eigenen Design, Zahlungslinks und Kundenportal',
          body:
            'Werden Sie über Ihre Website, einen Link oder eine E-Mail bezahlt. Kunden verwalten Karten, Tarife und Rechnungen selbst.',
          points: ['Gehosteter Checkout oder iFrame-Einbindung', 'Zahlungslinks – ganz ohne Website', 'Eigene Domains ab dem Professional-Tarif'],
          href: '/customer-portal',
          linkLabel: 'Kundenportal ansehen',
        },
        {
          visual: 'dunning',
          eyebrow: 'Smartes Mahnwesen',
          title: 'Fehlgeschlagene Zahlungen automatisch zurückholen',
          body:
            'Schlägt eine Zahlung fehl, versucht MYFUNDBOX die Abbuchung erneut und erinnert den Kunden nach Ihrem Zeitplan.',
          points: ['Automatische Kartenwiederholungen', 'Erinnerungs-E-Mails nach Ihrem Zeitplan', 'Klarer Status für jede offene Zahlung'],
          href: '/dunning-management',
          linkLabel: 'Mahnwesen ansehen',
        },
      ],
    },
    showcase: {
      eyebrow: 'Einblick ins Produkt',
      heading: 'Ihr gesamtes Umsatzbild in Echtzeit',
      body: 'Umsatz, Abonnements und Zahlungen in einem Dashboard – mit Drill-down bis zu jedem Kunden und jeder Transaktion.',
      tabs: { overview: 'Umsatz', subscriptions: 'Abonnements', payments: 'Zahlungen' },
      disclaimer: 'Illustrative Vorschau der Oberfläche mit Beispieldaten.',
    },
    integrations: {
      eyebrow: 'Integrationen',
      heading: 'Passt in Ihren bestehenden Stack',
      body: 'Verbinden Sie Zahlungsanbieter, Buchhaltungs- und Steuertools mit wenigen Klicks – oder bauen Sie eigene Workflows per API.',
      paymentsTitle: 'Zahlungsanbieter',
      financeTitle: 'Buchhaltung & Steuern',
      methodsTitle: 'Zahlungsarten',
      apiTitle: 'REST-API & Webhooks',
      apiBody: 'Automatisieren Sie Tarife, Zahlungslinks und Ereignisse aus Ihren eigenen Systemen.',
      apiCta: 'Zur Entwicklerdokumentation',
      matrixCta: 'Alle Integrationen ansehen',
    },
    solutions: {
      eyebrow: 'Lösungen',
      heading: 'Für jede Art wiederkehrender Umsätze',
      body: 'Ob Software, Mitgliedschaften oder Dienstleistungen – MYFUNDBOX passt sich Ihrer Abrechnung an.',
      learnMore: 'Mehr erfahren',
    },
    why: {
      eyebrow: 'Warum MYFUNDBOX',
      heading: 'Europäisch gedacht. Flexibel gebaut.',
      body: 'Eine Umsatzplattform rund um Ihre Zahlungsanbieter, Ihre Kunden und europäischen Datenschutz.',
      stats: [
        { value: 5, label: 'unterstützte Zahlungsanbieter' },
        { value: 5, label: 'Buchhaltungs- & Steuer-Integrationen' },
        { value: 0, prefix: '€', label: 'zum Start im kostenlosen Tarif' },
        { value: null, text: 'FRA', label: 'Datenspeicherung in Frankfurt' },
      ],
      points: [
        { title: 'Keine Gateway-Bindung', body: 'Mehrere Zahlungsanbieter gleichzeitig nutzen und wechseln, ohne die Abrechnung neu aufzubauen.' },
        { title: 'EU-Datenschutz', body: 'Datenspeicherung in Frankfurt, mit Auftragsverarbeitungsvertrag nach DSGVO.' },
        { title: 'Sicherer Zugang', body: 'Zwei-Faktor-Authentifizierung schützt jedes Konto.' },
        { title: 'Bereit für Entwickler', body: 'REST-API und Webhooks in jedem Tarif.' },
      ],
    },
    compare: {
      heading: 'Sie vergleichen Optionen?',
      body: 'Neutrale Vergleiche auf Basis öffentlicher Dokumentation.',
    },
    faq: {
      heading: 'Fragen & Antworten',
      intro: 'Kurze, direkte Antworten zu MYFUNDBOX. Noch Fragen? Buchen Sie eine Demo.',
    },
    cta: {
      eyebrow: 'Jetzt starten',
      heading: 'Steigern Sie Ihre wiederkehrenden Umsätze – ab heute',
      body: 'Tarife anlegen, Zahlungsanbieter verbinden, erste Zahlung erhalten. Kostenlos starten, upgraden, wenn Sie wachsen.',
      primary: 'Kostenlos starten',
      secondary: 'Demo buchen',
      note: 'Kostenloser Tarif für bis zu 25 Abonnenten',
    },
    illustrative: 'Beispieldaten',
  },
};
