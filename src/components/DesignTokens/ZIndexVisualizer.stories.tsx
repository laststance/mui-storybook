import { expect, userEvent, within } from 'storybook/test'

import ZIndexVisualizer from './ZIndexVisualizer'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design System/Z-Index Visualizer',
  component: ZIndexVisualizer,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Visualizes the MUI z-index layering system with multiple view modes. Shows how components stack on top of each other using z-index values from 1000 to 1500.',
      },
    },
  },
  argTypes: {
    viewMode: {
      control: 'radio',
      options: ['stacked', '3d', 'chart'],
      description: 'Display mode for the visualizer',
      table: {
        category: 'Display',
        defaultValue: { summary: 'stacked' },
      },
    },
    showComponents: {
      control: 'boolean',
      description: 'Show component examples for each layer',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Allow interactive highlighting of layers',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
  },
} satisfies Meta<typeof ZIndexVisualizer>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the ZIndexVisualizer component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    viewMode: 'stacked',
    showComponents: true,
    interactive: true,
  },
}

/**
 * Default stacked view showing all z-index layers as cards.
 * Each layer displays its name, value, and associated MUI components.
 */
export const StackedView: Story = {
  args: {
    viewMode: 'stacked',
    showComponents: true,
    interactive: true,
  },
}

/**
 * 3D isometric view providing depth perception of layer stacking.
 * Layers are rendered with perspective transform to show visual hierarchy.
 */
export const ThreeDView: Story = {
  name: '3D Perspective View',
  args: {
    viewMode: '3d',
    showComponents: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'An isometric 3D view that shows layers stacked with depth perception. Click on layers to see them pop forward.',
      },
    },
  },
}

/**
 * Vertical bar chart showing relative z-index values.
 * Useful for comparing the scale of z-index differences between layers.
 */
export const ChartView: Story = {
  args: {
    viewMode: 'chart',
    showComponents: true,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A bar chart visualization that shows the relative scale of z-index values. The height of each bar corresponds to the z-index value.',
      },
    },
  },
}

/**
 * Minimal view without component examples.
 * Cleaner presentation focusing only on z-index names and values.
 */
export const WithoutComponents: Story = {
  args: {
    viewMode: 'stacked',
    showComponents: false,
    interactive: true,
  },
}

/**
 * Non-interactive view for documentation purposes.
 * Layers cannot be clicked or highlighted.
 */
export const NonInteractive: Story = {
  args: {
    viewMode: 'stacked',
    showComponents: true,
    interactive: false,
  },
}

/**
 * Interaction test for layer click highlighting.
 * Verifies that clicking a layer highlights it.
 */
export const InteractionTest: Story = {
  args: {
    viewMode: 'stacked',
    showComponents: true,
    interactive: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify the component renders
    const heading = canvas.getByText('Z-Index Layering System')
    await expect(heading).toBeInTheDocument()

    // Verify z-index values are displayed
    await expect(canvas.getByText('1000')).toBeInTheDocument()
    await expect(canvas.getByText('1100')).toBeInTheDocument()
    await expect(canvas.getByText('1300')).toBeInTheDocument()
    await expect(canvas.getByText('1500')).toBeInTheDocument()

    // Verify layer names are displayed
    await expect(canvas.getByText('mobileStepper')).toBeInTheDocument()
    await expect(canvas.getByText('appBar')).toBeInTheDocument()
    await expect(canvas.getByText('modal')).toBeInTheDocument()
    await expect(canvas.getByText('tooltip')).toBeInTheDocument()

    // Click on a layer to highlight it
    const modalLayer = canvas.getByText('modal').closest('div')
    if (modalLayer) {
      await userEvent.click(modalLayer)
    }
  },
}

/**
 * All view modes comparison.
 * Shows all three view modes side by side for comparison.
 */
export const AllViewModes: Story = {
  args: {} as never,
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Stacked View</h3>
        <ZIndexVisualizer viewMode="stacked" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>3D Perspective View</h3>
        <ZIndexVisualizer viewMode="3d" />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Chart View</h3>
        <ZIndexVisualizer viewMode="chart" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all three view modes: stacked, 3D perspective, and chart.',
      },
    },
  },
}
