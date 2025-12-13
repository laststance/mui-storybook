import DescriptionIcon from '@mui/icons-material/Description'
import RateReviewIcon from '@mui/icons-material/RateReview'
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { expect, userEvent, within } from 'storybook/test'

import TabbedLayout from './TabbedLayout'

import type { TabConfig } from './TabbedLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * TabbedLayout provides switchable panels for organized content display.
 *
 * This layout pattern is ideal for organizing related content into distinct sections
 * that users can navigate between without leaving the page. Common use cases include:
 *
 * - **Product pages**: Overview, Specifications, Reviews tabs
 * - **Settings pages**: General, Security, Notifications sections
 * - **Documentation**: Getting Started, API Reference, Examples
 * - **Dashboards**: Different data views or time ranges
 *
 * ## Accessibility
 * - Uses proper ARIA roles (tablist, tab, tabpanel)
 * - Supports keyboard navigation (arrow keys, Home, End)
 * - Maintains focus management between tabs
 * - Screen reader announces tab state (selected/not selected)
 *
 * ## Best Practices
 * - Keep tab labels concise (1-2 words)
 * - Limit to 5-7 tabs maximum
 * - Use icons sparingly and consistently
 * - Consider vertical tabs for many sections
 *
 * @example
 * ```tsx
 * import { TabbedLayout } from './TabbedLayout'
 *
 * const tabs = [
 *   { id: 'overview', label: 'Overview', content: <Overview /> },
 *   { id: 'specs', label: 'Specifications', content: <Specs /> },
 * ]
 *
 * <TabbedLayout tabs={tabs} />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/Tabbed',
  component: TabbedLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
TabbedLayout provides switchable panels for organized content display.

## Features
- **Horizontal/Vertical orientation**: Choose layout direction based on content
- **Multiple variants**: Standard, scrollable, or full-width tabs
- **Icon support**: Add icons to tabs with or without labels
- **Customizable colors**: Primary, secondary, or inherit text colors
- **Keyboard accessible**: Full keyboard navigation support
- **Controlled/Uncontrolled**: Works with or without external state management

## Use Cases
1. **Product Details**: Overview, Specifications, Reviews, Q&A tabs
2. **Settings Pages**: Organized preference categories
3. **Documentation**: Multi-topic guides with easy navigation
4. **Data Dashboards**: Different views of the same dataset

## Accessibility Notes
- Implements WAI-ARIA Tabs Pattern
- Arrow keys navigate between tabs
- Tab key moves focus to active panel
- Screen readers announce tab selection state
        `,
      },
    },
  },
  argTypes: {
    tabs: {
      description: 'Array of tab configurations with id, label, and content',
      table: {
        category: 'Content',
        type: { summary: 'TabConfig[]' },
      },
    },
    defaultTab: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Initially selected tab index',
      table: {
        category: 'State',
        defaultValue: { summary: '0' },
      },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation direction',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'horizontal' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'Center tabs horizontally (horizontal orientation only)',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth'],
      description: 'Tab variant for handling overflow',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'standard' },
      },
    },
    textColor: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary'],
      description: 'Color of the tab text',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    indicatorColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color of the active tab indicator',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    showDivider: {
      control: 'boolean',
      description: 'Show divider between tabs and content',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    minHeight: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Minimum height for vertical layout',
      table: {
        category: 'Layout',
        defaultValue: { summary: '300' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the tablist',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'Content tabs' },
      },
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Callback when tab changes',
      table: {
        category: 'Events',
      },
    },
  },
} satisfies Meta<typeof TabbedLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample tabs for stories
const basicTabs: TabConfig[] = [
  {
    id: 'tab1',
    label: 'Tab One',
    content: (
      <Typography>
        Content for Tab One. This is where your main content goes.
      </Typography>
    ),
  },
  {
    id: 'tab2',
    label: 'Tab Two',
    content: (
      <Typography>
        Content for Tab Two. Different content for the second tab.
      </Typography>
    ),
  },
  {
    id: 'tab3',
    label: 'Tab Three',
    content: (
      <Typography>
        Content for Tab Three. And more content for the third tab.
      </Typography>
    ),
  },
]

/**
 * Interactive playground for the TabbedLayout component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: 0,
    orientation: 'horizontal',
    centered: false,
    variant: 'standard',
    textColor: 'primary',
    indicatorColor: 'primary',
    showDivider: true,
    minHeight: 300,
    ariaLabel: 'Playground tabs',
  },
}

/**
 * Basic usage of TabbedLayout with minimal configuration.
 * Shows three simple tabs with text content.
 */
export const Basic: Story = {
  args: {
    tabs: basicTabs,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic TabbedLayout with three tabs. Click tabs to switch between content panels.',
      },
    },
  },
}

/**
 * Product page with Overview, Specifications, and Reviews tabs.
 * Demonstrates a real-world e-commerce use case.
 */
export const RealWorld: Story = {
  args: {
    tabs: [],
  },
  render: () => {
    const productTabs: TabConfig[] = [
      {
        id: 'overview',
        label: 'Overview',
        icon: <DescriptionIcon />,
        content: (
          <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Premium Wireless Headphones
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Experience studio-quality sound with our flagship wireless
              headphones. Featuring active noise cancellation, 30-hour battery
              life, and premium comfort for all-day listening.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label="Wireless" size="small" />
              <Chip label="Noise Cancelling" size="small" />
              <Chip label="Hi-Fi Audio" size="small" />
            </Box>
            <Typography variant="h4" color="primary" fontWeight={700}>
              $299.99
            </Typography>
          </Box>
        ),
      },
      {
        id: 'specs',
        label: 'Specifications',
        icon: <SettingsIcon />,
        content: (
          <List dense>
            {[
              ['Driver Size', '40mm custom drivers'],
              ['Frequency Response', '20Hz - 20kHz'],
              ['Battery Life', '30 hours (ANC on)'],
              ['Charging', 'USB-C, 10min = 3hrs playback'],
              ['Bluetooth', '5.3 with multipoint'],
              ['Weight', '250g'],
              ['Colors', 'Midnight Black, Arctic White'],
            ].map(([label, value]) => (
              <ListItem key={label} divider>
                <ListItemText
                  primary={label}
                  secondary={value}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        ),
      },
      {
        id: 'reviews',
        label: 'Reviews',
        icon: <RateReviewIcon />,
        content: (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h3" fontWeight={700}>
                4.8
              </Typography>
              <Box>
                <Rating value={4.8} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  Based on 1,247 reviews
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {[
              {
                author: 'AudioEnthusiast',
                rating: 5,
                comment: 'Best headphones I have ever owned!',
              },
              {
                author: 'TechReviewer',
                rating: 4,
                comment: 'Great sound, ANC could be better.',
              },
              {
                author: 'MusicLover',
                rating: 5,
                comment: 'Perfect for long listening sessions.',
              },
            ].map((review, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography fontWeight={600}>{review.author}</Typography>
                  <Rating value={review.rating} size="small" readOnly />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </Paper>
            ))}
          </Box>
        ),
      },
      {
        id: 'buy',
        label: 'Buy Now',
        icon: <ShoppingCartIcon />,
        content: (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Ready to upgrade your audio experience?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Free shipping on orders over $50
            </Typography>
            <Chip
              label="Add to Cart - $299.99"
              color="primary"
              sx={{ fontSize: '1rem', py: 2.5, px: 2 }}
            />
          </Box>
        ),
      },
    ]

    return (
      <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <TabbedLayout
          tabs={productTabs}
          ariaLabel="Product information tabs"
          variant="fullWidth"
        />
      </Paper>
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Real-world product page example with:
- Overview tab with product description and pricing
- Specifications tab with detailed product specs
- Reviews tab with ratings and customer feedback
- Buy Now tab with purchase call-to-action

Each tab includes an icon for visual identification.
        `,
      },
    },
  },
}

/**
 * Vertical tabs layout for settings pages or documentation.
 * Useful when you have many tabs or longer labels.
 */
export const VerticalTabs: Story = {
  args: {
    orientation: 'vertical',
    minHeight: 350,
    tabs: [
      {
        id: 'general',
        label: 'General Settings',
        content: (
          <Typography>
            General settings content with account preferences.
          </Typography>
        ),
      },
      {
        id: 'security',
        label: 'Security',
        content: (
          <Typography>
            Security settings for password and 2FA configuration.
          </Typography>
        ),
      },
      {
        id: 'notifications',
        label: 'Notifications',
        content: (
          <Typography>
            Notification preferences for email and push alerts.
          </Typography>
        ),
      },
      {
        id: 'privacy',
        label: 'Privacy',
        content: (
          <Typography>
            Privacy controls for data sharing and visibility.
          </Typography>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vertical tab orientation is ideal for settings pages with many categories or longer labels.',
      },
    },
  },
}

/**
 * Scrollable tabs for handling many tab items.
 * Shows scroll buttons when tabs overflow the container.
 */
export const ScrollableTabs: Story = {
  args: {
    variant: 'scrollable',
    tabs: Array.from({ length: 8 }, (_, i) => ({
      id: `section-${i + 1}`,
      label: `Section ${i + 1}`,
      content: <Typography>Content for Section {i + 1}</Typography>,
    })),
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 500 }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Scrollable variant shows navigation arrows when tabs exceed container width.',
      },
    },
  },
}

/**
 * Centered tabs for a balanced visual appearance.
 */
export const CenteredTabs: Story = {
  args: {
    centered: true,
    tabs: basicTabs,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Centered tabs work well for smaller tab sets with a balanced layout.',
      },
    },
  },
}

/**
 * Secondary color theme for tabs.
 */
export const SecondaryColor: Story = {
  args: {
    textColor: 'secondary',
    indicatorColor: 'secondary',
    tabs: basicTabs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Using secondary color for tabs and indicator.',
      },
    },
  },
}

/**
 * Tabs with disabled items.
 */
export const WithDisabledTab: Story = {
  args: {
    tabs: [
      {
        id: 'active1',
        label: 'Active Tab',
        content: <Typography>Active content</Typography>,
      },
      {
        id: 'disabled',
        label: 'Disabled',
        disabled: true,
        content: <Typography>Disabled content</Typography>,
      },
      {
        id: 'active2',
        label: 'Another Active',
        content: <Typography>More content</Typography>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tabs can be individually disabled while keeping others interactive.',
      },
    },
  },
}

/**
 * Interaction test: Verifies tab switching functionality.
 */
export const InteractionTest: Story = {
  args: {
    tabs: [
      {
        id: 'first',
        label: 'First Tab',
        content: <Typography>First tab content here</Typography>,
      },
      {
        id: 'second',
        label: 'Second Tab',
        content: <Typography>Second tab content here</Typography>,
      },
      {
        id: 'third',
        label: 'Third Tab',
        content: <Typography>Third tab content here</Typography>,
      },
    ],
    ariaLabel: 'Test tabs',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify initial state - first tab should be selected
    const firstTab = canvas.getByRole('tab', { name: /first tab/i })
    const secondTab = canvas.getByRole('tab', { name: /second tab/i })
    const thirdTab = canvas.getByRole('tab', { name: /third tab/i })

    await expect(firstTab).toBeInTheDocument()
    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expect(secondTab).toHaveAttribute('aria-selected', 'false')

    // Verify first tab content is visible
    const firstContent = canvas.getByText(/first tab content here/i)
    await expect(firstContent).toBeVisible()

    // Click second tab
    await userEvent.click(secondTab)

    // Verify second tab is now selected
    await expect(secondTab).toHaveAttribute('aria-selected', 'true')
    await expect(firstTab).toHaveAttribute('aria-selected', 'false')

    // Verify second tab content is visible
    const secondContent = canvas.getByText(/second tab content here/i)
    await expect(secondContent).toBeVisible()

    // Click third tab
    await userEvent.click(thirdTab)

    // Verify third tab is now selected
    await expect(thirdTab).toHaveAttribute('aria-selected', 'true')
    const thirdContent = canvas.getByText(/third tab content here/i)
    await expect(thirdContent).toBeVisible()
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test verifying tab switching, selection state, and content visibility.',
      },
    },
  },
}
