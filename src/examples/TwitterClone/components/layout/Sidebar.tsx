/**
 * Main navigation sidebar component.
 */

import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { useCurrentUser, useLogout } from '../../auth'
import { openModal } from '../../stores/uiStore'

export interface SidebarProps {
  /** Currently active route */
  activeRoute: string
  /** Handler for navigation */
  onNavigate: (path: string) => void
}

/**
 * Navigation item data.
 */
interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
}

/**
 * Main sidebar with navigation links and user profile.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  activeRoute,
  onNavigate,
}) => {
  const user = useCurrentUser()
  const { mutate: logout } = useLogout()

  const navItems: NavItem[] = [
    {
      path: '/home',
      label: 'Home',
      icon: <HomeOutlinedIcon />,
      activeIcon: <HomeIcon />,
    },
    {
      path: '/notifications',
      label: 'Notifications',
      icon: <NotificationsNoneIcon />,
      activeIcon: <NotificationsIcon />,
    },
    {
      path: '/bookmarks',
      label: 'Bookmarks',
      icon: <BookmarkBorderIcon />,
      activeIcon: <BookmarkIcon />,
    },
    {
      path: `/profile/${user?.username || ''}`,
      label: 'Profile',
      icon: <PersonOutlineIcon />,
      activeIcon: <PersonIcon />,
    },
  ]

  const handleCompose = () => {
    openModal('compose')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 275,
        borderRight: 1,
        borderColor: 'divider',
        p: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: '1.75rem',
          }}
        >
          𝕏
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const isActive = activeRoute.startsWith(item.path)
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => onNavigate(item.path)}
                sx={{
                  borderRadius: 9999,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {isActive ? item.activeIcon : item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'normal',
                    fontSize: '1.1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Post Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleCompose}
        sx={{
          borderRadius: 9999,
          py: 1.5,
          mb: 2,
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        Post
      </Button>

      <Divider sx={{ my: 1 }} />

      {/* User Profile */}
      {user && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1,
            borderRadius: 9999,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.displayName}
            sx={{ width: 40, height: 40 }}
          >
            {user.displayName[0]}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight="bold" noWrap>
              {user.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              @{user.username}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => logout()}
            title="Logout"
            sx={{ ml: 'auto' }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
