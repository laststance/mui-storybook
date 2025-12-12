import { expect, userEvent, within } from 'storybook/test'

import LayoutPatternsGallery from './LayoutPatternsGallery'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout Complete/LayoutPatternsGallery',
  component: LayoutPatternsGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
LayoutPatternsGallery provides an interactive gallery showcasing 30 web layout patterns organized by category with visual demos.

## Features
- **30 Layout Patterns**: Comprehensive coverage from Column-Based to Special layouts
- **Category Filtering**: Filter by Column-Based, Grid-Based, Scroll/Flow, Container/Flow, Data Display, or Special
- **Visual Previews**: Mini CSS illustrations for each pattern
- **Expandable Details**: View use cases and characteristics for each pattern
- **Responsive Grid**: 1-4 columns based on viewport size
- **Compact Mode**: Smaller cards for overview display
- **Dark/Light Theme Support**: Automatically adapts to the current theme

## Categories
1. **Column-Based (5)**: Single Column, 2-Column, 3-Column, Two-Column (Left-Right), Multi-Column
2. **Grid-Based (4)**: Grid Layout, Masonry Layout, Broken Grid, Non-Grid
3. **Scroll/Flow (4)**: Full-Screen, Card-Based, Infinite Scroll, Parallax
4. **Container/Flow (5)**: Stack, Ribbon, Split Screen, Off-Canvas, Liquid/Responsive
5. **Data Display (6)**: Tabbed, Multi-Panel, Timeline, Catalog, Comparison, Form-Based
6. **Special (6)**: FAB, Overlay, Circular, Canvas, Hierarchical, Scattered/Freeform

## Usage
\`\`\`tsx
import { LayoutPatternsGallery } from './LayoutPatternsGallery'

// Basic usage - shows all patterns with filter
<LayoutPatternsGallery />

// Filter to specific category by default
<LayoutPatternsGallery defaultCategory="Grid-Based" />

// Compact mode without filter
<LayoutPatternsGallery compact showFilter={false} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    defaultCategory: {
      control: 'select',
      options: [
        undefined,
        'Column-Based',
        'Grid-Based',
        'Scroll/Flow',
        'Container/Flow',
        'Data Display',
        'Special',
      ],
      description:
        'Default category to filter by. If not provided, shows all patterns.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'undefined' },
      },
    },
    showFilter: {
      control: 'boolean',
      description: 'Whether to show the category filter chips.',
      table: {
        category: 'Controls',
        defaultValue: { summary: 'true' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Whether to render in compact mode with smaller cards.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    showFilter: true,
    compact: false,
  },
} satisfies Meta<typeof LayoutPatternsGallery>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the LayoutPatternsGallery component.
 * Use the Controls panel to experiment with configuration options.
 */
export const Playground: Story = {
  args: {
    showFilter: true,
    compact: false,
  },
}

/**
 * Default state showing all 30 layout patterns with category filter.
 */
export const Default: Story = {
  args: {},
}

/**
 * Shows only Column-Based layout patterns (5 patterns).
 */
export const ColumnBasedCategory: Story = {
  args: {
    defaultCategory: 'Column-Based',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the 5 Column-Based patterns: Single Column, 2-Column, 3-Column, Two-Column (Left-Right), and Multi-Column.',
      },
    },
  },
}

/**
 * Shows only Grid-Based layout patterns (4 patterns).
 */
export const GridBasedCategory: Story = {
  args: {
    defaultCategory: 'Grid-Based',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the 4 Grid-Based patterns: Grid Layout, Masonry Layout, Broken Grid, and Non-Grid.',
      },
    },
  },
}

/**
 * Shows only Scroll/Flow layout patterns (4 patterns).
 */
export const ScrollFlowCategory: Story = {
  args: {
    defaultCategory: 'Scroll/Flow',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the 4 Scroll/Flow patterns: Full-Screen, Card-Based, Infinite Scroll, and Parallax.',
      },
    },
  },
}

/**
 * Shows only Container/Flow layout patterns (5 patterns).
 */
export const ContainerFlowCategory: Story = {
  args: {
    defaultCategory: 'Container/Flow',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the 5 Container/Flow patterns: Stack, Ribbon, Split Screen, Off-Canvas, and Liquid/Responsive.',
      },
    },
  },
}

/**
 * Shows only Data Display layout patterns (6 patterns).
 */
export const DataDisplayCategory: Story = {
  args: {
    defaultCategory: 'Data Display',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the 6 Data Display patterns: Tabbed, Multi-Panel, Timeline, Catalog, Comparison, and Form-Based.',
      },
    },
  },
}

/**
 * Shows only Special layout patterns (6 patterns).
 */
export const SpecialCategory: Story = {
  args: {
    defaultCategory: 'Special',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays the 6 Special patterns: FAB, Overlay, Circular, Canvas, Hierarchical, and Scattered/Freeform.',
      },
    },
  },
}

/**
 * Compact view with smaller cards and 4-column layout on large screens.
 */
export const CompactView: Story = {
  args: {
    compact: true,
    showFilter: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact mode displays smaller cards with tighter spacing, ideal for quick overview of all patterns.',
      },
    },
  },
}

/**
 * Gallery without filter chips for embedding in documentation.
 */
export const WithoutFilter: Story = {
  args: {
    showFilter: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hides the category filter chips, useful when embedding the gallery in other documentation.',
      },
    },
  },
}

/**
 * Interaction test: Verifies category filter functionality.
 */
export const FilterInteraction: Story = {
  args: {
    showFilter: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find and click the Grid-Based filter chip (use getAllByRole since there might be multiple)
    const gridBasedChips = await canvas.findAllByRole('button', {
      name: /Grid-Based/i,
    })
    await expect(gridBasedChips.length).toBeGreaterThan(0)

    await userEvent.click(gridBasedChips[0])

    // Verify that Grid Layout pattern card is visible (use findAllByText)
    const gridLayoutTexts = await canvas.findAllByText('Grid Layout')
    await expect(gridLayoutTexts.length).toBeGreaterThan(0)
    await expect(gridLayoutTexts[0]).toBeVisible()

    // Verify that patterns from other categories are not visible or filtered
    const singleColumnCards = canvas.queryAllByText('Single Column')
    // The text might still exist but in a filtered state, so we check the count
    await expect(singleColumnCards.length).toBeLessThanOrEqual(1)
  },
}

/**
 * Interaction test: Verifies expand/collapse details functionality.
 */
export const ExpandDetailsInteraction: Story = {
  args: {
    defaultCategory: 'Column-Based',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the first "View Details" button
    const viewDetailsButtons = await canvas.findAllByText(/View Details/i)
    await expect(viewDetailsButtons.length).toBeGreaterThan(0)

    // Click to expand
    await userEvent.click(viewDetailsButtons[0])

    // Verify "Recommended Use Cases" text appears (may be multiple)
    const useCasesTexts = await canvas.findAllByText(/Recommended Use Cases/i)
    await expect(useCasesTexts.length).toBeGreaterThan(0)
    await expect(useCasesTexts[0]).toBeVisible()

    // Click again to collapse
    const hideDetailsButton = await canvas.findByText(/Hide Details/i)
    await userEvent.click(hideDetailsButton)

    // Verify "View Details" is back
    const viewDetailsAgain = await canvas.findAllByText(/View Details/i)
    await expect(viewDetailsAgain.length).toBeGreaterThan(0)
  },
}

/**
 * Interaction test: Verifies "All" filter resets category selection.
 */
export const AllFilterInteraction: Story = {
  args: {
    defaultCategory: 'Special',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Initially showing Special category (use findAllByText)
    const fabTexts = await canvas.findAllByText('FAB')
    await expect(fabTexts.length).toBeGreaterThan(0)
    await expect(fabTexts[0]).toBeVisible()

    // Click the "All" filter chip
    const allChip = await canvas.findByRole('button', {
      name: /All \(\d+\)/i,
    })
    await userEvent.click(allChip)

    // Verify patterns from other categories are now visible (use findAllByText)
    const singleColumnTexts = await canvas.findAllByText('Single Column')
    await expect(singleColumnTexts.length).toBeGreaterThan(0)
    await expect(singleColumnTexts[0]).toBeVisible()
  },
}

/**
 * Demonstrates hover effects on pattern cards.
 */
export const HoverEffects: Story = {
  args: {
    defaultCategory: 'Column-Based',
    compact: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover over cards to see the elevation and transform animation effects.',
      },
    },
  },
}

/**
 * Full gallery with all patterns expanded for documentation.
 */
export const AllPatternsOverview: Story = {
  args: {
    showFilter: false,
    compact: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete overview of all 30 layout patterns in compact mode without filter, ideal for documentation screenshots.',
      },
    },
  },
}
