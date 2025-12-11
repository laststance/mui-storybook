# Accessibility tests

Web accessibility is the practice of making websites and apps accessible and inclusive to all people, regardless of ability or the technology they're using. That means supporting requirements such as keyboard navigation, screen reader support, sufficient color contrast, etc.

Accessibility is not only the right thing to do, but it is increasingly mandated. For example, the European accessibility act is scheduled to go into law in June 2025. Similarly in the US, laws like the Americans with Disabilities Act (ADA) and Section 508 of the Rehabilitation Act apply to many public-facing services. Many of these laws are based on WCAG, a standardized guideline for making web content accessible.

Accessibility tests audit the rendered DOM against a set of heuristics based on WCAG rules and other industry-accepted best practices. They act as the first line of QA to catch blatant accessibility violations.

## Install the addon

Storybook provides an Accessibility (a11y) addon to help ensure the accessibility of your components. It is built on top of Deque's axe-core library, which automatically catches up to 57% of WCAG issues.

Run this command to install and configure the addon in your project:

```bash
npx storybook add @storybook/addon-a11y
```

Your Storybook will now include some features to check the accessibility of your components, including a button in the toolbar to simulate different vision impairments and an Accessibility addon panel to check for violations.

### Integration with Vitest addon

The accessibility addon is designed to integrate with the Vitest addon, so that you can run accessibility tests alongside your component tests.

**Automatic configuration:**

When you run `npx storybook add @storybook/addon-vitest` in a project that already has `@storybook/addon-a11y` installed, Storybook will automatically:

1. Update `.storybook/vitest.setup.ts` to include the Accessibility addon's annotations
2. Configure accessibility tests to run alongside component tests

**Manual configuration:**

If you need to configure this manually, you can add the following to your `.storybook/vitest.setup.ts`:

```typescript
import * as previewAnnotations from '@storybook/preview-api';
import { setProjectAnnotations } from '@storybook/your-renderer';
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';

const annotations = setProjectAnnotations([
  previewAnnotations,
  a11yAddonAnnotations,
]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
```

## Check for violations

When you navigate to a story, automated accessibility checks are run and the results are reported in the Accessibility addon panel.

The results are broken down into three sub-tabs:

- **Violations** are known violations of WCAG rules and best practices
- **Passes** are known non-violations
- **Incomplete** highlights areas that you should confirm manually because they could not be checked automatically

## Configure

Because the addon is built on top of `axe-core`, much of the configuration available maps to its available options:

| Property | Default | Description |
| --- | --- | --- |
| `parameters.a11y.context` | `'body'` | Context passed to `axe.run`. Defines which elements to run checks against. |
| `parameters.a11y.config` | (see below) | Configuration passed to `axe.configure()`. Most commonly used to configure individual rules. |
| `parameters.a11y.options` | `{}` | Options passed to `axe.run`. Can be used to adjust the rulesets checked against. |
| `parameters.a11y.test` | `undefined` | Determines test behavior when run with the Vitest addon. |
| `globals.a11y.manual` | `undefined` | Set to `true` to prevent stories from being automatically analyzed when visited. |

### Rulesets

The addon uses the `axe-core` library to run accessibility checks. By default, it runs a set of rules that are based on the WCAG 2.0 and 2.1 guidelines, as well as some best practices.

To change the rules that are checked against (e.g. to check against WCAG 2.2 AA or WCAG 2.x AAA rules), use the `runOnly` option:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    a11y: {
      options: {
        // Opt in to running WCAG 2.x AAA rules
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice', 'wcag2aaa'],
      },
    },
  },
};

export default preview;
```

### Individual rules

You can also enable, disable, or configure individual rules:

```typescript
export const IndividualA11yRulesExample: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks for this particular rule on all stories.
            id: 'image-alt',
            enabled: false,
          },
        ],
      },
    },
  },
};
```

### Test behavior

You can configure accessibility tests with the `parameters.a11y.test` parameter, which determines the behavior of accessibility tests for a story when run with either the Vitest addon or the test-runner:

| Value | Description |
| --- | --- |
| `'off'` | Do not run accessibility tests (you can still manually verify via the addon panel) |
| `'todo'` | Run accessibility tests; violations return a warning in the Storybook UI |
| `'error'` | Run accessibility tests; violations return a failing test in the Storybook UI and CLI/CI |

Example:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    // Applies to all stories in this file
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

// This story will use the 'error' value and fail on accessibility violations
export const Primary: Story = {
  args: { primary: true },
};

// This story will not fail on accessibility violations
// (but will still run the tests and show warnings)
export const NoA11yFail: Story = {
  parameters: {
    a11y: { test: 'todo' },
  },
};
```

### Excluded elements

Sometimes, it may be necessary to exclude certain elements from the accessibility checks. For this, you can define a custom context:

```typescript
export const ExampleStory: Story = {
  parameters: {
    a11y: {
      context: {
        include: ['body'],
        exclude: ['.no-a11y-check'],
      },
    },
  },
};
```

### Disable automated checks

Disable automated accessibility checks for stories or components by adding the following globals:

```typescript
export const NonA11yStory: Story = {
  globals: {
    a11y: {
      // This option disables all automatic a11y checks on this story
      manual: true,
    },
  },
};
```

## Run accessibility tests

### With the Vitest addon

If you're using the Vitest addon, you can run your accessibility tests, as part of component tests, in these ways:

- In the Storybook UI
- In CI environments

To run accessibility tests in the Storybook UI, first expand the testing widget in the sidebar and check the Accessibility checkbox. Now, when you press the Run component tests button, the accessibility tests will be run along with any other tests you have configured.

In CI, accessibility tests are run automatically for stories with `parameters.a11y.test = 'error'` when you run the Vitest tests.

### With the test-runner

If you're using the test-runner, you can run your accessibility tests in the terminal or in CI environments.

## Debug accessibility violations

When you run accessibility tests, the results are reported in the Storybook UI. You can click on a violation to see more details about it, including the rule that was violated and suggestions for how to fix it.

You can also toggle on highlighting in the Storybook UI to see which elements are causing the violation, and click on a highlighted element to see the violations details in a popover menu.

## Recommended workflow

You can use configuration to progressively work toward a more accessible UI by combining multiple test behaviors:

1. Update your project configuration to fail on accessibility violations by setting `parameters.a11y.test` to `'error'`. This ensures that all new stories are tested to meet accessibility standards.

2. You will likely find that many components have accessibility failures.

3. Take note of the components with accessibility issues and temporarily reduce their failures to warnings by applying the `'todo'` parameter value. This keeps accessibility issues visible while not blocking development.

4. Pick a good starting point (we recommend something like Button), fix the issues using the suggestions in the addon panel, then remove the parameter.

5. Pick another component and repeat the process until you've covered all your components!
