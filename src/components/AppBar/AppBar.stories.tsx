import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MUIAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { expect, fn, userEvent, within } from 'storybook/test'

import AppBar from './AppBar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof AppBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MUIAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          App Title
        </Typography>
      </Toolbar>
    </MUIAppBar>
  ),
}

export function Basic() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export function WithMenuAndSearch() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <IconButton size="large" color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export function SecondaryColor() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Secondary Color
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export function Transparent() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'grey.200', p: 2 }}>
      <MUIAppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Transparent AppBar
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export function Dense() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Dense Toolbar
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export const InteractionTest: Story = {
  render: () => {
    const handleMenuClick = fn()
    const handleSearchClick = fn()

    return (
      <Box sx={{ flexGrow: 1 }}>
        <MUIAppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Test AppBar
            </Typography>
            <IconButton
              size="large"
              color="inherit"
              aria-label="search"
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </MUIAppBar>
      </Box>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify AppBar renders with title', async () => {
      const title = canvas.getByText('Test AppBar')
      expect(title).toBeInTheDocument()
    })

    await step('Verify menu and search buttons exist', async () => {
      const menuButton = canvas.getByLabelText('menu')
      const searchButton = canvas.getByLabelText('search')

      expect(menuButton).toBeInTheDocument()
      expect(searchButton).toBeInTheDocument()
    })

    await step('Test button interactions', async () => {
      const menuButton = canvas.getByLabelText('menu')
      const searchButton = canvas.getByLabelText('search')

      await userEvent.click(menuButton)
      await userEvent.click(searchButton)
    })
  },
}
