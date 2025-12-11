import CodeIcon from '@mui/icons-material/Code'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

/**
 * Badge types for trend categorization.
 * Hot: Currently trending, high adoption
 * Recommended: Best practice, stable adoption
 * Experimental: Cutting-edge, limited browser support
 */
type TrendBadge = 'hot' | 'recommended' | 'experimental'

/**
 * Maps badge types to their display properties.
 */
const BADGE_CONFIG: Record<
  TrendBadge,
  { label: string; color: 'error' | 'success' | 'warning' }
> = {
  hot: { label: 'Hot', color: 'error' },
  recommended: { label: 'Recommended', color: 'success' },
  experimental: { label: 'Experimental', color: 'warning' },
}

/**
 * Configuration for a single layout trend.
 */
interface TrendConfig {
  /** Unique identifier for the trend */
  id: string
  /** Display title */
  title: string
  /** Japanese subtitle for cultural context */
  subtitle?: string
  /** Brief description of the trend */
  description: string
  /** Badge indicating trend status */
  badge: TrendBadge
  /** Best use cases for this trend */
  useCases: string[]
  /** Code example demonstrating implementation */
  codeExample: string
  /** Component rendering the live demo */
  Demo: React.FC<{ enabled: boolean }>
}

// ============================================================================
// Demo Components for Each Trend
// ============================================================================

/**
 * Bento Grid Demo - Modular sections with varied sizes.
 * Inspired by Japanese bento boxes with organized compartments.
 */
const BentoGridDemo: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const theme = useTheme()

  if (!enabled) {
    return (
      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          Toggle to see Bento Grid demo
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 100px)',
        gap: 2,
        gridTemplateAreas: `
          "hero hero sidebar sidebar"
          "hero hero card1 card2"
          "feature1 feature2 card3 card3"
        `,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          gridArea: 'hero',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.primary.main,
          color: 'white',
          borderRadius: 3,
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Typography variant="h5">Hero Section</Typography>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          gridArea: 'sidebar',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.secondary.light,
          borderRadius: 3,
        }}
      >
        <Typography variant="body2">Sidebar</Typography>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          gridArea: 'card1',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="caption">Card 1</Typography>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          gridArea: 'card2',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="caption">Card 2</Typography>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          gridArea: 'feature1',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.info.light,
          borderRadius: 2,
        }}
      >
        <Typography variant="caption">Feature 1</Typography>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          gridArea: 'feature2',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.info.light,
          borderRadius: 2,
        }}
      >
        <Typography variant="caption">Feature 2</Typography>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          gridArea: 'card3',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.warning.light,
          borderRadius: 2,
        }}
      >
        <Typography variant="caption">Wide Card</Typography>
      </Paper>
    </Box>
  )
}

/**
 * Dimensionality and Layering Demo - Overlapping elements with depth.
 */
const DimensionalityDemo: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const theme = useTheme()

  if (!enabled) {
    return (
      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          Toggle to see Dimensionality demo
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: 300,
        overflow: 'hidden',
        borderRadius: 2,
        bgcolor: 'grey.50',
      }}
    >
      {/* Background layer */}
      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: '70%',
          height: '60%',
          bgcolor: theme.palette.primary.light,
          opacity: 0.3,
          borderRadius: 4,
          zIndex: 1,
        }}
      />

      {/* Middle layer */}
      <Paper
        elevation={4}
        sx={{
          position: 'absolute',
          top: 50,
          left: 50,
          width: '60%',
          height: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white',
          borderRadius: 3,
          zIndex: 2,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[12],
          },
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Middle Layer (z-index: 2)
        </Typography>
      </Paper>

      {/* Floating element */}
      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          top: 80,
          right: 40,
          width: 140,
          height: 140,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.secondary.main,
          color: 'white',
          borderRadius: '50%',
          zIndex: 3,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
          },
        }}
      >
        <Typography variant="caption" align="center">
          Floating
          <br />
          (z-index: 3)
        </Typography>
      </Paper>

      {/* Bottom accent */}
      <Paper
        elevation={2}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '30%',
          right: '10%',
          height: 60,
          bgcolor: theme.palette.success.light,
          borderRadius: 2,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption">
          Background accent (z-index: 1)
        </Typography>
      </Paper>
    </Box>
  )
}

/**
 * Asymmetric Grid Demo - Breaking perfect grid alignment.
 */
const AsymmetricGridDemo: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const theme = useTheme()

  if (!enabled) {
    return (
      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          Toggle to see Asymmetric Grid demo
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Large offset card */}
        <Grid size={{ xs: 12, md: 7 }} offset={{ md: 1 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: 120,
              bgcolor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateX(8px)' },
            }}
          >
            <Typography variant="h6">Offset Start (md: 1)</Typography>
          </Paper>
        </Grid>

        {/* Small card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">Standard Card</Typography>
          </Paper>
        </Grid>

        {/* Another offset card from end */}
        <Grid size={{ xs: 12, md: 5 }} offset={{ md: 2 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              height: 100,
              bgcolor: theme.palette.secondary.light,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2">Offset from left (md: 2)</Typography>
          </Paper>
        </Grid>

        {/* Wide card at the end */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              height: 100,
              bgcolor: theme.palette.warning.light,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption">Small end card</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

/**
 * Glassmorphism Demo - Backdrop blur effects with semi-transparent surfaces.
 */
const GlassmorphismDemo: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const theme = useTheme()

  if (!enabled) {
    return (
      <Box
        sx={{
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          Toggle to see Glassmorphism demo
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: 300,
        borderRadius: 3,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.info.main} 100%)`,
      }}
    >
      {/* Decorative background shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          right: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.15)',
        }}
      />

      {/* Glass card 1 */}
      <Box
        sx={{
          position: 'absolute',
          top: 30,
          left: 30,
          width: 200,
          p: 3,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          transition: 'transform 0.3s ease, background 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            background: 'rgba(255, 255, 255, 0.25)',
          },
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Glass Card
        </Typography>
        <Typography variant="caption" sx={{ opacity: 1 }}>
          backdrop-filter: blur(10px)
        </Typography>
      </Box>

      {/* Glass card 2 */}
      <Box
        sx={{
          position: 'absolute',
          top: 100,
          right: 40,
          width: 180,
          p: 2,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Typography variant="body2" fontWeight="medium">
          Heavy Blur
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.95 }}>
          blur(20px)
        </Typography>
      </Box>

      {/* Bottom glass bar */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          p: 2,
          borderRadius: 2,
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption">Navigation Bar</Typography>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Semi-transparent UI
        </Typography>
      </Box>
    </Box>
  )
}

// ============================================================================
// Trend Configurations
// ============================================================================

/**
 * All 2025 layout trends with their configurations.
 */
const LAYOUT_TRENDS: TrendConfig[] = [
  {
    id: 'bento-grid',
    title: 'Bento Grid',
    subtitle: '弁当箱グリッド',
    description:
      'Modular grid layouts inspired by Japanese bento boxes. Features varied cell sizes, clear visual hierarchy, and organized information compartments.',
    badge: 'hot',
    useCases: [
      'Dashboard layouts',
      'Portfolio showcases',
      'Feature highlights',
      'Landing pages',
      'Product galleries',
    ],
    codeExample: `// CSS Grid with named areas
<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(3, 100px)',
  gap: 2,
  gridTemplateAreas: \`
    "hero hero sidebar sidebar"
    "hero hero card1 card2"
    "feature1 feature2 card3 card3"
  \`
}}>
  <Box sx={{ gridArea: 'hero' }}>Hero</Box>
  <Box sx={{ gridArea: 'sidebar' }}>Sidebar</Box>
  {/* ... more areas */}
</Box>

// MUI Grid equivalent
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>Hero</Grid>
  <Grid size={{ xs: 12, md: 6 }}>Sidebar</Grid>
</Grid>`,
    Demo: BentoGridDemo,
  },
  {
    id: 'dimensionality',
    title: 'Dimensionality & Layering',
    description:
      'Creating depth through overlapping elements, shadows, and z-index layering. Adds visual interest and guides user attention through spatial hierarchy.',
    badge: 'recommended',
    useCases: [
      'Hero sections',
      'Feature callouts',
      'Interactive cards',
      'Floating action elements',
      'Onboarding flows',
    ],
    codeExample: `// Z-index layering with MUI Paper
<Box sx={{ position: 'relative', height: 400 }}>
  {/* Background layer */}
  <Paper
    elevation={0}
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '70%',
      height: '60%',
      bgcolor: 'primary.light',
      opacity: 0.3,
      zIndex: 1,
    }}
  />

  {/* Middle layer */}
  <Paper
    elevation={4}
    sx={{
      position: 'absolute',
      top: 40,
      left: 40,
      zIndex: 2,
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[12],
      }
    }}
  >
    Content
  </Paper>

  {/* Floating element */}
  <Paper
    elevation={8}
    sx={{ zIndex: 3 }}
  >
    Floating
  </Paper>
</Box>`,
    Demo: DimensionalityDemo,
  },
  {
    id: 'asymmetric',
    title: 'Asymmetric Grids',
    description:
      'Breaking perfect grid alignment to create visual tension and interest. Uses offset positioning and varied column widths for dynamic layouts.',
    badge: 'recommended',
    useCases: [
      'Editorial layouts',
      'Creative portfolios',
      'Marketing pages',
      'Magazine-style content',
      'Art galleries',
    ],
    codeExample: `// MUI Grid with offset
<Grid container spacing={2}>
  {/* Offset from start */}
  <Grid
    size={{ xs: 12, md: 7 }}
    offset={{ md: 1 }}
  >
    <Paper>Offset Start</Paper>
  </Grid>

  {/* Standard card */}
  <Grid size={{ xs: 12, md: 4 }}>
    <Paper>Standard</Paper>
  </Grid>

  {/* Another offset */}
  <Grid
    size={{ xs: 12, md: 5 }}
    offset={{ md: 2 }}
  >
    <Paper>Offset Left</Paper>
  </Grid>
</Grid>

// CSS Grid alternative
<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: 2,
}}>
  <Box sx={{ gridColumn: '2 / 9' }}>
    Offset content
  </Box>
</Box>`,
    Demo: AsymmetricGridDemo,
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism in Layouts',
    description:
      'Frosted glass effect using backdrop-filter blur on semi-transparent surfaces. Creates depth while maintaining content visibility behind elements.',
    badge: 'hot',
    useCases: [
      'Navigation bars',
      'Modal dialogs',
      'Card overlays',
      'Floating UI elements',
      'iOS-style interfaces',
    ],
    codeExample: `// Glassmorphism with MUI sx prop
<Box
  sx={{
    // Semi-transparent background
    background: 'rgba(255, 255, 255, 0.15)',

    // Blur effect (with webkit prefix for Safari)
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',

    // Subtle border for definition
    border: '1px solid rgba(255, 255, 255, 0.2)',

    // Rounded corners
    borderRadius: 3,

    // Hover enhancement
    transition: 'background 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
    }
  }}
>
  Glass content
</Box>

// Dark glass variant
<Box
  sx={{
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    color: 'white',
  }}
>
  Dark glass
</Box>`,
    Demo: GlassmorphismDemo,
  },
]

// ============================================================================
// TrendCard Component
// ============================================================================

interface TrendCardProps {
  /** The trend configuration to display */
  trend: TrendConfig
  /** Whether to show the live demo */
  showDemo: boolean
  /** Whether to show the code example */
  showCode: boolean
}

/**
 * Displays a single layout trend with demo, description, and code example.
 *
 * @param props - Component props
 * @returns A card component showcasing the layout trend
 */
const TrendCard: React.FC<TrendCardProps> = ({ trend, showDemo, showCode }) => {
  const [demoEnabled, setDemoEnabled] = useState(true)
  const badgeConfig = BADGE_CONFIG[trend.badge]

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="h6" fontWeight="bold">
              {trend.title}
            </Typography>
            <Chip
              label={badgeConfig.label}
              color={badgeConfig.color}
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          {trend.subtitle && (
            <Typography variant="caption" color="text.secondary">
              {trend.subtitle}
            </Typography>
          )}
        </Box>

        {showDemo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VisibilityIcon fontSize="small" color="action" />
            <Switch
              checked={demoEnabled}
              onChange={(e) => setDemoEnabled(e.target.checked)}
              size="small"
              inputProps={{ 'aria-label': 'Toggle demo visibility' }}
            />
          </Box>
        )}
      </Box>

      {/* Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {trend.description}
      </Typography>

      {/* Live Demo */}
      {showDemo && (
        <Box sx={{ mb: 3 }}>
          <trend.Demo enabled={demoEnabled} />
        </Box>
      )}

      {/* Use Cases */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          Best Use Cases
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {trend.useCases.map((useCase) => (
            <Chip
              key={useCase}
              label={useCase}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {/* Code Example */}
      {showCode && (
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            bgcolor: 'grey.50',
            borderRadius: 2,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: 48,
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
                gap: 1,
              },
            }}
          >
            <CodeIcon fontSize="small" />
            <Typography variant="body2" fontWeight="medium">
              Code Example
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="pre"
              sx={{
                p: 2,
                m: 0,
                bgcolor: 'grey.900',
                color: 'grey.100',
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                lineHeight: 1.5,
                maxHeight: 400,
              }}
            >
              <code>{trend.codeExample}</code>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Paper>
  )
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Props for the LayoutTrends2025 component.
 */
export interface LayoutTrends2025Props {
  /**
   * Whether to show live interactive demos.
   * @default true
   */
  showDemos?: boolean
  /**
   * Whether to show code examples.
   * @default true
   */
  showCode?: boolean
}

/**
 * LayoutTrends2025 showcases modern web layout trends for 2025.
 *
 * Features four key trends:
 * 1. Bento Grid - Modular, Japanese-inspired layouts
 * 2. Dimensionality & Layering - Depth through overlapping and z-index
 * 3. Asymmetric Grids - Breaking perfect alignment for visual interest
 * 4. Glassmorphism - Backdrop blur with semi-transparent surfaces
 *
 * Each trend includes:
 * - Live interactive demo with toggle
 * - Description and best use cases
 * - Code example with MUI implementation
 * - Trend badge (Hot, Recommended, Experimental)
 *
 * @param props - Component configuration
 * @returns A comprehensive showcase of 2025 layout trends
 *
 * @example
 * // Basic usage - shows all features
 * <LayoutTrends2025 />
 *
 * @example
 * // Without code examples
 * <LayoutTrends2025 showCode={false} />
 *
 * @example
 * // Without live demos
 * <LayoutTrends2025 showDemos={false} />
 */
const LayoutTrends2025: React.FC<LayoutTrends2025Props> = ({
  showDemos = true,
  showCode = true,
}) => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          2025 Web Layout Trends
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 800 }}
        >
          Modern web design is embracing modular, dimensional, and visually
          dynamic layouts. These trends prioritize user experience, visual
          hierarchy, and creative expression while maintaining accessibility and
          performance.
        </Typography>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        {Object.entries(BADGE_CONFIG).map(([key, config]) => (
          <Chip
            key={key}
            label={config.label}
            color={config.color}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>

      {/* Trend Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {LAYOUT_TRENDS.map((trend) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            showDemo={showDemos}
            showCode={showCode}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LayoutTrends2025
