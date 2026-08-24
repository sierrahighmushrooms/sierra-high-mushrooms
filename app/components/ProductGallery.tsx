import {useState} from 'react';
import type {ProductVariantFragment} from 'storefrontapi.generated';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: Array<{
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  }>;
  badge?: 'bestseller' | 'limited' | null;
  selectedImage?: ProductVariantFragment['image'];
  onImageSelect?: (image: any) => void;
}

export function ProductGallery({
  images = [],
  badge,
  selectedImage,
  onImageSelect,
}: ProductGalleryProps) {
  const displayImages = images.length > 0 ? images : [];
  const [currentImage, setCurrentImage] = useState(
    selectedImage || (displayImages.length > 0 ? displayImages[0] : null),
  );

  const handleImageSelect = (image: any) => {
    setCurrentImage(image);
    onImageSelect?.(image);
  };

  if (displayImages.length === 0 && !selectedImage) {
    return (
      <div className={styles.gallery}>
        <div className={styles.stickyWrapper}>
          <div className={styles.mainImageContainer}>
            <div style={{width: '100%', height: '100%', background: 'var(--color-bg)'}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.stickyWrapper}>
        <div className={styles.mainImageContainer}>
          {currentImage && (
            <img
              src={currentImage.url}
              alt={currentImage.altText || 'Product'}
              className={styles.mainImage}
            />
          )}
          {badge && <div className={`${styles.badge} ${styles[badge]}`}>{badge.toUpperCase()}</div>}
        </div>

        {displayImages.length > 1 && (
          <div className={styles.thumbnailsContainer}>
            {displayImages.map((image) => (
              <button
                key={image.id}
                className={`${styles.thumbnail} ${
                  currentImage?.id === image.id ? styles.active : ''
                }`}
                onClick={() => handleImageSelect(image)}
                aria-label={`View ${image.altText || 'product image'}`}
              >
                <img src={image.url} alt={image.altText || 'Thumbnail'} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
