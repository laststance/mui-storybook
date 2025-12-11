# Configure Storybook

Storybook is configured via a folder called `.storybook`, which contains various configuration files.

Note that you can change the folder that Storybook uses by setting the `-c` flag to your `storybook dev` and `storybook build` CLI commands.

## Configure your Storybook project

Storybook's main configuration (i.e., the `main.ts`) defines your Storybook project's behavior, including the location of your stories, the addons you use, feature flags and other project-specific settings. This file should be in the `.storybook` folder in your project's root directory.

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

This configuration file is a preset and, as such, has a powerful interface, which can be further customized.

| Configuration element | Description |
| --- | --- |
| `stories` | The array of globs that indicates the location of your story files, relative to `main.js` |
| `staticDirs` | Sets a list of directories of static files to be loaded by Storybook |
| `addons` | Sets the list of addons loaded by Storybook |
| `typescript` | Configures how Storybook handles TypeScript files |
| `framework` | Configures Storybook based on a set of framework-specific settings |
| `core` | Configures Storybook's internal features |
| `docs` | Configures Storybook's auto-generated documentation |
| `features` | Enables Storybook's additional features |
| `refs` | Configures Storybook composition |
| `logLevel` | Configures Storybook's logs in the browser terminal |
| `webpackFinal` | Customize Storybook's Webpack setup |
| `viteFinal` | Customize Storybook's Vite setup when using the vite builder |
| `env` | Defines custom Storybook environment variables |
| `build` | Optimizes Storybook's production build for performance |

## Configure story loading

By default, Storybook will load stories from your project based on a glob (pattern matching string) in `.storybook/main.ts` that matches all files in your project with extension `.stories.*`. The intention is for you to colocate a story file along with the component it documents.

```
└── components
    ├── Button.js
    └── Button.stories.js
```

If you want to use a different naming convention, you can alter the glob using the syntax supported by picomatch.

### With a configuration object

You can customize your Storybook configuration to load your stories based on a configuration object:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: [
    {
      // Sets the directory containing your stories
      directory: '../packages/components',
      // Storybook will load all files that match this glob
      files: '*.stories.*',
      // Used when generating automatic titles for your stories
      titlePrefix: 'MyComponents',
    },
  ],
};

export default config;
```

### With a directory

You can also simplify your Storybook configuration and load the stories using a directory:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  // Storybook will load all existing stories within the MyStories folder
  stories: ['../packages/MyStories'],
};

export default config;
```

### With a custom implementation

You can also adjust your Storybook configuration and implement custom logic to load your stories:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';
import type { StoriesEntry } from 'storybook/internal/types';

async function findStories(): Promise<StoriesEntry[]> {
  // your custom logic returns a list of files
}

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: async (list: StoriesEntry[]) => [
    ...list,
    // Add your found stories to the existing list of story files
    ...(await findStories()),
  ],
};

export default config;
```

### Known limitations

Because of the way stories are currently indexed in Storybook, loading stories on demand has a couple of minor limitations:

- CSF formats from version 1 to version 3 are supported.
- Custom `storySort` functions are allowed based on a restricted API.

## Configure story rendering

To control the way stories are rendered and add global decorators and parameters, create a `.storybook/preview.ts` file. This is loaded in the Canvas UI, the "preview" iframe that renders your components in isolation. Use `preview.ts` for global code (such as CSS imports or JavaScript mocks) that applies to all stories.

The `preview.ts` file can be an ES module and export the following keys:

- `decorators` - an array of global decorators
- `parameters` - an object of global parameters
- `globalTypes` - definition of globalTypes

## Configure Storybook's UI

To control the behavior of Storybook's UI (the "manager"), you can create a `.storybook/manager.js` file.

This file does not have a specific API but is the place to set UI options and to configure Storybook's theme.
