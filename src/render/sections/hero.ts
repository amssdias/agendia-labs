import { FLOW, TECH } from '../../content/catalog.ts';
import { bookLink } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

// Rendered in its finished state so it reads correctly without JS or with reduced motion;
// the browser script rewinds it and plays the animation.
function flowCard({ t }: RenderContext) {
  const last = FLOW.length - 1;
  return html`
    <figure class="flow" aria-label="${t.hero.flowLabel}" data-flow>
      <div class="flow__halo" aria-hidden="true"></div>
      <div class="flow__frame">
        <div class="flow__panel">
          <div class="flow__header">
            <div class="flow__title">${icon('flow-arrow')}<span>${t.hero.flowTitle}</span></div>
            <span class="flow__status" data-state="done"><span class="flow__dot" aria-hidden="true"></span><span data-flow-status>${t.client.flow.statusCompleted}</span></span>
          </div>
          <ol class="flow__list">
            ${FLOW.map(
              (node, i) => html`
              <li class="flow__item" data-state="done" data-flow-node>
                <div class="flow__node">
                  <span class="flow__icon" aria-hidden="true">${icon(node.icon)}</span>
                  <span class="flow__text">
                    <span class="flow__node-title">${t.hero.flow[node.key].title}</span>
                    <span class="flow__node-detail">${t.hero.flow[node.key].detail}</span>
                  </span>
                  <span class="flow__node-status" data-flow-node-status>${t.client.flow.done}</span>
                </div>
                ${i < last && html`<span class="flow__link" aria-hidden="true"></span>`}
              </li>`,
            )}
          </ol>
        </div>
      </div>
    </figure>`;
}

function techList({ t }: RenderContext) {
  return html`
    <div class="container hero__tech">
      <div class="hero__tech-inner">
        <p class="hero__tech-intro">${t.hero.techIntro}</p>
        <ul class="tech-list" aria-label="${t.hero.techListLabel}">
          ${TECH.map(
            tech => html`<li>${
              'logo' in tech
                ? html`<img src="https://cdn.simpleicons.org/${tech.logo}/CBD5E1" alt="" width="${tech.size}" height="${tech.size}" loading="lazy">`
                : html`<span class="tech-list__icon">${icon(tech.icon)}</span>`
            }${tech.name}</li>`,
          )}
          <li><span class="tech-list__icon">${icon('brackets-curly')}</span>${t.hero.restApis}</li>
        </ul>
      </div>
    </div>`;
}

export function hero(ctx: RenderContext) {
  const { t } = ctx;
  return html`
<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="hero__grid-bg" aria-hidden="true"></div>
  <div class="hero__glow hero__glow--blue" aria-hidden="true"></div>
  <div class="hero__glow hero__glow--cyan" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="hero__copy">
      <p class="eyebrow">${t.hero.eyebrow}</p>
      <h1 id="hero-title" class="hero__title">${t.hero.title}</h1>
      <p class="hero__lead">${t.hero.lead}</p>
      <div class="hero__actions">
        <div class="button-row">
          ${bookLink(ctx, t.common.bookCall, 'btn--primary btn--lg btn--glow', { arrow: true })}
          <a href="#solutions" class="btn btn--lg btn--ghost-dark">${t.hero.secondaryCta}</a>
        </div>
        <p class="hero__note">${t.hero.reassurance}</p>
      </div>
    </div>
    ${flowCard(ctx)}
  </div>
  ${techList(ctx)}
</section>`;
}
