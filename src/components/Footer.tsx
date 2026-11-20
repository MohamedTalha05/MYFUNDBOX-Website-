import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { FOOTER_COLUMNS, FOOTER_COPY, LEGAL_LINKS, LOCALE_UI_COPY, SITE_CONFIG, SOCIAL_LINKS, type FooterLink } from '../data/siteConfig';
import { SUPPORTED_LOCALES } from '../utils/formatting';
import { isExternalHref, resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { BrandLogo } from './BrandLogo';

/*
 * Site footer: brand + five link columns, then a legal/utility bar.
 * Links resolve through resolveNavHref (own page → fallback page → hidden), so nothing points at
 * a 404. App links (Login) use APP_LINKS unchanged. Social links are the approved SOCIAL_LINKS only.
 */

/** Simple Icons paths (CC0) for the approved social profiles. */
const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]['key'], string> = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

/** Link text with a violet hover indicator (underline grows from the left, dot fades in). */
const LINK =
  'group/fl relative inline-flex items-center gap-2 text-[14px] text-[#a9acc4] transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none';

function LinkInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="h-1 w-1 -ml-3 shrink-0 rounded-full bg-[#9a68ff] opacity-0 transition-all duration-300 group-hover/fl:ml-0 group-hover/fl:opacity-100 group-focus-visible/fl:ml-0 group-focus-visible/fl:opacity-100"
        aria-hidden="true"
      />
      <span className="relative">
        {children}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#9a68ff] to-[#39d5e8] transition-transform duration-300 group-hover/fl:scale-x-100 group-focus-visible/fl:scale-x-100"
          aria-hidden="true"
        />
      </span>
    </>
  );
}

function FooterAnchor({ href, children, className = LINK }: { href: string; children: React.ReactNode; className?: string }) {
  const localHref = useLocalHref();
  return isExternalHref(href) ? (
    <a href={href} className={className}>
      <LinkInner>{children}</LinkInner>
    </a>
  ) : (
    <AppLink href={localHref(href)} className={className}>
      <LinkInner>{children}</LinkInner>
    </AppLink>
  );
}

function resolveLinks(links: FooterLink[], de: boolean) {
  return links
    .map((l) => ({ label: de && l.de ? l.de : l.label, href: resolveNavHref(l) }))
    .filter((l): l is { label: string; href: string } => l.href !== null);
}

export function Footer() {
  const { locale, switchLocale, theme, toggleTheme, openCookiePreferences } = useRouter();
  const localHref = useLocalHref();
  const ui = LOCALE_UI_COPY[locale] ?? LOCALE_UI_COPY.en;
  const copy = FOOTER_COPY[locale] ?? FOOTER_COPY.en;
  const de = locale === 'de';

  const columns = FOOTER_COLUMNS.map((col) => ({
    key: col.key,
    title: de ? col.titleDe : col.title,
    links: resolveLinks(col.links, de),
  })).filter((c) => c.links.length > 0);
  const legal = resolveLinks(LEGAL_LINKS, de);

  return (
    // `dark` keeps the footer navy in both themes.
    <footer className="dark relative overflow-hidden bg-[#0a0c1c] text-[#a9acc4]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-48 h-96 w-96 rounded-full bg-[#7657f6]/[0.12] blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#39d5e8]/[0.06] blur-3xl" />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" aria-hidden="true" />

      <div className="container-x relative pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.7fr_repeat(5,minmax(0,1fr))] lg:gap-x-10">
          {/* 1. Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 lg:pr-6">
            <AppLink href={localHref('/')} aria-label="MYFUNDBOX home" className="inline-flex">
              <BrandLogo className="h-5" />
            </AppLink>
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-[#c3c0dc]">{copy.description}</p>
            <ul className="mt-7 flex items-center gap-2.5" aria-label={copy.followUs}>
              {SOCIAL_LINKS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#a9acc4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9a68ff]/60 hover:bg-[#7657f6]/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a68ff]/60"
                  >
                    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current" aria-hidden="true">
                      <path d={SOCIAL_ICONS[s.key]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 2–6. Link columns */}
          {columns.map((col) => (
            <nav key={col.key} aria-label={col.title}>
              <h2 className="font-ui text-[12px] font-semibold uppercase tracking-[0.14em] text-white">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterAnchor href={l.href}>{l.label}</FooterAnchor>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal + utilities */}
        <div className="mt-16 border-t border-white/[0.08] pt-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
              <span className="text-[13px] text-[#8b8ea8]">
                © {new Date().getFullYear()} {SITE_CONFIG.brandName}. {copy.rights}
              </span>
              <nav aria-label={copy.legal}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {legal.map((l) => (
                    <li key={l.href}>
                      <FooterAnchor href={l.href} className={`${LINK} text-[13px]`}>
                        {l.label}
                      </FooterAnchor>
                    </li>
                  ))}
                  <li>
                    <button type="button" onClick={openCookiePreferences} className={`${LINK} cursor-pointer text-[13px]`}>
                      <LinkInner>{ui.cookieSettings}</LinkInner>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-3 font-ui">
              <div role="group" aria-label="Language" className="inline-flex rounded-lg border border-white/10 p-0.5">
                {SUPPORTED_LOCALES.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    lang={loc}
                    onClick={() => switchLocale(loc)}
                    aria-pressed={locale === loc}
                    aria-label={LOCALE_UI_COPY[loc].languageName}
                    className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
                      locale === loc ? 'bg-[image:var(--grad-button)] text-white' : 'text-[#a9acc4] hover:text-white'
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
                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/10 p-1.5 text-[#a9acc4] transition-colors hover:border-[#9a68ff]/50 hover:text-white"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
