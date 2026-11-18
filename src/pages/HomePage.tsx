import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { LOCALE_UI_COPY, SITE_CONFIG } from '../data/siteConfig';
import { COMPETITORS } from '../data/competitorsData';
import {
  AppLink,
  AtAGlanceCard,
  AuthorMetaLine,
  FAQSection,
  SafeEditorialImage,
} from '../components/ReusableBlocks';
import { HeroLedgerPreview } from '../components/HeroLedgerPreview';
import { DeferredRevenueEstimator } from '../components/DeferredRevenueEstimator';

export function HomePage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const copy = LOCALE_UI_COPY[locale] ?? LOCALE_UI_COPY.en;
  const prefix = `/${locale}`;

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* 1. Eye-Catching Atmospheric Carbon-Obsidian & Coral-Amber Hero Section */}
      <section className="relative overflow-hidden hero-aurora-bg text-white border-b border-slate-800/80">
        <div className="pointer-events-none absolute inset-0 hero-grid-pattern" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center gap-6">
              <div>
                <p className="text-xs font-medium text-amber-300">
                  {copy.heroEyebrow}
                </p>
                <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-white leading-[1.1]">
                  {page.h1}
                </h1>
                <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-slate-200">
                  {page.aeoSummary}
                </p>
                <div className="mt-4 [&_div]:text-slate-300/90">
                  <AuthorMetaLine authorId={page.authorId} lastUpdated={page.lastUpdated} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`${prefix}/contact`)}
                  className="btn-gradient-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold cursor-pointer whitespace-nowrap"
                >
                  <span>{copy.nav.bookDemo}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href="#calculator"
                  className="inline-flex items-center rounded-lg border border-slate-500/40 bg-white/10 px-5 py-3 text-sm font-medium text-white hover:bg-white/15 transition-colors whitespace-nowrap backdrop-blur-sm"
                >
                  {copy.secondaryCta}
                </a>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-5 text-xs">
                <div>
                  <dt className="text-slate-400">Accounting</dt>
                  <dd className="mt-0.5 font-semibold text-white">IFRS 15 &amp; HGB</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Data Residency</dt>
                  <dd className="mt-0.5 font-semibold text-white">EU / Germany</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Gateway Lock-in</dt>
                  <dd className="mt-0.5 font-semibold text-white">0% Payment Cut</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-4">
              <HeroLedgerPreview />
              <div className="hidden sm:block">
                <SafeEditorialImage
                  src="/src/assets/images/hero_finance_architecture_1794994736085.jpg"
                  alt="Minimalist European financial headquarters interior representing MYFUNDBOX German engineering and precision"
                  className="h-44"
                />
              </div>
            </div>
          </div>

          {/* 2. Honest Customer Logo Bar Placeholder */}
          <div className="mt-12 border-t border-slate-800 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-medium text-slate-300">
                Built for European SaaS, membership, and agency finance teams
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-slate-400">
                <span>[ADD: EU Logo 01]</span>
                <span>[ADD: EU Logo 02]</span>
                <span>[ADD: EU Logo 03]</span>
                <span>[ADD: EU Logo 04]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. At A Glance GEO Fact Box */}
      {page.atAGlance && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AtAGlanceCard data={page.atAGlance} />
        </div>
      )}

      {/* 4. Problem vs Solution Section */}
      <section aria-labelledby="problem-solution-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2
                id="problem-solution-heading"
                className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
              >
                {page.sections[0].heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {page.sections[0].directAnswer}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Spreadsheet revenue tracking
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>· Broken pro-rata date formulas across mid-term upgrades</li>
                  <li>· Manual CSV reconciliations between Stripe, SEPA, and CRM</li>
                  <li>· Gross VAT totals leaking into MRR/ARR board decks</li>
                  <li>· Slow month-end close and painful statutory audit sampling</li>
                </ul>
              </div>

              <div className="rounded-xl border border-rose-200 dark:border-rose-900/70 bg-rose-50/45 dark:bg-rose-950/25 p-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  MYFUNDBOX revenue sub-ledger
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li>· Deterministic IFRS 15 &amp; HGB schedules in EUR</li>
                  <li>· Automated multi-source billing + CRM ingestion</li>
                  <li>· Native EU VAT separation between tax liability and net revenue</li>
                  <li>· Locked periods with invoice-to-GL audit lineage</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SafeEditorialImage
              src="/src/assets/images/eu_compliance_ledger_1794994737059.jpg"
              alt="Stepped brushed aluminum and smoked glass architectural blocks symbolizing structured deferred revenue tiers"
              caption="Structured deferred-to-recognized ledger schedules without altering customer billing."
              className="h-72 lg:h-full"
            />
          </div>
        </div>
      </section>

      {/* 5. Key Features Asymmetric Bento Grid */}
      <section aria-labelledby="capabilities-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl mb-10">
          <h2
            id="capabilities-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >
            What can finance teams automate inside MYFUNDBOX?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            MYFUNDBOX covers the complete revenue lifecycle—from IFRS 15 performance obligations and deferred revenue roll-forwards to recurring revenue metrics, contract forecasting, and DATEV/ERP exports—while leaving payment processing and customer invoicing to your existing stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="md:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
            <div>
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">01. Core Accounting Engine</div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                IFRS 15 &amp; HGB Revenue Recognition
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                Configure performance obligations, daily or monthly straight-line schedules, and mid-term upgrade rules once. Closed periods lock permanently while prospective adjustments flow cleanly into open months.
              </p>
            </div>
            <div className="mt-6">
              <AppLink
                href={`${prefix}/product/revenue-recognition`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline"
              >
                <span>Explore Revenue Recognition</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
            <div>
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">02. Balance Sheet Control</div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Deferred Revenue &amp; Accruals
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Track short-term and long-term deferred liabilities (PRAP) and unbilled accruals with one-click opening-to-closing roll-forwards.
              </p>
            </div>
            <div className="mt-6">
              <AppLink
                href={`${prefix}/product/deferred-revenue-accruals`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline"
              >
                <span>Explore Deferred Revenue</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
            <div>
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">03. Board &amp; RevOps KPIs</div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                MRR, ARR &amp; Cohort Reporting
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Unify New, Expansion, Contraction, Churn, and Net Revenue Retention in EUR—100% reconciled to recognized P&amp;L revenue.
              </p>
            </div>
            <div className="mt-6">
              <AppLink
                href={`${prefix}/product/revenue-reporting`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline"
              >
                <span>Explore Reporting</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </div>
          </article>

          <article className="md:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between hover:border-rose-500/40 transition-colors">
            <div>
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">04. Forward Visibility &amp; Stack Sync</div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Contract-Level Revenue Forecasting &amp; EU ERP Exports
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                Project deferred revenue burn-down, empirical cohort renewals, and weighted CRM pipeline across 12–36 months, while exporting clean monthly journal entries to DATEV, SAP, Exact, Xero, or NetSuite.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-6">
              <AppLink
                href={`${prefix}/product/revenue-forecasting`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline"
              >
                <span>Explore Forecasting</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
              <AppLink
                href={`${prefix}/product/integrations-api`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:underline"
              >
                <span>Explore Integrations &amp; API</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </div>
          </article>
        </div>
      </section>

      {/* 6. How It Works (3 numbered steps) */}
      <section aria-labelledby="how-it-works-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-10">
          <div className="max-w-3xl">
            <h2
              id="how-it-works-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
            >
              {page.sections[1].heading}
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {page.sections[1].directAnswer}
            </p>
          </div>

          <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {page.sections[1].numberedSteps?.map((step, idx) => (
              <li key={step.title} className="border-t border-slate-200 dark:border-slate-800 pt-5">
                <div className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-400">
                  0{idx + 1}
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Interactive Deferred Revenue & Close-Time Estimator */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DeferredRevenueEstimator />
      </div>

      {/* 8. EU Compliance & Security Section */}
      <section aria-labelledby="eu-compliance-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5">
            <SafeEditorialImage
              src="/src/assets/images/cfo_boardroom_review_1794994737088.jpg"
              alt="European finance director and controller reviewing audit schedules in a sunlit Berlin boardroom"
              caption="Audit-ready documentation engineered for German and EU statutory reviews."
              className="h-72 lg:h-full"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h2
                id="eu-compliance-heading"
                className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
              >
                How does MYFUNDBOX address IFRS 15, HGB/GoBD, and GDPR?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                MYFUNDBOX is engineered in Germany with EU data residency, GDPR Art. 28 Data Processing Agreements, and accounting schedules aligned with{' '}
                <a
                  href="https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-700 dark:text-rose-400 underline underline-offset-2"
                >
                  IFRS 15 (IFRS Foundation)
                </a>{' '}
                and{' '}
                <a
                  href="https://eur-lex.europa.eu/eli/reg/2016/679/oj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-700 dark:text-rose-400 underline underline-offset-2"
                >
                  EU GDPR (EUR-Lex 2016/679)
                </a>
                .
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4 font-semibold">Standard / Control</th>
                    <th className="py-3 px-4 font-semibold">Scope</th>
                    <th className="py-3 px-4 font-semibold">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SITE_CONFIG.complianceStandards.map((item) => (
                    <tr key={item.name}>
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{item.name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.scope}</td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <AppLink
                href={`${prefix}/security`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline"
              >
                <span>Review Security, DPA &amp; EU Residency details</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Integrations Matrix */}
      <section aria-labelledby="integrations-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h2
              id="integrations-heading"
              className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
            >
              Connects to your billing, CRM, and European ERP stack
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Confirm specific connector availability for your tenant during onboarding.
            </p>
          </div>
          <AppLink
            href={`${prefix}/product/integrations-api`}
            className="text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline whitespace-nowrap"
          >
            View Integration &amp; API matrix →
          </AppLink>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SITE_CONFIG.supportedIntegrations.map((integ) => (
            <div
              key={integ.name}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-rose-500/40 transition-colors"
            >
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{integ.name}</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{integ.category}</div>
              <div className="mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">{integ.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Pricing Teaser & Testimonials Placeholder */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
              EUR pricing with zero payment processing cut
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              MYFUNDBOX never takes a percentage of your customer payments. Plans scale transparently based on annual recurring revenue managed and ERP integration scope [ADD: Final EUR tiers].
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-rose-700 dark:text-rose-400 shrink-0" aria-hidden="true" />
                <span>IFRS 15 &amp; HGB recognition engine included across all tiers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-rose-700 dark:text-rose-400 shrink-0" aria-hidden="true" />
                <span>EU hosting residency &amp; GDPR DPA included</span>
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <AppLink
              href={`${prefix}/pricing`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline"
            >
              <span>Compare Growth, Scale &amp; Enterprise plans</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </AppLink>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Customer outcomes [ADD: Verified Testimonials]
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              &ldquo;[ADD: Attributable customer quote describing spreadsheet replacement, IFRS 15 audit readiness, and month-end close hours saved.]&rdquo;
            </p>
            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              [ADD: Full Name, CFO / Head of Finance, European Customer Company]
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <AppLink href={`${prefix}/case-studies`} className="font-semibold text-rose-700 dark:text-rose-400 hover:underline">
              View case study templates →
            </AppLink>
            <AppLink href={`${prefix}/compare/myfundbox-vs-stripe-revenue-recognition`} className="font-medium text-slate-700 dark:text-slate-300 hover:underline">
              Compare alternatives →
            </AppLink>
          </div>
        </div>
      </section>

      {/* 11. Competitor Comparison Directory Strip */}
      <section aria-labelledby="compare-strip-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
          <h2 id="compare-strip-heading" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Evaluating MYFUNDBOX against US or billing-bundled alternatives?
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Review neutral feature, pricing-model, and EU-compliance comparisons compiled from public documentation.
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {COMPETITORS.map((c) => (
              <AppLink
                key={c.slug}
                href={`${prefix}/compare/${c.slug}`}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2.5 font-medium text-slate-800 dark:text-slate-200 hover:border-rose-600 dark:hover:border-rose-500 transition-colors"
              >
                vs {c.competitorName.split(' (')[0]}
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FAQSection faqs={page.faqs} />
      </div>

      {/* 13. Final CTA with Matching Carbon-Obsidian Backdrop & Gradient Button */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl border border-slate-800 hero-aurora-bg text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="pointer-events-none absolute inset-0 hero-grid-pattern opacity-60" aria-hidden="true" />
          <div className="relative max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Ready for an audit-ready month-end close in EUR?
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-200 leading-relaxed">
              Walk through your subscription contracts, IFRS 15 recognition rules, and DATEV/ERP exports with our Germany-based product specialists.
            </p>
          </div>
          <div className="relative flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate(`${prefix}/contact`)}
              className="btn-gradient-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              <span>{copy.nav.bookDemo}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
