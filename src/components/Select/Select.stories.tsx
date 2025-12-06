import { MenuItem } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'

import Select from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props) => (
    <Select id="select" value={10} label="Age" onChange={console.log} {...props}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  ),
}
