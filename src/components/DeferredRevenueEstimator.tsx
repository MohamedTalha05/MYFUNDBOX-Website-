import React, { useMemo, useState } from 'react';
import { calculateDeferredAndTimeEstimate, type EstimatorInput } from '../utils/revenueCalculator';
import { formatEUR, formatEUNumber } from '../utils/formatting';
import { useRouter } from '../context/RouterContext';

export function DeferredRevenueEstimator() {
  const { locale } = useRouter();
  const [input, setInput] = useState<EstimatorInput>({
    activeContracts: 250,
    averageAcvEur: 4800,
    annualPrepaidSharePct: 65,
    billingSourceCount: 3,
    currentManualCloseHours: 36,
  });

  const result = useMemo(() => calculateDeferredAndTimeEstimate(input), [input]);
  const maxBarValue = useMemo(
    () =>
      Math.max(
        1,
        ...result.schedule.map((r) => Math.max(r.recognizedRevenueEur, r.endingDeferredRevenueEur))
      ),
    [result.schedule]
  );

  return (
    <section
      id="calculator"
      aria-labelledby="estimator-heading"
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
            Interactive Finance Estimator (Client-Side Estimate)
          </p>
          <h2
            id="estimator-heading"
            className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Estimate your deferred revenue balance &amp; close hours saved
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Adjust your active contract volume, annual prepaid share, and current manual close workload to model a 12-month IFRS 15 / HGB recognition roll-forward in EUR.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setInput({
              activeContracts: 250,
              averageAcvEur: 4800,
              annualPrepaidSharePct: 65,
              billingSourceCount: 3,
              currentManualCloseHours: 36,
            })
          }
          className="self-start md:self-auto rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer whitespace-nowrap"
        >
          Reset defaults
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <label htmlFor="calc-contracts" className="font-medium text-slate-800 dark:text-slate-200">
                Active Customer Contracts
              </label>
              <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                {formatEUNumber(input.activeContracts, locale)}
              </span>
            </div>
            <input
              id="calc-contracts"
              type="range"
              min={10}
              max={2000}
              step={10}
              value={input.activeContracts}
              onChange={(e) => setInput((prev) => ({ ...prev, activeContracts: Number(e.target.value) }))}
              className="w-full accent-rose-700 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <label htmlFor="calc-acv" className="font-medium text-slate-800 dark:text-slate-200">
                Average Annual Contract Value (Net EUR)
              </label>
              <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                {formatEUR(input.averageAcvEur, locale)}
              </span>
            </div>
            <input
              id="calc-acv"
              type="range"
              min={600}
              max={50000}
              step={200}
              value={input.averageAcvEur}
              onChange={(e) => setInput((prev) => ({ ...prev, averageAcvEur: Number(e.target.value) }))}
              className="w-full accent-rose-700 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <label htmlFor="calc-annual-pct" className="font-medium text-slate-800 dark:text-slate-200">
                Annual Prepaid Billing Share
              </label>
              <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                {input.annualPrepaidSharePct}%
              </span>
            </div>
            <input
              id="calc-annual-pct"
              type="range"
              min={0}
              max={100}
              step={5}
              value={input.annualPrepaidSharePct}
              onChange={(e) => setInput((prev) => ({ ...prev, annualPrepaidSharePct: Number(e.target.value) }))}
              className="w-full accent-rose-700 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="calc-sources" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Billing / CRM Sources
              </label>
              <input
                id="calc-sources"
                type="number"
                min={1}
                max={15}
                value={input.billingSourceCount}
                onChange={(e) => setInput((prev) => ({ ...prev, billingSourceCount: Number(e.target.value) }))}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="calc-hours" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Manual Close Hours / Mo
              </label>
              <input
                id="calc-hours"
                type="number"
                min={2}
                max={300}
                value={input.currentManualCloseHours}
                onChange={(e) => setInput((prev) => ({ ...prev, currentManualCloseHours: Number(e.target.value) }))}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm font-mono tabular-nums text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Explicit Stated Assumptions */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Estimate Notice &amp; Stated Assumptions
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {result.assumptions.map((a) => (
                <li key={a}>· {a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Output Summary + 12-Month Schedule Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Contracted ARR</div>
              <div className="mt-1 text-xl font-semibold font-mono tabular-nums text-slate-900 dark:text-white" data-testid="calc-total-arr">
                {formatEUR(result.totalContractedArrEur, locale)}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">Month-1 Deferred Liability</div>
              <div className="mt-1 text-xl font-semibold font-mono tabular-nums text-rose-700 dark:text-rose-400" data-testid="calc-m1-deferred">
                {formatEUR(result.endingMonth1DeferredEur, locale)}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">Est. Close Hours Saved / Mo</div>
              <div className="mt-1 text-xl font-semibold font-mono tabular-nums text-amber-700 dark:text-amber-300" data-testid="calc-hours-saved">
                ~{result.estimatedHoursSavedPerMonth} hrs ({result.estimatedAnnualHoursSaved} hrs/yr)
              </div>
            </div>
          </div>

          {/* 12-month visual waterfall bars */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="font-medium text-slate-800 dark:text-slate-200">
                12-Month Deferred Burn-Down vs. Monthly Recognized Revenue
              </span>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-rose-700 dark:bg-rose-500 inline-block" aria-hidden="true" />
                  Ending Deferred
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-slate-400 dark:bg-slate-600 inline-block" aria-hidden="true" />
                  Recognized
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 items-end h-36 pt-2">
              {result.schedule.map((row) => {
                const defPct = Math.round((row.endingDeferredRevenueEur / maxBarValue) * 100);
                const recPct = Math.max(4, Math.round((row.recognizedRevenueEur / maxBarValue) * 100));
                return (
                  <div key={row.monthIndex} className="flex flex-col items-center h-full justify-end gap-1">
                    <div className="w-full flex items-end justify-center gap-0.5 h-28">
                      <div
                        className="w-1/2 rounded-t bg-rose-700 dark:bg-rose-500 transition-all duration-150"
                        style={{ height: `${defPct}%` }}
                        title={`${row.monthLabel} Deferred: ${formatEUR(row.endingDeferredRevenueEur, locale)}`}
                      />
                      <div
                        className="w-1/2 rounded-t bg-slate-400 dark:bg-slate-600 transition-all duration-150"
                        style={{ height: `${recPct}%` }}
                        title={`${row.monthLabel} Recognized: ${formatEUR(row.recognizedRevenueEur, locale)}`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {row.monthLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Machine-readable HTML schedule table (first 6 + M12 summary) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2 pr-3 font-medium">Month</th>
                  <th className="py-2 px-3 font-medium text-right">Cash Billed (Net)</th>
                  <th className="py-2 px-3 font-medium text-right">Recognized Revenue</th>
                  <th className="py-2 pl-3 font-medium text-right">Ending Deferred Liability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums">
                {result.schedule.filter((r) => [1, 2, 3, 6, 9, 12].includes(r.monthIndex)).map((row) => (
                  <tr key={row.monthIndex}>
                    <td className="py-2 pr-3 font-sans font-medium text-slate-900 dark:text-slate-100">Month {row.monthIndex}</td>
                    <td className="py-2 px-3 text-right text-slate-700 dark:text-slate-300">{formatEUR(row.cashCollectedEur, locale)}</td>
                    <td className="py-2 px-3 text-right text-slate-900 dark:text-slate-100">{formatEUR(row.recognizedRevenueEur, locale)}</td>
                    <td className="py-2 pl-3 text-right font-medium text-rose-700 dark:text-rose-400">{formatEUR(row.endingDeferredRevenueEur, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
