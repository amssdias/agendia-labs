import { relative, sep } from 'node:path';
import type { Plugin, ViteDevServer } from 'vite';
import { renderPage } from '../render/page.ts';
import { absoluteUrl, isLocale, LOCALES, pageKeyFor, type SiteConfig } from '../site.ts';

const RENDER_MODULE = '/src/render/page.ts';
/** `<locale>/index.html` or `<locale>/<page folder>/index.html`, relative to the project root. */
const PAGE_ENTRY = /^(\w+)\/(?:([\w-]+)\/)?index\.html$/;
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
 * Renders each /<locale>/index.html entry, and each secondary page under it, from the shared templates
 * at build time, so every language ships as complete static HTML.
 */
export function i18nHtml(site: SiteConfig): Plugin {
  let server: ViteDevServer | undefined;
  let root = process.cwd();

  return {
    name: 'agendia-labs:i18n-html',

    configResolved(config) {
      root = config.root;
    },

    configureServer(devServer) {
      server = devServer;
    },

    transformIndexHtml: {
      order: 'pre',
      async handler(source, ctx) {
        const [, locale, folder] = PAGE_ENTRY.exec(relative(root, ctx.filename).split(sep).join('/')) ?? [];
        if (!locale || !isLocale(locale)) return source;
        const pageKey = folder ? pageKeyFor(locale, folder) : undefined;
        if (folder && !pageKey) return source;
        // In dev, load the renderer through Vite so template and translation edits show up on reload.
        const render: RenderPage = server
          ? ((await server.ssrLoadModule(RENDER_MODULE)) as { renderPage: RenderPage }).renderPage
          : renderPage;
        const page = render(locale, site, pageKey);
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
