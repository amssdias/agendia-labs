import { NAV, SECTIONS } from '../../content/catalog.ts';
import { LOCALE_NAMES, LOCALES, localePath, type PageKey } from '../../site.ts';
import { bookingLink, logoMark } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

/** Links to the same page in each language. */
function languageSwitch({ locale, t, site }: RenderContext, page?: PageKey) {
  return html`
    <nav class="lang-switch" aria-label="${t.common.language}">
      ${LOCALES.map(
        l => html`<a href="${localePath(site, l, page)}" hreflang="${l}" lang="${l}" aria-label="${LOCALE_NAMES[l]}"${
          l === locale ? html` aria-current="true"` : ''
        }>${l.toUpperCase()}</a>`,
      )}
    </nav>`;
}

export function header(ctx: RenderContext) {
  const { t } = ctx;
  const links = NAV.map(key => ({ id: SECTIONS[key], label: t.nav[key] }));
  return html`
<a class="skip-link" href="#main">${t.common.skipToContent}</a>
<header class="site-header" data-header>
  <div class="container site-header__bar">
    <a href="#main" class="brand" aria-label="${t.common.home}">${logoMark()}Agendia Labs</a>
    <nav class="site-nav" aria-label="${t.common.mainNav}">
      ${links.map(l => html`<a href="#${l.id}" class="site-nav__link" data-nav-link="${l.id}">${l.label}</a>`)}
    </nav>
    <div class="site-header__actions">
      ${languageSwitch(ctx)}
      ${bookingLink(t.common.book, 'btn--primary btn--sm btn--glow site-header__cta')}
      <button type="button" class="menu-button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t.common.menu}" data-menu-toggle>
        ${icon('list', { className: 'menu-button__open' })}${icon('x', { className: 'menu-button__close' })}
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden data-mobile-menu>
    <nav class="container mobile-menu__inner" aria-label="${t.common.mainNav}">
      ${links.map(l => html`<a href="#${l.id}" class="mobile-menu__link">${l.label}</a>`)}
      ${bookingLink(t.common.book, 'btn--primary btn--block mobile-menu__cta')}
    </nav>
  </div>
</header>`;
}

/** Secondary pages: logo back to the home page and the language switch, without the section menu. */
export function pageHeader(ctx: RenderContext, page: PageKey) {
  const { t, site, locale } = ctx;
  return html`
<a class="skip-link" href="#main">${t.common.skipToContent}</a>
<header class="site-header">
  <div class="container site-header__bar">
    <a href="${localePath(site, locale)}" class="brand" aria-label="${t.common.home}">${logoMark()}Agendia Labs</a>
    <div class="site-header__actions">${languageSwitch(ctx, page)}</div>
  </div>
</header>`;
}
