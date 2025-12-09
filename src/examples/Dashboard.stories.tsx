import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BarChartIcon from '@mui/icons-material/BarChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Examples/Dashboard',
  parameters: {
    layout: 'fullscreen',
    // Disable a11y testing for complex example demos
    a11y: { disable: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const drawerWidth = 240

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  color: string
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {change >= 0 ? (
          <TrendingUpIcon color="success" fontSize="small" />
        ) : (
          <TrendingDownIcon color="error" fontSize="small" />
        )}
        <Typography
          variant="body2"
          color={change >= 0 ? 'success.main' : 'error.main'}
        >
          {change >= 0 ? '+' : ''}
          {change}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          vs last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
)

const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    product: 'MacBook Pro',
    amount: '$2,499',
    status: 'Completed',
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    product: 'iPhone 15',
    amount: '$999',
    status: 'Pending',
  },
  {
    id: '#ORD-003',
    customer: 'Bob Johnson',
    product: 'AirPods Pro',
    amount: '$249',
    status: 'Completed',
  },
  {
    id: '#ORD-004',
    customer: 'Alice Brown',
    product: 'iPad Air',
    amount: '$599',
    status: 'Processing',
  },
  {
    id: '#ORD-005',
    customer: 'Charlie Wilson',
    product: 'Apple Watch',
    amount: '$399',
    status: 'Completed',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Processing':
      return 'info'
    default:
      return 'default'
  }
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Customers', icon: <PeopleIcon /> },
  { text: 'Analytics', icon: <BarChartIcon /> },
  { text: 'Orders', icon: <ShoppingCartIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
]

/**
 * A comprehensive admin dashboard showcasing multiple MUI components
 * working together in a real-world layout.
 */
export const AdminDashboard: Story = {
  render: () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState('Dashboard')

    const drawer = (
      <Box>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            MUI Admin
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selectedItem === item.text}
                onClick={() => setSelectedItem(item.text)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    )

    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Total Revenue"
                value="$54,239"
                change={12.5}
                icon={<AttachMoneyIcon />}
                color="primary.main"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Total Orders"
                value="1,543"
                change={8.2}
                icon={<ShoppingCartIcon />}
                color="success.main"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="New Customers"
                value="328"
                change={-2.4}
                icon={<PeopleIcon />}
                color="warning.main"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard
                title="Conversion Rate"
                value="3.24%"
                change={5.1}
                icon={<BarChartIcon />}
                color="info.main"
              />
            </Grid>
          </Grid>

          {/* Charts and Tables */}
          <Grid container spacing={3}>
            {/* Progress Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sales Target
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">Monthly Goal</Typography>
                      <Typography variant="body2" color="primary">
                        75%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">Quarterly Goal</Typography>
                      <Typography variant="body2" color="success.main">
                        62%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={62}
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">Yearly Goal</Typography>
                      <Typography variant="body2" color="warning.main">
                        48%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={48}
                      color="warning"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Orders */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Orders
                  </Typography>
                  <TableContainer component={Paper} elevation={0}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell>Product</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>
                              <Chip
                                label={order.status}
                                size="small"
                                color={getStatusColor(order.status) as any}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  },
}

/**
 * Compact dashboard variant for smaller screens
 */
export const CompactDashboard: Story = {
  render: () => (
    <Box sx={{ p: 2, bgcolor: 'grey.100', minHeight: '100vh' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Quick Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
                <AttachMoneyIcon />
              </Avatar>
              <Typography variant="h6">$12.5k</Typography>
              <Typography variant="caption" color="text.secondary">
                Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
                <ShoppingCartIcon />
              </Avatar>
              <Typography variant="h6">342</Typography>
              <Typography variant="caption" color="text.secondary">
                Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 1 }}>
                <PeopleIcon />
              </Avatar>
              <Typography variant="h6">89</Typography>
              <Typography variant="caption" color="text.secondary">
                Customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 1 }}>
                <BarChartIcon />
              </Avatar>
              <Typography variant="h6">2.4%</Typography>
              <Typography variant="caption" color="text.secondary">
                Conversion
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  ),
}
