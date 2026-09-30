import type { Plugin, ViteDevServer } from 'vite';
import { renderPage } from '../render/page.ts';
import { absoluteUrl, isLocale, LOCALES, type SiteConfig } from '../site.ts';

const RENDER_MODULE = '/src/render/page.ts';
const LOCALE_ENTRY = /[\\/](\w+)[\\/]index\.html$/;
const RENDER_SOURCES = /[\\/]src[\\/](render|i18n|content|shared)[\\/]|[\\/]src[\\/]site\.ts$/;

type RenderPage = typeof renderPage;

function sitemap(site: SiteConfig) {
  const alternates = LOCALES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(site, `${l}/`)}"/>`).join('\n');
  const urls = LOCALES.map(l => `  <url>\n    <loc>${absoluteUrl(site, `${l}/`)}</loc>\n${alternates}\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/**
 * Renders each /<locale>/index.html entry from the shared section templates at build time,
 * so every language ships as complete static HTML.
 */
export function i18nHtml(site: SiteConfig): Plugin {
  let server: ViteDevServer | undefined;

  return {
    name: 'dias-flow:i18n-html',

    configureServer(devServer) {
      server = devServer;
    },

    transformIndexHtml: {
      order: 'pre',
      async handler(source, ctx) {
        const locale = LOCALE_ENTRY.exec(ctx.filename)?.[1];
        if (!locale || !isLocale(locale)) return source;
        // In dev, load the renderer through Vite so template and translation edits show up on reload.
        const render: RenderPage = server
          ? ((await server.ssrLoadModule(RENDER_MODULE)) as { renderPage: RenderPage }).renderPage
          : renderPage;
        const page = render(locale, site);
        return source.replace('<!--app-head-->', page.head).replace('<!--app-body-->', page.body);
      },
    },

    handleHotUpdate({ file, server: devServer }) {
      if (RENDER_SOURCES.test(file)) {
        devServer.ws.send({ type: 'full-reload' });
        return [];
      }
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(site) });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(site, 'sitemap.xml')}\n`,
      });
    },
  };
}
