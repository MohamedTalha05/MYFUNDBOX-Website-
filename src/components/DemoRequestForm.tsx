import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { validateDemoRequest, type DemoRequestPayload } from '../utils/validation';
import { SITE_CONFIG } from '../data/siteConfig';
import { AppLink } from './ReusableBlocks';
import { useLocalHref } from '../utils/navLinks';
import { useRouter } from '../context/RouterContext';

const INITIAL_FORM: DemoRequestPayload = {
  fullName: '',
  workEmail: '',
  companyName: '',
  country: 'Germany',
  arrBand: '100 – 500 subscribers (€5k – €25k MRR)',
  primaryUseCase: 'Multi-Gateway Subscription Billing',
  notes: '',
  gdprConsent: false,
};

export function DemoRequestForm() {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const [form, setForm] = useState<DemoRequestPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof DemoRequestPayload, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'serverError'>('idle');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [serverErrorMsg, setServerErrorMsg] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const check = validateDemoRequest(form);
    if (!check.valid) {
      setErrors(check.errors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    setServerErrorMsg('');

    try {
      const res = await fetch(SITE_CONFIG.demoEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        setServerErrorMsg(
          data?.message || (locale === 'de' ? 'Überprüfung fehlgeschlagen. Bitte prüfen Sie die markierten Felder.' : 'Unable to submit request. Please review highlighted fields.')
        );
        setStatus('serverError');
        return;
      }
      setReferenceId(data.referenceId || 'DEMO-REQ-CONFIRMED');
      setStatus('submitted');
    } catch {
      setServerErrorMsg(
        locale === 'de'
          ? 'Netzwerkfehler beim Absenden Ihrer Anfrage. Bitte versuchen Sie es erneut.'
          : 'Network error while submitting your demo request. Please try again.'
      );
      setStatus('serverError');
    }
  }

  if (status === 'submitted') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2 className="h-7 w-7 text-positive shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold text-ink">
              {locale === 'de' ? 'Demo-Anfrage erfolgreich erhalten' : 'Demo walkthrough request received'}
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {locale === 'de' ? (
                <>
                  Vielen Dank, <strong>{form.fullName}</strong>. Unser deutsches Subscription-Team wird sich unter{' '}
                  <span className="font-medium text-ink">{form.workEmail}</span> melden, um einen individuellen Termin für{' '}
                  <span className="font-medium text-ink">{form.companyName}</span> zu vereinbaren.
                </>
              ) : (
                <>
                  Thank you, <strong>{form.fullName}</strong>. Our European subscription billing team will reach out at{' '}
                  <span className="font-medium text-ink">{form.workEmail}</span> to schedule your 30-minute tailored walkthrough for{' '}
                  <span className="font-medium text-ink">{form.companyName}</span>.
                </>
              )}
            </p>
            <p className="text-xs font-mono text-subtle">
              Referenz: {referenceId} · DSGVO-konforme Verarbeitung · 0% Weitergabe an Dritte
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setForm(INITIAL_FORM);
                  setStatus('idle');
                  setReferenceId(null);
                }}
                className="btn-secondary px-4 py-2 text-xs"
              >
                {locale === 'de' ? 'Weitere Anfrage stellen' : 'Submit another inquiry'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-sm space-y-6"
    >
      <div className="border-b border-line pb-4">
        <h2 className="text-xl font-display font-bold text-ink">
          {locale === 'de' ? 'Persönliche Produktdemo vereinbaren' : 'Schedule a tailored walkthrough'}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {locale === 'de'
            ? '30 Minuten mit einem Abrechnungsexperten. Kein Verkaufsdruck, pure Produktpraxis.'
            : '30 minutes with a subscription billing specialist. No high-pressure sales, just pure product walkthrough.'}
        </p>
      </div>

      {serverErrorMsg && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {serverErrorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-name" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
            {locale === 'de' ? 'Vollständiger Name *' : 'Full name *'}
          </label>
          <input
            id="demo-name"
            type="text"
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface ${
              errors.fullName ? 'border-red-500' : 'border-line-strong'
            }`}
            placeholder="Katrin Weber"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="demo-email" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
            {locale === 'de' ? 'Geschäftliche E-Mail *' : 'Work email *'}
          </label>
          <input
            id="demo-email"
            type="email"
            required
            autoComplete="email"
            value={form.workEmail}
            onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface ${
              errors.workEmail ? 'border-red-500' : 'border-line-strong'
            }`}
            placeholder="katrin@unternehmen.de"
          />
          {errors.workEmail && <p className="mt-1 text-xs text-red-600">{errors.workEmail}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-company" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
            {locale === 'de' ? 'Unternehmensname *' : 'Company name *'}
          </label>
          <input
            id="demo-company"
            type="text"
            required
            autoComplete="organization"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface ${
              errors.companyName ? 'border-red-500' : 'border-line-strong'
            }`}
            placeholder="Nordic SaaS GmbH"
          />
          {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="demo-country" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
            {locale === 'de' ? 'Land / Region *' : 'Country / Region *'}
          </label>
          <select
            id="demo-country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface ${
              errors.country ? 'border-red-500' : 'border-line-strong'
            }`}
          >
            <option value="Germany">Germany (Deutschland)</option>
            <option value="Austria">Austria (Österreich)</option>
            <option value="Switzerland">Switzerland (Schweiz)</option>
            <option value="Netherlands">Netherlands (Nederland)</option>
            <option value="France">France</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Other EU / EEA">Other EU / EEA</option>
            <option value="Global / Rest of World">Global / Rest of World</option>
          </select>
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-arr" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
            {locale === 'de' ? 'Abonnentenanzahl / MRR *' : 'Subscriber volume / MRR *'}
          </label>
          <select
            id="demo-arr"
            value={form.arrBand}
            onChange={(e) => setForm({ ...form, arrBand: e.target.value })}
            className={`w-full rounded-lg border px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface ${
              errors.arrBand ? 'border-red-500' : 'border-line-strong'
            }`}
          >
            <option value="< 100 subscribers (< €5k MRR)">&lt; 100 subscribers (&lt; €5k MRR)</option>
            <option value="100 – 500 subscribers (€5k – €25k MRR)">100 – 500 subscribers (€5k – €25k MRR)</option>
            <option value="500 – 2,500 subscribers (€25k – €100k MRR)">500 – 2,500 subscribers (€25k – €100k MRR)</option>
            <option value="2,500+ subscribers (€100k+ MRR)">2,500+ subscribers (€100k+ MRR)</option>
            <option value="New Launch / Migration evaluation">New Launch / Migration evaluation</option>
          </select>
          {errors.arrBand && <p className="mt-1 text-xs text-red-600">{errors.arrBand}</p>}
        </div>

        <div>
          <label htmlFor="demo-usecase" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
            {locale === 'de' ? 'Haupt-Anwendungsfall' : 'Primary use case'}
          </label>
          <select
            id="demo-usecase"
            value={form.primaryUseCase}
            onChange={(e) => setForm({ ...form, primaryUseCase: e.target.value })}
            className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface"
          >
            <option value="Multi-Gateway Subscription Billing">Multi-Gateway Subscription Billing</option>
            <option value="SEPA Direct Debit & Recurring Invoicing">SEPA Direct Debit &amp; Recurring Invoicing</option>
            <option value="Pay Links & Hosted Checkout">Pay Links &amp; Hosted Checkout</option>
            <option value="Smart Dunning & Failed Payment Recovery">Smart Dunning &amp; Failed Payment Recovery</option>
            <option value="Replacing Percentage-Fee Billing (Stripe/Paddle/Recurly)">Replacing Percentage Fees (Stripe / Paddle / Recurly)</option>
            <option value="European Tax & Accounting Sync (sevDesk/Xero)">European Tax &amp; Accounting Sync (sevDesk/Xero)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="demo-notes" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
          {locale === 'de' ? 'Zusätzliche Notizen (optional)' : 'Additional questions or requirements (optional)'}
        </label>
        <textarea
          id="demo-notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface"
          placeholder={
            locale === 'de'
              ? 'z. B. Wir nutzen aktuell Stripe Billing und möchten GoCardless SEPA und sevDesk ergänzen...'
              : 'e.g. Currently on Stripe Billing, looking to add GoCardless SEPA and eliminate percentage-based fees...'
          }
        />
      </div>

      <div className="rounded-xl border border-line bg-soft/50 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.gdprConsent}
            onChange={(e) => setForm({ ...form, gdprConsent: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-line-strong text-ink focus:ring-accent"
          />
          <span className="text-xs text-muted leading-relaxed">
            {locale === 'de' ? (
              <>
                Ich willige ein, dass MYFUNDBOX meine Angaben zur Kontaktaufnahme und Terminvereinbarung gemäß der{' '}
                <AppLink href={localHref('/privacy-policy')} className="underline hover:text-ink">
                  Datenschutzerklärung
                </AppLink>{' '}
                verarbeitet. Keine Weitergabe an Werbedritte.
              </>
            ) : (
              <>
                I consent to MYFUNDBOX processing my contact details to schedule this walkthrough in accordance with the{' '}
                <AppLink href={localHref('/privacy-policy')} className="underline hover:text-ink">
                  Privacy Policy
                </AppLink>
                . Data is stored in Frankfurt, Germany with zero third-party advertising tracking.
              </>
            )}
          </span>
        </label>
        {errors.gdprConsent && <p className="mt-2 text-xs text-red-600">{errors.gdprConsent}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full justify-center py-3 text-sm font-semibold cursor-pointer"
        >
          <span>
            {status === 'submitting'
              ? (locale === 'de' ? 'Wird gesendet...' : 'Sending request...')
              : (locale === 'de' ? 'Demo anfordern' : 'Request tailored walkthrough')}
          </span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-subtle pt-1">
        <ShieldCheck className="h-4 w-4 text-positive" aria-hidden="true" />
        <span>Hosted in Frankfurt am Main · DSGVO-konform · 0% Datenschnitt</span>
      </div>
    </form>
  );
}
