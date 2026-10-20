import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chapters, chapterFromHash, costs, totalCosts, order, money, parseMenuEvidence, safeSourceUrl } from '../lib/story.ts';
import { parseRestaurantRecords, projectRestaurant } from '../lib/restaurant-state.ts';
import { closedRestaurants } from '../lib/restaurants.ts';
const fixture = () => JSON.parse(readFileSync(new URL('../public/data/sources.json', import.meta.url), 'utf8'));

test('chapter links cover every active original scene once, with stable fragments', () => {
  assert.deepEqual(chapters.flatMap(chapter => [...chapter.scenes]).sort((a,b) => a-b), [1,2,3,4,5,7,8,9,10]);
  assert.equal(new Set(chapters.map(chapter => chapter.id)).size, 5);
  for (const chapter of chapters) assert.equal(chapterFromHash(`#${chapter.id}`), chapter.id);
  assert.equal(chapterFromHash('#unknown'), null);
  assert.equal(chapterFromHash('#%E0%A4%A'), null);
});
test('original menu evidence yields the signature-dish comparison, not the old inconsistent finale', () => {
  const evidence = parseMenuEvidence(fixture());
  assert.ok(evidence);
  assert.equal(evidence.priceComparison.price2015, 8.5);
  assert.equal(evidence.priceComparison.price2025, 17);
  assert.equal(evidence.priceComparison.percentageIncrease, 100);
  assert.equal(evidence.menuSources['2025'].accessDate, 'November 2, 2025');
});
test('missing, malformed or non-finite prices are unavailable, never zero', () => {
  for (const bad of [null, {}, [], {menuSources:{}}]) assert.equal(parseMenuEvidence(bad), null);
  for (const bad of [null, '17', NaN, Infinity, 0, -1]) {
    const data = fixture(); data.priceComparison.price2025 = bad; assert.equal(parseMenuEvidence(data), null);
  }
  const inconsistent = fixture(); inconsistent.priceComparison.percentageIncrease = 88;
  assert.equal(parseMenuEvidence(inconsistent), null);
});
test('unsafe or unavailable source links do not discard valid menu data', () => {
  for (const url of ['javascript:alert(1)', 'https://user:pass@example.com', '', 'http://example.com']) assert.equal(safeSourceUrl(url), null);
  const data = fixture(); data.menuSources['2015'].archiveUrl = 'javascript:alert(1)';
  assert.ok(parseMenuEvidence(data));
  delete data.menuSources['2015'].archiveUrl; assert.ok(parseMenuEvidence(data));
  assert.equal(safeSourceUrl('https://www.phogoodness.com/menu'), 'https://www.phogoodness.com/menu');
});
test('cost and fee illustrations preserve arithmetic and units', () => {
  assert.equal(totalCosts, 104); assert.equal(totalCosts - 100, 4);
  assert.deepEqual(costs.map(cost => cost.percent), [38,38,18,10]);
  assert.equal(order.reduce((sum,item) => sum + item.cents, 0), 3589);
  assert.equal(money(35.89), '$35.89');
});
test('map preserves all five original source records and valid coordinates', () => {
  assert.deepEqual(closedRestaurants.map(r => [r.name,r.yearClosed]), [["Kent's Kitchen",2023],["Zefferelli's",2022],['The Templeton',2024],['Burgoo Bistro',2023],['The Arbor',2024]]);
  for (const restaurant of closedRestaurants) { assert.ok(restaurant.lat > 49.25 && restaurant.lat < 49.3); assert.ok(restaurant.lng > -123.15 && restaurant.lng < -123.1); }
});

test('encoded chapter fragments resolve, malformed and unrelated fragments do not', () => {
  assert.equal(chapterFromHash('#impossible%2Dmath'), 'impossible-math');
  assert.equal(chapterFromHash('#%E0%A4%A'), null);
  assert.equal(chapterFromHash('#sources'), null);
});
test('incomplete price lists and a year span inconsistent with the menu years are unavailable', () => {
  const empty = fixture(); empty.menuSources['2015'].keyPrices = {};
  assert.equal(parseMenuEvidence(empty), null);
  const years = fixture(); years.priceComparison.yearSpan = 9;
  assert.equal(parseMenuEvidence(years), null);
});

test('map boundary preserves original records, rejects ambiguous IDs, and keeps missing coordinates honest', () => {
  assert.deepEqual(parseRestaurantRecords(closedRestaurants).records, closedRestaurants);
  const first = closedRestaurants[0]; assert.ok(first);
  const duplicate = parseRestaurantRecords([first, { ...first, name: 'Duplicate record' }]);
  assert.equal(duplicate.records.length, 1); assert.equal(duplicate.rejected, 1);
  const missing = parseRestaurantRecords([{ ...first, lat: NaN }, null]);
  const readable = missing.records[0]; assert.ok(readable);
  assert.equal(readable.name, first.name); assert.equal(readable.lat, null); assert.equal(readable.lng, null);
  assert.equal(projectRestaurant(readable), null); assert.equal(missing.rejected, 1);
  assert.equal(parseRestaurantRecords([]).status, 'empty');
  for (const invalid of [null, {}, [null], [{ id: '1' }]]) assert.equal(parseRestaurantRecords(invalid).status, 'invalid');
});
test('map projection preserves original pin positions and excludes out-of-area points without deleting text records', () => {
  for (const record of parseRestaurantRecords(closedRestaurants).records) {
    const pin = projectRestaurant(record); assert.ok(pin);
    assert.ok(pin.left >= 12 && pin.left <= 84); assert.ok(pin.top >= 14 && pin.top <= 82);
  }
  const first = closedRestaurants[0]; assert.ok(first);
  const outside = parseRestaurantRecords([{ ...first, lat: 0, lng: 0 }]).records[0]; assert.ok(outside);
  assert.equal(projectRestaurant(outside), null); assert.equal(outside.story, first.story);
});
