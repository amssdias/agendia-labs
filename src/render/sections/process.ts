import { PROCESS } from '../../content/catalog.ts';
import { interpolate } from '../../shared/format.ts';
import { bookLink, sectionIntro } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function process(ctx: RenderContext) {
  const { t } = ctx;
  return html`
<section id="how-it-works" class="section section--alt" aria-labelledby="how-title">
  <div class="container" data-reveal>
    ${sectionIntro('how-title', t.process.title, t.process.lead)}
    <ol class="process">
      ${PROCESS.map(
        (p, i) => html`
        <li class="process__step">
          <div class="process__marker" aria-hidden="true">
            <span class="process__icon">${icon(p.icon)}</span>
            <span class="process__line"></span>
          </div>
          <div class="process__body">
            <span class="process__number">${interpolate(t.process.stepLabel, { n: String(i + 1).padStart(2, '0') })}</span>
            <h3 class="process__title">${t.process.steps[p.key].title}</h3>
            <p class="process__text">${t.process.steps[p.key].text}</p>
          </div>
        </li>`,
      )}
    </ol>
    <div class="process__cta">
      ${bookLink(ctx, t.common.bookCall, 'btn--primary btn--lg btn--shadow', { arrow: true })}
      <span>${t.process.ctaNote}</span>
    </div>
  </div>
</section>`;
}
