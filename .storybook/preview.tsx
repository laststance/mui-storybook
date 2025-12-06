import type { Preview } from '@storybook/react-vite'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { lightTheme, darkTheme } from '../src/themes'
import { DesignTokenProvider, designToken } from '../src/designToken'
import muiBrandTheme from './MuiBrandTheme'

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
