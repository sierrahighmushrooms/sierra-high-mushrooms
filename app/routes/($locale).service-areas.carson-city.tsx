import {Link} from 'react-router';
import {useNonce} from '@shopify/hydrogen';
import type {Route} from './+types/($locale).service-areas.carson-city';
import styles from '~/components/ServiceArea.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Year-Round Mushroom Supplier for Carson City Restaurants | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Grown-to-order gourmet mushrooms delivered to Carson City on a planned, year-round schedule. Plan your harvest with Sierra High Mushrooms.',
    },
    {rel: 'canonical', href: '/service-areas/carson-city'},
  ];
};

export default function ServiceAreaCarsonCity() {
  const nonce = useNonce();

  return (
    <div>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> /{' '}
            <Link to="/service-areas">Service Areas</Link> / Carson City
          </div>
          <h1 className={styles.title}>
            Fresh Mushrooms for Carson City, Year-Round
          </h1>
          <p className={styles.lede}>
            We run a regional delivery route from our Sparks farm down into
            Carson City for restaurants that want specialty mushrooms on a
            planned, recurring basis, all year round.
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
          <h2>Fresh mushrooms, every week of the year</h2>
          <p>
            We grow every strain in climate-controlled rooms on our Sparks
            farm, so production isn&rsquo;t tied to an outdoor growing
            season. Carson City kitchens can plan the same specialty strains
            into a menu in January as in July, on the same predictable
            schedule.
          </p>

          <h2>How grown-to-order works</h2>
          <p>
            Rather than growing a fixed batch and hoping it sells, we plan
            each harvest around what&rsquo;s actually been requested through{' '}
            <Link to="/availability">Plan Your Harvest</Link>. You pick the
            strains, tell us roughly how much you need and how often, and we
            schedule production to match &mdash; lead times run from about
            four weeks for fast-fruiting oysters up to several months for
            slower species and seasonal outdoor crops.
          </p>

          <h2>Delivery to Carson City &amp; the Carson Valley</h2>
          <p>
            Carson City sits on our regional route between Sparks and the
            broader Carson Valley. If your kitchen is in Minden, Gardnerville
            or nearby, the same standing-order process applies &mdash; get in
            touch and we&rsquo;ll fold your order into the route.
          </p>
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutTitle}>Plan Year-Round Mushroom Supply</div>
          <p className={styles.calloutBody}>
            Tell us what your kitchen needs and we&rsquo;ll build it into our
            year-round production schedule.
          </p>
          <Link to="/availability" className={styles.cta}>
            Plan Your Carson City Harvest &rarr;
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
            serviceType: 'Year-round specialty mushroom supply for restaurants',
            provider: {'@id': 'https://sierrahighmushrooms.com/#business'},
            areaServed: {'@type': 'City', name: 'Carson City, NV'},
            url: 'https://sierrahighmushrooms.com/service-areas/carson-city',
          }),
        }}
      />
    </div>
  );
}
