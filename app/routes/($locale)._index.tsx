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
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.heroGrid}`}>
        <ScrollReveal>
          <div className={styles.labelTag}>
            <span className={styles.labelDot} />
            Sparks, Nevada · Est. Farm
          </div>
          <h1 className={styles.heroHeading}>
            Mushrooms grown here.
            <br />
            <em>Cultivation supplies</em> for everyone else.
          </h1>
          <p className={styles.heroSub}>
            A working mushroom farm in Sparks, Nevada — supplying local
            kitchens fresh, home growers a good kit, and serious mycologists
            real lab-grade supplies.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/collections/mycology-supplies" className={styles.btnPrimary}>
              Shop Mycology Supplies
            </Link>
            <Link to="/availability" className={styles.btnSecondary}>
              Restaurant Wholesale
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <SpecimenPanel />
        </ScrollReveal>
      </div>

      <div className="wrap">
        <ScrollReveal className={styles.photoBand}>
          <img
            src="https://images.unsplash.com/photo-1770884844724-ac9e36b599e9?fm=jpg&q=80&w=2400&auto=format&fit=crop"
            alt="Cluster of fresh oyster mushrooms"
            loading="lazy"
          />
        </ScrollReveal>
      </div>

      <Ridgeline />
    </section>
  );
}

/** Sierra Nevada ridgeline silhouette, layered and low-opacity. */
function Ridgeline() {
  return (
    <svg
      className={styles.ridgeline}
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,220 L0,140 L120,90 L220,130 L340,60 L430,110 L560,40 L640,95 L760,55 L860,120 L980,70 L1080,115 L1200,50 L1320,100 L1440,75 L1440,220 Z"
        fill="#33452F"
        opacity="0.10"
      />
      <path
        d="M0,220 L0,170 L160,130 L280,160 L420,110 L540,150 L680,100 L800,145 L940,105 L1080,155 L1220,120 L1440,150 L1440,220 Z"
        fill="#33452F"
        opacity="0.14"
      />
    </svg>
  );
}

/** Petri-dish specimen card with 3D mouse tilt. */
function SpecimenPanel() {
  const {ref, transform, handleMouseMove, handleMouseLeave} =
    useTilt<HTMLDivElement>();

  const rows = [
    ['Strain', 'Blue Oyster / Pleurotus columbinus'],
    ['Medium', 'MEA Agar, high contrast'],
    ['Status', 'Active — clean growth'],
    ['Source', 'Sierra High Farm, Sparks NV'],
  ];

  return (
    <div
      ref={ref}
      className={styles.specimen}
      style={{transform}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.specimenPlate}>
        <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
          <defs>
            <radialGradient id="specimenGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EFEBDE" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#EFEBDE" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EFEBDE" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="62" fill="url(#specimenGlow)" />
          <g stroke="#EFEBDE" strokeWidth="0.6" fill="none" opacity="0.55">
            <path d="M100,100 L48,66 M48,66 L32,52 M48,66 L40,80" />
            <path d="M100,100 L152,68 M152,68 L168,54 M152,68 L164,82" />
            <path d="M100,100 L144,136 M144,136 L160,148 M144,136 L152,160" />
            <path d="M100,100 L54,146 M54,146 L38,158 M54,146 L44,166" />
            <path d="M100,100 L104,40 M104,40 L110,22" />
            <path d="M100,100 L98,158 M98,158 L94,178" />
          </g>
        </svg>
      </div>
      {rows.map(([label, value]) => (
        <div key={label} className={styles.specimenRow}>
          <span>{label.toUpperCase()}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

function ThreePathsSection() {
  const paths = [
    {
      idx: 'For Chefs',
      title: 'Fresh mushrooms & basil',
      description:
        'Grown and distributed locally around Reno/Sparks. Weekly availability, sample requests, wholesale accounts.',
      cta: 'See current availability',
      link: '/availability',
    },
    {
      idx: 'Grow at Home',
      title: 'Grow kits',
      description:
        'Open, mist, harvest. Built for beginners who want real mushrooms without the learning curve.',
      cta: 'Shop grow kits',
      link: '/collections/grow-kits',
    },
    {
      idx: 'Mycology Supplies',
      title: 'Agar, substrate, sterile tools',
      description:
        "For growers who've outgrown the kit. Pre-poured plates, premix, and sterilized substrate.",
      cta: 'Shop supplies',
      link: '/collections/mycology-supplies',
    },
  ];

  return (
    <section className={styles.paths}>
      <div className="wrap">
        <ScrollReveal className={styles.sectionHead}>
          <h2>Three ways in.</h2>
        </ScrollReveal>
        <ScrollRevealStagger className={styles.pathGrid} staggerMs={120}>
          {paths.map((path) => (
            <div key={path.idx} className={styles.pathCard}>
              <span className={styles.pathIdx}>{path.idx.toUpperCase()}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <Link to={path.link} className={styles.pathGo}>
                {path.cta}
              </Link>
            </div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}

function FarmTrustSection() {
  const {ref, offset} = useParallax<HTMLDivElement>(10);

  return (
    <section className={styles.farm}>
      <div
        ref={ref}
        className={styles.farmPhoto}
        style={{transform: `translateY(${offset}%)`}}
      >
        <img
          src="https://images.unsplash.com/photo-1749655248287-d1e0acb5f8d1?fm=jpg&q=80&w=2400&auto=format&fit=crop"
          alt="Fresh basil growing at the Sierra High Mushrooms farm"
          loading="lazy"
        />
      </div>
      <div className={styles.farmContent}>
        <div className="wrap">
          <h2>A farm you could actually visit.</h2>
          <p>
            Every mushroom we sell fresh starts here, in Sparks — not shipped
            in from somewhere else and relabeled.
          </p>
          <Link to="/availability" className={styles.btnLight}>
            Request wholesale availability
          </Link>
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
    <section className={styles.products} aria-labelledby="recommended-products">
      <div className="wrap">
        <ScrollReveal className={styles.productsHead}>
          <h2 id="recommended-products">From the shop.</h2>
          <Link to="/collections/all" className={styles.productsViewAll}>
            View all products →
          </Link>
        </ScrollReveal>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {(response) => (
              <ScrollRevealStagger
                className={styles.productGrid}
                staggerMs={120}
              >
                {response
                  ? response.products.nodes.map((product) => (
                      <ProductItem key={product.id} product={product} />
                    ))
                  : null}
              </ScrollRevealStagger>
            )}
          </Await>
        </Suspense>
      </div>
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
