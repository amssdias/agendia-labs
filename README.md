# Agendia Labs landing page

Bilingual (English / Spanish) marketing site for Agendia Labs, built from the Claude Design file
`DiasFlow Landing ES.dc.html` (Spanish) and `DiasFlow Landing v2.dc.html` (English).

- **Vite + TypeScript**, no UI framework.
- Every language is rendered to **static HTML at build time**, so each page is complete for
  search engines, social previews and visitors without JavaScript.
- Translations are **type-checked**: a key missing from one language fails the build.
- The browser script (~3.5 KB gzipped) only adds interaction.

## Quick start

Requires Node 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5173 (redirects to /en/ or /es/)
npm run build      # type-check, then build to dist/
npm run preview    # serve dist/ locally
```

## Project structure

```
index.html                 Root page: redirects to /en/ or /es/ by browser language
en/index.html              Entry shell per language; the build fills in <!--app-head--> / <!--app-body-->
es/index.html
vite.config.ts             Reads .env, registers the i18n plugin and the three HTML entries
.env                       Build settings (site URL, booking URL, form endpoint)
public/                    Copied as-is: favicon, placeholder images
src/
  site.ts                  Locales, default locale, SiteConfig type and defaults
  content/catalog.ts       Language-independent structure: keys, icons, ordering, calculator limits
  i18n/
    types.ts               Messages interface (the contract every language must satisfy)
    en.ts, es.ts           All copy
  render/                  Build-time only (runs in Node)
    page.ts                Assembles <head> (SEO, hreflang, JSON-LD) and <body> for one locale
    sections/*.ts          One function per page section, returning escaped HTML
    html.ts                `html` tagged template with auto-escaping, `fill()` for inline markup in translations
    icon.ts                Inlines only the Phosphor icons that are used
    components.ts          Shared bits: booking button, section heading, logo
  plugins/i18n-html.ts     Vite plugin: renders each /<locale>/index.html, emits sitemap.xml and robots.txt
  shared/format.ts         Number and plural formatting, used both at build time and in the browser
  client/                  Browser-only interaction
    main.ts                Entry point
    flow.ts                Hero "new lead to meeting" animation
    tabs.ts                Industry tabs (#solutions)
    chips.ts               Manual-task picker (#automate)
    roi.ts                 Hours calculator (#value)
    contact.ts             Contact form validation, submission and "jump to form" links
    header.ts              Mobile menu, active nav link, sticky mobile booking bar
    reveal.ts              Fade-in on scroll
  styles/
    main.css               Imports everything below
    tokens.css             Colours, fonts, spacing, radii — and the list of breakpoints
    base.css, layout.css, components.css
    sections/*.css         One file per section
```

## How the translations work

1. `src/content/catalog.ts` defines *what* is on the page: the services, use cases, tasks,
   process steps, with their keys and icons.
2. `src/i18n/types.ts` defines the `Messages` interface. Collections are typed as
   `Record<Key, …>` against the catalog keys, so every language must translate every item.
3. At build time (and on every request in dev), the `i18n-html` plugin renders each
   `/<locale>/index.html` with that language's messages.
4. Strings the browser script needs (form errors, calculator labels, animation status) come from
   `Messages.client` and are embedded in each page as `<script type="application/json" id="client-messages">`.
   `main.ts` has no copy of its own.

In the dev server, editing a template or translation triggers a full page reload with the new content.

### Editing copy

Change the text in `src/i18n/en.ts` and `src/i18n/es.ts`. Placeholders such as `{people}`,
`{email}` or `{name}` are filled in by the templates; keep them in both languages.

### Adding an item (for example a new service)

1. Add it to `SERVICES` in `src/content/catalog.ts` with a key and a
   [Phosphor icon](https://phosphoricons.com) name.
2. `npm run build`: TypeScript lists every language that is missing the new key.
3. Add the copy to each language file.

### Adding a language

1. Add the code to `LOCALES` and `LOCALE_NAMES` in `src/site.ts`.
2. Create `src/i18n/<code>.ts` implementing `Messages`, and register it in `src/i18n/index.ts`.
3. Copy `en/index.html` to `<code>/index.html` and change its `lang` attribute.
4. Add the code to the `supported` list in the root `index.html` redirect script.

The build inputs, hreflang tags, language switcher and sitemap pick it up from `LOCALES`.

## Configuration

Build-time settings live in `.env`. Put machine-specific overrides in `.env.local` (git-ignored),
or production values in `.env.production`.

| Variable | Default | Purpose |
|---|---|---|
| `SITE_URL` | `https://agendialabs.com` | Public URL of the site root, used for canonical URLs, hreflang, `og:url` and `sitemap.xml`. A path in it (`https://user.github.io/agendia-labs`) becomes the base path. |
| `SITE_BOOKING_URL` | `#contact` | Target of every "Book a call" button. `#contact` scrolls to the form; any other URL (e.g. Cal.com) opens in a new tab. |
| `SITE_FORM_ENDPOINT` | *(empty)* | URL the contact form POSTs to. Empty means the form opens a pre-filled email instead. |

These variables are deliberately not prefixed with `VITE_`: they are rendered into the HTML at
build time, so nothing extra is exposed to the client bundle.

The contact email and social links are in `SITE_DEFAULTS` in `src/site.ts`.

### Contact form endpoint

With `SITE_FORM_ENDPOINT` set, the form sends:

```http
POST <SITE_FORM_ENDPOINT>
Content-Type: application/json

{
  "name": "…",
  "company": "…",
  "email": "…",
  "message": "…",
  "website": "…",
  "locale": "en",
  "page": "https://agendialabs.com/en/"
}
```

Any 2xx response shows the thank-you state. Anything else, or a network error, shows an error
message pointing to the contact email.

For an **n8n webhook**: use a Webhook node with method `POST`, add your site's origin under
*Options → Allowed Origins (CORS)*, and respond with a 200. The browser sends a CORS preflight
because of the JSON content type.

## Before going live

- **Founder photo**: replace `public/img/founder.svg` with a 4:5 photo (e.g. `founder.jpg`, about
  920×1150), and update the `src` in `src/render/sections/about.ts`.
- **Workflow screenshot**: replace `public/img/demo-workflow.svg` with a 1600×1100 screenshot of
  the n8n workflow, and update the `src` in `src/render/sections/demo.ts`.
- **Social preview image**: add `public/og-image.png` (1200×630). The meta tags already point to
  `<SITE_URL>/og-image.png`.
- Set `SITE_FORM_ENDPOINT` (and `SITE_BOOKING_URL` if you use a calendar tool).

## Deployment

`npm run build` produces a fully static `dist/`:

```
dist/
  index.html        language redirect (noindex)
  en/index.html
  es/index.html
  assets/           hashed CSS and JS (safe to cache forever)
  img/, favicon.svg
  sitemap.xml, robots.txt
```

It works on any static host. The base path comes from `SITE_URL`: a URL with a path, such as
`https://user.github.io/agendia-labs`, builds the site for that subpath, and a bare domain builds it for
the root. The redirect on the root page runs in the browser.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`, and can also be
run by hand from the Actions tab.

One-time setup:

1. **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
2. Optional: under **Settings → Secrets and variables → Actions → Variables**, add repository variables:
   - `SITE_FORM_ENDPOINT`: contact form endpoint.
   - `SITE_BOOKING_URL`: external booking link. Leave unset to keep `#contact`.
   - `SITE_URL`: only if the public URL differs from what GitHub Pages reports.

`SITE_URL` defaults to the URL GitHub Pages reports for the repository:

- **Project page** (no custom domain): `https://<user>.github.io/<repo>`, so the site is built for the
  `/<repo>/` subpath.
- **Custom domain** (e.g. `agendialabs.com`): set it in **Settings → Pages → Custom domain** and point
  your DNS at GitHub. The next deploy picks up the new URL and builds for the root. No code or
  `CNAME` file changes are needed, because deployments from Actions use the domain set in Settings.

On a project page, `robots.txt` isn't at the domain root, so crawlers ignore it. The sitemap
is still valid and can be submitted in Google Search Console.

## Notes

- **Responsive behaviour** is done entirely in CSS. The breakpoints are listed at the top of
  `src/styles/tokens.css`. The desktop navigation starts at 1160px instead of the design's 1080px,
  because the added language switch doesn't fit at 1080px in Spanish.
- **Accessibility**:
  - A skip link, and ARIA tabs with arrow-key support.
  - The FAQ uses native `<details name="faq">`, so it works as an accordion without JavaScript.
  - Form errors are announced and linked to their fields.
  - `prefers-reduced-motion` disables the hero animation, the counters and the fade-ins.
- **External resources**: the Geist font loads from Google Fonts, and the n8n, Python, Django and
  PostgreSQL logos come from `cdn.simpleicons.org`. Everything else is self-hosted.
