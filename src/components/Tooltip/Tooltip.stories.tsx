import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import MUITooltip from '@mui/material/Tooltip'
import { expect, screen, userEvent, within } from 'storybook/test'

import {
  muiPlacementArgType,
  createBooleanArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Tooltip from './Tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    placement: muiPlacementArgType,
    arrow: createBooleanArgType(
      'If true, adds an arrow to the tooltip.',
      false,
      'Appearance',
    ),
    disableHoverListener: createBooleanArgType(
      'Do not respond to hover events.',
      false,
      'Behavior',
    ),
    disableFocusListener: createBooleanArgType(
      'Do not respond to focus-visible events.',
      false,
      'Behavior',
    ),
    disableTouchListener: createBooleanArgType(
      'Do not respond to long press touch events.',
      false,
      'Behavior',
    ),
    open: createBooleanArgType(
      'If true, the component is shown.',
      false,
      'State',
    ),
    enterDelay: createNumberArgType(
      'The number of milliseconds to wait before showing the tooltip.',
      100,
      0,
      2000,
      'Timing',
    ),
    leaveDelay: createNumberArgType(
      'The number of milliseconds to wait before hiding the tooltip.',
      0,
      0,
      2000,
      'Timing',
    ),
    title: {
      control: 'text',
      description:
        'Tooltip title. Zero-length titles string are never displayed.',
      table: { category: 'Content' },
    },
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Tooltip component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    title: 'Tooltip Text',
    placement: 'bottom',
    arrow: false,
    enterDelay: 100,
    leaveDelay: 0,
    children: <Button>Hover me</Button>,
  },
}

export const Default: Story = {
  args: {
    title: 'Default Tooltip',
    children: <Button>Hover me</Button>,
  },
}

export function Positions() {
  return (
    <Stack direction="row" spacing={2} sx={{ p: 4 }}>
      <MUITooltip title="Top" placement="top">
        <Button>Top</Button>
      </MUITooltip>
      <MUITooltip title="Right" placement="right">
        <Button>Right</Button>
      </MUITooltip>
      <MUITooltip title="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </MUITooltip>
      <MUITooltip title="Left" placement="left">
        <Button>Left</Button>
      </MUITooltip>
    </Stack>
  )
}

export function Arrow() {
  return (
    <Stack direction="row" spacing={2}>
      <MUITooltip title="With Arrow" arrow>
        <Button>Arrow</Button>
      </MUITooltip>
      <MUITooltip title="Without Arrow">
        <Button>No Arrow</Button>
      </MUITooltip>
    </Stack>
  )
}

export function WithIconButton() {
  return (
    <MUITooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </MUITooltip>
  )
}

export function Delays() {
  return (
    <Stack direction="row" spacing={2}>
      <MUITooltip title="Instant" enterDelay={0}>
        <Button>Instant</Button>
      </MUITooltip>
      <MUITooltip title="Delayed" enterDelay={500}>
        <Button>Delayed</Button>
      </MUITooltip>
    </Stack>
  )
}

export const InteractionTest: Story = {
  args: {
    title: 'Test Tooltip',
    children: <Button>Test</Button>,
  },
  render: () => (
    <Stack direction="row" spacing={2} sx={{ p: 4 }}>
      <MUITooltip title="Hover tooltip text" arrow>
        <Button>Hover Me</Button>
      </MUITooltip>
      <MUITooltip title="Delete item" placement="top">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </MUITooltip>
    </Stack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify buttons render', async () => {
      const hoverButton = canvas.getByRole('button', { name: /hover me/i })
      await expect(hoverButton).toBeInTheDocument()

      const deleteIcon = canvas.getByTestId('DeleteIcon')
      await expect(deleteIcon).toBeInTheDocument()
    })

    await step('Test tooltip hover interaction', async () => {
      const hoverButton = canvas.getByRole('button', { name: /hover me/i })
      await userEvent.hover(hoverButton)

      // Tooltip renders in portal, use screen instead of canvas
      const tooltip = await screen.findByRole('tooltip', {
        name: /hover tooltip text/i,
      })
      await expect(tooltip).toBeInTheDocument()

      await userEvent.unhover(hoverButton)
    })

    await step('Test tooltip on icon button', async () => {
      const deleteIcon = canvas.getByTestId('DeleteIcon')
      const iconButton = deleteIcon.closest('button')
      if (iconButton) {
        await userEvent.hover(iconButton)

        const deleteTooltip = await screen.findByRole('tooltip', {
          name: /delete item/i,
        })
        await expect(deleteTooltip).toBeInTheDocument()

        await userEvent.unhover(iconButton)
      }
    })
  },
}
