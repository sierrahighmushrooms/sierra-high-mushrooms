/**
 * Minimal Resend wrapper shared by the site's inquiry forms.
 *
 * Sends from Resend's shared test domain until a custom sending domain
 * is verified for sierrahighmushrooms.com. Until then mail is delivered
 * but is more likely to be filtered as spam.
 */
const FROM_ADDRESS = 'Sierra High Mushrooms <onboarding@resend.dev>';

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Renders label/value pairs as a simple HTML table. */
export function renderRows(heading: string, rows: Array<[string, string]>) {
  return `
    <h2>${escapeHtml(heading)}</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
              value,
            )}</td></tr>`,
        )
        .join('')}
    </table>
  `;
}

export type SendEmailResult =
  | {ok: true}
  | {ok: false; status: number; error: string};

export async function sendNotificationEmail({
  env,
  subject,
  html,
  replyTo,
}: {
  env: Record<string, string | undefined>;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendEmailResult> {
  const apiKey = env.RESEND_API_KEY;
  const to = env.AVAILABILITY_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.error(
      'Email is not configured: RESEND_API_KEY or AVAILABILITY_NOTIFICATION_EMAIL is missing',
    );
    return {
      ok: false,
      status: 500,
      error: 'Form is not configured. Please try again later.',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        ...(replyTo ? {reply_to: replyTo} : {}),
        subject,
        html,
      }),
    });

    if (!response.ok) {
      console.error('Resend API error:', response.status, await response.text());
      return {
        ok: false,
        status: 502,
        error: 'Could not send your message. Please try again.',
      };
    }

    return {ok: true};
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return {
      ok: false,
      status: 500,
      error: 'Could not send your message. Please try again.',
    };
  }
}
