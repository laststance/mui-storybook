import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { expect, userEvent, within } from 'storybook/test'

import FormControl from './FormControl'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/FormControl',
  component: FormControl,
  tags: ['autodocs'],
} satisfies Meta<typeof FormControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We&apos;ll never share your email.
        </FormHelperText>
      </>
    ),
  },
}

export const Variants: Story = {
  args: {},
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="standard-input">Standard</InputLabel>
        <Input id="standard-input" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-input">Outlined</InputLabel>
        <Input id="outlined-input" />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="filled-input">Filled</InputLabel>
        <Input id="filled-input" />
      </FormControl>
    </Stack>
  ),
}

export const Sizes: Story = {
  args: {},
  render: () => (
    <Stack spacing={2} sx={{ width: 300 }}>
      <FormControl size="small">
        <InputLabel htmlFor="small-input">Small</InputLabel>
        <Input id="small-input" />
      </FormControl>
      <FormControl size="medium">
        <InputLabel htmlFor="medium-input">Medium</InputLabel>
        <Input id="medium-input" />
      </FormControl>
    </Stack>
  ),
}

export const Required: Story = {
  args: {
    required: true,
    children: (
      <>
        <InputLabel htmlFor="required-input">Required field</InputLabel>
        <Input id="required-input" />
        <FormHelperText>This field is required</FormHelperText>
      </>
    ),
  },
}

export const Error: Story = {
  args: {
    error: true,
    children: (
      <>
        <InputLabel htmlFor="error-input">Error field</InputLabel>
        <Input id="error-input" />
        <FormHelperText>Error message</FormHelperText>
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <InputLabel htmlFor="disabled-input">Disabled field</InputLabel>
        <Input id="disabled-input" />
        <FormHelperText>This field is disabled</FormHelperText>
      </>
    ),
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <>
        <InputLabel htmlFor="fullwidth-input">Full Width</InputLabel>
        <Input id="fullwidth-input" />
      </>
    ),
  },
}

export const WithSelect: Story = {
  args: {},
  render: () => (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="select-label">Age</InputLabel>
      <Select labelId="select-label" id="select" label="Age" defaultValue="">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <FormHelperText>Select your age</FormHelperText>
    </FormControl>
  ),
}

export const ComposedLayout: Story = {
  args: {},
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <FormControl>
        <FormLabel>Personal Information</FormLabel>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="First Name" size="small" />
          <TextField label="Last Name" size="small" />
          <TextField label="Email" type="email" size="small" />
        </Stack>
      </FormControl>
    </Stack>
  ),
}

export const InteractionTest: Story = {
  args: {
    children: (
      <>
        <InputLabel htmlFor="test-input">Test Input</InputLabel>
        <Input id="test-input" />
        <FormHelperText>Helper text</FormHelperText>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify label renders', async () => {
      const label = canvas.getByText('Test Input')
      await expect(label).toBeInTheDocument()
    })

    await step('Verify input is focusable', async () => {
      const input = canvas.getByRole('textbox')
      await userEvent.click(input)
      await expect(input).toHaveFocus()
    })

    await step('Verify helper text renders', async () => {
      const helperText = canvas.getByText('Helper text')
      await expect(helperText).toBeInTheDocument()
    })
  },
}
