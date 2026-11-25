import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { BRAND_MARKS } from '../data/brandMarks';
import { HOW_IT_WORKS_COPY, type HowStepKey } from '../data/homeContent';
import { formatEUR, type LocaleCode } from '../utils/formatting';
import { Reveal } from './motion';

/*
 * How it works: four steps joined by a thin violet→cyan line (horizontal from lg up,
 * vertical on smaller screens). The line draws in on scroll, then the numbered
 * indicators and step cards follow in a stagger. Each card has a miniature UI preview.
 */

/* ---------------------------- Mini UI previews ---------------------------- */

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`relative inline-flex h-3.5 w-6 shrink-0 rounded-full transition-colors ${on ? 'bg-[#7657f6]' : 'bg-[#d5d7e5]'}`}>
      <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow transition-[left] ${on ? 'left-3' : 'left-0.5'}`} />
    </span>
  );
}

function ConnectPreview() {
  const rows: { name: string; mark?: keyof typeof BRAND_MARKS; on: boolean }[] = [
    { name: 'Stripe', mark: 'stripe', on: true },
    { name: 'GoCardless', on: true },
    { name: 'PayPal', mark: 'paypal', on: false },
  ];
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => {
        const mark = r.mark ? BRAND_MARKS[r.mark] : null;
        return (
          <li key={r.name} className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 shadow-[0_1px_2px_rgba(16,19,41,0.05)]">
            <span className="inline-flex items-center gap-2 font-ui text-[11px] font-medium text-[#242638]">
              <span className="flex h-4 w-4 items-center justify-center rounded border border-[#ecedf3] text-[#6b6f86]">
                {mark ? (
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                    <path d={mark.path} />
                  </svg>
                ) : (
                  <span className="text-[7px] font-bold">Go</span>
                )}
              </span>
              {r.name}
            </span>
            <Toggle on={r.on} />
          </li>
        );
      })}
    </ul>
  );
}

function PlansPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  return (
    <div className="space-y-1.5 font-ui text-[11px]">
      <div className="flex gap-1.5">
        <span className="flex-1 rounded-lg border border-[#e7e8f0] bg-white px-2.5 py-1.5">
          <span className="block text-[9.5px] text-[#9a9db2]">{de ? 'Tarif' : 'Plan'}</span>
          <span className="font-medium text-[#242638]">Pro</span>
        </span>
        <span className="flex-1 rounded-lg border border-[#7657f6]/40 bg-white px-2.5 py-1.5 ring-2 ring-[#7657f6]/10">
          <span className="block text-[9.5px] text-[#9a9db2]">{de ? 'Preis' : 'Price'}</span>
          <span className="font-medium tabular-nums text-[#242638]">
            {formatEUR(49, locale)}
            <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-[#7657f6]" />
          </span>
        </span>
      </div>
      <div className="grid grid-cols-2 rounded-lg bg-[#eceefa] p-0.5 text-center">
        <span className="rounded-md bg-white py-1 font-medium text-[#5f43e9] shadow-[0_1px_2px_rgba(16,19,41,0.08)]">{de ? 'Monatlich' : 'Monthly'}</span>
        <span className="py-1 text-[#6b6f86]">{de ? 'Jährlich' : 'Yearly'}</span>
      </div>
      <div className="flex gap-1.5">
        <span className="rounded-full bg-[#7657f6]/10 px-2 py-0.5 text-[10px] font-medium text-[#5f43e9]">{de ? 'Wiederkehrend' : 'Recurring'}</span>
        <span className="rounded-full border border-[#e7e8f0] bg-white px-2 py-0.5 text-[10px] text-[#6b6f86]">{de ? 'Einmalig' : 'One-time'}</span>
        <span className="rounded-full border border-[#e7e8f0] bg-white px-2 py-0.5 text-[10px] text-[#6b6f86]">{de ? 'Pro Nutzer' : 'Per seat'}</span>
      </div>
    </div>
  );
}

function ManagePreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const rows = [
    { i: 'AS', name: 'Acme Studio', amt: 159, s: de ? 'Bezahlt' : 'Paid', cls: 'text-[#12865f] bg-[#20b486]/10' },
    { i: 'NC', name: 'Northwind Club', amt: 29, s: de ? 'Bezahlt' : 'Paid', cls: 'text-[#12865f] bg-[#20b486]/10' },
    { i: 'LA', name: 'Lumen Academy', amt: 149, s: de ? 'Neuer Versuch' : 'Retrying', cls: 'text-[#b86e0e] bg-[#f4ae52]/15' },
  ];
  return (
    <ul className="space-y-1.5 font-ui text-[11px]">
      {rows.map((r) => (
        <li key={r.name} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(16,19,41,0.05)]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7657f6] to-[#39d5e8] text-[8px] font-semibold text-white">
            {r.i}
          </span>
          <span className="min-w-0 flex-1 truncate font-medium text-[#242638]">{r.name}</span>
          <span className="tabular-nums text-[#5a5e75]">{formatEUR(r.amt, locale)}</span>
          <span className={`rounded-full px-1.5 py-0.5 text-[9.5px] font-medium ${r.cls}`}>{r.s}</span>
        </li>
      ))}
    </ul>
  );
}

function MonitorPreview({ locale }: { locale: LocaleCode }) {
  const values = [31, 33, 34, 36, 38, 41, 43, 46, 49];
  const W = 180;
  const H = 46;
  const max = Math.max(...values);
  const min = Math.min(...values) - 4;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * W},${H - ((v - min) / (max - min)) * H}`);
  return (
    <div className="font-ui">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] text-[#6b6f86]">{locale === 'de' ? 'Wiederkehrender Umsatz' : 'Recurring revenue'}</span>
        <ArrowUpRight className="h-3 w-3 text-[#12865f]" />
      </div>
      <div className="text-[15px] font-semibold tracking-tight text-[#101329] tabular-nums">{formatEUR(48920, locale)}</div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-1.5 h-11 w-full overflow-visible">
        <defs>
          <linearGradient id="how-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7657f6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7657f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,${H} ${pts.join(' ')} ${W},${H}`} fill="url(#how-spark)" className="chart-area" />
        <polyline points={pts.join(' ')} fill="none" stroke="#7657f6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} className="chart-line" />
      </svg>
    </div>
  );
}

/* --------------------------------- Section -------------------------------- */

export function HowItWorks({ ctaHref }: { ctaHref: string }) {
  const { locale } = useRouter();
  const copy = HOW_IT_WORKS_COPY[locale];

  // Steps render in copy order: Configure (plans) → Connect Payments → Manage Billing → Track Revenue.
  const preview = (key: HowStepKey) => {
    switch (key) {
      case 'connect':
        return <ConnectPreview />;
      case 'plans':
        return <PlansPreview locale={locale} />;
      case 'manage':
        return <ManagePreview locale={locale} />;
      case 'monitor':
        return <MonitorPreview locale={locale} />;
    }
  };

  return (
    <section aria-labelledby="how-heading" className="relative bg-[#f8f9fc] py-20 md:py-28 dark:bg-canvas">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="how-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
        </Reveal>

        <Reveal as="ol" className="steps-track relative mt-14 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line: horizontal through the indicators (lg+), vertical on the left below lg */}
          <span
            className="steps-line-h pointer-events-none absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-[#7657f6] via-[#9a68ff] to-[#39d5e8] lg:block"
            aria-hidden="true"
          />

          {copy.steps.map((step, i) => (
            <li
              key={step.key}
              className="step-item relative grid grid-cols-[2.5rem_1fr] gap-4 lg:flex lg:flex-col lg:items-center lg:gap-0"
              style={{ ['--i' as string]: i } as React.CSSProperties}
            >
              {/* Vertical segment to the next step (below lg) */}
              {i < copy.steps.length - 1 && (
                <span
                  className="steps-seg pointer-events-none absolute -bottom-8 left-5 top-5 w-px bg-gradient-to-b from-[#7657f6] to-[#39d5e8] lg:hidden"
                  aria-hidden="true"
                />
              )}
              {/* Numbered indicator */}
              <span className="step-dot relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--grad-button)] font-ui text-[13px] font-semibold text-white shadow-[0_0_0_6px_#f8f9fc,0_10px_24px_-8px_rgba(118,87,246,0.7)] dark:shadow-[0_0_0_6px_var(--mfb-canvas),0_10px_24px_-8px_rgba(118,87,246,0.7)]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Step card */}
              <div className="step-card group/step relative rounded-2xl border border-[#e7e8f0] bg-white p-4 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#7657f6]/30 hover:shadow-[0_20px_40px_-24px_rgba(36,33,90,0.4)] lg:mt-6 lg:w-full dark:border-line dark:bg-surface">
                <div className="relative h-[8.75rem] overflow-hidden rounded-xl bg-gradient-to-br from-[#f4f2ff] to-[#eef4ff] p-3 dark:from-[#1d1a45] dark:to-[#141739]" aria-hidden="true">
                  {(step.key === 'manage' || step.key === 'monitor') && (
                    <span className="absolute right-2.5 top-2 z-10 font-ui text-[9px] font-medium uppercase tracking-[0.12em] text-[#9a9db2]">
                      {copy.sample}
                    </span>
                  )}
                  <div className={step.key === 'manage' || step.key === 'monitor' ? 'mt-3' : ''}>{preview(step.key)}</div>
                </div>
                <h3 className="mt-4 px-1 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-[#242638] dark:text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 px-1 pb-1 text-[14px] leading-relaxed text-[#5a5e75] dark:text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-14 flex justify-center">
          <a href={ctaHref} className="btn-primary hero-cta-primary px-6 py-3.5 font-ui text-[15px]">
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
