# Component Story Format (CSF)

Component Story Format (CSF) is the recommended way to write stories. It's an open standard based on ES6 modules that is portable beyond Storybook.

In CSF, stories and component metadata are defined as ES Modules. Every component story file consists of a required default export and one or more named exports.

## Default export

The default export defines metadata about your component, including the `component` itself, its `title` (where it will show up in the navigation UI story hierarchy), decorators, and parameters.

The `component` field is required and used by addons for automatic prop table generation and display of other component metadata. The `title` field is optional and should be unique (i.e., not re-used across files).

```typescript
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, vue3-vite, etc.
import type { Meta } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Path/To/MyComponent',
  component: MyComponent,
  decorators: [
    /* ... */
  ],
  parameters: {
    /* ... */
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
```

## Named story exports

With CSF, every named export in the file represents a story object by default.

```typescript
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithProp: Story = {
  render: () => <MyComponent prop="value" />,
};
```

The exported identifiers will be converted to "start case" using Lodash's startCase function. For example:

| Identifier | Transformation |
| --- | --- |
| name | Name |
| someName | Some Name |
| someNAME | Some NAME |
| some_custom_NAME | Some Custom NAME |
| someName1234 | Some Name 1 2 3 4 |

We recommend that all export names to start with a capital letter.

Story objects can be annotated with a few different fields to define story-level decorators and parameters, and also to define the `name` of the story.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  name: 'So simple!',
  // ...
};
```

## Args story inputs

Starting in SB 6.0, stories accept named inputs called Args. Args are dynamic data that are provided (and possibly updated by) Storybook and its addons.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {},
};
```

## Play function

Storybook's `play` functions are small snippets of code executed when the story renders in the UI. They are convenient helper methods to help you test use cases that otherwise weren't possible or required user intervention.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { expect } from 'storybook/test';

import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');

    await userEvent.type(canvas.getByTestId('password'), 'a-random-password');

    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!',
      ),
    ).toBeInTheDocument();
  },
};
```

## Custom render functions

Starting in Storybook 6.4, you can write your stories as JavaScript objects, reducing the boilerplate code you need to generate to test your components, thus improving functionality and usability. `Render` functions are helpful methods to give you additional control over how the story renders.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Layout } from './Layout';
import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// This story uses a render function to fully control how the component renders.
export const Example: Story = {
  render: () => (
    <Layout>
      <header>
        <h1>Example</h1>
      </header>
      <article>
        <MyComponent />
      </article>
    </Layout>
  ),
};
```

## Non-story exports

In some cases, you may want to export a mixture of stories and non-stories (e.g., mocked data).

You can use the optional configuration fields `includeStories` and `excludeStories` in the default export to make this possible. You can define them as an array of strings or regular expressions.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

import someData from './data.json';

const meta = {
  component: MyComponent,
  includeStories: ['SimpleStory', 'ComplexStory'], // 👈 Storybook loads these stories
  excludeStories: /.*Data$/, // 👈 Storybook ignores anything that contains Data
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const simpleData = { foo: 1, bar: 'baz' };
export const complexData = { foo: 1, foobar: { bar: 'baz', baz: someData } };

export const SimpleStory: Story = {
  args: {
    data: simpleData,
  },
};

export const ComplexStory: Story = {
  args: {
    data: complexData,
  },
};
```

## Upgrading from CSF 2 to CSF 3

Storybook provides a codemod to help you upgrade from CSF 2 to CSF 3. You can run it with the following command:

```bash
npx storybook migrate csf-2-to-3 --glob="**/*.stories.tsx" --parser=tsx
```

### Spreadable story objects

In CSF 3, the named exports are **objects**, not functions. This allows us to reuse stories more efficiently with the JS spread operator.

```typescript
export const PrimaryOnDark: Story = {
  ...Primary,
  parameters: { background: { default: 'dark' } },
};
```

### Default render functions

In CSF 3, you specify how a story renders through a `render` function. CSF 3 provides default render functions for each renderer. If all you're doing is spreading args into your component—which is the most common case—you don't need to specify any `render` function at all:

```javascript
export const Default = {};
```

### Generate titles automatically

CSF 3 can automatically generate titles based on the story's path on disk:

```javascript
// CSF 3 - title is optional
export default { component: Button };
```
