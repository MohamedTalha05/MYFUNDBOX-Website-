import React, { useId, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  CalendarClock,
  Check,
  CreditCard,
  Hash,
  Minus,
  Plus,
  Receipt,
  RefreshCw,
  Repeat,
  type LucideIcon,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import {
  CAPABILITY_SHOWCASE_COPY,
  CAPABILITY_SHOWCASE_LINKS,
  type CapabilityShowcaseKey,
} from '../data/homepageContent';
import { CONFIRMED_INTEGRATIONS, liveIntegrationUrl } from '../data/liveSite';
import { formatEUR, type LocaleCode } from '../utils/formatting';
import { isExternalHref, resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/*
 * Product capabilities showcase (Phase 3A). Seven capabilities with an interactive preview each.
 *
 * - lg+: a vertical tablist on the left switches the panel on the right (arrow keys, Home/End).
 * - Below lg: the same tabs become a swipeable chip row above a single panel, which keeps the
 *   phone page short.
 * - All panels are always in the server-rendered HTML (inactive ones are display:none), so their
 *   text is crawlable and part of the page's .md / llms exports via the registry copy.
 * - Previews are illustrative HTML with sample data for a fictional business (badge + disclaimer).
 */

const ICONS: Record<CapabilityShowcaseKey, LucideIcon> = {
  subscriptions: Repeat,
  billing: Receipt,
  quantity: Hash,
  orchestration: CreditCard,
  recovery: RefreshCw,
  reporting: BarChart3,
  integrations: Blocks,
};

/* ------------------------------ Shared bits ------------------------------ */

const ROW = 'flex items-center justify-between gap-3 rounded-xl border border-[#eceef5] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(16,19,41,0.04)]';

function Pill({ tone, children }: { tone: 'green' | 'violet' | 'amber' | 'slate'; children: React.ReactNode }) {
  const cls = {
    green: 'bg-[#20b486]/10 text-[#12865f]',
    violet: 'bg-[#7657f6]/10 text-[#5f43e9]',
    amber: 'bg-[#f4ae52]/15 text-[#8a520a]',
    slate: 'bg-[#eceef5] text-[#5a5e75]',
  }[tone];
  return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>{children}</span>;
}

/* -------------------------------- Previews ------------------------------- */

function SubscriptionsPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[#eceef5] bg-white p-4 shadow-[0_1px_2px_rgba(16,19,41,0.04)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7657f6] to-[#39d5e8] text-[11px] font-semibold text-white">NS</span>
            <div>
              <div className="text-[13px] font-semibold text-[#101329]">Northwind Studio</div>
              <div className="text-[11.5px] text-[#6b6f86]">Pro · {de ? 'monatlich' : 'monthly'}</div>
            </div>
          </div>
          <Pill tone="green">
            <Check className="h-3 w-3" />
            {de ? 'Aktiv' : 'Active'}
          </Pill>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-[11.5px]">
          {[
            [de ? 'Tarif' : 'Plan', 'Pro'],
            [de ? 'Betrag' : 'Amount', formatEUR(49, locale)],
            [de ? 'Verlängerung' : 'Renews', de ? '1. Dez.' : '1 Dec'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-[#f6f5ff] px-2.5 py-2">
              <dt className="text-[#6b6f86]">{k}</dt>
              <dd className="mt-0.5 font-semibold text-[#242638] tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex gap-2">
          <span className="rounded-lg bg-[image:var(--grad-button)] px-3 py-1.5 text-[11.5px] font-semibold text-white">{de ? 'Tarif ändern' : 'Change plan'}</span>
          <span className="rounded-lg border border-[#e7e8f0] px-3 py-1.5 text-[11.5px] font-medium text-[#5a5e75]">{de ? 'Kündigen' : 'Cancel'}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(de ? ['Add-on', 'Gutschein', '14-Tage-Test'] : ['Add-on', 'Coupon', '14-day trial']).map((t) => (
          <Pill key={t} tone="violet">{t}</Pill>
        ))}
      </div>
    </div>
  );
}

function BillingPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const rows = [
    { id: 'INV-1041', label: de ? 'Okt. · wiederkehrend' : 'Oct · recurring', amt: 49, tone: 'green' as const, s: de ? 'Bezahlt' : 'Paid' },
    { id: 'INV-1042', label: de ? 'Nov. · wiederkehrend' : 'Nov · recurring', amt: 49, tone: 'green' as const, s: de ? 'Bezahlt' : 'Paid' },
    { id: 'INV-1043', label: de ? 'Einrichtung · einmalig' : 'Setup · one-time', amt: 150, tone: 'violet' as const, s: de ? 'Gestellt' : 'Issued' },
    { id: 'INV-1044', label: de ? 'Dez. · wiederkehrend' : 'Dec · recurring', amt: 49, tone: 'slate' as const, s: de ? 'Geplant' : 'Scheduled' },
  ];
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.id} className={ROW}>
          <span className="flex min-w-0 items-center gap-2.5">
            <Receipt className="h-4 w-4 shrink-0 text-[#7657f6]" />
            <span className="min-w-0">
              <span className="block font-mono text-[11px] text-[#6b6f86]">{r.id}</span>
              <span className="block truncate text-[12.5px] font-medium text-[#242638]">{r.label}</span>
            </span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="text-[12.5px] font-semibold tabular-nums text-[#242638]">{formatEUR(r.amt, locale)}</span>
            <Pill tone={r.tone}>{r.s}</Pill>
          </span>
        </li>
      ))}
    </ul>
  );
}

const QUANTITY_UNITS = {
  seats: { en: 'Seats', de: 'Nutzer', price: 15, plan: { en: 'Team plan', de: 'Team-Tarif' } },
  machines: { en: 'Machines', de: 'Maschinen', price: 89, plan: { en: 'Service contract', de: 'Servicevertrag' } },
  sites: { en: 'Sites', de: 'Standorte', price: 240, plan: { en: 'Site licence', de: 'Standortlizenz' } },
} as const;
type QuantityUnit = keyof typeof QUANTITY_UNITS;

/** Interactive example: change unit and quantity, the monthly total follows. Sample prices only. */
function QuantityPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const [unit, setUnit] = useState<QuantityUnit>('seats');
  const [qty, setQty] = useState(12);
  const u = QUANTITY_UNITS[unit];
  const total = qty * u.price;
  const statusId = useId();

  return (
    <div role="group" aria-label={de ? 'Illustratives Beispiel für mengenbasierte Preise' : 'Illustrative quantity-based pricing example'} className="space-y-3">
      <div className="grid grid-cols-3 rounded-xl bg-[#eceefa] p-1 text-center text-[12px]">
        {(Object.keys(QUANTITY_UNITS) as QuantityUnit[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={unit === k}
            onClick={() => setUnit(k)}
            className={`cursor-pointer rounded-lg py-1.5 font-medium transition-colors ${
              unit === k ? 'bg-white text-[#5f43e9] shadow-[0_1px_2px_rgba(16,19,41,0.08)]' : 'text-[#5a5e75] hover:text-[#242638]'
            }`}
          >
            {QUANTITY_UNITS[k][locale]}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#eceef5] bg-white p-4 shadow-[0_1px_2px_rgba(16,19,41,0.04)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[13px] font-semibold text-[#101329]">{u.plan[locale]}</div>
            <div className="text-[11.5px] text-[#6b6f86] tabular-nums">
              {formatEUR(u.price, locale)} × {u[locale].toLowerCase()}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label={de ? 'Menge verringern' : 'Decrease quantity'}
              aria-describedby={statusId}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#e7e8f0] text-[#5a5e75] transition-colors hover:border-[#7657f6]/40 hover:text-[#5f43e9]"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="w-9 text-center text-[15px] font-semibold tabular-nums text-[#101329]">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(999, q + 1))}
              aria-label={de ? 'Menge erhöhen' : 'Increase quantity'}
              aria-describedby={statusId}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#e7e8f0] text-[#5a5e75] transition-colors hover:border-[#7657f6]/40 hover:text-[#5f43e9]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-[#eceef5] pt-3">
          <span className="text-[12px] text-[#6b6f86]">{de ? 'Monatlich' : 'Monthly total'}</span>
          <span id={statusId} aria-live="polite" className="font-display text-[22px] font-semibold tracking-tight text-[#101329] tabular-nums">
            {formatEUR(total, locale)}
          </span>
        </div>
      </div>
    </div>
  );
}

function OrchestrationPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const gateways = CONFIRMED_INTEGRATIONS.filter((i) => i.category === 'payments').slice(0, 4);
  const methods = ['Card', 'SEPA', 'PayPal', 'ACH'];
  return (
    <div className="space-y-2">
      {gateways.map((g, i) => (
        <div key={g.slug} className={ROW}>
          <span className="flex items-center gap-2.5">
            <img src={g.logoSrc} alt="" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-6 rounded-md object-contain" />
            <span className="text-[12.5px] font-medium text-[#242638]">{g.name}</span>
          </span>
          {i < 3 ? (
            <Pill tone="green">
              <Check className="h-3 w-3" />
              {de ? 'Verbunden' : 'Connected'}
            </Pill>
          ) : (
            <Pill tone="slate">{de ? 'Nicht verbunden' : 'Not connected'}</Pill>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {methods.map((m) => (
          <Pill key={m} tone="violet">{m}</Pill>
        ))}
      </div>
    </div>
  );
}

function RecoveryPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const steps = [
    { Icon: AlertCircle, title: de ? 'Kartenzahlung fehlgeschlagen' : 'Card payment failed', meta: de ? 'Karte abgelaufen' : 'Card expired', tone: 'text-[#b86e0e] bg-[#f4ae52]/15' },
    { Icon: CalendarClock, title: de ? 'Automatischer neuer Versuch' : 'Automatic retry scheduled', meta: 'Smart Dunning', tone: 'text-[#5f43e9] bg-[#7657f6]/10' },
    { Icon: Check, title: de ? 'Zahlung zurückgeholt' : 'Payment recovered', meta: formatEUR(49, locale), tone: 'text-[#12865f] bg-[#20b486]/10' },
  ];
  return (
    <ol className="relative space-y-3 pl-1">
      <span className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-gradient-to-b from-[#f4ae52] via-[#7657f6] to-[#20b486]" aria-hidden="true" />
      {steps.map((s) => (
        <li key={s.title} className="relative flex items-center gap-3">
          <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-[#f8f7ff] ${s.tone}`}>
            <s.Icon className="h-4 w-4" />
          </span>
          <span className={`${ROW} flex-1`}>
            <span className="text-[12.5px] font-medium text-[#242638]">{s.title}</span>
            <span className="text-[11.5px] text-[#6b6f86] tabular-nums">{s.meta}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function ReportingPreview({ locale }: { locale: LocaleCode }) {
  const de = locale === 'de';
  const bars = [42, 48, 46, 55, 58, 63, 61, 70, 74, 79];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          [de ? 'Umsatz' : 'Revenue', formatEUR(18420, locale)],
          [de ? 'Aktive Abos' : 'Active subs', '412'],
          [de ? 'Zahlungen' : 'Payments', '438'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-[#eceef5] bg-white px-3 py-2.5">
            <div className="truncate text-[11px] text-[#6b6f86]">{k}</div>
            <div className="mt-0.5 truncate text-[14px] font-semibold tabular-nums text-[#101329]">{v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#eceef5] bg-white p-3">
        <div className="flex h-28 items-end gap-1.5">
          {bars.map((b, i) => (
            <span
              key={i}
              className="chart-bar flex-1 rounded-t-md bg-gradient-to-t from-[#7657f6] to-[#9a68ff] opacity-90"
              style={{ height: `${b}%`, ['--bar-i' as string]: i } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationsPreview() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {CONFIRMED_INTEGRATIONS.slice(0, 8).map((i) => (
        <span key={i.slug} className="flex aspect-square items-center justify-center rounded-xl border border-[#eceef5] bg-white p-2.5 shadow-[0_1px_2px_rgba(16,19,41,0.04)]">
          <img src={i.logoSrc} alt={i.name} width={48} height={48} loading="lazy" decoding="async" className="h-full w-full object-contain" />
        </span>
      ))}
    </div>
  );
}

function Preview({ k, locale }: { k: CapabilityShowcaseKey; locale: LocaleCode }) {
  switch (k) {
    case 'subscriptions':
      return <SubscriptionsPreview locale={locale} />;
    case 'billing':
      return <BillingPreview locale={locale} />;
    case 'quantity':
      return <QuantityPreview locale={locale} />;
    case 'orchestration':
      return <OrchestrationPreview locale={locale} />;
    case 'recovery':
      return <RecoveryPreview locale={locale} />;
    case 'reporting':
      return <ReportingPreview locale={locale} />;
    case 'integrations':
      return <IntegrationsPreview />;
  }
}

/* -------------------------------- Section -------------------------------- */

export function CapabilityShowcase() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = CAPABILITY_SHOWCASE_COPY[locale];
  const [active, setActive] = useState<CapabilityShowcaseKey>('subscriptions');
  const tabRefs = useRef<Partial<Record<CapabilityShowcaseKey, HTMLButtonElement | null>>>({});
  const keys = copy.items.map((i) => i.key);

  const linkFor = (k: CapabilityShowcaseKey): string | null => {
    const l = CAPABILITY_SHOWCASE_LINKS[k];
    if (l.href === 'integrations') return liveIntegrationUrl(null, locale);
    const resolved = resolveNavHref(l);
    return resolved ? localHref(resolved) : null;
  };

  const onTabKeyDown = (e: React.KeyboardEvent, k: CapabilityShowcaseKey) => {
    const i = keys.indexOf(k);
    let next: CapabilityShowcaseKey | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = keys[(i + 1) % keys.length];
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = keys[(i - 1 + keys.length) % keys.length];
    else if (e.key === 'Home') next = keys[0];
    else if (e.key === 'End') next = keys[keys.length - 1];
    if (!next) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="capabilities-heading" className="bg-lavender-wash relative overflow-hidden py-20 md:py-28">
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2
            id="capabilities-heading"
            className="mt-4 font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-[#242638] md:text-[2.75rem] dark:text-ink"
          >
            {copy.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4b4f66] md:text-lg dark:text-muted">{copy.body}</p>
        </Reveal>

        <Reveal index={1} className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Tabs: a swipeable chip row on phones/tablets, a vertical list from lg up */}
          <div
            role="tablist"
            aria-label={copy.tablistLabel}
            className="stories-track -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
          >
            {copy.items.map((item) => {
              const Icon = ICONS[item.key];
              const selected = active === item.key;
              return (
                <button
                  key={item.key}
                  ref={(el) => {
                    tabRefs.current[item.key] = el;
                  }}
                  id={`cap-tab-${item.key}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`cap-panel-${item.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(item.key)}
                  onKeyDown={(e) => onTabKeyDown(e, item.key)}
                  className={`group/tab relative flex shrink-0 snap-start cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full border px-3 py-2 text-left font-ui text-[13.5px] font-medium transition-[background-color,border-color,box-shadow,color] duration-300 lg:gap-3 lg:whitespace-normal lg:rounded-xl lg:px-4 lg:py-3.5 lg:text-[14.5px] ${
                    selected
                      ? 'border-[#7657f6]/30 bg-white text-[#101329] shadow-[0_14px_30px_-18px_rgba(36,33,90,0.45)] dark:bg-surface dark:text-ink'
                      : 'border-[#e7e8f0] bg-white/60 text-[#4b4f66] hover:bg-white/70 hover:text-[#101329] lg:border-transparent lg:bg-transparent dark:text-muted dark:hover:bg-surface/60'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 lg:h-9 lg:w-9 lg:rounded-lg ${
                      selected ? 'bg-[image:var(--grad-button)] text-white shadow-[0_8px_18px_-8px_rgba(118,87,246,0.8)]' : 'bg-[#7657f6]/10 text-[#5f43e9]'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />
                  </span>
                  {item.title}
                  {selected && (
                    <span className="absolute inset-y-3 left-0 hidden w-[3px] rounded-full bg-gradient-to-b from-[#7657f6] to-[#39d5e8] lg:block" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panels: all in the server-rendered HTML (crawlable); only the active one is displayed */}
          <div className="lg:col-span-8">
            {copy.items.map((item) => {
              const selected = active === item.key;
              const href = linkFor(item.key);
              return (
                <div
                  key={item.key}
                  id={`cap-panel-${item.key}`}
                  role="tabpanel"
                  aria-labelledby={`cap-tab-${item.key}`}
                  tabIndex={selected ? 0 : -1}
                  className={`overflow-hidden rounded-3xl border border-[#e7e8f0] bg-white shadow-[0_30px_60px_-36px_rgba(36,33,90,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-[#7657f6]/50 dark:border-line dark:bg-surface ${
                    selected ? 'animate-panel-in' : 'hidden'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                      <h3 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-[#101329] dark:text-ink">{item.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#4b4f66] dark:text-muted">{item.summary}</p>
                      <ul className="mt-5 space-y-2.5">
                        {item.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[14px] leading-snug text-[#242638] dark:text-ink">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#7657f6]/12 text-[#5f43e9]" aria-hidden="true">
                              <Check className="h-2.5 w-2.5" strokeWidth={3} />
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                      {href &&
                        (isExternalHref(href) ? (
                          <a href={href} className="link-arrow mt-6 font-ui text-sm">
                            {copy.learnMore}
                            <span className="sr-only">: {item.title}</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        ) : (
                          <AppLink href={href} className="link-arrow mt-6 font-ui text-sm">
                            {copy.learnMore}
                            <span className="sr-only">: {item.title}</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </AppLink>
                        ))}
                    </div>
                    <div className="relative border-t border-[#eceef5] bg-gradient-to-br from-[#f6f4ff] to-[#eef6ff] p-5 font-ui md:border-l md:border-t-0 md:p-6 dark:border-line dark:from-[#1d1a45] dark:to-[#141739]">
                      <span className="mb-3 inline-flex rounded-full border border-[#e7e8f0] bg-white/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6b6f86]">
                        {copy.badge}
                      </span>
                      <div aria-hidden={item.key === 'quantity' ? undefined : true}>
                        <Preview k={item.key} locale={locale} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-6 text-center font-ui text-[12px] text-[#6b6f86] dark:text-subtle">{copy.disclaimer}</p>
      </div>
    </section>
  );
}
