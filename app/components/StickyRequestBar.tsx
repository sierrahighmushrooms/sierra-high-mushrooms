import {useEffect, useState} from 'react';
import type {HarvestItem} from '~/lib/harvest-data';
import styles from './StickyRequestBar.module.css';

interface StickyRequestBarProps {
  selectedItems: HarvestItem[];
  onClear: () => void;
  onRequest: () => void;
  /** The inquiry form section. The bar steps aside once it is on screen so it
      never covers the form's own actions or the footer below it. */
  anchorRef: React.RefObject<HTMLElement>;
}

export function StickyRequestBar({
  selectedItems,
  onClear,
  onRequest,
  anchorRef,
}: StickyRequestBarProps) {
  const [anchorOnScreen, setAnchorOnScreen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    const el = anchorRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAnchorOnScreen(entry.isIntersecting),
      {threshold: 0, rootMargin: '0px 0px -20% 0px'},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [anchorRef]);

  const visible = selectedItems.length > 0 && !anchorOnScreen;

  return (
    <div
      className={`${styles.bar} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.inner}>
        <div className={styles.info}>
          <span className={styles.count}>{selectedItems.length} selected</span>
          <span className={styles.itemList}>
            {selectedItems.map((item) => item.variety).join(', ')}
          </span>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClear}
            tabIndex={visible ? 0 : -1}
          >
            Clear
          </button>
          <button
            type="button"
            className={styles.requestButton}
            onClick={onRequest}
            tabIndex={visible ? 0 : -1}
          >
            Request these &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
