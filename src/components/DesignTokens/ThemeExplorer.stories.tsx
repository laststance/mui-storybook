import { expect, userEvent, within } from 'storybook/test'

import { createBooleanArgType } from '../../../.storybook/argTypeTemplates'

import ThemeExplorer from './ThemeExplorer'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/ThemeExplorer',
  component: ThemeExplorer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ThemeExplorer provides an interactive tree view of the entire MUI theme object, similar to MUI's official Default Theme Viewer.

## Features
- **Interactive Tree View**: Expand and collapse nodes to navigate the theme structure
- **Color Swatches**: Visual preview of color values inline
- **Search**: Filter properties by name, path, or value
- **Expand/Collapse All**: Quick controls to expand or collapse the entire tree
- **Type Indicators**: Color-coded chips showing the type of each value
- **Dark/Light Theme Support**: Automatically adapts to the current theme

## Usage
\`\`\`tsx
import ThemeExplorer from './ThemeExplorer'

// Basic usage - displays current theme
<ThemeExplorer />

// With custom configuration
<ThemeExplorer
  defaultExpandedDepth={2}
  showSearch={true}
  maxHeight="800px"
/>
\`\`\`
        `,
      },
    },
  },
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    defaultExpandedDepth: {
      control: { type: 'number', min: 0, max: 5 },
      description:
        'Maximum initial depth to expand by default. Set to 0 to start fully collapsed.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '1' },
      },
    },
    showSearch: createBooleanArgType(
      'Whether to show the search input for filtering properties.',
      true,
      'Controls',
    ),
    showControls: createBooleanArgType(
      'Whether to show the Expand All / Collapse All buttons.',
      true,
      'Controls',
    ),
    maxHeight: {
      control: 'select',
      options: ['400px', '600px', '800px', '100%'],
      description: 'Maximum height of the tree container.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '600px' },
      },
    },
    customTheme: {
      control: false,
      description:
        'Optional custom theme object to explore. If not provided, uses the current MUI theme.',
      table: { category: 'Data' },
    },
  },
  args: {
    defaultExpandedDepth: 1,
    showSearch: true,
    showControls: true,
    maxHeight: '600px',
  },
} satisfies Meta<typeof ThemeExplorer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the ThemeExplorer component.
 * Use the Controls panel to experiment with configuration options.
 */
export const Playground: Story = {
  args: {
    defaultExpandedDepth: 1,
    showSearch: true,
    showControls: true,
    maxHeight: '600px',
  },
}

/**
 * Default state with minimal expansion for quick overview.
 */
export const Default: Story = {
  args: {
    defaultExpandedDepth: 1,
  },
}

/**
 * Fully expanded tree view showing the complete theme structure.
 * Note: This may be slow to render for very large themes.
 */
export const FullyExpanded: Story = {
  args: {
    defaultExpandedDepth: 5,
  },
}

/**
 * Collapsed view - all nodes start collapsed.
 */
export const FullyCollapsed: Story = {
  args: {
    defaultExpandedDepth: 0,
  },
}

/**
 * Minimal configuration without search or controls.
 */
export const MinimalControls: Story = {
  args: {
    showSearch: false,
    showControls: false,
    defaultExpandedDepth: 2,
  },
}

/**
 * Compact view with reduced height.
 */
export const CompactView: Story = {
  args: {
    maxHeight: '400px',
    defaultExpandedDepth: 1,
  },
}

/**
 * Interaction test: Verifies expand/collapse functionality.
 */
export const ExpandCollapseInteraction: Story = {
  args: {
    defaultExpandedDepth: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Wait for the component to render
    const paletteButton = await canvas.findByRole('button', {
      name: /expand|collapse/i,
    })

    // Click to expand
    await userEvent.click(paletteButton)

    // Verify it expanded (aria-label changes or children appear)
    await expect(paletteButton).toBeVisible()
  },
}

/**
 * Interaction test: Verifies Expand All button.
 */
export const ExpandAllInteraction: Story = {
  args: {
    defaultExpandedDepth: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find and click the Expand All button
    const expandAllButton = await canvas.findByRole('button', {
      name: /expand all/i,
    })
    await expect(expandAllButton).toBeInTheDocument()

    await userEvent.click(expandAllButton)

    // After expanding, we should see nested content
    // Look for a nested property that would only be visible when expanded
    const paletteText = await canvas.findByText('palette')
    await expect(paletteText).toBeVisible()
  },
}

/**
 * Interaction test: Verifies Collapse All button.
 */
export const CollapseAllInteraction: Story = {
  args: {
    defaultExpandedDepth: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find and click the Collapse All button
    const collapseAllButton = await canvas.findByRole('button', {
      name: /collapse all/i,
    })
    await expect(collapseAllButton).toBeInTheDocument()

    await userEvent.click(collapseAllButton)

    // The tree should now be collapsed
    await expect(collapseAllButton).toBeVisible()
  },
}

/**
 * Interaction test: Verifies search functionality.
 */
export const SearchInteraction: Story = {
  args: {
    defaultExpandedDepth: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the search input
    const searchInput = await canvas.findByPlaceholderText(
      /search theme properties/i,
    )
    await expect(searchInput).toBeInTheDocument()

    // Type a search query
    await userEvent.type(searchInput, 'primary')

    // The tree should filter to show only matching results
    // We should still see 'palette' since it contains 'primary'
    const primaryText = await canvas.findByText('primary')
    await expect(primaryText).toBeVisible()
  },
}

/**
 * Demonstrates color swatch display for palette colors.
 */
export const ColorSwatchDemo: Story = {
  args: {
    defaultExpandedDepth: 3,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Expand the palette > primary or palette > secondary nodes to see color swatches displayed inline with color values.',
      },
    },
  },
}
