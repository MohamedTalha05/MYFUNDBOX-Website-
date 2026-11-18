import React, { useState } from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
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
      <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href + idx} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />}
              {isLast ? (
                <span className="font-medium text-slate-900 dark:text-slate-100" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <AppLink
                  href={item.href}
                  className="hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
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
    fr: { reviewed: 'Relu par', updated: 'Mis à jour le' },
    es: { reviewed: 'Revisado por', updated: 'Actualizado el' },
  }[locale];

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
      <span>{labels.reviewed} {author.name}</span>
      <span aria-hidden="true">·</span>
      <span>{author.role}</span>
      <span aria-hidden="true">·</span>
      <span>{labels.updated} {formatEUDate(lastUpdated, locale)}</span>
    </div>
  );
}

export function AeoDirectAnswer({ text }: { text: string }) {
  return (
    <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
      {text}
    </p>
  );
}

export function AtAGlanceCard({ data }: { data: AtAGlanceBox }) {
  return (
    <section
      aria-labelledby="at-a-glance-heading"
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8"
    >
      <h2
        id="at-a-glance-heading"
        className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-5"
      >
        MYFUNDBOX at a glance
      </h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
        <div>
          <dt className="font-medium text-slate-500 dark:text-slate-400 mb-1">What it is</dt>
          <dd className="text-slate-900 dark:text-slate-100 leading-relaxed">{data.whatItIs}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500 dark:text-slate-400 mb-1">Who it is for</dt>
          <dd className="text-slate-900 dark:text-slate-100 leading-relaxed">{data.whoItIsFor}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500 dark:text-slate-400 mb-1">Region & compliance</dt>
          <dd className="text-slate-900 dark:text-slate-100 leading-relaxed">{data.regionAndCompliance}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500 dark:text-slate-400 mb-1">Core capabilities</dt>
          <dd className="text-slate-900 dark:text-slate-100">
            <ul className="space-y-1">
              {data.keyCapabilities.map((cap) => (
                <li key={cap}>· {cap}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500 dark:text-slate-400 mb-1">Pricing model</dt>
          <dd className="text-slate-900 dark:text-slate-100 leading-relaxed">{data.pricingModel}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500 dark:text-slate-400 mb-1">Integrations</dt>
          <dd className="text-slate-900 dark:text-slate-100 leading-relaxed">{data.integrations}</dd>
        </div>
      </dl>
    </section>
  );
}

export function FAQSection({
  heading = 'Frequently asked questions',
  faqs,
}: {
  heading?: string;
  faqs: FAQItem[];
}) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-section-heading" className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mb-8">
        <h2
          id="faq-section-heading"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
        >
          {heading}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Direct, self-contained answers rendered cleanly in HTML for finance teams, auditors, and search indexing.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq) => (
          <article
            key={faq.question}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
              {faq.question}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {faq.answer}
            </p>
          </article>
        ))}
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
        className={`flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ShieldCheck className="h-8 w-8 text-rose-700 dark:text-rose-400 mb-3" aria-hidden="true" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-sm">{alt}</p>
      </div>
    );
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className={`w-full object-cover ${className}`}
      />
      {caption && (
        <figcaption className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
