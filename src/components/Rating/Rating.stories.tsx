import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Box from '@mui/material/Box'
import MUIRating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'
import { expect, userEvent, within } from 'storybook/test'

import Rating from './Rating'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 2,
  },
}

export const InteractionTest: Story = {
  args: {
    defaultValue: 0,
    name: 'rating-test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // MUI Rating uses radio inputs with accessible names like "3 Stars" or similar
    // Get all radio buttons and click the third one (index 2 = 3 stars)
    const radioButtons = canvas.getAllByRole('radio')
    const thirdStar = radioButtons[2] // 0-indexed: 0=1star, 1=2stars, 2=3stars

    await userEvent.click(thirdStar)
    await expect(thirdStar).toBeChecked()
  },
}

export function Controlled() {
  const [value, setValue] = React.useState<number | null>(2)

  return (
    <Box>
      <Typography component="legend">Controlled</Typography>
      <MUIRating value={value} onChange={(_, newValue) => setValue(newValue)} />
    </Box>
  )
}

export function ReadOnly() {
  return (
    <Box>
      <Typography component="legend">Read only</Typography>
      <MUIRating value={3.5} readOnly precision={0.5} />
    </Box>
  )
}

export function Disabled() {
  return (
    <Box>
      <Typography component="legend">Disabled</Typography>
      <MUIRating value={2} disabled />
    </Box>
  )
}

export function Sizes() {
  return (
    <Stack spacing={1}>
      <MUIRating defaultValue={2} size="small" />
      <MUIRating defaultValue={2} />
      <MUIRating defaultValue={2} size="large" />
    </Stack>
  )
}

const StyledRating = styled(MUIRating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
})

export function CustomIcon() {
  return (
    <Box>
      <Typography component="legend">Custom icon</Typography>
      <StyledRating
        defaultValue={2}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    </Box>
  )
}

export function HalfRating() {
  return (
    <Stack spacing={1}>
      <MUIRating defaultValue={2.5} precision={0.5} />
      <MUIRating defaultValue={3.5} precision={0.5} readOnly />
    </Stack>
  )
}
