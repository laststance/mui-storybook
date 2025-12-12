import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useState, useCallback } from 'react'

/**
 * Position of the off-canvas drawer.
 */
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

/**
 * Drawer variant options.
 */
type DrawerVariant = 'temporary' | 'persistent' | 'permanent'

/**
 * Props for the OffCanvasLayout component.
 */
export interface OffCanvasLayoutProps {
  /**
   * Main content of the page.
   */
  children: React.ReactNode
  /**
   * Content to display in the off-canvas drawer.
   */
  drawerContent: React.ReactNode
  /**
   * Position of the drawer.
   * @default 'left'
   */
  position?: DrawerPosition
  /**
   * Width of the drawer (for left/right positions).
   * @default 280
   */
  drawerWidth?: number
  /**
   * Height of the drawer (for top/bottom positions).
   * @default 300
   */
  drawerHeight?: number
  /**
   * Drawer variant behavior.
   * @default 'temporary'
   */
  variant?: DrawerVariant
  /**
   * Whether the drawer is initially open.
   * @default false
   */
  defaultOpen?: boolean
  /**
   * Whether to show the app bar with menu toggle.
   * @default true
   */
  showAppBar?: boolean
  /**
   * App bar title.
   * @default 'App'
   */
  appBarTitle?: string
  /**
   * Custom trigger element to open the drawer (replaces default hamburger).
   */
  customTrigger?: React.ReactNode
  /**
   * Callback when drawer open state changes.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Whether to show a close button inside the drawer.
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Breakpoint at which to show permanent drawer.
   * Only applies when variant is 'permanent'.
   * @default 'lg'
   */
  permanentBreakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Whether the drawer pushes content when open (persistent/permanent only).
   * @default true
   */
  pushContent?: boolean
  /**
   * Background color of the drawer.
   */
  drawerBackground?: string
}

/**
 * OffCanvasLayout provides a hidden sidebar that slides in from any edge,
 * commonly used for mobile navigation and filter panels.
 *
 * This layout is ideal for mobile-first designs where navigation or
 * secondary content should be hidden until requested.
 *
 * @param props - Component props.
 * @returns An off-canvas layout with sliding drawer.
 *
 * @example
 * // Mobile navigation with hamburger menu
 * <OffCanvasLayout
 *   drawerContent={<NavigationMenu />}
 *   appBarTitle="My App"
 * >
 *   <MainContent />
 * </OffCanvasLayout>
 *
 * @example
 * // Filter panel from right side
 * <OffCanvasLayout
 *   position="right"
 *   drawerContent={<FilterPanel />}
 *   customTrigger={<FilterButton />}
 * >
 *   <ProductList />
 * </OffCanvasLayout>
 */
const OffCanvasLayout: React.FC<OffCanvasLayoutProps> = ({
  children,
  drawerContent,
  position = 'left',
  drawerWidth = 280,
  drawerHeight = 300,
  variant = 'temporary',
  defaultOpen = false,
  showAppBar = true,
  appBarTitle = 'App',
  customTrigger,
  onOpenChange,
  showCloseButton = true,
  permanentBreakpoint = 'lg',
  pushContent = true,
  drawerBackground,
}) => {
  const theme = useTheme()
  const [open, setOpen] = useState(defaultOpen)

  // For permanent variant, check if above breakpoint
  const isAboveBreakpoint = useMediaQuery(
    theme.breakpoints.up(permanentBreakpoint),
  )
  const isPermanent = variant === 'permanent' && isAboveBreakpoint

  const handleOpen = useCallback(() => {
    setOpen(true)
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleClose = useCallback(() => {
    setOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleToggle = useCallback(() => {
    const newState = !open
    setOpen(newState)
    onOpenChange?.(newState)
  }, [open, onOpenChange])

  // Calculate drawer dimensions based on position
  const isHorizontal = position === 'left' || position === 'right'
  const drawerSize = isHorizontal ? drawerWidth : drawerHeight

  // Calculate main content margin for persistent/permanent variants
  const contentMargin =
    (variant === 'persistent' || isPermanent) && pushContent && open
      ? `${drawerSize}px`
      : 0

  const marginDirection =
    position === 'left'
      ? 'marginLeft'
      : position === 'right'
        ? 'marginRight'
        : position === 'top'
          ? 'marginTop'
          : 'marginBottom'

  // Determine actual variant based on breakpoint for permanent
  const actualVariant = isPermanent ? 'permanent' : variant

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showAppBar && !isPermanent && (
        <AppBar
          position="sticky"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            {!customTrigger ? (
              <IconButton
                color="inherit"
                aria-label={
                  open ? 'Close navigation menu' : 'Open navigation menu'
                }
                edge="start"
                onClick={handleToggle}
                sx={{ mr: 2 }}
                data-testid="menu-toggle"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box onClick={handleOpen} sx={{ mr: 2, cursor: 'pointer' }}>
                {customTrigger}
              </Box>
            )}
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {appBarTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        anchor={position}
        open={isPermanent || open}
        onClose={handleClose}
        variant={actualVariant}
        sx={{
          '& .MuiDrawer-paper': {
            width: isHorizontal ? drawerWidth : '100%',
            height: isHorizontal ? '100%' : drawerHeight,
            boxSizing: 'border-box',
            backgroundColor: drawerBackground || theme.palette.background.paper,
            ...(showAppBar &&
              !isPermanent && {
                top: '64px', // Below AppBar
                height: 'calc(100% - 64px)',
              }),
          },
        }}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {showCloseButton && !isPermanent && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 1,
            }}
          >
            <IconButton
              onClick={handleClose}
              aria-label="Close drawer"
              data-testid="drawer-close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Box
          sx={{
            overflow: 'auto',
            height: '100%',
            p: showCloseButton && !isPermanent ? 0 : 2,
          }}
        >
          {drawerContent}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          [marginDirection]: contentMargin,
          ...(open &&
            pushContent && {
              transition: theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default OffCanvasLayout
