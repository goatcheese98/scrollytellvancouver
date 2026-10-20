import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', testMatch: 'story.browser.ts', timeout: 30_000,
  retries: 0, workers: 1, reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3100', headless: true, trace: 'retain-on-failure',
    launchOptions: process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH'] ? { executablePath: process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH'], args: ['--no-sandbox'] } : {} },
  webServer: { command: process.env['STORY_STATIC_EXPORT'] === '1' ? 'python3 -m http.server 3100 --bind 127.0.0.1 --directory out' : 'npm run start -- --hostname 127.0.0.1 --port 3100', url: 'http://127.0.0.1:3100', reuseExistingServer: !process.env['CI'], timeout: 60_000 },
});
