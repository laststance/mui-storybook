import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useCallback } from 'react'

/**
 * Visual style options for the broken grid.
 */
export type BrokenGridStyle = 'creative' | 'minimal' | 'bold'

/**
 * Overlap intensity options.
 */
export type OverlapIntensity = 'subtle' | 'moderate' | 'dramatic'

/**
 * Props for the BrokenGridLayout component.
 */
export interface BrokenGridLayoutProps {
  /**
   * Visual style of the broken grid.
   * @default 'creative'
   */
  style?: BrokenGridStyle
  /**
   * Intensity of element overlap.
   * @default 'moderate'
   */
  overlapIntensity?: OverlapIntensity
  /**
   * Agency/brand name to display.
   * @default 'Creative Studio'
   */
  agencyName?: string
  /**
   * Main tagline text.
   * @default 'We Create Digital Experiences'
   */
  tagline?: string
  /**
   * Whether to show the showreel button.
   * @default true
   */
  showShowreel?: boolean
  /**
   * Whether to show client logos.
   * @default true
   */
  showClients?: boolean
  /**
   * Callback when CTA button is clicked.
   */
  onCtaClick?: () => void
  /**
   * Callback when showreel is clicked.
   */
  onShowreelClick?: () => void
}

/**
 * Maps overlap intensity to transform values.
 * @param intensity - The overlap intensity level.
 * @returns An object with offset percentages.
 */
const getOverlapValues = (
  intensity: OverlapIntensity,
): { offset: number; rotation: number } => {
  const intensityMap: Record<
    OverlapIntensity,
    { offset: number; rotation: number }
  > = {
    subtle: { offset: 15, rotation: 2 },
    moderate: { offset: 30, rotation: 4 },
    dramatic: { offset: 50, rotation: 6 },
  }
  return intensityMap[intensity]
}

/**
 * Sample client logos for the creative agency.
 */
const CLIENT_LOGOS = [
  { name: 'TechCorp', color: '#3b82f6' },
  { name: 'DesignLab', color: '#10b981' },
  { name: 'MediaFlow', color: '#8b5cf6' },
  { name: 'BrandX', color: '#f59e0b' },
  { name: 'InnovateCo', color: '#ef4444' },
]

/**
 * Sample project showcase data.
 */
const PROJECTS = [
  {
    id: 1,
    title: 'Brand Identity',
    category: 'Branding',
    image: 'https://picsum.photos/seed/brand1/600/400',
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'Web Experience',
    category: 'Development',
    image: 'https://picsum.photos/seed/web1/600/800',
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Mobile App',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/seed/app1/400/600',
    color: '#8b5cf6',
  },
]

/**
 * BrokenGridLayout demonstrates overlapping elements that break traditional grid constraints,
 * commonly used in creative agency landing pages, portfolio showcases, and editorial designs.
 *
 * This component uses CSS positioning and transforms to create dynamic, visually impactful
 * layouts where elements intentionally overlap for creative effect.
 *
 * @param props - The component props.
 * @returns A React component displaying a broken grid creative layout.
 *
 * @example
 * // Basic usage with default settings
 * <BrokenGridLayout />
 *
 * @example
 * // Custom broken grid with dramatic overlaps
 * <BrokenGridLayout overlapIntensity="dramatic" style="bold" />
 *
 * @example
 * // Minimal agency landing page
 * <BrokenGridLayout style="minimal" showClients={false} />
 */
const BrokenGridLayout: React.FC<BrokenGridLayoutProps> = ({
  style = 'creative',
  overlapIntensity = 'moderate',
  agencyName = 'Creative Studio',
  tagline = 'We Create Digital Experiences',
  showShowreel = true,
  showClients = true,
  onCtaClick,
  onShowreelClick,
}) => {
  const theme = useTheme()
  const { offset, rotation } = getOverlapValues(overlapIntensity)

  const handleCtaClick = useCallback(() => {
    onCtaClick?.()
  }, [onCtaClick])

  const handleShowreelClick = useCallback(() => {
    onShowreelClick?.()
  }, [onShowreelClick])

  const getStyleColors = () => {
    switch (style) {
      case 'minimal':
        return {
          primary: theme.palette.grey[900],
          secondary: theme.palette.grey[700],
          accent: theme.palette.primary.main,
          background: theme.palette.grey[50],
        }
      case 'bold':
        return {
          primary: theme.palette.primary.main,
          secondary: theme.palette.secondary.main,
          accent: '#fff',
          background: theme.palette.grey[900],
        }
      case 'creative':
      default:
        return {
          primary: theme.palette.primary.main,
          secondary: theme.palette.secondary.main,
          accent: theme.palette.info.main,
          background: 'transparent',
        }
    }
  }

  const colors = getStyleColors()

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 800,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor:
          style === 'bold'
            ? theme.palette.grey[900]
            : theme.palette.background.default,
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '40%',
          height: '50%',
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* Main content container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 800,
          gap: 4,
          p: 4,
        }}
      >
        {/* Left side - Hero content with overlapping text */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          {/* Agency name with decorative element */}
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Chip
              label={agencyName}
              variant="outlined"
              sx={{
                borderColor: colors.primary,
                color: style === 'bold' ? '#fff' : colors.primary,
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Tagline with broken grid overlap */}
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                color: style === 'bold' ? '#fff' : theme.palette.text.primary,
                position: 'relative',
                zIndex: 2,
              }}
            >
              {tagline.split(' ').map((word, index) => (
                <Box
                  key={index}
                  component="span"
                  sx={{
                    display: 'block',
                    transform:
                      index % 2 === 1
                        ? `translateX(${offset}px) rotate(${rotation}deg)`
                        : 'none',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform:
                        index % 2 === 1
                          ? `translateX(${offset + 10}px) rotate(${rotation + 1}deg)`
                          : `translateX(-10px)`,
                    },
                  }}
                >
                  {word}
                </Box>
              ))}
            </Typography>

            {/* Overlapping accent shape */}
            <Box
              sx={{
                position: 'absolute',
                left: `-${offset / 2}px`,
                top: '30%',
                width: 120,
                height: 120,
                backgroundColor: colors.primary,
                opacity: 0.15,
                borderRadius: 4,
                transform: `rotate(-${rotation * 2}deg)`,
                zIndex: 1,
              }}
            />
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              mt: 4,
              mb: 4,
              maxWidth: 400,
              color:
                style === 'bold'
                  ? 'rgba(255,255,255,0.7)'
                  : theme.palette.text.secondary,
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            We craft bold, immersive digital experiences that captivate
            audiences and drive results. From branding to development, we bring
            visions to life.
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleCtaClick}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                backgroundColor: colors.primary,
                '&:hover': {
                  transform: 'translateX(4px)',
                },
              }}
              aria-label="Start a project with us"
            >
              Start a Project
            </Button>
            {showShowreel && (
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={handleShowreelClick}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderColor:
                    style === 'bold' ? '#fff' : theme.palette.divider,
                  color: style === 'bold' ? '#fff' : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor:
                      style === 'bold'
                        ? 'rgba(255,255,255,0.1)'
                        : theme.palette.action.hover,
                  },
                }}
                aria-label="Watch our showreel"
              >
                Watch Showreel
              </Button>
            )}
          </Box>

          {/* Client logos */}
          {showClients && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="caption"
                sx={{
                  color:
                    style === 'bold'
                      ? 'rgba(255,255,255,0.5)'
                      : theme.palette.text.secondary,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  fontWeight: 600,
                }}
              >
                Trusted by industry leaders
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  mt: 2,
                  flexWrap: 'wrap',
                }}
              >
                {CLIENT_LOGOS.map((client) => (
                  <Box
                    key={client.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      opacity: 0.6,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 },
                    }}
                    role="img"
                    aria-label={`Client: ${client.name}`}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: client.color,
                      }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        color:
                          style === 'bold'
                            ? 'rgba(255,255,255,0.8)'
                            : theme.palette.text.primary,
                      }}
                    >
                      {client.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Right side - Project showcase with overlapping cards */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Project cards with broken grid overlap */}
          {PROJECTS.map((project, index) => {
            const positions = [
              {
                top: '5%',
                left: '10%',
                width: '55%',
                zIndex: 3,
                rotation: -rotation,
              },
              {
                top: '20%',
                right: '5%',
                width: '50%',
                zIndex: 4,
                rotation: rotation / 2,
              },
              {
                bottom: '10%',
                left: '20%',
                width: '45%',
                zIndex: 2,
                rotation: rotation,
              },
            ]
            const pos = positions[index]

            return (
              <Box
                key={project.id}
                sx={{
                  position: 'absolute',
                  ...pos,
                  transform: `rotate(${pos.rotation}deg)`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: `rotate(0deg) scale(1.05)`,
                    zIndex: 10,
                  },
                }}
                role="article"
                aria-label={`Project: ${project.title}`}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: theme.shadows[12],
                    aspectRatio: index === 1 ? '3/4' : '4/3',
                  }}
                >
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, ${project.color}cc, transparent)`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Chip
                      label={project.category}
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        mb: 1,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontSize: '0.7rem',
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ color: '#fff' }}
                    >
                      {project.title}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}

          {/* Decorative overlapping shapes */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '30%',
              width: 80,
              height: 80,
              border: `3px solid ${colors.secondary}`,
              borderRadius: '50%',
              opacity: 0.3,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '25%',
              right: '15%',
              width: 60,
              height: 60,
              backgroundColor: colors.accent,
              opacity: 0.2,
              borderRadius: 2,
              transform: `rotate(${rotation * 3}deg)`,
            }}
          />
        </Box>
      </Box>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          opacity: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: style === 'bold' ? '#fff' : theme.palette.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          Scroll to explore
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 40,
            border: `2px solid ${style === 'bold' ? '#fff' : theme.palette.divider}`,
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 8,
              backgroundColor:
                style === 'bold' ? '#fff' : theme.palette.text.secondary,
              borderRadius: 2,
              animation: 'scroll 1.5s ease-in-out infinite',
              '@keyframes scroll': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 1 },
                '50%': { transform: 'translateY(12px)', opacity: 0.3 },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default BrokenGridLayout
