import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import MUIModal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import Modal from './Modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const Default: Story = {
  args: {
    open: true,
    children: (
      <Box sx={style}>
        <Typography variant="h6">Default Modal</Typography>
        <Typography sx={{ mt: 2 }}>
          This is a basic modal example.
        </Typography>
      </Box>
    ),
  },
}

export function BasicModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <MUIModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Basic Modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is a basic modal with open/close functionality.
          </Typography>
        </Box>
      </MUIModal>
    </div>
  )
}

export function KeepMounted() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Keep Mounted Modal
      </Button>
      <MUIModal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Keep Mounted Modal
          </Typography>
          <Typography sx={{ mt: 2 }}>
            This modal stays in the DOM even when closed.
          </Typography>
        </Box>
      </MUIModal>
    </div>
  )
}

export function TransitionsModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal with Fade
      </Button>
      <MUIModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="transition-modal-title"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Fade Transition
            </Typography>
            <Typography sx={{ mt: 2 }}>
              This modal uses a Fade transition effect.
            </Typography>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  )
}

export function NestedModals() {
  const [openParent, setOpenParent] = React.useState(false)
  const [openChild, setOpenChild] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpenParent(true)}>
        Open Parent Modal
      </Button>
      <MUIModal
        open={openParent}
        onClose={() => setOpenParent(false)}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Typography id="parent-modal-title" variant="h6" component="h2">
            Parent Modal
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Click below to open a nested modal.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpenChild(true)}
            sx={{ mt: 2 }}
          >
            Open Child Modal
          </Button>
          <MUIModal
            open={openChild}
            onClose={() => setOpenChild(false)}
            aria-labelledby="child-modal-title"
          >
            <Box sx={{ ...style, width: 300 }}>
              <Typography id="child-modal-title" variant="h6" component="h2">
                Child Modal
              </Typography>
              <Typography sx={{ mt: 2 }}>
                This is a nested child modal.
              </Typography>
            </Box>
          </MUIModal>
        </Box>
      </MUIModal>
    </div>
  )
}
