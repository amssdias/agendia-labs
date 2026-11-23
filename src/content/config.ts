/**
 * Page settings.
 * Rendered into the HTML at build time.
 */

/** Google Calendar appointment schedule URL. Empty hides the calendar and shows the contact form instead. */
export const CALENDAR_URL: string = '';

/** Demo receptionist number, as it should be shown, e.g. '+34 910 000 000'. Empty hides the "call and try it" button. */
export const DEMO_PHONE: string = '';

/** Shows the case study block. Keep it off until the client has approved it. */
export const SHOW_CASE_STUDY: boolean = false;

/** Contact number, as it should be shown, e.g. '+34 600 000 000'. Used for the call and WhatsApp links. Empty hides them. */
export const CONTACT_PHONE: string = '';

/**
 * Website owner, required in the legal notice by Spanish law (LSSI art. 10) and shown as data controller
 * in the privacy policy and next to the form. Empty fields show as "TODO" on the page.
 */
export const LEGAL_OWNER: { name: string; taxId: string; address: string } = { name: '', taxId: '', address: '' };

/** Date the legal notice and privacy policy were last changed, as YYYY-MM-DD. */
export const LEGAL_UPDATED: string = '';

/** Service that receives the contact form (e.g. 'Formspree'), listed as a recipient in the privacy policy. */
export const FORM_PROVIDER: string = '';
