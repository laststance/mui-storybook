import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { expect, within } from 'storybook/test'

import AvatarGroup from './AvatarGroup'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    max: 4,
    children: [
      <Avatar key="1" alt="User 1" src="https://i.pravatar.cc/150?img=1" />,
      <Avatar key="2" alt="User 2" src="https://i.pravatar.cc/150?img=2" />,
      <Avatar key="3" alt="User 3" src="https://i.pravatar.cc/150?img=3" />,
      <Avatar key="4" alt="User 4" src="https://i.pravatar.cc/150?img=4" />,
      <Avatar key="5" alt="User 5" src="https://i.pravatar.cc/150?img=5" />,
    ],
  },
}

export const MaxAvatars: Story = {
  args: {},
  render: () => (
    <Stack spacing={2}>
      <AvatarGroup max={3}>
        <Avatar alt="User 1" src="https://i.pravatar.cc/150?img=1" />
        <Avatar alt="User 2" src="https://i.pravatar.cc/150?img=2" />
        <Avatar alt="User 3" src="https://i.pravatar.cc/150?img=3" />
        <Avatar alt="User 4" src="https://i.pravatar.cc/150?img=4" />
        <Avatar alt="User 5" src="https://i.pravatar.cc/150?img=5" />
      </AvatarGroup>
      <AvatarGroup max={5}>
        <Avatar alt="User 1" src="https://i.pravatar.cc/150?img=1" />
        <Avatar alt="User 2" src="https://i.pravatar.cc/150?img=2" />
        <Avatar alt="User 3" src="https://i.pravatar.cc/150?img=3" />
        <Avatar alt="User 4" src="https://i.pravatar.cc/150?img=4" />
        <Avatar alt="User 5" src="https://i.pravatar.cc/150?img=5" />
      </AvatarGroup>
    </Stack>
  ),
}

export const TotalAvatars: Story = {
  args: {
    total: 24,
    children: [
      <Avatar key="1" alt="User 1" src="https://i.pravatar.cc/150?img=1" />,
      <Avatar key="2" alt="User 2" src="https://i.pravatar.cc/150?img=2" />,
      <Avatar key="3" alt="User 3" src="https://i.pravatar.cc/150?img=3" />,
    ],
  },
}

export const Spacing: Story = {
  args: {},
  render: () => (
    <Stack spacing={2}>
      <AvatarGroup spacing="small">
        <Avatar alt="User 1" src="https://i.pravatar.cc/150?img=1" />
        <Avatar alt="User 2" src="https://i.pravatar.cc/150?img=2" />
        <Avatar alt="User 3" src="https://i.pravatar.cc/150?img=3" />
      </AvatarGroup>
      <AvatarGroup spacing="medium">
        <Avatar alt="User 1" src="https://i.pravatar.cc/150?img=1" />
        <Avatar alt="User 2" src="https://i.pravatar.cc/150?img=2" />
        <Avatar alt="User 3" src="https://i.pravatar.cc/150?img=3" />
      </AvatarGroup>
    </Stack>
  ),
}

export const WithLetterAvatars: Story = {
  args: {
    children: [
      <Avatar key="1" sx={{ bgcolor: '#1976d2' }}>
        AB
      </Avatar>,
      <Avatar key="2" sx={{ bgcolor: '#9c27b0' }}>
        CD
      </Avatar>,
      <Avatar key="3" sx={{ bgcolor: '#2e7d32' }}>
        EF
      </Avatar>,
    ],
  },
}

export const InteractionTest: Story = {
  args: {
    max: 3,
    children: [
      <Avatar key="1" alt="User 1" src="https://i.pravatar.cc/150?img=1" />,
      <Avatar key="2" alt="User 2" src="https://i.pravatar.cc/150?img=2" />,
      <Avatar key="3" alt="User 3" src="https://i.pravatar.cc/150?img=3" />,
      <Avatar key="4" alt="User 4" src="https://i.pravatar.cc/150?img=4" />,
      <Avatar key="5" alt="User 5" src="https://i.pravatar.cc/150?img=5" />,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify avatars render (max=3 shows 2 images + overflow indicator)
    const images = canvas.getAllByRole('img')
    await expect(images.length).toBeGreaterThanOrEqual(1)

    // Verify overflow indicator shows +3 (5 total - 2 shown = 3 remaining)
    const overflow = canvas.getByText('+3')
    await expect(overflow).toBeInTheDocument()
  },
}
