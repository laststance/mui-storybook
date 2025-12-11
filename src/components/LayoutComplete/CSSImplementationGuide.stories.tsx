import CSSImplementationGuide from './CSSImplementationGuide'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/CSS Implementation Guide',
  component: CSSImplementationGuide,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive interactive guide comparing CSS Grid, Flexbox, and their MUI equivalents.

## Key Features

- **CSS Grid Section**: Covers grid-template-columns/rows, grid-template-areas, gap, and auto-fit/auto-fill patterns
- **Flexbox Section**: Covers flex-direction, justify-content, align-items, and gap
- **Comparison Table**: Side-by-side feature comparison with MUI component equivalents
- **Interactive Playground**: Toggle between Grid/Flexbox and adjust properties in real-time

## Usage

Use this guide to:
- Understand when to use CSS Grid vs Flexbox
- Learn the MUI equivalents for common CSS layout patterns
- Experiment with layout properties in the interactive playground
- Copy generated code for both CSS and MUI implementations
        `,
      },
    },
  },
  argTypes: {
    defaultTab: {
      control: 'select',
      options: ['grid', 'flexbox', 'comparison'],
      description: 'The default tab to display when the component mounts',
      table: {
        category: 'Display Options',
        defaultValue: { summary: 'grid' },
      },
    },
    showPlayground: {
      control: 'boolean',
      description: 'Whether to show the interactive playground section',
      table: {
        category: 'Display Options',
        defaultValue: { summary: 'true' },
      },
    },
  },
} satisfies Meta<typeof CSSImplementationGuide>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default view showing the CSS Grid tab with the interactive playground.
 * This is the recommended starting point for learning about CSS layout systems.
 */
export const Default: Story = {
  args: {
    defaultTab: 'grid',
    showPlayground: true,
  },
}

/**
 * Start with the CSS Grid tab focused. Ideal for learning about
 * two-dimensional layouts and grid-specific properties.
 */
export const GridFocused: Story = {
  args: {
    defaultTab: 'grid',
    showPlayground: true,
  },
}

/**
 * Start with the Flexbox tab focused. Ideal for learning about
 * one-dimensional layouts and flex-specific properties.
 */
export const FlexboxFocused: Story = {
  args: {
    defaultTab: 'flexbox',
    showPlayground: true,
  },
}

/**
 * Start with the Comparison tab focused. Shows a feature comparison
 * table to help decide when to use Grid vs Flexbox.
 */
export const ComparisonFocused: Story = {
  args: {
    defaultTab: 'comparison',
    showPlayground: true,
  },
}

/**
 * Documentation-only view without the interactive playground.
 * Useful for a more compact presentation of the CSS concepts.
 */
export const DocumentationOnly: Story = {
  args: {
    defaultTab: 'grid',
    showPlayground: false,
  },
}

/**
 * Playground-focused view starting on the comparison tab.
 * Great for quick experimentation after reviewing the feature comparison.
 */
export const PlaygroundWithComparison: Story = {
  args: {
    defaultTab: 'comparison',
    showPlayground: true,
  },
}
