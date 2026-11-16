import type { Lang } from '../i18n/routes';

// tel:-URI nur aus Ziffern und führendem Plus, egal wie die Nummer geschrieben ist.
export const telHref = (phone: string) => `tel:${phone.replace(/(?!^\+)[^\d]/g, '')}`;

const locale = (lang: Lang) => (lang === 'de' ? 'de-DE' : 'en-GB');

export const formatPrice = (amount: number, lang: Lang) =>
  new Intl.NumberFormat(locale(lang), { style: 'currency', currency: 'EUR' }).format(amount);

export const formatVolume = (liters: number, lang: Lang) =>
  new Intl.NumberFormat(locale(lang), { style: 'unit', unit: 'liter', unitDisplay: 'short' }).format(liters);
