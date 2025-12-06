import Box from '@mui/material/Box'
import MUISkeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import type { Meta, StoryObj } from '@storybook/react-vite'

import Skeleton from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'text',
    width: 210,
  },
}

export function Variants() {
  return (
    <Stack spacing={1}>
      <MUISkeleton variant="text" sx={{ fontSize: '1rem' }} />
      <MUISkeleton variant="circular" width={40} height={40} />
      <MUISkeleton variant="rectangular" width={210} height={60} />
      <MUISkeleton variant="rounded" width={210} height={60} />
    </Stack>
  )
}

export function Animations() {
  return (
    <Stack spacing={1}>
      <MUISkeleton animation="pulse" />
      <MUISkeleton animation="wave" />
      <MUISkeleton animation={false} />
    </Stack>
  )
}

export function CardExample() {
  return (
    <Box sx={{ width: 300 }}>
      <MUISkeleton variant="rectangular" height={140} />
      <Box sx={{ pt: 0.5 }}>
        <MUISkeleton />
        <MUISkeleton width="60%" />
      </Box>
    </Box>
  )
}

export function ListExample() {
  return (
    <Stack spacing={1}>
      {[1, 2, 3].map((item) => (
        <Box key={item} sx={{ display: 'flex', alignItems: 'center' }}>
          <MUISkeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ width: '100%' }}>
            <MUISkeleton width="80%" />
            <MUISkeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Stack>
  )
}
