import React, { useMemo, useState } from 'react';
import { calculateBillingComparison } from '../utils/billingCalculator';
import { formatEUR, formatEUNumber } from '../utils/formatting';
import { useRouter } from '../context/RouterContext';
import { Check, Info, Sparkles } from 'lucide-react';
import { APP_LINKS } from '../data/siteConfig';

export function SubscriptionSavingsCalculator() {
  const { locale } = useRouter();
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(60000);
  const [subscribers, setSubscribers] = useState<number>(350);

  const result = useMemo(
    () =>
      calculateBillingComparison({
        monthlyRevenueEur: monthlyRevenue,
        subscribersCount: subscribers,
      }),
    [monthlyRevenue, subscribers]
  );

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-line pb-8">
        <div className="max-w-2xl">
          <p className="font-ui text-xs font-semibold uppercase tracking-wider text-accent">
            {locale === 'de' ? 'Interaktiver Ersparnisrechner' : 'Interactive ROI & Savings Calculator'}
          </p>
          <h2
            id="calculator-heading"
            className="mt-2 text-2xl sm:text-3xl font-display font-bold tracking-tight text-ink"
          >
            {locale === 'de'
              ? 'Wie viel sparen Sie mit flachen Abogebühren statt Prozentabzügen?'
              : 'Calculate your savings: Flat pricing vs. %-of-revenue fees'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            {locale === 'de'
              ? 'Vergleichen Sie die festen Monatspreise von MYFUNDBOX (0 % Umsatzabzug) mit Anbietern wie Stripe Billing (0,7 %), Recurly (0,9 %) und Paddle (5 %).'
              : 'Most billing software charges a percentage of every euro you earn (0.7% to 5.0% + transaction fees). MYFUNDBOX charges a flat tier by subscriber count—taking 0% of your gross billing volume.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl bg-accent-soft px-4 py-2.5 text-xs font-semibold text-accent border border-accent/20">
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{locale === 'de' ? '0 % Umsatzprovision bei MYFUNDBOX' : '0% revenue cut on all plans'}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="monthly-revenue-slider" className="text-sm font-medium text-ink">
                {locale === 'de' ? 'Monatliches Abrechnungsvolumen (MRR)' : 'Monthly Recurring Revenue (MRR)'}
              </label>
              <span className="font-mono text-base font-bold text-ink">
                {formatEUR(monthlyRevenue, locale)}
              </span>
            </div>
            <input
              id="monthly-revenue-slider"
              type="range"
              min={5000}
              max={300000}
              step={5000}
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full h-2 bg-soft rounded-lg appearance-none cursor-pointer accent-ink"
            />
            <div className="flex justify-between text-xs text-subtle mt-1.5 font-mono">
              <span>5.000 €</span>
              <span>150.000 €</span>
              <span>300.000 €</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="subscribers-slider" className="text-sm font-medium text-ink">
                {locale === 'de' ? 'Aktive Abonnenten / Kunden' : 'Active paying subscribers'}
              </label>
              <span className="font-mono text-base font-bold text-ink">
                {formatEUNumber(subscribers, locale)} {locale === 'de' ? 'Kunden' : 'subscribers'}
              </span>
            </div>
            <input
              id="subscribers-slider"
              type="range"
              min={10}
              max={3000}
              step={10}
              value={subscribers}
              onChange={(e) => setSubscribers(Number(e.target.value))}
              className="w-full h-2 bg-soft rounded-lg appearance-none cursor-pointer accent-ink"
            />
            <div className="flex justify-between text-xs text-subtle mt-1.5 font-mono">
              <span>10 (Free tier)</span>
              <span>500 (Professional)</span>
              <span>3.000+ (Advanced)</span>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-soft/50 p-4 space-y-2 text-xs text-muted">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-subtle shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {locale === 'de'
                  ? 'Ihr passender MYFUNDBOX-Plan basiert ausschließlich auf der Kundenzahl:'
                  : 'Your matched MYFUNDBOX plan is determined solely by active subscribers:'}{' '}
                <strong className="text-ink">
                  {result.myfundboxPlanName}{' '}
                  {result.myfundboxMonthlyEur === 0
                    ? '(0 €/Monat)'
                    : `(${formatEUR(result.myfundboxMonthlyEur, locale)}/Monat)`}
                </strong>
              </span>
            </div>
            <p className="pl-6 text-[11px] text-subtle">
              {locale === 'de'
                ? 'Bis 25 Abonnenten dauerhaft kostenlos. Bis 500 Kunden 199 €/Mo. Unbegrenzte Kunden 399 €/Mo.'
                : 'Free up to 25 subscribers. €199/mo up to 500 subscribers. €399/mo for unlimited subscribers.'}
            </p>
          </div>
        </div>

        {/* Live Comparison Card */}
        <div className="lg:col-span-6 rounded-xl border border-line bg-canvas p-6 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted font-ui">
              {locale === 'de' ? 'Jährliche Ersparnis mit MYFUNDBOX' : 'Estimated annual savings with MYFUNDBOX'}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-positive tabular-nums tracking-tight">
                +{formatEUR(result.annualSavingsVsStripe, locale)}
              </span>
              <span className="text-sm font-medium text-muted">
                {locale === 'de' ? '/ Jahr ggü. Stripe Billing' : '/ year vs. Stripe Billing'}
              </span>
            </div>
            <p className="mt-1 text-xs text-subtle">
              {locale === 'de'
                ? `Oder bis zu +${formatEUR(result.annualSavingsVsPaddle, locale)} / Jahr Ersparnis im Vergleich zu Merchant-of-Record-Diensten wie Paddle (5 %).`
                : `Or up to +${formatEUR(result.annualSavingsVsPaddle, locale)} / year saved compared to Merchant of Record platforms like Paddle (5%).`}
            </p>
          </div>

          <div className="space-y-3 border-t border-line pt-4">
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-line/60">
              <span className="font-medium text-ink flex items-center gap-2">
                <Check className="h-4 w-4 text-positive" aria-hidden="true" />
                MYFUNDBOX ({result.myfundboxPlanName})
              </span>
              <span className="font-mono font-bold text-ink">
                {result.myfundboxMonthlyEur === 0
                  ? '0 €'
                  : `${formatEUR(result.myfundboxMonthlyEur, locale)} / mo`}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm py-1.5 border-b border-line/60 text-muted">
              <span>Stripe Billing (0,7 % Volumen)</span>
              <span className="font-mono">{formatEUR(result.stripeBillingMonthlyEur, locale)} / mo</span>
            </div>

            <div className="flex justify-between items-center text-sm py-1.5 border-b border-line/60 text-muted">
              <span>Recurly (249 € + 0,9 % Überhang)</span>
              <span className="font-mono">{formatEUR(result.recurlyMonthlyEur, locale)} / mo</span>
            </div>

            <div className="flex justify-between items-center text-sm py-1.5 text-muted">
              <span>Paddle (5 % + 0,50 €/Transaktion)</span>
              <span className="font-mono">{formatEUR(result.paddleMonthlyEur, locale)} / mo</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={APP_LINKS.signUp}
              className="btn-primary w-full justify-center py-2.5 text-sm"
            >
              {locale === 'de' ? 'Kostenlos starten (bis 25 Kunden)' : 'Start free with up to 25 subscribers'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

