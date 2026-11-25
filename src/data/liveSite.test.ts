import test from 'node:test';
import assert from 'node:assert/strict';
import { CONFIRMED_INTEGRATIONS, LIVE_INTEGRATION_PATHS, LIVE_INTEGRATION_SLUGS, LIVE_SITE_ORIGIN } from './liveSite';
import { pageExists } from './pagesRegistry';
import { resolveRedirect } from './redirects';
import { FOOTER_COLUMNS, NAV_MENUS } from './siteConfig';

const all = () => true;

test('the live integration inventory is complete and unique (index + 34 pages, EN and DE)', () => {
  assert.equal(LIVE_INTEGRATION_SLUGS.length, 34);
  assert.equal(new Set(LIVE_INTEGRATION_SLUGS).size, 34);
  assert.equal(LIVE_INTEGRATION_PATHS.length, 2 + 34 * 2);
  assert.ok(LIVE_INTEGRATION_PATHS.includes('/integrations/Checkout'), 'capital-C slug must be kept as published');
});

test('no redirect touches any live /integrations/<slug> page, even once every target page exists', () => {
  for (const path of LIVE_INTEGRATION_PATHS) {
    if (path === '/integrations' || path === '/de/integrations') continue;
    assert.equal(resolveRedirect(path, all), null, `${path} would be redirected`);
  }
});

test('the /integrations index is not redirected with the current page registry', () => {
  // NOTE: redirects.ts still maps /integrations → /integrations/payments, which would switch on
  // once that page is built. Flagged in docs/PHASE-3A-outstanding-evidence.md for a decision.
  assert.equal(resolveRedirect('/integrations', pageExists), null);
  assert.equal(resolveRedirect('/de/integrations', pageExists), null);
});

test('this repo does not shadow any live integration URL with a new route', () => {
  for (const path of LIVE_INTEGRATION_PATHS) assert.equal(pageExists(path), false, `${path} is defined in this repo`);
});

test('every integration link in the nav and footer points at an existing live integration page', () => {
  const live = new Set(LIVE_INTEGRATION_PATHS.map((p) => LIVE_SITE_ORIGIN + p));
  const menu = NAV_MENUS.find((m) => m.key === 'integrations');
  assert.ok(menu && menu.items.length === CONFIRMED_INTEGRATIONS.length + 1);
  const links = [...menu.items, ...(FOOTER_COLUMNS.find((c) => c.key === 'integrations')?.links ?? [])];
  for (const l of links) {
    assert.ok(live.has(l.href), `${l.label} → ${l.href} is not a live integration URL`);
    if (l.deHref) assert.ok(live.has(l.deHref), `${l.label} (de) → ${l.deHref} is not a live integration URL`);
  }
});
