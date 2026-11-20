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
import { DifferentiationSection } from '../components/DifferentiationSection';
import { CustomerStories } from '../components/CustomerStories';
import { ResourcesSection } from '../components/ResourcesSection';
import { HomeFAQ } from '../components/HomeFAQ';
import { FinalCTA } from '../components/FinalCTA';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { APP_LINKS, SITE_CONFIG } from '../data/siteConfig';
import { COMPETITORS } from '../data/competitorsData';
import { AppLink } from '../components/ReusableBlocks';
import { SubscriptionSavingsCalculator } from '../components/SubscriptionSavingsCalculator';

export function HomePage({ page }: { page: PageMetadataEntry }) {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const heroCopy = (HOME_COPY[locale] ?? HOME_COPY.en).hero;
  // "Explore the Platform" follows the existing product navigation (product overview page);
  // if that page isn't available it scrolls to the platform introduction (#solution).
  const productHref = resolveNavHref({ href: '/product' });
  const exploreHref = productHref ? localHref(productHref) : '#solution';

  return (
    // Sections sit flush against each other; each one owns its vertical padding, so there are
    // no blank bands between full-bleed backgrounds. Don't reintroduce a space-y gap here.
    <div>
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
      <PlatformIntro id="solution" exploreHref={exploreHref} />

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

      {/* 6c+. Differentiation ("More than billing") — dark editorial list with a pinned platform hub */}
      <DifferentiationSection />

      {/* 6d. Customer self-service (My Portal) showcase */}
      <PortalShowcase />

      {/* 7. Interactive Savings Calculator */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <SubscriptionSavingsCalculator />
      </section>

      {/* 8. Security & reliability — dark section, verified capabilities only (see SECURITY_COPY) */}
      <SecuritySection />

      {/* 9. Customer stories — approved testimonials only; example workflows until enough exist */}
      <CustomerStories />

      {/* 10. Pricing teaser removed for now (2026-11-20); pricing presentation to be decided. */}

      {/* 11. Competitor Comparison Directory Strip */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24">
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

      {/* 11b. Resources & insights — latest live blog articles (npm run sync:blog) */}
      <ResourcesSection />

      {/* 12. FAQ — lavender band, intro + accessible accordion; answers always in the HTML */}
      <HomeFAQ faqs={page.faqs} />

      {/* 13. Final conversion section — midnight canvas, Get Started (app sign-up) + Book a Demo */}
      <FinalCTA />
    </div>
  );
}
