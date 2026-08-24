import { Link } from 'react-router';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
    Shop: [
      { label: 'Grow Kits', href: '/collections/grow-kits' },
      { label: 'Mycology Supplies', href: '/collections/mycology-supplies' },
      { label: 'Fresh Produce', href: '/collections/fresh-produce' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Returns & Refunds', href: '/returns' },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Footer Columns */}
        <div className={styles.columns}>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className={styles.column}>
              <h4 className={styles.title}>{title}</h4>
              <ul className={styles.links}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Copyright & Social */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Sierra High Mushrooms. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
