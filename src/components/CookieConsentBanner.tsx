import React from 'react';
import { X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { LOCALE_UI_COPY } from '../data/siteConfig';
import { AppLink } from './ReusableBlocks';

export function CookieConsentBanner() {
  const {
    locale,
    cookieConsent,
    setCookieConsent,
    isCookieModalOpen,
    openCookiePreferences,
    closeCookieModal,
  } = useRouter();

  const copy = LOCALE_UI_COPY[locale] ?? LOCALE_UI_COPY.en;

  if (cookieConsent !== 'pending' && !isCookieModalOpen) {
    return null;
  }

  if (isCookieModalOpen) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      >
        <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-modal-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {copy.cookieBannerTitle}
            </h2>
            <button
              type="button"
              onClick={closeCookieModal}
              aria-label="Close cookie preferences"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {copy.cookieBannerText}
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="flex items-center justify-between font-medium text-slate-900 dark:text-slate-100">
                <span>Strictly necessary storage</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Always active</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Stores only your Light/Dark mode choice and GDPR consent decision locally.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="flex items-center justify-between font-medium text-slate-900 dark:text-slate-100">
                <span>Privacy-first product analytics (Opt-in)</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Blocked by default</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                No third-party scripts load unless you explicitly click &ldquo;{copy.acceptAll}&rdquo;.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <AppLink
              href={`/${locale}/legal/cookies`}
              onClick={closeCookieModal}
              className="text-xs font-medium text-rose-700 dark:text-rose-400 hover:underline"
            >
              Read Cookie Policy
            </AppLink>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCookieConsent('essential')}
                className="rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap"
              >
                {copy.acceptEssential}
              </button>
              <button
                type="button"
                onClick={() => setCookieConsent('all')}
                className="btn-gradient-primary rounded-lg px-3.5 py-2 text-xs font-medium cursor-pointer whitespace-nowrap"
              >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="Cookie consent"
      className="fixed bottom-3 right-3 left-3 md:left-auto md:max-w-sm z-40 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[11px] leading-snug text-slate-700 dark:text-slate-300">
          <strong className="font-semibold text-slate-900 dark:text-slate-100">{copy.cookieBannerTitle}:</strong>{' '}
          {copy.cookieBannerText}
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={openCookiePreferences}
            className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline underline-offset-2 cursor-pointer"
          >
            {copy.cookieSettings}
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('essential')}
            className="rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap"
          >
            {copy.acceptEssential}
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('all')}
            className="btn-gradient-primary rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer whitespace-nowrap"
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </aside>
  );
}
