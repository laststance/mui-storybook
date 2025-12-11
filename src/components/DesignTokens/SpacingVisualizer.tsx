import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

/** MUI spacing base unit in pixels */
const SPACING_BASE_UNIT = 8

/** Default range of spacing factors to display in the scale */
const DEFAULT_SPACING_RANGE = { min: 0, max: 12 }

/** Spacing factor value (0-12 in MUI's default system) */
type SpacingFactor = number

interface SpacingRowProps {
  /** The spacing factor (multiplier for the 8px base unit) */
  factor: SpacingFactor
  /** The calculated pixel value */
  pixelValue: number
  /** Whether to show the copy button on hover */
  showCopy?: boolean
}

/**
 * Displays a single spacing value with visual bar representation.
 *
 * @param props - Component props
 * @returns A row showing the spacing factor, visual bar, and pixel value
 */
const SpacingRow = ({
  factor,
  pixelValue,
  showCopy = true,
}: SpacingRowProps) => {
  const [copied, setCopied] = useState(false)

  /**
   * Copies the theme.spacing() code snippet to clipboard.
   */
  const handleCopy = async () => {
    const code = factor === 0 ? '0' : `theme.spacing(${factor})`
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '50px 1fr 80px 40px',
        alignItems: 'center',
        gap: 2,
        py: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      {/* Factor Label */}
      <Typography
        variant="body2"
        sx={{ fontFamily: 'monospace', fontWeight: 600 }}
      >
        {factor}
      </Typography>

      {/* Visual Bar */}
      <Box
        sx={{
          position: 'relative',
          height: 24,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: pixelValue,
            minWidth: pixelValue === 0 ? 2 : undefined,
            height: 16,
            bgcolor: 'primary.main',
            borderRadius: 0.5,
            transition: 'width 0.2s ease-in-out',
          }}
        />
      </Box>

      {/* Pixel Value */}
      <Typography
        variant="body2"
        sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
      >
        {pixelValue}px
      </Typography>

      {/* Copy Button */}
      {showCopy && (
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <IconButton size="small" onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

interface InteractiveDemoProps {
  /** The spacing function from MUI theme */
  spacing: (factor: number) => string
}

/**
 * Interactive demonstration of spacing applied to boxes.
 * Allows users to adjust padding and margin values dynamically.
 *
 * @param props - Component props
 * @returns An interactive demo with sliders controlling spacing
 */
const InteractiveDemo = ({ spacing }: InteractiveDemoProps) => {
  const [padding, setPadding] = useState<number>(2)
  const [margin, setMargin] = useState<number>(1)
  const [gap, setGap] = useState<number>(2)

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Interactive Demo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Adjust the sliders to see spacing applied in real-time.
      </Typography>

      {/* Sliders */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="body2" gutterBottom>
            Padding: <code>p: {padding}</code> = {parseInt(spacing(padding))}px
          </Typography>
          <Slider
            value={padding}
            onChange={(_, value) => setPadding(value as number)}
            min={0}
            max={8}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        <Box>
          <Typography variant="body2" gutterBottom>
            Margin: <code>m: {margin}</code> = {parseInt(spacing(margin))}px
          </Typography>
          <Slider
            value={margin}
            onChange={(_, value) => setMargin(value as number)}
            min={0}
            max={8}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        <Box>
          <Typography variant="body2" gutterBottom>
            Gap: <code>gap: {gap}</code> = {parseInt(spacing(gap))}px
          </Typography>
          <Slider
            value={gap}
            onChange={(_, value) => setGap(value as number)}
            min={0}
            max={8}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>

      {/* Demo Preview */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: 'block' }}
        >
          Preview:
        </Typography>

        {/* Container with margin */}
        <Box
          sx={{
            bgcolor: 'warning.light',
            display: 'inline-block',
            borderRadius: 1,
          }}
        >
          {/* Box with padding showing margin area */}
          <Box
            sx={{
              m: margin,
              p: padding,
              bgcolor: 'primary.main',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
              Box with p:{padding}, m:{margin}
            </Typography>
          </Box>
        </Box>

        {/* Gap demonstration */}
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: 'block' }}
          >
            Gap between items:
          </Typography>
          <Stack direction="row" spacing={gap}>
            {[1, 2, 3].map((num) => (
              <Box
                key={num}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'secondary.main',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'secondary.contrastText' }}
                >
                  {num}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Generated Code */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Generated Code:
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: 'grey.900',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: 'grey.100',
            overflow: 'auto',
          }}
        >
          <pre style={{ margin: 0 }}>
            {`<Box sx={{ p: ${padding}, m: ${margin} }}>
  Content
</Box>

<Stack spacing={${gap}}>
  <Item />
  <Item />
</Stack>`}
          </pre>
        </Paper>
      </Box>
    </Paper>
  )
}

/**
 * Displays common usage examples for MUI spacing.
 *
 * @returns A section showing practical spacing usage patterns
 */
const UsageExamples = () => {
  const examples = [
    {
      title: 'Padding',
      description: 'Add inner space to elements',
      code: `<Box sx={{ p: 2 }}>  // All sides: 16px
<Box sx={{ px: 3 }}> // Horizontal: 24px
<Box sx={{ py: 1 }}> // Vertical: 8px
<Box sx={{ pt: 2, pb: 3 }}> // Top: 16px, Bottom: 24px`,
    },
    {
      title: 'Margin',
      description: 'Add outer space around elements',
      code: `<Box sx={{ m: 2 }}>  // All sides: 16px
<Box sx={{ mx: 'auto' }}> // Center horizontally
<Box sx={{ mt: 4, mb: 2 }}> // Top: 32px, Bottom: 16px`,
    },
    {
      title: 'Gap',
      description: 'Space between flex/grid children',
      code: `<Stack spacing={2}>  // 16px gap
<Box sx={{ gap: 3 }}> // 24px gap in flex/grid
<Grid container spacing={4}> // 32px gutter`,
    },
    {
      title: 'Theme Function',
      description: 'Use theme.spacing() for custom values',
      code: `const theme = useTheme()
theme.spacing(2)     // "16px"
theme.spacing(1, 2)  // "8px 16px"
theme.spacing(1, 2, 3, 4) // "8px 16px 24px 32px"`,
    },
  ]

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Usage Examples
      </Typography>
      <Stack spacing={3}>
        {examples.map((example) => (
          <Box key={example.title}>
            <Typography variant="subtitle2" gutterBottom>
              {example.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {example.description}
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'grey.900',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: 'grey.100',
                overflow: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>{example.code}</pre>
            </Paper>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

export interface SpacingVisualizerProps {
  /** Minimum spacing factor to display in the scale (default: 0) */
  minFactor?: SpacingFactor
  /** Maximum spacing factor to display in the scale (default: 12) */
  maxFactor?: SpacingFactor
  /** Whether to show the interactive demo section */
  showInteractiveDemo?: boolean
  /** Whether to show the usage examples section */
  showUsageExamples?: boolean
  /** Whether to show the visual scale section */
  showScale?: boolean
}

/**
 * SpacingVisualizer component for demonstrating MUI's spacing system.
 *
 * Visualizes the 8px base unit spacing scale and provides interactive
 * tools for understanding how spacing values translate to pixels.
 *
 * @param props - Component configuration options
 * @returns A comprehensive spacing visualization component
 *
 * @example
 * // Basic usage - shows all sections
 * <SpacingVisualizer />
 *
 * @example
 * // Custom factor range
 * <SpacingVisualizer minFactor={0} maxFactor={8} />
 *
 * @example
 * // Only show the scale
 * <SpacingVisualizer showInteractiveDemo={false} showUsageExamples={false} />
 */
const SpacingVisualizer: React.FC<SpacingVisualizerProps> = ({
  minFactor = DEFAULT_SPACING_RANGE.min,
  maxFactor = DEFAULT_SPACING_RANGE.max,
  showInteractiveDemo = true,
  showUsageExamples = true,
  showScale = true,
}) => {
  const theme = useTheme()

  /**
   * Generates an array of spacing factors from min to max.
   *
   * @returns Array of integers from minFactor to maxFactor
   */
  const generateSpacingFactors = (): SpacingFactor[] => {
    const factors: SpacingFactor[] = []
    for (let i = minFactor; i <= maxFactor; i++) {
      factors.push(i)
    }
    return factors
  }

  const spacingFactors = generateSpacingFactors()

  return (
    <Box sx={{ maxWidth: 800 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Spacing System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          MUI uses an 8px base unit for spacing. The{' '}
          <code>theme.spacing()</code> function multiplies the factor by{' '}
          {SPACING_BASE_UNIT}px to produce consistent spacing values.
        </Typography>
      </Box>

      {/* Formula */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 4,
          bgcolor: 'primary.50',
          borderColor: 'primary.200',
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontFamily: 'monospace', textAlign: 'center' }}
        >
          <strong>factor</strong> x {SPACING_BASE_UNIT}px ={' '}
          <strong>result</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 1 }}
        >
          Example: theme.spacing(2) = 2 x 8px = 16px
        </Typography>
      </Paper>

      <Stack spacing={4}>
        {/* Visual Scale */}
        {showScale && (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Visual Scale
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Spacing values from {minFactor} to {maxFactor}. Click the copy
              button to copy the code snippet.
            </Typography>

            {/* Scale Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '50px 1fr 80px 40px',
                gap: 2,
                pb: 1,
                borderBottom: 1,
                borderColor: 'divider',
                mb: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Factor
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Visual
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Pixels
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Copy
              </Typography>
            </Box>

            {/* Spacing Rows */}
            {spacingFactors.map((factor) => (
              <SpacingRow
                key={factor}
                factor={factor}
                pixelValue={factor * SPACING_BASE_UNIT}
              />
            ))}
          </Paper>
        )}

        {/* Interactive Demo */}
        {showInteractiveDemo && <InteractiveDemo spacing={theme.spacing} />}

        {/* Usage Examples */}
        {showUsageExamples && <UsageExamples />}
      </Stack>
    </Box>
  )
}

export default SpacingVisualizer
