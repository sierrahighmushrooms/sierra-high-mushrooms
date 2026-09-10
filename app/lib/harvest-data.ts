export type HarvestProgram =
  | 'regular'
  | 'grown-to-order'
  | 'special-order'
  | 'seasonal';

export interface HarvestItem {
  id: string;
  /** Internal field name kept as `variety`; the UI column is labelled "Strain". */
  variety: string;
  program: HarvestProgram;
  /** Confirmed numeric weekly capacity, or null to show "By Request". */
  approxWeekly: string | null;
  /** Customer-facing planning range: grain inoculation → first harvest. */
  leadTime: string;
  /** Wine Cap: a seasonal outdoor crop, outside the indoor block cycle. */
  seasonal?: boolean;
}

/**
 * Approved restaurant/wholesale strain catalog (owner-supplied).
 *
 * Lead Time here spans the full production cycle — grain inoculation, grain
 * colonization, substrate inoculation, block colonization/maturation, cut /
 * fruiting initiation, first harvest — not just "days after cutting the bag".
 * The ranges are conservative planning estimates, not delivery commitments.
 *
 * Approx. Weekly shows a number only where a confirmed capacity already
 * existed for that exact strain; every other strain shows "By Request".
 */
export const HARVEST_BOARD: HarvestItem[] = [
  {
    id: 'pink-oyster',
    variety: 'Pink Oyster',
    program: 'regular',
    approxWeekly: '10–14 lb',
    leadTime: '4–5 weeks',
  },
  {
    id: 'lions-mane',
    variety: "Lion's Mane",
    program: 'regular',
    approxWeekly: '6–9 lb',
    leadTime: '5–7 weeks',
  },
  {
    id: 'sky-blue-oyster',
    variety: 'Sky Blue Oyster',
    program: 'regular',
    approxWeekly: null,
    leadTime: '4–5 weeks',
  },
  {
    id: 'blue-snow-oyster',
    variety: 'Blue Snow Oyster',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '4–5 weeks',
  },
  {
    id: 'king-blue-oyster',
    variety: 'King Blue Oyster',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '5–6 weeks',
  },
  {
    id: 'black-pearl-king-oyster',
    variety: 'Black Pearl King Oyster',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '5–6 weeks',
  },
  {
    id: 'golden-oyster',
    variety: 'Golden Oyster',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '4–5 weeks',
  },
  {
    id: 'wampus-tongue-pink-oyster',
    variety: 'Wampus Tongue Pink Oyster',
    program: 'special-order',
    approxWeekly: null,
    leadTime: '4–5 weeks',
  },
  {
    id: 'tribbles-lions-mane',
    variety: "Tribbles Lion's Mane",
    program: 'special-order',
    approxWeekly: null,
    leadTime: '5–7 weeks',
  },
  {
    id: 'king-trumpet',
    variety: 'King Trumpet',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '6–8 weeks',
  },
  {
    id: 'chestnut',
    variety: 'Chestnut',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '6–8 weeks',
  },
  {
    id: 'golden-enoki',
    variety: 'Golden Enoki',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '5–7 weeks',
  },
  {
    id: 'appalachian-enoki',
    variety: 'Appalachian Enoki',
    program: 'special-order',
    approxWeekly: null,
    leadTime: '5–7 weeks',
  },
  {
    id: 'shiitake-3790',
    variety: 'Shiitake 3790',
    program: 'grown-to-order',
    approxWeekly: null,
    leadTime: '8–12 weeks',
  },
  {
    id: 'wine-cap',
    variety: 'Wine Cap',
    program: 'seasonal',
    approxWeekly: null,
    leadTime: 'Seasonal · 2–4+ months',
    seasonal: true,
  },
];

export const PROGRAM_LABELS: Record<HarvestProgram, string> = {
  regular: 'Regular Rotation',
  'grown-to-order': 'Grown to Order',
  'special-order': 'Special Order',
  seasonal: 'Seasonal',
};

export const CITY_OPTIONS = ['Reno', 'Sparks', 'Carson City', 'Truckee', 'Other'];
