import {Link} from 'react-router';
import {useNonce} from '@shopify/hydrogen';
import type {Route} from './+types/service-areas.lake-tahoe';
import styles from '~/components/ServiceArea.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Fresh Mushroom Supplier for Lake Tahoe Restaurants | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Grown-to-order specialty mushrooms for Lake Tahoe Basin restaurants, resorts and hospitality kitchens, planned and grown at our Sparks, NV farm.',
    },
    {rel: 'canonical', href: '/service-areas/lake-tahoe'},
  ];
};

export default function ServiceAreaLakeTahoe() {
  const nonce = useNonce();

  return (
    <div>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> /{' '}
            <Link to="/service-areas">Service Areas</Link> / Lake Tahoe
          </div>
          <h1 className={styles.title}>
            Fresh, Grown-to-Order Mushrooms for Lake Tahoe
          </h1>
          <p className={styles.lede}>
            Sierra High Mushrooms is a Sparks, Nevada farm supplying
            restaurant, resort and hospitality kitchens around the Lake
            Tahoe Basin &mdash; North Shore and South Shore alike &mdash;
            through planned, grown-to-order production rather than a Tahoe
            storefront or warehouse.
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
          <h2>One farm, one regional route</h2>
          <p>
            We want to be straightforward about this: Sierra High Mushrooms
            doesn&rsquo;t have a second farm, storefront or warehouse
            anywhere in Tahoe. Everything is grown at our Sparks facility and
            brought up to the Basin on a planned regional route, timed to
            match what kitchens have actually ordered rather than shipped
            speculatively.
          </p>

          <h2>For resort and restaurant kitchens</h2>
          <p>
            Lake Tahoe&rsquo;s dining scene runs from casual mountain-town
            spots to resort fine dining, and both rely on specialty
            ingredients being available consistently, not just when a
            delivery happens to have extra stock. Whether you&rsquo;re
            sourcing for a North Shore resort kitchen or a South Shore
            restaurant, the same planning process applies: pick your strains,
            estimate volume and frequency, and we build it into our
            production schedule.
          </p>

          <h2>Planned harvests instead of held inventory</h2>
          <p>
            A standing order is the most reliable way to work with us here
            &mdash; committing to a rough weekly or biweekly volume lets us
            plan a harvest specifically for the Tahoe trip instead of hoping
            we happen to have extra on hand. Lead times are listed per strain
            on <Link to="/availability">Plan Your Harvest</Link>, so you can
            see how far ahead to plan before the first delivery.
          </p>
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutTitle}>Plan your Tahoe route</div>
          <p className={styles.calloutBody}>
            Tell us where in the Basin you&rsquo;re located and what your
            kitchen needs &mdash; we&rsquo;ll work out whether it fits our
            current route.
          </p>
          <Link to="/availability" className={styles.cta}>
            Plan Your Tahoe Harvest &rarr;
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
              'Specialty mushroom supply for resort and restaurant kitchens',
            provider: {'@id': 'https://sierrahighmushrooms.com/#business'},
            areaServed: {'@type': 'Place', name: 'Lake Tahoe Basin'},
            url: 'https://sierrahighmushrooms.com/service-areas/lake-tahoe',
          }),
        }}
      />
    </div>
  );
}
