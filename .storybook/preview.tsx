import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

import { DesignTokenProvider, designToken } from '../src/designToken'
import { lightTheme, darkTheme } from '../src/themes'

import muiBrandTheme from './MuiBrandTheme'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    // ════════════════════════════════════════════════════════════
    // Accessibility testing configuration
    // ════════════════════════════════════════════════════════════
    a11y: {
      // Set to 'todo' to log a11y violations without failing tests
      // Valid values: 'error' (fail), 'todo' (warn only), 'off' (disable)
      // This allows CI to pass while still surfacing issues for review
      test: 'todo',
    },
    docs: {
      theme: muiBrandTheme,
      autodocs: true,
      codePanel: true, // Show source code panel on Canvas (story) pages
      canvas: {
        sourceState: 'hidden',
      },
    },
    options: {
      storySort: {
        order: [
          'Design System',
          [
            'Introduction',
            'Getting Started',
            'Theming',
            'Design Tokens',
            'Typography',
            'Colors',
            'Spacing',
            'Breakpoints',
            'Customization',
            'Layout Complete',
            '*',
          ],
          'Inputs',
          'Data Display',
          'Feedback',
          'Surfaces',
          'Navigation',
          'Layout',
          'Utils',
          'Examples',
          'Design Tokens',
          'Layout Complete',
          [
            'LayoutPatternsGallery',
            'Layouts',
            [
              // Column-Based (5)
              'SingleColumn',
              'TwoColumn',
              'ThreeColumn',
              'LeftRight',
              'MultiColumn',
              // Grid-Based (4)
              'Grid',
              'Masonry',
              'BrokenGrid',
              'NonGrid',
              // Scroll/Flow (4)
              'FullScreen',
              'CardBased',
              'InfiniteScroll',
              'Parallax',
              // Container/Flow (5)
              'Stack',
              'Ribbon',
              'SplitScreen',
              'OffCanvas',
              'LiquidResponsive',
              // Data Display (6)
              'Tabbed',
              'MultiPanel',
              'Timeline',
              'Catalog',
              'Comparison',
              'FormBased',
              // Special (6)
              'FAB',
              'Overlay',
              'Circular',
              'Canvas',
              'Hierarchical',
              'Scattered',
            ],
          ],
          '*',
        ],
      },
    },
    layout: 'centered',
    // ════════════════════════════════════════════════════════════
    // Backgrounds addon - completely disabled
    // MUI ThemeProvider handles background colors via theme switching
    // ════════════════════════════════════════════════════════════
    backgrounds: {
      disable: true, // Disable the feature (correct v10 API)
      options: {}, // Empty options = hide toolbar dropdown
      grid: {
        disable: true, // Also disable the grid feature
      },
    },
    // ════════════════════════════════════════════════════════════
    // Controls configuration
    // ════════════════════════════════════════════════════════════
    controls: {
      expanded: true, // Expand object/array controls
      sort: 'requiredFirst', // Required props first, then alphabetical
    },
  },

  // ════════════════════════════════════════════════════════════
  // Global argTypes for common MUI patterns
  // ════════════════════════════════════════════════════════════
  argTypes: {
    // Hide internal/advanced props
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    classes: { table: { disable: true } },

    // Disable sx (too complex for controls)
    sx: {
      control: false,
      description: 'The system prop for defining custom styles.',
      table: {
        category: 'Advanced',
        type: { summary: 'SxProps<Theme>' },
      },
    },

    // Event handlers - use actions, not controls
    onClick: {
      action: 'clicked',
      control: false,
      table: { category: 'Events' },
    },
    onChange: {
      action: 'changed',
      control: false,
      table: { category: 'Events' },
    },
    onClose: {
      action: 'closed',
      control: false,
      table: { category: 'Events' },
    },
    onOpen: { action: 'opened', control: false, table: { category: 'Events' } },
    onFocus: {
      action: 'focused',
      control: false,
      table: { category: 'Events' },
    },
    onBlur: {
      action: 'blurred',
      control: false,
      table: { category: 'Events' },
    },
    onSubmit: {
      action: 'submitted',
      control: false,
      table: { category: 'Events' },
    },
  },

  decorators: [
    // Wrapper to ensure proper height and padding for components
    (Story) => (
      <Box
        sx={{
          minHeight: '100px',
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Story />
      </Box>
    ),
    (Story) => (
      <DesignTokenProvider theme={designToken}>
        <Story />
      </DesignTokenProvider>
    ),
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
}

export default preview
