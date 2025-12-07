import MUIBackdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import React from 'react'

import Backdrop from './Backdrop'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Backdrop',
  component: Backdrop,
  tags: [] // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Backdrop>

export default meta
type Story = StoryObj<typeof meta>

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
