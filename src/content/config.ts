import { defineCollection, z } from 'astro:content';

// Data collections — no markdown body, just structured JSON. Each file's
// filename (minus .json) becomes its `id`/slug, e.g. catalog-images.json
// → slug "catalog-images". Edited either directly as JSON, or through the
// Decap CMS admin at /admin (see public/admin/config.yml) — both write to
// the exact same files, so nothing here needs to know which was used.

const services = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    metaName: z.string(),
    tagline: z.string(),
    shortDescription: z.string(),
    icon: z.string(),
    startingPrice: z.string(),
    priceUnit: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    keyBenefits: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    useCases: z.array(z.string()),
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),
    relatedServiceSlugs: z.array(z.string()),
  }),
});

const areas = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    mapQuery: z.string(),
    region: z.string(),
    marketContext: z.string(),
    whyRemoteWorks: z.string(),
    localFact: z.string(),
    industries: z.array(z.string()),
  }),
});

export const collections = { services, areas };
