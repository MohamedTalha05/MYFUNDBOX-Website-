import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_PAGES, resolvePageByPath } from '../data/pagesRegistry';
import {
  buildJsonLdGraph,
  generateLlmsTxt,
  generateRobotsTxt,
  generateSitemapXml,
} from './seoGenerators';

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

test('root path / resolves cleanly to /en home page', () => {
  const home = resolvePageByPath('/');
  assert.ok(home);
  assert.equal(home.path, '/en');
});

test('robots.txt allows requested AI search & LLM bots and references sitemap', () => {
  const robots = generateRobotsTxt('https://myfundbox.eu');
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
  assert.ok(robots.includes('Sitemap: https://myfundbox.eu/sitemap.xml'));
});

test('sitemap.xml and llms.txt include key pages and hreflang links', () => {
  const xml = generateSitemapXml('https://myfundbox.eu');
  assert.ok(xml.includes('<loc>https://myfundbox.eu/en/pricing</loc>'));
  assert.ok(xml.includes('hreflang="de"'));

  const llms = generateLlmsTxt('https://myfundbox.eu');
  assert.ok(llms.includes('NOT a payment processor'));
  assert.ok(llms.includes('/en/product/revenue-recognition'));

  const home = resolvePageByPath('/en');
  assert.ok(home);
  const jsonLd = buildJsonLdGraph(home, 'https://myfundbox.eu');
  assert.ok(Array.isArray(jsonLd['@graph']));
});
