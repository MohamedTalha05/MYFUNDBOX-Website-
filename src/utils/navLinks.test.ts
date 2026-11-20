import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_LINKS, FOOTER_COLUMNS, LEGAL_LINKS, MEGA_MENU_PRODUCT, MEGA_MENU_SOLUTIONS, NAV_LINKS, NAV_MENUS } from '../data/siteConfig';
import { localizeHref, pageExists, pathForLocale, splitLocale } from '../data/pagesRegistry';
import { isExternalHref, resolveNavHref } from './navLinks';

const ALL_NAV_ITEMS = [
  ...MEGA_MENU_PRODUCT,
  ...MEGA_MENU_SOLUTIONS,
  ...NAV_LINKS,
  ...NAV_MENUS.flatMap((m) => m.items),
  ...FOOTER_COLUMNS.flatMap((c) => c.links),
  ...LEGAL_LINKS,
];

test('footer: every column link is reachable and all existing legal URLs are kept', () => {
  for (const col of FOOTER_COLUMNS) {
    for (const link of col.links) {
      assert.notEqual(resolveNavHref(link), null, `footer › ${col.title} › ${link.label} is unreachable`);
    }
  }
  for (const path of ['/privacy-policy', '/terms-of-service', '/cookies', '/imprint', '/dpa']) {
    const link = LEGAL_LINKS.find((l) => l.href === path);
    assert.ok(link, `legal link ${path} missing from footer`);
    assert.ok(pageExists(path), `legal page ${path} does not exist`);
  }
  const login = FOOTER_COLUMNS.flatMap((c) => c.links).find((l) => l.label === 'Login');
  assert.equal(login?.href, APP_LINKS.login, 'footer Login must use the existing app flow');
});

test('header menus: every item is reachable (own page, fallback page or external)', () => {
  for (const menu of NAV_MENUS) {
    for (const item of menu.items) {
      assert.notEqual(resolveNavHref(item), null, `${menu.key} › ${item.label} has no existing page and no fallback`);
      if (item.fallbackHref) {
        assert.ok(
          isExternalHref(item.fallbackHref) || pageExists(item.fallbackHref),
          `${menu.key} › ${item.label} falls back to ${item.fallbackHref}, which is not a page`
        );
      }
    }
  }
});

test('login and sign-up keep the existing application flow', () => {
  assert.equal(APP_LINKS.login, 'https://app.subscriptionbilling.eu/?app=1');
  assert.equal(APP_LINKS.signUp, 'https://app.subscriptionbilling.eu/?app=1');
});

test('every nav and footer item either resolves to an existing page, an external URL, or is hidden', () => {
  for (const item of ALL_NAV_ITEMS) {
    const href = resolveNavHref(item);
    if (href === null) continue; // hidden until its page is built
    assert.ok(
      isExternalHref(href) || pageExists(href.split('#')[0]),
      `${item.label} resolves to ${href}, which is not a page`
    );
  }
});

test('nav config uses English canonical paths (no locale prefixes)', () => {
  for (const item of ALL_NAV_ITEMS) {
    if (isExternalHref(item.href)) continue;
    assert.match(item.href, /^\//, `${item.label} href must be root-relative`);
    assert.doesNotMatch(item.href, /^\/(en|de|fr|es)(\/|$)/, `${item.label} href must not carry a locale`);
  }
});

test('Developers falls back to the external docs while /developers is unbuilt', () => {
  const dev = NAV_LINKS.find((l) => l.copyKey === 'developers');
  assert.ok(dev);
  const href = resolveNavHref(dev);
  assert.equal(href, pageExists('/developers') ? '/developers' : 'https://docs.myfundbox.com/');
});

test('locale helpers: English at root, German under /de', () => {
  assert.deepEqual(splitLocale('/'), { locale: 'en', suffix: '/' });
  assert.deepEqual(splitLocale('/de'), { locale: 'de', suffix: '/' });
  assert.deepEqual(splitLocale('/de/pricing/'), { locale: 'de', suffix: '/pricing' });
  assert.deepEqual(splitLocale('/design'), { locale: 'en', suffix: '/design' });
  assert.equal(pathForLocale('en', '/pricing'), '/pricing');
  assert.equal(pathForLocale('de', '/'), '/de');
  assert.equal(pathForLocale('de', '/pricing'), '/de/pricing');
});

test('localizeHref falls back to English when the German page does not exist', () => {
  assert.equal(localizeHref('de', '/'), '/de');
  assert.equal(localizeHref('de', '/pricing'), pageExists('/de/pricing') ? '/de/pricing' : '/pricing');
  assert.equal(localizeHref('en', '/pricing'), '/pricing');
  assert.equal(localizeHref('de', '/#features'), '/de#features');
});
