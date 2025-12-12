import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useRef, useState } from 'react'

import type React from 'react'

/**
 * Props for the FullScreenLayout component.
 */
export interface FullScreenLayoutProps {
  /**
   * Array of section configurations for the layout.
   * Each section represents a full viewport-height area.
   */
  sections: FullScreenSection[]
  /**
   * Whether to show navigation dots on the side.
   * @default true
   */
  showNavigation?: boolean
  /**
   * Whether to enable smooth scrolling between sections.
   * @default true
   */
  smoothScroll?: boolean
  /**
   * Whether to snap to sections when scrolling.
   * @default false
   */
  snapScroll?: boolean
  /**
   * Callback fired when the active section changes.
   */
  onSectionChange?: (index: number) => void
}

/**
 * Configuration for a single full-screen section.
 */
export interface FullScreenSection {
  /** Unique identifier for the section */
  id: string
  /** Section title */
  title: string
  /** Section subtitle or description */
  subtitle?: string
  /** Background color or gradient */
  background?: string
  /** Text color for the section */
  textColor?: string
  /** Call-to-action button configuration */
  cta?: {
    label: string
    onClick?: () => void
    variant?: 'contained' | 'outlined' | 'text'
    color?: 'primary' | 'secondary' | 'inherit'
  }
  /** Custom content to render in the section */
  content?: React.ReactNode
  /** Alignment of the content */
  alignment?: 'left' | 'center' | 'right'
}

/**
 * FullScreenLayout creates an immersive experience with viewport-height sections.
 *
 * This layout pattern is ideal for:
 * - Product landing pages with hero sections
 * - Storytelling websites with sequential content
 * - Portfolio showcases with full-bleed imagery
 * - Marketing pages with distinct value propositions
 *
 * @example
 * ```tsx
 * <FullScreenLayout
 *   sections={[
 *     {
 *       id: 'hero',
 *       title: 'Welcome to Our Product',
 *       subtitle: 'The best solution for your needs',
 *       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
 *       cta: { label: 'Get Started', onClick: () => {} }
 *     },
 *     {
 *       id: 'features',
 *       title: 'Features',
 *       subtitle: 'Everything you need',
 *       background: '#f5f5f5'
 *     }
 *   ]}
 *   showNavigation={true}
 *   snapScroll={true}
 * />
 * ```
 *
 * @param props - Component props
 * @returns Full-screen sectioned layout component
 */
const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({
  sections,
  showNavigation = true,
  smoothScroll = true,
  snapScroll = false,
  onSectionChange,
}) => {
  const theme = useTheme()
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Track which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === entry.target,
          )
          if (index !== -1) {
            setActiveSection(index)
            onSectionChange?.(index)
          }
        }
      })
    }, observerOptions)

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [sections.length, onSectionChange])

  /**
   * Scrolls to a specific section by index.
   * @param index - The index of the section to scroll to
   */
  const scrollToSection = useCallback(
    (index: number) => {
      const section = sectionRefs.current[index]
      if (section) {
        section.scrollIntoView({
          behavior: smoothScroll ? 'smooth' : 'auto',
          block: 'start',
        })
      }
    },
    [smoothScroll],
  )

  /**
   * Determines the alignment style for section content.
   * @param alignment - The alignment setting
   * @returns Flexbox alignment properties
   */
  const getAlignmentStyles = (alignment: FullScreenSection['alignment']) => {
    switch (alignment) {
      case 'left':
        return { alignItems: 'flex-start', textAlign: 'left' as const }
      case 'right':
        return { alignItems: 'flex-end', textAlign: 'right' as const }
      default:
        return { alignItems: 'center', textAlign: 'center' as const }
    }
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        overflowY: 'auto',
        scrollBehavior: smoothScroll ? 'smooth' : 'auto',
        scrollSnapType: snapScroll ? 'y mandatory' : 'none',
        height: '100vh',
      }}
      data-testid="fullscreen-layout"
    >
      {/* Navigation dots */}
      {showNavigation && (
        <Box
          sx={{
            position: 'fixed',
            right: { xs: 8, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
          role="navigation"
          aria-label="Section navigation"
        >
          {sections.map((section, index) => (
            <Box
              key={section.id}
              onClick={() => scrollToSection(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor:
                  activeSection === index
                    ? theme.palette.primary.main
                    : alpha(theme.palette.common.white, 0.5),
                border: `2px solid ${theme.palette.primary.main}`,
                cursor: 'pointer',
                transition: theme.transitions.create(
                  ['background-color', 'transform'],
                  {
                    duration: theme.transitions.duration.short,
                  },
                ),
                '&:hover': {
                  transform: 'scale(1.2)',
                  bgcolor:
                    activeSection === index
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.3),
                },
              }}
              role="button"
              tabIndex={0}
              aria-label={`Go to section ${index + 1}: ${section.title}`}
              aria-current={activeSection === index ? 'true' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollToSection(index)
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Sections */}
      {sections.map((section, index) => {
        const alignmentStyles = getAlignmentStyles(section.alignment)

        return (
          <Box
            key={section.id}
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[index] = el
            }}
            sx={{
              minHeight: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background:
                section.background ||
                (index % 2 === 0
                  ? theme.palette.background.default
                  : theme.palette.background.paper),
              color:
                section.textColor ||
                (section.background?.includes('gradient')
                  ? theme.palette.common.white
                  : theme.palette.text.primary),
              scrollSnapAlign: snapScroll ? 'start' : 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
            data-testid={`section-${section.id}`}
            role="region"
            aria-labelledby={`section-title-${section.id}`}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  py: { xs: 6, md: 12 },
                  gap: 3,
                  ...alignmentStyles,
                }}
              >
                <Typography
                  id={`section-title-${section.id}`}
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3.5rem' },
                  }}
                >
                  {section.title}
                </Typography>

                {section.subtitle && (
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      maxWidth: 600,
                      opacity: 0.9,
                      fontSize: { xs: '1rem', md: '1.5rem' },
                    }}
                  >
                    {section.subtitle}
                  </Typography>
                )}

                {section.content && (
                  <Box sx={{ mt: 2, width: '100%' }}>{section.content}</Box>
                )}

                {section.cta && (
                  <Button
                    variant={section.cta.variant || 'contained'}
                    color={section.cta.color || 'primary'}
                    size="large"
                    onClick={section.cta.onClick}
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {section.cta.label}
                  </Button>
                )}
              </Box>
            </Container>
          </Box>
        )
      })}
    </Box>
  )
}

export default FullScreenLayout
