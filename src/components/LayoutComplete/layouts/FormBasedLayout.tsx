import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

/**
 * Configuration for a form section.
 */
export interface FormSection {
  /** Unique identifier for the section */
  id: string
  /** Section title */
  title: string
  /** Optional description */
  description?: string
  /** Whether this section is optional */
  optional?: boolean
  /** Content to render in this section */
  content: React.ReactNode
  /** Whether the section is complete (for stepper mode) */
  isComplete?: boolean
  /** Whether the section has errors */
  hasErrors?: boolean
  /** Icon to display (for accordion/stepper) */
  icon?: React.ReactNode
}

/**
 * Props for the FormBasedLayout component.
 */
export interface FormBasedLayoutProps {
  /** Array of form sections */
  sections: FormSection[]
  /** Layout mode for sections */
  mode?: 'stacked' | 'accordion' | 'stepper'
  /** Title for the form */
  title?: string
  /** Subtitle or instructions */
  subtitle?: string
  /** Whether to show section numbers */
  showSectionNumbers?: boolean
  /** Whether to allow multiple accordions open (accordion mode) */
  allowMultipleOpen?: boolean
  /** Initially expanded section IDs (accordion mode) */
  defaultExpanded?: string[]
  /** Current step index (stepper mode) */
  activeStep?: number
  /** Whether stepper is linear (must complete in order) */
  linearStepper?: boolean
  /** Whether to show navigation buttons (stepper mode) */
  showStepperNavigation?: boolean
  /** Submit button text */
  submitText?: string
  /** Cancel button text */
  cancelText?: string
  /** Whether the form is submitting */
  isSubmitting?: boolean
  /** Whether to show the action buttons */
  showActions?: boolean
  /** Callback when form is submitted */
  onSubmit?: () => void
  /** Callback when form is cancelled */
  onCancel?: () => void
  /** Callback when step changes (stepper mode) */
  onStepChange?: (step: number) => void
  /** Maximum width of the form */
  maxWidth?: number | string
  /** Elevation of section cards */
  elevation?: number
  /** Gap between sections */
  gap?: number
}

/**
 * FormBasedLayout provides structured input fields with organized sections.
 *
 * This layout pattern is ideal for:
 * - Checkout pages with shipping, payment, and review sections
 * - Registration forms with multiple steps
 * - Settings pages with categorized options
 * - Surveys and questionnaires
 * - Multi-step wizards
 *
 * @param props - FormBasedLayout configuration
 * @returns A structured form with organized sections
 *
 * @example
 * // Stacked sections for checkout
 * <FormBasedLayout
 *   sections={[
 *     { id: 'shipping', title: 'Shipping', content: <ShippingForm /> },
 *     { id: 'payment', title: 'Payment', content: <PaymentForm /> },
 *     { id: 'review', title: 'Review', content: <OrderReview /> },
 *   ]}
 *   mode="stacked"
 *   onSubmit={handleCheckout}
 * />
 *
 * @example
 * // Stepper mode for wizard
 * <FormBasedLayout
 *   sections={sections}
 *   mode="stepper"
 *   linearStepper={true}
 *   showStepperNavigation={true}
 * />
 */
const FormBasedLayout: React.FC<FormBasedLayoutProps> = ({
  sections,
  mode = 'stacked',
  title,
  subtitle,
  showSectionNumbers = true,
  allowMultipleOpen = false,
  defaultExpanded = [],
  activeStep: controlledStep,
  linearStepper = false,
  showStepperNavigation = true,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false,
  showActions = true,
  onSubmit,
  onCancel,
  onStepChange,
  maxWidth = 800,
  elevation = 0,
  gap = 3,
}) => {
  // Internal state for stepper mode
  const [internalStep, setInternalStep] = useState(0)
  const activeStep = controlledStep ?? internalStep

  // Accordion state
  const [expandedSections, setExpandedSections] =
    useState<string[]>(defaultExpanded)

  const handleStepChange = (step: number) => {
    if (controlledStep === undefined) {
      setInternalStep(step)
    }
    onStepChange?.(step)
  }

  const handleNext = () => {
    if (activeStep < sections.length - 1) {
      handleStepChange(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      handleStepChange(activeStep - 1)
    }
  }

  const handleAccordionChange = (sectionId: string) => {
    setExpandedSections((prev) => {
      if (allowMultipleOpen) {
        return prev.includes(sectionId)
          ? prev.filter((id) => id !== sectionId)
          : [...prev, sectionId]
      }
      return prev.includes(sectionId) ? [] : [sectionId]
    })
  }

  const renderSectionTitle = (section: FormSection, index: number) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showSectionNumbers && (
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: section.isComplete ? 'success.main' : 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Box>
      )}
      <Box>
        <Typography variant="subtitle1" fontWeight={600} component="span">
          {section.title}
        </Typography>
        {section.optional && (
          <Typography
            variant="caption"
            color="text.secondary"
            component="span"
            sx={{ ml: 1 }}
          >
            (Optional)
          </Typography>
        )}
      </Box>
    </Box>
  )

  const renderStackedMode = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
      {sections.map((section, index) => (
        <Paper
          key={section.id}
          elevation={elevation}
          sx={{
            p: 3,
            border: elevation === 0 ? 1 : 0,
            borderColor: section.hasErrors ? 'error.main' : 'divider',
          }}
        >
          {renderSectionTitle(section, index)}
          {section.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, mb: 2 }}
            >
              {section.description}
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>{section.content}</Box>
        </Paper>
      ))}
    </Box>
  )

  const renderAccordionMode = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {sections.map((section, index) => (
        <Accordion
          key={section.id}
          expanded={expandedSections.includes(section.id)}
          onChange={() => handleAccordionChange(section.id)}
          elevation={elevation}
          sx={{
            border: elevation === 0 ? 1 : 0,
            borderColor: section.hasErrors ? 'error.main' : 'divider',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${section.id}-content`}
            id={`${section.id}-header`}
          >
            {renderSectionTitle(section, index)}
          </AccordionSummary>
          <AccordionDetails>
            {section.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {section.description}
              </Typography>
            )}
            {section.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )

  const renderStepperMode = () => (
    <Box>
      {/* Stepper navigation */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {sections.map((section, index) => {
          const stepProps: { completed?: boolean; error?: boolean } = {}
          if (section.isComplete) {
            stepProps.completed = true
          }
          if (section.hasErrors) {
            stepProps.error = true
          }

          return (
            <Step
              key={section.id}
              {...stepProps}
              onClick={() => {
                if (!linearStepper || index <= activeStep) {
                  handleStepChange(index)
                }
              }}
              sx={{
                cursor:
                  !linearStepper || index <= activeStep ? 'pointer' : 'default',
              }}
            >
              <StepLabel
                optional={
                  section.optional ? (
                    <Typography variant="caption">Optional</Typography>
                  ) : undefined
                }
                icon={section.icon}
              >
                {section.title}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {/* Current step content */}
      <Paper
        elevation={elevation}
        sx={{
          p: 3,
          border: elevation === 0 ? 1 : 0,
          borderColor: sections[activeStep]?.hasErrors
            ? 'error.main'
            : 'divider',
        }}
      >
        {sections[activeStep]?.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {sections[activeStep].description}
          </Typography>
        )}
        {sections[activeStep]?.content}
      </Paper>

      {/* Stepper navigation buttons */}
      {showStepperNavigation && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {onCancel && (
              <Button variant="text" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {activeStep === sections.length - 1 ? (
              <Button
                variant="contained"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : submitText}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )

  return (
    <Box
      sx={{
        maxWidth,
        mx: 'auto',
        width: '100%',
      }}
    >
      {/* Form Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: 4 }}>
          {title && (
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight={700}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Form Content */}
      {mode === 'stacked' && renderStackedMode()}
      {mode === 'accordion' && renderAccordionMode()}
      {mode === 'stepper' && renderStepperMode()}

      {/* Form Actions (for non-stepper modes) */}
      {showActions && mode !== 'stepper' && (
        <>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : submitText}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default FormBasedLayout
