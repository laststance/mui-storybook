import type { Preview } from '@storybook/react-vite'
import { CssBaseline } from '@mui/material'
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
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#fff',
        },

        dark: {
          name: 'dark',
          value: 'rgb(10, 25, 41)',
        },

        twitter: {
          name: 'twitter',
          value: '#00aced',
        },

        facebook: {
          name: 'facebook',
          value: '#3b5998',
        }
      }
    },
  },

  decorators: [
    (Story) => (
      <DesignTokenProvider theme={designToken}>
        <CssBaseline />
        <Story />
      </DesignTokenProvider>
    ),
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
}

export default preview
