import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { expect, screen, userEvent, within } from 'storybook/test'

import Popper from './Popper'

import type { PopperPlacementType } from '@mui/material/Popper'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Popper',
  component: Popper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    disablePortal: true,
  },
  render: function DefaultStory() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen((previousOpen) => !previousOpen)
    }

    return (
      <Box>
        <Button onClick={handleClick}>Toggle Popper</Button>
        <Popper open={open} anchorEl={anchorEl} disablePortal>
          <Paper sx={{ p: 2, mt: 1 }}>
            <Typography>The content of the Popper.</Typography>
          </Paper>
        </Popper>
      </Box>
    )
  },
}

export const Placements: Story = {
  args: {} as never,
  render: function PlacementsStory() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    )
    const [open, setOpen] = React.useState(false)
    const [placement, setPlacement] =
      React.useState<PopperPlacementType>('bottom')

    const handleClick =
      (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpen((prev) => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
      }

    return (
      <Box sx={{ width: 500, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ mb: 1 }}
          >
            <Button onClick={handleClick('top-start')}>top-start</Button>
            <Button onClick={handleClick('top')}>top</Button>
            <Button onClick={handleClick('top-end')}>top-end</Button>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Stack spacing={1}>
              <Button onClick={handleClick('left-start')}>left-start</Button>
              <Button onClick={handleClick('left')}>left</Button>
              <Button onClick={handleClick('left-end')}>left-end</Button>
            </Stack>
            <Stack spacing={1}>
              <Button onClick={handleClick('right-start')}>right-start</Button>
              <Button onClick={handleClick('right')}>right</Button>
              <Button onClick={handleClick('right-end')}>right-end</Button>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            <Button onClick={handleClick('bottom-start')}>bottom-start</Button>
            <Button onClick={handleClick('bottom')}>bottom</Button>
            <Button onClick={handleClick('bottom-end')}>bottom-end</Button>
          </Stack>
        </Box>
        <Popper open={open} anchorEl={anchorEl} placement={placement}>
          <Paper sx={{ p: 1 }}>
            <Typography sx={{ p: 2 }}>{`Placement: ${placement}`}</Typography>
          </Paper>
        </Popper>
      </Box>
    )
  },
}

export const WithTransition: Story = {
  args: {} as never,
  render: function TransitionStory() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen((previousOpen) => !previousOpen)
    }

    return (
      <Box>
        <Button onClick={handleClick}>Toggle with Fade</Button>
        <Popper open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ p: 2, mt: 1 }}>
                <Typography>Fading popper content</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    )
  },
}

export const Arrow: Story = {
  args: {} as never,
  render: function ArrowStory() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = React.useState(false)
    const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen((previousOpen) => !previousOpen)
    }

    return (
      <Box>
        <Button onClick={handleClick}>Toggle with Arrow</Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          modifiers={[
            {
              name: 'arrow',
              enabled: true,
              options: {
                element: arrowRef,
              },
            },
          ]}
        >
          <Box
            ref={setArrowRef}
            sx={{
              position: 'absolute',
              width: 10,
              height: 10,
              top: -5,
              left: 'calc(50% - 5px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 10,
                height: 10,
                backgroundColor: 'background.paper',
                transform: 'rotate(45deg)',
                boxShadow: 1,
              },
            }}
          />
          <Paper sx={{ p: 2, mt: 1 }}>
            <Typography>Popper with arrow</Typography>
          </Paper>
        </Popper>
      </Box>
    )
  },
}

export const VirtualElement: Story = {
  args: {} as never,
  render: function VirtualElementStory() {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<{
      getBoundingClientRect: () => DOMRect
    } | null>(null)

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event
      setAnchorEl({
        getBoundingClientRect: () =>
          ({
            width: 0,
            height: 0,
            top: clientY,
            right: clientX,
            bottom: clientY,
            left: clientX,
            x: clientX,
            y: clientY,
            toJSON: () => {},
          }) as DOMRect,
      })
    }

    return (
      <Box
        sx={{
          width: 400,
          height: 200,
          border: '1px dashed grey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'action.hover',
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onMouseMove={handleMouseMove}
      >
        <Typography>Move your mouse here</Typography>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top"
          sx={{ pointerEvents: 'none' }}
        >
          <Paper sx={{ p: 1 }}>
            <Typography variant="body2">Cursor follower</Typography>
          </Paper>
        </Popper>
      </Box>
    )
  },
}

export const InteractionTest: Story = {
  args: {} as never,
  render: function InteractionStory() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen((previousOpen) => !previousOpen)
    }

    return (
      <Box>
        <Button onClick={handleClick} data-testid="toggle-popper">
          Toggle Popper
        </Button>
        <Popper open={open} anchorEl={anchorEl}>
          <Paper sx={{ p: 2, mt: 1 }} data-testid="popper-content">
            <Typography>Popper content here</Typography>
          </Paper>
        </Popper>
      </Box>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify popper is initially closed', async () => {
      const toggleButton = canvas.getByTestId('toggle-popper')
      await expect(toggleButton).toBeInTheDocument()
      await expect(
        screen.queryByTestId('popper-content'),
      ).not.toBeInTheDocument()
    })

    await step('Click to open popper', async () => {
      const toggleButton = canvas.getByTestId('toggle-popper')
      await userEvent.click(toggleButton)

      // Popper renders via portal
      const popperContent = await screen.findByTestId('popper-content')
      await expect(popperContent).toBeInTheDocument()
    })

    await step('Click to close popper', async () => {
      const toggleButton = canvas.getByTestId('toggle-popper')
      await userEvent.click(toggleButton)

      await expect(
        screen.queryByTestId('popper-content'),
      ).not.toBeInTheDocument()
    })
  },
}
