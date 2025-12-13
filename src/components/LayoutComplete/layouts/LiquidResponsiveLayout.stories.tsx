import BarChartIcon from '@mui/icons-material/BarChart'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PeopleIcon from '@mui/icons-material/People'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import LiquidResponsiveLayout from './LiquidResponsiveLayout'

import type { ResponsivePanel } from './LiquidResponsiveLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * LiquidResponsiveLayout provides fluid layouts that adapt to any screen size,
 * perfect for responsive dashboards and flexible panel arrangements.
 *
 * ## Use Cases
 * - **Responsive dashboards**: Multi-panel layouts that adapt
 * - **Admin interfaces**: Sidebar, content, and widgets
 * - **Holy grail layouts**: Header, footer, and three-column body
 * - **Flexible grids**: Card layouts that reflow naturally
 *
 * ## Key Features
 * - Per-panel flex values at each breakpoint
 * - Conditional panel visibility by breakpoint
 * - Panel ordering by breakpoint
 * - Min/max width constraints
 * - Nested layouts support
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Maintains reading order
 * - Responsive without content reflow issues
 */
const meta = {
  title: 'Layout Complete/Layouts/LiquidResponsive',
  component: LiquidResponsiveLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
LiquidResponsiveLayout is a Container/Flow pattern that creates truly fluid layouts adapting to any screen size.

## When to Use
- Multi-panel dashboards with varying importance
- Admin interfaces with collapsible panels
- Holy grail layouts (header/footer/three-columns)
- Any layout requiring different proportions at different breakpoints

## Anatomy
\`\`\`
Desktop:                          Mobile:
┌─────┬────────────────┬─────┐    ┌────────────────────┐
│     │                │     │    │      Content       │
│ Nav │    Content     │Side │    ├────────────────────┤
│     │                │     │    │       Nav          │
│flex:│   flex: 3      │flex:│    ├────────────────────┤
│  1  │                │  1  │    │   Side (hidden)    │
└─────┴────────────────┴─────┘    └────────────────────┘
\`\`\`

## Flex System
- **flex: 0** - Fixed size based on content/min-width
- **flex: 1** - Takes 1 part of available space
- **flex: 2** - Takes 2 parts (twice as much as flex: 1)
- Different flex values per breakpoint

## Best Practices
1. Use hideAt for less important panels on mobile
2. Set minWidth for panels with minimum content requirements
3. Use order property to prioritize content on mobile
4. Consider nested layouts for complex structures
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['row', 'column'],
      description: 'Direction of the layout.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'row' },
      },
    },
    wrap: {
      control: 'boolean',
      description: 'Whether panels wrap when they overflow.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
      description: 'Alignment along the cross axis.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'stretch' },
      },
    },
    justifyContent: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Justification along the main axis.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'flex-start' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the layout.',
      table: {
        category: 'Layout',
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the layout.',
      table: {
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof LiquidResponsiveLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample panel for demonstration.
 */
const SamplePanel: React.FC<{
  title: string
  color: string
  height?: number | string
}> = ({ title, color, height = 200 }) => (
  <Box
    sx={{
      backgroundColor: color,
      borderRadius: 2,
      p: 3,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h6" color="white" fontWeight={600}>
      {title}
    </Typography>
  </Box>
)

/**
 * Sample panels for demonstration.
 */
const samplePanels: ResponsivePanel[] = [
  {
    id: 'sidebar',
    content: <SamplePanel title="Sidebar" color="#1976d2" />,
    flex: { xs: 1, md: 1 },
    minWidth: 200,
    maxWidth: 300,
  },
  {
    id: 'main',
    content: <SamplePanel title="Main Content" color="#388e3c" height={400} />,
    flex: { xs: 1, md: 3 },
  },
  {
    id: 'widgets',
    content: <SamplePanel title="Widgets" color="#f57c00" />,
    flex: { xs: 1, lg: 1 },
    hideAt: ['xs', 'sm'],
  },
]

/**
 * Interactive playground to explore LiquidResponsiveLayout configuration.
 */
export const Playground: Story = {
  args: {
    panels: samplePanels,
    gap: { xs: 2, md: 3 },
    direction: 'row',
    wrap: true,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: { xs: 2, md: 3 },
  },
}

/**
 * Basic usage with three-panel layout.
 */
export const Basic: Story = {
  args: {
    panels: [
      {
        id: 'left',
        content: <SamplePanel title="Panel A" color="#1976d2" height={150} />,
        flex: { xs: 1 },
      },
      {
        id: 'center',
        content: <SamplePanel title="Panel B" color="#388e3c" height={150} />,
        flex: { xs: 2 },
      },
      {
        id: 'right',
        content: <SamplePanel title="Panel C" color="#f57c00" height={150} />,
        flex: { xs: 1 },
      },
    ],
    gap: { xs: 2 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic three-panel layout with 1:2:1 flex ratio. Panels grow and shrink proportionally.',
      },
    },
  },
}

/**
 * Dashboard sidebar component.
 */
const DashboardSidebar: React.FC = () => (
  <Card sx={{ height: '100%', minHeight: 500 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Navigation
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List disablePadding>
        {[
          { icon: <BarChartIcon />, label: 'Analytics', active: true },
          { icon: <PeopleIcon />, label: 'Users' },
          { icon: <CalendarMonthIcon />, label: 'Calendar' },
          { icon: <NotificationsIcon />, label: 'Notifications' },
        ].map((item) => (
          <ListItem
            key={item.label}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              mb: 0.5,
              backgroundColor: item.active ? 'primary.light' : 'transparent',
              '&:hover': { backgroundColor: 'action.hover' },
              cursor: 'pointer',
            }}
          >
            <ListItemAvatar sx={{ minWidth: 40 }}>{item.icon}</ListItemAvatar>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
)

/**
 * Dashboard main content component.
 */
const DashboardContent: React.FC = () => (
  <Box
    sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}
  >
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {[
        {
          label: 'Total Users',
          value: '12,345',
          change: '+12%',
          color: '#1976d2',
        },
        { label: 'Revenue', value: '$54,321', change: '+8%', color: '#388e3c' },
        { label: 'Orders', value: '1,234', change: '+5%', color: '#f57c00' },
      ].map((stat) => (
        <Card key={stat.label} sx={{ flex: '1 1 200px' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: stat.color }}
            >
              {stat.value}
            </Typography>
            <Chip
              label={stat.change}
              size="small"
              color="success"
              icon={<TrendingUpIcon />}
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>

    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Performance Overview
        </Typography>
        <Box
          sx={{
            height: 200,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">Chart Placeholder</Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>
)

/**
 * Dashboard widgets component.
 */
const DashboardWidgets: React.FC = () => (
  <Box
    sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
  >
    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Server Status
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#388e3c',
            }}
          />
          <Typography variant="body2">All systems operational</Typography>
        </Box>
      </CardContent>
    </Card>

    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Storage Usage
        </Typography>
        <LinearProgress
          variant="determinate"
          value={68}
          sx={{ mb: 1, height: 8, borderRadius: 4 }}
        />
        <Typography variant="caption" color="text.secondary">
          68% of 100GB used
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Recent Activity
        </Typography>
        <List disablePadding dense>
          {['User signup', 'New order #1234', 'Payment received'].map(
            (activity, i) => (
              <ListItem key={i} disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primary={activity}
                  secondary={`${i + 1}h ago`}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ),
          )}
        </List>
      </CardContent>
    </Card>
  </Box>
)

/**
 * Real-world example: Responsive dashboard with sidebar, content, and widgets.
 */
export const RealWorld: Story = {
  args: {
    panels: [
      {
        id: 'sidebar',
        content: <DashboardSidebar />,
        flex: { xs: 1, md: 0 },
        minWidth: 220,
        maxWidth: 280,
        order: { xs: 2, md: 1 },
        hideAt: ['xs', 'sm'],
      },
      {
        id: 'main',
        content: <DashboardContent />,
        flex: { xs: 1, md: 3 },
        order: { xs: 1, md: 2 },
      },
      {
        id: 'widgets',
        content: <DashboardWidgets />,
        flex: { xs: 1, lg: 0 },
        minWidth: 250,
        maxWidth: 300,
        order: { xs: 3, md: 3 },
        hideAt: ['xs', 'sm', 'md'],
      },
    ],
    gap: { xs: 2, md: 3 },
    padding: { xs: 2, md: 3 },
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-grade responsive dashboard demonstrating the LiquidResponsiveLayout pattern.

**Responsive behavior:**
- **Desktop (lg+)**: Three-column layout with sidebar, content, and widgets
- **Tablet (md)**: Two-column layout with sidebar and content (widgets hidden)
- **Mobile (xs/sm)**: Single-column layout with content only

Resize the viewport to see how panels adapt, hide, and reorder.
        `,
      },
    },
  },
}

/**
 * Interaction test verifying layout adapts correctly.
 */
export const InteractionTest: Story = {
  args: {
    panels: [
      {
        id: 'panel-a',
        content: (
          <Box
            data-testid="panel-a"
            sx={{
              backgroundColor: '#1976d2',
              p: 3,
              height: 150,
              borderRadius: 2,
            }}
          >
            <Typography color="white">Panel A (flex: 1)</Typography>
          </Box>
        ),
        flex: { xs: 1 },
      },
      {
        id: 'panel-b',
        content: (
          <Box
            data-testid="panel-b"
            sx={{
              backgroundColor: '#388e3c',
              p: 3,
              height: 150,
              borderRadius: 2,
            }}
          >
            <Typography color="white">Panel B (flex: 2)</Typography>
          </Box>
        ),
        flex: { xs: 2 },
      },
      {
        id: 'panel-c',
        content: (
          <Box
            data-testid="panel-c"
            sx={{
              backgroundColor: '#f57c00',
              p: 3,
              height: 150,
              borderRadius: 2,
            }}
          >
            <Typography color="white">Panel C (flex: 1)</Typography>
          </Box>
        ),
        flex: { xs: 1 },
      },
    ],
    gap: { xs: 2 },
    padding: { xs: 2 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all panels are rendered
    const panelA = canvas.getByTestId('panel-a')
    const panelB = canvas.getByTestId('panel-b')
    const panelC = canvas.getByTestId('panel-c')

    await expect(panelA).toBeInTheDocument()
    await expect(panelB).toBeInTheDocument()
    await expect(panelC).toBeInTheDocument()

    // Verify panels are visible
    await expect(panelA).toBeVisible()
    await expect(panelB).toBeVisible()
    await expect(panelC).toBeVisible()

    // Verify horizontal layout (panels are side by side)
    const panelARect = panelA.getBoundingClientRect()
    const panelBRect = panelB.getBoundingClientRect()
    const panelCRect = panelC.getBoundingClientRect()

    // Check that panels are in a row (same top position, different left positions)
    await expect(Math.abs(panelARect.top - panelBRect.top)).toBeLessThan(5)
    await expect(Math.abs(panelBRect.top - panelCRect.top)).toBeLessThan(5)

    // Verify panel B (flex: 2) is wider than panel A (flex: 1)
    const panelAWidth = panelARect.width
    const panelBWidth = panelBRect.width
    const panelCWidth = panelCRect.width

    // Panel B should be approximately twice the width of Panel A
    // Allow some tolerance for gaps and padding
    const ratio = panelBWidth / panelAWidth
    await expect(ratio).toBeGreaterThan(1.5)
    await expect(ratio).toBeLessThan(2.5)

    // Panel A and C should be similar widths
    await expect(Math.abs(panelAWidth - panelCWidth)).toBeLessThan(10)

    // Verify panels have data-panel-id attribute
    const panelAWrapper = panelA.closest('[data-panel-id="panel-a"]')
    const panelBWrapper = panelB.closest('[data-panel-id="panel-b"]')
    const panelCWrapper = panelC.closest('[data-panel-id="panel-c"]')

    await expect(panelAWrapper).toBeInTheDocument()
    await expect(panelBWrapper).toBeInTheDocument()
    await expect(panelCWrapper).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automated test verifying panel rendering, layout positioning, and flex ratio proportions.',
      },
    },
  },
}

/**
 * Demonstrates panel visibility at different breakpoints.
 */
export const BreakpointVisibility: Story = {
  args: {
    panels: [
      {
        id: 'always-visible',
        content: (
          <SamplePanel title="Always Visible" color="#1976d2" height={100} />
        ),
        flex: { xs: 1 },
      },
      {
        id: 'hidden-mobile',
        content: (
          <SamplePanel
            title="Hidden on Mobile (xs, sm)"
            color="#388e3c"
            height={100}
          />
        ),
        flex: { xs: 1 },
        hideAt: ['xs', 'sm'],
      },
      {
        id: 'hidden-desktop',
        content: (
          <SamplePanel
            title="Hidden on Desktop (lg, xl)"
            color="#f57c00"
            height={100}
          />
        ),
        flex: { xs: 1 },
        hideAt: ['lg', 'xl'],
      },
    ],
    gap: { xs: 2 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use hideAt to conditionally show/hide panels at specific breakpoints. Resize to see panels appear and disappear.',
      },
    },
  },
}

/**
 * Demonstrates panel ordering at different breakpoints.
 */
export const ResponsiveOrdering: Story = {
  args: {
    panels: [
      {
        id: 'sidebar',
        content: (
          <SamplePanel title="Sidebar (order: 2 on mobile)" color="#1976d2" />
        ),
        flex: { xs: 1, md: 1 },
        order: { xs: 2, md: 1 },
      },
      {
        id: 'content',
        content: (
          <SamplePanel
            title="Content (order: 1 on mobile)"
            color="#388e3c"
            height={300}
          />
        ),
        flex: { xs: 1, md: 3 },
        order: { xs: 1, md: 2 },
      },
    ],
    gap: { xs: 2 },
    wrap: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use order property to change panel sequence at different breakpoints. Content appears first on mobile.',
      },
    },
  },
}

/**
 * Column direction layout.
 */
export const ColumnLayout: Story = {
  args: {
    direction: 'column',
    panels: [
      {
        id: 'header',
        content: <SamplePanel title="Header" color="#1976d2" height={80} />,
        flex: { xs: 0 },
      },
      {
        id: 'body',
        content: (
          <SamplePanel title="Body Content" color="#388e3c" height={300} />
        ),
        flex: { xs: 1 },
      },
      {
        id: 'footer',
        content: <SamplePanel title="Footer" color="#f57c00" height={60} />,
        flex: { xs: 0 },
      },
    ],
    gap: { xs: 2 },
    minHeight: '100vh',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Column direction creates vertical stacking with flex-based heights. Combine with row layouts for complex page structures.',
      },
    },
  },
}

/**
 * Nested layouts for complex structures.
 */
export const NestedLayouts: Story = {
  args: {
    direction: 'column',
    minHeight: '100vh',
    gap: { xs: 0 },
    padding: { xs: 0 },
    panels: [
      {
        id: 'header',
        content: (
          <Box
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5">Header</Typography>
          </Box>
        ),
        flex: { xs: 0 },
      },
      {
        id: 'body',
        content: (
          <LiquidResponsiveLayout
            panels={[
              {
                id: 'nav',
                content: (
                  <Box
                    sx={{
                      backgroundColor: '#bbdefb',
                      p: 2,
                      height: '100%',
                      minHeight: 400,
                    }}
                  >
                    <Typography variant="subtitle1">Navigation</Typography>
                  </Box>
                ),
                flex: { xs: 1, md: 1 },
                maxWidth: 200,
                hideAt: ['xs', 'sm'],
              },
              {
                id: 'main',
                content: (
                  <Box
                    sx={{ backgroundColor: '#e3f2fd', p: 3, minHeight: 400 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Main Content
                    </Typography>
                    <Typography variant="body2">
                      This is a nested layout creating a classic &quot;holy
                      grail&quot; structure.
                    </Typography>
                  </Box>
                ),
                flex: { xs: 1, md: 4 },
              },
              {
                id: 'aside',
                content: (
                  <Box
                    sx={{
                      backgroundColor: '#bbdefb',
                      p: 2,
                      height: '100%',
                      minHeight: 400,
                    }}
                  >
                    <Typography variant="subtitle1">Sidebar</Typography>
                  </Box>
                ),
                flex: { xs: 1, md: 1 },
                maxWidth: 200,
                hideAt: ['xs', 'sm'],
              },
            ]}
            gap={{ xs: 0, md: 2 }}
            padding={{ xs: 0, md: 2 }}
          />
        ),
        flex: { xs: 1 },
      },
      {
        id: 'footer',
        content: (
          <Box
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">Footer</Typography>
          </Box>
        ),
        flex: { xs: 0 },
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Nest LiquidResponsiveLayout components for complex page structures like the "holy grail" layout.',
      },
    },
  },
}
