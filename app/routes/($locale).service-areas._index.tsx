import {Link} from 'react-router';
import {useNonce} from '@shopify/hydrogen';
import type {Route} from './+types/service-areas._index';
import styles from '~/components/ServiceArea.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Service Areas | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Sierra High Mushrooms grows specialty mushrooms at our farm in Sparks, Nevada and delivers grown-to-order to restaurants across Reno, Sparks, Carson City, Truckee and Lake Tahoe.',
    },
    {rel: 'canonical', href: '/service-areas'},
  ];
};

const MARKETS = [
  {
    name: 'Reno',
    href: '/service-areas/reno',
    copy: 'Restaurant and chef delivery from our Sparks farm.',
  },
  {
    name: 'Sparks',
    href: '/service-areas/sparks',
    copy: 'Mushrooms grown locally at the source.',
  },
  {
    name: 'Carson City',
    href: '/service-areas/carson-city',
    copy: 'Regional grown-to-order restaurant supply.',
  },
  {
    name: 'Truckee',
    href: '/service-areas/truckee',
    copy: 'Planned specialty mushroom supply for mountain restaurants and hospitality.',
  },
  {
    name: 'Lake Tahoe',
    href: '/service-areas/lake-tahoe',
    copy: 'Grown-to-order specialty mushrooms for Tahoe Basin kitchens.',
  },
];

export default function ServiceAreasHub() {
  const nonce = useNonce();

  return (
    <div>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> / Service Areas
          </div>
          <h1 className={styles.title}>
            Where We Deliver Fresh, Grown-to-Order Mushrooms
          </h1>
          <p className={styles.lede}>
            Sierra High Mushrooms is a specialty mushroom farm in Sparks,
            Nevada. We plan production around real restaurant and chef
            orders, then run a regional delivery route rather than holding
            loose inventory and hoping it sells &mdash; currently reaching
            Reno, Sparks, Carson City, Truckee and the Lake Tahoe Basin.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/availability" className={styles.cta}>
              Plan Your Harvest &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap section-padding">
        <div className={styles.cardGrid}>
          {MARKETS.map((market) => (
            <Link key={market.href} to={market.href} className={styles.card}>
              <span className={styles.cardTitle}>{market.name}</span>
              <span className={styles.cardCopy}>{market.copy}</span>
              <span className={styles.cardLink}>See details &rarr;</span>
            </Link>
          ))}
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutTitle}>How the route works</div>
          <p className={styles.calloutBody}>
            Every market above is served from the same Sparks farm &mdash;
            we don&rsquo;t operate a second location or warehouse in any of
            these cities. Restaurants and kitchens tell us the strains,
            volume and frequency they need on our{' '}
            <Link to="/availability">Plan Your Harvest</Link> board, and we
            grow to that plan rather than guessing at demand ahead of time.
            Lead times vary by strain, from a few weeks for fast-fruiting
            oysters to several months for Wine Cap, which is grown outdoors
            and seasonal.
          </p>
          <Link to="/availability" className={styles.ctaSecondary}>
            See what we grow &rarr;
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Sierra High Mushrooms Service Areas',
            url: 'https://sierrahighmushrooms.com/service-areas',
            about: {'@id': 'https://sierrahighmushrooms.com/#business'},
          }),
        }}
      />
    </div>
  );
}
