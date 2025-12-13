import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import SplitScreenLayout from './SplitScreenLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * SplitScreenLayout divides the viewport into two panels for contrasting content,
 * perfect for authentication pages, before/after comparisons, and dual-purpose layouts.
 *
 * ## Use Cases
 * - **Authentication pages**: Branding on left, form on right
 * - **Before/after comparisons**: Side-by-side image comparison
 * - **Onboarding flows**: Instructions with interactive content
 * - **Product showcases**: Image gallery with details panel
 *
 * ## Key Features
 * - Configurable split ratios (50-50, 40-60, etc.)
 * - Horizontal and vertical split directions
 * - Responsive behavior options (stack, hide, maintain)
 * - Independent panel backgrounds
 * - Customizable gap between panels
 *
 * ## Accessibility
 * - Semantic section elements with aria-labels
 * - Keyboard navigable content
 * - Focus management for forms
 * - Screen reader friendly structure
 */
const meta = {
  title: 'Layout Complete/Layouts/SplitScreen',
  component: SplitScreenLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
SplitScreenLayout is a Container/Flow pattern that divides the screen into two contrasting panels.

## When to Use
- Login/signup pages with branding and form
- Before/after image comparisons
- Dashboard with navigation and content
- Any dual-purpose page requiring visual separation

## Anatomy
\`\`\`
Horizontal (default):              Vertical:
┌──────────┬──────────┐           ┌────────────────────┐
│          │          │           │    Top Panel       │
│   Left   │  Right   │           ├────────────────────┤
│  Panel   │  Panel   │           │   Bottom Panel     │
│          │          │           │                    │
└──────────┴──────────┘           └────────────────────┘
\`\`\`

## Responsive Behavior Options
- **stack**: Panels stack vertically on mobile (default)
- **hide-left**: Left panel hidden on mobile
- **hide-right**: Right panel hidden on mobile
- **maintain**: Keep split ratio on all screens

## Best Practices
1. Use contrasting content for visual impact
2. Place form/action content on the side with more space
3. Use hide-left/right to prioritize content on mobile
4. Ensure both panels have adequate padding
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Split direction.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'horizontal' },
      },
    },
    ratio: {
      control: 'select',
      options: ['50-50', '40-60', '60-40', '30-70', '70-30', 'custom'],
      description: 'Predefined split ratio.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '50-50' },
      },
    },
    customRatio: {
      control: { type: 'range', min: 10, max: 90, step: 5 },
      description: 'Custom left panel percentage (when ratio is "custom").',
      table: {
        category: 'Layout',
        defaultValue: { summary: '50' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 32, step: 4 },
      description: 'Gap between panels in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '0' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the layout.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '100vh' },
      },
    },
    responsiveBehavior: {
      control: 'select',
      options: ['stack', 'hide-left', 'hide-right', 'maintain'],
      description: 'Behavior on mobile screens.',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'stack' },
      },
    },
    breakpoint: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Breakpoint for responsive behavior.',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'md' },
      },
    },
    reverseOnStack: {
      control: 'boolean',
      description: 'Reverse order when stacking on mobile.',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'false' },
      },
    },
    leftBackground: {
      control: 'color',
      description: 'Background color for the left panel.',
      table: {
        category: 'Appearance',
      },
    },
    rightBackground: {
      control: 'color',
      description: 'Background color for the right panel.',
      table: {
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof SplitScreenLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample panel component for demonstration.
 */
const SamplePanel: React.FC<{
  title: string
  color: string
  textColor?: string
}> = ({ title, color, textColor = '#ffffff' }) => (
  <Box
    sx={{
      height: '100%',
      minHeight: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      p: 4,
    }}
  >
    <Typography variant="h4" sx={{ color: textColor, fontWeight: 600 }}>
      {title}
    </Typography>
  </Box>
)

/**
 * Interactive playground to explore all SplitScreenLayout configuration options.
 */
export const Playground: Story = {
  args: {
    direction: 'horizontal',
    ratio: '50-50',
    gap: 0,
    minHeight: '100vh',
    responsiveBehavior: 'stack',
    breakpoint: 'md',
    reverseOnStack: false,
    leftContent: <SamplePanel title="Left Panel" color="#1976d2" />,
    rightContent: <SamplePanel title="Right Panel" color="#388e3c" />,
  },
}

/**
 * Basic usage showing a simple 50/50 split.
 */
export const Basic: Story = {
  args: {
    ratio: '50-50',
    leftContent: <SamplePanel title="Left Content" color="#1976d2" />,
    rightContent: <SamplePanel title="Right Content" color="#f57c00" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic 50/50 split layout. Ideal for equal-weight content or balanced comparisons.',
      },
    },
  },
}

/**
 * Login form component for real-world example.
 */
const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        backgroundColor: '#ffffff',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to continue to your account
        </Typography>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            autoComplete="email"
            inputProps={{ 'data-testid': 'email-input' }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            autoComplete="current-password"
            inputProps={{ 'data-testid': 'password-input' }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Remember me"
            />
            <Link href="#" underline="hover" variant="body2">
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            data-testid="login-button"
            sx={{ py: 1.5 }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 1 }}>or</Divider>

          <Button variant="outlined" size="large" fullWidth sx={{ py: 1.5 }}>
            Continue with Google
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?{' '}
            <Link href="#" underline="hover" fontWeight={600}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * Branding panel component for real-world example.
 */
const BrandingPanel: React.FC = () => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 6,
      background:
        'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
      color: '#ffffff',
      textAlign: 'center',
    }}
  >
    <LockIcon sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
    <Typography variant="h3" component="h2" fontWeight={700} gutterBottom>
      SecureApp
    </Typography>
    <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, maxWidth: 400 }}>
      Your trusted platform for secure business operations
    </Typography>
    <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
      {[
        { value: '10K+', label: 'Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '256-bit', label: 'Encryption' },
      ].map((stat) => (
        <Box key={stat.label}>
          <Typography variant="h4" fontWeight={700}>
            {stat.value}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

/**
 * Real-world example: Authentication page with branding and login form.
 */
export const RealWorld: Story = {
  args: {
    ratio: '40-60',
    responsiveBehavior: 'hide-left',
    leftContent: <BrandingPanel />,
    rightContent: <LoginForm />,
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-grade authentication page demonstrating the SplitScreenLayout pattern.

**Features shown:**
- Branding panel with logo and statistics
- Login form with email/password fields
- Password visibility toggle
- Remember me and forgot password options
- Social login option
- Responsive behavior: branding hidden on mobile

Resize the viewport to see the responsive behavior in action.
        `,
      },
    },
  },
}

/**
 * Interaction test verifying split screen layout and form functionality.
 */
export const InteractionTest: Story = {
  args: {
    ratio: '40-60',
    leftContent: (
      <Box
        data-testid="left-panel"
        sx={{
          height: '100%',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1976d2',
          color: '#ffffff',
        }}
      >
        <Typography variant="h5">Branding Panel</Typography>
      </Box>
    ),
    rightContent: (
      <Box
        data-testid="right-panel"
        sx={{
          height: '100%',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          gap: 2,
          p: 4,
        }}
      >
        <Typography variant="h5">Form Panel</Typography>
        <TextField
          label="Email"
          type="email"
          data-testid="test-email"
          inputProps={{ 'data-testid': 'test-email-input' }}
        />
        <Button variant="contained" data-testid="test-submit">
          Submit
        </Button>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify both panels are rendered
    const leftPanel = canvas.getByTestId('left-panel')
    const rightPanel = canvas.getByTestId('right-panel')

    await expect(leftPanel).toBeInTheDocument()
    await expect(rightPanel).toBeInTheDocument()

    // Verify panels are visible
    await expect(leftPanel).toBeVisible()
    await expect(rightPanel).toBeVisible()

    // Verify horizontal split (left panel is to the left of right panel)
    const leftRect = leftPanel.getBoundingClientRect()
    const rightRect = rightPanel.getBoundingClientRect()

    await expect(leftRect.right).toBeLessThanOrEqual(rightRect.left + 1) // Allow 1px tolerance

    // Verify section elements exist
    const sections = canvasElement.querySelectorAll('section')
    await expect(sections.length).toBe(2)

    // Test form interaction
    const emailInput = canvas.getByTestId('test-email-input')
    await expect(emailInput).toBeInTheDocument()

    // Type in the email field
    await userEvent.type(emailInput, 'test@example.com')
    await expect(emailInput).toHaveValue('test@example.com')

    // Verify submit button
    const submitButton = canvas.getByTestId('test-submit')
    await expect(submitButton).toBeInTheDocument()
    await expect(submitButton).toBeEnabled()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automated test verifying panel layout, horizontal positioning, and form interaction.',
      },
    },
  },
}

/**
 * Demonstrates different split ratios.
 */
export const RatioVariants: Story = {
  args: {
    leftContent: null, // Placeholder - overridden by render
    rightContent: null, // Placeholder - overridden by render
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(['50-50', '40-60', '60-40', '30-70', '70-30'] as const).map((ratio) => (
        <Box key={ratio}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Ratio: {ratio}
          </Typography>
          <SplitScreenLayout
            ratio={ratio}
            minHeight={150}
            leftContent={
              <Box
                sx={{
                  height: '100%',
                  backgroundColor: '#1976d2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="white">
                  Left ({ratio.split('-')[0]}%)
                </Typography>
              </Box>
            }
            rightContent={
              <Box
                sx={{
                  height: '100%',
                  backgroundColor: '#388e3c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="white">
                  Right ({ratio.split('-')[1]}%)
                </Typography>
              </Box>
            }
          />
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of available split ratio presets. Choose based on content priority.',
      },
    },
  },
}

/**
 * Vertical split direction.
 */
export const VerticalSplit: Story = {
  args: {
    direction: 'vertical',
    ratio: '40-60',
    minHeight: '80vh',
    leftContent: (
      <Box
        sx={{
          height: '100%',
          backgroundColor: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}
      >
        <Typography variant="h5">Top Panel (40%)</Typography>
      </Box>
    ),
    rightContent: (
      <Box
        sx={{
          height: '100%',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5">Bottom Panel (60%)</Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vertical split mode stacks panels top-to-bottom instead of left-to-right.',
      },
    },
  },
}

/**
 * Before/after comparison layout.
 */
export const BeforeAfterComparison: Story = {
  args: {
    ratio: '50-50',
    gap: 4,
    leftContent: (
      <Box
        sx={{
          height: '100%',
          minHeight: 400,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="overline" color="text.secondary" gutterBottom>
          Before
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: 300,
            height: 200,
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">Original Image</Typography>
        </Box>
      </Box>
    ),
    rightContent: (
      <Box
        sx={{
          height: '100%',
          minHeight: 400,
          backgroundColor: '#e3f2fd',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="overline" color="primary" gutterBottom>
          After
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: 300,
            height: 200,
            backgroundColor: '#1976d2',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="white">Enhanced Image</Typography>
        </Box>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Before/after comparison layout with a subtle gap between panels for visual separation.',
      },
    },
  },
}

/**
 * Demonstrates responsive stacking behavior.
 */
export const ResponsiveStack: Story = {
  args: {
    ratio: '40-60',
    responsiveBehavior: 'stack',
    reverseOnStack: true,
    leftContent: (
      <Box
        sx={{
          minHeight: 200,
          backgroundColor: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          p: 4,
        }}
      >
        <Typography variant="h6">Branding (stacks second on mobile)</Typography>
      </Box>
    ),
    rightContent: (
      <Box
        sx={{
          minHeight: 400,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="h6">Form (stacks first on mobile)</Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stack mode with reverseOnStack=true ensures form appears first on mobile devices.',
      },
    },
  },
}
