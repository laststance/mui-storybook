import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import Switch from './Switch'

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
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchInput = canvas.getByRole('checkbox')

    await expect(switchInput).not.toBeChecked()
    await userEvent.click(switchInput)
    await expect(switchInput).toBeChecked()
    await userEvent.click(switchInput)
    await expect(switchInput).not.toBeChecked()
  },
}
