import { expect, userEvent, within } from 'storybook/test'

import TypographyShowcase from './TypographyShowcase'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/Typography Showcase',
  component: TypographyShowcase,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive showcase of all MUI typography variants with live previews, CSS properties, font weights, and an interactive text editor.',
      },
    },
  },
  argTypes: {
    showEditor: {
      control: 'boolean',
      description: 'Show the interactive text editor',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Display Options',
      },
    },
    showFontWeights: {
      control: 'boolean',
      description: 'Show the font weights section',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Display Options',
      },
    },
    showFontFamily: {
      control: 'boolean',
      description: 'Show the font family information',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Display Options',
      },
    },
    initialSampleText: {
      control: 'text',
      description: 'Initial sample text for the interactive editor',
      table: {
        defaultValue: {
          summary: 'The quick brown fox jumps over the lazy dog',
        },
        category: 'Content',
      },
    },
  },
} satisfies Meta<typeof TypographyShowcase>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default showcase with all features enabled.
 * Use the interactive editor to preview custom text across all typography variants.
 */
export const Default: Story = {
  args: {
    showEditor: true,
    showFontWeights: true,
    showFontFamily: true,
    initialSampleText: 'The quick brown fox jumps over the lazy dog',
  },
}

/**
 * A minimal view showing only the typography variants without editor or font details.
 */
export const MinimalView: Story = {
  args: {
    showEditor: false,
    showFontWeights: false,
    showFontFamily: false,
  },
}

/**
 * Showcase with only typography variants and font family information.
 */
export const WithFontFamilyOnly: Story = {
  args: {
    showEditor: false,
    showFontWeights: false,
    showFontFamily: true,
  },
}

/**
 * Showcase with the interactive editor enabled for custom text preview.
 */
export const WithInteractiveEditor: Story = {
  args: {
    showEditor: true,
    showFontWeights: false,
    showFontFamily: false,
    initialSampleText: 'Custom sample text',
  },
}

/**
 * Complete showcase with custom initial text.
 */
export const CustomText: Story = {
  args: {
    showEditor: true,
    showFontWeights: true,
    showFontFamily: true,
    initialSampleText: 'Design systems empower teams to build consistent UIs.',
  },
}

/**
 * Interactive test story to verify component functionality.
 */
export const InteractionTest: Story = {
  args: {
    showEditor: true,
    showFontWeights: true,
    showFontFamily: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify main title renders', async () => {
      const title = canvas.getByText('Typography System')
      await expect(title).toBeInTheDocument()
    })

    await step('Verify font family section renders', async () => {
      const fontFamilyHeading = canvas.getByText('Font Family')
      await expect(fontFamilyHeading).toBeInTheDocument()
    })

    await step('Verify font weights section renders', async () => {
      const fontWeightsHeading = canvas.getByText('Font Weights')
      await expect(fontWeightsHeading).toBeInTheDocument()

      // Check for weight labels
      const lightLabel = canvas.getByText('Light (300)')
      const regularLabel = canvas.getByText('Regular (400)')
      const mediumLabel = canvas.getByText('Medium (500)')
      const boldLabel = canvas.getByText('Bold (700)')

      await expect(lightLabel).toBeInTheDocument()
      await expect(regularLabel).toBeInTheDocument()
      await expect(mediumLabel).toBeInTheDocument()
      await expect(boldLabel).toBeInTheDocument()
    })

    await step('Verify interactive editor renders', async () => {
      const textField = canvas.getByLabelText('Custom Sample Text')
      await expect(textField).toBeInTheDocument()
    })

    await step('Verify typography variants render', async () => {
      // Check for variant chips
      const h1Chip = canvas.getByText('h1')
      const body1Chip = canvas.getByText('body1')
      const captionChip = canvas.getByText('caption')

      await expect(h1Chip).toBeInTheDocument()
      await expect(body1Chip).toBeInTheDocument()
      await expect(captionChip).toBeInTheDocument()
    })

    await step('Verify CSS properties tables render', async () => {
      // Check for property headers in tables
      const fontSizeCells = canvas.getAllByText('fontSize')
      const fontWeightCells = canvas.getAllByText('fontWeight')
      const lineHeightCells = canvas.getAllByText('lineHeight')

      await expect(fontSizeCells.length).toBeGreaterThan(0)
      await expect(fontWeightCells.length).toBeGreaterThan(0)
      await expect(lineHeightCells.length).toBeGreaterThan(0)
    })

    await step('Test interactive editor functionality', async () => {
      const textField = canvas.getByLabelText('Custom Sample Text')

      // Clear and type new text
      await userEvent.clear(textField)
      await userEvent.type(textField, 'New custom text')

      // Verify input value updated
      await expect(textField).toHaveValue('New custom text')
    })
  },
}

/**
 * Accessibility-focused story with appropriate testing configuration.
 */
export const AccessibilityDemo: Story = {
  args: {
    showEditor: true,
    showFontWeights: true,
    showFontFamily: true,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'heading-order', enabled: true },
        ],
      },
    },
    docs: {
      description: {
        story:
          'This story demonstrates accessibility best practices with proper heading hierarchy and color contrast.',
      },
    },
  },
}
