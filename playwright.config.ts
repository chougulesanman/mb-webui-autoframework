import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  // workers: process.env.CI ? 2 : '25%',
  workers: process.env.CI ? 2 : 1,
  expect: {
    timeout: 30000
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
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
      { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
      { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } } },
      { name: 'webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } } },
  ],
});