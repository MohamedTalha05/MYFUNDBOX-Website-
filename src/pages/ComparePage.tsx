import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { COMPETITORS, COMPETITOR_DISCLAIMER } from '../data/competitorsData';
import {
  AeoDirectAnswer,
  AppLink,
  AuthorMetaLine,
  BreadcrumbNav,
  FAQSection,
} from '../components/ReusableBlocks';
import { formatEUDate } from '../utils/formatting';

export function ComparePage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const prefix = `/${locale}`;
  const comp = page.competitorData;

  if (!comp) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14 space-y-14">
      <header className="max-w-4xl">
        <BreadcrumbNav items={page.breadcrumbs} />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          {page.h1}
        </h1>
        <AeoDirectAnswer text={comp.twoSentenceSummary} />
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <AuthorMetaLine authorId={page.authorId} lastUpdated={comp.lastReviewed} />
          <span aria-hidden="true">·</span>
          <span>Last reviewed: {formatEUDate(comp.lastReviewed, locale)}</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {COMPETITOR_DISCLAIMER} {comp.overlapNote}
        </p>
      </header>

      {/* Feature-by-Feature HTML Comparison Table */}
      <section aria-labelledby="comparison-table-heading">
        <h2
          id="comparison-table-heading"
          className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-4"
        >
          How do MYFUNDBOX and {comp.competitorName} compare feature by feature?
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">Capability</th>
                <th className="py-3.5 px-4 font-semibold text-rose-700 dark:text-rose-400">MYFUNDBOX</th>
                <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">{comp.competitorName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {comp.featureComparison.map((row) => (
                <tr key={row.capability}>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">{row.capability}</td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200">{row.myfundbox}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Best For Guidance */}
      <section aria-labelledby="best-for-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-rose-200 dark:border-rose-900/70 bg-white dark:bg-slate-900 p-6 md:p-8">
          <h2 id="best-for-heading" className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            When MYFUNDBOX is the stronger fit
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {comp.bestForMyfundbox.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-rose-700 dark:text-rose-400 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            When {comp.competitorName} may fit better
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {comp.bestForCompetitor.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Migration Steps + Pricing Comparison */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            How do teams transition or connect alongside {comp.competitorName}?
          </h2>
          <ol className="mt-5 space-y-4">
            {comp.migrationSteps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-mono text-xs font-semibold text-rose-700 dark:text-rose-400 mt-0.5 shrink-0">
                  0{idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Pricing model comparison
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-rose-700 dark:text-rose-400">MYFUNDBOX</dt>
                <dd className="mt-1 text-slate-700 dark:text-slate-300">{comp.pricingComparison.myfundboxModel}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-slate-100">{comp.competitorName}</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-400">{comp.pricingComparison.competitorModel}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              {comp.pricingComparison.summaryNote}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate(`${prefix}/contact`)}
              className="btn-gradient-primary inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer"
            >
              <span>Book a demo</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <AppLink
              href={
                page.isAltPage
                  ? `${prefix}/compare/${comp.slug}`
                  : `${prefix}/alternatives/${comp.altSlug}`
              }
              className="inline-flex items-center text-xs font-medium text-rose-700 dark:text-rose-400 hover:underline"
            >
              {page.isAltPage
                ? `Read direct MYFUNDBOX vs ${comp.competitorName} comparison`
                : `View ${comp.competitorName} alternatives overview`}
            </AppLink>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection heading={`${comp.competitorName} comparison FAQ`} faqs={comp.faqs} />

      {/* Other Comparisons Directory */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          All revenue management comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {COMPETITORS.map((other) => (
            <div
              key={other.slug}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-1"
            >
              <AppLink
                href={`${prefix}/compare/${other.slug}`}
                className="block font-medium text-slate-900 dark:text-slate-100 hover:text-rose-700 dark:hover:text-rose-400"
              >
                MYFUNDBOX vs {other.competitorName.split(' (')[0]}
              </AppLink>
              <AppLink
                href={`${prefix}/alternatives/${other.altSlug}`}
                className="block text-xs text-slate-500 dark:text-slate-400 hover:underline"
              >
                {other.competitorName.split(' (')[0]} alternatives →
              </AppLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
