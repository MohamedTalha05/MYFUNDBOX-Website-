import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { LOCALE_UI_COPY, MEGA_MENU_PRODUCT, MEGA_MENU_SOLUTIONS } from '../data/siteConfig';
import { AppLink } from './ReusableBlocks';

export function Navbar() {
  const { locale, pathname, navigate } = useRouter();
  const copy = LOCALE_UI_COPY[locale] ?? LOCALE_UI_COPY.en;

  const [openMenu, setOpenMenu] = useState<'product' | 'solutions' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const prefix = `/${locale}`;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b0f17]/95 text-slate-100 backdrop-blur-md"
    >
      {/* Strictly 3-zone Top Bar Contract separated by gap-8 */}
      <div className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Uploaded MYFUNDBOX brand logo */}
        <AppLink
          href={prefix}
          aria-label="MYFUNDBOX Home"
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
        >
          <img
            src="/assets/aistudio/logo_mfb_2225b714.png"
            alt="MYFUNDBOX"
            className="h-9 md:h-10 w-auto object-contain shrink-0"
          />
        </AppLink>

        {/* Zone 2: 5 concise single-line navigation items */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === 'product'}
              aria-controls="mega-menu-product"
              onClick={() => setOpenMenu((prev) => (prev === 'product' ? null : 'product'))}
              className="inline-flex items-center gap-1 py-2 hover:text-rose-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{copy.nav.product}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${openMenu === 'product' ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === 'solutions'}
              aria-controls="mega-menu-solutions"
              onClick={() => setOpenMenu((prev) => (prev === 'solutions' ? null : 'solutions'))}
              className="inline-flex items-center gap-1 py-2 hover:text-rose-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{copy.nav.solutions}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${openMenu === 'solutions' ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>

          <AppLink
            href={`${prefix}/compare/myfundbox-vs-chargebee-revrec`}
            className="py-2 hover:text-rose-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.compare}
          </AppLink>

          <AppLink
            href={`${prefix}/pricing`}
            className="py-2 hover:text-rose-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.pricing}
          </AppLink>

          <AppLink
            href={`${prefix}/resources`}
            className="py-2 hover:text-rose-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.resources}
          </AppLink>
        </nav>

        {/* Zone 3: Single Primary Gradient Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate(`${prefix}/contact`)}
            className="btn-gradient-primary rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
          >
            {copy.nav.bookDemo}
          </button>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-700/80 p-2 text-slate-200 hover:bg-slate-800/70 cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu Panels */}
      {openMenu === 'product' && (
        <div
          id="mega-menu-product"
          className="hidden md:block border-t border-slate-800 bg-[#111827] text-slate-100 shadow-2xl"
        >
          <div className="mx-auto max-w-6xl px-6 py-6">
            <div className="grid grid-cols-3 gap-4">
              {MEGA_MENU_PRODUCT.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href.replace('/en', prefix)}
                  className="group rounded-lg border border-transparent hover:border-slate-700 hover:bg-slate-800/70 p-4 transition-colors"
                >
                  <div className="text-sm font-semibold text-white group-hover:text-rose-300">
                    {item.label}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </AppLink>
              ))}
              <div className="rounded-lg border border-slate-800 bg-[#0b0f17] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Not a payment gateway
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    MYFUNDBOX keeps your existing billing and PSP tools while unifying IFRS 15 accounting.
                  </p>
                </div>
                <AppLink
                  href={`${prefix}/security`}
                  className="mt-3 text-xs font-semibold text-amber-300 hover:underline"
                >
                  EU Security &amp; Compliance →
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {openMenu === 'solutions' && (
        <div
          id="mega-menu-solutions"
          className="hidden md:block border-t border-slate-800 bg-[#111827] text-slate-100 shadow-2xl"
        >
          <div className="mx-auto max-w-6xl px-6 py-6">
            <div className="grid grid-cols-3 gap-4">
              {MEGA_MENU_SOLUTIONS.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href.replace('/en', prefix)}
                  className="group rounded-lg border border-transparent hover:border-slate-700 hover:bg-slate-800/70 p-4 transition-colors"
                >
                  <div className="text-sm font-semibold text-white group-hover:text-rose-300">
                    {item.label}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </AppLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b0f17] px-4 py-5 space-y-5 max-h-[80vh] overflow-y-auto">
          <div>
            <div className="text-xs font-semibold text-amber-300 mb-2">{copy.nav.product}</div>
            <div className="grid grid-cols-1 gap-1.5">
              {MEGA_MENU_PRODUCT.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href.replace('/en', prefix)}
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800/70"
                >
                  {item.label}
                </AppLink>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-amber-300 mb-2">{copy.nav.solutions}</div>
            <div className="grid grid-cols-1 gap-1.5">
              {MEGA_MENU_SOLUTIONS.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href.replace('/en', prefix)}
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800/70"
                >
                  {item.label}
                </AppLink>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
            <AppLink href={`${prefix}/compare/myfundbox-vs-chargebee-revrec`} className="px-2 py-2 text-sm font-medium text-slate-100">
              {copy.nav.compare}
            </AppLink>
            <AppLink href={`${prefix}/pricing`} className="px-2 py-2 text-sm font-medium text-slate-100">
              {copy.nav.pricing}
            </AppLink>
            <AppLink href={`${prefix}/resources`} className="px-2 py-2 text-sm font-medium text-slate-100">
              {copy.nav.resources}
            </AppLink>
          </div>
        </div>
      )}
    </header>
  );
}
