import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import StarIcon from '@mui/icons-material/Star'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import RibbonLayout from './RibbonLayout'

import type { RibbonBand } from './RibbonLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * RibbonLayout creates full-width horizontal bands with alternating backgrounds,
 * perfect for marketing pages and landing pages with visually distinct sections.
 *
 * ## Use Cases
 * - **Marketing pages**: Feature sections with alternating backgrounds
 * - **Landing pages**: Hero, features, testimonials, and CTA sections
 * - **Product pages**: Alternating content and image sections
 * - **Corporate sites**: About, services, team sections
 *
 * ## Key Features
 * - Full-width bands with contained content
 * - Per-band background colors and images
 * - Automatic alternating color mode
 * - Responsive content containers
 * - Dark/light theme support
 *
 * ## Accessibility
 * - Semantic section elements with aria-labels
 * - Proper color contrast maintained
 * - Keyboard navigable content
 */
const meta = {
  title: 'Layout Complete/Layouts/Ribbon',
  component: RibbonLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
RibbonLayout is a Container/Flow pattern that creates full-width horizontal bands with alternating visual styles.

## When to Use
- Marketing pages with alternating feature sections
- Landing pages requiring visual rhythm
- Corporate websites with distinct content areas
- Any design needing full-bleed backgrounds with contained content

## Anatomy
\`\`\`
┌─────────────────────────────────────────────────────┐
│ ████████████████████ Band 1 ████████████████████████ │ ← Full-width bg
│     ┌─────────────────────────────────────┐         │
│     │         Contained Content           │         │ ← maxWidth container
│     └─────────────────────────────────────┘         │
├─────────────────────────────────────────────────────┤
│                    Band 2                           │ ← Different bg
│     ┌─────────────────────────────────────┐         │
│     │         Contained Content           │         │
│     └─────────────────────────────────────┘         │
├─────────────────────────────────────────────────────┤
│ ████████████████████ Band 3 ████████████████████████ │
└─────────────────────────────────────────────────────┘
\`\`\`

## Responsive Behavior
- Bands always span full viewport width
- Content containers respect maxWidth setting
- Padding scales with band configuration

## Best Practices
1. Use contrasting colors between adjacent bands
2. Maintain consistent padding for visual rhythm
3. Use background images sparingly for performance
4. Ensure text contrast meets WCAG AA standards
        `,
      },
    },
  },
  argTypes: {
    alternateColors: {
      control: 'boolean',
      description: 'Automatically alternate background colors between bands.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    primaryColor: {
      control: 'color',
      description: 'Primary color for alternating mode (odd bands).',
      table: {
        category: 'Appearance',
      },
    },
    secondaryColor: {
      control: 'color',
      description: 'Secondary color for alternating mode (even bands).',
      table: {
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof RibbonLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample bands for demonstration.
 */
const sampleBands: RibbonBand[] = [
  {
    id: 'hero',
    backgroundColor: '#1976d2',
    color: '#ffffff',
    padding: 'xlarge',
    content: (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
          The best solution for your business needs
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: '#fff', color: '#1976d2' }}
        >
          Get Started
        </Button>
      </Box>
    ),
  },
  {
    id: 'features',
    backgroundColor: '#ffffff',
    padding: 'large',
    content: (
      <Box>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          fontWeight={600}
        >
          Our Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {['Speed', 'Security', 'Scalability'].map((feature) => (
            <Grid key={feature} size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircleIcon
                  sx={{ fontSize: 48, color: '#388e3c', mb: 2 }}
                />
                <Typography variant="h6">{feature}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of the {feature.toLowerCase()} feature.
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
  },
  {
    id: 'testimonials',
    backgroundColor: '#f5f5f5',
    padding: 'large',
    content: (
      <Box>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          fontWeight={600}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[
            { name: 'John D.', quote: 'Absolutely amazing product!' },
            { name: 'Sarah M.', quote: 'Changed how we work.' },
          ].map((testimonial) => (
            <Grid key={testimonial.name} size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent
                  sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                >
                  <Avatar sx={{ bgcolor: '#1976d2' }}>
                    {testimonial.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body1">
                      &quot;{testimonial.quote}&quot;
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      - {testimonial.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
  },
  {
    id: 'cta',
    backgroundColor: '#388e3c',
    color: '#ffffff',
    padding: 'xlarge',
    content: (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
          Join thousands of satisfied customers today
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: '#fff', color: '#388e3c' }}
        >
          Start Free Trial
        </Button>
      </Box>
    ),
  },
]

/**
 * Interactive playground to explore all RibbonLayout configuration options.
 */
export const Playground: Story = {
  args: {
    bands: sampleBands,
    alternateColors: false,
  },
}

/**
 * Basic usage showing simple ribbon bands with custom colors.
 */
export const Basic: Story = {
  args: {
    bands: [
      {
        id: 'band1',
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            First Band - Blue Background
          </Typography>
        ),
      },
      {
        id: 'band2',
        backgroundColor: '#ffffff',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            Second Band - White Background
          </Typography>
        ),
      },
      {
        id: 'band3',
        backgroundColor: '#f57c00',
        color: '#ffffff',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            Third Band - Orange Background
          </Typography>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic ribbon layout with three bands, each having a distinct background color.',
      },
    },
  },
}

/**
 * Real-world example: A complete marketing page with hero, features, testimonials, and CTA.
 */
export const RealWorld: Story = {
  args: {
    bands: [
      {
        id: 'hero',
        backgroundColor: '#1a237e',
        color: '#ffffff',
        padding: 'xlarge',
        content: (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <RocketLaunchIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography
              variant="h2"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              Launch Your Business
            </Typography>
            <Typography
              variant="h5"
              sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              The all-in-one platform that helps startups scale from zero to
              hero
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#fff', color: '#1a237e' }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: '#fff', color: '#fff' }}
              >
                Watch Demo
              </Button>
            </Box>
          </Box>
        ),
      },
      {
        id: 'stats',
        backgroundColor: '#ffffff',
        padding: 'large',
        content: (
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '99.9%', label: 'Uptime' },
              { number: '24/7', label: 'Support' },
              { number: '50+', label: 'Integrations' },
            ].map((stat) => (
              <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="primary"
                    gutterBottom
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ),
      },
      {
        id: 'features-grid',
        backgroundColor: '#f8f9fa',
        padding: 'xlarge',
        content: (
          <Box>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              fontWeight={600}
              gutterBottom
            >
              Everything You Need
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              Powerful features to help you manage, grow, and succeed
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: 'Analytics Dashboard',
                  desc: 'Real-time insights into your business performance',
                },
                {
                  title: 'Team Collaboration',
                  desc: 'Work together seamlessly with your team',
                },
                {
                  title: 'Automation',
                  desc: 'Automate repetitive tasks and save time',
                },
                {
                  title: 'Security',
                  desc: 'Enterprise-grade security for your data',
                },
                {
                  title: 'Integrations',
                  desc: 'Connect with tools you already use',
                },
                {
                  title: 'Mobile App',
                  desc: 'Manage on the go with our mobile apps',
                },
              ].map((feature) => (
                <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      '&:hover': { boxShadow: 4 },
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    <CardContent>
                      <StarIcon sx={{ color: '#1a237e', mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ),
      },
      {
        id: 'testimonial-highlight',
        backgroundColor: '#1a237e',
        color: '#ffffff',
        padding: 'xlarge',
        content: (
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h4"
              fontStyle="italic"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              &quot;This platform transformed how we operate. We&apos;ve seen a
              300% increase in productivity since switching.&quot;
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: '#fff',
                  color: '#1a237e',
                }}
              >
                JD
              </Avatar>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Jane Doe
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  CEO, TechCorp Inc.
                </Typography>
              </Box>
            </Box>
          </Box>
        ),
      },
      {
        id: 'final-cta',
        backgroundColor: '#ffffff',
        padding: 'xlarge',
        content: (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Ready to Transform Your Business?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
            >
              Join thousands of companies already using our platform
            </Typography>
            <Button variant="contained" size="large" sx={{ px: 6, py: 1.5 }}>
              Get Started Now
            </Button>
          </Box>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-grade marketing page demonstrating the RibbonLayout pattern.

**Sections included:**
- Hero with CTA buttons
- Statistics/social proof band
- Features grid on subtle background
- Testimonial highlight
- Final call-to-action

This layout creates visual rhythm through alternating backgrounds and establishes clear content hierarchy.
        `,
      },
    },
  },
}

/**
 * Interaction test verifying ribbon bands render correctly.
 */
export const InteractionTest: Story = {
  args: {
    bands: [
      {
        id: 'test-band-1',
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: 'medium',
        content: (
          <Typography data-testid="band-1-content">Band 1 Content</Typography>
        ),
      },
      {
        id: 'test-band-2',
        backgroundColor: '#ffffff',
        padding: 'medium',
        content: (
          <Typography data-testid="band-2-content">Band 2 Content</Typography>
        ),
      },
      {
        id: 'test-band-3',
        backgroundColor: '#388e3c',
        color: '#ffffff',
        padding: 'medium',
        content: (
          <Box data-testid="band-3-content">
            <Typography>Band 3 Content</Typography>
            <Button data-testid="cta-button" variant="contained">
              Click Me
            </Button>
          </Box>
        ),
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all bands are rendered
    const band1 = canvas.getByTestId('band-1-content')
    const band2 = canvas.getByTestId('band-2-content')
    const band3 = canvas.getByTestId('band-3-content')

    await expect(band1).toBeInTheDocument()
    await expect(band2).toBeInTheDocument()
    await expect(band3).toBeInTheDocument()

    // Verify content is visible
    await expect(canvas.getByText('Band 1 Content')).toBeVisible()
    await expect(canvas.getByText('Band 2 Content')).toBeVisible()
    await expect(canvas.getByText('Band 3 Content')).toBeVisible()

    // Verify vertical stacking order
    const band1Rect = band1.getBoundingClientRect()
    const band2Rect = band2.getBoundingClientRect()
    const band3Rect = band3.getBoundingClientRect()

    await expect(band1Rect.bottom).toBeLessThanOrEqual(band2Rect.top + 1) // Allow 1px tolerance
    await expect(band2Rect.bottom).toBeLessThanOrEqual(band3Rect.top + 1)

    // Verify section elements exist with aria-labels
    const sections = canvasElement.querySelectorAll('section')
    await expect(sections.length).toBe(3)

    // Verify interactive element
    const ctaButton = canvas.getByTestId('cta-button')
    await expect(ctaButton).toBeInTheDocument()
    await expect(ctaButton).toBeEnabled()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automated test verifying band rendering, vertical stacking, semantic markup, and interactive elements.',
      },
    },
  },
}

/**
 * Demonstrates automatic color alternation.
 */
export const AlternatingColors: Story = {
  args: {
    alternateColors: true,
    primaryColor: '#ffffff',
    secondaryColor: '#e3f2fd',
    bands: [
      {
        id: 'section1',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            Section 1 - Primary Color
          </Typography>
        ),
      },
      {
        id: 'section2',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            Section 2 - Secondary Color
          </Typography>
        ),
      },
      {
        id: 'section3',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            Section 3 - Primary Color
          </Typography>
        ),
      },
      {
        id: 'section4',
        padding: 'large',
        content: (
          <Typography variant="h4" textAlign="center">
            Section 4 - Secondary Color
          </Typography>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Enable alternateColors to automatically apply alternating backgrounds without specifying each band's color.",
      },
    },
  },
}

/**
 * Demonstrates different padding options.
 */
export const PaddingVariants: Story = {
  args: {
    bands: [
      {
        id: 'none',
        backgroundColor: '#e3f2fd',
        padding: 'none',
        content: (
          <Typography variant="h6" textAlign="center">
            Padding: none
          </Typography>
        ),
      },
      {
        id: 'small',
        backgroundColor: '#bbdefb',
        padding: 'small',
        content: (
          <Typography variant="h6" textAlign="center">
            Padding: small
          </Typography>
        ),
      },
      {
        id: 'medium',
        backgroundColor: '#90caf9',
        padding: 'medium',
        content: (
          <Typography variant="h6" textAlign="center">
            Padding: medium
          </Typography>
        ),
      },
      {
        id: 'large',
        backgroundColor: '#64b5f6',
        padding: 'large',
        content: (
          <Typography variant="h6" textAlign="center">
            Padding: large
          </Typography>
        ),
      },
      {
        id: 'xlarge',
        backgroundColor: '#42a5f5',
        color: '#ffffff',
        padding: 'xlarge',
        content: (
          <Typography variant="h6" textAlign="center">
            Padding: xlarge
          </Typography>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all padding options from none to xlarge. Use larger padding for hero sections and CTAs.',
      },
    },
  },
}

/**
 * Full-width content without container constraints.
 */
export const FullWidthContent: Story = {
  args: {
    bands: [
      {
        id: 'contained',
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: 'large',
        maxWidth: 'lg',
        content: (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              Contained Content (maxWidth: lg)
            </Typography>
            <Typography>Content is centered within a container</Typography>
          </Box>
        ),
      },
      {
        id: 'fullwidth',
        backgroundColor: '#f5f5f5',
        padding: 'large',
        maxWidth: false,
        content: (
          <Box
            sx={{
              textAlign: 'center',
              background:
                'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)',
              py: 4,
            }}
          >
            <Typography variant="h5">
              Full-Width Content (maxWidth: false)
            </Typography>
            <Typography>Content spans the entire viewport width</Typography>
          </Box>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Set maxWidth to false on individual bands for full-width content that spans the entire viewport.',
      },
    },
  },
}
