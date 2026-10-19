/** Reading order groups the existing scenes; identifiers are stable URL fragments. */
export const chapters = [
  { id: 'familiar-meal', title: 'The familiar meal', scenes: [1, 2] },
  { id: 'behind-the-counter', title: 'Costs behind the counter', scenes: [4] },
  { id: 'impossible-math', title: 'The impossible math', scenes: [3] },
  { id: 'changing-habits', title: 'Changing habits', scenes: [8, 9] },
  { id: 'delivery-question', title: 'The delivery question', scenes: [5, 7, 10] },
] as const;
export type ChapterId = typeof chapters[number]['id'];
export function chapterFromHash(hash: string): ChapterId | null {
  return chapters.find(chapter => `#${chapter.id}` === hash)?.id ?? null;
}

type MenuSource = { restaurant: string; location: string; notes: string; keyPrices: Record<string, string> };
export type MenuEvidence = {
  menuSources: {
    '2015': MenuSource & { archiveUrl: unknown; archiveDate: string };
    '2025': MenuSource & { currentUrl: unknown; accessDate: string };
  };
  priceComparison: { signatureDish: string; price2015: number; price2025: number; percentageIncrease: number; yearSpan: number; inflationContext: string };
};
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
export function safeSourceUrl(value: unknown): string | null {
  if (!text(value)) return null;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}
/** Validate the JSON boundary. A missing number must never silently become zero. */
export function parseMenuEvidence(value: unknown): MenuEvidence | null {
  if (!record(value) || !record(value.menuSources) || !record(value.priceComparison)) return null;
  for (const year of ['2015', '2025']) {
    const source = value.menuSources[year];
    if (!record(source) || !['restaurant', 'location', 'notes'].every(key => text(source[key])) || !record(source.keyPrices) || !Object.values(source.keyPrices).every(text)) return null;
    if (!text(source[year === '2015' ? 'archiveDate' : 'accessDate'])) return null;
    // Broken links do not discard otherwise valid chapter evidence.
  }
  const prices = value.priceComparison;
  if (!text(prices.signatureDish) || !text(prices.inflationContext)) return null;
  for (const key of ['price2015', 'price2025', 'percentageIncrease', 'yearSpan']) {
    if (typeof prices[key] !== 'number' || !Number.isFinite(prices[key])) return null;
  }
  if (Number(prices.price2015) <= 0 || Number(prices.price2025) <= 0 || Number(prices.yearSpan) <= 0) return null;
  const increase = (Number(prices.price2025) / Number(prices.price2015) - 1) * 100;
  if (Math.abs(increase - Number(prices.percentageIncrease)) > 0.01) return null;
  return value as MenuEvidence;
}

/** Scene3's illustrative allocation, not a newly verified industry average. */
export const costs = [
  { label: 'Food costs', percent: 38 }, { label: 'Labour', percent: 38 },
  { label: 'Rent', percent: 18 }, { label: 'Other (insurance, fees)', percent: 10 },
] as const;
export const totalCosts = costs.reduce((total, cost) => total + cost.percent, 0);
export const order = [
  { label: 'Food subtotal', cents: 2400 }, { label: 'Delivery fee', cents: 399 },
  { label: 'Service fee', cents: 420 }, { label: 'Regulatory fee', cents: 200 }, { label: 'Taxes', cents: 170 },
] as const;
export const money = (amount: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
