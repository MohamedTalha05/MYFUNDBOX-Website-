import React from 'react';
import {
  Check,
  CreditCard,
  Globe2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
  ChevronRight,
  Receipt,
  Users,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { HOME_COPY } from '../data/homeContent';
import { HomeHero } from '../components/HomeHero';
import { RevenueDashboardPreview } from '../components/RevenueDashboardPreview';
import { IntegrationsStrip } from '../components/IntegrationsStrip';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { APP_LINKS, SITE_CONFIG } from '../data/siteConfig';
import { COMPETITORS } from '../data/competitorsData';
import {
  AppLink,
  AtAGlanceCard,
  FAQSection,
} from '../components/ReusableBlocks';
import { SubscriptionSavingsCalculator } from '../components/SubscriptionSavingsCalculator';

export function HomePage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const localHref = useLocalHref();
  const heroCopy = (HOME_COPY[locale] ?? HOME_COPY.en).hero;
  // "Explore the Platform" follows the existing product navigation (product overview page);
  // if that page isn't available it scrolls to the at-a-glance summary below the hero.
  const productHref = resolveNavHref({ href: '/product' });
  const exploreHref = productHref ? localHref(productHref) : '#at-a-glance-heading';

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* 1. Hero — dark midnight canvas, revenue dashboard preview */}
      <HomeHero
        eyebrow={heroCopy.eyebrow}
        title={page.h1}
        highlight={heroCopy.highlight}
        description={heroCopy.subtitle}
        primary={{ label: heroCopy.primaryCta, href: APP_LINKS.signUp }}
        secondary={{ label: heroCopy.secondaryCta, href: exploreHref }}
        note={heroCopy.note}
        visual={<RevenueDashboardPreview previewLabel={heroCopy.previewLabel} />}
      />

      {/* 2. Integrations & technology ecosystem strip (full width, flush with the hero) */}
      <IntegrationsStrip className="-mt-16 md:-mt-24" />

      {/* 3. At A Glance GEO Fact Box */}
      {page.atAGlance && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <AtAGlanceCard data={page.atAGlance} />
        </section>
      )}

      {/* 4. Problem vs Solution Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Der Unterschied' : 'The Revenue Advantage'}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
            {locale === 'de'
              ? 'Schluss mit prozentualen Umsatzabzügen und Gateway-Abhängigkeit'
              : 'Stop paying a percentage of your revenue for subscription billing'}
          </h2>
          <p className="mt-3 text-base text-muted">
            {locale === 'de'
              ? 'US-Plattformen verlangen 0,7 % bis 5 % Ihres Umsatzes und binden Sie an ein einziges Gateway. MYFUNDBOX gibt Ihnen echte Unabhängigkeit.'
              : 'Legacy billing platforms take 0.7% to 5.0% of your gross billing volume while locking you into their processing. MYFUNDBOX charges a flat rate, letting you run your own gateway accounts with 0% revenue cut.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy / US Platforms */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-4">
            <div className="inline-flex rounded-lg bg-red-50 text-red-700 px-3 py-1 text-xs font-semibold">
              {locale === 'de' ? 'Klassische Billing-Anbieter (Stripe, Paddle, Recurly)' : 'Legacy Platforms (Stripe Billing, Paddle, Recurly)'}
            </div>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>
                  <strong>{locale === 'de' ? 'Prozentuale Gebühren:' : 'Percentage taxes:'}</strong>{' '}
                  {locale === 'de'
                    ? '0,7 % bis 5 % von jedem Euro Umsatz schmälern Ihre Marge bei jedem Wachstumsschritt.'
                    : '0.7% to 5% of every dollar billed cuts into your gross margin as you scale.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>
                  <strong>{locale === 'de' ? 'Gateway-Lock-in:' : 'Processor lock-in:'}</strong>{' '}
                  {locale === 'de'
                    ? 'Oft auf einen einzigen Zahlungsabwickler beschränkt, keine freie Wahl bei Gebühren oder Auszahlungen.'
                    : 'Locked into a single processor with zero leverage over merchant interchange fees.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>
                  <strong>{locale === 'de' ? 'Schlechter DACH-Support:' : 'Weak European payment rails:'}</strong>{' '}
                  {locale === 'de'
                    ? 'Umständliche SEPA-Handhabung, fehlende deutsche Buchhaltungsschnittstellen (sevDesk, Lexware).'
                    : 'Fragile SEPA Direct Debit handling, no native sync with DACH accounting tools like sevDesk.'}
                </span>
              </li>
            </ul>
          </div>

          {/* MYFUNDBOX */}
          <div className="rounded-2xl border-2 border-accent/40 bg-surface p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
            <div className="inline-flex rounded-lg bg-accent-soft text-accent px-3 py-1 text-xs font-semibold">
              {locale === 'de' ? 'Der MYFUNDBOX-Weg' : 'The MYFUNDBOX Advantage'}
            </div>
            <ul className="space-y-3 text-sm text-ink">
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-positive shrink-0 mt-0.5" />
                <span>
                  <strong>{locale === 'de' ? '0 % Umsatzabzug:' : '0% Revenue Cut:'}</strong>{' '}
                  {locale === 'de'
                    ? 'Feste monatliche Pauschalpreise basierend auf der Abonnentenzahl. Sie behalten 100 % Ihres Umsatzes.'
                    : 'Predictable flat pricing based on subscriber count. You keep 100% of the money you earn.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-positive shrink-0 mt-0.5" />
                <span>
                  <strong>{locale === 'de' ? 'Echtes Multi-Gateway:' : 'True Multi-Gateway Orchestration:'}</strong>{' '}
                  {locale === 'de'
                    ? 'Verbinden Sie Stripe, GoCardless, Mollie und PayPal gleichzeitig. Gelder gehen direkt auf Ihr Bankkonto.'
                    : 'Connect Stripe, GoCardless (SEPA), Mollie, and PayPal side-by-side. Funds deposit directly into your bank.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-positive shrink-0 mt-0.5" />
                <span>
                  <strong>{locale === 'de' ? 'EU-nativ & DSGVO-konform:' : 'EU-Native & Compliant:'}</strong>{' '}
                  {locale === 'de'
                    ? 'Hosting in Frankfurt am Main, automatische EU-MwSt.-Prüfung und nahtlose Anbindung an sevDesk & Xero.'
                    : 'Cloud hosting in Frankfurt, automated EU VAT validation, and seamless sync with sevDesk and Xero.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Key Features Bento Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Plattformfunktionen' : 'Core Capabilities'}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
            {locale === 'de'
              ? 'Alles, was Sie für Abos und wiederkehrende Zahlungen brauchen'
              : 'Complete subscription management without the complexity'}
          </h2>
          <p className="mt-3 text-base text-muted">
            {locale === 'de'
              ? 'Von flexiblen Plänen über Pay Links bis hin zum automatischen Mahnwesen – in einer zentralen Oberfläche.'
              : 'From flexible recurring plans and shareable Pay Links to automated dunning recovery and customer self-service.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-line-strong transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">
                {locale === 'de' ? 'Multi-Gateway-Zahlungen' : 'Multi-Gateway Processing'}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Verbinden Sie Stripe, GoCardless, Mollie, PayPal und Checkout.com. Bieten Sie Kunden Kreditkarten, SEPA-Lastschrift, iDEAL und mehr.'
                  : 'Run Stripe, GoCardless, Mollie, PayPal, and Checkout.com side-by-side. Offer cards, SEPA Direct Debit, and local European payment methods.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-medium text-accent flex items-center gap-1">
              <span>{locale === 'de' ? 'Mehr über Zahlungen' : 'Explore payments'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-line-strong transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">
                {locale === 'de' ? 'Flexible Abopläne & Testphasen' : 'Plans, Add-ons & Coupons'}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Erstellen Sie monatliche, quartalsweise oder jährliche Abos. Steuern Sie kostenlose Testphasen, Gutscheincodes und modulare Zusatzprodukte.'
                  : 'Build monthly, quarterly, or annual subscription tiers with free trials, discount coupons, upgrade prorations, and modular add-on products.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-medium text-accent flex items-center gap-1">
              <span>{locale === 'de' ? 'Mehr über Pläne' : 'Explore plans & trials'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-line-strong transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">
                {locale === 'de' ? 'Pay Links & Hosted Checkout' : 'Pay Links & Hosted Checkout'}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Erstellen Sie teilbare Zahlungslinks für E-Mails und Angebote oder binden Sie das responsive Checkout-Formular unter eigener Domain ein.'
                  : 'Generate instant no-code payment links to share via email or quote, or embed mobile-responsive hosted checkout with custom domain support.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-medium text-accent flex items-center gap-1">
              <span>{locale === 'de' ? 'Mehr über Pay Links' : 'Explore Pay Links'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-line-strong transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">
                {locale === 'de' ? 'Smart Dunning & Umsatzrettung' : 'Smart Dunning & Recovery'}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Automatische Wiederholungsversuche bei fehlgeschlagenen Kartenzahlungen, Ablaufwarnungen und E-Mail-Erinnerungen retten unabsichtlich gekündigte Abos.'
                  : 'Automated card retry schedules, pre-expiration alerts, and customer notifications prevent involuntary churn before accounts cancel.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-medium text-accent flex items-center gap-1">
              <span>{locale === 'de' ? 'Mehr über Dunning' : 'Explore dunning'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-line-strong transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">
                {locale === 'de' ? 'Kunden-Self-Service ("My Portal")' : 'Customer Self-Service Portal'}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Kunden aktualisieren ihre Zahlungsdaten, laden Rechnungen herunter und wechseln Pläne selbstständig – ohne den Support zu belasten.'
                  : 'Subscribers manage their payment cards, download past invoices, and upgrade or pause subscriptions directly in a white-labeled portal.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-medium text-accent flex items-center gap-1">
              <span>{locale === 'de' ? 'Mehr zum Kundenportal' : 'Explore customer portal'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-line-strong transition-colors">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
                <Receipt className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-ink">
                {locale === 'de' ? 'EU-MwSt. & Buchhaltungssync' : 'EU VAT & Accounting Sync'}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Automatische EU-Umsatzsteuer-Validierung, gesetzeskonforme PDF-Rechnungen und direkter Datenabgleich mit sevDesk, Lexware, QuickBooks und Xero.'
                  : 'Real-time European VAT ID validation, compliant PDF invoicing, and automated sync with sevDesk, Lexware, QuickBooks, and Xero.'}
              </p>
            </div>
            <div className="pt-2 text-xs font-medium text-accent flex items-center gap-1">
              <span>{locale === 'de' ? 'Mehr über Integrationen' : 'Explore integrations'}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works (3 Fast Steps) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'In 3 Schritten live' : 'Fast Setup'}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
            {locale === 'de'
              ? 'Startklar in unter 30 Minuten'
              : 'Live in under 30 minutes without developer headaches'}
          </h2>
          <p className="mt-3 text-base text-muted">
            {locale === 'de'
              ? 'Verbinden Sie Ihre Zahlungsdienste und starten Sie ohne wochenlange Integration.'
              : 'Connect your existing merchant gateways and start billing subscribers today.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-3">
            <div className="font-mono text-xs font-bold text-accent">01</div>
            <h3 className="text-lg font-display font-bold text-ink">
              {locale === 'de' ? 'Gateways verknüpfen' : 'Connect Your Gateways'}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {locale === 'de'
                ? 'Verbinden Sie Ihre Konten bei Stripe, GoCardless, Mollie oder PayPal mit wenigen Klicks.'
                : 'Connect your existing accounts at Stripe, GoCardless, Mollie, or PayPal in a couple of clicks. No new bank accounts required.'}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-3">
            <div className="font-mono text-xs font-bold text-accent">02</div>
            <h3 className="text-lg font-display font-bold text-ink">
              {locale === 'de' ? 'Pläne & Checkout erstellen' : 'Create Plans & Checkout'}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {locale === 'de'
                ? 'Legen Sie Abostufen fest, definieren Sie Testphasen und generieren Sie Pay Links oder Hosted Checkout.'
                : 'Define pricing tiers, configure free trials and coupon codes, and generate embeddable checkout or instant Pay Links.'}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-3">
            <div className="font-mono text-xs font-bold text-accent">03</div>
            <h3 className="text-lg font-display font-bold text-ink">
              {locale === 'de' ? 'Abrechnung automatisieren' : 'Automate & Collect'}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {locale === 'de'
                ? 'MYFUNDBOX übernimmt Verlängerungen, Dunning-Retries, MwSt.-Rechnungen und Kunden-Self-Service.'
                : 'MYFUNDBOX handles renewals, card retries, VAT invoices, and customer portal self-service automatically.'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. Interactive Savings Calculator */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SubscriptionSavingsCalculator />
      </section>

      {/* 8. EU Compliance, Security & Data Sovereignty */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-positive">
                <ShieldCheck className="h-4 w-4" />
                <span>{locale === 'de' ? 'Deutsches Hosting & DSGVO' : 'Frankfurt Hosting & GDPR'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
                {locale === 'de'
                  ? 'Höchste europäische Sicherheits- und Datenschutzstandards'
                  : 'European security, compliance, and data residency by design'}
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {locale === 'de'
                  ? 'Alle Kundendaten werden ausschließlich in nach ISO 27001 zertifizierten Rechenzentren in Frankfurt am Main gehostet. Volle DSGVO-Konformität, Auftragsverarbeitungsvertrag (AVV) auf Knopfdruck und Unterstützung für 3D Secure 2 sowie Zwei-Faktor-Authentifizierung (2FA).'
                  : 'Customer and payment token records are hosted strictly in ISO-certified data centers in Frankfurt am Main, Germany. Full GDPR compliance, automated Data Processing Agreements (DPA), and 2-Factor Authentication (2FA) with 3D Secure 2 (3DS2) protection.'}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-line bg-canvas p-4 space-y-1">
                <div className="font-semibold text-ink">Frankfurt am Main</div>
                <div className="text-subtle">ISO 27001 Cloud</div>
              </div>
              <div className="rounded-xl border border-line bg-canvas p-4 space-y-1">
                <div className="font-semibold text-ink">DSGVO / GDPR</div>
                <div className="text-subtle">AVV / DPA inklusive</div>
              </div>
              <div className="rounded-xl border border-line bg-canvas p-4 space-y-1">
                <div className="font-semibold text-ink">3D Secure 2</div>
                <div className="text-subtle">SCA-konforme Karten</div>
              </div>
              <div className="rounded-xl border border-line bg-canvas p-4 space-y-1">
                <div className="font-semibold text-ink">2FA Schutz</div>
                <div className="text-subtle">Zwei-Faktor-Login</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Integrations Matrix */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Offenes Ökosystem' : 'Integrations'}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
            {locale === 'de'
              ? 'Verbindet Zahlungs-Gateways und Buchhaltungssoftware'
              : 'Connected with your payment processors and accounting tools'}
          </h2>
          <p className="mt-3 text-base text-muted">
            {locale === 'de'
              ? 'Kein Austausch Ihrer bestehenden Bankverbindungen erforderlich. Nutzen Sie Ihre gewohnten Gateways.'
              : 'Bring your existing processor accounts. Funds settle directly to your corporate bank account.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-ink flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-accent" />
              <span>{locale === 'de' ? 'Zahlungs-Gateways' : 'Payment Gateways'}</span>
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">Stripe</span>
                <span className="text-muted">Kreditkarten, Apple Pay, Google Pay</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">GoCardless</span>
                <span className="text-muted">SEPA Lastschrift, Bacs, ACH</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">Mollie</span>
                <span className="text-muted">iDEAL, Bancontact, EPS, Cartes Bancaires</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">PayPal</span>
                <span className="text-muted">Weltweite PayPal-Zahlungen</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-ink">Checkout.com</span>
                <span className="text-muted">Enterprise Card Processing</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-ink flex items-center gap-2">
              <Receipt className="h-4 w-4 text-accent" />
              <span>{locale === 'de' ? 'Buchhaltung & Steuern' : 'Accounting & Invoicing'}</span>
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">QuickBooks Online</span>
                <span className="text-muted">Automatischer Rechnungsabgleich</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">Xero</span>
                <span className="text-muted">Synchronisation von Debitoren &amp; Zahlungen</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">sevDesk</span>
                <span className="text-muted">Deutsche Rechnungsstellung &amp; GoBD</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line">
                <span className="font-medium text-ink">Lexware</span>
                <span className="text-muted">Buchungssätze für die DACH-Finanz</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-ink">Avalara</span>
                <span className="text-muted">Automatisierte globale Steuerberechnung</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Transparent Flat Pricing Teaser */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
                {locale === 'de' ? 'Transparente Tarife' : 'Predictable Flat Pricing'}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-ink tracking-tight">
                {locale === 'de'
                  ? 'Feste Preise. Keine versteckten Umsatzabzüge.'
                  : 'Flat pricing by subscriber count. Zero percentage fees.'}
              </h2>
            </div>
            <AppLink href={localHref('/pricing')} className="btn-secondary px-5 py-2.5 text-sm shrink-0">
              {locale === 'de' ? 'Alle Tarife & Details ansehen' : 'View full pricing & feature matrix'}
            </AppLink>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-line bg-canvas p-6 space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-ink">Free</h3>
                <p className="text-xs text-muted mt-1">
                  {locale === 'de' ? 'Bis zu 25 Abonnenten' : 'Up to 25 active subscribers'}
                </p>
                <div className="mt-4 text-3xl font-display font-extrabold text-ink">0 €</div>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li>✓ Multi-Gateway Unterstützung</li>
                <li>✓ Hosted Checkout &amp; Pay Links</li>
                <li>✓ Standard Support</li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-accent bg-surface p-6 space-y-4 relative shadow-sm">
              <span className="absolute -top-3 right-4 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                Beliebt
              </span>
              <div>
                <h3 className="font-display font-bold text-lg text-ink">Professional</h3>
                <p className="text-xs text-muted mt-1">
                  {locale === 'de' ? 'Bis zu 500 Abonnenten' : 'Up to 500 active subscribers'}
                </p>
                <div className="mt-4 text-3xl font-display font-extrabold text-ink">
                  199 € <span className="text-xs font-normal text-muted">/ Monat</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-ink">
                <li>✓ Eigene Checkout-Domain</li>
                <li>✓ Smart Dunning &amp; Mahnwesen</li>
                <li>✓ Kunden-Self-Service-Portal</li>
                <li>✓ Prioritäts-Support</li>
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-canvas p-6 space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-ink">Advanced</h3>
                <p className="text-xs text-muted mt-1">
                  {locale === 'de' ? 'Unbegrenzte Abonnenten' : 'Unlimited active subscribers'}
                </p>
                <div className="mt-4 text-3xl font-display font-extrabold text-ink">
                  399 € <span className="text-xs font-normal text-muted">/ Monat</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-muted">
                <li>✓ Alle Buchhaltungs-Integrationen</li>
                <li>✓ Umfassender API- &amp; Webhook-Zugang</li>
                <li>✓ Dedizierter Onboarding-Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Competitor Comparison Directory Strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Marktvergleich' : 'Comparisons'}
          </p>
          <h2 className="mt-1 text-2xl font-display font-bold text-ink">
            {locale === 'de' ? 'Wie schneidet MYFUNDBOX im Vergleich ab?' : 'How MYFUNDBOX compares'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COMPETITORS.slice(0, 5).map((comp) => (
            <div
              key={comp.slug}
              className="rounded-xl border border-line bg-surface p-4 text-center hover:border-line-strong transition-colors"
            >
              <div className="text-xs font-semibold text-ink">vs. {comp.competitorName.split(' (')[0]}</div>
              <p className="mt-1 text-[11px] text-muted line-clamp-2">{comp.targetSegment}</p>
              <AppLink
                href={localHref(`/compare/${comp.slug}`)}
                className="mt-3 inline-block text-xs font-medium text-accent hover:underline"
              >
                Vergleich ansehen →
              </AppLink>
            </div>
          ))}
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <FAQSection
          heading={locale === 'de' ? 'Häufig gestellte Fragen zu MYFUNDBOX' : 'Frequently asked questions'}
          intro={
            locale === 'de'
              ? 'Transparente Antworten zu Gateways, Gebühren, Datenhosting und Kündigungsfristen.'
              : 'Direct answers about gateway connections, fees, data hosting, and migration.'
          }
          faqs={page.faqs}
        />
      </section>

      {/* 13. Final CTA Banner */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink tracking-tight max-w-2xl mx-auto">
            {locale === 'de'
              ? 'Bereit für vollautomatisierte Abrechnung ohne Umsatzabzug?'
              : 'Ready to automate subscription billing without giving up a cut of your revenue?'}
          </h2>
          <p className="max-w-xl mx-auto text-base text-muted">
            {locale === 'de'
              ? 'Starten Sie heute kostenlos mit bis zu 25 Abonnenten oder vereinbaren Sie eine geführte 30-Minuten-Demo.'
              : 'Start free with up to 25 subscribers or book a guided 30-minute product tour with our European team.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={APP_LINKS.signUp}
              className="btn-primary px-6 py-3 text-sm font-semibold"
            >
              {locale === 'de' ? 'Kostenlos starten (bis 25 Kunden)' : 'Start free with up to 25 subscribers'}
            </a>
            <button
              type="button"
              onClick={() => navigate(localHref('/book-a-demo'))}
              className="btn-secondary px-6 py-3 text-sm font-semibold cursor-pointer"
            >
              {locale === 'de' ? 'Produkttour anfordern' : 'Schedule a walkthrough'}
            </button>
          </div>
          <div className="pt-2 text-xs text-subtle">
            Keine Kreditkarte erforderlich · In 30 Minuten startklar · DSGVO-konform in Frankfurt gehostet
          </div>
        </div>
      </section>
    </div>
  );
}
