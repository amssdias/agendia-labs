import type { CaseKey, ChipKey, FlowKey, NavSection, ProblemKey, ProcessKey, ServiceKey } from '../content/catalog.ts';

/** `{n}` is replaced with the formatted number; `one`/`other` follow Intl.PluralRules. */
export interface Plural {
  one: string;
  other: string;
}

/** Strings the browser script needs at runtime. Serialised into each page as JSON. */
export interface ClientMessages {
  flow: { done: string; running: string; waiting: string; statusRunning: string; statusCompleted: string };
  roi: {
    /** `{people}` and `{hours}` placeholders, rendered bold. Plural form follows the number of people. */
    sentence: Plural;
    people: Plural;
    hours: Plural;
  };
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
  prefill: {
    /** `{task}` placeholder. */
    automate: string;
    demo: string;
  };
}

export interface Messages {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    /** e.g. en_US. */
    ogLocale: string;
  };
  schema: { description: string; knowsAbout: string[]; founderJobTitle: string };
  common: {
    bookCall: string;
    bookCallShort: string;
    home: string;
    mainNav: string;
    menu: string;
    language: string;
    skipToContent: string;
  };
  nav: Record<NavSection, string>;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    secondaryCta: string;
    reassurance: string;
    flowLabel: string;
    flowTitle: string;
    flow: Record<FlowKey, { title: string; detail: string }>;
    techIntro: string;
    techListLabel: string;
    restApis: string;
  };
  problems: {
    title: string;
    items: Record<ProblemKey, { title: string; text: string }>;
    callout: string;
    calloutCta: string;
  };
  transformation: {
    title: string;
    lead: string;
    before: { title: string; badge: string; steps: string[] };
    after: { title: string; badge: string; steps: string[] };
  };
  services: {
    title: string;
    lead: string;
    problemLabel: string;
    explore: string;
    items: Record<ServiceKey, { title: string; problem: string; solution: string; result: string }>;
  };
  solutions: {
    title: string;
    tabsLabel: string;
    cases: Record<CaseKey, { label: string; outcome: string; steps: string[] }>;
    missing: { title: string; text: string; cta: string };
  };
  automate: {
    title: string;
    lead: string;
    chipsLabel: string;
    when: string;
    result: string;
    note: string;
    cta: string;
    chips: Record<ChipKey, { label: string; trigger: string; steps: string[]; result: string }>;
  };
  process: {
    title: string;
    lead: string;
    /** `{n}` placeholder. */
    stepLabel: string;
    steps: Record<ProcessKey, { title: string; text: string }>;
    ctaNote: string;
  };
  about: {
    photoAlt: string;
    /** `{name}` placeholder, rendered bold. */
    caption: string;
    title: string;
    paragraphs: string[];
    skillsLabel: string;
    skills: string[];
  };
  demo: {
    title: string;
    lead: string;
    heading: string;
    builtWith: string;
    steps: string[];
    /** Index in `steps` that shows the priority badges. */
    priorityStep: number;
    priorities: { high: string; medium: string; low: string };
    outcome: string;
    cta: string;
    screenshotAlt: string;
    caption: string;
  };
  value: {
    title: string;
    people: string;
    hours: string;
    fewerPeople: string;
    morePeople: string;
    fewerHours: string;
    moreHours: string;
    workingDays: string;
    perMonth: string;
    unit: string;
    note: string;
    disclaimer: string;
  };
  firstCall: { title: string; paragraphs: string[]; cta: string; points: string[] };
  faq: {
    title: string;
    /** `{email}` placeholder, rendered as a mailto link. */
    intro: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    tagline: string;
    secondaryCta: string;
    reassurance: string;
    form: {
      title: string;
      name: string;
      company: string;
      email: string;
      message: string;
      messagePlaceholder: string;
      website: string;
      optional: string;
      websitePlaceholder: string;
      privacy: string;
      sendAnother: string;
    };
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    services: string[];
    companyTitle: string;
    company: { solutions: string; demo: string; about: string; faq: string; contact: string };
    contactTitle: string;
    /** `{year}` placeholder. */
    legal: string;
  };
  client: ClientMessages;
}
