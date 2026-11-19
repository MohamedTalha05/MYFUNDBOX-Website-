import React from 'react';
import { ChartLine, ChevronDown, CreditCard, EyeOff, Layers, RefreshCw, Unplug, X, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PROBLEM_SECTION_COPY, type ProblemIcon } from '../data/homeContent';
import { Reveal } from './motion';

/**
 * Each problem icon pairs a main symbol (violet) with a small badge (cyan) that names the
 * pain point: plans + renewal cycle, card + failure, chart + hidden, unplugged connection.
 */
const ICONS: Record<ProblemIcon, { main: LucideIcon; badge?: LucideIcon }> = {
  subscriptions: { main: Layers, badge: RefreshCw },
  payments: { main: CreditCard, badge: X },
  visibility: { main: ChartLine, badge: EyeOff },
  systems: { main: Unplug },
};

function ProblemGlyph({ icon }: { icon: ProblemIcon }) {
  const { main: Main, badge: Badge } = ICONS[icon];
  return (
    <span className="relative inline-flex h-12 w-12 items-center justify-center" aria-hidden="true">
      <span className="absolute inset-0 rounded-xl border border-[#7657f6]/15 bg-gradient-to-br from-[#eae6ff] to-[#f4f2ff] transition-transform duration-500 ease-out group-hover/card:scale-105 dark:from-[#241f55] dark:to-[#1a1840] dark:border-white/10" />
      <Main className="relative h-[22px] w-[22px] text-[#7657f6] dark:text-[#b29dff]" strokeWidth={1.75} />
      {Badge && (
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(16,19,41,0.12)] ring-1 ring-[#39d5e8]/40 transition-transform duration-500 ease-out group-hover/card:rotate-[-8deg] group-hover/card:scale-110 dark:bg-[#121531]">
          <Badge className="h-3 w-3 text-[#0f8fa1] dark:text-[#5fe1f0]" strokeWidth={2.25} />
        </span>
      )}
    </span>
  );
}

export function ProblemSection({ solutionAnchor }: { solutionAnchor: string }) {
  const { locale } = useRouter();
  const copy = PROBLEM_SECTION_COPY[locale];

  return (
    <section aria-labelledby="problem-heading" className="relative bg-[#f8f9fc] pt-20 md:pt-28 dark:bg-canvas">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="problem-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">
            {copy.body}
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {copy.cards.map((card, i) => (
            <Reveal
              as="li"
              key={card.title}
              index={i}
              className="group/card relative flex flex-col rounded-2xl border border-[#e7e8f0] bg-white p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#7657f6]/30 hover:shadow-[0_20px_40px_-24px_rgba(36,33,90,0.35)] dark:border-line dark:bg-surface"
            >
              {/* Hairline accent that draws in on hover */}
              <span
                className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#7657f6] to-[#39d5e8] transition-transform duration-500 ease-out group-hover/card:scale-x-100"
                aria-hidden="true"
              />
              <div className="flex items-start justify-between">
                <ProblemGlyph icon={card.icon} />
                <span className="font-ui text-[12px] font-medium tabular-nums text-[#9a9db2] dark:text-subtle" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-[#242638] dark:text-ink">
                {card.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#5a5e75] dark:text-muted">{card.body}</p>
            </Reveal>
          ))}
        </ul>

        {/* Transition into the solution section */}
        <Reveal className="problem-bridge relative mt-16 flex flex-col items-center md:mt-20">
          <span className="problem-bridge-line h-14 w-px bg-gradient-to-b from-transparent via-[#7657f6]/50 to-[#7657f6]" aria-hidden="true" />
          <a
            href={solutionAnchor}
            className="group/bridge relative inline-flex items-center gap-2.5 rounded-full border border-[#7657f6]/25 bg-white py-1.5 pl-1.5 pr-4 font-ui text-[13.5px] font-medium text-[#242638] shadow-[0_8px_24px_-12px_rgba(118,87,246,0.45)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#7657f6]/50 hover:shadow-[0_12px_30px_-12px_rgba(118,87,246,0.6)] dark:bg-surface dark:text-ink"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--grad-button)] font-display text-[11px] font-bold text-white" aria-hidden="true">
              M
            </span>
            {copy.transition}
            <ChevronDown className="h-4 w-4 text-[#7657f6] transition-transform duration-300 group-hover/bridge:translate-y-0.5 dark:text-[#b29dff]" aria-hidden="true" />
          </a>
          <span className="problem-bridge-line relative h-16 w-px bg-gradient-to-b from-[#39d5e8] via-[#39d5e8]/40 to-transparent md:h-20" aria-hidden="true">
            <span className="problem-bridge-dot absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#39d5e8] shadow-[0_0_10px_2px_rgba(57,213,232,0.6)]" />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
