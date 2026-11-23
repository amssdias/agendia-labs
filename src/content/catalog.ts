/**
 * Language-independent structure of the page: section ids, keys and icons.
 * The copy lives in src/i18n, keyed by these.
 */

export const SECTIONS = {
  hero: 'hero',
  problem: 'problema',
  how: 'como-funciona',
  sectors: 'sectores',
  plans: 'planes',
  caseStudy: 'caso',
  faq: 'faq',
  booking: 'reservar',
} as const;

export const NAV = ['how', 'plans', 'faq'] as const;
export type NavKey = (typeof NAV)[number];

export const PAINS = [
  { key: 'busy', icon: 'phone-call' },
  { key: 'closed', icon: 'moon' },
  { key: 'lateNight', icon: 'chats-circle' },
] as const;
export type PainKey = (typeof PAINS)[number]['key'];

export const STEPS = [
  { key: 'contact', icon: 'phone-incoming' },
  { key: 'answer', icon: 'chat-circle-text' },
  { key: 'booked', icon: 'calendar-check' },
] as const;
export type StepKey = (typeof STEPS)[number]['key'];

export const SECTORS = [
  { key: 'garages', icon: 'wrench' },
  { key: 'vets', icon: 'paw-print' },
  { key: 'physio', icon: 'person-simple-walk' },
  { key: 'other', icon: 'calendar-dots' },
] as const;
export type SectorKey = (typeof SECTORS)[number]['key'];
export const DEFAULT_SECTOR: SectorKey = 'garages';

export const PLANS = [
  { key: 'voice', icon: 'phone' },
  { key: 'whatsapp', icon: 'whatsapp-logo' },
  { key: 'both', icon: 'chats-circle', featured: true },
] as const;
export type PlanKey = (typeof PLANS)[number]['key'];

export const EXTRA_PLAN = { key: 'presence', icon: 'storefront' } as const;
