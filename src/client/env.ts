import type { ClientMessages } from '../i18n/types.ts';

export type ClientStrings = ClientMessages & { email: string };

/** Strings rendered into the page by the build, in the page's language. */
export function readMessages(): ClientStrings {
  const el = document.getElementById('client-messages');
  if (!el?.textContent) throw new Error('Missing #client-messages payload.');
  return JSON.parse(el.textContent) as ClientStrings;
}

export const pageLocale = () => document.documentElement.lang;

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
export const prefersReducedMotion = () => reducedMotionQuery.matches;

/** Mirrors the breakpoints in src/styles/tokens.css. */
export const media = {
  mobile: window.matchMedia('(max-width: 767.98px)'),
  desktopNav: window.matchMedia('(min-width: 1160px)'),
};
