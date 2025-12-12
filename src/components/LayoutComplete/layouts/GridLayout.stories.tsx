import { expect, fn, userEvent, within } from 'storybook/test'

import GridLayout from './GridLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * GridLayout demonstrates a structured rows and columns grid pattern,
 * commonly used in e-commerce product grids, image galleries, and card layouts.
 *
 * ## Use Cases
 * - **E-commerce product listings**: Display products in organized grid with filters
 * - **Image/media galleries**: Showcase visual content in uniform grid
 * - **Dashboard cards**: Organize widgets and data cards
 * - **Portfolio displays**: Present work samples in consistent layout
 *
 * ## CSS Grid Features Used
 * - `grid-template-columns: repeat(n, 1fr)` for equal-width columns
 * - `gap` property for consistent spacing between items
 * - Responsive column counts for different screen sizes
 *
 * ## Accessibility
 * - Each product card has proper ARIA labels
 * - Interactive elements are keyboard accessible
 * - Rating component uses proper semantics
 * - Color contrast meets WCAG AA standards
 */
const meta = {
  title: 'Layout Complete/Layouts/Grid',
  component: GridLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
GridLayout demonstrates structured rows and columns for organized content display.

## When to Use Grid Layout
- When you need items aligned in both rows and columns
- For product catalogs, image galleries, or card-based content
- When items should have equal widths within each row
- For dashboards with multiple data cards

## CSS Grid vs Flexbox
Grid Layout uses CSS Grid which is ideal for:
- **Two-dimensional layouts** (rows AND columns)
- **Equal-width items** regardless of content
- **Gap-based spacing** for consistent gutters
- **Responsive column counts** via repeat() and auto-fit

## MUI Components Used
- \`Box\` with \`display: 'grid'\` for the main container
- \`Card\`, \`CardMedia\`, \`CardContent\`, \`CardActions\` for product cards
- \`Chip\`, \`Rating\`, \`Button\` for interactive elements
- \`Pagination\` for page navigation
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Number of columns in the grid layout.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '3' },
      },
    },
    gap: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Gap size between grid items.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'medium' },
      },
    },
    itemCount: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Number of items to display in the grid.',
      table: {
        category: 'Content',
        defaultValue: { summary: '6' },
      },
    },
    showFilters: {
      control: 'boolean',
      description: 'Whether to show the filter panel.',
      table: {
        category: 'Features',
        defaultValue: { summary: 'true' },
      },
    },
    showPagination: {
      control: 'boolean',
      description: 'Whether to show pagination controls.',
      table: {
        category: 'Features',
        defaultValue: { summary: 'true' },
      },
    },
    onItemClick: {
      action: 'itemClicked',
      description: 'Callback when an item is clicked.',
      table: {
        category: 'Events',
      },
    },
    onAddToCart: {
      action: 'addedToCart',
      description: 'Callback when add to cart is clicked.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    columns: 3,
    gap: 'medium',
    itemCount: 6,
    showFilters: true,
    showPagination: true,
    onItemClick: fn(),
    onAddToCart: fn(),
  },
} satisfies Meta<typeof GridLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the GridLayout component.
 * Use the Controls panel to experiment with:
 * - Column count (1-6)
 * - Gap sizes (none, small, medium, large)
 * - Number of items displayed
 * - Filter and pagination visibility
 */
export const Playground: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    itemCount: 6,
    showFilters: true,
    showPagination: true,
  },
}

/**
 * Basic grid layout with default settings.
 * Shows 6 products in a 3-column grid with medium spacing.
 */
export const Basic: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    itemCount: 6,
    showFilters: false,
    showPagination: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A minimal grid layout without filters or pagination, ideal for simple product displays.',
      },
    },
  },
}

/**
 * Full e-commerce product grid with all features enabled.
 * Demonstrates a production-ready layout with:
 * - 4-column responsive grid
 * - Filter panel with category and sort options
 * - Pagination for multi-page navigation
 * - Product cards with ratings, prices, and add-to-cart
 */
export const RealWorld: Story = {
  args: {
    columns: 4,
    gap: 'medium',
    itemCount: 12,
    showFilters: true,
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-ready e-commerce product grid featuring:
- **Filter Panel**: Category selection and sorting options
- **Product Cards**: Image, title, rating, price, and add-to-cart button
- **Pagination**: Full navigation with first/last page buttons
- **Accessibility**: ARIA labels, keyboard navigation, proper contrast

This pattern is commonly used in:
- Amazon, eBay, Etsy product listings
- Shopify and WooCommerce stores
- Marketplace applications
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies grid items can be clicked and callbacks fire.
 */
export const InteractionTest: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    itemCount: 6,
    showFilters: false,
    showPagination: false,
    onItemClick: fn(),
    onAddToCart: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the first product card by its role
    const productCards = await canvas.findAllByRole('article')
    await expect(productCards.length).toBeGreaterThan(0)

    // Click on the first product card
    await userEvent.click(productCards[0])
    await expect(args.onItemClick).toHaveBeenCalledWith(1)

    // Find and click the add to cart button on the first in-stock product
    const addToCartButtons = await canvas.findAllByRole('button', {
      name: /add .* to cart/i,
    })
    const enabledButton = addToCartButtons.find(
      (btn) => !btn.hasAttribute('disabled'),
    )
    if (enabledButton) {
      await userEvent.click(enabledButton)
      await expect(args.onAddToCart).toHaveBeenCalled()
    }
  },
}

/**
 * Two-column layout suitable for smaller screens or sidebar contexts.
 */
export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 'medium',
    itemCount: 4,
    showFilters: false,
    showPagination: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A 2-column grid layout suitable for tablet views or sidebar product lists.',
      },
    },
  },
}

/**
 * Dense grid with small gaps for compact displays.
 */
export const CompactGrid: Story = {
  args: {
    columns: 4,
    gap: 'small',
    itemCount: 8,
    showFilters: false,
    showPagination: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A compact 4-column grid with small gaps, maximizing content density.',
      },
    },
  },
}

/**
 * Spacious grid with large gaps for premium feel.
 */
export const SpaciousGrid: Story = {
  args: {
    columns: 3,
    gap: 'large',
    itemCount: 6,
    showFilters: false,
    showPagination: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A spacious 3-column grid with large gaps, ideal for luxury or minimal designs.',
      },
    },
  },
}

/**
 * Single column layout for mobile or list views.
 */
export const SingleColumn: Story = {
  args: {
    columns: 1,
    gap: 'medium',
    itemCount: 4,
    showFilters: true,
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A single-column layout mimicking mobile view or list-style product display.',
      },
    },
  },
}

/**
 * Full-width 6-column grid for large displays.
 */
export const SixColumns: Story = {
  args: {
    columns: 6,
    gap: 'small',
    itemCount: 12,
    showFilters: true,
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A 6-column grid for large desktop displays or dashboard overview screens.',
      },
    },
  },
}

/**
 * Interaction test: Verifies filter controls work correctly.
 */
export const FilterInteractionTest: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    itemCount: 6,
    showFilters: true,
    showPagination: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the category select
    const categorySelect = await canvas.findByLabelText(/category/i)
    await expect(categorySelect).toBeInTheDocument()

    // Find the sort select
    const sortSelect = await canvas.findByLabelText(/sort by/i)
    await expect(sortSelect).toBeInTheDocument()

    // Verify filter panel is visible
    const filtersText = await canvas.findByText(/filters/i)
    await expect(filtersText).toBeVisible()
  },
}

/**
 * Interaction test: Verifies pagination works correctly.
 */
export const PaginationInteractionTest: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    itemCount: 6,
    showFilters: false,
    showPagination: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find pagination buttons (may be multiple)
    const nextPageButtons = await canvas.findAllByRole('button', {
      name: /next page/i,
    })
    await expect(nextPageButtons.length).toBeGreaterThan(0)
    const nextPageButton = nextPageButtons[0]

    const prevPageButtons = await canvas.findAllByRole('button', {
      name: /previous page/i,
    })
    await expect(prevPageButtons.length).toBeGreaterThan(0)
    const prevPageButton = prevPageButtons[0]
    await expect(prevPageButton).toBeDisabled() // First page, so prev is disabled

    // Click next page
    await userEvent.click(nextPageButton)

    // After clicking, previous should be enabled
    await expect(prevPageButton).not.toBeDisabled()
  },
}
