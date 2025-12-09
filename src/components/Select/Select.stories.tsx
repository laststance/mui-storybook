import { MenuItem } from '@mui/material'
import { expect, userEvent, within } from 'storybook/test'

import {
  muiVariantArgType,
  muiDisabledArgType,
  muiRequiredArgType,
  muiErrorArgType,
  createBooleanArgType,
} from '../../../.storybook/argTypeTemplates'

import Select from './Select'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Select',
  component: Select,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    variant: muiVariantArgType(['outlined', 'filled', 'standard'], 'outlined'),
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
    required: muiRequiredArgType,
    error: muiErrorArgType,
    multiple: createBooleanArgType(
      'If true, value must be an array and the menu will support multiple selections.',
      false,
      'State',
    ),
    native: createBooleanArgType(
      'If true, the component uses a native select element.',
      false,
      'Appearance',
    ),
    autoWidth: createBooleanArgType(
      'If true, the width of the popover will automatically be set according to the items inside the menu.',
      false,
      'Layout',
    ),
    displayEmpty: createBooleanArgType(
      'If true, a value is displayed even if no items are selected.',
      false,
      'Content',
    ),
    label: {
      control: 'text',
      description: 'The label content.',
      table: { category: 'Content' },
    },
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Select component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    label: 'Age',
    variant: 'outlined',
    size: 'medium',
    disabled: false,
    required: false,
    error: false,
    multiple: false,
  },
  render: (args) => (
    <Select id="select-playground" value={10} {...args}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  ),
}

export const Default: Story = {
  args: {} as never,
  render: () => (
    <Select id="select" value={10} label="Age" onChange={console.log}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  ),
}

export const Variants: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Select id="outlined" value={10} label="Outlined" variant="outlined">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select id="filled" value={10} label="Filled" variant="filled">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select id="standard" value={10} label="Standard" variant="standard">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
    </div>
  ),
}

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Select id="small" value={10} label="Small" size="small">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select id="medium" value={10} label="Medium" size="medium">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
    </div>
  ),
}

export const InteractionTest: Story = {
  args: {} as never,
  render: () => (
    <Select id="select-test" value={10} label="Age" onChange={console.log}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')

    await expect(select).toBeInTheDocument()
    await userEvent.click(select)

    const listbox = await within(document.body).findByRole('listbox')
    await expect(listbox).toBeInTheDocument()

    const option = within(listbox).getByText('Twenty')
    await userEvent.click(option)
  },
}
