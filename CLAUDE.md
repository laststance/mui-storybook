# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MUI Storybook is a comprehensive Storybook showcase for MUI v7 components with React 19. It wraps MUI components to demonstrate their usage and provides accessibility testing, theme switching, and design tokens.

## 📚 Pre-Work: Storybook v10 Documentation

**IMPORTANT**: Before planning or implementing any Storybook-related changes, read the relevant documentation in `sb-docs/`.

### Documentation Location

- **Entry Point**: `sb-docs/INDEX.md` - Master index with table of contents
- **Total Files**: 41 markdown files covering Storybook v10 (React/Next.js focus)
- **Source**: Official Storybook documentation (storybook.js.org/docs)

### Task-Specific Reading Guide

| Task Type | Required Reading |
|-----------|------------------|
| New Story | `writing-stories/index.md`, `api/csf.md` |
| Interaction Tests | `writing-stories/play-function.md`, `writing-tests/interaction-testing.md` |
| Accessibility | `writing-tests/accessibility-testing.md` |
| Configuration | `configure/index.md`, `builders/vite.md` |
| Documentation | `writing-docs/autodocs.md`, `writing-docs/mdx.md` |
| Troubleshooting | `migration-guide.md` |

### Key v10 Changes to Know

- **CSF3 Format**: Use `satisfies Meta<typeof Component>` for type safety
- **Play Function API**: Uses `canvas` object directly (alternative to `within(canvasElement)`)
- **Portal Testing**: Use `screen` from `storybook/test` for dialogs/modals/popovers
- **ESM-only**: All `.storybook/main.ts` configuration must be valid ESM
- **Node Requirement**: Node 20.19+ or 22.12+ required

## Commands

```bash
# Development
pnpm storybook              # Launch Storybook dev server on port 6006

# Generate new component (scaffolds both component and story)
pnpm gen <ComponentName>    # Creates src/components/<Name>/<Name>.tsx and .stories.tsx

# Quality checks
pnpm lint                   # ESLint (TypeScript + jsx-a11y + Storybook)
pnpm lint:fix               # ESLint with auto-fix
pnpm typecheck              # TypeScript type checking
pnpm validate               # Runs lint:fix + typecheck + build in parallel

# Testing
pnpm test-storybook         # Run interaction tests (requires Storybook running)
pnpm test-storybook:ci      # CI mode (auto-starts Storybook)

# Build
pnpm build                  # Build static Storybook to storybook-static/
```

## Architecture

### Source Structure
```
src/
├── components/     # 51 MUI wrapper components (Button/, Card/, Dialog/, etc.)
│   └── <Name>/
│       ├── <Name>.tsx           # Wrapper component
│       └── <Name>.stories.tsx   # Storybook stories with interaction tests
├── themes/         # Light/dark theme configs (light.ts, dark.ts)
├── designToken/    # Design token system with provider and selectors
├── examples/       # Real-world example stories (Dashboard, PaymentManagement, MobileLanding)
└── docs/           # MDX documentation files (9 design system docs)
```

### Key Patterns

**Component Wrapper Pattern**: Components wrap MUI components with typed props:
```tsx
import MUIButton from '@mui/material/Button'
const Button: React.FC<ButtonProps> = (props) => <MUIButton {...props} />
```

**Story Format**: Uses Storybook 10 CSF3 with TypeScript:
```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
const meta = { title: 'Components/Name', component: Name, tags: ['autodocs'] } satisfies Meta<typeof Name>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: {} }
```

**Interaction Tests**: Stories can include `play` functions for testing:
```tsx
play: async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')
  await userEvent.click(button)
  await expect(args.onClick).toHaveBeenCalled()
}
```

**Portal Component Testing**: For Dialog, Modal, Popover - use `screen` not `canvas`:
```tsx
play: async ({ canvasElement }) => {
  // Portal components render outside canvasElement
  const dialog = await screen.findByRole('dialog')
  const button = within(dialog).getByRole('button', { name: /cancel/i })
}
```

### Theming

- Theme switching available via `@storybook/addon-themes` toolbar
- Themes defined in `src/themes/` (lightTheme, darkTheme)
- Design tokens in `src/designToken/` with `DesignTokenProvider` context
- Uses styled-components engine via `@mui/styled-engine-sc` resolution
- Custom Storybook theme in `.storybook/MuiBrandTheme.ts`

### Accessibility Testing

Test runner configured in `.storybook/test-runner.ts`:
- Injects axe-core on every story via `preVisit`
- Runs accessibility checks via `postVisit`
- Stories can disable a11y checks with `parameters.a11y.disable: true`
- Stories can customize axe options via `parameters.a11y.options`

## Mandatory Testing Requirements

**IMPORTANT**: After completing any implementation work, you MUST write Playwright tests (interaction tests in stories) to verify the functionality.

### When Tests Are Required

| Change Type | Test Required | Test Type |
|-------------|---------------|-----------|
| New component | ✅ Yes | Story with `play` function |
| Component modification | ✅ Yes | Update/add interaction tests |
| Bug fix | ✅ Yes | Test that reproduces and verifies fix |
| UI/UX changes | ✅ Yes | Visual and interaction verification |
| New story variants | ✅ Yes | `play` function for each variant |

### Exceptions (No Test Required)

- **MCP operations**: Server configurations, tool integrations
- **Documentation only**: MDX content, README updates, comments
- **Configuration**: ESLint, Prettier, TypeScript config changes
- **Theme tokens**: Design token value adjustments (unless affecting behavior)
- **Type definitions**: Interface/type-only changes

### Test Implementation Checklist

Before marking work as complete, verify:

1. ✅ **Interaction tests exist**: Every interactive component has a `play` function
2. ✅ **Tests pass locally**: Run `pnpm test-storybook` (requires Storybook running)
3. ✅ **Portal components tested**: Use `screen` for Dialog/Modal/Popover testing
4. ✅ **Accessibility validated**: axe-core runs automatically via test-runner
5. ✅ **Edge cases covered**: Error states, loading states, empty states

### Test Command Workflow

```bash
# 1. Start Storybook (if not running)
pnpm storybook

# 2. Run interaction tests
pnpm test-storybook

# 3. For CI-style testing (auto-starts Storybook)
pnpm test-storybook:ci
```

### Example: Required Test Pattern

```tsx
import { expect, fn, userEvent, within } from 'storybook/test'

// ❌ INCOMPLETE - Missing play function
export const Primary: Story = {
  args: { variant: 'contained', children: 'Click me' },
}

// ✅ COMPLETE - With interaction test
export const Primary: Story = {
  args: { variant: 'contained', children: 'Click me', onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}
```

### Example: Portal Component Testing (Dialog/Modal/Popover)

Portal components render outside `canvasElement`. Use `screen` from `storybook/test`:

```tsx
import { expect, screen, userEvent, within } from 'storybook/test'

export const DialogTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Click trigger to open dialog
    await userEvent.click(canvas.getByRole('button', { name: /open/i }))

    // Use screen for portal content (NOT canvas)
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    // Interact with dialog content
    const closeButton = within(dialog).getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)
  },
}
```

### Note on Test Runner

This project uses `@storybook/test-runner` which executes Playwright under the hood. The `play` functions in stories become Playwright tests that run in a real browser environment, providing reliable E2E-style testing for components.

## Code Style

- **Import order**: Alphabetized, grouped (builtin → external → internal → relative)
- **Type imports**: Use `import type` for type-only imports
- **JSX props**: Spread remaining props to MUI component
- **Stories**: Include `tags: ['autodocs']` for auto-generated documentation
- **Prettier**: 2-space indent, trailing commas, consistent quotes

## Generator Templates

`pnpm gen` uses Plop with templates in `generators/component/`:
- `Component.tsx.hbs` - Component wrapper template
- `Component.stories.tsx.hbs` - Story file template

## Common Issues

### Storybook Manager Changes
Manager CSS/theme changes require full Storybook restart (not HMR reload).

### Vite Caching
If MDX imports fail, clear cache:
```bash
rm -rf node_modules/.vite .storybook/.cache
```

### Port Conflict
Free port 6006 if dev server fails:
```bash
kill-port 6006
```
