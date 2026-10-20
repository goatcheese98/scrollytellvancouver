import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RestaurantMap } from '../components/story/RestaurantMap.tsx';
import { closedRestaurants } from '../lib/restaurants.ts';

const textMarkup = (value: string) => renderToStaticMarkup(createElement('span', null, value)).replace(/^<span>|<\/span>$/g, '');
const renderMap = (restaurants: unknown) => renderToStaticMarkup(createElement(RestaurantMap, { restaurants }));
test('map renders honest invalid and empty states instead of throwing', () => {
  assert.match(renderMap(null), /Restaurant records unavailable/);
  assert.match(renderMap([]), /No restaurant locations are available/);
});
test('readable map records survive missing coordinates and use their actual count', () => {
  const first = closedRestaurants[0]; assert.ok(first);
  const html = renderMap([{ ...first, lat: null }, null]);
  assert.match(html, /All 1 restaurant record/);
  assert.match(html, /Location unavailable/);
  assert.ok(html.includes(textMarkup(first.name))); assert.ok(html.includes(textMarkup(first.story)));
  assert.match(html, /<details open(?:=|\s|>)/);
  assert.doesNotMatch(html, /aria-label="Inspect /);
  assert.doesNotMatch(html, /NaN|undefined/);
});
test('duplicate IDs never produce ambiguous pins or inflated record counts', () => {
  const first = closedRestaurants[0]; assert.ok(first);
  const html = renderMap([first, first]);
  assert.equal((html.match(/aria-label="Inspect /g) ?? []).length, 1);
  assert.match(html, /All 1 restaurant record/);
  assert.match(html, /Some restaurant records are unavailable/);
});
