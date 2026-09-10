export type HarvestProgram = 'grown-to-order';

export interface HarvestItem {
  id: string;
  /** Internal field name kept as `variety`; the UI column is labelled "Strain". */
  variety: string;
  program: HarvestProgram;
  /** Approx. weekly production range shown to restaurants. */
  approxWeekly: string;
  /** Customer-facing planning range: grain inoculation → first harvest. */
  leadTime: string;
  /** Wine Cap: a seasonal outdoor crop, outside the indoor block cycle. */
  seasonal?: boolean;
}

/**
 * Approved restaurant/wholesale strain catalog (owner-supplied).
 *
 * Every strain runs on the same grown-to-order program. Lead Time spans the
 * full production cycle — grain inoculation, grain colonization, substrate
 * inoculation, block colonization/maturation, cut / fruiting initiation, first
 * harvest — not just "days after cutting the bag". The ranges are conservative
 * planning estimates, not delivery commitments.
 *
 * Order groups related strains: blue oysters, then the other oysters, the
 * lion's mane and enoki strains, and Wine Cap last as the seasonal outdoor crop.
 */
export const HARVEST_BOARD: HarvestItem[] = [
  {
    id: 'sky-blue-oyster',
    variety: 'Sky Blue Oyster',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '4–5 weeks',
  },
  {
    id: 'blue-snow-oyster',
    variety: 'Blue Snow Oyster',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '4–5 weeks',
  },
  {
    id: 'king-blue-oyster',
    variety: 'King Blue Oyster',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '5–6 weeks',
  },
  {
    id: 'black-pearl-king-oyster',
    variety: 'Black Pearl King Oyster',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '5–6 weeks',
  },
  {
    id: 'golden-oyster',
    variety: 'Golden Oyster',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '4–5 weeks',
  },
  {
    id: 'wampus-tongue-pink-oyster',
    variety: 'Wampus Tongue Pink Oyster',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '4–5 weeks',
  },
  {
    id: 'tribbles-lions-mane',
    variety: "Tribbles Lion's Mane",
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '5–7 weeks',
  },
  {
    id: 'king-trumpet',
    variety: 'King Trumpet',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '6–8 weeks',
  },
  {
    id: 'chestnut',
    variety: 'Chestnut',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '6–8 weeks',
  },
  {
    id: 'golden-enoki',
    variety: 'Golden Enoki',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '5–7 weeks',
  },
  {
    id: 'appalachian-enoki',
    variety: 'Appalachian Enoki',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '5–7 weeks',
  },
  {
    id: 'shiitake-3790',
    variety: 'Shiitake 3790',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: '8–12 weeks',
  },
  {
    id: 'wine-cap',
    variety: 'Wine Cap',
    program: 'grown-to-order',
    approxWeekly: '40–200 lb',
    leadTime: 'Seasonal · 2–4+ months',
    seasonal: true,
  },
];

export const PROGRAM_LABELS: Record<HarvestProgram, string> = {
  'grown-to-order': 'Grown to Order',
};

export const CITY_OPTIONS = ['Reno', 'Sparks', 'Carson City', 'Truckee', 'Other'];
