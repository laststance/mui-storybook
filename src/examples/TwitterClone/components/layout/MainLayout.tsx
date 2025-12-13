/**
 * Main layout component with sidebar and content area.
 */

import Box from '@mui/material/Box'

import { Sidebar } from './Sidebar'

export interface MainLayoutProps {
  /** Child content to render */
  children: React.ReactNode
  /** Currently active route */
  activeRoute: string
  /** Handler for navigation */
  onNavigate: (path: string) => void
}

/**
 * Main application layout with responsive sidebar.
 * Provides consistent structure across all authenticated pages.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeRoute,
  onNavigate,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: 275,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} />
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          borderRight: 1,
          borderColor: 'divider',
          maxWidth: 600,
        }}
      >
        {children}
      </Box>

      {/* Right Sidebar (placeholder for search/trends) */}
      <Box
        sx={{
          width: 350,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          p: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            What's happening
          </Box>
          <Box
            component="p"
            sx={{ mt: 2, color: 'text.secondary', fontSize: '0.875rem' }}
          >
            Trends and search coming soon...
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
