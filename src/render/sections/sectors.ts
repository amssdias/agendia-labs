import { DEFAULT_SECTOR, SECTIONS, SECTORS } from '../../content/catalog.ts';
import { sectionIntro } from '../components.ts';
import { html } from '../html.ts';
import { icon } from '../icon.ts';
import type { RenderContext } from '../context.ts';

export function sectors({ t }: RenderContext) {
  const s = t.sectors;
  const id = SECTIONS.sectors;
  return html`
<section id="${id}" class="section" aria-labelledby="${id}-title">
  <div class="container" data-reveal>
    ${sectionIntro(`${id}-title`, s.title, s.lead, 'section-title--narrow')}
    <div class="tabs" role="tablist" aria-label="${s.tabsLabel}" data-tabs>
      ${SECTORS.map(sector => {
        const selected = sector.key === DEFAULT_SECTOR;
        return html`<button type="button" class="tab" role="tab" id="sector-tab-${sector.key}" aria-controls="sector-panel-${sector.key}" aria-selected="${String(selected)}" tabindex="${selected ? '0' : '-1'}">${icon(sector.icon)}${s.items[sector.key].label}</button>`;
      })}
    </div>
    ${SECTORS.map(sector => {
      const copy = s.items[sector.key];
      return html`
      <div class="sector-panel" role="tabpanel" id="sector-panel-${sector.key}" aria-labelledby="sector-tab-${sector.key}" tabindex="0"${sector.key === DEFAULT_SECTOR ? '' : html` hidden`}>
        <p class="sector-panel__pain">${copy.pain}</p>
        <figure class="chat">
          <figcaption class="chat__label">${s.exampleLabel}</figcaption>
          <ol class="chat__list">
            ${copy.conversation.map(
              line => html`
              <li class="chat__message chat__message--${line.from}">
                <span class="chat__speaker">${s.speakers[line.from]}</span>
                <p class="chat__bubble">${line.text}</p>
              </li>`,
            )}
          </ol>
        </figure>
      </div>`;
    })}
  </div>
</section>`;
}
