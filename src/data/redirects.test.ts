import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_HANDOFF_PATHS, appendQuery, resolveRedirect } from './redirects';
import { APP_LINKS } from './siteConfig';
import { pageExists } from './pagesRegistry';

// A fake site where every target exists, to test the mapping logic on its own.
const all = () => true;

test('legacy locale prefixes are removed', () => {
  assert.equal(resolveRedirect('/en', all), '/');
  assert.equal(resolveRedirect('/en/pricing', all), '/pricing');
  assert.equal(resolveRedirect('/fr/pricing', all), '/pricing');
  assert.equal(resolveRedirect('/es', all), '/');
});

test('prefix matching is exact: /enterprise and /esports are not legacy locale URLs', () => {
  assert.equal(resolveRedirect('/enterprise', all), null);
  assert.equal(resolveRedirect('/esports', all), null);
});

test('moved live-site URLs map to their new pages, in English and German', () => {
  assert.equal(resolveRedirect('/recurring-payments', all), '/recurring-billing');
  assert.equal(resolveRedirect('/pricing-pages/subscription-billing', all), '/pricing');
  assert.equal(resolveRedirect('/de/recurring-payments', all), '/de/recurring-billing');
  assert.equal(resolveRedirect('/en/manage-plans', all), '/plans-and-trials');
});

test('trailing slashes are removed, but the root is left alone', () => {
  assert.equal(resolveRedirect('/pricing/', all), '/pricing');
  assert.equal(resolveRedirect('/', all), null);
});

test('pages that need no redirect return null', () => {
  assert.equal(resolveRedirect('/pricing', all), null);
  assert.equal(resolveRedirect('/de', all), null);
});

test('never redirects to a page that does not exist (no 301 to a 404)', () => {
  const none = () => false;
  assert.equal(resolveRedirect('/en/pricing', none), null);
  assert.equal(resolveRedirect('/recurring-payments', none), null);
});

test('log-in and sign-up hand off to the app entry point, keeping query strings', () => {
  assert.equal(APP_LINKS.login, 'https://app.subscriptionbilling.eu/?app=1');
  assert.equal(APP_LINKS.signUp, 'https://app.subscriptionbilling.eu/?app=1');
  assert.equal(APP_HANDOFF_PATHS['/login-mfb'], 'login');
  assert.equal(APP_HANDOFF_PATHS['/sign-up'], 'signUp');
  assert.equal(appendQuery(APP_LINKS.signUp, ''), 'https://app.subscriptionbilling.eu/?app=1');
  assert.equal(
    appendQuery(APP_LINKS.signUp, '?utm_source=Website&utm_medium=-signup'),
    'https://app.subscriptionbilling.eu/?app=1&utm_source=Website&utm_medium=-signup'
  );
  assert.equal(appendQuery('https://example.com/x', '?a=1'), 'https://example.com/x?a=1');
});

test('with the real registry: /en/pricing → /pricing, and unbuilt targets fall through', () => {
  assert.equal(resolveRedirect('/en/pricing', pageExists), '/pricing');
  assert.equal(resolveRedirect('/en', pageExists), '/');
  // /recurring-billing is built in M3; until then the live URL is not redirected.
  assert.equal(resolveRedirect('/recurring-payments', pageExists), pageExists('/recurring-billing') ? '/recurring-billing' : null);
});
