import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',       // Directory for test files
  timeout: 30 * 1000,       // Test timeout
  retries: 1,               // Retry failed tests once
  reporter: [['list']],     // Report test results
  use: {
    browserName: 'chromium', // Default browser
    headless: false,          // Headless or UI mode
    screenshot: 'on',        // Take screenshots
    video: 'retain-on-failure' // Record video on failure
  },
});