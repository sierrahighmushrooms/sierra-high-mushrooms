import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductGallery} from '~/components/ProductGallery';
import {ProductBuyBox} from '~/components/ProductBuyBox';
import {ProductDetailTabs, NumberedList, SpecTable} from '~/components/ProductDetailTabs';
import {ProductRelated} from '~/components/ProductRelated';
import {useAside} from '~/components/Aside';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

type ProductLoaderData = {
  product: Awaited<ReturnType<typeof loadCriticalData>>['product'];
  relatedProducts: Awaited<ReturnType<typeof loadCriticalData>>['relatedProducts'];
};

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.product.title ?? ''} | Sierra High Mushrooms`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product, relatedProducts}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    storefront.query(RELATED_PRODUCTS_QUERY, {
      variables: {handle},
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
    relatedProducts: relatedProducts?.products?.nodes || [],
  };
}

function loadDeferredData({context, params}: Route.LoaderArgs) {
  return {};
}

export default function Product() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();
  const {open} = useAside();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productImages = product.images?.nodes || [];

  const detailTabs = [
    {
      label: "What's included",
      content: (
        <div>
          <h3>Package Contents</h3>
          <p>Each order includes everything shown in the product description.</p>
          <ul style={{marginTop: 'var(--spacing-lg)', paddingLeft: 'var(--spacing-lg)'}}>
            <li style={{marginBottom: 'var(--spacing-md)'}}>
              Complete product as described
            </li>
            <li style={{marginBottom: 'var(--spacing-md)'}}>
              Detailed instruction sheet
            </li>
            <li>Our growing guide and support resources</li>
          </ul>
        </div>
      ),
    },
    {
      label: 'How to use',
      content: (
        <div>
          <h3>Getting Started</h3>
          <NumberedList
            items={[
              'Inspect package contents upon arrival',
              'Follow included instructions carefully',
              'Maintain proper temperature and humidity',
              'Monitor progress daily',
              'Contact us with any questions',
            ]}
          />
          <p style={{marginTop: 'var(--spacing-lg)', color: 'var(--color-muted)'}}>
            Full instructions are included in your shipment. Our team is available to help
            at any stage of your growing process.
          </p>
        </div>
      ),
    },
    {
      label: 'Specifications',
      content: (
        <div>
          <h3>Technical Details</h3>
          <SpecTable
            specs={[
              {label: 'Item Type', value: 'Grow Supply'},
              {label: 'Packaging', value: 'Safe, discreet shipping'},
              {label: 'Origin', value: 'Packed in Sparks, Nevada'},
              {label: 'Quality Assurance', value: 'Tested & verified'},
              {label: 'Shelf Life', value: 'As specified per product'},
            ]}
          />
        </div>
      ),
    },
    {
      label: 'Storage & shipping',
      content: (
        <div>
          <h3>Care & Handling</h3>
          <p>
            Store in a cool, dry place away from direct sunlight. Most products should be used
            within the timeframe indicated on packaging.
          </p>
          <h3 style={{marginTop: 'var(--spacing-lg)'}}>Shipping</h3>
          <p>
            All orders are carefully packed to order in Sparks, Nevada and shipped via USPS
            Priority Mail. Most deliveries arrive within 3-5 business days. Tracking
            information will be provided via email upon shipment.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="wrap">
        <div style={{padding: 'var(--spacing-3xl) 0'}}>
          <div style={{marginBottom: 'var(--spacing-lg)'}}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                letterSpacing: '0.04em',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              <a href="/collections/all" style={{color: 'var(--color-sage)'}}>
                Shop
              </a>{' '}
              / {product.title}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-4xl)',
              alignItems: 'start',
            }}
            className="product-detail-grid"
          >
            <ProductGallery
              images={productImages}
              selectedImage={selectedVariant?.image}
              onImageSelect={() => {}}
              badge={product.tags?.includes('bestseller') ? 'bestseller' : null}
            />

            <ProductBuyBox
              product={product}
              selectedVariant={selectedVariant}
              onAddToCart={() => open('cart')}
            />
          </div>

          <ProductDetailTabs tabs={detailTabs} />

          {relatedProducts.length > 0 && <ProductRelated products={relatedProducts} />}
        </div>
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-2xl) !important;
          }
        }
      `}</style>
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    tags
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 10) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const RELATED_PRODUCTS_QUERY = `#graphql
  fragment RelatedProduct on Product {
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
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }

  query RelatedProducts(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 6, query: "tag:" + $handle) {
      nodes {
        ...RelatedProduct
      }
    }
  }
` as const;
