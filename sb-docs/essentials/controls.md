# Controls

Storybook Controls gives you a graphical UI to interact with a component's arguments dynamically without needing to code. Use the Controls panel to edit the inputs to your stories and see the results in real-time. It's a great way to explore your components and test different states.

Controls do not require any modification to your components. Stories for controls are:

- Convenient. Auto-generate controls based on React/Vue/Angular/etc. components.
- Portable. Reuse your interactive stories in documentation, tests, and even in designs.
- Rich. Customize the controls and interactive data to suit your exact needs.

To use Controls, you need to write your stories using args. Storybook will automatically generate UI controls based on your args and what it can infer about your component. Still, you can configure the controls further using argTypes.

## Choosing the control type

By default, Storybook will choose a control for each arg based on its initial value. This will work well with specific arg types (e.g., `boolean` or `string`). To enable them, add the `component` annotation to the default export of your story file.

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
```

For instance, suppose you have a `variant` arg on your story that should be `primary` or `secondary`:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
```

We can specify which controls get used by declaring a custom argType for the `variant` property:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

## Custom control type matchers

Controls can automatically be inferred from arg's name with regex, but currently only for the color picker and date picker controls.

| Control | Default regex | Description |
| --- | --- | --- |
| **color** | `/(background|color)$/i` | Will display a color picker UI for the args that match it |
| **date** | `/Date$/` | Will display a date picker UI for the args that match it |

If you want to define your patterns, use the `matchers` property in the `controls` parameter:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

## Fully custom args

If we are writing complex stories, we may want to add controls for args that aren't part of the component.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Page } from './Page';

type PagePropsAndCustomArgs = React.ComponentProps<typeof Page> & { footer?: string };

const meta = {
  component: Page,
  render: ({ footer, ...args }) => (
    <Page {...args}>
      <footer>{footer}</footer>
    </Page>
  ),
} satisfies Meta<PagePropsAndCustomArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CustomFooter = {
  args: {
    footer: 'Built with Storybook',
  },
} satisfies Story;
```

### Dealing with complex values

When dealing with non-primitive values, you'll notice that you'll run into some limitations. One way to deal with this is to use primitive values (e.g., strings) as arg values and add a custom `render` function to convert them to their complex counterpart before rendering.

An easier way to map primitives to complex values before rendering is to define a `mapping`; additionally, you can specify `control.labels` to configure custom labels:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from './icons';

const arrows = { ArrowUp, ArrowDown, ArrowLeft, ArrowRight };

const meta = {
  component: Button,
  argTypes: {
    arrow: {
      options: Object.keys(arrows), // An array of serializable values
      mapping: arrows, // Maps serializable option values to complex arg values
      control: {
        type: 'select',
        labels: {
          ArrowUp: 'Up',
          ArrowDown: 'Down',
          ArrowLeft: 'Left',
          ArrowRight: 'Right',
        },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

## Creating and editing stories from controls

You can create or edit stories, directly from the Controls panel.

### Create a new story

Open the Controls panel for a story and adjust the value of a control. Then save those changes as a new story.

### Edit a story

You can also update a control's value, then save the changes to the story. The story file's code will be updated for you.

### Disable creating and editing of stories

If you don't want to allow the creation or editing of stories from the Controls panel, you can disable this feature by setting the `disableSaveFromUI` parameter to `true`.

## Configuration

Controls can be configured in two ways:

- Individual controls can be configured via control annotations.
- The panel's appearance can be configured via parameters.

### Annotation

You can configure individual controls with the "control" annotation in the argTypes field of either a component or story.

| Data Type | Control | Description |
| --- | --- | --- |
| **boolean** | `boolean` | Provides a toggle for switching between possible states. |
| **number** | `number` | Provides a numeric input to include the range of all possible values. |
| | `range` | Provides a range slider component to include all possible values. |
| **object** | `object` | Provides a JSON-based editor component to handle the object's values. |
| **array** | `object` | Provides a JSON-based editor component to handle the array's values. |
| | `file` | Provides a file input component that returns an array of URLs. |
| **enum** | `radio` | Provides a set of radio buttons based on the available options. |
| | `inline-radio` | Provides a set of inlined radio buttons based on the available options. |
| | `check` | Provides a set of checkbox components for selecting multiple options. |
| | `inline-check` | Provides a set of inlined checkbox components for selecting multiple options. |
| | `select` | Provides a drop-down list component to handle single value selection. |
| | `multi-select` | Provides a drop-down list that allows multiple selected values. |
| **string** | `text` | Provides a freeform text input. |
| | `color` | Provides a color picker component to handle color values. |
| | `date` | Provides a datepicker component to handle date selection. |

The `date` control will convert the date into a UNIX timestamp when the value changes. If you need to represent the actual date, you'll need to update the story's implementation and convert the value into a date object.

### Parameters

#### Show full documentation for each property

Since Controls is built on the same engine as Storybook Docs, it can also show property documentation alongside your controls using the expanded parameter (defaults to false).

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
```

#### Specify initial preset color swatches

For `color` controls, you can specify an array of `presetColors`:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    controls: {
      presetColors: [{ color: '#ff4785', title: 'Coral' }, 'rgba(0, 159, 183, 1)', '#fe4a49'],
    },
  },
};

export default preview;
```

#### Filtering controls

You can use optional `include` and `exclude` configuration fields in the `controls` parameter, which you can define as an array of strings or a regular expression.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { YourComponent } from './YourComponent';

const meta = {
  component: YourComponent,
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrayInclude: Story = {
  parameters: {
    controls: { include: ['foo', 'bar'] },
  },
};

export const RegexInclude: Story = {
  parameters: {
    controls: { include: /^hello*/ },
  },
};
```

#### Sorting controls

By default, controls are unsorted and use whatever order the args data is processed in (`none`). Additionally, you can sort them alphabetically by the arg's name (`alpha`) or with the required args first (`requiredFirst`).

```typescript
import type { Meta } from '@storybook/your-framework';

import { YourComponent } from './YourComponent';

const meta = {
  component: YourComponent,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof YourComponent>;

export default meta;
```

### Disable controls for specific properties

Suppose you want to turn off Controls for a property called `foo` in a component's story:

```typescript
import type { Meta } from '@storybook/your-framework';

import { YourComponent } from './YourComponent';

const meta = {
  component: YourComponent,
  argTypes: {
    foo: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
```

If you want to render the prop documentation without a control:

```typescript
import type { Meta } from '@storybook/your-framework';

import { YourComponent } from './YourComponent';

const meta = {
  component: YourComponent,
  argTypes: {
    foo: {
      control: false,
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
```

### Conditional controls

In some cases, it's useful to be able to conditionally exclude a control based on the value of another control.

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: {
    label: { control: 'text' }, // Always shows the control
    advanced: { control: 'boolean' },
    // Only enabled if advanced is true
    margin: { control: 'number', if: { arg: 'advanced' } },
    padding: { control: 'number', if: { arg: 'advanced' } },
    cornerRadius: { control: 'number', if: { arg: 'advanced' } },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

The query object must contain either an `arg` or `global` target:

| field | type | meaning |
| --- | --- | --- |
| arg | string | The ID of the arg to test. |
| global | string | The ID of the global to test. |

It may also contain at most one of the following operators:

| operator | type | meaning |
| --- | --- | --- |
| truthy | boolean | Is the target value truthy? |
| exists | boolean | Is the target value defined? |
| eq | any | Is the target value equal to the provided value? |
| neq | any | Is the target value NOT equal to the provided value? |

## API

### Parameters

This feature contributes the following parameters to Storybook, under the `controls` namespace:

#### `disable`

Type: `boolean`

Disable this feature's behavior.

#### `exclude`

Type: `string[] | RegExp`

Specifies which properties to exclude from the Controls panel.

#### `expanded`

Type: `boolean`

Show the full documentation for each property in the Controls panel.

#### `include`

Type: `string[] | RegExp`

Specifies which properties to include in the Controls panel.

#### `presetColors`

Type: `(string | { color: string; title?: string })[]`

Specify preset color swatches for the color picker control.

#### `sort`

Type: `'none' | 'alpha' | 'requiredFirst'`
Default: `'none'`

Specifies how the controls are sorted.

#### `disableSaveFromUI`

Type: `boolean`
Default: `false`

Disable the ability to create or edit stories from the Controls panel.
