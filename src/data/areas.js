// "Areas We Serve" data. VISUAILS delivers digitally from Enschede, NL — there is
// no physical branch in any of these markets. Content here is written to be
// genuinely distinct per country (real market facts, not spun text) and schema
// uses a single Organization entity with `areaServed`, never a fake per-country
// LocalBusiness — see src/components/schema/OrganizationSchema.astro.

export const areas = [
  {
    slug: 'united-states',
    name: 'United States',
    shortName: 'US',
    mapQuery: 'New York, United States',
    region: 'North America',
    marketContext:
      'The US is the largest ecommerce market VISUAILS serves, with Shopify and Amazon as the dominant sales channels for the DTC and fashion brands that make up most of our client base there.',
    whyRemoteWorks:
      'A 6–9 hour gap versus Central European Time means orders placed at the end of a US workday are often ready before the next one starts — there is no shoot to schedule around a shared timezone.',
    localFact:
      'US marketplaces (Amazon, Walmart Marketplace, Shopify storefronts) each enforce their own image specs; catalog batches for US clients are exported pre-sized to the relevant platform.',
    industries: ['DTC fashion & apparel', 'Beauty & personal care', 'Home goods & furniture'],
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    shortName: 'UK',
    mapQuery: 'London, United Kingdom',
    region: 'Europe',
    marketContext:
      'The UK has one of Europe’s most mature direct-to-consumer fashion and beauty markets, with brands based in London and Manchester making up a large share of our UK client work.',
    whyRemoteWorks:
      'Only a one-hour timezone difference from our Enschede base means live briefing calls and same-day revisions fit naturally into a UK working day.',
    localFact:
      'Post-Brexit customs changes affect physical goods, not digital delivery — catalog, lifestyle, and video files cross the border instantly with no import paperwork.',
    industries: ['Fashion & apparel', 'Beauty', 'Homeware & lifestyle'],
  },
  {
    slug: 'germany',
    name: 'Germany',
    shortName: 'DE',
    mapQuery: 'Berlin, Germany',
    region: 'Europe',
    marketContext:
      'Germany is the largest ecommerce market in the EU, with brands selling heavily through Otto, Amazon.de, and Zalando alongside their own Shopify stores.',
    whyRemoteWorks:
      'Same timezone as our Enschede studio (CET/CEST) — briefings, revisions, and delivery all happen inside the same working day with zero lag.',
    localFact:
      'German marketplaces and consumers have a well-documented preference for precise, consistent product imagery over heavily stylised shots — a strong match for our catalog-image process.',
    industries: ['Furniture & homeware', 'Electronics', 'Fashion & outdoor gear'],
  },
  {
    slug: 'france',
    name: 'France',
    shortName: 'FR',
    mapQuery: 'Paris, France',
    region: 'Europe',
    marketContext:
      'France’s ecommerce scene is anchored by strong fashion and luxury-adjacent DTC brands, many selling via Shopify alongside Cdiscount and Amazon.fr.',
    whyRemoteWorks:
      'Same CET/CEST timezone as our home studio means French clients get same-day turnaround with no scheduling gap.',
    localFact:
      'French fashion and beauty brands are frequent users of our Lifestyle Images service, where a consistent AI model across a full collection replaces a traditional multi-day studio booking.',
    industries: ['Fashion & luxury-adjacent', 'Beauty & cosmetics', 'Food & hospitality'],
  },
  {
    slug: 'netherlands',
    name: 'Netherlands',
    shortName: 'NL',
    mapQuery: 'Amsterdam, Netherlands',
    region: 'Europe',
    marketContext:
      'The Netherlands is our home market — VISUAILS is based in Enschede, and Dutch brands selling through Bol.com and Shopify make up a core part of our client base.',
    whyRemoteWorks:
      'No remote gap at all: Dutch clients are in the same timezone and often the same working hours as our studio team, with same-day calls and revisions the norm.',
    localFact:
      'Bol.com’s image guidelines are strict about background and framing consistency — our catalog-image process is built with those specs in mind by default for Dutch sellers.',
    industries: ['Fashion & apparel', 'Furniture & home', 'Food & beverage'],
  },
  {
    slug: 'spain',
    name: 'Spain',
    shortName: 'ES',
    mapQuery: 'Madrid, Spain',
    region: 'Europe',
    marketContext:
      'Spain’s ecommerce growth has been driven heavily by fashion and lifestyle DTC brands out of Madrid and Barcelona, selling through Shopify and El Corte Inglés’ online marketplace.',
    whyRemoteWorks:
      'Same CET/CEST timezone as our Enschede studio, so briefings and delivery happen within a single working day.',
    localFact:
      'Barcelona and Madrid-based fashion brands are among our most frequent Lifestyle Images clients, using a consistent AI model to launch full seasonal collections without a studio day.',
    industries: ['Fashion & apparel', 'Beauty', 'Food & beverage'],
  },
  {
    slug: 'italy',
    name: 'Italy',
    shortName: 'IT',
    mapQuery: 'Milan, Italy',
    region: 'Europe',
    marketContext:
      'Italy’s ecommerce brands, especially those out of Milan, sell into a market with high expectations for fashion and design presentation quality.',
    whyRemoteWorks:
      'Same CET/CEST timezone as our home studio — no scheduling delay between briefing and delivery.',
    localFact:
      'Italian fashion and design brands frequently combine Catalog Images with Product & Campaign Videos to launch a collection across product pages and paid social at the same time.',
    industries: ['Fashion & luxury-adjacent', 'Furniture & design', 'Food & beverage'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    shortName: 'AU',
    mapQuery: 'Sydney, Australia',
    region: 'Oceania',
    marketContext:
      'Australia’s DTC ecommerce scene, concentrated around Sydney and Melbourne, relies heavily on Shopify, and imagery quality plays an outsized role given the distance from traditional (often Asia- or US-based) production hubs.',
    whyRemoteWorks:
      'The 8–10 hour gap from CET actually works in Australian clients’ favour: briefs submitted at the end of an Australian working day are typically ready when that team logs back on.',
    localFact:
      'Because there is no physical shoot, there is no freight, customs, or production travel to factor in — a meaningful cost and time saving for Australian brands historically reliant on flying in photographers or shipping products overseas for shoots.',
    industries: ['DTC fashion & apparel', 'Outdoor & activewear', 'Beauty'],
  },
];

export function getAreaBySlug(slug) {
  return areas.find((a) => a.slug === slug);
}
