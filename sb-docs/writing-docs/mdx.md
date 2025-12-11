# MDX

MDX files mix Markdown and Javascript/JSX to create rich interactive documentation. You can use Markdown's readable syntax (such as `# heading`) for your documentation, include stories defined in Component Story Format (CSF), and freely embed JSX component blocks at any point in the file. All at once.

In addition, you can write pure documentation pages in MDX and add them to Storybook alongside your stories.

## Basic example

Let's start with an example, `Checkbox.mdx`, combining Markdown with a single story.

```mdx
import { Canvas, Meta } from '@storybook/addon-docs/blocks';

import * as CheckboxStories from './Checkbox.stories';

<Meta of={CheckboxStories} />

# Checkbox

A checkbox is a square box that can be activated or deactivated when ticked.

Use checkboxes to select one or more options from a list of choices.

<Canvas of={CheckboxStories.Unchecked} />
```

This MDX file references a story file, `Checkbox.stories.ts`, that is written in Component Story Format (CSF):

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    label: 'Unchecked',
  },
};
```

### MDX and CSF

The first thing you'll notice is that the component documentation is divided into distinct formats: one for writing component stories describing each possible component state and the second one for documenting how to use them. This split leverages the best qualities of each format:

- **CSF** is great for succinctly defining stories (component examples). If you use TypeScript, it also provides type safety and auto-completion.
- **MDX** is great for writing structured documentation and composing it with interactive JSX elements.

### Anatomy of MDX

Going through the code blocks in sequence:

```mdx
import { Canvas, Meta } from '@storybook/addon-docs/blocks';

import * as CheckboxStories from './Checkbox.stories';
```

Imports the components and stories that will be used in the JSX throughout the rest of the file.

```mdx
<Meta of={CheckboxStories} />
```

When providing the `of` prop to the `Meta` block, make sure that you're referencing the **default export** of the story file and not the component itself to prevent render issues with the generated documentation.

The `Meta` block defines where the document will be placed in the sidebar. In this case, it is adjacent to the Checkbox's stories. By default, the docs sidebar node is titled `"Docs"`, but this can be customized by passing a `name` prop (e.g., `<Meta of={CheckboxStories} name="Info" />`). If you want to place a docs node at an arbitrary point in the navigation hierarchy, you can use the `title` prop (e.g., `<Meta title="path/to/node" />`).

```mdx
<Canvas of={CheckboxStories.Unchecked} />
```

MDX supports blocks of arbitrary JSX. In this case, we are leveraging "Doc Blocks", a library of documentation components designed to work with Storybook stories.

### Known limitations

While MDX supports a variety of runtimes (React, Preact, Vue), Storybook's implementation is React-only. That means your documentation is rendered in React, while your stories render in the runtime of your choice (React, Vue, Angular, Web Components, Svelte, etc.).

## Setup custom documentation

To enable custom documentation for your stories with this format, start by updating your Storybook configuration file (i.e., `.storybook/main.ts`).

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: [
    // Your documentation written in MDX along with your stories goes here
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
};

export default config;
```

### Using the `Meta` Doc Block

If you need to match the component documentation to an existing story, you can configure the `Meta` Doc Block to control how the documentation gets rendered.

```mdx
import { Meta, Controls } from '@storybook/addon-docs/blocks';

<Meta title="Button" />

# Definition

Button is a clickable interactive element that triggers a response.

You can place text and icons inside of a button.

Buttons are often used for form submissions and to toggle elements into view.

## Usage

The component comes in different variants such as `primary`, `secondary`, `large` and `small` which you can use to alter the look and feel of the button.

## Inputs

Button has the following properties:

<Controls />
```

### Writing unattached documentation

Suppose you're documenting an existing component and only provide the `Meta` Doc Block without additional props or other blocks. In that case, Storybook will consider it as "unattached" documentation, or in other words, a "documentation-only" page.

### Using the File System

Providing the `Meta` Doc Block may not be required for certain use cases, such as standalone pages or guidelines for testing your components. In that case, you can safely omit it. Storybook will instead rely on the file's physical location to place the documentation in the sidebar.

### Working with standalone documentation pages

Writing standalone documentation pages is a common use case that applies not only on a per-component but also on a per-project basis. For example, you might want to document your project's onboarding process with instructions on using it.

### Fully control custom documentation

Documentation can be expensive to maintain and keep up to date when applied to every project component. To help simplify this process, Storybook provides a set of useful UI components (i.e., Doc Blocks) to help cover more advanced cases.

```mdx
import { Meta, Story } from '@storybook/addon-docs/blocks';

import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Button is a clickable interactive element that triggers a response.

## Usage

<Story of={ButtonStories.Basic} />
```

### Working with multiple components

If you need to document multiple components in a single documentation page, you can reference them directly inside your MDX file.

```mdx
import { Canvas, Meta, Story } from '@storybook/addon-docs/blocks';

import * as ListStories from './List.stories';
import * as ListItemStories from './ListItem.stories';
import * as PageStories from './Page.stories';

<Meta of={PageStories} />

# Page

Page is a layout container that is used to position children in predetermined areas.

## Usage

<Canvas of={PageStories.Basic} />

# List

List is a grouping of related items.

## Usage

<Story of={ListStories.Filled} />

# List Item

List items are used to group related content in a list.

## Usage

<Story of={ListItemStories.Starter} meta={ListItemStories} />
```

### Generate documentation from Markdown

If you need to extend your documentation with additional content written in Markdown, you can use the `Markdown` Doc Block to import the available content.

```mdx
import { Meta, Markdown } from '@storybook/addon-docs/blocks';

import Readme from '../../Changelog.md?raw';

<Meta title="Changelog" />

# Changelog

<Markdown>{Readme}</Markdown>
```

### Linking to other stories and pages

Another way to improve documentation is by linking to other stories and pages.

```markdown
[Go to specific documentation page](?path=/docs/some--id)
[Go to the conclusion of the documentation page](?path=/docs/some--id#conclusion)
[Go to specific story canvas](?path=/story/some--id)
```

## Troubleshooting

### Markdown tables aren't rendering correctly

If you're extending your documentation to include specific features (e.g., tables, footnotes), you may run into some issues rendering them correctly. We recommend enabling the `remark-gfm` plugin in your configuration file.

```typescript
import remarkGfm from 'remark-gfm';

import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
};

export default config;
```

### The MDX documentation doesn't render in my environment

As Storybook relies on MDX 3 to render documentation, some technical limitations may prevent you from migrating to this version.

### Storybook doesn't create documentation for my component stories

If Storybook is not able to detect and render the documentation for your component stories, it may be due to a misconfiguration. Check your configuration file and ensure the `stories` configuration element provides the correct path to your stories location.

### The migration seems flaky and keeps failing

By default, running the migration command will prompt you to update the existing MDX files in your project. Start by running:

```bash
npx @hipster/mdx2-issue-checker
```

Additionally, if you're working with VSCode, you can add the MDX extension and enable MDX experimental support for linting, type checking, and auto-completion by adding the following to your user settings:

```json
{
  "mdx.server.enable": true
}
```
