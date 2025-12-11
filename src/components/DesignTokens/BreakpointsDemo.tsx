import { useTheme, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import type { Breakpoint } from '@mui/material'

/**
 * Configuration for each MUI breakpoint.
 * Defines display properties and color-coding for visualization.
 */
interface BreakpointConfig {
  /** Breakpoint key (xs, sm, md, lg, xl) */
  name: Breakpoint
  /** Display label for the breakpoint */
  label: string
  /** Color used for visual indicators */
  color: string
  /** Text color for contrast */
  textColor: string
}

const BREAKPOINT_CONFIGS: BreakpointConfig[] = [
  { name: 'xs', label: 'Extra Small', color: '#f44336', textColor: '#fff' },
  { name: 'sm', label: 'Small', color: '#ff9800', textColor: '#000' },
  { name: 'md', label: 'Medium', color: '#ffeb3b', textColor: '#000' },
  { name: 'lg', label: 'Large', color: '#4caf50', textColor: '#fff' },
  { name: 'xl', label: 'Extra Large', color: '#2196f3', textColor: '#fff' },
]

/**
 * Displays information about a single breakpoint.
 * Shows name, min-width value, and active state indicator.
 *
 * @param config - Breakpoint configuration including name and colors
 * @param value - Min-width value in pixels
 * @param isActive - Whether this breakpoint is currently active
 * @returns A card showing breakpoint information
 *
 * @example
 * <BreakpointCard config={BREAKPOINT_CONFIGS[0]} value={0} isActive={true} />
 */
const BreakpointCard: React.FC<{
  config: BreakpointConfig
  value: number
  isActive: boolean
}> = ({ config, value, isActive }) => (
  <Paper
    elevation={isActive ? 8 : 1}
    sx={{
      p: 2,
      backgroundColor: isActive ? config.color : 'background.paper',
      color: isActive ? config.textColor : 'text.primary',
      border: isActive ? `3px solid ${config.color}` : '1px solid',
      borderColor: isActive ? config.color : 'divider',
      transition: 'all 0.3s ease',
      transform: isActive ? 'scale(1.05)' : 'scale(1)',
      minWidth: 120,
      textAlign: 'center',
    }}
  >
    <Typography variant="h6" fontWeight="bold">
      {config.name.toUpperCase()}
    </Typography>
    <Typography variant="body2">{config.label}</Typography>
    <Typography variant="caption" sx={{ opacity: 0.8 }}>
      {`>= ${value}px`}
    </Typography>
    {isActive && (
      <Typography
        variant="caption"
        sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}
      >
        ACTIVE
      </Typography>
    )}
  </Paper>
)

/**
 * Visual bar representation of breakpoint ranges.
 * Each bar shows the relative width of a breakpoint range.
 *
 * @param breakpoints - Theme breakpoint values object
 * @returns A horizontal bar chart showing breakpoint ranges
 */
const BreakpointRangeBars: React.FC<{
  breakpoints: Record<Breakpoint, number>
}> = ({ breakpoints }) => {
  const maxWidth = 1536 // xl breakpoint as reference

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Breakpoint Scale Visualization
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {BREAKPOINT_CONFIGS.map((config, index) => {
          const currentValue = breakpoints[config.name]
          const nextConfig = BREAKPOINT_CONFIGS[index + 1]
          const nextValue = nextConfig
            ? breakpoints[nextConfig.name]
            : maxWidth + 200
          const rangeWidth =
            ((nextValue - currentValue) / (maxWidth + 200)) * 100

          return (
            <Box
              key={config.name}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Typography
                variant="body2"
                sx={{ width: 30, fontWeight: 'bold' }}
              >
                {config.name}
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: `${rangeWidth}%`,
                    height: 24,
                    backgroundColor: config.color,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 60,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: config.textColor, fontWeight: 'bold' }}
                  >
                    {currentValue}px - {nextConfig ? `${nextValue - 1}px` : '+'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

/**
 * Demonstrates various breakpoint media query helper methods.
 * Shows examples of up(), down(), only(), and between() methods.
 *
 * @returns A list of media query examples with syntax
 */
const MediaQueryExamples: React.FC = () => {
  const theme = useTheme()

  const examples = [
    {
      method: 'up()',
      description: 'Matches screen widths >= breakpoint',
      code: "theme.breakpoints.up('md')",
      query: theme.breakpoints.up('md'),
    },
    {
      method: 'down()',
      description: 'Matches screen widths < breakpoint',
      code: "theme.breakpoints.down('md')",
      query: theme.breakpoints.down('md'),
    },
    {
      method: 'only()',
      description: 'Matches only the specific breakpoint range',
      code: "theme.breakpoints.only('md')",
      query: theme.breakpoints.only('md'),
    },
    {
      method: 'between()',
      description: 'Matches between two breakpoints',
      code: "theme.breakpoints.between('sm', 'lg')",
      query: theme.breakpoints.between('sm', 'lg'),
    },
  ]

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Media Query Helper Methods
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {examples.map((example) => (
          <Paper key={example.method} sx={{ p: 2 }} variant="outlined">
            <Typography variant="subtitle2" fontWeight="bold" color="primary">
              {example.method}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {example.description}
            </Typography>
            <Box
              component="code"
              sx={{
                display: 'block',
                p: 1,
                backgroundColor: 'grey.100',
                borderRadius: 1,
                fontSize: '0.875rem',
                fontFamily: 'monospace',
              }}
            >
              {example.code}
            </Box>
            <Typography
              variant="caption"
              sx={{ mt: 1, display: 'block', color: 'text.secondary' }}
            >
              Generated: {example.query}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

/**
 * A responsive demo box that changes appearance at different breakpoints.
 * Color, size, and text change based on the current viewport width.
 *
 * @returns A Box that responds to viewport changes
 */
const ResponsiveDemo: React.FC = () => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle1" gutterBottom fontWeight="bold">
      Responsive Demo Box
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      This box changes color and size at each breakpoint. Resize your browser to
      see the changes.
    </Typography>
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '80%',
          md: '60%',
          lg: '50%',
          xl: '40%',
        },
        height: {
          xs: 100,
          sm: 120,
          md: 140,
          lg: 160,
          xl: 180,
        },
        backgroundColor: {
          xs: '#f44336',
          sm: '#ff9800',
          md: '#ffeb3b',
          lg: '#4caf50',
          xl: '#2196f3',
        },
        color: {
          xs: '#fff',
          sm: '#000',
          md: '#000',
          lg: '#fff',
          xl: '#fff',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        boxShadow: 3,
      }}
    >
      <Typography
        sx={{
          display: { xs: 'block', sm: 'none' },
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        XS (Extra Small)
      </Typography>
      <Typography
        sx={{
          display: { xs: 'none', sm: 'block', md: 'none' },
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        SM (Small)
      </Typography>
      <Typography
        sx={{
          display: { xs: 'none', md: 'block', lg: 'none' },
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        MD (Medium)
      </Typography>
      <Typography
        sx={{
          display: { xs: 'none', lg: 'block', xl: 'none' },
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        LG (Large)
      </Typography>
      <Typography
        sx={{
          display: { xs: 'none', xl: 'block' },
          fontWeight: 'bold',
          fontSize: '1.25rem',
        }}
      >
        XL (Extra Large)
      </Typography>
    </Box>
  </Box>
)

/**
 * BreakpointsDemo - A comprehensive visualization of MUI breakpoints.
 *
 * This component demonstrates:
 * - Visual representation of all MUI breakpoints (xs, sm, md, lg, xl)
 * - Current viewport indicator showing which breakpoint is active
 * - Color-coded range bars showing breakpoint ranges
 * - Media query helper method examples
 * - A responsive demo box that changes at each breakpoint
 *
 * @returns A full breakpoints demonstration component
 *
 * @example
 * <BreakpointsDemo />
 */
const BreakpointsDemo: React.FC = () => {
  const theme = useTheme()
  const breakpoints = theme.breakpoints.values

  // Determine current active breakpoint using useMediaQuery
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const isLg = useMediaQuery(theme.breakpoints.only('lg'))
  const isXl = useMediaQuery(theme.breakpoints.only('xl'))

  /**
   * Determines if a given breakpoint is currently active.
   *
   * @param bp - Breakpoint to check
   * @returns Whether the breakpoint is currently active
   */
  const isActiveBreakpoint = (bp: Breakpoint): boolean => {
    switch (bp) {
      case 'xs':
        return isXs
      case 'sm':
        return isSm
      case 'md':
        return isMd
      case 'lg':
        return isLg
      case 'xl':
        return isXl
      default:
        return false
    }
  }

  // Get current active breakpoint name for display
  const currentBreakpoint = isXs
    ? 'xs'
    : isSm
      ? 'sm'
      : isMd
        ? 'md'
        : isLg
          ? 'lg'
          : 'xl'

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        MUI Breakpoints
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        MUI provides a responsive layout system with 5 breakpoints. The current
        viewport is in the{' '}
        <Box
          component="span"
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          {currentBreakpoint.toUpperCase()}
        </Box>{' '}
        range.
      </Typography>

      {/* Current Viewport Indicator */}
      <Paper
        sx={{ p: 2, mb: 3, backgroundColor: 'primary.main', color: 'white' }}
      >
        <Typography variant="h6">
          Current Viewport:{' '}
          {typeof window !== 'undefined' ? window.innerWidth : 0}px
        </Typography>
        <Typography variant="body2">
          Active Breakpoint: {currentBreakpoint.toUpperCase()} (
          {BREAKPOINT_CONFIGS.find((c) => c.name === currentBreakpoint)?.label})
        </Typography>
      </Paper>

      {/* Breakpoint Cards */}
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Breakpoint Scale
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        {BREAKPOINT_CONFIGS.map((config) => (
          <BreakpointCard
            key={config.name}
            config={config}
            value={breakpoints[config.name]}
            isActive={isActiveBreakpoint(config.name)}
          />
        ))}
      </Box>

      {/* Breakpoint Values Table */}
      <Paper sx={{ p: 2, mb: 3 }} variant="outlined">
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Default Breakpoint Values
        </Typography>
        <Box
          component="table"
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
            '& th, & td': {
              p: 1,
              textAlign: 'left',
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            '& th': {
              fontWeight: 'bold',
              backgroundColor: 'grey.100',
            },
          }}
        >
          <thead>
            <tr>
              <th>Breakpoint</th>
              <th>Key</th>
              <th>Min-Width</th>
              <th>CSS Media Query</th>
            </tr>
          </thead>
          <tbody>
            {BREAKPOINT_CONFIGS.map((config) => (
              <tr
                key={config.name}
                style={{
                  backgroundColor: isActiveBreakpoint(config.name)
                    ? config.color + '20'
                    : 'transparent',
                }}
              >
                <td>{config.label}</td>
                <td>
                  <code>{config.name}</code>
                </td>
                <td>{breakpoints[config.name]}px</td>
                <td>
                  <code>{`@media (min-width: ${breakpoints[config.name]}px)`}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Paper>

      {/* Range Bars */}
      <BreakpointRangeBars breakpoints={breakpoints} />

      {/* Media Query Examples */}
      <MediaQueryExamples />

      {/* Responsive Demo */}
      <ResponsiveDemo />
    </Box>
  )
}

export default BreakpointsDemo
