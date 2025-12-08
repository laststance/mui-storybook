import { expect, within } from 'storybook/test'

import Typography from './Typography'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const AllVariants: Story = {
  render: () => (
    <>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1</Typography>
      <Typography variant="body2">Body 2</Typography>
      <Typography variant="button">Button</Typography>
      <Typography variant="caption">Caption</Typography>
      <Typography variant="overline">Overline</Typography>
    </>
  ),
}

export const Colors: Story = {
  render: () => (
    <>
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="textPrimary">Text Primary</Typography>
      <Typography color="textSecondary">Text Secondary</Typography>
      <Typography color="error">Error Color</Typography>
    </>
  ),
}

export const InteractionTest: Story = {
  render: () => (
    <>
      <Typography variant="h1">Test Heading</Typography>
      <Typography variant="body1">Test body text content</Typography>
      <Typography color="primary">Primary colored text</Typography>
    </>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify heading renders', async () => {
      const heading = canvas.getByText('Test Heading')
      await expect(heading).toBeInTheDocument()
      await expect(heading.tagName).toBe('H1')
    })

    await step('Verify body text renders', async () => {
      const body = canvas.getByText('Test body text content')
      await expect(body).toBeInTheDocument()
    })

    await step('Verify colored text renders', async () => {
      const coloredText = canvas.getByText('Primary colored text')
      await expect(coloredText).toBeInTheDocument()
    })

    await step('Test accessibility', async () => {
      const heading = canvas.getByText('Test Heading')
      await expect(heading).toHaveAttribute('class')
    })
  },
}
