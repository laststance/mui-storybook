import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import HomeIcon from '@mui/icons-material/Home'
import InboxIcon from '@mui/icons-material/Inbox'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { expect, userEvent, within, screen } from 'storybook/test'

import OffCanvasLayout from './OffCanvasLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * OffCanvasLayout provides a hidden sidebar that slides in from any edge,
 * perfect for mobile navigation and filter panels.
 *
 * ## Use Cases
 * - **Mobile navigation**: Hamburger menu with slide-in nav
 * - **Filter panels**: E-commerce filters from the side
 * - **Settings drawers**: Quick settings access
 * - **Shopping carts**: Cart preview from right side
 *
 * ## Key Features
 * - Slide from any edge (left, right, top, bottom)
 * - Multiple variants (temporary, persistent, permanent)
 * - Built-in app bar with toggle
 * - Custom trigger support
 * - Responsive permanent mode
 *
 * ## Accessibility
 * - Focus management when drawer opens/closes
 * - Keyboard dismissal with Escape key
 * - Screen reader announcements
 * - Proper ARIA attributes
 */
const meta = {
  title: 'Layout Complete/Layouts/OffCanvas',
  component: OffCanvasLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
OffCanvasLayout is a Container/Flow pattern that provides a hidden sidebar that slides in from any edge.

## When to Use
- Mobile navigation with hamburger menu
- Filter/sort panels for e-commerce
- Settings or configuration drawers
- Shopping cart previews
- Any secondary content that should be hidden by default

## Anatomy
\`\`\`
Closed:                           Open:
┌─────────────────────┐          ┌──────┬──────────────┐
│ [=] App Title       │          │      │ [=] Title    │
├─────────────────────┤          │ Nav  ├──────────────┤
│                     │    →     │      │              │
│    Main Content     │          │ Menu │    Content   │
│                     │          │      │              │
└─────────────────────┘          └──────┴──────────────┘
\`\`\`

## Variants
- **temporary**: Overlay that closes on click outside (default)
- **persistent**: Stays open but can be toggled
- **permanent**: Always visible above breakpoint

## Best Practices
1. Use temporary for mobile navigation
2. Place primary navigation on the left
3. Use right side for carts, filters, and secondary actions
4. Keep drawer content focused and scannable
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position where the drawer slides from.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'left' },
      },
    },
    drawerWidth: {
      control: { type: 'range', min: 200, max: 400, step: 20 },
      description: 'Width of the drawer (for left/right positions).',
      table: {
        category: 'Layout',
        defaultValue: { summary: '280' },
      },
    },
    drawerHeight: {
      control: { type: 'range', min: 200, max: 500, step: 20 },
      description: 'Height of the drawer (for top/bottom positions).',
      table: {
        category: 'Layout',
        defaultValue: { summary: '300' },
      },
    },
    variant: {
      control: 'select',
      options: ['temporary', 'persistent', 'permanent'],
      description: 'Drawer behavior variant.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'temporary' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the drawer starts open.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    showAppBar: {
      control: 'boolean',
      description: 'Whether to show the app bar with toggle.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    appBarTitle: {
      control: 'text',
      description: 'Title displayed in the app bar.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'App' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button in drawer.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    permanentBreakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Breakpoint for permanent variant.',
      table: {
        category: 'Responsive',
        defaultValue: { summary: 'lg' },
      },
    },
    pushContent: {
      control: 'boolean',
      description: 'Whether drawer pushes main content.',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    drawerBackground: {
      control: 'color',
      description: 'Background color of the drawer.',
      table: {
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof OffCanvasLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample navigation menu for drawer.
 */
const NavigationMenu: React.FC = () => {
  const menuItems = [
    { icon: <HomeIcon />, label: 'Home', active: true },
    { icon: <DashboardIcon />, label: 'Dashboard' },
    { icon: <InboxIcon />, label: 'Inbox', badge: 4 },
    { icon: <PeopleIcon />, label: 'Team' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            John Doe
          </Typography>
          <Typography variant="caption" color="text.secondary">
            john@example.com
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={item.active}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color="primary"
                  sx={{ height: 20, fontSize: '0.75rem' }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

/**
 * Sample main content.
 */
const MainContent: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Welcome to the Dashboard
    </Typography>
    <Typography variant="body1" color="text.secondary" paragraph>
      This is the main content area. Click the hamburger menu to open the
      navigation drawer.
    </Typography>
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Card {item}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is some sample content for card {item}.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)

/**
 * Interactive playground to explore all OffCanvasLayout configuration options.
 */
export const Playground: Story = {
  args: {
    position: 'left',
    drawerWidth: 280,
    variant: 'temporary',
    defaultOpen: false,
    showAppBar: true,
    appBarTitle: 'My App',
    showCloseButton: true,
    drawerContent: <NavigationMenu />,
    children: <MainContent />,
  },
}

/**
 * Basic usage with navigation drawer.
 */
export const Basic: Story = {
  args: {
    position: 'left',
    appBarTitle: 'Basic Navigation',
    drawerContent: <NavigationMenu />,
    children: <MainContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic off-canvas navigation with hamburger menu. Click the menu icon to open the drawer.',
      },
    },
  },
}

/**
 * Filter panel component.
 */
const FilterPanel: React.FC = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Filters
    </Typography>

    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
      Categories
    </Typography>
    <FormGroup>
      {['Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((cat) => (
        <FormControlLabel
          key={cat}
          control={<Checkbox size="small" />}
          label={cat}
        />
      ))}
    </FormGroup>

    <Divider sx={{ my: 2 }} />

    <Typography variant="subtitle2" gutterBottom>
      Price Range
    </Typography>
    <Slider
      defaultValue={[20, 80]}
      valueLabelDisplay="auto"
      valueLabelFormat={(v) => `$${v}`}
      sx={{ mx: 1, width: 'calc(100% - 16px)' }}
    />

    <Divider sx={{ my: 2 }} />

    <Typography variant="subtitle2" gutterBottom>
      Rating
    </Typography>
    <FormGroup>
      {['4+ Stars', '3+ Stars', '2+ Stars'].map((rating) => (
        <FormControlLabel
          key={rating}
          control={<Checkbox size="small" />}
          label={rating}
        />
      ))}
    </FormGroup>

    <Button variant="contained" fullWidth sx={{ mt: 3 }}>
      Apply Filters
    </Button>
  </Box>
)

/**
 * Product list content.
 */
const ProductList: React.FC = () => (
  <Box sx={{ p: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <Typography variant="h5">Products</Typography>
      <Typography variant="body2" color="text.secondary">
        48 results
      </Typography>
    </Box>
    <Grid container spacing={2}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
          <Card sx={{ height: '100%' }}>
            <Box
              sx={{
                height: 150,
                backgroundColor: `hsl(${i * 45}, 70%, 80%)`,
              }}
            />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom noWrap>
                Product {i + 1}
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={600}>
                ${(19.99 + i * 10).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)

/**
 * Real-world example: E-commerce with filter drawer from the right.
 */
export const RealWorld: Story = {
  args: {
    position: 'right',
    drawerWidth: 300,
    appBarTitle: 'Shop',
    showCloseButton: true,
    customTrigger: (
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        size="small"
        sx={{ color: 'white', borderColor: 'white' }}
      >
        Filters
      </Button>
    ),
    drawerContent: <FilterPanel />,
    children: <ProductList />,
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-grade e-commerce page with filter drawer.

**Features shown:**
- Filter panel slides in from the right
- Custom trigger button replaces hamburger menu
- Category checkboxes and price slider
- Apply filters button
- Product grid layout

This pattern keeps the main product view uncluttered while providing easy filter access.
        `,
      },
    },
  },
}

/**
 * Interaction test verifying drawer opens and closes correctly.
 */
export const InteractionTest: Story = {
  args: {
    position: 'left',
    appBarTitle: 'Test App',
    drawerContent: (
      <Box sx={{ p: 2 }} data-testid="drawer-content">
        <Typography variant="h6">Navigation</Typography>
        <List>
          <ListItem>
            <ListItemButton data-testid="nav-item-1">
              <ListItemText primary="Menu Item 1" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton data-testid="nav-item-2">
              <ListItemText primary="Menu Item 2" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    ),
    children: (
      <Box sx={{ p: 3 }} data-testid="main-content">
        <Typography variant="h5">Main Content</Typography>
        <Typography>Click the menu to open the navigation drawer.</Typography>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify main content is visible
    const mainContent = canvas.getByTestId('main-content')
    await expect(mainContent).toBeInTheDocument()
    await expect(mainContent).toBeVisible()

    // Verify menu toggle button exists
    const menuToggle = canvas.getByTestId('menu-toggle')
    await expect(menuToggle).toBeInTheDocument()
    await expect(menuToggle).toHaveAccessibleName('Open navigation menu')

    // Click to open drawer - drawer content is a portal
    await userEvent.click(menuToggle)

    // Wait for drawer to open and find content using screen (portal)
    const drawerContent = await screen.findByTestId('drawer-content')
    await expect(drawerContent).toBeVisible()

    // Verify navigation items are visible
    const navItem1 = await screen.findByTestId('nav-item-1')
    await expect(navItem1).toBeVisible()

    // Find and click close button
    const closeButton = await screen.findByTestId('drawer-close')
    await expect(closeButton).toBeInTheDocument()

    await userEvent.click(closeButton)

    // Wait for drawer to close
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Verify menu toggle is back to open state
    await expect(menuToggle).toHaveAccessibleName('Open navigation menu')
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automated test verifying drawer open/close functionality, accessibility attributes, and navigation items.',
      },
    },
  },
}

/**
 * Drawer positions demonstration.
 */
export const PositionVariants: Story = {
  args: {
    children: null, // Placeholder - overridden by render
    drawerContent: null, // Placeholder - overridden by render
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Click each button to see different drawer positions
      </Typography>
      <Grid container spacing={2}>
        {(['left', 'right', 'top', 'bottom'] as const).map((position) => (
          <Grid key={position} size={{ xs: 6, md: 3 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Slides from {position}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Use the Controls panel below to change the position and see it in
        action.
      </Typography>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The drawer can slide from any edge. Use left for primary navigation, right for carts/filters, top for search, bottom for mobile actions.',
      },
    },
  },
}

/**
 * Right-side drawer example.
 */
export const RightDrawer: Story = {
  args: {
    position: 'right',
    appBarTitle: 'Right Drawer',
    drawerContent: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        <List>
          {[
            { name: 'Product A', price: '$29.99' },
            { name: 'Product B', price: '$49.99' },
            { name: 'Product C', price: '$19.99' },
          ].map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <Card sx={{ width: '100%' }}>
                <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {item.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontWeight={600}>Total:</Typography>
          <Typography fontWeight={600}>$99.97</Typography>
        </Box>
        <Button variant="contained" fullWidth>
          Checkout
        </Button>
      </Box>
    ),
    children: <MainContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Right-side drawer commonly used for shopping carts, quick settings, or secondary actions.',
      },
    },
  },
}

/**
 * Bottom drawer example (mobile actions).
 */
export const BottomDrawer: Story = {
  args: {
    position: 'bottom',
    drawerHeight: 250,
    appBarTitle: 'Bottom Sheet',
    drawerContent: (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {[
            { icon: <HomeIcon />, label: 'Home' },
            { icon: <DashboardIcon />, label: 'Dashboard' },
            { icon: <InboxIcon />, label: 'Messages' },
            { icon: <SettingsIcon />, label: 'Settings' },
          ].map((action) => (
            <Grid key={action.label} size={{ xs: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="caption">{action.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
    children: <MainContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bottom drawer (bottom sheet) pattern for mobile quick actions and sharing menus.',
      },
    },
  },
}

/**
 * Persistent drawer that pushes content.
 */
export const PersistentDrawer: Story = {
  args: {
    variant: 'persistent',
    defaultOpen: true,
    pushContent: true,
    showCloseButton: false,
    appBarTitle: 'Persistent Drawer',
    drawerContent: <NavigationMenu />,
    children: <MainContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Persistent variant keeps the drawer visible and pushes content. Toggle with the menu button.',
      },
    },
  },
}
