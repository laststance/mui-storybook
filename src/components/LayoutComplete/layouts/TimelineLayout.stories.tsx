import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import HomeIcon from '@mui/icons-material/Home'
import InventoryIcon from '@mui/icons-material/Inventory'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaymentIcon from '@mui/icons-material/Payment'
import ReceiptIcon from '@mui/icons-material/Receipt'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import TimelineLayout from './TimelineLayout'

import type { TimelineEvent } from './TimelineLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * TimelineLayout displays a chronological sequence of events.
 *
 * This layout pattern is ideal for displaying sequential information
 * where time and order matter:
 *
 * - **Order tracking**: Shipping status from purchase to delivery
 * - **Activity feeds**: User actions and system events
 * - **Project roadmaps**: Milestones and development phases
 * - **Audit logs**: Security events and change history
 * - **Onboarding flows**: Step-by-step progress indicators
 *
 * ## Features
 * - Multiple position options (left, right, alternate)
 * - Status-based styling (completed, current, pending, error)
 * - Custom icons and colors
 * - Optional card styling
 * - Flexible content slots
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Clear visual hierarchy
 * - Color-coded status indicators
 * - Screen reader friendly labels
 *
 * @example
 * ```tsx
 * import { TimelineLayout } from './TimelineLayout'
 *
 * const events = [
 *   { id: '1', title: 'Order Placed', timestamp: '10:30 AM', status: 'completed' },
 *   { id: '2', title: 'Shipped', timestamp: '2:00 PM', status: 'current' },
 * ]
 *
 * <TimelineLayout events={events} position="right" />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/Timeline',
  component: TimelineLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
TimelineLayout displays a chronological sequence of events with visual indicators.

## Features
- **Position options**: Left, right, or alternating layout
- **Status indicators**: Completed, current, pending, or error states
- **Custom icons**: Add icons to timeline dots for visual context
- **Flexible content**: Rich content support including descriptions and custom elements
- **Connector styling**: Visual connection between events

## Event Configuration
Each event can include:
- \`id\`: Unique identifier
- \`title\`: Event heading
- \`description\`: Optional details
- \`timestamp\`: Time/date display
- \`icon\`: Custom icon for the dot
- \`status\`: Styling preset (completed, current, pending, error)
- \`content\`: Additional React content

## Use Cases
1. **Order Tracking**: Package status from purchase to delivery
2. **Activity Feeds**: User actions and notifications
3. **Project Roadmaps**: Development milestones
4. **Audit Logs**: System events and changes
5. **Onboarding**: Step-by-step progress
        `,
      },
    },
  },
  argTypes: {
    events: {
      description: 'Array of timeline events in chronological order',
      table: {
        category: 'Content',
        type: { summary: 'TimelineEvent[]' },
      },
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'alternate', 'alternate-reverse'],
      description: 'Position of content relative to the timeline',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'right' },
      },
    },
    showOppositeContent: {
      control: 'boolean',
      description: 'Show timestamps on the opposite side of content',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: { type: 'number', min: 400, max: 1200 },
      description: 'Maximum width of the timeline container',
      table: {
        category: 'Layout',
        defaultValue: { summary: '800' },
      },
    },
    showConnectors: {
      control: 'boolean',
      description: 'Show connector lines between events',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    cardStyle: {
      control: 'boolean',
      description: 'Wrap content in card/paper style',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Elevation of content cards',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '0' },
      },
    },
    contentGap: {
      control: { type: 'number', min: 1, max: 4 },
      description: 'Vertical spacing multiplier',
      table: {
        category: 'Layout',
        defaultValue: { summary: '2' },
      },
    },
  },
} satisfies Meta<typeof TimelineLayout>

export default meta
type Story = StoryObj<typeof meta>

// Basic events for simple stories
const basicEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'First Event',
    description: 'This is the first event in the timeline.',
    timestamp: 'Jan 1, 2025',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Second Event',
    description: 'This is the current event.',
    timestamp: 'Jan 15, 2025',
    status: 'current',
  },
  {
    id: '3',
    title: 'Third Event',
    description: 'This event is still pending.',
    timestamp: 'Feb 1, 2025',
    status: 'pending',
  },
]

/**
 * Interactive playground for the TimelineLayout component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    events: basicEvents,
    position: 'right',
    showOppositeContent: false,
    maxWidth: 600,
    showConnectors: true,
    cardStyle: true,
    elevation: 0,
    contentGap: 2,
  },
}

/**
 * Basic timeline with completed, current, and pending events.
 */
export const Basic: Story = {
  args: {
    events: basicEvents,
    position: 'right',
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic timeline showing event progression with status indicators.',
      },
    },
  },
}

/**
 * Order tracking timeline with shipping status updates.
 * Demonstrates a real-world e-commerce use case.
 */
export const RealWorld: Story = {
  args: {
    events: [],
  },
  render: () => {
    const orderEvents: TimelineEvent[] = [
      {
        id: 'order',
        title: 'Order Placed',
        description: 'Your order #12345 has been confirmed.',
        timestamp: 'Dec 10, 2025',
        secondaryTime: '10:30 AM',
        icon: <ReceiptIcon fontSize="small" />,
        status: 'completed',
        content: (
          <Chip
            label="Confirmation email sent"
            size="small"
            color="success"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        ),
      },
      {
        id: 'payment',
        title: 'Payment Processed',
        description: 'Payment of $299.99 was successful.',
        timestamp: 'Dec 10, 2025',
        secondaryTime: '10:32 AM',
        icon: <PaymentIcon fontSize="small" />,
        status: 'completed',
      },
      {
        id: 'processing',
        title: 'Order Processing',
        description: 'Your items are being prepared for shipment.',
        timestamp: 'Dec 10, 2025',
        secondaryTime: '2:15 PM',
        icon: <InventoryIcon fontSize="small" />,
        status: 'completed',
      },
      {
        id: 'shipped',
        title: 'Shipped',
        description: 'Package has left our warehouse.',
        timestamp: 'Dec 11, 2025',
        secondaryTime: '9:00 AM',
        icon: <LocalShippingIcon fontSize="small" />,
        status: 'current',
        content: (
          <>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mt: 1 }}
            >
              Tracking: 1Z999AA10123456784
            </Typography>
            <Link href="#" variant="caption">
              Track Package
            </Link>
          </>
        ),
      },
      {
        id: 'delivery',
        title: 'Out for Delivery',
        description: 'Package is on the delivery vehicle.',
        timestamp: 'Dec 12, 2025',
        secondaryTime: 'Expected by 6 PM',
        icon: <LocalShippingIcon fontSize="small" />,
        status: 'pending',
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Package will be delivered to your address.',
        timestamp: 'Dec 12, 2025',
        icon: <HomeIcon fontSize="small" />,
        status: 'pending',
      },
    ]

    return (
      <TimelineLayout
        events={orderEvents}
        position="right"
        maxWidth={600}
        showOppositeContent={false}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Real-world order tracking timeline with:
- Order confirmation with email notification
- Payment processing status
- Warehouse processing
- Shipping with tracking link
- Delivery status updates

Each event includes an icon, timestamp, and status indicator.
        `,
      },
    },
  },
}

/**
 * Alternating timeline for visual balance.
 */
export const Alternating: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Project Kickoff',
        description: 'Initial planning and team assembly.',
        timestamp: 'Q1 2025',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Design Phase',
        description: 'UI/UX design and prototyping.',
        timestamp: 'Q2 2025',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Development',
        description: 'Core feature implementation.',
        timestamp: 'Q3 2025',
        status: 'current',
      },
      {
        id: '4',
        title: 'Testing & QA',
        description: 'Quality assurance and bug fixes.',
        timestamp: 'Q4 2025',
        status: 'pending',
      },
      {
        id: '5',
        title: 'Launch',
        description: 'Public release and marketing.',
        timestamp: 'Q1 2026',
        status: 'pending',
      },
    ],
    position: 'alternate',
    showOppositeContent: true,
    maxWidth: 700,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alternating position with timestamps on opposite side creates a balanced layout.',
      },
    },
  },
}

/**
 * Timeline with custom status colors.
 */
export const WithStatusColors: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Build Started',
        timestamp: '10:00 AM',
        color: 'info',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Tests Passed',
        timestamp: '10:15 AM',
        icon: <CheckCircleIcon fontSize="small" />,
        color: 'success',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Deploy Failed',
        timestamp: '10:20 AM',
        description: 'Connection timeout to production server.',
        icon: <ErrorIcon fontSize="small" />,
        color: 'error',
        status: 'error',
      },
      {
        id: '4',
        title: 'Retry Pending',
        timestamp: '10:25 AM',
        color: 'warning',
        status: 'pending',
      },
    ],
    position: 'right',
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Timeline events can have different status colors to indicate success, error, or warning states.',
      },
    },
  },
}

/**
 * Timeline without card styling.
 */
export const MinimalStyle: Story = {
  args: {
    events: basicEvents,
    position: 'right',
    cardStyle: false,
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal styling without cards for a cleaner look.',
      },
    },
  },
}

/**
 * Timeline with elevated cards.
 */
export const ElevatedCards: Story = {
  args: {
    events: basicEvents,
    position: 'right',
    elevation: 2,
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Elevated cards with shadow for more visual depth.',
      },
    },
  },
}

/**
 * Left-aligned timeline.
 */
export const LeftPosition: Story = {
  args: {
    events: basicEvents,
    position: 'left',
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Left-positioned timeline with content on the left side of the line.',
      },
    },
  },
}

/**
 * Timeline with rich content in events.
 */
export const RichContent: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Download Started',
        timestamp: '2:00 PM',
        status: 'completed',
        content: (
          <LinearProgress
            variant="determinate"
            value={100}
            color="success"
            sx={{ mt: 1, borderRadius: 1 }}
          />
        ),
      },
      {
        id: '2',
        title: 'Installing Dependencies',
        timestamp: '2:05 PM',
        status: 'current',
        content: (
          <>
            <LinearProgress
              variant="determinate"
              value={65}
              sx={{ mt: 1, borderRadius: 1 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: 'block' }}
            >
              65% complete - Installing react-dom...
            </Typography>
          </>
        ),
      },
      {
        id: '3',
        title: 'Build Project',
        timestamp: 'Waiting',
        status: 'pending',
      },
    ],
    position: 'right',
    maxWidth: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Timeline events can include rich content like progress bars and interactive elements.',
      },
    },
  },
}

/**
 * Interaction test: Verifies timeline structure and content.
 */
export const InteractionTest: Story = {
  args: {
    events: [
      {
        id: 'test-1',
        title: 'First Test Event',
        description: 'Description for first event',
        timestamp: 'Jan 1, 2025',
        status: 'completed',
      },
      {
        id: 'test-2',
        title: 'Second Test Event',
        description: 'Description for second event',
        timestamp: 'Jan 15, 2025',
        status: 'current',
      },
      {
        id: 'test-3',
        title: 'Third Test Event',
        timestamp: 'Feb 1, 2025',
        status: 'pending',
      },
    ],
    position: 'right',
    maxWidth: 500,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all event titles are present
    const firstTitle = canvas.getByText('First Test Event')
    const secondTitle = canvas.getByText('Second Test Event')
    const thirdTitle = canvas.getByText('Third Test Event')

    await expect(firstTitle).toBeInTheDocument()
    await expect(secondTitle).toBeInTheDocument()
    await expect(thirdTitle).toBeInTheDocument()

    // Verify descriptions are present
    const firstDesc = canvas.getByText('Description for first event')
    const secondDesc = canvas.getByText('Description for second event')

    await expect(firstDesc).toBeVisible()
    await expect(secondDesc).toBeVisible()

    // Verify timestamps are shown
    const jan1 = canvas.getByText('Jan 1, 2025')
    const jan15 = canvas.getByText('Jan 15, 2025')
    const feb1 = canvas.getByText('Feb 1, 2025')

    await expect(jan1).toBeInTheDocument()
    await expect(jan15).toBeInTheDocument()
    await expect(feb1).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test verifying timeline structure, titles, descriptions, and timestamps.',
      },
    },
  },
}
