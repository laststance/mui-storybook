import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { expect, screen, userEvent, within } from 'storybook/test'

import {
  createBooleanArgType,
  createSelectArgType,
} from '../../../.storybook/argTypeTemplates'

import Dialog from './Dialog'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
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
    fullWidth: createBooleanArgType(
      'If true, the dialog stretches to maxWidth.',
      false,
      'Layout',
    ),
    fullScreen: createBooleanArgType(
      'If true, the dialog is full-screen.',
      false,
      'Layout',
    ),
    maxWidth: createSelectArgType(
      ['xs', 'sm', 'md', 'lg', 'xl', 'false'],
      'sm',
      'Determine the max-width of the dialog.',
      'Layout',
    ),
    scroll: createSelectArgType(
      ['paper', 'body'],
      'paper',
      'Determine the container for scrolling the dialog.',
      'Layout',
    ),
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Dialog component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    open: true,
    fullWidth: false,
    fullScreen: false,
    maxWidth: 'sm',
    scroll: 'paper',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTitle>Playground Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is an interactive playground for the Dialog component. Use the
          Controls panel to experiment with all props.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Confirm</Button>
      </DialogActions>
    </Dialog>
  ),
}

export const Default: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a simple dialog example. You can put any content here.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const AlertDialog: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Use Google&apos;s location service?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const FormDialog: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const OpenCloseInteraction: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Dialog content for testing interaction
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open dialog
    const openButton = canvas.getByRole('button', { name: /open dialog/i })
    await userEvent.click(openButton)

    // Verify dialog opened - use screen for portal-rendered content
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toBeVisible()

    const dialogTitle = within(dialog).getByText('Test Dialog')
    await expect(dialogTitle).toBeVisible()

    // Close dialog using Cancel button inside dialog
    const cancelButton = within(dialog).getByRole('button', { name: /cancel/i })
    await userEvent.click(cancelButton)

    // Verify dialog is closed
    await expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  },
}
