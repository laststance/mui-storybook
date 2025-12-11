# Writing stories in TypeScript

Writing your stories in TypeScript makes you more productive. You don't have to jump between files to look up component props. Your code editor will alert you about missing required props and even autocomplete prop values, just like when using your components within your app. Plus, Storybook infers those component types to auto-generate the Controls table.

Storybook has built-in TypeScript support, so you can get started with zero configuration required.

## Typing stories with `Meta` and `StoryObj`

When writing stories, there are two aspects that are helpful to type. The first is the component meta, which describes and configures the component and its stories. In a CSF file, this is the default export. The second is the stories themselves.

Storybook provides utility types for each of these, named `Meta` and `StoryObj`. Here's an example CSF file using those types:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {} satisfies Story;

export const Primary = {
  args: {
    primary: true,
  },
} satisfies Story;
```

### Props type parameter

`Meta` and `StoryObj` types are both generics, so you can provide them with an optional prop type parameter for the component type or the component's props type (e.g., the `typeof Button` portion of `Meta<typeof Button>`). By doing so, TypeScript will prevent you from defining an invalid arg, and all decorators, play functions, or loaders will type their function arguments.

The example above passes a component type. See **Typing custom args** for an example of passing a props type.

## Using `satisfies` for better type safety

If you are using TypeScript 4.9+, you can take advantage of the new `satisfies` operator to get stricter type checking. Now you will receive type errors for missing required args, not just invalid ones.

Using `satisfies` to apply a story's type helps maintain type safety when sharing a play function across stories. Without it, TypeScript will throw an error that the `play` function may be undefined. The `satisfies` operator enables TypeScript to infer whether the play function is defined or not.

Finally, use of `satisfies` allows you to pass `typeof meta` to the `StoryObj` generic. This informs TypeScript of the connection between the `meta` and `StoryObj` types, which allows it to infer the `args` type from the `meta` type. In other words, TypeScript will understand that args can be defined both at the story and meta level and won't throw an error when a required arg is defined at the meta level, but not at the story level.

## Typing custom args

Sometimes stories need to define args that aren't included in the component's props. For this case, you can use an intersection type to combine a component's props type and your custom args' type. For example, here's how you could use a `footer` arg to populate a child component:

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
