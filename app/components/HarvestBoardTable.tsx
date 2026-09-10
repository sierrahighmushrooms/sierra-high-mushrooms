import {
  HARVEST_BOARD,
  PROGRAM_LABELS,
  type HarvestItem,
  type HarvestProgram,
} from '~/lib/harvest-data';
import styles from './HarvestBoardTable.module.css';

interface HarvestBoardTableProps {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

const PROGRAM_CLASS: Record<HarvestProgram, string> = {
  regular: 'programRegular',
  'grown-to-order': 'programGrownToOrder',
  'special-order': 'programSpecial',
  seasonal: 'programSeasonal',
};

export function HarvestBoardTable({
  selectedIds,
  onToggle,
}: HarvestBoardTableProps) {
  return (
    <div>
      <h2 className={styles.boardHeading}>Mushrooms We Grow</h2>
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
              <th>Program</th>
              <th>Approx. Weekly</th>
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

  const programLabel = PROGRAM_LABELS[item.program];

  return (
    <tr
      className={`${styles.row} ${selected ? styles.selected : ''} ${
        item.seasonal ? styles.seasonalRow : ''
      }`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="checkbox"
      aria-checked={selected}
      aria-label={`${item.variety}, ${programLabel}${
        item.seasonal ? ', seasonal outdoor crop' : ''
      }`}
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
          <span className={styles.seasonalNote}>Outdoor · seasonal crop</span>
        )}
      </td>
      <td className={`${styles.cell} ${styles.programCell}`}>
        <span
          className={`${styles.programBadge} ${
            styles[PROGRAM_CLASS[item.program]]
          }`}
        >
          {programLabel}
        </span>
      </td>
      <td className={`${styles.cell} ${styles.metaCell}`}>
        <span className={styles.metaLabel}>Approx. weekly</span>
        <span className={styles.metaText}>
          {item.approxWeekly ?? 'By Request'}
        </span>
      </td>
      <td className={`${styles.cell} ${styles.metaCell}`}>
        <span className={styles.metaLabel}>Lead time</span>
        <span className={styles.metaText}>{item.leadTime}</span>
      </td>
    </tr>
  );
}
