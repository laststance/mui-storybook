# Interaction tests

In Storybook, interaction tests are built as part of a story. That story renders the component with the necessary props and context to place it in an initial state. You then use a play function to simulate user behavior like clicks, typing, and submitting a form and then assert on the end result.

You can preview and debug your interaction tests using the Interactions panel in the Storybook UI. They can be automated using the Vitest addon, allowing you to run tests for your project in Storybook, terminal, or CI environments.

## Writing interaction tests

Every story you write can be render tested. A **render test** is a simple version of an interaction test that only tests the ability of a component to render successfully in a given state. That works fine for relatively simple, static components like a Button. But for more complex, interactive components, you can go farther.

You can simulate user behavior and assert on functional aspects like DOM structure or function calls using the `play` function. When a component is tested, the play function is ran and any assertions within it are validated.

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
    // Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');

    await userEvent.type(canvas.getByTestId('password'), 'a-random-password');

    await userEvent.click(canvas.getByRole('button'));

    // Assert DOM structure
    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!',
      ),
    ).toBeInTheDocument();
  },
};
```

### Querying the `canvas`

`canvas` is a queryable element containing the story under test, which is provided as a parameter of your play function. You can use `canvas` to find specific elements to interact with or assert on. All query methods come directly from Testing Library and take the form of `<type><subject>`.

| Type of Query | 0 Matches | 1 Match | >1 Matches | Awaited |
| --- | --- | --- | --- | --- |
| **Single Element** |  |  |  |  |
| `getBy...` | Throw error | Return element | Throw error | No |
| `queryBy...` | Return `null` | Return element | Throw error | No |
| `findBy...` | Throw error | Return element | Throw error | Yes |
| **Multiple Elements** |  |  |  |  |
| `getAllBy...` | Throw error | Return array | Return array | No |
| `queryAllBy...` | Return `[]` | Return array | Return array | No |
| `findAllBy...` | Throw error | Return array | Return array | Yes |

The subjects are:
1. `ByRole` - Find elements by their accessible role
2. `ByLabelText` - Find elements by their associated label text
3. `ByPlaceholderText` - Find elements by their placeholder value
4. `ByText` - Find elements by the text they contain
5. `ByDisplayValue` - Find `input`, `textarea`, or `select` elements by their current value
6. `ByAltText` - Find elements with the given `alt` attribute value
7. `ByTitle` - Find elements with the given `title` attribute value
8. `ByTestId` - Find elements with the given `data-testid` attribute value

Typical queries might look like:

```typescript
// Find the first element with a role of button with the accessible name "Submit"
await canvas.findByRole('button', { name: 'Submit' });

// Get the first element with the text "An example heading"
canvas.getByText('An example heading');

// Get all elements with the role of listitem
canvas.getAllByRole('listitem');
```

### Simulating behavior with `userEvent`

After querying for elements, you will likely need to interact with them to test your component's behavior. For this we use the `userEvent` utility, which is provided as a parameter of your play function.

| Method | Description |
| --- | --- |
| `click` | Clicks the element |
| `dblClick` | Clicks the element twice |
| `hover` | Hovers an element |
| `unhover` | Unhovers out of element |
| `tab` | Presses the tab key |
| `type` | Writes text inside inputs or textareas |
| `keyboard` | Simulates keyboard events |
| `selectOptions` | Selects the specified option(s) of a select element |
| `deselectOptions` | Removes the selection from a specific option |
| `clear` | Selects the text inside inputs or textareas and deletes it |

> **Important**: `userEvent` methods should _always_ be `await`ed inside of the play function. This ensures they can be properly logged and debugged in the Interactions panel.

### Asserting with `expect`

After querying for elements and simulating behavior, you can make assertions on the result which are validated when running the test. For this we use the `expect` utility:

```typescript
import { expect } from 'storybook/test';
```

Common methods:

| Method | Description |
| --- | --- |
| `toBeInTheDocument()` | Checks if the element is in the DOM |
| `toBeVisible()` | Checks if the element is visible to the user |
| `toBeDisabled()` | Checks if an element is disabled |
| `toHaveBeenCalled()` | Checks that a spied function was called |
| `toHaveBeenCalledWith()` | Checks that a spied function was called with specific parameters |

> **Important**: `expect` calls should _always_ be `await`ed inside of the play function.

### Spying on functions with `fn`

When your component calls a function, you can spy on that function to make assertions on its behavior using the `fn` utility:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { fn, expect } from 'storybook/test';

import { LoginForm } from './LoginForm';

const meta = {
  component: LoginForm,
  args: {
    // Use `fn` to spy on the onSubmit arg
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FilledForm: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'email@provider.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'a-random-password');
    await userEvent.click(canvas.getByRole('button', { name: 'Log in' }));

    // Now we can assert that the onSubmit arg was called
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
```

### Run code before the component gets rendered

You can execute code before rendering by using the `mount` function in the `play` method:

```typescript
import MockDate from 'mockdate';

export const ChristmasUI: Story = {
  async play({ mount }) {
    MockDate.set('2024-12-25');
    // Render the component with the mocked date
    await mount();
    // ...rest of test
  },
};
```

### Run code before each story in a file

Sometimes you might need to run the same code before each story in a file. You can do this by adding an asynchronous `beforeEach` function to the component meta:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import MockDate from 'mockdate';

import { Page } from './Page';

const meta = {
  component: Page,
  // Set the value of Date for every story in the file
  async beforeEach() {
    MockDate.set('2024-02-14');

    // Reset the Date after each story
    return () => {
      MockDate.reset();
    };
  },
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async play({ canvas }) {
    // ... This will run with the mocked Date
  },
};
```

### Set up or reset state for all tests

#### `beforeAll`

The `beforeAll` function in the preview file will run once before any stories in the project. This is a good place to bootstrap your project or run any setup that your entire project depends on.

```typescript
import type { Preview } from '@storybook/your-framework';

import { init } from '../project-bootstrap';

const preview: Preview = {
  async beforeAll() {
    await init();
  },
};

export default preview;
```

#### `beforeEach`

The `beforeEach` function in the preview file will run before each story in the project. This is best used for resetting state or modules that are used by all or most of your stories:

```typescript
import type { Preview } from '@storybook/your-framework';
import MockDate from 'mockdate';

const preview: Preview = {
  async beforeEach() {
    MockDate.reset();
  },
};

export default preview;
```

> It is _not_ necessary to restore `fn()` mocks, as Storybook will already do that automatically before rendering a story.

### Group interactions with the step function

For complex flows, it can be worthwhile to group sets of related interactions together using the step function:

```typescript
export const Submitted: Story = {
  play: async ({ args, canvas, step }) => {
    await step('Enter email and password', async () => {
      await userEvent.type(canvas.getByTestId('email'), 'hi@example.com');
      await userEvent.type(canvas.getByTestId('password'), 'supersecret');
    });

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
  },
};
```

### Mocked modules

If your component depends on modules that are imported into the component file, you can mock those modules to control and assert on their behavior. This is detailed in the mocking modules guide.

## Running interaction tests

If you're using the Vitest addon, you can run your interaction tests in these ways:

- In the Storybook UI
- In your editor
- Via the CLI
- In CI environments

In the Storybook UI, you can run interaction tests by clicking the **Run component tests** button in the expanded testing widget in the sidebar.

If you're using the test-runner, you can run your interaction tests in the terminal or in CI environments.

## Debugging interaction tests

If you check the Interactions panel, you'll see the step-by-step flow defined in your play function for each story. It also offers a handy set of UI controls to pause, resume, rewind, and step through each interaction.

Any test failures will also show up here, making it easy to quickly pinpoint the exact point of failure.

### Permalinks for reproductions

Because Storybook is a webapp, anyone with the URL can reproduce the failure with the same detailed information without any additional environment configuration or tooling required.
