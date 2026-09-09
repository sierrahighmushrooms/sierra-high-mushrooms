import {useEffect, useState} from 'react';
import {Money} from '@shopify/hydrogen';
import {AddToCartButton} from './AddToCartButton';
import type {ProductFragment} from 'storefrontapi.generated';
import styles from './ProductMobileStickyATC.module.css';

interface ProductMobileStickyATCProps {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  /** Current quantity from the primary buy box, so both add the same amount. */
  quantity?: number;
  /** The primary Add-to-Cart control. The bar shows once this scrolls away. */
  primaryRef: React.RefObject<HTMLElement>;
  /** Same handler the primary control uses (opens the cart drawer). */
  onAddToCart?: () => void;
}

/**
 * Mobile/tablet sticky Add to Cart.
 *
 * This is not a second cart path: it renders the same <AddToCartButton>
 * (-> CartForm -> /cart LinesAdd) as the primary buy box, with the same
 * selected variant, availability check, price and quantity. It only adds a
 * scroll-position-driven show/hide:
 *   - hidden while the primary Add-to-Cart control is on screen
 *   - shown once that control has scrolled away
 *   - hidden again once the footer comes into view, so it never sits on
 *     top of the footer
 */
export function ProductMobileStickyATC({
  product,
  selectedVariant,
  quantity = 1,
  primaryRef,
  onAddToCart,
}: ProductMobileStickyATCProps) {
  const [primaryOnScreen, setPrimaryOnScreen] = useState(true);
  const [footerOnScreen, setFooterOnScreen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observers: IntersectionObserver[] = [];
    const primaryEl = primaryRef.current;
    const footerEl = document.querySelector('footer');

    if (primaryEl) {
      const o = new IntersectionObserver(
        ([entry]) => setPrimaryOnScreen(entry.isIntersecting),
        {threshold: 0},
      );
      o.observe(primaryEl);
      observers.push(o);
    }

    if (footerEl) {
      // The footer is always the last thing on the page, so its intersection
      // state is a reliable "near the bottom" signal in both scroll directions.
      // The negative bottom margin means it only counts once the footer has
      // risen past the middle of the viewport, so the bar keeps a usable
      // window on shorter pages and only steps aside when the footer is
      // genuinely the thing being looked at.
      const o = new IntersectionObserver(
        ([entry]) => setFooterOnScreen(entry.isIntersecting),
        {threshold: 0, rootMargin: '0px 0px -50% 0px'},
      );
      o.observe(footerEl);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [primaryRef]);

  const isVisible = !primaryOnScreen && !footerOnScreen;

  const isOutOfStock = !selectedVariant?.availableForSale;
  const cartLines = selectedVariant
    ? [{merchandiseId: selectedVariant.id, quantity}]
    : [];

  return (
    <div
      className={`${styles.stickyAtc} ${isVisible ? styles.visible : ''}`}
      aria-hidden={!isVisible}
    >
      <div className={styles.info}>
        <div className={styles.productName}>{product.title}</div>
        <div className={styles.price}>
          {selectedVariant?.price && <Money data={selectedVariant.price} />}
        </div>
      </div>
      <AddToCartButton
        disabled={isOutOfStock}
        onClick={onAddToCart}
        lines={cartLines}
        className={styles.button}
      >
        {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
      </AddToCartButton>
    </div>
  );
}
