import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run tests serially to avoid rate limiting
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 1, // Single worker to avoid Cloudflare rate limits
  timeout: process.env.CI ? 180000 : 60000, // Test timeout: 90s in CI, 60s locally
  expect: {
    timeout: process.env.CI ? 45000 : 30000 // Assertion timeout: 45s in CI, 30s locally
  },
  reporter: [
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true
    }],
    ['list']
  ],
  use: {
    baseURL: 'https://trade.multibank.io',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: process.env.CI ? 20000 : 15000,
    navigationTimeout: process.env.CI ? 60000 : 30000,
  },
  projects: [
      { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
      { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } } },
      { name: 'webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } } },
  ],
});