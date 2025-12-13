import { expect, within } from 'storybook/test'

import PaletteVisualizer from './PaletteVisualizer'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/PaletteVisualizer',
  component: PaletteVisualizer,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive palette visualizer that displays all MUI theme colors dynamically based on the current theme mode.

## Features
- **Semantic Colors**: Primary, secondary, error, warning, info, success with main/light/dark/contrastText variants
- **Grey Scale**: All 14 grey values (50-900 + A100-A700)
- **Text Colors**: Primary, secondary, and disabled text colors
- **Background Colors**: Default and paper background colors
- **Action Colors**: Active, hover, selected, disabled, and disabledBackground colors
- **Common Colors**: Black and white
- **Divider Color**: Theme divider color

## Accessibility
- Each color swatch displays WCAG AA/AAA compliance badges
- Contrast ratios are calculated against the background.default color
- Color swatches are keyboard accessible and copyable

## Usage
Switch between light and dark themes using the Storybook toolbar to see how the palette changes.
        `,
      },
    },
  },
  argTypes: {
    showSemanticColors: {
      control: 'boolean',
      description: 'Show semantic colors (primary, secondary, error, etc.)',
      table: { category: 'Visibility' },
    },
    showGreyScale: {
      control: 'boolean',
      description: 'Show grey scale palette',
      table: { category: 'Visibility' },
    },
    showTextColors: {
      control: 'boolean',
      description: 'Show text colors',
      table: { category: 'Visibility' },
    },
    showBackgroundColors: {
      control: 'boolean',
      description: 'Show background colors',
      table: { category: 'Visibility' },
    },
    showActionColors: {
      control: 'boolean',
      description: 'Show action colors',
      table: { category: 'Visibility' },
    },
    showCommonColors: {
      control: 'boolean',
      description: 'Show common colors (black, white)',
      table: { category: 'Visibility' },
    },
    showDividerColor: {
      control: 'boolean',
      description: 'Show divider color',
      table: { category: 'Visibility' },
    },
  },
} satisfies Meta<typeof PaletteVisualizer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Displays the complete MUI palette with all color categories.
 * Use the theme switcher in the toolbar to see light/dark mode variations.
 */
export const Default: Story = {
  args: {
    showSemanticColors: true,
    showGreyScale: true,
    showTextColors: true,
    showBackgroundColors: true,
    showActionColors: true,
    showCommonColors: true,
    showDividerColor: true,
  },
}

/**
 * Displays only the semantic colors (primary, secondary, error, warning, info, success).
 * Each semantic color shows its main, light, dark, and contrastText variants.
 */
export const SemanticColorsOnly: Story = {
  args: {
    showSemanticColors: true,
    showGreyScale: false,
    showTextColors: false,
    showBackgroundColors: false,
    showActionColors: false,
    showCommonColors: false,
    showDividerColor: false,
  },
}

/**
 * Displays only the grey scale with all 14 values.
 * Includes both numbered greys (50-900) and accent greys (A100-A700).
 */
export const GreyScaleOnly: Story = {
  args: {
    showSemanticColors: false,
    showGreyScale: true,
    showTextColors: false,
    showBackgroundColors: false,
    showActionColors: false,
    showCommonColors: false,
    showDividerColor: false,
  },
}

/**
 * Displays text, background, and action colors - useful for understanding
 * how UI elements like text and interactive states are colored.
 */
export const UIColors: Story = {
  args: {
    showSemanticColors: false,
    showGreyScale: false,
    showTextColors: true,
    showBackgroundColors: true,
    showActionColors: true,
    showCommonColors: false,
    showDividerColor: true,
  },
}

/**
 * Tests the click-to-copy functionality of color swatches.
 */
export const CopyInteraction: Story = {
  args: {
    showSemanticColors: true,
    showGreyScale: false,
    showTextColors: false,
    showBackgroundColors: false,
    showActionColors: false,
    showCommonColors: false,
    showDividerColor: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find a color swatch button
    const primaryMainSwatch = canvas.getByRole('button', {
      name: /copy primary\.main color/i,
    })

    await expect(primaryMainSwatch).toBeInTheDocument()
    await expect(primaryMainSwatch).toBeVisible()

    // Test keyboard navigation
    primaryMainSwatch.focus()
    await expect(primaryMainSwatch).toHaveFocus()

    // Note: Skip actual clipboard copy test in CI as clipboard API
    // is not available in headless browser environments
    // The button existence and accessibility is verified above
  },
}

/**
 * Tests keyboard accessibility - swatches should be focusable and activatable via keyboard.
 */
export const KeyboardAccessibility: Story = {
  args: {
    showSemanticColors: false,
    showGreyScale: false,
    showTextColors: false,
    showBackgroundColors: false,
    showActionColors: false,
    showCommonColors: true,
    showDividerColor: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find color swatches
    const blackSwatch = canvas.getByRole('button', {
      name: /copy common\.black color/i,
    })
    const whiteSwatch = canvas.getByRole('button', {
      name: /copy common\.white color/i,
    })

    // Verify both swatches exist
    await expect(blackSwatch).toBeInTheDocument()
    await expect(whiteSwatch).toBeInTheDocument()

    // Test that swatches have correct tabIndex for keyboard navigation
    await expect(blackSwatch).toHaveAttribute('tabindex', '0')
    await expect(whiteSwatch).toHaveAttribute('tabindex', '0')

    // Focus the black swatch
    blackSwatch.focus()
    await expect(blackSwatch).toHaveFocus()

    // Note: Skip actual keyboard activation (Enter) in CI as it triggers
    // clipboard API which is not available in headless browser environments
    // The keyboard focusability is verified above
  },
}

/**
 * Displays the minimal view with only common colors for documentation purposes.
 */
export const MinimalView: Story = {
  args: {
    showSemanticColors: false,
    showGreyScale: false,
    showTextColors: false,
    showBackgroundColors: true,
    showActionColors: false,
    showCommonColors: true,
    showDividerColor: false,
  },
}
