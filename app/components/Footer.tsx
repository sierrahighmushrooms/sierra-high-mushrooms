import { Link } from 'react-router';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'For Restaurants', href: '/availability' },
      { label: 'Service Areas', href: '/service-areas' },
    ],
    Shop: [
      { label: 'Grow Kits', href: '/collections/grow-kits' },
      { label: 'Mycology Supplies', href: '/collections/mycology-supplies' },
      { label: 'Fresh Produce', href: '/collections/fresh-produce' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/policies/privacy-policy' },
      { label: 'Terms of Service', href: '/policies/terms-of-service' },
      { label: 'Returns & Refunds', href: '/policies/refund-policy' },
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
          <div className={styles.bottomText}>
            <p className={styles.copyright}>
              © {currentYear} Sierra High Mushrooms. All rights reserved.
            </p>
            <p className={styles.certificate}>
              Nevada Producer Certificate #5868
            </p>
          </div>
          <div className={styles.social}>
            <a href="https://www.instagram.com/sierrahighmushrooms/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@sierrahighmushrooms/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              TikTok
            </a>
            <a href="https://www.facebook.com/people/Sierra-High-Mushrooms/61591580947654/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
