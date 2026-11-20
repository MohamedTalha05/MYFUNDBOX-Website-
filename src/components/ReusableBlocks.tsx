import React, { useState } from 'react';
import { ChevronRight, Plus, ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import type { AtAGlanceBox, FAQItem } from '../data/pagesRegistry';
import { SITE_CONFIG } from '../data/siteConfig';
import { formatEUDate } from '../utils/formatting';

export function AppLink({
  href,
  children,
  className = '',
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigate } = useRouter();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          href.startsWith('http') ||
          href.startsWith('mailto:') ||
          href.endsWith('.xml') ||
          href.endsWith('.txt') ||
          href.endsWith('.md')
        ) {
          return;
        }
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function BreadcrumbNav({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-subtle">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href + idx} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />}
              {isLast ? (
                <span className="font-medium text-ink" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <AppLink
                  href={item.href}
                  className="hover:text-accent transition-colors"
                >
                  {item.label}
                </AppLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function AuthorMetaLine({
  authorId,
  lastUpdated,
}: {
  authorId: string;
  lastUpdated: string;
}) {
  const { locale } = useRouter();
  const author = SITE_CONFIG.authors.find((a) => a.id === authorId) ?? SITE_CONFIG.authors[0];
  const labels = {
    en: { reviewed: 'Reviewed by', updated: 'Last updated' },
    de: { reviewed: 'Geprüft von', updated: 'Aktualisiert am' },
  }[locale];

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-subtle">
      <span>{labels.reviewed} {author.name}</span>
      <span aria-hidden="true">·</span>
      <span>{author.role}</span>
      <span aria-hidden="true">·</span>
      <span>{labels.updated} {formatEUDate(lastUpdated, locale)}</span>
    </div>
  );
}

export function AeoDirectAnswer({ text }: { text: string }) {
  return <p className="lead mt-5 max-w-3xl">{text}</p>;
}

/**
 * Dark hero band that opens every inner page. It slides under the transparent sticky
 * navbar (-mt-16) so the page starts with the brand's midnight gradient.
 */
export function PageHero({
  breadcrumbs,
  title,
  summary,
  meta,
  actions,
  children,
}: {
  breadcrumbs?: { label: string; href: string }[];
  title: string;
  summary?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="dark relative -mt-16 overflow-hidden bg-midnight-strong pt-16 text-ink">
      <div className="pointer-events-none absolute inset-0 grid-pattern" aria-hidden="true" />
      <div className="orb orb-violet animate-drift -left-24 top-0 h-72 w-72 opacity-50" aria-hidden="true" />
      <div className="orb orb-cyan animate-drift-slow right-0 bottom-0 h-64 w-64 opacity-40" aria-hidden="true" />
      <div className="container-x relative pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="max-w-4xl">
          {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbNav items={breadcrumbs} />}
          <h1 className="display-lg animate-rise text-ink">{title}</h1>
          {summary && (
            <p className="lead animate-rise delay-1 mt-5 max-w-3xl">{summary}</p>
          )}
          {meta && <div className="animate-rise delay-2 mt-5">{meta}</div>}
          {actions && <div className="animate-rise delay-3 mt-7 flex flex-wrap items-center gap-3 font-ui">{actions}</div>}
          {children}
        </div>
      </div>
      <div className="hairline-top absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}

export function AtAGlanceCard({ data, heading = 'MYFUNDBOX at a glance' }: { data: AtAGlanceBox; heading?: string }) {
  const items: { label: string; value: React.ReactNode }[] = [
    { label: 'What it is', value: data.whatItIs },
    { label: 'Who it is for', value: data.whoItIsFor },
    { label: 'Region & compliance', value: data.regionAndCompliance },
    {
      label: 'Core capabilities',
      value: (
        <ul className="space-y-1.5">
          {data.keyCapabilities.map((cap) => (
            <li key={cap} className="flex gap-2">
              <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[image:var(--grad-button)]" aria-hidden="true" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { label: 'Pricing model', value: data.pricingModel },
    { label: 'Integrations', value: data.integrations },
  ];

  return (
    <section aria-labelledby="at-a-glance-heading" className="card card-glow p-6 md:p-9">
      <h2 id="at-a-glance-heading" className="font-display text-lg font-semibold tracking-tight text-ink mb-6">
        {heading}
      </h2>
      <dl className="grid grid-cols-1 gap-x-10 gap-y-7 text-sm md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.label} className="border-t border-line pt-4">
            <dt className="mb-1.5 font-ui text-xs font-semibold uppercase tracking-[0.08em] text-subtle">{it.label}</dt>
            <dd className="leading-relaxed text-ink">{it.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * FAQ accordion. Answers always stay in the HTML (crawlable); collapsed panels are only
 * visually closed and made inert. FAQPage JSON-LD is off (see FAQ_RICH_RESULTS_ELIGIBLE).
 */
export function FAQSection({
  heading = 'Frequently asked questions',
  intro = 'Short, direct answers to the questions we hear most often.',
  faqs,
  bare = false,
}: {
  heading?: string;
  intro?: string;
  faqs: FAQItem[];
  /** Skip the outer top border/padding (when the parent section already provides spacing). */
  bare?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-section-heading"
      className={`grid grid-cols-1 gap-10 lg:grid-cols-12 ${bare ? '' : 'border-t border-line py-14'}`}
    >
      <div className="lg:col-span-4">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-section-heading" className="display-md mt-3 text-ink">
          {heading}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">{intro}</p>
      </div>
      <div className="lg:col-span-8 divide-y divide-line border-y border-line">
        {faqs.map((faq, idx) => {
          const isOpen = open === idx;
          const panelId = `faq-panel-${idx}`;
          const buttonId = `faq-button-${idx}`;
          return (
            <div key={faq.question}>
              <h3 className="font-sans text-base font-semibold tracking-normal">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="group flex w-full items-start justify-between gap-6 py-5 text-left text-ink cursor-pointer"
                >
                  <span className="leading-snug transition-colors group-hover:text-accent">{faq.question}</span>
                  <span
                    className={`relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? 'rotate-45 border-transparent bg-[image:var(--grad-button)] text-white' : 'border-line-strong text-muted'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 pr-10 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SafeEditorialImage({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border border-line bg-soft p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ShieldCheck className="h-8 w-8 text-accent mb-3" aria-hidden="true" />
        <p className="text-sm font-medium text-muted max-w-sm">{alt}</p>
      </div>
    );
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-soft">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className={`w-full object-cover ${className}`}
      />
      {caption && (
        <figcaption className="px-4 py-2.5 text-xs text-subtle border-t border-line bg-surface">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
