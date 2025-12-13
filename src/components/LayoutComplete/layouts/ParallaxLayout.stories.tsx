import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { expect, fn, within } from 'storybook/test'

import ParallaxLayout, { ParallaxPresets } from './ParallaxLayout'

import type { ParallaxLayer } from './ParallaxLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * ParallaxLayout creates a multi-layer depth effect with scrolling.
 *
 * ## Use Cases
 * - **Storytelling Pages**: Immersive narrative experiences
 * - **Product Showcases**: Visual depth for product highlights
 * - **Hero Sections**: Dynamic, engaging above-the-fold content
 * - **Portfolio Websites**: Creative visual effects
 *
 * ## Key Features
 * - Multi-layer parallax with configurable speeds
 * - Background images, gradients, and overlays
 * - Respects prefers-reduced-motion accessibility
 * - Performance optimized with requestAnimationFrame
 * - Preset configurations for common patterns
 *
 * @example
 * ```tsx
 * import { ParallaxLayout } from './ParallaxLayout'
 *
 * const layers = [
 *   { id: 'bg', type: 'background', image: '/bg.jpg', speed: 0.3 },
 *   { id: 'content', type: 'content', speed: 0.8, content: <h1>Welcome</h1> }
 * ]
 *
 * <ParallaxLayout layers={layers} height="100vh" />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/Parallax',
  component: ParallaxLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
ParallaxLayout provides a multi-layer scrolling effect that creates visual depth and immersion.

## When to Use
- Creating visually engaging landing pages
- Building storytelling experiences with depth
- Adding polish to hero sections
- Showcasing products with visual impact

## Layer Types
- **background**: Slowest layer, typically full-bleed images
- **midground**: Medium speed, additional visual elements
- **foreground**: Faster layer, closer visual elements
- **content**: Primary content layer with text and UI

## Accessibility
- Respects prefers-reduced-motion media query
- Provides screen reader accessible content
- Can be disabled entirely for accessibility
- Static fallback when motion is reduced

## Performance
- Uses requestAnimationFrame for smooth scrolling
- will-change property for GPU acceleration
- Passive scroll event listeners
- Efficient layer updates with CSS transforms
        `,
      },
    },
  },
  argTypes: {
    layers: {
      description: 'Array of layer configurations',
      control: false,
      table: { category: 'Content' },
    },
    speedMultiplier: {
      description: 'Overall scroll speed multiplier',
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
      table: {
        category: 'Behavior',
        defaultValue: { summary: '1' },
      },
    },
    enabled: {
      description: 'Whether to enable parallax effect',
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    height: {
      description: 'Height of the parallax container',
      control: 'text',
      table: {
        category: 'Layout',
        defaultValue: { summary: '100vh' },
      },
    },
    respectReducedMotion: {
      description: 'Whether to respect reduced motion preferences',
      control: 'boolean',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'true' },
      },
    },
    onScroll: {
      description: 'Callback when scroll position changes',
      action: 'onScroll',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof ParallaxLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample layers for stories
const basicLayers: ParallaxLayer[] = [
  {
    id: 'background',
    type: 'background',
    backgroundColor: 'linear-gradient(180deg, #1a237e 0%, #283593 100%)',
    speed: 0.2,
  },
  {
    id: 'midground',
    type: 'midground',
    backgroundColor: alpha('#ffffff', 0.1),
    speed: 0.4,
  },
  {
    id: 'content',
    type: 'content',
    speed: 0.8,
    content: (
      <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Parallax Effect
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
          Scroll down to see the multi-layer depth effect
        </Typography>
        <ArrowDownwardIcon sx={{ fontSize: 48, opacity: 0.7 }} />
      </Container>
    ),
  },
]

/**
 * Interactive playground for the ParallaxLayout component.
 * Use the Controls panel to experiment with all configuration options.
 *
 * @example
 * ```tsx
 * <ParallaxLayout
 *   layers={layers}
 *   speedMultiplier={1}
 *   enabled={true}
 *   height="100vh"
 * />
 * ```
 */
export const Playground: Story = {
  args: {
    layers: basicLayers,
    speedMultiplier: 1,
    enabled: true,
    height: '100vh',
    respectReducedMotion: true,
    onScroll: fn(),
  },
}

/**
 * Basic parallax with gradient background and content layer.
 */
export const Basic: Story = {
  args: {
    layers: [
      {
        id: 'bg',
        type: 'background',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        speed: 0.2,
      },
      {
        id: 'content',
        type: 'content',
        speed: 0.6,
        content: (
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
            Simple Parallax
          </Typography>
        ),
      },
    ],
    height: '60vh',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic two-layer parallax with a gradient background and content layer.',
      },
    },
  },
}

/**
 * Production-ready storytelling page with multiple parallax sections.
 */
export const RealWorld: Story = {
  args: {
    layers: [],
  },
  render: () => (
    <Box>
      {/* Hero Section */}
      <ParallaxLayout
        layers={[
          {
            id: 'hero-bg',
            type: 'background',
            image:
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
            speed: 0.3,
            overlay: alpha('#000', 0.5),
          },
          {
            id: 'hero-content',
            type: 'content',
            speed: 0.7,
            content: (
              <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    mb: 3,
                  }}
                >
                  Explore the Mountains
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 4,
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  Discover breathtaking landscapes and unforgettable adventures
                  in the world&apos;s most stunning mountain ranges.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
                >
                  Start Your Journey
                </Button>
              </Container>
            ),
          },
        ]}
        height="100vh"
      />

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Experience the difference with our expert guides and curated
            adventures
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Expert Guides',
                description:
                  'Our experienced guides ensure your safety and provide deep local knowledge.',
              },
              {
                title: 'Sustainable Travel',
                description:
                  'We prioritize eco-friendly practices to preserve these natural wonders.',
              },
              {
                title: 'Curated Routes',
                description:
                  'Hand-picked trails that offer the best views and experiences.',
              },
            ].map((feature) => (
              <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
                <Paper sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Second Parallax Section */}
      <ParallaxLayout
        layers={[
          {
            id: 'forest-bg',
            type: 'background',
            image:
              'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
            speed: 0.4,
            overlay: alpha('#1b5e20', 0.3),
          },
          {
            id: 'forest-content',
            type: 'content',
            speed: 0.8,
            content: (
              <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  sx={{ color: 'white', fontWeight: 700, mb: 3 }}
                >
                  Connect with Nature
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}
                >
                  Leave the city behind and immerse yourself in the tranquility
                  of ancient forests
                </Typography>
              </Container>
            ),
          },
        ]}
        height="70vh"
      />

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Begin?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Book your adventure today and create memories that last a lifetime
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: 'white',
              borderColor: 'white',
              px: 6,
              py: 1.5,
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A production-ready storytelling page featuring:
- **Hero Section**: Full-viewport parallax with background image and CTA
- **Features Grid**: Static content section between parallax areas
- **Second Parallax**: Additional visual depth section
- **CTA Section**: Conversion-focused call to action

This demonstrates how to combine multiple ParallaxLayout instances with regular content sections.
        `,
      },
    },
  },
}

/**
 * Interaction test story that verifies parallax rendering and accessibility.
 */
export const InteractionTest: Story = {
  args: {
    layers: basicLayers,
    enabled: true,
    height: '100vh',
    onScroll: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify layout renders correctly', async () => {
      const layout = canvas.getByTestId('parallax-layout')
      await expect(layout).toBeInTheDocument()
    })

    await step('Verify layers are rendered', async () => {
      const bgLayer = canvas.getByTestId('layer-background')
      await expect(bgLayer).toBeInTheDocument()

      const midLayer = canvas.getByTestId('layer-midground')
      await expect(midLayer).toBeInTheDocument()

      const contentLayer = canvas.getByTestId('layer-content')
      await expect(contentLayer).toBeInTheDocument()
    })

    await step('Verify content is visible', async () => {
      const headings = canvas.getAllByText('Parallax Effect')
      await expect(headings.length).toBeGreaterThan(0)
      await expect(headings[0]).toBeInTheDocument()
    })

    await step('Verify accessibility attributes', async () => {
      const layout = canvas.getByTestId('parallax-layout')
      await expect(layout).toHaveAttribute('role', 'region')
      await expect(layout).toHaveAttribute(
        'aria-label',
        'Parallax scrolling content',
      )
    })
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests parallax layer rendering and accessibility attributes.',
      },
    },
  },
}

/**
 * Using the simpleHero preset configuration.
 */
export const SimpleHeroPreset: Story = {
  args: {
    layers: ParallaxPresets.simpleHero(
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ color: 'white', fontWeight: 700, mb: 2 }}
        >
          Simple Hero Preset
        </Typography>
        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Using the built-in simpleHero preset for quick setup
        </Typography>
      </Container>,
    ),
    height: '80vh',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the simpleHero preset for quick two-layer parallax setup.',
      },
    },
  },
}

/**
 * Using the gradientFloat preset configuration.
 */
export const GradientFloatPreset: Story = {
  args: {
    layers: ParallaxPresets.gradientFloat(
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ color: 'white', fontWeight: 700, mb: 2 }}
        >
          Gradient Float Preset
        </Typography>
        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
          Beautiful gradient background with floating content
        </Typography>
        <Button variant="contained" color="inherit" size="large">
          Get Started
        </Button>
      </Container>,
    ),
    height: '80vh',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the gradientFloat preset with gradient background.',
      },
    },
  },
}

/**
 * Multiple overlapping layers creating visual depth.
 */
export const MultiLayerDepth: Story = {
  args: {
    layers: [
      {
        id: 'sky',
        type: 'background',
        backgroundColor:
          'linear-gradient(180deg, #1a237e 0%, #3949ab 50%, #7986cb 100%)',
        speed: 0,
        zIndex: 0,
      },
      {
        id: 'stars',
        type: 'background',
        backgroundColor: `radial-gradient(white 1px, transparent 1px)`,
        speed: 0.1,
        opacity: 0.5,
        zIndex: 1,
      },
      {
        id: 'cloud-far',
        type: 'midground',
        backgroundColor: alpha('#ffffff', 0.1),
        speed: 0.2,
        blur: 2,
        zIndex: 2,
      },
      {
        id: 'cloud-near',
        type: 'midground',
        backgroundColor: alpha('#ffffff', 0.15),
        speed: 0.4,
        blur: 1,
        zIndex: 3,
      },
      {
        id: 'content',
        type: 'content',
        speed: 0.7,
        zIndex: 4,
        content: (
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{ color: 'white', fontWeight: 700, mb: 2 }}
            >
              Multi-Layer Depth
            </Typography>
            <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Multiple layers create a rich sense of depth
            </Typography>
          </Container>
        ),
      },
    ],
    height: '100vh',
    speedMultiplier: 1.5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple overlapping layers with different speeds create rich visual depth.',
      },
    },
  },
}

/**
 * Parallax effect disabled for accessibility demonstration.
 */
export const ReducedMotion: Story = {
  args: {
    layers: basicLayers,
    enabled: false,
    height: '80vh',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Parallax effect disabled, simulating prefers-reduced-motion accessibility mode.',
      },
    },
  },
}
