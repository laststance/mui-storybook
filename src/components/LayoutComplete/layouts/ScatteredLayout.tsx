import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { keyframes } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useMemo } from 'react'

/**
 * Represents a floating element in the scattered layout.
 */
export interface FloatingElement {
  /** Unique identifier */
  id: string
  /** Element content (text, icon, or component) */
  content: React.ReactNode
  /** Horizontal position (percentage) */
  x: number
  /** Vertical position (percentage) */
  y: number
  /** Size category */
  size: 'small' | 'medium' | 'large'
  /** Background color or gradient */
  background?: string
  /** Text color */
  color?: string
  /** Rotation angle in degrees */
  rotation?: number
  /** Animation type */
  animation?: 'float' | 'pulse' | 'rotate' | 'none'
  /** Animation duration in seconds */
  animationDuration?: number
  /** Z-index for stacking */
  zIndex?: number
  /** Border radius (0-100 for shape variation) */
  borderRadius?: number
  /** Opacity (0-1) */
  opacity?: number
}

/**
 * Props for the ScatteredLayout component.
 */
export interface ScatteredLayoutProps {
  /**
   * Floating elements to display.
   */
  elements?: FloatingElement[]
  /**
   * Whether to show the default event content.
   * @default true
   */
  showEventContent?: boolean
  /**
   * Event title.
   * @default 'Summer Music Festival 2025'
   */
  eventTitle?: string
  /**
   * Event subtitle/tagline.
   * @default 'The Ultimate Musical Experience'
   */
  eventSubtitle?: string
  /**
   * Event date string.
   * @default 'July 15-17, 2025'
   */
  eventDate?: string
  /**
   * Event location.
   * @default 'Central Park, New York'
   */
  eventLocation?: string
  /**
   * CTA button text.
   * @default 'Get Tickets'
   */
  ctaText?: string
  /**
   * Width of the layout.
   * @default '100%'
   */
  width?: string | number
  /**
   * Height of the layout in pixels.
   * @default 600
   */
  height?: number
  /**
   * Background color or gradient.
   * @default 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
   */
  background?: string
  /**
   * Whether to enable animations.
   * @default true
   */
  animated?: boolean
  /**
   * Callback when CTA button is clicked.
   */
  onCtaClick?: () => void
  /**
   * Callback when a floating element is clicked.
   */
  onElementClick?: (elementId: string) => void
}

/**
 * Keyframe animations for floating elements.
 */
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

/**
 * Default floating elements for event promotion.
 */
const DEFAULT_ELEMENTS: FloatingElement[] = [
  {
    id: 'star-1',
    content: <StarIcon sx={{ fontSize: 40 }} />,
    x: 10,
    y: 15,
    size: 'medium',
    background: 'rgba(255, 215, 0, 0.2)',
    color: '#ffd700',
    rotation: 15,
    animation: 'float',
    animationDuration: 3,
    zIndex: 2,
    borderRadius: 50,
  },
  {
    id: 'music-1',
    content: <MusicNoteIcon sx={{ fontSize: 32 }} />,
    x: 85,
    y: 20,
    size: 'small',
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    rotation: -10,
    animation: 'pulse',
    animationDuration: 2,
    zIndex: 2,
    borderRadius: 50,
  },
  {
    id: 'tag-1',
    content: 'LIVE',
    x: 75,
    y: 70,
    size: 'small',
    background: '#ff4757',
    color: '#ffffff',
    rotation: 5,
    animation: 'pulse',
    animationDuration: 1.5,
    zIndex: 3,
    borderRadius: 4,
  },
  {
    id: 'star-2',
    content: <StarIcon sx={{ fontSize: 24 }} />,
    x: 5,
    y: 75,
    size: 'small',
    background: 'rgba(255, 215, 0, 0.15)',
    color: '#ffd700',
    rotation: -20,
    animation: 'float',
    animationDuration: 4,
    zIndex: 1,
    borderRadius: 50,
  },
  {
    id: 'circle-1',
    content: '',
    x: 90,
    y: 85,
    size: 'large',
    background: 'rgba(255, 255, 255, 0.1)',
    rotation: 0,
    animation: 'float',
    animationDuration: 5,
    zIndex: 0,
    borderRadius: 50,
    opacity: 0.6,
  },
  {
    id: 'circle-2',
    content: '',
    x: 15,
    y: 45,
    size: 'medium',
    background: 'rgba(255, 255, 255, 0.08)',
    rotation: 0,
    animation: 'float',
    animationDuration: 6,
    zIndex: 0,
    borderRadius: 50,
    opacity: 0.5,
  },
  {
    id: 'tag-2',
    content: 'VIP',
    x: 20,
    y: 85,
    size: 'small',
    background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
    color: '#ffffff',
    rotation: -8,
    animation: 'none',
    zIndex: 3,
    borderRadius: 4,
  },
  {
    id: 'music-2',
    content: <MusicNoteIcon sx={{ fontSize: 48 }} />,
    x: 92,
    y: 45,
    size: 'large',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.6)',
    rotation: 15,
    animation: 'rotate',
    animationDuration: 10,
    zIndex: 1,
    borderRadius: 50,
  },
]

/**
 * Get size dimensions for a floating element.
 * @param size - Size category.
 * @returns Width and height in pixels.
 */
const getSizeDimensions = (size: 'small' | 'medium' | 'large'): number => {
  const sizeMap = {
    small: 48,
    medium: 72,
    large: 100,
  }
  return sizeMap[size]
}

/**
 * Get animation CSS for a floating element.
 * @param animation - Animation type.
 * @param duration - Animation duration.
 * @param rotation - Initial rotation.
 * @returns Animation CSS object.
 */
const getAnimationStyles = (
  animation: 'float' | 'pulse' | 'rotate' | 'none',
  duration: number,
  rotation: number,
): Record<string, unknown> => {
  const baseTransform = rotation !== 0 ? `rotate(${rotation}deg)` : undefined

  switch (animation) {
    case 'float':
      return {
        animation: `${floatAnimation} ${duration}s ease-in-out infinite`,
        transform: baseTransform,
      }
    case 'pulse':
      return {
        animation: `${pulseAnimation} ${duration}s ease-in-out infinite`,
        transform: baseTransform,
      }
    case 'rotate':
      return {
        animation: `${rotateAnimation} ${duration}s linear infinite`,
      }
    case 'none':
    default:
      return {
        transform: baseTransform,
      }
  }
}

/**
 * ScatteredLayout demonstrates a freeform scattered elements pattern.
 *
 * This layout pattern places elements in seemingly random positions,
 * creating a dynamic and creative visual effect. It's commonly used
 * for event promotions, creative portfolios, and artistic websites.
 *
 * @param props - The component props.
 * @returns A React component demonstrating the scattered layout pattern.
 *
 * @example
 * // Event promotion with default floating elements
 * <ScatteredLayout
 *   eventTitle="Concert 2025"
 *   onCtaClick={() => console.log('Get tickets clicked')}
 * />
 *
 * @example
 * // Custom floating elements
 * <ScatteredLayout
 *   elements={[
 *     { id: '1', content: 'Sale!', x: 20, y: 30, size: 'medium' },
 *     { id: '2', content: '50%', x: 70, y: 60, size: 'large' },
 *   ]}
 *   showEventContent={false}
 * />
 */
const ScatteredLayout: React.FC<ScatteredLayoutProps> = ({
  elements = DEFAULT_ELEMENTS,
  showEventContent = true,
  eventTitle = 'Summer Music Festival 2025',
  eventSubtitle = 'The Ultimate Musical Experience',
  eventDate = 'July 15-17, 2025',
  eventLocation = 'Central Park, New York',
  ctaText = 'Get Tickets',
  width = '100%',
  height = 600,
  background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  animated = true,
  onCtaClick,
  onElementClick,
}) => {
  // Memoize element styles to avoid recalculation
  const elementStyles = useMemo(() => {
    return elements.map((element) => {
      const size = getSizeDimensions(element.size)
      const animationStyles = animated
        ? getAnimationStyles(
            element.animation || 'none',
            element.animationDuration || 3,
            element.rotation || 0,
          )
        : {
            transform: element.rotation
              ? `rotate(${element.rotation}deg)`
              : undefined,
          }

      return {
        ...element,
        computedSize: size,
        animationStyles,
      }
    })
  }, [elements, animated])

  return (
    <Box data-testid="scattered-layout-container">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Event Promotion Page
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: 600 }}
        >
          Scattered layout with floating decorative elements creates visual
          interest and energy. Perfect for events, promotions, and creative
          portfolios.
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width,
          height,
          background,
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-testid="scattered-canvas"
      >
        {/* Floating Elements */}
        {elementStyles.map((element) => (
          <Box
            key={element.id}
            onClick={() => onElementClick?.(element.id)}
            data-testid={`floating-element-${element.id}`}
            sx={{
              position: 'absolute',
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: element.computedSize,
              height: element.computedSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: element.background || 'transparent',
              color: element.color || '#ffffff',
              borderRadius:
                element.borderRadius !== undefined
                  ? `${element.borderRadius}%`
                  : '50%',
              zIndex: element.zIndex || 1,
              opacity: element.opacity || 1,
              cursor: onElementClick ? 'pointer' : 'default',
              transition: 'transform 0.2s ease-out',
              '&:hover': onElementClick
                ? {
                    transform:
                      (element.animationStyles?.transform || '') +
                      ' scale(1.1)',
                  }
                : {},
              ...element.animationStyles,
              // Typography for text content
              fontWeight: 700,
              fontSize:
                element.size === 'large'
                  ? 16
                  : element.size === 'medium'
                    ? 14
                    : 12,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {element.content}
          </Box>
        ))}

        {/* Main Event Content */}
        {showEventContent && (
          <Card
            sx={{
              maxWidth: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              zIndex: 10,
              position: 'relative',
            }}
            data-testid="event-card"
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              {/* Event Chips */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Chip
                  icon={<MusicNoteIcon />}
                  label="Music"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<StarIcon />}
                  label="Featured"
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Box>

              {/* Title */}
              <Typography
                variant="h3"
                component="h1"
                fontWeight={800}
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                {eventTitle}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 3, fontWeight: 400 }}
              >
                {eventSubtitle}
              </Typography>

              {/* Event Details */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  mb: 4,
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                  }}
                >
                  <CalendarTodayIcon fontSize="small" color="primary" />
                  <Typography variant="body1" fontWeight={500}>
                    {eventDate}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                  }}
                >
                  <LocationOnIcon fontSize="small" color="primary" />
                  <Typography variant="body1" fontWeight={500}>
                    {eventLocation}
                  </Typography>
                </Box>
              </Box>

              {/* CTA Button */}
              <Button
                variant="contained"
                size="large"
                startIcon={<ConfirmationNumberIcon />}
                onClick={onCtaClick}
                data-testid="cta-button"
                sx={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-out',
                }}
              >
                {ctaText}
              </Button>

              {/* Price hint */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 2 }}
              >
                Starting from $99 | Limited tickets available
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Legend */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Elements:</strong> {elements.length} floating items
        </Typography>
        {animated && (
          <Typography variant="body2" color="text.secondary">
            <strong>Animations:</strong> Float, Pulse, Rotate
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default ScatteredLayout
