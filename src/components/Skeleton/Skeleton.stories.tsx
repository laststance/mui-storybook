import Box from '@mui/material/Box'
import MUISkeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { expect, within } from 'storybook/test'

import {
  createSelectArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Skeleton from './Skeleton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    variant: createSelectArgType(
      ['text', 'circular', 'rectangular', 'rounded'],
      'text',
      'The type of content that will be rendered.',
      'Appearance',
    ),
    animation: createSelectArgType(
      ['pulse', 'wave', 'false'],
      'pulse',
      'The animation. If false the animation effect is disabled.',
      'Appearance',
    ),
    width: createNumberArgType('Width of the skeleton.', 210, 0, 500, 'Layout'),
    height: createNumberArgType(
      'Height of the skeleton.',
      60,
      0,
      500,
      'Layout',
    ),
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Skeleton component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
    width: 210,
    height: 61,
  },
}

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
          <MUISkeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ mr: 2 }}
          />
          <Box sx={{ width: '100%' }}>
            <MUISkeleton width="80%" />
            <MUISkeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Stack>
  )
}

export const InteractionTest: Story = {
  args: {},
  render: () => (
    <Stack spacing={2}>
      <MUISkeleton
        variant="text"
        sx={{ fontSize: '1rem' }}
        data-testid="text-skeleton"
      />
      <MUISkeleton
        variant="circular"
        width={40}
        height={40}
        data-testid="circular-skeleton"
      />
      <MUISkeleton
        variant="rectangular"
        width={210}
        height={60}
        data-testid="rect-skeleton"
      />
      <MUISkeleton
        variant="rounded"
        width={210}
        height={60}
        data-testid="rounded-skeleton"
      />
      <Box sx={{ width: 300 }}>
        <MUISkeleton animation="pulse" data-testid="pulse-skeleton" />
        <MUISkeleton animation="wave" data-testid="wave-skeleton" />
        <MUISkeleton animation={false} data-testid="static-skeleton" />
      </Box>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify skeleton variants render', async () => {
      const textSkeleton = canvas.getByTestId('text-skeleton')
      await expect(textSkeleton).toBeInTheDocument()

      const circularSkeleton = canvas.getByTestId('circular-skeleton')
      await expect(circularSkeleton).toBeInTheDocument()

      const rectSkeleton = canvas.getByTestId('rect-skeleton')
      await expect(rectSkeleton).toBeInTheDocument()

      const roundedSkeleton = canvas.getByTestId('rounded-skeleton')
      await expect(roundedSkeleton).toBeInTheDocument()
    })

    await step('Verify skeleton animations render', async () => {
      const pulseSkeleton = canvas.getByTestId('pulse-skeleton')
      await expect(pulseSkeleton).toBeInTheDocument()

      const waveSkeleton = canvas.getByTestId('wave-skeleton')
      await expect(waveSkeleton).toBeInTheDocument()

      const staticSkeleton = canvas.getByTestId('static-skeleton')
      await expect(staticSkeleton).toBeInTheDocument()
    })
  },
}
