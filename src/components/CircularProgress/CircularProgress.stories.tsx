import CircularProgress from './CircularProgress'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/CircularProgress',
  component: CircularProgress,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
