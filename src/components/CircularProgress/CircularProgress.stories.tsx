import Box from '@mui/material/Box'
import MUICircularProgress from '@mui/material/CircularProgress'

import {
  muiColorArgType,
  createSelectArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import CircularProgress from './CircularProgress'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    size: {
      control: { type: 'number', min: 16, max: 100 },
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: '40' },
        category: 'Appearance',
        type: { summary: 'number | string' },
      },
    },
    thickness: createNumberArgType(
      'The thickness of the circle.',
      3.6,
      1,
      10,
      'Appearance',
    ),
    variant: createSelectArgType(
      ['determinate', 'indeterminate'],
      'indeterminate',
      'The variant to use.',
      'Appearance',
    ),
    value: createNumberArgType(
      'The value of the progress indicator (0-100). Only works with determinate variant.',
      0,
      0,
      100,
      'Content',
    ),
    disableShrink: {
      control: 'boolean',
      description: 'If true, the shrink animation is disabled.',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Appearance',
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the CircularProgress component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    color: 'primary',
    size: 40,
    thickness: 3.6,
    variant: 'indeterminate',
    value: 0,
    disableShrink: false,
  },
}

export const Default: Story = {
  args: {},
}

export function Determinate() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <MUICircularProgress variant="determinate" value={25} />
      <MUICircularProgress variant="determinate" value={50} />
      <MUICircularProgress variant="determinate" value={75} />
      <MUICircularProgress variant="determinate" value={100} />
    </Box>
  )
}

export function Colors() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <MUICircularProgress color="primary" />
      <MUICircularProgress color="secondary" />
      <MUICircularProgress color="success" />
      <MUICircularProgress color="error" />
      <MUICircularProgress color="warning" />
      <MUICircularProgress color="info" />
    </Box>
  )
}

export function Sizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <MUICircularProgress size={20} />
      <MUICircularProgress size={30} />
      <MUICircularProgress size={40} />
      <MUICircularProgress size={60} />
    </Box>
  )
}
