import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MUIDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { expect, fn, within } from 'storybook/test'

import {
  createBooleanArgType,
  createSelectArgType,
} from '../../../.storybook/argTypeTemplates'

import Drawer from './Drawer'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
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
    anchor: createSelectArgType(
      ['left', 'right', 'top', 'bottom'],
      'left',
      'Side from which the drawer will appear.',
      'Layout',
    ),
    variant: createSelectArgType(
      ['permanent', 'persistent', 'temporary'],
      'temporary',
      'The variant to use.',
      'Appearance',
    ),
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'The elevation of the drawer.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '16' },
      },
    },
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

function DrawerContent() {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

/**
 * Interactive playground for the Drawer component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    open: true,
    anchor: 'left',
    variant: 'temporary',
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerContent />
    </Drawer>
  ),
}

export const Default: Story = {
  args: {
    open: true,
    children: <DrawerContent />,
  },
}

export function TemporaryLeft() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Left Drawer
      </Button>
      <MUIDrawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <DrawerContent />
      </MUIDrawer>
    </div>
  )
}

export function TemporaryRight() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Right Drawer
      </Button>
      <MUIDrawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <DrawerContent />
      </MUIDrawer>
    </div>
  )
}

export function TemporaryTop() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Top Drawer
      </Button>
      <MUIDrawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2 }}>
          <List>
            {['Item 1', 'Item 2', 'Item 3'].map((text) => (
              <ListItem key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </MUIDrawer>
    </div>
  )
}

export function TemporaryBottom() {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Bottom Drawer
      </Button>
      <MUIDrawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2 }}>
          <List>
            {['Item 1', 'Item 2', 'Item 3'].map((text) => (
              <ListItem key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </MUIDrawer>
    </div>
  )
}

export function Permanent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <MUIDrawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
      >
        <DrawerContent />
      </MUIDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        Main content area
      </Box>
    </Box>
  )
}

export const InteractionTest: Story = {
  args: {} as never,
  render: () => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = fn(() => setOpen(true))
    const handleClose = fn(() => setOpen(false))

    return (
      <div data-testid="drawer-container">
        <Button variant="contained" onClick={handleOpen}>
          Open Drawer
        </Button>
        <MUIDrawer anchor="left" open={open} onClose={handleClose}>
          <DrawerContent />
        </MUIDrawer>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify the open drawer button renders
    const openButton = canvas.getByRole('button', { name: /open drawer/i })
    await expect(openButton).toBeInTheDocument()
  },
}
