import AddIcon from '@mui/icons-material/Add'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CreateIcon from '@mui/icons-material/Create'
import EventIcon from '@mui/icons-material/Event'
import ImageIcon from '@mui/icons-material/Image'
import MicIcon from '@mui/icons-material/Mic'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SendIcon from '@mui/icons-material/Send'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import FABLayout from './FABLayout'

import type { FABAction } from './FABLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * FABLayout demonstrates the Floating Action Button (FAB) layout pattern.
 *
 * ## Overview
 * The FAB layout pattern places a prominent action button that floats above all content,
 * providing quick access to a primary action. This pattern is commonly used in mobile
 * applications and modern web interfaces.
 *
 * ## Use Cases
 * - **Mobile apps**: Compose messages, create new content
 * - **Email clients**: New email/compose button
 * - **Social media**: Create post, share content
 * - **Task managers**: Add new task
 * - **Note-taking apps**: Create new note
 *
 * ## Accessibility
 * - Proper aria-label for screen readers
 * - Keyboard navigable
 * - Visible focus indicators
 * - Touch-friendly target size (minimum 48x48px)
 *
 * ## Best Practices
 * - Use for the most important action in the app
 * - Limit to one FAB per screen
 * - Position in bottom-right for right-handed users
 * - Use SpeedDial for related secondary actions
 * - Ensure sufficient contrast with background
 */
const meta = {
  title: 'Layout Complete/Layouts/FAB',
  component: FABLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FABLayout demonstrates the Floating Action Button layout pattern commonly used in mobile applications.

## Key Features
- **Flexible positioning**: Bottom-right, bottom-left, bottom-center, top-right, top-left
- **SpeedDial support**: Expandable menu for multiple related actions
- **Extended variant**: FAB with label for clearer affordance
- **Customizable**: Colors, sizes, and icons

## Real-World Examples
- Gmail's compose button
- Google Maps' directions FAB
- Slack's message compose button
- Material Design app patterns

## When to Use
- Primary action that should always be accessible
- Actions that users perform frequently
- Mobile-first designs
- Single prominent action per screen
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'bottom-right',
        'bottom-left',
        'bottom-center',
        'top-right',
        'top-left',
      ],
      description: 'Position of the FAB on the screen.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'bottom-right' },
      },
    },
    showSpeedDial: {
      control: 'boolean',
      description: 'Whether to show as SpeedDial with multiple actions.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['circular', 'extended'],
      description: 'Variant of the FAB button.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'circular' },
      },
    },
    label: {
      control: 'text',
      description: 'Label for extended FAB variant.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Action' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Color of the FAB.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the FAB.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'large' },
      },
    },
    showContent: {
      control: 'boolean',
      description: 'Whether to show sample content cards.',
      table: {
        category: 'Demo',
        defaultValue: { summary: 'true' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Aria label for accessibility.',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'Floating action button' },
      },
    },
    onClick: { action: 'clicked' },
    onActionClick: { action: 'action clicked' },
    icon: { control: false },
    actions: { control: false },
  },
  args: {
    position: 'bottom-right',
    showSpeedDial: false,
    variant: 'circular',
    label: 'Action',
    color: 'primary',
    size: 'large',
    showContent: true,
    ariaLabel: 'Floating action button',
  },
} satisfies Meta<typeof FABLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the FABLayout component.
 * Use the Controls panel to experiment with all configuration options.
 */
export const Playground: Story = {
  args: {
    position: 'bottom-right',
    showSpeedDial: false,
    variant: 'circular',
    color: 'primary',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground with all controls available. Experiment with positions, variants, colors, and SpeedDial options.',
      },
    },
  },
}

/**
 * Basic FAB layout with default settings.
 * Shows a simple circular FAB in the bottom-right corner.
 */
export const Basic: Story = {
  args: {
    position: 'bottom-right',
    color: 'primary',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The most common FAB configuration: a circular button in the bottom-right corner with a plus icon.',
      },
    },
  },
}

/**
 * Real-world example: Mobile messaging app with compose FAB and SpeedDial.
 * Demonstrates a complete mobile app interface with primary compose action
 * and secondary quick actions.
 */
export const RealWorld: Story = {
  args: {
    showSpeedDial: true,
    position: 'bottom-right',
    color: 'primary',
    ariaLabel: 'Create new message',
  },
  render: (args) => {
    const messagingActions: FABAction[] = [
      { id: 'compose', name: 'New Message', icon: <CreateIcon /> },
      { id: 'camera', name: 'Take Photo', icon: <CameraAltIcon /> },
      { id: 'gallery', name: 'From Gallery', icon: <ImageIcon /> },
      { id: 'voice', name: 'Voice Message', icon: <MicIcon /> },
      { id: 'attachment', name: 'Attach File', icon: <AttachFileIcon /> },
    ]

    return <FABLayout {...args} actions={messagingActions} showContent={true} />
  },
  parameters: {
    docs: {
      description: {
        story: `
A real-world mobile messaging app interface with:
- **Primary FAB**: Opens SpeedDial for message creation options
- **Quick actions**: Camera, gallery, voice, and file attachment
- **Content cards**: Represent message threads or conversations

This pattern is commonly seen in apps like WhatsApp, Telegram, and Google Messages.
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies FAB click functionality.
 */
export const InteractionTest: Story = {
  args: {
    position: 'bottom-right',
    color: 'primary',
    ariaLabel: 'Add new item',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the FAB button
    const fabButton = await canvas.findByTestId('fab-button')
    await expect(fabButton).toBeInTheDocument()
    await expect(fabButton).toHaveAttribute('aria-label', 'Add new item')

    // Click the FAB
    await userEvent.click(fabButton)
    await expect(args.onClick).toHaveBeenCalled()

    // Verify the container is present
    const container = canvas.getByTestId('fab-layout-container')
    await expect(container).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies FAB rendering and click functionality.',
      },
    },
  },
}

/**
 * SpeedDial interaction test: Verifies SpeedDial open/close behavior.
 */
export const SpeedDialInteractionTest: Story = {
  args: {
    showSpeedDial: true,
    position: 'bottom-right',
    ariaLabel: 'SpeedDial actions',
    onActionClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the SpeedDial FAB
    const speedDialFab = await canvas.findByTestId('speed-dial-fab')
    await expect(speedDialFab).toBeInTheDocument()

    // Verify SpeedDial is initially closed (aria-expanded may not exist initially)
    const ariaExpanded = speedDialFab.getAttribute('aria-expanded')
    await expect(ariaExpanded === null || ariaExpanded === 'false').toBe(true)

    // Open the SpeedDial by clicking (more reliable than hover in tests)
    await userEvent.click(speedDialFab)

    // Wait for SpeedDial to open and verify actions are visible
    await waitFor(
      async () => {
        const editAction = await canvas.findByTestId('speed-dial-action-edit')
        expect(editAction).toBeVisible()
      },
      { timeout: 1000 },
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies SpeedDial opening and action visibility.',
      },
    },
  },
}

/**
 * Extended FAB with label for clearer action description.
 */
export const ExtendedVariant: Story = {
  args: {
    variant: 'extended',
    label: 'Compose',
    icon: <CreateIcon />,
    color: 'primary',
    position: 'bottom-right',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Extended FAB variant with a text label. Use this when the action needs more context or when screen real estate allows.',
      },
    },
  },
}

/**
 * Different FAB positions demonstration.
 */
export const Positions: Story = {
  args: {
    showContent: false,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
      }}
    >
      {(
        [
          'bottom-right',
          'bottom-left',
          'bottom-center',
          'top-right',
          'top-left',
        ] as const
      ).map((pos) => (
        <div key={pos}>
          <FABLayout
            position={pos}
            showContent={false}
            ariaLabel={`FAB at ${pos}`}
          />
          <p
            style={{ textAlign: 'center', marginTop: 8, fontWeight: 500 }}
          >{`Position: ${pos}`}</p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available FAB positions. Bottom-right is the most common for right-handed users.',
      },
    },
  },
}

/**
 * Color variants demonstration.
 */
export const ColorVariants: Story = {
  args: {
    showContent: false,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}
    >
      {(
        ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const
      ).map((color) => (
        <div key={color}>
          <FABLayout
            color={color}
            showContent={false}
            ariaLabel={`${color} FAB`}
          />
          <p
            style={{
              textAlign: 'center',
              marginTop: 8,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {color}
          </p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available color options. Choose based on the action importance and app color scheme.',
      },
    },
  },
}

/**
 * Social media app example with create post FAB.
 */
export const SocialMediaApp: Story = {
  args: {
    showSpeedDial: true,
    position: 'bottom-right',
    color: 'secondary',
    ariaLabel: 'Create post',
  },
  render: (args) => {
    const socialActions: FABAction[] = [
      { id: 'post', name: 'New Post', icon: <CreateIcon /> },
      { id: 'photo', name: 'Share Photo', icon: <CameraAltIcon /> },
      { id: 'event', name: 'Create Event', icon: <EventIcon /> },
      { id: 'invite', name: 'Invite Friend', icon: <PersonAddIcon /> },
    ]

    return <FABLayout {...args} actions={socialActions} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Social media app pattern with quick post creation options. Common in apps like Facebook, Instagram, and Twitter.',
      },
    },
  },
}

/**
 * Email app example with compose FAB.
 */
export const EmailApp: Story = {
  args: {
    variant: 'extended',
    label: 'Compose',
    icon: <CreateIcon />,
    color: 'error',
    position: 'bottom-right',
    ariaLabel: 'Compose new email',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Email app pattern similar to Gmail, with an extended FAB for composing new messages.',
      },
    },
  },
}

/**
 * Chat app example with send message FAB.
 */
export const ChatApp: Story = {
  args: {
    icon: <SendIcon />,
    color: 'primary',
    position: 'bottom-right',
    ariaLabel: 'Send message',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Chat application pattern with a send message FAB. Commonly positioned for easy thumb access on mobile.',
      },
    },
  },
}

/**
 * Size variants demonstration.
 */
export const SizeVariants: Story = {
  args: {
    showContent: false,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        alignItems: 'center',
        padding: 32,
      }}
    >
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <div
            style={{
              height: 100,
              width: 100,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FABLayout
              size={size}
              showContent={false}
              position="bottom-center"
              ariaLabel={`${size} FAB`}
            />
          </div>
          <p
            style={{
              marginTop: 8,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {size}
          </p>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available FAB sizes. Large is recommended for primary actions, small for secondary floating actions.',
      },
    },
  },
}

/**
 * Custom icon example.
 */
export const CustomIcon: Story = {
  args: {
    icon: <AddIcon />,
    color: 'success',
    position: 'bottom-right',
    ariaLabel: 'Add new item',
  },
  parameters: {
    docs: {
      description: {
        story:
          'FAB with a custom icon. Use icons that clearly communicate the action.',
      },
    },
  },
}
