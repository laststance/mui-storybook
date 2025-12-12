import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E Test Configuration for MUI Storybook
 *
 * @description
 * Configuration for end-to-end testing of the Storybook Manager UI.
 * Focuses on visual regression testing and accessibility validation.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI for stability
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['list'], ['github']]
    : [['html', { open: 'never' }], ['list']],

  // Shared settings for all the projects below
  use: {
    // Base URL for Storybook
    baseURL: 'http://localhost:6006',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Video recording
    video: 'on-first-retry',

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Timeout for actions (click, fill, etc.)
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Global test timeout
  timeout: 60000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to add more browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Run your local Storybook server before starting the tests
  webServer: {
    command: 'pnpm storybook --ci',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes for Storybook to start
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // Output folder for test artifacts
  outputDir: 'playwright-results',
})
