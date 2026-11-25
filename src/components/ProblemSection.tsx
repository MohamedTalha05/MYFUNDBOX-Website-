import React from 'react';
import {
  AlertTriangle,
  CalendarClock,
  ChevronDown,
  CreditCard,
  FileSpreadsheet,
  Layers,
  SlidersHorizontal,
  Unplug,
  type LucideIcon,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PROBLEM_COPY, type ProblemKey } from '../data/homepageContent';
import { Reveal } from './motion';
import { BrandMark } from './BrandLogo';

/*
 * Problem section (Phase 3A). Editorial split: the argument on the left, a "fragmented stack"
 * board on the right. Six challenge tiles sit on a staggered grid, joined by broken dashed
 * connectors, each with an amber symptom chip, so the layout itself reads as disconnected work
 * rather than a row of icons. A bridge at the bottom leads into the platform section.
 */

const ICONS: Record<ProblemKey, LucideIcon> = {
  models: Layers,
  recurring: CalendarClock,
  changes: SlidersHorizontal,
  failures: CreditCard,
  billing: FileSpreadsheet,
  disconnected: Unplug,
};

/** Broken connector between neighbouring tiles (decorative). */
function BrokenLink({ className }: { className: string }) {
  return (
    <span className={`pointer-events-none absolute hidden items-center gap-1 lg:flex ${className}`} aria-hidden="true">
      <span className="h-px w-3 border-t border-dashed border-[#9a9db2]/70 dark:border-white/25" />
      <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] border border-[#f4ae52] bg-[#fff7ea] dark:bg-[#2a2140]" />
      <span className="h-px w-3 border-t border-dashed border-[#9a9db2]/70 dark:border-white/25" />
    </span>
  );
}

export function ProblemSection({ solutionAnchor }: { solutionAnchor: string }) {
  const { locale } = useRouter();
  const copy = PROBLEM_COPY[locale];

  return (
    <section aria-labelledby="problem-heading" className="relative overflow-hidden bg-[#f8f9fc] pt-20 md:pt-28 dark:bg-canvas">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
      <div className="grid-pattern-light pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Argument */}
          <Reveal className="lg:col-span-5 lg:pt-6">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2
              id="problem-heading"
              className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
            >
              {copy.heading}
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>

            {/* Mini "tool sprawl" glyph: four app windows that don't line up */}
            <div className="relative mt-10 hidden h-28 max-w-xs lg:block" aria-hidden="true">
              {[
                'left-0 top-4 -rotate-6',
                'left-16 top-0 rotate-3',
                'left-32 top-6 -rotate-2',
                'left-48 top-1 rotate-6',
              ].map((pos, i) => (
                <span
                  key={pos}
                  className={`absolute h-20 w-24 rounded-xl border border-[#e7e8f0] bg-white shadow-[0_10px_24px_-14px_rgba(36,33,90,0.35)] dark:border-line dark:bg-surface ${pos}`}
                >
                  <span className="flex gap-1 border-b border-[#eceef5] px-2 py-1.5 dark:border-line">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d5d7e5]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d5d7e5]" />
                  </span>
                  <span className="mx-2 mt-2 block h-1.5 w-12 rounded-full bg-[#eceef5] dark:bg-white/10" />
                  <span className="mx-2 mt-1.5 block h-1.5 w-8 rounded-full bg-[#eceef5] dark:bg-white/10" />
                  {i === 2 && <AlertTriangle className="absolute bottom-2 right-2 h-3.5 w-3.5 text-[#f4ae52]" />}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Fragmented stack board */}
          <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5 lg:pb-8">
            {copy.items.map((item, i) => {
              const Icon = ICONS[item.key];
              const offset = i % 2 === 1 ? 'lg:translate-y-8' : '';
              return (
                <Reveal
                  as="li"
                  key={item.key}
                  index={i}
                  className={`group/card relative flex flex-col rounded-2xl border border-[#e7e8f0] bg-white p-5 transition-[box-shadow,border-color] duration-300 ease-out hover:border-[#7657f6]/30 hover:shadow-[0_20px_40px_-24px_rgba(36,33,90,0.35)] dark:border-line dark:bg-surface ${offset}`}
                >
                  {/* Connector to the tile on the right (left column only) */}
                  {i % 2 === 0 && <BrokenLink className="-right-[1.15rem] top-1/2 translate-x-1/2" />}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7657f6]/15 bg-gradient-to-br from-[#eae6ff] to-[#f4f2ff] text-[#7657f6] transition-transform duration-500 ease-out group-hover/card:scale-105 dark:border-white/10 dark:from-[#241f55] dark:to-[#1a1840] dark:text-[#b29dff]"
                      aria-hidden="true"
                    >
                      <Icon className="h-[19px] w-[19px]" strokeWidth={1.75} />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f4ae52]/12 px-2 py-0.5 font-ui text-[11px] font-medium text-[#8a520a] dark:text-[#f4ae52]">
                      <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                      {item.symptom}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-[#242638] dark:text-ink">
                    <span className="mr-2 font-ui text-[12px] font-medium tabular-nums text-[#9a9db2]" aria-hidden="true">
                      0{i + 1}
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#5a5e75] dark:text-muted">{item.body}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* Transition into the platform section */}
        <Reveal className="problem-bridge relative mt-16 flex flex-col items-center md:mt-20">
          <span className="problem-bridge-line h-14 w-px bg-gradient-to-b from-transparent via-[#7657f6]/50 to-[#7657f6]" aria-hidden="true" />
          <a
            href={solutionAnchor}
            className="group/bridge relative inline-flex items-center gap-2.5 rounded-full border border-[#7657f6]/25 bg-white py-1.5 pl-1.5 pr-4 font-ui text-[13.5px] font-medium text-[#242638] shadow-[0_8px_24px_-12px_rgba(118,87,246,0.45)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#7657f6]/50 hover:shadow-[0_12px_30px_-12px_rgba(118,87,246,0.6)] dark:bg-surface dark:text-ink"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-[#7657f6]/20" aria-hidden="true">
              <BrandMark className="h-[18px] w-[18px]" />
            </span>
            {copy.bridge}
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
