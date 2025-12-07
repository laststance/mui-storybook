import { expect, userEvent, within } from 'storybook/test'

import TextField from './TextField'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'label', enabled: true },
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField label="Outlined" variant="outlined" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Standard" variant="standard" />
    </div>
  ),
}

export const Required: Story = {
  args: {
    label: 'Required',
    required: true,
  },
}

export const Multiline: Story = {
  args: {
    label: 'Multiline',
    multiline: true,
    rows: 4,
  },
}

export const HelperText: Story = {
  args: {
    label: 'Label',
    helperText: 'This is helper text',
  },
}

export const Error: Story = {
  args: {
    label: 'Error',
    error: true,
    helperText: 'This is an error message',
  },
}

export const TypeInteraction: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: /username/i })

    await expect(input).toBeInTheDocument()
    await expect(input).toHaveValue('')

    await userEvent.type(input, 'hello world')
    await expect(input).toHaveValue('hello world')

    await userEvent.clear(input)
    await expect(input).toHaveValue('')
  },
}

export const AccessibilityDemo: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    required: true,
    helperText: 'We will never share your email',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessible form field with proper label, helper text, and required indicator.',
      },
    },
  },
}

export const AccessibleErrorState: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: true,
    helperText: 'Password must be at least 8 characters',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows accessible error state with clear error message.',
      },
    },
  },
}
