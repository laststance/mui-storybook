import SpacingVisualizer from './SpacingVisualizer'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/Spacing',
  component: SpacingVisualizer,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The MUI spacing system is based on an **8px base unit**. The \`theme.spacing()\` function
multiplies the input factor by 8px to produce consistent spacing values throughout your application.

## Key Concepts

- **Base Unit**: 8px
- **Factors**: 0, 1, 2, 3... (multiplied by 8)
- **Usage**: \`sx={{ p: 2 }}\` equals 16px padding

## Common Shorthands

| Shorthand | Property | Example |
|-----------|----------|---------|
| \`p\` | padding | \`p: 2\` = 16px all sides |
| \`pt\`, \`pb\` | padding-top/bottom | \`pt: 1\` = 8px top |
| \`px\`, \`py\` | padding horizontal/vertical | \`px: 3\` = 24px left/right |
| \`m\` | margin | \`m: 2\` = 16px all sides |
| \`mt\`, \`mb\` | margin-top/bottom | \`mt: 4\` = 32px top |
| \`mx\`, \`my\` | margin horizontal/vertical | \`mx: 'auto'\` = center |
| \`gap\` | flex/grid gap | \`gap: 2\` = 16px gap |
| \`spacing\` | Stack/Grid spacing | \`spacing={3}\` = 24px |
        `,
      },
    },
  },
  argTypes: {
    minFactor: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Minimum spacing factor to display in the scale',
      table: { category: 'Scale Range' },
    },
    maxFactor: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Maximum spacing factor to display in the scale',
      table: { category: 'Scale Range' },
    },
    showScale: {
      control: 'boolean',
      description: 'Whether to show the visual scale section',
      table: { category: 'Display Options' },
    },
    showInteractiveDemo: {
      control: 'boolean',
      description: 'Whether to show the interactive demo section',
      table: { category: 'Display Options' },
    },
    showUsageExamples: {
      control: 'boolean',
      description: 'Whether to show the usage examples section',
      table: { category: 'Display Options' },
    },
  },
} satisfies Meta<typeof SpacingVisualizer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default view showing all sections: visual scale, interactive demo,
 * and usage examples. This provides a comprehensive overview of the MUI
 * spacing system.
 */
export const Default: Story = {
  args: {
    minFactor: 0,
    maxFactor: 12,
    showScale: true,
    showInteractiveDemo: true,
    showUsageExamples: true,
  },
}

/**
 * A compact view showing only the visual scale. Useful for quick reference
 * of spacing values and their pixel equivalents.
 */
export const ScaleOnly: Story = {
  args: {
    minFactor: 0,
    maxFactor: 10,
    showScale: true,
    showInteractiveDemo: false,
    showUsageExamples: false,
  },
}

/**
 * Shows only the interactive demo section where users can experiment
 * with padding, margin, and gap values using sliders.
 */
export const InteractiveOnly: Story = {
  args: {
    showScale: false,
    showInteractiveDemo: true,
    showUsageExamples: false,
  },
}

/**
 * Shows only the usage examples section with code snippets
 * demonstrating common spacing patterns.
 */
export const ExamplesOnly: Story = {
  args: {
    showScale: false,
    showInteractiveDemo: false,
    showUsageExamples: true,
  },
}

/**
 * Extended scale showing spacing values from 0 to 20.
 * Useful for seeing the full range of available spacing options.
 */
export const ExtendedScale: Story = {
  args: {
    minFactor: 0,
    maxFactor: 20,
    showScale: true,
    showInteractiveDemo: false,
    showUsageExamples: false,
  },
}

/**
 * A minimal view focused on the most commonly used spacing values (0-8).
 */
export const CommonValues: Story = {
  args: {
    minFactor: 0,
    maxFactor: 8,
    showScale: true,
    showInteractiveDemo: true,
    showUsageExamples: false,
  },
}
