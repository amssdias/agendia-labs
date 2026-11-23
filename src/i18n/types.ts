import type { NavKey, PainKey, PlanKey, SectorKey, StepKey } from '../content/catalog.ts';
import type { PageKey } from '../site.ts';

/** Strings the browser script needs at runtime. Serialised into each page as JSON. */
export interface ClientMessages {
  form: {
    errors: { name: string; email: string; emailInvalid: string; message: string; network: string };
    submit: string;
    sending: string;
    /** `{name}` placeholder. */
    sentTitle: string;
    /** `{email}` placeholder. */
    sentBody: string;
    /** Subject of the mailto fallback. `{name}` placeholder. */
    mailSubject: string;
  };
}

export interface ChatLine {
  from: 'client' | 'agent';
  text: string;
}

/** `a: null` is an answer still to be written: the question stays off the page and out of the structured data. */
export interface FaqEntry {
  q: string;
  a: string | null;
}

/**
 * A paragraph, or a list when it is an array. Placeholders: `{email}`, `{formProvider}`, `{privacyLink}`
 * and `{aepd}` (link to the Spanish data protection authority).
 */
export type LegalBlock = string | string[];

export interface LegalPageCopy {
  title: string;
  description: string;
  /** `identity: true` lists the owner's details after the section's blocks. */
  sections: { heading: string; blocks: LegalBlock[]; identity?: boolean }[];
}

export interface Messages {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    /** e.g. en_GB. */
    ogLocale: string;
  };
  schema: { description: string; knowsAbout: string[] };
  common: {
    book: string;
    /** Shown before the step number, e.g. "Step". */
    step: string;
    home: string;
    mainNav: string;
    menu: string;
    language: string;
    skipToContent: string;
  };
  nav: Record<NavKey, string>;
  hero: {
    title: string;
    lead: string;
    sectors: string;
    demoCta: string;
    note: string;
    preview: {
      label: string;
      call: { title: string; detail: string };
      booked: { title: string; detail: string };
      notice: { title: string; detail: string };
    };
  };
  problem: {
    title: string;
    items: Record<PainKey, { title: string; text: string }>;
    exampleLabel: string;
    example: string;
    disclaimer: string;
  };
  how: {
    title: string;
    lead: string;
    steps: Record<StepKey, { title: string; text: string }>;
  };
  sectors: {
    title: string;
    lead: string;
    tabsLabel: string;
    exampleLabel: string;
    speakers: Record<ChatLine['from'], string>;
    items: Record<SectorKey, { label: string; pain: string; conversation: ChatLine[] }>;
  };
  plans: {
    title: string;
    lead: string;
    cta: string;
    featuredBadge: string;
    items: Record<PlanKey, { title: string; audience: string; features: string[] }>;
    extra: { badge: string; title: string; text: string };
    note: string;
  };
  faq: {
    title: string;
    /** `{email}` placeholder, rendered as a mailto link. */
    intro: string;
    items: FaqEntry[];
  };
  booking: {
    title: string;
    lead: string;
    note: string;
    calendarTitle: string;
    formToggle: string;
    /** Shown only with a contact phone. `{phone}` and `{whatsapp}` placeholders, rendered as links. */
    contactLine: string;
  };
  contact: {
    form: {
      title: string;
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
      messagePlaceholder: string;
      optional: string;
      /** Basic data protection notice. `{owner}` and `{link}` placeholders; `{link}` shows `privacyLink`. */
      privacy: string;
      privacyLink: string;
      sendAnother: string;
    };
  };
  footer: {
    /** `{link}` placeholder, rendered as a mailto link with `custom.link` as its text. */
    custom: { text: string; link: string };
    /** `{year}` placeholder. */
    legal: string;
  };
  legal: {
    back: string;
    /** `{date}` placeholder. */
    updated: string;
    identity: { owner: string; taxId: string; address: string; email: string; phone: string };
    pages: Record<PageKey, LegalPageCopy>;
  };
  client: ClientMessages;
}
