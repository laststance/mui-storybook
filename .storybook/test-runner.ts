import { getStoryContext } from '@storybook/test-runner'
import { injectAxe, checkA11y } from 'axe-playwright'

import type { TestRunnerConfig } from '@storybook/test-runner'

/**
 * Storybook Test Runner Configuration
 *
 * This configuration enables:
 * - Automated accessibility testing with axe-playwright
 * - Play function execution for interaction tests
 * - Custom test hooks for setup and teardown
 *
 * Note: A11y violations are logged but don't fail tests by default.
 * Stories can opt-in to strict a11y by setting parameters.a11y.strict = true
 */
const config: TestRunnerConfig = {
  /**
   * Hook that runs before each story is rendered
   * Injects axe-core for accessibility testing
   */
  async preVisit(page) {
    await injectAxe(page)
  },

  /**
   * Hook that runs after each story is rendered
   * Runs accessibility checks on the story
   */
  async postVisit(page, context) {
    // Get story context to check for a11y options
    const storyContext = await getStoryContext(page, context)

    // Skip a11y tests if disabled for this story
    if (storyContext.parameters?.a11y?.disable) {
      return
    }

    // Run accessibility checks with axe-core
    // By default, violations are logged but don't fail the test
    // Set parameters.a11y.strict = true to make violations fail
    try {
      await checkA11y(page, '#storybook-root', {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
        // Allow stories to configure axe options
        axeOptions: storyContext.parameters?.a11y?.options,
      })
      console.log('No accessibility violations detected!')
    } catch (error) {
      // Log the violation but only fail if strict mode is enabled
      const isStrict = storyContext.parameters?.a11y?.strict === true
      if (isStrict) {
        throw error
      }
      // Non-strict mode: log the error but don't fail
      console.warn('Accessibility violations detected (non-blocking):', error)
    }
  },
}

export default config
