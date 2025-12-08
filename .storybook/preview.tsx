import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

import { DesignTokenProvider, designToken } from '../src/designToken'
import { lightTheme, darkTheme } from '../src/themes'

import muiBrandTheme from './MuiBrandTheme'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    docs: {
      theme: muiBrandTheme,
      autodocs: true,
      canvas: {
        sourceState: 'shown',
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
          '*',
        ],
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
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
