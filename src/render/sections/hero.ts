import { SECTIONS } from '../../content/catalog.ts';
import { bookingLink, demoCallLink } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';

const PREVIEW = [
  { key: 'call', icon: 'phone-incoming' },
  { key: 'booked', icon: 'calendar-check' },
  { key: 'notice', icon: 'bell-ringing' },
] as const;

export function hero({ t }: RenderContext) {
  const h = t.hero;
  return html`
<section id="${SECTIONS.hero}" class="hero" aria-labelledby="hero-title">
  <div class="hero__grid-bg" aria-hidden="true"></div>
  <div class="hero__glow hero__glow--blue" aria-hidden="true"></div>
  <div class="hero__glow hero__glow--cyan" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="hero__copy">
      <h1 id="hero-title" class="hero__title">${h.title}</h1>
      <p class="hero__lead">${h.lead}</p>
      <p class="hero__sectors">${h.sectors}</p>
      <div class="hero__actions">
        <div class="button-row">
          ${bookingLink(t.common.book, 'btn--primary btn--lg btn--glow')}
          ${demoCallLink(h.demoCta, 'btn--lg btn--ghost-dark')}
        </div>
        <p class="hero__note">${h.note}</p>
      </div>
    </div>
    <figure class="hero-preview">
      <figcaption class="hero-preview__label">${h.preview.label}</figcaption>
      <ol class="hero-preview__list">
        ${PREVIEW.map(
          item => html`
          <li class="hero-preview__item">
            <span class="hero-preview__icon">${icon(item.icon)}</span>
            <span class="hero-preview__text"><strong>${h.preview[item.key].title}</strong><span>${h.preview[item.key].detail}</span></span>
          </li>`,
        )}
      </ol>
    </figure>
  </div>
</section>`;
}
