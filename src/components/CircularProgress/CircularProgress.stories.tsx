import { expect, within } from 'storybook/test'

import CircularProgress from './CircularProgress'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/CircularProgress',
  component: CircularProgress,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const InteractionTest: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify progress indicator renders', async () => {
      const progress = canvas.getByRole('progressbar')
      await expect(progress).toBeInTheDocument()
    })

    await step('Verify progress indicator is visible', async () => {
      const progress = canvas.getByRole('progressbar')
      await expect(progress).toBeVisible()
    })

    await step('Test accessibility role', async () => {
      const progress = canvas.getByRole('progressbar')
      await expect(progress).toHaveAttribute('role', 'progressbar')
    })

    await step('Verify SVG structure', async () => {
      const progress = canvas.getByRole('progressbar')
      const svg = progress.querySelector('svg')
      await expect(svg).toBeInTheDocument()
    })
  },
}
