import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { useTheme, type Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState, useMemo, useCallback } from 'react'

/**
 * Represents a single layout pattern.
 */
interface LayoutPattern {
  id: string
  name: string
  category: LayoutCategory
  characteristics: string
  useCases: string[]
  preview: React.ReactNode
}

/**
 * Available layout pattern categories.
 */
type LayoutCategory =
  | 'Column-Based'
  | 'Grid-Based'
  | 'Scroll/Flow'
  | 'Container/Flow'
  | 'Data Display'
  | 'Special'

/**
 * Props for the LayoutPatternsGallery component.
 */
export interface LayoutPatternsGalleryProps {
  /**
   * Default category to filter by. If not provided, shows all patterns.
   */
  defaultCategory?: string
  /**
   * Whether to show the category filter chips.
   * @default true
   */
  showFilter?: boolean
  /**
   * Whether to render in compact mode with smaller cards.
   * @default false
   */
  compact?: boolean
}

/**
 * Category colors for visual distinction.
 * WCAG AA compliant - minimum 4.5:1 contrast ratio with white text.
 * Darker shades ensure accessibility while maintaining visual identity.
 */
const CATEGORY_COLORS: Record<LayoutCategory, string> = {
  'Column-Based': '#1d4ed8', // blue-700 (7.0:1 contrast with white)
  'Grid-Based': '#15803d', // green-700 (4.8:1 contrast with white)
  'Scroll/Flow': '#b45309', // amber-700 (5.4:1 contrast with white)
  'Container/Flow': '#7c3aed', // violet-600 (6.0:1 contrast with white)
  'Data Display': '#0e7490', // cyan-700 (5.7:1 contrast with white)
  Special: '#be185d', // pink-700 (5.5:1 contrast with white)
}

/**
 * All available layout pattern categories.
 */
const ALL_CATEGORIES: LayoutCategory[] = [
  'Column-Based',
  'Grid-Based',
  'Scroll/Flow',
  'Container/Flow',
  'Data Display',
  'Special',
]

/**
 * Creates a mini visual preview box for layout patterns.
 * @param children - The visual elements representing the layout pattern.
 * @returns A styled preview container.
 */
const PreviewBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        height: 80,
        backgroundColor: theme.palette.grey[100],
        borderRadius: 1,
        overflow: 'hidden',
        display: 'flex',
        p: 0.5,
        border: `1px solid ${theme.palette.divider}`,
        ...(theme.palette.mode === 'dark' && {
          backgroundColor: theme.palette.grey[900],
        }),
      }}
    >
      {children}
    </Box>
  )
}

/**
 * Creates a placeholder block for layout previews.
 * @param color - Background color for the block.
 * @param flex - Flex grow value.
 * @returns A styled placeholder block.
 */
const Block: React.FC<{
  color?: string
  flex?: number
  width?: string
  height?: string
  borderRadius?: number
}> = ({ color, flex, width, height, borderRadius = 2 }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: color || theme.palette.primary.main,
        flex: flex,
        width: width,
        height: height || '100%',
        borderRadius: borderRadius / 4,
        opacity: 1, // Improved from 0.8 for better contrast
      }}
    />
  )
}

/**
 * Layout patterns data with visual previews and metadata.
 * @param theme - The MUI theme object for accessing palette colors.
 * @returns An array of layout patterns with previews and metadata.
 */
const createLayoutPatterns = (theme: Theme): LayoutPattern[] => {
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary.main
  const info = theme.palette.info.main
  const success = theme.palette.success.main
  const warning = theme.palette.warning.main

  return [
    // Column-Based (5)
    {
      id: 'single-column',
      name: 'Single Column',
      category: 'Column-Based',
      characteristics: 'Centered content, optimal for reading and mobile',
      useCases: ['Blog posts', 'Articles', 'Landing pages', 'Mobile views'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              p: 0.5,
            }}
          >
            <Block color={primary} width="60%" />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'two-column',
      name: '2-Column',
      category: 'Column-Based',
      characteristics: 'Equal width columns for balanced content',
      useCases: ['Comparison pages', 'Feature lists', 'About sections'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={primary} flex={1} />
            <Block color={secondary} flex={1} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'three-column',
      name: '3-Column',
      category: 'Column-Based',
      characteristics: 'Classic web layout with main content and sidebars',
      useCases: ['News sites', 'Dashboards', 'E-commerce'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={info} flex={1} />
            <Block color={primary} flex={2} />
            <Block color={info} flex={1} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'left-right',
      name: 'Two-Column (Left-Right)',
      category: 'Column-Based',
      characteristics: 'Asymmetric layout with sidebar navigation',
      useCases: ['Documentation', 'Admin panels', 'Email clients'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={info} width="25%" />
            <Block color={primary} flex={1} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'multi-column',
      name: 'Multi-Column',
      category: 'Column-Based',
      characteristics: 'CSS columns for magazine-style text flow',
      useCases: ['Print layouts', 'Magazine articles', 'Text-heavy content'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Block key={i} color={primary} flex={1} />
            ))}
          </Box>
        </PreviewBox>
      ),
    },

    // Grid-Based (4)
    {
      id: 'grid-layout',
      name: 'Grid Layout',
      category: 'Grid-Based',
      characteristics: 'Structured rows and columns for organized content',
      useCases: ['Product grids', 'Image galleries', 'Card layouts'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: 0.5,
              p: 0.5,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Block key={i} color={primary} />
            ))}
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'masonry',
      name: 'Masonry Layout',
      category: 'Grid-Based',
      characteristics: 'Pinterest-style variable height items',
      useCases: ['Image galleries', 'Social feeds', 'Portfolio'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Block color={primary} height="60%" />
              <Block color={info} height="35%" />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Block color={secondary} height="35%" />
              <Block color={success} height="60%" />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Block color={warning} height="45%" />
              <Block color={primary} height="50%" />
            </Box>
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'broken-grid',
      name: 'Broken Grid',
      category: 'Grid-Based',
      characteristics: 'Overlapping elements for creative impact',
      useCases: ['Creative portfolios', 'Agency sites', 'Art websites'],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Box
              sx={{
                position: 'absolute',
                left: '10%',
                top: '10%',
                width: '40%',
                height: '50%',
                backgroundColor: primary,
                borderRadius: 0.5,
                opacity: 1, // Improved contrast
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '15%',
                top: '25%',
                width: '35%',
                height: '55%',
                backgroundColor: secondary,
                borderRadius: 0.5,
                opacity: 0.95, // Improved contrast
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '30%',
                bottom: '10%',
                width: '30%',
                height: '35%',
                backgroundColor: info,
                borderRadius: 0.5,
                opacity: 0.9, // Improved contrast
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'non-grid',
      name: 'Non-Grid',
      category: 'Grid-Based',
      characteristics: 'Free-form placement breaking traditional structure',
      useCases: [
        'Artistic sites',
        'Experimental designs',
        'Interactive experiences',
      ],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Box
              sx={{
                position: 'absolute',
                left: '5%',
                top: '15%',
                width: '25%',
                height: '40%',
                backgroundColor: primary,
                borderRadius: 0.5,
                transform: 'rotate(-5deg)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '10%',
                top: '5%',
                width: '30%',
                height: '35%',
                backgroundColor: secondary,
                borderRadius: 0.5,
                transform: 'rotate(8deg)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '40%',
                bottom: '5%',
                width: '35%',
                height: '40%',
                backgroundColor: info,
                borderRadius: 0.5,
                transform: 'rotate(-3deg)',
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },

    // Scroll/Flow (4)
    {
      id: 'full-screen',
      name: 'Full-Screen',
      category: 'Scroll/Flow',
      characteristics: 'Immersive viewport-height sections',
      useCases: ['Hero sections', 'Presentations', 'Product showcases'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={primary} flex={1} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'card-based',
      name: 'Card-Based',
      category: 'Scroll/Flow',
      characteristics: 'Self-contained content cards with shadows',
      useCases: ['Social media', 'Product listings', 'News feeds'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
              alignItems: 'center',
            }}
          >
            {[primary, secondary, info].map((color, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: '80%',
                  backgroundColor: color,
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              />
            ))}
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'infinite-scroll',
      name: 'Infinite Scroll',
      category: 'Scroll/Flow',
      characteristics: 'Continuous content loading on scroll',
      useCases: ['Social feeds', 'Search results', 'Content streams'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={primary} height="30%" />
            <Block color={secondary} height="30%" />
            <Box
              sx={{
                height: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                ...
              </Typography>
            </Box>
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'parallax',
      name: 'Parallax',
      category: 'Scroll/Flow',
      characteristics: 'Multi-layer depth effect on scroll',
      useCases: ['Storytelling', 'Product pages', 'Portfolio'],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Box
              sx={{
                position: 'absolute',
                inset: '5%',
                backgroundColor: info,
                borderRadius: 0.5,
                opacity: 0.6, // Improved from 0.3 for better contrast
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: '15%',
                backgroundColor: secondary,
                borderRadius: 0.5,
                opacity: 0.75, // Improved from 0.5 for better contrast
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: '25%',
                backgroundColor: primary,
                borderRadius: 0.5,
                opacity: 0.95, // Improved from 0.8 for better contrast
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },

    // Container/Flow (5)
    {
      id: 'stack',
      name: 'Stack',
      category: 'Container/Flow',
      characteristics: 'Vertically stacked sections with consistent spacing',
      useCases: ['Landing pages', 'Long-form content', 'Settings pages'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={primary} height="30%" />
            <Block color={secondary} height="30%" />
            <Block color={info} height="30%" />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'ribbon',
      name: 'Ribbon',
      category: 'Container/Flow',
      characteristics: 'Full-width horizontal bands with varied backgrounds',
      useCases: ['Marketing pages', 'Feature sections', 'Testimonials'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
            }}
          >
            <Box sx={{ flex: 1, backgroundColor: primary, opacity: 1 }} />
            <Box sx={{ flex: 1, backgroundColor: 'transparent' }} />
            <Box sx={{ flex: 1, backgroundColor: secondary, opacity: 1 }} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'split-screen',
      name: 'Split Screen',
      category: 'Container/Flow',
      characteristics: '50/50 division for contrasting content',
      useCases: ['Login/signup', 'Before/after', 'Dual purpose pages'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              p: 0,
            }}
          >
            <Box sx={{ flex: 1, backgroundColor: primary }} />
            <Box sx={{ flex: 1, backgroundColor: secondary }} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'off-canvas',
      name: 'Off-Canvas',
      category: 'Container/Flow',
      characteristics: 'Hidden sidebar that slides in from edge',
      useCases: ['Mobile navigation', 'Filters', 'Settings panels'],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Block color={theme.palette.grey[300]} />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '35%',
                backgroundColor: primary,
                borderRadius: 0.5,
                boxShadow: 3,
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'liquid-responsive',
      name: 'Liquid/Responsive',
      category: 'Container/Flow',
      characteristics: 'Fluid widths that adapt to any screen size',
      useCases: ['All modern websites', 'Mobile-first designs', 'PWAs'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
              alignItems: 'stretch',
            }}
          >
            <Box
              sx={{
                flex: '1 1 20%',
                backgroundColor: primary,
                borderRadius: 0.5,
                minWidth: 0,
              }}
            />
            <Box
              sx={{
                flex: '2 1 60%',
                backgroundColor: secondary,
                borderRadius: 0.5,
                minWidth: 0,
              }}
            />
            <Box
              sx={{
                flex: '1 1 20%',
                backgroundColor: info,
                borderRadius: 0.5,
                minWidth: 0,
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },

    // Data Display (6)
    {
      id: 'tabbed',
      name: 'Tabbed',
      category: 'Data Display',
      characteristics: 'Switchable panels for organized content',
      useCases: ['Settings', 'Product details', 'Documentation'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.25, mb: 0.5 }}>
              <Box
                sx={{
                  width: '20%',
                  height: 12,
                  backgroundColor: primary,
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <Box
                sx={{
                  width: '20%',
                  height: 12,
                  backgroundColor: theme.palette.grey[400],
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <Box
                sx={{
                  width: '20%',
                  height: 12,
                  backgroundColor: theme.palette.grey[400],
                  borderRadius: '4px 4px 0 0',
                }}
              />
            </Box>
            <Block color={primary} flex={1} />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'multi-panel',
      name: 'Multi-Panel',
      category: 'Data Display',
      characteristics: 'Multiple resizable panes side by side',
      useCases: ['IDEs', 'Email clients', 'File managers'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            <Block color={info} width="25%" />
            <Block color={primary} flex={1} />
            <Block color={secondary} width="30%" />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'timeline',
      name: 'Timeline',
      category: 'Data Display',
      characteristics: 'Chronological event sequence with visual connection',
      useCases: ['Activity feeds', 'History', 'Process steps'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              p: 1,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: '10%',
                right: '10%',
                height: 2,
                backgroundColor: theme.palette.grey[400],
                top: '50%',
              }}
            />
            {[primary, secondary, info, success].map((color, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: color,
                    borderRadius: '50%',
                  }}
                />
              </Box>
            ))}
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'catalog',
      name: 'Catalog',
      category: 'Data Display',
      characteristics: 'Filterable list with thumbnails and details',
      useCases: ['E-commerce', 'Product listings', 'Search results'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              p: 0.5,
            }}
          >
            {[primary, secondary, info].map((color, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                <Box
                  sx={{
                    width: '20%',
                    backgroundColor: color,
                    borderRadius: 0.5,
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.25,
                  }}
                >
                  <Box
                    sx={{
                      height: '40%',
                      backgroundColor: theme.palette.grey[400],
                      borderRadius: 0.25,
                      width: '60%',
                    }}
                  />
                  <Box
                    sx={{
                      height: '30%',
                      backgroundColor: theme.palette.grey[300],
                      borderRadius: 0.25,
                      width: '80%',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'comparison',
      name: 'Comparison',
      category: 'Data Display',
      characteristics: 'Side-by-side feature/pricing tables',
      useCases: ['Pricing pages', 'Product comparison', 'Feature matrices'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: 0.5,
              p: 0.5,
            }}
          >
            {[primary, secondary, info].map((color, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.25,
                }}
              >
                <Box
                  sx={{
                    height: 16,
                    backgroundColor: color,
                    borderRadius: 0.5,
                  }}
                />
                {[1, 2, 3].map((j) => (
                  <Box
                    key={j}
                    sx={{
                      flex: 1,
                      backgroundColor: theme.palette.grey[300],
                      borderRadius: 0.25,
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'form-based',
      name: 'Form-Based',
      category: 'Data Display',
      characteristics: 'Structured input fields with clear labeling',
      useCases: ['Registration', 'Data entry', 'Checkout'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              p: 0.5,
              justifyContent: 'center',
            }}
          >
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}
              >
                <Box
                  sx={{
                    width: '25%',
                    height: 8,
                    backgroundColor: theme.palette.grey[500],
                    borderRadius: 0.25,
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    height: 14,
                    backgroundColor: theme.palette.grey[200],
                    borderRadius: 0.5,
                    border: `1px solid ${theme.palette.grey[400]}`,
                  }}
                />
              </Box>
            ))}
          </Box>
        </PreviewBox>
      ),
    },

    // Special (6)
    {
      id: 'fab',
      name: 'FAB',
      category: 'Special',
      characteristics: 'Floating action button for primary action',
      useCases: ['Mobile apps', 'Quick actions', 'Create buttons'],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Block color={theme.palette.grey[300]} />
            <Box
              sx={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                width: 24,
                height: 24,
                backgroundColor: primary,
                borderRadius: '50%',
                boxShadow: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
              >
                +
              </Typography>
            </Box>
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'overlay',
      name: 'Overlay',
      category: 'Special',
      characteristics: 'Modal/popup content layered above main view',
      useCases: ['Dialogs', 'Image lightbox', 'Notifications'],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Block color={theme.palette.grey[300]} />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '60%',
                  height: '60%',
                  backgroundColor: 'white',
                  borderRadius: 1,
                  boxShadow: 4,
                }}
              />
            </Box>
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'circular',
      name: 'Circular',
      category: 'Special',
      characteristics: 'Radial arrangement around a center point',
      useCases: ['Navigation menus', 'Data visualization', 'Wheel selectors'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: primary,
                borderRadius: '50%',
              }}
            />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  backgroundColor: secondary,
                  borderRadius: '50%',
                  transform: `rotate(${angle}deg) translateY(-28px)`,
                }}
              />
            ))}
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'canvas',
      name: 'Canvas',
      category: 'Special',
      characteristics: 'Free drawing/manipulation workspace',
      useCases: ['Design tools', 'Whiteboarding', 'Image editors'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              position: 'relative',
              p: 0.5,
              backgroundColor: 'white',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: '15%',
                top: '20%',
                width: '30%',
                height: '35%',
                border: `2px dashed ${primary}`,
                borderRadius: 0.5,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '20%',
                bottom: '15%',
                width: '25%',
                height: '40%',
                backgroundColor: secondary,
                borderRadius: 0.5,
                opacity: 0.9, // Improved from 0.7 for better contrast
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '45%',
                top: '10%',
                width: 20,
                height: 20,
                backgroundColor: info,
                borderRadius: '50%',
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'hierarchical',
      name: 'Hierarchical',
      category: 'Special',
      characteristics: 'Tree structure showing parent-child relationships',
      useCases: ['File browsers', 'Org charts', 'Category trees'],
      preview: (
        <PreviewBox>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 0.5,
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 12,
                backgroundColor: primary,
                borderRadius: 0.5,
              }}
            />
            <Box
              sx={{
                width: 1,
                height: 6,
                backgroundColor: theme.palette.grey[400],
              }}
            />
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 10,
                    backgroundColor: secondary,
                    borderRadius: 0.5,
                  }}
                />
                <Box
                  sx={{
                    width: 1,
                    height: 4,
                    backgroundColor: theme.palette.grey[400],
                  }}
                />
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 8,
                      backgroundColor: info,
                      borderRadius: 0.25,
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 8,
                      backgroundColor: info,
                      borderRadius: 0.25,
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 10,
                    backgroundColor: secondary,
                    borderRadius: 0.5,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </PreviewBox>
      ),
    },
    {
      id: 'scattered',
      name: 'Scattered/Freeform',
      category: 'Special',
      characteristics: 'Randomly positioned elements for creative effect',
      useCases: ['Art portfolios', 'Creative agencies', 'Event sites'],
      preview: (
        <PreviewBox>
          <Box sx={{ width: '100%', position: 'relative', p: 0.5 }}>
            <Box
              sx={{
                position: 'absolute',
                left: '8%',
                top: '12%',
                width: 18,
                height: 18,
                backgroundColor: primary,
                borderRadius: 0.5,
                transform: 'rotate(15deg)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '15%',
                top: '8%',
                width: 14,
                height: 22,
                backgroundColor: secondary,
                borderRadius: 0.5,
                transform: 'rotate(-10deg)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '35%',
                bottom: '15%',
                width: 20,
                height: 16,
                backgroundColor: info,
                borderRadius: 0.5,
                transform: 'rotate(5deg)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: '25%',
                bottom: '20%',
                width: 12,
                height: 12,
                backgroundColor: warning,
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '55%',
                top: '25%',
                width: 16,
                height: 14,
                backgroundColor: success,
                borderRadius: 0.5,
                transform: 'rotate(-8deg)',
              }}
            />
          </Box>
        </PreviewBox>
      ),
    },
  ]
}

/**
 * Props for the PatternCard component.
 */
interface PatternCardProps {
  pattern: LayoutPattern
  compact: boolean
  expanded: boolean
  onToggleExpand: () => void
}

/**
 * Renders a single layout pattern card with preview and details.
 */
const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  compact,
  expanded,
  onToggleExpand,
}) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: compact ? 1.5 : 2 }}>
        <Box sx={{ mb: 1.5 }}>{pattern.preview}</Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography
            variant={compact ? 'body2' : 'subtitle1'}
            fontWeight={600}
            sx={{ flexGrow: 1 }}
          >
            {pattern.name}
          </Typography>
          <Chip
            label={pattern.category}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 500,
              backgroundColor: CATEGORY_COLORS[pattern.category],
              color: '#ffffff',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            lineHeight: 1.4,
            fontSize: compact ? '0.75rem' : '0.875rem',
          }}
        >
          {pattern.characteristics}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="caption"
            color="primary"
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
              flexGrow: 1,
            }}
            onClick={onToggleExpand}
          >
            {expanded ? 'Hide Details' : 'View Details'}
          </Typography>
          <IconButton
            size="small"
            onClick={onToggleExpand}
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box
            sx={{
              mt: 1.5,
              pt: 1.5,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5 }}
            >
              Recommended Use Cases:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {pattern.useCases.map((useCase, index) => (
                <Chip
                  key={index}
                  label={useCase}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

/**
 * LayoutPatternsGallery displays an interactive gallery of 30 web layout patterns
 * organized by category with visual demos and filtering capabilities.
 *
 * @param props - The component props.
 * @returns A React component displaying the layout patterns gallery.
 *
 * @example
 * // Basic usage - shows all patterns with filter
 * <LayoutPatternsGallery />
 *
 * @example
 * // Filter to specific category by default
 * <LayoutPatternsGallery defaultCategory="Grid-Based" />
 *
 * @example
 * // Compact mode without filter
 * <LayoutPatternsGallery compact showFilter={false} />
 */
const LayoutPatternsGallery: React.FC<LayoutPatternsGalleryProps> = ({
  defaultCategory,
  showFilter = true,
  compact = false,
}) => {
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    defaultCategory || null,
  )
  const [expandedPatterns, setExpandedPatterns] = useState<Set<string>>(
    new Set(),
  )

  const layoutPatterns = useMemo(() => createLayoutPatterns(theme), [theme])

  const filteredPatterns = useMemo(() => {
    if (!selectedCategory) return layoutPatterns
    return layoutPatterns.filter((p) => p.category === selectedCategory)
  }, [layoutPatterns, selectedCategory])

  const handleCategoryClick = useCallback((category: string | null) => {
    setSelectedCategory((prev) => (prev === category ? null : category))
  }, [])

  const handleToggleExpand = useCallback((patternId: string) => {
    setExpandedPatterns((prev) => {
      const next = new Set(prev)
      if (next.has(patternId)) {
        next.delete(patternId)
      } else {
        next.add(patternId)
      }
      return next
    })
  }, [])

  const patternCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const pattern of layoutPatterns) {
      counts[pattern.category] = (counts[pattern.category] || 0) + 1
    }
    return counts
  }, [layoutPatterns])

  return (
    <Box>
      {showFilter && (
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Chip
            label={`All (${layoutPatterns.length})`}
            onClick={() => handleCategoryClick(null)}
            color={selectedCategory === null ? 'primary' : 'default'}
            variant={selectedCategory === null ? 'filled' : 'outlined'}
            sx={{ fontWeight: selectedCategory === null ? 600 : 400 }}
          />
          {ALL_CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={`${category} (${patternCountByCategory[category] || 0})`}
              onClick={() => handleCategoryClick(category)}
              sx={{
                fontWeight: selectedCategory === category ? 600 : 400,
                backgroundColor:
                  selectedCategory === category
                    ? CATEGORY_COLORS[category]
                    : 'transparent',
                color:
                  selectedCategory === category
                    ? '#ffffff'
                    : theme.palette.text.primary,
                borderColor: CATEGORY_COLORS[category],
                '&:hover': {
                  backgroundColor:
                    selectedCategory === category
                      ? CATEGORY_COLORS[category]
                      : `${CATEGORY_COLORS[category]}20`,
                },
              }}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      )}

      <Grid container spacing={compact ? 2 : 3}>
        {filteredPatterns.map((pattern) => (
          <Grid
            key={pattern.id}
            size={{
              xs: 12,
              sm: 6,
              md: compact ? 3 : 4,
              lg: compact ? 3 : 3,
            }}
          >
            <PatternCard
              pattern={pattern}
              compact={compact}
              expanded={expandedPatterns.has(pattern.id)}
              onToggleExpand={() => handleToggleExpand(pattern.id)}
            />
          </Grid>
        ))}
      </Grid>

      {filteredPatterns.length === 0 && (
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            No patterns found for the selected category.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default LayoutPatternsGallery
