// Thin wrapper around site.json so page code keeps importing `{ site }` and
// `getSameAs()` unchanged. site.json itself is what the Decap CMS admin
// (/admin) edits — TODO fields (phone, social) are intentionally blank
// rather than filled with placeholder-looking fake data; see checklist.
// Update site.json directly (or via /admin) once you connect a custom
// domain — `url` drives canonical tags, sitemap, and schema @id everywhere.
import site from './site.json';

export { site };

export function getSameAs() {
  return Object.values(site.social).filter(Boolean);
}
