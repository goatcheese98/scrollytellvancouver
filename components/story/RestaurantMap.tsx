'use client';

import { useState } from 'react';
import { closedRestaurants, type Restaurant } from '@/lib/restaurants';

/** Bounded local coordinate plot; no basemap provider, canvas, or WebGL required. */
export function RestaurantMap({ restaurants = closedRestaurants }: { restaurants?: readonly Restaurant[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  if (!restaurants.length) return <p>No restaurant locations are available.</p>;
  const current = restaurants.find(restaurant => restaurant.id === selected);
  return <div className="restaurant-map">
    <p id="map-note">Original story locations · coordinate plot, not a street map. Closure dates and locations are retained research records, not a current verified registry.</p>
    <div className="coordinate-plot" role="group" aria-label="Restaurant locations" aria-describedby="map-note">
      <span className="plot-north" aria-hidden="true">N ↑</span>
      {restaurants.map(restaurant => <button key={restaurant.id} type="button" className="map-pin" aria-label={`Inspect ${restaurant.name}`} aria-pressed={selected === restaurant.id} aria-controls="restaurant-detail" style={{ left: `${12 + (restaurant.lng + 123.14) / 0.04 * 72}%`, top: `${14 + (49.29 - restaurant.lat) / 0.035 * 68}%` }} onClick={() => setSelected(restaurant.id)}>{restaurant.id}</button>)}
    </div>
    <div id="restaurant-detail" className="map-detail" role="status" aria-live="polite">{current ? <><h4>{current.name}</h4><p>{current.type} · Recorded closure: {current.yearClosed}</p><p>{current.story}</p><p>{current.impact}</p></> : <p>Select a numbered location, or read every record below.</p>}</div>
    <details><summary>All 5 restaurant records</summary><ul className="restaurant-records">{restaurants.map(restaurant => <li key={restaurant.id}><h4>{restaurant.id}. {restaurant.name}</h4><p>{restaurant.type} · {restaurant.yearClosed}</p><p>{restaurant.story} {restaurant.impact}.</p><p className="quantity">{restaurant.lat}, {restaurant.lng}</p></li>)}</ul></details>
  </div>;
}
