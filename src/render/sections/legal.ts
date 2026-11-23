import { CONTACT_PHONE, FORM_PROVIDER, LEGAL_OWNER, LEGAL_UPDATED } from '../../content/config.ts';
import { localePath, type PageKey } from '../../site.ts';
import { orTodo, telHref } from '../components.ts';
import type { RenderContext } from '../context.ts';
import { fill, html, type HtmlValue } from '../html.ts';
import { icon } from '../icon.ts';

function identity({ t, site }: RenderContext) {
  const i = t.legal.identity;
  const rows: [string, HtmlValue][] = [
    [i.owner, orTodo(LEGAL_OWNER.name)],
    [i.taxId, orTodo(LEGAL_OWNER.taxId)],
    [i.address, orTodo(LEGAL_OWNER.address)],
    [i.email, html`<a href="mailto:${site.email}">${site.email}</a>`],
  ];
  if (CONTACT_PHONE) rows.push([i.phone, html`<a href="${telHref(CONTACT_PHONE)}">${CONTACT_PHONE}</a>`]);
  return html`<dl class="legal__identity">${rows.map(([term, value]) => html`<div><dt>${term}</dt><dd>${value}</dd></div>`)}</dl>`;
}

const formatDate = (locale: string, isoDate: string) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${isoDate}T00:00:00Z`));

export function legalPage(ctx: RenderContext, page: PageKey) {
  const { t, site, locale } = ctx;
  const copy = t.legal.pages[page];
  const slots = {
    email: html`<a href="mailto:${site.email}">${site.email}</a>`,
    formProvider: orTodo(FORM_PROVIDER),
    privacyLink: html`<a href="${localePath(site, locale, 'privacy')}">${t.legal.pages.privacy.title.toLocaleLowerCase(locale)}</a>`,
    aepd: html`<a href="https://www.aepd.es" rel="noopener">www.aepd.es</a>`,
    todo: orTodo(''),
  };
  const updated = LEGAL_UPDATED ? formatDate(locale, LEGAL_UPDATED) : orTodo('');
  return html`
<main id="main" class="legal">
  <div class="container legal__inner">
    <a href="${localePath(site, locale)}" class="legal__back">${icon('arrow-left')}${t.legal.back}</a>
    <h1 class="legal__title">${copy.title}</h1>
    <p class="legal__updated">${fill(t.legal.updated, { date: updated })}</p>
    ${copy.sections.map(
      section => html`
    <section class="legal__section">
      <h2>${section.heading}</h2>
      ${section.blocks.map(block =>
        Array.isArray(block)
          ? html`<ul>${block.map(item => html`<li>${fill(item, slots)}</li>`)}</ul>`
          : html`<p>${fill(block, slots)}</p>`,
      )}
      ${section.identity && identity(ctx)}
    </section>`,
    )}
  </div>
</main>`;
}
