import {Link} from 'react-router';
import styles from './AvailabilityHeader.module.css';

export function AvailabilityHeader() {
  return (
    <div className={styles.header}>
      <div className="wrap">
        <div className={styles.breadcrumb}>
          <Link to="/">For Restaurants</Link> / Plan Your Harvest
        </div>

        <h1 className={styles.title}>Plan Your Harvest</h1>

        <p className={styles.lede}>
          Choose the mushrooms your kitchen wants to work with and tell us the
          volume and frequency you need. We plan production around customer
          demand, with lead times based on each strain&rsquo;s growing cycle.
        </p>
      </div>
    </div>
  );
}
