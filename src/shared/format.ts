import type { Plural } from '../i18n/types.ts';

/** Shared by the build-time renderer and the browser, so both produce identical text. */

export const interpolate = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

export const formatNumber = (locale: string, n: number) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n);

export const selectPlural = (locale: string, forms: Plural, n: number) =>
  new Intl.PluralRules(locale).select(n) === 'one' ? forms.one : forms.other;

export const formatPlural = (locale: string, forms: Plural, n: number) =>
  interpolate(selectPlural(locale, forms, n), { n: formatNumber(locale, n) });
