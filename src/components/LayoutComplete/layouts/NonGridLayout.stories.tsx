import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { expect, fn, userEvent, within } from 'storybook/test'

import NonGridLayout, {
  InteractiveArtGallery,
  type NonGridElement,
} from './NonGridLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout Complete/Layouts/NonGrid',
  component: NonGridLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
NonGridLayout provides a free-form layout where elements can be placed anywhere without following grid constraints.

## Overview

This layout breaks away from traditional grid-based designs, allowing creative freedom in element placement. Elements can be positioned at any coordinate, rotated, scaled, and animated.

## Use Cases

- **Art Galleries**: Museum-style layouts with floating artwork
- **Creative Portfolios**: Showcase work in unconventional arrangements
- **Interactive Experiences**: Gamified or playful interfaces
- **Experimental Designs**: Breaking traditional web conventions
- **Event Promotions**: Eye-catching promotional layouts

## Key Features

- **Free Positioning**: Place elements anywhere using percentage coordinates
- **Transformations**: Rotate and scale individual elements
- **Animations**: Built-in float, pulse, and rotate animations
- **Z-Index Control**: Layer elements for depth effects
- **Interactive Mode**: Click handlers for element interaction
- **Hover Effects**: Optional hover scaling and shadow effects

## Accessibility

- Elements remain keyboard-accessible when interactive
- Reduced motion is respected for animations
- Semantic structure maintained despite visual arrangement

## Best Practices

1. Use sparingly - non-grid layouts can be disorienting
2. Ensure sufficient contrast between overlapping elements
3. Test on various screen sizes for responsive behavior
4. Provide clear visual hierarchy despite free-form placement
        `,
      },
    },
  },
  argTypes: {
    elements: {
      description: 'Array of elements with position and styling information',
      table: {
        category: 'Content',
      },
    },
    background: {
      control: 'text',
      description: 'Background color or gradient for the container',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'transparent' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the layout container',
      table: {
        category: 'Layout',
        defaultValue: { summary: '400' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Enable click interactions and hover effects',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    onElementClick: {
      action: 'elementClicked',
      description: 'Callback when an element is clicked (requires interactive)',
      table: {
        category: 'Events',
      },
    },
  },
} satisfies Meta<typeof NonGridLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample elements for stories
const basicElements: NonGridElement[] = [
  {
    id: 'card1',
    content: (
      <Card sx={{ width: 150, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Card 1</Typography>
          <Typography variant="body2" color="text.secondary">
            Top left area
          </Typography>
        </CardContent>
      </Card>
    ),
    x: 20,
    y: 25,
    rotation: -5,
  },
  {
    id: 'card2',
    content: (
      <Card sx={{ width: 150, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Card 2</Typography>
          <Typography variant="body2" color="text.secondary">
            Center right
          </Typography>
        </CardContent>
      </Card>
    ),
    x: 70,
    y: 40,
    rotation: 8,
  },
  {
    id: 'card3',
    content: (
      <Card sx={{ width: 150, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">Card 3</Typography>
          <Typography variant="body2" color="text.secondary">
            Bottom center
          </Typography>
        </CardContent>
      </Card>
    ),
    x: 45,
    y: 75,
    rotation: -3,
  },
]

/**
 * Interactive playground for the NonGridLayout component.
 * Use the Controls panel to experiment with configuration options.
 */
export const Playground: Story = {
  args: {
    elements: basicElements,
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: 400,
    interactive: true,
  },
}

/**
 * Basic usage showing simple element positioning.
 */
export const Basic: Story = {
  args: {
    elements: basicElements,
    minHeight: 350,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simple non-grid layout with three cards positioned at different angles.',
      },
    },
  },
}

/**
 * Real-world example: Interactive Art Gallery.
 * A museum-style gallery with floating artwork that responds to interaction.
 */
export const RealWorld: Story = {
  args: {
    elements: [], // Overridden by render
  },
  render: () => <InteractiveArtGallery />,
  parameters: {
    docs: {
      description: {
        story: `
Production-grade art gallery implementation featuring:
- Floating artwork with subtle animations
- Click to select artwork for details
- Hover effects with scaling
- Mixed shapes (rectangles and circles)
- Frame-style borders on art pieces
        `,
      },
    },
  },
}

/**
 * Elements with various animations.
 */
export const AnimatedElements: Story = {
  args: {
    elements: [
      {
        id: 'float',
        content: (
          <Card sx={{ width: 120, bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography>Float</Typography>
            </CardContent>
          </Card>
        ),
        x: 20,
        y: 30,
        animation: 'float',
      },
      {
        id: 'pulse',
        content: (
          <Card sx={{ width: 120, bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography>Pulse</Typography>
            </CardContent>
          </Card>
        ),
        x: 50,
        y: 50,
        animation: 'pulse',
      },
      {
        id: 'rotate',
        content: (
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'warning.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="white">Rotate</Typography>
          </Box>
        ),
        x: 80,
        y: 40,
        animation: 'rotate',
      },
    ],
    minHeight: 300,
    background: '#f0f0f0',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the three built-in animations: float, pulse, and rotate.',
      },
    },
  },
}

/**
 * Overlapping elements with z-index control.
 */
export const OverlappingElements: Story = {
  args: {
    elements: [
      {
        id: 'back',
        content: (
          <Box
            sx={{
              width: 200,
              height: 200,
              bgcolor: 'grey.400',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Back (z:1)</Typography>
          </Box>
        ),
        x: 40,
        y: 50,
        zIndex: 1,
      },
      {
        id: 'middle',
        content: (
          <Box
            sx={{
              width: 180,
              height: 180,
              bgcolor: 'info.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="white">Middle (z:2)</Typography>
          </Box>
        ),
        x: 50,
        y: 45,
        zIndex: 2,
      },
      {
        id: 'front',
        content: (
          <Box
            sx={{
              width: 150,
              height: 150,
              bgcolor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="white">Front (z:3)</Typography>
          </Box>
        ),
        x: 60,
        y: 55,
        zIndex: 3,
      },
    ],
    minHeight: 350,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how z-index controls element layering for depth effects.',
      },
    },
  },
}

/**
 * Scaled elements demonstration.
 */
export const ScaledElements: Story = {
  args: {
    elements: [
      {
        id: 'small',
        content: (
          <Card sx={{ width: 100 }}>
            <CardContent>
              <Typography variant="body2">0.8x</Typography>
            </CardContent>
          </Card>
        ),
        x: 20,
        y: 50,
        scale: 0.8,
      },
      {
        id: 'normal',
        content: (
          <Card sx={{ width: 100 }}>
            <CardContent>
              <Typography variant="body2">1.0x</Typography>
            </CardContent>
          </Card>
        ),
        x: 50,
        y: 50,
        scale: 1,
      },
      {
        id: 'large',
        content: (
          <Card sx={{ width: 100 }}>
            <CardContent>
              <Typography variant="body2">1.3x</Typography>
            </CardContent>
          </Card>
        ),
        x: 80,
        y: 50,
        scale: 1.3,
      },
    ],
    minHeight: 250,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Elements can be scaled to create visual hierarchy or perspective.',
      },
    },
  },
}

/**
 * Interaction test: Verifies element click functionality.
 */
export const InteractionTest: Story = {
  args: {
    elements: [
      {
        id: 'clickable',
        content: (
          <Card
            sx={{
              width: 150,
              bgcolor: 'primary.main',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <CardContent>
              <Typography data-testid="clickable-card">Click Me</Typography>
            </CardContent>
          </Card>
        ),
        x: 50,
        y: 50,
      },
    ],
    minHeight: 300,
    interactive: true,
    onElementClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Find the clickable card
    const clickableCard = await canvas.findByTestId('clickable-card')
    await expect(clickableCard).toBeVisible()

    // Verify the card exists and has correct text
    await expect(clickableCard).toHaveTextContent('Click Me')

    // Click the card
    await userEvent.click(clickableCard)

    // Verify onElementClick was called
    if (args.onElementClick) {
      await expect(args.onElementClick).toHaveBeenCalledWith('clickable')
    }
  },
}

/**
 * Mixed shapes and sizes for variety.
 */
export const MixedShapes: Story = {
  args: {
    interactive: false,
    elements: [
      {
        id: 'rectangle',
        content: (
          <Box
            sx={{
              width: 180,
              height: 100,
              bgcolor: 'primary.main',
              borderRadius: 1,
            }}
          />
        ),
        x: 25,
        y: 30,
        rotation: -8,
      },
      {
        id: 'circle',
        content: (
          <Box
            sx={{
              width: 120,
              height: 120,
              bgcolor: 'secondary.main',
              borderRadius: '50%',
            }}
          />
        ),
        x: 65,
        y: 35,
        animation: 'pulse',
      },
      {
        id: 'square',
        content: (
          <Box
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'warning.main',
              borderRadius: 2,
            }}
          />
        ),
        x: 40,
        y: 70,
        rotation: 45,
      },
      {
        id: 'pill',
        content: (
          <Box
            sx={{
              width: 160,
              height: 50,
              bgcolor: 'info.main',
              borderRadius: 25,
            }}
          />
        ),
        x: 75,
        y: 75,
        rotation: 15,
      },
    ],
    background: 'linear-gradient(45deg, #1a1a2e 0%, #16213e 100%)',
    minHeight: 400,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Abstract composition with various shapes, rotations, and colors.',
      },
    },
  },
}
