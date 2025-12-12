import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import React, { useState } from 'react'

/**
 * Configuration for a single panel.
 */
export interface PanelConfig {
  /** Unique identifier for the panel */
  id: string
  /** Content to render inside the panel */
  content: React.ReactNode
  /** Initial width of the panel (CSS value or number in pixels) */
  defaultWidth?: number | string
  /** Minimum width of the panel in pixels */
  minWidth?: number
  /** Maximum width of the panel in pixels */
  maxWidth?: number
  /** Whether this panel can be collapsed */
  collapsible?: boolean
  /** Whether the panel starts collapsed */
  defaultCollapsed?: boolean
  /** Title for collapse/expand tooltip */
  title?: string
  /** Background color override */
  bgcolor?: string
}

/**
 * Props for the MultiPanelLayout component.
 */
export interface MultiPanelLayoutProps {
  /** Array of panel configurations (left to right) */
  panels: PanelConfig[]
  /** Height of the layout */
  height?: number | string
  /** Gap between panels (in pixels) */
  gap?: number
  /** Whether to show dividers between panels */
  showDividers?: boolean
  /** Divider orientation for visual styling */
  dividerOrientation?: 'vertical' | 'horizontal'
  /** Elevation of panel Paper components */
  elevation?: number
  /** Whether panels should have borders */
  bordered?: boolean
  /** Callback when a panel is collapsed/expanded */
  onPanelToggle?: (panelId: string, collapsed: boolean) => void
}

/**
 * MultiPanelLayout provides an IDE-style layout with multiple resizable panes.
 *
 * This layout pattern is ideal for:
 * - Code editors with file explorer, editor, and terminal panels
 * - Email clients with folder list, message list, and preview panels
 * - Admin dashboards with navigation, content, and details panels
 * - Design tools with layers, canvas, and properties panels
 *
 * @param props - MultiPanelLayout configuration
 * @returns A multi-panel layout with collapsible sidebars
 *
 * @example
 * // Basic three-panel layout
 * <MultiPanelLayout
 *   panels={[
 *     { id: 'sidebar', content: <Sidebar />, defaultWidth: 240, collapsible: true },
 *     { id: 'main', content: <MainContent /> },
 *     { id: 'details', content: <Details />, defaultWidth: 300, collapsible: true },
 *   ]}
 *   height={600}
 * />
 *
 * @example
 * // Two-panel layout with fixed widths
 * <MultiPanelLayout
 *   panels={[
 *     { id: 'nav', content: <Nav />, defaultWidth: 200, minWidth: 150, maxWidth: 350 },
 *     { id: 'content', content: <Content /> },
 *   ]}
 * />
 */
const MultiPanelLayout: React.FC<MultiPanelLayoutProps> = ({
  panels,
  height = 500,
  gap = 0,
  showDividers = true,
  elevation = 0,
  bordered = true,
  onPanelToggle,
}) => {
  // Track collapsed state for each panel
  const [collapsedPanels, setCollapsedPanels] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {}
    panels.forEach((panel) => {
      if (panel.collapsible && panel.defaultCollapsed) {
        initial[panel.id] = true
      }
    })
    return initial
  })

  const togglePanel = (panelId: string) => {
    setCollapsedPanels((prev) => {
      const newCollapsed = !prev[panelId]
      onPanelToggle?.(panelId, newCollapsed)
      return { ...prev, [panelId]: newCollapsed }
    })
  }

  const isCollapsed = (panelId: string) => collapsedPanels[panelId] ?? false

  // Calculate flex basis for each panel
  const getPanelStyle = (panel: PanelConfig): React.CSSProperties => {
    const collapsed = isCollapsed(panel.id)

    if (collapsed) {
      return {
        width: 48,
        minWidth: 48,
        maxWidth: 48,
        flexShrink: 0,
        flexGrow: 0,
        transition: 'width 0.2s ease-in-out',
      }
    }

    // Main content panel (no defaultWidth) takes remaining space
    if (!panel.defaultWidth) {
      return {
        flex: 1,
        minWidth: panel.minWidth ?? 200,
        transition: 'all 0.2s ease-in-out',
      }
    }

    return {
      width:
        typeof panel.defaultWidth === 'number'
          ? `${panel.defaultWidth}px`
          : panel.defaultWidth,
      minWidth: panel.minWidth,
      maxWidth: panel.maxWidth,
      flexShrink: 0,
      flexGrow: 0,
      transition: 'width 0.2s ease-in-out',
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height,
        width: '100%',
        gap: `${gap}px`,
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {panels.map((panel, index) => {
        const collapsed = isCollapsed(panel.id)
        const isFirst = index === 0
        const showLeftDivider = showDividers && !isFirst && !collapsed

        return (
          <React.Fragment key={panel.id}>
            {showLeftDivider && <Divider orientation="vertical" flexItem />}
            <Paper
              elevation={elevation}
              sx={{
                ...getPanelStyle(panel),
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                bgcolor: panel.bgcolor ?? 'background.paper',
                borderRadius: 0,
                ...(bordered && {
                  border: 1,
                  borderColor: 'divider',
                }),
                position: 'relative',
              }}
            >
              {/* Collapse toggle button for collapsible panels */}
              {panel.collapsible && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: collapsed ? '50%' : 8,
                    transform: collapsed ? 'translateX(50%)' : 'none',
                    zIndex: 1,
                  }}
                >
                  <Tooltip
                    title={
                      collapsed
                        ? `Expand ${panel.title ?? 'panel'}`
                        : `Collapse ${panel.title ?? 'panel'}`
                    }
                    placement={isFirst ? 'right' : 'left'}
                  >
                    <IconButton
                      size="small"
                      onClick={() => togglePanel(panel.id)}
                      aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}
                      sx={{
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      {collapsed ? (
                        isFirst ? (
                          <ChevronRightIcon fontSize="small" />
                        ) : (
                          <ChevronLeftIcon fontSize="small" />
                        )
                      ) : isFirst ? (
                        <ChevronLeftIcon fontSize="small" />
                      ) : (
                        <ChevronRightIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              {/* Panel content */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: collapsed ? 1 : 2,
                  visibility: collapsed ? 'hidden' : 'visible',
                  opacity: collapsed ? 0 : 1,
                  transition: 'opacity 0.2s ease-in-out',
                }}
              >
                {panel.content}
              </Box>
            </Paper>
          </React.Fragment>
        )
      })}
    </Box>
  )
}

export default MultiPanelLayout
