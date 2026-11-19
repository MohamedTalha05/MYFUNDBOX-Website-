/**
 * Permanent (301) redirects that keep existing search rankings and inbound links working.
 *
 * 1. Legacy locale prefixes from earlier builds of this repo: /en/x → /x. FR and ES were
 *    dropped for launch, so /fr/x and /es/x also go to the English page /x.
 * 2. URLs from the live myfundbox.com whose page moves to a new URL (docs/02-sitemap-and-roadmap.md).
 * 3. Trailing slashes: /pricing/ → /pricing.
 *
 * A redirect only fires when its target page exists. While a new page is still unbuilt,
 * the old URL falls through to normal handling instead of 301-ing to a 404, and the
 * redirect switches on automatically once the page is added to the registry.
 */

/** Live-site path → new path. Applied to English paths and to the suffix of /de paths. */
export const LIVE_SITE_REDIRECTS: Readonly<Record<string, string>> = {
  '/recurring-payments': '/recurring-billing',
  '/manage-plans': '/plans-and-trials',
  '/trial-management': '/plans-and-trials',
  '/pricing-pages/subscription-billing': '/pricing',
  '/security-compliance': '/security',
  '/integrations': '/integrations/payments',
  // Retired legacy rev-rec sub-ledger paths redirected to matching billing pages
  '/product/revenue-recognition': '/subscription-management',
  '/product/revenue-reporting': '/revenue-analytics',
  '/product/revenue-forecasting': '/revenue-analytics',
  '/product/deferred-revenue-accruals': '/recurring-billing',
  '/product/integrations-api': '/payment-management',
};

/**
 * Live-site paths that hand off to the MYFUNDBOX app. These are temporary (302) redirects:
 * the app URL is provisional ("for now"), so browsers and search engines must not cache it
 * permanently. Query strings (e.g. UTM tags) are passed through to the app.
 */
export const APP_HANDOFF_PATHS: Readonly<Record<string, 'login' | 'signUp'>> = {
  '/login-mfb': 'login',
  '/sign-up': 'signUp',
  '/de/login-mfb': 'login',
  '/de/sign-up': 'signUp',
};

/** Adds `query` ('?a=1&b=2' or '') to `url`, merging with any query `url` already has. */
export function appendQuery(url: string, query: string): string {
  const q = query.replace(/^\?/, '');
  if (!q) return url;
  return url + (url.includes('?') ? '&' : '?') + q;
}

const LEGACY_LOCALE_PREFIX = /^\/(en|fr|es)(?=\/|$)/;

/**
 * Returns the path to 301 to, or null if the request should be handled as is.
 * `pageExists` is injected so this stays a pure function and easy to test.
 */
export function resolveRedirect(rawPath: string, pageExists: (path: string) => boolean): string | null {
  const pathOnly = rawPath.split('?')[0].split('#')[0];
  let target = pathOnly.replace(/\/+$/, '') || '/';

  target = target.replace(LEGACY_LOCALE_PREFIX, '') || '/';

  const de = target.match(/^\/de(\/.*)?$/);
  if (de) {
    const suffix = de[1] || '/';
    const mapped = LIVE_SITE_REDIRECTS[suffix];
    if (mapped) target = `/de${mapped}`;
  } else if (LIVE_SITE_REDIRECTS[target]) {
    target = LIVE_SITE_REDIRECTS[target];
  }

  if (target === pathOnly) return null;
  return pageExists(target) ? target : null;
}
