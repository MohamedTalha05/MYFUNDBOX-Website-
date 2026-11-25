import type { LocaleCode } from '../utils/formatting';

/**
 * Homepage copy for the Phase 3A rebuild (2026-11-25): positioning "The Revenue Infrastructure
 * for Modern Businesses".
 *
 * PRODUCT TRUTH RULES. Every capability below is either listed on the live myfundbox.com site,
 * confirmed by the MYFUNDBOX team (docs/PROJECT_PROGRESS.md §3), or documented
 * (quantity-based subscriptions). The following are deliberately NOT claimed anywhere here and
 * are tracked in docs/PHASE-3A-outstanding-evidence.md:
 *   - usage-based metering / rating        - DATEV, XRechnung, ZUGFeRD
 *   - a comprehensive / API-first platform - AI-driven payment intelligence
 *   - native end-to-end Quote-to-Cash      - certifications (PCI DSS, ISO 27001, SOC 2, …)
 *   - machine monitoring / IoT             - customer counts, revenue figures, ratings
 * "Payment orchestration" here means connecting several supported gateways and managing them in
 * one place. It does NOT claim automatic routing or failover between gateways.
 * A test (src/pages/homePage.test.ts) renders the homepage and fails if any banned claim appears.
 */

/* --------------------------------- Problem -------------------------------- */

export type ProblemKey = 'models' | 'recurring' | 'changes' | 'failures' | 'billing' | 'disconnected';

export const PROBLEM_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    items: { key: ProblemKey; title: string; body: string; symptom: string }[];
    bridge: string;
  }
> = {
  en: {
    eyebrow: 'The challenge',
    heading: 'Revenue gets complicated long before it gets big.',
    body:
      'Every new plan, payment method and customer change adds another moving part. Without one place to manage them, revenue operations turn into manual work spread across disconnected tools.',
    items: [
      { key: 'models', title: 'Multiple revenue models', body: 'Monthly plans, annual contracts, one-time fees and per-seat pricing rarely fit one billing setup.', symptom: 'A workaround for every model' },
      { key: 'recurring', title: 'Recurring payments', body: 'Every renewal has to be charged on time, for the right amount, through the right payment method.', symptom: 'Renewals slip through' },
      { key: 'changes', title: 'Subscription changes', body: 'Upgrades, quantity changes and cancellations ripple through invoices and payments.', symptom: 'Manual adjustments' },
      { key: 'failures', title: 'Payment failures', body: 'Expired cards and declined payments quietly become lost revenue when nobody follows up.', symptom: 'Revenue at risk' },
      { key: 'billing', title: 'Billing operations', body: 'Invoices, payment records and customer details have to stay consistent as volume grows.', symptom: 'Spreadsheet checks' },
      { key: 'disconnected', title: 'Disconnected workflows', body: 'Billing, payment and accounting tools that don’t talk to each other leave gaps no one owns.', symptom: 'No single view' },
    ],
    bridge: 'MYFUNDBOX brings it together',
  },
  de: {
    eyebrow: 'Die Herausforderung',
    heading: 'Umsatz wird kompliziert, lange bevor er groß wird.',
    body:
      'Jeder neue Tarif, jede Zahlungsart und jede Kundenänderung bringt ein weiteres bewegliches Teil. Ohne einen zentralen Ort werden Umsatzprozesse zu Handarbeit, verteilt auf getrennte Tools.',
    items: [
      { key: 'models', title: 'Mehrere Umsatzmodelle', body: 'Monatstarife, Jahresverträge, Einmalgebühren und Preise pro Lizenz passen selten in ein Abrechnungs-Setup.', symptom: 'Ein Workaround pro Modell' },
      { key: 'recurring', title: 'Wiederkehrende Zahlungen', body: 'Jede Verlängerung muss pünktlich, mit dem richtigen Betrag und über die richtige Zahlungsart abgerechnet werden.', symptom: 'Verlängerungen gehen unter' },
      { key: 'changes', title: 'Abo-Änderungen', body: 'Upgrades, Mengenänderungen und Kündigungen wirken sich auf Rechnungen und Zahlungen aus.', symptom: 'Manuelle Korrekturen' },
      { key: 'failures', title: 'Fehlgeschlagene Zahlungen', body: 'Abgelaufene Karten und abgelehnte Zahlungen werden still zu verlorenem Umsatz, wenn niemand nachfasst.', symptom: 'Umsatz in Gefahr' },
      { key: 'billing', title: 'Abrechnungsprozesse', body: 'Rechnungen, Zahlungsdaten und Kundendaten müssen auch bei wachsendem Volumen konsistent bleiben.', symptom: 'Kontrolle per Tabelle' },
      { key: 'disconnected', title: 'Getrennte Abläufe', body: 'Abrechnungs-, Zahlungs- und Buchhaltungstools, die nicht miteinander sprechen, hinterlassen Lücken.', symptom: 'Kein Gesamtbild' },
    ],
    bridge: 'MYFUNDBOX führt alles zusammen',
  },
};

/* ------------------------------- Platform hub ------------------------------ */

export type PlatformKey = 'subscriptions' | 'billing' | 'quantity' | 'orchestration' | 'recovery' | 'reporting' | 'integrations';

export const PLATFORM_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    coreLabel: string;
    modules: { key: PlatformKey; title: string; body: string }[];
    cta: string;
  }
> = {
  en: {
    eyebrow: 'The platform',
    heading: 'One connected platform for every revenue model.',
    body:
      'MYFUNDBOX connects subscriptions, billing, payments and reporting, so each part of your revenue operations works together instead of in separate tools.',
    coreLabel: 'Revenue platform',
    modules: [
      { key: 'subscriptions', title: 'Subscription management', body: 'Plans, trials, upgrades and renewals.' },
      { key: 'billing', title: 'Recurring billing', body: 'One-time and recurring charges, invoiced automatically.' },
      { key: 'quantity', title: 'Quantity-based subscriptions', body: 'Price per seat, licence, unit or site.' },
      { key: 'orchestration', title: 'Payment orchestration', body: 'Several gateways and methods, managed in one place.' },
      { key: 'recovery', title: 'Payment recovery & dunning', body: 'Automatic retries for failed card payments.' },
      { key: 'reporting', title: 'Revenue reporting', body: 'Revenue, subscription and payment activity at a glance.' },
      { key: 'integrations', title: 'Integrations', body: 'Payment, accounting, tax and automation tools.' },
    ],
    cta: 'Explore the Platform',
  },
  de: {
    eyebrow: 'Die Plattform',
    heading: 'Eine vernetzte Plattform für jedes Umsatzmodell.',
    body:
      'MYFUNDBOX verbindet Abonnements, Abrechnung, Zahlungen und Reporting, damit alle Teile Ihrer Umsatzprozesse zusammenarbeiten statt in getrennten Tools.',
    coreLabel: 'Revenue-Plattform',
    modules: [
      { key: 'subscriptions', title: 'Abo-Verwaltung', body: 'Tarife, Testphasen, Upgrades und Verlängerungen.' },
      { key: 'billing', title: 'Wiederkehrende Abrechnung', body: 'Einmalige und wiederkehrende Beträge, automatisch abgerechnet.' },
      { key: 'quantity', title: 'Mengenbasierte Abonnements', body: 'Preise pro Lizenz, Einheit, Nutzer oder Standort.' },
      { key: 'orchestration', title: 'Payment-Orchestrierung', body: 'Mehrere Anbieter und Zahlarten an einem Ort.' },
      { key: 'recovery', title: 'Zahlungswiederherstellung & Mahnwesen', body: 'Automatische Wiederholung fehlgeschlagener Kartenzahlungen.' },
      { key: 'reporting', title: 'Umsatz-Reporting', body: 'Umsatz, Abos und Zahlungen auf einen Blick.' },
      { key: 'integrations', title: 'Integrationen', body: 'Zahlungs-, Buchhaltungs-, Steuer- und Automatisierungstools.' },
    ],
    cta: 'Plattform entdecken',
  },
};

/* --------------------------- Capability showcase --------------------------- */

export type CapabilityShowcaseKey = PlatformKey;

/** Internal canonical paths (resolved through resolveNavHref) or 'integrations' for the live directory. */
export const CAPABILITY_SHOWCASE_LINKS: Record<CapabilityShowcaseKey, { href: string; fallbackHref?: string }> = {
  subscriptions: { href: '/subscription-management', fallbackHref: '/product' },
  billing: { href: '/recurring-billing', fallbackHref: '/product' },
  quantity: { href: '/subscription-management', fallbackHref: '/product' },
  orchestration: { href: '/payment-management', fallbackHref: '/product' },
  recovery: { href: '/dunning-management', fallbackHref: '/product' },
  reporting: { href: '/revenue-analytics', fallbackHref: '/product' },
  integrations: { href: 'integrations' },
};

export const CAPABILITY_SHOWCASE_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    tablistLabel: string;
    learnMore: string;
    badge: string;
    disclaimer: string;
    items: { key: CapabilityShowcaseKey; title: string; summary: string; points: string[] }[];
  }
> = {
  en: {
    eyebrow: 'Product capabilities',
    heading: 'Everything recurring revenue needs, built to work together.',
    body: 'Explore the capabilities at the core of MYFUNDBOX.',
    tablistLabel: 'MYFUNDBOX capabilities',
    learnMore: 'Learn more',
    badge: 'Illustrative',
    disclaimer: 'Interface previews are illustrative and use sample data for a fictional business.',
    items: [
      {
        key: 'subscriptions',
        title: 'Subscription Management',
        summary: 'Create plans for every recurring offer and keep each customer’s subscription in view, from trial to renewal.',
        points: ['Plans with add-ons, coupons and free trials', 'Plan changes and cancellations', 'Hosted checkout and pay links to start subscriptions'],
      },
      {
        key: 'billing',
        title: 'Recurring Billing',
        summary: 'Bill one-time and recurring charges on schedule, with invoices created automatically for every cycle.',
        points: ['One-time and recurring charges', 'Automatic invoicing every billing cycle', 'Tax handling with EU VAT validation'],
      },
      {
        key: 'quantity',
        title: 'Quantity-Based Subscriptions',
        summary: 'Price subscriptions by quantity (seats, licences, units or sites) and bill the right amount as customers grow.',
        points: ['Per-seat and per-licence pricing for software', 'Per-unit and per-site pricing for service contracts', 'Quantities adjusted as customer needs change'],
      },
      {
        key: 'orchestration',
        title: 'Payment Orchestration',
        summary: 'Connect the payment gateways you already use and offer the methods your customers prefer, managed from one place.',
        points: ['Stripe, GoCardless, Mollie, PayPal and Checkout.com', 'Cards, SEPA Direct Debit, ACH, bank transfer and open banking', 'More than one gateway connected at the same time'],
      },
      {
        key: 'recovery',
        title: 'Payment Recovery',
        summary: 'When a card payment fails, Smart Dunning retries it automatically, so fewer renewals are lost to expired or declined cards.',
        points: ['Automatic retries for failed card payments', 'Failed payments followed up without manual work', 'Customers update payment details in My Portal, where supported'],
      },
      {
        key: 'reporting',
        title: 'Revenue Reporting',
        summary: 'See revenue, subscription and payment activity in one place instead of rebuilding reports by hand.',
        points: ['Revenue and subscription overview', 'Payment activity across connected gateways', 'Billing history and invoices for every customer'],
      },
      {
        key: 'integrations',
        title: 'Integrations',
        summary: 'Connect MYFUNDBOX to the payment, accounting, tax and automation tools already in your stack.',
        points: ['Payments: Stripe, GoCardless, Mollie, PayPal, Checkout.com', 'Accounting: QuickBooks, Xero, sevdesk, Lexware Office', 'Tax: Avalara · Automation: Zapier'],
      },
    ],
  },
  de: {
    eyebrow: 'Produktfunktionen',
    heading: 'Alles für wiederkehrende Umsätze – gebaut, um zusammenzuarbeiten.',
    body: 'Entdecken Sie die Kernfunktionen von MYFUNDBOX.',
    tablistLabel: 'MYFUNDBOX-Funktionen',
    learnMore: 'Mehr erfahren',
    badge: 'Illustrativ',
    disclaimer: 'Die Oberflächen sind illustrativ und zeigen Beispieldaten eines fiktiven Unternehmens.',
    items: [
      {
        key: 'subscriptions',
        title: 'Abo-Verwaltung',
        summary: 'Erstellen Sie Tarife für jedes wiederkehrende Angebot und behalten Sie jedes Kundenabo im Blick – von der Testphase bis zur Verlängerung.',
        points: ['Tarife mit Add-ons, Gutscheinen und Testphasen', 'Tarifwechsel und Kündigungen', 'Gehosteter Checkout und Zahlungslinks für den Abo-Start'],
      },
      {
        key: 'billing',
        title: 'Wiederkehrende Abrechnung',
        summary: 'Rechnen Sie einmalige und wiederkehrende Beträge pünktlich ab – mit automatisch erstellten Rechnungen für jeden Zyklus.',
        points: ['Einmalige und wiederkehrende Beträge', 'Automatische Rechnungen in jedem Abrechnungszyklus', 'Steuerbehandlung mit EU-USt-ID-Prüfung'],
      },
      {
        key: 'quantity',
        title: 'Mengenbasierte Abonnements',
        summary: 'Bepreisen Sie Abonnements nach Menge (Nutzer, Lizenzen, Einheiten oder Standorte) und rechnen Sie den richtigen Betrag ab, wenn Kunden wachsen.',
        points: ['Preise pro Nutzer und Lizenz für Software', 'Preise pro Einheit und Standort für Serviceverträge', 'Mengen passen sich dem Bedarf Ihrer Kunden an'],
      },
      {
        key: 'orchestration',
        title: 'Payment-Orchestrierung',
        summary: 'Verbinden Sie die Zahlungsanbieter, die Sie bereits nutzen, und bieten Sie die Zahlarten an, die Ihre Kunden bevorzugen – zentral verwaltet.',
        points: ['Stripe, GoCardless, Mollie, PayPal und Checkout.com', 'Karte, SEPA-Lastschrift, ACH, Überweisung und Open Banking', 'Mehrere Zahlungsanbieter gleichzeitig verbunden'],
      },
      {
        key: 'recovery',
        title: 'Zahlungswiederherstellung',
        summary: 'Schlägt eine Kartenzahlung fehl, wiederholt Smart Dunning sie automatisch – so gehen weniger Verlängerungen durch abgelaufene oder abgelehnte Karten verloren.',
        points: ['Automatische Wiederholung fehlgeschlagener Kartenzahlungen', 'Nachverfolgung ohne manuellen Aufwand', 'Kunden aktualisieren Zahlungsdaten in My Portal, sofern unterstützt'],
      },
      {
        key: 'reporting',
        title: 'Umsatz-Reporting',
        summary: 'Sehen Sie Umsatz, Abos und Zahlungen an einem Ort, statt Berichte von Hand zusammenzustellen.',
        points: ['Überblick über Umsatz und Abonnements', 'Zahlungsaktivität über alle verbundenen Anbieter', 'Zahlungshistorie und Rechnungen für jeden Kunden'],
      },
      {
        key: 'integrations',
        title: 'Integrationen',
        summary: 'Verbinden Sie MYFUNDBOX mit den Zahlungs-, Buchhaltungs-, Steuer- und Automatisierungstools in Ihrem Stack.',
        points: ['Zahlungen: Stripe, GoCardless, Mollie, PayPal, Checkout.com', 'Buchhaltung: QuickBooks, Xero, sevdesk, Lexware Office', 'Steuern: Avalara · Automatisierung: Zapier'],
      },
    ],
  },
};

/* ---------------------------- Business models ----------------------------- */

export type AudienceKey = 'saas' | 'ai' | 'industrial' | 'digital';

/**
 * Links: SaaS and Digital go to existing solution pages. AI and Industrial have no page yet,
 * so they link to Book a Demo instead of an invented URL.
 * AI: no "AI-driven" or usage-based claims. Industrial: no machine monitoring / IoT claims.
 */
export const AUDIENCE_LINKS: Record<AudienceKey, { href: string; fallbackHref?: string }> = {
  saas: { href: '/solutions/saas' },
  ai: { href: '/book-a-demo' },
  industrial: { href: '/book-a-demo' },
  digital: { href: '/solutions/digital-businesses', fallbackHref: '/solutions/digital-services' },
};

export const BUSINESS_MODELS_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    body: string;
    audiences: Record<AudienceKey, { label: string; title: string; body: string; tags: string[]; cta: string }>;
    visuals: {
      perSeat: string;
      seats: string;
      monthly: string;
      annual: string;
      addOn: string;
      contract: string;
      machines: string;
      perMachine: string;
      sites: string;
      perMonth: string;
      payLink: string;
      paid: string;
      sample: string;
    };
  }
> = {
  en: {
    eyebrow: 'Built for different business models',
    heading: 'One platform. Many ways to earn recurring revenue.',
    body: 'Whether you sell software, AI products, industrial services or digital offers, MYFUNDBOX adapts to the way you charge.',
    audiences: {
      saas: {
        label: 'SaaS',
        title: 'SaaS businesses',
        body: 'Run recurring subscriptions with flexible plans, per-seat pricing and automated billing operations.',
        tags: ['Flexible plans', 'Per-seat pricing', 'Trials & upgrades', 'Automated invoicing'],
        cta: 'Explore SaaS',
      },
      ai: {
        label: 'AI',
        title: 'AI businesses',
        body: 'Monetise AI products with subscription plans, team seats, add-ons and monthly or annual billing, without building billing yourself.',
        tags: ['Subscription plans', 'Team seats', 'Add-ons', 'Monthly & annual billing'],
        cta: 'Discuss your model',
      },
      industrial: {
        label: 'Industrial',
        title: 'Industrial & equipment businesses',
        body: 'Bill recurring service contracts per machine or per site, and run equipment-as-a-service offers on predictable subscriptions.',
        tags: ['Service contracts', 'Per-machine pricing', 'Per-site pricing', 'Equipment-as-a-service'],
        cta: 'Discuss your model',
      },
      digital: {
        label: 'Digital',
        title: 'Digital businesses',
        body: 'Take recurring payments for courses, content and digital services, and manage subscriptions and payment operations in one place.',
        tags: ['Recurring payments', 'Pay links', 'Hosted checkout', 'Subscription management'],
        cta: 'Explore digital',
      },
    },
    visuals: {
      perSeat: 'per seat / month',
      seats: 'seats',
      monthly: 'Monthly',
      annual: 'Annual',
      addOn: 'Add-on',
      contract: 'Service contract',
      machines: 'machines',
      perMachine: 'per machine / month',
      sites: 'sites',
      perMonth: '/ month',
      payLink: 'Pay link',
      paid: 'Paid',
      sample: 'Sample',
    },
  },
  de: {
    eyebrow: 'Für unterschiedliche Geschäftsmodelle',
    heading: 'Eine Plattform. Viele Wege zu wiederkehrendem Umsatz.',
    body: 'Ob Software, KI-Produkte, industrielle Services oder digitale Angebote: MYFUNDBOX passt sich an, wie Sie abrechnen.',
    audiences: {
      saas: {
        label: 'SaaS',
        title: 'SaaS-Unternehmen',
        body: 'Wiederkehrende Abonnements mit flexiblen Tarifen, Preisen pro Nutzer und automatisierter Abrechnung.',
        tags: ['Flexible Tarife', 'Preise pro Nutzer', 'Testphasen & Upgrades', 'Automatische Rechnungen'],
        cta: 'SaaS entdecken',
      },
      ai: {
        label: 'KI',
        title: 'KI-Unternehmen',
        body: 'Monetarisieren Sie KI-Produkte mit Abo-Tarifen, Team-Lizenzen, Add-ons und monatlicher oder jährlicher Abrechnung – ohne eigene Abrechnungsentwicklung.',
        tags: ['Abo-Tarife', 'Team-Lizenzen', 'Add-ons', 'Monatlich & jährlich'],
        cta: 'Ihr Modell besprechen',
      },
      industrial: {
        label: 'Industrie',
        title: 'Industrie- & Anlagenunternehmen',
        body: 'Rechnen Sie wiederkehrende Serviceverträge pro Maschine oder Standort ab und betreiben Sie Equipment-as-a-Service mit planbaren Abonnements.',
        tags: ['Serviceverträge', 'Preise pro Maschine', 'Preise pro Standort', 'Equipment-as-a-Service'],
        cta: 'Ihr Modell besprechen',
      },
      digital: {
        label: 'Digital',
        title: 'Digitale Unternehmen',
        body: 'Nehmen Sie wiederkehrende Zahlungen für Kurse, Inhalte und digitale Services an und verwalten Sie Abos und Zahlungen an einem Ort.',
        tags: ['Wiederkehrende Zahlungen', 'Zahlungslinks', 'Gehosteter Checkout', 'Abo-Verwaltung'],
        cta: 'Digital entdecken',
      },
    },
    visuals: {
      perSeat: 'pro Nutzer / Monat',
      seats: 'Nutzer',
      monthly: 'Monatlich',
      annual: 'Jährlich',
      addOn: 'Add-on',
      contract: 'Servicevertrag',
      machines: 'Maschinen',
      perMachine: 'pro Maschine / Monat',
      sites: 'Standorte',
      perMonth: '/ Monat',
      payLink: 'Zahlungslink',
      paid: 'Bezahlt',
      sample: 'Beispiel',
    },
  },
};
