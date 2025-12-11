import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useTheme, type Theme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { TypographyProps } from '@mui/material/Typography'

/**
 * Typography variant type matching MUI's typography variant prop.
 */
type TypographyVariant = NonNullable<TypographyProps['variant']>

/**
 * All MUI typography variants to showcase (excluding 'inherit').
 */
const TYPOGRAPHY_VARIANTS: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
]

/**
 * Font weight mapping for display purposes.
 */
const FONT_WEIGHT_NAMES: Record<number, string> = {
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  700: 'Bold',
}

/**
 * Default sample text for each typography variant.
 */
const DEFAULT_SAMPLE_TEXT: Record<string, string> = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  subtitle1: 'Subtitle 1 - Supporting text',
  subtitle2: 'Subtitle 2 - Supporting text',
  body1:
    'Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  body2:
    'Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
  button: 'BUTTON TEXT',
  caption: 'Caption text - smaller annotations',
  overline: 'OVERLINE TEXT',
}

/**
 * Converts rem value to pixels.
 *
 * @param remValue - The rem value as a string (e.g., "2.125rem")
 * @param baseFontSize - The base font size in pixels (default: 16)
 * @returns The pixel value as a string (e.g., "34px") or the original value if not in rem
 *
 * @example
 * remToPx("2.125rem") // => "34px"
 * remToPx("16px") // => "16px"
 */
const remToPx = (remValue: string | number, baseFontSize = 16): string => {
  if (typeof remValue === 'number') {
    return `${remValue}px`
  }
  if (remValue.endsWith('rem')) {
    const numericValue = parseFloat(remValue)
    return `${Math.round(numericValue * baseFontSize)}px`
  }
  return remValue
}

/**
 * Typography style values extracted from the theme.
 */
interface TypographyStyleValues {
  fontSize: string
  fontWeight: string | number
  lineHeight: string | number
  letterSpacing: string
}

/**
 * Extracts typography style properties from a theme typography variant.
 *
 * @param theme - The MUI theme object
 * @param variant - The typography variant to extract
 * @returns An object containing fontSize, fontWeight, lineHeight, and letterSpacing
 *
 * @example
 * getTypographyStyles(theme, 'h1') // => { fontSize: '6rem', fontWeight: 300, lineHeight: 1.167, letterSpacing: '-0.01562em' }
 */
const getTypographyStyles = (
  theme: Theme,
  variant: TypographyVariant,
): TypographyStyleValues => {
  // Access typography variant styles safely using type assertion
  // since MUI's theme.typography contains all variant keys
  const styles = theme.typography[variant as keyof typeof theme.typography]

  if (typeof styles === 'object' && styles !== null) {
    const typedStyles = styles as {
      fontSize?: string | number
      fontWeight?: string | number
      lineHeight?: string | number
      letterSpacing?: string
    }
    return {
      fontSize: String(typedStyles.fontSize ?? 'inherit'),
      fontWeight: typedStyles.fontWeight ?? 'inherit',
      lineHeight: typedStyles.lineHeight ?? 'inherit',
      letterSpacing: String(typedStyles.letterSpacing ?? 'normal'),
    }
  }

  return {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'normal',
  }
}

export interface TypographyShowcaseProps {
  /**
   * Whether to show the interactive text editor.
   * @default true
   */
  showEditor?: boolean
  /**
   * Whether to show the font weights section.
   * @default true
   */
  showFontWeights?: boolean
  /**
   * Whether to show the font family information.
   * @default true
   */
  showFontFamily?: boolean
  /**
   * Initial sample text for the editor.
   * @default "The quick brown fox jumps over the lazy dog"
   */
  initialSampleText?: string
}

/**
 * A comprehensive showcase component displaying all MUI typography variants
 * with live previews, technical details, and optional interactive editing.
 *
 * Features:
 * - Live preview of each typography variant
 * - CSS properties table (fontSize, lineHeight, fontWeight, letterSpacing)
 * - rem to px conversion display
 * - Font family and font weights display
 * - Optional interactive text editor
 *
 * @example
 * <TypographyShowcase />
 *
 * @example
 * <TypographyShowcase showEditor={false} showFontWeights={false} />
 */
const TypographyShowcase: React.FC<TypographyShowcaseProps> = ({
  showEditor = true,
  showFontWeights = true,
  showFontFamily = true,
  initialSampleText = 'The quick brown fox jumps over the lazy dog',
}) => {
  const theme = useTheme()
  const [customText, setCustomText] = useState(initialSampleText)

  const fontFamily = theme.typography.fontFamily

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Typography System
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        A comprehensive showcase of all MUI typography variants with their CSS
        properties and visual previews.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Font Family Section */}
      {showFontFamily && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Font Family
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography
              variant="body2"
              component="code"
              sx={{
                fontFamily: 'monospace',
                wordBreak: 'break-word',
              }}
            >
              {fontFamily}
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Font Weights Section */}
      {showFontWeights && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Font Weights
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Paper variant="outlined" sx={{ p: 2, minWidth: 150 }}>
              <Typography
                sx={{ fontWeight: theme.typography.fontWeightLight }}
                gutterBottom
              >
                Light (300)
              </Typography>
              <Chip
                label={`fontWeightLight: ${theme.typography.fontWeightLight}`}
                size="small"
                variant="outlined"
              />
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, minWidth: 150 }}>
              <Typography
                sx={{ fontWeight: theme.typography.fontWeightRegular }}
                gutterBottom
              >
                Regular (400)
              </Typography>
              <Chip
                label={`fontWeightRegular: ${theme.typography.fontWeightRegular}`}
                size="small"
                variant="outlined"
              />
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, minWidth: 150 }}>
              <Typography
                sx={{ fontWeight: theme.typography.fontWeightMedium }}
                gutterBottom
              >
                Medium (500)
              </Typography>
              <Chip
                label={`fontWeightMedium: ${theme.typography.fontWeightMedium}`}
                size="small"
                variant="outlined"
              />
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, minWidth: 150 }}>
              <Typography
                sx={{ fontWeight: theme.typography.fontWeightBold }}
                gutterBottom
              >
                Bold (700)
              </Typography>
              <Chip
                label={`fontWeightBold: ${theme.typography.fontWeightBold}`}
                size="small"
                variant="outlined"
              />
            </Paper>
          </Box>
        </Box>
      )}

      {/* Interactive Editor */}
      {showEditor && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Interactive Preview
          </Typography>
          <TextField
            fullWidth
            label="Custom Sample Text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            helperText="Edit the text to preview across all typography variants"
            sx={{ mb: 2 }}
          />
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Typography Variants Showcase */}
      <Typography variant="h5" gutterBottom>
        Typography Variants
      </Typography>

      {TYPOGRAPHY_VARIANTS.map((variant) => {
        const styles = getTypographyStyles(theme, variant)
        const sampleText = showEditor
          ? customText
          : DEFAULT_SAMPLE_TEXT[variant]

        return (
          <Box key={variant} sx={{ mb: 4 }}>
            {/* Variant Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 1,
              }}
            >
              <Chip
                label={variant}
                color="primary"
                size="small"
                sx={{ fontWeight: 600, textTransform: 'uppercase' }}
              />
              <Typography variant="body2" color="text.secondary">
                {getFontWeightName(styles.fontWeight)}
              </Typography>
            </Box>

            {/* Live Preview */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                overflow: 'hidden',
                bgcolor: 'background.default',
              }}
            >
              <Typography variant={variant}>{sampleText}</Typography>
            </Paper>

            {/* CSS Properties Table */}
            <TableContainer component={Paper} variant="outlined">
              <Table size="small" aria-label={`${variant} CSS properties`}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Property</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      Computed (px)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        fontSize
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        {styles.fontSize}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="code"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: 'primary.main',
                        }}
                      >
                        {remToPx(styles.fontSize)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        fontWeight
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        {styles.fontWeight}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="code"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: 'text.secondary',
                        }}
                      >
                        {getFontWeightName(styles.fontWeight)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        lineHeight
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        {styles.lineHeight}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        letterSpacing
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography
                        component="code"
                        sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                      >
                        {styles.letterSpacing}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )
      })}
    </Box>
  )
}

/**
 * Returns a human-readable name for a font weight value.
 *
 * @param weight - The font weight value (number or string)
 * @returns The font weight name (e.g., "Regular") or the original value
 *
 * @example
 * getFontWeightName(400) // => "Regular"
 * getFontWeightName(700) // => "Bold"
 */
const getFontWeightName = (weight: string | number): string => {
  const numericWeight =
    typeof weight === 'string' ? parseInt(weight, 10) : weight
  return FONT_WEIGHT_NAMES[numericWeight] ?? String(weight)
}

export default TypographyShowcase
