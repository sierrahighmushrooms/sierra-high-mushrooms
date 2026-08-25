import {Link} from 'react-router';
import type {Route} from './+types/about';
import {ScrollReveal} from '~/components/ScrollReveal';
import styles from '~/components/ContentPage.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'About | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'A family-operated mushroom farm in Sparks, Nevada — growing gourmet mushrooms and supplying cultivation gear to home growers and serious mycologists.',
    },
  ];
};

const FACTS: Array<[string, string]> = [
  ['Location', 'Sparks, Nevada'],
  ['Operation', 'Family-operated'],
  ['Method', 'Sustainable, small-batch'],
  ['Certificate', 'Nevada Producer #5868'],
  ['Ships', 'Across the West'],
];

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> / About
          </div>
          <div className={styles.labelTag}>
            <span className={styles.labelDot} />
            Sparks, Nevada · Est. Farm
          </div>
          <h1 className={styles.title}>
            A farm you could <em>actually visit</em>.
          </h1>
          <p className={styles.lede}>
            Sierra High Mushrooms is a working cultivation business in Sparks,
            Nevada. Everything we sell fresh is grown here — not shipped in
            from somewhere else and relabeled.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <ScrollReveal className={styles.photoBand}>
          <img
            src="https://images.unsplash.com/photo-1770884844724-ac9e36b599e9?fm=jpg&q=80&w=2400&auto=format&fit=crop"
            alt="Cluster of fresh oyster mushrooms"
            loading="lazy"
          />
        </ScrollReveal>

        <div className={styles.bodyGrid}>
          <ScrollReveal className={styles.prose}>
            <h2>How we got here</h2>
            <p>
              We started the way most growers do — a few bags in a spare room,
              a lot of contamination, and a slow education in what actually
              matters. Sterile technique. Consistent substrate. Knowing when a
              culture has turned before it costs you a whole flush.
            </p>
            <p>
              That learning curve is the reason we sell supplies alongside
              fresh mushrooms. The gear we stock is the gear we use, chosen
              because it works reliably rather than because it was cheapest to
              source.
            </p>

            <h2>What we grow</h2>
            <p>
              Gourmet and medicinal varieties — blue and pink oyster, lion&rsquo;s
              mane, king trumpet — plus fresh basil, grown in small batches and
              harvested at peak rather than early for shipping convenience.
              Availability genuinely shifts week to week depending on what is
              flushing, which is why our{' '}
              <Link to="/availability">harvest board</Link> reflects what we can
              actually fill rather than a catalog of everything we could
              theoretically produce.
            </p>

            <h2>Who we supply</h2>
            <p>
              Restaurants and kitchens around Reno and Sparks get fresh
              produce with real lead times and samples at no cost. Home growers
              get kits built to succeed without a steep learning curve. Serious
              cultivators get lab-grade agar, pre-sterilized substrate, and
              sterile tools.
            </p>
            <p>
              Every order is packed to order here in Sparks. If you have a
              question about any of it, a person answers — usually the same
              day.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.factPanel}>
              <div className={styles.factPanelTitle}>Farm Record</div>
              {FACTS.map(([label, value]) => (
                <div key={label} className={styles.factRow}>
                  <span>{label.toUpperCase()}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className={styles.detailList}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>For Restaurants</span>
                <span className={styles.detailValue}>
                  See what&rsquo;s ready this week on the{' '}
                  <Link to="/availability">availability board</Link>.
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Questions</span>
                <span className={styles.detailValue}>
                  <Link to="/contact">Get in touch</Link> — we answer everything
                  ourselves.
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
