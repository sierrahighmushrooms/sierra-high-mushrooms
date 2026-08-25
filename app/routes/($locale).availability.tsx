import {useState, useRef, useCallback} from 'react';
import {data} from 'react-router';
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

export type ActionResponse = {
  success: boolean;
  error?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function action({
  request,
  context,
}: Route.ActionArgs): Promise<Response> {
  if (request.method !== 'POST') {
    return data({success: false, error: 'Method not allowed'}, {status: 405});
  }

  const env = context.env as unknown as Record<string, string | undefined>;
  const resendApiKey = env.RESEND_API_KEY;
  const notificationEmail = env.AVAILABILITY_NOTIFICATION_EMAIL;

  if (!resendApiKey || !notificationEmail) {
    console.error(
      'Availability inquiry form is missing RESEND_API_KEY or AVAILABILITY_NOTIFICATION_EMAIL',
    );
    return data(
      {success: false, error: 'Form is not configured. Please try again later.'},
      {status: 500},
    );
  }

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

  const htmlBody = `
    <h2>New availability request</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join('')}
    </table>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sierra High Mushrooms <onboarding@resend.dev>',
        to: [notificationEmail],
        reply_to: email,
        subject: `Availability request from ${businessName}`,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorText);
      return data(
        {success: false, error: 'Could not send your request. Please try again.'},
        {status: 502},
      );
    }

    return data({success: true});
  } catch (error) {
    console.error('Failed to send availability request email:', error);
    return data(
      {success: false, error: 'Could not send your request. Please try again.'},
      {status: 500},
    );
  }
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
