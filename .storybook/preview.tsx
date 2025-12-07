import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

import { DesignTokenProvider, designToken } from '../src/designToken'
import { lightTheme, darkTheme } from '../src/themes'

import muiBrandTheme from './MuiBrandTheme'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    docs: {
      theme: muiBrandTheme,
    },
    options: {
      storySort: {
        order: ['Default'],
      },
    },
  },

  decorators: [
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
