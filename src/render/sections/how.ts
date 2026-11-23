import { SECTIONS, STEPS } from '../../content/catalog.ts';
import { sectionIntro } from '../components.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';
import type { RenderContext } from '../context.ts';

export function how({ t }: RenderContext) {
  const id = SECTIONS.how;
  return html`
<section id="${id}" class="section section--alt" aria-labelledby="${id}-title">
  <div class="container" data-reveal>
    ${sectionIntro(`${id}-title`, t.how.title, t.how.lead)}
    <ol class="steps">
      ${STEPS.map(
        (step, i) => html`
        <li class="step">
          <div class="step__head">
            <span class="gradient-icon">${icon(step.icon)}</span>
            <span class="step__number">${t.common.step} ${i + 1}</span>
          </div>
          <h3 class="step__title">${t.how.steps[step.key].title}</h3>
          <p class="step__text">${t.how.steps[step.key].text}</p>
        </li>`,
      )}
    </ol>
  </div>
</section>`;
}
