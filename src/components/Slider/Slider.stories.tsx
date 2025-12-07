import Box from '@mui/material/Box'
import MUISlider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { expect, within } from 'storybook/test'

import Slider from './Slider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 30,
    'aria-label': 'Default slider',
  },
}

export const InteractionTest: Story = {
  args: {
    defaultValue: 50,
    'aria-label': 'Test slider',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')

    await expect(slider).toBeInTheDocument()
    await expect(slider).toHaveAttribute('aria-valuenow', '50')
  },
}

export function Continuous() {
  const [value, setValue] = React.useState<number>(30)

  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>Volume: {value}</Typography>
      <MUISlider
        value={value}
        onChange={(_, newValue) => setValue(newValue as number)}
        aria-label="Volume"
      />
    </Box>
  )
}

export function Range() {
  const [value, setValue] = React.useState<number[]>([20, 37])

  return (
    <Box sx={{ width: 300 }}>
      <Typography gutterBottom>
        Range: {value[0]} - {value[1]}
      </Typography>
      <MUISlider
        value={value}
        onChange={(_, newValue) => setValue(newValue as number[])}
        valueLabelDisplay="auto"
        aria-label="Range slider"
      />
    </Box>
  )
}

export function DiscreteWithMarks() {
  const marks = [
    { value: 0, label: '0°C' },
    { value: 20, label: '20°C' },
    { value: 37, label: '37°C' },
    { value: 100, label: '100°C' },
  ]

  return (
    <Box sx={{ width: 300 }}>
      <MUISlider
        defaultValue={37}
        step={10}
        marks={marks}
        valueLabelDisplay="auto"
        aria-label="Temperature"
      />
    </Box>
  )
}

export function Vertical() {
  return (
    <Box sx={{ height: 300 }}>
      <Stack spacing={1} direction="row" sx={{ height: '100%' }}>
        <MUISlider
          orientation="vertical"
          defaultValue={30}
          aria-label="Vertical slider"
        />
        <MUISlider
          orientation="vertical"
          defaultValue={[20, 37]}
          aria-label="Vertical range slider"
        />
      </Stack>
    </Box>
  )
}

export function Colors() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <MUISlider defaultValue={30} color="primary" />
      <MUISlider defaultValue={30} color="secondary" />
      <MUISlider defaultValue={30} color="error" />
    </Stack>
  )
}

export function Sizes() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <MUISlider size="small" defaultValue={30} aria-label="Small slider" />
      <MUISlider defaultValue={30} aria-label="Default slider" />
    </Stack>
  )
}
