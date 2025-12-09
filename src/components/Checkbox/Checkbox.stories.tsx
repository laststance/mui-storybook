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
    inputProps: { 'aria-label': 'Checkbox control' },
  },
}

export const Default: Story = {
  args: {
    inputProps: { 'aria-label': 'Default checkbox' },
  },
}

export const Colors: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'Primary checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="secondary"
        inputProps={{ 'aria-label': 'Secondary checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="success"
        inputProps={{ 'aria-label': 'Success checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="error"
        inputProps={{ 'aria-label': 'Error checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="info"
        inputProps={{ 'aria-label': 'Info checkbox' }}
      />
      <Checkbox
        defaultChecked
        color="warning"
        inputProps={{ 'aria-label': 'Warning checkbox' }}
      />
    </div>
  ),
}

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Checkbox
        defaultChecked
        size="small"
        inputProps={{ 'aria-label': 'Small checkbox' }}
      />
      <Checkbox
        defaultChecked
        size="medium"
        inputProps={{ 'aria-label': 'Medium checkbox' }}
      />
      <Checkbox
        defaultChecked
        size="large"
        inputProps={{ 'aria-label': 'Large checkbox' }}
      />
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    inputProps: { 'aria-label': 'Indeterminate checkbox' },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    inputProps: { 'aria-label': 'Disabled checkbox' },
  },
}

export const ToggleInteraction: Story = {
  args: {
    defaultChecked: false,
    inputProps: { 'aria-label': 'Toggle interaction checkbox' },
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
