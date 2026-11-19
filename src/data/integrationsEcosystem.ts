import type { LocaleCode } from '../utils/formatting';
import type { BrandMarkKey } from './brandMarks';

/**
 * Integrations & technology ecosystem shown on the homepage strip.
 *
 * Every entry carries its own role caption so the strip never implies that all
 * integrations offer the same functionality or availability.
 *
 * Sources: Stripe, PayPal, Mollie, GoCardless, QuickBooks, sevdesk, Avalara, Azure
 * Marketplace and Google Cloud hosting are on the live myfundbox.com site (checked
 * 2026-11-19). Instamojo and Zapier were confirmed as verified integrations by the
 * MYFUNDBOX team on 2026-11-19.
 */

export type EcosystemGroup = 'payments' | 'business' | 'platform';

export interface EcosystemItem {
  name: string;
  group: EcosystemGroup;
  /** Official mark from src/data/brandMarks.ts, when one is available. */
  mark?: BrandMarkKey;
  /** Official wordmark file in /public (e.g. '/assets/integrations/mollie.svg'); preferred over `mark` when set. */
  logoSrc?: string;
  role: Record<LocaleCode, string>;
  /** false = kept ready but hidden until its relationship to MYFUNDBOX is confirmed. */
  show?: boolean;
}

export const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  // Payments
  { name: 'Stripe', group: 'payments', mark: 'stripe', role: { en: 'Payment gateway', de: 'Zahlungsanbieter' } },
  { name: 'PayPal', group: 'payments', mark: 'paypal', role: { en: 'PayPal payments', de: 'PayPal-Zahlungen' } },
  { name: 'Mollie', group: 'payments', role: { en: 'Payment gateway · EU', de: 'Zahlungsanbieter · EU' } },
  { name: 'GoCardless', group: 'payments', role: { en: 'Direct debit', de: 'Lastschrift' } },
  { name: 'Instamojo', group: 'payments', role: { en: 'Payment gateway · India', de: 'Zahlungsanbieter · Indien' } },

  // Business tools
  { name: 'QuickBooks', group: 'business', mark: 'quickbooks', role: { en: 'Accounting', de: 'Buchhaltung' } },
  { name: 'sevdesk', group: 'business', role: { en: 'Accounting', de: 'Buchhaltung' } },
  { name: 'Avalara', group: 'business', role: { en: 'Tax calculation', de: 'Steuerberechnung' } },
  { name: 'Zapier', group: 'business', mark: 'zapier', role: { en: 'Workflow automation', de: 'Workflow-Automatisierung' } },

  // Platform & infrastructure
  { name: 'Microsoft Azure', group: 'platform', role: { en: 'Azure Marketplace', de: 'Azure Marketplace' } },
  { name: 'Google Cloud', group: 'platform', mark: 'googlecloud', role: { en: 'Hosting · Frankfurt', de: 'Hosting · Frankfurt' } },

  // Ready but hidden: their role (hosting, code, marketplace, …) still needs confirming,
  // so we don't put them on the page with a guessed caption.
  { name: 'IONOS', group: 'platform', mark: 'ionos', role: { en: '[CONFIRM role]', de: '[CONFIRM role]' }, show: false },
  { name: 'GitHub', group: 'platform', mark: 'github', role: { en: '[CONFIRM role]', de: '[CONFIRM role]' }, show: false },
];

export const ECOSYSTEM_COPY: Record<
  LocaleCode,
  {
    eyebrow: string;
    heading: string;
    groups: Record<EcosystemGroup, string>;
    note: string;
    detailsCta: string;
    apiTitle: string;
    apiRole: string;
  }
> = {
  en: {
    eyebrow: 'Integrations',
    heading: 'Connected to the Payment and Business Tools You Already Use.',
    groups: { payments: 'Payments', business: 'Business tools', platform: 'Platform' },
    note: 'Capabilities and availability differ by integration and region.',
    detailsCta: 'See integration details',
    apiTitle: 'REST API',
    apiRole: 'Webhooks & custom builds',
  },
  de: {
    eyebrow: 'Integrationen',
    heading: 'Verbunden mit den Zahlungs- und Business-Tools, die Sie bereits nutzen.',
    groups: { payments: 'Zahlungen', business: 'Business-Tools', platform: 'Plattform' },
    note: 'Funktionen und Verfügbarkeit unterscheiden sich je nach Integration und Region.',
    detailsCta: 'Details zu den Integrationen',
    apiTitle: 'REST-API',
    apiRole: 'Webhooks & eigene Lösungen',
  },
};
