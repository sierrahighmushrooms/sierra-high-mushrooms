/**
 * Primary navigation destinations.
 *
 * Shared by the desktop header nav and the mobile menu drawer so the two can
 * never drift apart. Every href points at a real route that already ships on
 * the site (see app/routes).
 */
export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  {label: 'Grow Kits', href: '/collections/grow-kits'},
  {label: 'Mycology Supplies', href: '/collections/mycology-supplies'},
  {label: 'Fresh Produce', href: '/collections/fresh-produce'},
  {label: 'For Restaurants', href: '/availability'},
  {label: 'About', href: '/about'},
];
