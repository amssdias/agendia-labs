import { ROI_DEFAULTS, ROI_WORKING_DAYS } from '../../content/catalog.ts';
import { formatNumber, formatPlural, selectPlural } from '../../shared/format.ts';
import type { RenderContext } from '../context.ts';
import { fill, html } from '../html.ts';
import { icon } from '../icon.ts';

function stepper(field: 'people' | 'hours', label: string, fewer: string, more: string, value: string) {
  return html`
    <div class="roi__field">
      <span class="roi__label" id="roi-${field}-label">${label}</span>
      <div class="stepper">
        <button type="button" class="stepper__button" aria-label="${fewer}" data-roi-step="${field}" data-direction="-1">${icon('minus')}</button>
        <output class="stepper__value" aria-labelledby="roi-${field}-label" data-roi-value="${field}">${value}</output>
        <button type="button" class="stepper__button" aria-label="${more}" data-roi-step="${field}" data-direction="1">${icon('plus')}</button>
      </div>
    </div>`;
}

export function value({ t, locale }: RenderContext) {
  const v = t.value;
  const { people, hours } = ROI_DEFAULTS;
  return html`
<section id="value" class="section" aria-labelledby="value-title">
  <div class="container" data-reveal>
    <h2 id="value-title" class="section-title section-title--md section-title--wide section-title--spaced">${v.title}</h2>
    <div class="roi" data-roi>
      <p class="roi__sentence" data-roi-sentence>${fill(selectPlural(locale, t.client.roi.sentence, people), {
        people: html`<strong>${formatPlural(locale, t.client.roi.people, people)}</strong>`,
        hours: html`<strong>${formatPlural(locale, t.client.roi.hours, hours)}</strong>`,
      })}</p>
      <div class="roi__calc">
        ${stepper('people', v.people, v.fewerPeople, v.morePeople, formatNumber(locale, people))}
        <span class="roi__op" aria-hidden="true">×</span>
        ${stepper('hours', v.hours, v.fewerHours, v.moreHours, formatNumber(locale, hours))}
        <span class="roi__op" aria-hidden="true">×</span>
        <div class="roi__field">
          <span class="roi__label">${v.workingDays}</span>
          <span class="roi__fixed">${ROI_WORKING_DAYS}</span>
        </div>
        <span class="roi__op" aria-hidden="true">=</span>
        <div class="roi__total">
          <span class="roi__label roi__label--accent">${v.perMonth}</span>
          <span class="roi__result" aria-live="polite"><span data-roi-total>${formatNumber(locale, people * hours * ROI_WORKING_DAYS)}</span> <span class="roi__unit">${v.unit}</span></span>
        </div>
      </div>
      <p class="roi__note">${v.note} <span>${v.disclaimer}</span></p>
    </div>
  </div>
</section>`;
}
