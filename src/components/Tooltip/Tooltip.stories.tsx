import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import MUITooltip from '@mui/material/Tooltip'

import Tooltip from './Tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: [] // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

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
