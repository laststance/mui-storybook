import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import MUIStepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import React from 'react'

import Stepper from './Stepper'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Stepper',
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
