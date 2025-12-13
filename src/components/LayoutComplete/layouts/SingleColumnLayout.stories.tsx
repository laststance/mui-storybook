import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import SingleColumnLayout, { BlogArticle } from './SingleColumnLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * SingleColumnLayout provides a centered content column optimized for reading and mobile views.
 *
 * ## Use Cases
 * - **Blog posts and articles**: Optimal reading width for long-form content
 * - **Landing pages**: Focused content presentation
 * - **Mobile-first designs**: Natural single-column flow
 * - **Documentation**: Easy-to-read technical content
 * - **Form pages**: Centered forms and checkout flows
 *
 * ## Key Features
 * - Configurable max-width using MUI breakpoints
 * - Adjustable horizontal and vertical padding
 * - Text alignment options (left, center, right)
 * - Built on MUI Container for responsive behavior
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Proper heading hierarchy support
 * - Responsive text sizing
 * - WCAG AA compliant contrast ratios
 *
 * ## Usage
 * ```tsx
 * import { SingleColumnLayout } from './SingleColumnLayout'
 *
 * <SingleColumnLayout maxWidth="md">
 *   <Typography variant="h1">Article Title</Typography>
 *   <Typography>Your content here...</Typography>
 * </SingleColumnLayout>
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/SingleColumn',
  component: SingleColumnLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
SingleColumnLayout is a centered content column optimized for reading and mobile-first designs.

## When to Use
- Blog posts, articles, and long-form content
- Landing pages with focused messaging
- Mobile-first responsive designs
- Documentation and help pages
- Forms and checkout flows

## Design Considerations
- **Optimal Reading Width**: Default max-width of 'md' (~900px) provides optimal reading width (45-75 characters per line)
- **Responsive Padding**: Padding scales appropriately for different screen sizes
- **Centered Content**: Content is automatically centered within the viewport
        `,
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the content column',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'md' },
      },
    },
    padding: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Horizontal padding (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '3' },
      },
    },
    verticalPadding: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Vertical padding (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '4' },
      },
    },
    textAlign: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Text alignment for content',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'left' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the container horizontally',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    maxWidth: 'md',
    padding: 3,
    verticalPadding: 4,
    textAlign: 'left',
    centered: true,
  },
} satisfies Meta<typeof SingleColumnLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for SingleColumnLayout.
 * Use the Controls panel to experiment with different configurations.
 */
export const Playground: Story = {
  args: {
    maxWidth: 'md',
    padding: 3,
    verticalPadding: 4,
    textAlign: 'left',
    centered: true,
    children: (
      <Box>
        <Typography variant="h3" gutterBottom>
          Article Title
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          A brief description of the article content goes here.
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Experiment with different layout configurations using the Controls panel.',
      },
    },
  },
}

/**
 * Basic usage with simple content and default settings.
 */
export const Basic: Story = {
  args: {
    children: (
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to SingleColumnLayout
        </Typography>
        <Typography paragraph>
          This is a basic example showing how the SingleColumnLayout component
          centers content in a single, readable column. The default max-width of
          'md' provides optimal reading width for most content.
        </Typography>
        <Typography paragraph>
          The layout automatically handles responsive behavior, adjusting
          padding and maintaining proper proportions across all screen sizes.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage with default settings. Content is centered with optimal reading width.',
      },
    },
  },
}

/**
 * Real-world blog article page example with hero image, metadata, and author bio.
 */
export const RealWorld: Story = {
  args: {
    children: <BlogArticle />,
  },
  render: () => <BlogArticle />,
  parameters: {
    docs: {
      description: {
        story: `
A production-ready blog article layout demonstrating:
- Full-width hero image
- Article metadata (tags, date, author)
- Readable content width
- Author bio section with avatar
- Proper typography hierarchy
        `,
      },
    },
  },
}

/**
 * Narrow column for focused reading or mobile simulation.
 */
export const NarrowColumn: Story = {
  args: {
    maxWidth: 'sm',
    padding: 2,
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Mobile-First Content
        </Typography>
        <Typography paragraph>
          This narrower column simulates a mobile-optimized reading experience.
          The smaller max-width ensures content remains readable on smaller
          screens without horizontal scrolling.
        </Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Tip: Use the 'sm' max-width for mobile-first designs or content that
            benefits from shorter line lengths.
          </Typography>
        </Paper>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Narrow column using maxWidth="sm" for mobile-optimized content.',
      },
    },
  },
}

/**
 * Wide column for rich content like images and tables.
 */
export const WideColumn: Story = {
  args: {
    maxWidth: 'lg',
    padding: 4,
    children: (
      <Box>
        <Typography variant="h4" gutterBottom>
          Wide Content Area
        </Typography>
        <Typography paragraph>
          A wider column is useful when content includes images, tables, or code
          blocks that benefit from extra horizontal space.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
            my: 3,
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Paper
              key={item}
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              Card {item}
            </Paper>
          ))}
        </Box>
        <Typography paragraph>
          The layout adapts to contain larger content while maintaining the
          centered, single-column structure.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Wide column using maxWidth="lg" for content with images or tables.',
      },
    },
  },
}

/**
 * Centered text alignment for headings and introductions.
 */
export const CenteredText: Story = {
  args: {
    maxWidth: 'sm',
    textAlign: 'center',
    verticalPadding: 6,
    children: (
      <Box>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          The easiest way to build modern web applications with beautiful,
          accessible components.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Paper
            sx={{
              px: 3,
              py: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              cursor: 'pointer',
            }}
          >
            Get Started
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              px: 3,
              py: 1.5,
              cursor: 'pointer',
            }}
          >
            Learn More
          </Paper>
        </Box>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Centered text alignment for landing page hero sections.',
      },
    },
  },
}

/**
 * Interaction test verifying layout renders correctly and content is accessible.
 */
export const InteractionTest: Story = {
  args: {
    children: (
      <Box>
        <Typography variant="h4" data-testid="layout-title" gutterBottom>
          Test Article Title
        </Typography>
        <Typography data-testid="layout-content" paragraph>
          This content is used for interaction testing to verify the layout
          renders correctly and all elements are accessible.
        </Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2 }}
          data-testid="layout-paper"
          role="region"
          aria-label="Additional information"
        >
          <Typography variant="body2">Additional information panel</Typography>
        </Paper>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify title is rendered
    const title = await canvas.findByTestId('layout-title')
    await expect(title).toBeVisible()
    await expect(title).toHaveTextContent('Test Article Title')

    // Verify content paragraph is rendered
    const content = await canvas.findByTestId('layout-content')
    await expect(content).toBeVisible()

    // Verify Paper component is rendered with proper accessibility
    const paper = await canvas.findByTestId('layout-paper')
    await expect(paper).toBeVisible()
    await expect(paper).toHaveAttribute('role', 'region')
    await expect(paper).toHaveAttribute('aria-label', 'Additional information')

    // Verify the content is contained within a centered layout
    const container = canvasElement.querySelector('.MuiContainer-root')
    await expect(container).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test verifying layout structure and accessibility.',
      },
    },
  },
}

/**
 * Custom styling example using sx prop.
 */
export const CustomStyling: Story = {
  args: {
    maxWidth: 'md',
    sx: {
      bgcolor: 'grey.100',
      minHeight: '100vh',
    },
    children: (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Custom Styled Layout
        </Typography>
        <Typography paragraph>
          The SingleColumnLayout accepts an sx prop for custom styling of the
          outer container. This allows you to add background colors, minimum
          heights, or other custom styles.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          In this example, the outer container has a grey background while the
          content is wrapped in a Paper component with elevation.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom styling using the sx prop for background and layout modifications.',
      },
    },
  },
}
