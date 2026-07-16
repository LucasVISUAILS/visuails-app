# VISUAILS — v4 Rebuild: Architecture & Implementation Report

Rebuilt on [Astro](https://astro.build), static output, deployed to Cloudflare Pages. This is the
third visual/structural pass: v1 was the original SEO rebuild (area-based), v2 shipped a dark/techy
redesign, and this **v4** is a full information-architecture and design reset based on your
feedback — calmer, sleeker, and built around explaining the product visually instead of listing
service-area pages.

**What changed structurally vs. earlier versions:**

- **"Areas We Serve" removed entirely.** VISUAILS ships worldwide and digitally — there's no
  local/regional angle to sell, so the 8 country pages, the areas hub, and all `/areas/*` schema
  and sitemap entries are gone. `areaServed` across all schema is now a single broad
  `{ "@type": "Place", "name": "Worldwide (digital delivery)" }`.
- **Services moved from a flat list to a styles model.** Each of the 3 services (Catalog,
  Lifestyle, Video) is one page with several selectable **styles** underneath it (e.g. Catalog has
  "Classic" and "Custom Brand"; Lifestyle has "Phone-Made", "Glow", "Flash", "Dunes", and "Custom
  Brand"; Video has "Motion", "Lifestyle Video", "Campaign Video", and "Custom Campaign") — matching
  how the real service pages on visuails.com are structured, and how you described wanting every
  style to include its own custom option.
- **New homepage flow**, built section-by-section per your spec: hero (before/after phone mockup)
  → interactive process demo → services → models (10 standard + custom) → stats → before/after →
  photo carousel → Test Sample CTA → About → "Let's Grow Together" contact CTA → footer.
- **New `/test-sample/` → `/request-test-sample/` funnel**, replacing a single generic contact
  flow with a dedicated explanation page and a placeholder request form (WhatsApp-based — no
  backend yet, see checklist).
- **WhatsApp is now the primary contact channel** everywhere a service/style is shown, in addition
  to email — matching your instruction that every service should have a WhatsApp CTA.

---

## 1. Full Sitemap Structure

```
/                                Home
/catalog/                        Service (styles: Classic, Custom Brand)
/lifestyle/                      Service (styles: Phone-Made, Glow, Flash, Dunes, Custom Brand)
/video/                          Service (styles: Motion, Lifestyle Video, Campaign Video, Custom Campaign)
/test-sample/                    Explains the €0.99 test sample
/request-test-sample/            Request form (noindex — placeholder, see checklist)
/faq/
/contact/
/privacy-policy/                 (noindex — placeholder, see checklist)
/terms/                          (noindex — placeholder, see checklist)

+ /sitemap.xml                   (hand-written endpoint — excludes noindexed pages)
+ /robots.txt
```

**10 indexable pages** (2 noindexed placeholders excluded from `sitemap.xml`), generated from 3
content files (`src/content/services/*.json`) plus one settings file (`src/data/site.json`) — not
hand-duplicated per page. Adding a 4th style to any service (e.g. a new Lifestyle look) is a matter
of adding one object to that service's `styles` array — the style card, its schema `Offer` entry,
and its WhatsApp CTA all render automatically.

---

## 2. Page-by-Page SEO Breakdown

| Page | Title tag | H1 |
|---|---|---|
| Home | `VISUAILS — AI-Powered Product Visuals for Ecommerce Brands` | `The Brand You Envisioned, Visualized` |
| Catalog | `AI Catalog Images — From €19 \| VISUAILS` | `Catalog Images` |
| Lifestyle | `AI Lifestyle Images — From €35 \| VISUAILS` | `Lifestyle Images` |
| Video | `Product & Campaign Video \| VISUAILS` | `Product & Campaign Video` |
| Test Sample | `Try a €0.99 Test Sample \| VISUAILS` | `Try VISUAILS Before You Order` |
| Request Sample | `Request Your Test Sample \| VISUAILS` (noindex) | `Request Your €0.99 Test Sample` |
| FAQ | `FAQ — AI Product Visuals for Ecommerce` | `Frequently Asked Questions` |
| Contact | `Contact VISUAILS` | `Get In Touch` |

### Worked example: `/catalog/`
- **Title:** `AI Catalog Images — From €19 | VISUAILS` (41 chars)
- **Meta description:** "Turn a single product photo into a full catalog of consistent,
  grid-ready visuals for your storefront and marketplaces — human-reviewed, delivered in hours.
  From €19 per visual." (~185 chars — see checklist for a trim pass)
- **URL:** `/catalog/`
- **H1:** `Catalog Images`
- **H2s:** "How It Works", "Styles" (one per style card), "Refined to Perfection" (stats), a
  before/after section, a gallery, "Frequently Asked Questions"
- **H3s:** one per how-it-works step (3), one per style name, one per FAQ (3)

**URL structure principles applied:** all lowercase, hyphenated, trailing slash (Astro static
default), no stop-word bloat, primary keyword leads the slug (`/catalog/`, `/lifestyle/`,
`/video/` — matching the real visuails.com URL pattern you asked me to check).

---

## 3. Schema — JSON-LD Examples

### 3.1 Organization (site-wide, one instance, in every page's `<head>`)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://visuails-app.pages.dev/#organization",
  "name": "VISUAILS",
  "url": "https://visuails-app.pages.dev",
  "description": "VISUAILS creates AI-powered catalog images, lifestyle images, and product & campaign videos for ecommerce and fashion brands...",
  "priceRange": "€€",
  "address": { "@type": "PostalAddress", "addressLocality": "Enschede", "addressCountry": "NL" },
  "areaServed": { "@type": "Place", "name": "Worldwide (digital delivery)" },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@visuails.com",
    "url": "https://wa.me/31625436130",
    "contactType": "customer service"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "09:00", "closes": "20:00" }
  ]
}
```

### 3.2 Service — with styles as an offer catalog
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Catalog Images",
  "serviceType": "Catalog Images",
  "provider": { "@id": "https://visuails-app.pages.dev/#organization" },
  "areaServed": { "@type": "Place", "name": "Worldwide (digital delivery)" },
  "url": "https://visuails-app.pages.dev/catalog/",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catalog Images Styles",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "VISUAILS Classic Catalog" }, "priceCurrency": "EUR", "price": "19" }
    ]
  }
}
```
Only priced styles (`price` set) appear in the offer catalog — custom/quote-based styles
(`price: null`) are described in copy instead, so the schema never claims a fixed price for a
service that's actually quoted per brand.

### 3.3 BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visuails-app.pages.dev/" },
    { "@type": "ListItem", "position": 2, "name": "Catalog Images", "item": "https://visuails-app.pages.dev/catalog/" }
  ]
}
```

### 3.4 FAQPage (service pages, FAQ page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What quality photo do I need to upload?",
      "acceptedAnswer": { "@type": "Answer", "text": "A clear, well-lit phone or camera photo of your product is enough..." }
    }
  ]
}
```

All schema is generated automatically per page by the components in `src/components/schema/` —
nothing above is hand-maintained per page.

---

## 4. Internal Linking Plan

1. **Home →** all 3 services (services grid + header nav), models section → custom-model WhatsApp
   CTA, Test Sample CTA band, Contact + WhatsApp in the final CTA band, full footer.
2. **Each service page (`/catalog/`, `/lifestyle/`, `/video/`) →** every style's own CTA (primary
   + WhatsApp), a before/after section, a photo gallery, FAQ, and a closing CTA band linking to
   Contact and WhatsApp.
3. **Test Sample →** Request Sample (primary CTA, repeated twice on the page) and WhatsApp
   ("Ask a Question").
4. **Request Sample →** back to Test Sample via breadcrumb; submits into a pre-filled WhatsApp
   message rather than a dead end.
5. **Footer (every page) →** all 3 services, Test Sample, FAQ, Contact, legal pages — a permanent
   sitewide crawl path so no page is more than 2 clicks from the footer.
6. **Header →** Services dropdown (all 3), Test Sample, FAQ, Contact, plus a persistent WhatsApp
   CTA button in the header itself.

---

## 5. Image Naming Structure

Convention: `visuails-{context}-{purpose}.webp` — lowercase, hyphenated, no stop words. Full
manifest (68 files) generated for this v4 pass, covering the hero transform visual, the interactive
process demo, 10 model cards, homepage/service before-after pairs, an 8-image homepage carousel,
6-image galleries per service, every style card, and sitewide assets (logo, OG share image, test
sample input guideline examples).

**On the actual imagery:** this sandbox's network cannot pull AI-generated image bytes back down
(a sandbox restriction — confirmed structural this session, not a one-off failure), so every image
currently shipped is a programmatically generated placeholder: near-black background, a single
soft blurred glow, thin border, and a label identifying what the real photo should show — designed
to match the calm, non-flashy dark aesthetic you approved, so the site looks coherent even before
the real photography is swapped in. Once `/admin` is set up (see `ADMIN_CMS_SETUP.md`), replacing
any placeholder is a drag-and-drop through the Services/Settings image fields — same filename,
same spot, no code or GitHub upload needed.

---

## 6. What Changed in v4 (This Rebuild)

- **Removed:** `/areas/*` (8 country pages + hub), `src/content/areas/`, `MapEmbed.astro`, the old
  `/services/` hub and flat per-service pages, and every reference to service-area schema.
- **Content model:** services are now `styles`-based (see `src/content/config.ts`) instead of the
  old flat `keyBenefits`/`useCases`/`relatedServiceSlugs` shape — this is what lets each service
  page show multiple selectable options with their own price, features, and image.
- **Design system:** calmer dark palette — one flat surface color, one accent blue, a single soft
  vignette glow instead of the multi-color neon-glow treatment from v3 (per your "niet zo flashy"
  feedback). Typography moved from `Space Grotesk`/`JetBrains Mono` to `Plus Jakarta Sans` (body/
  headings) with `Instrument Serif` italic reserved for a small number of accent words — a quieter
  premium feel rather than a techy one.
- **New reusable components:** `StatsGrid`, `StyleCard`, `BeforeAfter`, `Carousel` (CSS
  scroll-snap, no JS), `ModelsSection`, `InteractiveProcessDemo` (pure-CSS tab switching via
  `:has()`, no JavaScript needed for the interactive demo), and `ServicePageContent` (the shared
  body all 3 service pages render through, so Catalog/Lifestyle/Video stay structurally consistent).
- **`public/admin/config.yml`** rewritten to match the new content model (styles list per service
  instead of the old flat fields, areas collection removed, Site Settings expanded to cover
  WhatsApp, KVK/VAT, hours, About text, and the homepage stats grid).
- **`sitemap.xml.js`** updated for the new URL list, and now explicitly excludes
  `/request-test-sample/` since that page is `noindex`.

## 7. Final Implementation Checklist

**Before you upload to GitHub:**
- [ ] Nothing — the zip is ready to upload as-is and will build successfully on Cloudflare Pages
  (static output, same proven config as your last working deploy).

**One-time, to unlock the admin editor (if not already done in v3):**
- [ ] Follow `ADMIN_CMS_SETUP.md` (~5 minutes) to create a GitHub OAuth App and drop its Client ID
  into `public/admin/config.yml`. If you already did this in v3, the same Client ID still works —
  nothing to redo.

**Before you consider this launch-ready:**
- [ ] Swap the 68 placeholder images for real product photography / AI-generated visuals — same
  filenames, drop-in replacement via `/admin` once it's set up (Services → pick a style/page →
  image field), or by re-uploading to `public/images/` in GitHub with the same filename.
- [ ] Update `site.url` in `astro.config.mjs` and `src/data/site.json` once you connect a custom
  domain — right now canonical tags, sitemap, and schema `@id` all point at
  `visuails-app.pages.dev`.
- [ ] `src/data/site.json` phone/social fields: `social.facebook`/`instagram`/`linkedin` are still
  blank — I didn't want to invent handles that ship straight into your JSON-LD. Fill these in via
  `/admin` → Site Settings whenever you're ready.
- [ ] Replace `/privacy-policy/` and `/terms/` placeholder content with real legal text (ideally
  reviewed by a legal professional) — both stay `noindex` until then.
- [ ] `/request-test-sample/` is a placeholder form: it doesn't take payment or store submissions
  yet — it opens a pre-filled WhatsApp message so you can handle the €0.99 sample request and
  payment manually for now. You told me this is fine for a first version ("dat maken we later wel
  af") — say the word when you want the real self-service flow (payment provider, file upload,
  automated delivery) and I'll scope that as its own build.
- [ ] Decide whether to keep or rebuild the old demo upload tool (`/app`, `/login`, `/signup`) from
  an earlier version — this rebuild focused specifically on the marketing/conversion site per your
  brief and doesn't include it.

**Technical/Core Web Vitals — already handled:**
- [x] Static output (no server round-trip, fastest possible TTFB on Cloudflare's edge).
- [x] `loading="lazy"` on below-the-fold images; explicit `width`/`height` everywhere (prevents CLS).
- [x] Minimal JS — the interactive process demo, style tabs, and carousels are pure CSS
  (`:has()` + `scroll-snap`); the only JavaScript on the site is the small progressive-enhancement
  script on `/request-test-sample/` that builds the WhatsApp message.
- [x] `src/pages/sitemap.xml.js` generates `/sitemap.xml` at build time from the same content
  files, referenced from `robots.txt`, and excludes noindexed pages.
- [x] One `<link rel="canonical">` per page, self-referencing.
- [x] Placeholder images are small (5–10 KB each) so they don't hurt LCP while real photography is
  pending — swapping in final imagery will change these numbers, so it's worth re-checking Core
  Web Vitals once the real photos are in.
