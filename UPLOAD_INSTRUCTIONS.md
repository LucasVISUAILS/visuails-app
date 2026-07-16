# How to Put This Live (Replaces Your Current Site)

This is a full rebuild — it replaces everything in your `visuails-app` GitHub repo with a new
SEO-structured site (42 pages: home, 3 services, 8 "areas we serve" country pages, 24
area+service pages, FAQ, contact).

## Step 1 — Extract this ZIP
Unzip it. You'll see the same kind of folder structure as before (`src/`, `public/`,
`astro.config.mjs`, `package.json`).

## Step 2 — Clear out the old repo content
1. Go to your repo: `https://github.com/LucasVISUAILS/visuails-app`
2. Select every file/folder and delete them (or delete the repo and create a fresh one named
   `visuails-app` — either works, since Cloudflare Pages is already connected to that repo name).

## Step 3 — Upload the new files
1. Click **Add file → Upload files**
2. Drag the **entire unzipped folder's contents** in (not the zip itself — the files and folders
   inside it: `src`, `public`, `astro.config.mjs`, `package.json`, etc.)
3. Scroll down, click **Commit changes**

## Step 4 — Wait for Cloudflare
Cloudflare Pages will detect the new commit and redeploy automatically — same as last time,
usually 2–3 minutes. No settings need to change (build command `npm run build`, output `dist`
are already configured and proven working).

## Step 5 — Check the live site
Visit `https://visuails-app.pages.dev/` and click through: Services, Areas We Serve, an
area+service page (e.g. `/areas/united-states/catalog-images/`), FAQ, Contact.

## After that
Open `VISUAILS-SEO-REBUILD.md` in this same folder — it's the full report: sitemap, SEO
breakdown, schema examples, linking plan, image naming, and a checklist of the handful of
things only you can fill in (phone number, social links, real legal pages, and swapping in the
real AI-generated photos from the links in that report).
