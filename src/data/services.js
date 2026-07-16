// Core service definitions. Every service page (and every area-service page)
// is generated from this single source of truth — edit here, not per-page.

export const services = [
  {
    slug: 'catalog-images',
    name: 'Catalog Images',
    metaName: 'AI Catalog Images',
    tagline: 'Consistent, ecommerce-ready product photos without a studio shoot',
    shortDescription:
      'Turn raw product shots into clean, consistent catalog visuals for your product listings — every angle, every SKU, matched in lighting and background.',
    icon: 'catalog',
    startingPrice: '19',
    priceUnit: 'per visual',
    heroImage: '/images/visuails-catalog-images-ecommerce-product-photography-hero.webp',
    heroImageAlt:
      'AI-generated ecommerce catalog product photo with consistent studio lighting and clean background',
    keyBenefits: [
      {
        title: 'Studio-consistent results',
        description:
          'Every SKU gets the same lighting, angle logic, and background treatment, so your storefront looks like one coherent shoot — even across hundreds of products.',
      },
      {
        title: 'No photographer, no studio',
        description:
          'Upload your raw product photos (even phone shots) and get back marketplace-ready catalog images without booking a single production day.',
      },
      {
        title: 'Marketplace-ready formats',
        description:
          'Delivered pre-sized and background-cleaned for Shopify, Amazon, Bol.com, Zalando and other major marketplaces.',
      },
      {
        title: 'Human-reviewed before delivery',
        description:
          'Every image passes a human quality check before it reaches you — no AI artifacts, no mismatched proportions.',
      },
    ],
    useCases: [
      'Fashion & apparel flat-lays and ghost mannequin shots',
      'Furniture and homeware product listings',
      'Electronics and gadget catalog photography',
      'Food & beverage packaging shots',
    ],
    faqs: [
      {
        q: 'What quality photos do I need to upload?',
        a: 'A clear, well-lit phone or camera photo of your product is enough — our process standardizes lighting, background, and framing from there. We’ll flag anything too low-resolution to work with before you’re charged.',
      },
      {
        q: 'How many revisions are included?',
        a: 'Every catalog image includes one round of revisions as part of the price. Additional revisions can be requested at a small added cost.',
      },
      {
        q: 'How fast will I get my catalog images?',
        a: 'Most catalog batches are delivered within hours, not days — typically same-day for orders placed before 3pm CET.',
      },
    ],
    relatedServiceSlugs: ['lifestyle-images', 'product-campaign-videos'],
  },
  {
    slug: 'lifestyle-images',
    name: 'Lifestyle Images',
    metaName: 'AI Lifestyle Images',
    tagline: 'Full styled campaign visuals with consistent AI models — no photoshoot needed',
    shortDescription:
      'Show your products in real-world, styled scenes with a consistent AI model across every image — the kind of campaign content that used to require a full production day.',
    icon: 'lifestyle',
    startingPrice: '19',
    priceUnit: 'per visual',
    heroImage: '/images/visuails-lifestyle-images-ai-model-fashion-campaign-hero.webp',
    heroImageAlt:
      'AI-generated lifestyle fashion campaign photo showing a consistent model wearing a product in a styled real-world scene',
    keyBenefits: [
      {
        title: 'The same AI model, every shot',
        description:
          'Lock in a consistent model, styling, and tone across your entire lifestyle set — no continuity issues between images the way multi-day shoots often have.',
      },
      {
        title: 'No models, stylists, or locations to book',
        description:
          'Skip the logistics of casting, studio rental, and location scouting. You describe the scene and product; we generate the campaign.',
      },
      {
        title: 'Scene and mood control',
        description:
          'From minimal studio lifestyle to full outdoor or in-home scenes, art direction is built into every brief.',
      },
      {
        title: '100% human-reviewed',
        description:
          'A human reviewer checks proportions, product accuracy, and realism before any image is delivered.',
      },
    ],
    useCases: [
      'Fashion and apparel campaign imagery',
      'Jewelry and accessories worn on-model',
      'Home and lifestyle product staging',
      'Seasonal and social-first campaign content',
    ],
    faqs: [
      {
        q: 'Can I reuse the same AI model across multiple collections?',
        a: 'Yes — once a model is generated for your brand, it can be reused across future lifestyle batches so your visual identity stays consistent season to season.',
      },
      {
        q: 'Do you offer different body types and ethnicities?',
        a: 'Yes, model characteristics are part of your brief so the imagery reflects your actual customer base.',
      },
      {
        q: 'Is this the same as stock photography?',
        a: 'No — every image is generated specifically for your product and brand direction, not pulled from a stock library.',
      },
    ],
    relatedServiceSlugs: ['catalog-images', 'product-campaign-videos'],
  },
  {
    slug: 'product-campaign-videos',
    name: 'Product & Campaign Videos',
    metaName: 'AI Product & Campaign Video',
    tagline: 'Commercial-ready video content for ads and social, produced in hours',
    shortDescription:
      'Turn product and lifestyle stills into short-form commercial video — built for paid social, ads, and product pages — without a video production crew.',
    icon: 'video',
    startingPrice: '19',
    priceUnit: 'per visual',
    heroImage: '/images/visuails-product-campaign-video-ecommerce-social-ads-hero.webp',
    heroImageAlt:
      'Ecommerce product campaign video still showing dynamic motion for social media advertising',
    keyBenefits: [
      {
        title: 'Ad-platform ready',
        description:
          'Delivered in the aspect ratios and lengths that perform on Meta, TikTok, and Google ad placements.',
      },
      {
        title: 'Built from your existing visuals',
        description:
          'Reuse your catalog or lifestyle images as the base for video, keeping your product accurate and your production cost down.',
      },
      {
        title: 'Hours, not weeks',
        description:
          'No shoot day, no editing timeline stretching over weeks — campaign video is turned around in a fraction of traditional production time.',
      },
      {
        title: 'Human-reviewed motion and product accuracy',
        description:
          'Every clip is checked for realistic product representation before delivery.',
      },
    ],
    useCases: [
      'Paid social ad creative (Meta, TikTok)',
      'Product detail page video',
      'Seasonal campaign teasers',
      'Retargeting and dynamic ad variants',
    ],
    faqs: [
      {
        q: 'What length are the videos?',
        a: 'Most campaign clips run 6–15 seconds — the length that performs best in paid social placements. Longer formats are available on request.',
      },
      {
        q: 'Can you use my existing product photos as the source?',
        a: 'Yes — catalog or lifestyle images (from us or your own library) can be used as the visual base for video generation.',
      },
      {
        q: 'What formats do I receive?',
        a: 'Vertical (9:16), square (1:1), and horizontal (16:9) exports are available to match every placement.',
      },
    ],
    relatedServiceSlugs: ['catalog-images', 'lifestyle-images'],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}
