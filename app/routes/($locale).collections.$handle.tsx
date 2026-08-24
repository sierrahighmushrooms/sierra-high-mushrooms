import {redirect, useLoaderData} from 'react-router';
import {useState} from 'react';
import type {Route} from './+types/collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import {CollectionHeader} from '~/components/CollectionHeader';
import {CollectionSEOSection} from '~/components/CollectionSEOSection';
import type {ProductItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `${data?.collection.title ?? 'Collection'} | Sierra High Mushrooms`}];
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
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

// Content mapping for different collection types
const COLLECTION_CONTENT: Record<
  string,
  {
    contentParagraphs: string[];
    faqs: Array<{question: string; answer: string}>;
  }
> = {
  default: {
    contentParagraphs: [
      'Our carefully curated selection of growing supplies is designed to support your cultivation journey, whether you are just starting out or refining your technique.',
      'Each product is sourced for quality and reliability, backed by our commitment to help you succeed with expert guidance and premium materials.',
    ],
    faqs: [
      {
        question: 'How do I choose between agar premix and pre-poured plates?',
        answer:
          'Premix offers flexibility and is ideal if you have your own sterilization equipment. Pre-poured plates are ready to use immediately and reduce contamination risk for beginners.',
      },
      {
        question: 'Do I need a flow hood?',
        answer:
          'A flow hood significantly reduces contamination risk and is recommended as you scale, but many growers start successfully with proper technique and basic sterile practices.',
      },
      {
        question: 'Is substrate ready to inoculate?',
        answer:
          'Our pre-sterilized substrate is ready to use right out of the bag. Simply inoculate with your prepared culture and follow the included instructions.',
      },
      {
        question: 'What species does this work for?',
        answer:
          'Our supplies are versatile and compatible with most common gourmet and medicinal species. Check product descriptions for specific recommendations.',
      },
      {
        question: 'How are orders shipped?',
        answer:
          'All orders are carefully packed to order in Sparks, Nevada and shipped via USPS. Most orders arrive within 3-5 business days.',
      },
    ],
  },
};

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  const [activeFilter, setActiveFilter] = useState('all');

  const contentData = COLLECTION_CONTENT.default;

  // Filter products based on active filter (client-side)
  const filterProductsByTag = (
    products: ProductItemFragment[],
    filter: string,
  ): ProductItemFragment[] => {
    if (filter === 'all') return products;

    const filterMap: Record<string, string[]> = {
      agar: ['agar', 'culture'],
      substrate: ['substrate'],
      beginner: ['beginner', 'starter'],
    };

    const tags = filterMap[filter] || [];
    return products.filter(
      (product) =>
        tags.some((tag) =>
          (product.tags || []).some((t) =>
            t.toLowerCase().includes(tag.toLowerCase()),
          ),
        ) || tags.length === 0,
    );
  };

  return (
    <>
      <CollectionHeader
        title={collection.title}
        description={collection.description}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        productCount={collection.products.nodes.length}
      />

      <div className="wrap">
        <div className="section-padding">
          <PaginatedResourceSection<ProductItemFragment>
            connection={collection.products}
            resourcesClassName="grid-3"
          >
            {({node: product, index}) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 3 ? 'eager' : undefined}
              />
            )}
          </PaginatedResourceSection>
        </div>
      </div>

      <CollectionSEOSection
        title="Everything You Need to Grow"
        content={contentData.contentParagraphs}
        faqs={contentData.faqs}
      />

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
