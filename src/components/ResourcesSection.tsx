import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { RESOURCES_COPY } from '../data/homeContent';
import { articleDate, latestArticles, type BlogArticle } from '../data/blogArticles';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * Resources & insights: the three latest articles from the live MYFUNDBOX blog
 * (synced by `npm run sync:blog`), in an editorial layout: one featured story plus two compact ones.
 * Every card is server-rendered with one plain <a href> to the real post URL, using the article
 * title as anchor text, so links are crawlable without JavaScript.
 */

type Copy = (typeof RESOURCES_COPY)['en'];

function formatDate(iso: string, locale: string) {
  // Parse as a calendar date (no timezone shift).
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

function Meta({ a, copy, locale }: { a: BlogArticle; copy: Copy; locale: string }) {
  const date = articleDate(a);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-ui text-[12px]">
      <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.1em] text-[#5f43e9] dark:text-[#b29dff]">
        <span className="h-1.5 w-1.5 rounded-full bg-[image:var(--grad-button)]" aria-hidden="true" />
        {a.category ?? copy.fallbackCategory}
      </span>
      {date && (
        <>
          <span className="h-3 w-px bg-[#d9dbe6] dark:bg-line" aria-hidden="true" />
          <span className="text-[#6b6f86] dark:text-subtle">
            {date.kind === 'published' ? copy.published : copy.updated}{' '}
            <time dateTime={date.iso}>{formatDate(date.iso, locale)}</time>
          </span>
        </>
      )}
    </div>
  );
}

function ArticleImage({ a, className }: { a: BlogArticle; className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] bg-[#eceef6] dark:bg-white/[0.04] ${className}`}>
      {a.image ? (
        <img
          src={a.image}
          alt=""
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover/res:scale-[1.045]"
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(80%_70%_at_20%_0%,rgba(118,87,246,0.35),transparent_70%),linear-gradient(160deg,#15143d,#101329)]" />
      )}
      <span className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-black/5" aria-hidden="true" />
    </div>
  );
}

const CARD =
  'group/res relative flex h-full overflow-hidden rounded-3xl border border-[#e7e8f0] bg-white p-2 shadow-[0_1px_2px_rgba(16,19,41,0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(36,33,90,0.45)] focus-within:ring-2 focus-within:ring-[#9a68ff]/50 dark:border-line dark:bg-surface';

/** One crawlable link per article: the title, stretched over the whole card. */
function TitleLink({ a, className }: { a: BlogArticle; className: string }) {
  return (
    <a href={a.url} className={`outline-none after:absolute after:inset-0 after:content-[''] ${className}`}>
      {a.title}
    </a>
  );
}

function ReadMore({ label }: { label: string }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-ui text-[14px] font-semibold text-[#5f43e9] dark:text-[#b29dff]" aria-hidden="true">
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/res:-translate-y-0.5 group-hover/res:translate-x-0.5" />
    </span>
  );
}

function FeaturedCard({ a, copy, locale }: { a: BlogArticle; copy: Copy; locale: string }) {
  return (
    <article className={`${CARD} flex-col`}>
      <ArticleImage a={a} className="aspect-[16/9]" />
      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-ui text-[11.5px] font-semibold text-[#242638] shadow-sm backdrop-blur">
        {copy.latest}
      </span>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 md:px-7 md:pb-7">
        <Meta a={a} copy={copy} locale={locale} />
        <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-[1.18] tracking-[-0.03em] text-[#242638] [text-wrap:balance] md:text-[1.95rem] dark:text-ink">
          <TitleLink a={a} className="transition-colors duration-300 group-hover/res:text-[#5f43e9] dark:group-hover/res:text-[#d4c8ff]" />
        </h3>
        <p className="mt-3 line-clamp-3 max-w-2xl text-[15.5px] leading-relaxed text-[#5a5e75] dark:text-muted">{a.description}</p>
        <ReadMore label={copy.readArticle} />
      </div>
    </article>
  );
}

function CompactCard({ a, copy, locale }: { a: BlogArticle; copy: Copy; locale: string }) {
  return (
    <article className={`${CARD} flex-col sm:flex-row`}>
      <ArticleImage a={a} className="aspect-[16/9] sm:aspect-auto sm:w-[42%] sm:shrink-0" />
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:py-4 sm:pl-6 sm:pr-4">
        <Meta a={a} copy={copy} locale={locale} />
        <h3 className="mt-2.5 font-display text-[1.125rem] font-semibold leading-[1.28] tracking-[-0.02em] text-[#242638] [text-wrap:balance] dark:text-ink">
          <TitleLink a={a} className="transition-colors duration-300 group-hover/res:text-[#5f43e9] dark:group-hover/res:text-[#d4c8ff]" />
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[#5a5e75] dark:text-muted">{a.description}</p>
        <ReadMore label={copy.readArticle} />
      </div>
    </article>
  );
}

export function ResourcesSection() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = RESOURCES_COPY[locale] ?? RESOURCES_COPY.en;
  const articles = latestArticles(locale, 3);
  // Same destination as the Resources item in the main navigation.
  const resourcesHref = resolveNavHref({ href: '/resources' });

  if (articles.length === 0) return null;
  const [featured, ...rest] = articles;

  return (
    <section aria-labelledby="resources-heading" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#f8f9fc] dark:bg-canvas" />
        <div className="absolute -left-40 -top-20 h-[26rem] w-[26rem] rounded-full bg-[#7657f6]/[0.06] blur-3xl" />
        <div className="grid-pattern-light absolute inset-0 opacity-40" />
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="resources-heading"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] [text-wrap:balance] md:text-[2.75rem] dark:text-ink"
            >
              {copy.heading}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
          </Reveal>
          {resourcesHref && (
            <Reveal index={1} className="shrink-0">
              <AppLink href={localHref(resourcesHref)} className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 font-ui text-[14.5px]">
                {copy.viewAll}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </Reveal>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-7">
            <FeaturedCard a={featured} copy={copy} locale={locale} />
          </Reveal>
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2">
              {rest.map((a, i) => (
                <Reveal key={a.url} index={i + 1} className="h-full">
                  <CompactCard a={a} copy={copy} locale={locale} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
