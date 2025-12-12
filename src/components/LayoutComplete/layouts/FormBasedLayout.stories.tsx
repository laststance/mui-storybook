import CreditCardIcon from '@mui/icons-material/CreditCard'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ReceiptIcon from '@mui/icons-material/Receipt'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { expect, userEvent, within } from 'storybook/test'

import FormBasedLayout from './FormBasedLayout'

import type { FormSection } from './FormBasedLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * FormBasedLayout provides structured input fields with organized sections.
 *
 * This layout pattern is essential for collecting user input in a clear,
 * organized manner:
 *
 * - **Checkout pages**: Shipping, payment, and review sections
 * - **Registration forms**: Account, profile, and preferences
 * - **Settings pages**: Categorized configuration options
 * - **Surveys**: Question groups with progress tracking
 * - **Multi-step wizards**: Guided data collection flows
 *
 * ## Layout Modes
 * - **Stacked**: All sections visible, vertically stacked
 * - **Accordion**: Collapsible sections for focused input
 * - **Stepper**: Step-by-step wizard with navigation
 *
 * ## Best Practices
 * - Group related fields into logical sections
 * - Mark optional sections clearly
 * - Provide clear validation feedback
 * - Use stepper mode for complex multi-step processes
 *
 * @example
 * ```tsx
 * import { FormBasedLayout } from './FormBasedLayout'
 *
 * const sections = [
 *   { id: 'contact', title: 'Contact', content: <ContactForm /> },
 *   { id: 'address', title: 'Address', content: <AddressForm /> },
 * ]
 *
 * <FormBasedLayout
 *   sections={sections}
 *   mode="stacked"
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/FormBased',
  component: FormBasedLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FormBasedLayout provides structured input fields with organized sections.

## Layout Modes
- **Stacked**: All sections visible, vertically arranged
- **Accordion**: Collapsible sections for focused input
- **Stepper**: Step-by-step wizard with progress indicator

## Section Configuration
Each section can include:
- \`id\`: Unique identifier
- \`title\`: Section heading
- \`description\`: Optional helper text
- \`optional\`: Mark as optional
- \`content\`: Form fields to render
- \`isComplete\`: Completion status (stepper)
- \`hasErrors\`: Error state styling

## Features
- Multiple layout modes
- Section numbering
- Progress tracking
- Form actions (submit/cancel)
- Stepper navigation
- Validation states

## Use Cases
1. **Checkout**: Shipping, payment, review
2. **Registration**: Multi-step account creation
3. **Settings**: Categorized preferences
4. **Surveys**: Grouped questions
5. **Wizards**: Complex data collection
        `,
      },
    },
  },
  argTypes: {
    sections: {
      description: 'Array of form sections',
      table: {
        category: 'Content',
        type: { summary: 'FormSection[]' },
      },
    },
    mode: {
      control: 'radio',
      options: ['stacked', 'accordion', 'stepper'],
      description: 'Layout mode for sections',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'stacked' },
      },
    },
    title: {
      control: 'text',
      description: 'Form title',
      table: {
        category: 'Content',
      },
    },
    subtitle: {
      control: 'text',
      description: 'Form subtitle or instructions',
      table: {
        category: 'Content',
      },
    },
    showSectionNumbers: {
      control: 'boolean',
      description: 'Show numbered badges on sections',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    allowMultipleOpen: {
      control: 'boolean',
      description: 'Allow multiple accordions open (accordion mode)',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    linearStepper: {
      control: 'boolean',
      description: 'Require completing steps in order (stepper mode)',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    showStepperNavigation: {
      control: 'boolean',
      description: 'Show navigation buttons (stepper mode)',
      table: {
        category: 'Controls',
        defaultValue: { summary: 'true' },
      },
    },
    showActions: {
      control: 'boolean',
      description: 'Show submit/cancel buttons',
      table: {
        category: 'Controls',
        defaultValue: { summary: 'true' },
      },
    },
    submitText: {
      control: 'text',
      description: 'Submit button text',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Submit' },
      },
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button text',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Cancel' },
      },
    },
    isSubmitting: {
      control: 'boolean',
      description: 'Form is submitting',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: { type: 'number', min: 400, max: 1200 },
      description: 'Maximum width of the form',
      table: {
        category: 'Layout',
        defaultValue: { summary: '800' },
      },
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Elevation of section cards',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '0' },
      },
    },
    gap: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Gap between sections',
      table: {
        category: 'Layout',
        defaultValue: { summary: '3' },
      },
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback when form is submitted',
      table: { category: 'Events' },
    },
    onCancel: {
      action: 'cancelled',
      description: 'Callback when form is cancelled',
      table: { category: 'Events' },
    },
    onStepChange: {
      action: 'stepChanged',
      description: 'Callback when step changes (stepper mode)',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof FormBasedLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample form fields for sections
const ShippingForm = () => (
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField label="First Name" fullWidth required />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField label="Last Name" fullWidth required />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <TextField label="Address" fullWidth required />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <TextField label="Apartment, suite, etc." fullWidth />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField label="City" fullWidth required />
    </Grid>
    <Grid size={{ xs: 12, sm: 3 }}>
      <TextField label="State" fullWidth required select>
        <MenuItem value="CA">California</MenuItem>
        <MenuItem value="NY">New York</MenuItem>
        <MenuItem value="TX">Texas</MenuItem>
      </TextField>
    </Grid>
    <Grid size={{ xs: 12, sm: 3 }}>
      <TextField label="ZIP Code" fullWidth required />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <TextField label="Phone" fullWidth type="tel" />
    </Grid>
  </Grid>
)

const PaymentForm = () => (
  <Grid container spacing={2}>
    <Grid size={{ xs: 12 }}>
      <TextField
        label="Card Number"
        fullWidth
        required
        placeholder="1234 5678 9012 3456"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CreditCardIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        label="Expiration Date"
        fullWidth
        required
        placeholder="MM/YY"
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField
        label="CVV"
        fullWidth
        required
        placeholder="123"
        type="password"
      />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <TextField label="Name on Card" fullWidth required />
    </Grid>
    <Grid size={{ xs: 12 }}>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Billing address same as shipping"
      />
    </Grid>
  </Grid>
)

const ReviewSection = () => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>
      Order Summary
    </Typography>
    <Box sx={{ mb: 2 }}>
      {[
        { name: 'Wireless Headphones', qty: 1, price: '$199.99' },
        { name: 'USB-C Cable', qty: 2, price: '$29.99' },
      ].map((item, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2">
            {item.name} x {item.qty}
          </Typography>
          <Typography variant="body2">{item.price}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
      <Typography variant="subtitle1" fontWeight={600}>
        Total
      </Typography>
      <Typography variant="subtitle1" fontWeight={600}>
        $259.97
      </Typography>
    </Box>
    <Box sx={{ mt: 3 }}>
      <FormControlLabel
        control={<Checkbox required />}
        label="I agree to the Terms of Service and Privacy Policy"
      />
    </Box>
  </Box>
)

// Basic sections for simple stories
const basicSections: FormSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Please provide your contact details.',
    content: (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="First Name" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Last Name" fullWidth />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField label="Email" fullWidth type="email" />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'address',
    title: 'Address',
    content: (
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField label="Street Address" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="City" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="ZIP Code" fullWidth />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'preferences',
    title: 'Preferences',
    optional: true,
    content: (
      <FormControl component="fieldset">
        <FormLabel component="legend">Notification Preferences</FormLabel>
        <RadioGroup defaultValue="email">
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel value="sms" control={<Radio />} label="SMS" />
          <FormControlLabel value="none" control={<Radio />} label="None" />
        </RadioGroup>
      </FormControl>
    ),
  },
]

/**
 * Interactive playground for the FormBasedLayout component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    sections: basicSections,
    mode: 'stacked',
    title: 'User Registration',
    subtitle: 'Please fill out the form below to create your account.',
    showSectionNumbers: true,
    showActions: true,
    submitText: 'Register',
    cancelText: 'Cancel',
    maxWidth: 700,
    elevation: 0,
    gap: 3,
  },
}

/**
 * Basic stacked form with multiple sections.
 */
export const Basic: Story = {
  args: {
    sections: basicSections,
    mode: 'stacked',
    maxWidth: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic stacked form with section numbering and action buttons.',
      },
    },
  },
}

/**
 * Checkout page with shipping, payment, and review sections.
 * Demonstrates a real-world e-commerce checkout use case.
 */
export const RealWorld: Story = {
  args: {
    sections: [],
  },
  render: () => {
    const checkoutSections: FormSection[] = [
      {
        id: 'shipping',
        title: 'Shipping Information',
        description: 'Enter your delivery address.',
        icon: <LocalShippingIcon />,
        content: <ShippingForm />,
      },
      {
        id: 'payment',
        title: 'Payment Method',
        description: 'All transactions are secure and encrypted.',
        icon: <CreditCardIcon />,
        content: <PaymentForm />,
      },
      {
        id: 'review',
        title: 'Review Order',
        description: 'Please review your order before completing.',
        icon: <ReceiptIcon />,
        content: <ReviewSection />,
      },
    ]

    return (
      <FormBasedLayout
        sections={checkoutSections}
        mode="stacked"
        title="Checkout"
        subtitle="Complete your purchase in 3 easy steps."
        submitText="Place Order"
        cancelText="Back to Cart"
        maxWidth={700}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Real-world checkout page with:
- **Shipping section**: Address and contact fields
- **Payment section**: Credit card information with icon
- **Review section**: Order summary and confirmation

Includes all required field validation and terms acceptance.
        `,
      },
    },
  },
}

/**
 * Accordion mode for collapsible sections.
 */
export const AccordionMode: Story = {
  args: {
    sections: basicSections,
    mode: 'accordion',
    title: 'Settings',
    subtitle: 'Click a section to expand and edit.',
    defaultExpanded: ['personal'],
    maxWidth: 600,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion mode collapses sections to focus on one area at a time.',
      },
    },
  },
}

/**
 * Accordion with multiple sections open.
 */
export const AccordionMultipleOpen: Story = {
  args: {
    sections: basicSections,
    mode: 'accordion',
    allowMultipleOpen: true,
    defaultExpanded: ['personal', 'address'],
    maxWidth: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Allow multiple accordion sections to be open simultaneously.',
      },
    },
  },
}

/**
 * Stepper mode for multi-step wizard.
 */
export const StepperMode: Story = {
  args: {
    sections: [
      {
        id: 'step1',
        title: 'Account',
        description: 'Create your account credentials.',
        content: (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField label="Email" fullWidth type="email" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Password" fullWidth type="password" required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Confirm Password"
                fullWidth
                type="password"
                required
              />
            </Grid>
          </Grid>
        ),
      },
      {
        id: 'step2',
        title: 'Profile',
        description: 'Tell us about yourself.',
        content: (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="First Name" fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Last Name" fullWidth required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Bio" fullWidth multiline rows={3} />
            </Grid>
          </Grid>
        ),
        optional: true,
      },
      {
        id: 'step3',
        title: 'Confirmation',
        description: 'Review and complete your registration.',
        content: (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Ready to create your account?
            </Typography>
            <Typography color="text.secondary">
              Click Submit to complete your registration.
            </Typography>
          </Box>
        ),
      },
    ],
    mode: 'stepper',
    title: 'Create Account',
    linearStepper: true,
    showStepperNavigation: true,
    maxWidth: 600,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stepper mode provides a wizard interface with progress tracking.',
      },
    },
  },
}

/**
 * Stepper with completion states.
 */
export const StepperWithStates: Story = {
  args: {
    sections: [
      {
        id: 'complete',
        title: 'Completed Step',
        isComplete: true,
        content: <Typography>This step is complete.</Typography>,
      },
      {
        id: 'current',
        title: 'Current Step',
        content: <Typography>You are here.</Typography>,
      },
      {
        id: 'error',
        title: 'Step with Error',
        hasErrors: true,
        content: <Typography color="error">This step has errors.</Typography>,
      },
      {
        id: 'pending',
        title: 'Pending Step',
        content: <Typography>Not yet started.</Typography>,
      },
    ],
    mode: 'stepper',
    activeStep: 1,
    maxWidth: 700,
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper with different step states: completed, error, pending.',
      },
    },
  },
}

/**
 * Form with validation error states.
 */
export const WithErrors: Story = {
  args: {
    sections: [
      {
        id: 'valid',
        title: 'Valid Section',
        isComplete: true,
        content: (
          <TextField
            label="Valid Field"
            fullWidth
            defaultValue="Correct value"
          />
        ),
      },
      {
        id: 'error',
        title: 'Section with Errors',
        hasErrors: true,
        content: (
          <TextField
            label="Required Field"
            fullWidth
            error
            helperText="This field is required"
          />
        ),
      },
    ],
    mode: 'stacked',
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sections can display error states for validation feedback.',
      },
    },
  },
}

/**
 * Form without section numbers.
 */
export const WithoutNumbers: Story = {
  args: {
    sections: basicSections,
    mode: 'stacked',
    showSectionNumbers: false,
    maxWidth: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form sections without numbered badges for cleaner appearance.',
      },
    },
  },
}

/**
 * Submitting state.
 */
export const Submitting: Story = {
  args: {
    sections: basicSections.slice(0, 1),
    mode: 'stacked',
    isSubmitting: true,
    submitText: 'Save',
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Submit button shows loading state during form submission.',
      },
    },
  },
}

/**
 * Form without action buttons.
 */
export const WithoutActions: Story = {
  args: {
    sections: basicSections.slice(0, 1),
    mode: 'stacked',
    showActions: false,
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form without submit/cancel buttons for embedded use.',
      },
    },
  },
}

/**
 * Elevated section cards.
 */
export const Elevated: Story = {
  args: {
    sections: basicSections,
    mode: 'stacked',
    elevation: 2,
    gap: 4,
    maxWidth: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sections with elevation for more visual depth.',
      },
    },
  },
}

/**
 * Interaction test: Verifies stepper navigation.
 */
export const InteractionTest: Story = {
  args: {
    sections: [
      {
        id: 'step-1',
        title: 'First Step',
        content: (
          <Typography data-testid="step-1-content">Step 1 content</Typography>
        ),
      },
      {
        id: 'step-2',
        title: 'Second Step',
        content: (
          <Typography data-testid="step-2-content">Step 2 content</Typography>
        ),
      },
      {
        id: 'step-3',
        title: 'Third Step',
        content: (
          <Typography data-testid="step-3-content">Step 3 content</Typography>
        ),
      },
    ],
    mode: 'stepper',
    showStepperNavigation: true,
    maxWidth: 600,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify initial state - step 1 content visible
    const step1Content = canvas.getByTestId('step-1-content')
    await expect(step1Content).toBeVisible()

    // Find and click Next button
    const nextButton = canvas.getByRole('button', { name: /next/i })
    await expect(nextButton).toBeInTheDocument()

    await userEvent.click(nextButton)

    // Verify step 2 content is now visible
    const step2Content = canvas.getByTestId('step-2-content')
    await expect(step2Content).toBeVisible()

    // Find and click Back button
    const backButton = canvas.getByRole('button', { name: /back/i })
    await userEvent.click(backButton)

    // Verify back on step 1
    await expect(step1Content).toBeVisible()
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test verifying stepper navigation (Next/Back).',
      },
    },
  },
}
