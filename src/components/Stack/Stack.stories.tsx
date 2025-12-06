import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MUIStack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import type { Meta, StoryObj } from '@storybook/react'

import Stack from './Stack'

const meta = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>

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
    <MUIStack spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  ),
}

export function Horizontal() {
  return (
    <MUIStack direction="row" spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  )
}

export function DifferentSpacing() {
  return (
    <MUIStack spacing={4}>
      <div>
        <div style={{ marginBottom: 8 }}>spacing=1</div>
        <MUIStack direction="row" spacing={1}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>spacing=2</div>
        <MUIStack direction="row" spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>spacing=4</div>
        <MUIStack direction="row" spacing={4}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
    </MUIStack>
  )
}

export function WithDividers() {
  return (
    <MUIStack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  )
}

export function ResponsiveDirection() {
  return (
    <MUIStack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  )
}

export function WithAlignItems() {
  return (
    <MUIStack spacing={4}>
      <div>
        <div style={{ marginBottom: 8 }}>alignItems=center</div>
        <MUIStack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ height: 100, backgroundColor: 'grey.100', p: 1 }}
        >
          <Item sx={{ height: 40 }}>Short</Item>
          <Item sx={{ height: 60 }}>Medium</Item>
          <Item sx={{ height: 80 }}>Tall</Item>
        </MUIStack>
      </div>
    </MUIStack>
  )
}

export function WithJustifyContent() {
  return (
    <MUIStack spacing={4}>
      <div>
        <div style={{ marginBottom: 8 }}>justifyContent=space-between</div>
        <MUIStack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ backgroundColor: 'grey.100', p: 1 }}
        >
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
    </MUIStack>
  )
}
