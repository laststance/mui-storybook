import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MUIMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Menu from './Menu'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    anchorEl: null,
  },
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    return (
      <div>
        <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
          Open Menu
        </Button>
        <MUIMenu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
        </MUIMenu>
      </div>
    )
  },
}

export function Basic() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <div>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        Dashboard
      </Button>
      <MUIMenu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
      </MUIMenu>
    </div>
  )
}

export function WithIcons() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <div>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        Edit
      </Button>
      <MUIMenu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)}>Select All</MenuItem>
      </MUIMenu>
    </div>
  )
}

export function Dense() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <div>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        Dense Menu
      </Button>
      <MUIMenu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem dense onClick={() => setAnchorEl(null)}>Single</MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>1.15</MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>Double</MenuItem>
        <MenuItem dense onClick={() => setAnchorEl(null)}>Custom: 1.2</MenuItem>
      </MUIMenu>
    </div>
  )
}
