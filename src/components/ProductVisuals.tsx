import React, { useId, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CreditCard,
  FileText,
  Link2,
  Lock,
  Mail,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { formatEUR, formatEUNumber } from '../utils/formatting';
import { HOME_COPY, type FeatureVisual } from '../data/homeContent';
import { useInView } from './motion';

/*
 * Illustrative product mock-ups built from HTML/SVG (no screenshots yet).
 * All figures are sample data and every mock carries a visible "Illustrative data" label.
 * Replace with real MYFUNDBOX app screenshots/components when available.
 */

const MRR_SERIES = [31200, 32400, 33100, 34800, 35600, 37900, 39200, 40400, 42700, 44100, 46300, 48920];
const MONTHS_EN = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const MONTHS_DE = ['Dez', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov'];
const GATEWAY_SHARE = [
  { name: 'Stripe', share: 46 },
  { name: 'GoCardless', share: 24 },
  { name: 'Mollie', share: 14 },
  { name: 'PayPal', share: 11 },
  { name: 'Checkout.com', share: 5 },
];

function IllustrativeBadge({ className = '' }: { className?: string }) {
  const { locale } = useRouter();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-ui text-[10.5px] font-medium text-[#b9bcd2] ${className}`}
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      {HOME_COPY[locale].illustrative}
    </span>
  );
}

function WindowBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-ui text-xs font-medium text-[#d9dcec]">{title}</span>
      </div>
      <IllustrativeBadge />
    </div>
  );
}

/** Smooth path through points (monotone-ish cubic via midpoints). */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

/**
 * Single-series area chart (no legend: the card title names the series).
 * 2px line, recessive grid, crosshair + tooltip on hover.
 */
export function AreaChart({ values, labels, height = 150, format }: { values: number[]; labels: string[]; height?: number; format: (n: number) => string }) {
  const id = useId().replace(/:/g, '');
  const W = 400;
  const H = height;
  const pad = 12;
  const min = Math.min(...values) * 0.94;
  const max = Math.max(...values) * 1.02;
  const pts: [number, number][] = values.map((v, i) => [
    (i / (values.length - 1)) * W,
    H - pad - ((v - min) / (max - min)) * (H - pad * 2),
  ]);
  const line = smoothPath(pts);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    setHover(Math.max(0, Math.min(values.length - 1, Math.round((x / W) * (values.length - 1)))));
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block h-[150px] w-full touch-none"
        style={{ height }}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Sample chart rising from ${format(values[0])} to ${format(values[values.length - 1])}`}
      >
        <defs>
          <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7657F6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7657F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9A68FF" />
            <stop offset="100%" stopColor="#39D5E8" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.06)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={area} fill={`url(#fill-${id})`} className="chart-area" />
        <path
          d={line}
          fill="none"
          stroke={`url(#stroke-${id})`}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          className="chart-line"
        />
        {hover !== null && (
          <line x1={pts[hover][0]} x2={pts[hover][0]} y1="0" y2={H} stroke="rgba(255,255,255,0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        )}
      </svg>
      {hover !== null && (
        <>
          <span
            className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#121531] bg-[#39D5E8]"
            style={{ left: `${(pts[hover][0] / W) * 100}%`, top: `${(pts[hover][1] / H) * 100}%` }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0d1f] px-2.5 py-1.5 font-ui text-[11px] shadow-xl"
            style={{ left: `${Math.min(85, Math.max(15, (pts[hover][0] / W) * 100))}%` }}
          >
            <span className="text-[#9195ae]">{labels[hover]} · </span>
            <span className="font-semibold text-white tabular-nums">{format(values[hover])}</span>
          </div>
        </>
      )}
      <div className="mt-2 flex justify-between font-ui text-[10.5px] text-[#9195ae]" aria-hidden="true">
        {labels.filter((_, i) => i % 3 === 0 || i === labels.length - 1).map((l, i) => (
          <span key={`${l}-${i}`}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function Kpi({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
      <div className="flex items-center gap-1.5 font-ui text-[11px] text-[#9195ae]">
        {icon}
        {label}
      </div>
      <div className="mt-1.5 font-ui text-lg font-semibold tracking-tight text-white tabular-nums">{value}</div>
      {delta && (
        <div className="mt-0.5 inline-flex items-center gap-0.5 font-ui text-[11px] font-medium text-[#3ed3a0]">
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          {delta}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero dashboard                                                              */
/* -------------------------------------------------------------------------- */

export function HeroDashboard() {
  const { locale } = useRouter();
  const months = locale === 'de' ? MONTHS_DE : MONTHS_EN;
  const de = locale === 'de';

  return (
    <div className="relative" role="img" aria-label={de ? 'Illustrative Vorschau des MYFUNDBOX-Umsatz-Dashboards mit Beispieldaten' : 'Illustrative preview of the MYFUNDBOX revenue dashboard with sample data'}>
      {/* Glow behind the window */}
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(118,87,246,0.45),transparent_70%)] blur-2xl" aria-hidden="true" />

      <div className="glass no-reveal relative overflow-hidden">
        <WindowBar title={de ? 'Umsatzübersicht' : 'Revenue overview'} />
        <div className="space-y-4 p-4 sm:p-5" aria-hidden="true">
          <div className="grid grid-cols-3 gap-2.5">
            <Kpi label="MRR" value={formatEUR(48920, locale)} delta="5.6%" icon={<TrendingUp className="h-3 w-3" />} />
            <Kpi label={de ? 'Aktive Abos' : 'Active subs'} value={formatEUNumber(1284, locale)} delta="3.1%" icon={<Users className="h-3 w-3" />} />
            <Kpi label={de ? 'Zurückgeholt' : 'Recovered'} value={formatEUR(3410, locale)} delta="12%" icon={<RefreshCw className="h-3 w-3" />} />
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-ui text-xs font-medium text-[#d9dcec]">{de ? 'Monatlich wiederkehrender Umsatz' : 'Monthly recurring revenue'}</span>
              <span className="font-ui text-[11px] text-[#9195ae]">{de ? '12 Monate' : 'Last 12 months'}</span>
            </div>
            <AreaChart values={MRR_SERIES} labels={months} height={120} format={(n) => formatEUR(n, locale)} />
          </div>

          <div className="hidden grid-cols-2 gap-2.5 sm:grid">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <div className="mb-2.5 font-ui text-xs font-medium text-[#d9dcec]">{de ? 'Zahlungen nach Anbieter' : 'Payments by gateway'}</div>
              <ul className="space-y-2">
                {GATEWAY_SHARE.slice(0, 3).map((g, i) => (
                  <li key={g.name} className="font-ui text-[11px]">
                    <div className="mb-1 flex justify-between text-[#b9bcd2]">
                      <span>{g.name}</span>
                      <span className="tabular-nums text-white">{g.share}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="chart-bar-x h-full rounded-full bg-[image:var(--grad-cyan)]"
                        style={{ width: `${g.share * 2}%`, ['--bar-i' as string]: i }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <div className="mb-2.5 font-ui text-xs font-medium text-[#d9dcec]">{de ? 'Aktivität' : 'Activity'}</div>
              <ul className="space-y-2.5 font-ui text-[11px]">
                <li className="flex items-center gap-2 text-[#b9bcd2]">
                  <span className="live-dot" />
                  <span className="truncate">{de ? 'Neues Abo · Pro jährlich' : 'New subscription · Pro annual'}</span>
                </li>
                <li className="flex items-center gap-2 text-[#b9bcd2]">
                  <Check className="h-3 w-3 shrink-0 text-[#3ed3a0]" />
                  <span className="truncate">{de ? 'Zahlung erhalten · SEPA' : 'Payment received · SEPA'}</span>
                </li>
                <li className="flex items-center gap-2 text-[#b9bcd2]">
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-[#5fe1f0]" />
                  <span className="truncate">{de ? 'Upgrade · Team → Business' : 'Upgrade · Team → Business'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating detail cards */}
      <div className="glass animate-float absolute -left-8 top-24 hidden w-56 p-3.5 xl:block" aria-hidden="true">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#20b486]/15 text-[#3ed3a0]">
            <RefreshCw className="h-4 w-4" />
          </span>
          <div>
            <div className="font-ui text-xs font-semibold text-white">{de ? 'Zahlung zurückgeholt' : 'Payment recovered'}</div>
            <div className="font-ui text-[11px] text-[#9195ae]">{de ? 'Automatischer 2. Versuch' : 'Automatic retry #2'}</div>
          </div>
        </div>
        <div className="mt-2.5 font-ui text-base font-semibold text-[#3ed3a0] tabular-nums">+{formatEUR(129, locale, 2)}</div>
      </div>

      <div className="glass animate-float-slow absolute -bottom-6 -right-6 hidden w-60 p-3.5 lg:block" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="font-ui text-[11px] text-[#9195ae]">{de ? 'Neues Abonnement' : 'New subscription'}</span>
          <span className="live-dot" />
        </div>
        <div className="mt-1.5 font-ui text-sm font-semibold text-white">Pro · {de ? 'jährlich' : 'annual'}</div>
        <div className="mt-2 flex items-end justify-between">
          <span className="font-ui text-lg font-semibold text-white tabular-nums">{formatEUR(1908, locale)}</span>
          <span className="font-ui text-[11px] text-[#9195ae]">/ {de ? 'Jahr' : 'year'}</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tabbed dashboard showcase                                                   */
/* -------------------------------------------------------------------------- */

type ShowcaseTab = 'overview' | 'subscriptions' | 'payments';

const SAMPLE_SUBS = [
  { customer: 'Acme Studio', plan: 'Pro', interval: 'Annual', amount: 1908, status: 'active' },
  { customer: 'Northwind Club', plan: 'Membership', interval: 'Monthly', amount: 29, status: 'active' },
  { customer: 'Lumen Academy', plan: 'Business', interval: 'Monthly', amount: 149, status: 'trial' },
  { customer: 'Blue Harbor Agency', plan: 'Retainer', interval: 'Monthly', amount: 1200, status: 'pastdue' },
  { customer: 'Fjord Fitness', plan: 'Team', interval: 'Quarterly', amount: 237, status: 'active' },
] as const;

function StatusPill({ status, de }: { status: 'active' | 'trial' | 'pastdue' | 'recovered' | 'retry' | 'reminder'; de: boolean }) {
  const map = {
    active: { icon: Check, label: de ? 'Aktiv' : 'Active', cls: 'text-[#3ed3a0] bg-[#20b486]/12' },
    recovered: { icon: Check, label: de ? 'Zurückgeholt' : 'Recovered', cls: 'text-[#3ed3a0] bg-[#20b486]/12' },
    trial: { icon: Sparkles, label: de ? 'Testphase' : 'Trial', cls: 'text-[#cfc3ff] bg-[#7657f6]/18' },
    pastdue: { icon: AlertCircle, label: de ? 'Überfällig' : 'Past due', cls: 'text-[#f4ae52] bg-[#f4ae52]/12' },
    retry: { icon: RefreshCw, label: de ? 'Wiederholung geplant' : 'Retry scheduled', cls: 'text-[#5fe1f0] bg-[#39d5e8]/12' },
    reminder: { icon: Mail, label: de ? 'Erinnerung gesendet' : 'Reminder sent', cls: 'text-[#f4ae52] bg-[#f4ae52]/12' },
  }[status];
  const Icon = map.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-ui text-[11px] font-medium ${map.cls}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {map.label}
    </span>
  );
}

function MrrBars({ locale }: { locale: 'en' | 'de' }) {
  const months = locale === 'de' ? MONTHS_DE : MONTHS_EN;
  const max = Math.max(...MRR_SERIES);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      <div className="relative flex h-48 items-end gap-1.5 sm:gap-2.5">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <div key={f} className="pointer-events-none absolute inset-x-0 border-t border-white/[0.05]" style={{ bottom: `${f * 100}%` }} aria-hidden="true" />
        ))}
        {MRR_SERIES.map((v, i) => (
          <div
            key={i}
            className="group relative flex h-full flex-1 items-end"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          >
            {hover === i && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0d1f] px-2 py-1 font-ui text-[11px] shadow-xl">
                <span className="text-[#9195ae]">{months[i]} · </span>
                <span className="font-semibold text-white tabular-nums">{formatEUR(v, locale)}</span>
              </div>
            )}
            <div
              className={`chart-bar w-full rounded-t-[4px] transition-[filter] ${i === MRR_SERIES.length - 1 ? 'bg-[image:var(--grad-cyan)]' : 'bg-[#7657f6]/70'} ${hover === i ? 'brightness-125' : ''}`}
              style={{ height: `${(v / max) * 100}%`, ['--bar-i' as string]: i }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 font-ui text-[10.5px] text-[#9195ae] sm:gap-2.5" aria-hidden="true">
        {months.map((m, i) => (
          <span key={m + i} className="flex-1 text-center">{i % 2 === 1 || i === months.length - 1 ? m : ''}</span>
        ))}
      </div>
    </div>
  );
}

export function DashboardShowcase() {
  const { locale } = useRouter();
  const copy = HOME_COPY[locale].showcase;
  const de = locale === 'de';
  const [tab, setTab] = useState<ShowcaseTab>('overview');
  const tabs: ShowcaseTab[] = ['overview', 'subscriptions', 'payments'];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { ref, inView } = useInView<HTMLDivElement>();

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setTab(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={ref} className={`glass relative overflow-hidden ${inView ? 'is-visible' : ''}`}>
      <div className="flex flex-col gap-3 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div role="tablist" aria-label={copy.heading} className="inline-flex w-fit rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
          {tabs.map((t, idx) => (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`showcase-tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`showcase-panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              className={`relative rounded-lg px-3.5 py-1.5 font-ui text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                tab === t ? 'bg-white/[0.1] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]' : 'text-[#9195ae] hover:text-white'
              }`}
            >
              {copy.tabs[t]}
            </button>
          ))}
        </div>
        <IllustrativeBadge />
      </div>

      <div
        key={tab}
        id={`showcase-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`showcase-tab-${tab}`}
        className="animate-fade p-4 sm:p-6"
      >
        {tab === 'overview' && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1">
              <Kpi label="MRR" value={formatEUR(48920, locale)} delta="5.6%" icon={<TrendingUp className="h-3 w-3" />} />
              <Kpi label="ARR" value={formatEUR(587040, locale)} delta="5.6%" icon={<TrendingUp className="h-3 w-3" />} />
              <Kpi label={de ? 'Neuer MRR (Monat)' : 'Net new MRR (month)'} value={`+${formatEUR(2620, locale)}`} icon={<ArrowUpRight className="h-3 w-3" />} />
              <Kpi label={de ? 'Abwanderung' : 'Churn rate'} value="2.1%" icon={<Users className="h-3 w-3" />} />
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 lg:col-span-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-ui text-sm font-medium text-[#d9dcec]">{de ? 'MRR pro Monat' : 'MRR by month'}</span>
                <span className="font-ui text-[11px] text-[#9195ae]">EUR</span>
              </div>
              <MrrBars locale={locale} />
            </div>
          </div>
        )}

        {tab === 'subscriptions' && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left font-ui text-[13px]">
              <caption className="sr-only">{copy.disclaimer}</caption>
              <thead>
                <tr className="border-b border-white/[0.07] text-[11px] uppercase tracking-wider text-[#9195ae]">
                  <th className="py-2.5 pr-3 font-medium">{de ? 'Kunde' : 'Customer'}</th>
                  <th className="px-3 py-2.5 font-medium">{de ? 'Tarif' : 'Plan'}</th>
                  <th className="px-3 py-2.5 font-medium">{de ? 'Intervall' : 'Interval'}</th>
                  <th className="px-3 py-2.5 text-right font-medium">{de ? 'Betrag' : 'Amount'}</th>
                  <th className="py-2.5 pl-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {SAMPLE_SUBS.map((s) => (
                  <tr key={s.customer} className="transition-colors hover:bg-white/[0.03]">
                    <td className="py-3 pr-3 font-medium text-white">{s.customer}</td>
                    <td className="px-3 py-3 text-[#b9bcd2]">{s.plan}</td>
                    <td className="px-3 py-3 text-[#b9bcd2]">{s.interval}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-white">{formatEUR(s.amount, locale)}</td>
                    <td className="py-3 pl-3">
                      <StatusPill status={s.status} de={de} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'payments' && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="mb-4 font-ui text-sm font-medium text-[#d9dcec]">{de ? 'Zahlungsvolumen nach Anbieter' : 'Payment volume by gateway'}</div>
              <ul className="space-y-3">
                {GATEWAY_SHARE.map((g, i) => (
                  <li key={g.name} className="font-ui text-[12px]">
                    <div className="mb-1.5 flex justify-between text-[#b9bcd2]">
                      <span>{g.name}</span>
                      <span className="tabular-nums text-white">{g.share}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="chart-bar-x h-full rounded-full bg-[image:var(--grad-cyan)]"
                        style={{ width: `${g.share * 2}%`, ['--bar-i' as string]: i }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="mb-4 font-ui text-sm font-medium text-[#d9dcec]">{de ? 'Fehlgeschlagene Zahlungen' : 'Failed payment recovery'}</div>
              <ul className="divide-y divide-white/[0.05] font-ui text-[13px]">
                {[
                  { who: 'Acme Studio', amount: 159, status: 'recovered' as const },
                  { who: 'Northwind Club', amount: 29, status: 'retry' as const },
                  { who: 'Blue Harbor Agency', amount: 1200, status: 'reminder' as const },
                  { who: 'Fjord Fitness', amount: 79, status: 'recovered' as const },
                ].map((p) => (
                  <li key={p.who} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <div className="truncate font-medium text-white">{p.who}</div>
                      <div className="text-[11px] tabular-nums text-[#9195ae]">{formatEUR(p.amount, locale, 2)}</div>
                    </div>
                    <StatusPill status={p.status} de={de} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature demonstrations (light surfaces, theme-aware)                         */
/* -------------------------------------------------------------------------- */

function MiniFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(118,87,246,0.18),transparent_70%)] blur-xl" aria-hidden="true" />
      <div className="card relative overflow-hidden p-5 sm:p-6">{children}</div>
    </div>
  );
}

function SampleNote() {
  const { locale } = useRouter();
  return (
    <div className="mt-4 flex items-center gap-1 font-ui text-[11px] text-subtle">
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      {HOME_COPY[locale].illustrative}
    </div>
  );
}

function BillingVisual() {
  const { locale } = useRouter();
  const de = locale === 'de';
  const plans = [
    { name: 'Starter', price: 19, per: de ? '/Monat' : '/mo' },
    { name: 'Pro', price: 49, per: de ? '/Monat' : '/mo', popular: true },
    { name: 'Business', price: 149, per: de ? '/Monat' : '/mo' },
  ];
  return (
    <MiniFrame>
      <div className="grid grid-cols-3 gap-2.5">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border p-3 transition-transform duration-300 hover:-translate-y-0.5 ${
              p.popular ? 'border-transparent bg-[image:var(--grad-button)] text-white shadow-[var(--shadow-glow)]' : 'border-line bg-canvas text-ink'
            }`}
          >
            <div className="font-ui text-[11px] font-medium opacity-80">{p.name}</div>
            <div className="mt-2 font-ui text-lg font-semibold tabular-nums">
              {formatEUR(p.price, locale)}
              <span className="text-[11px] font-normal opacity-70">{p.per}</span>
            </div>
            {p.popular && <div className="mt-2 inline-block rounded-full bg-white/20 px-2 py-0.5 font-ui text-[10px] font-semibold">{de ? 'Beliebt' : 'Popular'}</div>}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 font-ui text-[12px]">
        <span className="rounded-full border border-line bg-soft px-2.5 py-1 text-muted">{de ? '14 Tage testen' : '14-day free trial'}</span>
        <span className="rounded-full border border-line bg-soft px-2.5 py-1 text-muted">{de ? 'Gutschein' : 'Coupon'} · LAUNCH20</span>
        <span className="rounded-full border border-line bg-soft px-2.5 py-1 text-muted">Add-on · {de ? 'Zusätzliche Nutzer' : 'Extra seats'}</span>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-canvas p-3">
        <div className="flex items-center gap-2.5">
          <FileText className="h-4 w-4 text-accent" aria-hidden="true" />
          <div className="font-ui text-[12px]">
            <div className="font-medium text-ink">{de ? 'Rechnung' : 'Invoice'} #2026-1184</div>
            <div className="text-subtle">{de ? 'inkl. 19 % USt' : 'incl. 19% VAT'}</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-positive/10 px-2 py-0.5 font-ui text-[11px] font-medium text-positive">
          <Check className="h-3 w-3" aria-hidden="true" />
          {de ? 'Bezahlt' : 'Paid'}
        </span>
      </div>
      <SampleNote />
    </MiniFrame>
  );
}

function PaymentsVisual() {
  const { locale } = useRouter();
  const de = locale === 'de';
  return (
    <MiniFrame>
      <ul className="divide-y divide-line">
        {GATEWAY_SHARE.map((g) => (
          <li key={g.name} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-canvas font-ui text-[11px] font-bold text-ink">
                {g.name.slice(0, 2)}
              </span>
              <span className="font-ui text-[13px] font-medium text-ink">{g.name}</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-positive/10 px-2 py-0.5 font-ui text-[11px] font-medium text-positive">
              <Check className="h-3 w-3" aria-hidden="true" />
              {de ? 'Verbunden' : 'Connected'}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2 font-ui text-[12px]">
        {[de ? 'Karte' : 'Card', 'SEPA', 'ACH', de ? 'Überweisung' : 'Bank transfer', 'Open banking'].map((m) => (
          <span key={m} className="inline-flex items-center gap-1 rounded-full border border-line bg-soft px-2.5 py-1 text-muted">
            <CreditCard className="h-3 w-3" aria-hidden="true" />
            {m}
          </span>
        ))}
      </div>
      <SampleNote />
    </MiniFrame>
  );
}

function CheckoutVisual() {
  const { locale } = useRouter();
  const de = locale === 'de';
  return (
    <MiniFrame>
      <div className="flex items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-2 font-ui text-[12px] text-muted">
        <Lock className="h-3.5 w-3.5 text-positive" aria-hidden="true" />
        pay.yourbrand.com/pro-annual
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <div className="font-ui text-[12px] text-subtle">Pro · {de ? 'jährlich' : 'annual'}</div>
          <div className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink tabular-nums">{formatEUR(1908, locale)}</div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 font-ui text-[11px]">
            {[de ? 'Karte' : 'Card', 'SEPA', 'PayPal'].map((m, i) => (
              <span key={m} className={`rounded-lg border px-2 py-1.5 text-center ${i === 0 ? 'border-violet bg-accent-soft font-semibold text-accent' : 'border-line text-muted'}`}>
                {m}
              </span>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-[image:var(--grad-button)] py-2 text-center font-ui text-[13px] font-semibold text-white">
            {de ? 'Jetzt bezahlen' : 'Pay now'}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-soft p-3 sm:col-span-2">
          <div className="font-ui text-[11px] font-semibold uppercase tracking-wider text-subtle">{de ? 'Kundenportal' : 'Customer portal'}</div>
          <ul className="mt-2 space-y-1.5 font-ui text-[12px] text-ink">
            <li className="flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{de ? 'Karte ändern' : 'Update card'}</li>
            <li className="flex items-center gap-1.5"><ArrowUpRight className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{de ? 'Tarif wechseln' : 'Change plan'}</li>
            <li className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{de ? 'Rechnungen' : 'Invoices'}</li>
            <li className="flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />{de ? 'Zahlungslink' : 'Pay link'}</li>
          </ul>
        </div>
      </div>
      <SampleNote />
    </MiniFrame>
  );
}

function DunningVisual() {
  const { locale } = useRouter();
  const de = locale === 'de';
  const steps = [
    { day: de ? 'Tag 0' : 'Day 0', title: de ? 'Zahlung fehlgeschlagen' : 'Payment failed', detail: de ? 'Karte abgelaufen' : 'Card expired', icon: AlertCircle, tone: 'text-warning bg-warning/10' },
    { day: de ? 'Tag 1' : 'Day 1', title: de ? 'Erinnerung gesendet' : 'Reminder sent', detail: de ? 'Link zum Aktualisieren der Karte' : 'Link to update card', icon: Mail, tone: 'text-accent bg-accent-soft' },
    { day: de ? 'Tag 3' : 'Day 3', title: de ? 'Automatischer Versuch' : 'Automatic retry', detail: de ? 'Neue Karte erkannt' : 'New card on file', icon: RefreshCw, tone: 'text-cyan bg-cyan/10' },
    { day: de ? 'Tag 3' : 'Day 3', title: de ? 'Zahlung zurückgeholt' : 'Payment recovered', detail: `+${formatEUR(49, locale, 2)}`, icon: Check, tone: 'text-positive bg-positive/10' },
  ];
  return (
    <MiniFrame>
      <ol className="relative space-y-4">
        <span className="absolute bottom-4 left-4 top-4 w-px bg-line" aria-hidden="true" />
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.title} className="relative flex items-start gap-3.5">
              <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-[var(--mfb-surface)] ${s.tone}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex-1 font-ui">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-semibold text-ink">{s.title}</span>
                  <span className="text-[11px] text-subtle">{s.day}</span>
                </div>
                <div className="text-[12px] text-muted">{s.detail}</div>
              </div>
            </li>
          );
        })}
      </ol>
      <SampleNote />
    </MiniFrame>
  );
}

export function FeatureVisualBlock({ visual }: { visual: FeatureVisual }) {
  switch (visual) {
    case 'billing':
      return <BillingVisual />;
    case 'payments':
      return <PaymentsVisual />;
    case 'checkout':
      return <CheckoutVisual />;
    case 'dunning':
      return <DunningVisual />;
  }
}
