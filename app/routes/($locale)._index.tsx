import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {MockShopNotice} from '~/components/MockShopNotice';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Sierra High Mushrooms | Fresh Gourmet Mushrooms & Supplies'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {data.isShopLinked ? null : <MockShopNotice />}
      <HeroSection />
      <ThreePathsSection />
      <RecommendedProducts products={data.recommendedProducts} />
      <FarmTrustSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #33452F 0%, #1E2A1B 100%)',
      color: '#F1F2E9',
      padding: '6rem 2rem',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: '500',
          lineHeight: '1.1',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Fresh gourmet mushrooms. Cultivation supplies. Community.
        </h1>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '2rem',
          opacity: '0.95',
        }}>
          Grown in Sparks, shipped across the West.
        </p>
        <Link to="/collections/mycology-supplies">
          <button style={{
            background: '#1E2A1B',
            color: '#F1F2E9',
            padding: '15px 22px',
            border: 'none',
            borderRadius: '3px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '15px',
          }}>
            Shop now
          </button>
        </Link>
      </div>
    </section>
  );
}

function ThreePathsSection() {
  const paths = [
    {
      icon: '🍄',
      title: 'For Chefs',
      description: 'Premium fresh harvests, specialty varieties, and seasonal selections for restaurant and culinary professionals.',
      link: '/collections/fresh-produce',
    },
    {
      icon: '🌱',
      title: 'Grow at Home',
      description: 'Beginner-friendly mushroom growing kits and cultivation supplies for home hobbyists and amateur growers.',
      link: '/collections/grow-kits',
    },
    {
      icon: '🧬',
      title: 'Mycology Supplies',
      description: 'Professional-grade agar, substrate, tools, and supplies for serious cultivators and researchers.',
      link: '/collections/mycology-supplies',
    },
  ];

  return (
    <section style={{
      padding: '5rem 2rem',
      backgroundColor: '#F1F2E9',
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(24px, 3.5vw, 42px)',
          fontWeight: '500',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#1E2A1B',
        }}>
          Choose your path
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {paths.map((path) => (
            <div key={path.title} style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(30, 42, 27, 0.12)',
              borderRadius: '6px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>{path.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: '500',
                marginBottom: '1rem',
                color: '#1E2A1B',
              }}>
                {path.title}
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.65',
                marginBottom: '1rem',
                color: 'rgba(30, 35, 24, 0.6)',
              }}>
                {path.description}
              </p>
              <Link to={path.link} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#A9843F',
                textDecoration: 'none',
              }}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmTrustSection() {
  return (
    <section style={{
      padding: '5rem 2rem',
      backgroundColor: '#F1F2E9',
      borderTop: '1px solid rgba(30, 42, 27, 0.12)',
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontWeight: '500',
              marginBottom: '1rem',
              color: '#1E2A1B',
              lineHeight: '1.15',
            }}>
              Grown here, shipped fresh
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              marginBottom: '1rem',
              color: '#1E2318',
            }}>
              Sierra High Mushrooms is a family-operated cultivation business based in Sparks, Nevada. We have been perfecting our craft for years, growing premium gourmet and medicinal mushrooms using sustainable, small-batch methods.
            </p>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              marginBottom: '2rem',
              color: '#1E2318',
            }}>
              Every mushroom is carefully harvested at peak ripeness, packed to order, and shipped fresh to ensure maximum quality and flavor.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Packed to order, shipped fresh', 'Real expertise, local operation', 'Committed to community values'].map((indicator) => (
                <div key={indicator} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: '600', color: '#4E7B3C', fontSize: '16px' }}>✓</span>
                  <span style={{ fontSize: '14px', lineHeight: '1.6', color: '#1E2318' }}>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            overflow: 'hidden',
            borderRadius: '6px',
            aspectRatio: '4 / 5',
            backgroundColor: 'rgba(30, 42, 27, 0.12)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1599599810694-a5f8a55fb4a1?w=600&h=600&fit=crop"
              alt="Sierra High Mushrooms farm"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(0.3) sepia(0.12) saturate(1.25)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image
            data={image}
            sizes="100vw"
            alt={image.altText || collection.title}
          />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section
      className="recommended-products"
      aria-labelledby="recommended-products"
    >
      <h2 id="recommended-products">Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
