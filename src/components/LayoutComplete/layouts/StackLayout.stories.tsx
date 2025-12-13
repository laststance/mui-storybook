import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { expect, userEvent, within } from 'storybook/test'

import StackLayout from './StackLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * StackLayout provides a vertically stacked layout pattern for organizing
 * content sections with consistent spacing and optional dividers.
 *
 * ## Use Cases
 * - **Settings pages**: Group related options into logical sections
 * - **Long-form content**: Articles, blog posts, and documentation
 * - **Landing pages**: Sequential sections telling a story
 * - **Form wizards**: Step-by-step form sections
 * - **Mobile layouts**: Optimized for vertical scrolling
 *
 * ## Key Features
 * - Configurable spacing between sections
 * - Optional dividers with customizable styles
 * - Container width constraints for readability
 * - Background color customization
 * - Responsive design built-in
 *
 * ## Accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Keyboard navigable content
 * - Screen reader friendly section organization
 */
const meta = {
  title: 'Layout Complete/Layouts/Stack',
  component: StackLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
StackLayout is a Container/Flow pattern that organizes content vertically with consistent spacing.

## When to Use
- Settings pages with grouped option sections
- Long-form content like articles and documentation
- Landing pages with sequential storytelling sections
- Mobile-first layouts optimized for vertical scrolling

## Anatomy
\`\`\`
┌─────────────────────────────────────┐
│           Section 1                 │
├─────────────────────────────────────┤  ← Optional Divider
│           Section 2                 │
├─────────────────────────────────────┤
│           Section 3                 │
└─────────────────────────────────────┘
\`\`\`

## Responsive Behavior
- Container width is constrained by maxWidth prop
- Sections stack naturally on all screen sizes
- Spacing adjusts proportionally to viewport

## Best Practices
1. Use consistent heading levels in each section
2. Keep sections focused on single topics
3. Use dividers sparingly for visual separation
4. Consider background colors for section distinction
        `,
      },
    },
  },
  argTypes: {
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'xlarge'],
      description: 'Spacing between stacked sections.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'medium' },
      },
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width constraint for the container.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'lg' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the container horizontally.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    dividerStyle: {
      control: 'select',
      options: ['none', 'light', 'full'],
      description: 'Style of dividers between sections.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'none' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'xlarge'],
      description: 'Padding around the entire stack.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'medium' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the stack container.',
      table: {
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof StackLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample section component for demonstration.
 */
const SampleSection: React.FC<{
  title: string
  color: string
  height?: number
}> = ({ title, color, height = 120 }) => (
  <Box
    sx={{
      backgroundColor: color,
      borderRadius: 2,
      p: 3,
      minHeight: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h6" color="white" fontWeight={600}>
      {title}
    </Typography>
  </Box>
)

/**
 * Interactive playground to explore all StackLayout configuration options.
 * Use the Controls panel to experiment with spacing, dividers, and container settings.
 */
export const Playground: Story = {
  args: {
    spacing: 'medium',
    maxWidth: 'lg',
    centered: true,
    dividerStyle: 'none',
    padding: 'medium',
    children: null, // Placeholder - overridden by render
  },
  render: (args) => (
    <StackLayout {...args}>
      <SampleSection title="Section 1 - Header" color="#1976d2" />
      <SampleSection title="Section 2 - Content" color="#388e3c" height={200} />
      <SampleSection title="Section 3 - Features" color="#f57c00" />
      <SampleSection title="Section 4 - Footer" color="#7b1fa2" height={100} />
    </StackLayout>
  ),
}

/**
 * Basic usage showing simple stacked sections with default settings.
 */
export const Basic: Story = {
  args: {
    spacing: 'medium',
    children: null, // Placeholder - overridden by render
  },
  render: (args) => (
    <StackLayout {...args}>
      <SampleSection title="First Section" color="#1976d2" />
      <SampleSection title="Second Section" color="#388e3c" />
      <SampleSection title="Third Section" color="#f57c00" />
    </StackLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic vertical stack with medium spacing. Ideal for simple content organization.',
      },
    },
  },
}

/**
 * Settings page section component for real-world example.
 */
const SettingsSection: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}> = ({ icon, title, description, children }) => (
  <Card variant="outlined" sx={{ width: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ color: 'primary.main' }}>{icon}</Box>
        <Box>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
      {children}
    </CardContent>
  </Card>
)

/**
 * Real-world example: A comprehensive settings page with grouped option sections.
 * This demonstrates the StackLayout pattern as commonly used in production applications.
 */
export const RealWorld: Story = {
  args: {
    spacing: 'large',
    maxWidth: 'md',
    dividerStyle: 'none',
    padding: 'large',
    children: null, // Placeholder - overridden by render
  },
  render: (args) => (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <StackLayout {...args}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>

        <SettingsSection
          icon={<AccountCircleIcon fontSize="large" />}
          title="Profile Settings"
          description="Manage your profile information"
        >
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Display Name"
                secondary="John Doe"
                primaryTypographyProps={{ 'aria-label': 'Display Name' }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Email"
                secondary="john.doe@example.com"
                primaryTypographyProps={{ 'aria-label': 'Email' }}
              />
            </ListItem>
          </List>
        </SettingsSection>

        <SettingsSection
          icon={<NotificationsIcon fontSize="large" />}
          title="Notification Preferences"
          description="Control how you receive notifications"
        >
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive updates via email"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    aria-label="Email notifications toggle"
                  />
                }
                label=""
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Push Notifications"
                secondary="Receive push notifications"
              />
              <FormControlLabel
                control={<Switch aria-label="Push notifications toggle" />}
                label=""
              />
            </ListItem>
          </List>
        </SettingsSection>

        <SettingsSection
          icon={<SecurityIcon fontSize="large" />}
          title="Security"
          description="Manage your account security"
        >
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemText
                primary="Two-Factor Authentication"
                secondary="Add an extra layer of security"
              />
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    aria-label="Two-factor authentication toggle"
                  />
                }
                label=""
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Login Alerts"
                secondary="Get notified of new logins"
              />
              <FormControlLabel
                control={
                  <Switch defaultChecked aria-label="Login alerts toggle" />
                }
                label=""
              />
            </ListItem>
          </List>
        </SettingsSection>
      </StackLayout>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A production-grade settings page demonstrating the StackLayout pattern.

**Features shown:**
- Card-based sections for visual grouping
- Icons for quick section identification
- Toggle switches for boolean settings
- Consistent spacing and hierarchy
- Background color for page distinction
        `,
      },
    },
  },
}

/**
 * Interaction test verifying stack layout renders correctly and responds to user interaction.
 */
export const InteractionTest: Story = {
  args: {
    spacing: 'medium',
    maxWidth: 'md',
    dividerStyle: 'light',
    children: null, // Placeholder - overridden by render
  },
  render: (args) => (
    <StackLayout {...args}>
      <Card data-testid="section-1">
        <CardContent>
          <Typography variant="h6">Section 1</Typography>
          <Typography variant="body2">
            Content for the first section.
          </Typography>
        </CardContent>
      </Card>
      <Card data-testid="section-2">
        <CardContent>
          <Typography variant="h6">Section 2</Typography>
          <FormControlLabel
            control={<Switch data-testid="toggle-switch" />}
            label="Toggle Option"
          />
        </CardContent>
      </Card>
      <Card data-testid="section-3">
        <CardContent>
          <Typography variant="h6">Section 3</Typography>
          <Typography variant="body2">
            Content for the third section.
          </Typography>
        </CardContent>
      </Card>
    </StackLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all sections are rendered
    const section1 = canvas.getByTestId('section-1')
    const section2 = canvas.getByTestId('section-2')
    const section3 = canvas.getByTestId('section-3')

    await expect(section1).toBeInTheDocument()
    await expect(section2).toBeInTheDocument()
    await expect(section3).toBeInTheDocument()

    // Verify sections are visible
    await expect(section1).toBeVisible()
    await expect(section2).toBeVisible()
    await expect(section3).toBeVisible()

    // Verify vertical stacking by checking relative positions
    const section1Rect = section1.getBoundingClientRect()
    const section2Rect = section2.getBoundingClientRect()
    const section3Rect = section3.getBoundingClientRect()

    // Sections should be stacked vertically
    await expect(section1Rect.top).toBeLessThan(section2Rect.top)
    await expect(section2Rect.top).toBeLessThan(section3Rect.top)

    // Verify dividers are present (light style creates horizontal rules)
    const dividers = canvasElement.querySelectorAll('hr')
    await expect(dividers.length).toBe(2) // 2 dividers between 3 sections

    // Test interactive element
    const toggleSwitch = canvas.getByTestId('toggle-switch')
    await expect(toggleSwitch).toBeInTheDocument()

    // Toggle the switch
    await userEvent.click(toggleSwitch)

    // Verify switch state changed (checkbox within switch)
    const checkbox = toggleSwitch.querySelector('input[type="checkbox"]')
    await expect(checkbox).toBeChecked()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automated test verifying stack layout rendering, section ordering, dividers, and interactive elements.',
      },
    },
  },
}

/**
 * Demonstrates different spacing options available.
 */
export const SpacingVariants: Story = {
  args: {
    children: null, // Placeholder - overridden by render
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, p: 2 }}>
      {(['none', 'small', 'medium', 'large', 'xlarge'] as const).map(
        (spacing) => (
          <Box key={spacing}>
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
              Spacing: {spacing}
            </Typography>
            <Box sx={{ border: '1px dashed #ccc', p: 1 }}>
              <StackLayout spacing={spacing} maxWidth={false} padding="small">
                <SampleSection title="A" color="#1976d2" height={60} />
                <SampleSection title="B" color="#388e3c" height={60} />
                <SampleSection title="C" color="#f57c00" height={60} />
              </StackLayout>
            </Box>
          </Box>
        ),
      )}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all spacing options from none to xlarge. Choose based on content density and visual breathing room needed.',
      },
    },
  },
}

/**
 * Demonstrates different divider styles available.
 */
export const DividerStyles: Story = {
  args: {
    children: null, // Placeholder - overridden by render
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, p: 2, flexWrap: 'wrap' }}>
      {(['none', 'light', 'full'] as const).map((dividerStyle) => (
        <Box key={dividerStyle} sx={{ flex: '1 1 300px' }}>
          <Typography variant="subtitle2" gutterBottom>
            Divider: {dividerStyle}
          </Typography>
          <StackLayout
            dividerStyle={dividerStyle}
            spacing="medium"
            maxWidth={false}
            padding="small"
          >
            <SampleSection title="Section 1" color="#1976d2" height={80} />
            <SampleSection title="Section 2" color="#388e3c" height={80} />
            <SampleSection title="Section 3" color="#f57c00" height={80} />
          </StackLayout>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available divider styles: none (no dividers), light (subtle with margins), and full (edge-to-edge).',
      },
    },
  },
}

/**
 * Full-width layout without container constraints.
 */
export const FullWidth: Story = {
  args: {
    maxWidth: false,
    spacing: 'large',
    padding: 'none',
    children: null, // Placeholder - overridden by render
  },
  render: (args) => (
    <StackLayout {...args}>
      <Box
        sx={{
          backgroundColor: '#1976d2',
          py: 8,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h3">Full-Width Hero</Typography>
        <Typography variant="h6">Edge-to-edge sections</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">Feature Section</Typography>
        <Typography>Content spans the full viewport width</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#388e3c',
          py: 8,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h3">Call to Action</Typography>
        <Typography variant="h6">Immersive landing page experience</Typography>
      </Box>
    </StackLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Full-width layout for landing pages and marketing sites where sections span the entire viewport.',
      },
    },
  },
}
