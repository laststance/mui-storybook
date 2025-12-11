import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

/**
 * Z-index layer information with associated MUI components.
 */
interface ZIndexLayer {
  /** The z-index token name */
  name: string
  /** The z-index value */
  value: number
  /** MUI components that use this z-index level */
  components: string[]
  /** Description of the layer's purpose */
  description: string
  /** Color used for visual representation */
  color: string
}

interface ZIndexVisualizerProps {
  /**
   * Display mode for the visualizer.
   * - 'stacked': Show layers as stacked cards
   * - '3d': Show isometric 3D perspective view
   * - 'chart': Show vertical bar chart
   * @default 'stacked'
   */
  viewMode?: 'stacked' | '3d' | 'chart'
  /**
   * If true, displays component examples for each layer.
   * @default true
   */
  showComponents?: boolean
  /**
   * If true, allows interactive highlighting of layers.
   * @default true
   */
  interactive?: boolean
}

/**
 * Z-index layer definitions with associated MUI components.
 *
 * @returns Array of z-index layer information
 */
const getZIndexLayers = (): ZIndexLayer[] => [
  {
    name: 'mobileStepper',
    value: 1000,
    components: ['MobileStepper'],
    description: 'Mobile navigation steppers at the bottom of the screen',
    color: '#4caf50',
  },
  {
    name: 'fab',
    value: 1050,
    components: ['Fab', 'FloatingActionButton'],
    description: 'Floating action buttons for primary actions',
    color: '#8bc34a',
  },
  {
    name: 'speedDial',
    value: 1050,
    components: ['SpeedDial', 'SpeedDialAction'],
    description: 'Speed dial menus for quick actions',
    color: '#cddc39',
  },
  {
    name: 'appBar',
    value: 1100,
    components: ['AppBar', 'Toolbar'],
    description: 'Top navigation bar that stays above content',
    color: '#ffeb3b',
  },
  {
    name: 'drawer',
    value: 1200,
    components: ['Drawer', 'SwipeableDrawer'],
    description: 'Side navigation panels',
    color: '#ffc107',
  },
  {
    name: 'modal',
    value: 1300,
    components: ['Modal', 'Dialog', 'Backdrop'],
    description: 'Modal dialogs and overlays',
    color: '#ff9800',
  },
  {
    name: 'snackbar',
    value: 1400,
    components: ['Snackbar', 'Alert'],
    description: 'Brief notification messages',
    color: '#ff5722',
  },
  {
    name: 'tooltip',
    value: 1500,
    components: ['Tooltip'],
    description: 'Informational tooltips (highest layer)',
    color: '#f44336',
  },
]

/**
 * Visualizes the MUI z-index layering system with multiple view modes.
 *
 * Provides an interactive demonstration of how MUI organizes component
 * stacking order using z-index values from 1000 to 1500.
 *
 * @param props - Component props
 * @returns The ZIndexVisualizer component
 *
 * @example
 * // Basic usage with stacked view
 * <ZIndexVisualizer />
 *
 * @example
 * // 3D perspective view
 * <ZIndexVisualizer viewMode="3d" />
 *
 * @example
 * // Bar chart view without component examples
 * <ZIndexVisualizer viewMode="chart" showComponents={false} />
 */
const ZIndexVisualizer: React.FC<ZIndexVisualizerProps> = ({
  viewMode = 'stacked',
  showComponents = true,
  interactive = true,
}) => {
  const theme = useTheme()
  const [highlightedLayer, setHighlightedLayer] = useState<string | null>(null)
  const layers = getZIndexLayers()

  /**
   * Handles layer click events to toggle highlighting.
   *
   * @param layerName - The name of the clicked layer
   */
  const handleLayerClick = (layerName: string): void => {
    if (!interactive) return
    setHighlightedLayer((prev) => (prev === layerName ? null : layerName))
  }

  /**
   * Determines if a layer is currently highlighted.
   *
   * @param layerName - The name of the layer to check
   * @returns True if the layer is highlighted or no layer is highlighted
   */
  const isHighlighted = (layerName: string): boolean => {
    if (!highlightedLayer) return true
    return highlightedLayer === layerName
  }

  /**
   * Renders the stacked layers view.
   *
   * @returns JSX element representing stacked layers
   */
  const renderStackedView = () => (
    <Stack spacing={1} sx={{ position: 'relative' }}>
      {layers.map((layer) => (
        <Tooltip
          key={layer.name}
          title={
            <Box>
              <Typography variant="subtitle2">{layer.description}</Typography>
              {showComponents && (
                <Typography
                  variant="caption"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  Components: {layer.components.join(', ')}
                </Typography>
              )}
            </Box>
          }
          placement="right"
          arrow
        >
          <Paper
            onClick={() => handleLayerClick(layer.name)}
            sx={{
              p: 2,
              cursor: interactive ? 'pointer' : 'default',
              backgroundColor: alpha(
                layer.color,
                isHighlighted(layer.name) ? 0.2 : 0.05,
              ),
              borderLeft: `4px solid ${layer.color}`,
              opacity: isHighlighted(layer.name) ? 1 : 0.4,
              transition: theme.transitions.create(
                ['opacity', 'background-color', 'transform'],
                { duration: theme.transitions.duration.short },
              ),
              transform: isHighlighted(layer.name)
                ? 'translateX(8px)'
                : 'translateX(0)',
              '&:hover': interactive
                ? {
                    backgroundColor: alpha(layer.color, 0.3),
                    transform: 'translateX(12px)',
                  }
                : {},
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, fontFamily: 'monospace' }}
                >
                  {layer.name}
                </Typography>
                {showComponents && (
                  <Typography variant="caption" color="text.secondary">
                    {layer.components.join(', ')}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'monospace',
                  color: layer.color,
                  fontWeight: 700,
                }}
              >
                {layer.value}
              </Typography>
            </Stack>
          </Paper>
        </Tooltip>
      ))}
    </Stack>
  )

  /**
   * Renders the 3D isometric view of z-index layers.
   *
   * @returns JSX element representing 3D stacked layers
   */
  const render3DView = () => {
    const LAYER_HEIGHT = 60
    const LAYER_OFFSET = 20

    return (
      <Box
        sx={{
          position: 'relative',
          height: layers.length * (LAYER_HEIGHT + LAYER_OFFSET) + 100,
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {layers.map((layer, layerIndex) => {
          const isActive = isHighlighted(layer.name)
          const zOffset = layerIndex * 30

          return (
            <Tooltip
              key={layer.name}
              title={
                <Box>
                  <Typography variant="subtitle2">
                    {layer.description}
                  </Typography>
                  {showComponents && (
                    <Typography
                      variant="caption"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      Components: {layer.components.join(', ')}
                    </Typography>
                  )}
                </Box>
              }
              placement="right"
              arrow
            >
              <Paper
                onClick={() => handleLayerClick(layer.name)}
                elevation={isActive ? 8 : 2}
                sx={{
                  position: 'absolute',
                  top: layerIndex * LAYER_OFFSET,
                  left: layerIndex * 15,
                  right: (layers.length - layerIndex - 1) * 15,
                  height: LAYER_HEIGHT,
                  p: 2,
                  cursor: interactive ? 'pointer' : 'default',
                  backgroundColor: alpha(layer.color, isActive ? 0.25 : 0.1),
                  borderLeft: `4px solid ${layer.color}`,
                  opacity: isActive ? 1 : 0.5,
                  transform: `
                    rotateX(-15deg)
                    rotateY(10deg)
                    translateZ(${isActive ? zOffset + 30 : zOffset}px)
                  `,
                  transformStyle: 'preserve-3d',
                  transition: theme.transitions.create(
                    ['transform', 'opacity', 'box-shadow', 'background-color'],
                    { duration: theme.transitions.duration.standard },
                  ),
                  '&:hover': interactive
                    ? {
                        transform: `
                          rotateX(-15deg)
                          rotateY(10deg)
                          translateZ(${zOffset + 50}px)
                        `,
                        backgroundColor: alpha(layer.color, 0.35),
                      }
                    : {},
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ height: '100%' }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, fontFamily: 'monospace' }}
                    >
                      {layer.name}
                    </Typography>
                    {showComponents && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.7rem' }}
                      >
                        {layer.components.slice(0, 2).join(', ')}
                        {layer.components.length > 2 && '...'}
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      color: layer.color,
                      fontWeight: 700,
                    }}
                  >
                    {layer.value}
                  </Typography>
                </Stack>
              </Paper>
            </Tooltip>
          )
        })}
      </Box>
    )
  }

  /**
   * Renders the vertical bar chart view.
   *
   * @returns JSX element representing z-index values as a bar chart
   */
  const renderChartView = () => {
    const MIN_VALUE = 1000
    const MAX_VALUE = 1500
    const RANGE = MAX_VALUE - MIN_VALUE
    const MAX_HEIGHT = 300

    return (
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-end"
          sx={{ height: MAX_HEIGHT }}
        >
          {layers.map((layer) => {
            const normalizedHeight =
              ((layer.value - MIN_VALUE) / RANGE) * MAX_HEIGHT
            const isActive = isHighlighted(layer.name)

            return (
              <Tooltip
                key={layer.name}
                title={
                  <Box>
                    <Typography variant="subtitle2">
                      {layer.description}
                    </Typography>
                    {showComponents && (
                      <Typography
                        variant="caption"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        Components: {layer.components.join(', ')}
                      </Typography>
                    )}
                  </Box>
                }
                placement="top"
                arrow
              >
                <Box
                  onClick={() => handleLayerClick(layer.name)}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: interactive ? 'pointer' : 'default',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      color: layer.color,
                    }}
                  >
                    {layer.value}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: normalizedHeight,
                      minHeight: 40,
                      backgroundColor: alpha(layer.color, isActive ? 0.8 : 0.3),
                      borderRadius: '4px 4px 0 0',
                      opacity: isActive ? 1 : 0.5,
                      transition: theme.transitions.create(
                        ['height', 'opacity', 'background-color'],
                        { duration: theme.transitions.duration.short },
                      ),
                      '&:hover': interactive
                        ? {
                            backgroundColor: alpha(layer.color, 0.9),
                          }
                        : {},
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      fontSize: '0.65rem',
                      textAlign: 'center',
                      fontFamily: 'monospace',
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      height: 80,
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    {layer.name}
                  </Typography>
                </Box>
              </Tooltip>
            )
          })}
        </Stack>

        {/* Scale reference */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Scale: {MIN_VALUE} (lowest) to {MAX_VALUE} (highest)
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Z-Index Layering System
        </Typography>
        <Typography variant="body2" color="text.secondary">
          MUI uses a standardized z-index scale to manage component stacking
          order. Higher values appear on top of lower values.
          {interactive && ' Click on a layer to highlight it.'}
        </Typography>
      </Box>

      {/* View content */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        {viewMode === 'stacked' && renderStackedView()}
        {viewMode === '3d' && render3DView()}
        {viewMode === 'chart' && renderChartView()}
      </Paper>

      {/* Legend */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Theme Access
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            backgroundColor: alpha(theme.palette.grey[500], 0.05),
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          <code>
            {`const theme = useTheme()\n`}
            {`theme.zIndex.mobileStepper // ${theme.zIndex.mobileStepper}\n`}
            {`theme.zIndex.appBar        // ${theme.zIndex.appBar}\n`}
            {`theme.zIndex.drawer        // ${theme.zIndex.drawer}\n`}
            {`theme.zIndex.modal         // ${theme.zIndex.modal}\n`}
            {`theme.zIndex.snackbar      // ${theme.zIndex.snackbar}\n`}
            {`theme.zIndex.tooltip       // ${theme.zIndex.tooltip}`}
          </code>
        </Paper>
      </Box>
    </Box>
  )
}

export default ZIndexVisualizer
