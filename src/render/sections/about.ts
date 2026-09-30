import type { RenderContext } from '../context.ts';
import { fill, html } from '../html.ts';
import { icon } from '../icon.ts';

export function about({ t, site }: RenderContext) {
  const a = t.about;
  return html`
<section id="about" class="section" aria-labelledby="about-title">
  <div class="container about" data-reveal>
    <figure class="about__figure">
      <div class="about__photo">
        <img src="/img/founder.svg" alt="${a.photoAlt}" width="920" height="1150" loading="lazy" decoding="async">
      </div>
      <figcaption>${fill(a.caption, { name: html`<strong>André Dias</strong>` })}</figcaption>
    </figure>
    <div class="about__copy">
      <h2 id="about-title" class="section-title section-title--md">${a.title}</h2>
      ${a.paragraphs.map(p => html`<p class="about__text">${p}</p>`)}
      <ul class="tags" aria-label="${a.skillsLabel}">
        ${a.skills.map(skill => html`<li>${skill}</li>`)}
      </ul>
      <div class="button-row button-row--tight">
        <a href="${site.linkedinUrl}" target="_blank" rel="noopener" class="btn btn--md btn--pill">${icon('linkedin-logo')}LinkedIn</a>
        <a href="${site.githubUrl}" target="_blank" rel="noopener" class="btn btn--md btn--pill">${icon('github-logo')}GitHub</a>
      </div>
    </div>
  </div>
</section>`;
}
