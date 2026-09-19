import {Link} from 'react-router';
import {useNonce} from '@shopify/hydrogen';
import type {Route} from './+types/($locale).service-areas.truckee';
import styles from '~/components/ServiceArea.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Fresh Mushroom Supplier for Truckee Restaurants | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Grown-to-order specialty mushrooms planned and delivered to Truckee restaurants and hospitality kitchens from our Sparks, NV farm. Plan your harvest.',
    },
    {rel: 'canonical', href: '/service-areas/truckee'},
  ];
};

export default function ServiceAreaTruckee() {
  const nonce = useNonce();

  return (
    <div>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> /{' '}
            <Link to="/service-areas">Service Areas</Link> / Truckee
          </div>
          <h1 className={styles.title}>
            Grown-to-Order Mushrooms for Truckee Kitchens
          </h1>
          <p className={styles.lede}>
            We grow specialty wood-loving mushrooms on our farm in Sparks and
            plan regional deliveries for restaurants and hospitality kitchens
            in Truckee and the surrounding mountain communities.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/availability" className={styles.cta}>
              Plan Your Harvest &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap section-padding">
        <div className={styles.section}>
          <h2>Mountain kitchens, planned supply</h2>
          <p>
            Restaurants and hospitality kitchens in Truckee often work
            further ahead than a same-day city market allows &mdash; menus
            get planned, events get booked, and a reliable supply of
            specialty mushrooms needs to be arranged rather than picked up on
            short notice. We treat that as the normal case, not an exception:
            tell us what a coming week or season looks like and we plan the
            harvest to match it.
          </p>

          <h2>Why the distance doesn&rsquo;t cost you freshness</h2>
          <p>
            A longer regional trip only hurts quality if the product sat
            around before it left the farm. Because we cut to a planned
            delivery instead of pulling from days-old stock, mushrooms headed
            up to Truckee are harvested with that specific trip in mind
            &mdash; the same discipline that keeps our Reno and Sparks
            deliveries fresh applies here, just planned a little further out.
          </p>

          <h2>Strain-specific lead times</h2>
          <p>
            Because Truckee orders are typically planned ahead rather than
            filled same-day, lead time matters more here than it does closer
            to the farm. Every strain on our{' '}
            <Link to="/availability">Plan Your Harvest</Link> board lists its
            own lead time &mdash; most run roughly four to twelve weeks from
            inoculation to first harvest, with Wine Cap grown outdoors as a
            slower, seasonal crop. Standing orders let us plan further
            forward so a strain is ready when your kitchen needs it, rather
            than starting the clock after you ask.
          </p>
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutTitle}>Set up a mountain-route order</div>
          <p className={styles.calloutBody}>
            Let us know your strains and typical order size, and we&rsquo;ll
            fold your kitchen into the next planned run up the mountain.
          </p>
          <Link to="/availability" className={styles.cta}>
            Plan Your Truckee Harvest &rarr;
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
            serviceType:
              'Specialty mushroom supply for mountain restaurants and hospitality',
            provider: {'@id': 'https://sierrahighmushrooms.com/#business'},
            areaServed: {'@type': 'City', name: 'Truckee, CA'},
            url: 'https://sierrahighmushrooms.com/service-areas/truckee',
          }),
        }}
      />
    </div>
  );
}
