import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback } from 'react'

/**
 * WCAG contrast ratio thresholds
 * - AAA Large Text: 4.5:1
 * - AA Normal Text: 4.5:1
 * - AAA Normal Text: 7:1
 */
const WCAG_AA_THRESHOLD = 4.5
const WCAG_AAA_THRESHOLD = 7

/**
 * Parses a color string to RGB values.
 *
 * @param color - The color string (hex, rgb, or rgba format)
 * @returns RGB values as an object with r, g, b properties, or null if parsing fails
 *
 * @example
 * parseColorToRgb('#ff0000') // => { r: 255, g: 0, b: 0 }
 * parseColorToRgb('rgba(255, 0, 0, 0.5)') // => { r: 255, g: 0, b: 0 }
 */
const parseColorToRgb = (
  color: string,
): { r: number; g: number; b: number } | null => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      }
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      }
    }
  }

  // Handle rgb/rgba colors
  const rgbaMatch = color.match(
    /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+\s*)?\)/,
  )
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
    }
  }

  return null
}

/**
 * Calculates the relative luminance of a color.
 * Based on WCAG 2.1 specification.
 *
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns The relative luminance value (0-1)
 *
 * @example
 * getRelativeLuminance(255, 255, 255) // => 1 (white)
 * getRelativeLuminance(0, 0, 0) // => 0 (black)
 */
const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const srgb = c / 255
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * @param color1 - The first color string
 * @param color2 - The second color string
 * @returns The contrast ratio (1-21), or null if colors cannot be parsed
 *
 * @example
 * getContrastRatio('#000000', '#ffffff') // => 21
 * getContrastRatio('#ffffff', '#ffffff') // => 1
 */
const getContrastRatio = (color1: string, color2: string): number | null => {
  const rgb1 = parseColorToRgb(color1)
  const rgb2 = parseColorToRgb(color2)

  if (!rgb1 || !rgb2) return null

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Determines the WCAG compliance level based on contrast ratio.
 *
 * @param ratio - The contrast ratio value
 * @returns
 * - 'AAA': When ratio >= 7 (highest compliance)
 * - 'AA': When ratio >= 4.5 (acceptable compliance)
 * - 'Fail': When ratio < 4.5 (does not meet minimum requirements)
 *
 * @example
 * getWcagLevel(8.5) // => 'AAA'
 * getWcagLevel(5.2) // => 'AA'
 * getWcagLevel(3.1) // => 'Fail'
 */
const getWcagLevel = (ratio: number): 'AAA' | 'AA' | 'Fail' => {
  if (ratio >= WCAG_AAA_THRESHOLD) return 'AAA'
  if (ratio >= WCAG_AA_THRESHOLD) return 'AA'
  return 'Fail'
}

/**
 * Determines appropriate text color for a given background color.
 *
 * @param bgColor - The background color string
 * @returns '#000000' for light backgrounds, '#ffffff' for dark backgrounds
 *
 * @example
 * getTextColorForBackground('#ffffff') // => '#000000'
 * getTextColorForBackground('#000000') // => '#ffffff'
 */
const getTextColorForBackground = (bgColor: string): string => {
  const rgb = parseColorToRgb(bgColor)
  if (!rgb) return '#000000'

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b)
  return luminance > 0.179 ? '#000000' : '#ffffff'
}

interface ColorSwatchProps {
  /** The name/label of the color */
  name: string
  /** The color value (hex, rgb, or rgba) */
  color: string
  /** The background color for contrast calculation */
  bgColor: string
  /** Callback when the color is copied */
  onCopy: (color: string) => void
}

/**
 * A single color swatch component that displays a color with its value
 * and WCAG compliance information.
 */
const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  color,
  bgColor,
  onCopy,
}) => {
  const contrastRatio = getContrastRatio(color, bgColor)
  const wcagLevel = contrastRatio ? getWcagLevel(contrastRatio) : null
  const textColor = getTextColorForBackground(color)

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(color)
    onCopy(color)
  }, [color, onCopy])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick()
      }
    },
    [handleClick],
  )

  return (
    <Tooltip
      title={`Click to copy: ${color}${contrastRatio ? ` | Contrast: ${contrastRatio.toFixed(2)}:1` : ''}`}
    >
      <Paper
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Copy ${name} color: ${color}`}
        sx={{
          p: 2,
          cursor: 'pointer',
          backgroundColor: color,
          color: textColor,
          minHeight: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 4,
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: textColor }}
        >
          {name}
        </Typography>
        <Box>
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', color: textColor }}
          >
            {color}
          </Typography>
          {wcagLevel && wcagLevel !== 'Fail' && (
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={wcagLevel}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  px: 1.25,
                  backgroundColor: wcagLevel === 'AAA' ? '#2e7d32' : '#ed6c02',
                  color: '#ffffff',
                }}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Tooltip>
  )
}

interface ColorSectionProps {
  /** The title of the section */
  title: string
  /** The colors to display in the section */
  colors: Array<{ name: string; value: string }>
  /** The background color for contrast calculations */
  bgColor: string
  /** Callback when a color is copied */
  onCopy: (color: string) => void
}

/**
 * A section of colors with a title and grid of swatches.
 */
const ColorSection: React.FC<ColorSectionProps> = ({
  title,
  colors,
  bgColor,
  onCopy,
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {colors.map(({ name, value }) => (
        <Grid key={name} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <ColorSwatch
            name={name}
            color={value}
            bgColor={bgColor}
            onCopy={onCopy}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
)

export interface PaletteVisualizerProps {
  /** Show semantic colors (primary, secondary, error, etc.) */
  showSemanticColors?: boolean
  /** Show grey scale palette */
  showGreyScale?: boolean
  /** Show text colors */
  showTextColors?: boolean
  /** Show background colors */
  showBackgroundColors?: boolean
  /** Show action colors */
  showActionColors?: boolean
  /** Show common colors (black, white) */
  showCommonColors?: boolean
  /** Show divider color */
  showDividerColor?: boolean
}

/**
 * A comprehensive palette visualizer that displays all MUI theme colors
 * with WCAG contrast ratio compliance indicators.
 *
 * @remarks
 * - Uses the current MUI theme via `useTheme` hook
 * - Displays semantic colors, grey scale, text, background, action, and common colors
 * - Each swatch shows the color value and WCAG AA/AAA compliance badges
 * - Click any swatch to copy the color value to clipboard
 */
const PaletteVisualizer: React.FC<PaletteVisualizerProps> = ({
  showSemanticColors = true,
  showGreyScale = true,
  showTextColors = true,
  showBackgroundColors = true,
  showActionColors = true,
  showCommonColors = true,
  showDividerColor = true,
}) => {
  const theme = useTheme()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [copiedColor, setCopiedColor] = useState('')

  const handleCopy = useCallback((color: string) => {
    setCopiedColor(color)
    setSnackbarOpen(true)
  }, [])

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false)
  }, [])

  const bgColor = theme.palette.background.default

  // Semantic colors with main/light/dark/contrastText variants
  const semanticColorGroups = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ] as const

  const semanticColors = semanticColorGroups.flatMap((colorName) => {
    const colorGroup = theme.palette[colorName]
    return [
      { name: `${colorName}.main`, value: colorGroup.main },
      { name: `${colorName}.light`, value: colorGroup.light },
      { name: `${colorName}.dark`, value: colorGroup.dark },
      { name: `${colorName}.contrastText`, value: colorGroup.contrastText },
    ]
  })

  // Grey scale values
  const greyColors = [
    { name: 'grey.50', value: theme.palette.grey[50] },
    { name: 'grey.100', value: theme.palette.grey[100] },
    { name: 'grey.200', value: theme.palette.grey[200] },
    { name: 'grey.300', value: theme.palette.grey[300] },
    { name: 'grey.400', value: theme.palette.grey[400] },
    { name: 'grey.500', value: theme.palette.grey[500] },
    { name: 'grey.600', value: theme.palette.grey[600] },
    { name: 'grey.700', value: theme.palette.grey[700] },
    { name: 'grey.800', value: theme.palette.grey[800] },
    { name: 'grey.900', value: theme.palette.grey[900] },
    { name: 'grey.A100', value: theme.palette.grey.A100 },
    { name: 'grey.A200', value: theme.palette.grey.A200 },
    { name: 'grey.A400', value: theme.palette.grey.A400 },
    { name: 'grey.A700', value: theme.palette.grey.A700 },
  ]

  // Text colors
  const textColors = [
    { name: 'text.primary', value: theme.palette.text.primary },
    { name: 'text.secondary', value: theme.palette.text.secondary },
    { name: 'text.disabled', value: theme.palette.text.disabled },
  ]

  // Background colors
  const backgroundColors = [
    { name: 'background.default', value: theme.palette.background.default },
    { name: 'background.paper', value: theme.palette.background.paper },
  ]

  // Action colors
  const actionColors = [
    { name: 'action.active', value: theme.palette.action.active },
    { name: 'action.hover', value: theme.palette.action.hover },
    { name: 'action.selected', value: theme.palette.action.selected },
    { name: 'action.disabled', value: theme.palette.action.disabled },
    {
      name: 'action.disabledBackground',
      value: theme.palette.action.disabledBackground,
    },
    { name: 'action.focus', value: theme.palette.action.focus },
  ]

  // Common colors
  const commonColors = [
    { name: 'common.black', value: theme.palette.common.black },
    { name: 'common.white', value: theme.palette.common.white },
  ]

  // Divider color
  const dividerColors = [{ name: 'divider', value: theme.palette.divider }]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        MUI Palette Visualizer
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Current mode: <strong>{theme.palette.mode}</strong> | Click any color to
        copy its value
      </Typography>

      {/* WCAG Legend */}
      <Paper sx={{ p: 2, mb: 4 }} variant="outlined">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          WCAG Contrast Ratio Legend (against background.default)
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              label="AAA"
              size="small"
              sx={{
                backgroundColor: '#2e7d32',
                color: '#fff',
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 500,
                px: 1.25,
              }}
            />
            <Typography variant="caption">7:1+ (Enhanced)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              label="AA"
              size="small"
              sx={{
                backgroundColor: '#ed6c02',
                color: '#fff',
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 500,
                px: 1.25,
              }}
            />
            <Typography variant="caption">4.5:1+ (Minimum)</Typography>
          </Box>
        </Box>
      </Paper>

      {showSemanticColors && (
        <ColorSection
          title="Semantic Colors"
          colors={semanticColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      {showGreyScale && (
        <ColorSection
          title="Grey Scale"
          colors={greyColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      {showTextColors && (
        <ColorSection
          title="Text Colors"
          colors={textColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      {showBackgroundColors && (
        <ColorSection
          title="Background Colors"
          colors={backgroundColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      {showActionColors && (
        <ColorSection
          title="Action Colors"
          colors={actionColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      {showCommonColors && (
        <ColorSection
          title="Common Colors"
          colors={commonColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      {showDividerColor && (
        <ColorSection
          title="Divider Color"
          colors={dividerColors}
          bgColor={bgColor}
          onCopy={handleCopy}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={`Copied: ${copiedColor}`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

export default PaletteVisualizer
