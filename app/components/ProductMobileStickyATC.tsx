import {useEffect, useState} from 'react';
import {Money} from '@shopify/hydrogen';
import {AddToCartButton} from './AddToCartButton';
import type {ProductFragment} from 'storefrontapi.generated';
import styles from './ProductMobileStickyATC.module.css';

interface ProductMobileStickyATCProps {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  quantity?: number;
  triggerElement?: React.RefObject<HTMLElement>;
}

export function ProductMobileStickyATC({
  product,
  selectedVariant,
  quantity = 1,
  triggerElement,
}: ProductMobileStickyATCProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!triggerElement?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky ATC when trigger element is NOT in view
        setIsVisible(!entry.isIntersecting);
      },
      {threshold: 0.1},
    );

    observer.observe(triggerElement.current);

    return () => {
      if (triggerElement?.current) {
        observer.unobserve(triggerElement.current);
      }
    };
  }, [triggerElement]);

  const cartLines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: quantity,
        },
      ]
    : [];

  return (
    <div className={`${styles.stickyAtc} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.info}>
        <div className={styles.productName}>{product.title}</div>
        <div className={styles.price}>
          {selectedVariant?.price && <Money data={selectedVariant.price} />}
        </div>
      </div>
      <AddToCartButton
        disabled={!selectedVariant?.availableForSale}
        lines={cartLines}
        className={styles.button}
      >
        Add to Cart
      </AddToCartButton>
    </div>
  );
}
