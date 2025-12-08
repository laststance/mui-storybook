import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import Divider from './Divider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <Typography variant="body1">Item 1</Typography>
      <Divider {...args} />
      <Typography variant="body1">Item 2</Typography>
      <Divider {...args} />
      <Typography variant="body1">Item 3</Typography>
    </Box>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Drafts" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </Box>
  ),
}

export const Inset: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider variant="inset" />
        <ListItem>
          <ListItemText primary="Drafts" />
        </ListItem>
        <Divider variant="inset" />
        <ListItem>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider variant="inset" />
        <ListItem>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </Box>
  ),
}

export const Middle: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider variant="middle" />
        <ListItem>
          <ListItemText primary="Drafts" />
        </ListItem>
        <Divider variant="middle" />
        <ListItem>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider variant="middle" />
        <ListItem>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </Box>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        '& svg': {
          m: 1.5,
        },
        '& hr': {
          mx: 0.5,
        },
      }}
    >
      <FormatAlignLeftIcon />
      <Divider orientation="vertical" flexItem />
      <FormatAlignCenterIcon />
      <Divider orientation="vertical" flexItem />
      <FormatAlignRightIcon />
    </Box>
  ),
}

export const WithText: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="body1" gutterBottom>
        Content above the divider
      </Typography>
      <Divider>CENTER</Divider>
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Content below the center divider
      </Typography>
      <Divider textAlign="left">LEFT</Divider>
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Content below the left divider
      </Typography>
      <Divider textAlign="right">RIGHT</Divider>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Content below the right divider
      </Typography>
    </Box>
  ),
}

export const WithChip: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Divider>
        <Chip label="CHIP" size="small" />
      </Divider>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Divider>
        <Chip label="OR" size="small" />
      </Divider>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Ut enim ad minim veniam, quis nostrud exercitation.
      </Typography>
    </Box>
  ),
}

export const ListDividers: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        <ListItem>
          <ListItemText primary="Photos" secondary="Jan 9, 2024" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Work" secondary="Jan 7, 2024" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Vacation" secondary="July 20, 2023" />
        </ListItem>
      </List>
    </Box>
  ),
}

export const CustomStyles: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="body1" gutterBottom>
        Default divider
      </Typography>
      <Divider />
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Thick divider
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Custom color divider
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', borderBottomWidth: 2 }} />
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Dashed divider
      </Typography>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Dotted divider
      </Typography>
      <Divider sx={{ borderStyle: 'dotted', borderBottomWidth: 2 }} />
    </Box>
  ),
}
