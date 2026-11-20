import type { LocaleCode } from '../utils/formatting';
import { BLOG_ARTICLES } from './blogArticles.generated';

/**
 * Articles from the live MYFUNDBOX blog (myfundbox.com/blog-myfundbox), synced by
 * `npm run sync:blog` into blogArticles.generated.ts. URLs, titles, descriptions, images and
 * categories are taken verbatim from each post. Never add hand-written or placeholder articles.
 */
export interface BlogArticle {
  locale: LocaleCode;
  /** Absolute canonical URL of the post on myfundbox.com. */
  url: string;
  title: string;
  description: string;
  image: string | null;
  category: string | null;
  /** Real publication date (YYYY-MM-DD) if the post exposes one; null otherwise. */
  publishedAt: string | null;
  /** Last-modified date (YYYY-MM-DD) from the live sitemap. */
  updatedAt: string | null;
}

/** The date a card shows, and whether it is a publication or a last-updated date. */
export function articleDate(a: BlogArticle): { iso: string; kind: 'published' | 'updated' } | null {
  if (a.publishedAt) return { iso: a.publishedAt, kind: 'published' };
  if (a.updatedAt) return { iso: a.updatedAt, kind: 'updated' };
  return null;
}

/** Newest first (publication date, else last-modified), for the given locale; falls back to English. */
export function latestArticles(locale: LocaleCode, count = 3, source: BlogArticle[] = BLOG_ARTICLES): BlogArticle[] {
  const pick = (l: LocaleCode) =>
    source
      .filter((a) => a.locale === l)
      .sort((a, b) => (articleDate(b)?.iso ?? '').localeCompare(articleDate(a)?.iso ?? ''))
      .slice(0, count);
  const own = pick(locale);
  return own.length >= count || locale === 'en' ? own : pick('en');
}

/** Live blog index, per locale. */
export const BLOG_INDEX_URL: Record<LocaleCode, string> = {
  en: 'https://myfundbox.com/blog-myfundbox',
  de: 'https://myfundbox.com/de/blog-myfundbox',
};
