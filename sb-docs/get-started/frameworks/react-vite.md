# Storybook for React with Vite

Storybook for React & Vite is a framework that makes it easy to develop and test UI components in isolation for React applications built with Vite.

## Install

To install Storybook in an existing React project, run this command in your project's root directory:

```bash
npm create storybook@latest
```

You can then get started writing stories, running tests and documenting your components. For more control over the installation process, refer to the installation guide.

### Requirements

- React >= 16.8
- Vite >= 5

## Run Storybook

To run Storybook for a particular project, run the following:

```bash
npm run storybook
```

To build Storybook, run:

```bash
npm run build-storybook
```

You will find the output in the configured `outputDir` (default is `storybook-static`).

## FAQ

### How do I migrate from the React Webpack framework?

The `upgrade` command should prompt you to migrate to `@storybook/react-vite` when you run it:

```bash
npx storybook@latest upgrade
```

In case that auto-migration does not work for your project, refer to the manual installation instructions below.

### How do I manually install the React framework?

First, install the framework:

```bash
npm install --save-dev @storybook/react-vite
```

Then, update your `.storybook/main.js|ts` to change the framework property:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // ...
  // framework: '@storybook/react-webpack5', // Remove this
  framework: '@storybook/react-vite', // Add this
};

export default config;
```

## API

### Options

You can pass an options object for additional configuration if needed:

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {
      // ...
    },
  },
};

export default config;
```

#### `builder`

Type: `Record<string, any>`

Configure options for the framework's builder. For this framework, available options can be found in the Vite builder docs.
