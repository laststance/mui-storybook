import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import MUIStepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import Stepper from './Stepper'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

export const Default: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0)
    return (
      <Box sx={{ width: '100%' }}>
        <MUIStepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MUIStepper>
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => setActiveStep((prev) => prev + 1)}
            sx={{ ml: 1 }}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    )
  },
}

export function Vertical() {
  const [activeStep, setActiveStep] = React.useState(0)
  const verticalSteps = [
    {
      label: 'Select campaign settings',
      description: 'Select your campaign settings and options',
    },
    {
      label: 'Create an ad group',
      description: 'An ad group contains one or more ads',
    },
    { label: 'Create an ad', description: 'Create your first ad' },
  ]

  return (
    <Box sx={{ maxWidth: 400 }}>
      <MUIStepper activeStep={activeStep} orientation="vertical">
        {verticalSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === verticalSteps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </MUIStepper>
    </Box>
  )
}

export function AlternativeLabel() {
  return (
    <MUIStepper activeStep={1} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
}

export function WithError() {
  return (
    <MUIStepper activeStep={1}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel error={index === 1}>{label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
}

export const InteractionTest: Story = {
  render: () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const handleNext = fn(() => setActiveStep((prev) => prev + 1))
    const handleBack = fn(() => setActiveStep((prev) => prev - 1))
    const handleReset = fn(() => setActiveStep(0))

    return (
      <Box sx={{ width: '100%' }} data-testid="stepper-container">
        <MUIStepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MUIStepper>
        {activeStep === steps.length ? (
          <Box sx={{ mt: 2 }}>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset} sx={{ mt: 1 }}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography>Step {activeStep + 1} content</Typography>
            <Box sx={{ mt: 1 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ ml: 1 }}
                data-testid="next-button"
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify initial render on first step', async () => {
      const step1 = canvas.getByText('Select campaign settings')
      const step2 = canvas.getByText('Create an ad group')
      const step3 = canvas.getByText('Create an ad')

      await expect(step1).toBeInTheDocument()
      await expect(step2).toBeInTheDocument()
      await expect(step3).toBeInTheDocument()
      await expect(canvas.getByText('Step 1 content')).toBeInTheDocument()
      await expect(canvas.getByRole('button', { name: /back/i })).toBeDisabled()
    })

    await step('Navigate to step 2', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i })
      await userEvent.click(nextButton)

      await expect(canvas.getByText('Step 2 content')).toBeInTheDocument()
      await expect(
        canvas.getByRole('button', { name: /back/i }),
      ).not.toBeDisabled()
    })

    await step('Navigate to step 3', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i })
      await userEvent.click(nextButton)

      await expect(canvas.getByText('Step 3 content')).toBeInTheDocument()
      await expect(
        canvas.getByRole('button', { name: /finish/i }),
      ).toBeInTheDocument()
    })

    await step('Navigate back to step 2', async () => {
      const backButton = canvas.getByRole('button', { name: /back/i })
      await userEvent.click(backButton)

      await expect(canvas.getByText('Step 2 content')).toBeInTheDocument()
    })

    await step('Navigate forward to step 3 and finish', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /next/i }))
      await userEvent.click(canvas.getByRole('button', { name: /finish/i }))

      await expect(canvas.getByText('All steps completed')).toBeInTheDocument()
      await expect(
        canvas.getByRole('button', { name: /reset/i }),
      ).toBeInTheDocument()
    })

    await step('Reset stepper to beginning', async () => {
      const resetButton = canvas.getByRole('button', { name: /reset/i })
      await userEvent.click(resetButton)

      await expect(canvas.getByText('Step 1 content')).toBeInTheDocument()
      await expect(canvas.getByRole('button', { name: /back/i })).toBeDisabled()
    })
  },
}
