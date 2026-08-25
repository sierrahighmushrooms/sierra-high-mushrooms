import {useState, forwardRef} from 'react';
import {Button} from './Button';
import {CITY_OPTIONS, type HarvestItem} from '~/lib/harvest-data';
import styles from './AvailabilityInquiry.module.css';

interface AvailabilityInquiryProps {
  selectedItems: HarvestItem[];
  onRemoveItem: (id: string) => void;
}

const TRUST_POINTS = [
  'No account needed to ask',
  'Samples are free for Reno/Sparks kitchens',
  'No minimum to start',
  "You'll hear from a person, usually same day",
];

export const AvailabilityInquiry = forwardRef<
  HTMLDivElement,
  AvailabilityInquiryProps
>(function AvailabilityInquiry({selectedItems, onRemoveItem}, ref) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // TODO: wire up to a real backend / email service. For now this
    // simulates submission so the flow can be tested end-to-end.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <h2>How ordering works</h2>
          <div className={styles.pointList}>
            {TRUST_POINTS.map((point) => (
              <div key={point} className={styles.point}>
                <span className={styles.pointIcon}>✓</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formCard}>
          {submitted ? (
            <div className={styles.successMessage}>
              <h3>Request sent</h3>
              <p>
                We&rsquo;ll reply with real availability and pricing &mdash;
                usually the same day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.chipsSection}>
                <span className={styles.chipsLabel}>Interested in</span>
                {selectedItems.length === 0 ? (
                  <span className={styles.chipsEmpty}>
                    Select items from the board above, or just tell us what
                    you need below.
                  </span>
                ) : (
                  <div className={styles.chipsList}>
                    {selectedItems.map((item) => (
                      <span key={item.id} className={styles.chip}>
                        {item.variety}
                        <button
                          type="button"
                          className={styles.chipRemove}
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.variety}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="business-name">Restaurant/business name</label>
                  <input
                    id="business-name"
                    name="businessName"
                    type="text"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" name="contactName" type="text" required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone">
                    Phone <span className="optional">(optional)</span>
                  </label>
                  <input id="phone" name="phone" type="tel" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="city">City</label>
                  <select id="city" name="city" required defaultValue="">
                    <option value="" disabled>
                      Select a city
                    </option>
                    {CITY_OPTIONS.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="weekly-volume">
                    Rough weekly volume{' '}
                    <span className="optional">(optional)</span>
                  </label>
                  <input id="weekly-volume" name="weeklyVolume" type="text" />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="notes">
                  Anything else <span className="optional">(optional)</span>
                </label>
                <textarea id="notes" name="notes" rows={3} />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className={styles.submitButton}
                isLoading={isSubmitting}
              >
                Send request
              </Button>

              <p className={styles.formFooter}>
                We&rsquo;ll reply with real availability and pricing &mdash;
                usually the same day.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});
