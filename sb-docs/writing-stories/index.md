# How to write stories

A story captures the rendered state of a UI component. It's an object with annotations that describe the component's behavior and appearance given a set of arguments.

Storybook uses the generic term arguments (args for short) when talking about React's `props`, Vue's `props`, Angular's `@Input`, and other similar concepts.

## Where to put stories

A component's stories are defined in a story file that lives alongside the component file. The story file is for development-only, and it won't be included in your production bundle. In your filesystem, it looks something like this:

```
components/
├─ Button/
│  ├─ Button.js | ts | jsx | tsx | vue | svelte
│  ├─ Button.stories.js | ts | jsx | tsx | svelte
```

## Component Story Format

We define stories according to the Component Story Format (CSF), an ES6 module-based standard that is easy to write and portable between tools.

The key ingredients are the default export that describes the component, and named exports that describe the stories.

### Default export

The default export metadata controls how Storybook lists your stories and provides information used by addons. For example, here's the default export for a story file `Button.stories.js|ts`:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
```

> Starting with Storybook version 7.0, story titles are analyzed statically as part of the build process. The default export must contain a `title` property that can be read statically or a `component` property from which an automatic title can be computed.

### Defining stories

Use the named exports of a CSF file to define your component's stories. We recommend you use UpperCamelCase for your story exports. Here's how to render `Button` in the "primary" state and export a story called `Primary`.

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

#### Custom rendering

By default, stories will render the component defined in the meta (default export), with the `args` passed to it. If you need to render something else, you can provide a function to the `render` property that returns the desired output.

```typescript
import { Meta, StoryObj } from '@storybook/your-framework';

import { Alert } from './Alert';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryInAlert: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  render: (args) => (
    <Alert>
      Alert text
      <Button {...args} />
    </Alert>
  ),
};
```

### Rename stories

By default, Storybook uses the name of the story export as the basis for the story name. However, you can customize the name of your story by adding a `name` property to the story object.

```typescript
export const Primary: Story = {
  name: 'I am the primary',
  args: {
    label: 'Button',
    primary: true,
  },
};
```

## How to write stories

A story is an object that describes how to render a component. You can have multiple stories per component, and those stories can build upon one another.

```typescript
export const Primary: Story = {
  args: {
    backgroundColor: '#ff0',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    label: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    label: 'Tertiary Button',
  },
};
```

What's more, you can import `args` to reuse when writing stories for other components.

### Using the play function

Storybook's `play` function is a convenient helper method to test component scenarios that otherwise require user intervention. They're small code snippets that execute once your story renders.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { expect } from 'storybook/test';

import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');
    await userEvent.type(canvas.getByTestId('password'), 'a-random-password');
    await userEvent.click(canvas.getByRole('button'));

    await expect(
      canvas.getByText('Everything is perfect. Your account is ready!')
    ).toBeInTheDocument();
  },
};
```

### Using parameters

Parameters are Storybook's method of defining static metadata for stories. A story's parameters can be used to provide configuration to various addons at the level of a story or group of stories.

```typescript
const meta = {
  component: Button,
  parameters: {
    backgrounds: {
      options: {},
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

### Using decorators

Decorators are a mechanism to wrap a component in arbitrary markup when rendering a story. Components are often created with assumptions about 'where' they render. Your styles might expect a theme or layout wrapper.

```typescript
const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
```

## Stories for two or more components

Sometimes you may have two or more components created to work together. For instance, if you have a parent `List` component, it may require child `ListItem` components.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { List } from './List';
import { ListItem } from './ListItem';

const meta = {
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem />
    </List>
  ),
};

export const ManyItems: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem />
      <ListItem />
      <ListItem />
    </List>
  ),
};
```

You can also reuse story data from the child `ListItem` in your `List` component. That's easier to maintain because you don't have to update it in multiple places.
