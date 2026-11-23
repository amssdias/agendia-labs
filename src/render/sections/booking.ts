import { CALENDAR_URL, CONTACT_PHONE } from '../../content/config.ts';
import { SECTIONS } from '../../content/catalog.ts';
import { telHref, whatsappHref } from '../components.ts';
import { fill, html } from '../html.ts';
import type { RenderContext } from '../context.ts';
import { contactForm } from './contact.ts';

export function booking(ctx: RenderContext) {
  const b = ctx.t.booking;
  const id = SECTIONS.booking;
  const form = contactForm(ctx);
  return html`
<section id="${id}" class="booking" aria-labelledby="${id}-title">
  <div class="contact__grid-bg" aria-hidden="true"></div>
  <div class="contact__glow contact__glow--blue" aria-hidden="true"></div>
  <div class="contact__glow contact__glow--cyan" aria-hidden="true"></div>
  <div class="container booking__inner">
    <div class="booking__copy">
      <h2 id="${id}-title" class="booking__title">${b.title}</h2>
      <p class="booking__lead">${b.lead}</p>
      <p class="booking__note">${b.note}</p>
      ${CONTACT_PHONE &&
      html`<p class="booking__contact">${fill(b.contactLine, {
        phone: html`<a href="${telHref(CONTACT_PHONE)}">${CONTACT_PHONE}</a>`,
        whatsapp: html`<a href="${whatsappHref(CONTACT_PHONE)}" target="_blank" rel="noopener">WhatsApp</a>`,
      })}</p>`}
    </div>
    ${CALENDAR_URL
      ? html`
    <div class="booking__calendar">
      <iframe src="${CALENDAR_URL}?gv=true" title="${b.calendarTitle}" width="100%" height="650" loading="lazy" class="booking__iframe"></iframe>
    </div>
    <details class="booking__alt">
      <summary class="booking__toggle">${b.formToggle}</summary>
      ${form}
    </details>`
      : form}
  </div>
</section>`;
}
