import React, { useState } from 'react';
import { formatEUR } from '../utils/formatting';
import { useRouter } from '../context/RouterContext';

type PreviewTab = 'schedule' | 'waterfall' | 'forecast';

const SAMPLE_SCHEDULE_ROWS = [
  { contract: 'Illustrative Annual Enterprise A', term: '01.01.2026 – 31.12.2026', grossBilled: 28560, vat: 4560, netTotal: 24000, monthlyRec: 2000, deferredRemaining: 14000 },
  { contract: 'Illustrative Mid-Market B (Upgrade)', term: '01.03.2026 – 28.02.2027', grossBilled: 17136, vat: 2736, netTotal: 14400, monthlyRec: 1200, deferredRemaining: 9600 },
  { contract: 'Illustrative Agency Retainer C', term: '01.04.2026 – 31.03.2027', grossBilled: 10710, vat: 1710, netTotal: 9000, monthlyRec: 750, deferredRemaining: 6750 },
];

const SAMPLE_WATERFALL = [
  { period: 'Q1 2026', openingArr: 420000, newArr: 48000, expansion: 18000, churn: -9000, closingArr: 477000 },
  { period: 'Q2 2026', openingArr: 477000, newArr: 62000, expansion: 24500, churn: -11500, closingArr: 552000 },
  { period: 'Q3 2026', openingArr: 552000, newArr: 71000, expansion: 29000, churn: -12000, closingArr: 640000 },
];

const SAMPLE_FORECAST = [
  { quarter: 'Q4 2026', committedBacklog: 142000, expectedRenewals: 38000, weightedPipeline: 19500, totalRecognized: 199500 },
  { quarter: 'Q1 2027', committedBacklog: 118000, expectedRenewals: 69000, weightedPipeline: 34000, totalRecognized: 221000 },
  { quarter: 'Q2 2027', committedBacklog: 86000, expectedRenewals: 104000, weightedPipeline: 52000, totalRecognized: 242000 },
];

export function HeroLedgerPreview() {
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState<PreviewTab>('schedule');

  return (
    <div className="rounded-xl border border-slate-700/70 bg-[#0f1523]/92 text-slate-100 shadow-2xl shadow-black/50 backdrop-blur-md overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-[#0b0f17]/95 px-4 py-3">
        <div>
          <div className="text-xs font-semibold text-white">
            IFRS 15 Revenue Sub-Ledger Preview
          </div>
          <div className="text-[11px] text-slate-400">
            Illustrative sample figures in EUR (net of 19% VAT)
          </div>
        </div>

        <div role="tablist" aria-label="Revenue sub-ledger views" className="inline-flex rounded-lg bg-[#161e2e] p-0.5 border border-slate-700/80">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'schedule'}
            onClick={() => setActiveTab('schedule')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'schedule'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Recognition
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'waterfall'}
            onClick={() => setActiveTab('waterfall')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'waterfall'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            ARR Bridge
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'forecast'}
            onClick={() => setActiveTab('forecast')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'forecast'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Forecast
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        {activeTab === 'schedule' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 pr-3 font-medium">Contract</th>
                <th className="py-2 px-3 font-medium text-right">Net Total</th>
                <th className="py-2 px-3 font-medium text-right">EU VAT</th>
                <th className="py-2 px-3 font-medium text-right">Monthly Rec.</th>
                <th className="py-2 pl-3 font-medium text-right">Deferred Bal.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
              {SAMPLE_SCHEDULE_ROWS.map((row) => (
                <tr key={row.contract}>
                  <td className="py-2.5 pr-3 font-sans">
                    <div className="font-medium text-white">{row.contract}</div>
                    <div className="text-[11px] text-slate-400">{row.term}</div>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-200">{formatEUR(row.netTotal, locale)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">{formatEUR(row.vat, locale)}</td>
                  <td className="py-2.5 px-3 text-right font-medium text-emerald-300">{formatEUR(row.monthlyRec, locale)}</td>
                  <td className="py-2.5 pl-3 text-right text-white">{formatEUR(row.deferredRemaining, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'waterfall' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 pr-3 font-medium">Period</th>
                <th className="py-2 px-3 font-medium text-right">Opening ARR</th>
                <th className="py-2 px-3 font-medium text-right">New &amp; Exp.</th>
                <th className="py-2 px-3 font-medium text-right">Churn</th>
                <th className="py-2 pl-3 font-medium text-right">Closing ARR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
              {SAMPLE_WATERFALL.map((row) => (
                <tr key={row.period}>
                  <td className="py-2.5 pr-3 font-sans font-medium text-white">{row.period}</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{formatEUR(row.openingArr, locale)}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-300">+{formatEUR(row.newArr + row.expansion, locale)}</td>
                  <td className="py-2.5 px-3 text-right text-orange-300">{formatEUR(row.churn, locale)}</td>
                  <td className="py-2.5 pl-3 text-right font-semibold text-white">{formatEUR(row.closingArr, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'forecast' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 pr-3 font-medium">Quarter</th>
                <th className="py-2 px-3 font-medium text-right">Committed Backlog</th>
                <th className="py-2 px-3 font-medium text-right">Cohort Renewals</th>
                <th className="py-2 px-3 font-medium text-right">Weighted Pipeline</th>
                <th className="py-2 pl-3 font-medium text-right">Projected IFRS Rev.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
              {SAMPLE_FORECAST.map((row) => (
                <tr key={row.quarter}>
                  <td className="py-2.5 pr-3 font-sans font-medium text-white">{row.quarter}</td>
                  <td className="py-2.5 px-3 text-right text-slate-200">{formatEUR(row.committedBacklog, locale)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{formatEUR(row.expectedRenewals, locale)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">{formatEUR(row.weightedPipeline, locale)}</td>
                  <td className="py-2.5 pl-3 text-right font-semibold text-amber-300">{formatEUR(row.totalRecognized, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
