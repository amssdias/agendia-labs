import { EXTRA_PLAN, PLANS, SECTIONS } from '../../content/catalog.ts';
import { bookingLink, sectionIntro } from '../components.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';
import type { RenderContext } from '../context.ts';

export function plans({ t }: RenderContext) {
  const p = t.plans;
  const id = SECTIONS.plans;
  return html`
<section id="${id}" class="section section--alt" aria-labelledby="${id}-title">
  <div class="container" data-reveal>
    ${sectionIntro(`${id}-title`, p.title, p.lead)}
    <ul class="plan-grid">
      ${PLANS.map(plan => {
        const copy = p.items[plan.key];
        const featured = 'featured' in plan && plan.featured;
        return html`
        <li class="plan-card${featured ? ' plan-card--featured' : ''}">
          ${featured && html`<span class="plan-card__badge">${p.featuredBadge}</span>`}
          <span class="gradient-icon">${icon(plan.icon)}</span>
          <h3 class="plan-card__title">${copy.title}</h3>
          <p class="plan-card__audience">${copy.audience}</p>
          <ul class="plan-card__features">
            ${copy.features.map(feature => html`<li>${icon('check', { weight: 'bold' })}<span>${feature}</span></li>`)}
          </ul>
          ${bookingLink(p.cta, `btn--md btn--block ${featured ? 'btn--primary' : 'btn--outline'}`, { name: 'ver-plan', plan: plan.key })}
        </li>`;
      })}
    </ul>
    <div class="plan-extra">
      <span class="gradient-icon">${icon(EXTRA_PLAN.icon)}</span>
      <div class="plan-extra__copy">
        <span class="plan-extra__badge">${p.extra.badge}</span>
        <h3 class="plan-card__title">${p.extra.title}</h3>
        <p class="plan-card__audience">${p.extra.text}</p>
      </div>
      ${bookingLink(p.cta, 'btn--md btn--outline', { name: 'ver-plan', plan: EXTRA_PLAN.key })}
    </div>
    <p class="plans__note">${p.note}</p>
  </div>
</section>`;
}
