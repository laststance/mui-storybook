import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    open: false,
  },
}

/**
 * Basic popover that opens when clicking a button.
 * Click the button to open the popover, click outside to close it.
 */
export function Basic() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  )
}

/**
 * Demonstrates different anchor positions.
 * Each button shows the popover at a different position relative to the anchor.
 */
export function AnchorPlayground() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [anchorOrigin, setAnchorOrigin] = React.useState<{
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }>({
    vertical: 'bottom',
    horizontal: 'left',
  })

  const handleClick =
    (vertical: 'top' | 'center' | 'bottom', horizontal: 'left' | 'center' | 'right') =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorOrigin({ vertical, horizontal })
      setAnchorEl(event.currentTarget)
    }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'anchor-playground-popover' : undefined

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={handleClick('top', 'left')}>
          Top Left
        </Button>
        <Button variant="outlined" onClick={handleClick('top', 'center')}>
          Top Center
        </Button>
        <Button variant="outlined" onClick={handleClick('top', 'right')}>
          Top Right
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={handleClick('center', 'left')}>
          Center Left
        </Button>
        <Button variant="outlined" onClick={handleClick('center', 'center')}>
          Center Center
        </Button>
        <Button variant="outlined" onClick={handleClick('center', 'right')}>
          Center Right
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={handleClick('bottom', 'left')}>
          Bottom Left
        </Button>
        <Button variant="outlined" onClick={handleClick('bottom', 'center')}>
          Bottom Center
        </Button>
        <Button variant="outlined" onClick={handleClick('bottom', 'right')}>
          Bottom Right
        </Button>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Typography sx={{ p: 2 }}>
          Anchor: {anchorOrigin.vertical} {anchorOrigin.horizontal}
        </Typography>
      </Popover>
    </Box>
  )
}

/**
 * Popover that opens on mouse hover.
 * Hover over the text to display the popover.
 */
export function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ cursor: 'pointer', display: 'inline-block' }}
      >
        Hover with a Popover.
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>I use the mouse to trigger the popover.</Typography>
      </Popover>
    </div>
  )
}

/**
 * Popover positioned relative to a virtual element.
 * Click anywhere in the box to open the popover at that position.
 */
export function VirtualElement() {
  const [anchorPosition, setAnchorPosition] = React.useState<{
    top: number
    left: number
  } | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    })
  }

  const handleClose = () => {
    setAnchorPosition(null)
  }

  const open = Boolean(anchorPosition)
  const id = open ? 'virtual-element-popover' : undefined

  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        border: '2px dashed',
        borderColor: 'grey.400',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
      onClick={handleClick}
    >
      <Typography variant="h6" color="text.secondary">
        Click anywhere in this box
      </Typography>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition ?? undefined}
      >
        <Typography sx={{ p: 2 }}>Positioned at click coordinates</Typography>
      </Popover>
    </Box>
  )
}
