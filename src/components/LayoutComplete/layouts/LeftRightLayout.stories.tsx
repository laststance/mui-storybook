import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FolderIcon from '@mui/icons-material/Folder'
import HomeIcon from '@mui/icons-material/Home'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import LeftRightLayout, { EmailClient } from './LeftRightLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * LeftRightLayout provides an asymmetric sidebar navigation layout.
 *
 * ## Use Cases
 * - **Email clients**: Folder tree, email list, and preview pane
 * - **File managers**: Directory tree and file listing
 * - **Documentation**: Navigation sidebar and content
 * - **Admin panels**: Menu and main dashboard
 * - **IDE-style interfaces**: Project tree and code editor
 *
 * ## Key Features
 * - Fixed-width sidebar with flexible main content
 * - Three preset widths (narrow, standard, wide) plus custom
 * - Collapsible sidebar support
 * - Responsive mobile behavior
 * - Smooth width transitions
 *
 * ## Accessibility
 * - Proper ARIA roles for sidebar and main
 * - Keyboard navigation support
 * - Focus management for collapsible sidebar
 * - WCAG AA compliant
 *
 * ## Usage
 * ```tsx
 * import { LeftRightLayout } from './LeftRightLayout'
 *
 * <LeftRightLayout
 *   sidebarWidth="standard"
 *   sidebar={<Navigation />}
 *   main={<Content />}
 * />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/LeftRight',
  component: LeftRightLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
LeftRightLayout creates an asymmetric sidebar navigation layout with fixed sidebar width and flexible main content.

## When to Use
- Email clients and messaging apps
- File managers and document browsers
- Documentation sites with navigation
- Admin panels and dashboards
- IDE-style interfaces with project trees

## Design Considerations
- **Sidebar Width**: Choose based on content - narrow for icons, wide for text
- **Collapsible**: Consider adding collapse for space-constrained views
- **Mobile Behavior**: Sidebar typically hides on mobile, replaced by hamburger menu
        `,
      },
    },
  },
  argTypes: {
    sidebarWidth: {
      control: 'select',
      options: ['narrow', 'standard', 'wide'],
      description: 'Width of the sidebar',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'standard' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 8, step: 1 },
      description: 'Gap between sidebar and main (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '0' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the layout',
      table: {
        category: 'Layout',
        defaultValue: { summary: '100vh' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the sidebar can be collapsed',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is currently collapsed',
      table: {
        category: 'Behavior',
      },
    },
    collapsedWidth: {
      control: { type: 'range', min: 48, max: 120, step: 8 },
      description: 'Width when sidebar is collapsed',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '64' },
      },
    },
    hideSidebarOnMobile: {
      control: 'boolean',
      description: 'Hide sidebar on mobile devices',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'true' },
      },
    },
    mobileBreakpoint: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Breakpoint at which sidebar hides',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'sm' },
      },
    },
  },
  args: {
    sidebarWidth: 'standard',
    gap: 0,
    minHeight: '100vh',
    collapsible: false,
    collapsedWidth: 64,
    hideSidebarOnMobile: true,
    mobileBreakpoint: 'sm',
  },
} satisfies Meta<typeof LeftRightLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample sidebar content for examples.
 */
const SampleSidebar = () => (
  <Paper
    elevation={0}
    sx={{
      height: '100%',
      bgcolor: 'grey.100',
      borderRight: '1px solid',
      borderColor: 'divider',
      p: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      Navigation
    </Typography>
    <List dense>
      {['Dashboard', 'Projects', 'Tasks', 'Reports', 'Settings'].map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {item === 'Dashboard' && <HomeIcon fontSize="small" />}
              {item === 'Projects' && <FolderIcon fontSize="small" />}
              {item === 'Tasks' && <InsertDriveFileIcon fontSize="small" />}
              {item === 'Reports' && <InsertDriveFileIcon fontSize="small" />}
              {item === 'Settings' && <SettingsIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Paper>
)

/**
 * Sample main content for examples.
 */
const SampleMainContent = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Main Content Area
    </Typography>
    <Typography color="text.secondary" paragraph>
      This is the main content area. It flexes to fill the remaining space after
      the fixed-width sidebar. The sidebar maintains its width while the main
      content area responds to viewport changes.
    </Typography>
    <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Content Section
      </Typography>
      <Typography color="text.secondary">
        Your application content goes here. This could be a data table,
        dashboard widgets, file list, email content, or any other primary
        content for your application.
      </Typography>
    </Paper>
  </Box>
)

/**
 * Interactive playground for LeftRightLayout.
 * Use the Controls panel to experiment with different configurations.
 */
export const Playground: Story = {
  args: {
    sidebar: <SampleSidebar />,
    main: <SampleMainContent />,
    sidebarWidth: 'standard',
    gap: 0,
    minHeight: '500px',
    collapsible: false,
    hideSidebarOnMobile: true,
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
 * Basic usage with standard sidebar width.
 */
export const Basic: Story = {
  args: {
    sidebar: (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sidebar
        </Typography>
        <Typography variant="body2">
          Fixed width sidebar content. This area maintains its width regardless
          of the main content size.
        </Typography>
      </Paper>
    ),
    main: (
      <Box sx={{ p: 3, bgcolor: 'background.paper', minHeight: 400 }}>
        <Typography variant="h5" gutterBottom>
          Flexible Main Area
        </Typography>
        <Typography color="text.secondary">
          The main content area automatically fills the remaining space. Resize
          your browser to see how it responds.
        </Typography>
      </Box>
    ),
    minHeight: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage with fixed sidebar and flexible main content.',
      },
    },
  },
}

/**
 * Real-world email client with folder tree, email list, and preview.
 */
export const RealWorld: Story = {
  args: {
    sidebar: null,
    main: null,
  },
  render: () => <EmailClient />,
  parameters: {
    docs: {
      description: {
        story: `
A production-ready email client demonstrating:
- Folder tree navigation with expandable sections
- Email list with read/unread states and starring
- Email preview panel with full message view
- Checkbox selection for bulk actions
- Responsive behavior for mobile devices
        `,
      },
    },
  },
}

/**
 * Narrow sidebar for icon-only navigation.
 */
export const NarrowSidebar: Story = {
  args: {
    sidebarWidth: 'narrow',
    sidebar: (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          bgcolor: 'grey.900',
          color: 'grey.100',
          p: 1,
        }}
      >
        <List>
          {[
            { icon: <HomeIcon />, label: 'Home' },
            { icon: <FolderIcon />, label: 'Files' },
            { icon: <SettingsIcon />, label: 'Settings' },
          ].map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                sx={{
                  flexDirection: 'column',
                  py: 1.5,
                  '&:hover': { bgcolor: 'grey.800' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'caption',
                    sx: { mt: 0.5 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    ),
    main: <SampleMainContent />,
    minHeight: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Narrow sidebar (200px) for icon-based navigation with labels.',
      },
    },
  },
}

/**
 * Wide sidebar for detailed navigation content.
 */
export const WideSidebar: Story = {
  args: {
    sidebarWidth: 'wide',
    sidebar: (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          bgcolor: 'grey.50',
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Project Explorer
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Browse files and folders in your project
        </Typography>
        <List>
          {['src', 'components', 'pages', 'utils', 'styles'].map((folder) => (
            <ListItem key={folder} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={folder}
                  secondary={`${Math.floor(Math.random() * 20) + 1} items`}
                />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    ),
    main: <SampleMainContent />,
    minHeight: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide sidebar (360px) for file browsers or detailed navigation.',
      },
    },
  },
}

/**
 * Collapsible sidebar that can be toggled.
 */
export const CollapsibleSidebar: Story = {
  args: {
    collapsible: true,
    sidebarWidth: 'standard',
    sidebar: (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          bgcolor: 'grey.100',
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 2,
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Collapsible Menu
        </Typography>
        <List dense>
          {['Dashboard', 'Analytics', 'Users', 'Settings'].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    ),
    main: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Collapsible Sidebar Demo
        </Typography>
        <Typography color="text.secondary">
          Click the toggle button in the sidebar header to collapse or expand
          the sidebar. The main content area automatically adjusts.
        </Typography>
      </Box>
    ),
    minHeight: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with collapse toggle for maximizing content space.',
      },
    },
  },
}

/**
 * Custom width sidebar using pixel value.
 */
export const CustomWidth: Story = {
  args: {
    sidebarWidth: 320,
    sidebar: (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Custom Width (320px)
        </Typography>
        <Typography variant="body2">
          You can specify any pixel value for the sidebar width by passing a
          number instead of a preset string.
        </Typography>
      </Paper>
    ),
    main: <SampleMainContent />,
    minHeight: '400px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom sidebar width using a numeric pixel value.',
      },
    },
  },
}

/**
 * File manager layout with directory tree.
 */
export const FileManagerLayout: Story = {
  args: {
    sidebarWidth: 'standard',
    gap: 0,
    sidebar: (
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          bgcolor: 'grey.50',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="text.secondary">
            FOLDERS
          </Typography>
        </Box>
        <List dense>
          {[
            { name: 'Documents', count: 24 },
            { name: 'Downloads', count: 12 },
            { name: 'Pictures', count: 156 },
            { name: 'Videos', count: 8 },
            { name: 'Music', count: 234 },
          ].map((folder) => (
            <ListItem key={folder.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={folder.name}
                  secondary={`${folder.count} files`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    ),
    main: (
      <Box>
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <HomeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            /
          </Typography>
          <ChevronRightIcon fontSize="small" color="action" />
          <Typography variant="body2">Documents</Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: 2,
            p: 2,
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Paper
              key={i}
              variant="outlined"
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <InsertDriveFileIcon sx={{ fontSize: 40, color: 'grey.400' }} />
              <Typography variant="body2" noWrap>
                File {i + 1}.txt
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    ),
    minHeight: '500px',
  },
  parameters: {
    docs: {
      description: {
        story: 'File manager layout with folder tree and file grid view.',
      },
    },
  },
}

/**
 * Interaction test verifying layout structure.
 */
export const InteractionTest: Story = {
  args: {
    sidebar: (
      <Box data-testid="sidebar-content" sx={{ p: 2 }}>
        <Typography data-testid="sidebar-title">Sidebar Content</Typography>
      </Box>
    ),
    main: (
      <Box data-testid="main-content" sx={{ p: 2 }}>
        <Typography data-testid="main-title">Main Content</Typography>
      </Box>
    ),
    minHeight: '300px',
    hideSidebarOnMobile: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify sidebar is rendered
    const sidebar = await canvas.findByTestId('sidebar-content')
    await expect(sidebar).toBeVisible()

    // Verify sidebar title
    const sidebarTitle = await canvas.findByTestId('sidebar-title')
    await expect(sidebarTitle).toHaveTextContent('Sidebar Content')

    // Verify main content is rendered
    const main = await canvas.findByTestId('main-content')
    await expect(main).toBeVisible()

    // Verify main title
    const mainTitle = await canvas.findByTestId('main-title')
    await expect(mainTitle).toHaveTextContent('Main Content')

    // Verify ARIA roles
    const aside = canvasElement.querySelector('aside')
    const mainElement = canvasElement.querySelector('main')
    await expect(aside).toBeInTheDocument()
    await expect(mainElement).toBeInTheDocument()
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
 * With gap between sidebar and main content.
 */
export const WithGap: Story = {
  args: {
    gap: 2,
    sidebar: (
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6">Sidebar</Typography>
        <Typography variant="body2" color="text.secondary">
          With gap spacing
        </Typography>
      </Paper>
    ),
    main: (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h5">Main Content</Typography>
        <Typography color="text.secondary">
          Notice the gap between sidebar and main content.
        </Typography>
      </Paper>
    ),
    minHeight: '300px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with gap spacing between sidebar and main content.',
      },
    },
  },
}
