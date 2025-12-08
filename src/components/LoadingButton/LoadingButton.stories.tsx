import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof LoadingButton> = {
  title: 'Inputs/LoadingButton',
  component: LoadingButton,
  parameters: {
    layout: 'padded',
  },
  tags: [], // autodocs disabled - using custom MDX documentation
  argTypes: {
    loading: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    loadingPosition: {
      control: 'select',
      options: ['start', 'end', 'center'],
    },
  },
}

export default meta
type Story = StoryObj<typeof LoadingButton>

/**
 * Default loading button
 */
export const Default: Story = {
  args: {
    loading: false,
    children: 'Submit',
  },
}

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
    variant: 'contained',
    children: 'Submit',
  },
}

/**
 * All variants with loading state
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <LoadingButton loading variant="text">
        Text
      </LoadingButton>
      <LoadingButton loading variant="contained">
        Contained
      </LoadingButton>
      <LoadingButton loading variant="outlined">
        Outlined
      </LoadingButton>
    </Stack>
  ),
}

/**
 * Loading position variations
 */
export const LoadingPositions: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Start
      </LoadingButton>
      <LoadingButton loading loadingPosition="center" variant="outlined">
        Center
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="end"
        endIcon={<SendIcon />}
        variant="outlined"
      >
        End
      </LoadingButton>
    </Stack>
  ),
}

/**
 * Custom loading indicator
 */
export const CustomLoadingIndicator: Story = {
  render: () => (
    <LoadingButton loading loadingIndicator="Loading..." variant="contained">
      Fetch data
    </LoadingButton>
  ),
}

/**
 * Interactive loading example
 */
export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleClick}
        >
          Click to Load
        </LoadingButton>
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={handleClick}
        >
          Save
        </LoadingButton>
        <LoadingButton
          loading={loading}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="contained"
          onClick={handleClick}
        >
          Send
        </LoadingButton>
      </Box>
    )
  },
}

/**
 * Size variations
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <LoadingButton loading size="small" variant="contained">
        Small
      </LoadingButton>
      <LoadingButton loading size="medium" variant="contained">
        Medium
      </LoadingButton>
      <LoadingButton loading size="large" variant="contained">
        Large
      </LoadingButton>
    </Stack>
  ),
}

export const InteractionTest: Story = {
  args: {},
  render: () => {
    const handleClick = fn()
    return (
      <Stack direction="row" spacing={2}>
        <LoadingButton
          loading={false}
          variant="contained"
          onClick={handleClick}
          data-testid="normal-button"
        >
          Normal State
        </LoadingButton>
        <LoadingButton
          loading={true}
          variant="contained"
          data-testid="loading-button"
        >
          Loading State
        </LoadingButton>
        <LoadingButton
          loading={true}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          data-testid="loading-start-button"
        >
          Save
        </LoadingButton>
        <LoadingButton
          loading={false}
          loadingPosition="end"
          endIcon={<SendIcon />}
          variant="contained"
          onClick={handleClick}
          data-testid="normal-end-button"
        >
          Send
        </LoadingButton>
      </Stack>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify loading button states render', async () => {
      const normalButton = canvas.getByTestId('normal-button')
      await expect(normalButton).toBeInTheDocument()
      await expect(normalButton).toBeEnabled()

      const loadingButton = canvas.getByTestId('loading-button')
      await expect(loadingButton).toBeInTheDocument()
      await expect(loadingButton).toBeDisabled()
    })

    await step('Test normal button click interaction', async () => {
      const normalButton = canvas.getByTestId('normal-button')
      await userEvent.click(normalButton)
    })

    await step('Verify loading position variants', async () => {
      const loadingStartButton = canvas.getByTestId('loading-start-button')
      await expect(loadingStartButton).toBeInTheDocument()
      await expect(loadingStartButton).toBeDisabled()

      const normalEndButton = canvas.getByTestId('normal-end-button')
      await expect(normalEndButton).toBeInTheDocument()
      await expect(normalEndButton).toBeEnabled()
    })

    await step('Verify button text content', async () => {
      const normalButton = canvas.getByText('Normal State')
      await expect(normalButton).toBeInTheDocument()

      const loadingButton = canvas.getByText('Loading State')
      await expect(loadingButton).toBeInTheDocument()

      const saveButton = canvas.getByText('Save')
      await expect(saveButton).toBeInTheDocument()

      const sendButton = canvas.getByText('Send')
      await expect(sendButton).toBeInTheDocument()
    })
  },
}
