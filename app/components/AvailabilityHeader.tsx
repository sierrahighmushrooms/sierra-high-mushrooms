import {Link} from 'react-router';
import styles from './AvailabilityHeader.module.css';

interface AvailabilityHeaderProps {
  updatedLabel: string;
  nextUpdateLabel: string;
  orderCutoffLabel: string;
}

export function AvailabilityHeader({
  updatedLabel,
  nextUpdateLabel,
  orderCutoffLabel,
}: AvailabilityHeaderProps) {
  return (
    <div className={styles.header}>
      <div className="wrap">
        <div className={styles.breadcrumb}>
          <Link to="/">For Restaurants</Link> / Current Availability
        </div>

        <h1 className={styles.title}>What&rsquo;s ready this week.</h1>

        <p className={styles.lede}>
          Availability shifts week to week based on what&rsquo;s actually
          flushing. This board reflects what we can fill right now &mdash;
          not a catalog of everything we could theoretically grow.
        </p>

        <div className={styles.statusStamp}>
          <span className={styles.pulsingDot} aria-hidden="true" />
          <span>
            Updated {updatedLabel} &middot; Next update {nextUpdateLabel}{' '}
            &middot; Orders close {orderCutoffLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
