import React from 'react';
import {
  CreditCard,
  Globe2,
  Lock,
  ShieldCheck,
  Sparkles,
  Receipt,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { HOME_COPY } from '../data/homeContent';
import { HomeHero } from '../components/HomeHero';
import { RevenueDashboardPreview } from '../components/RevenueDashboardPreview';
import { IntegrationsStrip } from '../components/IntegrationsStrip';
import { ProblemSection } from '../components/ProblemSection';
import { PlatformIntro } from '../components/PlatformIntro';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { ProductShowcase } from '../components/ProductShowcase';
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

      {/* 4. Problem section — leads into the solution section (#solution) */}
      <ProblemSection solutionAnchor="#solution" />

      {/* 4b. Platform introduction — the "solution": hub of six connected modules (flush with the problem bridge) */}
      <PlatformIntro id="solution" exploreHref={exploreHref} className="-mt-16 md:-mt-24" />

      {/* 5. Core capabilities — six feature cards with mini previews */}
      <CapabilitiesSection />

      {/* 5b. Product showcase — tabbed illustrative interface */}
      <ProductShowcase exploreHref={exploreHref} />

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
