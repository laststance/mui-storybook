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
