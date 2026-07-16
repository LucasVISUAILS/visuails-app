import { services } from '../data/services.js';
import { areas } from '../data/areas.js';
import { site } from '../data/site.js';

// Hand-written sitemap (see astro.config.mjs for why this replaced
// @astrojs/sitemap). Deliberately excludes /privacy-policy/ and /terms/,
// which are marked noindex until real legal copy replaces the placeholders.
export async function GET() {
  const urls = [];
  const add = (path, priority) => urls.push({ loc: `${site.url}${path}`, priority });

  add('/', '1.0');
  add('/services/', '0.9');
  services.forEach((s) => add(`/services/${s.slug}/`, '0.8'));
  add('/areas/', '0.9');
  areas.forEach((a) => {
    add(`/areas/${a.slug}/`, '0.8');
    services.forEach((s) => add(`/areas/${a.slug}/${s.slug}/`, '0.7'));
  });
  add('/faq/', '0.6');
  add('/contact/', '0.6');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
