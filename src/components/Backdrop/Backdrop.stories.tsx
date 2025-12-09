import MUIBackdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import React from 'react'

import { createBooleanArgType } from '../../../.storybook/argTypeTemplates'

import Backdrop from './Backdrop'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Backdrop',
  component: Backdrop,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    open: createBooleanArgType(
      'If true, the component is shown.',
      false,
      'State',
    ),
    invisible: createBooleanArgType(
      'If true, the backdrop is invisible. Useful for disabling click-away.',
      false,
      'Appearance',
    ),
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Backdrop>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Backdrop component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    open: true,
    invisible: false,
  },
  render: (args) => (
    <Backdrop
      {...args}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ),
}

export const Default: Story = {
  args: {
    open: true,
    children: <CircularProgress color="inherit" />,
  },
}

export function Basic() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show Backdrop
      </Button>
      <MUIBackdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <Typography>Click to close</Typography>
      </MUIBackdrop>
    </div>
  )
}

export function WithCircularProgress() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show Loading
      </Button>
      <MUIBackdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </MUIBackdrop>
    </div>
  )
}

export function WithCustomContent() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show Custom Content
      </Button>
      <MUIBackdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        </Box>
      </MUIBackdrop>
    </div>
  )
}
