/**
 * Static export for GitHub Pages (or any static host).
 *
 * Run after `vite build`. Does at build time what server.ts does per request:
 *  - renders every page in the registry to HTML with its SEO head tags,
 *  - writes robots.txt, sitemap.xml, llms.txt, llms-full.txt and per-page .md files,
 *  - writes 404.html,
 *  - writes small redirect pages for legacy / moved URLs and the app hand-off paths
 *    (static hosts can't send real 301/302s, so these use meta refresh + JS),
 *  - writes CNAME for the custom domain.
 *
 * Env:
 *   APP_URL     canonical site URL (default https://web.myfundbox.com)
 *   PAGES_CNAME custom domain for GitHub Pages (default: host of APP_URL; set to "" to skip)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { ALL_PAGES, pageExists, type PageMetadataEntry } from '../src/data/pagesRegistry';
import { APP_HANDOFF_PATHS, LIVE_SITE_REDIRECTS, resolveRedirect } from '../src/data/redirects';
import { APP_LINKS } from '../src/data/siteConfig';
import {
  generateLlmsFullTxt,
  generateLlmsTxt,
  generatePageMarkdown,
  generateRobotsTxt,
  generateSitemapXml,
  getCanonicalBaseUrl,
  renderHeadTagsHtml,
} from '../src/utils/seoGenerators';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const BASE_URL = getCanonicalBaseUrl(process.env.APP_URL || 'https://web.myfundbox.com');
const CNAME = process.env.PAGES_CNAME ?? new URL(BASE_URL).host;

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function write(relPath: string, content: string) {
  const file = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf-8');
}

/** All URL paths that are a prefix "directory" of some other written path (e.g. /de for /de/pricing). */
const allPaths = new Set<string>();

/**
 * Writes HTML for a URL path. '/x' → x.html (GitHub Pages serves it at /x without a slash).
 * If /x is also a directory (because /x/y exists), x/index.html is written too, so /x/ works.
 */
function writeHtmlForPath(urlPath: string, html: string) {
  if (urlPath === '/') {
    write('index.html', html);
    return;
  }
  const rel = urlPath.replace(/^\//, '');
  write(`${rel}.html`, html);
  const isDir = [...allPaths].some((p) => p.startsWith(urlPath + '/'));
  if (isDir) write(`${rel}/index.html`, html);
}

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
if (!template.includes('<!--SSR_HTML-->')) {
  throw new Error('dist/index.html has no <!--SSR_HTML--> marker. Run `vite build` first.');
}

function renderPage(page: PageMetadataEntry | undefined, urlPath: string): string {
  const appHtml = renderToString(React.createElement(App, { initialPath: page ? page.path : urlPath }));
  let html = template.replace('<!--SSR_HTML-->', appHtml);
  if (!page) {
    return html
      .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | MYFUNDBOX</title>')
      .replace('<!--SSR_HEAD-->', '<meta name="robots" content="noindex" />' + NOT_FOUND_REDIRECT_SCRIPT);
  }
  return html
    .replace('<html lang="en">', `<html lang="${escapeHtml(page.locale)}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace('<!--SSR_HEAD-->', renderHeadTagsHtml(page, BASE_URL));
}

/**
 * On the 404 page: strip a trailing slash or a legacy /en|/fr|/es prefix and retry,
 * covering URLs that have no pre-generated redirect page.
 */
const NOT_FOUND_REDIRECT_SCRIPT = `<script>(function(){var l=window.location,p=l.pathname,t=p.replace(/\\/+$/,'')||'/';t=t.replace(/^\\/(en|fr|es)(?=\\/|$)/,'')||'/';if(t!==p){l.replace(t+l.search+l.hash);}})();</script>`;

/** Redirect page. The visitor's query string (UTM tags etc.) is carried over to the target. */
function redirectHtml(target: string, absoluteTarget: string): string {
  const t = escapeHtml(target);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Redirecting…</title>
<meta name="robots" content="noindex" />
<link rel="canonical" href="${escapeHtml(absoluteTarget)}" />
<meta http-equiv="refresh" content="0; url=${t}" />
<script>(function(){var u=${JSON.stringify(target)},q=window.location.search.replace(/^\\?/,'');if(q){u+=(u.indexOf('?')>=0?'&':'?')+q;}window.location.replace(u+window.location.hash);})();</script>
</head>
<body><p>Redirecting to <a href="${t}">${t}</a>…</p></body>
</html>
`;
}

const abs = (p: string) => (p.startsWith('http') ? p : p === '/' ? BASE_URL : BASE_URL + p);

// ---- collect paths -------------------------------------------------------
for (const page of ALL_PAGES) allPaths.add(page.path);

const redirects = new Map<string, string>();
const addRedirect = (from: string, to: string | null) => {
  if (!to || from === to || pageExists(from) || redirects.has(from)) return;
  redirects.set(from, to);
  allPaths.add(from);
};

for (const [from] of Object.entries(LIVE_SITE_REDIRECTS)) {
  addRedirect(from, resolveRedirect(from, pageExists));
  addRedirect(`/de${from}`, resolveRedirect(`/de${from}`, pageExists));
}
for (const page of ALL_PAGES) {
  if (page.locale !== 'en') continue;
  for (const prefix of ['/en', '/fr', '/es']) {
    const from = page.path === '/' ? prefix : prefix + page.path;
    addRedirect(from, resolveRedirect(from, pageExists));
  }
}
for (const [from, key] of Object.entries(APP_HANDOFF_PATHS)) {
  addRedirect(from, APP_LINKS[key]);
}

// ---- write ---------------------------------------------------------------
for (const page of ALL_PAGES) {
  writeHtmlForPath(page.path, renderPage(page, page.path));
  if (page.path !== '/') write(`${page.path.slice(1)}.md`, generatePageMarkdown(page, BASE_URL));
}
for (const [from, to] of redirects) {
  writeHtmlForPath(from, redirectHtml(to, abs(to)));
}

write('404.html', renderPage(undefined, '/404'));
write('robots.txt', generateRobotsTxt(BASE_URL));
write('sitemap.xml', generateSitemapXml(BASE_URL));
write('llms.txt', generateLlmsTxt(BASE_URL));
write('llms-full.txt', generateLlmsFullTxt(BASE_URL));
write('.nojekyll', '');
if (CNAME) write('CNAME', CNAME + '\n');

console.log(
  `Prerendered ${ALL_PAGES.length} pages and ${redirects.size} redirects for ${BASE_URL}` +
    (CNAME ? ` (CNAME ${CNAME})` : '')
);
