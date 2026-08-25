import {useState, useRef, useCallback} from 'react';
import type {Route} from './+types/availability';
import {AvailabilityHeader} from '~/components/AvailabilityHeader';
import {HarvestBoardTable} from '~/components/HarvestBoardTable';
import {StickyRequestBar} from '~/components/StickyRequestBar';
import {AvailabilityInquiry} from '~/components/AvailabilityInquiry';
import {HARVEST_BOARD} from '~/lib/harvest-data';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Current Availability | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        "See what's ready to harvest this week and request it for your kitchen.",
    },
  ];
};

export default function Availability() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const inquiryRef = useRef<HTMLDivElement>(null);

  const toggleItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const scrollToInquiry = useCallback(() => {
    inquiryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const selectedItems = HARVEST_BOARD.filter((item) =>
    selectedIds.has(item.id),
  );

  return (
    <>
      <AvailabilityHeader
        updatedLabel="Monday, Aug 24"
        nextUpdateLabel="Monday"
        orderCutoffLabel="Thursday 4pm for Friday delivery"
      />

      <div className="wrap">
        <div className="section-padding">
          <HarvestBoardTable
            selectedIds={selectedIds}
            onToggle={toggleItem}
          />
        </div>
      </div>

      <AvailabilityInquiry
        ref={inquiryRef}
        selectedItems={selectedItems}
        onRemoveItem={removeItem}
      />

      <StickyRequestBar
        selectedItems={selectedItems}
        onClear={clearSelection}
        onRequest={scrollToInquiry}
      />
    </>
  );
}
