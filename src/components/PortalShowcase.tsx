import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  CreditCard,
  Download,
  FileText,
  History,
  Layers,
  MoreHorizontal,
  Repeat,
  Settings2,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PORTAL_SHOWCASE_COPY, type PortalFeatureKey } from '../data/homeContent';
import { formatEUR, type LocaleCode } from '../utils/formatting';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal, prefersReducedMotion, useInView } from './motion';

/*
 * Customer self-service ("My Portal") showcase. The mock-up illustrates the existing
 * My Portal: no inputs, no login, no account system of its own. Hovering or selecting
 * a feature on the left highlights the matching area of the preview; while idle, the
 * highlight cycles gently (off for reduced-motion visitors).
 */

const FEATURE_ICONS: Record<PortalFeatureKey, LucideIcon> = {
  subscriptions: Layers,
  billing: History,
  invoices: FileText,
  account: UserRound,
  payment: CreditCard,
  actions: Settings2,
};

const ORDER: PortalFeatureKey[] = ['subscriptions', 'billing', 'invoices', 'account', 'payment', 'actions'];

/** Card in the mock-up that lights up when its feature is active. */
function Region({
  active,
  dimmed,
  className = '',
  children,
}: {
  active: boolean;
  dimmed: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-xl border bg-white p-3.5 transition-all duration-500 ease-out ${
        active
          ? 'z-10 scale-[1.02] border-[#7657f6]/50 shadow-[0_0_0_4px_rgba(118,87,246,0.12),0_18px_36px_-18px_rgba(118,87,246,0.55)]'
          : 'border-[#e7e8f0] shadow-[0_1px_2px_rgba(16,19,41,0.04)]'
      } ${dimmed ? 'opacity-60' : 'opacity-100'} ${className}`}
    >
      {children}
    </div>
  );
}

function RegionTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-1.5 font-ui text-[11.5px] font-semibold text-[#242638]">
      <Icon className="h-3.5 w-3.5 text-[#7657f6]" aria-hidden="true" />
      {children}
    </div>
  );
}

function PortalMockup({ active, locale, label }: { active: PortalFeatureKey | null; locale: LocaleCode; label: string }) {
  const de = locale === 'de';
  const is = (k: PortalFeatureKey) => active === k;
  // The subscription card stays lit for both "subscriptions" and "actions"; only the action buttons glow for "actions".
  const dim = (k: PortalFeatureKey | PortalFeatureKey[]) => {
    if (!active) return false;
    const keys = Array.isArray(k) ? k : [k];
    return !keys.includes(active);
  };

  return (
    <div className="animate-float-slow relative">
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(118,87,246,0.22),transparent_70%)] blur-2xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-2xl border border-white bg-white/70 shadow-[0_40px_80px_-32px_rgba(36,33,90,0.45),0_0_0_1px_rgba(118,87,246,0.08)] backdrop-blur">
        {/* Window bar */}
        <div className="flex items-center justify-between gap-3 border-b border-[#eceefa] bg-white/80 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3e4ee]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3e4ee]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3e4ee]" />
          </div>
          <span className="font-ui text-[11.5px] font-medium text-[#5a5e75]">My Portal</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f2ff] px-2 py-0.5 font-ui text-[10px] font-medium text-[#5f43e9]">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {label}
          </span>
        </div>

        {/* Portal header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#f4f2ff] to-[#eef9fb] px-4 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7657f6] to-[#39d5e8] font-ui text-[11px] font-semibold text-white">
            JM
          </span>
          <div className="min-w-0">
            <div className="font-display text-[14px] font-semibold text-[#101329]">{de ? 'Willkommen zurück, Jamie' : 'Welcome back, Jamie'}</div>
            <div className="font-ui text-[11px] text-[#6b6f86]">{de ? 'Northwind Club · Mitglied' : 'Northwind Club · Member'}</div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-3 bg-[#f8f9fc] p-4 sm:grid-cols-5">
          {/* Left column */}
          <div className="space-y-3 sm:col-span-3">
            <Region active={is('subscriptions')} dimmed={dim(['subscriptions', 'actions'])}>
              <RegionTitle icon={Layers}>{de ? 'Ihr Abonnement' : 'Your subscription'}</RegionTitle>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-[15px] font-semibold text-[#101329]">Membership</div>
                  <div className="mt-0.5 font-ui text-[11px] text-[#6b6f86]">
                    {formatEUR(29, locale, 2)} / {de ? 'Monat' : 'month'} · {de ? 'Nächste Zahlung 1. Dez.' : 'Next payment 1 Dec'}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#20b486]/10 px-2 py-0.5 font-ui text-[10px] font-medium text-[#12865f]">
                  <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  {de ? 'Aktiv' : 'Active'}
                </span>
              </div>
              {/* Subscription actions */}
              <div
                className={`mt-3 flex flex-wrap gap-1.5 rounded-lg p-1 transition-all duration-500 ${
                  is('actions') ? 'bg-[#f4f2ff] shadow-[0_0_0_2px_rgba(118,87,246,0.35)]' : ''
                }`}
              >
                <span className="inline-flex items-center gap-1 rounded-md bg-[image:var(--grad-button)] px-2.5 py-1 font-ui text-[10.5px] font-semibold text-white">
                  <Repeat className="h-3 w-3" aria-hidden="true" />
                  {de ? 'Tarif ändern' : 'Change plan'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#e7e8f0] bg-white px-2.5 py-1 font-ui text-[10.5px] font-medium text-[#4b4f66]">
                  <MoreHorizontal className="h-3 w-3" aria-hidden="true" />
                  {de ? 'Weitere Aktionen' : 'More actions'}
                </span>
              </div>
            </Region>

            <Region active={is('billing')} dimmed={dim('billing')}>
              <RegionTitle icon={History}>{de ? 'Zahlungshistorie' : 'Billing history'}</RegionTitle>
              <ul className="divide-y divide-[#f0f1f6] font-ui text-[11px]">
                {[de ? '1. Nov. 2026' : '1 Nov 2026', de ? '1. Okt. 2026' : '1 Oct 2026', de ? '1. Sep. 2026' : '1 Sep 2026'].map((d) => (
                  <li key={d} className="flex items-center justify-between py-1.5">
                    <span className="text-[#4b4f66]">{d}</span>
                    <span className="tabular-nums text-[#101329]">{formatEUR(29, locale, 2)}</span>
                    <span className="inline-flex items-center gap-1 text-[#12865f]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      {de ? 'Bezahlt' : 'Paid'}
                    </span>
                  </li>
                ))}
              </ul>
            </Region>
          </div>

          {/* Right column */}
          <div className="space-y-3 sm:col-span-2">
            <Region active={is('payment')} dimmed={dim('payment')}>
              <RegionTitle icon={CreditCard}>{de ? 'Zahlungsmethode' : 'Payment method'}</RegionTitle>
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#24215a] to-[#101329] p-3 text-white">
                <span className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#39d5e8]/25 blur-xl" aria-hidden="true" />
                <div className="font-ui text-[10px] text-white/60">{de ? 'Karte' : 'Card'}</div>
                <div className="mt-1 font-ui text-[12px] tracking-[0.12em] tabular-nums">•••• 4242</div>
                <div className="mt-1 font-ui text-[9.5px] text-white/60">08/28</div>
              </div>
              <span
                className={`mt-2 inline-flex w-full items-center justify-center rounded-md border px-2 py-1 font-ui text-[10.5px] font-medium transition-colors duration-500 ${
                  is('payment') ? 'border-transparent bg-[image:var(--grad-button)] text-white' : 'border-[#e7e8f0] text-[#5f43e9]'
                }`}
              >
                {de ? 'Aktualisieren' : 'Update'}
              </span>
            </Region>

            <Region active={is('invoices')} dimmed={dim('invoices')}>
              <RegionTitle icon={FileText}>{de ? 'Rechnungen' : 'Invoices'}</RegionTitle>
              <ul className="space-y-1.5 font-ui text-[10.5px]">
                {['INV-2026-011', 'INV-2026-010'].map((n) => (
                  <li key={n} className="flex items-center justify-between rounded-md bg-[#f8f9fc] px-2 py-1.5">
                    <span className="inline-flex items-center gap-1.5 text-[#242638]">
                      <FileText className="h-3 w-3 text-[#9a9db2]" aria-hidden="true" />
                      {n}
                    </span>
                    <Download className={`h-3.5 w-3.5 transition-colors duration-500 ${is('invoices') ? 'text-[#0f8fa1]' : 'text-[#9a9db2]'}`} aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </Region>

            <Region active={is('account')} dimmed={dim('account')}>
              <RegionTitle icon={UserRound}>{de ? 'Konto' : 'Account'}</RegionTitle>
              <dl className="space-y-1 font-ui text-[10.5px]">
                <div className="flex justify-between gap-2">
                  <dt className="text-[#9a9db2]">{de ? 'Name' : 'Name'}</dt>
                  <dd className="truncate text-[#242638]">Jamie Morgan</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#9a9db2]">E-Mail</dt>
                  <dd className="truncate text-[#242638]">jamie@example.com</dd>
                </div>
              </dl>
            </Region>
          </div>
        </div>
      </div>

      {/* Floating confirmation tied to the "payment" interaction */}
      <div
        className={`absolute -left-6 bottom-16 hidden items-center gap-2 rounded-xl border border-white bg-white/95 px-3 py-2 shadow-[0_18px_36px_-16px_rgba(36,33,90,0.45)] backdrop-blur transition-all duration-500 sm:flex ${
          is('payment') ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
        aria-hidden="true"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#20b486]/12 text-[#12865f]">
          <Check className="h-3.5 w-3.5" />
        </span>
        <span className="font-ui text-[11.5px] font-medium text-[#242638]">{de ? 'Zahlungsdaten aktualisiert' : 'Payment details updated'}</span>
      </div>
    </div>
  );
}

export function PortalShowcase() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = PORTAL_SHOWCASE_COPY[locale];
  const [active, setActive] = useState<PortalFeatureKey>('subscriptions');
  const [interacted, setInteracted] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();
  const ctaHref = resolveNavHref({ href: '/customer-portal', fallbackHref: '/product' });

  // Gentle auto-cycle while the section is visible and the visitor hasn't interacted.
  useEffect(() => {
    if (!inView || interacted || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setActive((cur) => ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length]);
    }, 3200);
    return () => window.clearInterval(id);
  }, [inView, interacted]);

  const select = (k: PortalFeatureKey) => {
    setInteracted(true);
    setActive(k);
  };

  return (
    <section aria-labelledby="portal-heading" className="relative overflow-hidden bg-lavender-wash py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 grid-pattern-light opacity-60" aria-hidden="true" />
      <div ref={ref} className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left: copy + features */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="portal-heading"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
            >
              {copy.heading}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
          </Reveal>

          <ul className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {copy.features.map((f, i) => {
              const Icon = FEATURE_ICONS[f.key];
              const on = active === f.key;
              return (
                <Reveal as="li" key={f.key} index={i}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => select(f.key)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && select(f.key)}
                    onFocus={() => select(f.key)}
                    className={`group/pf flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 cursor-pointer ${
                      on
                        ? 'border-[#7657f6]/25 bg-white shadow-[0_10px_24px_-16px_rgba(36,33,90,0.45)] dark:bg-surface'
                        : 'border-transparent hover:bg-white/60 dark:hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        on ? 'bg-[image:var(--grad-button)] text-white' : 'bg-white text-[#7657f6] shadow-[0_1px_2px_rgba(16,19,41,0.06)] dark:bg-white/5 dark:text-[#b29dff]'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[15px] font-semibold tracking-[-0.015em] text-[#242638] dark:text-ink">{f.title}</span>
                      <span className="mt-0.5 block text-[13.5px] leading-snug text-[#5a5e75] dark:text-muted">{f.body}</span>
                    </span>
                    {on && <span className="ml-auto mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d5e8] shadow-[0_0_0_4px_rgba(57,213,232,0.2)]" aria-hidden="true" />}
                  </button>
                </Reveal>
              );
            })}
          </ul>

          {ctaHref && (
            <Reveal index={3} className="mt-9">
              <AppLink href={localHref(ctaHref)} className="btn-primary hero-cta-primary px-6 py-3.5 font-ui text-[15px]">
                {copy.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AppLink>
            </Reveal>
          )}
        </div>

        {/* Right: portal preview */}
        <Reveal index={1} className="lg:col-span-7" aria-hidden="true">
          <PortalMockup active={active} locale={locale} label={copy.previewLabel} />
        </Reveal>
      </div>
    </section>
  );
}
