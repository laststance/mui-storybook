import { expect, screen, userEvent, within } from 'storybook/test'

import TransitionsDemo from './TransitionsDemo'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/Transitions Demo',
  component: TransitionsDemo,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive visualization of the MUI transitions system including duration tokens, easing curves, and an interactive animation playground.',
      },
    },
  },
} satisfies Meta<typeof TransitionsDemo>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default view showing all transition token visualizations.
 */
export const Default: Story = {}

/**
 * Interactive test for duration selection.
 */
export const DurationSelection: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify duration select exists', async () => {
      const durationSelect = canvas.getByLabelText(/duration/i)
      await expect(durationSelect).toBeInTheDocument()
    })

    await step(
      'Open duration dropdown and select a different value',
      async () => {
        const durationSelect = canvas.getByLabelText(/duration/i)
        await userEvent.click(durationSelect)

        // Wait for menu to open
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Select "Complex" option (dropdown renders in portal, use screen)
        const complexOption = await screen.findByRole('option', {
          name: /complex/i,
        })
        await userEvent.click(complexOption)

        // Verify the code snippet updates
        await new Promise((resolve) => setTimeout(resolve, 100))
        const codeBlock = canvas.getByText(/duration\.complex/i)
        await expect(codeBlock).toBeInTheDocument()
      },
    )
  },
}

/**
 * Interactive test for easing selection.
 */
export const EasingSelection: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify easing select exists', async () => {
      const easingSelect = canvas.getByLabelText(/easing/i)
      await expect(easingSelect).toBeInTheDocument()
    })

    await step('Open easing dropdown and select sharp', async () => {
      const easingSelect = canvas.getByLabelText(/easing/i)
      await userEvent.click(easingSelect)

      // Wait for menu to open
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Select "Sharp" option (dropdown renders in portal, use screen)
      const sharpOption = await screen.findByRole('option', {
        name: /sharp/i,
      })
      await userEvent.click(sharpOption)

      // Verify the code snippet updates
      await new Promise((resolve) => setTimeout(resolve, 100))
      const codeBlock = canvas.getByText(/easing\.sharp/i)
      await expect(codeBlock).toBeInTheDocument()
    })
  },
}

/**
 * Test animation playground functionality.
 */
export const AnimationPlayground: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify play button exists', async () => {
      const playButton = canvas.getByRole('button', { name: /play animation/i })
      await expect(playButton).toBeInTheDocument()
      await expect(playButton).toBeEnabled()
    })

    await step('Click play and verify button state changes', async () => {
      const playButton = canvas.getByRole('button', { name: /play animation/i })
      await userEvent.click(playButton)

      // Button should be disabled while animating
      await expect(playButton).toBeDisabled()
      await expect(playButton).toHaveTextContent(/animating/i)

      // Wait for animation to complete (standard duration is 300ms, but we need
      // to wait for both forward and reverse animation)
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Button should be re-enabled
      await expect(playButton).toBeEnabled()
    })
  },
}

/**
 * Verify all sections are rendered correctly.
 */
export const AllSections: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify main title', async () => {
      const title = canvas.getByRole('heading', { name: /transitions system/i })
      await expect(title).toBeInTheDocument()
    })

    await step('Verify Duration Tokens section', async () => {
      const sectionTitle = canvas.getByRole('heading', {
        name: /duration tokens/i,
      })
      await expect(sectionTitle).toBeInTheDocument()

      // Check for duration labels (use getAllByText since these appear multiple times)
      const shortestElements = canvas.getAllByText(/shortest/i)
      await expect(shortestElements.length).toBeGreaterThan(0)
      const standardElements = canvas.getAllByText(/standard/i)
      await expect(standardElements.length).toBeGreaterThan(0)
      const complexElements = canvas.getAllByText(/complex/i)
      await expect(complexElements.length).toBeGreaterThan(0)
    })

    await step('Verify Easing Curves section', async () => {
      const sectionTitle = canvas.getByRole('heading', {
        name: /easing curves/i,
      })
      await expect(sectionTitle).toBeInTheDocument()

      // Check for easing labels (use getAllByText since these appear multiple times)
      const easeInOutElements = canvas.getAllByText(/ease in out/i)
      await expect(easeInOutElements.length).toBeGreaterThan(0)
      const easeOutElements = canvas.getAllByText(/ease out/i)
      await expect(easeOutElements.length).toBeGreaterThan(0)
    })

    await step('Verify Animation Playground section', async () => {
      const sectionTitle = canvas.getByRole('heading', {
        name: /animation playground/i,
      })
      await expect(sectionTitle).toBeInTheDocument()
    })

    await step('Verify Relative Durations section', async () => {
      const sectionTitle = canvas.getByRole('heading', {
        name: /relative durations/i,
      })
      await expect(sectionTitle).toBeInTheDocument()
    })
  },
}
