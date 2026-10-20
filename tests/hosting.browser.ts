import { test, expect } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';

const security = (headers: Record<string, string>) => {
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['permissions-policy']).toContain('geolocation=()');
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['content-security-policy']).toContain("object-src 'none'");
};

test('Cloudflare serves the actual export with security, cache and conditional responses', async ({ request }) => {
  const root = await request.get('/');
  expect(root.status()).toBe(200); security(root.headers());
  expect(await root.body()).toEqual(await readFile('out/index.html'));
  expect(root.headers()['cache-control']).toBe('no-cache');
  const json = await request.get('/data/sources.json');
  expect(json.status()).toBe(200); security(json.headers());
  expect(await json.body()).toEqual(await readFile('public/data/sources.json'));
  expect(json.headers()['content-type']).toContain('application/json');
  expect(json.headers()['cache-control']).toBe('no-cache');
  const assets = await readdir('out/_next/static/chunks');
  const chunk = assets.find(name => name.endsWith('.js')); expect(chunk).toBeTruthy();
  const asset = await request.get(`/_next/static/chunks/${chunk}`);
  expect(asset.status()).toBe(200); security(asset.headers());
  expect(asset.headers()['cache-control']).toBe('public, max-age=31536000, immutable');
  const etag = asset.headers()['etag']; expect(etag).toBeTruthy();
  const cached = await request.get(`/_next/static/chunks/${chunk}`, { headers: { 'If-None-Match': etag ?? '' } });
  expect(cached.status()).toBe(304); expect((await cached.body()).length).toBe(0);
  const image = await request.get('/images/pho-goodness-storefront.jpg');
  expect(image.status()).toBe(200); security(image.headers());
  expect(image.headers()['content-type']).toContain('image/jpeg');
  expect(await image.body()).toEqual(await readFile('public/images/pho-goodness-storefront.jpg'));
  expect(image.headers()['cache-control']).toBe('public, max-age=3600, must-revalidate');
});

test('Cloudflare returns real 404s for absent routes and assets, never the story shell', async ({ request }) => {
  for (const path of ['/missing-story', '/data/missing.json', '/images/missing.jpg', '/_next/static/chunks/missing.js']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404); security(response.headers());
    expect(await response.body()).toEqual(await readFile('out/404.html'));
    expect(await response.text()).not.toContain('The price of a familiar meal');
    // Missing hashed paths must never be cached as a successful immutable asset.
    expect(response.headers()['cache-control']).not.toContain('immutable');
  }
});
