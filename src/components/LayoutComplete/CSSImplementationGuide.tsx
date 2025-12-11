import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { SelectChangeEvent } from '@mui/material/Select'

/** Tab index type for the main tab navigation */
type TabIndex = 0 | 1 | 2

/** Layout mode for the interactive playground */
type LayoutMode = 'grid' | 'flexbox'

/** Flexbox direction values */
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

/** Flexbox justify-content values */
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

/** Flexbox align-items values */
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'

/** Grid auto-fit/auto-fill mode */
type GridAutoMode = 'auto-fit' | 'auto-fill'

/** Default tab mapping from prop to index */
const TAB_MAP: Record<string, TabIndex> = {
  grid: 0,
  flexbox: 1,
  comparison: 2,
}

/**
 * Props interface for the CSSImplementationGuide component.
 */
export interface CSSImplementationGuideProps {
  /**
   * The default tab to display when the component mounts.
   * @default 'grid'
   */
  defaultTab?: 'grid' | 'flexbox' | 'comparison'
  /**
   * Whether to show the interactive playground section.
   * @default true
   */
  showPlayground?: boolean
}

interface CodeBlockProps {
  /** The code to display */
  code: string
  /** Optional title for the code block */
  title?: string
}

/**
 * Displays a code block with syntax highlighting and copy functionality.
 *
 * @param props - Component props
 * @returns A styled code block with copy button
 */
const CodeBlock = ({ code, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  /**
   * Copies the code to clipboard and shows feedback.
   */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {title && (
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}
        >
          {title}
        </Typography>
      )}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: 'grey.900',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.400',
              '&:hover': { color: 'grey.100' },
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <pre
          style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: '#e1e1e1',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          <code>{code}</code>
        </pre>
      </Paper>
    </Box>
  )
}

/**
 * CSS Grid section component displaying grid-specific properties and examples.
 *
 * @returns A section covering CSS Grid fundamentals and MUI Grid v2 equivalent
 */
const GridSection = () => {
  const gridExamples = [
    {
      title: 'grid-template-columns/rows',
      description:
        'Defines the columns and rows of the grid with explicit track sizes.',
      cssCode: `.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
}`,
      muiCode: `<Grid container spacing={2}>
  <Grid size={3}>1fr</Grid>
  <Grid size={6}>2fr</Grid>
  <Grid size={3}>1fr</Grid>
</Grid>`,
    },
    {
      title: 'grid-template-areas',
      description: 'Defines named grid areas for semantic layout organization.',
      cssCode: `.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
      muiCode: `// MUI Grid v2 uses size prop
// For complex layouts, use CSS Grid via sx prop
<Box sx={{
  display: 'grid',
  gridTemplateAreas: \`
    "header header header"
    "sidebar main main"
    "footer footer footer"
  \`,
  gridTemplateColumns: '1fr 2fr 2fr',
}}>
  <Box sx={{ gridArea: 'header' }}>Header</Box>
  <Box sx={{ gridArea: 'sidebar' }}>Sidebar</Box>
  <Box sx={{ gridArea: 'main' }}>Main</Box>
  <Box sx={{ gridArea: 'footer' }}>Footer</Box>
</Box>`,
    },
    {
      title: 'gap property',
      description: 'Sets the spacing between grid items (gutters).',
      cssCode: `.container {
  display: grid;
  gap: 16px;           /* row and column gap */
  row-gap: 24px;       /* only row gap */
  column-gap: 16px;    /* only column gap */
}`,
      muiCode: `// MUI Grid uses spacing prop (multiplied by 8px)
<Grid container spacing={2}>  {/* 16px gap */}
  <Grid size={6}>Item 1</Grid>
  <Grid size={6}>Item 2</Grid>
</Grid>

// Or use sx prop for custom gap
<Box sx={{ display: 'grid', gap: 2 }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>`,
    },
    {
      title: 'auto-fit/auto-fill with minmax()',
      description:
        'Creates responsive columns that automatically wrap without media queries.',
      cssCode: `.container {
  display: grid;
  /* auto-fill: creates empty tracks */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  /* auto-fit: collapses empty tracks */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}`,
      muiCode: `// Use sx prop for auto-fit/auto-fill patterns
<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 2,
}}>
  <Paper>Card 1</Paper>
  <Paper>Card 2</Paper>
  <Paper>Card 3</Paper>
</Box>`,
    },
  ]

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h5" gutterBottom>
          CSS Grid
        </Typography>
        <Typography variant="body1" color="text.secondary">
          CSS Grid is a two-dimensional layout system that handles both columns
          and rows. It is ideal for complex layouts where you need precise
          control over both axes.
        </Typography>
      </Box>

      {gridExamples.map((example) => (
        <Paper key={example.title} variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {example.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {example.description}
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <CodeBlock code={example.cssCode} title="CSS" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CodeBlock code={example.muiCode} title="MUI Equivalent" />
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}

/**
 * Flexbox section component displaying flexbox-specific properties and examples.
 *
 * @returns A section covering Flexbox fundamentals and MUI Stack equivalent
 */
const FlexboxSection = () => {
  const flexboxExamples = [
    {
      title: 'display: flex',
      description:
        'Establishes a flex container and enables flex context for direct children.',
      cssCode: `.container {
  display: flex;
}

.container-inline {
  display: inline-flex;
}`,
      muiCode: `// Stack component uses flexbox internally
<Stack>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

// Or use Box with sx prop
<Box sx={{ display: 'flex' }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>`,
    },
    {
      title: 'flex-direction',
      description:
        'Defines the main axis direction (row or column) for flex items.',
      cssCode: `.container {
  display: flex;
  flex-direction: row;          /* default: left to right */
  flex-direction: row-reverse;  /* right to left */
  flex-direction: column;       /* top to bottom */
  flex-direction: column-reverse; /* bottom to top */
}`,
      muiCode: `<Stack direction="row">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

<Stack direction="column">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

// Responsive direction
<Stack direction={{ xs: 'column', sm: 'row' }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>`,
    },
    {
      title: 'justify-content',
      description: 'Aligns items along the main axis (horizontal for row).',
      cssCode: `.container {
  display: flex;
  justify-content: flex-start;    /* default: start of container */
  justify-content: flex-end;      /* end of container */
  justify-content: center;        /* center of container */
  justify-content: space-between; /* equal space between items */
  justify-content: space-around;  /* equal space around items */
  justify-content: space-evenly;  /* equal space everywhere */
}`,
      muiCode: `<Stack direction="row" justifyContent="center">
  <Box>Centered</Box>
</Stack>

<Stack direction="row" justifyContent="space-between">
  <Box>Start</Box>
  <Box>End</Box>
</Stack>

// Or use Box with sx
<Box sx={{
  display: 'flex',
  justifyContent: 'space-evenly'
}}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>`,
    },
    {
      title: 'align-items',
      description:
        'Aligns items along the cross axis (vertical for row direction).',
      cssCode: `.container {
  display: flex;
  align-items: stretch;     /* default: fill container height */
  align-items: flex-start;  /* align to start of cross axis */
  align-items: flex-end;    /* align to end of cross axis */
  align-items: center;      /* center on cross axis */
  align-items: baseline;    /* align text baselines */
}`,
      muiCode: `<Stack direction="row" alignItems="center">
  <Box>Centered</Box>
</Stack>

<Stack direction="row" alignItems="flex-start">
  <Box>Top aligned</Box>
</Stack>

// Combine with justifyContent for full control
<Stack
  direction="row"
  alignItems="center"
  justifyContent="center"
  sx={{ height: 200 }}
>
  <Box>Perfectly Centered</Box>
</Stack>`,
    },
    {
      title: 'gap',
      description:
        'Sets spacing between flex items (modern alternative to margins).',
      cssCode: `.container {
  display: flex;
  gap: 16px;           /* row and column gap */
  row-gap: 24px;       /* only row gap */
  column-gap: 16px;    /* only column gap */
}`,
      muiCode: `// Stack spacing prop (multiplied by 8px theme unit)
<Stack spacing={2}>  {/* 16px gap */}
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

// Responsive spacing
<Stack spacing={{ xs: 1, sm: 2, md: 3 }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

// Or use sx prop for gap
<Box sx={{ display: 'flex', gap: 2 }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>`,
    },
  ]

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Flexbox
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Flexbox is a one-dimensional layout system for arranging items in rows
          or columns. It excels at distributing space and aligning items within
          a container.
        </Typography>
      </Box>

      {flexboxExamples.map((example) => (
        <Paper key={example.title} variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {example.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {example.description}
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <CodeBlock code={example.cssCode} title="CSS" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <CodeBlock code={example.muiCode} title="MUI Equivalent" />
            </Box>
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}

/**
 * Comparison table data for CSS Grid vs Flexbox features.
 */
const comparisonData = [
  {
    feature: '2D Layout (rows + columns)',
    cssGrid: true,
    flexbox: false,
    muiComponent: 'Grid (with sx prop for complex layouts)',
  },
  {
    feature: '1D Layout (row or column)',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'Stack, Grid',
  },
  {
    feature: 'Gap/Gutter support',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'spacing prop, sx={{ gap }}',
  },
  {
    feature: 'Auto-sizing columns',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'xs/sm/md/lg/xl breakpoints',
  },
  {
    feature: 'Named template areas',
    cssGrid: true,
    flexbox: false,
    muiComponent: 'sx={{ gridTemplateAreas }}',
  },
  {
    feature: 'Content-based sizing',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'size="auto", size="grow"',
  },
  {
    feature: 'Implicit track creation',
    cssGrid: true,
    flexbox: false,
    muiComponent: 'sx={{ gridAutoRows }}',
  },
  {
    feature: 'Item alignment (cross-axis)',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'alignItems prop',
  },
  {
    feature: 'Item justification (main-axis)',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'justifyContent prop',
  },
  {
    feature: 'Responsive breakpoints',
    cssGrid: true,
    flexbox: true,
    muiComponent: '{ xs, sm, md, lg, xl } object syntax',
  },
  {
    feature: 'Order control',
    cssGrid: true,
    flexbox: true,
    muiComponent: 'sx={{ order }}',
  },
  {
    feature: 'Dividers between items',
    cssGrid: false,
    flexbox: false,
    muiComponent: 'Stack divider prop',
  },
]

/**
 * Comparison section component displaying a feature comparison table.
 *
 * @returns A table comparing CSS Grid, Flexbox, and MUI components
 */
const ComparisonSection = () => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Feature Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compare CSS Grid and Flexbox features alongside their MUI component
          equivalents.
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell>
                <Typography variant="subtitle2">Feature</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2">CSS Grid</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2">Flexbox</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">MUI Component</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisonData.map((row) => (
              <TableRow key={row.feature} hover>
                <TableCell>
                  <Typography variant="body2">{row.feature}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      color: row.cssGrid ? 'success.main' : 'text.disabled',
                      fontWeight: row.cssGrid ? 600 : 400,
                    }}
                  >
                    {row.cssGrid ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      color: row.flexbox ? 'success.main' : 'text.disabled',
                      fontWeight: row.flexbox ? 600 : 400,
                    }}
                  >
                    {row.flexbox ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                  >
                    {row.muiComponent}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* When to use which */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          When to Use Which?
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" color="primary.main">
              Use CSS Grid when:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul">
              <li>You need two-dimensional layouts (rows AND columns)</li>
              <li>You want to define named template areas</li>
              <li>You need items to span multiple rows/columns</li>
              <li>You want auto-fit/auto-fill responsive patterns</li>
              <li>The layout structure is more important than content order</li>
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="secondary.main">
              Use Flexbox when:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul">
              <li>You need one-dimensional layouts (row OR column)</li>
              <li>You want to distribute space among items</li>
              <li>You need to align items along a single axis</li>
              <li>Content order and flow are primary concerns</li>
              <li>You are building component-level layouts (nav, cards)</li>
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="info.main">
              In MUI:
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul">
              <li>
                Use <code>Stack</code> for simple one-dimensional layouts with
                spacing
              </li>
              <li>
                Use <code>Grid</code> for responsive 12-column layouts
              </li>
              <li>
                Use <code>Box</code> with <code>sx</code> prop for complex CSS
                Grid layouts
              </li>
              <li>
                Combine components: <code>Grid</code> for page layout,{' '}
                <code>Stack</code> for component layout
              </li>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}

interface PlaygroundState {
  mode: LayoutMode
  gap: number
  flexDirection: FlexDirection
  justifyContent: JustifyContent
  alignItems: AlignItems
  gridColumns: number
  gridAutoMode: GridAutoMode
  minItemWidth: number
}

/**
 * Interactive playground for experimenting with CSS Grid and Flexbox layouts.
 *
 * @returns An interactive playground with live preview and code generation
 */
const InteractivePlayground = () => {
  const [state, setState] = useState<PlaygroundState>({
    mode: 'flexbox',
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gridColumns: 3,
    gridAutoMode: 'auto-fit',
    minItemWidth: 150,
  })

  /**
   * Updates a single property in the playground state.
   *
   * @param key - The property key to update
   * @param value - The new value
   */
  const updateState = <K extends keyof PlaygroundState>(
    key: K,
    value: PlaygroundState[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const demoItems = [1, 2, 3, 4, 5, 6]

  /**
   * Generates the CSS code based on current playground state.
   *
   * @returns CSS code string
   */
  const generateCSSCode = (): string => {
    if (state.mode === 'flexbox') {
      return `.container {
  display: flex;
  flex-direction: ${state.flexDirection};
  justify-content: ${state.justifyContent};
  align-items: ${state.alignItems};
  gap: ${state.gap * 8}px;
}`
    }
    return `.container {
  display: grid;
  grid-template-columns: repeat(${state.gridAutoMode}, minmax(${state.minItemWidth}px, 1fr));
  gap: ${state.gap * 8}px;
}`
  }

  /**
   * Generates the MUI code based on current playground state.
   *
   * @returns MUI JSX code string
   */
  const generateMUICode = (): string => {
    if (state.mode === 'flexbox') {
      return `<Stack
  direction="${state.flexDirection}"
  justifyContent="${state.justifyContent}"
  alignItems="${state.alignItems}"
  spacing={${state.gap}}
>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>`
    }
    return `<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(${state.gridAutoMode}, minmax(${state.minItemWidth}px, 1fr))',
  gap: ${state.gap},
}}>
  <Paper>Item 1</Paper>
  <Paper>Item 2</Paper>
  <Paper>Item 3</Paper>
</Box>`
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Interactive Playground
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Toggle between Grid and Flexbox, adjust properties, and see the live
        preview.
      </Typography>

      {/* Mode Toggle */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Paper
          variant="outlined"
          onClick={() => updateState('mode', 'flexbox')}
          sx={{
            p: 2,
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center',
            bgcolor: state.mode === 'flexbox' ? 'primary.50' : 'transparent',
            borderColor: state.mode === 'flexbox' ? 'primary.main' : 'divider',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.light',
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: state.mode === 'flexbox' ? 600 : 400,
              color: state.mode === 'flexbox' ? 'primary.main' : 'text.primary',
            }}
          >
            Flexbox
          </Typography>
          <Typography variant="caption" color="text.secondary">
            One-dimensional layout
          </Typography>
        </Paper>
        <Paper
          variant="outlined"
          onClick={() => updateState('mode', 'grid')}
          sx={{
            p: 2,
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center',
            bgcolor: state.mode === 'grid' ? 'primary.50' : 'transparent',
            borderColor: state.mode === 'grid' ? 'primary.main' : 'divider',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.light',
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: state.mode === 'grid' ? 600 : 400,
              color: state.mode === 'grid' ? 'primary.main' : 'text.primary',
            }}
          >
            CSS Grid
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Two-dimensional layout
          </Typography>
        </Paper>
      </Stack>

      {/* Controls */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        {/* Common: Gap */}
        <Box>
          <Typography variant="body2" gutterBottom>
            Gap: <code>{state.gap}</code> ({state.gap * 8}px)
          </Typography>
          <Slider
            value={state.gap}
            onChange={(_, value) => updateState('gap', value as number)}
            min={0}
            max={8}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Flexbox-specific controls */}
        {state.mode === 'flexbox' && (
          <>
            <FormControl fullWidth size="small">
              <InputLabel>flex-direction</InputLabel>
              <Select
                value={state.flexDirection}
                label="flex-direction"
                onChange={(e: SelectChangeEvent) =>
                  updateState('flexDirection', e.target.value as FlexDirection)
                }
              >
                <MenuItem value="row">row</MenuItem>
                <MenuItem value="row-reverse">row-reverse</MenuItem>
                <MenuItem value="column">column</MenuItem>
                <MenuItem value="column-reverse">column-reverse</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>justify-content</InputLabel>
              <Select
                value={state.justifyContent}
                label="justify-content"
                onChange={(e: SelectChangeEvent) =>
                  updateState(
                    'justifyContent',
                    e.target.value as JustifyContent,
                  )
                }
              >
                <MenuItem value="flex-start">flex-start</MenuItem>
                <MenuItem value="flex-end">flex-end</MenuItem>
                <MenuItem value="center">center</MenuItem>
                <MenuItem value="space-between">space-between</MenuItem>
                <MenuItem value="space-around">space-around</MenuItem>
                <MenuItem value="space-evenly">space-evenly</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>align-items</InputLabel>
              <Select
                value={state.alignItems}
                label="align-items"
                onChange={(e: SelectChangeEvent) =>
                  updateState('alignItems', e.target.value as AlignItems)
                }
              >
                <MenuItem value="flex-start">flex-start</MenuItem>
                <MenuItem value="flex-end">flex-end</MenuItem>
                <MenuItem value="center">center</MenuItem>
                <MenuItem value="stretch">stretch</MenuItem>
                <MenuItem value="baseline">baseline</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        {/* Grid-specific controls */}
        {state.mode === 'grid' && (
          <>
            <FormControl fullWidth size="small">
              <InputLabel>auto-fit / auto-fill</InputLabel>
              <Select
                value={state.gridAutoMode}
                label="auto-fit / auto-fill"
                onChange={(e: SelectChangeEvent) =>
                  updateState('gridAutoMode', e.target.value as GridAutoMode)
                }
              >
                <MenuItem value="auto-fit">auto-fit (collapse empty)</MenuItem>
                <MenuItem value="auto-fill">auto-fill (keep empty)</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body2" gutterBottom>
                Min item width: <code>{state.minItemWidth}px</code>
              </Typography>
              <Slider
                value={state.minItemWidth}
                onChange={(_, value) =>
                  updateState('minItemWidth', value as number)
                }
                min={80}
                max={300}
                step={10}
                valueLabelDisplay="auto"
              />
            </Box>
          </>
        )}
      </Stack>

      {/* Live Preview */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: 'block' }}
        >
          Live Preview:
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: 200,
            bgcolor: 'grey.50',
            overflow: 'auto',
          }}
        >
          {state.mode === 'flexbox' ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: state.flexDirection,
                justifyContent: state.justifyContent,
                alignItems: state.alignItems,
                gap: state.gap,
                minHeight: 160,
                flexWrap: 'wrap',
              }}
            >
              {demoItems.map((num) => (
                <Paper
                  key={num}
                  elevation={2}
                  sx={{
                    p: 2,
                    minWidth: 60,
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  Item {num}
                </Paper>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${state.gridAutoMode}, minmax(${state.minItemWidth}px, 1fr))`,
                gap: state.gap,
              }}
            >
              {demoItems.map((num) => (
                <Paper
                  key={num}
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                  }}
                >
                  Item {num}
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Generated Code */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box sx={{ flex: 1 }}>
          <CodeBlock code={generateCSSCode()} title="Generated CSS" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CodeBlock code={generateMUICode()} title="Generated MUI Code" />
        </Box>
      </Stack>
    </Paper>
  )
}

/**
 * CSSImplementationGuide component for comparing CSS Grid, Flexbox, and MUI layouts.
 *
 * This interactive guide provides comprehensive documentation on:
 * - CSS Grid properties and their MUI equivalents
 * - Flexbox properties and their MUI equivalents
 * - A feature comparison table
 * - An interactive playground for experimenting with layouts
 *
 * @param props - Component configuration options
 * @returns A comprehensive CSS implementation guide component
 *
 * @example
 * // Basic usage - shows all tabs with playground
 * <CSSImplementationGuide />
 *
 * @example
 * // Start on comparison tab without playground
 * <CSSImplementationGuide defaultTab="comparison" showPlayground={false} />
 *
 * @example
 * // Start on flexbox tab
 * <CSSImplementationGuide defaultTab="flexbox" />
 */
const CSSImplementationGuide: React.FC<CSSImplementationGuideProps> = ({
  defaultTab = 'grid',
  showPlayground = true,
}) => {
  const [activeTab, setActiveTab] = useState<TabIndex>(TAB_MAP[defaultTab] ?? 0)

  /**
   * Handles tab change events.
   *
   * @param _ - Event object (unused)
   * @param newValue - The new tab index
   */
  const handleTabChange = (_: React.SyntheticEvent, newValue: TabIndex) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ maxWidth: 1000 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          CSS Implementation Guide
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A comprehensive guide comparing CSS Grid, Flexbox, and their MUI
          equivalents. Learn when to use each layout system and how to implement
          them effectively.
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="CSS Grid" />
          <Tab label="Flexbox" />
          <Tab label="Comparison" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mb: 4 }}>
        {activeTab === 0 && <GridSection />}
        {activeTab === 1 && <FlexboxSection />}
        {activeTab === 2 && <ComparisonSection />}
      </Box>

      {/* Interactive Playground */}
      {showPlayground && <InteractivePlayground />}
    </Box>
  )
}

export default CSSImplementationGuide
