# Styling and CSS

There are many ways to include CSS in a web application, and correspondingly there are many ways to include CSS in Storybook. Usually, it is best to try and replicate what your application does with styling in Storybook's configuration.

## CSS

Storybook supports importing CSS files in a few different ways. Storybook will inject these tags into the preview iframe where your components render, not the Storybook Manager UI. The best way to import CSS depends on your project's configuration and your preferences.

### Import bundled CSS (Recommended)

All Storybooks are pre-configured to recognize imports for CSS files. To add global CSS for all your stories, import it in `.storybook/preview.ts`. These files will be subject to HMR, so you can see your changes without restarting your Storybook server.

```typescript
import type { Preview } from '@storybook/your-framework';

import '../src/styles/global.css';

const preview: Preview = {
  parameters: {},
};

export default preview;
```

If your component files import their CSS files, this will work too. However, if you're using CSS processor tools like Sass or Postcss, you may need some more configuration.

### Include static CSS

If you have a global CSS file that you want to include in all your stories, you can import it in `.storybook/preview-head.html`. However, these files will not be subject to HMR, so you'll need to restart your Storybook server to see your changes.

```html
<!-- Loads a font from a CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
  rel="stylesheet"
/>
<!-- Load your CSS file -->
<link rel="stylesheet" href="path/to/your/styles.css" />
```

## CSS modules

### Vite

Vite comes with CSS modules support out-of-the-box. If you have customized the CSS modules configuration in your `vite.config.js` this will automatically be applied to your Storybook as well.

### Webpack

Using `@storybook/nextjs`? Storybook recreates your Next.js configuration, so you can use CSS modules in your stories without any extra configuration.

If you're using Webpack and want to use CSS modules, you'll need some extra configuration. We recommend installing `@storybook/addon-styling-webpack` to help you configure these tools.

## PostCSS

### Vite

Vite comes with PostCSS support out-of-the-box. If you have customized the PostCSS configuration in your `vite.config.js` this will automatically be applied to your Storybook as well.

### Webpack

Using `@storybook/nextjs`? Storybook recreates your Next.js configuration, so you can use PostCSS in your stories without any extra configuration.

If you're using Webpack and want to use PostCSS, you'll need some extra configuration. We recommend installing `@storybook/addon-styling-webpack` to help you configure these tools.

## CSS pre-processors

### Vite

Vite comes with Sass, Less, and Stylus support out-of-the-box.

### Webpack

Using `@storybook/nextjs`? Storybook recreates your Next.js configuration, so you can use Sass in your stories without any extra configuration.

If you're using Webpack and want to use Sass or less, you'll need some extra configuration. We recommend installing `@storybook/addon-styling-webpack` to help you configure these tools. Or if you'd prefer, you can customize Storybook's webpack configuration yourself to include the appropriate loader(s).

## CSS-in-JS

CSS-in-JS libraries are designed to use basic JavaScript, and they often work in Storybook without any extra configuration. Some libraries expect components to render in a specific rendering "context" (for example, to provide themes), which can be accomplished with `@storybook/addon-themes`'s `withThemeFromJSXProvider` decorator.

## Adding webfonts

### `.storybook/preview-head.html`

If you need webfonts to be available, you may need to add some code to the `.storybook/preview-head.html` file. We recommend including any assets with your Storybook if possible, in which case you likely want to configure the static file location.

### `.storybook/preview.ts`

If you're using something like `fontsource` for your fonts, you can import the needed css files in your `.storybook/preview.ts` file.
