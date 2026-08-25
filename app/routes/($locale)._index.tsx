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
import {ScrollReveal, ScrollRevealStagger} from '~/components/ScrollReveal';
import {useParallax} from '~/hooks/useParallax';
import {useTilt} from '~/hooks/useTilt';
import styles from '~/components/Homepage.module.css';

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
  const {ref, offset} = useParallax<HTMLDivElement>(15);

  return (
    <section className={styles.hero}>
      <div
        ref={ref}
        className={styles.heroBackground}
        style={{transform: `translateY(${offset}%)`}}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Fresh gourmet mushrooms. Cultivation supplies. Community.
        </h1>
        <p className={styles.heroSubtitle}>
          Grown in Sparks, shipped across the West.
        </p>
        <Link to="/collections/mycology-supplies">
          <button className={styles.heroButton}>Shop now</button>
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
    <section className={styles.pathsSection}>
      <div className={styles.pathsInner}>
        <ScrollReveal as="h2" className={styles.pathsHeading}>
          Choose your path
        </ScrollReveal>
        <ScrollRevealStagger className={styles.pathsGrid}>
          {paths.map((path) => (
            <TiltPathCard key={path.title} path={path} />
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}

function TiltPathCard({
  path,
}: {
  path: {icon: string; title: string; description: string; link: string};
}) {
  const {ref, transform, handleMouseMove, handleMouseLeave} =
    useTilt<HTMLDivElement>(15);

  return (
    <div className={styles.tiltWrapper}>
      <div
        ref={ref}
        className={styles.pathCard}
        style={{transform}}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.pathIcon}>{path.icon}</div>
        <h3 className={styles.pathTitle}>{path.title}</h3>
        <p className={styles.pathDescription}>{path.description}</p>
        <Link to={path.link} className={styles.pathLink}>
          Learn more →
        </Link>
      </div>
    </div>
  );
}

function FarmTrustSection() {
  const {ref, offset} = useParallax<HTMLDivElement>(15);

  return (
    <section className={styles.farmSection}>
      <div className={styles.farmInner}>
        <ScrollReveal>
          <h2 className={styles.farmHeading}>Grown here, shipped fresh</h2>
          <p className={styles.farmParagraph}>
            Sierra High Mushrooms is a family-operated cultivation business
            based in Sparks, Nevada. We have been perfecting our craft for
            years, growing premium gourmet and medicinal mushrooms using
            sustainable, small-batch methods.
          </p>
          <p className={styles.farmParagraph}>
            Every mushroom is carefully harvested at peak ripeness, packed to
            order, and shipped fresh to ensure maximum quality and flavor.
          </p>
          <div className={styles.farmIndicators}>
            {[
              'Packed to order, shipped fresh',
              'Real expertise, local operation',
              'Committed to community values',
            ].map((indicator) => (
              <div key={indicator} className={styles.farmIndicator}>
                <span className={styles.farmCheck}>✓</span>
                <span className={styles.farmIndicatorText}>{indicator}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal className={styles.farmImageFrame}>
          <div
            ref={ref}
            className={styles.farmImageParallax}
            style={{transform: `translateY(${offset}%)`}}
          >
            <img
              src="https://images.unsplash.com/photo-1599599810694-a5f8a55fb4a1?w=600&h=600&fit=crop"
              alt="Sierra High Mushrooms farm"
              className={styles.farmImage}
            />
          </div>
          <div className={styles.duotoneOverlay} />
        </ScrollReveal>
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
      className={styles.recommendedSection}
      aria-labelledby="recommended-products"
    >
      <ScrollReveal as="h2" className={styles.recommendedHeading}>
        <span id="recommended-products">Recommended Products</span>
      </ScrollReveal>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <ScrollRevealStagger className={styles.recommendedGrid}>
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </ScrollRevealStagger>
          )}
        </Await>
      </Suspense>
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
