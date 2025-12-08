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
          ['Introduction', 'Getting Started', 'Theming', 'Design Tokens', 'Typography', 'Colors', 'Spacing', 'Breakpoints', 'Customization', '*'],
          'Components',
          ['Inputs', 'Data Display', 'Feedback', 'Surfaces', 'Navigation', 'Layout', 'Utils', '*'],
          'Examples',
          '*',
        ],
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
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