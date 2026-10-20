import { messages } from '../i18n/index.ts';
import { absoluteUrl, DEFAULT_LOCALE, LOCALES, type Locale, type SiteConfig } from '../site.ts';
import type { RenderContext } from './context.ts';
import { html, jsonScript } from './html.ts';
import { about } from './sections/about.ts';
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

const MAIN_SECTIONS = [hero, problems, transformation, services, solutions, automate, process, about, demo, value, firstCall, faq, contact];

function structuredData({ t, site, locale }: RenderContext) {
  const pageUrl = absoluteUrl(site, `${locale}/`);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Agendia Labs',
      url: pageUrl,
      email: site.email,
      inLanguage: locale,
      description: t.schema.description,
      knowsAbout: t.schema.knowsAbout,
      founder: {
        '@type': 'Person',
        name: 'André Dias',
        jobTitle: t.schema.founderJobTitle,
        sameAs: [site.linkedinUrl, site.githubUrl],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      mainEntity: t.faq.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];
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
    <meta property="og:image" content="${absoluteUrl(site, 'og-image.png')}">
    <meta property="og:image:alt" content="${t.meta.ogImageAlt}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap">
    ${structuredData(ctx).map(data => html`<script type="application/ld+json">${jsonScript(data)}</script>`)}`;
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
