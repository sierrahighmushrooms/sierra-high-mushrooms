export type HarvestStatus = 'peak' | 'limited' | 'soon';

export interface HarvestItem {
  id: string;
  variety: string;
  status: HarvestStatus;
  fillPercent: number;
  approxWeekly: string | null;
  leadTime: string | null;
}

export const HARVEST_BOARD: HarvestItem[] = [
  {
    id: 'blue-oyster',
    variety: 'Blue Oyster',
    status: 'peak',
    fillPercent: 100,
    approxWeekly: '18–25 lb',
    leadTime: '2 days',
  },
  {
    id: 'lions-mane',
    variety: "Lion's Mane",
    status: 'limited',
    fillPercent: 45,
    approxWeekly: '6–9 lb',
    leadTime: '3 days',
  },
  {
    id: 'pink-oyster',
    variety: 'Pink Oyster',
    status: 'peak',
    fillPercent: 100,
    approxWeekly: '10–14 lb',
    leadTime: '2 days',
  },
  {
    id: 'king-trumpet',
    variety: 'King Trumpet',
    status: 'soon',
    fillPercent: 0,
    approxWeekly: null,
    leadTime: null,
  },
  {
    id: 'sweet-basil',
    variety: 'Sweet Basil',
    status: 'peak',
    fillPercent: 100,
    approxWeekly: 'By the case',
    leadTime: '1–2 days',
  },
  {
    id: 'thai-basil',
    variety: 'Thai Basil',
    status: 'peak',
    fillPercent: 100,
    approxWeekly: 'By the case',
    leadTime: '1–2 days',
  },
];

export const STATUS_LABELS: Record<HarvestStatus, string> = {
  peak: 'PEAK',
  limited: 'LIMITED',
  soon: 'SOON',
};

export const CITY_OPTIONS = [
  'Reno',
  'Sparks',
  'Carson City',
  'Truckee',
  'Other',
];
