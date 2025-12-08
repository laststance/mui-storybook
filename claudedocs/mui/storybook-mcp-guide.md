# Storybook MCP Integration Guide

## Overview

This project now includes `@storybook/addon-mcp` (v0.1.5) for AI assistant integration.

## Configuration

### .storybook/main.ts

```typescript
{
  name: '@storybook/addon-mcp',
  options: {
    toolsets: {
      dev: true,   // Story URL retrieval and UI building
      docs: true,  // Component manifest and documentation
    },
    experimentalFormat: 'markdown',
  },
}

// Required feature flag
features: {
  experimentalComponentsManifest: true,
}
```

## MCP Endpoint

When Storybook is running:
```
http://localhost:6006/mcp
```

## Claude Code Integration

```bash
claude mcp add storybook-mcp --transport http http://localhost:6006/mcp --scope project
```

## Available Tools

| Tool | Description |
|------|-------------|
| `list-all-components` | Lists all available UI components |
| Component metadata | Exposes component props and types |
| Testing loop | Runs interaction & accessibility tests |

## Requirements

- Storybook 9.1.16+ (current: 10.1.4 ✓)
- Vite-based setup (@storybook/react-vite ✓)
- Node.js 18+

## Alternative: Community MCP Servers

### storybook-mcp-server (Screenshot Capabilities)

```bash
npm install -g storybook-mcp-server
```

Tools: `storybook_list_components`, `storybook_capture_screenshot`, etc.

### storybook-mcp (Custom Tools)

```bash
npx -y storybook-mcp@latest
```

Tools: `getComponentList`, `getComponentsProps`, custom extractors.

## Usage with Claude

1. Start Storybook: `pnpm storybook`
2. MCP server auto-starts at `/mcp`
3. Ask Claude: "List all MUI components from Storybook"

## Benefits

- **Optimized Context**: Minimal token usage for component metadata
- **Self-Healing**: Agents can run tests and fix bugs
- **Pattern Reuse**: Uses established team patterns
- **Benchmarked**: Faster, higher-quality code generation
