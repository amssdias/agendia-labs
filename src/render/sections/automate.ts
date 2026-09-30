import { CHIPS, DEFAULT_CHIP } from '../../content/catalog.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function automate({ t }: RenderContext) {
  const a = t.automate;
  return html`
<section id="automate" class="section" aria-labelledby="automate-title">
  <div class="container container--narrow" data-reveal>
    <h2 id="automate-title" class="section-title section-title--xl">${a.title}</h2>
    <p class="section-lead section-lead--tight">${a.lead}</p>
    <div class="chips" role="group" aria-label="${a.chipsLabel}" data-chips>
      ${CHIPS.map(
        c => html`<button type="button" class="chip" aria-pressed="${String(c.key === DEFAULT_CHIP)}" aria-controls="chip-panel-${c.key}" data-chip="${c.key}">${icon(c.icon)}<span data-chip-label>${a.chips[c.key].label}</span></button>`,
      )}
    </div>
    <div class="recipe">
      <div class="recipe__grid-bg" aria-hidden="true"></div>
      <div aria-live="polite">
        ${CHIPS.map(c => {
          const chip = a.chips[c.key];
          return html`
          <div class="recipe__body" id="chip-panel-${c.key}" data-chip-panel="${c.key}"${c.key === DEFAULT_CHIP ? '' : html` hidden`}>
            <div class="recipe__trigger">
              <span class="recipe__label">${a.when}</span>
              <span class="recipe__value">${chip.trigger}</span>
            </div>
            <ol class="recipe__steps">
              ${chip.steps.map(step => html`<li>${icon('lightning')}${step}</li>`)}
            </ol>
            <div class="recipe__result">
              <span class="recipe__label">${a.result}</span>
              <span class="recipe__value recipe__value--strong">${chip.result}</span>
            </div>
          </div>`;
        })}
      </div>
      <div class="recipe__footer">
        <p>${a.note}</p>
        <a href="#contact" class="btn btn--light btn--md" data-contact-focus="message" data-prefill-chip>${a.cta}${icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>`;
}
