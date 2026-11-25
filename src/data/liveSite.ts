import type { LocaleCode } from '../utils/formatting';

/**
 * Pages that live on the current production marketing site (myfundbox.com) and are NOT
 * rebuilt in this repository yet.
 *
 * Integration pages: myfundbox.com/sitemap.xml (read 2026-11-25) lists the /integrations index
 * plus 34 /integrations/<slug> pages, each with a /de/integrations/<slug> twin. This repo has no
 * /integrations routes, so the new site links to the live pages instead of inventing new ones.
 *
 * CUTOVER REQUIREMENT: if this site replaces myfundbox.com, every URL in
 * LIVE_INTEGRATION_PATHS (and its /de twin) must keep resolving, either by building the page
 * here at the same path or by keeping the live page. A test guards that no redirect in
 * src/data/redirects.ts touches them.
 */
export const LIVE_SITE_ORIGIN = 'https://myfundbox.com';

/** Exact slugs from the live sitemap. Note the capital C in "Checkout" (kept as published). */
export const LIVE_INTEGRATION_SLUGS = [
  '2checkout', 'Checkout', 'adyen', 'avalara', 'brevo', 'buchhaltungsbutler', 'docusign', 'fastbill',
  'freshbooks', 'gocardless', 'hubspot', 'lexware-office', 'mailchimp', 'micropayment', 'microsoft-365',
  'mollie', 'orgamax', 'papierkram', 'paypal', 'payrexx', 'pipedrive', 'quickbooks', 'razorpay',
  'sage-active', 'salesforce', 'sevdesk', 'stripe', 'stripe-invoicing', 'telegram', 'whatsapp',
  'wiso-buhl', 'xero', 'zapier', 'zoho-books',
] as const;

export type LiveIntegrationSlug = (typeof LIVE_INTEGRATION_SLUGS)[number];

/** Every live integration URL path that must be preserved (index + 34 pages, EN and DE). */
export const LIVE_INTEGRATION_PATHS: readonly string[] = [
  '/integrations',
  '/de/integrations',
  ...LIVE_INTEGRATION_SLUGS.flatMap((s) => [`/integrations/${s}`, `/de/integrations/${s}`]),
];

/** Absolute URL of a live integration page (German twin for the German site). */
export function liveIntegrationUrl(slug: LiveIntegrationSlug | null, locale: LocaleCode = 'en'): string {
  const prefix = locale === 'de' ? '/de' : '';
  return `${LIVE_SITE_ORIGIN}${prefix}/integrations${slug ? `/${slug}` : ''}`;
}

/**
 * Integrations the new site names publicly: only those confirmed by the MYFUNDBOX team
 * (docs/PROJECT_PROGRESS.md §3, 2026-11-19) AND published as a live integration page.
 * The live directory also lists ~23 more names, some under a "Coming Soon" tab, with no
 * status per card; they stay off the new site until their status is confirmed
 * (docs/PHASE-3A-outstanding-evidence.md). None is described as an official partner.
 */
export type ConfirmedIntegrationCategory = 'payments' | 'accounting' | 'tax' | 'automation';

export interface ConfirmedIntegration {
  name: string;
  slug: LiveIntegrationSlug;
  category: ConfirmedIntegrationCategory;
  /** Logo file in /public, as already published on myfundbox.com. */
  logoSrc: string;
}

const LOGO = (file: string) => `/assets/integrations/${file}`;

export const CONFIRMED_INTEGRATIONS: ConfirmedIntegration[] = [
  { name: 'Stripe', slug: 'stripe', category: 'payments', logoSrc: LOGO('stripe.png') },
  { name: 'GoCardless', slug: 'gocardless', category: 'payments', logoSrc: LOGO('gocardless.png') },
  { name: 'Mollie', slug: 'mollie', category: 'payments', logoSrc: LOGO('mollie.png') },
  { name: 'PayPal', slug: 'paypal', category: 'payments', logoSrc: LOGO('paypal.png') },
  { name: 'Checkout.com', slug: 'Checkout', category: 'payments', logoSrc: LOGO('checkout.png') },
  { name: 'QuickBooks', slug: 'quickbooks', category: 'accounting', logoSrc: LOGO('quickbooks.png') },
  { name: 'Xero', slug: 'xero', category: 'accounting', logoSrc: LOGO('xero.png') },
  { name: 'sevdesk', slug: 'sevdesk', category: 'accounting', logoSrc: LOGO('sevdesk.png') },
  { name: 'Lexware Office', slug: 'lexware-office', category: 'accounting', logoSrc: LOGO('lexware.png') },
  { name: 'Avalara', slug: 'avalara', category: 'tax', logoSrc: LOGO('avalara.png') },
  { name: 'Zapier', slug: 'zapier', category: 'automation', logoSrc: LOGO('zapier.svg') },
];

export const INTEGRATION_CATEGORY_LABELS: Record<LocaleCode, Record<ConfirmedIntegrationCategory, string>> = {
  en: { payments: 'Payment gateway', accounting: 'Accounting', tax: 'Tax', automation: 'Automation' },
  de: { payments: 'Zahlungsanbieter', accounting: 'Buchhaltung', tax: 'Steuern', automation: 'Automatisierung' },
};
