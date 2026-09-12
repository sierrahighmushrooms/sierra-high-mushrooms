import {Link} from 'react-router';
import {useNonce} from '@shopify/hydrogen';
import type {Route} from './+types/service-areas.reno';
import styles from '~/components/ServiceArea.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Fresh & Gourmet Mushrooms for Reno Restaurants | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Grown-to-order specialty mushrooms delivered to Reno restaurants from our Sparks, NV farm — oyster, lion’s mane, shiitake and more. Plan your harvest.',
    },
    {rel: 'canonical', href: '/service-areas/reno'},
  ];
};

export default function ServiceAreaReno() {
  const nonce = useNonce();

  return (
    <div>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> /{' '}
            <Link to="/service-areas">Service Areas</Link> / Reno
          </div>
          <h1 className={styles.title}>
            Fresh Mushrooms, Grown to Order &mdash; Delivered to Reno
          </h1>
          <p className={styles.lede}>
            We grow specialty gourmet and medicinal mushrooms on our farm a
            few miles away in Sparks, and run a planned delivery route into
            Reno for restaurants and chefs who want fresher stock than a
            shelf can hold.
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
          <h2>Built for Reno kitchens</h2>
          <p>
            Reno&rsquo;s restaurant scene is the largest we serve, and it&rsquo;s
            close enough to Sparks that a harvest can go from our bags to a
            kitchen the same week it&rsquo;s cut. That short trip matters more
            than it sounds &mdash; wood-loving mushrooms lose texture and
            flavor fast once picked, so the difference between a five-mile
            delivery and a shipment that&rsquo;s spent days in transit shows up
            directly on the plate.
          </p>

          <h2>Grown to order, not held in inventory</h2>
          <p>
            We don&rsquo;t stock a walk-in full of mushrooms and sell down from
            it. Chefs use our <Link to="/availability">Plan Your Harvest</Link>{' '}
            board to select strains, set a rough weekly volume, and tell us
            how often they want to order &mdash; a one-time trial, a weekly
            standing order, or somewhere in between. We plan the next
            harvest around what&rsquo;s actually been requested.
          </p>
          <div className={styles.pointList}>
            <div className={styles.point}>
              <span className={styles.pointIcon}>&#10003;</span>
              <span>Weekly capacity and lead time shown per strain</span>
            </div>
            <div className={styles.point}>
              <span className={styles.pointIcon}>&#10003;</span>
              <span>Standing orders supported alongside one-time requests</span>
            </div>
            <div className={styles.point}>
              <span className={styles.pointIcon}>&#10003;</span>
              <span>Samples available for kitchens evaluating a new supplier</span>
            </div>
          </div>

          <h2>What we grow</h2>
          <p>
            The current catalog runs across oyster varieties, lion&rsquo;s
            mane, shiitake, king trumpet, enoki and more &mdash; all grown on
            a hardwood-based substrate suited to wood-loving species. See the
            full, current list and lead times on{' '}
            <Link to="/availability">Mushrooms We Grow</Link>.
          </p>
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutTitle}>Start a standing order</div>
          <p className={styles.calloutBody}>
            Tell us what your kitchen needs and we&rsquo;ll plan production
            around it &mdash; no minimum commitment to ask.
          </p>
          <Link to="/availability" className={styles.cta}>
            Plan Your Reno Harvest &rarr;
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
            serviceType: 'Specialty mushroom supply for restaurants',
            provider: {'@id': 'https://sierrahighmushrooms.com/#business'},
            areaServed: {'@type': 'City', name: 'Reno, NV'},
            url: 'https://sierrahighmushrooms.com/service-areas/reno',
          }),
        }}
      />
    </div>
  );
}
