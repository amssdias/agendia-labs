import { localePath } from '../../site.ts';
import { ownerName } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { fill, html } from '../html.ts';
import { icon } from '../icon.ts';

function field(
  id: string,
  label: string,
  control: ReturnType<typeof html>,
  options: { hint?: string; error?: boolean } = {},
) {
  return html`
    <div class="field">
      <label for="contact-${id}" class="field__label">${label}${options.hint ? html` <span>${options.hint}</span>` : ''}</label>
      ${control}
      ${options.error && html`<span class="field__error" id="contact-${id}-error" hidden></span>`}
    </div>`;
}

// Hidden from people and filled in by bots; Formspree drops submissions where `_gotcha` has a value.
const honeypot = html`<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true" class="contact-form__trap">`;

export function contactForm({ t, site, locale }: RenderContext) {
  const f = t.contact.form;
  // Without an endpoint the form degrades to the visitor's mail client, even without JS.
  const action = site.formEndpoint || `mailto:${site.email}`;
  const enctype = site.formEndpoint ? '' : html` enctype="text/plain"`;
  return html`
    <div id="contact-form" class="contact-card">
      <div class="contact-card__sent" role="status" hidden data-form-sent>
        <span class="contact-card__sent-icon" aria-hidden="true">${icon('check', { weight: 'bold' })}</span>
        <div class="contact-card__sent-title" data-sent-title></div>
        <p data-sent-body></p>
        <button type="button" class="link-button" data-form-reset>${f.sendAnother}</button>
      </div>
      <form class="contact-form" action="${action}" method="post"${enctype} novalidate data-contact-form>
        <h3 class="contact-form__title">${f.title}</h3>
        <div class="contact-form__row">
          ${field(
            'name',
            f.name,
            html`<input id="contact-name" name="name" autocomplete="name" required aria-describedby="contact-name-error" class="input">`,
            { error: true },
          )}
          ${field('company', f.company, html`<input id="contact-company" name="company" autocomplete="organization" class="input">`)}
        </div>
        <div class="contact-form__row">
          ${field(
            'email',
            f.email,
            html`<input id="contact-email" name="email" type="email" autocomplete="email" required aria-describedby="contact-email-error" class="input">`,
            { error: true },
          )}
          ${field('phone', f.phone, html`<input id="contact-phone" name="phone" type="tel" autocomplete="tel" class="input">`, { hint: f.optional })}
        </div>
        ${field(
          'message',
          f.message,
          html`<textarea id="contact-message" name="message" rows="4" required aria-describedby="contact-message-error" placeholder="${f.messagePlaceholder}" class="input input--textarea"></textarea>`,
          { error: true },
        )}
        ${honeypot}
        <p class="form-error" role="alert" hidden data-form-error></p>
        <button type="submit" class="btn btn--primary btn--lg btn--block" data-form-submit>${t.client.form.submit}</button>
        <p class="contact-form__privacy">${fill(f.privacy, {
          owner: ownerName(),
          link: html`<a href="${localePath(site, locale, 'privacy')}">${f.privacyLink}</a>`,
        })}</p>
      </form>
    </div>`;
}
