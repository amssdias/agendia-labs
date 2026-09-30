import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { i18nHtml } from './src/plugins/i18n-html.ts';
import { basePathFromUrl, LOCALES, SITE_DEFAULTS, type SiteConfig } from './src/site.ts';

const entry = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const url = (env.SITE_URL || SITE_DEFAULTS.url).replace(/\/$/, '');
  const site: SiteConfig = {
    ...SITE_DEFAULTS,
    url,
    basePath: basePathFromUrl(url),
    bookingUrl: env.SITE_BOOKING_URL || SITE_DEFAULTS.bookingUrl,
    formEndpoint: env.SITE_FORM_ENDPOINT || SITE_DEFAULTS.formEndpoint,
  };

  return {
    // Serves /en/ and /es/ from their own index.html instead of falling back to the root one.
    appType: 'mpa',
    // Serving from a subpath (GitHub project pages) only needs a SITE_URL with that path.
    base: site.basePath,
    plugins: [i18nHtml(site)],
    build: {
      rollupOptions: {
        input: {
          root: entry('./index.html'),
          ...Object.fromEntries(LOCALES.map(locale => [locale, entry(`./${locale}/index.html`)])),
        },
      },
    },
  };
});
