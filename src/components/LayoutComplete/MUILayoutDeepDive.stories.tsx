import { expect, userEvent, within } from 'storybook/test'

import MUILayoutDeepDive from './MUILayoutDeepDive'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/MUILayoutDeepDive',
  component: MUILayoutDeepDive,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive interactive component that explains MUI Layout components (Box, Container, Grid, Stack, Masonry) with deep technical specifications.

## Features

- **Tabbed Navigation**: Switch between different layout components
- **Property Specifications**: Detailed table of props with types, defaults, and descriptions
- **Color-coded Categories**: Visual distinction between padding (blue), margin (orange), spacing (green), layout (purple), and behavior (grey)
- **Code Examples**: Expandable syntax-highlighted code snippets
- **Interactive Tools**: Spacing calculator and visual diagrams
- **Breakpoint Charts**: Visual representation of Container maxWidth values
- **Grid Visualizer**: Interactive 12-column grid demonstration

## Layout Components Covered

1. **Box** - Utility wrapper with sx prop system
2. **Container** - Responsive max-width centering
3. **Grid v2** - 12-column flexbox grid system
4. **Stack** - One-dimensional spacing layout
5. **Masonry** - Pinterest-style varying-height columns
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  argTypes: {
    initialTab: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      mapping: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
      },
      description:
        'The initially selected tab index (0=Box, 1=Container, 2=Grid, 3=Stack, 4=Masonry)',
      table: {
        category: 'Initial State',
        defaultValue: { summary: '0' },
      },
    },
    expandedCodeByDefault: {
      control: 'boolean',
      description: 'Whether code examples are expanded by default',
      table: {
        category: 'Initial State',
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof MUILayoutDeepDive>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the MUILayoutDeepDive component.
 * Use the Controls panel to experiment with initial state.
 */
export const Playground: Story = {
  args: {
    initialTab: 0,
    expandedCodeByDefault: false,
  },
}

/**
 * Default state showing the Box component specifications.
 */
export const Default: Story = {
  args: {},
}

/**
 * Shows the Grid component tab with code examples expanded.
 */
export const GridWithCodeExpanded: Story = {
  args: {
    initialTab: 2,
    expandedCodeByDefault: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the Grid v2 component specifications with code examples visible by default.',
      },
    },
  },
}

/**
 * Shows the Container component specifications.
 */
export const ContainerSpecs: Story = {
  args: {
    initialTab: 1,
    expandedCodeByDefault: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays Container component details including the breakpoint visualization chart.',
      },
    },
  },
}

/**
 * Shows the Stack component specifications.
 */
export const StackSpecs: Story = {
  args: {
    initialTab: 3,
    expandedCodeByDefault: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays Stack component details with the spacing calculator.',
      },
    },
  },
}

/**
 * Shows the Masonry component specifications.
 */
export const MasonrySpecs: Story = {
  args: {
    initialTab: 4,
    expandedCodeByDefault: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays Masonry component details (note: requires @mui/lab import).',
      },
    },
  },
}

/**
 * Interaction test: Tab navigation works correctly.
 */
export const TabNavigationTest: Story = {
  args: {
    initialTab: 0,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify initial Box tab is selected', async () => {
      const boxTab = canvas.getByRole('tab', { name: /box/i })
      expect(boxTab).toHaveAttribute('aria-selected', 'true')
    })

    await step('Click on Container tab', async () => {
      const containerTab = canvas.getByRole('tab', { name: /container/i })
      await userEvent.click(containerTab)
      expect(containerTab).toHaveAttribute('aria-selected', 'true')
    })

    await step('Click on Grid tab', async () => {
      const gridTab = canvas.getByRole('tab', { name: /grid/i })
      await userEvent.click(gridTab)
      expect(gridTab).toHaveAttribute('aria-selected', 'true')
    })

    await step('Click on Stack tab', async () => {
      const stackTab = canvas.getByRole('tab', { name: /stack/i })
      await userEvent.click(stackTab)
      expect(stackTab).toHaveAttribute('aria-selected', 'true')
    })

    await step('Click on Masonry tab', async () => {
      const masonryTab = canvas.getByRole('tab', { name: /masonry/i })
      await userEvent.click(masonryTab)
      expect(masonryTab).toHaveAttribute('aria-selected', 'true')
    })
  },
}

/**
 * Interaction test: Spacing calculator works correctly.
 */
export const SpacingCalculatorTest: Story = {
  args: {
    initialTab: 3, // Stack tab shows spacing calculator
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify spacing calculator is visible', async () => {
      const calculatorHeading = canvas.getAllByText(/spacing calculator/i)
      expect(calculatorHeading.length).toBeGreaterThan(0)
    })

    await step('Verify slider is present', async () => {
      const sliders = canvas.getAllByRole('slider', { name: /spacing/i })
      expect(sliders.length).toBeGreaterThan(0)
    })
  },
}

/**
 * Interaction test: Code expansion toggle works.
 */
export const CodeExpansionTest: Story = {
  args: {
    initialTab: 0,
    expandedCodeByDefault: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Find and click code expand button', async () => {
      // Find the expand button
      const expandButton = canvas.getByRole('button', { name: /expand code/i })
      expect(expandButton).toBeInTheDocument()

      await userEvent.click(expandButton)

      // After expansion, the button should change to collapse
      const collapseButton = canvas.getByRole('button', {
        name: /collapse code/i,
      })
      expect(collapseButton).toBeInTheDocument()
    })
  },
}

/**
 * Accessibility demo with all interactive elements visible.
 */
export const AccessibilityDemo: Story = {
  args: {
    initialTab: 2,
    expandedCodeByDefault: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features: proper ARIA labels, keyboard navigation support, and sufficient color contrast.',
      },
    },
  },
}
