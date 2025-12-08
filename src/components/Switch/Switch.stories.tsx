import MUISwitch from '@mui/material/Switch'
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
  args: {} as never,
  render: () => (
    <MUISwitch
      color="primary"
      size="medium"
      inputProps={{ 'aria-label': 'Toggle switch' }}
    />
  ),
}

export const Default: Story = {
  args: {} as never,
  render: () => <MUISwitch inputProps={{ 'aria-label': 'Default switch' }} />,
}

export const Colors: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <MUISwitch
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'Primary switch' }}
      />
      <MUISwitch
        defaultChecked
        color="secondary"
        inputProps={{ 'aria-label': 'Secondary switch' }}
      />
      <MUISwitch
        defaultChecked
        color="success"
        inputProps={{ 'aria-label': 'Success switch' }}
      />
      <MUISwitch
        defaultChecked
        color="error"
        inputProps={{ 'aria-label': 'Error switch' }}
      />
      <MUISwitch
        defaultChecked
        color="info"
        inputProps={{ 'aria-label': 'Info switch' }}
      />
      <MUISwitch
        defaultChecked
        color="warning"
        inputProps={{ 'aria-label': 'Warning switch' }}
      />
    </div>
  ),
}

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <MUISwitch
        defaultChecked
        size="small"
        inputProps={{ 'aria-label': 'Small switch' }}
      />
      <MUISwitch
        defaultChecked
        size="medium"
        inputProps={{ 'aria-label': 'Medium switch' }}
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {} as never,
  render: () => (
    <MUISwitch
      disabled
      defaultChecked
      inputProps={{ 'aria-label': 'Disabled switch' }}
    />
  ),
}

export const InteractionTest: Story = {
  args: {} as never,
  render: () => (
    <MUISwitch inputProps={{ 'aria-label': 'Interaction test switch' }} />
  ),
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
