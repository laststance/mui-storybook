import AddIcon from '@mui/icons-material/Add'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CallIcon from '@mui/icons-material/Call'
import ChatIcon from '@mui/icons-material/Chat'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import FavoriteIcon from '@mui/icons-material/Favorite'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import ShareIcon from '@mui/icons-material/Share'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import { expect, fn, userEvent, within } from 'storybook/test'

import CircularLayout from './CircularLayout'

import type { CircularAction } from './CircularLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * CircularLayout demonstrates the radial navigation wheel pattern.
 *
 * ## Overview
 * The circular layout pattern arranges actions in a radial pattern around a
 * central point. This creates an intuitive navigation wheel that minimizes
 * hand movement on touch devices and provides quick access to multiple actions.
 *
 * ## Use Cases
 * - **Touch navigation**: Radial menus for tablets and touch screens
 * - **Quick actions**: Contextual action menus
 * - **Game UIs**: Ability wheels, inventory menus
 * - **Smart home controls**: Device control interfaces
 * - **Media players**: Playback controls
 *
 * ## Accessibility
 * - Keyboard navigable
 * - Proper ARIA labels and roles
 * - Visible focus indicators
 * - Screen reader support with tooltips
 *
 * ## Best Practices
 * - Limit to 6-8 actions for optimal usability
 * - Use recognizable icons with tooltips
 * - Provide visual feedback on interaction
 * - Consider Fitts's Law for touch targets
 */
const meta = {
  title: 'Layout Complete/Layouts/Circular',
  component: CircularLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CircularLayout demonstrates the radial navigation wheel pattern for quick action access.

## Key Features
- **Radial arrangement**: Actions positioned in a circle around center
- **Animated transitions**: Smooth expand/collapse animations
- **Customizable angles**: Full circle, half-circle, or custom arc
- **Touch-optimized**: Large touch targets with visual feedback

## Real-World Examples
- Gaming radial menus (weapon wheels, ability wheels)
- Smart home control apps
- Touch-based navigation systems
- Contextual action menus

## Design Considerations
- Actions are equidistant from center for balanced access
- Animation timing creates visual hierarchy
- Color coding helps differentiate action categories
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 200, max: 500, step: 20 },
      description: 'Size of the layout in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '300' },
      },
    },
    radius: {
      control: { type: 'range', min: 60, max: 200, step: 10 },
      description: 'Radius of the action circle from center.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '100' },
      },
    },
    actionSize: {
      control: { type: 'range', min: 32, max: 72, step: 4 },
      description: 'Size of action buttons in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '48' },
      },
    },
    centerSize: {
      control: { type: 'range', min: 48, max: 96, step: 8 },
      description: 'Size of the center button in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '64' },
      },
    },
    centerLabel: {
      control: 'text',
      description: 'Label for the center button.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Menu' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the menu starts open.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    startAngle: {
      control: { type: 'range', min: -180, max: 180, step: 15 },
      description: 'Starting angle for the first action (in degrees).',
      table: {
        category: 'Layout',
        defaultValue: { summary: '-90' },
      },
    },
    totalAngle: {
      control: { type: 'range', min: 90, max: 360, step: 30 },
      description: 'Total angle spread for actions (in degrees).',
      table: {
        category: 'Layout',
        defaultValue: { summary: '360' },
      },
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 600, step: 50 },
      description: 'Animation duration in milliseconds.',
      table: {
        category: 'Animation',
        defaultValue: { summary: '300' },
      },
    },
    showTooltips: {
      control: 'boolean',
      description: 'Whether to show tooltips on hover.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show labels next to icons.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'false' },
      },
    },
    onActionClick: { action: 'action clicked' },
    onCenterClick: { action: 'center clicked' },
    actions: { control: false },
    centerIcon: { control: false },
    backgroundColor: { control: 'color' },
  },
  args: {
    size: 300,
    radius: 100,
    actionSize: 48,
    centerSize: 64,
    centerLabel: 'Menu',
    defaultOpen: true,
    startAngle: -90,
    totalAngle: 360,
    animationDuration: 300,
    showTooltips: true,
    showLabels: false,
  },
} satisfies Meta<typeof CircularLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the CircularLayout component.
 * Use the Controls panel to experiment with all configuration options.
 */
export const Playground: Story = {
  args: {
    size: 300,
    radius: 100,
    actionSize: 48,
    centerSize: 64,
    defaultOpen: true,
    startAngle: -90,
    totalAngle: 360,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground with all controls. Adjust radius, angles, and sizes to customize the layout.',
      },
    },
  },
}

/**
 * Basic circular navigation with default settings.
 */
export const Basic: Story = {
  args: {
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic circular navigation with 6 actions arranged in a full circle.',
      },
    },
  },
}

/**
 * Real-world example: Social media quick actions wheel.
 */
export const RealWorld: Story = {
  args: {
    size: 350,
    radius: 120,
    actionSize: 52,
    centerSize: 72,
    defaultOpen: true,
  },
  render: (args) => {
    const socialActions: CircularAction[] = [
      { id: 'like', label: 'Like', icon: <ThumbUpIcon />, color: '#1877f2' },
      { id: 'love', label: 'Love', icon: <FavoriteIcon />, color: '#e91e63' },
      { id: 'share', label: 'Share', icon: <ShareIcon />, color: '#00bcd4' },
      {
        id: 'comment',
        label: 'Comment',
        icon: <ChatIcon />,
        color: '#4caf50',
      },
      {
        id: 'bookmark',
        label: 'Save',
        icon: <BookmarkIcon />,
        color: '#ff9800',
      },
      { id: 'more', label: 'More', icon: <MoreHorizIcon />, color: '#9e9e9e' },
    ]

    return (
      <CircularLayout
        {...args}
        actions={socialActions}
        centerIcon={<AddIcon />}
        centerLabel="Actions"
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
A real-world social media quick actions wheel featuring:
- **Color-coded actions**: Visual distinction between action types
- **Recognizable icons**: Standard social media interaction icons
- **Radial layout**: Quick thumb access on mobile devices

Similar patterns are used in Facebook, Instagram, and messaging apps for quick reactions.
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies circular menu toggle functionality.
 */
export const InteractionTest: Story = {
  args: {
    defaultOpen: false,
    onActionClick: fn(),
    onCenterClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the center button
    const centerButton = await canvas.findByTestId('center-button')
    await expect(centerButton).toBeInTheDocument()
    await expect(centerButton).toHaveAttribute('aria-expanded', 'false')

    // Click to open the menu
    await userEvent.click(centerButton)
    await expect(args.onCenterClick).toHaveBeenCalled()

    // Wait for animation and verify menu is open
    await expect(centerButton).toHaveAttribute('aria-expanded', 'true')

    // Find an action button
    const homeAction = await canvas.findByTestId('action-home')
    await expect(homeAction).toBeVisible()

    // Click the action
    await userEvent.click(homeAction)
    await expect(args.onActionClick).toHaveBeenCalledWith('home')
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test that verifies menu toggle and action click functionality.',
      },
    },
  },
}

/**
 * Half-circle navigation (bottom arc).
 */
export const HalfCircle: Story = {
  args: {
    startAngle: -180,
    totalAngle: 180,
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Half-circle layout with actions arranged in a 180-degree arc. Useful for bottom-anchored menus.',
      },
    },
  },
}

/**
 * Quarter-circle navigation (corner menu).
 */
export const QuarterCircle: Story = {
  args: {
    startAngle: -135,
    totalAngle: 90,
    defaultOpen: true,
  },
  render: (args) => {
    const quarterActions: CircularAction[] = [
      { id: 'home', label: 'Home', icon: <HomeIcon /> },
      { id: 'search', label: 'Search', icon: <SearchIcon /> },
      { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    ]

    return <CircularLayout {...args} actions={quarterActions} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quarter-circle layout suitable for corner-positioned menus. Limited to 3-4 actions.',
      },
    },
  },
}

/**
 * Compact mobile navigation.
 */
export const CompactMobile: Story = {
  args: {
    size: 220,
    radius: 70,
    actionSize: 40,
    centerSize: 52,
    defaultOpen: true,
  },
  render: (args) => {
    const mobileActions: CircularAction[] = [
      { id: 'home', label: 'Home', icon: <HomeIcon /> },
      { id: 'search', label: 'Search', icon: <SearchIcon /> },
      { id: 'cart', label: 'Cart', icon: <ShoppingCartIcon /> },
      { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    ]

    return <CircularLayout {...args} actions={mobileActions} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact layout optimized for mobile screens with fewer actions and smaller touch targets.',
      },
    },
  },
}

/**
 * Large desktop navigation with labels.
 */
export const LargeWithLabels: Story = {
  args: {
    size: 450,
    radius: 150,
    actionSize: 56,
    centerSize: 80,
    showLabels: true,
    showTooltips: false,
    defaultOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large layout with visible labels for each action. Suitable for desktop interfaces with ample space.',
      },
    },
  },
}

/**
 * Communication quick dial.
 */
export const CommunicationDial: Story = {
  args: {
    size: 320,
    radius: 110,
    defaultOpen: true,
  },
  render: (args) => {
    const commActions: CircularAction[] = [
      { id: 'call', label: 'Call', icon: <CallIcon />, color: '#4caf50' },
      {
        id: 'video',
        label: 'Video',
        icon: <VideoCallIcon />,
        color: '#2196f3',
      },
      { id: 'chat', label: 'Chat', icon: <ChatIcon />, color: '#9c27b0' },
      { id: 'email', label: 'Email', icon: <EmailIcon />, color: '#f44336' },
    ]

    return (
      <CircularLayout
        {...args}
        actions={commActions}
        centerIcon={<PersonIcon />}
        centerLabel="Contact"
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Communication quick dial with color-coded contact methods. Common in contact apps and CRM systems.',
      },
    },
  },
}

/**
 * Media player controls.
 */
export const MediaPlayer: Story = {
  args: {
    size: 280,
    radius: 90,
    actionSize: 44,
    centerSize: 60,
    defaultOpen: true,
  },
  render: (args) => {
    const mediaActions: CircularAction[] = [
      { id: 'favorite', label: 'Favorite', icon: <FavoriteIcon /> },
      { id: 'share', label: 'Share', icon: <ShareIcon /> },
      { id: 'add', label: 'Add to Playlist', icon: <AddIcon /> },
    ]

    return (
      <CircularLayout
        {...args}
        actions={mediaActions}
        centerIcon={<PlayArrowIcon />}
        centerLabel="Play"
        startAngle={-90}
        totalAngle={180}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Media player controls with play button at center and secondary actions in a half-circle above.',
      },
    },
  },
}

/**
 * Content management actions.
 */
export const ContentManagement: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => {
    const contentActions: CircularAction[] = [
      { id: 'edit', label: 'Edit', icon: <EditIcon />, color: '#2196f3' },
      { id: 'share', label: 'Share', icon: <ShareIcon />, color: '#4caf50' },
      {
        id: 'bookmark',
        label: 'Bookmark',
        icon: <BookmarkIcon />,
        color: '#ff9800',
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: <DeleteIcon />,
        color: '#f44336',
      },
    ]

    return (
      <CircularLayout
        {...args}
        actions={contentActions}
        centerIcon={<MoreHorizIcon />}
        centerLabel="Options"
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Content management actions for documents or posts. Color-coded for quick recognition.',
      },
    },
  },
}

/**
 * Notification hub with custom colors.
 */
export const NotificationHub: Story = {
  args: {
    size: 340,
    radius: 115,
    defaultOpen: true,
  },
  render: (args) => {
    const notifActions: CircularAction[] = [
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <NotificationsIcon />,
        color: '#ff5722',
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: <EmailIcon />,
        color: '#3f51b5',
      },
      {
        id: 'friends',
        label: 'Friends',
        icon: <GroupIcon />,
        color: '#009688',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon />,
        color: '#607d8b',
      },
    ]

    return (
      <CircularLayout
        {...args}
        actions={notifActions}
        centerIcon={<PersonIcon />}
        centerLabel="Profile"
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'User profile hub with quick access to notifications, messages, and settings.',
      },
    },
  },
}

/**
 * Slow animation for demonstration.
 */
export const SlowAnimation: Story = {
  args: {
    animationDuration: 600,
    defaultOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slowed down animation (600ms) to demonstrate the staggered reveal effect.',
      },
    },
  },
}

/**
 * Fast animation for snappy feel.
 */
export const FastAnimation: Story = {
  args: {
    animationDuration: 150,
    defaultOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fast animation (150ms) for a snappy, responsive feel. Good for frequent interactions.',
      },
    },
  },
}

/**
 * Closed by default.
 */
export const ClosedByDefault: Story = {
  args: {
    defaultOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu starts closed. Click the center button to reveal actions.',
      },
    },
  },
}
