import CelebrationIcon from '@mui/icons-material/Celebration'
import DiamondIcon from '@mui/icons-material/Diamond'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import StarIcon from '@mui/icons-material/Star'
import { expect, fn, userEvent, within } from 'storybook/test'

import ScatteredLayout from './ScatteredLayout'

import type { FloatingElement } from './ScatteredLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * ScatteredLayout demonstrates the freeform scattered elements pattern.
 *
 * ## Overview
 * The scattered layout pattern places elements in seemingly random positions,
 * creating a dynamic and creative visual effect. This pattern is excellent
 * for capturing attention and conveying energy or excitement.
 *
 * ## Use Cases
 * - **Event promotions**: Concert, festival, conference pages
 * - **Product launches**: New product announcement pages
 * - **Creative portfolios**: Art, design showcase sites
 * - **Sale promotions**: E-commerce sale banners
 * - **Gaming interfaces**: Leaderboards, achievements
 *
 * ## Accessibility
 * - Essential content is centered and clearly readable
 * - Animations respect prefers-reduced-motion
 * - Interactive elements have proper focus states
 * - Decorative elements are marked appropriately
 *
 * ## Best Practices
 * - Keep main content centrally positioned
 * - Use animations sparingly to avoid distraction
 * - Ensure sufficient contrast for text elements
 * - Balance visual weight across the layout
 */
const meta = {
  title: 'Layout Complete/Layouts/Scattered',
  component: ScatteredLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ScatteredLayout demonstrates an event promotion page with floating decorative elements.

## Key Features
- **Floating elements**: Randomly positioned decorative items
- **CSS animations**: Float, pulse, and rotate effects
- **Gradient backgrounds**: Modern gradient color schemes
- **Event card**: Centered promotional content
- **CTA button**: Call-to-action with hover effects

## Real-World Examples
- Concert and festival websites
- Product launch pages
- Game promotional materials
- E-commerce sale banners

## Animation Types
- **Float**: Gentle up-down movement
- **Pulse**: Scale and opacity changes
- **Rotate**: Continuous rotation
        `,
      },
    },
  },
  argTypes: {
    showEventContent: {
      control: 'boolean',
      description: 'Whether to show the default event content.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'true' },
      },
    },
    eventTitle: {
      control: 'text',
      description: 'Event title.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Summer Music Festival 2025' },
      },
    },
    eventSubtitle: {
      control: 'text',
      description: 'Event subtitle/tagline.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'The Ultimate Musical Experience' },
      },
    },
    eventDate: {
      control: 'text',
      description: 'Event date string.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'July 15-17, 2025' },
      },
    },
    eventLocation: {
      control: 'text',
      description: 'Event location.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Central Park, New York' },
      },
    },
    ctaText: {
      control: 'text',
      description: 'CTA button text.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Get Tickets' },
      },
    },
    height: {
      control: { type: 'range', min: 400, max: 800, step: 50 },
      description: 'Height of the layout in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '600' },
      },
    },
    background: {
      control: 'text',
      description: 'Background color or gradient.',
      table: {
        category: 'Appearance',
        defaultValue: {
          summary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Whether to enable animations.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    onCtaClick: { action: 'CTA clicked' },
    onElementClick: { action: 'element clicked' },
    elements: { control: false },
    width: { control: false },
  },
  args: {
    showEventContent: true,
    eventTitle: 'Summer Music Festival 2025',
    eventSubtitle: 'The Ultimate Musical Experience',
    eventDate: 'July 15-17, 2025',
    eventLocation: 'Central Park, New York',
    ctaText: 'Get Tickets',
    height: 600,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    animated: true,
  },
} satisfies Meta<typeof ScatteredLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the ScatteredLayout component.
 * Use the Controls panel to experiment with all configuration options.
 */
export const Playground: Story = {
  args: {
    showEventContent: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground. Customize event details and appearance using the Controls panel.',
      },
    },
  },
}

/**
 * Basic event promotion with default settings.
 */
export const Basic: Story = {
  args: {
    showEventContent: true,
    animated: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic event promotion page with default floating elements and animations.',
      },
    },
  },
}

/**
 * Real-world example: Gaming tournament promotion.
 */
export const RealWorld: Story = {
  args: {
    eventTitle: 'Esports Championship 2025',
    eventSubtitle: 'Battle for Glory',
    eventDate: 'March 20-22, 2025',
    eventLocation: 'Tokyo Dome, Japan',
    ctaText: 'Register Now',
    background:
      'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    height: 650,
    animated: true,
  },
  render: (args) => {
    const gamingElements: FloatingElement[] = [
      {
        id: 'game-1',
        content: <SportsEsportsIcon sx={{ fontSize: 36 }} />,
        x: 8,
        y: 20,
        size: 'medium',
        background: 'rgba(0, 255, 136, 0.2)',
        color: '#00ff88',
        rotation: 10,
        animation: 'float',
        animationDuration: 3.5,
        zIndex: 2,
        borderRadius: 50,
      },
      {
        id: 'fire-1',
        content: <LocalFireDepartmentIcon sx={{ fontSize: 28 }} />,
        x: 88,
        y: 15,
        size: 'small',
        background: 'rgba(255, 99, 71, 0.2)',
        color: '#ff6347',
        rotation: -15,
        animation: 'pulse',
        animationDuration: 2,
        zIndex: 2,
        borderRadius: 50,
      },
      {
        id: 'tag-live',
        content: 'LIVE',
        x: 85,
        y: 75,
        size: 'small',
        background: '#ff0000',
        color: '#ffffff',
        rotation: 0,
        animation: 'pulse',
        animationDuration: 1,
        zIndex: 3,
        borderRadius: 4,
      },
      {
        id: 'prize',
        content: '$1M',
        x: 12,
        y: 80,
        size: 'medium',
        background: 'linear-gradient(45deg, #ffd700 0%, #ff8c00 100%)',
        color: '#1a1a2e',
        rotation: -5,
        animation: 'float',
        animationDuration: 4,
        zIndex: 3,
        borderRadius: 10,
      },
      {
        id: 'flash-1',
        content: <FlashOnIcon sx={{ fontSize: 24 }} />,
        x: 5,
        y: 50,
        size: 'small',
        background: 'rgba(255, 215, 0, 0.15)',
        color: '#ffd700',
        animation: 'pulse',
        animationDuration: 1.5,
        zIndex: 1,
        borderRadius: 50,
      },
      {
        id: 'circle-glow',
        content: '',
        x: 90,
        y: 45,
        size: 'large',
        background:
          'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
        animation: 'pulse',
        animationDuration: 3,
        zIndex: 0,
        borderRadius: 50,
        opacity: 0.7,
      },
    ]

    return <ScatteredLayout {...args} elements={gamingElements} />
  },
  parameters: {
    docs: {
      description: {
        story: `
A real-world gaming tournament promotion featuring:
- **Dark theme**: Professional esports aesthetic
- **Gaming icons**: Controller, fire, flash effects
- **Prize display**: Prominent prize pool highlight
- **Live indicator**: Pulsing "LIVE" badge
- **Glowing effects**: Neon-style decorative elements

This pattern is commonly seen in esports tournament sites and gaming event promotions.
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies CTA button functionality.
 */
export const InteractionTest: Story = {
  args: {
    onCtaClick: fn(),
    onElementClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify scattered canvas is rendered
    const scatteredCanvas = canvas.getByTestId('scattered-canvas')
    await expect(scatteredCanvas).toBeInTheDocument()

    // Verify event card is present
    const eventCard = canvas.getByTestId('event-card')
    await expect(eventCard).toBeInTheDocument()

    // Find and click the CTA button
    const ctaButton = canvas.getByTestId('cta-button')
    await expect(ctaButton).toBeInTheDocument()

    await userEvent.click(ctaButton)
    await expect(args.onCtaClick).toHaveBeenCalled()

    // Find and click a floating element
    const floatingElement = canvas.getByTestId('floating-element-star-1')
    await userEvent.click(floatingElement)
    await expect(args.onElementClick).toHaveBeenCalledWith('star-1')
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies CTA button and element click functionality.',
      },
    },
  },
}

/**
 * Without animations (static layout).
 */
export const StaticLayout: Story = {
  args: {
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Static version without animations. Respects prefers-reduced-motion.',
      },
    },
  },
}

/**
 * Without event content (elements only).
 */
export const ElementsOnly: Story = {
  args: {
    showEventContent: false,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout with only floating elements, no central content. Useful as background.',
      },
    },
  },
}

/**
 * Sale promotion example.
 */
export const SalePromotion: Story = {
  args: {
    eventTitle: 'Black Friday Sale',
    eventSubtitle: 'Up to 70% Off Everything',
    eventDate: 'November 24-27, 2025',
    eventLocation: 'Online & In-Store',
    ctaText: 'Shop Now',
    background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  },
  render: (args) => {
    const saleElements: FloatingElement[] = [
      {
        id: 'tag-50',
        content: '50%',
        x: 10,
        y: 25,
        size: 'large',
        background: '#ff4757',
        color: '#ffffff',
        rotation: -10,
        animation: 'float',
        animationDuration: 3,
        zIndex: 2,
        borderRadius: 10,
      },
      {
        id: 'tag-70',
        content: '70%',
        x: 85,
        y: 20,
        size: 'medium',
        background: '#ffd700',
        color: '#232526',
        rotation: 15,
        animation: 'pulse',
        animationDuration: 2.5,
        zIndex: 2,
        borderRadius: 10,
      },
      {
        id: 'bag-1',
        content: <ShoppingBagIcon sx={{ fontSize: 32 }} />,
        x: 5,
        y: 70,
        size: 'medium',
        background: 'rgba(255, 215, 0, 0.2)',
        color: '#ffd700',
        rotation: 5,
        animation: 'float',
        animationDuration: 4,
        zIndex: 1,
        borderRadius: 50,
      },
      {
        id: 'star-sale',
        content: <StarIcon sx={{ fontSize: 24 }} />,
        x: 90,
        y: 75,
        size: 'small',
        background: 'rgba(255, 71, 87, 0.2)',
        color: '#ff4757',
        animation: 'pulse',
        animationDuration: 1.5,
        zIndex: 1,
        borderRadius: 50,
      },
      {
        id: 'off',
        content: 'OFF',
        x: 78,
        y: 85,
        size: 'small',
        background: 'transparent',
        color: 'rgba(255, 255, 255, 0.5)',
        rotation: 0,
        animation: 'none',
        zIndex: 1,
        borderRadius: 4,
      },
    ]

    return <ScatteredLayout {...args} elements={saleElements} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'E-commerce sale promotion with discount percentages and shopping elements.',
      },
    },
  },
}

/**
 * Product launch example.
 */
export const ProductLaunch: Story = {
  args: {
    eventTitle: 'Introducing Nova Pro',
    eventSubtitle: 'The Future of Technology',
    eventDate: 'Available Now',
    eventLocation: 'Worldwide Shipping',
    ctaText: 'Pre-order Now',
    background:
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    height: 650,
  },
  render: (args) => {
    const launchElements: FloatingElement[] = [
      {
        id: 'rocket',
        content: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
        x: 10,
        y: 20,
        size: 'large',
        background: 'rgba(99, 102, 241, 0.2)',
        color: '#818cf8',
        rotation: 30,
        animation: 'float',
        animationDuration: 3,
        zIndex: 2,
        borderRadius: 50,
      },
      {
        id: 'new',
        content: 'NEW',
        x: 85,
        y: 15,
        size: 'small',
        background: 'linear-gradient(45deg, #6366f1 0%, #a855f7 100%)',
        color: '#ffffff',
        rotation: -5,
        animation: 'pulse',
        animationDuration: 2,
        zIndex: 3,
        borderRadius: 4,
      },
      {
        id: 'diamond',
        content: <DiamondIcon sx={{ fontSize: 28 }} />,
        x: 5,
        y: 75,
        size: 'medium',
        background: 'rgba(168, 85, 247, 0.2)',
        color: '#a855f7',
        rotation: 15,
        animation: 'rotate',
        animationDuration: 8,
        zIndex: 2,
        borderRadius: 50,
      },
      {
        id: 'glow-1',
        content: '',
        x: 90,
        y: 60,
        size: 'large',
        background:
          'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
        animation: 'pulse',
        animationDuration: 4,
        zIndex: 0,
        borderRadius: 50,
        opacity: 0.5,
      },
      {
        id: 'star-premium',
        content: <StarIcon sx={{ fontSize: 20 }} />,
        x: 15,
        y: 50,
        size: 'small',
        background: 'rgba(255, 215, 0, 0.15)',
        color: '#ffd700',
        animation: 'float',
        animationDuration: 5,
        zIndex: 1,
        borderRadius: 50,
      },
    ]

    return <ScatteredLayout {...args} elements={launchElements} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Technology product launch page with futuristic floating elements.',
      },
    },
  },
}

/**
 * Party/celebration theme.
 */
export const CelebrationTheme: Story = {
  args: {
    eventTitle: 'New Year Celebration',
    eventSubtitle: 'Ring in 2025 with Style',
    eventDate: 'December 31, 2024',
    eventLocation: 'Times Square, NYC',
    ctaText: 'RSVP Now',
    background: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
  },
  render: (args) => {
    const partyElements: FloatingElement[] = [
      {
        id: 'celebrate',
        content: <CelebrationIcon sx={{ fontSize: 36 }} />,
        x: 10,
        y: 25,
        size: 'medium',
        background: 'rgba(255, 215, 0, 0.3)',
        color: '#ffd700',
        rotation: 15,
        animation: 'float',
        animationDuration: 3,
        zIndex: 2,
        borderRadius: 50,
      },
      {
        id: 'heart',
        content: <FavoriteIcon sx={{ fontSize: 28 }} />,
        x: 88,
        y: 18,
        size: 'small',
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        animation: 'pulse',
        animationDuration: 1.5,
        zIndex: 2,
        borderRadius: 50,
      },
      {
        id: 'year',
        content: '2025',
        x: 80,
        y: 75,
        size: 'large',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#ff0844',
        rotation: -10,
        animation: 'float',
        animationDuration: 4,
        zIndex: 3,
        borderRadius: 10,
      },
      {
        id: 'star-party',
        content: <StarIcon sx={{ fontSize: 20 }} />,
        x: 5,
        y: 70,
        size: 'small',
        background: 'rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        animation: 'rotate',
        animationDuration: 6,
        zIndex: 1,
        borderRadius: 50,
      },
      {
        id: 'confetti',
        content: '',
        x: 15,
        y: 85,
        size: 'small',
        background: '#ffd700',
        rotation: 45,
        animation: 'float',
        animationDuration: 2.5,
        zIndex: 1,
        borderRadius: 20,
        opacity: 0.8,
      },
    ]

    return <ScatteredLayout {...args} elements={partyElements} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Party and celebration event promotion with festive floating elements.',
      },
    },
  },
}

/**
 * Custom gradient background.
 */
export const CustomBackground: Story = {
  args: {
    background: 'linear-gradient(45deg, #00c6ff 0%, #0072ff 100%)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom blue gradient background. Adjust via Controls.',
      },
    },
  },
}

/**
 * Tall layout for more content.
 */
export const TallLayout: Story = {
  args: {
    height: 750,
  },
  parameters: {
    docs: {
      description: {
        story: 'Taller layout providing more space for floating elements.',
      },
    },
  },
}

/**
 * Compact layout.
 */
export const CompactLayout: Story = {
  args: {
    height: 450,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout for smaller screen sections or banners.',
      },
    },
  },
}

/**
 * Minimal elements.
 */
export const MinimalElements: Story = {
  args: {
    animated: true,
  },
  render: (args) => {
    const minimalElements: FloatingElement[] = [
      {
        id: 'circle-1',
        content: '',
        x: 10,
        y: 20,
        size: 'large',
        background: 'rgba(255, 255, 255, 0.1)',
        animation: 'float',
        animationDuration: 5,
        zIndex: 0,
        borderRadius: 50,
      },
      {
        id: 'circle-2',
        content: '',
        x: 85,
        y: 70,
        size: 'medium',
        background: 'rgba(255, 255, 255, 0.08)',
        animation: 'float',
        animationDuration: 6,
        zIndex: 0,
        borderRadius: 50,
      },
    ]

    return <ScatteredLayout {...args} elements={minimalElements} />
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal floating elements for a cleaner, more focused design.',
      },
    },
  },
}
