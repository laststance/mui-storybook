# Parameters

Parameters are static metadata used to configure your stories and addons in Storybook. They are specified at the story, meta (component), project (global) levels.

## Story parameters

Parameters specified at the story level apply to that story only:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  // 👇 Story-level parameters
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

## Meta parameters

Parameters specified in a CSF file's meta configuration apply to all stories in that file:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  //👇 Creates specific parameters at the component level
  parameters: {
    backgrounds: {
      options: {},
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

## Project parameters

Parameters specified at the project (global) level apply to all stories in your Storybook:

```typescript
// .storybook/preview.ts
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

## Available parameters

### `layout`

Type: `'centered' | 'fullscreen' | 'padded'`

Default: `'padded'`

Specifies how the canvas should lay out the story:

- **centered**: Center the story within the canvas
- **padded**: (default) Add padding to the story
- **fullscreen**: Show the story as-is, without padding

### `options.storySort`

Type: `StorySortConfig | StorySortFn`

Specifies the order in which stories are displayed in the Storybook UI.

```typescript
type StorySortConfig = {
  includeNames?: boolean;
  locales?: string;
  method?: 'alphabetical' | 'alphabetical-by-kind' | 'custom';
  order?: string[];
};
```

Configuration options:

- **includeNames**: Whether to include the story name in the sorting algorithm. Defaults to `false`.
- **locales**: The locale to use when sorting stories. Defaults to your system locale.
- **method**: The sorting method to use. Defaults to `alphabetical`.
- **order**: Stories in the specified order will be displayed first, in the order specified.

### `test`

Type:

```typescript
{
  clearMocks?: boolean;
  mockReset?: boolean;
  restoreMocks?: boolean;
  dangerouslyIgnoreUnhandledErrors?: boolean;
}
```

- **clearMocks**: Will call `.mockClear()` on all spies created with `fn()` when a story unmounts. Default: `false`.
- **mockReset**: Will call `.mockReset()` on all spies when a story unmounts. Default: `false`.
- **restoreMocks**: Will call `.restoreMocks()` on all spies when a story unmounts. Default: `true`.
- **dangerouslyIgnoreUnhandledErrors**: Prevents the play function from failing when unhandled errors are thrown. Default: `false`.

## Parameter inheritance

Parameters are merged together in order of increasing specificity:

1. Project (global) parameters
2. Meta (component) parameters
3. Story parameters

Parameters are **merged**, so objects are deep-merged, but arrays and other properties are overwritten.

Example:

```typescript
// .storybook/preview.js|ts
const preview = {
  // 👇 Project-level parameters
  parameters: {
    layout: 'centered',
    demo: {
      demoProperty: 'a',
      demoArray: [1, 2],
    },
  },
};
export default preview;
```

```typescript
// Dialog.stories.js|ts
const meta = {
  component: Dialog,
  // 👇 Meta-level parameters
  parameters: {
    layout: 'fullscreen',
    demo: {
      demoProperty: 'b',
      anotherDemoProperty: 'b',
    },
  },
};
export default meta;

export const Basic = {};

export const LargeScreen = {
  // 👇 Story-level parameters
  parameters: {
    layout: 'padded',
    demo: {
      demoArray: [3, 4],
    },
  },
};
```

Result for the LargeScreen story:

```javascript
{
  layout: 'padded',
  demo: {
    demoProperty: 'b',
    anotherDemoProperty: 'b',
    demoArray: [3, 4],
  },
}
```
