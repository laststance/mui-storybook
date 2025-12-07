import { expect, fn, userEvent, within } from 'storybook/test'

import Button from './Button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: [], // autodocs disabled - using custom MDX documentation
  parameters: {
    a11y: {
      // Optional: customize a11y checks
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const ClickInteraction: Story = {
  args: {
    children: 'Click Me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })

    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const AccessibilityDemo: Story = {
  args: {
    children: 'Accessible Button',
    variant: 'contained',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This button demonstrates accessibility best practices with proper color contrast and clear labeling.',
      },
    },
  },
}

export function IconButtonAccessible() {
  return <Button aria-label="Add item">+ Add</Button>
}
