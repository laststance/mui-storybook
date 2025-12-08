import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NavigationIcon from '@mui/icons-material/Navigation'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import { expect, fn, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/FloatingActionButton',
  component: Fab,
  tags: [], // autodocs disabled - using custom MDX documentation,
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

export const InteractionTest: Story = {
  render: () => {
    const handleAddClick = fn()
    const handleEditClick = fn()

    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="primary" aria-label="add" onClick={handleAddClick}>
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" onClick={handleEditClick}>
          <EditIcon />
        </Fab>
        <Fab variant="extended" aria-label="navigate">
          <NavigationIcon sx={{ mr: 1 }} />
          Navigate
        </Fab>
      </Box>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify all FAB buttons render', async () => {
      const addButton = canvas.getByLabelText('add')
      const editButton = canvas.getByLabelText('edit')
      const navigateButton = canvas.getByLabelText('navigate')

      expect(addButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(navigateButton).toBeInTheDocument()
    })

    await step('Verify extended FAB shows text', async () => {
      const navigateButton = canvas.getByLabelText('navigate')
      expect(navigateButton).toHaveTextContent('Navigate')
    })

    await step('Test FAB button interactions', async () => {
      const addButton = canvas.getByLabelText('add')
      const editButton = canvas.getByLabelText('edit')

      await userEvent.click(addButton)
      await userEvent.click(editButton)
    })

    await step('Verify FAB structure', async () => {
      const addButton = canvas.getByLabelText('add')
      expect(addButton).toHaveClass('MuiFab-root')
    })
  },
}
