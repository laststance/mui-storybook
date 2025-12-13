import { expect, fn, userEvent, waitFor, within, screen } from 'storybook/test'

import MasonryLayout from './MasonryLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * MasonryLayout demonstrates a Pinterest-style variable height grid layout,
 * commonly used in photo galleries, social feeds, and portfolio displays.
 *
 * ## Use Cases
 * - **Photo galleries**: Pinterest, Unsplash, Instagram-style layouts
 * - **Social media feeds**: Visual content with varied aspect ratios
 * - **Portfolio displays**: Showcase creative work with visual impact
 * - **Image-heavy blogs**: Magazine-style visual storytelling
 *
 * ## CSS Masonry Implementation
 * - Uses CSS `column-count` for native browser performance
 * - `break-inside: avoid` prevents items from breaking across columns
 * - Column-based layout automatically fills vertical space efficiently
 *
 * ## Accessibility
 * - Images have proper alt text with photographer attribution
 * - Interactive elements are keyboard accessible
 * - Like/download actions have ARIA labels
 * - Color contrast meets WCAG AA standards
 */
const meta = {
  title: 'Layout Complete/Layouts/Masonry',
  component: MasonryLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
MasonryLayout demonstrates Pinterest-style variable height items for dynamic visual layouts.

## When to Use Masonry Layout
- When you have items with varying heights (photos, cards with different content)
- For visual-first content where uniform heights would require cropping
- When you want to maximize vertical space efficiency
- For creative/artistic presentations

## CSS Columns vs CSS Grid Masonry
This implementation uses **CSS Columns** which:
- Has broad browser support (works today)
- Orders items top-to-bottom, then left-to-right
- Is simpler to implement

CSS Grid Masonry (emerging standard):
- Orders items left-to-right, then top-to-bottom
- Currently requires browser flags
- Will be the future standard

## MUI Components Used
- \`Box\` with \`columnCount\` for masonry container
- \`Paper\` for image cards with elevation
- \`Avatar\`, \`Chip\`, \`IconButton\` for metadata and actions
- \`Dialog\` for image zoom modal
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of columns in the masonry layout.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '3' },
      },
    },
    gap: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Gap size between masonry items.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'medium' },
      },
    },
    imageCount: {
      control: { type: 'range', min: 3, max: 15, step: 1 },
      description: 'Number of images to display.',
      table: {
        category: 'Content',
        defaultValue: { summary: '12' },
      },
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show image metadata (photographer, tags).',
      table: {
        category: 'Features',
        defaultValue: { summary: 'true' },
      },
    },
    enableZoom: {
      control: 'boolean',
      description: 'Whether to enable image zoom on click.',
      table: {
        category: 'Features',
        defaultValue: { summary: 'true' },
      },
    },
    onLike: {
      action: 'liked',
      description: 'Callback when an image is liked.',
      table: {
        category: 'Events',
      },
    },
    onDownload: {
      action: 'downloaded',
      description: 'Callback when an image is downloaded.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 12,
    showMetadata: true,
    enableZoom: true,
    onLike: fn(),
    onDownload: fn(),
  },
} satisfies Meta<typeof MasonryLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the MasonryLayout component.
 * Use the Controls panel to experiment with:
 * - Column count (2-5)
 * - Gap sizes (none, small, medium, large)
 * - Number of images displayed
 * - Metadata and zoom visibility
 */
export const Playground: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 12,
    showMetadata: true,
    enableZoom: true,
  },
}

/**
 * Basic masonry layout with default settings.
 * Shows 9 images in a 3-column layout with medium spacing.
 */
export const Basic: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 9,
    showMetadata: false,
    enableZoom: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A minimal masonry layout without metadata or zoom, showcasing the core Pinterest-style arrangement.',
      },
    },
  },
}

/**
 * Full photo gallery with all features enabled.
 * Demonstrates a production-ready Pinterest/Unsplash-style layout with:
 * - 4-column masonry grid
 * - Photographer metadata and tags
 * - Like, download, and share actions
 * - Click-to-zoom functionality
 */
export const RealWorld: Story = {
  args: {
    columns: 4,
    gap: 'medium',
    imageCount: 15,
    showMetadata: true,
    enableZoom: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-ready photo gallery featuring:
- **Masonry Layout**: Variable height images fill space efficiently
- **Hover Overlay**: Photographer info, tags, and action buttons
- **Like Counter**: Track and display engagement
- **Zoom Modal**: Full-size image viewing

This pattern is commonly used in:
- Pinterest, Unsplash, Flickr galleries
- Instagram explore pages
- Creative portfolio websites
- Stock photo platforms
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies like functionality works correctly.
 */
export const InteractionTest: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 6,
    showMetadata: true,
    enableZoom: false,
    onLike: fn(),
    onDownload: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the first image card
    const imageCards = await canvas.findAllByRole('img')
    await expect(imageCards.length).toBeGreaterThan(0)

    // Hover over the first card to show overlay (simulate mouse enter)
    await userEvent.hover(imageCards[0].closest('.MuiPaper-root') as Element)

    // Find and click a like button
    const likeButtons = await canvas.findAllByRole('button', {
      name: /like photo/i,
    })
    if (likeButtons.length > 0) {
      await userEvent.click(likeButtons[0])
      await expect(args.onLike).toHaveBeenCalled()
    }

    // Find and click a download button
    const downloadButtons = await canvas.findAllByRole('button', {
      name: /download photo/i,
    })
    if (downloadButtons.length > 0) {
      await userEvent.click(downloadButtons[0])
      await expect(args.onDownload).toHaveBeenCalled()
    }
  },
}

/**
 * Two-column layout for narrower containers.
 */
export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 'medium',
    imageCount: 8,
    showMetadata: true,
    enableZoom: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A 2-column masonry layout suitable for tablet views or sidebar galleries.',
      },
    },
  },
}

/**
 * Dense masonry with small gaps for compact displays.
 */
export const CompactMasonry: Story = {
  args: {
    columns: 4,
    gap: 'small',
    imageCount: 12,
    showMetadata: false,
    enableZoom: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A compact 4-column masonry with small gaps, maximizing content density.',
      },
    },
  },
}

/**
 * Spacious masonry with large gaps for breathing room.
 */
export const SpaciousMasonry: Story = {
  args: {
    columns: 3,
    gap: 'large',
    imageCount: 9,
    showMetadata: true,
    enableZoom: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A spacious 3-column masonry with large gaps, ideal for premium gallery presentations.',
      },
    },
  },
}

/**
 * Five-column layout for wide displays.
 */
export const FiveColumns: Story = {
  args: {
    columns: 5,
    gap: 'small',
    imageCount: 15,
    showMetadata: true,
    enableZoom: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A 5-column masonry for ultra-wide displays or dense photo browsing.',
      },
    },
  },
}

/**
 * Gallery without zoom for simpler interactions.
 */
export const NoZoom: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 9,
    showMetadata: true,
    enableZoom: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Masonry gallery with hover effects but no click-to-zoom, for simpler viewing.',
      },
    },
  },
}

/**
 * Minimal gallery with no metadata overlay.
 */
export const MinimalGallery: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 12,
    showMetadata: false,
    enableZoom: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clean masonry gallery without photographer metadata, focusing purely on images.',
      },
    },
  },
}

/**
 * Interaction test: Verifies zoom modal opens correctly.
 * Note: Uses screen for portal testing.
 */
export const ZoomInteractionTest: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 6,
    showMetadata: true,
    enableZoom: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the first image card
    const imageCards = await canvas.findAllByRole('img')
    await expect(imageCards.length).toBeGreaterThan(0)

    // Click on the first image to open zoom modal
    const firstCard = imageCards[0].closest('.MuiPaper-root') as Element
    await userEvent.click(firstCard)

    // Wait for dialog to appear (portal renders outside canvas)
    // Using screen for portal testing as documented
    const dialog = await screen.findByRole('dialog')
    await waitFor(
      () => {
        expect(dialog).toBeVisible()
      },
      { timeout: 1000 },
    )

    // Close the dialog by clicking backdrop or pressing Escape
    await userEvent.keyboard('{Escape}')
  },
}

/**
 * Interaction test: Verifies gallery filter buttons are present.
 */
export const FilterButtonsTest: Story = {
  args: {
    columns: 3,
    gap: 'medium',
    imageCount: 9,
    showMetadata: true,
    enableZoom: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the gallery header with photo count
    const photoCountChip = await canvas.findByText(/\d+ photos/i)
    await expect(photoCountChip).toBeVisible()

    // Find filter buttons
    const allButton = await canvas.findByRole('button', { name: /all/i })
    await expect(allButton).toBeInTheDocument()

    const natureButton = await canvas.findByRole('button', { name: /nature/i })
    await expect(natureButton).toBeInTheDocument()
  },
}
