import { test, expect } from '@playwright/test';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';

// Exercise the retained consumer, not a replacement route. No basemap/provider traffic.
test('MapLibre 6 retains Scene8 markers, controlled pan and popup close semantics', async ({ page }) => {
  const result = await build({
    stdin: { contents: `
      import React from 'react';
      import { createRoot } from 'react-dom/client';
      import Scene8 from './components/scenes/Scene8';
      import { setWorkerUrl } from 'maplibre-gl';
      setWorkerUrl('/legacy-map-worker.mjs');
      createRoot(document.getElementById('fixture')).render(React.createElement(Scene8));
    `, resolveDir: process.cwd(), loader: 'tsx' },
    bundle: true, write: false, outdir: 'fixture', entryNames: 'scene8',
    define: { 'process.env.NODE_ENV': '"production"' }, jsx: 'automatic',
  });
  const script = result.outputFiles.find(file => file.path.endsWith('.js'));
  const css = result.outputFiles.find(file => file.path.endsWith('.css'));
  expect(script).toBeTruthy(); expect(css).toBeTruthy();
  const errors: string[] = []; const external: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname === 'basemaps.cartocdn.com') return route.fulfill({ json: { version: 8, sources: {}, layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#121214' } }] } });
    if (url.pathname === '/legacy-map-worker.mjs') return route.fulfill({ contentType: 'text/javascript', body: await readFile('node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs') });
    if (url.pathname === '/maplibre-gl-shared.mjs') return route.fulfill({ contentType: 'text/javascript', body: await readFile('node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs') });
    if (url.pathname === '/legacy-map-fixture') return route.fulfill({ contentType: 'text/html', body: '<div id="fixture"></div><script src="/legacy-map-fixture.js"></script>' });
    if (url.pathname === '/legacy-map-fixture.js') return route.fulfill({ contentType: 'text/javascript', body: script?.text ?? '' });
    if (url.pathname === '/legacy-map-fixture.css') return route.fulfill({ contentType: 'text/css', body: css?.text ?? '' });
    external.push(route.request().url()); return route.abort();
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/legacy-map-fixture');
  await page.addStyleTag({ url: '/legacy-map-fixture.css' });
  // Fixture supplies only the legacy utility sizes, never changes product styles.
  await page.addStyleTag({ content: 'body{margin:0} section{padding:0} .h-\\[600px\\]{height:600px} .relative{position:relative} .w-6{width:24px}.h-6{height:24px}.bg-red-600{background:red}' });
  const markers = page.locator('.maplibregl-marker');
  await expect(markers).toHaveCount(5);
  await expect(page.locator('canvas')).toBeVisible();
  await markers.first().click();
  const popup = page.locator('.maplibregl-popup');
  await expect(popup).toContainText("Kent's Kitchen");
  await expect(popup).toContainText('Lost 25 jobs');
  await page.locator('.maplibregl-popup-close-button').click();
  await expect(popup).toHaveCount(0);
  const before = await markers.first().getAttribute('style');
  const canvas = page.locator('canvas'); const box = await canvas.boundingBox(); expect(box).toBeTruthy();
  if (!box) throw new Error('Map canvas missing');
  await page.mouse.move(box.x + box.width / 2, box.y + 300);
  await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + 100, box.y + 330, { steps: 10 }); await page.mouse.up();
  await expect.poll(() => markers.first().getAttribute('style')).not.toBe(before);
  await markers.nth(1).click(); await expect(popup).toContainText("Zefferelli's");
  await page.screenshot({ path: test.info().outputPath('legacy-maplibre6.png') });
  expect(errors).toEqual([]); expect(external).toEqual([]);
});
