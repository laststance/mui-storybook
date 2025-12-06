import type { Preview } from '@storybook/react'
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
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'dark',
          value: 'rgb(10, 25, 41)',
        },
        {
          name: 'twitter',
          value: '#00aced',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
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
}

export default preview
