import { PROBLEMS } from '../../content/catalog.ts';
import { sectionIntro } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function problems({ t }: RenderContext) {
  return html`
<section id="problems" class="section" aria-labelledby="problems-title">
  <div class="container" data-reveal>
    ${sectionIntro('problems-title', t.problems.title, undefined, 'section-title--spaced')}
    <div class="problems-grid">
      ${PROBLEMS.map(
        p => html`
        <article class="card card--lift problem-card">
          <span class="problem-card__icon" aria-hidden="true">${icon(p.icon)}</span>
          <h3 class="card__title">${t.problems.items[p.key].title}</h3>
          <p class="card__text">${t.problems.items[p.key].text}</p>
        </article>`,
      )}
      <article class="problem-callout">
        <p class="problem-callout__text">${t.problems.callout}</p>
        <a href="#automate" class="btn btn--light btn--md">${t.problems.calloutCta}${icon('arrow-down')}</a>
      </article>
    </div>
  </div>
</section>`;
}
