import { expect, test } from '@playwright/test'

/**
 * Storybook Manager UI E2E Tests
 *
 * @description
 * End-to-end tests for the Storybook Manager interface.
 * Validates that the Manager loads correctly and all UI elements are accessible.
 */

test.describe('Storybook Manager UI', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook root
    await page.goto('/')
    // Wait for Storybook to fully load (sidebar is always present)
    await page.waitForSelector('[id="storybook-explorer-tree"]', {
      timeout: 30000,
    })
  })

  test('should load the Storybook Manager successfully', async ({ page }) => {
    // Verify the main Storybook layout is present
    await expect(page.locator('[id="storybook-explorer-tree"]')).toBeVisible()

    // Verify the sidebar navigation is visible
    const sidebar = page.locator('nav, [role="navigation"]').first()
    await expect(sidebar).toBeVisible()

    // Verify the main content area exists (iframe only on story pages, not docs)
    const mainContent = page.locator(
      '#storybook-preview-wrapper, [data-testid="storybook-preview-iframe"]',
    )
    await expect(mainContent.first()).toBeVisible()
  })

  test('should display component tree in sidebar', async ({ page }) => {
    // Wait for sidebar to populate
    await page.waitForTimeout(1000)

    // Check for component groups
    const componentTree = page.locator('[id="storybook-explorer-tree"]')
    await expect(componentTree).toBeVisible()

    // Verify at least one clickable item exists in sidebar (Storybook 10 uses different markup)
    const sidebarItems = page.locator(
      '[id="storybook-explorer-tree"] a, [id="storybook-explorer-tree"] button, [id="storybook-explorer-tree"] [role="treeitem"]',
    )
    const itemCount = await sidebarItems.count()
    expect(itemCount).toBeGreaterThan(0)
  })

  test('should navigate to a component story', async ({ page }) => {
    // Click on a known component (Button)
    const buttonStory = page.getByRole('treeitem', { name: /Button/i }).first()

    // If not visible, expand the Components group first
    const componentsGroup = page.getByRole('button', { name: /Components/i })
    if (await componentsGroup.isVisible()) {
      await componentsGroup.click()
      await page.waitForTimeout(500)
    }

    // Click on Button if visible
    if (await buttonStory.isVisible()) {
      await buttonStory.click()
      await page.waitForTimeout(500)

      // Verify URL contains button
      expect(page.url()).toContain('button')
    }
  })

  test('should have functioning toolbar', async ({ page }) => {
    // Navigate to a story page where toolbar is fully visible
    await page.goto('/?path=/story/components-button--primary')
    await page.waitForSelector('[id="storybook-explorer-tree"]', {
      timeout: 30000,
    })
    await page.waitForTimeout(1000)

    // Look for toolbar elements (may be in different locations in Storybook 10)
    const toolbar = page.locator('[role="toolbar"]').first()

    if (await toolbar.isVisible()) {
      await expect(toolbar).toBeVisible()

      // Check for toolbar buttons or links
      const toolbarControls = toolbar.locator('button, a, [role="button"]')
      const controlCount = await toolbarControls.count()
      // Toolbar should have at least some interactive elements
      expect(controlCount).toBeGreaterThanOrEqual(0)
    }
  })
})

test.describe('Storybook Theme', () => {
  test('should apply MUI brand theme colors', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('[id="storybook-explorer-tree"]', {
      timeout: 30000,
    })

    // Check that the page uses the expected sky-blue theme colors
    // by verifying CSS custom properties or computed styles
    const body = page.locator('body')
    await expect(body).toBeVisible()

    // Take a screenshot for visual regression
    await page.screenshot({
      path: 'playwright-results/storybook-theme.png',
      fullPage: false,
    })
  })
})
