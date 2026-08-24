import {useState} from 'react';
import styles from './CollectionSEOSection.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface CollectionSEOSectionProps {
  title: string;
  content: string[];
  faqs: FAQItem[];
}

export function CollectionSEOSection({
  title,
  content,
  faqs,
}: CollectionSEOSectionProps) {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Content Column */}
        <div>
          <h2>{title}</h2>
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ Column */}
        <div>
          <h3 className={styles.faqTitle}>Frequently Asked</h3>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() =>
                  setOpenFAQIndex(openFAQIndex === index ? null : index)
                }
                aria-expanded={openFAQIndex === index}
              >
                <span>{faq.question}</span>
                <span
                  className={`${styles.faqToggle} ${
                    openFAQIndex === index ? styles.open : ''
                  }`}
                >
                  ↓
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openFAQIndex === index ? styles.open : ''
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
