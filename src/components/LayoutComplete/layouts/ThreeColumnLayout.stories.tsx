import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import ThreeColumnLayout, { NewsPortal } from './ThreeColumnLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * ThreeColumnLayout provides a classic web layout with main content and sidebars.
 *
 * ## Use Cases
 * - **News portals**: Ads, articles, and trending content
 * - **Dashboards**: Navigation, content, and widgets
 * - **E-commerce**: Filters, products, and cart sidebar
 * - **Social media**: Navigation, feed, and suggestions
 * - **Admin panels**: Menu, data table, and quick actions
 *
 * ## Key Features
 * - Four distribution options (equal, center-heavy, left-heavy, right-heavy)
 * - Configurable gap spacing
 * - Responsive stacking behavior
 * - Option to hide sidebars on mobile
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Maintains reading order when stacked
 * - Supports screen reader navigation
 * - WCAG AA compliant
 *
 * ## Usage
 * ```tsx
 * import { ThreeColumnLayout } from './ThreeColumnLayout'
 *
 * <ThreeColumnLayout
 *   leftColumn={<Sidebar />}
 *   centerColumn={<Content />}
 *   rightColumn={<Widgets />}
 *   distribution="center-heavy"
 * />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/ThreeColumn',
  component: ThreeColumnLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
ThreeColumnLayout creates a classic three-column structure with sidebars and main content area.

## When to Use
- News and media websites with ads and trending content
- Dashboards with navigation and widget sidebars
- E-commerce with filters, products, and cart
- Social media feeds with suggestions
- Admin interfaces with menus and quick actions

## Design Considerations
- **Column Distribution**: center-heavy (25/50/25) is most common for content sites
- **Responsive Behavior**: Sidebars can be hidden on mobile for cleaner experience
- **Sticky Sidebars**: Consider making sidebars sticky for long content pages
        `,
      },
    },
  },
  argTypes: {
    distribution: {
      control: 'select',
      options: ['equal', 'center-heavy', 'left-heavy', 'right-heavy'],
      description: 'Distribution of column widths',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'center-heavy' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 8, step: 1 },
      description: 'Gap between columns (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '3' },
      },
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the container',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'xl' },
      },
    },
    padding: {
      control: { type: 'range', min: 0, max: 8, step: 1 },
      description: 'Padding around the container (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '2' },
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
    hideSidebarsOnMobile: {
      control: 'boolean',
      description: 'Hide sidebars on mobile, show only center content',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    distribution: 'center-heavy',
    gap: 3,
    maxWidth: 'xl',
    padding: 2,
    responsive: true,
    stackAt: 'md',
    hideSidebarsOnMobile: false,
  },
} satisfies Meta<typeof ThreeColumnLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample column content for examples.
 */
const LeftColumn = ({
  label = 'Left',
  height = 300,
}: {
  label?: string
  height?: number
}) => (
  <Paper
    sx={{
      p: 2,
      height,
      bgcolor: 'info.main',
      color: 'info.contrastText',
    }}
  >
    <Typography variant="h6" gutterBottom>
      {label} Column
    </Typography>
    <Typography variant="body2">
      Sidebar content, navigation, or filters.
    </Typography>
  </Paper>
)

const CenterColumn = ({
  label = 'Center',
  height = 300,
}: {
  label?: string
  height?: number
}) => (
  <Paper
    sx={{
      p: 3,
      height,
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
    }}
  >
    <Typography variant="h5" gutterBottom>
      {label} Column
    </Typography>
    <Typography>
      Main content area. This is where your primary content goes - articles,
      products, data tables, or any main focus content.
    </Typography>
  </Paper>
)

const RightColumn = ({
  label = 'Right',
  height = 300,
}: {
  label?: string
  height?: number
}) => (
  <Paper
    sx={{
      p: 2,
      height,
      bgcolor: 'secondary.main',
      color: 'secondary.contrastText',
    }}
  >
    <Typography variant="h6" gutterBottom>
      {label} Column
    </Typography>
    <Typography variant="body2">
      Widgets, trending, or related content.
    </Typography>
  </Paper>
)

/**
 * Interactive playground for ThreeColumnLayout.
 * Use the Controls panel to experiment with different configurations.
 */
export const Playground: Story = {
  args: {
    leftColumn: <LeftColumn />,
    centerColumn: <CenterColumn />,
    rightColumn: <RightColumn />,
    distribution: 'center-heavy',
    gap: 3,
    maxWidth: 'xl',
    padding: 2,
    responsive: true,
    stackAt: 'md',
    hideSidebarsOnMobile: false,
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
 * Basic usage with center-heavy distribution (default).
 */
export const Basic: Story = {
  args: {
    leftColumn: (
      <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
        <Typography variant="h6" gutterBottom>
          Navigation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Links and menu items
        </Typography>
      </Paper>
    ),
    centerColumn: (
      <Paper variant="outlined" sx={{ p: 3, minHeight: 200 }}>
        <Typography variant="h5" gutterBottom>
          Main Content
        </Typography>
        <Typography color="text.secondary">
          This is the primary content area. The center-heavy distribution gives
          it 50% of the available width while sidebars get 25% each.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
        <Typography variant="h6" gutterBottom>
          Sidebar
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Additional info and widgets
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage with center-heavy distribution emphasizing the main content.',
      },
    },
  },
}

/**
 * Real-world news portal with ads, articles, and trending content.
 */
export const RealWorld: Story = {
  args: {
    leftColumn: null,
    centerColumn: null,
    rightColumn: null,
  },
  render: () => <NewsPortal />,
  parameters: {
    docs: {
      description: {
        story: `
A production-ready news portal demonstrating:
- Left sidebar with sponsored content and ads
- Center column with featured articles
- Right sidebar with trending items and newsletter signup
- Sidebars hidden on mobile for cleaner experience
- Sticky sidebar positioning
        `,
      },
    },
  },
}

/**
 * Equal distribution for balanced content presentation.
 */
export const EqualDistribution: Story = {
  args: {
    distribution: 'equal',
    leftColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 250,
          bgcolor: 'warning.main',
          color: 'warning.contrastText',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Plan A
        </Typography>
        <Typography>Basic features for individuals</Typography>
      </Paper>
    ),
    centerColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 250,
          bgcolor: 'success.main',
          color: 'success.contrastText',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Plan B
        </Typography>
        <Typography>Standard features for teams</Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 250,
          bgcolor: 'error.main',
          color: 'error.contrastText',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Plan C
        </Typography>
        <Typography>Premium features for enterprise</Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Equal distribution (33/33/33) for pricing tables or feature comparisons.',
      },
    },
  },
}

/**
 * Left-heavy distribution for navigation-focused layouts.
 */
export const LeftHeavyDistribution: Story = {
  args: {
    distribution: 'left-heavy',
    leftColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 250,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Primary Navigation (40%)
        </Typography>
        <Typography>
          Use left-heavy when the left sidebar contains important navigation or
          primary content that needs more space.
        </Typography>
      </Paper>
    ),
    centerColumn: (
      <Paper variant="outlined" sx={{ p: 3, minHeight: 250 }}>
        <Typography variant="h6" gutterBottom>
          Content Area (35%)
        </Typography>
        <Typography color="text.secondary">
          Main content receives moderate space.
        </Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
        <Typography variant="subtitle1" gutterBottom>
          Actions (25%)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quick actions or info
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Left-heavy distribution (40/35/25) emphasizes the left sidebar.',
      },
    },
  },
}

/**
 * Right-heavy distribution for detail panels.
 */
export const RightHeavyDistribution: Story = {
  args: {
    distribution: 'right-heavy',
    leftColumn: (
      <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
        <Typography variant="subtitle1" gutterBottom>
          Filters (25%)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Filter options
        </Typography>
      </Paper>
    ),
    centerColumn: (
      <Paper variant="outlined" sx={{ p: 3, minHeight: 250 }}>
        <Typography variant="h6" gutterBottom>
          List View (35%)
        </Typography>
        <Typography color="text.secondary">Item list or thumbnails</Typography>
      </Paper>
    ),
    rightColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 250,
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Detail Panel (40%)
        </Typography>
        <Typography>
          Use right-heavy when the right column shows details or preview of
          selected items.
        </Typography>
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Right-heavy distribution (25/35/40) emphasizes the right detail panel.',
      },
    },
  },
}

/**
 * Sidebars hidden on mobile for content focus.
 */
export const HideSidebarsOnMobile: Story = {
  args: {
    hideSidebarsOnMobile: true,
    leftColumn: <LeftColumn label="Hidden on Mobile" />,
    centerColumn: (
      <Paper
        sx={{
          p: 3,
          minHeight: 300,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Always Visible
        </Typography>
        <Typography>
          On mobile devices, only this center column is visible. The sidebars
          are hidden to give users a focused content experience. Resize your
          browser to see this behavior.
        </Typography>
      </Paper>
    ),
    rightColumn: <RightColumn label="Hidden on Mobile" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hide sidebars on mobile to focus on main content. Resize browser to see effect.',
      },
    },
  },
}

/**
 * Dashboard layout with navigation, content, and activity panel.
 */
export const DashboardLayout: Story = {
  args: {
    distribution: 'center-heavy',
    gap: 2,
    leftColumn: (
      <Paper variant="outlined" sx={{ p: 2, minHeight: 400 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          NAVIGATION
        </Typography>
        {['Dashboard', 'Analytics', 'Users', 'Settings'].map((item) => (
          <Box
            key={item}
            sx={{
              py: 1,
              px: 1.5,
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography variant="body2">{item}</Typography>
          </Box>
        ))}
      </Paper>
    ),
    centerColumn: (
      <Paper variant="outlined" sx={{ p: 3, minHeight: 400 }}>
        <Typography variant="h5" gutterBottom>
          Dashboard Overview
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 2,
            mt: 2,
          }}
        >
          {['Users', 'Revenue', 'Orders', 'Growth'].map((metric) => (
            <Paper
              key={metric}
              variant="outlined"
              sx={{ p: 2, textAlign: 'center' }}
            >
              <Typography variant="h4" color="primary">
                {Math.floor(Math.random() * 1000)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metric}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>
    ),
    rightColumn: (
      <Paper variant="outlined" sx={{ p: 2, minHeight: 400 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          RECENT ACTIVITY
        </Typography>
        {['User signed up', 'Order placed', 'Payment received'].map(
          (activity, i) => (
            <Box
              key={activity}
              sx={{
                py: 1,
                borderBottom: i < 2 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2">{activity}</Typography>
              <Typography variant="caption" color="text.secondary">
                {i + 1} hour ago
              </Typography>
            </Box>
          ),
        )}
      </Paper>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard layout with navigation sidebar, metrics, and activity feed.',
      },
    },
  },
}

/**
 * Interaction test verifying layout structure and all columns.
 */
export const InteractionTest: Story = {
  args: {
    leftColumn: (
      <Box data-testid="left-column">
        <Typography data-testid="left-title">Left Sidebar</Typography>
      </Box>
    ),
    centerColumn: (
      <Box data-testid="center-column">
        <Typography data-testid="center-title">Main Content</Typography>
      </Box>
    ),
    rightColumn: (
      <Box data-testid="right-column">
        <Typography data-testid="right-title">Right Sidebar</Typography>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all three columns are rendered
    const leftColumn = await canvas.findByTestId('left-column')
    const centerColumn = await canvas.findByTestId('center-column')
    const rightColumn = await canvas.findByTestId('right-column')

    await expect(leftColumn).toBeVisible()
    await expect(centerColumn).toBeVisible()
    await expect(rightColumn).toBeVisible()

    // Verify column titles
    const leftTitle = await canvas.findByTestId('left-title')
    const centerTitle = await canvas.findByTestId('center-title')
    const rightTitle = await canvas.findByTestId('right-title')

    await expect(leftTitle).toHaveTextContent('Left Sidebar')
    await expect(centerTitle).toHaveTextContent('Main Content')
    await expect(rightTitle).toHaveTextContent('Right Sidebar')

    // Verify container structure
    const container = canvasElement.querySelector('.MuiContainer-root')
    await expect(container).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test verifying all three columns render correctly.',
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
    padding: 3,
    leftColumn: <LeftColumn height={200} />,
    centerColumn: <CenterColumn height={200} />,
    rightColumn: <RightColumn height={200} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full width layout spanning the entire viewport.',
      },
    },
  },
}
