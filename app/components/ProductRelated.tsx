import {ProductItem} from './ProductItem';
import type {ProductItemFragment} from 'storefrontapi.generated';
import styles from './ProductRelated.module.css';

interface ProductRelatedProps {
  products: ProductItemFragment[];
}

export function ProductRelated({products}: ProductRelatedProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Goes with this</h2>
      <div className={styles.grid}>
        {products.slice(0, 3).map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 3 ? 'eager' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
