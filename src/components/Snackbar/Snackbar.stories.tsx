import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MUISnackbar from '@mui/material/Snackbar'
import React from 'react'

import Snackbar from './Snackbar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Snackbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    message: 'This is a snackbar message',
  },
}

export function Basic() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Snackbar
      </Button>
      <MUISnackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Note archived"
      />
    </div>
  )
}

export function WithSuccessAlert() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        Show Success
      </Button>
      <MUISnackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          This is a success message!
        </Alert>
      </MUISnackbar>
    </div>
  )
}

export function WithErrorAlert() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Show Error
      </Button>
      <MUISnackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          This is an error message!
        </Alert>
      </MUISnackbar>
    </div>
  )
}

export function TopCenter() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Top Center
      </Button>
      <MUISnackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="I am at the top center"
      />
    </div>
  )
}

export function WithAction() {
  const [open, setOpen] = React.useState(false)

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={() => setOpen(false)}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show with Action
      </Button>
      <MUISnackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Note archived"
        action={action}
      />
    </div>
  )
}
