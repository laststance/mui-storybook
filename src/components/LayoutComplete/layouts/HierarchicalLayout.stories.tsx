import { expect, fn, userEvent, within } from 'storybook/test'

import HierarchicalLayout from './HierarchicalLayout'

import type { FileNode } from './HierarchicalLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * HierarchicalLayout demonstrates the tree structure layout pattern.
 *
 * ## Overview
 * The hierarchical layout pattern displays data in a tree structure,
 * showing parent-child relationships with expandable/collapsible nodes.
 * This pattern is essential for navigating nested data structures.
 *
 * ## Use Cases
 * - **File browsers**: VS Code, Finder, Explorer
 * - **Navigation menus**: Documentation sidebars
 * - **Organization charts**: Company hierarchies
 * - **Category trees**: E-commerce product categories
 * - **Comment threads**: Reddit, Hacker News
 *
 * ## Accessibility
 * - Keyboard navigation (arrow keys, Enter)
 * - Proper ARIA tree roles
 * - Focus management
 * - Screen reader announcements
 *
 * ## Best Practices
 * - Limit initial expansion depth
 * - Provide visual hierarchy indicators
 * - Support keyboard navigation
 * - Lazy load deep branches
 */
const meta = {
  title: 'Layout Complete/Layouts/Hierarchical',
  component: HierarchicalLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
HierarchicalLayout demonstrates a file browser with expandable folder hierarchy.

## Key Features
- **Expandable folders**: Click to reveal nested content
- **File type icons**: Visual distinction between file types
- **Size and date display**: Optional metadata columns
- **Selection state**: Single selection with visual feedback

## Real-World Examples
- VS Code's file explorer
- macOS Finder sidebar
- Windows Explorer
- IDE project navigators

## Technical Details
- Recursive tree rendering
- Controlled expansion state
- Depth limiting for performance
- Icon mapping by file type
        `,
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 250, max: 500, step: 25 },
      description: 'Width of the file browser panel.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '350' },
      },
    },
    maxHeight: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
      description: 'Maximum height of the file browser.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '500' },
      },
    },
    showIcons: {
      control: 'boolean',
      description: 'Whether to show file icons.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    showSizes: {
      control: 'boolean',
      description: 'Whether to show file sizes.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    showDates: {
      control: 'boolean',
      description: 'Whether to show modified dates.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'false' },
      },
    },
    multiExpand: {
      control: 'boolean',
      description: 'Whether multiple nodes can be expanded simultaneously.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    indentSize: {
      control: { type: 'range', min: 16, max: 40, step: 4 },
      description: 'Indentation per level in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '24' },
      },
    },
    maxDepth: {
      control: { type: 'range', min: 3, max: 15, step: 1 },
      description: 'Maximum depth to display.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: '10' },
      },
    },
    onSelect: { action: 'selected' },
    onToggle: { action: 'toggled' },
    nodes: { control: false },
    defaultExpanded: { control: false },
    selectedId: { control: false },
  },
  args: {
    width: 350,
    maxHeight: 500,
    showIcons: true,
    showSizes: true,
    showDates: false,
    multiExpand: true,
    indentSize: 24,
    maxDepth: 10,
  },
} satisfies Meta<typeof HierarchicalLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the HierarchicalLayout component.
 * Use the Controls panel to experiment with all configuration options.
 */
export const Playground: Story = {
  args: {
    width: 350,
    maxHeight: 500,
    showIcons: true,
    showSizes: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground. Click folders to expand, files to select. Adjust display options in Controls.',
      },
    },
  },
}

/**
 * Basic file browser with default settings.
 */
export const Basic: Story = {
  args: {
    showIcons: true,
    showSizes: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic file browser with typical React project structure.',
      },
    },
  },
}

/**
 * Real-world example: Complete project file browser.
 */
export const RealWorld: Story = {
  args: {
    width: 380,
    maxHeight: 550,
    showIcons: true,
    showSizes: true,
    showDates: true,
  },
  render: (args) => {
    const projectNodes: FileNode[] = [
      {
        id: 'root',
        name: 'my-project',
        type: 'folder',
        children: [
          {
            id: 'github',
            name: '.github',
            type: 'folder',
            children: [
              {
                id: 'workflows',
                name: 'workflows',
                type: 'folder',
                children: [
                  {
                    id: 'ci-yml',
                    name: 'ci.yml',
                    type: 'config',
                    size: 1024,
                    modified: '2024-12-01',
                  },
                ],
              },
            ],
          },
          {
            id: 'src',
            name: 'src',
            type: 'folder',
            children: [
              {
                id: 'components',
                name: 'components',
                type: 'folder',
                children: [
                  {
                    id: 'ui',
                    name: 'ui',
                    type: 'folder',
                    children: [
                      {
                        id: 'button-tsx',
                        name: 'Button.tsx',
                        type: 'code',
                        size: 2048,
                        modified: '2024-12-10',
                      },
                      {
                        id: 'card-tsx',
                        name: 'Card.tsx',
                        type: 'code',
                        size: 1536,
                        modified: '2024-12-09',
                      },
                      {
                        id: 'dialog-tsx',
                        name: 'Dialog.tsx',
                        type: 'code',
                        size: 3072,
                        modified: '2024-12-08',
                      },
                      {
                        id: 'input-tsx',
                        name: 'Input.tsx',
                        type: 'code',
                        size: 1280,
                        modified: '2024-12-07',
                      },
                    ],
                  },
                  {
                    id: 'layout',
                    name: 'layout',
                    type: 'folder',
                    children: [
                      {
                        id: 'header-tsx',
                        name: 'Header.tsx',
                        type: 'code',
                        size: 2560,
                        modified: '2024-12-05',
                      },
                      {
                        id: 'footer-tsx',
                        name: 'Footer.tsx',
                        type: 'code',
                        size: 1024,
                        modified: '2024-12-05',
                      },
                      {
                        id: 'sidebar-tsx',
                        name: 'Sidebar.tsx',
                        type: 'code',
                        size: 3584,
                        modified: '2024-12-06',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'hooks',
                name: 'hooks',
                type: 'folder',
                children: [
                  {
                    id: 'use-auth',
                    name: 'useAuth.ts',
                    type: 'code',
                    size: 2048,
                    modified: '2024-12-10',
                  },
                  {
                    id: 'use-theme',
                    name: 'useTheme.ts',
                    type: 'code',
                    size: 1024,
                    modified: '2024-12-09',
                  },
                ],
              },
              {
                id: 'styles',
                name: 'styles',
                type: 'folder',
                children: [
                  {
                    id: 'globals-css',
                    name: 'globals.css',
                    type: 'file',
                    size: 4096,
                    modified: '2024-12-01',
                  },
                  {
                    id: 'theme-ts',
                    name: 'theme.ts',
                    type: 'code',
                    size: 2048,
                    modified: '2024-12-05',
                  },
                ],
              },
              {
                id: 'app-tsx',
                name: 'App.tsx',
                type: 'code',
                size: 1280,
                modified: '2024-12-10',
              },
              {
                id: 'main-tsx',
                name: 'main.tsx',
                type: 'code',
                size: 512,
                modified: '2024-12-01',
              },
            ],
          },
          {
            id: 'public',
            name: 'public',
            type: 'folder',
            children: [
              {
                id: 'favicon-ico',
                name: 'favicon.ico',
                type: 'image',
                size: 4096,
                modified: '2024-11-15',
              },
              {
                id: 'robots-txt',
                name: 'robots.txt',
                type: 'document',
                size: 128,
                modified: '2024-11-01',
              },
            ],
          },
          {
            id: 'package-json',
            name: 'package.json',
            type: 'config',
            size: 2048,
            modified: '2024-12-10',
          },
          {
            id: 'tsconfig-json',
            name: 'tsconfig.json',
            type: 'config',
            size: 512,
            modified: '2024-12-01',
          },
          {
            id: 'vite-config',
            name: 'vite.config.ts',
            type: 'config',
            size: 1024,
            modified: '2024-12-05',
          },
          {
            id: 'readme-md',
            name: 'README.md',
            type: 'document',
            size: 8192,
            modified: '2024-12-05',
          },
        ],
      },
    ]

    return (
      <HierarchicalLayout
        {...args}
        nodes={projectNodes}
        defaultExpanded={['root', 'src', 'components']}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
A real-world project file browser featuring:
- **Nested folder structure**: GitHub workflows, src, public
- **Multiple file types**: Code, config, documents, images
- **Full metadata**: File sizes and modification dates
- **Typical project layout**: React/Vite project structure

This pattern is commonly seen in VS Code, WebStorm, and other IDEs.
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies folder expand/collapse functionality.
 */
export const InteractionTest: Story = {
  args: {
    onSelect: fn(),
    onToggle: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify file browser is rendered
    const fileBrowser = canvas.getByTestId('file-browser')
    await expect(fileBrowser).toBeInTheDocument()

    // Find and click on a folder to collapse it
    const srcNode = canvas.getByTestId('tree-node-src')
    await expect(srcNode).toBeInTheDocument()

    // Click to collapse
    await userEvent.click(srcNode)
    await expect(args.onToggle).toHaveBeenCalled()
    await expect(args.onSelect).toHaveBeenCalledWith('src', expect.any(Object))

    // Click a file
    const appFile = canvas.getByTestId('tree-node-app-tsx')
    await userEvent.click(appFile)
    await expect(args.onSelect).toHaveBeenCalledWith(
      'app-tsx',
      expect.any(Object),
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies folder toggle and file selection.',
      },
    },
  },
}

/**
 * File browser without icons.
 */
export const NoIcons: Story = {
  args: {
    showIcons: false,
    showSizes: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal view without file type icons. Focus on file names only.',
      },
    },
  },
}

/**
 * File browser with dates instead of sizes.
 */
export const WithDates: Story = {
  args: {
    showSizes: false,
    showDates: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows modification dates instead of file sizes.',
      },
    },
  },
}

/**
 * File browser with all metadata.
 */
export const FullMetadata: Story = {
  args: {
    showSizes: true,
    showDates: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete metadata display with both sizes and dates.',
      },
    },
  },
}

/**
 * Single expand mode (accordion-style).
 */
export const AccordionMode: Story = {
  args: {
    multiExpand: false,
    defaultExpanded: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Only one folder can be expanded at a time. Expanding a folder collapses others.',
      },
    },
  },
}

/**
 * Compact layout with smaller indentation.
 */
export const CompactLayout: Story = {
  args: {
    indentSize: 16,
    width: 280,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout with smaller indentation for narrow sidebars.',
      },
    },
  },
}

/**
 * Wide layout with larger indentation.
 */
export const WideLayout: Story = {
  args: {
    indentSize: 32,
    width: 450,
  },
  parameters: {
    docs: {
      description: {
        story: 'Wider layout with increased indentation for clarity.',
      },
    },
  },
}

/**
 * Limited depth display.
 */
export const LimitedDepth: Story = {
  args: {
    maxDepth: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree depth limited to 3 levels. Deeper items are hidden.',
      },
    },
  },
}

/**
 * All folders expanded by default.
 */
export const FullyExpanded: Story = {
  args: {
    defaultExpanded: [
      'src',
      'components',
      'button',
      'card',
      'assets',
      'public',
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'All folders expanded to show the complete tree structure.',
      },
    },
  },
}

/**
 * All folders collapsed by default.
 */
export const FullyCollapsed: Story = {
  args: {
    defaultExpanded: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'All folders collapsed. Click to expand and explore.',
      },
    },
  },
}

/**
 * Documentation navigation example.
 */
export const DocumentationNav: Story = {
  args: {
    width: 300,
    showSizes: false,
    showDates: false,
  },
  render: (args) => {
    const docsNodes: FileNode[] = [
      {
        id: 'getting-started',
        name: 'Getting Started',
        type: 'folder',
        children: [
          { id: 'intro', name: 'Introduction', type: 'document' },
          { id: 'installation', name: 'Installation', type: 'document' },
          { id: 'quick-start', name: 'Quick Start', type: 'document' },
        ],
      },
      {
        id: 'components',
        name: 'Components',
        type: 'folder',
        children: [
          {
            id: 'inputs',
            name: 'Inputs',
            type: 'folder',
            children: [
              { id: 'button', name: 'Button', type: 'document' },
              { id: 'text-field', name: 'TextField', type: 'document' },
              { id: 'checkbox', name: 'Checkbox', type: 'document' },
            ],
          },
          {
            id: 'layout',
            name: 'Layout',
            type: 'folder',
            children: [
              { id: 'box', name: 'Box', type: 'document' },
              { id: 'grid', name: 'Grid', type: 'document' },
              { id: 'stack', name: 'Stack', type: 'document' },
            ],
          },
        ],
      },
      {
        id: 'api-reference',
        name: 'API Reference',
        type: 'folder',
        children: [
          { id: 'hooks', name: 'Hooks', type: 'document' },
          { id: 'utilities', name: 'Utilities', type: 'document' },
        ],
      },
    ]

    return (
      <HierarchicalLayout
        {...args}
        nodes={docsNodes}
        defaultExpanded={['getting-started', 'components']}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Documentation sidebar navigation. Clean view without file metadata.',
      },
    },
  },
}

/**
 * Organization chart example.
 */
export const OrgChart: Story = {
  args: {
    width: 320,
    showSizes: false,
    showDates: false,
    showIcons: false,
  },
  render: (args) => {
    const orgNodes: FileNode[] = [
      {
        id: 'ceo',
        name: 'CEO - Jane Smith',
        type: 'folder',
        children: [
          {
            id: 'cto',
            name: 'CTO - John Doe',
            type: 'folder',
            children: [
              {
                id: 'eng-lead',
                name: 'Engineering Lead',
                type: 'folder',
                children: [
                  { id: 'dev-1', name: 'Senior Developer', type: 'file' },
                  { id: 'dev-2', name: 'Developer', type: 'file' },
                  { id: 'dev-3', name: 'Junior Developer', type: 'file' },
                ],
              },
              {
                id: 'qa-lead',
                name: 'QA Lead',
                type: 'folder',
                children: [{ id: 'qa-1', name: 'QA Engineer', type: 'file' }],
              },
            ],
          },
          {
            id: 'cmo',
            name: 'CMO - Sarah Johnson',
            type: 'folder',
            children: [
              { id: 'marketing-1', name: 'Marketing Manager', type: 'file' },
              { id: 'marketing-2', name: 'Content Writer', type: 'file' },
            ],
          },
          {
            id: 'cfo',
            name: 'CFO - Mike Brown',
            type: 'folder',
            children: [{ id: 'finance-1', name: 'Accountant', type: 'file' }],
          },
        ],
      },
    ]

    return (
      <HierarchicalLayout
        {...args}
        nodes={orgNodes}
        defaultExpanded={['ceo', 'cto']}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Organization chart showing company hierarchy. No icons for cleaner presentation.',
      },
    },
  },
}

/**
 * Tall scrollable tree.
 */
export const TallTree: Story = {
  args: {
    maxHeight: 300,
    defaultExpanded: [
      'src',
      'components',
      'button',
      'card',
      'assets',
      'public',
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shorter container height to demonstrate scrolling behavior.',
      },
    },
  },
}
