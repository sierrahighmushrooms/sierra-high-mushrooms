import {HARVEST_BOARD, type HarvestItem} from '~/lib/harvest-data';
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
    <div>
      <div className={styles.boardHeader}>
        <span
          className={`${styles.programBadge} ${styles.programGrownToOrder}`}
        >
          Grown to Order
        </span>
        <h2 className={styles.boardHeading}>Mushrooms We Grow</h2>
      </div>
      <p className={styles.boardIntro}>
        Select one or more strains to include them in your harvest request.
      </p>

      <div className={styles.tableWrap}>
        <table className={styles.table} aria-label="Mushrooms we grow">
          <thead>
            <tr>
              <th className={styles.checkboxCell}>
                <span className="sr-only">Select</span>
              </th>
              <th>Strain</th>
              <th>Weekly Capacity</th>
              <th>Lead Time</th>
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

      <p className={styles.boardNote}>
        Lead time is estimated from grain inoculation to first harvest. Actual
        timing varies by strain, order size, growing conditions, and current
        production schedule.
      </p>
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
  const toggle = () => onToggle(item.id);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onToggle(item.id);
    }
  };

  return (
    <tr
      className={`${styles.row} ${selected ? styles.selected : ''}`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="checkbox"
      aria-checked={selected}
      aria-label={
        item.seasonal
          ? `${item.variety}, seasonal outdoor crop`
          : item.variety
      }
      tabIndex={0}
    >
      <td className={`${styles.cell} ${styles.checkboxCell}`}>
        <span
          className={`${styles.checkbox} ${selected ? styles.checked : ''}`}
          aria-hidden="true"
        >
          {selected && '✓'}
        </span>
      </td>
      <td className={`${styles.cell} ${styles.strainCell}`}>
        <span className={styles.strainLabel}>Strain</span>
        <span className={styles.strain}>{item.variety}</span>
        {item.seasonal && (
          <span className={styles.seasonalNote}>Seasonal outdoor crop</span>
        )}
      </td>
      <td className={`${styles.cell} ${styles.metaCell}`}>
        <span className={styles.metaLabel}>Weekly Capacity</span>
        <span className={styles.metaText}>{item.approxWeekly}</span>
      </td>
      <td className={`${styles.cell} ${styles.metaCell}`}>
        <span className={styles.metaLabel}>Lead time</span>
        <span className={styles.metaText}>{item.leadTime}</span>
      </td>
    </tr>
  );
}
