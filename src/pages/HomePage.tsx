import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLocalHref } from '../utils/navLinks';
import { HOME_COPY } from '../data/homeContent';
import { HomeHero } from '../components/HomeHero';
import { RevenueDashboardPreview } from '../components/RevenueDashboardPreview';
import { ProblemSection } from '../components/ProblemSection';
import { PlatformIntro } from '../components/PlatformIntro';
import { CapabilityShowcase } from '../components/CapabilityShowcase';
import { BusinessModels } from '../components/BusinessModels';
import { HowItWorks } from '../components/HowItWorks';
import { IntegrationsStrip } from '../components/IntegrationsStrip';
import { GlobalPayments } from '../components/GlobalPayments';
import { SecuritySection } from '../components/SecuritySection';
import { HomeFAQ } from '../components/HomeFAQ';
import { FinalCTA } from '../components/FinalCTA';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { APP_LINKS } from '../data/siteConfig';

/**
 * Homepage, Phase 3A (2026-11-25): "The Revenue Infrastructure for Modern Businesses".
 *
 * Section order (approved brief):
 *   1 Hero · 2 Problem · 3 Platform overview · 4 Product capabilities · 5 Business models ·
 *   6 How it works · 7 Integrations · 8 Global payments · 9 Trust & security · (FAQ) ·
 *   10 Final CTA · 11 Footer (rendered by App).
 * The FAQ stays between trust and the final CTA: its direct answers are what search engines and
 * AI answer systems quote (they are also in the page .md export and llms-full.txt).
 *
 * Removed from the homepage in this phase (components kept in the repo, not rendered):
 * ProductShowcase, DifferentiationSection, PortalShowcase, SubscriptionSavingsCalculator
 * (fee comparisons with named competitors), CustomerStories, the comparison strip (legacy
 * revenue-recognition compare pages) and ResourcesSection.
 *
 * Get Started always uses APP_LINKS.signUp, the existing app sign-up flow (unchanged URL).
 */
export function HomePage({ page }: { page: PageMetadataEntry }) {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const heroCopy = (HOME_COPY[locale] ?? HOME_COPY.en).hero;

  return (
    // Sections sit flush against each other; each one owns its vertical padding, so there are
    // no blank bands between full-bleed backgrounds. Don't reintroduce a space-y gap here.
    <div>
      {/* 1. Hero: dark midnight canvas, illustrative revenue dashboard */}
      <HomeHero
        eyebrow={heroCopy.eyebrow}
        title={page.h1}
        highlight={heroCopy.highlight}
        description={heroCopy.subtitle}
        primary={{ label: heroCopy.primaryCta, href: APP_LINKS.signUp }}
        secondary={{ label: heroCopy.secondaryCta, href: localHref('/book-a-demo') }}
        note={heroCopy.note}
        visual={<RevenueDashboardPreview previewLabel={heroCopy.previewLabel} />}
      />

      {/* 2. The problem: six challenges on a "fragmented stack" board, bridging into #platform */}
      <ProblemSection solutionAnchor="#platform" />

      {/* 3. Platform overview: hub with seven connected capabilities */}
      <PlatformIntro id="platform" exploreHref={localHref('/product')} />

      {/* 4. Product capabilities: seven tabbed, illustrative product showcases */}
      <CapabilityShowcase />

      {/* 5. Built for different business models: SaaS, AI, Industrial, Digital */}
      <BusinessModels />

      {/* 6. How it works: Configure → Connect Payments → Manage Billing → Track Revenue */}
      <HowItWorks ctaHref={APP_LINKS.signUp} />

      {/* 7. Integrations: confirmed integrations, linked to the existing live integration pages */}
      <IntegrationsStrip />

      {/* 8. Global payment capabilities: no unverified country/currency counts */}
      <GlobalPayments />

      {/* 9. Trust & security: team-confirmed security capabilities only, no certifications */}
      <SecuritySection />

      {/* FAQ: direct, crawlable answers (AEO / GEO) */}
      <HomeFAQ faqs={page.faqs} />

      {/* 10. Final CTA: Get Started (app sign-up) + Book a Demo */}
      <FinalCTA />
    </div>
  );
}
