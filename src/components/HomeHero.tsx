import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AppLink } from './ReusableBlocks';
import { isExternalHref } from '../utils/navLinks';

/**
 * Homepage hero: dark midnight canvas with ambient light, a two-sentence H1 with one
 * gradient-highlighted phrase, two CTAs and a product visual on the right.
 *
 * Text entrance runs in CSS (`hero-in`), so the copy is in the server-rendered HTML and
 * paints immediately; only the visual uses Framer Motion. Slides under the transparent
 * sticky navbar via -mt-16.
 */
export interface HeroCta {
  label: string;
  href: string;
}

/** Splits the H1 into sentences and wraps `highlight` in the gradient. */
function HeroHeadline({ text, highlight }: { text: string; highlight: string }) {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [text];

  const renderSentence = (s: string) => {
    const i = highlight ? s.indexOf(highlight) : -1;
    if (i < 0) return s;
    return (
      <>
        {s.slice(0, i)}
        <span className="hero-highlight">{s.slice(i, i + highlight.length)}</span>
        {s.slice(i + highlight.length)}
      </>
    );
  };

  return (
    <>
      {sentences.map((s, idx) => (
        <span
          key={idx}
          // Each sentence on its own line from sm up; the second reads one step quieter.
          className={`hero-in block ${idx === 0 ? 'hero-in-1 text-white' : 'hero-in-2 mt-1 text-[#c9cbe0]'}`}
        >
          {renderSentence(s)}{' '}
        </span>
      ))}
    </>
  );
}

function CtaLink({ cta, className, children }: { cta: HeroCta; className: string; children: React.ReactNode }) {
  if (isExternalHref(cta.href) || cta.href.startsWith('#')) {
    return (
      <a href={cta.href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <AppLink href={cta.href} className={className}>
      {children}
    </AppLink>
  );
}

export function HomeHero({
  eyebrow,
  title,
  highlight,
  description,
  primary,
  secondary,
  note,
  visual,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primary: HeroCta;
  secondary: HeroCta;
  note: string;
  visual: React.ReactNode;
}) {
  return (
    <section aria-labelledby="home-hero-heading" className="dark hero-canvas relative -mt-16 overflow-hidden pt-16 text-ink">
      {/* Background: radial lighting, drifting orbs, masked grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-spotlight absolute inset-0" />
        <div className="orb orb-violet animate-drift -left-40 -top-24 h-[34rem] w-[34rem] opacity-55" />
        <div className="orb animate-drift-slow right-[-10rem] top-[18%] h-[30rem] w-[30rem] bg-[rgba(79,124,255,0.35)] opacity-60" />
        <div className="orb orb-cyan animate-drift bottom-[-10rem] right-[18%] h-80 w-80 opacity-35" />
        <div className="orb bottom-[-14rem] left-[8%] h-96 w-96 bg-[rgba(36,33,90,0.9)]" />
        <div className="grid-pattern absolute inset-0 opacity-70" />
        <div className="hero-noise absolute inset-0" />
      </div>

      <div className="container-x relative pb-20 pt-12 sm:pt-16 md:pb-28 lg:pb-32 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Copy */}
          <div className="max-w-2xl lg:col-span-6">
            <p className="hero-in hero-in-0 inline-flex items-center gap-2.5 font-ui text-[12px] font-semibold uppercase tracking-[0.16em] text-[#cfc3ff]">
              <span className="h-px w-6 bg-gradient-to-r from-[#9a68ff] to-[#39d5e8]" aria-hidden="true" />
              {eyebrow}
            </p>

            <h1 id="home-hero-heading" className="hero-title mt-6">
              <HeroHeadline text={title} highlight={highlight} />
            </h1>

            <p className="hero-in hero-in-3 mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-[#b9bcd2] sm:text-lg">
              {description}
            </p>

            <div className="hero-in hero-in-4 mt-9 flex flex-col gap-3 font-ui sm:flex-row sm:items-center">
              <CtaLink cta={primary} className="btn-primary hero-cta-primary px-6 py-3.5 text-[15px]">
                {primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CtaLink>
              <CtaLink cta={secondary} className="btn-ghost px-6 py-3.5 text-[15px]">
                {secondary.label}
              </CtaLink>
            </div>

            <p className="hero-in hero-in-5 mt-6 text-[13.5px] leading-relaxed text-[#9195ae]">{note}</p>
          </div>

          {/* Product visual */}
          <div className="relative mx-auto w-full max-w-[40rem] lg:col-span-6 lg:max-w-none xl:pl-4">
            {visual}
          </div>
        </div>
      </div>

      <div className="hairline-top absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
