import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { useRouter } from '../context/RouterContext';
import { useLocalHref } from '../utils/navLinks';
import { SITE_CONFIG, APP_LINKS } from '../data/siteConfig';
import { BreadcrumbNav, AuthorMetaLine, FAQSection, AppLink } from '../components/ReusableBlocks';

export function ContactPage({ page }: { page: PageMetadataEntry }) {
  const { locale } = useRouter();
  const localHref = useLocalHref();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'Sales & Pricing',
    message: '',
    gdprConsent: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.gdprConsent) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14 space-y-16">
      {/* Header */}
      <header className="max-w-4xl space-y-3">
        <BreadcrumbNav items={page.breadcrumbs} />
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
          {page.h1}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted max-w-3xl">
          {page.aeoSummary}
        </p>
        <div className="pt-2">
          <AuthorMetaLine authorId={page.authorId} lastUpdated={page.lastUpdated} />
        </div>
      </header>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="text-base font-display font-bold text-ink">
            {locale === 'de' ? 'Vertrieb & Beratung' : 'Sales & Pricing'}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            {locale === 'de'
              ? 'Fragen zu Plänen, Multi-Gateway-Unterstützung oder Migration von anderen Abrechnungssystemen.'
              : 'Questions about subscriber tiers, multi-gateway orchestration, or migrating from other platforms.'}
          </p>
          <div className="pt-2">
            <AppLink href={localHref('/book-a-demo')} className="text-xs font-semibold text-accent hover:underline">
              {locale === 'de' ? 'Live-Demo buchen →' : 'Schedule a walkthrough →'}
            </AppLink>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="text-base font-display font-bold text-ink">
            {locale === 'de' ? 'Technischer Support & API' : 'Support & Documentation'}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            {locale === 'de'
              ? 'Hilfe zu Webhooks, API-Integrationen oder Kontoeinstellungen. Dokumentation online verfügbar.'
              : 'Assistance with webhooks, REST API endpoints, or subscriber account setup.'}
          </p>
          <div className="pt-2">
            <a
              href={APP_LINKS.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent hover:underline"
            >
              {locale === 'de' ? 'API-Dokumentation öffnen →' : 'Browse API Docs →'}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3">
          <div className="h-10 w-10 rounded-xl bg-soft text-ink flex items-center justify-center">
            <MapPin className="h-5 w-5" />
          </div>
          <h2 className="text-base font-display font-bold text-ink">
            {locale === 'de' ? 'Standort & Datenschutz' : 'Location & GDPR'}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            {locale === 'de'
              ? 'Entwickelt in Deutschland. Rechenzentrum in Frankfurt am Main. Volle DSGVO-Konformität.'
              : 'Engineered in Germany. ISO-certified data center in Frankfurt. European data sovereignty.'}
          </p>
          <div className="pt-2">
            <AppLink href={localHref('/privacy-policy')} className="text-xs font-semibold text-subtle hover:text-ink hover:underline">
              {locale === 'de' ? 'Datenschutzerklärung ansehen →' : 'View Privacy Policy →'}
            </AppLink>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <section className="rounded-2xl border border-line bg-surface p-6 sm:p-10 shadow-sm max-w-3xl">
        <div className="border-b border-line pb-4 mb-6">
          <h2 className="text-xl font-display font-bold text-ink">
            {locale === 'de' ? 'Direkte Nachricht senden' : 'Send us a message'}
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            {locale === 'de'
              ? 'Unser Team antwortet in der Regel innerhalb eines Werktages.'
              : 'Our European support and sales team typically responds within one business day.'}
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-line bg-canvas p-6 flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-positive shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-semibold text-ink">
                {locale === 'de' ? 'Nachricht erfolgreich gesendet' : 'Message received'}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {locale === 'de'
                  ? `Vielen Dank, ${form.name}. Wir haben Ihre Nachricht erhalten und melden uns in Kürze unter ${form.email}.`
                  : `Thank you, ${form.name}. We have received your inquiry and will contact you shortly at ${form.email}.`}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
                  {locale === 'de' ? 'Name *' : 'Name *'}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface"
                  placeholder="Lukas Meyer"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
                  {locale === 'de' ? 'E-Mail *' : 'Email *'}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface"
                  placeholder="lukas@firma.de"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-topic" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
                {locale === 'de' ? 'Thema' : 'Topic'}
              </label>
              <select
                id="contact-topic"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface"
              >
                <option value="Sales & Pricing">Sales &amp; Pricing</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership & Gateway Integration">Partnership &amp; Gateway Integration</option>
                <option value="Data Protection & Compliance">Data Protection &amp; Compliance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-ink uppercase tracking-wider font-ui mb-1">
                {locale === 'de' ? 'Ihre Nachricht *' : 'Message *'}
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink bg-canvas transition-colors focus:bg-surface"
                placeholder={
                  locale === 'de'
                    ? 'Wie können wir Ihnen helfen?'
                    : 'How can our team help your subscription business?'
                }
              />
            </div>

            <div className="rounded-xl border border-line bg-soft/50 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.gdprConsent}
                  onChange={(e) => setForm({ ...form, gdprConsent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-line-strong text-ink focus:ring-accent"
                />
                <span className="text-xs text-muted leading-relaxed">
                  {locale === 'de' ? (
                    <>
                      Ich willige ein, dass meine Daten zur Beantwortung meiner Kontaktanfrage gemäß der{' '}
                      <AppLink href={localHref('/privacy-policy')} className="underline hover:text-ink">
                        Datenschutzerklärung
                      </AppLink>{' '}
                      verarbeitet werden.
                    </>
                  ) : (
                    <>
                      I consent to MYFUNDBOX processing my contact details to respond to this inquiry in accordance with the{' '}
                      <AppLink href={localHref('/privacy-policy')} className="underline hover:text-ink">
                        Privacy Policy
                      </AppLink>
                      .
                    </>
                  )}
                </span>
              </label>
            </div>

            <button type="submit" className="btn-primary px-6 py-2.5 text-sm font-semibold">
              {locale === 'de' ? 'Nachricht senden' : 'Send message'}
            </button>
          </form>
        )}
      </section>

      {/* Contact FAQs */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="max-w-4xl">
          <FAQSection faqs={page.faqs} />
        </section>
      )}
    </div>
  );
}

