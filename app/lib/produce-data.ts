export const PRODUCE_COLLECTION_HANDLE = 'fresh-produce';

export const CUSTOMER_TYPES = ['Restaurant / business', 'Home consumer'] as const;
export type CustomerType = (typeof CUSTOMER_TYPES)[number];

export interface ProduceItem {
  id: string;
  name: string;
  description: string;
  imageAlt: string;
}

export const PRODUCE_ITEMS: ProduceItem[] = [
  {
    id: 'sweet-basil',
    name: 'Sweet Basil',
    description:
      'Sweet, aromatic leaves for pesto, caprese, pizza, and fresh sauces.',
    imageAlt: 'A bunch of fresh sweet basil',
  },
  {
    id: 'thai-basil',
    name: 'Thai Basil',
    description:
      'Anise-scented, peppery leaves that hold up to heat — made for stir-fries, curries, and pho.',
    imageAlt: 'A bunch of fresh Thai basil',
  },
];

// Resolved at build time so a missing file renders the placeholder on the
// server instead of a broken <img> that flashes until hydration.
const imageModules = import.meta.glob<string>(
  '../assets/produce/*.{jpg,jpeg,png,webp}',
  {eager: true, query: '?url', import: 'default'},
);

/** Looks up app/assets/produce/<id>.(jpg|jpeg|png|webp). */
export function getProduceImage(id: string): string | undefined {
  for (const [path, url] of Object.entries(imageModules)) {
    const fileName = path.split('/').pop() ?? '';
    if (fileName.replace(/\.[^.]+$/, '') === id) return url;
  }
  return undefined;
}
