import { useCallback } from 'react';
import { useRouter } from '../context/RouterContext';
import { localizeHref, pageExists } from '../data/pagesRegistry';

export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

/**
 * Where a nav or footer link should point, or null to hide it.
 * External links are always kept. Internal links are kept only if their page exists;
 * otherwise `fallbackHref` is used if one is given.
 */
export function resolveNavHref(item: { href: string; fallbackHref?: string }): string | null {
  if (isExternalHref(item.href)) return item.href;
  if (pageExists(item.href.split('#')[0])) return item.href;
  return item.fallbackHref ?? null;
}

/** Returns a function that turns an English canonical path into the right link for the current locale. */
export function useLocalHref(): (englishPath: string) => string {
  const { locale } = useRouter();
  return useCallback(
    (englishPath: string) => (isExternalHref(englishPath) ? englishPath : localizeHref(locale, englishPath)),
    [locale]
  );
}
