import { interpolate } from '../shared/format.ts';
import type { Chips } from './chips.ts';
import { pageLocale, prefersReducedMotion, type ClientStrings } from './env.ts';

type Field = 'name' | 'email' | 'message';
type Values = Record<'name' | 'company' | 'email' | 'message' | 'website', string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Roughly how long the smooth scroll to #contact takes; focusing earlier would cut it short.
const SCROLL_SETTLE_MS = 650;

function validate(values: Values, m: ClientStrings): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = m.form.errors.name;
  if (!values.email.trim()) errors.email = m.form.errors.email;
  else if (!EMAIL.test(values.email.trim())) errors.email = m.form.errors.emailInvalid;
  if (!values.message.trim()) errors.message = m.form.errors.message;
  return errors;
}

function mailtoHref(form: HTMLFormElement, values: Values, m: ClientStrings) {
  const body = [values.message, '', values.name, values.company, values.website].filter((line, i) => i < 2 || line).join('\n');
  const address = form.getAttribute('action')!.slice('mailto:'.length);
  return `mailto:${address}?subject=${encodeURIComponent(interpolate(m.form.mailSubject, { name: values.name }))}&body=${encodeURIComponent(body)}`;
}

/** Links that jump to the form: optionally prefill the message, then focus a field once scrolled. */
function initContactLinks(form: HTMLFormElement, m: ClientStrings, chips: Chips) {
  document.addEventListener('click', e => {
    const link = (e.target as Element).closest<HTMLElement>('[data-contact-focus]');
    if (!link) return;
    const message = form.elements.namedItem('message') as HTMLTextAreaElement;
    const prefill =
      link.dataset.prefill ??
      ('prefillChip' in link.dataset
        ? interpolate(m.prefill.automate, { task: chips.activeLabel().toLocaleLowerCase(pageLocale()) })
        : '');
    if (prefill && !message.value.trim()) message.value = prefill;
    const target = form.elements.namedItem(link.dataset.contactFocus!) as HTMLElement | null;
    window.setTimeout(() => target?.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : SCROLL_SETTLE_MS);
  });
}

export function initContact(m: ClientStrings, chips: Chips) {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const sent = document.querySelector<HTMLElement>('[data-form-sent]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-form-submit]')!;
  const formError = form.querySelector<HTMLElement>('[data-form-error]')!;
  const useMailto = form.getAttribute('action')!.startsWith('mailto:');

  initContactLinks(form, m, chips);

  const input = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;

  const setError = (field: Field, message?: string) => {
    const error = document.getElementById(`contact-${field}-error`)!;
    error.textContent = message ?? '';
    error.hidden = !message;
    input(field).setAttribute('aria-invalid', String(Boolean(message)));
  };

  const setSending = (sending: boolean) => {
    submit.disabled = sending;
    submit.textContent = sending ? m.form.sending : m.form.submit;
  };

  form.addEventListener('input', e => {
    const name = (e.target as HTMLInputElement).name;
    if (name === 'name' || name === 'email' || name === 'message') setError(name);
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formError.hidden = true;
    const values = Object.fromEntries(new FormData(form)) as Values;
    const errors = validate(values, m);
    const fields: Field[] = ['name', 'email', 'message'];
    fields.forEach(field => setError(field, errors[field]));
    const firstInvalid = fields.find(field => errors[field]);
    if (firstInvalid) {
      input(firstInvalid).focus();
      return;
    }

    if (useMailto) {
      window.location.href = mailtoHref(form, values, m);
      return;
    }

    setSending(true);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, locale: pageLocale(), page: window.location.href }),
      });
      if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);
      sent.querySelector('[data-sent-title]')!.textContent = interpolate(m.form.sentTitle, { name: values.name.trim() });
      sent.querySelector('[data-sent-body]')!.textContent = interpolate(m.form.sentBody, { email: values.email.trim() });
      form.hidden = true;
      sent.hidden = false;
    } catch (error) {
      console.error(error);
      formError.textContent = interpolate(m.form.errors.network, { email: m.email });
      formError.hidden = false;
    } finally {
      setSending(false);
    }
  });

  sent.querySelector('[data-form-reset]')!.addEventListener('click', () => {
    form.reset();
    sent.hidden = true;
    form.hidden = false;
    input('name').focus();
  });
}
