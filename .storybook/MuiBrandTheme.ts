import { create } from 'storybook/theming/create'

export default create({
  base: 'light',

  // Brand colors - Sky/Light Blue palette for fresh, airy aesthetic (2025)
  colorPrimary: '#0ea5e9', // Sky-500 - vibrant, modern primary
  colorSecondary: '#0284c7', // Sky-600 - depth and emphasis

  // UI - Sky-based light theme with fresh, airy feeling
  appBg: '#f0f9ff', // Sky-50 - very light blue, airy base
  appContentBg: '#ffffff', // Pure white for maximum content contrast
  appBorderColor: '#7dd3fc', // Sky-300 - visible but soft borders
  appBorderRadius: 12, // Modern rounded corners (2025 standard)

  // Typography - Modern Inter font stack
  fontBase:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontCode:
    '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Andale Mono", monospace',

  // Text colors - Balanced contrast for excellent readability
  textColor: '#0c4a6e', // Sky-900 - deep blue-gray for primary text
  textInverseColor: '#ffffff',
  textMutedColor: '#0369a1', // Sky-700 - muted blue for secondary text

  // Toolbar - Sky-themed with optimized contrast
  barTextColor: '#0c4a6e', // Sky-900 - maximum readability on light blue
  barSelectedColor: '#0ea5e9', // Sky-500 - vibrant selected state
  barHoverColor: '#bae6fd', // Sky-200 - visible hover feedback
  barBg: '#e0f2fe', // Sky-100 - light blue toolbar background

  // Form colors - Clean and modern with sky tint
  inputBg: '#ffffff',
  inputBorder: '#38bdf8', // Sky-400 - clear, visible borders
  inputTextColor: '#0c4a6e', // Sky-900 - maximum readability
  inputBorderRadius: 8,

  // Button colors - Vibrant and cohesive
  buttonBg: '#0ea5e9', // Sky-500 - vibrant primary action
  buttonBorder: '#0284c7', // Sky-600 - subtle depth

  // Boolean inputs - Clear and modern
  booleanBg: '#e0f2fe', // Sky-100 - subtle background
  booleanSelectedBg: '#0ea5e9', // Sky-500 - consistent with primary

  // Grid colors for canvas
  gridCellSize: 10,

  // Brand
  brandTitle: 'MUI Storybook',
  brandUrl: 'https://mui.com/',
  brandTarget: '_blank',
})
