/**
 * Syncs the latest articles from the live MYFUNDBOX blog (myfundbox.com, Webflow CMS) into
 * src/data/blogArticles.generated.ts, which the homepage "Resources & insights" section reads.
 *
 *   npm run sync:blog
 *
 * Source of truth: the live sitemap (post URLs + <lastmod>) and each post's own HTML
 * (H1 title, meta description, og:image, category label). Nothing is invented:
 * - `publishedAt` is only set if the post page exposes a real publication date
 *   (article:published_time, JSON-LD datePublished or a visible date element). The live blog
 *   currently shows none, so it stays null.
 * - `updatedAt` is the sitemap <lastmod> (last modified, not first published).
 * If the fetch fails or returns no articles, the existing generated file is left untouched.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://www.myfundbox.com';
const MAX_PER_LOCALE = 6;
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/data/blogArticles.generated.ts');

type Locale = 'en' | 'de';
interface Article {
  locale: Locale;
  url: string;
  title: string;
  description: string;
  image: string | null;
  category: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
}

function decode(s: string): string {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function meta(html: string, key: string): string | null {
  const a = html.match(new RegExp(`<meta[^>]+(?:property|name)="${key}"[^>]+content="([^"]*)"`, 'i'));
  const b = html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${key}"`, 'i'));
  const v = (a ?? b)?.[1];
  return v ? decode(v) : null;
}

function collapseRepeat(s: string): string {
  const words = s.split(' ');
  if (words.length % 2 === 0) {
    const half = words.length / 2;
    if (words.slice(0, half).join(' ') === words.slice(half).join(' ')) return words.slice(0, half).join(' ');
  }
  return s;
}

function isoDate(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const t = Date.parse(raw);
  return Number.isNaN(t) ? null : new Date(t).toISOString().slice(0, 10);
}

function findPublishedAt(html: string): string | null {
  const fromMeta = isoDate(meta(html, 'article:published_time'));
  if (fromMeta) return fromMeta;
  const ld = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  if (ld) return isoDate(ld[1]);
  // Webflow date fields render as text in an element whose class mentions "date" or "publish".
  const el = html.match(/class="[^"]*(?:publish|post-date|blog-date)[^"]*"[^>]*>([^<]{6,40})</i);
  return el ? isoDate(decode(el[1])) : null;
}

async function get(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'MYFUNDBOX-site-blog-sync/1.0' },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function readPost(locale: Locale, canonical: string, lastmod: string | null): Promise<Article | null> {
  try {
    const html = await get(canonical.replace(/^https:\/\/myfundbox\.com/, SITE));
    // Prefer og:title (minus the " | MYFUNDBOX …" suffix), then the H1. Some live posts repeat
    // the title twice in a row in their CMS field ("X X"); collapse that to "X".
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const rawTitle = meta(html, 'og:title')?.split(/\s+\|\s+MYFUNDBOX/)[0]?.trim() || (h1 ? decode(h1[1]) : null);
    const title = rawTitle ? collapseRepeat(rawTitle) : null;
    const description = meta(html, 'description') ?? meta(html, 'og:description');
    if (!title || !description) return null;
    const cat = html.match(/class="blog-category-normal-text[^"]*"[^>]*>([^<]+)</i);
    return {
      locale,
      url: canonical,
      title,
      description,
      image: meta(html, 'og:image'),
      category: cat ? decode(cat[1]) : null,
      publishedAt: findPublishedAt(html),
      updatedAt: isoDate(lastmod),
    };
  } catch (err) {
    console.warn(`  ! skipped ${canonical}: ${(err as Error).message}`);
    return null;
  }
}

async function main() {
  console.log(`Reading ${SITE}/sitemap.xml …`);
  const sitemap = await get(`${SITE}/sitemap.xml`);
  const entries = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)]
    .map((m) => ({ loc: m[1].trim(), lastmod: m[2]?.trim() ?? null }))
    .filter((e) => /\/post\/[^/]+$/.test(e.loc));

  const byLocale: Record<Locale, typeof entries> = {
    en: entries.filter((e) => !/\/de\/post\//.test(e.loc)),
    de: entries.filter((e) => /\/de\/post\//.test(e.loc)),
  };

  const articles: Article[] = [];
  for (const locale of ['en', 'de'] as Locale[]) {
    const newest = byLocale[locale].sort((a, b) => (b.lastmod ?? '').localeCompare(a.lastmod ?? '')).slice(0, MAX_PER_LOCALE);
    console.log(`${locale}: ${byLocale[locale].length} posts in sitemap, reading ${newest.length}`);
    const read = await Promise.all(newest.map((e) => readPost(locale, e.loc, e.lastmod)));
    articles.push(...read.filter((a): a is Article => a !== null));
  }

  if (!articles.some((a) => a.locale === 'en')) {
    console.error('No English articles could be read; leaving the existing file untouched.');
    process.exit(1);
  }

  const file = `/* eslint-disable */
// GENERATED by scripts/sync-blog.ts from the live MYFUNDBOX blog. Do not edit by hand:
// run \`npm run sync:blog\` to refresh. See the script for how each field is sourced.
import type { BlogArticle } from './blogArticles';

export const BLOG_SYNCED_AT = ${JSON.stringify(new Date().toISOString())};

export const BLOG_ARTICLES: BlogArticle[] = ${JSON.stringify(articles, null, 2)};
`;
  fs.writeFileSync(OUT, file, 'utf8');
  console.log(`Wrote ${articles.length} articles to ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
