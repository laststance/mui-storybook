# How to test UIs with Storybook

Storybook stories are test cases for your UI components in their various states and configurations. With Storybook, you can develop and test your components at the same time, in multiple ways, with instant feedback.

Storybook tackles UI component testing from a holistic perspective, ensuring that you can not only execute component tests quickly and reliably, but that you also have well established patterns to develop, debug, maintain, and even collaborate on these tests across the development lifecycle.

## Get started

If your project is using Vite, you can likely use the Vitest addon to run your component tests in Storybook. This addon is built on top of Vitest, a fast and lightweight test runner that works seamlessly with Vite.

Run this command, which will install and configure the Vitest addon and Vitest:

```bash
npx storybook add @storybook/addon-vitest
```

The full installation instructions, including project requirements, are available in the Vitest addon documentation.

Once your project is set up, you will see a testing widget in the bottom of your sidebar. After running tests, you will also see test status indicators on sidebar items. Additionally, many tests can be debugged with an addon panel.

If you cannot use the Vitest addon in your project, you can still run tests using the test-runner.

## Key concepts

Testing in Storybook is similar to other testing environments. Most of the knowledge and techniques you've been using apply here, too. But there are also some significant improvements.

### Component tests

A component test is a test which:

- Renders a component in the browser for high fidelity
- Simulates a user interacting with actual UI, like an end-to-end (E2E) test
- Only tests a unit (e.g. a single component) of UI, **and** can reach into the implementation to mock things or manipulate data, like a unit test

This combination of using a real browser, simulating behavior, and mocking provides a powerful means of testing the functional aspects of your UI.

In Storybook, the entire testing experience is built around component tests. This means that you can run your tests in the same environment as your stories, with the same tools and techniques.

### Storybook Test

Storybook Test enables real time testing of your stories, through the Vitest addon. It uses a Vitest plugin to automatically transform your stories into real Vitest tests, which are then run with Vitest's browser mode.

### Watch mode

Get instant test feedback as you develop with watch mode. It will watch your code—either the component source or the tests—for changes and automatically re-run only the relevant tests. It's perfect for test-driven development, where you write your tests first and then the component.

### CI

If you're not running Storybook Test as part of your CI, you're missing out on the biggest benefit it provides: catching bugs on PRs before you merge them.

If you are already running `vitest` as part of your CI then your stories should automatically run as tests "for free" when you commit your changes to Git.

If you're not yet running Vitest in CI, you should set that up. First by adding a new script to your `package.json`:

```json
{
  "scripts": {
    "test-storybook": "vitest --project=storybook"
  }
}
```

Note that this assumes you have a Vitest project called "storybook" for your stories, which is the default configuration when you install Storybook Test. If you've renamed it, adjust the script accordingly.

Next, add a new CI workflow (GitHub Actions example):

```yaml
name: Storybook Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    container:
      # Make sure to grab the latest version of the Playwright image
      image: mcr.microsoft.com/playwright:v1.52.0-noble
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22.12.0

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test-storybook
```

Storybook Test uses Playwright to render your stories by default. For the fastest experience, you should use a machine image that has Playwright already installed.

### Coverage

Code coverage provides insight into which code is tested or not. It functions as a guardrail as you develop, to help be sure your work is covered by the proper tests.

In Storybook Test, you can see the coverage provided by your stories in two ways. First, a summary is displayed in the testing widget. Second, clicking that coverage summary will open a full, interactive report.

Running coverage analysis can slow down your test runs, so it is turned off by default. To activate coverage, check the coverage checkbox in the testing widget.

## Types of tests

Storybook Test supports a variety of testing types to help you validate your work in multiple dimensions.

### Render tests

The most important tool for testing your components in Storybook is stories that render your components in various states.

However, you might not be aware that a basic story is also a smoke test, which we call a **render test**. The test passes when the story renders successfully and fails when it errors.

### Interaction tests

Render tests are a very basic kind of interaction test. To test stateful components or verify interactive behavior, you define a play function for your story:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { expect } from 'storybook/test';

import { Dialog } from './Dialog';

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Opens: Story = {
  play: async ({ canvas, userEvent }) => {
    // Click on a button and assert that a dialog appears
    const button = canvas.getByRole('button', { text: 'Open Modal' });
    await userEvent.click(button);
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
  },
};
```

### Accessibility tests

Storybook's Accessibility (A11y) addon runs a set of automated checks on your stories to help ensure your components can be used by all users, regardless of ability or technology they're using. That means supporting requirements such as: keyboard navigation, screen reader support, usable color contrast, etc.

To activate accessibility checks alongside your component tests, check the Accessibility checkbox in the testing widget.

### Visual tests

Visual tests are the most efficient way to test your components. With the click of a button you can take snapshots of every story in your Storybook and compare those snapshots to baselines - last known "good" snapshots. Not only does this allow you to check the appearance of your components, but they are also able to check a large subset of component functionality without having to write or maintain any test code!

Storybook supports cross-browser visual testing natively using Chromatic, a cloud service made by the Storybook team.

### Snapshot tests

In most cases, the other testing types will provide more coverage with less effort. But there are scenarios where it can be helpful to compare the rendered markup of a story against a known baseline. For example, it can help identify markup changes that trigger rendering errors.

## Reusing stories in other testing tools

Stories are made to be reusable, so you can use them as test cases in popular testing tools.

### End-to-end

Sometimes you need to test a full workflow, with the full running stack. In those cases, you can still use your stories by importing them within your Playwright or Cypress end-to-end (E2E) tests.

### Unit

If you prefer, you can reuse your Storybook stories in a traditional testing environment, like Vitest or Jest.
