import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { normalizeRoutePath, pageExists, pathForLocale, resolvePageByPath, splitLocale } from '../data/pagesRegistry';
import { SITE_CONFIG } from '../data/siteConfig';
import type { LocaleCode } from '../utils/formatting';

export type ThemeMode = 'light' | 'dark';
export type CookieConsentState = 'pending' | 'essential' | 'all';

interface RouterContextValue {
  pathname: string;
  locale: LocaleCode;
  navigate: (to: string) => void;
  switchLocale: (nextLocale: LocaleCode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  cookieConsent: CookieConsentState;
  setCookieConsent: (choice: 'essential' | 'all') => void;
  openCookiePreferences: () => void;
  isCookieModalOpen: boolean;
  closeCookieModal: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({
  initialPath,
  children,
}: {
  initialPath: string;
  children: React.ReactNode;
}) {
  const [pathname, setPathname] = useState<string>(() => normalizeRoutePath(initialPath));
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [cookieConsent, setCookieConsentState] = useState<CookieConsentState>('all');
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  // Hydrate persisted client preferences safely post-mount
  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem('myfundbox_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }
      const savedConsent = window.localStorage.getItem('myfundbox_cookie_consent');
      if (savedConsent === 'essential' || savedConsent === 'all') {
        setCookieConsentState(savedConsent);
      } else {
        setCookieConsentState('pending');
      }
    } catch {
      setCookieConsentState('pending');
    }

    const onPopState = () => {
      setPathname(normalizeRoutePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Sync document head title, meta description, and html lang on client route changes
  useEffect(() => {
    const page = resolvePageByPath(pathname);
    if (page) {
      document.title = page.title;
      document.documentElement.lang = page.locale;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', page.description);
    } else {
      document.title = `Page Not Found | ${SITE_CONFIG.brandName}`;
    }
  }, [pathname]);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('#')) {
      const target = document.getElementById(to.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const [pathPart, hashPart] = to.split('#');
    const normalized = normalizeRoutePath(pathPart || '/');

    if (typeof window !== 'undefined') {
      const targetUrl = hashPart ? `${normalized}#${hashPart}` : normalized;
      if (window.location.pathname + window.location.hash !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
      setPathname(normalized);
      if (hashPart) {
        setTimeout(() => {
          const el = document.getElementById(hashPart);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  }, []);

  const currentPage = resolvePageByPath(pathname);
  const locale: LocaleCode = currentPage?.locale ?? splitLocale(pathname).locale;

  // Go to the same page in the other language, or to that language's home page if
  // the page hasn't been translated yet.
  const switchLocale = useCallback(
    (nextLocale: LocaleCode) => {
      const { suffix } = splitLocale(pathname);
      const sameTarget = pathForLocale(nextLocale, suffix);
      navigate(pageExists(sameTarget) ? sameTarget : pathForLocale(nextLocale, '/'));
    },
    [pathname, navigate]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === 'light' ? 'dark' : 'light';
      try {
        window.localStorage.setItem('myfundbox_theme', next);
      } catch {
        // Ignore storage restrictions
      }
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  const setCookieConsent = useCallback((choice: 'essential' | 'all') => {
    setCookieConsentState(choice);
    setIsCookieModalOpen(false);
    try {
      window.localStorage.setItem('myfundbox_cookie_consent', choice);
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const openCookiePreferences = useCallback(() => {
    setIsCookieModalOpen(true);
  }, []);

  const closeCookieModal = useCallback(() => {
    setIsCookieModalOpen(false);
  }, []);

  return (
    <RouterContext.Provider
      value={{
        pathname,
        locale,
        navigate,
        switchLocale,
        theme,
        toggleTheme,
        cookieConsent,
        setCookieConsent,
        openCookiePreferences,
        isCookieModalOpen,
        closeCookieModal,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider');
  return ctx;
}
