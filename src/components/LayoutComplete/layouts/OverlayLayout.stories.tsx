import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'

import OverlayLayout from './OverlayLayout'

import type { GalleryImage } from './OverlayLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * OverlayLayout demonstrates the modal/popup overlay layout pattern.
 *
 * ## Overview
 * The overlay layout pattern displays content in a layer above the main view,
 * creating focus on specific content while dimming the background. This is
 * commonly used for image lightboxes, dialogs, and modal content.
 *
 * ## Use Cases
 * - **Image galleries**: Lightbox with zoom and navigation
 * - **Media viewers**: Video players, PDF viewers
 * - **Confirmation dialogs**: Alert and confirmation modals
 * - **Detail views**: Product quick view, profile cards
 * - **Content previews**: Email previews, document viewers
 *
 * ## Accessibility
 * - Focus trap within modal
 * - Keyboard navigation (arrows, Escape, +/-)
 * - Screen reader announcements
 * - Backdrop click to close
 *
 * ## Best Practices
 * - Always provide a clear close mechanism
 * - Support keyboard navigation
 * - Maintain focus within the modal
 * - Dim but don't completely hide background
 */
const meta = {
  title: 'Layout Complete/Layouts/Overlay',
  component: OverlayLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
OverlayLayout demonstrates the modal/popup overlay pattern commonly used for image lightboxes and gallery navigation.

## Key Features
- **Image gallery grid**: Responsive grid with hover effects
- **Lightbox modal**: Full-screen image viewer with smooth transitions
- **Gallery navigation**: Arrow keys and button navigation
- **Zoom controls**: Zoom in/out with +/- keys or buttons
- **Keyboard support**: Full keyboard accessibility

## Real-World Examples
- Instagram image viewer
- Unsplash photo gallery
- E-commerce product image zoom
- Portfolio websites

## Keyboard Shortcuts
- **Arrow Left/Right**: Navigate between images
- **+/-**: Zoom in/out
- **Escape**: Close lightbox
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Number of columns in the gallery grid.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '3' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 32, step: 4 },
      description: 'Gap between gallery items in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '8' },
      },
    },
    rowHeight: {
      control: { type: 'range', min: 100, max: 400, step: 20 },
      description: 'Height of gallery row in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '200' },
      },
    },
    showTitle: {
      control: 'boolean',
      description: 'Whether to show image title in lightbox.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    showNavigation: {
      control: 'boolean',
      description: 'Whether to show navigation arrows.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    showZoomControls: {
      control: 'boolean',
      description: 'Whether to show zoom controls.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    initialZoom: {
      control: { type: 'range', min: 0.5, max: 2, step: 0.1 },
      description: 'Initial zoom level (1 = 100%).',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '1' },
      },
    },
    maxZoom: {
      control: { type: 'range', min: 1, max: 5, step: 0.5 },
      description: 'Maximum zoom level.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '3' },
      },
    },
    backdropOpacity: {
      control: { type: 'range', min: 0.5, max: 1, step: 0.1 },
      description: 'Backdrop opacity when lightbox is open.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '0.9' },
      },
    },
    onImageOpen: { action: 'image opened' },
    onClose: { action: 'closed' },
    onNavigate: { action: 'navigated' },
    images: { control: false },
  },
  args: {
    columns: 3,
    gap: 8,
    rowHeight: 200,
    showTitle: true,
    showNavigation: true,
    showZoomControls: true,
    initialZoom: 1,
    maxZoom: 3,
    backdropOpacity: 0.9,
  },
} satisfies Meta<typeof OverlayLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the OverlayLayout component.
 * Use the Controls panel to experiment with all configuration options.
 */
export const Playground: Story = {
  args: {
    columns: 3,
    gap: 8,
    rowHeight: 200,
    showTitle: true,
    showNavigation: true,
    showZoomControls: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground with all controls. Click any image to open the lightbox.',
      },
    },
  },
}

/**
 * Basic image gallery with default lightbox settings.
 */
export const Basic: Story = {
  args: {
    columns: 3,
    rowHeight: 200,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic gallery with 3 columns and standard lightbox. Click any image to view in the overlay.',
      },
    },
  },
}

/**
 * Real-world example: Photography portfolio with full-featured lightbox.
 */
export const RealWorld: Story = {
  args: {
    columns: 4,
    gap: 4,
    rowHeight: 180,
    showTitle: true,
    showNavigation: true,
    showZoomControls: true,
    backdropOpacity: 0.95,
  },
  render: (args) => {
    const portfolioImages: GalleryImage[] = [
      {
        id: 'nature-1',
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
        alt: 'Foggy mountain landscape',
        title: 'Mountain Mist',
        description: 'Fog rolling through the mountain valleys at dawn',
      },
      {
        id: 'nature-2',
        src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop',
        alt: 'Forest path',
        title: 'Forest Path',
        description: 'Sunlight filtering through ancient forest trees',
      },
      {
        id: 'nature-3',
        src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop',
        alt: 'Waterfall in nature',
        title: 'Hidden Falls',
        description: 'A secluded waterfall in the heart of the wilderness',
      },
      {
        id: 'nature-4',
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
        alt: 'Mountain sunrise',
        title: 'Golden Hour',
        description: 'First light of day illuminating the peaks',
      },
      {
        id: 'urban-1',
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        alt: 'City skyline',
        title: 'Urban Jungle',
        description: 'The city skyline at twilight',
      },
      {
        id: 'urban-2',
        src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop',
        alt: 'Night cityscape',
        title: 'Night Lights',
        description: 'City lights reflecting on the water',
      },
      {
        id: 'urban-3',
        src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
        alt: 'Street photography',
        title: 'Street Life',
        description: 'Capturing the rhythm of urban life',
      },
      {
        id: 'urban-4',
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
        alt: 'Architecture detail',
        title: 'Modern Architecture',
        description: 'Clean lines and geometric patterns',
      },
    ]

    return <OverlayLayout {...args} images={portfolioImages} />
  },
  parameters: {
    docs: {
      description: {
        story: `
A real-world photography portfolio with:
- **4-column masonry grid**: Professional gallery layout
- **High-contrast backdrop**: Focus on image content
- **Full navigation**: Arrows, keyboard, and zoom controls
- **Image metadata**: Title and description for each photo

This pattern is commonly seen in portfolio sites like Behance, 500px, and professional photographer websites.
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies lightbox open/close functionality.
 */
export const InteractionTest: Story = {
  args: {
    columns: 3,
    onImageOpen: fn(),
    onClose: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify gallery is rendered
    const gallery = canvas.getByTestId('image-gallery')
    await expect(gallery).toBeInTheDocument()

    // Find and click the first image
    const firstImage = canvas.getByTestId('gallery-image-1')
    await expect(firstImage).toBeInTheDocument()

    await userEvent.click(firstImage)

    // Verify lightbox is open using screen (portal) with waitFor for animation
    const lightboxImage = await screen.findByTestId('lightbox-image')
    await waitFor(
      () => {
        expect(lightboxImage).toBeVisible()
      },
      { timeout: 1000 },
    )

    // Find and click close button
    const closeButton = await screen.findByTestId('lightbox-close')
    await userEvent.click(closeButton)

    // Verify lightbox is closed (image should not be in document)
    await expect(screen.queryByTestId('lightbox-image')).not.toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies lightbox open/close functionality.',
      },
    },
  },
}

/**
 * Navigation interaction test.
 */
export const NavigationInteractionTest: Story = {
  args: {
    columns: 3,
    onNavigate: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open the first image
    const firstImage = canvas.getByTestId('gallery-image-1')
    await userEvent.click(firstImage)

    // Wait for lightbox to open with waitFor for animation
    const lightboxImage = await screen.findByTestId('lightbox-image')
    await waitFor(
      () => {
        expect(lightboxImage).toBeVisible()
      },
      { timeout: 1000 },
    )

    // Click next button
    const nextButton = await screen.findByTestId('nav-next')
    await userEvent.click(nextButton)

    // Verify we're still in the lightbox
    await expect(screen.getByTestId('lightbox-image')).toBeVisible()

    // Click previous button
    const prevButton = await screen.findByTestId('nav-previous')
    await userEvent.click(prevButton)

    // Verify lightbox info is visible
    const lightboxInfo = await screen.findByTestId('lightbox-info')
    await expect(lightboxInfo).toBeVisible()

    // Close the lightbox
    const closeButton = await screen.findByTestId('lightbox-close')
    await userEvent.click(closeButton)
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies navigation between images in the lightbox.',
      },
    },
  },
}

/**
 * Two-column gallery layout.
 */
export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 16,
    rowHeight: 250,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gallery with 2 columns and larger row height. Suitable for featured images.',
      },
    },
  },
}

/**
 * Four-column compact gallery.
 */
export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 4,
    rowHeight: 150,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact 4-column layout with smaller images. Ideal for browsing many images quickly.',
      },
    },
  },
}

/**
 * Gallery without zoom controls.
 */
export const NoZoomControls: Story = {
  args: {
    showZoomControls: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lightbox without zoom controls. Simpler interface for fixed-size content.',
      },
    },
  },
}

/**
 * Gallery without navigation arrows.
 */
export const NoNavigation: Story = {
  args: {
    showNavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-image lightbox without navigation. Use for single featured images.',
      },
    },
  },
}

/**
 * Gallery without title display.
 */
export const NoTitle: Story = {
  args: {
    showTitle: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Clean lightbox without title overlay. Focus entirely on the image.',
      },
    },
  },
}

/**
 * Gallery with minimal UI.
 */
export const MinimalUI: Story = {
  args: {
    showTitle: false,
    showNavigation: false,
    showZoomControls: false,
    backdropOpacity: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal lightbox with just the image and close button. Maximum focus on content.',
      },
    },
  },
}

/**
 * E-commerce product gallery example.
 */
export const ProductGallery: Story = {
  args: {
    columns: 4,
    gap: 8,
    rowHeight: 160,
    showTitle: true,
    maxZoom: 4,
  },
  render: (args) => {
    const productImages: GalleryImage[] = [
      {
        id: 'product-1',
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        alt: 'Premium watch',
        title: 'Premium Watch',
        description: 'Stainless steel case with leather strap',
      },
      {
        id: 'product-2',
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        alt: 'Wireless headphones',
        title: 'Wireless Headphones',
        description: 'Active noise cancellation, 30-hour battery',
      },
      {
        id: 'product-3',
        src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
        alt: 'Polaroid camera',
        title: 'Instant Camera',
        description: 'Vintage-style instant photography',
      },
      {
        id: 'product-4',
        src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
        alt: 'Sunglasses',
        title: 'Designer Sunglasses',
        description: 'UV protection with polarized lenses',
      },
    ]

    return <OverlayLayout {...args} images={productImages} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'E-commerce product gallery with zoom capability for product inspection.',
      },
    },
  },
}

/**
 * Single image focus mode.
 */
export const SingleImage: Story = {
  args: {
    columns: 1,
    showNavigation: false,
    rowHeight: 400,
  },
  render: (args) => {
    const singleImage: GalleryImage[] = [
      {
        id: 'hero',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Mountain landscape',
        title: 'Featured Image',
        description: 'Click to view full size with zoom capability',
      },
    ]

    return <OverlayLayout {...args} images={singleImage} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single featured image with lightbox zoom. No navigation arrows needed.',
      },
    },
  },
}

/**
 * High zoom capability for detailed inspection.
 */
export const HighZoom: Story = {
  args: {
    maxZoom: 5,
    initialZoom: 1,
    showZoomControls: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gallery with high zoom capability (up to 5x). Useful for detailed product inspection.',
      },
    },
  },
}
