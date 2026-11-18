export type LocaleCode = 'en' | 'de' | 'fr' | 'es';

export const SUPPORTED_LOCALES: readonly LocaleCode[] = ['en', 'de', 'fr', 'es'];

export function formatEUR(amount: number, locale: LocaleCode = 'en', decimals = 0): string {
  const intlLocale =
    locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-IE';
  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatEUNumber(value: number, locale: LocaleCode = 'en', decimals = 0): string {
  const intlLocale =
    locale === 'de' ? 'de-DE' : locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-IE';
  return new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatEUDate(isoDate: string, locale: LocaleCode = 'en'): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  if (locale === 'de') {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
