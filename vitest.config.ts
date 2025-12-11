import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Ensure coverage temp directory exists to prevent ENOENT errors
 * when Storybook test runner writes coverage data.
 * This runs in Node.js context during config phase.
 */
const coverageTmpDir = path.join(
  dirname,
  'node_modules/.cache/storybook/default/coverage/.tmp',
)
if (!fs.existsSync(coverageTmpDir)) {
  fs.mkdirSync(coverageTmpDir, { recursive: true })
}

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // Use `workspace` field in Vitest < 3.2
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(dirname, '.storybook'),
              // This should match your package.json script to run Storybook
              // The --no-open flag will skip the automatic opening of a browser
              storybookScript: 'pnpm storybook --no-open',
            }),
          ],
          test: {
            name: 'storybook',
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright({}),
              headless: true,
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
            globalSetup: ['./.storybook/vitest.globalSetup.ts'],
            // Disable coverage to work around ENOENT temp directory bug in @storybook/addon-vitest
            // See: https://github.com/storybookjs/storybook/issues/... (upstream bug)
            // The coverage provider tries to write to .tmp/coverage-N.json before creating the directory.
            // Run coverage separately via CLI if needed: pnpm vitest --coverage
            coverage: {
              enabled: false,
            },
          },
        },
      ],
    },
  }),
)
