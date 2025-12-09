import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { expect, within } from 'storybook/test'

import {
  muiColorArgType,
  createSelectArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Progress from './Progress'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    variant: createSelectArgType(
      ['determinate', 'indeterminate', 'buffer', 'query'],
      'indeterminate',
      'The variant to use.',
      'Appearance',
    ),
    value: createNumberArgType(
      'The value of the progress indicator (0-100). Used for determinate variant.',
      0,
      0,
      100,
      'Content',
    ),
    valueBuffer: createNumberArgType(
      'The value for the buffer bar (0-100). Used for buffer variant.',
      0,
      0,
      100,
      'Content',
    ),
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Progress component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    color: 'primary',
    variant: 'indeterminate',
    value: 50,
  },
  render: (args) => (
    <Box sx={{ width: '100%' }}>
      <LinearProgress {...args} />
    </Box>
  ),
}

export const Default: Story = {
  render: () => <LinearProgress />,
}

export function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  )
}

export function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )
}

export function LinearBuffer() {
  const [progress, setProgress] = React.useState(0)
  const [buffer, setBuffer] = React.useState(10)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
      setBuffer((prev) => (prev >= 100 ? 10 : prev + 10))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  )
}

export function LinearColors() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <LinearProgress color="primary" />
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="error" />
      <LinearProgress color="warning" />
      <LinearProgress color="info" />
    </Stack>
  )
}

export function CircularIndeterminate() {
  return (
    <Stack direction="row" spacing={2}>
      <CircularProgress />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
    </Stack>
  )
}

export function CircularDeterminate() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {progress}%
        </Typography>
      </Box>
    </Box>
  )
}

export function CircularSizes() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <CircularProgress size={20} />
      <CircularProgress size={30} />
      <CircularProgress size={40} />
      <CircularProgress size={60} />
    </Stack>
  )
}

export const InteractionTest: Story = {
  args: {},
  render: () => (
    <Stack spacing={3}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress data-testid="linear-indeterminate" />
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={50}
          data-testid="linear-determinate"
        />
      </Box>
      <Stack direction="row" spacing={2}>
        <CircularProgress data-testid="circular-indeterminate" />
        <CircularProgress
          variant="determinate"
          value={75}
          data-testid="circular-determinate"
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <LinearProgress color="primary" data-testid="linear-primary" />
        <LinearProgress color="secondary" data-testid="linear-secondary" />
        <LinearProgress color="success" data-testid="linear-success" />
      </Stack>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify linear progress variants render', async () => {
      const linearIndeterminate = canvas.getByTestId('linear-indeterminate')
      await expect(linearIndeterminate).toBeInTheDocument()

      const linearDeterminate = canvas.getByTestId('linear-determinate')
      await expect(linearDeterminate).toBeInTheDocument()
      await expect(linearDeterminate).toHaveAttribute('aria-valuenow', '50')
    })

    await step('Verify circular progress variants render', async () => {
      const circularIndeterminate = canvas.getByTestId('circular-indeterminate')
      await expect(circularIndeterminate).toBeInTheDocument()

      const circularDeterminate = canvas.getByTestId('circular-determinate')
      await expect(circularDeterminate).toBeInTheDocument()
      await expect(circularDeterminate).toHaveAttribute('aria-valuenow', '75')
    })

    await step('Verify progress color variants render', async () => {
      const primaryProgress = canvas.getByTestId('linear-primary')
      await expect(primaryProgress).toBeInTheDocument()

      const secondaryProgress = canvas.getByTestId('linear-secondary')
      await expect(secondaryProgress).toBeInTheDocument()

      const successProgress = canvas.getByTestId('linear-success')
      await expect(successProgress).toBeInTheDocument()
    })
  },
}
