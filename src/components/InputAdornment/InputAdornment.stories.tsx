import AccountCircle from '@mui/icons-material/AccountCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SearchIcon from '@mui/icons-material/Search'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React from 'react'
import { expect, userEvent, within } from 'storybook/test'

import InputAdornment from './InputAdornment'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/InputAdornment',
  component: InputAdornment,
  tags: ['autodocs'],
} satisfies Meta<typeof InputAdornment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    position: 'start',
    children: '$',
  },
  decorators: [
    (Story) => (
      <TextField
        label="Amount"
        slotProps={{
          input: {
            startAdornment: <Story />,
          },
        }}
      />
    ),
  ],
}

export const StartAdornment: Story = {
  args: {} as never,
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField
        label="Amount"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
      />
      <TextField
        label="Weight"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">kg</InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Username"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  ),
}

export const EndAdornment: Story = {
  args: {} as never,
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField
        label="Price"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">.00</InputAdornment>,
          },
        }}
      />
      <TextField
        label="Weight"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <TextField
        label="Search"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  ),
}

export const BothAdornments: Story = {
  args: {} as never,
  render: () => (
    <TextField
      label="Price"
      sx={{ width: 300 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoneyIcon />
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">.00</InputAdornment>,
        },
      }}
    />
  ),
}

export const PasswordField: Story = {
  args: {} as never,
  render: function PasswordStory() {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    return (
      <FormControl sx={{ width: 300 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide password' : 'show password'}
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    )
  },
}

export const DisabledAdornment: Story = {
  args: {} as never,
  render: () => (
    <TextField
      label="Disabled"
      disabled
      sx={{ width: 300 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" disablePointerEvents>
              $
            </InputAdornment>
          ),
        },
      }}
    />
  ),
}

export const InteractionTest: Story = {
  args: {} as never,
  render: function InteractionStory() {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <FormControl sx={{ width: 300 }} variant="outlined">
        <InputLabel htmlFor="test-password">Password</InputLabel>
        <OutlinedInput
          id="test-password"
          type={showPassword ? 'text' : 'password'}
          defaultValue="secret123"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide password' : 'show password'}
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify password is hidden by default', async () => {
      const input = canvas.getByLabelText(/password/i)
      await expect(input).toHaveAttribute('type', 'password')
    })

    await step('Click toggle to show password', async () => {
      const toggleButton = canvas.getByRole('button', {
        name: /show password/i,
      })
      await userEvent.click(toggleButton)

      const input = canvas.getByLabelText(/password/i)
      await expect(input).toHaveAttribute('type', 'text')
    })

    await step('Click toggle to hide password again', async () => {
      const toggleButton = canvas.getByRole('button', {
        name: /hide password/i,
      })
      await userEvent.click(toggleButton)

      const input = canvas.getByLabelText(/password/i)
      await expect(input).toHaveAttribute('type', 'password')
    })
  },
}
