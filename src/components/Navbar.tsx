import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Boxes,
  Building2,
  ChevronDown,
  CircleHelp,
  Code2,
  CreditCard,
  FileText,
  Landmark,
  Layers,
  LayoutDashboard,
  Mail,
  MonitorPlay,
  Newspaper,
  Percent,
  Plug,
  Receipt,
  RefreshCw,
  Repeat,
  type LucideIcon,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import {
  APP_LINKS,
  LOCALE_UI_COPY,
  NAV_MENUS,
  type NavIconKey,
  type NavMenu,
  type NavMenuItem,
} from '../data/siteConfig';
import { resolvePageByPath } from '../data/pagesRegistry';
import { AppLink } from './ReusableBlocks';
import { BrandLogoStacked } from './BrandLogo';
import { isExternalHref, resolveNavHref, useLocalHref } from '../utils/navLinks';

type MenuKey = NavMenu['key'];
type ResolvedItem = NavMenuItem & { resolved: string };

const ICONS: Record<NavIconKey, LucideIcon> = {
  revenue: LayoutDashboard,
  subscriptions: Repeat,
  billing: Receipt,
  payments: CreditCard,
  dunning: RefreshCw,
  analytics: BarChart3,
  saas: Layers,
  subscriptionBusiness: Boxes,
  digital: MonitorPlay,
  paymentIntegrations: Plug,
  accounting: Landmark,
  tax: Percent,
  blog: Newspaper,
  guides: BookOpen,
  docs: Code2,
  faq: CircleHelp,
  about: Building2,
  contact: Mail,
};

/** Product is the only wide (two-column) panel. */
const PANEL_WIDTH: Record<MenuKey, string> = {
  product: 'w-[38rem]',
  solutions: 'w-[21rem]',
  integrations: 'w-[22rem]',
  resources: 'w-[21rem]',
  company: 'w-[19rem]',
};

const OPEN_DELAY = 70;
const CLOSE_DELAY = 160;

function NavItemLink({
  item,
  href,
  label,
  description,
  active,
  onNavigate,
  compact = false,
}: {
  item: ResolvedItem;
  href: string;
  label: string;
  description: string;
  active: boolean;
  onNavigate: () => void;
  compact?: boolean;
}) {
  const Icon = ICONS[item.icon] ?? FileText;
  const external = isExternalHref(href);
  const className = `group/item flex items-start gap-3 rounded-xl ${compact ? 'p-2.5' : 'p-3'} outline-none transition-colors duration-200 hover:bg-white/[0.05] focus-visible:bg-white/[0.06] focus-visible:ring-1 focus-visible:ring-[#9a68ff]/60 ${
    active ? 'bg-white/[0.04]' : ''
  }`;
  const body = (
    <>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
          active
            ? 'border-transparent bg-[image:var(--grad-button)] text-white'
            : 'border-white/[0.08] bg-white/[0.04] text-[#b29dff] group-hover/item:border-transparent group-hover/item:bg-[image:var(--grad-button)] group-hover/item:text-white group-hover/item:shadow-[0_6px_18px_-6px_rgba(118,87,246,0.8)]'
        }`}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[14px] font-medium text-white">
          {label}
          {external ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-[#9195ae]" aria-hidden="true" />
          ) : (
            <ArrowRight
              className="h-3.5 w-3.5 -translate-x-1 text-[#b29dff] opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
              aria-hidden="true"
            />
          )}
        </span>
        {!compact && <span className="mt-0.5 block text-[12.5px] leading-snug text-[#9195ae]">{description}</span>}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={className} onClick={onNavigate}>
        {body}
      </a>
    );
  }
  return (
    <AppLink href={href} className={className} onClick={onNavigate} aria-current={active ? 'page' : undefined}>
      {body}
    </AppLink>
  );
}

export function Navbar() {
  const { locale, pathname } = useRouter();
  const localHref = useLocalHref();
  const copy = LOCALE_UI_COPY[locale] ?? LOCALE_UI_COPY.en;
  const de = locale === 'de';

  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [hoverKey, setHoverKey] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>('product');
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({});
  const itemRefs = useRef<Partial<Record<MenuKey, HTMLLIElement | null>>>({});
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);

  // Only items that resolve to an existing page, a fallback page or an external URL are shown.
  const menus = NAV_MENUS.map((m) => ({
    key: m.key,
    label: copy.nav[m.key],
    items: m.items
      .map((i) => ({ ...i, resolved: resolveNavHref(i) }))
      .filter((i): i is ResolvedItem => i.resolved !== null),
  })).filter((m) => m.items.length > 0);

  const text = (item: ResolvedItem) => (de && item.de ? item.de : { label: item.label, description: item.description });
  const hrefFor = (item: ResolvedItem) => (isExternalHref(item.resolved) ? item.resolved : localHref(item.resolved));
  const isActivePath = (href: string) => !isExternalHref(href) && href !== '/' && (pathname === href || pathname.startsWith(`${href}/`));

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const scheduleOpen = (key: MenuKey) => {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpenMenu(key), openMenu ? 0 : OPEN_DELAY);
  };
  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };
  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu((current) => {
        if (current) triggerRefs.current[current]?.focus();
        return null;
      });
      setMobileOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close the mobile menu if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMobileOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Sliding highlight behind the hovered (or open) top-level item.
  const pillKey = hoverKey ?? openMenu;
  useLayoutEffect(() => {
    const li = pillKey ? itemRefs.current[pillKey] : null;
    setPill(li ? { x: li.offsetLeft, w: li.offsetWidth } : null);
  }, [pillKey]);

  const solid = scrolled || mobileOpen || openMenu !== null || !resolvePageByPath(pathname);

  const onTriggerKeyDown = (e: React.KeyboardEvent, key: MenuKey) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpenMenu(key);
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`#nav-panel-${key} a`)?.focus();
      });
    }
  };

  return (
    <header
      ref={headerRef}
      // Always dark: the bar sits over each page's midnight hero band.
      className={`dark sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
        solid
          ? 'border-white/[0.08] bg-[#0b0d1f]/90 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-saturate-150'
          : 'border-transparent bg-[#101329]/25'
      }`}
    >
      <div className="container-x grid h-16 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <AppLink href={localHref('/')} aria-label="MYFUNDBOX home" className="inline-flex shrink-0 items-center justify-self-start">
          {/* Full official logo, uncropped (white artwork; the bar is always dark) */}
          <BrandLogoStacked tone="light" className="h-10 w-auto md:h-11" />
        </AppLink>

        {/* Centre navigation (desktop) */}
        <nav
          aria-label={de ? 'Hauptnavigation' : 'Main'}
          className="hidden lg:block"
          onPointerLeave={(e) => {
            if (e.pointerType !== 'mouse') return;
            setHoverKey(null);
            scheduleClose();
          }}
        >
          <ul className="relative flex items-center gap-0.5 font-ui text-[14px] font-medium">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-lg bg-white/[0.07] transition-[left,width,opacity] duration-300 ease-out ${
                pill ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: pill?.x ?? 0, width: pill?.w ?? 0 }}
            />
            {menus.map((m) => {
              const isOpen = openMenu === m.key;
              const panelId = `nav-panel-${m.key}`;
              const containsActive = m.items.some((i) => isActivePath(i.resolved));
              return (
                <li
                  key={m.key}
                  ref={(el) => {
                    itemRefs.current[m.key] = el;
                  }}
                  className="relative"
                  onPointerEnter={(e) => {
                    if (e.pointerType !== 'mouse') return;
                    setHoverKey(m.key);
                    scheduleOpen(m.key);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setOpenMenu((cur) => (cur === m.key ? null : cur));
                    }
                  }}
                >
                  <button
                    ref={(el) => {
                      triggerRefs.current[m.key] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => {
                      clearTimers();
                      setOpenMenu((prev) => (prev === m.key ? null : m.key));
                    }}
                    onKeyDown={(e) => onTriggerKeyDown(e, m.key)}
                    className={`relative inline-flex items-center gap-1 rounded-lg px-3.5 py-2 transition-colors duration-200 cursor-pointer ${
                      isOpen || containsActive ? 'text-white' : 'text-[#b9bcd2] hover:text-white'
                    }`}
                  >
                    {m.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                    {containsActive && (
                      <span className="absolute inset-x-3.5 -bottom-[13px] h-px bg-gradient-to-r from-[#9a68ff] to-[#39d5e8]" aria-hidden="true" />
                    )}
                  </button>

                  {/* Dropdown panel: always in the DOM (crawlable links), inert while closed */}
                  <div
                    id={panelId}
                    inert={!isOpen}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && clearTimers()}
                    className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-[opacity,translate,scale,visibility] duration-200 ease-out ${
                      isOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-1.5 scale-[0.98] opacity-0'
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#121531]/95 p-2 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.75),0_0_0_1px_rgba(118,87,246,0.06)] backdrop-blur-xl ${PANEL_WIDTH[m.key]}`}
                    >
                      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#9a68ff]/60 to-transparent" aria-hidden="true" />
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#7657f6]/20 blur-3xl" aria-hidden="true" />

                      <ul className={`relative grid gap-0.5 ${m.key === 'product' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {m.items.map((item) => {
                          const t = text(item);
                          const href = hrefFor(item);
                          return (
                            <li key={item.label}>
                              <NavItemLink
                                item={item}
                                href={href}
                                label={t.label}
                                description={t.description}
                                active={isActivePath(item.resolved)}
                                onNavigate={() => setOpenMenu(null)}
                              />
                            </li>
                          );
                        })}
                      </ul>

                      {m.key === 'product' && (
                        <div className="relative mt-1.5 flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[13px]">
                          <span className="text-[#9195ae]">
                            {de ? 'Transparente Tarife, kostenlos starten.' : 'Transparent plans. Start for free.'}
                          </span>
                          <span className="flex items-center gap-4">
                            <AppLink href={localHref('/pricing')} className="link-arrow" onClick={() => setOpenMenu(null)}>
                              {copy.nav.pricing}
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </AppLink>
                            <AppLink href={localHref('/book-a-demo')} className="link-arrow" onClick={() => setOpenMenu(null)}>
                              {copy.nav.bookDemo}
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </AppLink>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Login + Get Started */}
        <div className="flex items-center justify-self-end gap-1.5 font-ui sm:gap-2">
          {/* Login keeps the existing application flow (APP_LINKS.login). */}
          <a
            href={APP_LINKS.login}
            className="hidden rounded-lg px-3 py-2 text-[14px] font-medium text-[#b9bcd2] transition-colors duration-200 hover:text-white sm:inline-flex"
          >
            {copy.nav.login}
          </a>
          <a href={APP_LINKS.signUp} className="btn-primary hero-cta-primary px-4 py-2 text-[14px]">
            {copy.nav.getStarted}
            <ArrowRight className="hidden h-3.5 w-3.5 sm:block" aria-hidden="true" />
          </a>

          {/* Animated hamburger (mobile/tablet) */}
          <button
            type="button"
            className="relative ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] cursor-pointer lg:hidden"
            aria-label={mobileOpen ? (de ? 'Menü schließen' : 'Close menu') : de ? 'Menü öffnen' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                  mobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-200 ${
                  mobileOpen ? 'scale-x-0 opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out ${
                  mobileOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: positioned absolute (the header's backdrop-filter makes it the containing block) */}
      <div
        id="mobile-menu"
        inert={!mobileOpen}
        className={`absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/[0.08] bg-[#0b0d1f]/[0.98] backdrop-blur-xl transition-[opacity,translate,visibility] duration-300 ease-out lg:hidden ${
          mobileOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#7657f6]/20 blur-3xl" aria-hidden="true" />
        <nav aria-label={de ? 'Mobile Navigation' : 'Mobile'} className="container-x relative pb-10 pt-4">
          <ul className="divide-y divide-white/[0.06]">
            {menus.map((m, idx) => {
              const expanded = mobileSection === m.key;
              const sectionId = `mobile-section-${m.key}`;
              return (
                <li
                  key={m.key}
                  className={`transition-[opacity,translate] duration-500 ease-out ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                  style={{ transitionDelay: mobileOpen ? `${80 + idx * 50}ms` : '0ms' }}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={sectionId}
                    onClick={() => setMobileSection(expanded ? null : m.key)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-[17px] font-semibold text-white cursor-pointer"
                  >
                    {m.label}
                    <ChevronDown
                      className={`h-4 w-4 text-[#9195ae] transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={sectionId}
                    inert={!expanded}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-1 gap-0.5 pb-3 sm:grid-cols-2">
                        {m.items.map((item) => {
                          const t = text(item);
                          return (
                            <li key={item.label}>
                              <NavItemLink
                                item={item}
                                href={hrefFor(item)}
                                label={t.label}
                                description={t.description}
                                active={isActivePath(item.resolved)}
                                onNavigate={() => setMobileOpen(false)}
                                compact
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div
            className={`mt-6 grid grid-cols-1 gap-3 font-ui transition-[opacity,translate] duration-500 ease-out sm:grid-cols-2 ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: mobileOpen ? `${100 + menus.length * 50}ms` : '0ms' }}
          >
            <a href={APP_LINKS.signUp} className="btn-primary px-4 py-3 text-[15px]">
              {copy.nav.getStarted}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={APP_LINKS.login}
              className="inline-flex items-center justify-center py-3 text-[15px] font-medium text-[#b9bcd2] transition-colors hover:text-white"
            >
              {copy.nav.login}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
