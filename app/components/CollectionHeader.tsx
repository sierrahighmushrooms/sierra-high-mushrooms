import {Link} from 'react-router';
import styles from './CollectionHeader.module.css';

interface CollectionHeaderProps {
  title: string;
  description?: string;
  activeFilter?: string;
  onFilterChange: (filter: string) => void;
  productCount: number;
}

const FILTER_OPTIONS = [
  {id: 'all', label: 'All supplies'},
  {id: 'agar', label: 'Agar & culture'},
  {id: 'substrate', label: 'Substrate'},
  {id: 'beginner', label: 'Beginner friendly'},
];

export function CollectionHeader({
  title,
  description,
  activeFilter = 'all',
  onFilterChange,
  productCount,
}: CollectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div className="wrap">
        <div className={styles.breadcrumb}>
          <Link to="/shop">Shop</Link> / {title}
        </div>

        <h1 className={styles.title}>{title}</h1>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.filterBar}>
          <span className={styles.filterLabel}>Filter:</span>
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`${styles.filterButton} ${
                activeFilter === option.id ? styles.active : ''
              }`}
              onClick={() => onFilterChange(option.id)}
              aria-pressed={activeFilter === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={styles.productCount}>
          {productCount} product{productCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
