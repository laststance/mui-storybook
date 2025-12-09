import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { expect, within } from 'storybook/test'

import {
  muiColorArgType,
  createSelectArgType,
} from '../../../.storybook/argTypeTemplates'

import Icon from './Icon'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Icon',
  component: Icon,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    fontSize: createSelectArgType(
      ['inherit', 'small', 'medium', 'large'],
      'medium',
      'The fontSize applied to the icon.',
      'Appearance',
    ),
    children: {
      control: 'text',
      description: 'The name of the icon font ligature.',
      table: { category: 'Content' },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Icon component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    children: 'home',
    color: 'primary',
    fontSize: 'medium',
  },
}

export const Default: Story = {
  args: {
    children: 'home',
  },
}

export function VariousIcons() {
  return (
    <Stack direction="row" spacing={2}>
      <HomeIcon />
      <SettingsIcon />
      <DeleteIcon />
      <AddIcon />
      <SearchIcon />
      <FavoriteIcon />
    </Stack>
  )
}

export function IconSizes() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <HomeIcon fontSize="small" />
      <HomeIcon fontSize="medium" />
      <HomeIcon fontSize="large" />
      <HomeIcon sx={{ fontSize: 48 }} />
    </Stack>
  )
}

export function IconColors() {
  return (
    <Stack direction="row" spacing={2}>
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="error" />
      <HomeIcon color="success" />
      <HomeIcon color="warning" />
      <HomeIcon color="info" />
      <HomeIcon color="disabled" />
    </Stack>
  )
}

export function IconWithButton() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="add" color="primary">
        <AddIcon />
      </IconButton>
      <IconButton aria-label="favorite" color="secondary">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="settings" disabled>
        <SettingsIcon />
      </IconButton>
    </Stack>
  )
}

export function IconButtonSizes() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="delete" size="medium">
        <DeleteIcon fontSize="medium" />
      </IconButton>
      <IconButton aria-label="delete" size="large">
        <DeleteIcon fontSize="large" />
      </IconButton>
    </Stack>
  )
}

export function MaterialIcons() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <HomeIcon />
        <SettingsIcon />
        <DeleteIcon />
        <SearchIcon />
      </Stack>
      <Stack direction="row" spacing={2}>
        <HomeIcon color="primary" />
        <SettingsIcon color="secondary" />
        <DeleteIcon color="error" />
        <SearchIcon color="success" />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <HomeIcon fontSize="small" />
        <SettingsIcon fontSize="medium" />
        <DeleteIcon fontSize="large" />
      </Stack>
    </Stack>
  )
}

export const InteractionTest: Story = {
  args: {
    children: 'home',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify icon renders with correct text', async () => {
      const icon = canvas.getByText('home')
      await expect(icon).toBeInTheDocument()
    })

    await step('Test accessibility', async () => {
      const icon = canvas.getByText('home')
      await expect(icon.tagName).toBe('SPAN')
    })
  },
}
