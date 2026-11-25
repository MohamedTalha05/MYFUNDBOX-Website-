import React from 'react';
import { ArrowRight, Check, Cpu, Factory, Globe2, Layers, Link2, Sparkles, type LucideIcon } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { AUDIENCE_LINKS, BUSINESS_MODELS_COPY, type AudienceKey } from '../data/homepageContent';
import { formatEUR, type LocaleCode } from '../utils/formatting';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * "Built for different business models" (Phase 3A). Four audiences on a bento grid, each with its
 * own treatment so the section never reads as four identical cards:
 *   SaaS        light card, plan tiers with per-seat pricing
 *   AI          midnight → indigo → violet gradient, plan + seats + add-on
 *   Industrial  graphite blueprint grid, per-machine / per-site service contracts
 *   Digital     violet → purple → lavender wash, pay link and payment methods
 * Truth rules: no usage metering or "AI-driven" claims for AI; no monitoring or IoT for Industrial.
 * Visuals use sample prices and fictional sites, labelled "Sample".
 */

type V = (typeof BUSINESS_MODELS_COPY)['en']['visuals'];

function SampleTag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`absolute right-3 top-3 font-ui text-[9.5px] font-medium uppercase tracking-[0.14em] ${dark ? 'text-white/50' : 'text-[#6b6f86]'}`}
    >
      {children}
    </span>
  );
}

function SaasVisual({ v, locale }: { v: V; locale: LocaleCode }) {
  const tiers = [
    { name: 'Starter', price: 9, active: false },
    { name: 'Pro', price: 15, active: true },
    { name: 'Team', price: 24, active: false },
  ];
  return (
    <div className="relative rounded-2xl border border-[#e7e8f0] bg-white p-4 pt-8 font-ui" aria-hidden="true">
      <SampleTag>{v.sample}</SampleTag>
      <div className="grid grid-cols-3 gap-2">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-xl border bg-white p-3 transition-transform duration-300 ${
              t.active ? 'border-[#7657f6]/40 shadow-[0_14px_28px_-16px_rgba(118,87,246,0.6)] ring-2 ring-[#7657f6]/10 group-hover/aud:-translate-y-1' : 'border-[#e7e8f0]'
            }`}
          >
            <div className="text-[11.5px] font-semibold text-[#242638]">{t.name}</div>
            <div className="mt-1 text-[16px] font-semibold tabular-nums text-[#101329]">{formatEUR(t.price, locale)}</div>
            <div className="text-[10px] leading-tight text-[#6b6f86]">{v.perSeat}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-[11.5px]">
        <span className="text-[#5a5e75]">
          Pro · 12 {v.seats}
        </span>
        <span className="font-semibold tabular-nums text-[#101329]">
          {formatEUR(180, locale)} <span className="font-normal text-[#6b6f86]">{v.perMonth}</span>
        </span>
      </div>
    </div>
  );
}

function AiVisual({ v, locale }: { v: V; locale: LocaleCode }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-4 pt-8 font-ui backdrop-blur" aria-hidden="true">
      <SampleTag dark>{v.sample}</SampleTag>
      <div className="grid grid-cols-2 rounded-lg bg-white/[0.07] p-0.5 text-center text-[11px]">
        <span className="rounded-md bg-white py-1 font-medium text-[#24215a]">{v.monthly}</span>
        <span className="py-1 text-white/70">{v.annual}</span>
      </div>
      <ul className="mt-3 space-y-1.5 text-[12px]">
        {[
          ['Pro', formatEUR(39, locale)],
          [`5 ${v.seats}`, formatEUR(95, locale)],
          [`${v.addOn} · Priority`, formatEUR(20, locale)],
        ].map(([k, val]) => (
          <li key={k} className="flex items-center justify-between rounded-lg bg-white/[0.06] px-3 py-2 text-white">
            <span className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-[#5fe1f0]" />
              {k}
            </span>
            <span className="tabular-nums text-white/80">{val}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustrialVisual({ v, locale }: { v: V; locale: LocaleCode }) {
  const rows = [
    { site: 'Hamburg', n: 6 },
    { site: 'Lyon', n: 14 },
    { site: 'Porto', n: 3 },
  ];
  const price = 89;
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#1b1d2e] p-4 pt-8 font-ui" aria-hidden="true">
      <SampleTag dark>{v.sample}</SampleTag>
      <div className="text-[11.5px] font-medium text-[#5fe1f0]">
        {v.contract} · {formatEUR(price, locale)} {v.perMachine}
      </div>
      <ul className="mt-3 divide-y divide-white/[0.06] rounded-xl border border-white/[0.08]">
        {rows.map((r) => (
          <li key={r.site} className="flex items-center justify-between px-3 py-2 text-[12px] text-white/85">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-sm bg-[#39d5e8]" />
              {r.site} · {r.n} {v.machines}
            </span>
            <span className="tabular-nums text-white">
              {formatEUR(r.n * price, locale)} <span className="text-white/50">{v.perMonth}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-between px-1 text-[11.5px] text-white/60">
        <span>3 {v.sites}</span>
        <span className="tabular-nums">23 {v.machines}</span>
      </div>
    </div>
  );
}

function DigitalVisual({ v, locale }: { v: V; locale: LocaleCode }) {
  return (
    <div className="relative rounded-2xl border border-white/70 bg-white/80 p-4 pt-8 font-ui shadow-[0_20px_40px_-24px_rgba(36,33,90,0.45)] backdrop-blur" aria-hidden="true">
      <SampleTag>{v.sample}</SampleTag>
      <div className="flex items-center gap-2 rounded-lg border border-[#e7e8f0] bg-white px-3 py-2 text-[11px] text-[#6b6f86]">
        <Link2 className="h-3.5 w-3.5 text-[#7657f6]" />
        <span className="truncate">pay.example.com/online-course</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-[#101329]">Online course</div>
          <div className="text-[11.5px] tabular-nums text-[#6b6f86]">
            {formatEUR(29, locale)} {v.perMonth}
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#20b486]/10 px-2 py-0.5 text-[11px] font-medium text-[#12865f]">
          <Check className="h-3 w-3" />
          {v.paid}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Card', 'SEPA', 'PayPal', 'iDEAL'].map((m) => (
          <span key={m} className="rounded-full border border-[#e7e8f0] bg-white px-2 py-0.5 text-[10.5px] text-[#5a5e75]">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

const STYLES: Record<
  AudienceKey,
  { card: string; dark: boolean; span: string; wide: boolean; icon: LucideIcon; chip: string; tag: string; title: string; body: string }
> = {
  saas: {
    card: 'border border-[#e7e8f0] bg-[#f8f9fc] dark:border-line dark:bg-surface',
    dark: false,
    span: 'lg:col-span-7',
    wide: true,
    icon: Layers,
    chip: 'bg-[#7657f6]/10 text-[#5f43e9]',
    tag: 'border-[#e7e8f0] text-[#4b4f66] dark:border-line dark:text-muted',
    title: 'text-[#101329] dark:text-ink',
    body: 'text-[#4b4f66] dark:text-muted',
  },
  ai: {
    card: 'border border-white/10 bg-[linear-gradient(140deg,#101329_0%,#24215a_55%,#7657f6_135%)]',
    dark: true,
    span: 'lg:col-span-5',
    wide: false,
    icon: Sparkles,
    chip: 'bg-white/10 text-[#e4dcff]',
    tag: 'border-white/15 text-[#d9dcec]',
    title: 'text-white',
    body: 'text-[#c9cbe0]',
  },
  industrial: {
    card: 'border border-white/10 bg-[#242638]',
    dark: true,
    span: 'lg:col-span-5',
    wide: false,
    icon: Factory,
    chip: 'bg-[#39d5e8]/12 text-[#5fe1f0]',
    tag: 'border-white/15 text-[#d9dcec]',
    title: 'text-white',
    body: 'text-[#c3c5d6]',
  },
  digital: {
    card: 'border border-[#d9d1ff] bg-[linear-gradient(140deg,#7657f6_-40%,#9a68ff_10%,#eae6ff_70%)]',
    dark: false,
    span: 'lg:col-span-7',
    wide: true,
    icon: Globe2,
    chip: 'bg-white/70 text-[#4a30cf]',
    tag: 'border-white/70 bg-white/40 text-[#242638]',
    title: 'text-[#101329]',
    body: 'text-[#242638]',
  },
};

const ORDER: AudienceKey[] = ['saas', 'ai', 'industrial', 'digital'];

export function BusinessModels() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = BUSINESS_MODELS_COPY[locale];

  const visual = (k: AudienceKey) => {
    switch (k) {
      case 'saas':
        return <SaasVisual v={copy.visuals} locale={locale} />;
      case 'ai':
        return <AiVisual v={copy.visuals} locale={locale} />;
      case 'industrial':
        return <IndustrialVisual v={copy.visuals} locale={locale} />;
      case 'digital':
        return <DigitalVisual v={copy.visuals} locale={locale} />;
    }
  };

  return (
    <section aria-labelledby="business-models-heading" className="relative bg-white py-20 md:py-28 dark:bg-canvas">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="business-models-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {ORDER.map((key, i) => {
            const a = copy.audiences[key];
            const s = STYLES[key];
            const Icon = s.icon;
            const href = resolveNavHref(AUDIENCE_LINKS[key]);
            return (
              <Reveal
                as="article"
                key={key}
                index={i}
                aria-labelledby={`aud-${key}`}
                className={`group/aud relative isolate flex flex-col overflow-hidden rounded-3xl p-6 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(36,33,90,0.55)] md:p-8 ${s.card} ${s.span} ${
                  s.dark ? 'dark text-ink' : ''
                }`}
              >
                {/* Background accents per audience */}
                {key === 'ai' && (
                  <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                    <div className="orb orb-cyan animate-drift-slow -right-16 -top-16 h-56 w-56 opacity-30" />
                    <svg viewBox="0 0 200 120" className="absolute bottom-0 right-0 h-40 w-64 opacity-25">
                      {[[20, 90], [60, 40], [110, 70], [150, 25], [185, 80]].map(([x, y], n, arr) => (
                        <g key={n}>
                          {n > 0 && <line x1={arr[n - 1][0]} y1={arr[n - 1][1]} x2={x} y2={y} stroke="#b29dff" strokeWidth="0.6" />}
                          <circle cx={x} cy={y} r="2.5" fill="#5fe1f0" />
                        </g>
                      ))}
                    </svg>
                  </div>
                )}
                {key === 'industrial' && (
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(57,213,232,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(57,213,232,0.07)_1px,transparent_1px)] [background-size:24px_24px]"
                    aria-hidden="true"
                  />
                )}

                <div className={`grid flex-1 grid-cols-1 gap-6 ${s.wide ? 'md:grid-cols-2 md:items-center md:gap-8' : ''}`}>
                  <div>
                    <div className="mb-5 flex items-center gap-2.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-ui text-[12px] font-semibold ${s.chip}`}>
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {a.label}
                      </span>
                      {key === 'ai' && <Cpu className="h-4 w-4 text-white/40" aria-hidden="true" />}
                    </div>
                    <h3 id={`aud-${key}`} className={`font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.025em] ${s.title}`}>
                      {a.title}
                    </h3>
                    <p className={`mt-3 text-[15px] leading-relaxed ${s.body}`}>{a.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <li key={t} className={`rounded-full border px-2.5 py-1 font-ui text-[12px] ${s.tag}`}>
                          {t}
                        </li>
                      ))}
                    </ul>
                    {href && (
                      <AppLink
                        href={localHref(href)}
                        className={`mt-6 inline-flex items-center gap-1.5 font-ui text-sm font-semibold transition-[gap,color] duration-300 hover:gap-2.5 ${
                          s.dark ? 'text-[#cfc3ff] hover:text-white' : key === 'digital' ? 'text-[#4a30cf] hover:text-[#24215a]' : 'link-arrow'
                        }`}
                      >
                        {a.cta}
                        <span className="sr-only">: {a.title}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </AppLink>
                    )}
                  </div>
                  {visual(key)}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
