import type { Messages } from '../i18n/index.ts';
import type { Locale, SiteConfig } from '../site.ts';

export interface RenderContext {
  locale: Locale;
  t: Messages;
  site: SiteConfig;
}
