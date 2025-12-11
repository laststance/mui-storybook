# Vitest addon

Storybook's Vitest addon allows you to test your components directly inside Storybook. On its own, it transforms your stories into component tests, which test the rendering and behavior of your components in a real browser environment. It can also calculate project coverage provided by your stories.

If your project is using other testing addons, such as the Visual tests addon or the Accessibility addon, you can run those tests alongside your component tests.

When component tests are run for a story, the status is shown in the sidebar. The sidebar can be filtered to only show failing stories, and you can press the menu button on a failing story to see debugging options.

You can also run tests in watch mode, which will automatically re-run tests when you make changes to your components or stories.

## Install and set up

Before installing, make sure your project meets the following requirements:

- A Storybook framework that uses Vite (e.g. `vue3-vite`, `react-vite`, `preact-vite`, `nextjs-vite`, `sveltekit`, etc.)
- Vitest >= 3.0 (if you're not yet using Vitest, it will be installed and configured for you automatically)
- (optional) MSW >= 2.0 (if MSW is installed, it must be v2.0.0 or later to not conflict with Vitest's dependency)

**Using with Next.js**: The Vitest addon is supported in Next.js >= 14.1 projects, but you must be using the `@storybook/nextjs-vite` framework.

### Automatic setup

Run the following command to install and configure the addon automatically:

```bash
npx storybook add @storybook/addon-vitest
```

The `add` command will:

- Install and register the Vitest addon
- Inspect your project's Vite and Vitest setup
- Install and configure Vitest with sensible defaults if necessary
- Set up browser mode using Playwright's Chromium browser
- Prompt you to install Playwright browser binaries if needed

## Usage

There are multiple ways to run tests using the addon.

We recommend (and configure, by default) running Vitest in browser mode, using Playwright's Chromium browser. Browser mode ensures your components are tested in a real browser environment, which is more accurate than simulations like JSDom or HappyDom.

### Storybook UI

The easiest way to run tests is through the Storybook UI. With a click, you can run multiple types of tests for all stories in your project, a group of stories, or a single story.

To run all tests for your whole project, press the Run tests button in the testing widget at the bottom of the sidebar.

Alternatively, you can expand the testing widget to run specific types of tests individually. The sub-types listed under component tests will all run together, including when watch mode is enabled.

To run tests for a specific story or group of stories, press the menu button (three dots) that appears on hover of a sidebar item.

After running your tests, you will see status indicators on stories and components for their pass, fail, or error state.

### CLI

You can also run tests using the Vitest CLI. We recommend adding a script to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test-storybook": "vitest --project=storybook"
  }
}
```

Then run:

```bash
npm run test-storybook
```

#### Debugging

While the plugin does not require Storybook to run when testing, you may still want to run Storybook to debug your tests. To enable this, provide the `storybookScript` option in the plugin configuration. When you run Vitest in watch mode, the plugin will start Storybook using this script and provide links to the story in the output on test failures.

### Editor extension

Transforming your stories into Vitest tests with the plugin also enables you to run and debug tests using Vitest IDE integrations. This allows you to run tests directly from your editor, such as VSCode and JetBrains IDE.

### In CI

For the most part, running your Storybook tests in CI is done via the CLI.

However, to have the test output link to your published Storybook on test failures, you need to provide the `storybookUrl` option in the plugin configuration.

## How it works

The Vitest addon works by using a Vitest plugin to transform your stories into Vitest tests using portable stories. It also configures Vitest to run those tests in browser mode, using Playwright's Chromium browser.

Stories are tested in two ways: a smoke test to ensure it renders and, if a play function is defined, that function is run and any assertions made within it are validated.

## Configuring tests

The tests run by the addon can be configured in two ways. You can toggle which test types are run and include, exclude, or skip stories from being tested.

### Toggling test types

In addition to component tests, the Vitest addon supports multiple types of tests, depending on which other addons you are using in your project. Some test types, like visual tests, are run independently. Others, like accessibility, must be run alongside component tests.

### Including, excluding, or skipping tests

You can use tags to include, exclude, or skip stories from being tested. Included stories are tested, excluded stories are not tested, and skipped stories are not tested but are counted in the test results.

By default, the plugin will run all stories with the `test` tag. You can adjust this behavior by providing the `tags` option in the plugin configuration:

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [
          storybookTest({
            tags: {
              include: ['test'],
              exclude: ['experimental'],
            },
          }),
        ],
      },
    ],
  },
});
```

## Comparison to the test runner

The test runner requires a running Storybook instance to test your stories. The Vitest plugin, however, transforms your stories into tests using Vite and portable stories, so it does not need to run Storybook to test your stories.

| Feature | Vitest addon | test-runner |
| --- | --- | --- |
| Interaction tests | Yes | Yes |
| Accessibility tests | Yes | Yes |
| Visual tests | Yes | No |
| Snapshot tests | No | Yes |
| Storybook UI | Yes | No |
| Editor extensions | Yes | No |
| CLI | Yes | Yes |
| In CI | Yes | Yes |
| Tests run via | Vitest | Jest |
| Works with all Storybook frameworks | No (requires Vite) | Yes |
| Runs tests in a real browser | Yes | Yes |
| Calculates code coverage | Yes | Yes (with addon-coverage) |
| Requires a running Storybook | No | Yes |

## API

### Exports

```typescript
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
```

#### `storybookTest`

A Vitest plugin that transforms your stories into tests. It accepts an options object for configuration.

### Options

#### `configDir`

Type: `string`
Default: `.storybook`

The directory where the Storybook configuration is located, relative to the current working directory.

#### `storybookScript`

Type: `string`

Optional script to run Storybook. If provided, Vitest will start Storybook using this script when run in watch mode.

#### `storybookUrl`

Type: `string`
Default: `http://localhost:6006`

The URL where Storybook is hosted. This is used for internal checks and to provide a link to the story in the test output on failures.

#### `tags`

Type:
```typescript
{
  include: string[];
  exclude: string[];
  skip: string[];
}
```

Default:
```typescript
{
  include: ['test'],
  exclude: [],
  skip: [],
}
```

Tags to include, exclude, or skip. These tags are defined as annotations in your story, meta, or preview.
