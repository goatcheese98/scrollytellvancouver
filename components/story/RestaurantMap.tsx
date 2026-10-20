'use client';

import { useState } from 'react';
import { closedRestaurants } from '@/lib/restaurants';
import { parseRestaurantRecords, projectRestaurant, type StoryRestaurant } from '@/lib/restaurant-state';

/** The typed snapshot is also a selection boundary when the supplied dataset changes. */
export function RestaurantMap({ restaurants = closedRestaurants }: { restaurants?: unknown }) {
  const state = parseRestaurantRecords(restaurants);
  if (state.status !== 'ready') return <p>{state.status === 'empty' ? 'No restaurant locations are available.' : 'Restaurant records unavailable.'}</p>;
  return <RestaurantRecords key={JSON.stringify(state.records)} records={state.records} rejected={state.rejected} />;
}
function RestaurantRecords({ records, rejected }: { records: readonly StoryRestaurant[]; rejected: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const current = records.find(restaurant => restaurant.id === selected);
  const unplotted = records.filter(restaurant => !projectRestaurant(restaurant)).length;
  return <div className="restaurant-map">
    <p id="map-note">Original story locations · coordinate plot, not a street map. Closure dates and locations are retained research records, not a current verified registry.</p>
    {rejected > 0 && <p role="status">Some restaurant records are unavailable.</p>}
    {unplotted > 0 && <p>Some locations are unavailable on this plot. Their text records remain below.</p>}
    <div className="coordinate-plot" role="group" aria-label="Restaurant locations" aria-describedby="map-note">
      <span className="plot-north" aria-hidden="true">N ↑</span>
      {records.map(restaurant => {
        const point = projectRestaurant(restaurant);
        return point && <button key={restaurant.id} type="button" className="map-pin" aria-label={`Inspect ${restaurant.name}`} aria-pressed={selected === restaurant.id} aria-controls="restaurant-detail" style={{ left: `${point.left}%`, top: `${point.top}%` }} onClick={() => setSelected(restaurant.id)}>{restaurant.id}</button>;
      })}
    </div>
    <div id="restaurant-detail" className="map-detail" role="status" aria-live="polite">{current ? <><h4>{current.name}</h4><p>{current.type} · Recorded closure: {current.yearClosed}</p><p>{current.story}</p><p>{current.impact}</p></> : <p>Select a numbered location, or read every record below.</p>}</div>
    <details open={unplotted > 0 || rejected > 0}><summary>All {records.length} restaurant {records.length === 1 ? 'record' : 'records'}</summary><ul className="restaurant-records">{records.map(restaurant => <li key={restaurant.id}><h4>{restaurant.id}. {restaurant.name}</h4><p>{restaurant.type} · {restaurant.yearClosed}</p><p>{restaurant.story} {restaurant.impact}.</p><p className="quantity">{restaurant.lat === null || restaurant.lng === null ? 'Location unavailable' : `${restaurant.lat}, ${restaurant.lng}`}</p></li>)}</ul></details>
  </div>;
}
