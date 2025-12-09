import CheckIcon from '@mui/icons-material/Check'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import MUIAlert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { createSelectArgType } from '../../../.storybook/argTypeTemplates'

import Alert from './Alert'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    severity: createSelectArgType(
      ['error', 'warning', 'info', 'success'],
      'success',
      'The severity of the alert. This defines the color and icon used.',
      'Appearance',
    ),
    variant: createSelectArgType(
      ['standard', 'outlined', 'filled'],
      'standard',
      'The variant to use.',
      'Appearance',
    ),
    color: createSelectArgType(
      ['error', 'warning', 'info', 'success'],
      'success',
      'The color of the component. Unless provided, the value is taken from the severity prop.',
      'Appearance',
    ),
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Alert component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    severity: 'success',
    variant: 'standard',
  },
  render: (args) => <Alert {...args}>This is an alert — check it out!</Alert>,
}

export const Default: Story = {
  args: {
    severity: 'success',
    variant: 'standard',
  },
  render: (args) => <Alert {...args}>This is an alert — check it out!</Alert>,
}

export function BasicAlerts1() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MUIAlert severity="error">
        This is an error alert — check it out!
      </MUIAlert>
      <MUIAlert severity="warning">
        This is a warning alert — check it out!
      </MUIAlert>
      <MUIAlert severity="info">This is an info alert — check it out!</MUIAlert>
      <MUIAlert severity="success">
        This is a success alert — check it out!
      </MUIAlert>
    </Stack>
  )
}

export function BasicAlerts2() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MUIAlert variant="outlined" severity="error">
        This is an error alert — check it out!
      </MUIAlert>
      <MUIAlert variant="outlined" severity="warning">
        This is a warning alert — check it out!
      </MUIAlert>
      <MUIAlert variant="outlined" severity="info">
        This is an info alert — check it out!
      </MUIAlert>
      <MUIAlert variant="outlined" severity="success">
        This is a success alert — check it out!
      </MUIAlert>
    </Stack>
  )
}

export function DescriptionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MUIAlert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </MUIAlert>
      <MUIAlert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
      </MUIAlert>
      <MUIAlert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </MUIAlert>
      <MUIAlert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </MUIAlert>
    </Stack>
  )
}
export function ActionAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MUIAlert onClose={() => {}}>
        This is a success alert — check it out!
      </MUIAlert>
      <MUIAlert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        This is a success alert — check it out!
      </MUIAlert>
    </Stack>
  )
}

export function TransitionAlerts() {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <MUIAlert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </MUIAlert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true)
        }}
      >
        Re-open
      </Button>
    </Box>
  )
}

export function IconAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MUIAlert icon={<CheckIcon fontSize="inherit" />} severity="success">
        This is a success alert — check it out!
      </MUIAlert>
      <MUIAlert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        This is a success alert — check it out!
      </MUIAlert>
      <MUIAlert icon={false} severity="success">
        This is a success alert — check it out!
      </MUIAlert>
    </Stack>
  )
}

export function ColorAlerts() {
  return (
    <MUIAlert severity="success" color="info">
      This is a success alert — check it out!
    </MUIAlert>
  )
}

export const InteractionTest: Story = {
  args: {
    variant: 'standard',
  },
  render: () => {
    const handleClose = fn()
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <MUIAlert severity="success">This is a success alert!</MUIAlert>
        <MUIAlert severity="error" onClose={handleClose}>
          This is a closeable error alert!
        </MUIAlert>
        <MUIAlert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This alert has a title
        </MUIAlert>
      </Stack>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify alerts render with correct severities', async () => {
      const successAlert = canvas.getByText('This is a success alert!')
      await expect(successAlert).toBeInTheDocument()

      const errorAlert = canvas.getByText('This is a closeable error alert!')
      await expect(errorAlert).toBeInTheDocument()

      const warningTitle = canvas.getByText('Warning')
      await expect(warningTitle).toBeInTheDocument()
    })

    await step('Test alert close button', async () => {
      const closeButton = canvas.getByRole('button', { name: /close/i })
      await expect(closeButton).toBeInTheDocument()
      await userEvent.click(closeButton)
    })

    await step('Verify alert title functionality', async () => {
      const alertTitle = canvas.getByText('Warning')
      await expect(alertTitle).toBeInTheDocument()
      await expect(alertTitle.tagName).toBe('DIV')
    })
  },
}
