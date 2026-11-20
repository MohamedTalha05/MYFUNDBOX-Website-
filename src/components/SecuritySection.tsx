import React from 'react';
import { KeyRound, LockKeyhole, PlugZap, ShieldCheck, UserLock, Workflow, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SECURITY_COPY, type SecurityFeatureIcon } from '../data/homeContent';
import { Reveal } from './motion';

/*
 * Security & reliability section: deep navy canvas, violet/cyan ambient light,
 * a hand-built SVG shield illustration and a minimal list of verified capabilities.
 * Copy lives in SECURITY_COPY (homeContent.ts); see the note there before adding claims.
 */

const ICONS: Record<SecurityFeatureIcon, LucideIcon> = {
  twoFactor: KeyRound,
  threeDS: ShieldCheck,
  gateways: PlugZap,
  customerData: UserLock,
  workflows: Workflow,
};

/* ------------------------------- Illustration ------------------------------ */

const S = 520;
const C = S / 2;
const SHIELD = 'M260 116 L364 156 V262 C364 334 320 384 260 408 C200 384 156 334 156 262 V156 Z';
const SHIELD_INNER = 'M260 144 L340 175 V262 C340 320 305 360 260 380 C215 360 180 320 180 262 V175 Z';
const ORBIT_ANGLES = [18, 90, 162, 234, 306];

function SecurityIllustration({ chips }: { chips: (typeof SECURITY_COPY)['en']['chips'] }) {
  return (
    <figure className="sec-art relative mx-auto w-full max-w-[32rem]" aria-hidden="true">
      <div className="relative aspect-square">
        <svg viewBox={`0 0 ${S} ${S}`} className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="sec-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7657f6" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#7657f6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#39d5e8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sec-shield-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2470" />
              <stop offset="60%" stopColor="#171640" />
              <stop offset="100%" stopColor="#0f1230" />
            </linearGradient>
            <linearGradient id="sec-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b29dff" />
              <stop offset="55%" stopColor="#9a68ff" />
              <stop offset="100%" stopColor="#39d5e8" />
            </linearGradient>
            <linearGradient id="sec-scan-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#39d5e8" stopOpacity="0" />
              <stop offset="70%" stopColor="#39d5e8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#e6fbff" stopOpacity="0.7" />
            </linearGradient>
            <radialGradient id="sec-fade" cx="50%" cy="50%" r="50%">
              <stop offset="35%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="sec-dots-mask">
              <rect width={S} height={S} fill="url(#sec-fade)" />
            </mask>
            <pattern id="sec-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="9" cy="9" r="0.9" fill="#b9bcd2" fillOpacity="0.35" />
            </pattern>
            <clipPath id="sec-shield-clip">
              <path d={SHIELD} />
            </clipPath>
            <filter id="sec-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Dot field fading out from the centre */}
          <rect width={S} height={S} fill="url(#sec-dots)" mask="url(#sec-dots-mask)" />

          {/* Breathing halo behind the shield */}
          <circle cx={C} cy={C} r="190" fill="url(#sec-halo)" className="sec-breathe" />

          {/* Concentric rings */}
          <circle cx={C} cy={C} r="140" fill="none" stroke="#b29dff" strokeOpacity="0.14" />
          <circle cx={C} cy={C} r="178" fill="none" stroke="#b9bcd2" strokeOpacity="0.1" />
          <circle cx={C} cy={C} r="218" fill="none" stroke="#b9bcd2" strokeOpacity="0.16" strokeDasharray="2 9" strokeLinecap="round" />

          {/* Counter-rotating arc segments on the middle ring */}
          <g className="sec-orbit-rev" style={{ transformOrigin: `${C}px ${C}px` }}>
            <path d="M 438 260 A 178 178 0 0 0 386 134" fill="none" stroke="url(#sec-edge)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
            <path d="M 82 260 A 178 178 0 0 0 134 386" fill="none" stroke="url(#sec-edge)" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* Orbiting nodes on the outer ring (one per capability) */}
          <g className="sec-orbit" style={{ transformOrigin: `${C}px ${C}px` }}>
            {ORBIT_ANGLES.map((a, i) => {
              const r = (a * Math.PI) / 180;
              const x = C + 218 * Math.cos(r);
              const y = C + 218 * Math.sin(r);
              const violet = i % 2 === 0;
              return (
                <g key={a} className="sec-node" style={{ ['--i' as string]: i } as React.CSSProperties}>
                  <circle cx={x} cy={y} r="9" fill={violet ? '#9a68ff' : '#39d5e8'} opacity="0.45" filter="url(#sec-glow)" />
                  <circle cx={x} cy={y} r="3.4" fill={violet ? '#ffffff' : '#e6fbff'} />
                </g>
              );
            })}
          </g>

          {/* Shield body */}
          <path d={SHIELD} fill="url(#sec-shield-fill)" />
          <path d={SHIELD} fill="none" stroke="url(#sec-edge)" strokeWidth="2" strokeLinejoin="round" pathLength={1} className="sec-draw" />
          <path d={SHIELD_INNER} fill="none" stroke="#b29dff" strokeOpacity="0.28" strokeWidth="1" strokeLinejoin="round" pathLength={1} className="sec-draw sec-draw-late" />

          {/* Scan sweep, clipped to the shield */}
          <g clipPath="url(#sec-shield-clip)">
            <rect x="150" y="80" width="220" height="40" fill="url(#sec-scan-grad)" className="sec-scan" />
          </g>

          {/* Lock */}
          <g className="sec-lock">
            <circle cx={C} cy="276" r="58" fill="#9a68ff" opacity="0.18" filter="url(#sec-glow)" />
            <path d="M238 262 V244 a22 22 0 0 1 44 0 V262" fill="none" stroke="#d9d0ff" strokeWidth="6" strokeLinecap="round" />
            <rect x="222" y="258" width="76" height="60" rx="13" fill="#221d5c" stroke="url(#sec-edge)" strokeWidth="2" />
            <circle cx={C} cy="283" r="6.5" fill="#e6fbff" />
            <rect x="257" y="285" width="6" height="16" rx="3" fill="#e6fbff" />
          </g>
        </svg>

        {/* Floating glass chips (decorative) */}
        <div className="sec-chip absolute right-[1%] top-[13%] animate-float rounded-xl border border-white/10 bg-[#121531]/80 px-3 py-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md sm:right-[3%]">
          <div className="flex items-center gap-2 font-ui text-[11px] font-medium text-[#d9dcec]">
            <KeyRound className="h-3.5 w-3.5 text-[#b29dff]" />
            {chips.twoFactor}
          </div>
          <div className="mt-1.5 flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="sec-code-dot h-1.5 w-1.5 rounded-full bg-[#b29dff]" style={{ ['--i' as string]: i } as React.CSSProperties} />
            ))}
          </div>
        </div>

        <div className="sec-chip absolute bottom-[12%] left-[1%] animate-float-slow rounded-xl border border-white/10 bg-[#121531]/80 px-3 py-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md sm:left-[3%]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#39d5e8]/15 text-[#5fe1f0]">
              <LockKeyhole className="h-3.5 w-3.5" />
            </span>
            <span>
              <span className="block font-display text-[12px] font-semibold text-white">{chips.threeDS}</span>
              <span className="block font-ui text-[10.5px] text-[#9195ae]">{chips.threeDSDetail}</span>
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}

/* --------------------------------- Section -------------------------------- */

export function SecuritySection() {
  const { locale } = useRouter();
  const copy = SECURITY_COPY[locale] ?? SECURITY_COPY.en;

  return (
    <section
      aria-labelledby="security-heading"
      className="dark relative overflow-hidden text-ink"
      style={{
        background:
          'radial-gradient(50% 55% at 25% 50%, rgba(118,87,246,0.20) 0%, transparent 70%), radial-gradient(40% 45% at 90% 15%, rgba(57,213,232,0.09) 0%, transparent 70%), linear-gradient(180deg, #0a0c1d 0%, #0e1128 55%, #121236 100%)',
      }}
    >
      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-drift absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#7657f6]/20 blur-3xl" />
        <div className="animate-drift-slow absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#39d5e8]/10 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
      <div className="hairline-top absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        {/* Illustration (left on desktop, below copy on mobile) */}
        <Reveal index={1} className="order-2 lg:order-1 lg:col-span-6">
          <SecurityIllustration chips={copy.chips} />
        </Reveal>

        {/* Copy + capabilities */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="security-heading"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-white [text-wrap:balance] md:text-[2.75rem]"
            >
              {copy.heading}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[#b9bcd2] md:text-lg">{copy.body}</p>
          </Reveal>

          <ul className="mt-9 border-t border-white/[0.08]">
            {copy.features.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal
                  as="li"
                  key={f.icon}
                  index={i}
                  className="group/sec flex items-center gap-4 border-b border-white/[0.08] py-4"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#b29dff] transition-all duration-300 group-hover/sec:border-[#9a68ff]/50 group-hover/sec:text-[#5fe1f0] group-hover/sec:shadow-[0_0_18px_-4px_rgba(118,87,246,0.7)]"
                    aria-hidden="true"
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15.5px] font-semibold tracking-[-0.015em] text-white">{f.title}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-[#9195ae]">{f.body}</span>
                  </span>
                </Reveal>
              );
            })}
          </ul>

          <Reveal index={2}>
            <p className="mt-6 max-w-lg font-ui text-[12px] leading-relaxed text-[#9195ae]">{copy.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
