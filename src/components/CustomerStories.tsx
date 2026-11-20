import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Layers, Play, Plug, Receipt, RefreshCcw, UserRound, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import {
  APPROVED_TESTIMONIALS,
  CUSTOMER_STORIES_COPY,
  MIN_TESTIMONIALS_FOR_CAROUSEL,
  type ApprovedTestimonial,
  type WorkflowStoryKey,
} from '../data/homeContent';
import { useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { prefersReducedMotion, Reveal } from './motion';

/*
 * Customer stories. Shows approved testimonial cards when APPROVED_TESTIMONIALS has enough
 * entries; otherwise shows clearly labelled example workflows built from verified features.
 * No quotes, names, logos, ratings or results are ever generated here (see homeContent.ts).
 */

type StoriesCopy = (typeof CUSTOMER_STORIES_COPY)['en'];

const WORKFLOW_ICONS: Record<WorkflowStoryKey, LucideIcon> = {
  launch: Layers,
  recover: RefreshCcw,
  portal: UserRound,
  connect: Plug,
  invoicing: Receipt,
};

/* -------------------------------- Carousel -------------------------------- */

function Carousel({ label, ui, children }: { label: string; ui: StoriesCopy['ui']; children: React.ReactNode[] }) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const count = children.length;

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    if (!kids.length) return;
    const origin = kids[0].offsetLeft;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    let best = 0;
    let bestD = Infinity;
    kids.forEach((k, i) => {
      const d = Math.abs(k.offsetLeft - origin - el.scrollLeft);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(end ? kids.length - 1 : best);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(end);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const target = kids[Math.max(0, Math.min(kids.length - 1, i))];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - kids[0].offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const navBtn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-[#e1e2ec] bg-white text-[#242638] shadow-[0_1px_2px_rgba(16,19,41,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-[image:var(--grad-button)] hover:text-white hover:shadow-[0_12px_24px_-12px_rgba(118,87,246,0.8)] disabled:pointer-events-none disabled:opacity-35 dark:border-line dark:bg-surface dark:text-ink';

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="stories-track -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-6 pt-2 outline-none focus-visible:ring-2 focus-visible:ring-[#9a68ff]/50 sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {children.map((child, i) => (
          <li
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} ${ui.slideOf} ${count}`}
            className="flex shrink-0 basis-[86%] snap-start sm:basis-[58%] lg:basis-[calc((100%-2.5rem)/3)]"
          >
            {child}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-1" role="group" aria-label={label}>
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${ui.goTo} ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              className="group/dot flex h-6 items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ease-out ${
                  i === active ? 'w-7 bg-[image:var(--grad-button)]' : 'w-1.5 bg-[#c9cbdc] group-hover/dot:bg-[#9a68ff]/60 dark:bg-white/20'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="button" className={navBtn} onClick={() => goTo(active - 1)} disabled={atStart} aria-label={ui.prev}>
            <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <button type="button" className={navBtn} onClick={() => goTo(active + 1)} disabled={atEnd} aria-label={ui.next}>
            <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Card shells ------------------------------- */

const CARD =
  'group/story relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#e7e8f0] bg-white p-2 shadow-[0_1px_2px_rgba(16,19,41,0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(36,33,90,0.5)] dark:border-line dark:bg-surface';

function CardBorder() {
  return (
    <span
      className="sol-border pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover/story:opacity-100"
      aria-hidden="true"
    />
  );
}

/* ---------------------------- Testimonial card ---------------------------- */

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

function TestimonialCard({ t, ui }: { t: ApprovedTestimonial; ui: StoriesCopy['ui'] }) {
  const localHref = useLocalHref();
  return (
    <figure className={CARD}>
      <CardBorder />
      {t.video && (
        <a
          href={t.video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video overflow-hidden rounded-[1.25rem] bg-[#101329]"
        >
          <img
            src={t.video.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover/story:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#0b0d1f]/80 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#5f43e9] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover/story:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute bottom-3 left-4 font-ui text-[12px] font-medium text-white">
            {ui.watchVideo}
            <span className="sr-only">: {t.video.title} ({ui.external})</span>
          </span>
        </a>
      )}

      <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
        <svg viewBox="0 0 32 24" className="h-6 w-8" aria-hidden="true">
          <defs>
            <linearGradient id={`q-${t.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9a68ff" />
              <stop offset="100%" stopColor="#39d5e8" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#q-${t.id})`}
            d="M0 24V14C0 6.3 4.2 1.6 12.6 0l1.4 3.3C9.5 4.6 7.4 7.3 7.2 11H13v13H0Zm19 0V14c0-7.7 4.2-12.4 12.6-14L33 3.3C28.5 4.6 26.4 7.3 26.2 11H32v13H19Z"
          />
        </svg>
        <blockquote lang={t.quoteLang} className="mt-5 flex-1 text-[16.5px] leading-relaxed text-[#2d3044] dark:text-ink">
          {t.quote}
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3 border-t border-[#eef0f5] pt-5 dark:border-line">
          {t.logo ? (
            <img src={t.logo.src} alt={t.logo.alt} loading="lazy" className="h-9 w-auto max-w-[6.5rem] object-contain" />
          ) : (
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-button)] font-display text-[13px] font-semibold text-white"
              aria-hidden="true"
            >
              {initials(t.name)}
            </span>
          )}
          <span className="min-w-0">
            <span className="block font-display text-[15px] font-semibold tracking-[-0.01em] text-[#242638] dark:text-ink">{t.name}</span>
            <span className="block truncate text-[13px] text-[#5a5e75] dark:text-muted">
              {t.role ? `${t.role}, ` : ''}
              {t.company}
            </span>
          </span>
        </figcaption>

        {t.caseStudyHref && (
          <AppLink href={localHref(t.caseStudyHref)} className="link-arrow mt-5 font-ui text-[14px]">
            {ui.readCaseStudy}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AppLink>
        )}
      </div>
    </figure>
  );
}

/* ------------------------- Example workflow card -------------------------- */

const PANEL_BG = [
  'radial-gradient(80% 70% at 20% 0%, rgba(118,87,246,0.45), transparent 70%), linear-gradient(160deg, #15143d 0%, #101329 100%)',
  'radial-gradient(80% 70% at 85% 100%, rgba(57,213,232,0.22), transparent 70%), linear-gradient(160deg, #101329 0%, #1b1850 100%)',
];

function WorkflowCard({ story, kicker, index }: { story: StoriesCopy['workflows'][number]; kicker: string; index: number }) {
  const Icon = WORKFLOW_ICONS[story.key];
  return (
    <article className={CARD}>
      <CardBorder />
      {/* Step trail */}
      <div className="relative h-44 overflow-hidden rounded-[1.25rem]" style={{ background: PANEL_BG[index % 2] }} aria-hidden="true">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--grad-button)] text-white shadow-[0_10px_24px_-8px_rgba(118,87,246,0.8)] transition-transform duration-500 group-hover/story:scale-105">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div className="absolute inset-x-5 bottom-6">
          <div className="relative mx-[16.667%] h-px bg-white/10">
            <span className="story-line absolute inset-0 origin-left bg-gradient-to-r from-[#9a68ff] to-[#39d5e8]" />
            <span className="story-pulse absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#e6fbff] shadow-[0_0_10px_2px_rgba(57,213,232,0.7)]" />
          </div>
          <ol className="-mt-[7px] grid grid-cols-3">
            {story.steps.map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-2 px-1 text-center">
                <span
                  className={`story-node h-3.5 w-3.5 rounded-full border-2 ${i === 2 ? 'border-[#5fe1f0] bg-[#39d5e8]/30' : 'border-[#b29dff] bg-[#15143d]'}`}
                  style={{ ['--i' as string]: i } as React.CSSProperties}
                />
                <span className="font-ui text-[10.5px] font-medium leading-tight text-[#c9cbe0]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
        <span className="font-ui text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#5f43e9] dark:text-[#b29dff]">{kicker}</span>
        <h3 className="mt-2 font-display text-[1.3rem] font-semibold tracking-[-0.025em] text-[#242638] dark:text-ink">{story.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[#5a5e75] dark:text-muted">{story.body}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {story.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#e7e8f0] bg-[#f8f9fc] px-3 py-1 font-ui text-[12px] font-medium text-[#4b4f66] dark:border-line dark:bg-canvas dark:text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* --------------------------------- Section -------------------------------- */

export function CustomerStories() {
  const { locale } = useRouter();
  const copy = CUSTOMER_STORIES_COPY[locale] ?? CUSTOMER_STORIES_COPY.en;
  const showTestimonials = APPROVED_TESTIMONIALS.length >= MIN_TESTIMONIALS_FOR_CAROUSEL;

  const slides = showTestimonials
    ? APPROVED_TESTIMONIALS.map((t) => <TestimonialCard key={t.id} t={t} ui={copy.ui} />)
    : copy.workflows.map((w, i) => <WorkflowCard key={w.key} story={w} kicker={copy.workflowKicker} index={i} />);

  return (
    <section aria-labelledby="stories-heading" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#f8f9fc] dark:bg-canvas" />
        <div className="absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#7657f6]/[0.08] blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[#39d5e8]/[0.09] blur-3xl" />
        <div className="grid-pattern-light absolute inset-0 opacity-50" />
      </div>

      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{showTestimonials ? copy.eyebrowTestimonials : copy.eyebrowWorkflows}</p>
          <h2
            id="stories-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] [text-wrap:balance] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
        </Reveal>

        <Reveal index={1} className="stories mt-12">
          <Carousel label={showTestimonials ? copy.ui.carousel : copy.eyebrowWorkflows} ui={copy.ui}>
            {slides}
          </Carousel>
        </Reveal>

        {!showTestimonials && (
          <p className="mt-6 max-w-xl font-ui text-[12px] leading-relaxed text-[#6b6f86] dark:text-subtle">{copy.workflowNote}</p>
        )}
      </div>
    </section>
  );
}
