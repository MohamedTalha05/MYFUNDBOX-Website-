import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_PAGES, resolvePageByPath } from '../data/pagesRegistry';
import {
  buildHreflangLinks,
  buildJsonLdGraph,
  generateLlmsTxt,
  generateRobotsTxt,
  generateSitemapXml,
  renderHeadTagsHtml,
} from './seoGenerators';

const BASE = 'https://www.myfundbox.com';

test('every registered page has a unique title, meta description, h1, and canonical path', () => {
  const titles = new Set<string>();
  const paths = new Set<string>();

  for (const page of ALL_PAGES) {
    assert.ok(page.title.length >= 20, `Title too short on ${page.path}`);
    assert.ok(page.description.length >= 60, `Description too short on ${page.path}`);
    assert.ok(page.h1.length >= 10, `H1 missing/too short on ${page.path}`);
    assert.equal(titles.has(page.title), false, `Duplicate title: ${page.title}`);
    assert.equal(paths.has(page.path), false, `Duplicate path: ${page.path}`);
    titles.add(page.title);
    paths.add(page.path);
  }
});

test('English lives at the root; no page path uses a legacy /en, /fr or /es prefix', () => {
  const home = resolvePageByPath('/');
  assert.ok(home);
  assert.equal(home.path, '/');
  assert.equal(home.locale, 'en');
  for (const page of ALL_PAGES) {
    assert.doesNotMatch(page.path, /^\/(en|fr|es)(\/|$)/, `Legacy prefix on ${page.path}`);
    if (page.path.startsWith('/de')) assert.equal(page.locale, 'de', `${page.path} should be German`);
    else assert.equal(page.locale, 'en', `${page.path} should be English`);
  }
});

test('/de URLs only resolve when a German page exists (no English content under German URLs)', () => {
  assert.ok(resolvePageByPath('/de'));
  assert.equal(resolvePageByPath('/de/pricing'), undefined);
  assert.equal(resolvePageByPath('/en/pricing'), undefined);
});

test('robots.txt allows requested AI search & LLM bots and references sitemap', () => {
  const robots = generateRobotsTxt(BASE);
  for (const bot of [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
  ]) {
    assert.ok(robots.includes(`User-agent: ${bot}`), `Missing ${bot} in robots.txt`);
  }
  assert.ok(robots.includes(`Sitemap: ${BASE}/sitemap.xml`));
});

test('sitemap uses root-level English URLs and the home URL has no trailing slash', () => {
  const xml = generateSitemapXml(BASE);
  assert.ok(xml.includes(`<loc>${BASE}</loc>`));
  assert.ok(xml.includes(`<loc>${BASE}/pricing</loc>`));
  assert.ok(xml.includes(`<loc>${BASE}/de</loc>`));
  assert.doesNotMatch(xml, /\/(en|fr|es)\//);
});

test('hreflang alternates only reference language versions that exist', () => {
  const homeLinks = buildHreflangLinks('/', BASE);
  assert.deepEqual(
    homeLinks.map((l) => l.hreflang).sort(),
    ['de', 'en', 'x-default']
  );
  assert.ok(homeLinks.some((l) => l.hreflang === 'de' && l.href === `${BASE}/de`));
  // /pricing has no German version yet, so it must not advertise /de/pricing.
  assert.deepEqual(buildHreflangLinks('/pricing', BASE), []);

  const pricing = resolvePageByPath('/pricing');
  assert.ok(pricing);
  const head = renderHeadTagsHtml(pricing, BASE);
  assert.ok(head.includes(`<link rel="canonical" href="${BASE}/pricing" />`));
  assert.ok(!head.includes('hreflang'));
});

test('llms.txt describes the billing platform, not the retired revenue-recognition positioning', () => {
  const llms = generateLlmsTxt(BASE);
  assert.ok(llms.includes('Subscription billing'));
  assert.ok(llms.includes('Stripe, GoCardless, Mollie, PayPal'));
  assert.ok(!llms.includes('NOT a payment processor'));

  const home = resolvePageByPath('/');
  assert.ok(home);
  const jsonLd = buildJsonLdGraph(home, BASE);
  assert.ok(Array.isArray(jsonLd['@graph']));
});
