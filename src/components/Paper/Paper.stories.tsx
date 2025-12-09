import Box from '@mui/material/Box'
import { expect, within } from 'storybook/test'

import {
  createSelectArgType,
  createBooleanArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Paper from './Paper'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Surfaces/Paper',
  component: Paper,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    variant: createSelectArgType(
      ['elevation', 'outlined'],
      'elevation',
      'The variant to use.',
      'Appearance',
    ),
    elevation: createNumberArgType(
      'Shadow depth, corresponds to dp in the spec.',
      1,
      0,
      24,
      'Appearance',
    ),
    square: createBooleanArgType(
      'If true, rounded corners are disabled.',
      false,
      'Appearance',
    ),
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Paper>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Paper component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    variant: 'elevation',
    elevation: 1,
    square: false,
  },
  render: (args) => (
    <Paper {...args} sx={{ p: 2, width: 200 }}>
      Playground Paper
    </Paper>
  ),
}

export const Default: Story = {
  args: {},
}

export { SimplePaper, Variants, Elevation } from './examples'

export const InteractionTest: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} data-testid="paper-elevation-0" />
      <Paper elevation={3} data-testid="paper-elevation-3" />
      <Paper elevation={8} data-testid="paper-elevation-8" />
      <Paper variant="outlined" data-testid="paper-outlined" />
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify all Paper components render', async () => {
      const paper0 = canvas.getByTestId('paper-elevation-0')
      const paper3 = canvas.getByTestId('paper-elevation-3')
      const paper8 = canvas.getByTestId('paper-elevation-8')
      const paperOutlined = canvas.getByTestId('paper-outlined')

      expect(paper0).toBeInTheDocument()
      expect(paper3).toBeInTheDocument()
      expect(paper8).toBeInTheDocument()
      expect(paperOutlined).toBeInTheDocument()
    })

    await step('Verify Paper has correct MUI classes', async () => {
      const paper0 = canvas.getByTestId('paper-elevation-0')
      const paperOutlined = canvas.getByTestId('paper-outlined')

      expect(paper0).toHaveClass('MuiPaper-root')
      expect(paper0).toHaveClass('MuiPaper-elevation0')
      expect(paperOutlined).toHaveClass('MuiPaper-root')
      expect(paperOutlined).toHaveClass('MuiPaper-outlined')
    })

    await step('Verify Paper structure and dimensions', async () => {
      const paper3 = canvas.getByTestId('paper-elevation-3')
      const styles = window.getComputedStyle(paper3)

      expect(paper3).toBeInTheDocument()
      expect(styles.width).toBeTruthy()
      expect(styles.height).toBeTruthy()
    })
  },
}
