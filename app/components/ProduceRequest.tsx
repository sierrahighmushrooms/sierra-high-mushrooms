import {useRef, useState} from 'react';
import {useFetcher} from 'react-router';
import {Button} from './Button';
import {
  CUSTOMER_TYPES,
  PRODUCE_ITEMS,
  getProduceImage,
  type CustomerType,
  type ProduceItem,
} from '~/lib/produce-data';
import type {ActionResponse} from '~/routes/($locale).produce-request';
import styles from './ProduceRequest.module.css';

function LeafIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M52 12C28 12 12 26 12 44c0 3 .5 5 1.5 7 2 .6 4 .9 6.5.9C40 52 52 36 52 12Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 50C22 38 32 28 46 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProduceImage({item}: {item: ProduceItem}) {
  const src = getProduceImage(item.id);

  return (
    <div className={styles.media}>
      {src ? (
        <img src={src} alt={item.imageAlt} loading="lazy" />
      ) : (
        <div className={styles.placeholder}>
          <LeafIcon />
        </div>
      )}
    </div>
  );
}

export function ProduceRequest() {
  const fetcher = useFetcher<ActionResponse>();
  const formRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [customerType, setCustomerType] = useState<CustomerType | ''>('');

  const isSubmitting = fetcher.state !== 'idle';
  const submitted = fetcher.data?.success === true;
  const submitError =
    fetcher.data?.success === false ? fetcher.data.error : null;
  const isBusiness = customerType === CUSTOMER_TYPES[0];

  function toggle(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function requestItem(name: string) {
    const wasSelected = selected.has(name);
    toggle(name);
    if (!wasSelected) {
      formRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  return (
    <section className={styles.section} aria-labelledby="produce-request-title">
      <div className="wrap">
        <div className={styles.intro}>
          <h2 id="produce-request-title">Request fresh basil</h2>
          <p>
            Restaurants and home cooks can ask for fresh basil. Pick what you
            want, tell us how much, and we&rsquo;ll reply with availability and
            pricing.
          </p>
        </div>

        <div className={styles.cards}>
          {PRODUCE_ITEMS.map((item) => {
            const isSelected = selected.has(item.name);
            return (
              <article
                key={item.id}
                className={`${styles.card} ${isSelected ? styles.selected : ''}`}
              >
                <ProduceImage item={item} />
                <div className={styles.cardBody}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <Button
                    type="button"
                    variant={isSelected ? 'primary' : 'secondary'}
                    className={styles.cardAction}
                    aria-pressed={isSelected}
                    onClick={() => requestItem(item.name)}
                  >
                    {isSelected ? `${item.name} added ✓` : `Request ${item.name}`}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.formCard} ref={formRef} id="request-form">
          {submitted ? (
            <div className={styles.successMessage} role="status">
              <h3>Request sent</h3>
              <p>
                Thanks &mdash; we&rsquo;ll reply by email with availability and
                pricing.
              </p>
            </div>
          ) : (
            <fetcher.Form method="post" action="/produce-request">
              <h3>Send your request</h3>
              <p className={styles.formLead}>
                It goes straight to our team. No account needed.
              </p>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>What would you like?</legend>
                <div className={styles.choices}>
                  {PRODUCE_ITEMS.map((item) => (
                    <label key={item.id} className={styles.choice}>
                      <input
                        type="checkbox"
                        name="products"
                        value={item.name}
                        checked={selected.has(item.name)}
                        onChange={() => toggle(item.name)}
                      />
                      {item.name}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>I am a</legend>
                <div className={styles.choices}>
                  {CUSTOMER_TYPES.map((type) => (
                    <label key={type} className={styles.choice}>
                      <input
                        type="radio"
                        name="customerType"
                        value={type}
                        required
                        checked={customerType === type}
                        onChange={() => setCustomerType(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </fieldset>

              {isBusiness && (
                <div className={styles.field}>
                  <label htmlFor="produce-business">
                    Restaurant/business name
                  </label>
                  <input
                    id="produce-business"
                    name="businessName"
                    type="text"
                    autoComplete="organization"
                    required
                  />
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="produce-name">Your name</label>
                  <input
                    id="produce-name"
                    name="contactName"
                    type="text"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="produce-email">Email</label>
                  <input
                    id="produce-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="produce-phone">
                    Phone <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="produce-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="produce-quantity">
                    How much? <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="produce-quantity"
                    name="quantity"
                    type="text"
                    placeholder="e.g. 2 lb a week"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="produce-notes">
                  Anything else <span className="optional">(optional)</span>
                </label>
                <textarea id="produce-notes" name="notes" rows={3} />
              </div>

              <div className={styles.trap} aria-hidden="true">
                <label htmlFor="produce-website">Website</label>
                <input
                  id="produce-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
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
                Send request
              </Button>
            </fetcher.Form>
          )}
        </div>
      </div>
    </section>
  );
}
