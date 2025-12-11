# Storybook for Next.js with Webpack

Storybook for Next.js (Webpack) is a framework that makes it easy to develop and test UI components in isolation for Next.js applications using Webpack 5.

> **Note**: We recommend using `@storybook/nextjs-vite` for most Next.js projects. The Vite-based framework is faster, more modern, and offers better support for testing features.
>
> Use this Webpack-based framework (`@storybook/nextjs`) only if:
> - Your project has custom Webpack configurations that are incompatible with Vite
> - Your project has custom Babel configurations that require Webpack
> - You need specific Webpack features not available in Vite

## Install

To install Storybook in an existing Next.js project, run this command in your project's root directory:

```bash
npm create storybook@latest
```

The command will prompt you to choose between this framework and `@storybook/nextjs-vite`. We recommend the Vite-based framework.

### Requirements

- Next.js >= 14.1
- Webpack 5

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

Storybook for Next.js with Webpack supports many Next.js features including:

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

#### Local images

Local images are supported.

```jsx
import Image from 'next/image';
import profilePic from '../public/me.png';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

#### Remote images

Remote images are also supported.

```jsx
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image src="/me.png" alt="Picture of the author" width={500} height={500} />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

### Next.js font optimization

`next/font` is partially supported in Storybook. The packages `next/font/google` and `next/font/local` are supported.

#### `next/font/google`

You don't have to do anything. `next/font/google` is supported out of the box.

#### `next/font/local`

For local fonts you have to define the `src` property. The path is relative to the directory where the font loader function is called.

### Next.js routing

Next.js's router is automatically stubbed for you so that when the router is interacted with, all of its interactions are automatically logged to the Actions panel.

You should only use `next/router` in the `pages` directory. In the `app` directory, it is necessary to use `next/navigation`.

#### Overriding defaults

Per-story overrides can be done by adding a `nextjs.router` property onto the story parameters:

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';

import RouterBasedComponent from './RouterBasedComponent';

const meta = {
  component: RouterBasedComponent,
} satisfies Meta<typeof RouterBasedComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/profile/[id]',
        asPath: '/profile/1',
        query: {
          id: '1',
        },
      },
    },
  },
};
```

### Next.js navigation

`next/navigation` can only be used in components/pages in the `app` directory.

#### Set `nextjs.appDirectory` to `true`

If your story imports components that use `next/navigation`, you need to set the parameter `nextjs.appDirectory` to `true`:

```typescript
import type { Meta, StoryObj } from '@storybook/nextjs';

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

Global Sass/Scss stylesheets are supported without any additional configuration. Just import them into `.storybook/preview.js|ts`:

```typescript
import '../styles/globals.scss';
```

#### CSS/Sass/Scss Modules

CSS modules work as expected.

```jsx
import styles from './Button.module.css';

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```

#### Styled JSX

The built in CSS-in-JS solution for Next.js is styled-jsx, and this framework supports that out of the box too, zero config.

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

1. `@storybook/nextjs/cache.mock`
2. `@storybook/nextjs/headers.mock`
3. `@storybook/nextjs/navigation.mock`
4. `@storybook/nextjs/router.mock`

### React Server Components (RSC)

(Experimental)

If your app uses React Server Components (RSC), Storybook can render them in stories in the browser.

To enable this set the `experimentalRSC` feature flag in your `.storybook/main.js|ts` config:

```typescript
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // ...
  features: {
    experimentalRSC: true,
  },
};

export default config;
```

## API

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
