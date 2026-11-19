import React, { useState } from 'react';
import { ArrowRight, BarChart3, CreditCard, Receipt, RefreshCw, Repeat, Users, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PLATFORM_INTRO_COPY, type PlatformModuleKey } from '../data/homeContent';
import { BrandLogo } from './BrandLogo';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * Platform introduction: MYFUNDBOX core in the centre, six modules around it, joined by
 * violet→cyan connection lines that draw in on scroll, followed by a few soft data pulses.
 *
 * Geometry lives in a 1000×560 coordinate space. From lg up, the SVG lines and the
 * absolutely-positioned module cards share it; below lg, the same list becomes a grid.
 */

const W = 1000;
const H = 560;
const CX = 500;
const CY = 280;
const LEFT_EDGE = 262; // right edge of the left-hand cards
const RIGHT_EDGE = 738; // left edge of the right-hand cards

const LAYOUT: Record<PlatformModuleKey, { side: 'left' | 'right'; y: number }> = {
  subscriptions: { side: 'left', y: 85 },
  billing: { side: 'left', y: 280 },
  payments: { side: 'left', y: 475 },
  customers: { side: 'right', y: 85 },
  dunning: { side: 'right', y: 280 },
  analytics: { side: 'right', y: 475 },
};

const ICONS: Record<PlatformModuleKey, LucideIcon> = {
  subscriptions: Repeat,
  billing: Receipt,
  payments: CreditCard,
  customers: Users,
  dunning: RefreshCw,
  analytics: BarChart3,
};

function connector(key: PlatformModuleKey): { d: string; end: [number, number] } {
  const { side, y } = LAYOUT[key];
  const ex = side === 'left' ? LEFT_EDGE : RIGHT_EDGE;
  const mx = side === 'left' ? 375 : 625;
  return { d: `M${CX},${CY} C${mx},${CY} ${mx},${y} ${ex},${y}`, end: [ex, y] };
}

export function PlatformIntro({
  id,
  exploreHref,
  className = '',
}: {
  id?: string;
  exploreHref: string;
  className?: string;
}) {
  const { locale } = useRouter();
  const copy = PLATFORM_INTRO_COPY[locale];
  const [active, setActive] = useState<PlatformModuleKey | null>(null);

  return (
    <section
      id={id}
      aria-labelledby="platform-intro-heading"
      className={`dark relative scroll-mt-16 overflow-hidden text-ink ${className}`}
      style={{
        background:
          'radial-gradient(60% 55% at 50% 55%, rgba(118,87,246,0.22) 0%, transparent 70%), radial-gradient(40% 40% at 85% 10%, rgba(57,213,232,0.10) 0%, transparent 70%), linear-gradient(180deg, #0d1024 0%, #15143d 55%, #1b1850 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />

      <div className="container-x relative py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="platform-intro-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-white md:text-[3rem]"
          >
            {copy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#b9bcd2] md:text-lg">{copy.body}</p>
        </Reveal>

        {/* Hub diagram */}
        <Reveal index={1} className="platform-hub relative mx-auto mt-14 max-w-5xl lg:mt-16 lg:aspect-[1000/560]">
          {/* Connection lines (lg+) */}
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pl-grad-left" gradientUnits="userSpaceOnUse" x1={CX} y1="0" x2={LEFT_EDGE} y2="0">
                <stop offset="0%" stopColor="#9a68ff" />
                <stop offset="100%" stopColor="#39d5e8" />
              </linearGradient>
              <linearGradient id="pl-grad-right" gradientUnits="userSpaceOnUse" x1={CX} y1="0" x2={RIGHT_EDGE} y2="0">
                <stop offset="0%" stopColor="#9a68ff" />
                <stop offset="100%" stopColor="#39d5e8" />
              </linearGradient>
              <filter id="pl-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {copy.modules.map((m, i) => {
              const { d, end } = connector(m.key);
              const grad = LAYOUT[m.key].side === 'left' ? 'url(#pl-grad-left)' : 'url(#pl-grad-right)';
              const isActive = active === m.key;
              const style = { ['--i' as string]: i } as React.CSSProperties;
              return (
                <g key={m.key}>
                  {/* base line */}
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke={grad}
                    strokeWidth={isActive ? 2 : 1.25}
                    strokeOpacity={active && !isActive ? 0.25 : isActive ? 1 : 0.55}
                    vectorEffect="non-scaling-stroke"
                    className="platform-line transition-[stroke-opacity,stroke-width] duration-300"
                    style={style}
                  />
                  {/* travelling pulse */}
                  <path
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="#cfe9ff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="platform-pulse"
                    style={style}
                  />
                  {/* glowing end node */}
                  <g className="platform-node" style={style}>
                    <circle cx={end[0]} cy={end[1]} r={isActive ? 9 : 7} fill="#39d5e8" opacity={0.45} filter="url(#pl-glow)" />
                    <circle cx={end[0]} cy={end[1]} r={3.5} fill="#e6fbff" />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Core */}
          <div className="relative mx-auto mb-10 flex h-52 w-52 items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:h-auto lg:w-[24%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:aspect-square">
            {/* slowly rotating orbit */}
            <svg viewBox="0 0 100 100" className="platform-orbit absolute inset-0 h-full w-full" aria-hidden="true">
              <circle cx="50" cy="50" r="48" fill="none" stroke="url(#pl-orbit-grad)" strokeWidth="0.6" strokeDasharray="1.5 3" />
              <defs>
                <linearGradient id="pl-orbit-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9a68ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#39d5e8" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
            <span className="platform-core-ripple absolute inset-[8%] rounded-full border border-[#9a68ff]/40" aria-hidden="true" />
            <span className="absolute inset-[12%] rounded-full bg-[#7657f6]/35 blur-2xl" aria-hidden="true" />
            <div className="relative flex h-[76%] w-[76%] flex-col items-center justify-center gap-2 rounded-full border border-white/15 bg-[radial-gradient(circle_at_35%_30%,#3a2f8f_0%,#24215a_45%,#141238_100%)] shadow-[0_0_0_1px_rgba(118,87,246,0.25),0_20px_60px_-10px_rgba(118,87,246,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]">
              <BrandLogo className="h-[13px] w-auto" />
              <span className="font-ui text-[10.5px] font-medium uppercase tracking-[0.18em] text-[#b29dff]">{copy.coreLabel}</span>
            </div>
          </div>

          {/* Mobile connector into the grid */}
          <span className="mx-auto -mt-6 mb-4 block h-8 w-px bg-gradient-to-b from-[#9a68ff] to-[#39d5e8]/0 lg:hidden" aria-hidden="true" />

          {/* Modules */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:block">
            {copy.modules.map((m, i) => {
              const Icon = ICONS[m.key];
              const { side, y } = LAYOUT[m.key];
              const pos = {
                ['--x' as string]: side === 'left' ? '13.5%' : '86.5%',
                ['--y' as string]: `${(y / H) * 100}%`,
                ['--i' as string]: i,
              } as React.CSSProperties;
              return (
                <li
                  key={m.key}
                  style={pos}
                  className="platform-module lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[25%] lg:-translate-x-1/2 lg:-translate-y-1/2"
                  onPointerEnter={() => setActive(m.key)}
                  onPointerLeave={() => setActive(null)}
                >
                  <div
                    className={`group/mod flex items-start gap-3 rounded-2xl border bg-[#141739]/85 p-4 backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 ${
                      active === m.key
                        ? '-translate-y-0.5 border-[#9a68ff]/50 shadow-[0_16px_40px_-16px_rgba(118,87,246,0.75)]'
                        : 'border-white/[0.09]'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        active === m.key
                          ? 'border-transparent bg-[image:var(--grad-button)] text-white'
                          : 'border-white/10 bg-white/[0.05] text-[#b29dff]'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[15px] font-semibold tracking-[-0.015em] text-white">{m.title}</h3>
                      <p className="mt-0.5 text-[13px] leading-snug text-[#9195ae]">{m.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal index={2} className="mt-14 flex justify-center lg:mt-16">
          <AppLink href={exploreHref} className="btn-light hero-cta-primary px-6 py-3.5 font-ui text-[15px]">
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AppLink>
        </Reveal>
      </div>

      <div className="hairline-top absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
