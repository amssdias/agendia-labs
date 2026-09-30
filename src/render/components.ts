import type { RenderContext } from './context.ts';
import { html, type HtmlValue, type SafeHtml } from './html.ts';
import { icon } from './icon.ts';

export const logoMark = (size: 'md' | 'sm' = 'md') =>
  html`<span class="logo-mark logo-mark--${size}" aria-hidden="true"><span></span></span>`;

/**
 * Every "book a call" button. An in-page booking URL scrolls to the form and focuses the
 * name field; an external one (e.g. a calendar tool) opens in a new tab without any JS.
 */
export function bookLink({ site }: RenderContext, label: HtmlValue, className: string, options: { arrow?: boolean } = {}): SafeHtml {
  const external = !site.bookingUrl.startsWith('#');
  return html`<a href="${site.bookingUrl}" class="btn ${className}"${
    external ? html` target="_blank" rel="noopener"` : html` data-contact-focus="name"`
  }>${label}${options.arrow ? icon('arrow-right') : ''}</a>`;
}

export function sectionIntro(id: string, title: string, lead?: string, modifier = ''): SafeHtml {
  return html`
    <h2 id="${id}" class="section-title${modifier ? ` ${modifier}` : ''}">${title}</h2>
    ${lead ? html`<p class="section-lead">${lead}</p>` : ''}`;
}
