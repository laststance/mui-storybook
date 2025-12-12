# MCP Integration Guide

This guide explains how to use **MUI Storybook** with the [Storybook MCP Server](https://github.com/nicoepp/storybook-mcp), enabling AI assistants to interact with our component library.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) allows AI assistants (Claude, Cursor, VS Code Copilot, etc.) to access real-time documentation and component information. By integrating with Storybook MCP Server, you get:

- Accurate, up-to-date component information
- No hallucinated documentation
- Real-time access to props and component structure
- Better AI-assisted development experience

## Quick Setup

Add to your MCP configuration file:

```json
{
  "mcpServers": {
    "mui-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://main--632a01c394385880b3383063.chromatic.com/index.json"
      }
    }
  }
}
```

## Built-in Tools

The Storybook MCP Server provides these built-in tools:

| Tool | Description | Example Use |
|------|-------------|-------------|
| `getComponentList` | Get all available components | "List all MUI components" |
| `getComponentsProps` | Get detailed props for components | "Show Button props" |

### Example Prompts

```
"What components are available in mui-storybook?"
"Show me the props for the TextField component"
"What are the variants available for Button?"
```

## IDE Setup

### Claude Code / Claude Desktop

Create or edit `~/.claude/mcp_servers.json`:

```json
{
  "mcpServers": {
    "mui-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://main--632a01c394385880b3383063.chromatic.com/index.json"
      }
    }
  }
}
```

### Cursor

Create or edit `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "mui-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://main--632a01c394385880b3383063.chromatic.com/index.json"
      }
    }
  }
}
```

### VS Code (with Copilot)

Add to `.vscode/settings.json`:

```json
{
  "mcp.servers": {
    "mui-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://main--632a01c394385880b3383063.chromatic.com/index.json"
      }
    }
  }
}
```

### Windsurf

Create or edit `.windsurf/mcp.json`:

```json
{
  "mcpServers": {
    "mui-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://main--632a01c394385880b3383063.chromatic.com/index.json"
      }
    }
  }
}
```

### JetBrains IDEs

JetBrains IDEs with AI Assistant support MCP through the settings. Add the configuration in:

**Settings > Tools > AI Assistant > MCP Servers**

---

## CUSTOM_TOOLS Configuration

Beyond the built-in tools, you can define **CUSTOM_TOOLS** to extract source code from our Example stories (Dashboard, Forms, etc.).

### Why CUSTOM_TOOLS?

The built-in tools only retrieve component metadata. CUSTOM_TOOLS let AI assistants access **actual source code** from our Example stories, enabling:

- Learning from real implementation patterns
- Asking "How do I build a dashboard like mui-storybook?"
- Understanding actual MUI component compositions

### CUSTOM_TOOLS Interface

```typescript
interface CustomTool {
  name: string;           // Unique tool name
  description: string;    // Tool description for the AI
  parameters: object;     // Input parameters schema (optional)
  page: string;           // URL to navigate to
  handler: string;        // JavaScript code to extract data
}
```

### Example CUSTOM_TOOLS

| Tool Name | Description | Use Case |
|-----------|-------------|----------|
| `getExampleSourceCode` | Get source code by story ID | Generic tool for any example |
| `getDashboardExample` | Get Dashboard example code | Quick access to Dashboard composition |
| `getFormExamples` | Get Form-related examples | Form validation patterns |

### Full Configuration with CUSTOM_TOOLS

```json
{
  "mcpServers": {
    "mui-storybook": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://main--632a01c394385880b3383063.chromatic.com/index.json",
        "CUSTOM_TOOLS": "[{\"name\":\"getExampleSourceCode\",\"description\":\"Get the source code of Example stories like Dashboard, Forms, etc.\",\"parameters\":{\"storyId\":{\"type\":\"string\",\"description\":\"The story ID (e.g., examples-dashboard--admin-dashboard)\"}},\"page\":\"https://main--632a01c394385880b3383063.chromatic.com/?path=/story/${storyId}\",\"handler\":\"(() => { const codePanel = document.querySelector('[id*=\\\"panel-tab-content\\\"]'); const code = codePanel ? codePanel.textContent : document.querySelector('pre')?.textContent; return code || 'Source code not found'; })()\"},{\"name\":\"getDashboardExample\",\"description\":\"Get the Admin Dashboard example source code showing MUI components composition\",\"parameters\":{},\"page\":\"https://main--632a01c394385880b3383063.chromatic.com/?path=/docs/examples-dashboard--docs\",\"handler\":\"Array.from(document.querySelectorAll('pre code')).map(el => el.textContent).join('\\\\n---\\\\n')\"}]"
      }
    }
  }
}
```

### Handler Patterns

Common JavaScript handler patterns for extracting content:

```javascript
// Get code from Docs tab (multiple code blocks)
"Array.from(document.querySelectorAll('pre code')).map(el => el.textContent).join('\\n---\\n')"

// Get code from Story panel
"document.querySelector('.docblock-source code')?.textContent || 'Not found'"

// Get code from specific panel
"document.querySelector('[id*=\"panel-tab-content\"]')?.textContent || 'Not found'"
```

### Available Example Stories

| Story ID | Description |
|----------|-------------|
| `examples-dashboard--admin-dashboard` | Admin Dashboard with charts and data tables |
| `examples-paymentmanagement--default` | Payment management interface |
| `examples-mobilelanding--default` | Mobile-first landing page |

### Example Prompts with CUSTOM_TOOLS

```
"Get the source code for the Admin Dashboard example"
"Show me how the Dashboard example composes MUI components"
"What patterns does the Payment Management example use?"
```

---

## Troubleshooting

### MCP Server Not Connecting

1. Ensure Node.js 18+ is installed
2. Check that `npx` is available in your PATH
3. Verify the Storybook URL is accessible

### CUSTOM_TOOLS Not Working

1. Validate JSON syntax in CUSTOM_TOOLS
2. Ensure handler JavaScript is properly escaped
3. Test the page URL manually in a browser

### Getting "Source code not found"

The handler may need adjustment based on Storybook version. Try alternative selectors:

```javascript
// Alternative selector patterns
"document.querySelector('.docs-story source')?.textContent"
"document.querySelector('[data-testid=\"story-source\"]')?.textContent"
```

---

## References

- [Storybook MCP Server](https://github.com/nicoepp/storybook-mcp)
- [Storybook MCP - Custom Tools](https://github.com/nicoepp/storybook-mcp#custom-tools)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MUI MCP](https://mui.com/material-ui/getting-started/mcp/)
- [MUI Storybook Live](https://main--632a01c394385880b3383063.chromatic.com)
