import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import { alpha, useTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useRef, useState } from 'react'

/** Pattern type identifiers */
type PatternType = 'F' | 'Z' | 'N'

/** Coordinates for SVG path points */
interface PathPoint {
  x: number
  y: number
}

/** Configuration for each eye tracking pattern */
interface PatternConfig {
  /** Display name of the pattern */
  name: string
  /** Description of the pattern behavior */
  description: string
  /** Primary use cases for this pattern */
  useCases: string[]
  /** Key attention areas in the layout */
  keyAreas: Array<{
    label: string
    position: { top: string; left: string }
    attention: 'high' | 'medium' | 'low'
  }>
  /** SVG path points for the eye movement animation */
  pathPoints: PathPoint[]
  /** Recommendations for using this pattern */
  recommendations: string[]
}

/** Maps attention levels to colors for heatmap visualization */
const ATTENTION_COLORS = {
  high: 'error.main',
  medium: 'warning.main',
  low: 'info.main',
} as const

/** Opacity values for heatmap visualization - Improved for better contrast */
const ATTENTION_OPACITY = {
  high: 0.85,
  medium: 0.65,
  low: 0.45,
} as const

/**
 * Pattern configurations containing all data for F, Z, and N patterns.
 */
const PATTERN_CONFIGS: Record<PatternType, PatternConfig> = {
  F: {
    name: 'F-Pattern',
    description:
      'Users first read horizontally across the top, then move down and read a shorter horizontal line, finally scanning vertically down the left side.',
    useCases: [
      'Text-heavy pages',
      'Blog posts and articles',
      'News websites',
      'Documentation pages',
    ],
    keyAreas: [
      {
        label: 'Logo / Brand',
        position: { top: '8%', left: '8%' },
        attention: 'high',
      },
      {
        label: 'Top Navigation',
        position: { top: '8%', left: '50%' },
        attention: 'high',
      },
      {
        label: 'Headline',
        position: { top: '25%', left: '25%' },
        attention: 'high',
      },
      {
        label: 'First Paragraph',
        position: { top: '35%', left: '20%' },
        attention: 'medium',
      },
      {
        label: 'Subheading',
        position: { top: '50%', left: '15%' },
        attention: 'medium',
      },
      {
        label: 'Body Content',
        position: { top: '65%', left: '12%' },
        attention: 'low',
      },
      {
        label: 'Footer',
        position: { top: '85%', left: '10%' },
        attention: 'low',
      },
    ],
    pathPoints: [
      { x: 10, y: 15 },
      { x: 90, y: 15 },
      { x: 10, y: 35 },
      { x: 70, y: 35 },
      { x: 10, y: 55 },
      { x: 10, y: 75 },
      { x: 10, y: 90 },
    ],
    recommendations: [
      'Place critical information in the first two paragraphs',
      'Use clear, descriptive headings aligned to the left',
      'Front-load important keywords at the beginning of paragraphs',
      'Break up content with bullet points and subheadings',
      'Keep the left edge visually consistent for easy scanning',
    ],
  },
  Z: {
    name: 'Z-Pattern',
    description:
      'Users scan from top-left to top-right, then diagonally to bottom-left, and finally horizontally to bottom-right where the CTA typically resides.',
    useCases: [
      'Landing pages',
      'Minimal content pages',
      'Single CTA pages',
      'Marketing websites',
    ],
    keyAreas: [
      {
        label: 'Logo',
        position: { top: '10%', left: '10%' },
        attention: 'high',
      },
      {
        label: 'Navigation / CTA',
        position: { top: '10%', left: '85%' },
        attention: 'high',
      },
      {
        label: 'Hero Image',
        position: { top: '45%', left: '50%' },
        attention: 'medium',
      },
      {
        label: 'Supporting Info',
        position: { top: '75%', left: '15%' },
        attention: 'medium',
      },
      {
        label: 'Primary CTA',
        position: { top: '75%', left: '85%' },
        attention: 'high',
      },
    ],
    pathPoints: [
      { x: 10, y: 15 },
      { x: 90, y: 15 },
      { x: 10, y: 85 },
      { x: 90, y: 85 },
    ],
    recommendations: [
      'Place your logo in the top-left corner',
      'Position secondary navigation or CTA in the top-right',
      'Use the diagonal space for hero imagery or key messaging',
      'Place the primary call-to-action in the bottom-right',
      'Keep the layout simple with minimal distractions',
    ],
  },
  N: {
    name: 'N-Pattern',
    description:
      'Common in RTL (right-to-left) layouts or portal-style sites. Users start at top-right, move down, diagonally to top-left of main content, then down again.',
    useCases: [
      'Portal websites',
      'Dashboard layouts',
      '3-column layouts',
      'RTL language websites',
    ],
    keyAreas: [
      {
        label: 'Right Sidebar',
        position: { top: '15%', left: '85%' },
        attention: 'high',
      },
      {
        label: 'Right Actions',
        position: { top: '40%', left: '85%' },
        attention: 'medium',
      },
      {
        label: 'Main Header',
        position: { top: '15%', left: '50%' },
        attention: 'high',
      },
      {
        label: 'Main Content',
        position: { top: '50%', left: '50%' },
        attention: 'high',
      },
      {
        label: 'Left Navigation',
        position: { top: '50%', left: '10%' },
        attention: 'medium',
      },
      {
        label: 'Left Footer',
        position: { top: '85%', left: '10%' },
        attention: 'low',
      },
    ],
    pathPoints: [
      { x: 90, y: 15 },
      { x: 90, y: 50 },
      { x: 50, y: 15 },
      { x: 50, y: 50 },
      { x: 10, y: 50 },
      { x: 10, y: 90 },
    ],
    recommendations: [
      'Position key actions in the right sidebar for portal layouts',
      'Use the center column for primary content',
      'Reserve the left column for navigation or secondary info',
      'Consider RTL reading patterns for international audiences',
      'Maintain visual hierarchy across all three columns',
    ],
  },
}

/** Animation duration in milliseconds */
const ANIMATION_DURATION = 3000

/**
 * Generates an SVG path string from an array of points.
 *
 * @param points - Array of coordinate points
 * @returns SVG path data string (e.g., "M 10 15 L 90 15 L 10 35")
 *
 * @example
 * generatePathData([{ x: 0, y: 0 }, { x: 100, y: 100 }])
 * // => "M 0 0 L 100 100"
 */
const generatePathData = (points: PathPoint[]): string => {
  if (points.length === 0) return ''

  const pathCommands = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${command} ${point.x} ${point.y}`
  })

  return pathCommands.join(' ')
}

/**
 * Calculates the total length of a path for animation timing.
 *
 * @param points - Array of coordinate points
 * @returns Total length of the path
 */
const calculatePathLength = (points: PathPoint[]): number => {
  let length = 0
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x
    const dy = points[i].y - points[i - 1].y
    length += Math.sqrt(dx * dx + dy * dy)
  }
  return length
}

interface HotspotProps {
  /** Label text for the hotspot */
  label: string
  /** CSS position properties */
  position: { top: string; left: string }
  /** Attention level determining color and opacity */
  attention: 'high' | 'medium' | 'low'
  /** Whether to show heatmap overlay */
  showHeatmap: boolean
}

/**
 * Renders a single attention hotspot with label and heatmap overlay.
 *
 * @param props - Hotspot configuration
 * @returns A positioned hotspot element with optional heatmap visualization
 */
const Hotspot = ({ label, position, attention, showHeatmap }: HotspotProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'absolute',
        ...position,
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    >
      {/* Heatmap overlay circle */}
      {showHeatmap && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: attention === 'high' ? 80 : attention === 'medium' ? 60 : 40,
            height:
              attention === 'high' ? 80 : attention === 'medium' ? 60 : 40,
            borderRadius: '50%',
            bgcolor: alpha(
              theme.palette[
                attention === 'high'
                  ? 'error'
                  : attention === 'medium'
                    ? 'warning'
                    : 'info'
              ].main,
              ATTENTION_OPACITY[attention],
            ),
            filter: 'blur(12px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Label chip */}
      <Chip
        label={label}
        size="small"
        sx={{
          position: 'relative',
          bgcolor: ATTENTION_COLORS[attention],
          color: 'white',
          fontWeight: 500,
          fontSize: '0.7rem',
          height: 24,
          '& .MuiChip-label': {
            px: 1,
          },
        }}
      />
    </Box>
  )
}

interface AnimatedPathProps {
  /** Pattern type to render */
  pattern: PatternType
  /** Whether animation is enabled */
  showAnimation: boolean
}

/**
 * Renders the animated SVG path for eye tracking visualization.
 *
 * @param props - Animation configuration
 * @returns SVG element with animated path and moving dot
 */
const AnimatedPath = ({ pattern, showAnimation }: AnimatedPathProps) => {
  const theme = useTheme()
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  const config = PATTERN_CONFIGS[pattern]
  const pathData = generatePathData(config.pathPoints)

  // Calculate path length for stroke animation
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [pattern])

  // Restart animation when pattern changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [pattern])

  const estimatedLength = calculatePathLength(config.pathPoints)

  return (
    <Box
      component="svg"
      viewBox="0 0 100 100"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      preserveAspectRatio="none"
    >
      {/* Static path background */}
      <path
        d={pathData}
        fill="none"
        stroke={alpha(theme.palette.primary.main, 0.2)}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated path */}
      {showAnimation && (
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength || estimatedLength * 2}
          strokeDashoffset={pathLength || estimatedLength * 2}
          style={{
            animation: `drawPath ${ANIMATION_DURATION}ms ease-in-out infinite`,
          }}
        />
      )}

      {/* Animated dot following the path */}
      {showAnimation && (
        <circle
          key={animationKey}
          r="1.5"
          fill={theme.palette.secondary.main}
          style={{
            offsetPath: `path('${pathData}')`,
            offsetRotate: '0deg',
            animation: `moveDot ${ANIMATION_DURATION}ms ease-in-out infinite`,
          }}
        />
      )}

      {/* Path point markers */}
      {config.pathPoints.map((point, index) => (
        <circle
          key={`point-${index}`}
          cx={point.x}
          cy={point.y}
          r="1"
          fill={theme.palette.primary.main}
          opacity={0.6}
        />
      ))}

      {/* CSS Keyframes for animations */}
      <defs>
        <style>
          {`
            @keyframes drawPath {
              0% {
                stroke-dashoffset: ${pathLength || estimatedLength * 2};
              }
              50% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }

            @keyframes moveDot {
              0% {
                offset-distance: 0%;
                opacity: 1;
              }
              50% {
                offset-distance: 100%;
                opacity: 1;
              }
              50.1%, 100% {
                offset-distance: 100%;
                opacity: 0;
              }
            }
          `}
        </style>
      </defs>
    </Box>
  )
}

interface MockLayoutProps {
  /** Pattern type to display */
  pattern: PatternType
  /** Whether to show heatmap overlays */
  showHeatmap: boolean
}

/**
 * Renders a mock page layout with hotspots for the selected pattern.
 *
 * @param props - Layout configuration
 * @returns A mock webpage layout visualization
 */
const MockLayout = ({ pattern, showHeatmap }: MockLayoutProps) => {
  const config = PATTERN_CONFIGS[pattern]

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* Mock header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '12%',
          bgcolor: 'grey.100',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      />

      {/* Mock sidebar for N-pattern */}
      {pattern === 'N' && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '12%',
              left: 0,
              bottom: 0,
              width: '20%',
              bgcolor: 'grey.50',
              borderRight: 1,
              borderColor: 'divider',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '12%',
              right: 0,
              bottom: 0,
              width: '20%',
              bgcolor: 'grey.50',
              borderLeft: 1,
              borderColor: 'divider',
            }}
          />
        </>
      )}

      {/* Mock content lines for F-pattern */}
      {pattern === 'F' && (
        <Box sx={{ position: 'absolute', top: '20%', left: '5%', right: '5%' }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              sx={{
                height: 8,
                bgcolor: 'grey.200',
                borderRadius: 0.5,
                mb: 1.5,
                width: `${85 - i * 10}%`,
              }}
            />
          ))}
        </Box>
      )}

      {/* Mock hero for Z-pattern */}
      {pattern === 'Z' && (
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '10%',
            right: '10%',
            height: '40%',
            bgcolor: 'grey.100',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Hero Content
          </Typography>
        </Box>
      )}

      {/* Hotspots */}
      {config.keyAreas.map((area, index) => (
        <Hotspot
          key={`${pattern}-${index}`}
          label={area.label}
          position={area.position}
          attention={area.attention}
          showHeatmap={showHeatmap}
        />
      ))}
    </Box>
  )
}

interface RecommendationsSectionProps {
  /** Pattern type for recommendations */
  pattern: PatternType
}

/**
 * Displays best practice recommendations for the selected pattern.
 *
 * @param props - Pattern identifier
 * @returns A list of recommendations for the pattern
 */
const RecommendationsSection = ({ pattern }: RecommendationsSectionProps) => {
  const config = PATTERN_CONFIGS[pattern]

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
        Recommendations for {config.name}
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
        {config.recommendations.map((rec, index) => (
          <Typography
            key={index}
            component="li"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            {rec}
          </Typography>
        ))}
      </Box>
    </Paper>
  )
}

interface LegendProps {
  /** Whether heatmap is currently visible */
  showHeatmap: boolean
}

/**
 * Renders the attention level legend for the heatmap.
 *
 * @param props - Legend configuration
 * @returns A horizontal legend showing attention levels
 */
const Legend = ({ showHeatmap }: LegendProps) => {
  if (!showHeatmap) return null

  const levels: Array<{ label: string; attention: 'high' | 'medium' | 'low' }> =
    [
      { label: 'High Attention', attention: 'high' },
      { label: 'Medium Attention', attention: 'medium' },
      { label: 'Low Attention', attention: 'low' },
    ]

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
      {levels.map((level) => (
        <Box
          key={level.attention}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: ATTENTION_COLORS[level.attention],
              opacity: ATTENTION_OPACITY[level.attention],
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {level.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export interface EyeTrackingPatternsProps {
  /** Default pattern to display on initial render */
  defaultPattern?: PatternType
  /** Whether to show the animated path by default */
  showAnimation?: boolean
  /** Whether to show the heatmap overlay by default */
  showHeatmap?: boolean
}

/**
 * EyeTrackingPatterns component for visualizing F, Z, and N eye tracking patterns.
 *
 * This educational component demonstrates how users typically scan web pages
 * using three common eye tracking patterns. It includes animated path visualization,
 * heatmap overlays showing attention areas, and best practice recommendations.
 *
 * @param props - Component configuration options
 * @returns An interactive eye tracking pattern visualization
 *
 * @example
 * // Basic usage with defaults
 * <EyeTrackingPatterns />
 *
 * @example
 * // Start with Z-pattern and heatmap enabled
 * <EyeTrackingPatterns defaultPattern="Z" showHeatmap={true} />
 *
 * @example
 * // Disable animation for static view
 * <EyeTrackingPatterns showAnimation={false} />
 */
const EyeTrackingPatterns: React.FC<EyeTrackingPatternsProps> = ({
  defaultPattern = 'F',
  showAnimation: initialShowAnimation = true,
  showHeatmap: initialShowHeatmap = true,
}) => {
  const [selectedPattern, setSelectedPattern] =
    useState<PatternType>(defaultPattern)
  const [showAnimation, setShowAnimation] = useState(initialShowAnimation)
  const [showHeatmap, setShowHeatmap] = useState(initialShowHeatmap)

  const config = PATTERN_CONFIGS[selectedPattern]

  /**
   * Handles pattern toggle button changes.
   *
   * @param _event - Mouse event
   * @param newPattern - Newly selected pattern or null
   */
  const handlePatternChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newPattern: PatternType | null) => {
      if (newPattern !== null) {
        setSelectedPattern(newPattern)
      }
    },
    [],
  )

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Eye Tracking Patterns
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Understanding how users scan web pages helps create more effective
          layouts. These three patterns represent the most common eye movement
          behaviors observed in user research studies.
        </Typography>
      </Box>

      {/* Pattern Selector */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mb: 3,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup
          value={selectedPattern}
          exclusive
          onChange={handlePatternChange}
          aria-label="eye tracking pattern"
        >
          <ToggleButton value="F" aria-label="F-pattern">
            F-Pattern
          </ToggleButton>
          <ToggleButton value="Z" aria-label="Z-pattern">
            Z-Pattern
          </ToggleButton>
          <ToggleButton value="N" aria-label="N-pattern">
            N-Pattern
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={showAnimation}
              onChange={(e) => setShowAnimation(e.target.checked)}
              size="small"
            />
            <Typography variant="body2">Animation</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
              size="small"
            />
            <Typography variant="body2">Heatmap</Typography>
          </Box>
        </Box>
      </Box>

      {/* Pattern Description */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {config.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {config.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {config.useCases.map((useCase) => (
            <Chip
              key={useCase}
              label={useCase}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Box>
      </Paper>

      {/* Visualization Area */}
      <Paper
        variant="outlined"
        sx={{
          position: 'relative',
          height: 450,
          mb: 2,
          overflow: 'hidden',
          bgcolor: 'grey.50',
        }}
      >
        <MockLayout pattern={selectedPattern} showHeatmap={showHeatmap} />
        <AnimatedPath pattern={selectedPattern} showAnimation={showAnimation} />
      </Paper>

      {/* Legend */}
      <Legend showHeatmap={showHeatmap} />

      {/* Recommendations */}
      <Box sx={{ mt: 3 }}>
        <RecommendationsSection pattern={selectedPattern} />
      </Box>
    </Box>
  )
}

export default EyeTrackingPatterns
