import { CASES, DEFAULT_CASE } from '../../content/catalog.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function solutions({ t }: RenderContext) {
  return html`
<section id="solutions" class="section section--alt" aria-labelledby="solutions-title">
  <div class="container" data-reveal>
    <h2 id="solutions-title" class="section-title section-title--narrow section-title--tabs">${t.solutions.title}</h2>
    <div class="tabs" role="tablist" aria-label="${t.solutions.tabsLabel}" data-tabs>
      ${CASES.map(c => {
        const selected = c.key === DEFAULT_CASE;
        return html`<button type="button" class="tab" role="tab" id="case-tab-${c.key}" aria-controls="case-panel-${c.key}" aria-selected="${String(selected)}" tabindex="${selected ? '0' : '-1'}">${icon(c.icon)}${t.solutions.cases[c.key].label}</button>`;
      })}
    </div>
    ${CASES.map(c => {
      const copy = t.solutions.cases[c.key];
      if (copy.steps.length !== c.steps.length) {
        throw new Error(`solutions.cases.${c.key}.steps must have ${c.steps.length} items to match the catalog icons.`);
      }
      const last = c.steps.length - 1;
      return html`
      <div class="case-panel" role="tabpanel" id="case-panel-${c.key}" aria-labelledby="case-tab-${c.key}" tabindex="0"${c.key === DEFAULT_CASE ? '' : html` hidden`}>
        <p class="case-panel__outcome">${copy.outcome}</p>
        <ol class="chain">
          ${c.steps.map(
            (stepIcon, i) => html`
            <li class="chain__item">
              <div class="chain__step${i === last ? ' chain__step--final' : ''}">${icon(stepIcon)}<span>${copy.steps[i]}</span></div>
              ${i < last && html`<span class="chain__arrow" aria-hidden="true">${icon('arrow-right')}</span>`}
            </li>`,
          )}
        </ol>
      </div>`;
    })}
    <div class="industry-banner">
      <div>
        <h3 class="industry-banner__title">${t.solutions.missing.title}</h3>
        <p class="industry-banner__text">${t.solutions.missing.text}</p>
      </div>
      <a href="#contact" class="btn btn--md btn--outline" data-contact-focus="message">${t.solutions.missing.cta}${icon('arrow-right')}</a>
    </div>
  </div>
</section>`;
}
