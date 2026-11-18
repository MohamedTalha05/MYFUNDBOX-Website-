import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { validateDemoRequest, type DemoRequestPayload } from '../utils/validation';
import { SITE_CONFIG } from '../data/siteConfig';
import { AppLink } from './ReusableBlocks';
import { useRouter } from '../context/RouterContext';

const INITIAL_FORM: DemoRequestPayload = {
  fullName: '',
  workEmail: '',
  companyName: '',
  country: 'Germany',
  arrBand: '€1M – €5M',
  primaryUseCase: 'IFRS 15 / HGB Revenue Recognition',
  notes: '',
  gdprConsent: false,
};

export function DemoRequestForm() {
  const { locale } = useRouter();
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        setServerErrorMsg(data?.message || 'Unable to submit request. Please review highlighted fields.');
        setStatus('serverError');
        return;
      }
      setReferenceId(data.referenceId || 'REQ-CONFIRMED');
      setStatus('submitted');
    } catch {
      setServerErrorMsg('Network error while submitting your demo request. Please try again.');
      setStatus('serverError');
    }
  }

  if (status === 'submitted') {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/30 p-6 md:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Demo request received
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Thank you, {form.fullName}. Our EU revenue management team will contact{' '}
              <span className="font-medium">{form.workEmail}</span> to schedule a tailored walkthrough for{' '}
              <span className="font-medium">{form.companyName}</span>.
            </p>
            <p className="mt-3 text-xs font-mono text-slate-600 dark:text-slate-400">
              Reference: {referenceId} · GDPR third-party sharing: Disabled
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_FORM);
                setStatus('idle');
                setReferenceId(null);
              }}
              className="mt-5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Book a demo with our EU team
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Endpoint configured: <code className="font-mono text-xs">{SITE_CONFIG.demoEndpoint}</code> [ADD: Wire CRM webhook URL for production]
        </p>
      </div>

      {status === 'serverError' && serverErrorMsg && (
        <div role="alert" className="rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 px-4 py-3 text-xs text-rose-800 dark:text-rose-200">
          {serverErrorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-fullname" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
            Full name *
          </label>
          <input
            id="demo-fullname"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
            aria-invalid={Boolean(errors.fullName)}
            placeholder="Katrin Weber"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
          />
          {errors.fullName && (
            <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="demo-email" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
            Work email *
          </label>
          <input
            id="demo-email"
            name="workEmail"
            type="email"
            required
            value={form.workEmail}
            onChange={(e) => setForm((p) => ({ ...p, workEmail: e.target.value }))}
            aria-invalid={Boolean(errors.workEmail)}
            placeholder="katrin@company.de"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
          />
          {errors.workEmail && (
            <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
              {errors.workEmail}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-company" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
            Company / legal entity *
          </label>
          <input
            id="demo-company"
            name="companyName"
            type="text"
            required
            value={form.companyName}
            onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
            aria-invalid={Boolean(errors.companyName)}
            placeholder="NordicCloud GmbH"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
          />
          {errors.companyName && (
            <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
              {errors.companyName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="demo-country" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
            Primary jurisdiction *
          </label>
          <select
            id="demo-country"
            name="country"
            value={form.country}
            onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
            aria-invalid={Boolean(errors.country)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
          >
            <option value="Germany">Germany</option>
            <option value="Austria">Austria</option>
            <option value="Switzerland">Switzerland</option>
            <option value="France">France</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Spain">Spain</option>
            <option value="Nordics / Other EU">Nordics / Other EU</option>
            <option value="UK / Global">UK / Global</option>
          </select>
          {errors.country && (
            <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
              {errors.country}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-arr" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
            Annual recurring revenue (EUR) *
          </label>
          <select
            id="demo-arr"
            name="arrBand"
            value={form.arrBand}
            onChange={(e) => setForm((p) => ({ ...p, arrBand: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
          >
            <option value="Under €1M">Under €1M</option>
            <option value="€1M – €5M">€1M – €5M</option>
            <option value="€5M – €20M">€5M – €20M</option>
            <option value="€20M – €100M">€20M – €100M</option>
            <option value="€100M+">€100M+</option>
          </select>
        </div>

        <div>
          <label htmlFor="demo-usecase" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
            Primary focus
          </label>
          <select
            id="demo-usecase"
            name="primaryUseCase"
            value={form.primaryUseCase}
            onChange={(e) => setForm((p) => ({ ...p, primaryUseCase: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
          >
            <option value="IFRS 15 / HGB Revenue Recognition">IFRS 15 / HGB Revenue Recognition</option>
            <option value="Deferred Revenue & DATEV / ERP Export">Deferred Revenue &amp; DATEV / ERP Export</option>
            <option value="MRR / ARR Reporting & Cohorts">MRR / ARR Reporting &amp; Cohorts</option>
            <option value="Revenue Forecasting">Revenue Forecasting</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="demo-notes" className="block text-xs font-medium text-slate-800 dark:text-slate-200 mb-1.5">
          Current billing &amp; accounting stack (optional)
        </label>
        <textarea
          id="demo-notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          placeholder="e.g., Stripe Billing + HubSpot + DATEV / Exact Online"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-rose-700 focus:outline-none"
        />
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            id="demo-gdpr"
            type="checkbox"
            checked={form.gdprConsent}
            onChange={(e) => setForm((p) => ({ ...p, gdprConsent: e.target.checked }))}
            aria-invalid={Boolean(errors.gdprConsent)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-rose-700"
          />
          <span>
            I consent to MYFUNDBOX processing my request under GDPR (Art. 6(1)(a) &amp; (b)). Your data is stored in the EU and never shared with third-party data brokers. See our{' '}
            <AppLink href={`/${locale}/legal/privacy`} className="text-rose-700 dark:text-rose-400 underline">
              Privacy Policy
            </AppLink>
            . *
          </span>
        </label>
        {errors.gdprConsent && (
          <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
            {errors.gdprConsent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-gradient-primary w-full sm:w-auto rounded-lg px-6 py-3 text-sm font-semibold disabled:opacity-60 cursor-pointer whitespace-nowrap"
      >
        {status === 'submitting' ? 'Submitting request...' : 'Book a demo'}
      </button>
    </form>
  );
}
