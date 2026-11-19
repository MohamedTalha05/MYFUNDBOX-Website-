import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useLocalHref } from '../utils/navLinks';
import { ALL_PAGES, type PageMetadataEntry } from '../data/pagesRegistry';
import { COMPETITORS } from '../data/competitorsData';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  AppLink,
  AtAGlanceCard,
  AuthorMetaLine,
  FAQSection,
  PageHero,
} from '../components/ReusableBlocks';
import { Reveal } from '../components/motion';
import { DemoRequestForm } from '../components/DemoRequestForm';

export function GenericContentPage({ page }: { page: PageMetadataEntry }) {
  const { locale, navigate } = useRouter();
  const localHref = useLocalHref();

  const guides = ALL_PAGES.filter((p) => p.category === 'guide' && p.locale === 'en');

  return (
    <>
      <PageHero
        breadcrumbs={page.breadcrumbs}
        title={page.h1}
        summary={page.aeoSummary}
        meta={<AuthorMetaLine authorId={page.authorId} lastUpdated={page.lastUpdated} />}
        actions={
          page.category !== 'contact' && page.category !== 'legal' ? (
            <>
              <button
                type="button"
                onClick={() => navigate(localHref(`/contact`))}
                className="btn-primary px-5 py-3 text-sm"
              >
                <span>Book a demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <AppLink href={localHref(`/pricing`)} className="btn-ghost px-5 py-3 text-sm">
                View EUR pricing
              </AppLink>
            </>
          ) : undefined
        }
      />
    <div className="container-x py-14 md:py-20 space-y-16">
      {/* At-a-Glance Box (on Product pages) */}
      {page.atAGlance && <AtAGlanceCard data={page.atAGlance} />}

      {/* Contact / Book Demo Layout */}
      {page.category === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <DemoRequestForm />
          </div>
          <aside className="lg:col-span-5 card card-glow p-6 md:p-8 space-y-5">
            <h2 className="text-lg font-semibold text-ink">
              What happens during your walkthrough?
            </h2>
            <ol className="space-y-3 text-sm text-muted">
              <li>01. Review your current billing, CRM, and accounting/ERP tools (no payment gateway replacement needed).</li>
              <li>02. Map sample contracts to IFRS 15 / HGB deferred revenue schedules and EU VAT handling.</li>
              <li>03. Discuss historical opening balance migration, EUR pricing scope, and GDPR DPA documentation.</li>
            </ol>
            <div className="border-t border-line pt-4 text-xs text-subtle space-y-1.5">
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
            <h2 className="text-2xl font-semibold text-ink mb-5">
              Pillar Guides for European Finance Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((g) => (
                <article
                  key={g.path}
                  className="card card-interactive p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-semibold text-ink">{g.h1}</h3>
                    <p className="mt-2 text-sm text-muted line-clamp-3">{g.description}</p>
                  </div>
                  <div className="mt-5">
                    <AppLink
                      href={localHref(g.path)}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      Read guide →
                    </AppLink>
                  </div>
                </article>
              ))}
              <article className="card card-interactive p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    IFRS 15 &amp; SaaS Revenue Glossary
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Authoritative definitions for deferred revenue, accruals, performance obligations, MRR, ARR, NRR, and GoBD.
                  </p>
                </div>
                <div className="mt-5">
                  <AppLink
                    href={localHref(`/glossary`)}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Open glossary →
                  </AppLink>
                </div>
              </article>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-ink mb-5">
              Competitor &amp; Alternative Comparisons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COMPETITORS.map((c) => (
                <div
                  key={c.slug}
                  className="card card-interactive p-4 space-y-1.5"
                >
                  <AppLink
                    href={localHref(`/compare/${c.slug}`)}
                    className="block text-sm font-semibold text-ink hover:text-accent"
                  >
                    MYFUNDBOX vs {c.competitorName.split(' (')[0]}
                  </AppLink>
                  <AppLink
                    href={localHref(`/alternatives/${c.altSlug}`)}
                    className="block text-xs text-subtle hover:underline"
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
        <Reveal as="section" key={sec.heading} className="space-y-4">
          <h2 className="display-md text-ink">
            {sec.heading}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            {sec.directAnswer}
          </p>

          {sec.bullets && (
            <ul className="max-w-3xl space-y-2.5 text-sm md:text-base text-muted pt-1">
              {sec.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[image:var(--grad-button)]" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {sec.numberedSteps && (
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
              {sec.numberedSteps.map((st, idx) => (
                <li
                  key={st.title}
                  className="card card-interactive p-6"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft font-ui text-xs font-semibold text-accent">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold text-ink">
                    {st.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{st.detail}</p>
                </li>
              ))}
            </ol>
          )}

          {sec.table && (
            <div className="card overflow-x-auto mt-4">
              <table className="w-full text-left text-sm border-collapse">
                <caption className="px-4 py-3 text-left text-xs font-medium text-subtle border-b border-line">
                  {sec.table.caption}
                </caption>
                <thead>
                  <tr className="border-b border-line bg-soft">
                    {sec.table.headers.map((h) => (
                      <th key={h} className="py-3 px-4 font-semibold text-ink">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {sec.table.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-3 px-4 ${
                            cIdx === 0
                              ? 'font-medium text-ink'
                              : 'text-muted'
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
        </Reveal>
      ))}

      {/* Visible FAQ Section */}
      <FAQSection faqs={page.faqs} />
    </div>
    </>
  );
}
