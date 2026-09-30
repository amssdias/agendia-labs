const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, c => ESCAPES[c]);

/** Markup that has already been escaped or is trusted, so `html` inserts it verbatim. */
export class SafeHtml {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

export type HtmlValue = SafeHtml | string | number | boolean | null | undefined | HtmlValue[];

function stringify(value: HtmlValue): string {
  // Booleans render nothing so `condition && html\`...\`` works inside templates.
  if (value == null || typeof value === 'boolean') return '';
  if (Array.isArray(value)) return value.map(stringify).join('');
  if (value instanceof SafeHtml) return value.value;
  return escapeHtml(String(value));
}

/** Tagged template that escapes every interpolated value unless it is SafeHtml. */
export function html(strings: TemplateStringsArray, ...values: HtmlValue[]): SafeHtml {
  let out = strings[0];
  values.forEach((value, i) => {
    out += stringify(value) + strings[i + 1];
  });
  return new SafeHtml(out);
}

export const raw = (markup: string) => new SafeHtml(markup);

/**
 * Fills `{name}` placeholders in a translated sentence with markup, escaping the surrounding text.
 * Lets translations keep their own word order around inline elements like <strong> or links.
 */
export function fill(template: string, slots: Record<string, HtmlValue>): SafeHtml {
  const parts = template.split(/\{(\w+)\}/);
  return new SafeHtml(parts.map((part, i) => (i % 2 ? stringify(slots[part]) : escapeHtml(part))).join(''));
}

/** Serialises data for a <script type="application/json|ld+json"> block without allowing `</script>` breakouts. */
export const jsonScript = (data: unknown) => raw(JSON.stringify(data).replace(/</g, '\\u003c'));
