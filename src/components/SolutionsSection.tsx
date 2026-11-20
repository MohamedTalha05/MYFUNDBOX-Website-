import React from 'react';
import { ArrowRight, CreditCard, Link2, Repeat, ShoppingBag } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { NAV_MENUS } from '../data/siteConfig';
import { SOLUTIONS_SECTION_COPY, type SolutionKey } from '../data/homeContent';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * Industry solutions: three large cards, each with an abstract illustration on a deep-navy
 * preview panel. Links reuse the Solutions entries of NAV_MENUS, so every card points at its
 * planned SEO landing page (with a fallback until that page exists).
 */

const SOLUTION_ITEMS = NAV_MENUS.find((m) => m.key === 'solutions')?.items ?? [];

/* ------------------------------ Illustrations ------------------------------ */

/** Plan tiers rising, with an upgrade trend line. */
function SaasIllustration({ de }: { de: boolean }) {
  const tiers = [
    { name: 'Starter', h: 38 },
    { name: 'Pro', h: 60 },
    { name: 'Business', h: 84 },
  ];
  return (
    <div className="relative flex h-full items-end justify-center gap-3 px-8 pb-7">
      {tiers.map((t, i) => (
        <div key={t.name} className="flex w-[4.75rem] flex-col items-center gap-2">
          <div
            className="relative w-full origin-bottom overflow-hidden rounded-t-xl border border-white/10 bg-gradient-to-t from-white/[0.03] to-white/[0.09] transition-transform duration-700 ease-out group-hover/sol:scale-y-[1.06]"
            style={{ height: `${t.h * 1.25}px`, transitionDelay: `${i * 70}ms` }}
          >
            <span className={`absolute inset-x-0 top-0 h-1 ${i === 2 ? 'bg-gradient-to-r from-[#9a68ff] to-[#39d5e8]' : 'bg-[#9a68ff]/50'}`} />
          </div>
          <span className="font-ui text-[10.5px] font-medium text-[#b9bcd2]">{t.name}</span>
        </div>
      ))}
      {/* Upgrade trend */}
      <svg viewBox="0 0 260 120" className="pointer-events-none absolute inset-x-8 top-6 h-[7.5rem] w-[calc(100%-4rem)]" aria-hidden="true">
        <defs>
          <linearGradient id="sol-saas-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9a68ff" />
            <stop offset="100%" stopColor="#39d5e8" />
          </linearGradient>
        </defs>
        <path d="M18,100 C80,92 110,70 140,58 S220,22 246,14" fill="none" stroke="url(#sol-saas-line)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" />
        <circle cx="246" cy="14" r="4" fill="#39d5e8" />
        <circle cx="246" cy="14" r="9" fill="#39d5e8" opacity="0.2" />
      </svg>
      <span className="absolute right-6 top-5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-ui text-[10.5px] font-medium text-[#5fe1f0] backdrop-blur">
        {de ? 'Upgrade' : 'Upgrade'} ↑
      </span>
    </div>
  );
}

/** A renewal cycle: twelve billing periods around a ring. */
function SubscriptionIllustration({ de }: { de: boolean }) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 100 + Math.cos(a) * 72, y: 100 + Math.sin(a) * 72, done: i < 9 };
  });
  return (
    <div className="relative flex h-full items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-[13rem] w-[13rem] transition-transform duration-[1400ms] ease-out group-hover/sol:rotate-[30deg]" aria-hidden="true">
        <defs>
          <linearGradient id="sol-sub-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9a68ff" />
            <stop offset="100%" stopColor="#39d5e8" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <circle
          cx="100"
          cy="100"
          r="72"
          fill="none"
          stroke="url(#sol-sub-ring)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 72 * 0.75} ${2 * Math.PI * 72}`}
          transform="rotate(-90 100 100)"
        />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={i === 8 ? 5 : 3.2} fill={d.done ? (i === 8 ? '#39d5e8' : '#b29dff') : 'rgba(255,255,255,0.18)'} />
        ))}
      </svg>
      {/* Centre (doesn't rotate) */}
      <div className="absolute flex flex-col items-center gap-1.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[image:var(--grad-button)] text-white shadow-[0_10px_24px_-8px_rgba(118,87,246,0.8)]">
          <Repeat className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="font-ui text-[10.5px] font-medium text-[#b9bcd2]">{de ? 'Automatische Verlängerung' : 'Auto-renewal'}</span>
      </div>
    </div>
  );
}

/** Flexible payment models orbiting a checkout card. */
function DigitalIllustration({ de }: { de: boolean }) {
  const chips = [
    { label: de ? 'Einmalig' : 'One-time', icon: ShoppingBag, pos: 'left-5 top-7', shift: 'group-hover/sol:-translate-x-1.5 group-hover/sol:-translate-y-1' },
    { label: de ? 'Abonnement' : 'Subscription', icon: Repeat, pos: 'right-5 top-10', shift: 'group-hover/sol:translate-x-1.5 group-hover/sol:-translate-y-1' },
    { label: de ? 'Zahlungslink' : 'Pay link', icon: Link2, pos: 'bottom-6 left-1/2 -translate-x-1/2', shift: 'group-hover/sol:translate-y-1.5' },
  ];
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 300 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="url(#sol-dig-line)" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.7">
          <path d="M70,52 C110,60 120,90 150,104" />
          <path d="M236,72 C200,80 185,95 150,104" />
          <path d="M150,180 C150,160 150,130 150,118" />
        </g>
        <defs>
          <linearGradient id="sol-dig-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9a68ff" />
            <stop offset="100%" stopColor="#39d5e8" />
          </linearGradient>
        </defs>
      </svg>
      {/* Checkout card */}
      <div className="absolute left-1/2 top-1/2 w-[9.5rem] -translate-x-1/2 -translate-y-[58%] rounded-xl border border-white/10 bg-[#1a1c44]/90 p-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur transition-transform duration-500 group-hover/sol:scale-[1.03]">
        <div className="flex items-center gap-1.5 font-ui text-[10px] text-[#9195ae]">
          <CreditCard className="h-3 w-3 text-[#b29dff]" aria-hidden="true" />
          Checkout
        </div>
        <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/15" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/10" />
        <div className="mt-3 rounded-md bg-[image:var(--grad-button)] py-1 text-center font-ui text-[9.5px] font-semibold text-white">
          {de ? 'Bezahlen' : 'Pay'}
        </div>
      </div>
      {chips.map((c) => {
        const Icon = c.icon;
        return (
          <span
            key={c.label}
            className={`absolute ${c.pos} inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-ui text-[10.5px] font-medium text-[#d9dcec] backdrop-blur transition-transform duration-500 ease-out ${c.shift}`}
          >
            <Icon className="h-3 w-3 text-[#5fe1f0]" aria-hidden="true" />
            {c.label}
          </span>
        );
      })}
    </div>
  );
}

const ILLUSTRATIONS: Record<SolutionKey, React.ComponentType<{ de: boolean }>> = {
  saas: SaasIllustration,
  subscriptionBusiness: SubscriptionIllustration,
  digital: DigitalIllustration,
};

/* --------------------------------- Section -------------------------------- */

export function SolutionsSection() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = SOLUTIONS_SECTION_COPY[locale];
  const de = locale === 'de';

  return (
    <section aria-labelledby="solutions-heading" className="relative overflow-hidden py-20 md:py-28">
      {/* Elegant background: soft violet/cyan light on cloud white */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#f8f9fc] dark:bg-canvas" />
        <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[#7657f6]/[0.09] blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#39d5e8]/[0.10] blur-3xl" />
        <div className="grid-pattern-light absolute inset-0 opacity-60" />
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="solutions-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.cards.map((card, i) => {
            const Illustration = ILLUSTRATIONS[card.key];
            const item = SOLUTION_ITEMS.find((s) => s.icon === card.key);
            const href = item ? resolveNavHref(item) : null;
            return (
              <Reveal
                as="li"
                key={card.key}
                index={i}
                className="group/sol relative flex flex-col overflow-hidden rounded-3xl border border-[#e7e8f0] bg-white p-2 shadow-[0_1px_2px_rgba(16,19,41,0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(36,33,90,0.55)] dark:border-line dark:bg-surface"
              >
                {/* Gradient border on hover */}
                <span className="sol-border pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover/sol:opacity-100" aria-hidden="true" />

                {/* Visual preview */}
                <div
                  className="relative h-60 overflow-hidden rounded-[1.25rem]"
                  style={{
                    background:
                      i === 0
                        ? 'radial-gradient(80% 70% at 20% 0%, rgba(118,87,246,0.45), transparent 70%), linear-gradient(160deg, #15143d 0%, #101329 100%)'
                        : i === 1
                          ? 'radial-gradient(70% 70% at 50% 50%, rgba(118,87,246,0.35), transparent 70%), linear-gradient(160deg, #101329 0%, #1b1850 100%)'
                          : 'radial-gradient(80% 70% at 80% 100%, rgba(57,213,232,0.25), transparent 70%), linear-gradient(160deg, #101329 0%, #15143d 100%)',
                  }}
                  aria-hidden="true"
                >
                  <div className="grid-pattern absolute inset-0 opacity-50" />
                  <Illustration de={de} />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
                  <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.025em] text-[#242638] dark:text-ink">{card.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#5a5e75] dark:text-muted">{card.body}</p>
                  {href && (
                    <AppLink
                      href={localHref(href)}
                      className="link-arrow mt-auto pt-6 font-ui text-[14.5px] after:absolute after:inset-0 after:content-['']"
                    >
                      {copy.linkLabel}
                      <span className="sr-only">: {card.title}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </AppLink>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
