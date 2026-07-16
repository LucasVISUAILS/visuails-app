# Live zetten (versie 3 — donker design + admin-editor)

Dit vervangt alles in je `visuails-app` GitHub-repo met:
- Een donker, modern/techy redesign van dezelfde 42 pagina's
- Een gratis visuele admin-omgeving op `/admin` (zie `ADMIN_CMS_SETUP.md` — eenmalig 5 min instellen)
- Dezelfde 42 pagina's, nu opgeslagen als losse bestanden per service/land, zodat de admin-editor
  en handmatig bewerken beide werken

## Stap 1 — Pak de ZIP uit
Dezelfde structuur als eerder (`src/`, `public/`, `astro.config.mjs`, `package.json`) plus een
nieuwe map `src/content/` en `public/admin/`.

## Stap 2 — Verwijder de oude bestanden in GitHub
1. Ga naar `https://github.com/LucasVISUAILS/visuails-app`
2. Selecteer alle bestaande bestanden/mappen en verwijder ze

## Stap 3 — Upload de nieuwe bestanden
1. Klik **Add file → Upload files**
2. Sleep de **inhoud** van de uitgepakte map erin (dus `src`, `public`, `astro.config.mjs`,
   `package.json`, etc. zelf — niet de omvattende map)
3. Scroll naar beneden, klik **Commit changes**

## Stap 4 — Wachten op Cloudflare
Automatische redeploy, meestal 2-3 minuten. Geen instellingen hoeven te wijzigen.

## Stap 5 — Check de site
Ga naar `https://visuails-app.pages.dev/` — nieuw donker design, dezelfde paginastructuur.

## Stap 6 — Stel de admin-editor in (eenmalig)
Open `ADMIN_CMS_SETUP.md` in deze map en volg de stappen (~5 minuten). Daarna kun je alle tekst,
prijzen en afbeeldingen aanpassen via `https://visuails-app.pages.dev/admin/` — geen GitHub meer
nodig voor gewone tekstwijzigingen.

## Daarna
Open `VISUAILS-SEO-REBUILD.md` voor het volledige rapport: sitemap, SEO-breakdown, schema
JSON-LD voorbeelden, linkstructuur, en een checklist van dingen die alleen jij kan invullen
(telefoonnummer, social links, echte juridische pagina's, en de echte AI-gegenereerde foto's
swappen — links staan in dat rapport).
