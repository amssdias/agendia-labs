import { bookLink } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function firstCall(ctx: RenderContext) {
  const f = ctx.t.firstCall;
  return html`
<section id="first-call" class="section section--flush-top" aria-labelledby="risk-title">
  <div class="container" data-reveal>
    <div class="first-call">
      <div class="first-call__copy">
        <h2 id="risk-title" class="first-call__title">${f.title}</h2>
        ${f.paragraphs.map(p => html`<p class="first-call__text">${p}</p>`)}
        ${bookLink(ctx, f.cta, 'btn--primary btn--lg btn--shadow first-call__cta', { arrow: true })}
      </div>
      <ul class="checklist">
        ${f.points.map(point => html`<li>${icon('check', { weight: 'bold' })}${point}</li>`)}
      </ul>
    </div>
  </div>
</section>`;
}
