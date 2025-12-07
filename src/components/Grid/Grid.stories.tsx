import Box from '@mui/material/Box'
import MUIGrid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import Grid from './Grid'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Grid',
  component: Grid,
  tags: [] // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const Default: Story = {
  render: () => (
    <MUIGrid container spacing={2}>
      <MUIGrid size={12}>
        <Item>size=12</Item>
      </MUIGrid>
      <MUIGrid size={6}>
        <Item>size=6</Item>
      </MUIGrid>
      <MUIGrid size={6}>
        <Item>size=6</Item>
      </MUIGrid>
    </MUIGrid>
  ),
}

export function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIGrid container spacing={2}>
        <MUIGrid size={12}>
          <Item>size=12</Item>
        </MUIGrid>
        <MUIGrid size={6}>
          <Item>size=6</Item>
        </MUIGrid>
        <MUIGrid size={6}>
          <Item>size=6</Item>
        </MUIGrid>
        <MUIGrid size={4}>
          <Item>size=4</Item>
        </MUIGrid>
        <MUIGrid size={4}>
          <Item>size=4</Item>
        </MUIGrid>
        <MUIGrid size={4}>
          <Item>size=4</Item>
        </MUIGrid>
      </MUIGrid>
    </Box>
  )
}

export function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIGrid container spacing={2}>
        <MUIGrid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Item>xs=12 sm=6 md=4 lg=3</Item>
        </MUIGrid>
        <MUIGrid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Item>xs=12 sm=6 md=4 lg=3</Item>
        </MUIGrid>
        <MUIGrid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Item>xs=12 sm=6 md=4 lg=3</Item>
        </MUIGrid>
        <MUIGrid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Item>xs=12 sm=6 md=4 lg=3</Item>
        </MUIGrid>
      </MUIGrid>
    </Box>
  )
}

export function GridSpacing() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 1 }}>spacing=1</Box>
        <MUIGrid container spacing={1}>
          <MUIGrid size={4}>
            <Item>Item</Item>
          </MUIGrid>
          <MUIGrid size={4}>
            <Item>Item</Item>
          </MUIGrid>
          <MUIGrid size={4}>
            <Item>Item</Item>
          </MUIGrid>
        </MUIGrid>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 1 }}>spacing=2</Box>
        <MUIGrid container spacing={2}>
          <MUIGrid size={4}>
            <Item>Item</Item>
          </MUIGrid>
          <MUIGrid size={4}>
            <Item>Item</Item>
          </MUIGrid>
          <MUIGrid size={4}>
            <Item>Item</Item>
          </MUIGrid>
        </MUIGrid>
      </Box>
    </Box>
  )
}

export function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIGrid container spacing={2}>
        <MUIGrid size={12}>
          <Item>Header</Item>
        </MUIGrid>
        <MUIGrid size={3}>
          <Item>Sidebar</Item>
        </MUIGrid>
        <MUIGrid size={9}>
          <MUIGrid container spacing={2}>
            <MUIGrid size={6}>
              <Item>Content 1</Item>
            </MUIGrid>
            <MUIGrid size={6}>
              <Item>Content 2</Item>
            </MUIGrid>
          </MUIGrid>
        </MUIGrid>
        <MUIGrid size={12}>
          <Item>Footer</Item>
        </MUIGrid>
      </MUIGrid>
    </Box>
  )
}

export function AutoLayoutGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIGrid container spacing={2}>
        <MUIGrid size="grow">
          <Item>size=grow</Item>
        </MUIGrid>
        <MUIGrid size={6}>
          <Item>size=6</Item>
        </MUIGrid>
        <MUIGrid size="grow">
          <Item>size=grow</Item>
        </MUIGrid>
      </MUIGrid>
    </Box>
  )
}
