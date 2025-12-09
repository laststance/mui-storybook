import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx', // MDX documentation files
    '../src/**/*.stories.@(ts|tsx)', // Story files
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
    '@storybook/addon-coverage',
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true,
          docs: true,
        },
        experimentalFormat: 'markdown',
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: ['./static'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  features: {
    experimentalComponentsManifest: true,
  },

  // Custom CSS for manager UI - fixes button visibility and contrast issues
  managerHead: (head) => `
    ${head}
    <style>
      /* Fix: "Create a new story" button icon visibility */
      /* The icon was Sky-700 on Sky-600 background - now white for contrast */
      button[aria-label="Create a new story"] svg path {
        fill: #ffffff !important;
      }

      /* Fix #13: Control panel button readability */
      /* Improve contrast for Reset controls and other control buttons */
      [id*="panel-tab-content"] button,
      .docblock-argstable button,
      [class*="ActionButton"] {
        background-color: #0284c7 !important; /* Sky-600 - darker for better contrast */
        color: #ffffff !important;
        border: 1px solid #0369a1 !important; /* Sky-700 border */
      }

      [id*="panel-tab-content"] button:hover,
      .docblock-argstable button:hover,
      [class*="ActionButton"]:hover {
        background-color: #0369a1 !important; /* Sky-700 on hover */
      }

      /* Ensure control panel icons are visible */
      [id*="panel-tab-content"] button svg,
      .docblock-argstable button svg {
        color: #ffffff !important;
      }

      [id*="panel-tab-content"] button svg path,
      .docblock-argstable button svg path {
        fill: #ffffff !important;
      }
    </style>
  `,
}

export default config
