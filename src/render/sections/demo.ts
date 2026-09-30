import { sectionIntro } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

export function demo({ t }: RenderContext) {
  const d = t.demo;
  return html`
<section id="demo" class="section section--alt" aria-labelledby="demo-title">
  <div class="container" data-reveal>
    ${sectionIntro('demo-title', d.title, d.lead)}
    <div class="demo">
      <div class="demo__copy">
        <div class="demo__intro">
          <h3 class="demo__heading">${d.heading}</h3>
          <p class="demo__built">${icon('wrench')}${d.builtWith}</p>
        </div>
        <ol class="demo__steps">
          ${d.steps.map((step, i) =>
            i === d.priorityStep
              ? html`
              <li class="demo__step demo__step--priority">
                <span class="demo__num demo__num--active">${i + 1}</span>
                <span class="demo__priority">
                  <span>${step}</span>
                  <span class="badges">
                    <span class="badge badge--high">${d.priorities.high}</span>
                    <span class="badge badge--medium">${d.priorities.medium}</span>
                    <span class="badge badge--low">${d.priorities.low}</span>
                  </span>
                </span>
              </li>`
              : html`<li class="demo__step"><span class="demo__num">${i + 1}</span><span>${step}</span></li>`,
          )}
          <li class="demo__step demo__step--outcome"><span class="demo__num demo__num--done">${icon('check', { weight: 'bold' })}</span><span>${d.outcome}</span></li>
        </ol>
        <a href="#contact" class="btn btn--dark btn--md demo__cta" data-contact-focus="message" data-prefill="${t.client.prefill.demo}">${d.cta}${icon('arrow-right')}</a>
      </div>
      <figure class="demo__figure">
        <div class="demo__shot">
          <img src="/img/demo-workflow.svg" alt="${d.screenshotAlt}" width="1600" height="1100" loading="lazy" decoding="async">
        </div>
        <figcaption>${d.caption}</figcaption>
      </figure>
    </div>
  </div>
</section>`;
}
