/**
 * Page settings.
 * Rendered into the HTML at build time.
 */

/** Google Calendar appointment schedule URL. Empty hides the calendar and shows the contact form instead. */
export const CALENDAR_URL: string =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ZrIeI6Ub9SUcDUvofy5kq78PVc3S96_dO_OvkM2j9qXUupAMHV8QTUzazf_1PMcU7iNrxU1ri';

/** Demo receptionist number, as it should be shown, e.g. '+34 910 000 000'. Empty hides the "call and try it" button. */
export const DEMO_PHONE: string = '';

/** Contact number, as it should be shown, e.g. '+34 600 000 000'. Used for the call and WhatsApp links. Empty hides them. */
export const CONTACT_PHONE: string = '+34 607 075 548';

/**
 * Website owner, required in the legal notice by Spanish law (LSSI art. 10) and shown as data controller
 * in the privacy policy and next to the form. Empty fields are left out; without a name, "Agendia Labs" is shown.
 */
export const LEGAL_OWNER: { name: string; taxId: string; address: string } = { name: '', taxId: '', address: '' };

/** Date the legal notice and privacy policy were last changed, as YYYY-MM-DD. */
export const LEGAL_UPDATED: string = '2026-11-23';

/** Service that receives the contact form (e.g. 'Formspree'), listed as a recipient in the privacy policy. */
export const FORM_PROVIDER: string = 'Formspree';
