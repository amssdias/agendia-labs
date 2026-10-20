import { interpolate } from '../../shared/format.ts';
import { bookLink, logoMark } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function footer({ t, site }: RenderContext) {
  const f = t.footer;
  const companyLinks = [
    ['#solutions', f.company.solutions],
    ['#demo', f.company.demo],
    ['#faq', f.company.faq],
    ['#contact', f.company.contact],
  ];
  return html`
<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <span class="brand brand--sm">${logoMark('sm')}Agendia Labs</span>
      <span>${f.tagline}</span>
    </div>
    <nav class="site-footer__col" aria-label="${f.servicesTitle}">
      <span class="site-footer__heading">${f.servicesTitle}</span>
      ${f.services.map(label => html`<a href="#services">${label}</a>`)}
    </nav>
    <nav class="site-footer__col" aria-label="${f.companyTitle}">
      <span class="site-footer__heading">${f.companyTitle}</span>
      ${companyLinks.map(([href, label]) => html`<a href="${href}">${label}</a>`)}
    </nav>
    <div class="site-footer__col">
      <span class="site-footer__heading">${f.contactTitle}</span>
      <a href="mailto:${site.email}">${site.email}</a>
    </div>
  </div>
  <div class="container site-footer__legal">${interpolate(f.legal, { year: new Date().getFullYear() })}</div>
</footer>`;
}

export function mobileBar(ctx: RenderContext) {
  return html`
<div class="mobile-bar" data-mobile-bar inert>
  ${bookLink(ctx, html`${icon('calendar-check')}${ctx.t.common.bookCallShort}`, 'btn--primary btn--block mobile-bar__button')}
</div>`;
}
