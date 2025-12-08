import { expect, userEvent, within } from 'storybook/test'

import {
  muiColorArgType,
  muiDisabledArgType,
  muiCheckedArgType,
  createBooleanArgType,
} from '../../../.storybook/argTypeTemplates'

import Switch from './Switch'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Switch',
  component: Switch,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'medium' },
        category: 'Appearance',
        type: { summary: '"small" | "medium"' },
      },
    },
    disabled: muiDisabledArgType,
    checked: muiCheckedArgType,
    defaultChecked: createBooleanArgType(
      'The default checked state. Use when the component is not controlled.',
      false,
      'State',
    ),
    disableRipple: createBooleanArgType(
      'If true, the ripple effect is disabled.',
      false,
      'Appearance',
    ),
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Switch component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
    defaultChecked: false,
  },
}

export const Default: Story = {
  args: {},
}

export const Colors: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Switch defaultChecked color="primary" />
      <Switch defaultChecked color="secondary" />
      <Switch defaultChecked color="success" />
      <Switch defaultChecked color="error" />
      <Switch defaultChecked color="info" />
      <Switch defaultChecked color="warning" />
    </div>
  ),
}

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Switch defaultChecked size="small" />
      <Switch defaultChecked size="medium" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
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
