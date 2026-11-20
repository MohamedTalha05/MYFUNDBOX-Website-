import React, { useMemo } from 'react';
import { ArrowLeftRight, Coins, CreditCard, Globe2, LayoutDashboard, Plug, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { BRAND_MARKS } from '../data/brandMarks';
import { GLOBAL_PAYMENTS_COPY, type GlobalCapabilityIcon } from '../data/homeContent';
import { ECOSYSTEM_ITEMS } from '../data/integrationsEcosystem';
import { Reveal } from './motion';

/*
 * Global payments section with a hand-built globe (orthographic projection, no map data).
 * Pins sit at real coordinates but only mark examples backed by the live site:
 * Frankfurt hosting, SEPA/iDEAL in Europe, ACH in the US and Instamojo in India.
 * No country/currency counts are shown (see GLOBAL_PAYMENTS_COPY note).
 */

const ICONS: Record<GlobalCapabilityIcon, LucideIcon> = {
  gateways: Plug,
  methods: CreditCard,
  currencies: Coins,
  global: Globe2,
  central: LayoutDashboard,
};

/* ------------------------------ Globe geometry ----------------------------- */

const SIZE = 440;
const C = SIZE / 2;
const R = 170;
const LAT0 = (28 * Math.PI) / 180; // view centre
const LNG0 = (12 * Math.PI) / 180;
const rad = (d: number) => (d * Math.PI) / 180;

/** Orthographic projection. k > 1 lifts a point above the surface (for arcs). */
function project(latDeg: number, lngDeg: number, k = 1) {
  const phi = rad(latDeg);
  const dl = rad(lngDeg) - LNG0;
  const x = R * k * Math.cos(phi) * Math.sin(dl);
  const y = R * k * (Math.cos(LAT0) * Math.sin(phi) - Math.sin(LAT0) * Math.cos(phi) * Math.cos(dl));
  const z = Math.sin(LAT0) * Math.sin(phi) + Math.cos(LAT0) * Math.cos(phi) * Math.cos(dl);
  return { x: C + x, y: C - y, visible: z > 0.02 };
}

/** Polyline through visible samples, breaking where the line goes behind the globe. */
function linePath(samples: [number, number][]): string {
  let d = '';
  let pen = false;
  for (const [lat, lng] of samples) {
    const p = project(lat, lng);
    if (!p.visible) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    pen = true;
  }
  return d;
}

function toVec(lat: number, lng: number): [number, number, number] {
  const p = rad(lat);
  const l = rad(lng);
  return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
}

/** Great-circle arc from a to b, lifted towards the middle. */
function arcPath(a: [number, number], b: [number, number], lift = 0.22): string {
  const va = toVec(...a);
  const vb = toVec(...b);
  const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  const omega = Math.acos(dot);
  const N = 48;
  let d = '';
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
    const s2 = Math.sin(t * omega) / Math.sin(omega);
    const v = [s1 * va[0] + s2 * vb[0], s1 * va[1] + s2 * vb[1], s1 * va[2] + s2 * vb[2]];
    const lat = (Math.asin(v[2]) * 180) / Math.PI;
    const lng = (Math.atan2(v[1], v[0]) * 180) / Math.PI;
    const p = project(lat, lng, 1 + lift * Math.sin(Math.PI * t));
    d += `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }
  return d;
}

const PINS = {
  frankfurt: [50.11, 8.68] as [number, number],
  europe: [52.37, 4.9] as [number, number],
  us: [40.71, -74.0] as [number, number],
  india: [19.07, 72.88] as [number, number],
};

/** Label placement relative to each pin (percent offsets and alignment). */
const LABEL_POS: Record<keyof typeof PINS, { dx: number; dy: number; align: 'left' | 'right' }> = {
  frankfurt: { dx: 3, dy: 5.5, align: 'left' },
  europe: { dx: -2.5, dy: -6, align: 'right' },
  us: { dx: 2.5, dy: 4.5, align: 'left' },
  india: { dx: 2.5, dy: 3.5, align: 'left' },
};

function Globe({ labels, caption }: { labels: Record<keyof typeof PINS, string>; caption: string }) {
  const geo = useMemo(() => {
    const parallels: string[] = [];
    for (let lat = -60; lat <= 80; lat += 20) {
      const s: [number, number][] = [];
      for (let lng = -180; lng <= 180; lng += 3) s.push([lat, lng]);
      parallels.push(linePath(s));
    }
    const meridians: string[] = [];
    for (let lng = -180; lng < 180; lng += 20) {
      const s: [number, number][] = [];
      for (let lat = -88; lat <= 88; lat += 3) s.push([lat, lng]);
      meridians.push(linePath(s));
    }
    const pins = Object.fromEntries(Object.entries(PINS).map(([k, [lat, lng]]) => [k, project(lat, lng)])) as Record<
      keyof typeof PINS,
      ReturnType<typeof project>
    >;
    const arcs = (['europe', 'us', 'india'] as const).map((k) => ({ key: k, d: arcPath(PINS.frankfurt, PINS[k], k === 'europe' ? 0.08 : 0.22) }));
    return { parallels, meridians, pins, arcs };
  }, []);

  return (
    <figure className="globe relative mx-auto w-full max-w-[34rem]">
      <div className="relative aspect-square">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="gp-sphere" cx="38%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#2a2470" />
              <stop offset="55%" stopColor="#171640" />
              <stop offset="100%" stopColor="#0d1024" />
            </radialGradient>
            <radialGradient id="gp-halo" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#7657f6" stopOpacity="0" />
              <stop offset="86%" stopColor="#7657f6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#39d5e8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gp-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9a68ff" />
              <stop offset="100%" stopColor="#39d5e8" />
            </linearGradient>
            <filter id="gp-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Atmosphere + sphere */}
          <circle cx={C} cy={C} r={R + 28} fill="url(#gp-halo)" />
          <circle cx={C} cy={C} r={R} fill="url(#gp-sphere)" stroke="rgba(178,157,255,0.35)" strokeWidth="1" />

          {/* Latitude / longitude grid (front side only) */}
          <g fill="none" stroke="#b9bcd2" strokeWidth="0.6" strokeOpacity="0.16">
            {geo.parallels.map((d, i) => (
              <path key={`p${i}`} d={d} />
            ))}
            {geo.meridians.map((d, i) => (
              <path key={`m${i}`} d={d} />
            ))}
          </g>
          {/* Terminator-style sheen */}
          <circle cx={C - 50} cy={C - 60} r={R * 0.75} fill="#9a68ff" opacity="0.06" filter="url(#gp-glow)" />

          {/* Connection arcs from Frankfurt */}
          {geo.arcs.map((a, i) => (
            <g key={a.key} style={{ ['--i' as string]: i } as React.CSSProperties}>
              <path d={a.d} fill="none" stroke="url(#gp-arc)" strokeWidth="1.6" strokeLinecap="round" pathLength={1} className="globe-arc" opacity="0.9" />
              <path d={a.d} fill="none" stroke="#e6fbff" strokeWidth="2.2" strokeLinecap="round" pathLength={1} className="globe-pulse" />
            </g>
          ))}

          {/* Glowing connection points */}
          {(Object.keys(PINS) as (keyof typeof PINS)[]).map((k, i) => {
            const p = geo.pins[k];
            if (!p.visible) return null;
            const hub = k === 'frankfurt';
            return (
              <g key={k} className="globe-pin" style={{ ['--i' as string]: i } as React.CSSProperties}>
                <circle cx={p.x} cy={p.y} r={hub ? 14 : 10} fill={hub ? '#9a68ff' : '#39d5e8'} opacity="0.45" filter="url(#gp-glow)" />
                <circle cx={p.x} cy={p.y} r={hub ? 9 : 7} fill="none" stroke={hub ? '#b29dff' : '#5fe1f0'} strokeWidth="1" className="globe-ring" />
                <circle cx={p.x} cy={p.y} r={hub ? 4.2 : 3.2} fill={hub ? '#ffffff' : '#e6fbff'} />
              </g>
            );
          })}
        </svg>

        {/* Pin labels */}
        {(Object.keys(PINS) as (keyof typeof PINS)[]).map((k, i) => {
          const p = geo.pins[k];
          if (!p.visible) return null;
          const pos = LABEL_POS[k];
          const left = (p.x / SIZE) * 100 + pos.dx;
          const top = (p.y / SIZE) * 100 + pos.dy;
          return (
            <span
              key={k}
              className={`globe-label absolute whitespace-nowrap rounded-full border border-white/10 bg-[#121531]/85 px-2.5 py-1 font-ui text-[11px] font-medium text-[#d9dcec] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md ${
                pos.align === 'right' ? '-translate-x-full' : ''
              } ${k === 'frankfurt' ? 'text-white' : ''}`}
              style={{ left: `${left}%`, top: `${top}%`, ['--i' as string]: i } as React.CSSProperties}
            >
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${k === 'frankfurt' ? 'bg-[#b29dff]' : 'bg-[#5fe1f0]'}`} aria-hidden="true" />
              {labels[k]}
            </span>
          );
        })}
      </div>
      <figcaption className="mt-3 text-center font-ui text-[11.5px] text-[#9195ae]">{caption}</figcaption>
    </figure>
  );
}

/* --------------------------------- Section -------------------------------- */

export function GlobalPayments() {
  const { locale } = useRouter();
  const copy = GLOBAL_PAYMENTS_COPY[locale];
  const gateways = ECOSYSTEM_ITEMS.filter((i) => i.group === 'payments' && i.show !== false);

  return (
    <section
      aria-labelledby="global-heading"
      className="dark relative overflow-hidden text-ink"
      style={{
        background:
          'radial-gradient(55% 60% at 75% 45%, rgba(118,87,246,0.22) 0%, transparent 70%), radial-gradient(35% 40% at 10% 90%, rgba(57,213,232,0.10) 0%, transparent 70%), linear-gradient(180deg, #0b0d1f 0%, #101329 60%, #141339 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
      <div className="hairline-top absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x relative grid grid-cols-1 items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        {/* Copy + capabilities */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="global-heading"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-white md:text-[2.75rem]"
            >
              {copy.heading}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[#b9bcd2] md:text-lg">{copy.body}</p>
          </Reveal>

          <ul className="mt-9 space-y-1">
            {copy.capabilities.map((cap, i) => {
              const Icon = ICONS[cap.icon];
              return (
                <Reveal
                  as="li"
                  key={cap.title}
                  index={i}
                  className="group/gl flex items-start gap-4 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-white/[0.04]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#b29dff] transition-all duration-300 group-hover/gl:border-transparent group-hover/gl:bg-[image:var(--grad-button)] group-hover/gl:text-white" aria-hidden="true">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block font-display text-[15.5px] font-semibold tracking-[-0.015em] text-white">{cap.title}</span>
                    <span className="mt-0.5 block text-[14px] leading-relaxed text-[#9195ae]">{cap.body}</span>
                  </span>
                </Reveal>
              );
            })}
          </ul>

          {/* Gateway logos */}
          <Reveal index={2} className="mt-9 border-t border-white/[0.08] pt-6">
            <p className="font-ui text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#9195ae]">{copy.gatewaysLabel}</p>
            <ul className="mt-4 flex flex-wrap items-center gap-2.5">
              {gateways.map((g) => {
                const mark = g.mark ? BRAND_MARKS[g.mark] : null;
                return (
                  <li
                    key={g.name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 text-[#c9cbe0] transition-colors duration-300 hover:border-[#9a68ff]/40 hover:text-white"
                  >
                    {mark && (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                        <path d={mark.path} />
                      </svg>
                    )}
                    <span className="font-display text-[13.5px] font-semibold tracking-[-0.01em]">{g.name}</span>
                  </li>
                );
              })}
              <li className="inline-flex items-center gap-1.5 px-1 font-ui text-[13px] text-[#9195ae]">
                <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
                {copy.andMore}
              </li>
            </ul>
            <p className="mt-5 max-w-lg font-ui text-[12px] leading-relaxed text-[#9195ae]">{copy.note}</p>
          </Reveal>
        </div>

        {/* Globe */}
        <Reveal index={1} className="lg:col-span-6">
          <Globe labels={copy.pins} caption={copy.mapCaption} />
        </Reveal>
      </div>
    </section>
  );
}
