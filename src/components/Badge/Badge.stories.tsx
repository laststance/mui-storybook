import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MUIBadge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { expect, fn, userEvent, within } from 'storybook/test'

import Badge from './Badge'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: [], // autodocs disabled - using custom MDX documentation,
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

export const InteractionTest: Story = {
  args: {},
  render: () => {
    const handleClick = fn()
    return (
      <Stack direction="row" spacing={3}>
        <MUIBadge badgeContent={4} color="primary">
          <MailIcon />
        </MUIBadge>
        <MUIBadge badgeContent={99} color="secondary">
          <MailIcon />
        </MUIBadge>
        <MUIBadge badgeContent={1000} max={999} color="error">
          <MailIcon />
        </MUIBadge>
        <IconButton aria-label="notifications" onClick={handleClick}>
          <MUIBadge badgeContent={17} color="success">
            <NotificationsIcon />
          </MUIBadge>
        </IconButton>
      </Stack>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify badges render with correct content', async () => {
      const badge4 = canvas.getByText('4')
      await expect(badge4).toBeInTheDocument()

      const badge99 = canvas.getByText('99')
      await expect(badge99).toBeInTheDocument()

      const badge999Plus = canvas.getByText('999+')
      await expect(badge999Plus).toBeInTheDocument()

      const badge17 = canvas.getByText('17')
      await expect(badge17).toBeInTheDocument()
    })

    await step('Verify badge icons are present', async () => {
      const mailIcons = canvas.getAllByTestId('MailIcon')
      await expect(mailIcons.length).toBe(3)

      const notificationIcon = canvas.getByTestId('NotificationsIcon')
      await expect(notificationIcon).toBeInTheDocument()
    })

    await step('Test badge with IconButton interaction', async () => {
      const notificationButton = canvas.getByRole('button', {
        name: /notifications/i,
      })
      await expect(notificationButton).toBeInTheDocument()
      await userEvent.click(notificationButton)
    })
  },
}
