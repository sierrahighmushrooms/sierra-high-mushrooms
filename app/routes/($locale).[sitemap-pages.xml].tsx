import type {Route} from './+types/($locale).[sitemap-pages.xml]';

/**
 * Supplementary sitemap for custom app routes that Hydrogen's built-in
 * sitemap (`getSitemap`/`getSitemapIndex`, see [sitemap.xml].tsx and
 * sitemap.$type.$page[.xml].tsx) does not cover — those only index Shopify
 * resources (products, collections, pages, articles, blogs). Referenced as
 * an additional `Sitemap:` line in robots.txt.
 */
const PAGES = [
  '/service-areas',
  '/service-areas/reno',
  '/service-areas/sparks',
  '/service-areas/carson-city',
  '/service-areas/truckee',
  '/service-areas/lake-tahoe',
];

export function loader({request}: Route.LoaderArgs) {
  const {origin} = new URL(request.url);

  const urls = PAGES.map(
    (path) => `  <url>\n    <loc>${origin}${path}</loc>\n  </url>`,
  ).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}
