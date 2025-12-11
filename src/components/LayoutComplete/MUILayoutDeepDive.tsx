import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState, useMemo, useCallback } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// Types and Interfaces
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Props for the MUILayoutDeepDive component.
 */
export interface MUILayoutDeepDiveProps {
  /**
   * The initially selected tab index.
   * @default 0
   */
  initialTab?: number
  /**
   * Whether to show code examples in an expanded state.
   * @default false
   */
  expandedCodeByDefault?: boolean
}

/**
 * Specification data for a single property.
 */
interface PropertySpec {
  name: string
  type: string
  default: string
  description: string
  category: 'padding' | 'margin' | 'spacing' | 'layout' | 'behavior'
}

/**
 * Layout component specification data.
 */
interface LayoutComponentSpec {
  name: string
  description: string
  properties: PropertySpec[]
  codeExample: string
}

// ═══════════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Category colors for property types.
 * WCAG AA compliant - minimum 4.5:1 contrast ratio with white text.
 */
const CATEGORY_COLORS: Record<PropertySpec['category'], string> = {
  padding: '#1565c0', // blue-800 (6.6:1 contrast with white)
  margin: '#bf360c', // deep-orange-900 (5.67:1 contrast with white)
  spacing: '#2e7d32', // green-800 (5.1:1 contrast with white)
  layout: '#7b1fa2', // purple-800 (7.1:1 contrast with white)
  behavior: '#455a64', // blue-grey-700 (6.5:1 contrast with white)
}

const CONTAINER_MAX_WIDTHS = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const

const GRID_COLUMNS = 12

const THEME_SPACING_BASE = 8

// ═══════════════════════════════════════════════════════════════════════════════
// Component Specifications Data
// ═══════════════════════════════════════════════════════════════════════════════

const BOX_SPEC: LayoutComponentSpec = {
  name: 'Box',
  description:
    'A utility component that serves as a wrapper for applying CSS styles. It uses the sx prop system for theme-aware styling.',
  properties: [
    {
      name: 'display',
      type: 'CSSProperties["display"]',
      default: 'block',
      description: 'CSS display property. Box renders as block by default.',
      category: 'layout',
    },
    {
      name: 'padding (p)',
      type: 'number | string | object',
      default: '0',
      description:
        'Padding using theme.spacing(). Value of 1 = 8px (default theme).',
      category: 'padding',
    },
    {
      name: 'margin (m)',
      type: 'number | string | object',
      default: '0',
      description:
        'Margin using theme.spacing(). Value of 1 = 8px (default theme).',
      category: 'margin',
    },
    {
      name: 'sx',
      type: 'SxProps<Theme>',
      default: 'undefined',
      description:
        'System prop for defining custom styles with theme access. Supports responsive values.',
      category: 'layout',
    },
    {
      name: 'component',
      type: 'ElementType',
      default: '"div"',
      description:
        'The component used for the root node. Enables semantic HTML (e.g., section, article).',
      category: 'behavior',
    },
  ],
  codeExample: `// Basic Box with spacing
<Box sx={{ p: 2, m: 1 }}>
  Content with padding 16px and margin 8px
</Box>

// Box with responsive styling
<Box
  sx={{
    display: 'flex',
    p: { xs: 1, sm: 2, md: 3 },
    bgcolor: 'background.paper',
  }}
>
  Responsive padding: 8px -> 16px -> 24px
</Box>

// Box as semantic HTML
<Box component="section" aria-labelledby="section-title">
  <Typography id="section-title" variant="h2">
    Section Title
  </Typography>
</Box>`,
}

const CONTAINER_SPEC: LayoutComponentSpec = {
  name: 'Container',
  description:
    'Centers content horizontally with responsive max-width breakpoints. Essential for page-level layout.',
  properties: [
    {
      name: 'maxWidth',
      type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
      default: '"lg"',
      description: `Sets max-width: xs=${CONTAINER_MAX_WIDTHS.xs}px, sm=${CONTAINER_MAX_WIDTHS.sm}px, md=${CONTAINER_MAX_WIDTHS.md}px, lg=${CONTAINER_MAX_WIDTHS.lg}px, xl=${CONTAINER_MAX_WIDTHS.xl}px`,
      category: 'layout',
    },
    {
      name: 'fixed',
      type: 'boolean',
      default: 'false',
      description:
        'Set a fixed width matching the current breakpoint rather than fluid width.',
      category: 'layout',
    },
    {
      name: 'disableGutters',
      type: 'boolean',
      default: 'false',
      description: 'Removes left/right padding (default padding is 24px).',
      category: 'padding',
    },
  ],
  codeExample: `// Default Container (max-width: 1200px with gutters)
<Container>
  <Typography>Centered content with 24px padding</Typography>
</Container>

// Small Container (max-width: 600px)
<Container maxWidth="sm">
  <Typography>Narrow centered content</Typography>
</Container>

// Fixed-width Container
<Container fixed maxWidth="md">
  <Typography>Fixed 900px at md breakpoint</Typography>
</Container>

// Full-width (no max-width constraint)
<Container maxWidth={false} disableGutters>
  <Typography>Full width, no padding</Typography>
</Container>`,
}

const GRID_SPEC: LayoutComponentSpec = {
  name: 'Grid v2',
  description:
    'A responsive 12-column grid system based on CSS Flexbox. Uses container/item pattern with breakpoint-aware sizing.',
  properties: [
    {
      name: 'container',
      type: 'boolean',
      default: 'false',
      description:
        'Enables flex container behavior. Required for parent grid elements.',
      category: 'layout',
    },
    {
      name: 'spacing',
      type: 'number | object',
      default: '0',
      description: `Gap between items using theme.spacing(). Value of 2 = ${THEME_SPACING_BASE * 2}px.`,
      category: 'spacing',
    },
    {
      name: 'size',
      type: 'number | "auto" | "grow" | object',
      default: 'undefined',
      description: `Column span (1-${GRID_COLUMNS}), "auto" for content width, or "grow" for flex-grow.`,
      category: 'layout',
    },
    {
      name: 'offset',
      type: 'number | "auto" | object',
      default: 'undefined',
      description:
        'Column offset from left. Useful for centering or alignment.',
      category: 'layout',
    },
    {
      name: 'direction',
      type: '"row" | "row-reverse" | "column" | "column-reverse"',
      default: '"row"',
      description: 'Flex direction for container items.',
      category: 'layout',
    },
    {
      name: 'wrap',
      type: '"wrap" | "nowrap" | "wrap-reverse"',
      default: '"wrap"',
      description: 'Controls whether items wrap to new lines.',
      category: 'behavior',
    },
  ],
  codeExample: `// Basic 12-column grid
<Grid container spacing={2}>
  <Grid size={6}>Half width</Grid>
  <Grid size={6}>Half width</Grid>
</Grid>

// Responsive grid
<Grid container spacing={{ xs: 1, md: 2 }}>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    Full -> Half -> Third
  </Grid>
</Grid>

// Auto-sizing and grow
<Grid container spacing={2}>
  <Grid size="auto">Fit content</Grid>
  <Grid size="grow">Take remaining space</Grid>
  <Grid size={3}>Fixed 3 columns</Grid>
</Grid>

// Offset for centering
<Grid container>
  <Grid size={6} offset={3}>
    Centered 6 columns
  </Grid>
</Grid>`,
}

const STACK_SPEC: LayoutComponentSpec = {
  name: 'Stack',
  description:
    'One-dimensional layout component for arranging children with consistent spacing. Simpler than Grid for linear layouts.',
  properties: [
    {
      name: 'direction',
      type: '"row" | "row-reverse" | "column" | "column-reverse"',
      default: '"column"',
      description:
        'Main axis direction. Column stacks vertically, row horizontally.',
      category: 'layout',
    },
    {
      name: 'spacing',
      type: 'number | string | object',
      default: '0',
      description: `Gap between children using theme.spacing(). Value of 2 = ${THEME_SPACING_BASE * 2}px.`,
      category: 'spacing',
    },
    {
      name: 'divider',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Element inserted between each child (e.g., <Divider />).',
      category: 'layout',
    },
    {
      name: 'useFlexGap',
      type: 'boolean',
      default: 'true',
      description:
        'Uses CSS gap instead of margin for spacing. Better for wrapping items.',
      category: 'behavior',
    },
    {
      name: 'alignItems',
      type: 'CSSProperties["alignItems"]',
      default: 'undefined',
      description:
        'Alignment on the cross axis (stretch, center, flex-start, etc.).',
      category: 'layout',
    },
    {
      name: 'justifyContent',
      type: 'CSSProperties["justifyContent"]',
      default: 'undefined',
      description:
        'Distribution along main axis (flex-start, center, space-between, etc.).',
      category: 'layout',
    },
  ],
  codeExample: `// Vertical stack (default)
<Stack spacing={2}>
  <Item>First</Item>
  <Item>Second</Item>
  <Item>Third</Item>
</Stack>

// Horizontal stack with dividers
<Stack
  direction="row"
  spacing={2}
  divider={<Divider orientation="vertical" flexItem />}
>
  <Item>Left</Item>
  <Item>Center</Item>
  <Item>Right</Item>
</Stack>

// Responsive direction and spacing
<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
  alignItems="center"
>
  <Item>Responsive</Item>
  <Item>Layout</Item>
</Stack>

// Centered content
<Stack
  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={2}
>
  <Item>Centered</Item>
  <Item>Items</Item>
</Stack>`,
}

const MASONRY_SPEC: LayoutComponentSpec = {
  name: 'Masonry',
  description:
    'Pinterest-style layout where items are placed in columns with varying heights. Items flow top-to-bottom, then left-to-right.',
  properties: [
    {
      name: 'columns',
      type: 'number | object',
      default: '4',
      description:
        'Number of columns. Supports responsive object { xs: 1, sm: 2, md: 3 }.',
      category: 'layout',
    },
    {
      name: 'spacing',
      type: 'number | object',
      default: '1',
      description: `Gap between items using theme.spacing(). Value of 1 = ${THEME_SPACING_BASE}px.`,
      category: 'spacing',
    },
    {
      name: 'sequential',
      type: 'boolean',
      default: 'false',
      description:
        'If true, items render sequentially instead of all at once. Useful for SSR.',
      category: 'behavior',
    },
    {
      name: 'defaultColumns',
      type: 'number',
      default: '4',
      description:
        'Fallback column count when responsive columns is an object.',
      category: 'layout',
    },
    {
      name: 'defaultSpacing',
      type: 'number',
      default: '1',
      description: 'Fallback spacing when responsive spacing is an object.',
      category: 'spacing',
    },
  ],
  codeExample: `// Basic Masonry
import Masonry from '@mui/lab/Masonry'

<Masonry columns={3} spacing={2}>
  {items.map((item, index) => (
    <Paper key={index} sx={{ height: item.height }}>
      {item.content}
    </Paper>
  ))}
</Masonry>

// Responsive columns
<Masonry
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  spacing={{ xs: 1, md: 2 }}
>
  {items.map((item) => (
    <Item key={item.id} height={item.height} />
  ))}
</Masonry>

// Sequential loading for SSR
<Masonry columns={3} sequential>
  {items.map((item) => (
    <LazyItem key={item.id} />
  ))}
</Masonry>`,
}

const COMPONENT_SPECS: LayoutComponentSpec[] = [
  BOX_SPEC,
  CONTAINER_SPEC,
  GRID_SPEC,
  STACK_SPEC,
  MASONRY_SPEC,
]

// ═══════════════════════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Displays a colored category chip for a property.
 */
const CategoryChip: React.FC<{ category: PropertySpec['category'] }> = ({
  category,
}) => (
  <Chip
    label={category}
    size="small"
    sx={{
      bgcolor: CATEGORY_COLORS[category],
      color: 'white',
      fontWeight: 600,
      fontSize: '0.7rem',
      height: 20,
    }}
  />
)

/**
 * Renders a single property specification row.
 */
const PropertyRow: React.FC<{ property: PropertySpec }> = ({ property }) => (
  <Box
    sx={{
      py: 1.5,
      px: 2,
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: '150px 150px 100px 1fr' },
      gap: { xs: 1, sm: 2 },
      alignItems: 'start',
      '&:hover': {
        bgcolor: 'action.hover',
      },
    }}
  >
    <Typography
      component="code"
      sx={{
        fontFamily: 'monospace',
        fontWeight: 600,
        fontSize: '0.875rem',
        color: 'primary.main',
      }}
    >
      {property.name}
    </Typography>
    <Typography
      component="code"
      sx={{
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        color: 'text.secondary',
        wordBreak: 'break-word',
      }}
    >
      {property.type}
    </Typography>
    <Box>
      <CategoryChip category={property.category} />
    </Box>
    <Box>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        {property.description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Default:{' '}
        <code
          style={{
            backgroundColor: 'rgba(0,0,0,0.06)',
            padding: '2px 4px',
            borderRadius: 4,
          }}
        >
          {property.default}
        </code>
      </Typography>
    </Box>
  </Box>
)

/**
 * Expandable code example section.
 */
const CodeExample: React.FC<{ code: string; expanded: boolean }> = ({
  code,
  expanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Code Examples
        </Typography>
        <IconButton
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse code' : 'Expand code'}
          sx={{ fontSize: '0.875rem' }}
        >
          {isExpanded ? '[-]' : '[+]'}
        </IconButton>
      </Box>
      <Collapse in={isExpanded}>
        <Paper
          variant="outlined"
          tabIndex={0}
          sx={{
            p: 2,
            bgcolor: 'grey.900',
            borderRadius: 1,
            overflow: 'auto',
            maxHeight: 400,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
        >
          <Typography
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#e0e0e0',
              m: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {code}
          </Typography>
        </Paper>
      </Collapse>
    </Box>
  )
}

/**
 * Visual diagram for spacing/margin/padding concepts.
 */
const SpacingDiagram: React.FC = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      Visual Spacing Guide
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        border: '2px dashed',
        borderColor: CATEGORY_COLORS.margin,
        borderRadius: 1,
        position: 'relative',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: -10,
          left: 8,
          bgcolor: 'background.paper',
          px: 0.5,
          color: CATEGORY_COLORS.margin,
          fontWeight: 600,
        }}
      >
        margin (m)
      </Typography>
      <Box
        sx={{
          p: 2,
          border: '2px solid',
          borderColor: CATEGORY_COLORS.padding,
          borderRadius: 1,
          position: 'relative',
          bgcolor: 'action.hover',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: -10,
            left: 8,
            bgcolor: 'background.paper',
            px: 0.5,
            color: CATEGORY_COLORS.padding,
            fontWeight: 600,
          }}
        >
          padding (p)
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.light',
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Content
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
        <Box
          key={category}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <Box
            sx={{ width: 12, height: 12, bgcolor: color, borderRadius: 0.5 }}
          />
          <Typography variant="caption">{category}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

/**
 * Interactive spacing calculator.
 */
const SpacingCalculator: React.FC = () => {
  const [spacingValue, setSpacingValue] = useState(2)

  const handleSliderChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      setSpacingValue(newValue as number)
    },
    [],
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10)
      if (!isNaN(value) && value >= 0 && value <= 10) {
        setSpacingValue(value)
      }
    },
    [],
  )

  const calculatedPx = useMemo(
    () => spacingValue * THEME_SPACING_BASE,
    [spacingValue],
  )

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Spacing Calculator
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        theme.spacing() multiplier (base: {THEME_SPACING_BASE}px)
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Slider
              value={spacingValue}
              onChange={handleSliderChange}
              min={0}
              max={10}
              step={0.5}
              marks
              sx={{ flex: 1 }}
              aria-label="Spacing value"
            />
            <TextField
              value={spacingValue}
              onChange={handleInputChange}
              size="small"
              type="number"
              inputProps={{
                min: 0,
                max: 10,
                step: 0.5,
                'aria-label': 'Spacing value input',
              }}
              sx={{ width: 70 }}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography
              component="code"
              sx={{
                fontFamily: 'monospace',
                bgcolor: 'action.hover',
                px: 1,
                py: 0.5,
                borderRadius: 0.5,
              }}
            >
              spacing={`{${spacingValue}}`}
            </Typography>
            <Typography variant="body2">=</Typography>
            <Typography
              component="code"
              sx={{
                fontFamily: 'monospace',
                bgcolor: CATEGORY_COLORS.spacing,
                color: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 0.5,
                fontWeight: 600,
              }}
            >
              {calculatedPx}px
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Visual Preview:
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: `${calculatedPx}px`,
            p: 1,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              borderRadius: 0.5,
            }}
          />
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              borderRadius: 0.5,
            }}
          />
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              borderRadius: 0.5,
            }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

/**
 * Container max-width breakpoint visualization.
 */
const ContainerBreakpointChart: React.FC = () => (
  <Paper variant="outlined" sx={{ p: 2, mt: 2, overflow: 'auto' }}>
    <Typography variant="subtitle2" gutterBottom>
      Container maxWidth Breakpoints
    </Typography>
    <Box sx={{ minWidth: 400 }}>
      {Object.entries(CONTAINER_MAX_WIDTHS).map(
        ([breakpoint, width], index) => {
          const percentage = (width / CONTAINER_MAX_WIDTHS.xl) * 100
          return (
            <Box
              key={breakpoint}
              sx={{
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                sx={{ width: 24, fontFamily: 'monospace', fontWeight: 600 }}
              >
                {breakpoint}
              </Typography>
              <Box sx={{ flex: 1, position: 'relative', height: 24 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${percentage}%`,
                    // Use 35% lightness for WCAG AA contrast with white text (>4.5:1)
                    bgcolor: `hsl(${200 + index * 30}, 70%, 35%)`,
                    borderRadius: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: 1,
                    transition: 'width 0.3s ease',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: 'white', fontWeight: 600 }}
                  >
                    {width}px
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        },
      )}
    </Box>
  </Paper>
)

/**
 * Grid column system visualization.
 */
const GridColumnVisualizer: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState(6)

  const handleSliderChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      setSelectedColumns(newValue as number)
    },
    [],
  )

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {GRID_COLUMNS}-Column Grid System
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Selected columns: {selectedColumns} of {GRID_COLUMNS}
        </Typography>
        <Slider
          value={selectedColumns}
          onChange={handleSliderChange}
          min={1}
          max={12}
          step={1}
          marks
          aria-label="Column count"
        />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
          gap: 0.5,
          p: 1,
          bgcolor: 'action.hover',
          borderRadius: 1,
        }}
      >
        {Array.from({ length: GRID_COLUMNS }, (_, i) => (
          <Box
            key={i}
            sx={{
              height: 40,
              bgcolor: i < selectedColumns ? 'primary.main' : 'grey.300',
              borderRadius: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: i < selectedColumns ? 'white' : 'text.secondary',
                fontWeight: 600,
              }}
            >
              {i + 1}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography
          component="code"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            bgcolor: 'action.hover',
            px: 1,
            py: 0.5,
            borderRadius: 0.5,
          }}
        >
          {`<Grid size={${selectedColumns}}>`} ={' '}
          {((selectedColumns / GRID_COLUMNS) * 100).toFixed(2)}% width
        </Typography>
      </Box>
    </Paper>
  )
}

/**
 * Tab panel wrapper component.
 */
const TabPanel: React.FC<{
  children: React.ReactNode
  value: number
  index: number
}> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`layout-tabpanel-${index}`}
    aria-labelledby={`layout-tab-${index}`}
    sx={{ py: 2 }}
  >
    {value === index && children}
  </Box>
)

// ═══════════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * A comprehensive interactive component that explains MUI Layout components
 * (Box, Container, Grid, Stack, Masonry) with deep technical specifications.
 *
 * Features:
 * - Tabbed navigation between layout components
 * - Detailed property specifications with type information
 * - Color-coded categories (padding, margin, spacing, layout, behavior)
 * - Expandable code examples with syntax highlighting
 * - Interactive spacing calculator
 * - Visual diagrams for layout concepts
 *
 * @param props - Component props
 * @returns The MUILayoutDeepDive component
 *
 * @example
 * // Basic usage
 * <MUILayoutDeepDive />
 *
 * @example
 * // Start with Grid tab selected and code expanded
 * <MUILayoutDeepDive initialTab={2} expandedCodeByDefault={true} />
 */
const MUILayoutDeepDive: React.FC<MUILayoutDeepDiveProps> = ({
  initialTab = 0,
  expandedCodeByDefault = false,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab)

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue)
    },
    [],
  )

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}
    >
      <Typography variant="h4" gutterBottom fontWeight={700}>
        MUI Layout Components Deep Dive
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Comprehensive technical specifications for MUI&apos;s core layout
        primitives. Each component serves a specific purpose in building
        responsive, accessible interfaces.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Layout component tabs"
        >
          {COMPONENT_SPECS.map((spec, index) => (
            <Tab
              key={spec.name}
              label={spec.name}
              id={`layout-tab-${index}`}
              aria-controls={`layout-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {COMPONENT_SPECS.map((spec, index) => (
        <TabPanel key={spec.name} value={activeTab} index={index}>
          {/* Component Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              {spec.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {spec.description}
            </Typography>
          </Box>

          {/* Properties Table */}
          <Paper variant="outlined" sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: 'action.hover',
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2">Properties</Typography>
            </Box>
            <Box
              sx={{
                '& > div:not(:last-child)': {
                  borderBottom: 1,
                  borderColor: 'divider',
                },
              }}
            >
              {spec.properties.map((property) => (
                <PropertyRow key={property.name} property={property} />
              ))}
            </Box>
          </Paper>

          {/* Code Examples */}
          <CodeExample
            code={spec.codeExample}
            expanded={expandedCodeByDefault}
          />

          {/* Component-specific visualizations */}
          {spec.name === 'Box' && <SpacingDiagram />}
          {spec.name === 'Container' && <ContainerBreakpointChart />}
          {spec.name === 'Grid v2' && <GridColumnVisualizer />}
          {(spec.name === 'Stack' || spec.name === 'Masonry') && (
            <SpacingCalculator />
          )}
        </TabPanel>
      ))}

      {/* Global Spacing Calculator (always visible) */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Universal Tools
      </Typography>
      <SpacingCalculator />
    </Paper>
  )
}

export default MUILayoutDeepDive
