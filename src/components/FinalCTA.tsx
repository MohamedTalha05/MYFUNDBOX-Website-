import React from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { FINAL_CTA_COPY } from '../data/homeContent';
import { APP_LINKS } from '../data/siteConfig';
import { useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * Final homepage conversion section. Full-width midnight canvas with violet/cyan ambient light,
 * slow concentric "signal" rings and a light beam behind a centred headline.
 * CTA hierarchy: solid gradient "Get Started" (existing app sign-up flow) + ghost "Book a Demo".
 */
export function FinalCTA() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = FINAL_CTA_COPY[locale] ?? FINAL_CTA_COPY.en;

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="dark relative isolate overflow-hidden text-ink"
      style={{
        background:
          'radial-gradient(60% 70% at 50% 110%, rgba(118,87,246,0.55) 0%, rgba(118,87,246,0.12) 45%, transparent 70%), radial-gradient(35% 45% at 85% 10%, rgba(57,213,232,0.16) 0%, transparent 70%), radial-gradient(35% 45% at 12% 20%, rgba(154,104,255,0.16) 0%, transparent 70%), linear-gradient(180deg, #0b0d1f 0%, #101330 55%, #15143d 100%)',
      }}
    >
      {/* Ambient light + texture */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-drift absolute left-[8%] top-[18%] h-80 w-80 rounded-full bg-[#7657f6]/25 blur-3xl" />
        <div className="animate-drift-slow absolute right-[6%] top-[8%] h-72 w-72 rounded-full bg-[#39d5e8]/15 blur-3xl" />
        <div className="hero-grid-pattern absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
        <div className="hero-noise absolute inset-0" />

        {/* Concentric signal rings centred behind the headline */}
        <svg viewBox="0 0 800 800" className="cta-rings absolute left-1/2 top-1/2 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-70">
          <defs>
            <linearGradient id="cta-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b29dff" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#9a68ff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#39d5e8" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <circle cx="400" cy="400" r="170" fill="none" stroke="url(#cta-ring)" strokeWidth="1" />
          <circle cx="400" cy="400" r="250" fill="none" stroke="url(#cta-ring)" strokeWidth="1" opacity="0.7" />
          <g className="cta-ring-spin" style={{ transformOrigin: '400px 400px' }}>
            <circle cx="400" cy="400" r="330" fill="none" stroke="#b9bcd2" strokeOpacity="0.18" strokeDasharray="2 12" strokeLinecap="round" />
            <circle cx="730" cy="400" r="3.5" fill="#5fe1f0" />
            <circle cx="70" cy="400" r="2.5" fill="#b29dff" />
          </g>
          <circle cx="400" cy="400" r="170" fill="none" stroke="#b29dff" strokeOpacity="0.5" className="cta-ripple" />
          <circle cx="400" cy="400" r="170" fill="none" stroke="#39d5e8" strokeOpacity="0.4" className="cta-ripple cta-ripple-2" />
        </svg>

        {/* Light beam rising from the bottom edge */}
        <div className="absolute bottom-0 left-1/2 h-px w-[min(56rem,90%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#b29dff] to-transparent opacity-70" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[min(40rem,80%)] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(178,157,255,0.35),transparent)]" />
      </div>
      <div className="hairline-top absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x relative py-24 text-center md:py-36">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-4xl font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.045em] text-white [text-wrap:balance] sm:text-[3.25rem] lg:text-[4.25rem]"
          >
            <span className="block">{copy.heading[0]}</span>
            <span className="hero-highlight block">{copy.heading[1]}</span>
          </h2>
        </Reveal>
        <Reveal index={1}>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[#c9cbe0] md:text-lg">{copy.body}</p>
        </Reveal>
        <Reveal index={2} className="mt-10 flex flex-col items-stretch justify-center gap-3 font-ui sm:flex-row sm:items-center sm:gap-4">
          {/* Primary: existing app sign-up flow (unchanged URL) */}
          <a
            href={APP_LINKS.signUp}
            className="btn-primary hero-cta-primary relative justify-center px-7 py-4 text-[15.5px] shadow-[0_18px_44px_-14px_rgba(118,87,246,0.95)]"
          >
            {copy.primary}
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
          <AppLink
            href={localHref('/book-a-demo')}
            className="btn-ghost justify-center px-7 py-4 text-[15.5px] backdrop-blur"
          >
            <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
            {copy.secondary}
          </AppLink>
        </Reveal>
      </div>
    </section>
  );
}
