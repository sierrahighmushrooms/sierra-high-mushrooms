import { Link, useRouteLoaderData } from 'react-router';
import type { RootLoader } from '~/root';
import styles from './Header.module.css';

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const data = useRouteLoaderData<RootLoader>('root');

  const navLinks = [
    { label: 'Grow Kits', href: '/collections/grow-kits' },
    { label: 'Mycology Supplies', href: '/collections/mycology-supplies' },
    { label: 'Fresh Produce', href: '/collections/fresh-produce' },
    { label: 'For Restaurants', href: '/availability' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Sierra High Mushrooms
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop}>
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className={styles.ctas}>
          <Link to="/search" className={styles.iconButton} aria-label="Search">
            <span>🔍</span>
          </Link>
          <Link to="/cart" className={styles.cartButton}>
            <span>🛒</span>
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className={styles.mobileToggle} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
