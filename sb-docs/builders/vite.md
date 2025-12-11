# Vite

Storybook Vite builder bundles your components and stories with Vite, a fast ESM bundler.

- For applications built with Vite: it allows reusing the existing configuration in Storybook.
- For applications built with Webpack: it provides faster startup and refresh times, with the disadvantage that your component's execution environment differs from your application.

## Setup

If you ran `npx storybook@latest init` to include Storybook in your Vite application, the builder is already installed and configured for you. If you want, you can also opt into it manually.

Run the following command to install the builder:

```bash
npm install @storybook/builder-vite --save-dev
```

Update your Storybook configuration (in `.storybook/main.js|ts`) to include the builder:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
};

export default config;
```

## Configuration

Out of the box, Storybook's Vite builder includes a set of configuration defaults for the supported frameworks, which are merged alongside your existing configuration file. For an optimal experience when using the Vite builder, we recommend applying any configuration directly inside Vite's configuration file (i.e., `vite.config.js|ts`).

When Storybook loads, it automatically merges the configuration into its own. However, since different projects may have specific requirements, you may need to provide a custom configuration for Storybook. In such cases, you can modify your configuration file (`.storybook/main.js|ts`) and add the `viteFinal` configuration function:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
};

export default config;
```

### Environment-based configuration

If you need to customize the builder's configuration and apply specific options based on your environment:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      // Your environment configuration here
    });
  },
};

export default config;
```

### Override the default configuration

By default, the Vite builder in Storybook searches for the Vite configuration file in the root directory of your Storybook project. However, you can customize it to look for the configuration file in a different location:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: '../customVite.config.js',
      },
    },
  },
};

export default config;
```

If you do not want Storybook to load the Vite configuration file automatically, you can use the `viteConfigPath` option to point to a non-existent file.

## Troubleshooting

### Migrating from Webpack

Vite generally handles more use cases out of the box than Webpack. For example, loading styles just works for most projects. So, when migrating a Webpack-based project to Vite, you may find that you don't need all of your previous configuration.

We recommend starting with no Storybook-specific Vite configuration and only adding what you determine your project actually requires.

### Working directory not being detected

By default, the Vite builder enables Vite's `server.fs.strict` option for increased security, defining the project's `root` to Storybook's configuration directory. If you need to override it, you can use the `viteFinal` function and adjust it.

### ArgTypes are not generated automatically

Currently, automatic argType inference is only available for React, Vue 3, and Svelte (JSDocs only). With React, the Vite builder defaults to `react-docgen`, a faster alternative to `react-docgen-typescript` for parsing React components. If you run into any issues, you can revert to `react-docgen-typescript`:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite',
  },
  typescript: {
    // Enables the `react-docgen-typescript` parser.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

### Interaction tests not working as expected

If you are migrating from a Webpack-based project, such as CRA, to Vite, and you are interaction testing, you may run into a situation where your tests fail to execute notifying you that the `window` object is not defined. To resolve this issue, you can create a `preview-head.html` file in your Storybook configuration directory and include the following:

```html
<!-- .storybook/preview-head.html -->
<script>
  window.global = window;
</script>
```
