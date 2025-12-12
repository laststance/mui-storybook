import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import React from 'react'

/**
 * Configuration for a single ribbon band.
 */
export interface RibbonBand {
  /**
   * Unique identifier for the band.
   */
  id: string
  /**
   * Content to render inside the band.
   */
  content: React.ReactNode
  /**
   * Background color of the band. Supports hex, rgba, or theme tokens.
   */
  backgroundColor?: string
  /**
   * Background image URL for the band.
   */
  backgroundImage?: string
  /**
   * Text/content color within the band.
   * @default 'inherit'
   */
  color?: string
  /**
   * Vertical padding for the band.
   * @default 'medium'
   */
  padding?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * Maximum width for the content container. Set to false for full width.
   * @default 'lg'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
}

/**
 * Props for the RibbonLayout component.
 */
export interface RibbonLayoutProps {
  /**
   * Array of ribbon band configurations.
   */
  bands: RibbonBand[]
  /**
   * Whether to alternate background colors automatically.
   * @default false
   */
  alternateColors?: boolean
  /**
   * Primary alternating color (used for odd-indexed bands).
   */
  primaryColor?: string
  /**
   * Secondary alternating color (used for even-indexed bands).
   */
  secondaryColor?: string
}

/**
 * Mapping from padding size to MUI spacing values.
 */
const PADDING_MAP: Record<string, number> = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
}

/**
 * RibbonLayout creates a page with full-width horizontal bands, each with
 * independent backgrounds, colors, and content containers.
 *
 * This layout is ideal for marketing pages, landing pages, and any design
 * that requires visually distinct sections with alternating backgrounds.
 *
 * @param props - Component props.
 * @returns A full-width ribbon layout with horizontal bands.
 *
 * @example
 * // Marketing page with alternating sections
 * <RibbonLayout
 *   bands={[
 *     { id: 'hero', content: <HeroSection />, backgroundColor: '#1976d2', color: '#fff' },
 *     { id: 'features', content: <FeaturesGrid />, backgroundColor: '#f5f5f5' },
 *     { id: 'testimonials', content: <Testimonials />, backgroundColor: '#fff' },
 *     { id: 'cta', content: <CallToAction />, backgroundColor: '#388e3c', color: '#fff' },
 *   ]}
 * />
 *
 * @example
 * // Auto-alternating colors
 * <RibbonLayout
 *   alternateColors
 *   primaryColor="#ffffff"
 *   secondaryColor="#f0f0f0"
 *   bands={bands}
 * />
 */
const RibbonLayout: React.FC<RibbonLayoutProps> = ({
  bands,
  alternateColors = false,
  primaryColor,
  secondaryColor,
}) => {
  const theme = useTheme()

  const defaultPrimary =
    primaryColor || (theme.palette.mode === 'dark' ? '#121212' : '#ffffff')
  const defaultSecondary =
    secondaryColor || (theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5')

  return (
    <Box sx={{ width: '100%' }}>
      {bands.map((band, index) => {
        const {
          id,
          content,
          backgroundColor,
          backgroundImage,
          color = 'inherit',
          padding = 'medium',
          maxWidth = 'lg',
        } = band

        // Determine background color
        let bgColor = backgroundColor
        if (!bgColor && alternateColors) {
          bgColor = index % 2 === 0 ? defaultPrimary : defaultSecondary
        }

        const paddingValue = PADDING_MAP[padding]

        return (
          <Box
            key={id}
            component="section"
            aria-label={`Section ${id}`}
            sx={{
              width: '100%',
              backgroundColor: bgColor || 'transparent',
              color: color,
              ...(backgroundImage && {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }),
            }}
          >
            {maxWidth === false ? (
              <Box sx={{ py: paddingValue, px: 2 }}>{content}</Box>
            ) : (
              <Container maxWidth={maxWidth} sx={{ py: paddingValue }}>
                {content}
              </Container>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default RibbonLayout
