import FavoriteIcon from '@mui/icons-material/Favorite'
import FolderIcon from '@mui/icons-material/Folder'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import RestoreIcon from '@mui/icons-material/Restore'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import { userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof BottomNavigation> = {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: [], // autodocs disabled - using custom MDX documentation,
}

export default meta
type Story = StoryObj<typeof BottomNavigation>

/**
 * Basic bottom navigation with three actions
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    return (
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    )
  },
}

/**
 * Bottom navigation without labels (icons only)
 */
export const IconsOnly: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    return (
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction icon={<RestoreIcon />} />
          <BottomNavigationAction icon={<FavoriteIcon />} />
          <BottomNavigationAction icon={<LocationOnIcon />} />
          <BottomNavigationAction icon={<FolderIcon />} />
        </BottomNavigation>
      </Box>
    )
  },
}

/**
 * Fixed position bottom navigation
 */
export const FixedPosition: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    return (
      <Box sx={{ pb: 7, minHeight: 200 }}>
        <Box sx={{ p: 2 }}>Scroll down to see the fixed bottom navigation</Box>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    )
  },
}

/**
 * Interaction test for bottom navigation
 */
export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = useState(0)

    return (
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          data-testid="bottom-navigation"
        >
          <BottomNavigationAction
            label="Recents"
            icon={<RestoreIcon />}
            data-testid="recents-action"
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            data-testid="favorites-action"
          />
          <BottomNavigationAction
            label="Nearby"
            icon={<LocationOnIcon />}
            data-testid="nearby-action"
          />
        </BottomNavigation>
      </Box>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Click on Favorites
    const favoritesAction = canvas.getByTestId('favorites-action')
    await userEvent.click(favoritesAction)

    // Click on Nearby
    const nearbyAction = canvas.getByTestId('nearby-action')
    await userEvent.click(nearbyAction)

    // Click back to Recents
    const recentsAction = canvas.getByTestId('recents-action')
    await userEvent.click(recentsAction)
  },
}
