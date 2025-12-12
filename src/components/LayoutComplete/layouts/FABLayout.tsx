import AddIcon from '@mui/icons-material/Add'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback } from 'react'

/**
 * Available FAB positions for the floating action button.
 */
export type FABPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'

/**
 * Available FAB variants.
 */
export type FABVariant = 'circular' | 'extended'

/**
 * Action item for the SpeedDial component.
 */
export interface FABAction {
  /** Unique identifier for the action */
  id: string
  /** Display name shown in tooltip */
  name: string
  /** Icon component to display */
  icon: React.ReactNode
  /** Handler function when action is clicked */
  onClick?: () => void
}

/**
 * Props for the FABLayout component.
 */
export interface FABLayoutProps {
  /**
   * Position of the FAB on the screen.
   * @default 'bottom-right'
   */
  position?: FABPosition
  /**
   * Whether to show as SpeedDial with multiple actions.
   * @default false
   */
  showSpeedDial?: boolean
  /**
   * Actions for the SpeedDial menu.
   * @default []
   */
  actions?: FABAction[]
  /**
   * Variant of the FAB button.
   * @default 'circular'
   */
  variant?: FABVariant
  /**
   * Label for extended FAB variant.
   * @default 'Action'
   */
  label?: string
  /**
   * Color of the FAB.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  /**
   * Size of the FAB.
   * @default 'large'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Custom icon for the FAB.
   */
  icon?: React.ReactNode
  /**
   * Callback when FAB is clicked.
   */
  onClick?: () => void
  /**
   * Callback when a SpeedDial action is clicked.
   */
  onActionClick?: (actionId: string) => void
  /**
   * Whether to show sample content cards.
   * @default true
   */
  showContent?: boolean
  /**
   * Aria label for accessibility.
   * @default 'Floating action button'
   */
  ariaLabel?: string
}

/**
 * Maps FAB position to CSS positioning styles.
 * @param position - The FAB position.
 * @returns CSS positioning object.
 */
const getPositionStyles = (
  position: FABPosition,
): Record<string, number | string> => {
  const baseOffset = 16

  const positionMap: Record<FABPosition, Record<string, number | string>> = {
    'bottom-right': { bottom: baseOffset, right: baseOffset },
    'bottom-left': { bottom: baseOffset, left: baseOffset },
    'bottom-center': {
      bottom: baseOffset,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    'top-right': { top: baseOffset, right: baseOffset },
    'top-left': { top: baseOffset, left: baseOffset },
  }

  return positionMap[position]
}

/**
 * Default actions for the SpeedDial demonstration.
 */
const DEFAULT_ACTIONS: FABAction[] = [
  { id: 'copy', name: 'Copy', icon: <ContentCopyIcon /> },
  { id: 'edit', name: 'Edit', icon: <EditIcon /> },
  { id: 'share', name: 'Share', icon: <ShareIcon /> },
  { id: 'delete', name: 'Delete', icon: <DeleteIcon /> },
]

/**
 * FABLayout demonstrates the Floating Action Button layout pattern.
 *
 * This layout pattern places a prominent action button that floats above
 * the content, providing quick access to a primary action. It can be a
 * simple FAB or a SpeedDial with multiple actions.
 *
 * @param props - The component props.
 * @returns A React component demonstrating the FAB layout pattern.
 *
 * @example
 * // Simple FAB
 * <FABLayout position="bottom-right" onClick={() => console.log('Clicked!')} />
 *
 * @example
 * // SpeedDial with actions
 * <FABLayout
 *   showSpeedDial
 *   actions={[
 *     { id: 'edit', name: 'Edit', icon: <EditIcon /> },
 *     { id: 'share', name: 'Share', icon: <ShareIcon /> },
 *   ]}
 *   onActionClick={(id) => console.log('Action:', id)}
 * />
 *
 * @example
 * // Extended FAB with label
 * <FABLayout variant="extended" label="Compose" />
 */
const FABLayout: React.FC<FABLayoutProps> = ({
  position = 'bottom-right',
  showSpeedDial = false,
  actions = DEFAULT_ACTIONS,
  variant = 'circular',
  label = 'Action',
  color = 'primary',
  size = 'large',
  icon = <AddIcon />,
  onClick,
  onActionClick,
  showContent = true,
  ariaLabel = 'Floating action button',
}) => {
  const theme = useTheme()
  const [speedDialOpen, setSpeedDialOpen] = useState(false)

  const handleSpeedDialOpen = useCallback(() => {
    setSpeedDialOpen(true)
  }, [])

  const handleSpeedDialClose = useCallback(() => {
    setSpeedDialOpen(false)
  }, [])

  const handleActionClick = useCallback(
    (actionId: string) => {
      setSpeedDialOpen(false)
      onActionClick?.(actionId)
    },
    [onActionClick],
  )

  const positionStyles = getPositionStyles(position)

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 400,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
      data-testid="fab-layout-container"
    >
      {/* Sample content area */}
      {showContent && (
        <Box sx={{ p: 2, pb: 10 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Mobile App View
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600 }}
          >
            The Floating Action Button (FAB) represents the primary action in an
            application. It floats above all content and provides quick access
            to important functionality.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                variant="outlined"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Content Item {item}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is sample content demonstrating how the FAB floats
                    above the main content area. Click the FAB to perform the
                    primary action.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* FAB or SpeedDial */}
      {showSpeedDial ? (
        <SpeedDial
          ariaLabel={ariaLabel}
          sx={{
            position: 'absolute',
            ...positionStyles,
          }}
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={speedDialOpen}
          FabProps={{
            color,
            size,
          }}
          data-testid="speed-dial-fab"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.id}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleActionClick(action.id)}
              data-testid={`speed-dial-action-${action.id}`}
            />
          ))}
        </SpeedDial>
      ) : (
        <Fab
          color={color}
          size={size}
          variant={variant}
          onClick={onClick}
          aria-label={ariaLabel}
          data-testid="fab-button"
          sx={{
            position: 'absolute',
            ...positionStyles,
          }}
        >
          {variant === 'extended' ? (
            <>
              {icon}
              <Typography
                component="span"
                sx={{ ml: 1, textTransform: 'none' }}
              >
                {label}
              </Typography>
            </>
          ) : (
            icon
          )}
        </Fab>
      )}
    </Box>
  )
}

export default FABLayout
