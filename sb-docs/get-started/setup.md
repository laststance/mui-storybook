# Setup Storybook

Now that you've learned what stories are and how to browse them, let's demo working on one of your components.

Pick a simple component from your project, like a Button, and write a `.stories.js`, `.stories.ts`, or `.stories.svelte` file to go along with it. It might look something like this:

## YourComponent.stories.ts|tsx

```typescript
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { YourComponent } from './YourComponent';

//👇 This default export determines where your story goes in the story list
const meta = {
  component: YourComponent,
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
```

Go to your Storybook to view the rendered component. It's OK if it looks a bit unusual right now.

Depending on your technology stack, you also might need to configure the Storybook environment further.

## Render component styles

Storybook isn't opinionated about how you generate or load CSS. It renders whatever DOM elements you provide. But sometimes, things won't "look right" out of the box.

You may have to configure your CSS tooling for Storybook's rendering environment. Here are some setup guides for popular tools in the community:

- [Tailwind](https://storybook.js.org/recipes/tailwindcss/)
- [Material UI](https://storybook.js.org/recipes/@mui/material/)
- [Vuetify](https://storybook.js.org/recipes/vuetify/)
- [Styled Components](https://storybook.js.org/recipes/styled-components/)
- [Emotion](https://storybook.js.org/recipes/@emotion/styled/)
- [Sass](https://storybook.js.org/recipes/sass/)
- [Bootstrap](https://storybook.js.org/recipes/bootstrap/)
- [Less](https://storybook.js.org/recipes/less/)
- [Vanilla-extract](https://storybook.js.org/recipes/@vanilla-extract/css/)

Don't see the tool that you're looking for? Check out the styling and css page for more details.

## Configure Storybook for your stack

Storybook comes with a permissive default configuration. It attempts to customize itself to fit your setup. But it's not foolproof.

Your project may have additional requirements before components can be rendered in isolation. This warrants customizing configuration further. There are three broad categories of configuration you might need.

### Build configuration like Webpack and Babel

If you see errors on the CLI when you run the `yarn storybook` command, you likely need to make changes to Storybook's build configuration. Here are some things to try:

- **Presets** bundle common configurations for various technologies into Storybook. In particular, presets exist for Create React App and Ant Design.
- Specify a custom **Babel configuration** for Storybook. Storybook automatically tries to use your project's config if it can.
- Adjust the **Webpack configuration** that Storybook uses. Try patching in your own configuration if needed.

### Runtime configuration

If Storybook builds but you see an error immediately when connecting to it in the browser, in that case, chances are one of your input files is not compiling/transpiling correctly to be interpreted by the browser. Storybook supports evergreen browsers, but you may need to check the Babel and Webpack settings (see above) to ensure your component code works correctly.

### Component context

If a particular story has a problem rendering, often it means your component expects a specific environment is available to the component.

A common frontend pattern is for components to assume that they render in a specific "context" with parent components higher up the rendering hierarchy (for instance, theme providers).

Use **decorators** to "wrap" every story in the necessary context providers. The `.storybook/preview.js|ts` file allows you to customize how components render in Canvas, the preview iframe. See how you can wrap every component rendered in Storybook with Styled Components `ThemeProvider`, Vue's Fontawesome, or with an Angular theme provider component in the example below.

### .storybook/preview.tsx

```typescript
import React from 'react';

// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Preview } from '@storybook/your-framework';

import { ThemeProvider } from 'styled-components';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="default">
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
```

## Load assets and resources

We recommend serving external resources and assets requested in your components statically with Storybook. It ensures that assets are always available to your stories. Read our documentation to learn how to host static files with Storybook.
