# MUI Design System Reference

Quick reference for MUI design system values used in this project.

## Theme Files

| File | Purpose |
|------|---------|
| `src/themes/light.ts` | Light theme configuration |
| `src/themes/dark.ts` | Dark theme configuration |
| `src/designToken/index.ts` | Design token provider |

## Color Palette

### Light Theme
```typescript
primary.main: '#1976d2'
secondary.main: '#9c27b0'
background.default: '#fafafa'
background.paper: '#ffffff'
```

### Dark Theme
```typescript
primary.main: '#90caf9'
secondary.main: '#ce93d8'
background.default: '#0a1929'
background.paper: '#001e3c'
```

## Spacing Scale (8px base)

| Factor | Pixels | Use |
|--------|--------|-----|
| 1 | 8px | Icon gaps |
| 2 | 16px | Default padding |
| 3 | 24px | Card padding |
| 4 | 32px | Section gaps |
| 6 | 48px | Major sections |

## Breakpoints

| Key | Value | Description |
|-----|-------|-------------|
| xs | 0px | Mobile |
| sm | 600px | Tablet |
| md | 900px | Desktop |
| lg | 1200px | Large desktop |
| xl | 1536px | Extra large |

## Typography Scale

| Variant | Size | Weight | Use |
|---------|------|--------|-----|
| h1 | 6rem | 300 | Hero |
| h2 | 3.75rem | 300 | Page title |
| h3 | 3rem | 400 | Section |
| h4 | 2.125rem | 400 | Subsection |
| h5 | 1.5rem | 400 | Card title |
| h6 | 1.25rem | 500 | Small header |
| body1 | 1rem | 400 | Primary text |
| body2 | 0.875rem | 400 | Secondary text |
| caption | 0.75rem | 400 | Help text |

## Shadows (Key Levels)

| Level | Use |
|-------|-----|
| 0 | Flat |
| 1 | Cards |
| 2 | Raised buttons |
| 4 | FAB |
| 8 | Dialogs |
| 16 | Drawer |
| 24 | Modal |

## Z-Index

| Token | Value | Element |
|-------|-------|---------|
| appBar | 1100 | App bar |
| drawer | 1200 | Drawer |
| modal | 1300 | Modal |
| snackbar | 1400 | Snackbar |
| tooltip | 1500 | Tooltip |

## Component Count

**Total: 51 components**

- Inputs: 10 (Button, TextField, Select, etc.)
- Data Display: 9 (Typography, Avatar, Badge, etc.)
- Feedback: 6 (Alert, Dialog, Progress, etc.)
- Surfaces: 4 (Card, Paper, Accordion, AppBar)
- Navigation: 10 (Menu, Tabs, Drawer, etc.)
- Layout: 7 (Grid, Stack, Box, etc.)
- Utils: 5 (Modal, Popover, Transitions, etc.)

## Documentation

MDX docs in `src/docs/`:
- Introduction.mdx
- GettingStarted.mdx
- Theming.mdx
- DesignTokens.mdx
- Colors.mdx
- Typography.mdx
- Spacing.mdx
- Breakpoints.mdx
- Customization.mdx

## Storybook Configuration

- **Port**: 6006
- **Framework**: @storybook/react-vite
- **Addons**: a11y, docs, themes, mcp
- **MCP Endpoint**: http://localhost:6006/mcp
