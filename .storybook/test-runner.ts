import type { TestRunnerConfig } from '@storybook/test-runner'
import { getStoryContext } from '@storybook/test-runner'
import { injectAxe, checkA11y } from 'axe-playwright'

/**
 * Storybook Test Runner Configuration
 *
 * This configuration enables:
 * - Automated accessibility testing with axe-playwright
 * - Play function execution for interaction tests
 * - Custom test hooks for setup and teardown
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
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // Allow stories to configure axe options
      axeOptions: storyContext.parameters?.a11y?.options,
    })
  },
}

export default config
