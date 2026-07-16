// Central business data. Fill in the blanks marked TODO before launch —
// left blank on purpose rather than filled with placeholder-looking fake data,
// since invented values (phone numbers, social handles) would ship straight
// into your JSON-LD and mislead both users and search engines.

export const site = {
  name: 'VISUAILS',
  legalName: 'VISUAILS',
  url: 'https://visuails-app.pages.dev', // TODO: replace with your custom domain once connected
  description:
    'VISUAILS creates AI-powered catalog images, lifestyle images, and product & campaign videos for ecommerce brands — up to 90% cheaper and 10x faster than a traditional shoot, 100% human-reviewed before delivery.',
  email: 'hello@visuails.com',
  telephone: '', // TODO: add if you want click-to-call in schema
  address: {
    locality: 'Enschede',
    country: 'NL',
  },
  hours: {
    days: 'Mo-Fr',
    opens: '08:00',
    closes: '20:00',
    timezone: 'CET/CEST',
  },
  social: {
    facebook: '', // TODO
    instagram: '', // TODO
    linkedin: '', // TODO
  },
  priceRange: '€€',
  logo: '/images/visuails-logo.webp',
  ogImage: '/images/visuails-og-share-ai-product-visuals.webp',
};

export function getSameAs() {
  return Object.values(site.social).filter(Boolean);
}
