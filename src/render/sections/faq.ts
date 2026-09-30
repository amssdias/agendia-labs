import type { RenderContext } from '../context.ts';
import { fill, html } from '../html.ts';
import { icon } from '../icon.ts';

// Native <details name="faq"> gives an exclusive accordion that works without JS.
export function faq({ t, site }: RenderContext) {
  return html`
<section id="faq" class="section section--bordered" aria-labelledby="faq-title">
  <div class="container faq">
    <div class="faq__intro">
      <h2 id="faq-title" class="section-title">${t.faq.title}</h2>
      <p class="faq__lead">${fill(t.faq.intro, { email: html`<a href="mailto:${site.email}">${site.email}</a>` })}</p>
    </div>
    <div class="faq__list">
      ${t.faq.items.map(
        (item, i) => html`
        <details class="faq__item" name="faq"${i === 0 ? html` open` : ''}>
          <summary class="faq__question"><h3>${item.q}</h3><span class="faq__toggle" aria-hidden="true">${icon('plus', { weight: 'bold' })}</span></summary>
          <p class="faq__answer">${item.a}</p>
        </details>`,
      )}
    </div>
  </div>
</section>`;
}
