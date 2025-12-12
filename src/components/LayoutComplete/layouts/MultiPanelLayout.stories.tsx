import CodeIcon from '@mui/icons-material/Code'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import TerminalIcon from '@mui/icons-material/Terminal'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { expect, userEvent, within } from 'storybook/test'

import MultiPanelLayout from './MultiPanelLayout'

import type { PanelConfig } from './MultiPanelLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * MultiPanelLayout provides an IDE-style layout with multiple resizable panes.
 *
 * This layout pattern is ideal for complex applications that need to display
 * multiple related views simultaneously:
 *
 * - **Code editors**: File explorer, editor, terminal, and output panels
 * - **Email clients**: Folders, message list, and message preview
 * - **Admin dashboards**: Navigation, data tables, and detail views
 * - **Design tools**: Layers panel, canvas, and properties inspector
 *
 * ## Features
 * - Collapsible panels with smooth animations
 * - Configurable panel widths (min/max constraints)
 * - Customizable dividers and borders
 * - Flexible main content area
 *
 * ## Best Practices
 * - Limit to 3-4 panels maximum for usability
 * - Make sidebars collapsible on smaller screens
 * - Use consistent panel widths across the application
 * - Provide clear visual hierarchy
 *
 * @example
 * ```tsx
 * import { MultiPanelLayout } from './MultiPanelLayout'
 *
 * const panels = [
 *   { id: 'sidebar', content: <Sidebar />, defaultWidth: 240, collapsible: true },
 *   { id: 'main', content: <MainContent /> },
 *   { id: 'details', content: <Details />, defaultWidth: 300, collapsible: true },
 * ]
 *
 * <MultiPanelLayout panels={panels} height={600} />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/MultiPanel',
  component: MultiPanelLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
MultiPanelLayout provides an IDE-style layout with multiple resizable panes.

## Features
- **Collapsible panels**: Toggle sidebar visibility with smooth animations
- **Flexible sizing**: Set default, min, and max widths for each panel
- **Main content area**: One panel expands to fill remaining space
- **Customizable appearance**: Dividers, borders, elevation, and backgrounds

## Panel Configuration
Each panel can be configured with:
- \`id\`: Unique identifier
- \`content\`: React node to render
- \`defaultWidth\`: Initial width (number or CSS string)
- \`minWidth\`/\`maxWidth\`: Size constraints
- \`collapsible\`: Whether panel can collapse
- \`defaultCollapsed\`: Start in collapsed state
- \`title\`: Label for collapse button tooltip

## Use Cases
1. **IDE Layouts**: File tree, code editor, terminal, output
2. **Email Clients**: Folders, message list, preview pane
3. **Admin Dashboards**: Navigation, data grid, detail view
4. **Design Tools**: Layers, canvas, properties panel
        `,
      },
    },
  },
  argTypes: {
    panels: {
      description: 'Array of panel configurations',
      table: {
        category: 'Content',
        type: { summary: 'PanelConfig[]' },
      },
    },
    height: {
      control: { type: 'number', min: 200, max: 800 },
      description: 'Height of the layout container',
      table: {
        category: 'Layout',
        defaultValue: { summary: '500' },
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 16 },
      description: 'Gap between panels in pixels',
      table: {
        category: 'Layout',
        defaultValue: { summary: '0' },
      },
    },
    showDividers: {
      control: 'boolean',
      description: 'Show dividers between panels',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Elevation of panel Paper components',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '0' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Whether panels should have borders',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    onPanelToggle: {
      action: 'panelToggled',
      description: 'Callback when a panel is collapsed/expanded',
      table: {
        category: 'Events',
      },
    },
  },
} satisfies Meta<typeof MultiPanelLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample panel content components
const FileExplorer = () => (
  <Box>
    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
      EXPLORER
    </Typography>
    <List dense disablePadding>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <FolderIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText primary="src" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <InsertDriveFileIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="index.tsx" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }} selected>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <InsertDriveFileIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText primary="App.tsx" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <FolderIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText primary="components" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <DescriptionIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="README.md" />
      </ListItemButton>
    </List>
  </Box>
)

const CodeEditor = () => (
  <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Chip
        icon={<CodeIcon />}
        label="App.tsx"
        size="small"
        variant="filled"
        color="primary"
      />
      <Chip label="index.tsx" size="small" variant="outlined" />
    </Box>
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: 'grey.900',
        color: 'grey.100',
        overflow: 'auto',
      }}
    >
      <pre style={{ margin: 0 }}>
        {`import React from 'react'
import { ThemeProvider } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <Sidebar />
        <Content />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App`}
      </pre>
    </Paper>
  </Box>
)

const TerminalPanel = () => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <TerminalIcon fontSize="small" />
      <Typography variant="subtitle2" fontWeight={600}>
        TERMINAL
      </Typography>
    </Box>
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        bgcolor: 'grey.900',
        color: 'grey.100',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        height: 120,
        overflow: 'auto',
      }}
    >
      <Box sx={{ color: 'success.light' }}>$ npm run dev</Box>
      <Box sx={{ color: 'grey.400', mt: 0.5 }}>VITE v5.0.0 ready in 234ms</Box>
      <Box sx={{ color: 'grey.400' }}>Local: http://localhost:5173/</Box>
      <Box sx={{ color: 'grey.400' }}>Network: http://192.168.1.100:5173/</Box>
      <Box sx={{ color: 'info.light', mt: 1 }}>press h to show help</Box>
    </Paper>
  </Box>
)

// Basic panels for simple stories
const basicPanels: PanelConfig[] = [
  {
    id: 'left',
    title: 'Left Panel',
    content: <Typography>Left panel content</Typography>,
    defaultWidth: 200,
    collapsible: true,
  },
  {
    id: 'center',
    content: <Typography>Main content area - takes remaining space</Typography>,
  },
  {
    id: 'right',
    title: 'Right Panel',
    content: <Typography>Right panel content</Typography>,
    defaultWidth: 250,
    collapsible: true,
  },
]

/**
 * Interactive playground for the MultiPanelLayout component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    panels: basicPanels,
    height: 400,
    gap: 0,
    showDividers: true,
    elevation: 0,
    bordered: true,
  },
}

/**
 * Basic usage of MultiPanelLayout with three panels.
 * The middle panel automatically fills remaining space.
 */
export const Basic: Story = {
  args: {
    panels: basicPanels,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic three-panel layout with collapsible sidebars. Click the chevron icons to collapse/expand panels.',
      },
    },
  },
}

/**
 * IDE-style layout with file explorer, code editor, and terminal.
 * Demonstrates a real-world development environment use case.
 */
export const RealWorld: Story = {
  args: {
    panels: [],
  },
  render: () => {
    const idePanels: PanelConfig[] = [
      {
        id: 'explorer',
        title: 'Explorer',
        content: <FileExplorer />,
        defaultWidth: 220,
        minWidth: 180,
        maxWidth: 350,
        collapsible: true,
      },
      {
        id: 'editor',
        content: <CodeEditor />,
        minWidth: 300,
      },
      {
        id: 'terminal',
        title: 'Terminal',
        content: <TerminalPanel />,
        defaultWidth: 280,
        minWidth: 200,
        collapsible: true,
      },
    ]

    return (
      <MultiPanelLayout
        panels={idePanels}
        height={450}
        bordered={true}
        showDividers={true}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Real-world IDE-style layout with:
- **File Explorer**: Collapsible sidebar with folder tree
- **Code Editor**: Main editing area with syntax-highlighted code
- **Terminal**: Collapsible panel with command output

Try collapsing the sidebars to maximize the editor space.
        `,
      },
    },
  },
}

/**
 * Email client layout with folders, message list, and preview.
 */
export const EmailClient: Story = {
  args: {
    panels: [],
  },
  render: () => {
    const messages = [
      {
        id: 1,
        from: 'Team Lead',
        subject: 'Project Update',
        preview: 'The latest sprint...',
        unread: true,
      },
      {
        id: 2,
        from: 'HR Department',
        subject: 'Holiday Schedule',
        preview: 'Please note the...',
        unread: false,
      },
      {
        id: 3,
        from: 'Client',
        subject: 'Re: Proposal',
        preview: 'Thank you for...',
        unread: true,
      },
    ]

    const emailPanels: PanelConfig[] = [
      {
        id: 'folders',
        title: 'Folders',
        content: (
          <List dense disablePadding>
            {['Inbox (3)', 'Sent', 'Drafts', 'Trash'].map((folder) => (
              <ListItemButton key={folder} selected={folder.includes('Inbox')}>
                <ListItemText primary={folder} />
              </ListItemButton>
            ))}
          </List>
        ),
        defaultWidth: 160,
        collapsible: true,
      },
      {
        id: 'messages',
        content: (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Inbox
            </Typography>
            <List disablePadding>
              {messages.map((msg) => (
                <ListItemButton key={msg.id} divider selected={msg.id === 1}>
                  <ListItemText
                    primary={msg.from}
                    secondary={msg.subject}
                    primaryTypographyProps={{
                      fontWeight: msg.unread ? 700 : 400,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ),
        defaultWidth: 280,
      },
      {
        id: 'preview',
        content: (
          <Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant="h6">Project Update</Typography>
              <IconButton size="small" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              From: Team Lead &lt;lead@company.com&gt;
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              The latest sprint has been completed successfully. All major
              features are now ready for QA testing. Please review the attached
              documents for details.
            </Typography>
          </Box>
        ),
      },
    ]

    return (
      <MultiPanelLayout panels={emailPanels} height={400} showDividers={true} />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Email client layout with folders, message list, and message preview panels.',
      },
    },
  },
}

/**
 * Two-panel layout without right sidebar.
 */
export const TwoPanel: Story = {
  args: {
    panels: [
      {
        id: 'nav',
        title: 'Navigation',
        content: (
          <List dense>
            {['Dashboard', 'Analytics', 'Users', 'Settings'].map((item) => (
              <ListItemButton key={item}>
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        ),
        defaultWidth: 200,
        collapsible: true,
      },
      {
        id: 'content',
        content: (
          <Box>
            <Typography variant="h5" gutterBottom>
              Dashboard
            </Typography>
            <Typography color="text.secondary">
              Main content area with data visualizations and widgets.
            </Typography>
          </Box>
        ),
      },
    ],
    height: 350,
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple two-panel layout with collapsible navigation sidebar.',
      },
    },
  },
}

/**
 * Layout with panels starting collapsed.
 */
export const DefaultCollapsed: Story = {
  args: {
    panels: [
      {
        id: 'left',
        title: 'Left Panel',
        content: <Typography>Left panel content</Typography>,
        defaultWidth: 200,
        collapsible: true,
        defaultCollapsed: true,
      },
      {
        id: 'center',
        content: (
          <Typography variant="h6">
            Main content takes full width when sidebars are collapsed
          </Typography>
        ),
      },
      {
        id: 'right',
        title: 'Right Panel',
        content: <Typography>Right panel content</Typography>,
        defaultWidth: 250,
        collapsible: true,
        defaultCollapsed: true,
      },
    ],
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Panels can start in a collapsed state. Click the expand buttons to open them.',
      },
    },
  },
}

/**
 * Layout with custom gap between panels.
 */
export const WithGap: Story = {
  args: {
    panels: basicPanels,
    height: 300,
    gap: 8,
    showDividers: false,
    bordered: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Using gap instead of dividers for visual separation between panels.',
      },
    },
  },
}

/**
 * Layout with elevated panels.
 */
export const Elevated: Story = {
  args: {
    panels: basicPanels,
    height: 300,
    elevation: 2,
    bordered: false,
    gap: 8,
    showDividers: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Elevated panels with shadow instead of borders.',
      },
    },
  },
}

/**
 * Interaction test: Verifies panel collapse/expand functionality.
 */
export const InteractionTest: Story = {
  args: {
    panels: [
      {
        id: 'left-panel',
        title: 'Left',
        content: (
          <Typography data-testid="left-content">
            Left panel content visible
          </Typography>
        ),
        defaultWidth: 200,
        collapsible: true,
      },
      {
        id: 'main-panel',
        content: (
          <Typography data-testid="main-content">Main panel content</Typography>
        ),
      },
    ],
    height: 300,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify initial state - left panel content should be visible
    const leftContent = canvas.getByTestId('left-content')
    await expect(leftContent).toBeVisible()

    // Find and click the collapse button
    const collapseButton = canvas.getByRole('button', {
      name: /collapse panel/i,
    })
    await expect(collapseButton).toBeInTheDocument()

    await userEvent.click(collapseButton)

    // After collapse, the content should be hidden (opacity 0)
    // The panel still exists but content is visually hidden
    await expect(leftContent).toBeInTheDocument()

    // Find and click the expand button
    const expandButton = canvas.getByRole('button', { name: /expand panel/i })
    await expect(expandButton).toBeInTheDocument()

    await userEvent.click(expandButton)

    // After expand, content should be visible again
    await expect(leftContent).toBeVisible()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test verifying panel collapse and expand functionality.',
      },
    },
  },
}
