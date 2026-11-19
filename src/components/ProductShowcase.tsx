import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Users,
  Repeat,
  type LucideIcon,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { BRAND_MARKS } from '../data/brandMarks';
import { PRODUCT_SHOWCASE_COPY, type ShowcaseTabKey } from '../data/homeContent';
import { formatEUR, formatEUNumber, type LocaleCode } from '../utils/formatting';
import { AppLink } from './ReusableBlocks';
import { Reveal, useInView } from './motion';

/*
 * Product showcase: an illustrative MYFUNDBOX interface (light UI in a midnight-navy frame).
 * Built from HTML/SVG because no app screenshots are available yet. Every figure is sample
 * data for a fictional business and the window carries an "Illustrative preview" label.
 * Shows only verified functionality: subscriptions, billing, multi-gateway payments,
 * refunds, failed-payment recovery, customer portal and revenue reporting.
 */

const TABS: ShowcaseTabKey[] = ['overview', 'subscriptions', 'payments', 'customers', 'analytics'];
const TAB_ICONS: Record<ShowcaseTabKey, LucideIcon> = {
  overview: LayoutDashboard,
  subscriptions: Repeat,
  payments: CreditCard,
  customers: Users,
  analytics: BarChart3,
};

const MRR = [31200, 32400, 33100, 34800, 35600, 37900, 39200, 40400, 42700, 44100, 46300, 48920];
const NEW_SUBS = [62, 58, 71, 66, 74, 80, 77, 85, 90, 88, 94, 101];
const MONTHS: Record<LocaleCode, string[]> = {
  en: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  de: ['Dez', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov'],
};

/* -------------------------------------------------------------------------- */
/* Shared UI atoms (light interface)                                            */
/* -------------------------------------------------------------------------- */

function Panel({ title, aside, children, className = '' }: { title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[#e7e8f0] bg-white p-4 shadow-[0_1px_2px_rgba(16,19,41,0.04)] ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-ui text-[12.5px] font-semibold text-[#242638]">{title}</span>
        {aside && <span className="font-ui text-[11px] text-[#777b91]">{aside}</span>}
      </div>
      {children}
    </div>
  );
}

function Kpi({ label, value, delta, tone = 'up' }: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="rounded-xl border border-[#e7e8f0] bg-white p-3.5 shadow-[0_1px_2px_rgba(16,19,41,0.04)]">
      <div className="truncate font-ui text-[11px] text-[#777b91]">{label}</div>
      <div className="mt-1 truncate font-ui text-[18px] font-semibold tracking-tight text-[#101329] tabular-nums">{value}</div>
      {delta && (
        <div
          className={`mt-0.5 inline-flex items-center gap-0.5 font-ui text-[11px] font-medium ${
            tone === 'up' ? 'text-[#12865f]' : tone === 'down' ? 'text-[#b86e0e]' : 'text-[#777b91]'
          }`}
        >
          {tone === 'up' && <ArrowUpRight className="h-3 w-3" />}
          {delta}
        </div>
      )}
    </div>
  );
}

type Status = 'active' | 'trial' | 'pastdue' | 'cancelled' | 'succeeded' | 'failed' | 'refunded' | 'paid';

function StatusPill({ status, de }: { status: Status; de: boolean }) {
  const map: Record<Status, { label: string; cls: string; icon?: LucideIcon }> = {
    active: { label: de ? 'Aktiv' : 'Active', cls: 'bg-[#20b486]/10 text-[#12865f]', icon: Check },
    paid: { label: de ? 'Bezahlt' : 'Paid', cls: 'bg-[#20b486]/10 text-[#12865f]', icon: Check },
    succeeded: { label: de ? 'Erfolgreich' : 'Succeeded', cls: 'bg-[#20b486]/10 text-[#12865f]', icon: Check },
    trial: { label: de ? 'Testphase' : 'Trial', cls: 'bg-[#7657f6]/10 text-[#5f43e9]', icon: Sparkles },
    pastdue: { label: de ? 'Überfällig' : 'Past due', cls: 'bg-[#f4ae52]/15 text-[#a5600a]', icon: AlertCircle },
    failed: { label: de ? 'Fehlgeschlagen' : 'Failed', cls: 'bg-[#f4ae52]/15 text-[#a5600a]', icon: AlertCircle },
    refunded: { label: de ? 'Erstattet' : 'Refunded', cls: 'bg-[#39d5e8]/15 text-[#0b7b8b]', icon: RotateCcw },
    cancelled: { label: de ? 'Gekündigt' : 'Cancelled', cls: 'bg-[#777b91]/12 text-[#5a5e75]' },
  };
  const s = map[status];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 font-ui text-[10.5px] font-medium ${s.cls}`}>
      {Icon && <Icon className="h-2.5 w-2.5" />}
      {s.label}
    </span>
  );
}

function GatewayBadge({ name }: { name: string }) {
  const key = name.toLowerCase() as keyof typeof BRAND_MARKS;
  const mark = BRAND_MARKS[key];
  return (
    <span className="inline-flex items-center gap-1.5 text-[#4b4f66]">
      <span className="flex h-4 w-4 items-center justify-center rounded border border-[#e7e8f0] bg-white text-[#6b6f86]">
        {mark ? (
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current" aria-hidden="true">
            <path d={mark.path} />
          </svg>
        ) : (
          <span className="text-[7px] font-bold">{name.slice(0, 2)}</span>
        )}
      </span>
      {name}
    </span>
  );
}

/** Table shell with refined header + row hover. */
function DataTable({ head, children, minWidth = 620 }: { head: string[]; children: React.ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left font-ui text-[12px]" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-[#e7e8f0] text-[10.5px] uppercase tracking-[0.06em] text-[#777b91]">
            {head.map((h, i) => (
              <th key={h} className={`px-3 py-2.5 font-medium first:pl-0 last:pr-0 ${i === head.length - 2 ? 'text-right' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f0f1f6]">{children}</tbody>
      </table>
    </div>
  );
}

const TD = 'px-3 py-2.5 first:pl-0 last:pr-0';

/* -------------------------------------------------------------------------- */
/* Charts (single series: the panel title names the series, so no legend)       */
/* -------------------------------------------------------------------------- */

function compactEUR(n: number, locale: LocaleCode): string {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 0,
  }).format(n);
}

function LineChart({
  values,
  labels,
  format,
  tick,
  height = 170,
}: {
  values: number[];
  labels: string[];
  format: (n: number) => string;
  tick: (n: number) => string;
  height?: number;
}) {
  const id = useId().replace(/:/g, '');
  const W = 600;
  const H = height;
  const pad = 10;
  const min = Math.min(...values) * 0.92;
  const max = Math.max(...values) * 1.03;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * W, H - pad - ((v - min) / (max - min)) * (H - pad * 2)] as const);
  let line = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1][0] + pts[i][0]) / 2;
    line += ` C${cx},${pts[i - 1][1]} ${cx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`;
  }
  const area = `${line} L${W},${H} L0,${H} Z`;
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const last = pts[pts.length - 1];
  const yTicks = [max, (max + min) / 2, min];

  return (
    <div className="flex gap-2">
      <div className="flex flex-col justify-between pb-6 text-right font-ui text-[10px] text-[#9a9db2]" style={{ height: H + 24 }} aria-hidden="true">
        {yTicks.map((t) => (
          <span key={t}>{tick(t)}</span>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="block w-full touch-none overflow-visible"
          style={{ height: H }}
          onPointerMove={(e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            setHover(Math.max(0, Math.min(values.length - 1, Math.round(((e.clientX - r.left) / r.width) * (values.length - 1)))));
          }}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`Sample chart rising from ${format(values[0])} to ${format(values[values.length - 1])}`}
        >
          <defs>
            <linearGradient id={`a-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7657f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7657f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.5, 1].map((f) => (
            <line key={f} x1="0" x2={W} y1={pad + f * (H - pad * 2)} y2={pad + f * (H - pad * 2)} stroke="#eef0f5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill={`url(#a-${id})`} className="chart-area" />
          <path d={line} fill="none" stroke="#7657f6" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} className="chart-line" />
          {hover !== null && (
            <line x1={pts[hover][0]} x2={pts[hover][0]} y1="0" y2={H} stroke="#c9cbe0" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          )}
        </svg>
        {/* Cyan highlight on the latest point */}
        <span
          className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#39d5e8] shadow-[0_0_0_4px_rgba(57,213,232,0.2)]"
          style={{ left: `${(last[0] / W) * 100}%`, top: last[1] }}
          aria-hidden="true"
        />
        {hover !== null && (
          <>
            <span
              className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#7657f6]"
              style={{ left: `${(pts[hover][0] / W) * 100}%`, top: pts[hover][1] }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[#101329] px-2.5 py-1.5 font-ui text-[11px] text-white shadow-lg"
              style={{ left: `${Math.min(88, Math.max(12, (pts[hover][0] / W) * 100))}%`, top: pts[hover][1] }}
            >
              <span className="text-[#9195ae]">{labels[hover]} · </span>
              <span className="font-semibold tabular-nums">{format(values[hover])}</span>
            </div>
          </>
        )}
        <div className="mt-2 flex justify-between font-ui text-[10px] text-[#9a9db2]" aria-hidden="true">
          {labels.map((l, i) => (
            <span key={l + i} className={i % 2 === 0 || i === labels.length - 1 ? '' : 'invisible'}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarChart({ values, labels, format, height = 150 }: { values: number[]; labels: string[]; format: (n: number) => string; height?: number }) {
  const max = Math.max(...values);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      <div className="relative flex items-end gap-1.5 sm:gap-2" style={{ height }}>
        {[0.5, 1].map((f) => (
          <span key={f} className="pointer-events-none absolute inset-x-0 border-t border-[#eef0f5]" style={{ bottom: `${f * 100}%` }} aria-hidden="true" />
        ))}
        {values.map((v, i) => (
          <div key={i} className="relative flex h-full flex-1 items-end" onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
            {hover === i && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#101329] px-2 py-1 font-ui text-[11px] text-white shadow-lg">
                <span className="text-[#9195ae]">{labels[i]} · </span>
                <span className="font-semibold tabular-nums">{format(v)}</span>
              </div>
            )}
            <div
              className={`chart-bar w-full rounded-t-[4px] transition-[filter] duration-200 ${
                i === values.length - 1 ? 'bg-gradient-to-t from-[#7657f6] to-[#39d5e8]' : 'bg-[#7657f6]/30'
              } ${hover === i ? 'brightness-110 saturate-150' : ''}`}
              style={{ height: `${(v / max) * 100}%`, ['--bar-i' as string]: i }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 font-ui text-[10px] text-[#9a9db2] sm:gap-2" aria-hidden="true">
        {labels.map((l, i) => (
          <span key={l + i} className={`flex-1 text-center ${i % 2 === 1 || i === labels.length - 1 ? '' : 'invisible'}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function ShareBars({ rows }: { rows: { label: React.ReactNode; key: string; share: number }[] }) {
  return (
    <ul className="space-y-3">
      {rows.map((r, i) => (
        <li key={r.key} className="font-ui text-[12px]">
          <div className="mb-1.5 flex items-center justify-between text-[#4b4f66]">
            {r.label}
            <span className="tabular-nums font-medium text-[#101329]">{r.share}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#f0f1f6]">
            <div
              className={`chart-bar-x h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-[#7657f6] to-[#39d5e8]' : 'bg-[#7657f6]/40'}`}
              style={{ width: `${r.share}%`, ['--bar-i' as string]: i }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Panels                                                                       */
/* -------------------------------------------------------------------------- */

function OverviewPanel({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="MRR" value={formatEUR(48920, locale)} delta={de ? '5,6 % ggü. Vormonat' : '5.6% vs last month'} />
        <Kpi label={de ? 'Aktive Abonnements' : 'Active subscriptions'} value={formatEUNumber(1284, locale)} delta={de ? '+39 diesen Monat' : '+39 this month'} />
        <Kpi label={de ? 'Zahlungen (Monat)' : 'Payments this month'} value={formatEUNumber(1402, locale)} tone="neutral" delta={de ? 'über 4 Anbieter' : 'across 4 gateways'} />
        <Kpi label={de ? 'Offene Fehlzahlungen' : 'Open failed payments'} value="23" tone="down" delta={de ? 'in Bearbeitung' : 'in recovery'} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel title={de ? 'Monatlich wiederkehrender Umsatz' : 'Monthly recurring revenue'} aside={de ? 'Letzte 12 Monate' : 'Last 12 months'} className="lg:col-span-2">
          <LineChart values={MRR} labels={MONTHS[locale]} format={(n) => formatEUR(n, locale)} tick={(n) => compactEUR(n, locale)} />
        </Panel>
        <Panel title={de ? 'MRR nach Tarif' : 'MRR by plan'}>
          <ShareBars
            rows={[
              { key: 'pro', label: <span>Pro</span>, share: 46 },
              { key: 'business', label: <span>Business</span>, share: 36 },
              { key: 'starter', label: <span>Starter</span>, share: 18 },
            ]}
          />
          <p className="mt-4 border-t border-[#f0f1f6] pt-3 font-ui text-[11px] leading-relaxed text-[#777b91]">
            {de ? 'Netto nach Steuern, in EUR.' : 'Net of tax, in EUR.'}
          </p>
        </Panel>
      </div>
    </div>
  );
}

function SubscriptionsPanel({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const rows: { c: string; plan: string; cycle: string; next: string; amt: number; s: Status }[] = [
    { c: 'Acme Studio', plan: 'Pro', cycle: de ? 'Jährlich' : 'Annual', next: de ? '12. Jan. 2027' : '12 Jan 2027', amt: 1908, s: 'active' },
    { c: 'Northwind Club', plan: 'Membership', cycle: de ? 'Monatlich' : 'Monthly', next: de ? '1. Dez.' : '1 Dec', amt: 29, s: 'active' },
    { c: 'Lumen Academy', plan: 'Business', cycle: de ? 'Monatlich' : 'Monthly', next: de ? '3. Dez.' : '3 Dec', amt: 149, s: 'trial' },
    { c: 'Blue Harbor Agency', plan: 'Retainer', cycle: de ? 'Monatlich' : 'Monthly', next: de ? '28. Nov.' : '28 Nov', amt: 1200, s: 'pastdue' },
    { c: 'Fjord Fitness', plan: 'Team', cycle: de ? 'Quartalsweise' : 'Quarterly', next: de ? '15. Jan. 2027' : '15 Jan 2027', amt: 237, s: 'active' },
    { c: 'Orbit Labs', plan: 'Starter', cycle: de ? 'Monatlich' : 'Monthly', next: '—', amt: 19, s: 'cancelled' },
  ];
  const filters = [
    { label: de ? 'Alle' : 'All', n: 1306 },
    { label: de ? 'Aktiv' : 'Active', n: 1284 },
    { label: de ? 'Testphase' : 'Trial', n: 14 },
    { label: de ? 'Überfällig' : 'Past due', n: 8 },
  ];
  return (
    <Panel
      title={de ? 'Abonnements' : 'Subscriptions'}
      aside={
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#e7e8f0] px-2 py-1">
          <Search className="h-3 w-3" />
          {de ? 'Suchen …' : 'Search…'}
        </span>
      }
    >
      <div className="mb-3 flex flex-wrap gap-1.5 font-ui text-[11px]">
        {filters.map((f, i) => (
          <span
            key={f.label}
            className={`rounded-full border px-2.5 py-1 ${i === 0 ? 'border-[#7657f6]/30 bg-[#f4f2ff] font-medium text-[#5f43e9]' : 'border-[#e7e8f0] text-[#5a5e75]'}`}
          >
            {f.label} <span className="tabular-nums opacity-70">{formatEUNumber(f.n, locale)}</span>
          </span>
        ))}
      </div>
      <DataTable
        head={[de ? 'Kunde' : 'Customer', de ? 'Tarif' : 'Plan', de ? 'Intervall' : 'Billing', de ? 'Nächste Abrechnung' : 'Next billing', de ? 'Betrag' : 'Amount', 'Status']}
      >
        {rows.map((r) => (
          <tr key={r.c} className="transition-colors hover:bg-[#f8f9fc]">
            <td className={`${TD} font-medium text-[#101329]`}>{r.c}</td>
            <td className={`${TD} text-[#4b4f66]`}>{r.plan}</td>
            <td className={`${TD} text-[#4b4f66]`}>{r.cycle}</td>
            <td className={`${TD} text-[#4b4f66]`}>{r.next}</td>
            <td className={`${TD} text-right tabular-nums text-[#101329]`}>{formatEUR(r.amt, locale, 2)}</td>
            <td className={TD}>
              <StatusPill status={r.s} de={de} />
            </td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function PaymentsPanel({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const rows: { d: string; c: string; m: string; g: string; amt: number; s: Status }[] = [
    { d: de ? '19. Nov.' : '19 Nov', c: 'Acme Studio', m: de ? 'Karte' : 'Card', g: 'Stripe', amt: 1908, s: 'succeeded' },
    { d: de ? '19. Nov.' : '19 Nov', c: 'Northwind Club', m: 'SEPA', g: 'GoCardless', amt: 29, s: 'succeeded' },
    { d: de ? '18. Nov.' : '18 Nov', c: 'Blue Harbor Agency', m: de ? 'Karte' : 'Card', g: 'Stripe', amt: 1200, s: 'failed' },
    { d: de ? '18. Nov.' : '18 Nov', c: 'Fjord Fitness', m: 'PayPal', g: 'PayPal', amt: 237, s: 'succeeded' },
    { d: de ? '17. Nov.' : '17 Nov', c: 'Lumen Academy', m: de ? 'Karte' : 'Card', g: 'Mollie', amt: 149, s: 'succeeded' },
    { d: de ? '16. Nov.' : '16 Nov', c: 'Orbit Labs', m: de ? 'Karte' : 'Card', g: 'Stripe', amt: 19, s: 'refunded' },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <Panel title={de ? 'Letzte Zahlungen' : 'Recent payments'} className="xl:col-span-2">
        <DataTable head={[de ? 'Datum' : 'Date', de ? 'Kunde' : 'Customer', de ? 'Zahlart' : 'Method', de ? 'Anbieter' : 'Gateway', de ? 'Betrag' : 'Amount', 'Status']}>
          {rows.map((r) => (
            <tr key={r.c + r.d} className="transition-colors hover:bg-[#f8f9fc]">
              <td className={`${TD} text-[#777b91]`}>{r.d}</td>
              <td className={`${TD} font-medium text-[#101329]`}>{r.c}</td>
              <td className={`${TD} text-[#4b4f66]`}>{r.m}</td>
              <td className={TD}>
                <GatewayBadge name={r.g} />
              </td>
              <td className={`${TD} text-right tabular-nums text-[#101329]`}>{formatEUR(r.amt, locale, 2)}</td>
              <td className={TD}>
                <StatusPill status={r.s} de={de} />
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
      <Panel title={de ? 'Volumen nach Anbieter' : 'Volume by gateway'} aside={de ? 'Dieser Monat' : 'This month'}>
        <ShareBars
          rows={[
            { key: 'stripe', label: <GatewayBadge name="Stripe" />, share: 48 },
            { key: 'gocardless', label: <GatewayBadge name="GoCardless" />, share: 27 },
            { key: 'paypal', label: <GatewayBadge name="PayPal" />, share: 15 },
            { key: 'mollie', label: <GatewayBadge name="Mollie" />, share: 10 },
          ]}
        />
      </Panel>
    </div>
  );
}

const CUSTOMERS = [
  { name: 'Acme Studio', initials: 'AS', email: 'billing@acme.example', plan: 'Pro · annual', planDe: 'Pro · jährlich', method: 'Card · Stripe', methodDe: 'Karte · Stripe', since: 'Mar 2024', sinceDe: 'Mär. 2024', amt: 1908, s: 'active' as Status },
  { name: 'Northwind Club', initials: 'NC', email: 'finance@northwind.example', plan: 'Membership · monthly', planDe: 'Membership · monatlich', method: 'SEPA · GoCardless', methodDe: 'SEPA · GoCardless', since: 'Jan 2025', sinceDe: 'Jan. 2025', amt: 29, s: 'active' as Status },
  { name: 'Lumen Academy', initials: 'LA', email: 'admin@lumen.example', plan: 'Business · monthly', planDe: 'Business · monatlich', method: 'Card · Mollie', methodDe: 'Karte · Mollie', since: 'Nov 2026', sinceDe: 'Nov. 2026', amt: 149, s: 'trial' as Status },
  { name: 'Blue Harbor Agency', initials: 'BH', email: 'ops@blueharbor.example', plan: 'Retainer · monthly', planDe: 'Retainer · monatlich', method: 'Card · Stripe', methodDe: 'Karte · Stripe', since: 'Jun 2025', sinceDe: 'Jun. 2025', amt: 1200, s: 'pastdue' as Status },
];

function CustomersPanel({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const [sel, setSel] = useState(0);
  const c = CUSTOMERS[sel];
  const history: { d: string; s: Status }[] =
    c.s === 'pastdue'
      ? [
          { d: de ? '18. Nov.' : '18 Nov', s: 'failed' },
          { d: de ? '18. Okt.' : '18 Oct', s: 'paid' },
          { d: de ? '18. Sep.' : '18 Sep', s: 'paid' },
        ]
      : [
          { d: de ? '1. Nov.' : '1 Nov', s: 'paid' },
          { d: de ? '1. Okt.' : '1 Oct', s: 'paid' },
          { d: de ? '1. Sep.' : '1 Sep', s: 'paid' },
        ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <Panel title={de ? 'Kunden' : 'Customers'} aside={formatEUNumber(1306, locale)} className="lg:col-span-2">
        <ul className="-mx-1.5 space-y-0.5">
          {CUSTOMERS.map((cu, i) => (
            <li key={cu.name}>
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                className={`flex w-full items-center gap-2.5 rounded-lg px-1.5 py-2 text-left transition-colors cursor-pointer ${
                  sel === i ? 'bg-[#f4f2ff]' : 'hover:bg-[#f8f9fc]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-ui text-[10px] font-semibold ${
                    sel === i ? 'bg-gradient-to-br from-[#7657f6] to-[#39d5e8] text-white' : 'bg-[#eef0f5] text-[#4b4f66]'
                  }`}
                >
                  {cu.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-ui text-[12px] font-medium text-[#101329]">{cu.name}</span>
                  <span className="block truncate font-ui text-[10.5px] text-[#777b91]">{de ? cu.planDe : cu.plan}</span>
                </span>
                <StatusPill status={cu.s} de={de} />
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title={de ? 'Kundendetails' : 'Customer details'} className="lg:col-span-3">
        <div key={sel} className="animate-fade">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7657f6] to-[#39d5e8] font-ui text-[13px] font-semibold text-white">
              {c.initials}
            </span>
            <div className="min-w-0">
              <div className="font-display text-[15px] font-semibold text-[#101329]">{c.name}</div>
              <div className="font-ui text-[11.5px] text-[#777b91]">{c.email}</div>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-lg border border-[#e7e8f0] px-2.5 py-1.5 font-ui text-[11px] font-medium text-[#5f43e9]">
              <ExternalLink className="h-3 w-3" />
              {de ? 'Kundenportal' : 'Customer portal'}
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 font-ui text-[11.5px] sm:grid-cols-3">
            {[
              { k: de ? 'Abonnement' : 'Subscription', v: de ? c.planDe : c.plan },
              { k: de ? 'Zahlart' : 'Payment method', v: de ? c.methodDe : c.method },
              { k: de ? 'Kunde seit' : 'Customer since', v: de ? c.sinceDe : c.since },
            ].map((x) => (
              <div key={x.k} className="rounded-lg bg-[#f8f9fc] px-3 py-2">
                <dt className="text-[#777b91]">{x.k}</dt>
                <dd className="mt-0.5 font-medium text-[#101329]">{x.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 font-ui text-[11px] font-semibold uppercase tracking-[0.06em] text-[#777b91]">
            {de ? 'Zahlungshistorie' : 'Payment history'}
          </div>
          <ul className="mt-1.5 divide-y divide-[#f0f1f6] font-ui text-[12px]">
            {history.map((h) => (
              <li key={h.d} className="flex items-center justify-between py-2">
                <span className="text-[#4b4f66]">{h.d}</span>
                <span className="tabular-nums text-[#101329]">{formatEUR(c.amt, locale, 2)}</span>
                <StatusPill status={h.s} de={de} />
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </div>
  );
}

function AnalyticsPanel({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title={de ? 'MRR-Entwicklung' : 'MRR trend'} aside="EUR">
          <LineChart values={MRR} labels={MONTHS[locale]} format={(n) => formatEUR(n, locale)} tick={(n) => compactEUR(n, locale)} height={150} />
        </Panel>
        <Panel title={de ? 'Neue Abonnements pro Monat' : 'New subscriptions per month'}>
          <BarChart values={NEW_SUBS} labels={MONTHS[locale]} format={(n) => formatEUNumber(n, locale)} height={150} />
        </Panel>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="ARR" value={formatEUR(587040, locale)} tone="neutral" delta={de ? 'MRR × 12' : 'MRR × 12'} />
        <Kpi label={de ? 'Ø Umsatz pro Abo' : 'Avg. revenue per subscription'} value={formatEUR(38.1, locale, 2)} tone="neutral" delta={de ? 'pro Monat' : 'per month'} />
        <Kpi label={de ? 'Neue Abos (Monat)' : 'New subscriptions (month)'} value="101" delta={de ? '+7 ggü. Vormonat' : '+7 vs last month'} />
        <Kpi label={de ? 'Kündigungen (Monat)' : 'Cancellations (month)'} value="62" tone="neutral" delta={de ? 'Netto +39' : 'Net +39'} />
      </div>
    </div>
  );
}

const PANELS: Record<ShowcaseTabKey, React.ComponentType<{ locale: LocaleCode }>> = {
  overview: OverviewPanel,
  subscriptions: SubscriptionsPanel,
  payments: PaymentsPanel,
  customers: CustomersPanel,
  analytics: AnalyticsPanel,
};

/* -------------------------------------------------------------------------- */
/* Section                                                                      */
/* -------------------------------------------------------------------------- */

export function ProductShowcase({ exploreHref }: { exploreHref: string }) {
  const { locale } = useRouter();
  const copy = PRODUCT_SHOWCASE_COPY[locale];
  const [tab, setTab] = useState<ShowcaseTabKey>('overview');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const { ref: windowRef, inView } = useInView<HTMLDivElement>();
  const ActivePanel = PANELS[tab];

  useLayoutEffect(() => {
    const el = tabRefs.current[TABS.indexOf(tab)];
    if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [tab, locale]);

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else return;
    e.preventDefault();
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="showcase-heading" className="relative overflow-hidden bg-lavender-wash py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 grid-pattern-light opacity-70" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="showcase-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
        </Reveal>

        {/* Tabs */}
        <Reveal index={1} className="mt-10 flex justify-center">
          <div className="max-w-full overflow-x-auto rounded-2xl p-1 [scrollbar-width:none]">
            <div
              role="tablist"
              aria-label={copy.heading}
              className="relative inline-flex rounded-xl border border-[#e7e8f0] bg-white p-1 shadow-[0_8px_24px_-16px_rgba(36,33,90,0.35)] dark:border-line dark:bg-surface"
            >
              <span
                aria-hidden="true"
                className="absolute bottom-1 top-1 rounded-lg bg-[#101329] shadow-[0_6px_16px_-6px_rgba(16,19,41,0.5)] transition-[left,width] duration-300 ease-out"
                style={{ left: indicator?.x ?? 4, width: indicator?.w ?? 0, opacity: indicator ? 1 : 0 }}
              />
              {TABS.map((t, idx) => {
                const Icon = TAB_ICONS[t];
                const selected = tab === t;
                return (
                  <button
                    key={t}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`pshow-tab-${t}`}
                    aria-selected={selected}
                    aria-controls="pshow-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(t)}
                    onKeyDown={(e) => onKeyDown(e, idx)}
                    className={`relative z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 font-ui text-[13.5px] font-medium transition-colors duration-300 cursor-pointer ${
                      selected ? 'text-white' : 'text-[#5a5e75] hover:text-[#101329] dark:text-muted dark:hover:text-ink'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${selected ? 'text-[#5fe1f0]' : ''}`} aria-hidden="true" />
                    {copy.tabs[t]}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* App window: midnight-navy frame, light interface */}
        <Reveal index={2} className="relative mx-auto mt-8 max-w-6xl">
          <div className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(118,87,246,0.25),transparent_70%)] blur-2xl" aria-hidden="true" />
          <div
            ref={windowRef}
            className={`relative overflow-hidden rounded-2xl bg-[#101329] p-1.5 shadow-[0_40px_80px_-30px_rgba(16,19,41,0.55),0_0_0_1px_rgba(118,87,246,0.15)] ${inView ? 'is-visible' : ''}`}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="truncate font-ui text-[11.5px] text-[#9195ae]">
                MYFUNDBOX <span className="text-[#5a5e75]">/</span> <span className="text-white">{copy.tabs[tab]}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 font-ui text-[10.5px] text-[#b9bcd2]">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                {copy.badge}
              </span>
            </div>

            <div className="flex overflow-hidden rounded-xl">
              {/* Navy sidebar mirrors the active tab */}
              <div className="hidden w-48 shrink-0 flex-col gap-0.5 bg-[#101329] px-2.5 pb-4 pt-1 md:flex" aria-hidden="true">
                {TABS.map((t) => {
                  const Icon = TAB_ICONS[t];
                  const on = t === tab;
                  return (
                    <span
                      key={t}
                      className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-ui text-[12.5px] transition-colors duration-300 ${
                        on ? 'bg-white/[0.08] text-white' : 'text-[#9195ae]'
                      }`}
                    >
                      {on && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-[#9a68ff] to-[#39d5e8]" />}
                      <Icon className={`h-4 w-4 ${on ? 'text-[#5fe1f0]' : ''}`} />
                      {copy.tabs[t]}
                    </span>
                  );
                })}
                <span className="mt-auto flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-ui text-[12.5px] text-[#6f7391]">
                  <Settings className="h-4 w-4" />
                  {locale === 'de' ? 'Einstellungen' : 'Settings'}
                </span>
              </div>

              {/* Light interface */}
              <div
                id="pshow-panel"
                role="tabpanel"
                aria-labelledby={`pshow-tab-${tab}`}
                className="min-h-[30rem] min-w-0 flex-1 bg-[#f8f9fc] p-4 sm:p-5"
              >
                <div key={tab} className="animate-panel-in">
                  <ActivePanel locale={locale} />
                </div>
              </div>
            </div>
          </div>
          <p className="relative mt-4 text-center font-ui text-[12px] text-[#777b91] dark:text-subtle">{copy.disclaimer}</p>
        </Reveal>

        <Reveal index={3} className="mt-10 flex justify-center">
          <AppLink href={exploreHref} className="btn-primary hero-cta-primary px-6 py-3.5 font-ui text-[15px]">
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AppLink>
        </Reveal>
      </div>
    </section>
  );
}
