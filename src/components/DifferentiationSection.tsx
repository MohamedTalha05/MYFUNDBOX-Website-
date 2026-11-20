import React, { useEffect, useRef, useState } from 'react';
import { Blocks, ContactRound, Globe, Split, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { DIFFERENTIATION_COPY, type DifferentiatorKey } from '../data/homeContent';
import { Reveal } from './motion';

/*
 * "More than billing" differentiation section. Editorial layout instead of a card grid:
 * a large headline, a pinned "one platform" hub on the left and a numbered list on the right.
 * As each differentiator scrolls through the middle of the viewport (or is hovered/focused),
 * its node on the hub lights up and a pulse runs into the core.
 * Copy describes MYFUNDBOX's own capabilities only (see DIFFERENTIATION_COPY).
 */

const ICONS: Record<DifferentiatorKey, LucideIcon> = {
  unified: Blocks,
  models: Split,
  global: Globe,
  customer: ContactRound,
};

/* ----------------------------------- Hub ---------------------------------- */

const S = 440;
const C = S / 2;
const NODE_DIST = 150;
const NODE_R = 34;
const CORE_R = 58;
/** Top-left, top-right, bottom-right, bottom-left. */
const ANGLES = [-135, -45, 45, 135];

function polar(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

function Hub({ items, active, hubLabel, onSelect }: {
  items: (typeof DIFFERENTIATION_COPY)['en']['items'];
  active: number;
  hubLabel: string;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[27rem]">
      <svg viewBox={`0 0 ${S} ${S}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="diff-core" cx="38%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#3a2f9a" />
            <stop offset="60%" stopColor="#1d1a52" />
            <stop offset="100%" stopColor="#111433" />
          </radialGradient>
          <radialGradient id="diff-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7657f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7657f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="diff-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#b29dff" />
            <stop offset="100%" stopColor="#39d5e8" />
          </linearGradient>
          <filter id="diff-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Orbit rings */}
        <circle cx={C} cy={C} r={NODE_DIST} fill="none" stroke="#b9bcd2" strokeOpacity="0.1" />
        <g className="platform-orbit" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r="200" fill="none" stroke="#b9bcd2" strokeOpacity="0.16" strokeDasharray="2 10" strokeLinecap="round" />
          <circle cx={C + 200} cy={C} r="2.5" fill="#5fe1f0" />
          <circle cx={C - 200} cy={C} r="2" fill="#b29dff" />
        </g>

        {/* Links: node -> core */}
        {ANGLES.map((deg, i) => {
          const from = polar(deg, NODE_DIST - NODE_R - 4);
          const to = polar(deg, CORE_R + 6);
          const d = `M${from.x.toFixed(1)},${from.y.toFixed(1)} L${to.x.toFixed(1)},${to.y.toFixed(1)}`;
          const on = i === active;
          return (
            <g key={deg} className={`diff-link${on ? ' is-active' : ''}`}>
              <path d={d} stroke="#b9bcd2" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5" fill="none" />
              <path
                d={d}
                stroke="url(#diff-edge)"
                strokeWidth="1.6"
                fill="none"
                className="transition-opacity duration-500"
                style={{ opacity: on ? 1 : 0 }}
              />
              <path d={d} stroke="#e6fbff" strokeWidth="2.6" strokeLinecap="round" fill="none" pathLength={1} className="diff-pulse" />
            </g>
          );
        })}

        {/* Core */}
        <circle cx={C} cy={C} r={CORE_R + 40} fill="url(#diff-halo)" className="sec-breathe" />
        <circle cx={C} cy={C} r={CORE_R} fill="url(#diff-core)" stroke="url(#diff-edge)" strokeWidth="1.5" />
        <circle cx={C} cy={C} r={CORE_R - 10} fill="none" stroke="#b29dff" strokeOpacity="0.2" />

        {/* Nodes */}
        {ANGLES.map((deg, i) => {
          const p = polar(deg, NODE_DIST);
          const on = i === active;
          return (
            <g key={deg}>
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R + 6}
                fill={i % 2 === 0 ? '#9a68ff' : '#39d5e8'}
                filter="url(#diff-glow)"
                className="transition-opacity duration-500"
                style={{ opacity: on ? 0.55 : 0 }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill="#14163a"
                stroke={on ? 'url(#diff-edge)' : 'rgba(185,188,210,0.22)'}
                strokeWidth={on ? 1.8 : 1}
              />
            </g>
          );
        })}
      </svg>

      {/* Core label */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="max-w-[6rem] text-center font-display text-[13px] font-semibold leading-tight tracking-[-0.01em] text-white">
          {hubLabel}
        </span>
      </div>

      {/* Node icons + labels (buttons mirror the list for pointer users; list stays the accessible source) */}
      {items.map((item, i) => {
        const Icon = ICONS[item.key];
        const p = polar(ANGLES[i], NODE_DIST);
        const on = i === active;
        const below = ANGLES[i] > 0;
        return (
          <button
            key={item.key}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => onSelect(i)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${(p.x / S) * 100}%`, top: `${(p.y / S) * 100}%` }}
          >
            <span
              className={`flex h-[3.9rem] w-[3.9rem] items-center justify-center rounded-full transition-colors duration-500 ${
                on ? 'text-white' : 'text-[#9195ae] hover:text-[#d9dcec]'
              }`}
            >
              <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </span>
            <span
              className={`absolute whitespace-nowrap font-ui text-[11.5px] font-medium transition-colors duration-500 ${
                below ? 'top-full mt-2' : 'bottom-full mb-2'
              } ${on ? 'text-[#5fe1f0]' : 'text-[#7d819a]'}`}
            >
              {item.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* --------------------------------- Section -------------------------------- */

export function DifferentiationSection() {
  const { locale } = useRouter();
  const copy = DIFFERENTIATION_COPY[locale] ?? DIFFERENTIATION_COPY.en;
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The row crossing the middle band of the viewport becomes active.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="diff-heading"
      className="dark relative overflow-hidden text-ink"
      style={{
        background:
          'radial-gradient(45% 50% at 15% 20%, rgba(118,87,246,0.24) 0%, transparent 70%), radial-gradient(40% 45% at 90% 85%, rgba(57,213,232,0.12) 0%, transparent 70%), linear-gradient(170deg, #0b0d1f 0%, #141339 45%, #1b1850 75%, #0e1128 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-drift absolute left-[30%] top-[35%] h-96 w-96 rounded-full bg-[#7657f6]/[0.14] blur-3xl" />
        <div className="animate-drift-slow absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#39d5e8]/[0.08] blur-3xl" />
        <div className="hero-noise absolute inset-0" />
      </div>
      <div className="hairline-top absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x relative py-20 md:py-28">
        {/* Editorial header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="diff-heading"
              className="mt-5 font-display text-[2.4rem] font-bold leading-[1.02] tracking-[-0.045em] text-white [text-wrap:balance] sm:text-[3rem] lg:text-[4.25rem]"
            >
              <span className="block">{copy.heading[0]}</span>
              <span className="hero-highlight block">{copy.heading[1]}</span>
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-4 lg:pb-3">
            <p className="max-w-md border-l border-[#9a68ff]/40 pl-5 text-[1.0625rem] leading-relaxed text-[#b9bcd2]">{copy.body}</p>
          </Reveal>
        </div>

        {/* Hub + list */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal index={1} className="sticky top-28">
              <Hub items={copy.items} active={active} hubLabel={copy.hubLabel} onSelect={setActive} />
            </Reveal>
          </div>

          <ol className="lg:col-span-7">
            {copy.items.map((item, i) => {
              const Icon = ICONS[item.key];
              const on = i === active;
              return (
                <li
                  key={item.key}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  data-index={i}
                  onMouseEnter={() => setActive(i)}
                  className="group/diff"
                >
                  <Reveal index={0} className="relative py-9 md:py-11">
                    {/* Hairline that draws in on reveal */}
                    <span className="absolute inset-x-0 top-0 h-px bg-white/[0.09]" aria-hidden="true" />
                    <span
                      className="diff-rule absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#9a68ff] via-[#39d5e8]/70 to-transparent transition-opacity duration-500"
                      style={{ opacity: on ? 1 : 0.35 }}
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
                      {/* Numeral: outline, with a gradient fill that fades in when active */}
                      <span className="relative font-display text-[3.25rem] font-bold leading-[0.85] tracking-[-0.05em] md:text-[4.75rem]" aria-hidden="true">
                        <span className="diff-num-outline">{String(i + 1).padStart(2, '0')}</span>
                        <span
                          className="diff-num-fill absolute inset-0 transition-opacity duration-500"
                          style={{ opacity: on ? 1 : 0 }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </span>

                      <div className="min-w-0 pt-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 lg:hidden ${
                              on ? 'border-[#9a68ff]/50 text-[#5fe1f0]' : 'border-white/10 text-[#b29dff]'
                            }`}
                            aria-hidden="true"
                          >
                            <Icon className="h-[17px] w-[17px]" strokeWidth={1.5} />
                          </span>
                          <h3
                            className={`font-display text-[1.45rem] font-semibold tracking-[-0.03em] transition-colors duration-500 md:text-[1.9rem] ${
                              on ? 'text-white' : 'text-[#d9dcec]'
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-[#9ea2bb] md:text-[1.0625rem]">{item.body}</p>
                        <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-ui text-[12.5px] font-medium">
                          {item.tags.map((tag, t) => (
                            <li key={tag} className="flex items-center gap-3">
                              {t > 0 && <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />}
                              <span className={`transition-colors duration-500 ${on ? 'text-[#5fe1f0]' : 'text-[#8a8ea8]'}`}>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
