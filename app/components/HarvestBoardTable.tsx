import {HARVEST_BOARD, STATUS_LABELS, type HarvestItem} from '~/lib/harvest-data';
import styles from './HarvestBoardTable.module.css';

interface HarvestBoardTableProps {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function HarvestBoardTable({
  selectedIds,
  onToggle,
}: HarvestBoardTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.checkboxCell}>
              <span className="sr-only">Select</span>
            </th>
            <th>Variety</th>
            <th>Status</th>
            <th>Approx. weekly</th>
            <th>Lead time</th>
          </tr>
        </thead>
        <tbody>
          {HARVEST_BOARD.map((item) => (
            <HarvestRow
              key={item.id}
              item={item}
              selected={selectedIds.has(item.id)}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HarvestRow({
  item,
  selected,
  onToggle,
}: {
  item: HarvestItem;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  const isAvailable = item.status !== 'soon';

  const toggle = () => {
    if (isAvailable) onToggle(item.id);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (!isAvailable) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onToggle(item.id);
    }
  };

  return (
    <tr
      className={`${styles.row} ${selected ? styles.selected : ''} ${
        !isAvailable ? styles.unavailable : ''
      }`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={!isAvailable || undefined}
      aria-label={`${item.variety}, ${STATUS_LABELS[item.status]}`}
      tabIndex={isAvailable ? 0 : undefined}
    >
      <td className={`${styles.cell} ${styles.checkboxCell}`}>
        <span
          className={`${styles.checkbox} ${selected ? styles.checked : ''} ${
            !isAvailable ? styles.disabled : ''
          }`}
          aria-hidden="true"
        >
          {selected && '✓'}
        </span>
      </td>
      <td className={`${styles.cell} ${styles.varietyCell}`}>
        <span className={styles.varietyLabel}>Variety</span>
        <span className={styles.variety}>{item.variety}</span>
      </td>
      <td className={`${styles.cell} ${styles.statusCell}`}>
        <div className={styles.statusLabel}>
          <span className={`${styles.statusText} ${styles[item.status]}`}>
            {STATUS_LABELS[item.status]}
          </span>
        </div>
        <div className={styles.statusBar}>
          <div
            className={`${styles.statusBarFill} ${styles[item.status]}`}
            style={{width: `${item.fillPercent}%`}}
          />
        </div>
      </td>
      <td className={`${styles.cell} ${styles.metaCell}`}>
        <span className={styles.metaLabel}>Approx. weekly</span>
        {item.approxWeekly ? (
          <span className={styles.metaText}>{item.approxWeekly}</span>
        ) : (
          <span className={styles.unavailableText}>Not next week</span>
        )}
      </td>
      <td className={`${styles.cell} ${styles.metaCell}`}>
        <span className={styles.metaLabel}>Lead time</span>
        {item.leadTime ? (
          <span className={styles.metaText}>{item.leadTime}</span>
        ) : (
          <span className={styles.unavailableText}>&mdash;</span>
        )}
      </td>
    </tr>
  );
}
