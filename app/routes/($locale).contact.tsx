import {Link, data, useFetcher} from 'react-router';
import type {Route} from './+types/contact';
import {Button} from '~/components/Button';
import {ScrollReveal} from '~/components/ScrollReveal';
import {renderRows, sendNotificationEmail} from '~/lib/send-email';
import styles from '~/components/ContentPage.module.css';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Contact | Sierra High Mushrooms'},
    {
      name: 'description',
      content:
        'Questions about growing, an order, or wholesale? Reach the Sierra High Mushrooms team in Sparks, Nevada — a person answers, usually the same day.',
    },
  ];
};

export type ActionResponse = {
  success: boolean;
  error?: string;
};

const TOPICS = [
  'Growing question',
  'Order or shipping',
  'Wholesale / restaurants',
  'Something else',
];

export async function action({
  request,
  context,
}: Route.ActionArgs): Promise<Response> {
  if (request.method !== 'POST') {
    return data({success: false, error: 'Method not allowed'}, {status: 405});
  }

  const env = context.env as unknown as Record<string, string | undefined>;
  const form = await request.formData();

  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const topic = String(form.get('topic') || '').trim();
  const message = String(form.get('message') || '').trim();

  if (!name || !email || !message) {
    return data(
      {success: false, error: 'Please fill in all required fields.'},
      {status: 400},
    );
  }

  const result = await sendNotificationEmail({
    env,
    subject: `Contact form: ${topic || 'General'} — ${name}`,
    html: renderRows('New contact message', [
      ['Name', name],
      ['Email', email],
      ['Topic', topic || '—'],
      ['Message', message],
    ]),
    replyTo: email,
  });

  if (!result.ok) {
    return data({success: false, error: result.error}, {status: result.status});
  }

  return data({success: true});
}

export default function Contact() {
  const fetcher = useFetcher<ActionResponse>();
  const isSubmitting = fetcher.state !== 'idle';
  const submitted = fetcher.data?.success === true;
  const submitError =
    fetcher.data?.success === false ? fetcher.data.error : null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="wrap">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> / Contact
          </div>
          <h1 className={styles.title}>
            Questions get <em>real answers</em>.
          </h1>
          <p className={styles.lede}>
            No ticket queue and no chatbot — messages come to the people who
            actually grow and pack the orders. Usually answered the same day.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyGrid}>
          <ScrollReveal>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successMessage}>
                  <h3>Message sent</h3>
                  <p>
                    Thanks — we&rsquo;ll get back to you, usually the same day.
                  </p>
                </div>
              ) : (
                <fetcher.Form method="post">
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="name">Your name</label>
                      <input id="name" name="name" type="text" required />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" required />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="topic">What&rsquo;s this about?</label>
                    <select id="topic" name="topic" defaultValue={TOPICS[0]}>
                      {TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} required />
                  </div>

                  {submitError && (
                    <p className={styles.formError} role="alert">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className={styles.submitButton}
                    isLoading={isSubmitting}
                  >
                    Send message
                  </Button>

                  <p className={styles.formFooter}>
                    We reply to every message — usually the same day.
                  </p>
                </fetcher.Form>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.factPanel}>
              <div className={styles.factPanelTitle}>Where we are</div>
              <div className={styles.factRow}>
                <span>BASED IN</span>
                <span>Sparks, Nevada</span>
              </div>
              <div className={styles.factRow}>
                <span>PACKED</span>
                <span>To order, in-house</span>
              </div>
              <div className={styles.factRow}>
                <span>CERTIFICATE</span>
                <span>Nevada Producer #5868</span>
              </div>
            </div>

            <div className={styles.detailList}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Restaurants</span>
                <span className={styles.detailValue}>
                  For weekly availability and wholesale pricing, use the{' '}
                  <Link to="/availability">harvest board</Link> — it goes
                  straight to the same inbox with your selections attached.
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Growing help</span>
                <span className={styles.detailValue}>
                  Tell us what you&rsquo;re working with and where it went
                  sideways. Photos help more than descriptions.
                </span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Orders</span>
                <span className={styles.detailValue}>
                  Include your order number if you have one and we can pull it
                  up right away.
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
