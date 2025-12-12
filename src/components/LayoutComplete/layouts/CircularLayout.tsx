import BookmarkIcon from '@mui/icons-material/Bookmark'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback, useMemo } from 'react'

/**
 * Action item for the circular navigation.
 */
export interface CircularAction {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Icon component */
  icon: React.ReactNode
  /** Background color */
  color?: string
  /** Whether the action is disabled */
  disabled?: boolean
}

/**
 * Props for the CircularLayout component.
 */
export interface CircularLayoutProps {
  /**
   * Actions to display in the radial arrangement.
   */
  actions?: CircularAction[]
  /**
   * Size of the layout in pixels.
   * @default 300
   */
  size?: number
  /**
   * Radius of the action circle from center.
   * @default 100
   */
  radius?: number
  /**
   * Size of action buttons in pixels.
   * @default 48
   */
  actionSize?: number
  /**
   * Size of the center button in pixels.
   * @default 64
   */
  centerSize?: number
  /**
   * Icon for the center button.
   */
  centerIcon?: React.ReactNode
  /**
   * Label for the center button.
   * @default 'Menu'
   */
  centerLabel?: string
  /**
   * Whether the menu starts open.
   * @default true
   */
  defaultOpen?: boolean
  /**
   * Starting angle for the first action (in degrees).
   * @default -90 (top)
   */
  startAngle?: number
  /**
   * Total angle spread for actions (in degrees).
   * @default 360 (full circle)
   */
  totalAngle?: number
  /**
   * Animation duration in milliseconds.
   * @default 300
   */
  animationDuration?: number
  /**
   * Whether to show tooltips on hover.
   * @default true
   */
  showTooltips?: boolean
  /**
   * Whether to show labels next to icons.
   * @default false
   */
  showLabels?: boolean
  /**
   * Callback when an action is clicked.
   */
  onActionClick?: (actionId: string) => void
  /**
   * Callback when center button is clicked.
   */
  onCenterClick?: () => void
  /**
   * Background color of the container.
   */
  backgroundColor?: string
}

/**
 * Default actions for demonstration.
 */
const DEFAULT_ACTIONS: CircularAction[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'favorites', label: 'Favorites', icon: <FavoriteIcon /> },
  { id: 'bookmarks', label: 'Bookmarks', icon: <BookmarkIcon /> },
  { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
]

/**
 * Converts degrees to radians.
 * @param degrees - Angle in degrees.
 * @returns Angle in radians.
 */
const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}

/**
 * Calculates position for an item in the circular layout.
 * @param index - Item index.
 * @param total - Total number of items.
 * @param radius - Circle radius.
 * @param startAngle - Starting angle in degrees.
 * @param totalAngle - Total angle spread in degrees.
 * @returns X and Y coordinates.
 */
const calculatePosition = (
  index: number,
  total: number,
  radius: number,
  startAngle: number,
  totalAngle: number,
): { x: number; y: number } => {
  const angleStep = total > 1 ? totalAngle / total : 0
  const angle = degreesToRadians(startAngle + angleStep * index)

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

/**
 * CircularLayout demonstrates the radial navigation wheel pattern.
 *
 * This layout pattern arranges actions in a circle around a central point,
 * commonly used for quick action menus, navigation wheels, and radial UIs.
 * It provides an intuitive way to access multiple actions with minimal
 * hand movement on touch devices.
 *
 * @param props - The component props.
 * @returns A React component demonstrating the circular layout pattern.
 *
 * @example
 * // Basic circular navigation
 * <CircularLayout
 *   actions={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { id: 'search', label: 'Search', icon: <SearchIcon /> },
 *   ]}
 *   onActionClick={(id) => console.log('Clicked:', id)}
 * />
 *
 * @example
 * // Half-circle menu
 * <CircularLayout
 *   startAngle={-180}
 *   totalAngle={180}
 *   radius={80}
 * />
 */
const CircularLayout: React.FC<CircularLayoutProps> = ({
  actions = DEFAULT_ACTIONS,
  size = 300,
  radius = 100,
  actionSize = 48,
  centerSize = 64,
  centerIcon = <SettingsIcon />,
  centerLabel = 'Menu',
  defaultOpen = true,
  startAngle = -90,
  totalAngle = 360,
  animationDuration = 300,
  showTooltips = true,
  showLabels = false,
  onActionClick,
  onCenterClick,
  backgroundColor,
}) => {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)

  const handleCenterClick = useCallback(() => {
    setIsOpen((prev) => !prev)
    onCenterClick?.()
  }, [onCenterClick])

  const handleActionClick = useCallback(
    (actionId: string) => {
      onActionClick?.(actionId)
    },
    [onActionClick],
  )

  const actionPositions = useMemo(() => {
    return actions.map((action, index) => ({
      ...action,
      position: calculatePosition(
        index,
        actions.length,
        radius,
        startAngle,
        totalAngle,
      ),
    }))
  }, [actions, radius, startAngle, totalAngle])

  return (
    <Box data-testid="circular-layout-container">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Navigation Wheel
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: 600 }}
        >
          Click the center button to toggle the radial menu. Actions are
          arranged in a circle for quick access with minimal hand movement.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: size + 100,
          backgroundColor: backgroundColor || theme.palette.background.paper,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          p: 4,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data-testid="circular-menu"
        >
          {/* Background circle */}
          <Box
            sx={{
              position: 'absolute',
              width: radius * 2 + actionSize,
              height: radius * 2 + actionSize,
              borderRadius: '50%',
              backgroundColor: theme.palette.action.hover,
              opacity: isOpen ? 0.3 : 0,
              transition: `opacity ${animationDuration}ms ease-out`,
            }}
          />

          {/* Action buttons */}
          {actionPositions.map((action, index) => {
            const isHovered = hoveredAction === action.id

            const button = (
              <IconButton
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                disabled={action.disabled}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                data-testid={`action-${action.id}`}
                aria-label={action.label}
                sx={{
                  position: 'absolute',
                  width: actionSize,
                  height: actionSize,
                  backgroundColor: action.color || theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  transform: isOpen
                    ? `translate(${action.position.x}px, ${action.position.y}px) scale(1)`
                    : 'translate(0, 0) scale(0)',
                  opacity: isOpen ? 1 : 0,
                  transition: `all ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  transitionDelay: isOpen
                    ? `${index * 50}ms`
                    : `${(actions.length - index) * 30}ms`,
                  boxShadow: isHovered ? theme.shadows[8] : theme.shadows[4],
                  '&:hover': {
                    backgroundColor: action.color || theme.palette.primary.dark,
                    transform: isOpen
                      ? `translate(${action.position.x}px, ${action.position.y}px) scale(1.1)`
                      : 'translate(0, 0) scale(0)',
                  },
                  '&:disabled': {
                    backgroundColor: theme.palette.action.disabled,
                    color: theme.palette.action.disabled,
                  },
                }}
              >
                {action.icon}
              </IconButton>
            )

            return showTooltips && !showLabels ? (
              <Tooltip
                key={action.id}
                title={action.label}
                placement="top"
                arrow
              >
                {button}
              </Tooltip>
            ) : (
              <Box
                key={action.id}
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: isOpen
                    ? `translate(${action.position.x}px, ${action.position.y}px)`
                    : 'translate(0, 0)',
                  opacity: isOpen ? 1 : 0,
                  transition: `all ${animationDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  transitionDelay: isOpen
                    ? `${index * 50}ms`
                    : `${(actions.length - index) * 30}ms`,
                }}
              >
                <IconButton
                  onClick={() => handleActionClick(action.id)}
                  disabled={action.disabled}
                  onMouseEnter={() => setHoveredAction(action.id)}
                  onMouseLeave={() => setHoveredAction(null)}
                  data-testid={`action-${action.id}`}
                  aria-label={action.label}
                  sx={{
                    width: actionSize,
                    height: actionSize,
                    backgroundColor: action.color || theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    boxShadow: isHovered ? theme.shadows[8] : theme.shadows[4],
                    '&:hover': {
                      backgroundColor:
                        action.color || theme.palette.primary.dark,
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {action.icon}
                </IconButton>
                {showLabels && (
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      fontWeight: 500,
                      color: 'text.secondary',
                    }}
                  >
                    {action.label}
                  </Typography>
                )}
              </Box>
            )
          })}

          {/* Center button */}
          <Tooltip title={isOpen ? 'Close menu' : 'Open menu'} arrow>
            <IconButton
              onClick={handleCenterClick}
              data-testid="center-button"
              aria-label={centerLabel}
              aria-expanded={isOpen}
              sx={{
                width: centerSize,
                height: centerSize,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                boxShadow: theme.shadows[6],
                zIndex: 10,
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: `all ${animationDuration}ms ease-out`,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: isOpen ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)',
                },
              }}
            >
              {centerIcon}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Instructions */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {isOpen
            ? 'Click an action or the center button to close'
            : 'Click the center button to open the menu'}
        </Typography>
      </Box>
    </Box>
  )
}

export default CircularLayout
