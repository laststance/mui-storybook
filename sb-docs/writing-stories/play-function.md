# Play function

`Play` functions are small snippets of code executed after the story renders. They enable you to interact with your components and test scenarios that otherwise require user intervention.

## Writing stories with the play function

Storybook's `play` functions are small code snippets that run once the story finishes rendering. Aided by the interactions panel, it allows you to build component interactions and test scenarios that were impossible without user intervention. For example, if you were working on a registration form and wanted to validate it, you could write the following story with the `play` function:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { RegistrationForm } from './RegistrationForm';

const meta = {
  component: RegistrationForm,
} satisfies Meta<typeof RegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const emailInput = canvas.getByLabelText('email', {
      selector: 'input',
    });

    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('password', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'ExamplePassword', {
      delay: 100,
    });

    const submitButton = canvas.getByRole('button');
    await userEvent.click(submitButton);
  },
};
```

> See the interaction testing documentation for an overview of the available API events.

When Storybook finishes rendering the story, it executes the steps defined within the `play` function, interacting with the component and filling the form's information. All of this without the need for user intervention. If you check your `Interactions` panel, you'll see the step-by-step flow.

## Working with the canvas

Part of the context passed to the `play` function is a `canvas` object. This object allows you to query the DOM of the rendered story. It provides a scoped version of the Testing Library queries, so you can use them as you would in a regular test.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ExampleStory: Story = {
  play: async ({ canvas, userEvent }) => {
    // Starts querying from the component's root element
    await userEvent.type(canvas.getByTestId('example-element'), 'something');
    await userEvent.click(canvas.getByRole('button'));
  },
};
```

If you need to query outside of the canvas (for example, to test a dialog that appears outside of the story root), you can use the `screen` object available from `storybook/test`.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { screen } from 'storybook/test';

import { Dialog } from './Dialog';

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));

    // Starts querying from the document
    const dialog = screen.getByRole('dialog');
    await expect(dialog).toBeVisible();
  },
};
```

## Composing stories

Thanks to the Component Story Format, an ES6 module based file format, you can also combine your `play` functions, similar to other existing Storybook features (e.g., args). For example, if you wanted to verify a specific workflow for your component, you could write the following stories:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FirstStory: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('an-element'), 'example-value');
  },
};

export const SecondStory: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('other-element'), 'another value');
  },
};

export const CombinedStories: Story = {
  play: async ({ context, canvas, userEvent }) => {
    // Runs the FirstStory and Second story play function before running this story's play function
    await FirstStory.play(context);
    await SecondStory.play(context);
    await userEvent.type(canvas.getByTestId('another-element'), 'random value');
  },
};
```

By combining the stories, you're recreating the entire component workflow and can spot potential issues while reducing the boilerplate code you need to write.
