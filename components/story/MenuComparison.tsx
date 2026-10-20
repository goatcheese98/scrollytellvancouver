'use client';

import { useCallback, useState } from 'react';

/** Native range supports touch and keyboard; each original menu also opens independently. */
export function MenuComparison() {
  const [position, setPosition] = useState(50);
  const [failed, setFailed] = useState(false);
  // An image can fail before hydration attaches its error handler.
  const checkImage = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, []);
  return <figure className="menu-comparison">
    {failed ? <p role="status">Menu image unavailable. The price table below remains available.</p> : <div className="menu-images">
      {/* Original local evidence, served without a provider or image service. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={checkImage} src="/images/menu-2025.svg" alt="Pho Goodness 2025 menu" onError={() => setFailed(true)} />
      <div className="menu-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={checkImage} src="/images/menu-2015.svg" alt="Pho Goodness 2015 menu" onError={() => setFailed(true)} />
      </div>
      <span className="menu-divider" aria-hidden="true" style={{ left: `${position}%` }} />
    </div>}
    <label htmlFor="menu-position">Compare menus · 2015 / 2025</label>
    <input id="menu-position" type="range" min="0" max="100" value={position} disabled={failed} aria-valuetext={`${position}% of the 2015 menu revealed`} onChange={event => setPosition(Number(event.target.value))} />
    <figcaption><span>Project menu recreations · </span><a href="/images/menu-2015.svg">Open 2015 menu</a><a href="/images/menu-2025.svg">Open 2025 menu</a></figcaption>
  </figure>;
}
