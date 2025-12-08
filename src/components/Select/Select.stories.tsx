import { MenuItem } from '@mui/material'
import { expect, userEvent, within } from 'storybook/test'

import Select from './Select'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props) => (
    <Select
      id="select"
      value={10}
      label="Age"
      onChange={console.log}
      {...props}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  ),
}

export const InteractionTest: Story = {
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
