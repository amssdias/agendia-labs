import { bookLink } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
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

function contactForm({ t, site }: RenderContext) {
  const f = t.contact.form;
  // Without an endpoint the form degrades to the visitor's mail client, even without JS.
  const action = site.formEndpoint || `mailto:${site.email}`;
  const enctype = site.formEndpoint ? '' : html` enctype="text/plain"`;
  return html`
    <div id="contact-form" class="contact-card">
      <div class="contact-card__sent" role="status" hidden data-form-sent>
        <span class="contact-card__sent-icon" aria-hidden="true">${icon('check', { weight: 'bold' })}</span>
        <h3 data-sent-title></h3>
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
        ${field(
          'email',
          f.email,
          html`<input id="contact-email" name="email" type="email" autocomplete="email" required aria-describedby="contact-email-error" class="input">`,
          { error: true },
        )}
        ${field(
          'message',
          f.message,
          html`<textarea id="contact-message" name="message" rows="4" required aria-describedby="contact-message-error" placeholder="${f.messagePlaceholder}" class="input input--textarea"></textarea>`,
          { error: true },
        )}
        ${field(
          'website',
          f.website,
          html`<input id="contact-website" name="website" type="url" autocomplete="url" placeholder="${f.websitePlaceholder}" class="input">`,
          { hint: f.optional },
        )}
        <p class="form-error" role="alert" hidden data-form-error></p>
        <button type="submit" class="btn btn--primary btn--lg btn--block" data-form-submit>${t.client.form.submit}</button>
        <p class="contact-form__privacy">${f.privacy}</p>
      </form>
    </div>`;
}

export function contact(ctx: RenderContext) {
  const { t } = ctx;
  return html`
<section id="contact" class="contact" aria-labelledby="contact-title">
  <div class="contact__grid-bg" aria-hidden="true"></div>
  <div class="contact__glow contact__glow--blue" aria-hidden="true"></div>
  <div class="contact__glow contact__glow--cyan" aria-hidden="true"></div>
  <div class="container contact__inner">
    <div class="contact__copy">
      <h2 id="contact-title" class="contact__title">${t.contact.title}</h2>
      <p class="contact__tagline">${t.contact.tagline}</p>
      <div class="button-row">
        ${bookLink(ctx, t.common.bookCall, 'btn--primary btn--lg btn--glow', { arrow: true })}
        <a href="#contact-form" class="btn btn--lg btn--ghost-dark" data-contact-focus="message">${t.contact.secondaryCta}</a>
      </div>
      <p class="contact__note">${t.contact.reassurance}</p>
    </div>
    ${contactForm(ctx)}
  </div>
</section>`;
}
