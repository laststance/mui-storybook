# Automatic documentation and Storybook

Storybook Autodocs is a powerful tool that can help you quickly generate comprehensive documentation for your UI components. By leveraging Autodocs, you're transforming your stories into living documentation which can be further extended with MDX and Doc Blocks to provide a clear and concise understanding of your components' functionality.

Storybook infers the relevant metadata (e.g., `args`, `argTypes`, `parameters`) and automatically generates a documentation page with this information positioned at the root-level of your component tree in the sidebar.

## Set up automated documentation

Autodocs is configured through tags. If a CSF file contains at least one story tagged with `autodocs`, then a documentation page will be generated for that component.

To enable automatic documentation for all stories in a project, add it to `tags` in your `.storybook/preview.js|ts` file:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  // Enables auto-generated documentation for all stories
  tags: ['autodocs'],
};

export default preview;
```

You can also enable it at the component (or story) level:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta = {
  component: Button,
  // Enables auto-generated documentation for this component
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
export default meta;
```

You can disable auto docs for a particular component by removing the tag:

```typescript
import type { Meta } from '@storybook/your-framework';

import { Page } from './Page';

const meta = {
  component: Page,
  // Disable auto-generated documentation for this component
  tags: ['!autodocs'],
} satisfies Meta<typeof Page>;
export default meta;
```

Similarly, you can exclude a particular story from the auto docs page:

```typescript
export const UndocumentedStory: Story = {
  // Removes this story from auto-generated documentation
  tags: ['!autodocs'],
};
```

### Configure

You can extend your Storybook configuration file and provide additional options to control how documentation gets created:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  docs: {
    defaultName: 'Documentation',
    docsMode: true,
  },
};

export default config;
```

| Option | Description |
| --- | --- |
| `defaultName` | Renames the auto-generated documentation page. Default: `'Docs'` |
| `docsMode` | Toggles the documentation mode, which only shows documentation pages in the sidebar. Default: `false` |

### Write a custom template

To replace the default documentation template, you can extend your UI configuration file and introduce a `docs` parameter:

```tsx
import * as React from 'react';
import type { Preview } from '@storybook/your-framework';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/addon-docs/blocks';

const preview: Preview = {
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
```

#### With MDX

You can also use MDX to generate the documentation template:

```mdx
import { Meta, Title, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';

{/* The isTemplate property is required to tell Storybook that this is a template */}
<Meta isTemplate />

<Title />

# Default implementation

<Primary />

## Inputs

The component accepts the following inputs (props):

<Controls />

---

## Additional variations

Listed below are additional variations of the component.

<Stories />
```

### Generate a table of contents

You can enable the table of contents feature to provide a quick overview of the documentation page:

```typescript
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    docs: {
      toc: true, // Enables the table of contents
    },
  },
};

export default preview;
```

### Configure the table of contents

| Option | Description |
| --- | --- |
| `contentsSelector` | Defines the container's CSS selector for search for the headings |
| `disable` | Hides the table of contents for the documentation pages |
| `headingSelector` | Defines the list of headings to feature in the table of contents |
| `ignoreSelector` | Configures the table of contents to ignore specific headings or stories |
| `title` | Defines a title caption for the table of contents |
| `unsafeTocbotOptions` | Provides additional TocBot configuration options |

## Advanced configuration

### Documenting multiple components

Sometimes it's helpful to document multiple components together. For example, a component library's ButtonGroup and Button components might not make sense without one another.

Autodocs allows you to document your "main" component, defined by the `component` property, as well as one or more `subcomponents` related to it:

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';

import { List } from './List';
import { ListItem } from './ListItem';

const meta = {
  component: List,
  subcomponents: { ListItem }, // Adds the ListItem component as a subcomponent
} satisfies Meta<typeof List>;
export default meta;
```

The main component and its subcomponents will show up in a tabbed version of the ArgTypes doc block.

### Customize the Docs Container

The Docs Container is the component that wraps up the documentation page. You can customize it by creating your own component:

```tsx
import * as React from 'react';
import type { Preview } from '@storybook/your-framework';
import { DocsContainer } from '@storybook/addon-docs/blocks';

const ExampleContainer = ({ children, ...props }) => {
  return <DocsContainer {...props}>{children}</DocsContainer>;
};

const preview: Preview = {
  parameters: {
    docs: {
      container: ExampleContainer,
    },
  },
};

export default preview;
```

### Override the default theme

By default, Storybook provides two themes for the UI: `light` and `dark`. You can customize the theme used by the documentation:

```typescript
import type { Preview } from '@storybook/your-framework';
import { themes, ensure } from 'storybook/theming';

const preview: Preview = {
  parameters: {
    docs: {
      theme: ensure(themes.dark), // The replacement theme to use
    },
  },
};

export default preview;
```
