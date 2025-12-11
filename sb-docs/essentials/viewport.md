# Viewport

The viewport feature allows you to adjust the dimensions of the iframe your story is rendered in. It makes it easy to develop responsive UIs.

## Configuration

Out of the box, the viewport feature offers you a standard set of viewports that you can use. If you want to change the default set of viewports, you can configure your own viewports with the `viewport` parameter in your `.storybook/preview.ts`.

You can define the available viewports using the `options` property and set the initial viewport using the `initialGlobals` property:

```typescript
import type { Preview } from '@storybook/your-framework';

import { INITIAL_VIEWPORTS } from 'storybook/viewport';

const preview: Preview = {
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    viewport: { value: 'ipad', isRotated: false },
  },
};

export default preview;
```

### Use a detailed set of devices

By default, the viewport feature will use a minimal set of viewports, which enables you to test your UI in common responsive scenarios. These are also available in the `MINIMAL_VIEWPORTS` export and include:

| Key | Description | Dimensions (w x h, px) |
| --- | --- | --- |
| `mobile1` | Small mobile | 320 x 568 |
| `mobile2` | Large mobile | 414 x 896 |
| `tablet` | Tablet | 834 x 1112 |
| `desktop` | Desktop | 1024 x 1280 |

If you need a more detailed set of devices, you can use the `INITIAL_VIEWPORTS` export, which includes many iPhone, Galaxy, Nexus, Pixel, and iPad device configurations.

### Add new devices

If the predefined viewports don't meet your needs, you can add new devices to the list of viewports:

```typescript
import type { Preview } from '@storybook/your-framework';

import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

const kindleViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px',
    },
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px',
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...kindleViewports,
      },
    },
  },
};

export default preview;
```

### Configuring per component or story

Parameters can be applied at the project, component, and story levels, which allows you to specify the configuration where needed:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
  parameters: {
    viewport: {
      // Set available viewports for every story in the file
      options: INITIAL_VIEWPORTS,
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
```

## Defining the viewport for a story

The Viewport module enables you to change the viewport applied to a story by selecting from the list of predefined viewports in the toolbar. If needed, you can set a story to default to a specific viewport by using the `globals` option:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  globals: {
    // Set viewport for all component stories
    viewport: { value: 'tablet', isRotated: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnPhone: Story = {
  globals: {
    // Override viewport for this story
    viewport: { value: 'mobile1', isRotated: false },
  },
};
```

When you specify a viewport for a story (or a component's stories) using `globals`, the viewport is applied and cannot be changed using the toolbar. This is useful to ensure a story is always rendered on a specific viewport.

## API

### Keyboard shortcuts

- Next viewport: `alt` + `v`
- Previous viewport: `alt` + `shift` + `v`
- Reset viewport: `alt` + `control` + `v`

### Globals

This module contributes the following globals to Storybook, under the `viewport` namespace:

#### `value`

Type: `string`

When set, the viewport is applied and cannot be changed using the toolbar. Must match the key of one of the available viewports.

#### `isRotated`

Type: `boolean`

When true, the viewport applied will be rotated 90 degrees, e.g., from portrait to landscape orientation.

### Parameters

This module contributes the following parameters to Storybook, under the `viewport` namespace:

#### `disable`

Type: `boolean`

Turn off this module's behavior.

#### `options`

Type:

```typescript
{
  [key: string]: {
    name: string;
    styles: { height: string, width: string };
    type: 'desktop' | 'mobile' | 'tablet' | 'other';
  };
}
```

Specify the available viewports. The `width` and `height` values must include the unit, e.g. `'320px'`.

### Exports

This module contributes the following exports to Storybook:

```typescript
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
```

#### `INITIAL_VIEWPORTS`

Type: `object`

The full set of initial viewports provided by the Viewport module.

#### `MINIMAL_VIEWPORTS`

Type: `object`

A minimal set of viewports provided by the Viewport module. These are used by default.
