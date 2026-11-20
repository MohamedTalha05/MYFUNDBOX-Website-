import React from 'react';
import { Blocks, ContactRound, Globe, Split, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { DIFFERENTIATION_COPY, type DifferentiatorKey } from '../data/homeContent';
import { Reveal } from './motion';

/*
 * "Why MYFUNDBOX" differentiation section — compact version.
 * Header (headline + intro side by side), then four differentiators in one row separated by
 * hairlines. Copy describes MYFUNDBOX's own capabilities only (see DIFFERENTIATION_COPY).
 */

const ICONS: Record<DifferentiatorKey, LucideIcon> = {
  unified: Blocks,
  models: Split,
  global: Globe,
  customer: ContactRound,
};

export function DifferentiationSection() {
  const { locale } = useRouter();
  const copy = DIFFERENTIATION_COPY[locale] ?? DIFFERENTIATION_COPY.en;

  return (
    <section
      aria-labelledby="diff-heading"
      className="dark relative overflow-hidden text-ink"
      style={{
        background:
          'radial-gradient(40% 60% at 10% 0%, rgba(118,87,246,0.20) 0%, transparent 70%), radial-gradient(35% 55% at 95% 100%, rgba(57,213,232,0.10) 0%, transparent 70%), linear-gradient(180deg, #0b0d1f 0%, #121236 100%)',
      }}
    >
      <div className="hairline-top absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x relative py-16 md:py-20">
        {/* Header */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="diff-heading"
              className="mt-3 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-white [text-wrap:balance] md:text-[2.25rem]"
            >
              {copy.heading[0]} <span className="hero-highlight">{copy.heading[1]}</span>
            </h2>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5">
            <p className="max-w-md text-[15.5px] leading-relaxed text-[#a9acc4]">{copy.body}</p>
          </Reveal>
        </div>

        {/* Four differentiators */}
        <ul className="diff-grid mt-12 grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, i) => {
            const Icon = ICONS[item.key];
            return (
              <Reveal
                as="li"
                key={item.key}
                index={i}
                className="group/diff relative py-7 lg:py-8"
              >
                {/* Violet hover line */}
                <span
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#9a68ff] to-[#39d5e8] transition-transform duration-500 ease-out group-hover/diff:scale-x-100"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#b29dff] transition-colors duration-300 group-hover/diff:text-[#5fe1f0]" aria-hidden="true">
                    <Icon className="h-[17px] w-[17px]" strokeWidth={1.6} />
                  </span>
                  <span className="font-ui text-[12px] font-semibold tabular-nums tracking-[0.08em] text-[#6f7391]" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-white">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#9ea2bb]">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
