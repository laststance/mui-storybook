import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigationIcon from '@mui/icons-material/Navigation'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/FloatingActionButton',
  component: Fab,
  tags: ['autodocs'],
} satisfies Meta<typeof Fab>

export default meta
type Story = StoryObj<typeof meta>

export const FloatingActionButtons: Story = {
  render: () => (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab>
    </Box>
  ),
}
