import { messages, type Messages } from '../i18n/index.ts';
import { absoluteUrl, DEFAULT_LOCALE, LOCALES, pageRoute, type Locale, type PageKey, type SiteConfig } from '../site.ts';
import type { RenderContext } from './context.ts';
import { html, jsonScript } from './html.ts';
import { booking } from './sections/booking.ts';
import { caseStudy } from './sections/case-study.ts';
import { faq } from './sections/faq.ts';
import { footer, mobileBar } from './sections/footer.ts';
import { header, pageHeader } from './sections/header.ts';
import { hero } from './sections/hero.ts';
import { how } from './sections/how.ts';
import { legalPage } from './sections/legal.ts';
import { plans } from './sections/plans.ts';
import { problem } from './sections/problem.ts';
import { sectors } from './sections/sectors.ts';

/** Questions whose answer is still a TODO stay off the page and out of the structured data. */
const answeredFaq = (t: Messages) => t.faq.items.filter((item): item is { q: string; a: string } => item.a !== null);

const faqSection = (ctx: RenderContext) => faq({ site: ctx.site, t: { faq: { ...ctx.t.faq, items: answeredFaq(ctx.t) } } });

const MAIN_SECTIONS = [hero, problem, how, sectors, plans, caseStudy, faqSection, booking];

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
        mainEntity: answeredFaq(t).map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

/** Tags every page shares: canonical URL, language alternates, icon and fonts. */
function commonHead({ site, locale }: RenderContext, page?: PageKey) {
  return html`
    <meta name="theme-color" content="#0B1120">
    <link rel="canonical" href="${absoluteUrl(site, pageRoute(locale, page))}">
    ${LOCALES.map(l => html`<link rel="alternate" hreflang="${l}" href="${absoluteUrl(site, pageRoute(l, page))}">`)}
    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(site, pageRoute(DEFAULT_LOCALE, page))}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap">`;
}

function head(ctx: RenderContext) {
  const { t, site, locale } = ctx;
  const url = absoluteUrl(site, pageRoute(locale));
  return html`
    <title>${t.meta.title}</title>
    <meta name="description" content="${t.meta.description}">
    ${commonHead(ctx)}
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

// Legal pages stay out of search results and the sitemap; they are reached from the footer.
function pageHead(ctx: RenderContext, page: PageKey) {
  const copy = ctx.t.legal.pages[page];
  return html`
    <title>${copy.title} | Agendia Labs</title>
    <meta name="description" content="${copy.description}">
    <meta name="robots" content="noindex, follow">
    ${commonHead(ctx, page)}`;
}

function pageBody(ctx: RenderContext, page: PageKey) {
  return html`
    ${pageHeader(ctx, page)}
    ${legalPage(ctx, page)}
    ${footer(ctx)}`;
}

export function renderPage(locale: Locale, site: SiteConfig, page?: PageKey) {
  const ctx: RenderContext = { locale, t: messages[locale], site };
  if (page) return { head: pageHead(ctx, page).value, body: pageBody(ctx, page).value };
  return { head: head(ctx).value, body: body(ctx).value };
}
