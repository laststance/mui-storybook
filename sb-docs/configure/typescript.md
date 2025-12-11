# TypeScript

Storybook provides an integrated TypeScript experience, including zero-configuration setup and built-in types for APIs, addons, and stories.

## Configure Storybook with TypeScript

Storybook's configuration file (i.e., `main.ts`) is defined as an ESM module written in TypeScript, providing you with the baseline configuration to support your existing framework while enabling you stricter type-checking and autocompletion in your editor.

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // Required
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public'],
};

export default config;
```

### Extending the default configuration

Out of the box, Storybook is built to work with a wide range of third-party libraries, enabling you to safely access and document metadata (e.g., props) for your components without any additional configuration. It relies on `react-docgen`, a fast and highly customizable parser to process TypeScript files to infer the component's metadata and generate types automatically.

| Option | Description |
| --- | --- |
| `check` | Available for Webpack-based projects. Enables type checking within Storybook |
| `checkOptions` | Requires the `check` option to be enabled. Configures the `fork-ts-checker-webpack-plugin` plugin |
| `reactDocgen` | Configures the TypeScript parser used by Storybook. Available options: `react-docgen` (default), `react-docgen-typescript`, `false` |
| `reactDocgenTypescriptOptions` | Requires the `reactDocgen` option to be `react-docgen-typescript`. Configures the `react-docgen-typescript-plugin` plugin per builder |
| `skipCompiler` | Disables parsing Typescript files through the compiler |

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
};

export default config;
```

## Write stories with TypeScript

Storybook provides zero-config TypeScript support, allowing you to write stories using this language without additional configuration. You can use this format for improved type safety and code completion.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Throws a type error if the args don't match the component props
export const Primary: Story = {
  args: {
    primary: true,
  },
};
```

The example above uses the power of TypeScript in combination with the exported generic types (`Meta` and `StoryObj`) to tell Storybook how to infer the component's metadata and the type of the component's inputs (e.g., props). This can greatly improve the developer experience by letting your IDE show you what properties are injected by Storybook.

### TypeScript 4.9 support

Assuming that you're working on a project that uses TypeScript 4.9+, you can update your component stories to use the new `satisfies` operator to ensure stricter type checking for your component stories:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>; // Satisfies operator being used for stricter type checking.

export default meta;
```

Now, when you define a story or update an existing one, you'll automatically get notified that you're missing a required arg. However, you're not limited to using the `satisfies` operator at the component level. If you need, you can also use it at the story level:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example = {
  args: {
    primary: true,
    label: 'Button',
  },
} satisfies Story;
```

## Troubleshooting

### The `satisfies` operator is not working as expected

Out of the box, Storybook supports the `satisfies` operator for almost every framework already using TypeScript version 4.9 or higher. However, due to the constraints of the Angular and Web Components framework, you might run into issues when applying this operator for additional type safety.

### Storybook doesn't create the required types for external packages

If your project relies on a third-party library and the expected types are not being generated, you can adjust the `reactDocgen` configuration option to use `react-docgen-typescript` instead:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Filter out third-party props from node_modules except @mui packages.
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

### The types are not being generated for my component

If you're working with a React project, type inference is automatically enabled for your components using the `react-docgen` library for improved build times and type safety. However, you may run into a situation where some options may not work as expected (e.g., Enums, React's `forwardRef`). To solve this, you can update the `typescript` configuration option to use `react-docgen-typescript` instead:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {},
  },
};

export default config;
```
