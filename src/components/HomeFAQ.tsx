import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { HOME_FAQ_COPY } from '../data/homeContent';
import type { FAQItem } from '../data/pagesRegistry';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * Homepage FAQ: "question index + answer stage".
 * Desktop: numbered questions on the left; the selected answer is shown large in a dark panel on
 * the right (all panels share one grid cell, see .hfaq-* in index.css).
 * Mobile: the same DOM reads as an accordion, each answer directly under its question.
 *
 * Accessibility: WAI-ARIA accordion semantics (button in <h3>, aria-expanded/aria-controls,
 * labelled regions), one answer open at a time, Up/Down/Home/End move between questions.
 * Crawlability: every answer is always in the server HTML; closed ones are only visually hidden
 * and inert. No FAQPage JSON-LD (see FAQ_RICH_RESULTS_ELIGIBLE in seoGenerators.ts).
 */
export function HomeFAQ({ faqs }: { faqs: FAQItem[] }) {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = HOME_FAQ_COPY[locale] ?? HOME_FAQ_COPY.en;
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const contactHref = resolveNavHref({ href: '/contact' });

  if (!faqs?.length) return null;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = faqs.length - 1;
    const target =
      e.key === 'ArrowDown' ? (i === last ? 0 : i + 1) : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <section aria-labelledby="home-faq-heading" className="relative overflow-hidden bg-white py-20 md:py-28 dark:bg-canvas">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-pattern-light absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000,transparent)]" />
      </div>

      <div className="container-x relative">
        {/* Centred header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="home-faq-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#242638] [text-wrap:balance] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[#4b4f66] dark:text-muted">{copy.body}</p>
        </Reveal>

        {/* Index + stage */}
        <Reveal index={1} className="mt-14">
          <div className="hfaq mx-auto max-w-6xl" style={{ ['--n' as string]: faqs.length } as React.CSSProperties}>
            {faqs.map((faq, i) => {
              const isOpen = i === active;
              const num = String(i + 1).padStart(2, '0');
              const buttonId = `home-faq-q-${i}`;
              const panelId = `home-faq-a-${i}`;
              return (
                <React.Fragment key={faq.question}>
                  <h3 className="hfaq-q m-0" style={{ ['--row' as string]: i + 1 } as React.CSSProperties}>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={`group/q relative flex w-full cursor-pointer items-center gap-5 border-t py-5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#9a68ff]/60 lg:pr-8 ${
                        isOpen ? 'border-[#7657f6]/40' : 'border-[#e7e8f0] dark:border-line'
                      }`}
                    >
                      {/* Violet progress line on the active row */}
                      <span
                        className={`absolute -top-px left-0 h-[2px] origin-left bg-[image:var(--grad-button)] transition-transform duration-500 ease-out ${
                          isOpen ? 'w-full scale-x-100' : 'w-full scale-x-0'
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`font-ui text-[13px] font-semibold tabular-nums tracking-[0.04em] transition-colors duration-300 ${
                          isOpen ? 'text-[#5f43e9] dark:text-[#b29dff]' : 'text-[#a3a6ba]'
                        }`}
                        aria-hidden="true"
                      >
                        {num}
                      </span>
                      <span
                        className={`flex-1 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] transition-colors duration-300 md:text-[1.1875rem] ${
                          isOpen ? 'text-[#242638] dark:text-ink' : 'text-[#5a5e75] group-hover/q:text-[#242638] dark:text-muted dark:group-hover/q:text-ink'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ArrowUpRight
                        className={`h-[18px] w-[18px] shrink-0 transition-all duration-300 ${
                          isOpen ? 'rotate-45 text-[#5f43e9] dark:text-[#b29dff]' : 'text-[#c3c5d4] group-hover/q:text-[#5f43e9]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <div id={panelId} role="region" aria-labelledby={buttonId} inert={!isOpen} className={`hfaq-a ${isOpen ? 'is-open' : ''}`}>
                    <div className="hfaq-a-inner">
                      <div
                        className="relative overflow-hidden rounded-3xl p-6 text-white sm:p-8 lg:flex lg:h-full lg:flex-col lg:p-12"
                        style={{
                          background:
                            'radial-gradient(70% 60% at 100% 0%, rgba(57,213,232,0.16) 0%, transparent 70%), radial-gradient(80% 70% at 0% 100%, rgba(118,87,246,0.35) 0%, transparent 70%), linear-gradient(160deg, #15143d 0%, #0e1128 100%)',
                        }}
                      >
                        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                        <span
                          className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[9rem] font-bold leading-none tracking-[-0.06em] text-white/[0.05] lg:text-[12rem]"
                          aria-hidden="true"
                        >
                          {num}
                        </span>
                        <p className="relative hidden font-ui text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#b29dff] lg:block" aria-hidden="true">
                          {faq.question}
                        </p>
                        <p className="relative text-[16px] leading-relaxed text-[#d9dcec] lg:mt-6 lg:text-[1.375rem] lg:leading-[1.55] lg:text-white">
                          {faq.answer}
                        </p>
                        {contactHref && (
                          <div className="relative mt-8 hidden border-t border-white/10 pt-6 lg:mt-auto lg:block">
                            <span className="font-ui text-[14px] text-[#9195ae]">{copy.contactPrompt}</span>{' '}
                            <AppLink
                              href={localHref(contactHref)}
                              className="inline-flex items-center gap-1.5 font-ui text-[14px] font-semibold text-[#5fe1f0] hover:text-white"
                            >
                              {copy.contactCta}
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </AppLink>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </Reveal>

        {contactHref && (
          <p className="mt-8 text-center font-ui text-[14px] text-[#5a5e75] lg:hidden dark:text-muted">
            {copy.contactPrompt}{' '}
            <AppLink href={localHref(contactHref)} className="font-semibold text-[#5f43e9] underline-offset-4 hover:underline dark:text-[#b29dff]">
              {copy.contactCta}
            </AppLink>
          </p>
        )}
      </div>
    </section>
  );
}
