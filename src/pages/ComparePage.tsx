import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useLocalHref } from '../utils/navLinks';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { COMPETITORS, COMPETITOR_DISCLAIMER } from '../data/competitorsData';
import {
  AppLink,
  AuthorMetaLine,
  FAQSection,
  PageHero,
} from '../components/ReusableBlocks';
import { formatEUDate } from '../utils/formatting';

export function ComparePage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const localHref = useLocalHref();
  const comp = page.competitorData;

  if (!comp) return null;

  return (
    <>
      <PageHero
        breadcrumbs={page.breadcrumbs}
        title={page.h1}
        summary={comp.twoSentenceSummary}
        meta={
          <>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-subtle">
              <AuthorMetaLine authorId={page.authorId} lastUpdated={comp.lastReviewed} />
              <span aria-hidden="true">·</span>
              <span>Last reviewed: {formatEUDate(comp.lastReviewed, locale)}</span>
            </div>
            <p className="mt-3 max-w-3xl text-xs leading-relaxed text-subtle">
              {COMPETITOR_DISCLAIMER} {comp.overlapNote}
            </p>
          </>
        }
      />
    <div className="container-x py-14 md:py-20 space-y-16">
      {/* Feature-by-Feature HTML Comparison Table */}
      <section aria-labelledby="comparison-table-heading">
        <h2
          id="comparison-table-heading"
          className="text-2xl font-semibold tracking-tight text-ink mb-4"
        >
          How do MYFUNDBOX and {comp.competitorName} compare feature by feature?
        </h2>
        <div className="overflow-x-auto card">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-line bg-soft">
                <th className="py-3.5 px-4 font-semibold text-muted">Capability</th>
                <th className="py-3.5 px-4 font-semibold text-accent">MYFUNDBOX</th>
                <th className="py-3.5 px-4 font-semibold text-muted">{comp.competitorName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {comp.featureComparison.map((row) => (
                <tr key={row.capability}>
                  <td className="py-3.5 px-4 font-medium text-ink">{row.capability}</td>
                  <td className="py-3.5 px-4 text-ink">{row.myfundbox}</td>
                  <td className="py-3.5 px-4 text-muted">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Best For Guidance */}
      <section aria-labelledby="best-for-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 md:p-8">
          <h2 id="best-for-heading" className="text-xl font-semibold text-ink">
            When MYFUNDBOX is the stronger fit
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {comp.bestForMyfundbox.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-ink">
            When {comp.competitorName} may fit better
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {comp.bestForCompetitor.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-subtle mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Migration Steps + Pricing Comparison */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-ink">
            How do teams transition or connect alongside {comp.competitorName}?
          </h2>
          <ol className="mt-5 space-y-4">
            {comp.migrationSteps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3 text-sm text-muted">
                <span className="font-mono text-xs font-semibold text-accent mt-0.5 shrink-0">
                  0{idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5 card p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Pricing model comparison
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-accent">MYFUNDBOX</dt>
                <dd className="mt-1 text-muted">{comp.pricingComparison.myfundboxModel}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">{comp.competitorName}</dt>
                <dd className="mt-1 text-muted">{comp.pricingComparison.competitorModel}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-subtle">
              {comp.pricingComparison.summaryNote}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-line flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate(localHref(`/contact`))}
              className="btn-primary px-4 py-2 text-xs font-semibold cursor-pointer"
            >
              <span>Book a demo</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <AppLink
              href={
                page.isAltPage
                  ? localHref(`/compare/${comp.slug}`)
                  : localHref(`/alternatives/${comp.altSlug}`)
              }
              className="inline-flex items-center text-xs font-medium text-accent hover:underline"
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
      <section className="border-t border-line pt-10">
        <h2 className="text-lg font-semibold text-ink mb-4">
          All revenue management comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {COMPETITORS.map((other) => (
            <div
              key={other.slug}
              className="card card-interactive p-4 space-y-1"
            >
              <AppLink
                href={localHref(`/compare/${other.slug}`)}
                className="block font-medium text-ink hover:text-accent"
              >
                MYFUNDBOX vs {other.competitorName.split(' (')[0]}
              </AppLink>
              <AppLink
                href={localHref(`/alternatives/${other.altSlug}`)}
                className="block text-xs text-subtle hover:underline"
              >
                {other.competitorName.split(' (')[0]} alternatives →
              </AppLink>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
