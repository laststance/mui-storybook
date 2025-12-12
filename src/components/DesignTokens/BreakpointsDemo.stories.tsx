import { expect, within } from 'storybook/test'

import BreakpointsDemo from './BreakpointsDemo'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/Breakpoints',
  component: BreakpointsDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive visualization of MUI's breakpoint system.

## Features
- **Breakpoint Scale**: Visual cards for each breakpoint (xs, sm, md, lg, xl)
- **Current Viewport Indicator**: Shows which breakpoint is currently active
- **Visual Range Bars**: Color-coded bars showing each breakpoint's range
- **Media Query Examples**: Demonstrates up(), down(), only(), and between() helper methods
- **Responsive Demo**: A box that changes color and size at different breakpoints

## MUI Default Breakpoints
| Breakpoint | Min-Width |
|------------|-----------|
| xs | 0px |
| sm | 600px |
| md | 900px |
| lg | 1200px |
| xl | 1536px |

## Usage
\`\`\`tsx
import { useTheme, useMediaQuery } from '@mui/material'

const theme = useTheme()

// Using breakpoint helpers
theme.breakpoints.up('md')      // >= 900px
theme.breakpoints.down('md')    // < 900px
theme.breakpoints.only('md')    // 900px - 1199px
theme.breakpoints.between('sm', 'lg') // 600px - 1199px

// With useMediaQuery
const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof BreakpointsDemo>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default view showing all breakpoint visualizations.
 * Resize your browser window to see the active breakpoint change.
 */
export const Default: Story = {}

/**
 * Interactive test to verify the component renders all breakpoint elements.
 */
export const InteractionTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify main heading renders', async () => {
      const heading = canvas.getByText('MUI Breakpoints')
      expect(heading).toBeInTheDocument()
    })

    await step('Verify all breakpoint cards render', async () => {
      const breakpoints = ['XS', 'SM', 'MD', 'LG', 'XL']
      for (const bp of breakpoints) {
        // Some breakpoints appear multiple times (e.g., in header and card)
        const cards = canvas.getAllByText(bp)
        expect(cards.length).toBeGreaterThan(0)
        expect(cards[0]).toBeInTheDocument()
      }
    })

    await step('Verify breakpoint labels render', async () => {
      const labels = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large']
      for (const label of labels) {
        // Some labels may appear multiple times
        const elements = canvas.getAllByText(label)
        expect(elements.length).toBeGreaterThan(0)
        expect(elements[0]).toBeInTheDocument()
      }
    })

    await step('Verify current viewport indicator exists', async () => {
      const viewportIndicator = canvas.getByText(/Current Viewport:/i)
      expect(viewportIndicator).toBeInTheDocument()
    })

    await step('Verify breakpoint scale section exists', async () => {
      const scaleSection = canvas.getByText('Breakpoint Scale')
      expect(scaleSection).toBeInTheDocument()
    })

    await step('Verify media query examples section exists', async () => {
      const mediaQuerySection = canvas.getByText('Media Query Helper Methods')
      expect(mediaQuerySection).toBeInTheDocument()
    })

    await step('Verify responsive demo section exists', async () => {
      const demoSection = canvas.getByText('Responsive Demo Box')
      expect(demoSection).toBeInTheDocument()
    })

    await step('Verify media query methods are documented', async () => {
      const methods = ['up()', 'down()', 'only()', 'between()']
      for (const method of methods) {
        const element = canvas.getByText(method)
        expect(element).toBeInTheDocument()
      }
    })
  },
}

/**
 * Story showcasing the breakpoint table with all default values.
 */
export const BreakpointTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows the breakpoint values table with min-width values and CSS media queries.',
      },
    },
  },
}

/**
 * Story demonstrating the responsive demo box.
 * The box changes color and size based on the current breakpoint.
 */
export const ResponsiveBox: Story = {
  parameters: {
    docs: {
      description: {
        story: `
The responsive demo box demonstrates how MUI's \`sx\` prop can apply different styles at each breakpoint.

\`\`\`tsx
<Box
  sx={{
    width: {
      xs: '100%',
      sm: '80%',
      md: '60%',
      lg: '50%',
      xl: '40%',
    },
    backgroundColor: {
      xs: '#f44336', // red
      sm: '#ff9800', // orange
      md: '#ffeb3b', // yellow
      lg: '#4caf50', // green
      xl: '#2196f3', // blue
    },
  }}
/>
\`\`\`
        `,
      },
    },
  },
}
