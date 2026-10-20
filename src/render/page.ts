import { messages } from '../i18n/index.ts';
import { absoluteUrl, DEFAULT_LOCALE, LOCALES, type Locale, type SiteConfig } from '../site.ts';
import type { RenderContext } from './context.ts';
import { html, jsonScript } from './html.ts';
import { automate } from './sections/automate.ts';
import { contact } from './sections/contact.ts';
import { demo } from './sections/demo.ts';
import { faq } from './sections/faq.ts';
import { firstCall } from './sections/first-call.ts';
import { footer, mobileBar } from './sections/footer.ts';
import { header } from './sections/header.ts';
import { hero } from './sections/hero.ts';
import { problems } from './sections/problems.ts';
import { process } from './sections/process.ts';
import { services } from './sections/services.ts';
import { solutions } from './sections/solutions.ts';
import { transformation } from './sections/transformation.ts';
import { value } from './sections/value.ts';

const MAIN_SECTIONS = [hero, problems, transformation, services, solutions, automate, process, demo, value, firstCall, faq, contact];

const ogImage = (ctx: RenderContext) => absoluteUrl(ctx.site, `og-image-${ctx.locale}.png`);

function structuredData(ctx: RenderContext) {
  const { t, site, locale } = ctx;
  const siteUrl = absoluteUrl(site);
  const pageUrl = absoluteUrl(site, `${locale}/`);
  // Shared @ids, so both languages describe the same organisation.
  const organizationId = `${siteUrl}#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: 'Agendia Labs',
        inLanguage: locale,
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': organizationId,
        name: 'Agendia Labs',
        url: siteUrl,
        logo: absoluteUrl(site, 'favicon.svg'),
        image: ogImage(ctx),
        email: site.email,
        description: t.schema.description,
        areaServed: { '@type': 'Country', name: 'ES' },
        knowsAbout: t.schema.knowsAbout,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: pageUrl,
        inLanguage: locale,
        mainEntity: t.faq.items.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

function head(ctx: RenderContext) {
  const { t, site, locale } = ctx;
  const url = absoluteUrl(site, `${locale}/`);
  return html`
    <title>${t.meta.title}</title>
    <meta name="description" content="${t.meta.description}">
    <meta name="theme-color" content="#0B1120">
    <link rel="canonical" href="${url}">
    ${LOCALES.map(l => html`<link rel="alternate" hreflang="${l}" href="${absoluteUrl(site, `${l}/`)}">`)}
    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(site, `${DEFAULT_LOCALE}/`)}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Agendia Labs">
    <meta property="og:locale" content="${t.meta.ogLocale}">
    ${LOCALES.filter(l => l !== locale).map(l => html`<meta property="og:locale:alternate" content="${messages[l].meta.ogLocale}">`)}
    <meta property="og:title" content="${t.meta.ogTitle}">
    <meta property="og:description" content="${t.meta.ogDescription}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage(ctx)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${t.meta.ogImageAlt}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap">
    <script type="application/ld+json">${jsonScript(structuredData(ctx))}</script>`;
}

function body(ctx: RenderContext) {
  return html`
    ${header(ctx)}
    <main id="main">
      ${MAIN_SECTIONS.map(section => section(ctx))}
    </main>
    ${footer(ctx)}
    ${mobileBar(ctx)}
    <script type="application/json" id="client-messages">${jsonScript({ ...ctx.t.client, email: ctx.site.email })}</script>`;
}

export function renderPage(locale: Locale, site: SiteConfig) {
  const ctx: RenderContext = { locale, t: messages[locale], site };
  return { head: head(ctx).value, body: body(ctx).value };
}
