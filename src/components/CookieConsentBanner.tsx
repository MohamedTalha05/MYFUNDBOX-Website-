import React from 'react';
import { X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { LOCALE_UI_COPY } from '../data/siteConfig';
import { localizeHref } from '../data/pagesRegistry';
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <div className="w-full max-w-lg rounded-xl border border-line bg-surface p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-modal-title" className="text-lg font-semibold text-ink">
              {copy.cookieBannerTitle}
            </h2>
            <button
              type="button"
              onClick={closeCookieModal}
              aria-label="Close cookie preferences"
              className="rounded-lg p-1.5 text-subtle hover:bg-soft cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {copy.cookieBannerText}
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-lg border border-line bg-soft p-4">
              <div className="flex items-center justify-between font-medium text-ink">
                <span>Strictly necessary storage</span>
                <span className="text-xs text-subtle">Always active</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Stores only your Light/Dark mode choice and GDPR consent decision locally.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-soft p-4">
              <div className="flex items-center justify-between font-medium text-ink">
                <span>Privacy-first product analytics (Opt-in)</span>
                <span className="text-xs text-subtle">Blocked by default</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                No third-party scripts load unless you explicitly click &ldquo;{copy.acceptAll}&rdquo;.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <AppLink
              href={localizeHref(locale, '/cookies')}
              onClick={closeCookieModal}
              className="text-xs font-medium text-accent hover:underline"
            >
              Read Cookie Policy
            </AppLink>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCookieConsent('essential')}
                className="rounded-lg border border-line-strong px-3.5 py-2 text-xs font-medium text-ink hover:bg-soft cursor-pointer whitespace-nowrap"
              >
                {copy.acceptEssential}
              </button>
              <button
                type="button"
                onClick={() => setCookieConsent('all')}
                className="btn-primary rounded-lg px-3.5 py-2 text-xs font-medium cursor-pointer whitespace-nowrap"
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
      className="fixed bottom-3 right-3 left-3 md:left-auto md:max-w-sm z-40 rounded-xl border border-line bg-surface p-3 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <p className="text-[11px] leading-snug text-muted">
          <strong className="font-semibold text-ink">{copy.cookieBannerTitle}:</strong>{' '}
          {copy.cookieBannerText}
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={openCookiePreferences}
            className="px-2 py-1 text-[11px] font-medium text-muted hover:text-ink underline underline-offset-2 cursor-pointer"
          >
            {copy.cookieSettings}
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('essential')}
            className="rounded-md border border-line-strong px-2.5 py-1 text-[11px] font-medium text-ink hover:bg-soft cursor-pointer whitespace-nowrap"
          >
            {copy.acceptEssential}
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('all')}
            className="btn-primary rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer whitespace-nowrap"
          >
            {copy.acceptAll}
          </button>
        </div>
      </div>
    </aside>
  );
}
