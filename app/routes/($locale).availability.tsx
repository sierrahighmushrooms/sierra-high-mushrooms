import {useState, useRef, useCallback} from 'react';
import {data} from 'react-router';
import type {Route} from './+types/availability';
import {AvailabilityHeader} from '~/components/AvailabilityHeader';
import {HarvestBoardTable} from '~/components/HarvestBoardTable';
import {StickyRequestBar} from '~/components/StickyRequestBar';
import {AvailabilityInquiry} from '~/components/AvailabilityInquiry';
import {HARVEST_BOARD} from '~/lib/harvest-data';
import {renderRows, sendNotificationEmail} from '~/lib/send-email';

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

export type ActionResponse = {
  success: boolean;
  error?: string;
};

export async function action({
  request,
  context,
}: Route.ActionArgs): Promise<Response> {
  if (request.method !== 'POST') {
    return data({success: false, error: 'Method not allowed'}, {status: 405});
  }

  const env = context.env as unknown as Record<string, string | undefined>;
  const form = await request.formData();
  const businessName = String(form.get('businessName') || '').trim();
  const contactName = String(form.get('contactName') || '').trim();
  const email = String(form.get('email') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const city = String(form.get('city') || '').trim();
  const weeklyVolume = String(form.get('weeklyVolume') || '').trim();
  const notes = String(form.get('notes') || '').trim();
  const interestedIn = String(form.get('interestedIn') || '').trim();

  if (!businessName || !contactName || !email || !city) {
    return data(
      {success: false, error: 'Please fill in all required fields.'},
      {status: 400},
    );
  }

  const rows: Array<[string, string]> = [
    ['Business', businessName],
    ['Contact', contactName],
    ['Email', email],
    ['Phone', phone || '—'],
    ['City', city],
    ['Weekly volume', weeklyVolume || '—'],
    ['Interested in', interestedIn || '—'],
    ['Notes', notes || '—'],
  ];

  const result = await sendNotificationEmail({
    env,
    subject: `Availability request from ${businessName}`,
    html: renderRows('New availability request', rows),
    replyTo: email,
  });

  if (!result.ok) {
    return data({success: false, error: result.error}, {status: result.status});
  }

  return data({success: true});
}

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
