import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { pageExists, resolvePageByPath } from '../data/pagesRegistry';
import { APP_LINKS } from '../data/siteConfig';
import { LIVE_INTEGRATION_PATHS, LIVE_SITE_ORIGIN } from '../data/liveSite';

/*
 * Renders the homepage exactly as SSR / the static build does and checks product-truth rules,
 * heading structure and links. Guards the Phase 3A rules in src/data/homepageContent.ts.
 */

const render = (path: string) => renderToString(React.createElement(App, { initialPath: path }));

/** Text only (tags stripped), for claim checks. */
const textOf = (html: string) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&');

const BANNED_CLAIMS: RegExp[] = [
  /\[(ADD|CONFIRM)\b/i, // internal notes
  /PCI[ -]?DSS/i,
  /ISO[ -]?27001/i,
  /SOC ?2/i,
  /\bDATEV\b/i,
  /XRechnung/i,
  /ZUGFeRD/i,
  /usage[- ]based/i,
  /\bmetering\b/i,
  /quote[- ]to[- ]cash/i,
  /AI[- ]driven/i,
  /KI-gestützt/i,
  /payment intelligence/i,
  /API[- ]first/i,
  /\bIoT\b/i,
  /machine monitoring/i,
  /\bofficial partners?\b/i, // the disclaimer "not official partnerships" is allowed
  /\b\d+\+?\s*(countries|currencies|Länder|Währungen)\b/i,
  /\b(customers|members|users|Kunden) (trust|use|nutzen|vertrauen)\b/i,
  /\bG2\b/,
];

for (const path of ['/', '/de']) {
  test(`homepage ${path}: no unverified claims or internal notes in the rendered page`, () => {
    const text = textOf(render(path));
    for (const re of BANNED_CLAIMS) assert.doesNotMatch(text, re, `${path} contains ${re}`);
  });

  test(`homepage ${path}: one H1 matching the registry, and the approved sections are present`, () => {
    const html = render(path);
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    assert.equal(h1s.length, 1, 'exactly one <h1>');
    const page = resolvePageByPath(path)!;
    const h1Text = textOf(html.slice(html.indexOf('<h1'), html.indexOf('</h1>'))).replace(/\s+/g, ' ').trim();
    assert.equal(h1Text, page.h1);
    for (const id of [
      'home-hero-heading',
      'problem-heading',
      'platform-intro-heading',
      'capabilities-heading',
      'business-models-heading',
      'how-heading',
      'ecosystem-heading',
      'global-heading',
      'security-heading',
      'final-cta-heading',
    ]) {
      assert.ok(html.includes(`id="${id}"`), `${path} is missing section #${id}`);
    }
  });

  test(`homepage ${path}: Get Started / Login keep the existing app URLs and every link resolves`, () => {
    const html = render(path);
    const signUp = APP_LINKS.signUp.replace(/&/g, '&amp;');
    assert.ok(html.includes(`href="${signUp}"`), 'Get Started must use APP_LINKS.signUp');
    assert.ok(html.includes(`href="${APP_LINKS.login.replace(/&/g, '&amp;')}"`), 'Login must use APP_LINKS.login');
    assert.doesNotMatch(html, /docs\.myfundbox\.com/, 'docs.myfundbox.com is an empty placeholder; do not link it');

    const live = new Set(LIVE_INTEGRATION_PATHS.map((p) => LIVE_SITE_ORIGIN + p));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
    assert.ok(hrefs.length > 20);
    for (const href of hrefs) {
      if (/^\/assets\/.+\.(png|svg|jpe?g|webp)$/.test(href)) continue; // SVG <image href>, not a link
      if (href.startsWith('#')) {
        assert.ok(html.includes(`id="${href.slice(1)}"`), `anchor ${href} has no target`);
      } else if (href.startsWith(LIVE_SITE_ORIGIN + '/integrations') || href.startsWith(LIVE_SITE_ORIGIN + '/de/integrations')) {
        assert.ok(live.has(href), `${href} is not a live integration page`);
      } else if (/^https?:/.test(href)) {
        assert.ok(
          href === APP_LINKS.signUp || href === APP_LINKS.login || /linkedin\.com|twitter\.com|youtube\.com/.test(href),
          `unexpected external link ${href}`
        );
      } else {
        assert.ok(pageExists(href.split('#')[0]), `internal link ${href} is not a page`);
      }
    }
  });
}
