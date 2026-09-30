export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

// Language names are shown in their own language, so they don't belong in the translations.
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', es: 'Español' };

// Used for hreflang="x-default" and as the fallback when the browser language isn't supported.
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

export interface SiteConfig {
  /** Absolute origin without trailing slash, used for canonical, hreflang, og:url and the sitemap. */
  url: string;
  /** '#contact' scrolls to the form; any other URL (e.g. Cal.com) opens in a new tab. */
  bookingUrl: string;
  /** Where the contact form POSTs its JSON. Empty falls back to a pre-filled mailto link. */
  formEndpoint: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export const SITE_DEFAULTS: SiteConfig = {
  url: 'https://diasflow.com',
  bookingUrl: '#contact',
  formEndpoint: '',
  email: 'hello@diasflow.com',
  linkedinUrl: 'https://www.linkedin.com/in/andre-dias',
  githubUrl: 'https://github.com/andre-dias',
};

export const localePath = (locale: Locale) => `/${locale}/`;
