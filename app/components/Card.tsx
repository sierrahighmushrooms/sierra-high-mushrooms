import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  image?: {
    src: string;
    alt: string;
  };
  badge?: {
    text: string;
    variant?: 'amber' | 'sage' | 'grey';
  };
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

const badgeVariantMap = {
  amber: styles.badgeAmber,
  sage: styles.badgeSage,
  grey: styles.badgeGrey,
};

export function Card({
  image,
  badge,
  children,
  hover = true,
  className,
}: CardProps) {
  const badgeVariant = badge?.variant || 'amber';
  const badgeClass = badgeVariantMap[badgeVariant];

  return (
    <div className={`${styles.card} ${hover ? styles.withHover : ''} ${className || ''}`}>
      {image && (
        <div className={styles.media}>
          <img src={image.src} alt={image.alt} className={styles.image} />
          {badge && (
            <div className={`${styles.badge} ${badgeClass}`}>
              {badge.text}
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.contentInner} ${className || ''}`}>{children}</div>;
}
