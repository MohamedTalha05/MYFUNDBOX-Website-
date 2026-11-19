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
 * Verified customer testimonials only. Empty until real, attributable quotes with the
 * customer's written permission are supplied; the testimonials section stays hidden while empty.
 */
export const VERIFIED_TESTIMONIALS: { quote: string; name: string; role: string; company: string }[] = [];

export type FeatureVisual = 'billing' | 'payments' | 'checkout' | 'dunning';

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
    hero: {
      eyebrow: 'Revenue management, simplified.',
      highlight: 'Your Revenue',
      subtitle:
        'Manage subscriptions, automate billing, simplify payments, and gain complete visibility into your revenue — all from one powerful platform.',
      primaryCta: 'Get Started',
      secondaryCta: 'Explore the Platform',
      note: 'Everything you need to manage your recurring revenue, in one place.',
      previewLabel: 'Product preview · sample data',
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
      eyebrow: 'Revenue Management, ganz einfach.',
      highlight: 'Ihren Umsatz',
      subtitle:
        'Verwalten Sie Abonnements, automatisieren Sie die Abrechnung, vereinfachen Sie Zahlungen und behalten Sie Ihren Umsatz jederzeit im Blick – alles auf einer leistungsstarken Plattform.',
      primaryCta: 'Jetzt starten',
      secondaryCta: 'Plattform entdecken',
      note: 'Alles, was Sie für Ihre wiederkehrenden Umsätze brauchen – an einem Ort.',
      previewLabel: 'Produktvorschau · Beispieldaten',
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
