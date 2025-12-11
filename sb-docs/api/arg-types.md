# ArgTypes

ArgTypes specify the behavior of args. By specifying the type of an arg, you constrain the values that it can accept and provide information about args that are not explicitly set (i.e., description).

You can also use argTypes to "annotate" args with information used by addons that make use of those args. For instance, to instruct the controls panel to render a color picker, you could specify the `'color'` control type.

## Automatic argType inference

If you are using the Storybook docs addon, then Storybook will infer a set of argTypes for each story based on the `component` specified in the default export of the CSF file.

| Framework | Static analysis tool |
| --- | --- |
| React | react-docgen (default) or react-docgen-typescript |
| Vue | vue-docgen-api |
| Angular | compodoc |
| WebComponents | custom-element.json |
| Ember | YUI doc |

## Manually specifying argTypes

ArgTypes are most often specified at the meta (component) level, in the default export of the CSF file:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: {
    // 👇 All Button stories expect a label arg
    label: {
      control: 'text',
      description: 'Overwritten description',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

They can apply to all stories when specified at the project (global) level, in the `preview.js|ts` configuration file:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview = {
  argTypes: {
    // 👇 All stories expect a label arg
    label: {
      control: 'text',
      description: 'Overwritten description',
    },
  },
} satisfies Preview;

export default preview;
```

## Control types

Specifies the type of control used to change the arg value with the controls panel:

| Data type | ControlType | Description |
| --- | --- | --- |
| **array** | `'object'` | Provides a JSON-based editor to handle the values of the array. |
| **boolean** | `'boolean'` | Provides a toggle for switching between possible states. |
| **enum** | `'check'` | Provides a set of stacked checkboxes for selecting multiple options. |
| | `'inline-check'` | Provides a set of inlined checkboxes for selecting multiple options. |
| | `'radio'` | Provides a set of stacked radio buttons based on the available options. |
| | `'inline-radio'` | Provides a set of inlined radio buttons based on the available options. |
| | `'select'` | Provides a select to choose a single value from the options. |
| | `'multi-select'` | Provides a select to choose multiple values from the options. |
| **number** | `'number'` | Provides a numeric input to include the range of all possible values. |
| | `'range'` | Provides a range slider to include all possible values. |
| **object** | `'file'` | Provides a file input that returns an array of URLs. |
| | `'object'` | Provides a JSON-based editor to handle the object's values. |
| **string** | `'color'` | Provides a color picker to choose color values. |
| | `'date'` | Provides a datepicker to choose a date. |
| | `'text'` | Provides a freeform text input. |

## Control configuration

```typescript
import type { Meta } from '@storybook/your-framework';

import { Example } from './Example';

const meta = {
  component: Example,
  argTypes: {
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 10,
      },
    },
  },
} satisfies Meta<typeof Example>;

export default meta;
```

### Control options

- `control.accept`: When `type` is `'file'`, you can specify the file types that are accepted.
- `control.labels`: Map options to labels.
- `control.max`: When `type` is `'number'` or `'range'`, sets the maximum allowed value.
- `control.min`: When `type` is `'number'` or `'range'`, sets the minimum allowed value.
- `control.presetColors`: When `type` is `'color'`, defines the set of colors that are available.
- `control.step`: When `type` is `'number'` or `'range'`, sets the granularity allowed when incrementing/decrementing the value.

## Conditional argTypes

Conditionally render an argType based on the value of another arg or global:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Example } from './Example';

const meta = {
  component: Example,
  argTypes: {
    parent: { control: 'select', options: ['one', 'two', 'three'] },

    // 👇 Only shown when `parent` arg exists
    parentExists: { if: { arg: 'parent', exists: true } },

    // 👇 Only shown when `parent` arg value is truthy
    parentIsTruthy: { if: { arg: 'parent' } },

    // 👇 Only shown when `parent` arg value is 'three'
    parentIsEqToValue: { if: { arg: 'parent', eq: 'three' } },

    // 👇 Only shown when `parent` arg value is not 'three'
    parentIsNotEqToValue: { if: { arg: 'parent', neq: 'three' } },

    // Each of the above can also be conditional on the value of a globalType, e.g.:
    // 👇 Only shown when `theme` global exists
    parentExists: { if: { global: 'theme', exists: true } },
  },
} satisfies Meta<typeof Example>;

export default meta;
```

## Table configuration

Specify how the arg is documented in the ArgTypes doc block, Controls doc block, and Controls panel:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Example } from './Example';

const meta = {
  component: Example,
  argTypes: {
    value: {
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
        category: 'Data',
        subcategory: 'Numeric',
      },
    },
  },
} satisfies Meta<typeof Example>;

export default meta;
```

### Table options

- `table.category`: Display the argType under a category heading.
- `table.defaultValue`: The documented default value of the argType.
- `table.disable`: Set to `true` to remove the argType's row from the table.
- `table.readonly`: Set to `true` to indicate that the argType is read-only.
- `table.subcategory`: Display the argType under a subcategory heading.
- `table.type`: The documented type of the argType.

## Mapping options to values

Map options to values for non-primitive values:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Example } from './Example';

const meta = {
  component: Example,
  argTypes: {
    label: {
      control: { type: 'select' },
      options: ['Normal', 'Bold', 'Italic'],
      mapping: {
        Bold: <b>Bold</b>,
        Italic: <i>Italic</i>,
      },
    },
  },
} satisfies Meta<typeof Example>;

export default meta;
```
