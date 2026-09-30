import { SERVICES } from '../../content/catalog.ts';
import { sectionIntro } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function services({ t }: RenderContext) {
  return html`
<section id="services" class="section" aria-labelledby="services-title">
  <div class="container" data-reveal>
    ${sectionIntro('services-title', t.services.title, t.services.lead, 'section-title--narrow')}
    <div class="services-grid">
      ${SERVICES.map(s => {
        const copy = t.services.items[s.key];
        return html`
        <article class="card card--lift service-card">
          <div class="service-card__head">
            <span class="gradient-icon" aria-hidden="true">${icon(s.icon)}</span>
            <h3 class="card__title">${copy.title}</h3>
          </div>
          <p class="service-card__problem"><span>${t.services.problemLabel} </span>${copy.problem}</p>
          <p class="service-card__solution">${copy.solution}</p>
          <div class="service-card__result">${icon('trend-up')}<span>${copy.result}</span></div>
          <a href="#automate" class="arrow-link" data-select-chip="${s.chip}">${t.services.explore}${icon('arrow-right')}</a>
        </article>`;
      })}
    </div>
  </div>
</section>`;
}
