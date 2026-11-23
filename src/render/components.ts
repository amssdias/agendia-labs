import { CALENDAR_URL, DEMO_PHONE } from '../content/config.ts';
import { SECTIONS } from '../content/catalog.ts';
import { html, type HtmlValue, type SafeHtml } from './html.ts';
import { icon } from './icon.ts';

export const logoMark = (size: 'md' | 'sm' = 'md') =>
  html`<span class="logo-mark logo-mark--${size}" aria-hidden="true"><span></span></span>`;

type Cta = { name: 'reservar' } | { name: 'ver-plan'; plan: string };

/**
 * Every booking button jumps to the calendar section. `data-cta` names the click for analytics.
 * Without a calendar the section holds the form, so the button also focuses its first field.
 */
export function bookingLink(label: HtmlValue, className: string, cta: Cta = { name: 'reservar' }): SafeHtml {
  return html`<a href="#${SECTIONS.booking}" class="btn ${className}" data-cta="${cta.name}"${
    cta.name === 'ver-plan' ? html` data-plan="${cta.plan}"` : ''
  }${CALENDAR_URL ? '' : html` data-contact-focus="name"`}>${label}</a>`;
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`;

/** A legal detail still to be filled in shows as a highlighted TODO, so it can't go unnoticed. */
export const orTodo = (value: string): HtmlValue => value || html`<mark class="todo">TODO</mark>`;

export function demoCallLink(label: string, className: string): SafeHtml | '' {
  if (!DEMO_PHONE) return '';
  return html`<a href="${telHref(DEMO_PHONE)}" class="btn ${className}" data-cta="llamar-demo">${icon('phone')}${label}</a>`;
}

export function sectionIntro(id: string, title: string, lead?: string, modifier = ''): SafeHtml {
  return html`
    <h2 id="${id}" class="section-title${modifier ? ` ${modifier}` : ''}">${title}</h2>
    ${lead ? html`<p class="section-lead">${lead}</p>` : ''}`;
}
