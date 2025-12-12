import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { expect, userEvent, within } from 'storybook/test'

import TwoColumnLayout, { DocumentationPage } from './TwoColumnLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * TwoColumnLayout provides equal-width columns for balanced content presentation.
 *
 * ## Use Cases
 * - **Documentation sites**: TOC sidebar with content area
 * - **Comparison pages**: Side-by-side product or feature comparison
 * - **About sections**: Image alongside descriptive text
 * - **Feature lists**: Icons or images with descriptions
 * - **Product pages**: Details with specifications
 *
 * ## Key Features
 * - Three column ratio options (equal, left-heavy, right-heavy)
 * - Configurable gap spacing
 * - Responsive stacking behavior
 * - Customizable stack breakpoint
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Maintains reading order when stacked
 * - Supports screen reader navigation
 * - WCAG AA compliant
 *
 * ## Usage
 * ```tsx
 * import { TwoColumnLayout } from './TwoColumnLayout'
 *
 * <TwoColumnLayout
 *   leftColumn={<Sidebar />}
 *   rightColumn={<Content />}
 *   ratio="right-heavy"
 * />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/TwoColumn',
  component: TwoColumnLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
TwoColumnLayout creates a balanced two-column structure for side-by-side content presentation.

## When to Use
- Documentation with sidebar navigation
- Comparison and feature pages
- About sections with image and text
- Settings pages with categories and options
- Any content benefiting from parallel presentation

## Design Considerations
- **Column Ratios**: Choose equal (50/50), left-heavy (60/40), or right-heavy (40/60)
- **Responsive Behavior**: Columns automatically stack on mobile by default
- **Gap Control**: Adjust spacing between columns for visual breathing room
        `,
      },
    },
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['equal', 'left-heavy', 'right-heavy'],
      description: 'Ratio between the two columns',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'equal' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Gap between columns (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '4' },
      },
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the container',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'lg' },
      },
    },
    padding: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Padding around the container (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '3' },
      },
    },
    responsive: {
      control: 'boolean',
      description: 'Whether columns stack on mobile',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'true' },
      },
    },
    stackAt: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Breakpoint at which columns stack',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    ratio: 'equal',
    gap: 4,
    maxWidth: 'lg',
    padding: 3,
    responsive: true,
    stackAt: 'md',
  },
} satisfies Meta<typeof TwoColumnLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample content for left column in examples.
 */
const LeftContent = () => (
  <Paper
    sx={{
      p: 3,
      height: '100%',
      minHeight: 200,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
    }}
  >
    <Typography variant="h5" gutterBottom>
      Left Column
    </Typography>
    <Typography>
      This is the left column content. It can contain navigation, sidebars,
      images, or any other content you need.
    </Typography>
  </Paper>
)

/**
 * Sample content for right column in examples.
 */
const RightContent = () => (
  <Paper
    sx={{
      p: 3,
      height: '100%',
      minHeight: 200,
      bgcolor: 'secondary.main',
      color: 'secondary.contrastText',
    }}
  >
    <Typography variant="h5" gutterBottom>
      Right Column
    </Typography>
    <Typography>
      This is the right column content. It typically contains the main content
      area, articles, or detailed information.
    </Typography>
  </Paper>
)

/**
 * Interactive playground for TwoColumnLayout.
 * Use the Controls panel to experiment with different configurations.
 */
export const Playground: Story = {
  args: {
    leftColumn: <LeftContent />,
    rightColumn: <RightContent />,
    ratio: 'equal',
    gap: 4,
    maxWidth: 'lg',
    padding: 3,
    responsive: true,
    stackAt: 'md',
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
 * Basic usage with equal-width columns and default settings.
 */
export const Basic: Story = {
  args: {
    leftColumn: (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Feature One
        </Typography>
        <Typography color="text.secondary">
          Description of the first feature with all its benefits and use cases.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Feature Two
        </Typography>
        <Typography color="text.secondary">
          Description of the second feature with all its benefits and use cases.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage with equal-width columns for balanced content presentation.',
      },
    },
  },
}

/**
 * Real-world documentation page with sidebar navigation and content area.
 */
export const RealWorld: Story = {
  args: {
    leftColumn: null,
    rightColumn: null,
  },
  render: () => <DocumentationPage />,
  parameters: {
    docs: {
      description: {
        story: `
A production-ready documentation page demonstrating:
- Sticky sidebar with expandable navigation
- Main content area with sections
- Right-heavy ratio for content emphasis
- Proper heading hierarchy
- Code example block
        `,
      },
    },
  },
}

/**
 * Left-heavy ratio (60/40) for emphasizing sidebar content.
 */
export const LeftHeavyRatio: Story = {
  args: {
    ratio: 'left-heavy',
    leftColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 300,
          bgcolor: 'info.main',
          color: 'info.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Primary Content (60%)
        </Typography>
        <Typography>
          The left-heavy ratio gives 60% width to the left column. Use this when
          the left side contains your primary content.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          minHeight: 300,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Secondary Content (40%)
        </Typography>
        <Typography color="text.secondary">
          The right column receives 40% width for supplementary content.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Left-heavy ratio (60/40) emphasizes the left column content.',
      },
    },
  },
}

/**
 * Right-heavy ratio (40/60) for sidebar with main content.
 */
export const RightHeavyRatio: Story = {
  args: {
    ratio: 'right-heavy',
    leftColumn: (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          minHeight: 300,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sidebar (40%)
        </Typography>
        <Typography color="text.secondary">
          Navigation or filters in the narrower left column.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 300,
          bgcolor: 'success.main',
          color: 'success.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Main Content (60%)
        </Typography>
        <Typography>
          The right-heavy ratio gives 60% width to the right column. This is
          ideal for documentation or content-focused layouts.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Right-heavy ratio (40/60) is ideal for sidebar navigation with main content.',
      },
    },
  },
}

/**
 * Comparison page layout showing side-by-side content.
 */
export const ComparisonLayout: Story = {
  args: {
    ratio: 'equal',
    gap: 3,
    leftColumn: (
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Basic Plan
        </Typography>
        <Typography variant="h3" gutterBottom>
          $9/mo
        </Typography>
        <Box component="ul" sx={{ textAlign: 'left', pl: 2 }}>
          <li>5 Projects</li>
          <li>10GB Storage</li>
          <li>Email Support</li>
          <li>Basic Analytics</li>
        </Box>
        <Paper
          sx={{
            mt: 2,
            py: 1.5,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            cursor: 'pointer',
          }}
        >
          Choose Basic
        </Paper>
      </Paper>
    ),
    rightColumn: (
      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
          height: '100%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Pro Plan
        </Typography>
        <Typography variant="h3" gutterBottom>
          $29/mo
        </Typography>
        <Box component="ul" sx={{ textAlign: 'left', pl: 2 }}>
          <li>Unlimited Projects</li>
          <li>100GB Storage</li>
          <li>Priority Support</li>
          <li>Advanced Analytics</li>
        </Box>
        <Paper
          sx={{
            mt: 2,
            py: 1.5,
            bgcolor: 'background.paper',
            color: 'text.primary',
            cursor: 'pointer',
          }}
        >
          Choose Pro
        </Paper>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Equal columns for pricing comparison or feature comparison pages.',
      },
    },
  },
}

/**
 * Non-responsive layout that maintains columns on all screen sizes.
 */
export const NonResponsive: Story = {
  args: {
    responsive: false,
    gap: 2,
    leftColumn: (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2">
          This column stays side-by-side even on mobile devices.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2">
          Use non-responsive mode when columns must remain horizontal.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Non-responsive layout maintains columns on all screen sizes.',
      },
    },
  },
}

/**
 * Interaction test verifying layout structure and column rendering.
 */
export const InteractionTest: Story = {
  args: {
    leftColumn: (
      <Box data-testid="left-column">
        <Typography data-testid="left-title">Left Column Title</Typography>
        <button type="button" data-testid="left-button">
          Left Action
        </button>
      </Box>
    ),
    rightColumn: (
      <Box data-testid="right-column">
        <Typography data-testid="right-title">Right Column Title</Typography>
        <button type="button" data-testid="right-button">
          Right Action
        </button>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify both columns are rendered
    const leftColumn = await canvas.findByTestId('left-column')
    const rightColumn = await canvas.findByTestId('right-column')
    await expect(leftColumn).toBeVisible()
    await expect(rightColumn).toBeVisible()

    // Verify column titles
    const leftTitle = await canvas.findByTestId('left-title')
    const rightTitle = await canvas.findByTestId('right-title')
    await expect(leftTitle).toHaveTextContent('Left Column Title')
    await expect(rightTitle).toHaveTextContent('Right Column Title')

    // Verify buttons are interactive
    const leftButton = await canvas.findByTestId('left-button')
    const rightButton = await canvas.findByTestId('right-button')
    await userEvent.click(leftButton)
    await userEvent.click(rightButton)

    // Verify container structure
    const container = canvasElement.querySelector('.MuiContainer-root')
    await expect(container).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test verifying layout structure and column accessibility.',
      },
    },
  },
}

/**
 * Large gap spacing for visual emphasis.
 */
export const LargeGap: Story = {
  args: {
    gap: 8,
    leftColumn: (
      <Paper variant="outlined" sx={{ p: 4, height: 250 }}>
        <Typography variant="h5" gutterBottom>
          Spaced Out
        </Typography>
        <Typography color="text.secondary">
          A larger gap creates more visual separation between columns.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper variant="outlined" sx={{ p: 4, height: 250 }}>
        <Typography variant="h5" gutterBottom>
          Breathing Room
        </Typography>
        <Typography color="text.secondary">
          Use larger gaps when content needs extra visual breathing room.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large gap (64px) provides maximum visual separation between columns.',
      },
    },
  },
}

/**
 * Full width layout without container constraints.
 */
export const FullWidth: Story = {
  args: {
    maxWidth: false,
    padding: 4,
    leftColumn: (
      <Paper
        sx={{
          p: 4,
          minHeight: 200,
          bgcolor: 'warning.main',
          color: 'warning.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Full Width Left
        </Typography>
        <Typography>
          This layout spans the full viewport width without container
          constraints.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper
        sx={{
          p: 4,
          minHeight: 200,
          bgcolor: 'error.main',
          color: 'error.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Full Width Right
        </Typography>
        <Typography>
          Use maxWidth={'{false}'} for edge-to-edge layouts.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Full width layout without container max-width constraints.',
      },
    },
  },
}
