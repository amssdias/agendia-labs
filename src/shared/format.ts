/** Shared by the build-time renderer and the browser, so both produce identical text. */

export const interpolate = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
