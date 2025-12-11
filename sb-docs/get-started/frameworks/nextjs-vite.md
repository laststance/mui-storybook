# Storybook for Next.js with Vite

Storybook for Next.js (Vite) is the **recommended** framework for developing and testing UI components in isolation for Next.js applications. It uses Vite for faster builds, better performance and Storybook Testing support.

## Install

To install Storybook in an existing Next.js project, run this command in your project's root directory:

```bash
npm create storybook@latest
```

### Requirements

- Next.js >= 14.1
- Vite >= 5

## Choose between Vite and Webpack

This Vite-based framework offers several advantages over the Webpack-based `@storybook/nextjs` framework, and is the recommended option:

- **Faster builds** - Vite's build system is significantly faster than Webpack
- **Modern tooling** - Uses the latest build tools and optimizations
- **Better test support** - Full support for the Vitest addon and other testing features
- **Simpler configuration** - No need for Babel or complex Webpack configurations
- **Better development experience** - Faster Hot Module Replacement and dev server startup

Storybook will automatically detect your project and select the `nextjs-vite` framework **unless** your project has custom Webpack or Babel configurations. If you have custom configurations, Storybook will ask you which framework to install.

Choose `nextjs-vite` if you're willing to migrate existing Babel or Webpack configurations to Vite. Choose `nextjs` (Webpack 5) if you need to keep your existing Webpack/Babel setup.

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

## Configure

Storybook for Next.js with Vite supports many Next.js features including:

- Image optimization
- Font optimization
- Routing and navigation
- `next/head`
- Absolute imports
- Styling
- Module mocking
- React Server Component (experimental)

### Next.js's Image component

This framework allows you to use Next.js's `next/image` with no configuration.

### Next.js font optimization

`next/font` is partially supported in Storybook. The packages `next/font/google` and `next/font/local` are supported.

The Vite-based framework automatically handles font path mapping, so you don't need to configure `staticDirs` for fonts like you would with the Webpack-based framework.

### Next.js routing

Next.js's router is automatically stubbed for you so that when the router is interacted with, all of its interactions are automatically logged to the Actions panel.

### Next.js navigation

`next/navigation` can only be used in components/pages in the `app` directory.

#### Set `nextjs.appDirectory` to `true`

If your story imports components that use `next/navigation`, you need to set the parameter `nextjs.appDirectory` to `true`:

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NavigationBasedComponent from './NavigationBasedComponent';

const meta = {
  component: NavigationBasedComponent,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof NavigationBasedComponent>;
export default meta;
```

### Styling

#### Sass/Scss

Global Sass/Scss stylesheets are supported without any additional configuration.

#### CSS/Sass/Scss Modules

CSS modules work as expected.

#### PostCSS

Next.js lets you customize PostCSS config. Thus this framework will automatically handle your PostCSS config for you.

This allows for cool things like zero-config Tailwind!

### Imports

#### Absolute imports

Absolute imports from the root directory are supported.

#### Module aliases

Module aliases are also supported.

#### Subpath imports

As an alternative to module aliases, you can use subpath imports to import modules.

### Mocking modules

Components often depend on modules that are imported into the component file. When rendering those components in Storybook or testing them, you may want to mock those modules to control and assert their behavior.

#### Built-in mocked modules

This framework provides mocks for many of Next.js' internal modules:

1. `@storybook/nextjs-vite/cache.mock`
2. `@storybook/nextjs-vite/headers.mock`
3. `@storybook/nextjs-vite/navigation.mock`
4. `@storybook/nextjs-vite/router.mock`

### React Server Components (RSC)

(Experimental)

If your app uses React Server Components (RSC), Storybook can render them in stories in the browser.

To enable this set the `experimentalRSC` feature flag in your `.storybook/main.js|ts` config:

```typescript
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  // ...
  features: {
    experimentalRSC: true,
  },
};

export default config;
```

## FAQ

### How do I migrate from the `nextjs` (Webpack 5) addon?

#### Automatic migration

Storybook provides a migration tool for migrating to this framework from the Webpack-based Next.js framework:

```bash
npx storybook automigrate nextjs-to-nextjs-vite
```

This automigration tool performs the following actions:

1. Updates `package.json` files to replace `@storybook/nextjs` with `@storybook/nextjs-vite`
2. Updates `.storybook/main.js|ts` to change the framework property
3. Scans and updates import statements in your story files and configuration files

#### Manual migration

First, install the framework:

```bash
npm install --save-dev @storybook/nextjs-vite
```

Then, update your `.storybook/main.js|ts` to change the framework property:

```typescript
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/nextjs-vite',
};

export default config;
```

### Should I use the Vite or Webpack version?

We recommend using `@storybook/nextjs-vite` (this framework) for most projects because it offers:

- Faster builds and development server startup
- Better support for modern testing features like the Vitest addon
- Simpler configuration without Babel
- Better developer experience with faster HMR

However, if your project has custom Webpack configurations that are incompatible with Vite, or you need specific Webpack features, you should use `@storybook/nextjs` (Webpack 5) instead.

## API

### Modules

The `@storybook/nextjs-vite` package exports several modules that enable you to mock Next.js's internal behavior.

#### `@storybook/nextjs-vite/cache.mock`

This module exports mocked implementations of the `next/cache` module's exports.

#### `@storybook/nextjs-vite/headers.mock`

This module exports writable mocked implementations of the `next/headers` module's exports.

#### `@storybook/nextjs-vite/navigation.mock`

This module exports mocked implementations of the `next/navigation` module's exports.

#### `@storybook/nextjs-vite/router.mock`

This module exports mocked implementations of the `next/router` module's exports.

### Parameters

This framework contributes the following parameters to Storybook, under the `nextjs` namespace:

#### `appDirectory`

Type: `boolean`
Default: `false`

If your story imports components that use `next/navigation`, you need to set this to `true`.

#### `navigation`

The router object that is passed to the `next/navigation` context.

#### `router`

The router object that is passed to the `next/router` context.
