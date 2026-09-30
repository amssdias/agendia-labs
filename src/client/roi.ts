import { ROI_DEFAULTS, ROI_LIMITS, ROI_WORKING_DAYS } from '../content/catalog.ts';
import { formatNumber, formatPlural, selectPlural } from '../shared/format.ts';
import { pageLocale, prefersReducedMotion, type ClientStrings } from './env.ts';

type Field = keyof typeof ROI_DEFAULTS;

const COUNT_UP_MS = 420;

/** "People × hours × working days" calculator in #value. */
export function initRoi(m: ClientStrings) {
  const root = document.querySelector<HTMLElement>('[data-roi]');
  if (!root) return;

  const locale = pageLocale();
  const values = { ...ROI_DEFAULTS };
  const total = root.querySelector<HTMLElement>('[data-roi-total]')!;
  const sentence = root.querySelector<HTMLElement>('[data-roi-sentence]')!;
  let shown = values.people * values.hours * ROI_WORKING_DAYS;
  let frame = 0;

  const countTo = (target: number) => {
    cancelAnimationFrame(frame);
    if (prefersReducedMotion()) {
      shown = target;
      total.textContent = formatNumber(locale, target);
      return;
    }
    const from = shown;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_UP_MS);
      shown = from + (target - from) * (1 - Math.pow(1 - progress, 3));
      total.textContent = formatNumber(locale, Math.round(shown));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };

  // The verb agrees with the number of people, so the whole sentence is rebuilt, not just the numbers.
  const renderSentence = () => {
    const parts = selectPlural(locale, m.roi.sentence, values.people).split(/\{(\w+)\}/);
    sentence.replaceChildren(
      ...parts.map((part, i) => {
        if (i % 2 === 0) return document.createTextNode(part);
        const strong = document.createElement('strong');
        strong.textContent = formatPlural(locale, m.roi[part as Field], values[part as Field]);
        return strong;
      }),
    );
  };

  const render = () => {
    renderSentence();
    (Object.keys(values) as Field[]).forEach(field => {
      root.querySelector(`[data-roi-value="${field}"]`)!.textContent = formatNumber(locale, values[field]);
      root.querySelectorAll<HTMLButtonElement>(`[data-roi-step="${field}"]`).forEach(button => {
        const limit = button.dataset.direction === '-1' ? ROI_LIMITS[field].min : ROI_LIMITS[field].max;
        button.disabled = values[field] === limit;
      });
    });
  };

  root.addEventListener('click', e => {
    const button = (e.target as Element).closest<HTMLButtonElement>('[data-roi-step]');
    if (!button) return;
    const field = button.dataset.roiStep as Field;
    const { min, max, step } = ROI_LIMITS[field];
    values[field] = Math.min(max, Math.max(min, values[field] + Number(button.dataset.direction) * step));
    render();
    countTo(values.people * values.hours * ROI_WORKING_DAYS);
  });

  render();
}
