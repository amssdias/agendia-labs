import type { Locale } from '../site.ts';
import { en } from './en.ts';
import { es } from './es.ts';
import type { Messages } from './types.ts';

export const messages: Record<Locale, Messages> = { en, es };

export type { ClientMessages, Messages, Plural } from './types.ts';
