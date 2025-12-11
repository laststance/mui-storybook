import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useCallback, useRef, useState } from 'react'

/**
 * Duration token names available in MUI theme.
 */
type DurationKey =
  | 'shortest'
  | 'shorter'
  | 'short'
  | 'standard'
  | 'complex'
  | 'enteringScreen'
  | 'leavingScreen'

/**
 * Easing curve names available in MUI theme.
 */
type EasingKey = 'easeInOut' | 'easeOut' | 'easeIn' | 'sharp'

/**
 * Duration token definitions with their millisecond values.
 */
const DURATION_TOKENS: Array<{ key: DurationKey; label: string }> = [
  { key: 'shortest', label: 'Shortest' },
  { key: 'shorter', label: 'Shorter' },
  { key: 'short', label: 'Short' },
  { key: 'standard', label: 'Standard' },
  { key: 'complex', label: 'Complex' },
  { key: 'enteringScreen', label: 'Entering Screen' },
  { key: 'leavingScreen', label: 'Leaving Screen' },
]

/**
 * Easing curve definitions with their CSS cubic-bezier values.
 */
const EASING_TOKENS: Array<{ key: EasingKey; label: string }> = [
  { key: 'easeInOut', label: 'Ease In Out' },
  { key: 'easeOut', label: 'Ease Out' },
  { key: 'easeIn', label: 'Ease In' },
  { key: 'sharp', label: 'Sharp' },
]

/**
 * Renders a visual representation of a duration timeline bar.
 *
 * @param duration - Duration value in milliseconds
 * @param maxDuration - Maximum duration for scaling the bar width
 * @param label - Label to display for this duration
 * @returns A styled bar showing relative duration
 */
const DurationBar = ({
  duration,
  maxDuration,
  label,
}: {
  duration: number
  maxDuration: number
  label: string
}) => {
  const widthPercentage = (duration / maxDuration) * 100

  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight="medium">
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {duration}ms
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 8,
          bgcolor: 'action.hover',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${widthPercentage}%`,
            height: '100%',
            bgcolor: 'primary.main',
            borderRadius: 1,
            transition: 'width 0.3s ease-out',
          }}
        />
      </Box>
    </Box>
  )
}

/**
 * Renders a visual representation of an easing curve using SVG.
 *
 * @param easingValue - The CSS cubic-bezier value string
 * @param label - Label for the easing curve
 * @returns An SVG visualization of the bezier curve
 */
const EasingCurveVisual = ({
  easingValue,
  label,
}: {
  easingValue: string
  label: string
}) => {
  // Parse cubic-bezier values from the easing string
  const bezierMatch = easingValue.match(
    /cubic-bezier\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/,
  )

  const [x1, y1, x2, y2] = bezierMatch
    ? bezierMatch.slice(1, 5).map(Number)
    : [0.4, 0, 0.2, 1]

  // Calculate SVG path for the bezier curve
  const svgSize = 80
  const padding = 10
  const graphSize = svgSize - padding * 2

  const startX = padding
  const startY = svgSize - padding
  const endX = svgSize - padding
  const endY = padding

  const cp1X = padding + x1 * graphSize
  const cp1Y = svgSize - padding - y1 * graphSize
  const cp2X = padding + x2 * graphSize
  const cp2Y = svgSize - padding - y2 * graphSize

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        component="svg"
        width={svgSize}
        height={svgSize}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.paper',
        }}
      >
        {/* Grid lines */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={svgSize - padding}
          stroke="currentColor"
          strokeOpacity={0.1}
        />
        <line
          x1={padding}
          y1={svgSize - padding}
          x2={svgSize - padding}
          y2={svgSize - padding}
          stroke="currentColor"
          strokeOpacity={0.1}
        />
        {/* Bezier curve */}
        <path
          d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'var(--mui-palette-primary-main, #1976d2)' }}
        />
        {/* Control point indicators */}
        <circle cx={cp1X} cy={cp1Y} r={3} fill="currentColor" opacity={0.4} />
        <circle cx={cp2X} cy={cp2Y} r={3} fill="currentColor" opacity={0.4} />
      </Box>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        sx={{ fontSize: '0.65rem', fontFamily: 'monospace' }}
      >
        {easingValue}
      </Typography>
    </Box>
  )
}

/**
 * Interactive animation preview component that demonstrates transitions.
 *
 * @param duration - Duration in milliseconds
 * @param easing - CSS easing function string
 * @param onAnimate - Callback when animation is triggered
 * @returns An animated box with play button
 */
const AnimationPreview = ({
  duration,
  easing,
}: {
  duration: number
  easing: string
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState(0)
  const animationTimeoutRef = useRef<number | null>(null)

  const handleAnimate = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setPosition(1)

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // Reset after animation completes
    animationTimeoutRef.current = window.setTimeout(() => {
      setPosition(0)
      animationTimeoutRef.current = window.setTimeout(() => {
        setIsAnimating(false)
      }, duration)
    }, duration)
  }, [isAnimating, duration])

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        onClick={handleAnimate}
        disabled={isAnimating}
        sx={{ mb: 2 }}
      >
        {isAnimating ? 'Animating...' : 'Play Animation'}
      </Button>
      <Box
        sx={{
          width: '100%',
          height: 60,
          bgcolor: 'action.hover',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: position === 0 ? 10 : 'calc(100% - 50px)',
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            borderRadius: 1,
            transition: `left ${duration}ms`,
            transitionTimingFunction: easing,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: 'primary.contrastText' }}>
            Box
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

/**
 * TransitionsDemo component for visualizing MUI transitions system.
 *
 * Displays duration tokens, easing curves, and an interactive animation
 * playground that demonstrates how theme.transitions work.
 *
 * @returns A comprehensive demo of MUI transition tokens
 *
 * @example
 * // Basic usage in Storybook
 * <TransitionsDemo />
 */
const TransitionsDemo: React.FC = () => {
  const theme = useTheme()
  const [selectedDuration, setSelectedDuration] =
    useState<DurationKey>('standard')
  const [selectedEasing, setSelectedEasing] = useState<EasingKey>('easeInOut')

  const durations = theme.transitions.duration
  const easings = theme.transitions.easing

  // Find maximum duration for scaling timeline bars
  const maxDuration = Math.max(
    ...DURATION_TOKENS.map((token) => durations[token.key]),
  )

  // Get current values from theme
  const currentDuration = durations[selectedDuration]
  const currentEasing = easings[selectedEasing]

  // Generate theme.transitions.create() code
  const generatedCode = `theme.transitions.create(['transform'], {
  duration: theme.transitions.duration.${selectedDuration}, // ${currentDuration}ms
  easing: theme.transitions.easing.${selectedEasing},
})`

  const handleDurationChange = (event: SelectChangeEvent<DurationKey>) => {
    setSelectedDuration(event.target.value as DurationKey)
  }

  const handleEasingChange = (event: SelectChangeEvent<EasingKey>) => {
    setSelectedEasing(event.target.value as EasingKey)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transitions System
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        MUI provides a set of transition tokens for consistent animations across
        your application. Use theme.transitions to access durations, easings,
        and the create() helper.
      </Typography>

      {/* Duration Tokens Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Duration Tokens
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Access via <code>theme.transitions.duration</code>
        </Typography>

        {DURATION_TOKENS.map((token) => (
          <DurationBar
            key={token.key}
            duration={durations[token.key]}
            maxDuration={maxDuration}
            label={`${token.label} (${token.key})`}
          />
        ))}
      </Paper>

      {/* Easing Curves Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Easing Curves
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Access via <code>theme.transitions.easing</code>
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 3,
          }}
        >
          {EASING_TOKENS.map((token) => (
            <EasingCurveVisual
              key={token.key}
              easingValue={easings[token.key]}
              label={token.label}
            />
          ))}
        </Box>
      </Paper>

      {/* Animation Playground Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Animation Playground
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select duration and easing to preview animations and get code snippets
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="duration-select-label">Duration</InputLabel>
            <Select
              labelId="duration-select-label"
              id="duration-select"
              value={selectedDuration}
              label="Duration"
              onChange={handleDurationChange}
            >
              {DURATION_TOKENS.map((token) => (
                <MenuItem key={token.key} value={token.key}>
                  {token.label} ({durations[token.key]}ms)
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="easing-select-label">Easing</InputLabel>
            <Select
              labelId="easing-select-label"
              id="easing-select"
              value={selectedEasing}
              label="Easing"
              onChange={handleEasingChange}
            >
              {EASING_TOKENS.map((token) => (
                <MenuItem key={token.key} value={token.key}>
                  {token.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <AnimationPreview duration={currentDuration} easing={currentEasing} />

        {/* Generated Code */}
        <Typography variant="subtitle2" gutterBottom>
          Generated Code
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            bgcolor: 'grey.900',
            color: 'grey.100',
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}
        >
          <code>{generatedCode}</code>
        </Box>
      </Paper>

      {/* Timeline Bars Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Relative Durations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Visual comparison of all duration tokens showing their relative
          lengths
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {DURATION_TOKENS.map((token) => {
            const duration = durations[token.key]
            const widthPercentage = (duration / maxDuration) * 100

            return (
              <Box
                key={token.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ width: 140, flexShrink: 0 }}>
                  {token.label}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: 24,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${widthPercentage}%`,
                      height: '100%',
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      pr: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}
                    >
                      {duration}ms
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Paper>
    </Box>
  )
}

export default TransitionsDemo
