# Actions

Actions are used to show that an event handler (callback) has been called, and to display its arguments. The actions panel can show both story args and other function calls.

## Story args

Actions work via supplying special Storybook-generated mock functions to your story's event handler args. There are two ways to get an action arg:

### Via storybook/test fn spies

The recommended way to write actions is to use the `fn` utility from `storybook/test` to mock and spy args. This is very useful for writing interaction tests. You can mock your component's methods by assigning them to the `fn()` function:

```typescript
import type { Meta } from '@storybook/your-framework';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  component: Button,
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
```

If your component calls an arg (because of either the user's interaction or the `play` function) and that arg is spied on, the event will show up in the action panel.

### Automatically matching args

Another option is to use a global parameter to match all argTypes that match a certain pattern. The following configuration automatically creates actions for each `on` argType:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default preview;
```

This is quite useful when your component has dozens (or hundreds) of methods and you do not want to manually apply the `fn` utility for each of those methods. However, **this is not the recommended way** of writing actions. That's because automatically inferred args **are not available as spies in your play function**. If you use `argTypesRegex` and your stories have play functions, you will need to also define args with the `fn` utility to test them in your play function.

## Non-story function calls

You can still use the actions panel if you need to log function calls that are unrelated to any story. This can be helpful for debugging or logging purposes.

### Via storybook/test spyOn

Mocks and spies from `storybook/test` are automatically logged as actions. The easiest way to show function calls in the actions panel is to use the `spyOn` utility function:

```typescript
import type { Preview } from '@storybook/your-framework';
import { spyOn } from 'storybook/test';

const preview: Preview = {
  async beforeEach() {
    spyOn(console, 'log').mockName('console.log');
  },
};

export default preview;
```

### Via the `action` function

To filter which function calls are logged, you can override the `spyOn` function's behavior by providing a custom implementation that calls the `action` function from `storybook/actions`:

```typescript
import type { Preview } from '@storybook/your-framework';
import { action } from 'storybook/actions';
import { spyOn } from 'storybook/test';

const originalConsoleLog = console.log;
const preview: Preview = {
  async beforeEach() {
    spyOn(console, 'log')
      .mockName('')
      .mockImplementation((args) => {
        if (someCondition(args)) {
          action('console.log')(args);
        }
        originalConsoleLog(...args);
      });
  },
};

export default preview;
```

## API

### Parameters

This contributes the following parameters to Storybook, under the `actions` namespace:

#### `argTypesRegex`

Type: `string`

Create actions for each arg that matches the regex.

#### `disable`

Type: `boolean`

Disable the action panel.

### Exports

```typescript
import { action } from 'storybook/actions';
```

#### `action`

Type: `(name?: string) => void`

Allows you to create an action that appears in the actions panel of the Storybook UI when clicked:

```typescript
import type { Meta } from '@storybook/your-framework';
import { action } from 'storybook/actions';

import Button from './Button';

const meta = {
  component: Button,
  args: {
    // Create an action that appears when the onClick event is fired
    onClick: action('on-click'),
  },
} satisfies Meta<typeof Button>;

export default meta;
```
