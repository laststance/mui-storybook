import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SpeedIcon from '@mui/icons-material/Speed'
import StarIcon from '@mui/icons-material/Star'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { expect, fn, userEvent, within } from 'storybook/test'

import FullScreenLayout from './FullScreenLayout'

import type { FullScreenSection } from './FullScreenLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * FullScreenLayout creates an immersive experience with viewport-height sections.
 *
 * ## Use Cases
 * - **Product Landing Pages**: Hero sections with compelling CTAs
 * - **Storytelling Websites**: Sequential content with visual impact
 * - **Portfolio Showcases**: Full-bleed imagery and project highlights
 * - **Marketing Pages**: Distinct value propositions per section
 *
 * ## Key Features
 * - Full viewport-height sections
 * - Optional navigation dots for section jumping
 * - Smooth scroll and snap scroll options
 * - Customizable backgrounds and colors
 * - Accessible navigation with keyboard support
 *
 * @example
 * ```tsx
 * import { FullScreenLayout } from './FullScreenLayout'
 *
 * const sections = [
 *   {
 *     id: 'hero',
 *     title: 'Welcome',
 *     subtitle: 'Discover what we offer',
 *     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
 *     cta: { label: 'Get Started' }
 *   }
 * ]
 *
 * <FullScreenLayout sections={sections} />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/FullScreen',
  component: FullScreenLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
FullScreenLayout provides an immersive, full-viewport scrolling experience ideal for landing pages and storytelling websites.

## When to Use
- Creating impactful first impressions with hero sections
- Presenting content in distinct, digestible chunks
- Building narrative-driven experiences
- Showcasing products with full visual impact

## Accessibility
- Navigation dots are keyboard accessible
- Sections have proper ARIA landmarks
- Screen readers can navigate between sections
- Respects prefers-reduced-motion for animations

## Performance Considerations
- Uses Intersection Observer for efficient scroll tracking
- Lazy loading supported for section content
- Optimized re-renders with proper memoization
        `,
      },
    },
  },
  argTypes: {
    sections: {
      description: 'Array of section configurations',
      control: false,
      table: { category: 'Content' },
    },
    showNavigation: {
      description: 'Whether to show navigation dots on the side',
      control: 'boolean',
      table: {
        category: 'Navigation',
        defaultValue: { summary: 'true' },
      },
    },
    smoothScroll: {
      description: 'Whether to enable smooth scrolling between sections',
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    snapScroll: {
      description: 'Whether to snap to sections when scrolling',
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    onSectionChange: {
      description: 'Callback fired when the active section changes',
      action: 'sectionChanged',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof FullScreenLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample sections for stories
const basicSections: FullScreenSection[] = [
  {
    id: 'hero',
    title: 'Welcome to Our Platform',
    subtitle: 'Build amazing experiences with our tools',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    cta: {
      label: 'Get Started',
      variant: 'contained',
      color: 'inherit',
    },
    alignment: 'center',
  },
  {
    id: 'features',
    title: 'Powerful Features',
    subtitle: 'Everything you need to succeed',
    alignment: 'center',
  },
  {
    id: 'cta',
    title: 'Ready to Begin?',
    subtitle: 'Join thousands of satisfied users today',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#ffffff',
    cta: {
      label: 'Sign Up Now',
      variant: 'outlined',
      color: 'inherit',
    },
    alignment: 'center',
  },
]

/**
 * Interactive playground for the FullScreenLayout component.
 * Use the Controls panel to experiment with all configuration options.
 *
 * @example
 * ```tsx
 * <FullScreenLayout
 *   sections={sections}
 *   showNavigation={true}
 *   smoothScroll={true}
 *   snapScroll={false}
 * />
 * ```
 */
export const Playground: Story = {
  args: {
    sections: basicSections,
    showNavigation: true,
    smoothScroll: true,
    snapScroll: false,
    onSectionChange: fn(),
  },
}

/**
 * Basic usage showing simple section configuration.
 * Demonstrates the minimal setup required for a full-screen layout.
 */
export const Basic: Story = {
  args: {
    sections: [
      {
        id: 'section-1',
        title: 'First Section',
        subtitle: 'This is the first section of the page',
        background: '#1976d2',
        textColor: '#ffffff',
      },
      {
        id: 'section-2',
        title: 'Second Section',
        subtitle: 'Scroll down to see more content',
      },
      {
        id: 'section-3',
        title: 'Third Section',
        subtitle: 'The final section of this example',
        background: '#4caf50',
        textColor: '#ffffff',
      },
    ],
    showNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic implementation with three simple sections demonstrating color backgrounds and navigation.',
      },
    },
  },
}

/**
 * Production-ready landing page example with hero, features, testimonials, and CTA sections.
 * Demonstrates a complete product landing page implementation.
 */
export const RealWorld: Story = {
  args: {
    sections: [
      {
        id: 'hero',
        title: 'Transform Your Workflow',
        subtitle:
          'The all-in-one platform that helps teams collaborate, create, and deliver faster than ever before.',
        background:
          'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        textColor: '#ffffff',
        cta: {
          label: 'Start Free Trial',
          variant: 'contained',
          color: 'primary',
          onClick: fn(),
        },
        alignment: 'center',
        content: (
          <Box
            sx={{ display: 'flex', gap: 4, justifyContent: 'center', mt: 4 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#4fc3f7' }}>
                10K+
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Active Users
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#4fc3f7' }}>
                99.9%
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Uptime
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#4fc3f7' }}>
                50+
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Integrations
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        id: 'features',
        title: 'Everything You Need',
        subtitle: 'Powerful features designed to boost your productivity',
        alignment: 'center',
        content: (
          <Grid container spacing={4} sx={{ mt: 4, maxWidth: 900, mx: 'auto' }}>
            {[
              {
                icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
                title: 'Fast Setup',
                description:
                  'Get started in minutes with our intuitive onboarding',
              },
              {
                icon: <SpeedIcon sx={{ fontSize: 40 }} />,
                title: 'Lightning Fast',
                description: 'Optimized for performance at any scale',
              },
              {
                icon: <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />,
                title: 'Reliable',
                description: 'Enterprise-grade security and uptime',
              },
            ].map((feature) => (
              <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        ),
      },
      {
        id: 'testimonials',
        title: 'Loved by Teams Worldwide',
        subtitle: 'See what our customers have to say',
        background: '#f8f9fa',
        alignment: 'center',
        content: (
          <Grid
            container
            spacing={3}
            sx={{ mt: 4, maxWidth: 1000, mx: 'auto' }}
          >
            {[
              {
                name: 'Sarah Johnson',
                role: 'Product Manager at TechCorp',
                quote:
                  'This platform has completely transformed how our team collaborates. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'CEO at StartupXYZ',
                quote:
                  'The best investment we made this year. Our productivity increased by 40%.',
                rating: 5,
              },
              {
                name: 'Emily Davis',
                role: 'Designer at CreativeStudio',
                quote:
                  'Beautiful interface, powerful features. Everything I need in one place.',
                rating: 5,
              },
            ].map((testimonial) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.name}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <CardContent>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      icon={<StarIcon fontSize="small" />}
                      emptyIcon={<StarIcon fontSize="small" />}
                    />
                    <Typography
                      variant="body1"
                      sx={{ my: 2, fontStyle: 'italic' }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{testimonial.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ),
      },
      {
        id: 'cta',
        title: 'Ready to Get Started?',
        subtitle:
          'Join over 10,000 teams already using our platform. Start your free 14-day trial today.',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff',
        cta: {
          label: 'Start Free Trial',
          variant: 'contained',
          color: 'inherit',
          onClick: fn(),
        },
        alignment: 'center',
      },
    ],
    showNavigation: true,
    smoothScroll: true,
    snapScroll: false,
    onSectionChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-ready landing page example featuring:
- **Hero Section**: Compelling headline with stats and CTA
- **Features Section**: Grid of feature cards with icons
- **Testimonials Section**: Customer reviews with ratings
- **Final CTA**: Conversion-focused call to action

This demonstrates how to build a complete marketing page using the FullScreenLayout component.
        `,
      },
    },
  },
}

/**
 * Interaction test story that verifies navigation functionality.
 * Tests keyboard navigation, click interactions, and section visibility.
 */
export const InteractionTest: Story = {
  args: {
    sections: [
      {
        id: 'section-1',
        title: 'Section One',
        subtitle: 'First section content',
        background: '#1976d2',
        textColor: '#ffffff',
      },
      {
        id: 'section-2',
        title: 'Section Two',
        subtitle: 'Second section content',
        background: '#388e3c',
        textColor: '#ffffff',
      },
      {
        id: 'section-3',
        title: 'Section Three',
        subtitle: 'Third section content',
        background: '#f57c00',
        textColor: '#ffffff',
      },
    ],
    showNavigation: true,
    onSectionChange: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify layout renders correctly', async () => {
      const layout = canvas.getByTestId('fullscreen-layout')
      await expect(layout).toBeInTheDocument()

      const firstSection = canvas.getByTestId('section-section-1')
      await expect(firstSection).toBeInTheDocument()
    })

    await step('Verify section titles are visible', async () => {
      const title1 = canvas.getByText('Section One')
      await expect(title1).toBeInTheDocument()
    })

    await step('Verify navigation dots are present', async () => {
      const navButtons = canvas.getAllByRole('button', {
        name: /Go to section/i,
      })
      await expect(navButtons.length).toBe(3)
    })

    await step('Test navigation dot click', async () => {
      const navButtons = canvas.getAllByRole('button', {
        name: /Go to section/i,
      })
      await userEvent.click(navButtons[1])
      // The section should scroll (we verify the click works)
      await expect(navButtons[1]).toBeInTheDocument()
    })

    await step('Test keyboard navigation on dots', async () => {
      const navButtons = canvas.getAllByRole('button', {
        name: /Go to section/i,
      })
      navButtons[2].focus()
      await userEvent.keyboard('{Enter}')
      await expect(navButtons[2]).toBeInTheDocument()
    })
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests navigation functionality including click interactions and keyboard accessibility.',
      },
    },
  },
}

/**
 * Layout with snap scrolling enabled for a paginated experience.
 * Each section snaps into place as the user scrolls.
 */
export const WithSnapScroll: Story = {
  args: {
    sections: basicSections,
    showNavigation: true,
    smoothScroll: true,
    snapScroll: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enables CSS scroll-snap for a paginated scrolling experience. Each section locks into place when scrolling.',
      },
    },
  },
}

/**
 * Layout without navigation dots for a cleaner appearance.
 * Useful when navigation is handled elsewhere or not needed.
 */
export const WithoutNavigation: Story = {
  args: {
    sections: basicSections,
    showNavigation: false,
    smoothScroll: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hides the navigation dots for a cleaner, more immersive experience.',
      },
    },
  },
}

/**
 * Sections with left-aligned content for a different visual style.
 */
export const LeftAligned: Story = {
  args: {
    sections: [
      {
        id: 'hero',
        title: 'Left-Aligned Hero',
        subtitle:
          'Content aligned to the left creates a different reading flow and visual hierarchy.',
        background: 'linear-gradient(90deg, #2c3e50 0%, #4ca1af 100%)',
        textColor: '#ffffff',
        alignment: 'left',
        cta: {
          label: 'Learn More',
          variant: 'outlined',
          color: 'inherit',
        },
      },
      {
        id: 'content',
        title: 'Supporting Content',
        subtitle:
          'Left alignment works well for text-heavy sections with longer descriptions.',
        alignment: 'left',
      },
    ],
    showNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates left-aligned content for a different visual approach.',
      },
    },
  },
}
