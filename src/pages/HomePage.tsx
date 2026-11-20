import React from 'react';
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
import { HowItWorks } from '../components/HowItWorks';
import { GlobalPayments } from '../components/GlobalPayments';
import { SolutionsSection } from '../components/SolutionsSection';
import { PortalShowcase } from '../components/PortalShowcase';
import { SecuritySection } from '../components/SecuritySection';
import { CustomerStories } from '../components/CustomerStories';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { APP_LINKS, SITE_CONFIG } from '../data/siteConfig';
import { COMPETITORS } from '../data/competitorsData';
import {
  AppLink,
  FAQSection,
} from '../components/ReusableBlocks';
import { SubscriptionSavingsCalculator } from '../components/SubscriptionSavingsCalculator';

export function HomePage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const localHref = useLocalHref();
  const heroCopy = (HOME_COPY[locale] ?? HOME_COPY.en).hero;
  // "Explore the Platform" follows the existing product navigation (product overview page);
  // if that page isn't available it scrolls to the platform introduction (#solution).
  const productHref = resolveNavHref({ href: '/product' });
  const exploreHref = productHref ? localHref(productHref) : '#solution';

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

      {/* 4. Problem section — leads into the solution section (#solution) */}
      <ProblemSection solutionAnchor="#solution" />

      {/* 4b. Platform introduction — the "solution": hub of six connected modules (flush with the problem bridge) */}
      <PlatformIntro id="solution" exploreHref={exploreHref} className="-mt-16 md:-mt-24" />

      {/* 5. Core capabilities — six feature cards with mini previews */}
      <CapabilitiesSection />

      {/* 5b. Product showcase — tabbed illustrative interface */}
      <ProductShowcase exploreHref={exploreHref} />

      {/* 5c. Integrations & technology ecosystem — dark logo wall */}
      <IntegrationsStrip />

      {/* 6. How it works — four connected steps on cloud white */}
      <HowItWorks ctaHref={APP_LINKS.signUp} />

      {/* 6b. Global payments — dark section with globe (no unverified country/currency counts) */}
      <GlobalPayments />

      {/* 6c. Industry solutions — three large cards with abstract previews */}
      <SolutionsSection />

      {/* 6d. Customer self-service (My Portal) showcase */}
      <PortalShowcase />

      {/* 7. Interactive Savings Calculator */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SubscriptionSavingsCalculator />
      </section>

      {/* 8. Security & reliability — dark section, verified capabilities only (see SECURITY_COPY) */}
      <SecuritySection />

      {/* 9. Customer stories — approved testimonials only; example workflows until enough exist */}
      <CustomerStories />

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
