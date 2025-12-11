# Storybook v10 Documentation Index

Local documentation collection for Storybook v10 (React/Next.js focus).

**Source**: https://storybook.js.org/docs
**Collected**: December 2025
**Version**: Storybook 10.1

---

## Overview

- [index.md](./index.md) - Introduction to Storybook

## Get Started

- [get-started/install.md](./get-started/install.md) - Installation guide
- [get-started/whats-a-story.md](./get-started/whats-a-story.md) - What's a story
- [get-started/browse-stories.md](./get-started/browse-stories.md) - Browse stories
- [get-started/setup.md](./get-started/setup.md) - Setup guide
- [get-started/conclusion.md](./get-started/conclusion.md) - Getting started conclusion
- [get-started/why-storybook.md](./get-started/why-storybook.md) - Why Storybook

### Framework Guides

- [get-started/frameworks/react-vite.md](./get-started/frameworks/react-vite.md) - React + Vite setup
- [get-started/frameworks/nextjs.md](./get-started/frameworks/nextjs.md) - Next.js setup (Webpack)
- [get-started/frameworks/nextjs-vite.md](./get-started/frameworks/nextjs-vite.md) - Next.js + Vite setup

## Writing Stories

- [writing-stories/index.md](./writing-stories/index.md) - Introduction to writing stories
- [writing-stories/args.md](./writing-stories/args.md) - Args (story inputs)
- [writing-stories/parameters.md](./writing-stories/parameters.md) - Parameters
- [writing-stories/decorators.md](./writing-stories/decorators.md) - Decorators
- [writing-stories/play-function.md](./writing-stories/play-function.md) - Play functions
- [writing-stories/loaders.md](./writing-stories/loaders.md) - Loaders
- [writing-stories/tags.md](./writing-stories/tags.md) - Tags
- [writing-stories/typescript.md](./writing-stories/typescript.md) - TypeScript

## Writing Tests

- [writing-tests/index.md](./writing-tests/index.md) - Testing overview
- [writing-tests/interaction-testing.md](./writing-tests/interaction-testing.md) - Interaction testing
- [writing-tests/accessibility-testing.md](./writing-tests/accessibility-testing.md) - Accessibility testing
- [writing-tests/visual-testing.md](./writing-tests/visual-testing.md) - Visual testing

### Test Integrations

- [writing-tests/integrations/vitest-addon.md](./writing-tests/integrations/vitest-addon.md) - Vitest addon

## Writing Docs

- [writing-docs/index.md](./writing-docs/index.md) - Documentation overview
- [writing-docs/autodocs.md](./writing-docs/autodocs.md) - Autodocs
- [writing-docs/mdx.md](./writing-docs/mdx.md) - MDX
- [writing-docs/doc-blocks.md](./writing-docs/doc-blocks.md) - Doc Blocks

## Configure

- [configure/index.md](./configure/index.md) - Configuration overview
- [configure/styling-and-css.md](./configure/styling-and-css.md) - Styling and CSS
- [configure/typescript.md](./configure/typescript.md) - TypeScript configuration

## Essentials

- [essentials/actions.md](./essentials/actions.md) - Actions addon
- [essentials/backgrounds.md](./essentials/backgrounds.md) - Backgrounds addon
- [essentials/controls.md](./essentials/controls.md) - Controls addon
- [essentials/viewport.md](./essentials/viewport.md) - Viewport addon

## Addons

- [addons/index.md](./addons/index.md) - Introduction to addons
- [addons/install-addons.md](./addons/install-addons.md) - Installing addons

## API Reference

- [api/csf.md](./api/csf.md) - Component Story Format (CSF)
- [api/arg-types.md](./api/arg-types.md) - ArgTypes
- [api/parameters.md](./api/parameters.md) - Parameters

## Builders

- [builders/vite.md](./builders/vite.md) - Vite builder

## Migration

- [migration-guide.md](./migration-guide.md) - Migration guide for Storybook 10

---

## Quick Reference

### CSF3 Story Format

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

### Interaction Test with Play Function

```typescript
export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByTestId('email'), 'test@example.com');
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('Success')).toBeInTheDocument();
  },
};
```

### TypeScript Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

---

**Total Files**: 41
**Focus**: React, Next.js, Vite, CSF3, TypeScript
