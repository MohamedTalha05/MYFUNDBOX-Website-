import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  RefreshCw,
  Link as LinkIcon,
  Shield,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';

type PreviewMode = 'activity' | 'dunning' | 'paylinks';

export function HeroBillingPreview() {
  const { locale } = useRouter();
  const [activeTab, setActiveTab] = useState<PreviewMode>('activity');

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xl shadow-ink/5 backdrop-blur-md">
      {/* Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-positive animate-pulse" aria-hidden="true" />
            <span className="font-ui text-xs font-semibold uppercase tracking-wider text-muted">
              {locale === 'de' ? 'Abrechnungs-Dashboard' : 'Live Billing Engine'}
            </span>
            <span className="rounded-full bg-soft px-2 py-0.5 text-[10px] font-mono text-subtle">
              EU-Central (Frankfurt)
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-display text-2xl font-bold text-ink tabular-nums">
              54.820 € <span className="text-xs font-normal text-muted">MRR</span>
            </span>
            <span className="text-xs font-semibold text-positive flex items-center">
              +14,2 % MoM
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="inline-flex rounded-lg bg-soft p-1 border border-line text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`rounded-md px-2.5 py-1 transition-all cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-surface text-ink font-semibold shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            {locale === 'de' ? 'Transaktionen' : 'Transactions'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dunning')}
            className={`rounded-md px-2.5 py-1 transition-all cursor-pointer ${
              activeTab === 'dunning'
                ? 'bg-surface text-ink font-semibold shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            {locale === 'de' ? 'Smart Dunning' : 'Smart Dunning'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paylinks')}
            className={`rounded-md px-2.5 py-1 transition-all cursor-pointer ${
              activeTab === 'paylinks'
                ? 'bg-surface text-ink font-semibold shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            {locale === 'de' ? 'Pay Links' : 'Pay Links'}
          </button>
        </div>
      </div>

      {/* Gateway badges */}
      <div className="py-3 border-b border-line flex flex-wrap items-center gap-2 text-[11px] font-medium text-subtle">
        <span className="text-muted font-ui">{locale === 'de' ? 'Gateways:' : 'Connected rails:'}</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-soft px-2 py-0.5 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" />
          Stripe (Cards)
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-soft px-2 py-0.5 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" />
          GoCardless (SEPA)
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-soft px-2 py-0.5 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" />
          Mollie (iDEAL)
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-soft px-2 py-0.5 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-positive" />
          PayPal
        </span>
      </div>

      {/* Dynamic Tab Body */}
      <div className="pt-3 min-h-[170px]">
        {activeTab === 'activity' && (
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-line bg-canvas p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-md bg-emerald-50 text-positive flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-ink">149,00 € · Pro Plan (Monatlich)</div>
                  <div className="text-[11px] text-muted">SEPA Lastschrift (GoCardless) · MwSt. 19% validiert</div>
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-positive">Bezahlt</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-canvas p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-md bg-emerald-50 text-positive flex items-center justify-center shrink-0">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-ink">399,00 € · Scale Tier (Jährlich)</div>
                  <div className="text-[11px] text-muted">Kreditkarte (Stripe) · Rechnungs-Sync zu sevDesk</div>
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-positive">Bezahlt</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-canvas p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-md bg-emerald-50 text-positive flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-ink">79,00 € · Starter Add-on</div>
                  <div className="text-[11px] text-muted">iDEAL via Mollie · Kunde: Amsterdam B.V.</div>
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-positive">Bezahlt</span>
            </div>
          </div>
        )}

        {activeTab === 'dunning' && (
          <div className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-line bg-accent-soft/40 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink">Intelligenter Retry erfolgreich</span>
                    <p className="mt-0.5 text-[11px] text-muted">
                      Fehlgeschlagene Kartenzahlung über 89,00 € nach automatischer Erinnerung im 2. Versuch gerettet.
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-accent">+89,00 € gerettet</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-canvas p-2.5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-subtle" />
                <span className="text-muted">Kartenablauf-Warnung versendet (32 Tage vorher)</span>
              </div>
              <span className="text-[11px] font-mono text-positive">Aktualisiert</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-line bg-canvas p-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-positive" />
                <span className="text-muted">Kunden-Self-Service: Zahlungsart selbst gewechselt</span>
              </div>
              <span className="text-[11px] font-mono text-subtle">Kundenportal</span>
            </div>
          </div>
        )}

        {activeTab === 'paylinks' && (
          <div className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-line bg-canvas p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <LinkIcon className="h-3.5 w-3.5 text-accent" />
                  <span>pay.myfundbox.com/p/consulting-q4</span>
                </div>
                <span className="rounded bg-positive/10 px-1.5 py-0.5 font-mono text-[10px] text-positive font-semibold">
                  Aktiv
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-muted">
                <span>Einmal- oder Ratenzahlung · 1.250,00 €</span>
                <span>4 Transaktionen heute</span>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-canvas p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <LinkIcon className="h-3.5 w-3.5 text-accent" />
                  <span>pay.myfundbox.com/p/saas-membership</span>
                </div>
                <span className="rounded bg-positive/10 px-1.5 py-0.5 font-mono text-[10px] text-positive font-semibold">
                  Aktiv
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-muted">
                <span>Wiederkehrend 49,00 € / Monat · 14 Tage Testphase</span>
                <span>28 Abonnenten</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer note */}
      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between text-[11px] text-subtle">
        <span>0 % Abzug auf Transaktionen</span>
        <span className="font-medium text-ink flex items-center gap-1">
          Echte Multi-Gateway-Freiheit
          <ArrowUpRight className="h-3 w-3 text-accent" />
        </span>
      </div>
    </div>
  );
}

