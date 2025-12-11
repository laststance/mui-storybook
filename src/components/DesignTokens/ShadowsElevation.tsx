import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'

/**
 * Maps elevation levels to their recommended component usage.
 * Based on Material Design elevation guidelines.
 */
const ELEVATION_GUIDELINES: Record<number, string> = {
  0: 'Flat surfaces, no shadow',
  1: 'Cards at rest, Switch',
  2: 'Raised buttons, Search bar',
  3: 'Refresh indicator, Quick entry',
  4: 'App bar, FAB at rest',
  6: 'Snackbar, FAB (pressed)',
  8: 'Bottom navigation, Menu, Picker dialogs',
  9: 'Sub menu',
  12: 'Floating action button (pressed)',
  16: 'Navigation drawer, Modal side sheet',
  24: 'Dialog, Modal bottom sheet',
}

/**
 * Returns the usage guideline for a given elevation level.
 * Falls back to generic description for undocumented levels.
 *
 * @param elevation - The elevation level (0-24)
 * @returns Usage guideline string
 * @example
 * getElevationGuideline(0) // => "Flat surfaces, no shadow"
 * getElevationGuideline(5) // => "Intermediate elevation"
 */
const getElevationGuideline = (elevation: number): string => {
  return ELEVATION_GUIDELINES[elevation] ?? 'Intermediate elevation'
}

interface ElevationBoxProps {
  /**
   * The elevation level to display (0-24).
   */
  elevation: number
  /**
   * The CSS box-shadow value from theme.
   */
  shadowValue: string
  /**
   * Whether to show the CSS value on hover.
   * @default true
   */
  showCssValue?: boolean
}

/**
 * Displays a single elevation level with its index and optional CSS value tooltip.
 */
const ElevationBox: React.FC<ElevationBoxProps> = ({
  elevation,
  shadowValue,
  showCssValue = true,
}) => {
  const content = (
    <Paper
      elevation={elevation}
      sx={{
        width: 100,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Typography variant="h5" component="span" fontWeight="bold">
        {elevation}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        elevation
      </Typography>
    </Paper>
  )

  if (!showCssValue) {
    return content
  }

  return (
    <Tooltip
      title={
        <Box sx={{ maxWidth: 300 }}>
          <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
            <strong>Usage:</strong> {getElevationGuideline(elevation)}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              wordBreak: 'break-all',
            }}
          >
            {shadowValue || 'none'}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
    >
      {content}
    </Tooltip>
  )
}

interface InteractiveElevationProps {
  /**
   * Initial elevation value.
   * @default 4
   */
  defaultElevation?: number
}

/**
 * Interactive component allowing users to adjust elevation with a slider.
 */
const InteractiveElevation: React.FC<InteractiveElevationProps> = ({
  defaultElevation = 4,
}) => {
  const theme = useTheme()
  const [elevation, setElevation] = React.useState(defaultElevation)

  const shadowValue = theme.shadows[elevation]

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Paper
        elevation={elevation}
        sx={{
          width: 200,
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Typography variant="h3" component="span" fontWeight="bold">
          {elevation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          elevation
        </Typography>
      </Paper>

      <Box sx={{ px: 2 }}>
        <Typography gutterBottom>Elevation: {elevation}</Typography>
        <Slider
          value={elevation}
          onChange={(_, newValue) => setElevation(newValue as number)}
          min={0}
          max={24}
          step={1}
          marks={[
            { value: 0, label: '0' },
            { value: 8, label: '8' },
            { value: 16, label: '16' },
            { value: 24, label: '24' },
          ]}
          valueLabelDisplay="auto"
          aria-label="Elevation level"
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Usage Guideline
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {getElevationGuideline(elevation)}
        </Typography>

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          CSS Value
        </Typography>
        <Box
          sx={{
            p: 1.5,
            bgcolor: 'grey.100',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            wordBreak: 'break-all',
            maxHeight: 100,
            overflow: 'auto',
          }}
        >
          <code>{shadowValue || 'none'}</code>
        </Box>
      </Box>
    </Box>
  )
}

interface ShadowsElevationProps {
  /**
   * Whether to show interactive slider component.
   * @default false
   */
  showInteractive?: boolean
  /**
   * Whether to show CSS values on hover.
   * @default true
   */
  showCssValues?: boolean
  /**
   * Number of columns in the grid.
   * @default 5
   */
  columns?: number
}

/**
 * ShadowsElevation component visualizes all 25 MUI shadow elevation levels (0-24).
 *
 * Features:
 * - Grid display of all elevation levels
 * - Paper components showing each elevation
 * - Tooltip with usage guidelines and CSS values
 * - Optional interactive slider for single elevation exploration
 *
 * @param props - Component props
 * @returns React component displaying MUI elevation system
 *
 * @example
 * // Basic usage - shows all 25 elevations
 * <ShadowsElevation />
 *
 * @example
 * // With interactive slider
 * <ShadowsElevation showInteractive />
 *
 * @example
 * // Custom columns without CSS tooltips
 * <ShadowsElevation columns={4} showCssValues={false} />
 */
const ShadowsElevation: React.FC<ShadowsElevationProps> = ({
  showInteractive = false,
  showCssValues = true,
  columns = 5,
}) => {
  const theme = useTheme()
  const elevationLevels = Array.from({ length: 25 }, (_, i) => i)

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shadow Elevations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          MUI provides 25 elevation levels (0-24) that correspond to different
          shadow depths. Hover over each box to see the usage guideline and CSS
          value.
        </Typography>
      </Box>

      {/* Elevation Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {elevationLevels.map((elevation) => (
          <Grid key={elevation} size={{ xs: 6, sm: 4, md: 12 / columns }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ElevationBox
                elevation={elevation}
                shadowValue={theme.shadows[elevation]}
                showCssValue={showCssValues}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Usage Guidelines Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recommended Usage
        </Typography>
        <Grid container spacing={1}>
          {Object.entries(ELEVATION_GUIDELINES).map(([level, usage]) => (
            <Grid key={level} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                  py: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    fontWeight: 'bold',
                    minWidth: 24,
                  }}
                >
                  {level}:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {usage}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Interactive Section */}
      {showInteractive && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Interactive Elevation
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Use the slider to explore different elevation levels and see their
            corresponding shadows.
          </Typography>
          <InteractiveElevation />
        </Box>
      )}
    </Box>
  )
}

export default ShadowsElevation
export { ElevationBox, InteractiveElevation, ELEVATION_GUIDELINES }
