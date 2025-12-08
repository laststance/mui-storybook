import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigationIcon from '@mui/icons-material/Navigation'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import {
  muiColorArgType,
  muiSizeArgType,
  muiDisabledArgType,
  muiVariantArgType,
} from '../../../.storybook/argTypeTemplates'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/FloatingActionButton',
  component: Fab,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    size: muiSizeArgType,
    disabled: muiDisabledArgType,
    variant: muiVariantArgType(['circular', 'extended'], 'circular'),
    disableRipple: {
      control: 'boolean',
      description: 'If true, the ripple effect is disabled.',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    href: {
      control: 'text',
      description: 'The URL to link to when the button is clicked.',
      table: { category: 'Navigation' },
    },
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Fab>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the FloatingActionButton component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
    variant: 'circular',
    'aria-label': 'add',
    children: <AddIcon />,
  },
}

export const Default: Story = {
  args: {
    color: 'primary',
    'aria-label': 'add',
    children: <AddIcon />,
  },
}

export const Colors: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="primary">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="secondary">
        <EditIcon />
      </Fab>
      <Fab color="success" aria-label="success">
        <AddIcon />
      </Fab>
      <Fab color="error" aria-label="error">
        <FavoriteIcon />
      </Fab>
    </Box>
  ),
}

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab size="small" color="primary" aria-label="small">
        <AddIcon />
      </Fab>
      <Fab size="medium" color="primary" aria-label="medium">
        <AddIcon />
      </Fab>
      <Fab size="large" color="primary" aria-label="large">
        <AddIcon />
      </Fab>
    </Box>
  ),
}

export const Extended: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab variant="extended" color="secondary">
        <EditIcon sx={{ mr: 1 }} />
        Edit
      </Fab>
    </Box>
  ),
}

export const FloatingActionButtons: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab>
    </Box>
  ),
}
