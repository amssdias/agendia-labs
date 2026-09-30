import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { raw, type SafeHtml } from './html.ts';

const require = createRequire(import.meta.url);
const cache = new Map<string, string>();

type Weight = 'regular' | 'bold';

/**
 * Inlines a Phosphor icon at build time. Only the icons the page uses end up in the HTML,
 * instead of shipping the full icon font (~470 KB).
 */
export function icon(name: string, options: { weight?: Weight; className?: string } = {}): SafeHtml {
  const weight = options.weight ?? 'regular';
  const key = `${weight}/${name}`;
  let svg = cache.get(key);
  if (!svg) {
    const file = weight === 'bold' ? `${name}-bold` : name;
    svg = readFileSync(require.resolve(`@phosphor-icons/core/${weight}/${file}.svg`), 'utf8').trim();
    cache.set(key, svg);
  }
  const className = options.className ? `icon ${options.className}` : 'icon';
  return raw(svg.replace('<svg ', `<svg class="${className}" aria-hidden="true" focusable="false" `));
}
