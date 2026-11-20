import React from 'react';
import { ArrowRight, CalendarClock, Check, RefreshCw, TriangleAlert } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { BRAND_MARKS } from '../data/brandMarks';
import { CAPABILITIES_COPY, CAPABILITY_LINKS, type CapabilityKey } from '../data/homeContent';
import { formatEUR } from '../utils/formatting';
import { resolveNavHref, useLocalHref } from '../utils/navLinks';
import { AppLink } from './ReusableBlocks';
import { Reveal } from './motion';

/* -------------------------------------------------------------------------- */
/* Custom icon set: 32×32, violet strokes (currentColor) with cyan accents.     */
/* -------------------------------------------------------------------------- */

const CYAN = 'var(--cap-cyan)';

const ICON_PATHS: Record<CapabilityKey, React.ReactNode> = {
  // Calendar with a renewal loop
  subscriptions: (
    <>
      <rect x="5" y="8" width="22" height="19" rx="3.5" />
      <path d="M5 13.5h22M11 5.5v5M21 5.5v5" />
      <path d="M19.4 21.2a3.6 3.6 0 1 1-1-3.9" stroke={CYAN} />
      <path d="M18.8 15.4v2.6h2.6" stroke={CYAN} />
    </>
  ),
  // Invoice with a schedule tick
  billing: (
    <>
      <path d="M8 4.5h11l5 5v18H8z" />
      <path d="M19 4.5v5h5M12 14h8M12 18h5" />
      <circle cx="22.5" cy="24" r="4.5" stroke={CYAN} fill="var(--cap-tile)" />
      <path d="M20.6 24l1.4 1.4 2.5-2.6" stroke={CYAN} />
    </>
  ),
  // Card with connection arrows
  payments: (
    <>
      <rect x="3.5" y="8" width="21" height="14" rx="3" />
      <path d="M3.5 12.5h21M7.5 17.5h4" />
      <path d="M21 25.5h7.5M26 23l2.5 2.5L26 28" stroke={CYAN} />
    </>
  ),
  // Customer with profile lines
  customers: (
    <>
      <circle cx="12.5" cy="11" r="4.5" />
      <path d="M4.5 26.5c0-4.6 3.6-8 8-8s8 3.4 8 8" />
      <path d="M21.5 9.5h6M21.5 14h6M23.5 18.5h4" stroke={CYAN} />
    </>
  ),
  // Recovery loop around an alert
  dunning: (
    <>
      <path d="M25.6 17.5A9.8 9.8 0 1 1 22.7 8.6" />
      <path d="M26 4.8v5h-5" />
      <path d="M16 11.5v5.5" stroke={CYAN} />
      <circle cx="16" cy="21" r="1.1" fill={CYAN} stroke="none" />
    </>
  ),
  // Bars with a trend line
  analytics: (
    <>
      <path d="M5 5v22h22" />
      <path d="M10.5 22v-5M15.5 22v-8M20.5 22v-6M25.5 22v-10" />
      <path d="M9 13.5l5.5-4.5 4.5 3 7-6" stroke={CYAN} />
      <circle cx="26" cy="6" r="1.4" fill={CYAN} stroke="none" />
    </>
  ),
};

function CapabilityIcon({ name }: { name: CapabilityKey }) {
  return (
    <span
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#7657f6]/15 bg-gradient-to-br from-[#f4f2ff] to-[#eae6ff] text-[#6a4cf0] transition-[transform,box-shadow] duration-500 ease-out [--cap-cyan:#14a7ba] [--cap-tile:#eef0ff] group-hover/cap:-rotate-3 group-hover/cap:scale-105 group-hover/cap:shadow-[0_10px_24px_-12px_rgba(118,87,246,0.6)] dark:border-white/10 dark:from-[#241f55] dark:to-[#1a1840] dark:text-[#b29dff] dark:[--cap-cyan:#5fe1f0] dark:[--cap-tile:#1f1c4c]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        {ICON_PATHS[name]}
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Mini interface previews (sample data, labelled)                             */
/* -------------------------------------------------------------------------- */

function PreviewFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl border border-[#e7e8f0] bg-white/80 p-3 pt-6 shadow-[0_1px_2px_rgba(16,19,41,0.04)] transition-[border-color] duration-300 group-hover/cap:border-[#7657f6]/20 dark:border-line dark:bg-white/[0.03]" aria-hidden="true">
      <span className="absolute right-2.5 top-2 font-ui text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#9a9db2] dark:text-subtle">
        {label}
      </span>
      {children}
    </div>
  );
}

function SubscriptionPreview({ label }: { label: string }) {
  const { locale } = useRouter();
  const de = locale === 'de';
  const rows = [
    { kind: de ? 'Monatlich' : 'Monthly', value: `${formatEUR(49, locale)}${de ? '/Mon.' : '/mo'}` },
    { kind: de ? 'Einmalig' : 'One-time', value: formatEUR(299, locale) },
    { kind: de ? 'Raten' : 'Instalments', value: `3 × ${formatEUR(99, locale)}` },
    { kind: de ? 'Pro Lizenz' : 'Per seat', value: `12 × ${formatEUR(8, locale)}` },
  ];
  return (
    <PreviewFrame label={label}>
      <ul className="grid grid-cols-2 gap-1.5 font-ui text-[11px]">
        {rows.map((r, i) => (
          <li
            key={r.kind}
            className={`flex flex-col rounded-lg border px-2.5 py-1.5 transition-colors duration-300 ${
              i === 0
                ? 'border-[#7657f6]/30 bg-[#f4f2ff] dark:bg-[#241f55]'
                : 'border-[#ecedf3] bg-white group-hover/cap:border-[#7657f6]/20 dark:border-line dark:bg-transparent'
            }`}
          >
            <span className="text-[#6b6f86] dark:text-subtle">{r.kind}</span>
            <span className="font-semibold tabular-nums text-[#242638] dark:text-ink">{r.value}</span>
          </li>
        ))}
      </ul>
    </PreviewFrame>
  );
}

function DunningPreview({ label }: { label: string }) {
  const { locale } = useRouter();
  const de = locale === 'de';
  const steps = [
    { icon: TriangleAlert, text: de ? 'Fehlgeschlagen' : 'Failed', cls: 'text-[#b86e0e] bg-[#f4ae52]/15' },
    { icon: RefreshCw, text: de ? 'Neuer Versuch' : 'Retry', cls: 'text-[#0f8fa1] bg-[#39d5e8]/15' },
    { icon: Check, text: de ? 'Zurückgeholt' : 'Recovered', cls: 'text-[#12865f] bg-[#20b486]/15' },
  ];
  return (
    <PreviewFrame label={label}>
      <ol className="mt-1 flex items-center font-ui text-[10.5px]">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.text}>
              <li className="flex flex-col items-center gap-1">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full ${s.cls}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="whitespace-nowrap text-[#5a5e75] dark:text-muted">{s.text}</span>
              </li>
              {i < steps.length - 1 && (
                <li className="mx-1 mb-4 h-px flex-1 bg-gradient-to-r from-[#7657f6]/40 to-[#39d5e8]/60" aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </PreviewFrame>
  );
}

function AnalyticsPreview({ label }: { label: string }) {
  const bars = [38, 44, 41, 52, 58, 55, 64, 70, 76, 82];
  return (
    <PreviewFrame label={label}>
      <div className="flex items-baseline gap-2 font-ui">
        <span className="text-[11px] text-[#6b6f86] dark:text-subtle">MRR</span>
        <span className="text-[11px] font-semibold text-[#12865f] dark:text-positive">▲ 5.6%</span>
      </div>
      <div className="mt-2 flex h-14 items-end gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`chart-bar flex-1 rounded-t-[3px] ${
              i === bars.length - 1 ? 'bg-gradient-to-t from-[#7657f6] to-[#39d5e8]' : 'bg-[#7657f6]/25 dark:bg-[#9a68ff]/35'
            }`}
            style={{ height: `${h}%`, ['--bar-i' as string]: i }}
          />
        ))}
      </div>
    </PreviewFrame>
  );
}

function BillingPreview({ label }: { label: string }) {
  const { locale } = useRouter();
  const de = locale === 'de';
  const rows = [
    { date: de ? '1. Okt.' : '1 Oct', status: 'paid' as const },
    { date: de ? '1. Nov.' : '1 Nov', status: 'paid' as const },
    { date: de ? '1. Dez.' : '1 Dec', status: 'next' as const },
  ];
  return (
    <PreviewFrame label={label}>
      <div className="font-ui text-[11px] text-[#6b6f86] dark:text-subtle">
        {de ? 'Abrechnungsplan · monatlich' : 'Billing schedule · monthly'}
      </div>
      <ul className="mt-2 space-y-1 font-ui text-[11px]">
        {rows.map((r) => (
          <li
            key={r.date}
            className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${
              r.status === 'next' ? 'border border-dashed border-[#7657f6]/35 bg-[#f4f2ff] dark:bg-[#241f55]' : 'bg-[#f6f7fb] dark:bg-white/[0.03]'
            }`}
          >
            <span className="text-[#242638] dark:text-ink">{r.date}</span>
            <span className="tabular-nums text-[#5a5e75] dark:text-muted">{formatEUR(49, locale, 2)}</span>
            {r.status === 'paid' ? (
              <span className="inline-flex items-center gap-1 font-medium text-[#12865f] dark:text-positive">
                <Check className="h-3 w-3" />
                {de ? 'Bezahlt' : 'Paid'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-medium text-[#6a4cf0] dark:text-accent">
                <CalendarClock className="h-3 w-3" />
                {de ? 'Geplant' : 'Scheduled'}
              </span>
            )}
          </li>
        ))}
      </ul>
    </PreviewFrame>
  );
}

function PaymentsPreview({ label }: { label: string }) {
  const { locale } = useRouter();
  const de = locale === 'de';
  const gateways: { name: string; mark?: keyof typeof BRAND_MARKS }[] = [
    { name: 'Stripe', mark: 'stripe' },
    { name: 'GoCardless' },
    { name: 'PayPal', mark: 'paypal' },
  ];
  return (
    <PreviewFrame label={label}>
      <div className="font-ui text-[11px] text-[#6b6f86] dark:text-subtle">{de ? 'Zahlungsanbieter' : 'Payment gateways'}</div>
      <ul className="mt-2 space-y-1 font-ui text-[11px]">
        {gateways.map((g) => {
          const mark = g.mark ? BRAND_MARKS[g.mark] : null;
          return (
            <li key={g.name} className="flex items-center justify-between rounded-lg bg-[#f6f7fb] px-2.5 py-1.5 dark:bg-white/[0.03]">
              <span className="inline-flex items-center gap-2 font-medium text-[#242638] dark:text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#ecedf3] bg-white text-[#6b6f86] dark:border-line dark:bg-transparent dark:text-muted">
                  {mark ? (
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
                      <path d={mark.path} />
                    </svg>
                  ) : (
                    <span className="text-[8px] font-bold">{g.name.slice(0, 2)}</span>
                  )}
                </span>
                {g.name}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#12865f] dark:text-positive">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {de ? 'Verbunden' : 'Connected'}
              </span>
            </li>
          );
        })}
      </ul>
    </PreviewFrame>
  );
}

function CustomerPreview({ label }: { label: string }) {
  const { locale } = useRouter();
  const de = locale === 'de';
  const history = [
    { date: de ? '1. Nov.' : '1 Nov', amount: 159 },
    { date: de ? '1. Okt.' : '1 Oct', amount: 159 },
  ];
  return (
    <PreviewFrame label={label}>
      <div className="flex items-center gap-2.5 font-ui">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7657f6] to-[#39d5e8] text-[11px] font-semibold text-white">
          AS
        </span>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold text-[#242638] dark:text-ink">Acme Studio</div>
          <div className="text-[10.5px] text-[#6b6f86] dark:text-subtle">Business · {de ? 'monatlich' : 'monthly'}</div>
        </div>
        <span className="ml-auto rounded-full bg-[#20b486]/12 px-2 py-0.5 text-[10px] font-medium text-[#12865f] dark:text-positive">
          {de ? 'Aktiv' : 'Active'}
        </span>
      </div>
      <div className="mt-2.5 border-t border-[#ecedf3] pt-2 font-ui text-[10.5px] text-[#6b6f86] dark:border-line dark:text-subtle">
        {de ? 'Zahlungshistorie' : 'Payment history'}
      </div>
      <ul className="mt-1 space-y-0.5 font-ui text-[11px]">
        {history.map((h) => (
          <li key={h.date} className="flex items-center justify-between">
            <span className="text-[#5a5e75] dark:text-muted">{h.date}</span>
            <span className="inline-flex items-center gap-1 tabular-nums text-[#242638] dark:text-ink">
              {formatEUR(h.amount, locale, 2)}
              <Check className="h-3 w-3 text-[#12865f] dark:text-positive" />
            </span>
          </li>
        ))}
      </ul>
    </PreviewFrame>
  );
}

const PREVIEWS: Record<CapabilityKey, React.ComponentType<{ label: string }>> = {
  subscriptions: SubscriptionPreview,
  billing: BillingPreview,
  payments: PaymentsPreview,
  customers: CustomerPreview,
  dunning: DunningPreview,
  analytics: AnalyticsPreview,
};

/* -------------------------------------------------------------------------- */

export function CapabilitiesSection() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const copy = CAPABILITIES_COPY[locale];

  return (
    <section aria-labelledby="capabilities-heading" className="container-x py-20 md:py-28">
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

      <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {copy.cards.map((card, i) => {
          const Preview = PREVIEWS[card.key];
          const href = resolveNavHref(CAPABILITY_LINKS[card.key]);
          const lavender = i % 2 === 1;
          return (
            <Reveal
              as="li"
              key={card.key}
              index={i % 3}
              className={`group/cap relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#7657f6]/35 hover:shadow-[0_24px_48px_-28px_rgba(36,33,90,0.45)] ${
                lavender
                  ? 'border-[#e4e0fb] bg-[#faf9ff] dark:border-line dark:bg-soft'
                  : 'border-[#e7e8f0] bg-white dark:border-line dark:bg-surface'
              }`}
            >
              {/* Hover glow + top hairline */}
              <span
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(118,87,246,0.16),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover/cap:opacity-100"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#7657f6] to-[#39d5e8] transition-transform duration-500 ease-out group-hover/cap:scale-x-100"
                aria-hidden="true"
              />

              <CapabilityIcon name={card.key} />
              <h3 className="mt-6 font-display text-[1.1875rem] font-semibold tracking-[-0.02em] text-[#242638] dark:text-ink">
                {card.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5a5e75] dark:text-muted">{card.body}</p>

              {/* Preview + link pinned to the bottom so previews line up across a row */}
              <div className="mt-auto pt-6">
                <Preview label={copy.sample} />
              </div>

              {href && (
                <AppLink
                  href={localHref(href)}
                  // Stretched link: the whole card is clickable; the visible text stays the link label.
                  className="link-arrow pt-5 font-ui text-[14px] after:absolute after:inset-0 after:content-['']"
                >
                  {copy.linkLabel}
                  <span className="sr-only">: {card.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </AppLink>
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
