# Parameters

Parameters are a set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons.

> Available parameters are listed in the parameters API reference.

For example, let's customize the backgrounds feature via a parameter. We'll use `parameters.backgrounds` to define which backgrounds appear in the backgrounds toolbar when a story is selected.

## Story parameters

We can set a parameter for a single story with the `parameters` key on a CSF export:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  // Story-level parameters
  parameters: {
    backgrounds: {
      options: {
        red: { name: 'Red', value: '#f00' },
        green: { name: 'Green', value: '#0f0' },
        blue: { name: 'Blue', value: '#00f' },
      },
    },
  },
};
```

## Component parameters

We can set the parameters for all stories of a component using the `parameters` key on the default CSF export:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  // Creates specific parameters at the component level
  parameters: {
    backgrounds: {
      options: {},
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

## Global parameters

We can also set the parameters for **all stories** via the `parameters` export of your `.storybook/preview.js|ts` file (this is the file where you configure all stories):

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#fff' },
        dark: { name: 'Dark', value: '#333' },
      },
    },
  },
};

export default preview;
```

Setting a global parameter is a common way to configure addons. With backgrounds, you configure the list of backgrounds that every story can render in.

## Rules of parameter inheritance

The way the global, component and story parameters are combined is:

- More specific parameters take precedence (so a story parameter overwrites a component parameter which overwrites a global parameter).
- Parameters are **merged**, so keys are only ever overwritten and never dropped.

The merging of parameters is important. This means it is possible to override a single specific sub-parameter on a per-story basis while retaining most of the parameters defined globally.

If you are defining an API that relies on parameters (e.g., an addon) it is a good idea to take this behavior into account.
