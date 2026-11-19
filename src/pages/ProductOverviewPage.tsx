import React, { useState } from 'react';
import {
  CreditCard,
  Layers,
  Zap,
  RefreshCw,
  Users,
  Receipt,
  Code,
  ShieldCheck,
  ArrowRight,
  Check,
  ChevronRight,
} from 'lucide-react';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { useRouter } from '../context/RouterContext';
import { useLocalHref } from '../utils/navLinks';
import { APP_LINKS } from '../data/siteConfig';
import {
  BreadcrumbNav,
  AuthorMetaLine,
  AtAGlanceCard,
  FAQSection,
  AppLink,
} from '../components/ReusableBlocks';

export function ProductOverviewPage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const localHref = useLocalHref();
  const [activeModule, setActiveModule] = useState<string>('gateways');

  const modules = [
    {
      id: 'gateways',
      name: locale === 'de' ? 'Multi-Gateway-Zahlungen' : 'Multi-Gateway Orchestration',
      icon: CreditCard,
      headline: locale === 'de' ? 'Freie Wahl der Zahlungsdienstleister ohne Lock-in' : 'Connect Stripe, GoCardless, Mollie & PayPal side-by-side',
      desc: locale === 'de'
        ? 'Nutzen Sie Ihre eigenen Händlerkonten. Zahlungen fließen direkt auf Ihr Bankkonto, während MYFUNDBOX die Abos koordiniert.'
        : 'Bring your existing processor accounts. Customer subscription payments settle directly to your corporate bank account while MYFUNDBOX orchestrates cycles and retries.',
      bullets: [
        'Stripe für Kreditkarten, Apple Pay und Google Pay',
        'GoCardless für kostengünstige SEPA-Lastschriften und Bacs',
        'Mollie für iDEAL, Bancontact und europäische Zahlungsmethoden',
        'PayPal für weltweite Kundenzahlungen',
      ],
    },
    {
      id: 'plans',
      name: locale === 'de' ? 'Abopläne & Testphasen' : 'Flexible Subscription Plans',
      icon: Layers,
      headline: locale === 'de' ? 'Beliebige Abrechnungszyklen und Rabattmodelle' : 'Launch tiered plans, free trials, coupons, and add-ons',
      desc: locale === 'de'
        ? 'Erstellen Sie monatliche, vierteljährliche oder jährliche Tarife mit flexiblen Testphasen, Einrichtungsgebühren und anteiliger Abrechnung.'
        : 'Configure flexible billing intervals, free trials with or without upfront credit card requirements, promotional coupon codes, and proration logic.',
      bullets: [
        'Monatliche, quartalsweise und jährliche Abrechnung',
        'Testphasen (Trial Management) mit automatischer Konvertierung',
        'Rabatt-Gutscheine (Prozentual oder Festbetrag)',
        'Optionale Add-ons und modulare Zusatzpakete',
      ],
    },
    {
      id: 'paylinks',
      name: locale === 'de' ? 'Pay Links & Checkout' : 'Hosted Checkout & Pay Links',
      icon: Zap,
      headline: locale === 'de' ? 'Zahlungslinks und White-Label-Checkout' : 'Generate instant no-code payment links or embed checkout',
      desc: locale === 'de'
        ? 'Senden Sie Kunden direkte Zahlungslinks per E-Mail oder Chat – oder binden Sie das responsive Checkout-Formular unter eigener Domain ein.'
        : 'Create shareable Pay Links for quotes, emails, or invoices with zero code, or embed mobile-optimized hosted checkout with custom domain support.',
      bullets: [
        'Ein-Klick-Pay-Links für Angebote und Einmalzahlungen',
        'iFrame- oder Hosted-Checkout unter eigener Domain',
        'Unterstützung für 3D Secure 2 und SCA',
        'Vollständig für mobile Endgeräte optimiert',
      ],
    },
    {
      id: 'dunning',
      name: locale === 'de' ? 'Smart Dunning' : 'Smart Dunning & Payment Recovery',
      icon: RefreshCw,
      headline: locale === 'de' ? 'Umsatzverluste durch abgelaufene Karten verhindern' : 'Recover failed credit card payments before accounts cancel',
      desc: locale === 'de'
        ? 'Automatisierte Wiederholungsversuche und E-Mail-Erinnerungen vor Kartenablauf retten gefährdete Abonnements ohne manuellen Aufwand.'
        : 'Customizable retry rules and pre-expiration alerts prevent involuntary churn, giving customers friction-free self-cure links to update cards.',
      bullets: [
        'Intelligente Wiederholungsversuche bei Kartenfehlern',
        'Proaktive Erinnerungs-E-Mails vor Kartenablauf',
        'Direkter Self-Cure-Link zur Aktualisierung der Zahlungsart',
        'Detailliertes Tracking geretteter Umsätze',
      ],
    },
    {
      id: 'portal',
      name: locale === 'de' ? 'Kundenportal' : 'Customer Self-Service Portal',
      icon: Users,
      headline: locale === 'de' ? 'Entlasten Sie Ihr Support-Team' : 'Let subscribers manage plans, cards, and invoices themselves',
      desc: locale === 'de'
        ? 'Geben Sie Abonnenten ein sicheres, markenkonformes Self-Service-Portal zur Aktualisierung von Kreditkarten, Rechnungsdownloads und Tarifwechseln.'
        : 'A white-labeled customer portal (My Portal) where subscribers can update payment methods, download VAT invoices, and manage plan upgrades.',
      bullets: [
        'Zahlungsdaten selbstständig aktualisieren',
        'Historische PDF-Rechnungen herunterladen',
        'Tarif-Upgrades und Zusatzpakete buchen',
        'Vollständig an Ihr Markendesign anpassbar',
      ],
    },
    {
      id: 'accounting',
      name: locale === 'de' ? 'EU-MwSt. & Buchhaltung' : 'EU VAT & Invoicing Sync',
      icon: Receipt,
      headline: locale === 'de' ? 'Rechtssichere Rechnungen und nahtloser Buchhaltungsabgleich' : 'Automated European VAT calculation and accounting integration',
      desc: locale === 'de'
        ? 'Automatische Prüfung europäischer USt-IdNrn. (VIES), korrekte Netto-/Brutto-Aufschlüsselung und direkter Sync zu sevDesk, Lexware, QuickBooks und Xero.'
        : 'Real-time European VAT ID validation, compliant automated PDF receipts, and two-way sync with sevDesk, Lexware, QuickBooks Online, and Xero.',
      bullets: [
        'Automatische VIES-Validierung für EU-Unternehmen',
        'Steuer- und Währungstrennung nach europäischen Richtlinien',
        'Direkte Schnittstelle zu sevDesk und Lexware',
        'Schnittstellen zu QuickBooks und Xero',
      ],
    },
  ];

  const currentModule = modules.find((m) => m.id === activeModule) || modules[0];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14 space-y-16">
      {/* Header */}
      <header className="max-w-4xl space-y-4">
        <BreadcrumbNav items={page.breadcrumbs} />
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
          {page.h1}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted max-w-3xl">
          {page.aeoSummary}
        </p>
        <div className="pt-2">
          <AuthorMetaLine authorId={page.authorId} lastUpdated={page.lastUpdated} />
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-3">
          <a
            href={APP_LINKS.signUp}
            className="btn-primary px-5 py-2.5 text-sm font-semibold"
          >
            {locale === 'de' ? 'Kostenlos starten (bis 25 Kunden)' : 'Start free (up to 25 subscribers)'}
          </a>
          <button
            type="button"
            onClick={() => navigate(localHref('/book-a-demo'))}
            className="btn-secondary px-5 py-2.5 text-sm font-semibold cursor-pointer"
          >
            {locale === 'de' ? 'Live-Demo buchen' : 'Book a demo'}
          </button>
        </div>
      </header>

      {/* At A Glance */}
      {page.atAGlance && <AtAGlanceCard data={page.atAGlance} />}

      {/* Interactive Module Explorer */}
      <section className="space-y-8">
        <div className="border-b border-line pb-4">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Modulübersicht' : 'Platform Architecture'}
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-ink">
            {locale === 'de' ? 'Alle Module im Detail erkunden' : 'Explore the MYFUNDBOX module suite'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill List */}
          <div className="lg:col-span-4 space-y-2">
            {modules.map((m) => {
              const Icon = m.icon;
              const isSelected = m.id === activeModule;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveModule(m.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-accent bg-surface shadow-xs font-semibold text-ink'
                      : 'border-transparent bg-transparent hover:bg-soft text-muted hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-accent' : 'text-subtle'}`} />
                    <span className="text-sm">{m.name}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-accent' : 'text-subtle opacity-40'}`} />
                </button>
              );
            })}
          </div>

          {/* Module Deep-Dive Card */}
          <div className="lg:col-span-8 rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <div className="inline-flex rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent font-ui">
                {currentModule.name}
              </div>
              <h3 className="mt-3 text-2xl font-display font-bold text-ink">
                {currentModule.headline}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
                {currentModule.desc}
              </p>
            </div>

            <div className="border-t border-line pt-5">
              <h4 className="text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-3">
                {locale === 'de' ? 'Leistungsmerkmale:' : 'Key Capabilities:'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-ink">
                {currentModule.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-positive shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-subtle font-ui">
                0 % Umsatzabzug · Deutsches Hosting
              </span>
              <a
                href={APP_LINKS.signUp}
                className="btn-primary px-4 py-2 text-xs"
              >
                {locale === 'de' ? 'Jetzt ausprobieren' : 'Get started with this module'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Developer API & Webhooks Strip */}
      <section className="rounded-2xl border border-line bg-surface p-8 sm:p-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider font-ui">
              <Code className="h-4 w-4" />
              <span>{locale === 'de' ? 'Entwickler & APIs' : 'Developer-First APIs'}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-ink">
              {locale === 'de' ? 'REST-API & Echtzeit-Webhooks' : 'REST APIs, webhooks, and sandbox environments'}
            </h3>
            <p className="text-sm text-muted">
              {locale === 'de'
                ? 'Integrieren Sie Pläne, Kunden und Zahlungsereignisse direkt in Ihre Software. Ausführliche Dokumentation unter docs.myfundbox.com.'
                : 'Manage plans, trigger Pay Links, and receive real-time webhook events for successful charges, subscription renewals, and dunning alerts.'}
            </p>
          </div>
          <a
            href={APP_LINKS.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-5 py-2.5 text-sm shrink-0 whitespace-nowrap"
          >
            {locale === 'de' ? 'API-Dokumentation öffnen →' : 'View API Documentation →'}
          </a>
        </div>
      </section>

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="max-w-4xl">
          <FAQSection faqs={page.faqs} />
        </section>
      )}

      {/* Bottom CTA */}
      <section className="rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink">
          {locale === 'de' ? 'Starten Sie heute mit MYFUNDBOX' : 'Ready to start with MYFUNDBOX?'}
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
          {locale === 'de'
            ? 'Bis zu 25 Abonnenten dauerhaft kostenlos. Keine Kreditkarte zur Registrierung erforderlich.'
            : 'Free forever up to 25 subscribers. No credit card required to explore.'}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a href={APP_LINKS.signUp} className="btn-primary px-6 py-2.5 text-sm">
            {locale === 'de' ? 'Kostenlos registrieren' : 'Get started free'}
          </a>
          <button
            type="button"
            onClick={() => navigate(localHref('/book-a-demo'))}
            className="btn-secondary px-6 py-2.5 text-sm cursor-pointer"
          >
            {locale === 'de' ? 'Demo anfordern' : 'Book a demo'}
          </button>
        </div>
      </section>
    </div>
  );
}

