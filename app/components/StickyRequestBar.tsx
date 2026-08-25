import type {HarvestItem} from '~/lib/harvest-data';
import styles from './StickyRequestBar.module.css';

interface StickyRequestBarProps {
  selectedItems: HarvestItem[];
  onClear: () => void;
  onRequest: () => void;
}

export function StickyRequestBar({
  selectedItems,
  onClear,
  onRequest,
}: StickyRequestBarProps) {
  const visible = selectedItems.length > 0;

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <span className={styles.count}>
            {selectedItems.length} selected
          </span>
          <span className={styles.itemList}>
            {selectedItems.map((item) => item.variety).join(', ')}
          </span>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClear}
          >
            Clear
          </button>
          <button
            type="button"
            className={styles.requestButton}
            onClick={onRequest}
          >
            Request these →
          </button>
        </div>
      </div>
    </div>
  );
}
