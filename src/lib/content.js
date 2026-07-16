// Thin helpers over Astro Content Collections that flatten each entry to
// { slug, ...fields } — matching the shape the page templates were written
// against, so templates read `service.slug` / `service.name` etc. exactly
// as before, regardless of whether the underlying file was hand-edited or
// saved through the Decap CMS admin at /admin.
import { getCollection, getEntry } from 'astro:content';

export async function getAllServices() {
  const entries = await getCollection('services');
  return entries.map((e) => ({ slug: e.id, ...e.data }));
}

export async function getServiceBySlug(slug) {
  const entry = await getEntry('services', slug);
  return entry ? { slug: entry.id, ...entry.data } : undefined;
}

export async function getAllAreas() {
  const entries = await getCollection('areas');
  return entries.map((e) => ({ slug: e.id, ...e.data }));
}

export async function getAreaBySlug(slug) {
  const entry = await getEntry('areas', slug);
  return entry ? { slug: entry.id, ...entry.data } : undefined;
}
