import Box from '@mui/material/Box'
import { alpha, useTheme } from '@mui/material/styles'
import { useEffect, useRef, useState } from 'react'

import type React from 'react'

/**
 * Props for the ParallaxLayout component.
 */
export interface ParallaxLayoutProps {
  /**
   * Array of layer configurations for the parallax effect.
   */
  layers: ParallaxLayer[]
  /**
   * Overall scroll speed multiplier.
   * @default 1
   */
  speedMultiplier?: number
  /**
   * Whether to enable parallax effect.
   * @default true
   */
  enabled?: boolean
  /**
   * The height of the parallax container.
   * @default '100vh'
   */
  height?: string | number
  /**
   * Whether to respect reduced motion preferences.
   * @default true
   */
  respectReducedMotion?: boolean
  /**
   * Callback when scroll position changes.
   */
  onScroll?: (scrollY: number, progress: number) => void
}

/**
 * Configuration for a single parallax layer.
 */
export interface ParallaxLayer {
  /** Unique identifier */
  id: string
  /** Layer type */
  type: 'background' | 'midground' | 'foreground' | 'content'
  /** Background image URL */
  image?: string
  /** Background color or gradient */
  backgroundColor?: string
  /** Scroll speed factor (0 = static, 1 = normal, >1 = faster, <0 = reverse) */
  speed: number
  /** Z-index for layer stacking */
  zIndex?: number
  /** Opacity of the layer */
  opacity?: number
  /** Custom content to render */
  content?: React.ReactNode
  /** Whether to blur the layer */
  blur?: number
  /** Overlay color with alpha */
  overlay?: string
}

/**
 * ParallaxLayout creates a multi-layer depth effect with scrolling.
 *
 * This layout pattern is ideal for:
 * - Storytelling pages with immersive experiences
 * - Product showcases with visual depth
 * - Hero sections with dynamic backgrounds
 * - Portfolio websites with creative effects
 *
 * @example
 * ```tsx
 * <ParallaxLayout
 *   layers={[
 *     {
 *       id: 'bg',
 *       type: 'background',
 *       image: '/mountain.jpg',
 *       speed: 0.3,
 *       zIndex: 0
 *     },
 *     {
 *       id: 'mid',
 *       type: 'midground',
 *       image: '/trees.png',
 *       speed: 0.5,
 *       zIndex: 1
 *     },
 *     {
 *       id: 'content',
 *       type: 'foreground',
 *       speed: 1,
 *       content: <h1>Welcome</h1>,
 *       zIndex: 2
 *     }
 *   ]}
 *   height="100vh"
 * />
 * ```
 *
 * @param props - Component props
 * @returns Parallax layout component
 */
const ParallaxLayout: React.FC<ParallaxLayoutProps> = ({
  layers,
  speedMultiplier = 1,
  enabled = true,
  height = '100vh',
  respectReducedMotion = true,
  onScroll,
}) => {
  const theme = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rafRef = useRef<number>(undefined)

  // Check for reduced motion preference
  useEffect(() => {
    if (!respectReducedMotion) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [respectReducedMotion])

  // Handle scroll with requestAnimationFrame for smooth performance
  useEffect(() => {
    if (!enabled || reducedMotion) return

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const containerHeight = container.offsetHeight
        const viewportHeight = window.innerHeight

        // Calculate scroll progress relative to the container
        const scrollProgress = Math.max(
          0,
          Math.min(1, -rect.top / (containerHeight - viewportHeight)),
        )

        const newScrollY = window.scrollY
        setScrollY(newScrollY)
        onScroll?.(newScrollY, scrollProgress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [enabled, reducedMotion, onScroll])

  /**
   * Calculates the transform for a layer based on scroll position.
   * @param layer - The layer configuration
   * @returns Transform string for the layer
   */
  const getLayerTransform = (layer: ParallaxLayer): string => {
    if (!enabled || reducedMotion) return 'none'

    const offset = scrollY * layer.speed * speedMultiplier
    return `translateY(${-offset}px)`
  }

  /**
   * Gets the default z-index based on layer type.
   * @param type - The layer type
   * @returns Default z-index value
   */
  const getDefaultZIndex = (type: ParallaxLayer['type']): number => {
    switch (type) {
      case 'background':
        return 0
      case 'midground':
        return 1
      case 'foreground':
        return 2
      case 'content':
        return 3
      default:
        return 0
    }
  }

  // Sort layers by z-index for proper stacking
  const sortedLayers = [...layers].sort((a, b) => {
    const aZ = a.zIndex ?? getDefaultZIndex(a.type)
    const bZ = b.zIndex ?? getDefaultZIndex(b.type)
    return aZ - bZ
  })

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
      }}
      data-testid="parallax-layout"
      role="region"
      aria-label="Parallax scrolling content"
    >
      {sortedLayers.map((layer) => {
        const zIndex = layer.zIndex ?? getDefaultZIndex(layer.type)

        return (
          <Box
            key={layer.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex,
              transform: getLayerTransform(layer),
              willChange: enabled && !reducedMotion ? 'transform' : 'auto',
              transition: reducedMotion
                ? 'none'
                : theme.transitions.create('transform', {
                    duration: 0,
                  }),
            }}
            data-testid={`layer-${layer.id}`}
            aria-hidden={layer.type !== 'content'}
          >
            {/* Background image layer */}
            {layer.image && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-20%',
                  left: 0,
                  right: 0,
                  bottom: '-20%',
                  backgroundImage: `url(${layer.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: layer.opacity ?? 1,
                  filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
                }}
              />
            )}

            {/* Background color layer */}
            {layer.backgroundColor && !layer.image && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: layer.backgroundColor,
                  opacity: layer.opacity ?? 1,
                }}
              />
            )}

            {/* Overlay layer */}
            {layer.overlay && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: layer.overlay,
                }}
              />
            )}

            {/* Content layer */}
            {layer.content && (
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {layer.content}
              </Box>
            )}
          </Box>
        )
      })}

      {/* Accessibility: provide static content for screen readers */}
      <Box
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
        }}
        role="complementary"
        aria-label="Accessible content summary"
      >
        {layers
          .filter((l) => l.type === 'content')
          .map((layer) => (
            <div key={layer.id}>{layer.content}</div>
          ))}
      </Box>
    </Box>
  )
}

export default ParallaxLayout

/**
 * Preset parallax configurations for common use cases.
 */
export const ParallaxPresets = {
  /**
   * Creates a simple two-layer parallax with background and content.
   * @param backgroundImage - URL of the background image
   * @param content - React content for the foreground
   * @returns Array of layer configurations
   */
  simpleHero: (
    backgroundImage: string,
    content: React.ReactNode,
  ): ParallaxLayer[] => [
    {
      id: 'bg',
      type: 'background',
      image: backgroundImage,
      speed: 0.3,
      overlay: alpha('#000', 0.4),
    },
    {
      id: 'content',
      type: 'content',
      speed: 0.8,
      content,
    },
  ],

  /**
   * Creates a three-layer mountain scene parallax.
   * @param layers - Object with far, mid, and near image URLs
   * @param content - React content for the foreground
   * @returns Array of layer configurations
   */
  mountainScene: (
    layerImages: { far: string; mid: string; near: string },
    content: React.ReactNode,
  ): ParallaxLayer[] => [
    {
      id: 'sky',
      type: 'background',
      backgroundColor: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)',
      speed: 0,
    },
    {
      id: 'mountains-far',
      type: 'background',
      image: layerImages.far,
      speed: 0.1,
      zIndex: 1,
    },
    {
      id: 'mountains-mid',
      type: 'midground',
      image: layerImages.mid,
      speed: 0.3,
      zIndex: 2,
    },
    {
      id: 'mountains-near',
      type: 'foreground',
      image: layerImages.near,
      speed: 0.5,
      zIndex: 3,
    },
    {
      id: 'content',
      type: 'content',
      speed: 0.7,
      content,
      zIndex: 4,
    },
  ],

  /**
   * Creates a gradient background with floating content.
   * @param gradient - CSS gradient string
   * @param content - React content for the foreground
   * @returns Array of layer configurations
   */
  gradientFloat: (
    gradient: string,
    content: React.ReactNode,
  ): ParallaxLayer[] => [
    {
      id: 'gradient',
      type: 'background',
      backgroundColor: gradient,
      speed: 0,
    },
    {
      id: 'content',
      type: 'content',
      speed: 0.5,
      content,
    },
  ],
}
