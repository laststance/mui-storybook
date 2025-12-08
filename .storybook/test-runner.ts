import { getStoryContext } from '@storybook/test-runner'
import { injectAxe, getAxeResults } from 'axe-playwright'

import type { TestRunnerConfig } from '@storybook/test-runner'

/**
 * Storybook Test Runner Configuration
 *
 * This configuration enables:
 * - Automated accessibility testing with axe-playwright (non-blocking)
 * - Play function execution for interaction tests
 * - Custom test hooks for setup and teardown
 *
 * Note: A11y violations are logged as warnings but don't fail tests.
 * This allows CI to pass while still surfacing accessibility issues.
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
   * Runs accessibility checks and logs results (non-blocking)
   */
  async postVisit(page, context) {
    // Get story context to check for a11y options
    const storyContext = await getStoryContext(page, context)

    // Skip a11y tests if disabled for this story
    if (storyContext.parameters?.a11y?.disable) {
      return
    }

    // Get accessibility results without throwing
    const results = await getAxeResults(page, '#storybook-root', {
      // Allow stories to configure axe options
      ...storyContext.parameters?.a11y?.options,
    })

    // Log violations as warnings (non-blocking)
    if (results.violations.length > 0) {
      console.warn(
        `⚠️ ${results.violations.length} accessibility violation(s) detected in "${context.title}":`,
      )
      results.violations.forEach((violation) => {
        console.warn(`  - ${violation.id}: ${violation.description}`)
        console.warn(`    Impact: ${violation.impact}`)
        console.warn(`    Nodes: ${violation.nodes.length}`)
      })
    } else {
      console.log('No accessibility violations detected!')
    }
  },
}

export default config
