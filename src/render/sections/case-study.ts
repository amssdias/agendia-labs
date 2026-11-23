import { SHOW_CASE_STUDY } from '../../content/config.ts';
import { SECTIONS } from '../../content/catalog.ts';
import { html } from '../html.ts';
import type { RenderContext } from '../context.ts';

export function caseStudy({ t }: RenderContext) {
  if (!SHOW_CASE_STUDY) return '';
  const c = t.caseStudy;
  const id = SECTIONS.caseStudy;
  return html`
<section id="${id}" class="section" aria-labelledby="${id}-title">
  <div class="container" data-reveal>
    <article class="case-study">
      <p class="case-study__eyebrow">${c.eyebrow}</p>
      <h2 id="${id}-title" class="case-study__title">${c.title}</h2>
      <p class="case-study__text">${c.text}</p>
    </article>
  </div>
</section>`;
}
