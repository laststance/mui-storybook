import Box from '@mui/material/Box'
import MUIGrid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { expect, within } from 'storybook/test'

import Grid from './Grid'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Grid',
  component: Grid,
  tags: [], // autodocs disabled - using custom MDX documentation,
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

export const InteractionTest: Story = {
  render: () => (
    <Box sx={{ flexGrow: 1 }} data-testid="grid-container">
      <MUIGrid container spacing={2}>
        <MUIGrid size={6}>
          <Item data-testid="grid-item-1">Item 1</Item>
        </MUIGrid>
        <MUIGrid size={6}>
          <Item data-testid="grid-item-2">Item 2</Item>
        </MUIGrid>
        <MUIGrid size={12}>
          <Item data-testid="grid-item-3">Item 3</Item>
        </MUIGrid>
      </MUIGrid>
    </Box>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify Grid container renders', async () => {
      const container = canvas.getByTestId('grid-container')
      expect(container).toBeInTheDocument()
    })

    await step('Verify all Grid items render', async () => {
      const item1 = canvas.getByTestId('grid-item-1')
      const item2 = canvas.getByTestId('grid-item-2')
      const item3 = canvas.getByTestId('grid-item-3')

      expect(item1).toBeInTheDocument()
      expect(item2).toBeInTheDocument()
      expect(item3).toBeInTheDocument()

      expect(item1).toHaveTextContent('Item 1')
      expect(item2).toHaveTextContent('Item 2')
      expect(item3).toHaveTextContent('Item 3')
    })
  },
}
