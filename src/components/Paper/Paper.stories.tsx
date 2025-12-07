import Paper from './Paper'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export { SimplePaper, Variants, Elevation } from './examples'
