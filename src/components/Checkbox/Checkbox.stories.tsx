import { expect, userEvent, within } from 'storybook/test'

import {
  muiColorArgType,
  muiSizeArgType,
  muiDisabledArgType,
  muiRequiredArgType,
  muiCheckedArgType,
  createBooleanArgType,
} from '../../../.storybook/argTypeTemplates'

import Checkbox from './Checkbox'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    size: muiSizeArgType,
    disabled: muiDisabledArgType,
    required: muiRequiredArgType,
    checked: muiCheckedArgType,
    defaultChecked: createBooleanArgType(
      'The default checked state. Use when the component is not controlled.',
      false,
      'State',
    ),
    indeterminate: createBooleanArgType(
      'If true, the component appears indeterminate.',
      false,
      'State',
    ),
    disableRipple: createBooleanArgType(
      'If true, the ripple effect is disabled.',
      false,
      'Appearance',
    ),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Checkbox component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
    defaultChecked: false,
    indeterminate: false,
  },
}

export const Default: Story = {
  args: {},
}

export const Colors: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Checkbox defaultChecked color="primary" />
      <Checkbox defaultChecked color="secondary" />
      <Checkbox defaultChecked color="success" />
      <Checkbox defaultChecked color="error" />
      <Checkbox defaultChecked color="info" />
      <Checkbox defaultChecked color="warning" />
    </div>
  ),
}

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Checkbox defaultChecked size="small" />
      <Checkbox defaultChecked size="medium" />
      <Checkbox defaultChecked size="large" />
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const ToggleInteraction: Story = {
  args: {
    defaultChecked: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')

    await expect(checkbox).toBeInTheDocument()
    await expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}
