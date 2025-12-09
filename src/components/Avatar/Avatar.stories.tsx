import FolderIcon from '@mui/icons-material/Folder'
import MUIAvatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Stack from '@mui/material/Stack'

import { createSelectArgType } from '../../../.storybook/argTypeTemplates'

import Avatar from './Avatar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    variant: createSelectArgType(
      ['circular', 'rounded', 'square'],
      'circular',
      'The shape of the avatar.',
      'Appearance',
    ),
    src: {
      control: 'text',
      description: 'The src attribute for the img element.',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description:
        'Used in combination with src to provide an alt attribute for the img element.',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'Used to render icon or text elements inside the Avatar.',
      table: { category: 'Content' },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Avatar component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    children: 'AB',
    variant: 'circular',
  },
}

export const Default: Story = {
  args: {
    children: 'H',
  },
}

export function ImageAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <MUIAvatar
        alt="Avatar 1"
        src="https://mui.com/static/images/avatar/1.jpg"
      />
      <MUIAvatar
        alt="Avatar 2"
        src="https://mui.com/static/images/avatar/2.jpg"
      />
      <MUIAvatar
        alt="Avatar 3"
        src="https://mui.com/static/images/avatar/3.jpg"
      />
    </Stack>
  )
}

export function LetterAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <MUIAvatar>H</MUIAvatar>
      <MUIAvatar sx={{ bgcolor: 'primary.main' }}>N</MUIAvatar>
      <MUIAvatar sx={{ bgcolor: 'secondary.main' }}>OP</MUIAvatar>
    </Stack>
  )
}

export function IconAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <MUIAvatar>
        <FolderIcon />
      </MUIAvatar>
      <MUIAvatar sx={{ bgcolor: 'primary.main' }}>
        <FolderIcon />
      </MUIAvatar>
    </Stack>
  )
}

export function Sizes() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <MUIAvatar sx={{ width: 24, height: 24 }}>S</MUIAvatar>
      <MUIAvatar>M</MUIAvatar>
      <MUIAvatar sx={{ width: 56, height: 56 }}>L</MUIAvatar>
    </Stack>
  )
}

export function Colors() {
  return (
    <Stack direction="row" spacing={2}>
      <MUIAvatar sx={{ bgcolor: 'primary.main' }}>P</MUIAvatar>
      <MUIAvatar sx={{ bgcolor: 'secondary.main' }}>S</MUIAvatar>
      <MUIAvatar sx={{ bgcolor: 'error.main' }}>E</MUIAvatar>
      <MUIAvatar sx={{ bgcolor: 'success.main' }}>S</MUIAvatar>
    </Stack>
  )
}

export function Group() {
  return (
    <AvatarGroup max={4}>
      <MUIAvatar alt="A1" src="https://mui.com/static/images/avatar/1.jpg" />
      <MUIAvatar alt="A2" src="https://mui.com/static/images/avatar/2.jpg" />
      <MUIAvatar alt="A3" src="https://mui.com/static/images/avatar/3.jpg" />
      <MUIAvatar alt="A4" src="https://mui.com/static/images/avatar/4.jpg" />
      <MUIAvatar alt="A5" src="https://mui.com/static/images/avatar/5.jpg" />
    </AvatarGroup>
  )
}
