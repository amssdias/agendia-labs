export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

// Language names are shown in their own language, so they don't belong in the translations.
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', es: 'Español' };

// Used for hreflang="x-default" and as the fallback when the browser language isn't supported.
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/**
 * Secondary pages and their folder under each locale. Each one needs an entry shell at
 * <locale>/<folder>/index.html.
 */
export const PAGES = {
  notice: { en: 'legal-notice', es: 'aviso-legal' },
  privacy: { en: 'privacy', es: 'privacidad' },
} as const satisfies Record<string, Record<Locale, string>>;
export type PageKey = keyof typeof PAGES;

export const pageKeyFor = (locale: Locale, folder: string) =>
  (Object.keys(PAGES) as PageKey[]).find(key => PAGES[key][locale] === folder);

/** Path of a page relative to the site root: 'es/' for the home page, 'es/aviso-legal/' for a secondary one. */
export const pageRoute = (locale: Locale, page?: PageKey) => (page ? `${locale}/${PAGES[page][locale]}/` : `${locale}/`);

export interface SiteConfig {
  /**
   * Public URL of the site root, without trailing slash. May include a path, e.g.
   * https://user.github.io/agendia-labs for a GitHub project page.
   */
  url: string;
  /** Path the site is served from, derived from `url`: '/' or '/agendia-labs/'. */
  basePath: string;
  /** Where the contact form POSTs its JSON. Empty falls back to a pre-filled mailto link. */
  formEndpoint: string;
  email: string;
}

export const SITE_DEFAULTS: SiteConfig = {
  url: 'https://agendialabs.com',
  basePath: '/',
  formEndpoint: '',
  email: 'agendialabs@gmail.com',
};

export const basePathFromUrl = (url: string) => new URL(url).pathname.replace(/\/?$/, '/');

/** Root-relative path inside the site, e.g. sitePath(site, 'en/') → '/agendia-labs/en/'. */
export const sitePath = (site: Pick<SiteConfig, 'basePath'>, path = '') => site.basePath + path.replace(/^\//, '');

export const localePath = (site: Pick<SiteConfig, 'basePath'>, locale: Locale, page?: PageKey) =>
  sitePath(site, pageRoute(locale, page));

/** Absolute URL for canonical links, hreflang, Open Graph and the sitemap. */
export const absoluteUrl = (site: Pick<SiteConfig, 'url' | 'basePath'>, path = '') =>
  new URL(site.url).origin + sitePath(site, path);
