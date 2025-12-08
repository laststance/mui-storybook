import DeleteIcon from '@mui/icons-material/Delete'
import DraftsIcon from '@mui/icons-material/Drafts'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderIcon from '@mui/icons-material/Folder'
import InboxIcon from '@mui/icons-material/Inbox'
import SendIcon from '@mui/icons-material/Send'
import StarBorder from '@mui/icons-material/StarBorder'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MUIList from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { expect, within } from 'storybook/test'

import List from './List'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/List',
  component: List,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        <ListItem>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </MUIList>
    </Box>
  ),
}

export function WithIcons() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send" />
          </ListItemButton>
        </ListItem>
      </MUIList>
    </Box>
  )
}

export function WithAvatars() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2024" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2024" />
        </ListItem>
      </MUIList>
    </Box>
  )
}

export function NestedList() {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MUIList component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </MUIList>
        </Collapse>
      </MUIList>
    </Box>
  )
}

export function WithCheckboxes() {
  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        {[0, 1, 2].map((value) => (
          <ListItem key={value} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={'Line item ' + (value + 1)} />
            </ListItemButton>
          </ListItem>
        ))}
      </MUIList>
    </Box>
  )
}

export function WithSecondaryActions() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        {[1, 2, 3].map((value) => (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'Item ' + value}
              secondary="Secondary text"
            />
          </ListItem>
        ))}
      </MUIList>
    </Box>
  )
}

export function WithDividers() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList>
        <ListItem>
          <ListItemText primary="Item 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </MUIList>
    </Box>
  )
}

export const InteractionTest: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <MUIList aria-label="test list">
        <ListItem>
          <ListItemText primary="First Item" secondary="First description" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Second Item" secondary="With icon" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Third Item" />
        </ListItem>
      </MUIList>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify list renders', async () => {
      const list = canvas.getByRole('list', { name: 'test list' })
      await expect(list).toBeInTheDocument()
    })

    await step('Verify list items render', async () => {
      const listItems = canvas.getAllByRole('listitem')
      await expect(listItems).toHaveLength(3)
    })

    await step('Verify list item content', async () => {
      const firstItem = canvas.getByText('First Item')
      const secondItem = canvas.getByText('Second Item')
      const thirdItem = canvas.getByText('Third Item')
      await expect(firstItem).toBeInTheDocument()
      await expect(secondItem).toBeInTheDocument()
      await expect(thirdItem).toBeInTheDocument()
    })

    await step('Test accessibility', async () => {
      const list = canvas.getByRole('list')
      await expect(list).toHaveAttribute('aria-label', 'test list')
    })
  },
}
