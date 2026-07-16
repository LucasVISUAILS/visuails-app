# Live zetten (versie 4 — rustiger design + nieuwe paginastructuur)

Dit vervangt alles in je `visuails-app` GitHub-repo met:
- Een volledig nieuwe, rustigere homepage-opbouw (hero met before/after, interactieve demo,
  services, modellen, statistieken, before/after, fotocarrousel, Test Sample CTA, About, contact-CTA)
- Servicepagina's per stijl: `/catalog/`, `/lifestyle/`, `/video/` — elk met meerdere selecteerbare
  stijlen (bijv. Classic/Custom bij Catalog), in plaats van één generieke pagina per dienst
- Een nieuwe funnel: `/test-sample/` (uitleg) → `/request-test-sample/` (aanvraagformulier via
  WhatsApp — een klein eerste voorbeeld, we maken dit later af zoals afgesproken)
- **"Areas We Serve" is volledig verwijderd** — je verzendt wereldwijd, dus die 8 landenpagina's
  waren overbodig
- WhatsApp-knoppen bij elke dienst/stijl, naast de bestaande admin-editor op `/admin`

## Stap 1 — Pak de ZIP uit
Dezelfde structuur als eerder (`src/`, `public/`, `astro.config.mjs`, `package.json`,
`public/admin/`).

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
Ga naar `https://visuails-app.pages.dev/` — nieuwe homepage-opbouw, nieuwe servicepagina's
(`/catalog/`, `/lifestyle/`, `/video/`), en de nieuwe `/test-sample/`-pagina.

## Stap 6 — Admin-editor (had je in v3 al ingesteld? dan hoeft dit niet opnieuw)
Als je `/admin` nog niet had ingesteld: open `ADMIN_CMS_SETUP.md` in deze map en volg de stappen
(~5 minuten). Had je dit al gedaan? Dan werkt je bestaande Client ID gewoon door — niets opnieuw
instellen. Wel is het scherm binnen `/admin` iets veranderd: services hebben nu een lijst met
**stijlen** per pagina in plaats van één set velden, en "Areas We Serve" is uit het menu verdwenen.

## Let op: de afbeeldingen zijn nog placeholders
Alle 68 afbeeldingen in deze versie zijn gegenereerd als rustige, donkere placeholder-graphics met
een label erop (bijv. "Catalog · VISUAILS Classic Catalog") — dit is een technische beperking van
deze sandbox, niet een keuze. De site werkt en ziet er meteen samenhangend uit, maar de echte
productfoto's/AI-visuals moet je nog toevoegen. Zodra `/admin` werkt kun je dat per afbeelding
zelf doen (Services → kies een stijl → afbeeldingsveld), zonder GitHub.

## Daarna
Open `VISUAILS-SEO-REBUILD.md` voor het volledige rapport: sitemap, SEO-breakdown, schema
JSON-LD voorbeelden, linkstructuur, en een checklist van dingen die alleen jij kan invullen
(social links, echte juridische pagina's, en de echte foto's/video's swappen).
