import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import styles from './ProductItem.module.css';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className={styles.productItem}
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className={styles.media}>
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
        <div className={styles.duotoneOverlay} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.title}</div>
        <div className={styles.row}>
          <span className={styles.price}>
            <Money data={product.priceRange.minVariantPrice} />
          </span>
          <span className={styles.viewCta}>View</span>
        </div>
      </div>
    </Link>
  );
}
