import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MUIBadge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { expect, within } from 'storybook/test'

import {
  muiColorArgType,
  createSelectArgType,
  createBooleanArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Badge from './Badge'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    variant: createSelectArgType(
      ['standard', 'dot'],
      'standard',
      'The variant to use.',
      'Appearance',
    ),
    anchorOrigin: { control: false }, // Complex object
    overlap: createSelectArgType(
      ['circular', 'rectangular'],
      'rectangular',
      'Wrapped shape the badge should overlap.',
      'Layout',
    ),
    invisible: createBooleanArgType(
      'If true, the badge is invisible.',
      false,
      'State',
    ),
    showZero: createBooleanArgType(
      'Controls whether the badge is hidden when badgeContent is zero.',
      false,
      'State',
    ),
    max: createNumberArgType('Max count to show.', 99, 1, 999, 'Content'),
    badgeContent: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'The content rendered within the badge.',
      table: { category: 'Content' },
    },
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Badge component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    badgeContent: 4,
    color: 'primary',
    variant: 'standard',
    invisible: false,
    showZero: false,
    max: 99,
    children: <MailIcon />,
  },
}

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
  render: () => (
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
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify badges render with correct content
    const badge4 = canvas.getByText('4')
    await expect(badge4).toBeInTheDocument()

    const badge99 = canvas.getByText('99')
    await expect(badge99).toBeInTheDocument()

    const badge999Plus = canvas.getByText('999+')
    await expect(badge999Plus).toBeInTheDocument()
  },
}
