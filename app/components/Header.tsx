import {Link} from 'react-router';
import {useAside} from '~/components/Aside';
import {PRIMARY_NAV} from '~/lib/nav';
import styles from './Header.module.css';

interface HeaderProps {
  cartCount?: number;
}

export function Header({cartCount = 0}: HeaderProps) {
  const {type, open} = useAside();
  const menuOpen = type === 'mobile';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Sierra High Mushrooms
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop} aria-label="Primary">
          {PRIMARY_NAV.map((link) => (
            <Link key={link.href} to={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className={styles.ctas}>
          <Link to="/cart" className={styles.cartButton} aria-label="Cart">
            <svg
              className={styles.cartIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          type="button"
          className={styles.mobileToggle}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          onClick={() => open('mobile')}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
