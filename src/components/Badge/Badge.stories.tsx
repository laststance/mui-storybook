import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MUIBadge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import type { Meta, StoryObj } from '@storybook/react'

import Badge from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    badgeContent: 4,
    color: 'primary',
    children: <MailIcon />,
  },
}

export function Colors() {
  return (
    <Stack direction="row" spacing={3}>
      <MUIBadge badgeContent={4} color="primary">
        <MailIcon />
      </MUIBadge>
      <MUIBadge badgeContent={4} color="secondary">
        <MailIcon />
      </MUIBadge>
      <MUIBadge badgeContent={4} color="error">
        <MailIcon />
      </MUIBadge>
      <MUIBadge badgeContent={4} color="success">
        <MailIcon />
      </MUIBadge>
    </Stack>
  )
}

export function DotBadge() {
  return (
    <Stack direction="row" spacing={3}>
      <MUIBadge variant="dot" color="primary">
        <MailIcon />
      </MUIBadge>
      <MUIBadge variant="dot" color="secondary">
        <NotificationsIcon />
      </MUIBadge>
    </Stack>
  )
}

export function MaxBadgeCount() {
  return (
    <Stack direction="row" spacing={3}>
      <MUIBadge badgeContent={99} color="primary">
        <MailIcon />
      </MUIBadge>
      <MUIBadge badgeContent={100} color="primary">
        <MailIcon />
      </MUIBadge>
      <MUIBadge badgeContent={1000} max={999} color="primary">
        <MailIcon />
      </MUIBadge>
    </Stack>
  )
}

export function WithIconButton() {
  return (
    <Stack direction="row" spacing={2}>
      <IconButton aria-label="mail">
        <MUIBadge badgeContent={4} color="primary">
          <MailIcon />
        </MUIBadge>
      </IconButton>
      <IconButton aria-label="notifications">
        <MUIBadge badgeContent={17} color="error">
          <NotificationsIcon />
        </MUIBadge>
      </IconButton>
    </Stack>
  )
}
