import { defineConfig } from '@playwright/test';
import story from './playwright.config';

export default defineConfig({
  ...story,
  testMatch: ['story.browser.ts', 'hosting.browser.ts', 'maplibre.browser.ts'],
  outputDir: 'test-results-hosting',
  webServer: {
    command: 'npm run preview:cloudflare',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
