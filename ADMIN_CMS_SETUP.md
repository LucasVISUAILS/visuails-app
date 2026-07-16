# Je website aanpassen zonder GitHub — /admin instellen (eenmalig, ~5 min)

Vanaf nu staat er een gratis, visuele admin-omgeving op **`https://visuails-app.pages.dev/admin/`**.
Daar pas je teksten, prijzen, FAQ's en afbeeldingen aan via formulieren — geen code, geen GitHub
meer nodig. Achter de schermen slaat het je wijzigingen nog steeds op als een commit in dezelfde
repo (zodat Cloudflare het automatisch live zet), maar jij ziet daar niets van.

Dit gebruikt **Decap CMS** (gratis, open source, wordt door duizenden sites gebruikt). Er is geen
apart backend-servertje voor nodig — GitHub regelt de beveiliging via een "OAuth App" die je zelf
in 5 minuten aanmaakt.

## Stap 1 — Maak een GitHub OAuth App aan

1. Log in op GitHub, klik rechtsboven op je profielfoto → **Settings**
2. Scroll helemaal naar beneden in het linkermenu naar **Developer settings**
3. Klik op **OAuth Apps** → **New OAuth App**
4. Vul in:
   - **Application name:** `VISUAILS Admin` (of iets wat je herkent)
   - **Homepage URL:** `https://visuails-app.pages.dev`
   - **Authorization callback URL:** `https://visuails-app.pages.dev/admin/`
5. Klik **Register application**

Je krijgt nu een **Client ID** te zien (een reeks letters/cijfers). Kopieer die.

**Belangrijk:** er wordt ook om een "Client secret" gevraagd op deze pagina — die heb je **niet**
nodig en hoef je niet aan te maken. Alleen de Client ID is nodig.

## Stap 2 — Zet de Client ID in de site

1. Open (in de uitgepakte map, of via GitHub) het bestand `public/admin/config.yml`
2. Zoek de regel:
   ```
   app_id: REPLACE_WITH_YOUR_GITHUB_OAUTH_CLIENT_ID
   ```
3. Vervang `REPLACE_WITH_YOUR_GITHUB_OAUTH_CLIENT_ID` door de Client ID die je net kopieerde
4. Sla op, en zorg dat dit bestand meegaat in je volgende upload/commit naar GitHub

## Stap 3 — Open je admin-omgeving

Ga naar `https://visuails-app.pages.dev/admin/`, klik **Login with GitHub**, geef toestemming
(je logt in met je eigen GitHub-account — alleen jij en mensen die je toegang geeft tot de repo
kunnen hierbij), en je ziet drie secties:

- **Services** — de 3 servicepagina's (tekst, prijs, FAQ's, afbeelding)
- **Areas We Serve** — de 8 landenpagina's (marktcontext, lokale info, industrieën)
- **Site Settings** — bedrijfsnaam, e-mail, telefoon, social links, openingstijden

Pas iets aan, klik **Publish** — binnen enkele minuten staat het live (zelfde automatische
Cloudflare-redeploy als altijd, alleen hoef je nooit meer een ZIP uit te pakken of bestanden in
GitHub te slepen).

## Wat kan wel/niet via de admin

**Wel:** alle tekst, prijzen, FAQ's, afbeeldingen van bestaande pagina's aanpassen.

**Niet (bewust uitgezet):** nieuwe service- of landenpagina's toevoegen of verwijderen via de
admin — dat kan per ongeluk de site breken (links, sitemap, schema die naar een pagina wijzen die
niet meer bestaat). Wil je een nieuw land of nieuwe service toevoegen? Laat het me weten, dan
bouw ik die pagina('s) erbij — kost me een paar minuten.

## Iemand anders toegang geven

Wil je dat een collega ook via `/admin` kan bewerken? Voeg diegene toe als **Collaborator** op de
GitHub-repo (repo → Settings → Collaborators) — ze loggen dan in met hun eigen GitHub-account,
geen gedeeld wachtwoord nodig.
