import { getAllServices } from '../lib/content.js';
import { site } from '../data/site.js';

// Hand-written sitemap (see astro.config.mjs for why this replaced
// @astrojs/sitemap). Excludes /privacy-policy/ and /terms/, which are
// marked noindex until real legal copy replaces the placeholders.
export async function GET() {
  const services = await getAllServices();
  const urls = [];
  const add = (path, priority) => urls.push({ loc: `${site.url}${path}`, priority });

  add('/', '1.0');
  services.forEach((s) => add(`/${s.slug}/`, '0.9'));
  add('/test-sample/', '0.8');
  // /request-test-sample/ is intentionally excluded — it's marked noindex
  // (placeholder form, no real backend yet) so it shouldn't be submitted to search engines.
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
