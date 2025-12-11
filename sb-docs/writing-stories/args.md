# Args

A story is a component with a set of arguments that define how the component should render. "Args" are Storybook's mechanism for defining those arguments in a single JavaScript object. Args can be used to dynamically change props, slots, styles, inputs, etc. It allows Storybook and its addons to live edit components. You do not need to modify your underlying component code to use args.

When an arg's value changes, the component re-renders, allowing you to interact with components in Storybook's UI via addons that affect args.

## Args object

The `args` object can be defined at the story, component and global level. It is a JSON serializable object composed of string keys with matching valid value types that can be passed into a component for your framework.

## Story args

To define the args of a single story, use the `args` CSF story key:

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
    primary: true,
    label: 'Button',
  },
};
```

These args will only apply to the story for which they are attached, although you can reuse them via JavaScript object reuse:

```typescript
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const PrimaryLongName: Story = {
  args: {
    ...Primary.args,
    label: 'Primary with a really long name',
  },
};
```

## Component args

You can also define args at the component level; they will apply to all the component's stories unless you overwrite them. To do so, use the `args` key on the `default` CSF export:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    // Now all Button stories will be primary.
    primary: true,
  },
} satisfies Meta<typeof Button>;

export default meta;
```

## Global args

You can also define args at the global level; they will apply to every component's stories unless you overwrite them. To do so, define the `args` property in the default export of `preview.js|ts`:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  // The default value of the theme arg for all stories
  args: { theme: 'light' },
};

export default preview;
```

> For most uses of global args, globals are a better tool for defining globally-applied settings, such as a theme. Using globals enables users to change the value with the toolbar menu.

## Args composition

You can separate the arguments to a story to compose in other stories. Here's how you can combine args for multiple stories of the same component.

```typescript
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    primary: false,
  },
};
```

> If you find yourself re-using the same args for most of a component's stories, you should consider using component-level args.

Args are useful when writing stories for composite components that are assembled from other components. Composite components often pass their arguments unchanged to their child components, and similarly, their stories can be compositions of their child components stories.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Page } from './Page';
import * as HeaderStories from './Header.stories';

const meta = {
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    ...HeaderStories.LoggedIn.args,
  },
};
```

## Args can modify any aspect of your component

You can use args in your stories to configure the component's appearance, similar to what you would do in an application. For example, here's how you could use a `footer` arg to populate a child component:

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

## Setting args through the URL

You can also override the set of initial args for the active story by adding an `args` query parameter to the URL. Typically, you would use Controls to handle this. For example:

```
?path=/story/avatar--default&args=style:rounded;size:100
```

The `args` param is always a set of `key: value` pairs delimited with a semicolon `;`. Values will be coerced (cast) to their respective `argTypes`.

## Setting args from within a story

Interactive components often need to be controlled by their containing component or page to respond to events, modify their state and reflect those changes in the UI. To enable this, you can use the `useArgs` API:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { useArgs } from 'storybook/preview-api';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Example = {
  args: {
    isChecked: false,
    label: 'Try Me!',
  },
  render: function Render(args) {
    const [{ isChecked }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ isChecked: !isChecked });
    }

    return <Checkbox {...args} onChange={onChange} isChecked={isChecked} />;
  },
} satisfies Story;
```

## Mapping to complex arg values

Complex values such as JSX elements cannot be serialized to the manager (e.g., the Controls panel) or synced with the URL. Arg values can be "mapped" from a simple string to a complex type using the `mapping` property in `argTypes` to work around this limitation.

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
