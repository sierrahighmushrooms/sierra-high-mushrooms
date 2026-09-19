import {Link} from 'react-router';
import {useNonce} from '@shopify/hydrogen';
import type {Route} from './+types/($locale).service-areas.sparks';
import styles from '~/components/ServiceArea.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Mushroom Farm in Sparks, NV — Buy Direct from the Source | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Sierra High Mushrooms grows gourmet and medicinal mushrooms right here in Sparks, Nevada. Farm-direct freshness for local kitchens and home growers.',
    },
    {rel: 'canonical', href: '/service-areas/sparks'},
  ];
};

export default function ServiceAreaSparks() {
  const nonce = useNonce();

  return (
    <div>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> /{' '}
            <Link to="/service-areas">Service Areas</Link> / Sparks
          </div>
          <h1 className={styles.title}>Grown Right Here in Sparks, Nevada</h1>
          <p className={styles.lede}>
            This is where the farm actually is. Every mushroom we sell fresh
            is cut on-site in Sparks, not shipped in and relabeled &mdash;
            which means Sparks kitchens and home cooks are buying about as
            close to the source as it gets.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/availability" className={styles.cta}>
              Plan Your Harvest &rarr;
            </Link>
            <Link to="/collections/grow-kits" className={styles.ctaSecondary}>
              Shop grow kits
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap section-padding">
        <div className={styles.section}>
          <h2>Straight from the source</h2>
          <p>
            Because there&rsquo;s no distributor and no cold-storage layover
            between our grow rooms and a Sparks kitchen, we can cut to order
            more often here than anywhere else on our route. If you&rsquo;re
            local, you&rsquo;re not buying mushrooms that were harvested to
            fit someone else&rsquo;s delivery schedule.
          </p>

          <h2>Nevada Producer Certificate #5868</h2>
          <p>
            Sierra High Mushrooms is a licensed Nevada producer operating out
            of Sparks. We&rsquo;re a working farm, not a reseller &mdash; the
            same team that runs the cultivation rooms answers questions about
            an order, usually the same day.
          </p>

          <h2>For Sparks restaurants and home cooks</h2>
          <p>
            Restaurants get the same{' '}
            <Link to="/availability">Plan Your Harvest</Link> system used
            across our whole delivery region &mdash; weekly capacity, lead
            time by strain, and standing-order support. Home growers can skip
            the delivery question entirely and pick up{' '}
            <Link to="/collections/grow-kits">grow kits</Link> or{' '}
            <Link to="/collections/mycology-supplies">cultivation supplies</Link>{' '}
            straight from the farm that makes them.
          </p>
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutTitle}>Order direct</div>
          <p className={styles.calloutBody}>
            Restaurants can start a standing order; home cooks and growers
            can shop the catalog directly.
          </p>
          <Link to="/availability" className={styles.cta}>
            Plan Your Sparks Harvest &rarr;
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Farm-direct specialty mushroom supply',
            provider: {'@id': 'https://sierrahighmushrooms.com/#business'},
            areaServed: {'@type': 'City', name: 'Sparks, NV'},
            url: 'https://sierrahighmushrooms.com/service-areas/sparks',
          }),
        }}
      />
    </div>
  );
}
