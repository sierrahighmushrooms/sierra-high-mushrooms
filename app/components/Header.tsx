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
          <Link to="/search" className={styles.iconButton} aria-label="Search">
            <span aria-hidden="true">🔍</span>
          </Link>
          <Link to="/cart" className={styles.cartButton} aria-label="Cart">
            <span aria-hidden="true">🛒</span>
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
