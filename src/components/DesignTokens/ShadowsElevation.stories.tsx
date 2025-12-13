import Box from '@mui/material/Box'
import { expect, within } from 'storybook/test'

import {
  createBooleanArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import ShadowsElevation, {
  ElevationBox,
  InteractiveElevation,
} from './ShadowsElevation'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Design Tokens/Shadows Elevation',
  component: ShadowsElevation,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    docs: {
      description: {
        component: `
MUI provides 25 elevation levels (0-24) that create depth through shadows.
Each level corresponds to a specific box-shadow CSS value defined in the theme.

## Elevation Guidelines

| Level | Recommended Usage |
|-------|-------------------|
| 0 | Flat surfaces, no shadow |
| 1 | Cards at rest, Switch |
| 2 | Raised buttons, Search bar |
| 4 | App bar, FAB at rest |
| 6 | Snackbar, FAB (pressed) |
| 8 | Bottom navigation, Menu, Picker dialogs |
| 16 | Navigation drawer, Modal side sheet |
| 24 | Dialog, Modal bottom sheet |

## Theme Access

Access shadows programmatically via the theme:
\`\`\`tsx
const theme = useTheme();
const shadow4 = theme.shadows[4]; // Returns CSS box-shadow value
\`\`\`
        `,
      },
    },
  },
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    showInteractive: createBooleanArgType(
      'Whether to show the interactive slider component.',
      false,
      'Features',
    ),
    showCssValues: createBooleanArgType(
      'Whether to show CSS values on hover.',
      true,
      'Features',
    ),
    columns: createNumberArgType(
      'Number of columns in the grid.',
      5,
      1,
      12,
      'Layout',
    ),
  },
} satisfies Meta<typeof ShadowsElevation>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the ShadowsElevation component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    showInteractive: false,
    showCssValues: true,
    columns: 5,
  },
}

/**
 * Default display showing all 25 elevation levels in a grid.
 */
export const Default: Story = {
  args: {},
}

/**
 * Includes an interactive slider to explore individual elevation levels.
 */
export const WithInteractiveSlider: Story = {
  args: {
    showInteractive: true,
    showCssValues: true,
    columns: 5,
  },
}

/**
 * Compact 4-column layout for narrower displays.
 */
export const CompactGrid: Story = {
  args: {
    showInteractive: false,
    showCssValues: true,
    columns: 4,
  },
}

/**
 * Wide 6-column layout for larger displays.
 */
export const WideGrid: Story = {
  args: {
    showInteractive: false,
    showCssValues: true,
    columns: 6,
  },
}

/**
 * Grid without CSS value tooltips for cleaner presentation.
 */
export const WithoutCssValues: Story = {
  args: {
    showInteractive: false,
    showCssValues: false,
    columns: 5,
  },
}

/**
 * Standalone interactive elevation control.
 */
export const InteractiveOnly: Story = {
  render: () => (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <InteractiveElevation defaultElevation={8} />
    </Box>
  ),
}

/**
 * Single elevation box component demonstration.
 */
export const SingleElevationBox: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <ElevationBox elevation={0} shadowValue="none" />
      <ElevationBox elevation={4} shadowValue="0px 2px 4px -1px..." />
      <ElevationBox elevation={8} shadowValue="0px 5px 5px -3px..." />
      <ElevationBox elevation={16} shadowValue="0px 8px 10px -5px..." />
      <ElevationBox elevation={24} shadowValue="0px 11px 15px -7px..." />
    </Box>
  ),
}

/**
 * Comparison between key elevation levels used for common components.
 */
export const CommonElevations: Story = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {[0, 1, 2, 4, 6, 8, 16, 24].map((elevation) => (
          <Box key={elevation} sx={{ textAlign: 'center' }}>
            <ElevationBox
              elevation={elevation}
              shadowValue={`Elevation ${elevation}`}
              showCssValue={false}
            />
            <Box sx={{ mt: 1, maxWidth: 100 }}>
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                {elevation === 0 && 'Flat'}
                {elevation === 1 && 'Cards'}
                {elevation === 2 && 'Buttons'}
                {elevation === 4 && 'FAB'}
                {elevation === 6 && 'Snackbar'}
                {elevation === 8 && 'Dialogs'}
                {elevation === 16 && 'Drawer'}
                {elevation === 24 && 'Modal'}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  ),
}

/**
 * Interaction test to verify all elevation levels render correctly.
 */
export const InteractionTest: Story = {
  args: {
    showInteractive: true,
    showCssValues: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify header text renders', async () => {
      const header = canvas.getByText('Shadow Elevations')
      expect(header).toBeInTheDocument()
    })

    await step('Verify all 25 elevation boxes render', async () => {
      // Check for elevation numbers 0 through 24
      for (let i = 0; i <= 24; i++) {
        const elevationText = canvas.getAllByText(String(i))
        expect(elevationText.length).toBeGreaterThan(0)
      }
    })

    await step('Verify usage guidelines section renders', async () => {
      const usageHeader = canvas.getByText('Recommended Usage')
      expect(usageHeader).toBeInTheDocument()
    })

    await step('Verify interactive section renders', async () => {
      const interactiveHeader = canvas.getByText('Interactive Elevation')
      expect(interactiveHeader).toBeInTheDocument()

      const slider = canvas.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    await step('Verify Paper components have elevation classes', async () => {
      const papers = canvasElement.querySelectorAll('.MuiPaper-root')
      expect(papers.length).toBeGreaterThan(0)
    })
  },
}
