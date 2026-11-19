import React, { useRef } from 'react';
// LazyMotion + `m` + domAnimation keeps Framer Motion's footprint small (no layout/drag features).
import { LazyMotion, domAnimation, m as motion, useReducedMotion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CreditCard,
  LayoutDashboard,
  RefreshCw,
  Repeat,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { formatEUR, formatEUNumber } from '../utils/formatting';
import { AreaChart } from './ProductVisuals';

/*
 * Hero product preview: an HTML/SVG mock-up of the MYFUNDBOX revenue dashboard.
 * All figures are illustrative sample data and the window carries a visible
 * "Product preview · sample data" label. Swap for a real app screenshot when available.
 */

const MRR_TREND = [31200, 32400, 33100, 34800, 35600, 37900, 39200, 40400, 42700, 44100, 46300, 48920];
const MONTHS = {
  en: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  de: ['Dez', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov'],
};

const T = {
  en: {
    window: 'Revenue overview',
    range12: '12M',
    range30: '30D',
    mrr: 'MRR',
    arr: 'ARR',
    active: 'Active subscriptions',
    trend: 'Revenue trend',
    vsLastMonth: 'vs last month',
    activity: 'Payment activity',
    performance: 'Subscription performance',
    thisMonth: 'This month',
    newSubs: 'New',
    upgrades: 'Upgrades',
    churned: 'Cancelled',
    net: 'Net growth',
    paid: 'Paid',
    recovered: 'Recovered',
    retrying: 'Retrying',
    payments: [
      { who: 'Pro · annual', via: 'Card', amount: 1908, status: 'paid' as const },
      { who: 'Team · monthly', via: 'SEPA', amount: 237, status: 'recovered' as const },
      { who: 'Starter · monthly', via: 'PayPal', amount: 19, status: 'retrying' as const },
    ],
    toastTitle: 'Payment received',
    toastSub: 'Pro · annual · SEPA',
    label: 'Product preview of the MYFUNDBOX revenue dashboard with illustrative sample data: monthly recurring revenue, annual recurring revenue, active subscriptions, a 12-month revenue trend, payment activity and subscription performance.',
  },
  de: {
    window: 'Umsatzübersicht',
    range12: '12M',
    range30: '30T',
    mrr: 'MRR',
    arr: 'ARR',
    active: 'Aktive Abonnements',
    trend: 'Umsatzentwicklung',
    vsLastMonth: 'ggü. Vormonat',
    activity: 'Zahlungsaktivität',
    performance: 'Abo-Entwicklung',
    thisMonth: 'Dieser Monat',
    newSubs: 'Neu',
    upgrades: 'Upgrades',
    churned: 'Gekündigt',
    net: 'Nettowachstum',
    paid: 'Bezahlt',
    recovered: 'Zurückgeholt',
    retrying: 'Neuer Versuch',
    payments: [
      { who: 'Pro · jährlich', via: 'Karte', amount: 1908, status: 'paid' as const },
      { who: 'Team · monatlich', via: 'SEPA', amount: 237, status: 'recovered' as const },
      { who: 'Starter · monatlich', via: 'PayPal', amount: 19, status: 'retrying' as const },
    ],
    toastTitle: 'Zahlung erhalten',
    toastSub: 'Pro · jährlich · SEPA',
    label: 'Produktvorschau des MYFUNDBOX-Umsatz-Dashboards mit Beispieldaten: MRR, ARR, aktive Abonnements, 12-Monats-Umsatzentwicklung, Zahlungsaktivität und Abo-Entwicklung.',
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

function Delta({ value, down = false }: { value: string; down?: boolean }) {
  const Icon = down ? ArrowDownRight : ArrowUpRight;
  return (
    <span className={`inline-flex items-center gap-0.5 font-ui text-[11px] font-medium ${down ? 'text-[#f4ae52]' : 'text-[#3ed3a0]'}`}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {value}
    </span>
  );
}

export function RevenueDashboardPreview({ previewLabel }: { previewLabel: string }) {
  const { locale } = useRouter();
  const t = T[locale];
  const reduce = useReducedMotion();
  const spotRef = useRef<HTMLDivElement>(null);

  // Cheap pointer-follow glow: updates two CSS variables, no React re-render.
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = spotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  const perf = [
    { label: t.newSubs, value: 86, pct: 100, tone: 'bg-[image:var(--grad-cyan)]' },
    { label: t.upgrades, value: 31, pct: 36, tone: 'bg-[#9a68ff]' },
    { label: t.churned, value: -12, pct: 14, tone: 'bg-[#f4ae52]/80' },
  ];

  const statusStyle = {
    paid: { text: t.paid, cls: 'text-[#3ed3a0] bg-[#20b486]/12', Icon: Check },
    recovered: { text: t.recovered, cls: 'text-[#5fe1f0] bg-[#39d5e8]/12', Icon: RefreshCw },
    retrying: { text: t.retrying, cls: 'text-[#f4ae52] bg-[#f4ae52]/12', Icon: RefreshCw },
  };

  return (
    <LazyMotion features={domAnimation} strict>
    <motion.div
      className="relative"
      initial={reduce ? false : { opacity: 0, x: 48, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.25 }}
    >
      {/* Ambient glow behind the window */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(55%_55%_at_55%_45%,rgba(118,87,246,0.5),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={reduce ? undefined : { duration: 9, ease: 'easeInOut', repeat: Infinity, delay: 1.4 }}
      >
        <div
          ref={spotRef}
          onPointerMove={onPointerMove}
          role="img"
          aria-label={t.label}
          className="hero-dash no-reveal glass group relative overflow-hidden [--spot-x:70%] [--spot-y:20%]"
        >
          {/* Pointer spotlight + top sheen */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(320px circle at var(--spot-x) var(--spot-y), rgba(154,104,255,0.14), transparent 60%)' }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" aria-hidden="true" />

          <div aria-hidden="true">
            {/* Window chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="hidden flex-1 items-center justify-center sm:flex">
                <div className="flex w-full max-w-[220px] items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-ui text-[10.5px] text-[#9195ae]">
                  <Search className="h-3 w-3" />
                  <span className="truncate">{locale === 'de' ? 'Kunden, Rechnungen suchen …' : 'Search customers, invoices…'}</span>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-ui text-[10px] font-medium text-[#b9bcd2]">
                {previewLabel}
              </span>
            </div>

            <div className="flex">
              {/* App sidebar */}
              <nav className="hidden w-12 shrink-0 flex-col items-center gap-1.5 border-r border-white/[0.06] py-4 sm:flex">
                <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[image:var(--grad-button)] font-display text-[11px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(118,87,246,0.9)]">
                  M
                </span>
                {[LayoutDashboard, Users, Repeat, CreditCard, BarChart3, Settings].map((Icon, i) => (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      i === 0 ? 'bg-white/[0.08] text-white' : 'text-[#6f7391]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </nav>

              {/* Main panel */}
              <div className="min-w-0 flex-1 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-sm font-semibold tracking-tight text-white">{t.window}</div>
                  <div className="inline-flex rounded-md border border-white/[0.07] bg-white/[0.03] p-0.5 font-ui text-[10.5px]">
                    <span className="rounded px-2 py-0.5 text-[#9195ae]">{t.range30}</span>
                    <span className="rounded bg-white/[0.1] px-2 py-0.5 font-medium text-white">{t.range12}</span>
                  </div>
                </div>

                {/* KPI strip */}
                <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.07] rounded-xl border border-white/[0.07] bg-white/[0.02]">
                  {[
                    { label: t.mrr, value: formatEUR(48920, locale), delta: '5.6%' },
                    { label: t.arr, value: formatEUR(587040, locale), delta: '5.6%' },
                    { label: t.active, value: formatEUNumber(1284, locale), delta: '3.1%' },
                  ].map((k) => (
                    <div key={k.label} className="min-w-0 px-3 py-2.5 transition-colors duration-300 hover:bg-white/[0.03] sm:px-3.5 sm:py-3">
                      <div className="truncate font-ui text-[10.5px] text-[#9195ae]">{k.label}</div>
                      <div className="mt-1 truncate font-ui text-[13px] font-semibold tracking-tight text-white tabular-nums sm:text-base">
                        {k.value}
                      </div>
                      <Delta value={k.delta} />
                    </div>
                  ))}
                </div>

                {/* Revenue trend */}
                <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <span className="font-ui text-[11.5px] font-medium text-[#d9dcec]">{t.trend}</span>
                    <span className="font-ui text-[10.5px] text-[#9195ae]">
                      <span className="text-[#3ed3a0]">+{formatEUR(2620, locale)}</span> {t.vsLastMonth}
                    </span>
                  </div>
                  <AreaChart values={MRR_TREND} labels={MONTHS[locale]} height={112} format={(n) => formatEUR(n, locale)} />
                </div>

                {/* Activity + performance */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                    <div className="mb-2 font-ui text-[11.5px] font-medium text-[#d9dcec]">{t.activity}</div>
                    <ul className="divide-y divide-white/[0.05]">
                      {t.payments.map((p) => {
                        const s = statusStyle[p.status];
                        return (
                          <li key={p.who} className="flex items-center justify-between gap-2 py-1.5 font-ui">
                            <div className="min-w-0">
                              <div className="truncate text-[11px] text-white">{p.who}</div>
                              <div className="text-[10px] text-[#9195ae]">
                                {p.via} · <span className="tabular-nums">{formatEUR(p.amount, locale, 2)}</span>
                              </div>
                            </div>
                            <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${s.cls}`}>
                              <s.Icon className="h-2.5 w-2.5" />
                              {s.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-ui text-[11.5px] font-medium text-[#d9dcec]">{t.performance}</span>
                      <span className="font-ui text-[10px] text-[#9195ae]">{t.thisMonth}</span>
                    </div>
                    <ul className="space-y-2">
                      {perf.map((row, i) => (
                        <li key={row.label} className="font-ui text-[10.5px]">
                          <div className="mb-1 flex justify-between text-[#b9bcd2]">
                            <span>{row.label}</span>
                            <span className="tabular-nums text-white">{row.value > 0 ? `+${row.value}` : `−${Math.abs(row.value)}`}</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className={`chart-bar-x h-full rounded-full ${row.tone}`}
                              style={{ width: `${row.pct}%`, ['--bar-i' as string]: i + 6 }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2 font-ui text-[10.5px]">
                      <span className="text-[#9195ae]">{t.net}</span>
                      <span className="font-semibold text-[#3ed3a0] tabular-nums">+105</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        className="glass absolute -left-10 top-[38%] hidden w-52 p-3 xl:block"
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={
          reduce
            ? undefined
            : {
                opacity: { duration: 0.6, delay: 1.3 },
                scale: { duration: 0.6, ease: EASE, delay: 1.3 },
                y: { duration: 7, ease: 'easeInOut', repeat: Infinity, delay: 1.9 },
              }
        }
        aria-hidden="true"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#20b486]/15 text-[#3ed3a0]">
            <Check className="h-4 w-4" />
          </span>
          <div className="min-w-0 font-ui">
            <div className="text-[11.5px] font-semibold text-white">{t.toastTitle}</div>
            <div className="truncate text-[10.5px] text-[#9195ae]">{t.toastSub}</div>
          </div>
        </div>
        <div className="mt-2 font-ui text-sm font-semibold text-[#3ed3a0] tabular-nums">+{formatEUR(1908, locale, 2)}</div>
      </motion.div>
    </motion.div>
    </LazyMotion>
  );
}
