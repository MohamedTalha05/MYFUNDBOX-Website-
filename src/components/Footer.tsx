import React from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { APP_LINKS, FOOTER_COLUMNS, LOCALE_UI_COPY, SITE_CONFIG, SOCIAL_LINKS } from '../data/siteConfig';
import { SUPPORTED_LOCALES } from '../utils/formatting';
import { isExternalHref, resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const { locale, switchLocale, theme, toggleTheme, openCookiePreferences } = useRouter();
  const localHref = useLocalHref();
  const copy = LOCALE_UI_COPY[locale] ?? LOCALE_UI_COPY.en;

  // Drop links to pages that don't exist yet, then drop columns left empty.
  const columns = FOOTER_COLUMNS.map((col) => ({
    title: col.title,
    links: col.links
      .map((l) => ({ label: l.label, href: resolveNavHref(l) }))
      .filter((l): l is { label: string; href: string } => l.href !== null),
  })).filter((col) => col.links.length > 0);

  return (
    // `dark` keeps the footer navy in both themes.
    <footer className="dark relative overflow-hidden bg-[#0b0d1f] text-muted">
      <div className="hairline-top" aria-hidden="true" />
      <div className="orb orb-violet -left-40 -top-40 h-80 w-80 opacity-30" aria-hidden="true" />

      <div className="container-x relative py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <AppLink href={localHref('/')} aria-label="MYFUNDBOX home" className="inline-flex">
              <BrandLogo className="h-5" />
            </AppLink>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{SITE_CONFIG.oneLineDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2.5 font-ui">
              <a href={APP_LINKS.signUp} className="btn-primary px-4 py-2 text-sm">
                {copy.nav.getStarted}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <AppLink href={localHref('/book-a-demo')} className="btn-ghost px-4 py-2 text-sm">
                {copy.nav.bookDemo}
              </AppLink>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank" className="hover:text-ink transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h2 className="mb-4 font-ui text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">{col.title}</h2>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {isExternalHref(l.href) ? (
                      <a href={l.href} className="hover:text-ink transition-colors">
                        {l.label}
                      </a>
                    ) : (
                      <AppLink href={localHref(l.href)} className="hover:text-ink transition-colors">
                        {l.label}
                      </AppLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 text-sm md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-subtle">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.brandName}</span>
            <button type="button" onClick={openCookiePreferences} className="hover:text-ink transition-colors cursor-pointer">
              {copy.cookieSettings}
            </button>
          </div>

          <div className="flex items-center gap-3 font-ui">
            <div role="group" aria-label="Language" className="inline-flex rounded-lg border border-line p-0.5">
              {SUPPORTED_LOCALES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  lang={loc}
                  onClick={() => switchLocale(loc)}
                  aria-pressed={locale === loc}
                  aria-label={LOCALE_UI_COPY[loc].languageName}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors cursor-pointer ${
                    locale === loc ? 'bg-ink text-on-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex items-center justify-center rounded-lg border border-line p-1.5 text-muted hover:text-ink transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
