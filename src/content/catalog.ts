/**
 * Language-independent structure of the page: keys, icons and how items relate to each other.
 * Translations in src/i18n are keyed by these, so a key added here fails type-checking
 * until every locale translates it.
 */

export const NAV_SECTIONS = ['services', 'solutions', 'how-it-works', 'about', 'faq'] as const;
export type NavSection = (typeof NAV_SECTIONS)[number];

export const FLOW = [
  { key: 'lead', icon: 'user-plus' },
  { key: 'qualify', icon: 'sparkle' },
  { key: 'crm', icon: 'address-book' },
  { key: 'followUp', icon: 'whatsapp-logo' },
  { key: 'meeting', icon: 'calendar-check' },
] as const;
export type FlowKey = (typeof FLOW)[number]['key'];

export const TECH = [
  { name: 'n8n', logo: 'n8n', size: 22 },
  { name: 'OpenAI', icon: 'open-ai-logo' },
  { name: 'Python', logo: 'python', size: 22 },
  { name: 'Django', logo: 'django', size: 20 },
  { name: 'PostgreSQL', logo: 'postgresql', size: 22 },
] as const;

export const PROBLEMS = [
  { key: 'slowFollowUp', icon: 'hourglass-medium' },
  { key: 'copying', icon: 'copy' },
  { key: 'repeatQuestions', icon: 'chats-circle' },
  { key: 'memory', icon: 'brain' },
  { key: 'disconnected', icon: 'link-break' },
] as const;
export type ProblemKey = (typeof PROBLEMS)[number]['key'];

export const CHIPS = [
  { key: 'followups', icon: 'arrow-bend-up-right' },
  { key: 'crm', icon: 'address-book' },
  { key: 'questions', icon: 'chats-circle' },
  { key: 'email', icon: 'envelope-simple' },
  { key: 'reports', icon: 'chart-bar' },
  { key: 'data', icon: 'keyboard' },
  { key: 'reminders', icon: 'alarm' },
  { key: 'invoices', icon: 'receipt' },
  { key: 'notifications', icon: 'bell-ringing' },
  { key: 'onboarding', icon: 'handshake' },
] as const;
export type ChipKey = (typeof CHIPS)[number]['key'];
export const DEFAULT_CHIP: ChipKey = 'followups';

/** `chip` is the task the "Explore automation" link preselects in the #automate section. */
export const SERVICES = [
  { key: 'lead', icon: 'crosshair', chip: 'followups' },
  { key: 'whatsapp', icon: 'whatsapp-logo', chip: 'questions' },
  { key: 'crm', icon: 'address-book', chip: 'crm' },
  { key: 'workflow', icon: 'flow-arrow', chip: 'data' },
  { key: 'backend', icon: 'plugs-connected', chip: 'notifications' },
  { key: 'agents', icon: 'robot', chip: 'onboarding' },
] as const satisfies readonly { key: string; icon: string; chip: ChipKey }[];
export type ServiceKey = (typeof SERVICES)[number]['key'];

/** `steps` are the icons of each step; their labels live in the translations, in the same order. */
export const CASES = [
  { key: 'real-estate', icon: 'house-line', steps: ['globe-simple', 'funnel', 'address-book', 'whatsapp-logo', 'calendar-check'] },
  { key: 'clinics', icon: 'first-aid-kit', steps: ['envelope-simple', 'chat-circle-text', 'list-checks', 'calendar-plus', 'bell-ringing'] },
  { key: 'service', icon: 'wrench', steps: ['browser', 'ranking', 'address-book', 'paper-plane-tilt', 'bell-ringing'] },
  { key: 'agencies', icon: 'briefcase', steps: ['handshake', 'address-book', 'kanban', 'files', 'bell-ringing', 'envelope-open'] },
] as const;
export type CaseKey = (typeof CASES)[number]['key'];
export const DEFAULT_CASE: CaseKey = 'real-estate';

export const PROCESS = [
  { key: 'discover', icon: 'magnifying-glass' },
  { key: 'design', icon: 'compass-tool' },
  { key: 'build', icon: 'code' },
  { key: 'launch', icon: 'rocket-launch' },
  { key: 'improve', icon: 'arrows-clockwise' },
] as const;
export type ProcessKey = (typeof PROCESS)[number]['key'];

/** Working days per month in the hours calculator. */
export const ROI_WORKING_DAYS = 20;
export const ROI_DEFAULTS = { people: 2, hours: 1 };
export const ROI_LIMITS = { people: { min: 1, max: 50, step: 1 }, hours: { min: 0.5, max: 8, step: 0.5 } };
