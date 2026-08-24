import {useState} from 'react';
import type {ProductFragment} from 'storefrontapi.generated';
import styles from './ProductDetailTabs.module.css';

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface ProductDetailTabsProps {
  tabs: TabData[];
}

export function ProductDetailTabs({tabs}: ProductDetailTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.tabBar}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${activeTabIndex === index ? styles.active : ''}`}
            onClick={() => setActiveTabIndex(index)}
            aria-selected={activeTabIndex === index}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tabContent} ${activeTabIndex === index ? styles.active : ''}`}
            role="tabpanel"
            aria-hidden={activeTabIndex !== index}
          >
            <div className={styles.contentBlock}>{tab.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SpecTable({specs}: {specs: Array<{label: string; value: string}>}) {
  return (
    <table className={styles.specTable}>
      <thead>
        <tr>
          <th>Specification</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {specs.map((spec, index) => (
          <tr key={index}>
            <td className={styles.specLabel}>{spec.label}</td>
            <td>{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function NumberedList({items}: {items: string[]}) {
  return (
    <ol className={styles.numberedList}>
      {items.map((item, index) => (
        <li key={index} className={styles.numberedListItem}>
          {item}
        </li>
      ))}
    </ol>
  );
}
