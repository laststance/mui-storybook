import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs/blocks'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { useGlobals } from 'storybook/preview-api'

import { DesignTokenProvider, designToken } from '../src/designToken'
import { lightTheme, darkTheme } from '../src/themes'
import { LocaleProvider } from './components/LocalizedDoc'

import muiBrandTheme from './MuiBrandTheme'

import type { Preview } from '@storybook/react-vite'
import type { ComponentProps, PropsWithChildren } from 'react'

// ════════════════════════════════════════════════════════════
// Locale Bridge Decorator (for Stories)
// ════════════════════════════════════════════════════════════
// Bridges Storybook's useGlobals() (only available in decorators)
// to our LocaleProvider (React Context available everywhere)
const withLocaleProvider = (Story: React.ComponentType) => {
  const [globals] = useGlobals()
  const locale = (globals.locale as 'en' | 'ja') || 'en'

  return (
    <LocaleProvider locale={locale}>
      <Story />
    </LocaleProvider>
  )
}

// ════════════════════════════════════════════════════════════
// Custom DocsContainer (for MDX Documentation Pages)
// ════════════════════════════════════════════════════════════
// MDX prose content renders outside the story decorator chain,
// so we need to wrap the DocsContainer with LocaleProvider too.
type DocsContainerProps = PropsWithChildren<ComponentProps<typeof BaseDocsContainer>>

const DocsContainer = ({ children, context, ...props }: DocsContainerProps) => {
  // Access globals from Storybook's GlobalsStore
  // In SB10, userGlobals is a GlobalsStore class with globals property
  const globalsStore = context.store?.userGlobals as { globals?: Record<string, unknown> } | undefined
  const globals = globalsStore?.globals || {}
  const locale = (globals.locale as 'en' | 'ja') || 'en'

  return (
    <BaseDocsContainer context={context} {...props}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </BaseDocsContainer>
  )
}

const preview: Preview = {
  // ════════════════════════════════════════════════════════════
  // Internationalization (i18n) - Language Switching
  // ════════════════════════════════════════════════════════════
  initialGlobals: {
    locale: 'en',
    locales: {
      en: { icon: '🇺🇸', title: 'English', right: 'EN' },
      ja: { icon: '🇯🇵', title: '日本語', right: 'JA' },
    },
  },

  parameters: {
    // ════════════════════════════════════════════════════════════
    // Accessibility testing configuration
    // ════════════════════════════════════════════════════════════
    a11y: {
      // Set to 'todo' to log a11y violations without failing tests
      // Valid values: 'error' (fail), 'todo' (warn only), 'off' (disable)
      // This allows CI to pass while still surfacing issues for review
      test: 'todo',
    },
    docs: {
      theme: muiBrandTheme,
      autodocs: true,
      codePanel: true, // Show source code panel on Canvas (story) pages
      canvas: {
        sourceState: 'hidden',
      },
      // Custom DocsContainer wraps MDX content with LocaleProvider
      container: DocsContainer,
    },
    options: {
      storySort: {
        order: [
          // ════════════════════════════════════════════════════════════
          // 1st: Design System Documentation (MDX)
          // ════════════════════════════════════════════════════════════
          'Design System',
          [
            'Introduction',
            'Getting Started',
            'Theming',
            'Design Tokens',
            'Typography',
            'Colors',
            'Spacing',
            'Breakpoints',
            'Customization',
            'Layout Complete',
            '*',
          ],
          // ════════════════════════════════════════════════════════════
          // 2nd: Design Tokens (Visual showcases)
          // ════════════════════════════════════════════════════════════
          'Design Tokens',
          [
            'ThemeExplorer',
            'PaletteVisualizer',
            'Typography Showcase',
            'Spacing',
            'Shadows Elevation',
            'Breakpoints',
            'Transitions Demo',
            '*',
          ],
          // ════════════════════════════════════════════════════════════
          // 3rd: Layout Complete (Layout patterns gallery)
          // ════════════════════════════════════════════════════════════
          'Layout Complete',
          [
            'LayoutPatternsGallery',
            'Layouts',
            [
              // Column-Based (5)
              'SingleColumn',
              'TwoColumn',
              'ThreeColumn',
              'LeftRight',
              'MultiColumn',
              // Grid-Based (4)
              'Grid',
              'Masonry',
              'BrokenGrid',
              'NonGrid',
              // Scroll/Flow (4)
              'FullScreen',
              'CardBased',
              'InfiniteScroll',
              'Parallax',
              // Container/Flow (5)
              'Stack',
              'Ribbon',
              'SplitScreen',
              'OffCanvas',
              'LiquidResponsive',
              // Data Display (6)
              'Tabbed',
              'MultiPanel',
              'Timeline',
              'Catalog',
              'Comparison',
              'FormBased',
              // Special (6)
              'FAB',
              'Overlay',
              'Circular',
              'Canvas',
              'Hierarchical',
              'Scattered',
            ],
            '*',
          ],
          // ════════════════════════════════════════════════════════════
          // 4th: Examples (Real-world implementations)
          // ════════════════════════════════════════════════════════════
          'Examples',
          [
            'Dashboard',
            'Payment Management',
            'Mobile Landing',
            '*',
          ],
          // ════════════════════════════════════════════════════════════
          // Components (organized by category)
          // ════════════════════════════════════════════════════════════
          'Inputs',
          'Data Display',
          'Feedback',
          'Surfaces',
          'Navigation',
          'Layout',
          'Utils',
          '*',
        ],
      },
    },
    layout: 'centered',
    // ════════════════════════════════════════════════════════════
    // Backgrounds addon - completely disabled
    // MUI ThemeProvider handles background colors via theme switching
    // ════════════════════════════════════════════════════════════
    backgrounds: {
      disable: true, // Disable the feature (correct v10 API)
      options: {}, // Empty options = hide toolbar dropdown
      grid: {
        disable: true, // Also disable the grid feature
      },
    },
    // ════════════════════════════════════════════════════════════
    // Controls configuration
    // ════════════════════════════════════════════════════════════
    controls: {
      expanded: true, // Expand object/array controls
      sort: 'requiredFirst', // Required props first, then alphabetical
    },
  },

  // ════════════════════════════════════════════════════════════
  // Global argTypes for common MUI patterns
  // ════════════════════════════════════════════════════════════
  argTypes: {
    // Hide internal/advanced props
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    classes: { table: { disable: true } },

    // Disable sx (too complex for controls)
    sx: {
      control: false,
      description: 'The system prop for defining custom styles.',
      table: {
        category: 'Advanced',
        type: { summary: 'SxProps<Theme>' },
      },
    },

    // Event handlers - use actions, not controls
    onClick: {
      action: 'clicked',
      control: false,
      table: { category: 'Events' },
    },
    onChange: {
      action: 'changed',
      control: false,
      table: { category: 'Events' },
    },
    onClose: {
      action: 'closed',
      control: false,
      table: { category: 'Events' },
    },
    onOpen: { action: 'opened', control: false, table: { category: 'Events' } },
    onFocus: {
      action: 'focused',
      control: false,
      table: { category: 'Events' },
    },
    onBlur: {
      action: 'blurred',
      control: false,
      table: { category: 'Events' },
    },
    onSubmit: {
      action: 'submitted',
      control: false,
      table: { category: 'Events' },
    },
  },

  decorators: [
    // ════════════════════════════════════════════════════════════
    // Locale Provider - MUST be first to provide context to all components
    // ════════════════════════════════════════════════════════════
    withLocaleProvider,
    // Wrapper to ensure proper height and padding for components
    (Story) => (
      <Box
        sx={{
          minHeight: '100px',
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Story />
      </Box>
    ),
    (Story) => (
      <DesignTokenProvider theme={designToken}>
        <Story />
      </DesignTokenProvider>
    ),
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
}

export default preview
