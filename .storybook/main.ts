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
    '@chromatic-com/storybook',
    'storybook-i18n',
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

      /* Fix: Boolean control "Set boolean" button text color */
      /* Target all buttons in Controls addon panel */
      [class*="BooleanControl"] button,
      [class*="Control"] button,
      [data-testid*="control"] button {
        color: #ffffff !important;
      }
    </style>
  `,

  // Custom CSS for preview/docs iframe - fixes Control button visibility in docs pages
  previewHead: (head) => `
    ${head}
    <style>
      /* Fix: Controls panel button text contrast in docs pages */
      /* Target all control buttons in the docs iframe (Set boolean, Set object, etc.) */
      .docblock-argstable button,
      [class*="Control"] button,
      [class*="ObjectControl"] button,
      [class*="ArrayControl"] button,
      [class*="BooleanControl"] button,
      button[class*="Button"] {
        color: #ffffff !important;
      }

      /* Ensure button icons are also visible */
      .docblock-argstable button svg,
      [class*="Control"] button svg {
        color: #ffffff !important;
      }

      .docblock-argstable button svg path,
      [class*="Control"] button svg path {
        fill: #ffffff !important;
      }
    </style>
  `,
}

export default config
