import React, { useState } from 'react';
import {
  Check,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { useRouter } from '../context/RouterContext';
import { useLocalHref } from '../utils/navLinks';
import { APP_LINKS } from '../data/siteConfig';
import {
  BreadcrumbNav,
  AuthorMetaLine,
  FAQSection,
} from '../components/ReusableBlocks';
import { SubscriptionSavingsCalculator } from '../components/SubscriptionSavingsCalculator';

export function PricingPage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const localHref = useLocalHref();
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  const plans = [
    {
      name: 'Free',
      tagline: locale === 'de' ? 'Ideal zum Testen mit echten Kunden' : 'Perfect for new launches and side products',
      priceMonthly: 0,
      priceAnnual: 0,
      subscribers: locale === 'de' ? 'Bis zu 25 Abonnenten' : 'Up to 25 active subscribers',
      features: [
        locale === 'de' ? 'Multi-Gateway (Stripe, GoCardless, PayPal, Mollie)' : 'Multi-Gateway (Stripe, GoCardless, PayPal, Mollie)',
        locale === 'de' ? 'Hosted Checkout & Pay Links' : 'Hosted Checkout & Pay Links',
        locale === 'de' ? 'Automatisierte Rechnungen & EU-MwSt.' : 'Automated Invoicing & EU VAT',
        locale === 'de' ? '0 % Umsatzabzug durch MYFUNDBOX' : '0% revenue cut by MYFUNDBOX',
        locale === 'de' ? 'Standard E-Mail-Support' : 'Standard email support',
      ],
      popular: false,
      ctaText: locale === 'de' ? 'Kostenlos registrieren' : 'Get started free',
      ctaHref: APP_LINKS.signUp,
    },
    {
      name: 'Professional',
      tagline: locale === 'de' ? 'Für wachsende SaaS- und Abo-Unternehmen' : 'For growing SaaS and subscription businesses',
      priceMonthly: 249,
      priceAnnual: 199,
      subscribers: locale === 'de' ? 'Bis zu 500 Abonnenten' : 'Up to 500 active subscribers',
      features: [
        locale === 'de' ? 'Alles aus dem Free-Tarif' : 'Everything in Free',
        locale === 'de' ? 'Eigene Domain für den Checkout' : 'Custom domain for hosted checkout',
        locale === 'de' ? 'Smart Dunning & automatisches Mahnwesen' : 'Smart Dunning & card retry recovery',
        locale === 'de' ? 'Kunden-Self-Service-Portal ("My Portal")' : 'White-labeled customer self-service portal',
        locale === 'de' ? 'Prioritäts-Support (E-Mail & Chat)' : 'Priority support (email & chat)',
        locale === 'de' ? '0 % Umsatzabzug' : '0% revenue cut',
      ],
      popular: true,
      ctaText: locale === 'de' ? 'Professional wählen' : 'Start Professional',
      ctaHref: APP_LINKS.signUp,
    },
    {
      name: 'Advanced',
      tagline: locale === 'de' ? 'Für etablierte Unternehmen mit hohem Volumen' : 'For established subscription businesses and scaleups',
      priceMonthly: 499,
      priceAnnual: 399,
      subscribers: locale === 'de' ? 'Unbegrenzte Abonnenten' : 'Unlimited active subscribers',
      features: [
        locale === 'de' ? 'Alles aus Professional' : 'Everything in Professional',
        locale === 'de' ? 'Alle Buchhaltungs-Syncs (sevDesk, Lexware, Xero, QBO)' : 'All accounting syncs (sevDesk, Lexware, Xero, QBO)',
        locale === 'de' ? 'Vollständiger API- & Webhook-Zugriff' : 'Full REST API & webhook access',
        locale === 'de' ? 'Dedizierter Onboarding- & Migrations-Support' : 'Dedicated onboarding & migration specialist',
        locale === 'de' ? 'SLA-Garantie & Enterprise Support' : 'SLA guarantee & enterprise assistance',
        locale === 'de' ? '0 % Umsatzabzug' : '0% revenue cut',
      ],
      popular: false,
      ctaText: locale === 'de' ? 'Advanced wählen' : 'Start Advanced',
      ctaHref: APP_LINKS.signUp,
    },
  ];

  const comparisonCategories = [
    {
      category: locale === 'de' ? 'Abonnements & Pläne' : 'Subscriptions & Plans',
      rows: [
        { feature: 'Aktive Abonnenten', free: 'Bis 25', pro: 'Bis 500', adv: 'Unbegrenzt' },
        { feature: 'Umsatzbeteiligung (GMV Cut)', free: '0 %', pro: '0 %', adv: '0 %' },
        { feature: 'Wiederkehrende Abrechnungsintervalle', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'Testphasen & Gutscheincodes', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'Modulare Add-on-Produkte', free: '✓', pro: '✓', adv: '✓' },
      ],
    },
    {
      category: locale === 'de' ? 'Zahlungen & Gateways' : 'Payment Gateways',
      rows: [
        { feature: 'Stripe (Kreditkarten, Apple Pay)', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'GoCardless (SEPA-Lastschrift)', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'Mollie (iDEAL, Bancontact)', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'PayPal', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'Multi-Gateway-Routing', free: '✓', pro: '✓', adv: '✓' },
      ],
    },
    {
      category: locale === 'de' ? 'Checkout & Kundenportal' : 'Checkout & Retention',
      rows: [
        { feature: 'Hosted Checkout & Pay Links', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'Eigene Checkout-Domain', free: '—', pro: '✓', adv: '✓' },
        { feature: 'Smart Dunning & Retries', free: '—', pro: '✓', adv: '✓' },
        { feature: 'Kunden-Self-Service-Portal', free: '—', pro: '✓', adv: '✓' },
      ],
    },
    {
      category: locale === 'de' ? 'Buchhaltung & Support' : 'Accounting & Support',
      rows: [
        { feature: 'Automatisierte EU-MwSt.-Prüfung', free: '✓', pro: '✓', adv: '✓' },
        { feature: 'sevDesk & Lexware Integration', free: '—', pro: 'Optional', adv: '✓' },
        { feature: 'QuickBooks & Xero Sync', free: '—', pro: 'Optional', adv: '✓' },
        { feature: 'Support-Level', free: 'Standard', pro: 'Priorität', adv: 'Dediziert & SLA' },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14 space-y-16">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center">
          <BreadcrumbNav items={page.breadcrumbs} />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
          {page.h1}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted">
          {page.aeoSummary}
        </p>

        {/* Annual / Monthly Billing Switcher */}
        <div className="pt-6 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!annualBilling ? 'text-ink' : 'text-muted'}`}>
            {locale === 'de' ? 'Monatliche Abrechnung' : 'Monthly billing'}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annualBilling}
            onClick={() => setAnnualBilling((v) => !v)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              annualBilling ? 'bg-ink' : 'bg-soft border-line'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                annualBilling ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-medium flex items-center gap-1.5 ${annualBilling ? 'text-ink' : 'text-muted'}`}>
            <span>{locale === 'de' ? 'Jährliche Abrechnung' : 'Annual billing'}</span>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent font-ui">
              {locale === 'de' ? '2 Monate gratis' : 'Save 20%'}
            </span>
          </span>
        </div>
      </header>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((p) => {
          const price = annualBilling ? p.priceAnnual : p.priceMonthly;
          return (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 relative ${
                p.popular
                  ? 'border-2 border-accent bg-surface shadow-md ring-1 ring-accent/20'
                  : 'border-line bg-surface shadow-xs'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider font-ui">
                  {locale === 'de' ? 'Beliebtester Tarif' : 'Most Popular'}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-ink">{p.name}</h2>
                  <p className="mt-1 text-xs text-muted leading-snug">{p.tagline}</p>
                </div>

                <div className="border-t border-line pt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-extrabold text-ink tabular-nums">
                      {price} €
                    </span>
                    <span className="text-sm text-muted">/ Monat</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-accent font-ui">
                    {p.subscribers} · 0 % Umsatzprovision
                  </div>
                  {annualBilling && p.priceAnnual > 0 && (
                    <div className="mt-1 text-[11px] text-subtle">
                      {locale === 'de'
                        ? `${price * 12} € jährlich abgerechnet`
                        : `${price * 12} € billed annually`}
                    </div>
                  )}
                </div>

                <div className="border-t border-line pt-4 space-y-2.5">
                  <span className="text-xs font-semibold text-ink uppercase tracking-wider font-ui block">
                    {locale === 'de' ? 'Enthaltene Leistungen:' : 'Included:'}
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-ink">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-positive shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
                <a
                  href={p.ctaHref}
                  className={`w-full justify-center py-2.5 text-sm font-semibold ${
                    p.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {p.ctaText}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="rounded-xl border border-line bg-soft/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-positive shrink-0" />
          <span>
            {locale === 'de'
              ? 'Keine Einrichtungsgebühr · Jederzeit kündbar · Echtes Flat-Modell ohne Transaktionsaufschläge'
              : 'Zero setup fees · Cancel anytime · True flat rate pricing with no platform transaction cut'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate(localHref('/book-a-demo'))}
          className="text-accent font-semibold hover:underline cursor-pointer whitespace-nowrap"
        >
          {locale === 'de' ? 'Fragen zu den Tarifen? Demo buchen →' : 'Questions on pricing? Book a demo →'}
        </button>
      </div>

      {/* Savings Calculator Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Ersparnis-Vergleich' : 'Transparent Cost Comparison'}
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-ink">
            {locale === 'de' ? 'Berechnen Sie Ihre Ersparnis' : 'See how much you save with MYFUNDBOX'}
          </h2>
        </div>
        <SubscriptionSavingsCalculator />
      </section>

      {/* Detailed Feature Comparison Table */}
      <section className="space-y-6">
        <div className="border-b border-line pb-4">
          <h2 className="text-2xl font-display font-bold text-ink">
            {locale === 'de' ? 'Ausführlicher Funktionsvergleich' : 'Detailed Feature Comparison'}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {locale === 'de'
              ? 'Alle Funktionen und Unterschiede auf einen Blick.'
              : 'Comprehensive breakdown across all MYFUNDBOX tiers.'}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-line bg-soft">
                <th className="py-3 px-4 font-semibold text-ink w-1/2">Funktion</th>
                <th className="py-3 px-4 font-semibold text-ink text-center">Free</th>
                <th className="py-3 px-4 font-semibold text-ink text-center bg-accent-soft/40">Professional</th>
                <th className="py-3 px-4 font-semibold text-ink text-center">Advanced</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-xs sm:text-sm">
              {comparisonCategories.map((cat) => (
                <React.Fragment key={cat.category}>
                  <tr className="bg-soft/70">
                    <td colSpan={4} className="py-2.5 px-4 font-bold text-ink uppercase tracking-wider text-xs font-ui">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.rows.map((row) => (
                    <tr key={row.feature} className="hover:bg-soft/30 transition-colors">
                      <td className="py-3 px-4 text-ink font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-muted">{row.free}</td>
                      <td className="py-3 px-4 text-center font-semibold text-ink bg-accent-soft/20">{row.pro}</td>
                      <td className="py-3 px-4 text-center text-muted">{row.adv}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing FAQs */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto">
          <FAQSection faqs={page.faqs} />
        </section>
      )}

      {/* Bottom CTA */}
      <section className="rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink">
          {locale === 'de' ? 'Starten Sie noch heute ohne Risiko' : 'Get started today with zero risk'}
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto">
          {locale === 'de'
            ? 'Bis 25 Abonnenten ist MYFUNDBOX dauerhaft kostenlos. Upgrade erst, wenn Ihr Geschäft wächst.'
            : 'MYFUNDBOX is free forever up to 25 subscribers. Upgrade only when your subscription volume expands.'}
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
            {locale === 'de' ? 'Demo anfordern' : 'Schedule a walkthrough'}
          </button>
        </div>
      </section>
    </div>
  );
}

