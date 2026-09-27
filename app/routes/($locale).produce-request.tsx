import {data} from 'react-router';
import type {Route} from './+types/produce-request';
import {CUSTOMER_TYPES, PRODUCE_ITEMS} from '~/lib/produce-data';
import {renderRows, sendNotificationEmail} from '~/lib/send-email';

export type ActionResponse = {
  success: boolean;
  error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(form: FormData, name: string, maxLength = 500) {
  return String(form.get(name) || '')
    .trim()
    .slice(0, maxLength);
}

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return data({success: false, error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  // Hidden field real visitors never fill in; bots do. Pretend it worked.
  if (field(form, 'website')) {
    return data({success: true});
  }

  const customerType = field(form, 'customerType');
  const businessName = field(form, 'businessName');
  const contactName = field(form, 'contactName');
  const email = field(form, 'email');
  const phone = field(form, 'phone', 50);
  const quantity = field(form, 'quantity');
  const notes = field(form, 'notes', 2000);

  const validNames = new Set(PRODUCE_ITEMS.map((item) => item.name));
  const products = form
    .getAll('products')
    .map((value) => String(value))
    .filter((value) => validNames.has(value));

  const isBusiness = customerType === CUSTOMER_TYPES[0];

  if (
    !(CUSTOMER_TYPES as readonly string[]).includes(customerType) ||
    !contactName ||
    !email ||
    products.length === 0 ||
    (isBusiness && !businessName)
  ) {
    return data(
      {
        success: false,
        error: 'Please choose at least one product and fill in all required fields.',
      },
      {status: 400},
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return data(
      {success: false, error: 'Please enter a valid email address.'},
      {status: 400},
    );
  }

  const env = context.env as unknown as Record<string, string | undefined>;

  const rows: Array<[string, string]> = [
    ['Requested', products.join(', ')],
    ['Customer type', customerType],
    ['Business', isBusiness ? businessName : '—'],
    ['Contact', contactName],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Quantity', quantity || '—'],
    ['Notes', notes || '—'],
  ];

  const result = await sendNotificationEmail({
    env,
    subject: `Produce request: ${products.join(', ')} — ${
      isBusiness ? businessName : contactName
    }`,
    html: renderRows('New fresh produce request', rows),
    replyTo: email,
  });

  if (!result.ok) {
    return data({success: false, error: result.error}, {status: result.status});
  }

  return data({success: true});
}
