import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';
import type { PageMetadataEntry } from '../data/pagesRegistry';
import { useRouter } from '../context/RouterContext';
import { SITE_CONFIG } from '../data/siteConfig';
import { BreadcrumbNav, AuthorMetaLine } from '../components/ReusableBlocks';
import { DemoRequestForm } from '../components/DemoRequestForm';

export function BookDemoPage({ page }: { page: PageMetadataEntry }) {
  const { locale } = useRouter();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-14 space-y-12">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <DemoRequestForm />
        </div>

        {/* Aside Column: What happens during walkthrough */}
        <aside className="lg:col-span-5 rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent font-ui mb-2">
              <Clock className="h-4 w-4" />
              <span>30 Minuten Screen-Share</span>
            </div>
            <h2 className="text-xl font-display font-bold text-ink">
              {locale === 'de' ? 'Was erwartet Sie in der Produktdemo?' : 'What to expect during your walkthrough'}
            </h2>
          </div>

          <ol className="space-y-4 text-xs sm:text-sm text-muted">
            <li className="flex items-start gap-3">
              <span className="font-mono font-bold text-accent shrink-0 mt-0.5">01.</span>
              <div>
                <strong className="text-ink block">
                  {locale === 'de' ? 'Bestehende Zahlungs-Gateways prüfen' : 'Review your payment gateway setup'}
                </strong>
                <span>
                  {locale === 'de'
                    ? 'Wir zeigen Ihnen, wie Sie Ihre Konten bei Stripe, GoCardless, Mollie oder PayPal direkt verbinden – ohne neue Bankkonten.'
                    : 'We review how to connect your existing merchant accounts across Stripe, GoCardless, Mollie, or PayPal directly.'}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="font-mono font-bold text-accent shrink-0 mt-0.5">02.</span>
              <div>
                <strong className="text-ink block">
                  {locale === 'de' ? 'Abopläne, Checkout & Pay Links' : 'Plan configuration & hosted checkout'}
                </strong>
                <span>
                  {locale === 'de'
                    ? 'Gemeinsame Konfiguration Ihrer Tarife, Testphasen, Gutscheine und Einbindung des markenkonformen Checkouts.'
                    : 'Live modeling of your subscription plans, free trials, coupons, and white-labeled checkout under your domain.'}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="font-mono font-bold text-accent shrink-0 mt-0.5">03.</span>
              <div>
                <strong className="text-ink block">
                  {locale === 'de' ? 'Smart Dunning & Umsatzrettung' : 'Smart Dunning & card retry strategy'}
                </strong>
                <span>
                  {locale === 'de'
                    ? 'Automatisierte Mahnläufe und Kunden-Self-Service zur Vermeidung unabsichtlicher Abo-Kündigungen.'
                    : 'Demonstration of intelligent card retry rules and customer self-cure workflows to prevent involuntary churn.'}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="font-mono font-bold text-accent shrink-0 mt-0.5">04.</span>
              <div>
                <strong className="text-ink block">
                  {locale === 'de' ? 'EU-MwSt. & Buchhaltungsabgleich' : 'EU VAT & accounting sync'}
                </strong>
                <span>
                  {locale === 'de'
                    ? 'Automatische USt-IdNr.-Prüfung und nahtlose Synchronisation mit sevDesk, Lexware, QuickBooks oder Xero.'
                    : 'Real-time European VAT ID validation and automated invoice syncing with sevDesk, Lexware, QuickBooks, and Xero.'}
                </span>
              </div>
            </li>
          </ol>

          <div className="border-t border-line pt-4 space-y-2 text-xs text-subtle">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-positive shrink-0" />
              <span>Hosting: Frankfurt am Main, Deutschland (ISO 27001)</span>
            </div>
            <div>DSGVO-Auftragsverarbeitungsvertrag (AVV) verfügbar</div>
            <div>0 % Umsatzbeteiligung auf allen Tarifen</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

