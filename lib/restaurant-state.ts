import type { Restaurant } from './restaurants.ts';
import { isRecord, isText, isFiniteNumber } from './validation.ts';

export type StoryRestaurant = Omit<Restaurant, 'lat' | 'lng'> & { lat: number | null; lng: number | null };
export type RestaurantState = { status: 'ready' | 'empty' | 'invalid'; records: readonly StoryRestaurant[]; rejected: number };
/** Keep readable records when coordinates are unavailable; never invent a zero location. */
export function parseRestaurantRecords(value: unknown): RestaurantState {
  if (!Array.isArray(value)) return { status: 'invalid', records: [], rejected: 0 };
  const records: StoryRestaurant[] = [], seen = new Set<number>();
  let rejected = 0;
  for (const item of value) {
    if (!isRecord(item)) { rejected++; continue; }
    const { id, name, type, yearClosed, lat, lng, story, impact } = item;
    if (!isFiniteNumber(id) || !Number.isInteger(id) || id <= 0 || seen.has(id) || !isText(name) || !isText(type) || !isFiniteNumber(yearClosed) || !Number.isInteger(yearClosed) || yearClosed <= 0 || !isText(story) || !isText(impact)) { rejected++; continue; }
    seen.add(id);
    const located = isFiniteNumber(lat) && lat >= -90 && lat <= 90 && isFiniteNumber(lng) && lng >= -180 && lng <= 180;
    records.push({ id, name, type, yearClosed, story, impact, lat: located ? lat : null, lng: located ? lng : null });
  }
  return { status: records.length ? 'ready' : value.length ? 'invalid' : 'empty', records, rejected };
}
/** Preserve the original Vancouver plot extent, keeping out-of-area records in text only. */
export function projectRestaurant(restaurant: StoryRestaurant): { left: number; top: number } | null {
  const { lat, lng } = restaurant;
  if (lat === null || lng === null || lat < 49.255 || lat > 49.29 || lng < -123.14 || lng > -123.10) return null;
  return { left: 12 + (lng + 123.14) / .04 * 72, top: 14 + (49.29 - lat) / .035 * 68 };
}
