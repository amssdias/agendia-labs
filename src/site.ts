export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

// Language names are shown in their own language, so they don't belong in the translations.
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', es: 'Español' };

// Used for hreflang="x-default" and as the fallback when the browser language isn't supported.
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

export interface SiteConfig {
  /**
   * Public URL of the site root, without trailing slash. May include a path, e.g.
   * https://user.github.io/agendia-labs for a GitHub project page.
   */
  url: string;
  /** Path the site is served from, derived from `url`: '/' or '/agendia-labs/'. */
  basePath: string;
  /** '#contact' scrolls to the form; any other URL (e.g. Cal.com) opens in a new tab. */
  bookingUrl: string;
  /** Where the contact form POSTs its JSON. Empty falls back to a pre-filled mailto link. */
  formEndpoint: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export const SITE_DEFAULTS: SiteConfig = {
  url: 'https://agendialabs.com',
  basePath: '/',
  bookingUrl: '#contact',
  formEndpoint: '',
  email: 'hello@agendialabs.com',
  linkedinUrl: 'https://www.linkedin.com/in/andre-dias',
  githubUrl: 'https://github.com/andre-dias',
};

export const basePathFromUrl = (url: string) => new URL(url).pathname.replace(/\/?$/, '/');

/** Root-relative path inside the site, e.g. sitePath(site, 'en/') → '/agendia-labs/en/'. */
export const sitePath = (site: Pick<SiteConfig, 'basePath'>, path = '') => site.basePath + path.replace(/^\//, '');

export const localePath = (site: Pick<SiteConfig, 'basePath'>, locale: Locale) => sitePath(site, `${locale}/`);

/** Absolute URL for canonical links, hreflang, Open Graph and the sitemap. */
export const absoluteUrl = (site: Pick<SiteConfig, 'url' | 'basePath'>, path = '') =>
  new URL(site.url).origin + sitePath(site, path);
