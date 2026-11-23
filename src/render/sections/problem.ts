import { PAINS, SECTIONS } from '../../content/catalog.ts';
import { sectionIntro } from '../components.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';
import type { RenderContext } from '../context.ts';

export function problem({ t }: RenderContext) {
  const p = t.problem;
  const id = SECTIONS.problem;
  return html`
<section id="${id}" class="section" aria-labelledby="${id}-title">
  <div class="container" data-reveal>
    ${sectionIntro(`${id}-title`, p.title, undefined, 'section-title--spaced')}
    <ul class="pain-grid">
      ${PAINS.map(
        pain => html`
        <li class="card pain-card">
          <span class="pain-card__icon">${icon(pain.icon)}</span>
          <h3 class="card__title">${p.items[pain.key].title}</h3>
          <p class="card__text">${p.items[pain.key].text}</p>
        </li>`,
      )}
    </ul>
    <div class="example-box">
      <p class="example-box__label">${p.exampleLabel}</p>
      <p class="example-box__text">${p.example}</p>
      <p class="example-box__note">${p.disclaimer}</p>
    </div>
  </div>
</section>`;
}
