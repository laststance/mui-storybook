import { expect, userEvent, within } from 'storybook/test'

import Switch from './Switch'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const InteractionTest: Story = {
  args: {
    defaultChecked: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('checkbox')

    // Verify initial unchecked state
    await expect(switchElement).not.toBeChecked()

    // Click to toggle on
    await userEvent.click(switchElement)
    await expect(switchElement).toBeChecked()

    // Click to toggle off
    await userEvent.click(switchElement)
    await expect(switchElement).not.toBeChecked()
  },
}
