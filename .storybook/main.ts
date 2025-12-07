import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  // Custom CSS for manager UI - fixes "Create a new story" button icon visibility
  managerHead: (head) => `
    ${head}
    <style>
      /* Fix: "Create a new story" button icon visibility */
      /* The icon was Sky-700 on Sky-600 background - now white for contrast */
      button[aria-label="Create a new story"] svg path {
        fill: #ffffff !important;
      }
    </style>
  `,
}

export default config
