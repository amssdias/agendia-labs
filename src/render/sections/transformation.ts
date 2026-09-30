import { sectionIntro } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function transformation({ t }: RenderContext) {
  const { before, after } = t.transformation;
  const lastBefore = before.steps.length - 1;
  return html`
<section id="transformation" class="section section--alt" aria-labelledby="transform-title">
  <div class="container" data-reveal>
    ${sectionIntro('transform-title', t.transformation.title, t.transformation.lead, 'section-title--narrow')}
    <div class="compare">
      <div class="compare__before">
        <div class="compare__head">
          <h3 class="compare__title">${before.title}</h3>
          <span class="compare__badge">${icon('user')}${before.badge}</span>
        </div>
        <ol class="compare__messy">
          ${before.steps.map((step, i) =>
            i === lastBefore
              ? html`<li class="compare__messy-step compare__messy-step--warn">${icon('warning')}${step}</li>`
              : html`<li class="compare__messy-step">${step}</li>`,
          )}
        </ol>
      </div>
      <div class="compare__after">
        <div class="compare__after-inner">
          <div class="compare__head">
            <h3 class="compare__title compare__title--strong">${after.title}</h3>
            <span class="compare__badge compare__badge--blue">${icon('lightning')}${after.badge}</span>
          </div>
          <ol class="compare__steps">
            ${after.steps.map(
              step => html`
              <li class="compare__step">
                <span class="compare__marker" aria-hidden="true"><span class="compare__check">${icon('check', { weight: 'bold' })}</span><span class="compare__line"></span></span>
                <span class="compare__label">${step}</span>
              </li>`,
            )}
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
