import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Change this if you connect a custom domain (recommended for SEO — see README)
const SITE_URL = 'https://visuails-app.pages.dev';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
