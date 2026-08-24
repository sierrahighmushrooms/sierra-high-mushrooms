import {useState} from 'react';
import {Money} from '@shopify/hydrogen';
import {Button} from './Button';
import {AddToCartButton} from './AddToCartButton';
import type {ProductFragment} from 'storefrontapi.generated';
import styles from './ProductBuyBox.module.css';

interface ProductBuyBoxProps {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  onAddToCart?: () => void;
}

export function ProductBuyBox({
  product,
  selectedVariant,
  onAddToCart,
}: ProductBuyBoxProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity < 100) {
      setQuantity(newQuantity);
    }
  };

  const isOutOfStock = !selectedVariant?.availableForSale;

  const cartLines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: quantity,
        },
      ]
    : [];

  return (
    <div className={styles.buyBox}>
      <span className={styles.categoryTag}>Supplies</span>
      <h1 className={styles.productName}>{product.title}</h1>

      <p className={styles.benefitCopy}>
        Everything you need for success. Sourced for quality, backed by expert support.
      </p>

      <div className={styles.priceSection}>
        <div className={styles.price}>
          {selectedVariant?.price ? (
            <Money data={selectedVariant.price} />
          ) : (
            <span>Unavailable</span>
          )}
        </div>
        {selectedVariant?.unitPrice && (
          <div className={styles.perUnitPrice}>
            per {selectedVariant.unitPrice.amount} unit
          </div>
        )}
        <div className={`${styles.stockStatus} ${isOutOfStock ? styles.outOfStock : ''}`}>
          {isOutOfStock
            ? 'Out of stock'
            : 'In stock — packed to order in Sparks, NV'}
        </div>
      </div>

      <div className={styles.quantitySection}>
        <span className={styles.quantityLabel}>Quantity</span>
        <div className={styles.quantityControl}>
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            className={styles.quantityInput}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) {
                handleQuantityChange(val);
              }
            }}
            min="1"
            max="99"
            aria-label="Quantity"
          />
          <button
            type="button"
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            disabled={quantity >= 99}
          >
            +
          </button>
        </div>
      </div>

      <AddToCartButton
        disabled={isOutOfStock}
        onClick={onAddToCart}
        lines={cartLines}
        className={styles.addToCartButton}
      >
        {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
      </AddToCartButton>

      <div className={styles.trustSection}>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>✓</span>
          <span>Packed to order</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>✓</span>
          <span>Instructions included</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>✓</span>
          <span>Questions get real answers</span>
        </div>
      </div>
    </div>
  );
}
