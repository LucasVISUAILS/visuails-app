import { defineCollection, z } from 'astro:content';

// One "style" is a single purchasable option within a service (e.g. "VISUAILS
// Classic Catalog" or "Custom Brand Lifestyle"). Every service page renders
// its `styles` array as a row of cards — see src/components/StyleCard.astro.
const styleSchema = z.object({
  key: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  price: z.string().nullable(), // null = custom-quote pricing, no fixed number
  priceUnit: z.string(),
  isCustom: z.boolean(),
  features: z.array(z.string()),
  image: z.string(),
  imageAlt: z.string(),
  ctaLabel: z.string(),
});

const services = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    metaName: z.string(),
    tagline: z.string(),
    shortDescription: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    howItWorks: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    styles: z.array(styleSchema),
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),
  }),
});

export const collections = { services };
