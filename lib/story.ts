import { isRecord, isText, isFiniteNumber } from './validation.ts';

/** Reading order groups the existing scenes; identifiers are stable URL fragments. */
export const chapters = [
  { id: 'familiar-meal', title: 'The familiar meal', scenes: [1, 2] },
  { id: 'behind-the-counter', title: 'Costs behind the counter', scenes: [4] },
  { id: 'impossible-math', title: 'The impossible math', scenes: [3] },
  { id: 'changing-habits', title: 'Changing habits', scenes: [8, 9] },
  { id: 'delivery-question', title: 'The delivery question', scenes: [5, 7, 10] },
] as const;
export type ChapterId = typeof chapters[number]['id'];
export type ChapterDefinition = typeof chapters[number];
const referenceTargets = ['sources', 'cost-sources', 'delivery-sources'] as const;
export type StoryTargetId = ChapterId | typeof referenceTargets[number];
function fragmentId(hash: string): string | null {
  if (!hash.startsWith('#')) return null;
  try { return decodeURIComponent(hash.slice(1)); } catch { return null; }
}
export function chapterFromHash(hash: string): ChapterId | null {
  const id = fragmentId(hash);
  return chapters.find(chapter => chapter.id === id)?.id ?? null;
}
export function storyTargetFromHash(hash: string): StoryTargetId | null {
  const id = fragmentId(hash);
  return chapterFromHash(hash) ?? referenceTargets.find(target => target === id) ?? null;
}

type MenuSource = { restaurant: string; location: string; notes: string; keyPrices: Readonly<Record<string, string>> };
export type MenuEvidence = {
  menuSources: {
    '2015': MenuSource & { archiveUrl: string | null; archiveDate: string };
    '2025': MenuSource & { currentUrl: string | null; accessDate: string };
  };
  priceComparison: { signatureDish: string; price2015: number; price2025: number; percentageIncrease: number; yearSpan: number; inflationContext: string };
};
export function safeSourceUrl(value: unknown): string | null {
  if (!isText(value)) return null;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}
function parseMenuSource(value: Record<string, unknown>): MenuSource | null {
  const { restaurant, location, notes, keyPrices } = value;
  if (!isText(restaurant) || !isText(location) || !isText(notes) || !isRecord(keyPrices)) return null;
  const entries: [string, string][] = [];
  for (const [key, price] of Object.entries(keyPrices)) {
    if (!isText(key) || !isText(price)) return null;
    entries.push([key, price]);
  }
  return entries.length ? { restaurant, location, notes, keyPrices: Object.fromEntries(entries) } : null;
}
/** Build a typed snapshot only from validated fields; unavailable links do not discard evidence. */
export function parseMenuEvidence(value: unknown): MenuEvidence | null {
  if (!isRecord(value)) return null;
  const sources = value['menuSources'], comparison = value['priceComparison'];
  if (!isRecord(sources) || !isRecord(comparison)) return null;
  const old = sources['2015'], recent = sources['2025'];
  if (!isRecord(old) || !isRecord(recent)) return null;
  const menu2015 = parseMenuSource(old), menu2025 = parseMenuSource(recent);
  const archiveDate = old['archiveDate'], accessDate = recent['accessDate'];
  if (!menu2015 || !menu2025 || !isText(archiveDate) || !isText(accessDate)) return null;
  const { signatureDish, price2015, price2025, percentageIncrease, yearSpan, inflationContext } = comparison;
  if (!isText(signatureDish) || !isText(inflationContext) || !isFiniteNumber(price2015) || !isFiniteNumber(price2025) || !isFiniteNumber(percentageIncrease)) return null;
  // These source keys are specifically 2015 and 2025, not an arbitrary year range.
  if (price2015 <= 0 || price2025 <= 0 || yearSpan !== 2025 - 2015) return null;
  const increase = (price2025 / price2015 - 1) * 100;
  if (!Number.isFinite(increase) || Math.abs(increase - percentageIncrease) > 0.01) return null;
  return {
    menuSources: {
      '2015': { ...menu2015, archiveDate, archiveUrl: safeSourceUrl(old['archiveUrl']) },
      '2025': { ...menu2025, accessDate, currentUrl: safeSourceUrl(recent['currentUrl']) },
    },
    priceComparison: { signatureDish, price2015, price2025, percentageIncrease, yearSpan, inflationContext },
  };
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
