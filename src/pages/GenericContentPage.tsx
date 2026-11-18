import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { ALL_PAGES, type PageMetadataEntry } from '../data/pagesRegistry';
import { COMPETITORS } from '../data/competitorsData';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  AeoDirectAnswer,
  AppLink,
  AtAGlanceCard,
  AuthorMetaLine,
  BreadcrumbNav,
  FAQSection,
} from '../components/ReusableBlocks';
import { DemoRequestForm } from '../components/DemoRequestForm';

export function GenericContentPage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const prefix = `/${locale}`;

  const guides = ALL_PAGES.filter((p) => p.category === 'guide' && p.locale === 'en');

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14 space-y-12">
      <header className="max-w-4xl">
        <BreadcrumbNav items={page.breadcrumbs} />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          {page.h1}
        </h1>
        <AeoDirectAnswer text={page.aeoSummary} />
        <div className="mt-4">
          <AuthorMetaLine authorId={page.authorId} lastUpdated={page.lastUpdated} />
        </div>

        {page.category !== 'contact' && page.category !== 'legal' && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`${prefix}/contact`)}
              className="btn-gradient-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              <span>Book a demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <AppLink
              href={`${prefix}/pricing`}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              View EUR pricing
            </AppLink>
          </div>
        )}
      </header>

      {/* At-a-Glance Box (on Product pages) */}
      {page.atAGlance && <AtAGlanceCard data={page.atAGlance} />}

      {/* Contact / Book Demo Layout */}
      {page.category === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <DemoRequestForm />
          </div>
          <aside className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              What happens during your walkthrough?
            </h2>
            <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>01. Review your current billing, CRM, and accounting/ERP tools (no payment gateway replacement needed).</li>
              <li>02. Map sample contracts to IFRS 15 / HGB deferred revenue schedules and EU VAT handling.</li>
              <li>03. Discuss historical opening balance migration, EUR pricing scope, and GDPR DPA documentation.</li>
            </ol>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
              <div>Headquarters: {SITE_CONFIG.headquartersLocation}</div>
              <div>Data Residency: {SITE_CONFIG.euDataResidency}</div>
              <div>Sales &amp; Privacy Email: {SITE_CONFIG.contactEmail}</div>
            </div>
          </aside>
        </div>
      )}

      {/* Resources Hub Index */}
      {page.category === 'resources' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-5">
              Pillar Guides for European Finance Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((g) => (
                <article
                  key={g.path}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{g.h1}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{g.description}</p>
                  </div>
                  <div className="mt-5">
                    <AppLink
                      href={g.path.replace('/en', prefix)}
                      className="text-sm font-medium text-rose-700 dark:text-rose-400 hover:underline"
                    >
                      Read guide →
                    </AppLink>
                  </div>
                </article>
              ))}
              <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    IFRS 15 &amp; SaaS Revenue Glossary
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Authoritative definitions for deferred revenue, accruals, performance obligations, MRR, ARR, NRR, and GoBD.
                  </p>
                </div>
                <div className="mt-5">
                  <AppLink
                    href={`${prefix}/glossary`}
                    className="text-sm font-medium text-rose-700 dark:text-rose-400 hover:underline"
                  >
                    Open glossary →
                  </AppLink>
                </div>
              </article>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-5">
              Competitor &amp; Alternative Comparisons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COMPETITORS.map((c) => (
                <div
                  key={c.slug}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1.5"
                >
                  <AppLink
                    href={`${prefix}/compare/${c.slug}`}
                    className="block text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-rose-700 dark:hover:text-rose-400"
                  >
                    MYFUNDBOX vs {c.competitorName.split(' (')[0]}
                  </AppLink>
                  <AppLink
                    href={`${prefix}/alternatives/${c.altSlug}`}
                    className="block text-xs text-slate-500 dark:text-slate-400 hover:underline"
                  >
                    {c.competitorName.split(' (')[0]} alternatives →
                  </AppLink>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Structured Page Sections */}
      {page.sections.map((sec) => (
        <section key={sec.heading} className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {sec.heading}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {sec.directAnswer}
          </p>

          {sec.bullets && (
            <ul className="max-w-3xl space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-300 pt-1">
              {sec.bullets.map((b) => (
                <li key={b}>· {b}</li>
              ))}
            </ul>
          )}

          {sec.numberedSteps && (
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
              {sec.numberedSteps.map((st, idx) => (
                <li
                  key={st.title}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
                >
                  <div className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-400">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {st.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{st.detail}</p>
                </li>
              ))}
            </ol>
          )}

          {sec.table && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-4">
              <table className="w-full text-left text-sm border-collapse">
                <caption className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  {sec.table.caption}
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    {sec.table.headers.map((h) => (
                      <th key={h} className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {sec.table.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-3 px-4 ${
                            cIdx === 0
                              ? 'font-medium text-slate-900 dark:text-slate-100'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {/* Visible FAQ Section */}
      <FAQSection faqs={page.faqs} />
    </div>
  );
}
