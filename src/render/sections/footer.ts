import { CONTACT_PHONE } from '../../content/config.ts';
import { localePath, PAGES, type PageKey } from '../../site.ts';
import { interpolate } from '../../shared/format.ts';
import { bookingLink, logoMark, telHref, whatsappHref } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { fill, html } from '../html.ts';
import { icon } from '../icon.ts';

export function footer({ t, site, locale }: RenderContext) {
  const f = t.footer;
  const mailto = `mailto:${site.email}`;
  const legalLinks = (Object.keys(PAGES) as PageKey[]).map(
    page => html`<a href="${localePath(site, locale, page)}">${t.legal.pages[page].title}</a>`,
  );
  return html`
<footer class="site-footer">
  <div class="container site-footer__bar">
    <span class="brand brand--sm">${logoMark('sm')}Agendia Labs</span>
    <p class="site-footer__custom">${fill(f.custom.text, { link: html`<a href="${mailto}">${f.custom.link}</a>` })}</p>
    <div class="site-footer__contact">
      <a href="${mailto}">${site.email}</a>
      ${CONTACT_PHONE &&
      html`<a href="${telHref(CONTACT_PHONE)}">${CONTACT_PHONE}</a>
      <a href="${whatsappHref(CONTACT_PHONE)}" target="_blank" rel="noopener">WhatsApp</a>`}
    </div>
  </div>
  <div class="container site-footer__legal">
    <span>${interpolate(f.legal, { year: new Date().getFullYear() })}</span>
    <nav class="site-footer__links" aria-label="${t.legal.pages.notice.title}">${legalLinks}</nav>
  </div>
</footer>`;
}

export function mobileBar({ t }: RenderContext) {
  return html`
<div class="mobile-bar" data-mobile-bar inert>
  ${bookingLink(html`${icon('calendar-check')}${t.common.book}`, 'btn--primary btn--block mobile-bar__button')}
</div>`;
}
