import {Link} from 'react-router';
import {Aside, useAside} from '~/components/Aside';
import {PRIMARY_NAV} from '~/lib/nav';
import styles from './MobileMenuAside.module.css';

/**
 * Mobile navigation drawer.
 *
 * Deliberately thin: it reuses the shared <Aside> (overlay, backdrop,
 * Escape-to-close, focus handling) and just fills it with the primary nav so
 * there is only ever one drawer architecture on the site.
 */
export function MobileMenuAside() {
  const {close} = useAside();

  return (
    <Aside type="mobile" heading="Menu">
      <nav className={styles.nav} aria-label="Primary">
        {PRIMARY_NAV.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={styles.link}
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </Aside>
  );
}
