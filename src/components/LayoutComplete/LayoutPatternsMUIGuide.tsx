/**
 * LayoutPatternsMUIGuide
 *
 * A comprehensive guide showing how to implement 30 web layout patterns
 * using MUI's core layout components: Box, Container, Grid, Stack, and Masonry.
 *
 * Each pattern includes:
 * - Visual demo
 * - MUI component mapping
 * - Code example
 * - Best practices
 */
import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Chip,
  Stack,
  Divider,
  IconButton,
  Collapse,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckIcon from '@mui/icons-material/Check'

/** Props for LayoutPatternsMUIGuide component */
export interface LayoutPatternsMUIGuideProps {
  /** Default category to show */
  defaultCategory?: PatternCategory
  /** Show code examples by default */
  showCodeByDefault?: boolean
  /** Compact mode for smaller displays */
  compact?: boolean
}

type PatternCategory =
  | 'all'
  | 'column'
  | 'grid'
  | 'scroll'
  | 'container'
  | 'data'
  | 'special'

type MUIComponent = 'Box' | 'Container' | 'Grid' | 'Stack' | 'Masonry'

interface LayoutPattern {
  id: number
  name: string
  nameJa: string
  category: PatternCategory
  description: string
  muiComponents: MUIComponent[]
  primaryComponent: MUIComponent
  codeExample: string
  useCases: string[]
  tips: string[]
}

/**
 * All 30 layout patterns with MUI implementation details
 */
const LAYOUT_PATTERNS: LayoutPattern[] = [
  // Column-Based (5)
  {
    id: 1,
    name: 'Single Column',
    nameJa: 'シングルカラム',
    category: 'column',
    description:
      'Simple vertical layout with content stacked in a single column. Perfect for mobile-first designs and blog posts.',
    muiComponents: ['Container', 'Stack'],
    primaryComponent: 'Container',
    codeExample: `<Container maxWidth="md">
  <Stack spacing={3}>
    <Typography variant="h1">Title</Typography>
    <Typography>Content paragraph...</Typography>
    <Typography>More content...</Typography>
  </Stack>
</Container>`,
    useCases: ['Blog posts', 'Landing pages', 'Mobile layouts', 'Article pages'],
    tips: [
      'Use Container for centered content with max-width',
      'Stack provides consistent vertical spacing',
    ],
  },
  {
    id: 2,
    name: 'Two Column',
    nameJa: '2カラム',
    category: 'column',
    description:
      'Main content with sidebar layout. Classic pattern for blogs and documentation sites.',
    muiComponents: ['Grid', 'Box'],
    primaryComponent: 'Grid',
    codeExample: `<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 8 }}>
    <Paper sx={{ p: 3 }}>Main Content</Paper>
  </Grid>
  <Grid size={{ xs: 12, md: 4 }}>
    <Paper sx={{ p: 3 }}>Sidebar</Paper>
  </Grid>
</Grid>`,
    useCases: ['Blog with sidebar', 'Documentation', 'Product pages'],
    tips: [
      'Use responsive breakpoints (xs, md) for mobile adaptation',
      'Consider sidebar placement (left vs right)',
    ],
  },
  {
    id: 3,
    name: 'Three Column',
    nameJa: '3カラム',
    category: 'column',
    description:
      'Left sidebar, main content, and right sidebar. Used by news sites and portals.',
    muiComponents: ['Grid', 'Box'],
    primaryComponent: 'Grid',
    codeExample: `<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 2 }}>
    <Paper sx={{ p: 2 }}>Left Nav</Paper>
  </Grid>
  <Grid size={{ xs: 12, md: 8 }}>
    <Paper sx={{ p: 2 }}>Main Content</Paper>
  </Grid>
  <Grid size={{ xs: 12, md: 2 }}>
    <Paper sx={{ p: 2 }}>Right Sidebar</Paper>
  </Grid>
</Grid>`,
    useCases: ['News portals', 'Admin dashboards', 'Complex applications'],
    tips: [
      'Collapse sidebars on mobile',
      'Use Drawer for off-canvas navigation on small screens',
    ],
  },
  {
    id: 4,
    name: 'Holy Grail',
    nameJa: 'ホーリーグレイル',
    category: 'column',
    description:
      'Header, footer, and three-column body. The classic web layout pattern.',
    muiComponents: ['Box', 'Grid'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <Box component="header" sx={{ p: 2, bgcolor: 'primary.main' }}>Header</Box>
  <Grid container sx={{ flex: 1 }}>
    <Grid size={{ xs: 12, md: 2 }}>Nav</Grid>
    <Grid size={{ xs: 12, md: 8 }}>Main</Grid>
    <Grid size={{ xs: 12, md: 2 }}>Aside</Grid>
  </Grid>
  <Box component="footer" sx={{ p: 2, bgcolor: 'grey.200' }}>Footer</Box>
</Box>`,
    useCases: ['Corporate websites', 'Web applications', 'Portals'],
    tips: [
      'Use minHeight: 100vh for full viewport coverage',
      'flex: 1 makes the main content area expand',
    ],
  },
  {
    id: 5,
    name: 'Fixed Sidebar',
    nameJa: '固定サイドバー',
    category: 'column',
    description:
      'Sidebar remains fixed while main content scrolls. Common in documentation and dashboards.',
    muiComponents: ['Box', 'Grid'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{ display: 'flex' }}>
  <Box sx={{
    width: 240,
    flexShrink: 0,
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto'
  }}>
    Sidebar
  </Box>
  <Box sx={{ ml: '240px', flex: 1, p: 3 }}>
    Scrollable Main Content
  </Box>
</Box>`,
    useCases: ['Documentation sites', 'Admin panels', 'Settings pages'],
    tips: [
      'Use position: fixed for sidebar',
      'Add margin-left to main content equal to sidebar width',
    ],
  },

  // Grid-Based (5)
  {
    id: 6,
    name: 'Grid Layout',
    nameJa: 'グリッドレイアウト',
    category: 'grid',
    description:
      'Elements arranged in rows and columns with consistent sizing and spacing.',
    muiComponents: ['Grid', 'Box'],
    primaryComponent: 'Grid',
    codeExample: `<Grid container spacing={2}>
  {items.map((item) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
      <Card>{item.content}</Card>
    </Grid>
  ))}
</Grid>`,
    useCases: ['E-commerce product lists', 'Image galleries', 'Card grids'],
    tips: [
      'Use responsive size props for different breakpoints',
      'spacing prop controls gap between items',
    ],
  },
  {
    id: 7,
    name: '12-Column Grid',
    nameJa: '12カラムグリッド',
    category: 'grid',
    description:
      'Standard 12-column grid system for precise layout control. Foundation of responsive design.',
    muiComponents: ['Grid'],
    primaryComponent: 'Grid',
    codeExample: `<Grid container spacing={2}>
  <Grid size={6}>Half width (6/12)</Grid>
  <Grid size={3}>Quarter (3/12)</Grid>
  <Grid size={3}>Quarter (3/12)</Grid>
  <Grid size={4}>Third (4/12)</Grid>
  <Grid size={8}>Two-thirds (8/12)</Grid>
</Grid>`,
    useCases: ['Complex layouts', 'Form layouts', 'Dashboard widgets'],
    tips: [
      'Column sizes should add up to 12 per row',
      'Use offset prop for spacing from left',
    ],
  },
  {
    id: 8,
    name: 'Masonry',
    nameJa: 'メイソンリー',
    category: 'grid',
    description:
      'Pinterest-style layout where items have varying heights but align to columns.',
    muiComponents: ['Masonry', 'Box'],
    primaryComponent: 'Masonry',
    codeExample: `import { Masonry } from '@mui/lab'

<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
  {items.map((item) => (
    <Paper key={item.id} sx={{ p: 2 }}>
      {item.content}
    </Paper>
  ))}
</Masonry>`,
    useCases: [
      'Image galleries',
      'Pinterest-style feeds',
      'Card collections with varying content',
    ],
    tips: [
      'Import from @mui/lab',
      'Each item can have different heights',
      'columns prop accepts responsive object',
    ],
  },
  {
    id: 9,
    name: 'Bento Grid',
    nameJa: '弁当箱グリッド',
    category: 'grid',
    description:
      'Modular grid with varied cell sizes inspired by Japanese bento boxes. Modern trend for dashboards.',
    muiComponents: ['Box', 'Grid'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(3, 150px)',
  gap: 2
}}>
  <Box sx={{ gridColumn: 'span 2', gridRow: 'span 2' }}>Hero</Box>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
  <Box sx={{ gridColumn: 'span 2' }}>Wide Card</Box>
</Box>`,
    useCases: ['Dashboards', 'Landing pages', 'Feature showcases'],
    tips: [
      'Use CSS Grid via sx prop for complex layouts',
      'gridColumn/gridRow span for varied sizes',
    ],
  },
  {
    id: 10,
    name: 'Auto-fit Grid',
    nameJa: '自動フィットグリッド',
    category: 'grid',
    description:
      'Responsive grid that automatically adjusts column count based on available space.',
    muiComponents: ['Box'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 2
}}>
  {items.map((item) => (
    <Paper key={item.id} sx={{ p: 2 }}>{item.content}</Paper>
  ))}
</Box>`,
    useCases: ['Card grids', 'Responsive galleries', 'Dynamic content'],
    tips: [
      'auto-fit creates columns as space allows',
      'minmax sets minimum and maximum column width',
    ],
  },

  // Scroll/Flow (5)
  {
    id: 11,
    name: 'Stacked Layout',
    nameJa: 'スタックレイアウト',
    category: 'scroll',
    description:
      'Vertical or horizontal linear arrangement with consistent spacing between elements.',
    muiComponents: ['Stack'],
    primaryComponent: 'Stack',
    codeExample: `<Stack spacing={2} direction="column">
  <Paper sx={{ p: 2 }}>Item 1</Paper>
  <Paper sx={{ p: 2 }}>Item 2</Paper>
  <Paper sx={{ p: 2 }}>Item 3</Paper>
</Stack>

// With dividers
<Stack spacing={2} divider={<Divider />}>
  <Box>Section 1</Box>
  <Box>Section 2</Box>
</Stack>`,
    useCases: ['Lists', 'Form sections', 'Navigation menus', 'News feeds'],
    tips: [
      'direction prop controls vertical/horizontal',
      'divider prop adds separators between items',
    ],
  },
  {
    id: 12,
    name: 'Infinite Scroll',
    nameJa: '無限スクロール',
    category: 'scroll',
    description:
      'Content loads continuously as user scrolls. No pagination needed.',
    muiComponents: ['Stack', 'Box'],
    primaryComponent: 'Stack',
    codeExample: `<Stack spacing={2}>
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
  {loading && <CircularProgress />}
  <Box ref={loadMoreRef} /> {/* Intersection observer target */}
</Stack>`,
    useCases: ['Social feeds', 'News sites', 'Product listings'],
    tips: [
      'Use IntersectionObserver to trigger loading',
      'Consider virtualization for large lists',
    ],
  },
  {
    id: 13,
    name: 'Horizontal Scroll',
    nameJa: '横スクロール',
    category: 'scroll',
    description:
      'Content scrolls horizontally within a container. Great for carousels and galleries.',
    muiComponents: ['Stack', 'Box'],
    primaryComponent: 'Stack',
    codeExample: `<Stack
  direction="row"
  spacing={2}
  sx={{
    overflowX: 'auto',
    pb: 2, // space for scrollbar
    '&::-webkit-scrollbar': { height: 8 },
    '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 4 }
  }}
>
  {items.map((item) => (
    <Card key={item.id} sx={{ minWidth: 280, flexShrink: 0 }}>
      {item.content}
    </Card>
  ))}
</Stack>`,
    useCases: ['Image carousels', 'Product sliders', 'Category navigation'],
    tips: [
      'Use flexShrink: 0 to prevent items from shrinking',
      'Add minWidth to maintain card sizes',
    ],
  },
  {
    id: 14,
    name: 'Parallax Layout',
    nameJa: 'パララックス',
    category: 'scroll',
    description:
      'Background elements move at different speeds than foreground during scroll.',
    muiComponents: ['Box'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{ position: 'relative', overflow: 'hidden' }}>
  <Box sx={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/hero.jpg)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    transform: 'translateZ(-1px) scale(1.5)',
    zIndex: -1
  }} />
  <Box sx={{ position: 'relative', p: 4 }}>
    Foreground Content
  </Box>
</Box>`,
    useCases: ['Hero sections', 'Landing pages', 'Storytelling sites'],
    tips: [
      'backgroundAttachment: fixed creates simple parallax',
      'For complex effects, use scroll event listeners',
    ],
  },
  {
    id: 15,
    name: 'Full-screen Layout',
    nameJa: 'フルスクリーン',
    category: 'scroll',
    description:
      'Each section takes up the entire viewport height. Creates immersive experiences.',
    muiComponents: ['Box', 'Stack'],
    primaryComponent: 'Box',
    codeExample: `<Stack>
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h1">Section 1</Typography>
  </Box>
  <Box sx={{ minHeight: '100vh', bgcolor: 'primary.main', display: 'flex', alignItems: 'center' }}>
    <Typography variant="h1">Section 2</Typography>
  </Box>
</Stack>`,
    useCases: ['Landing pages', 'Presentations', 'Product showcases'],
    tips: [
      'minHeight: 100vh ensures full viewport coverage',
      'Center content with flexbox alignment',
    ],
  },

  // Container/Flow (5)
  {
    id: 16,
    name: 'Centered Container',
    nameJa: '中央コンテナ',
    category: 'container',
    description:
      'Content centered with maximum width. The most common layout container pattern.',
    muiComponents: ['Container'],
    primaryComponent: 'Container',
    codeExample: `// Responsive max-width (xs, sm, md, lg, xl)
<Container maxWidth="lg">
  <Typography>Centered content with max-width</Typography>
</Container>

// Fixed width container
<Container fixed>
  <Typography>Fixed width based on breakpoint</Typography>
</Container>

// No gutters (padding)
<Container disableGutters>
  <Typography>Full-width content</Typography>
</Container>`,
    useCases: ['Page wrappers', 'Content sections', 'Article layouts'],
    tips: [
      'maxWidth: "lg" is common for main content',
      'disableGutters removes horizontal padding',
    ],
  },
  {
    id: 17,
    name: 'Split Screen',
    nameJa: '分割スクリーン',
    category: 'container',
    description:
      'Screen divided into two equal or weighted sections. Great for comparison or dual-focus content.',
    muiComponents: ['Grid', 'Stack'],
    primaryComponent: 'Grid',
    codeExample: `// Equal split
<Grid container sx={{ minHeight: '100vh' }}>
  <Grid size={6} sx={{ bgcolor: 'primary.main', p: 4 }}>
    Left Content
  </Grid>
  <Grid size={6} sx={{ bgcolor: 'background.paper', p: 4 }}>
    Right Content
  </Grid>
</Grid>

// Weighted split (60/40)
<Stack direction="row" sx={{ minHeight: '100vh' }}>
  <Box sx={{ flex: 6, p: 4 }}>Main Content</Box>
  <Box sx={{ flex: 4, p: 4 }}>Secondary</Box>
</Stack>`,
    useCases: ['Login pages', 'Product comparisons', 'Marketing pages'],
    tips: [
      'Use flex ratios for custom splits',
      'Stack to column on mobile with responsive direction',
    ],
  },
  {
    id: 18,
    name: 'Fluid Layout',
    nameJa: '流動レイアウト',
    category: 'container',
    description:
      'Layout adapts to any screen size using percentage-based or flexible sizing.',
    muiComponents: ['Box', 'Grid'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{ width: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Paper sx={{ p: 2, height: '100%' }}>Card</Paper>
    </Grid>
    {/* More items */}
  </Grid>
</Box>`,
    useCases: ['Responsive websites', 'Multi-device apps', 'Dynamic content'],
    tips: [
      'Use responsive objects for spacing: { xs: 1, md: 2 }',
      'Percentage widths adapt to container',
    ],
  },
  {
    id: 19,
    name: 'Sticky Header/Footer',
    nameJa: '固定ヘッダー/フッター',
    category: 'container',
    description:
      'Header or footer remains visible while scrolling through content.',
    muiComponents: ['Box', 'Stack'],
    primaryComponent: 'Box',
    codeExample: `<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <Box component="header" sx={{
    position: 'sticky',
    top: 0,
    zIndex: 1100,
    bgcolor: 'background.paper'
  }}>
    Header
  </Box>
  <Box sx={{ flex: 1, overflow: 'auto' }}>
    Main Scrollable Content
  </Box>
  <Box component="footer" sx={{
    position: 'sticky',
    bottom: 0
  }}>
    Footer
  </Box>
</Box>`,
    useCases: ['App shells', 'Navigation bars', 'Chat interfaces'],
    tips: [
      'position: sticky keeps element in view',
      'Use zIndex to ensure header stays on top',
    ],
  },
  {
    id: 20,
    name: 'Off-canvas Layout',
    nameJa: 'オフキャンバス',
    category: 'container',
    description:
      'Content slides in from off-screen when triggered. Common for mobile navigation.',
    muiComponents: ['Box', 'Stack'],
    primaryComponent: 'Box',
    codeExample: `// MUI Drawer handles this pattern
import Drawer from '@mui/material/Drawer'

<Box sx={{ display: 'flex' }}>
  <Drawer
    variant="temporary" // or "persistent", "permanent"
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    sx={{ width: 240 }}
  >
    Navigation Content
  </Drawer>
  <Box sx={{ flex: 1 }}>Main Content</Box>
</Box>`,
    useCases: ['Mobile navigation', 'Filter panels', 'Settings drawers'],
    tips: [
      'Use Drawer component for off-canvas patterns',
      'variant controls behavior: temporary, persistent, permanent',
    ],
  },

  // Data Display (5)
  {
    id: 21,
    name: 'Card Grid',
    nameJa: 'カードグリッド',
    category: 'data',
    description:
      'Individual cards/tiles displaying content in a grid. Each card is a self-contained unit.',
    muiComponents: ['Grid', 'Box'],
    primaryComponent: 'Grid',
    codeExample: `<Grid container spacing={3}>
  {products.map((product) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia image={product.image} sx={{ height: 200 }} />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography>{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buy Now</Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>`,
    useCases: ['E-commerce', 'Social feeds', 'News articles', 'Portfolios'],
    tips: [
      'height: 100% ensures equal card heights',
      'flexDirection: column with flex: 1 on content pushes actions to bottom',
    ],
  },
  {
    id: 22,
    name: 'List Layout',
    nameJa: 'リストレイアウト',
    category: 'data',
    description:
      'Vertical list of items with consistent structure. Great for data-dense displays.',
    muiComponents: ['Stack', 'Box'],
    primaryComponent: 'Stack',
    codeExample: `<Stack spacing={1}>
  {items.map((item) => (
    <Paper key={item.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar src={item.avatar} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </Box>
      <IconButton><MoreVertIcon /></IconButton>
    </Paper>
  ))}
</Stack>`,
    useCases: ['Email lists', 'User directories', 'Task lists', 'Search results'],
    tips: [
      'Use ListItem component for semantic lists',
      'flex: 1 on content allows action buttons to align right',
    ],
  },
  {
    id: 23,
    name: 'Dashboard Layout',
    nameJa: 'ダッシュボード',
    category: 'data',
    description:
      'Complex layout with multiple widgets, charts, and data displays organized in a grid.',
    muiComponents: ['Grid', 'Box'],
    primaryComponent: 'Grid',
    codeExample: `<Box sx={{ p: 3 }}>
  <Grid container spacing={3}>
    {/* Stats row */}
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ p: 2 }}>Stat 1</Paper>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ p: 2 }}>Stat 2</Paper>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ p: 2 }}>Stat 3</Paper>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Paper sx={{ p: 2 }}>Stat 4</Paper>
    </Grid>
    {/* Chart row */}
    <Grid size={{ xs: 12, md: 8 }}>
      <Paper sx={{ p: 2, height: 400 }}>Main Chart</Paper>
    </Grid>
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper sx={{ p: 2, height: 400 }}>Side Panel</Paper>
    </Grid>
  </Grid>
</Box>`,
    useCases: ['Admin panels', 'Analytics dashboards', 'Control centers'],
    tips: [
      'Group related widgets in logical rows',
      'Use consistent heights for adjacent widgets',
    ],
  },
  {
    id: 24,
    name: 'Timeline Layout',
    nameJa: 'タイムライン',
    category: 'data',
    description:
      'Content arranged chronologically along a vertical or horizontal axis.',
    muiComponents: ['Stack', 'Box'],
    primaryComponent: 'Stack',
    codeExample: `// Using MUI Lab Timeline
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'

<Timeline>
  {events.map((event, index) => (
    <TimelineItem key={event.id}>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        {index < events.length - 1 && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h6">{event.title}</Typography>
        <Typography variant="body2">{event.date}</Typography>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`,
    useCases: ['Event histories', 'Project timelines', 'Activity feeds'],
    tips: [
      'Use Timeline from @mui/lab for built-in styling',
      'Custom timelines can use Box with border-left',
    ],
  },
  {
    id: 25,
    name: 'Table Layout',
    nameJa: 'テーブルレイアウト',
    category: 'data',
    description:
      'Structured data in rows and columns. Best for comparing items with multiple attributes.',
    muiComponents: ['Box', 'Grid'],
    primaryComponent: 'Box',
    codeExample: `// Use MUI Table component
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell align="right">Role</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell align="right">{user.role}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>`,
    useCases: ['Data tables', 'Spreadsheet views', 'Comparison tables'],
    tips: [
      'Use TableContainer for horizontal scroll on small screens',
      'Consider DataGrid for advanced features',
    ],
  },

  // Special (5)
  {
    id: 26,
    name: 'Tabbed Layout',
    nameJa: 'タブレイアウト',
    category: 'special',
    description:
      'Content organized into tabs, showing one section at a time. Saves vertical space.',
    muiComponents: ['Box', 'Stack'],
    primaryComponent: 'Box',
    codeExample: `const [value, setValue] = useState(0)

<Box>
  <Tabs value={value} onChange={(e, v) => setValue(v)}>
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
    <Tab label="Tab 3" />
  </Tabs>
  <Box sx={{ p: 3 }}>
    {value === 0 && <Typography>Content 1</Typography>}
    {value === 1 && <Typography>Content 2</Typography>}
    {value === 2 && <Typography>Content 3</Typography>}
  </Box>
</Box>`,
    useCases: ['Settings pages', 'Product details', 'Multi-step forms'],
    tips: [
      'Use TabPanel component for cleaner code',
      'Consider vertical tabs for navigation-heavy UIs',
    ],
  },
  {
    id: 27,
    name: 'Modal/Overlay Layout',
    nameJa: 'モーダル/オーバーレイ',
    category: 'special',
    description:
      'Content appears above the main interface with a backdrop. Focuses user attention.',
    muiComponents: ['Box'],
    primaryComponent: 'Box',
    codeExample: `// Use MUI Dialog component
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Modal Title</DialogTitle>
  <DialogContent>
    <Typography>Modal content goes here...</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="contained">Confirm</Button>
  </DialogActions>
</Dialog>`,
    useCases: ['Confirmations', 'Forms', 'Detail views', 'Alerts'],
    tips: [
      'Use Dialog component for accessible modals',
      'fullScreen prop for mobile-friendly modals',
    ],
  },
  {
    id: 28,
    name: 'Accordion Layout',
    nameJa: 'アコーディオン',
    category: 'special',
    description:
      'Expandable/collapsible sections. Shows summary, reveals details on interaction.',
    muiComponents: ['Stack', 'Box'],
    primaryComponent: 'Stack',
    codeExample: `import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

<Stack>
  {sections.map((section) => (
    <Accordion key={section.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{section.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{section.content}</Typography>
      </AccordionDetails>
    </Accordion>
  ))}
</Stack>`,
    useCases: ['FAQs', 'Settings panels', 'Nested navigation'],
    tips: [
      'Use Accordion component for built-in expand/collapse',
      'expanded prop controls which panel is open',
    ],
  },
  {
    id: 29,
    name: 'Form Layout',
    nameJa: 'フォームレイアウト',
    category: 'special',
    description:
      'Structured layout for input fields, labels, and validation messages.',
    muiComponents: ['Stack', 'Grid'],
    primaryComponent: 'Stack',
    codeExample: `<Box component="form" sx={{ maxWidth: 600, mx: 'auto' }}>
  <Stack spacing={3}>
    <TextField label="Name" fullWidth required />
    <TextField label="Email" type="email" fullWidth required />
    <Grid container spacing={2}>
      <Grid size={6}>
        <TextField label="City" fullWidth />
      </Grid>
      <Grid size={6}>
        <TextField label="Zip" fullWidth />
      </Grid>
    </Grid>
    <Button type="submit" variant="contained" size="large">
      Submit
    </Button>
  </Stack>
</Box>`,
    useCases: ['Registration forms', 'Contact forms', 'Checkout flows'],
    tips: [
      'Stack for vertical form fields',
      'Grid for multi-column field rows',
      'fullWidth prop for consistent field widths',
    ],
  },
  {
    id: 30,
    name: 'Comparison Layout',
    nameJa: '比較レイアウト',
    category: 'special',
    description:
      'Side-by-side comparison of items, features, or plans. Highlights differences.',
    muiComponents: ['Grid', 'Stack'],
    primaryComponent: 'Grid',
    codeExample: `<Grid container spacing={3}>
  {plans.map((plan) => (
    <Grid size={{ xs: 12, md: 4 }} key={plan.id}>
      <Paper sx={{
        p: 3,
        height: '100%',
        border: plan.recommended ? 2 : 0,
        borderColor: 'primary.main'
      }}>
        <Stack spacing={2}>
          <Typography variant="h5">{plan.name}</Typography>
          <Typography variant="h3">{plan.price}</Typography>
          <Divider />
          <Stack spacing={1}>
            {plan.features.map((feature) => (
              <Box key={feature} sx={{ display: 'flex', gap: 1 }}>
                <CheckIcon color="success" />
                <Typography>{feature}</Typography>
              </Box>
            ))}
          </Stack>
          <Button variant={plan.recommended ? 'contained' : 'outlined'}>
            Choose Plan
          </Button>
        </Stack>
      </Paper>
    </Grid>
  ))}
</Grid>`,
    useCases: ['Pricing tables', 'Product comparisons', 'Feature matrices'],
    tips: [
      'Highlight recommended option with border or background',
      'Ensure all comparison cards have equal height',
    ],
  },
]

const CATEGORY_LABELS: Record<PatternCategory, { label: string; count: number }> = {
  all: { label: 'All Patterns', count: 30 },
  column: { label: 'Column-Based', count: 5 },
  grid: { label: 'Grid-Based', count: 5 },
  scroll: { label: 'Scroll/Flow', count: 5 },
  container: { label: 'Container', count: 5 },
  data: { label: 'Data Display', count: 5 },
  special: { label: 'Special', count: 5 },
}

const COMPONENT_COLORS: Record<MUIComponent, string> = {
  Box: '#1976d2',
  Container: '#9c27b0',
  Grid: '#2e7d32',
  Stack: '#ed6c02',
  Masonry: '#d32f2f',
}

/**
 * LayoutPatternsMUIGuide Component
 *
 * Displays all 30 layout patterns with their MUI implementations.
 *
 * @param props - Component props
 * @returns Interactive guide component
 */
const LayoutPatternsMUIGuide: React.FC<LayoutPatternsMUIGuideProps> = ({
  defaultCategory = 'all',
  showCodeByDefault = false,
  compact = false,
}) => {
  const theme = useTheme()
  const [category, setCategory] = useState<PatternCategory>(defaultCategory)
  const [expandedCodes, setExpandedCodes] = useState<Set<number>>(new Set())
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const filteredPatterns =
    category === 'all'
      ? LAYOUT_PATTERNS
      : LAYOUT_PATTERNS.filter((p) => p.category === category)

  const toggleCode = (id: number) => {
    setExpandedCodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const copyCode = async (code: string, id: number) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        30 Layout Patterns with MUI Implementation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Each pattern shows the primary MUI component and includes ready-to-use code examples.
        Click any pattern to see the implementation details.
      </Typography>

      {/* Category Tabs */}
      <Tabs
        value={category}
        onChange={(_, v) => setCategory(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {(Object.keys(CATEGORY_LABELS) as PatternCategory[]).map((cat) => (
          <Tab
            key={cat}
            value={cat}
            label={`${CATEGORY_LABELS[cat].label} (${CATEGORY_LABELS[cat].count})`}
          />
        ))}
      </Tabs>

      {/* Component Legend */}
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Primary Components:
        </Typography>
        {(Object.keys(COMPONENT_COLORS) as MUIComponent[]).map((comp) => (
          <Chip
            key={comp}
            label={comp}
            size="small"
            sx={{
              bgcolor: alpha(COMPONENT_COLORS[comp], 0.2), // Improved from 0.1 for better contrast
              color: COMPONENT_COLORS[comp],
              fontWeight: 600,
              fontFamily: 'monospace',
            }}
          />
        ))}
      </Stack>

      {/* Pattern Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: compact
            ? '1fr'
            : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 2,
        }}
      >
        {filteredPatterns.map((pattern) => (
          <Paper
            key={pattern.id}
            elevation={1}
            sx={{
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: COMPONENT_COLORS[pattern.primaryComponent],
                boxShadow: 2,
              },
            }}
          >
            {/* Pattern Header */}
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                cursor: 'pointer',
              }}
              onClick={() => toggleCode(pattern.id)}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: alpha(COMPONENT_COLORS[pattern.primaryComponent], 0.2), // Improved contrast
                  color: COMPONENT_COLORS[pattern.primaryComponent],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                {pattern.id}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {pattern.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {pattern.nameJa}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {pattern.description}
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                  {pattern.muiComponents.map((comp, i) => (
                    <Chip
                      key={comp}
                      label={comp}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        bgcolor:
                          i === 0
                            ? alpha(COMPONENT_COLORS[comp], 0.25) // Improved contrast
                            : 'transparent',
                        color: COMPONENT_COLORS[comp],
                        fontWeight: i === 0 ? 700 : 400,
                        border: i === 0 ? 'none' : '1px solid',
                        borderColor: COMPONENT_COLORS[comp],
                      }}
                    />
                  ))}
                </Stack>
              </Box>
              <IconButton size="small">
                {expandedCodes.has(pattern.id) || showCodeByDefault ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </Box>

            {/* Expandable Code Section */}
            <Collapse in={expandedCodes.has(pattern.id) || showCodeByDefault}>
              <Divider />
              <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary">
                    MUI Code Example
                  </Typography>
                  <Tooltip title={copiedId === pattern.id ? 'Copied!' : 'Copy code'}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyCode(pattern.codeExample, pattern.id)
                      }}
                    >
                      {copiedId === pattern.id ? (
                        <CheckIcon fontSize="small" color="success" />
                      ) : (
                        <ContentCopyIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                    overflow: 'auto',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.5,
                    m: 0,
                    maxHeight: 300,
                  }}
                >
                  <code>{pattern.codeExample}</code>
                </Box>

                {/* Use Cases & Tips */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">
                      Use Cases
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                      {pattern.useCases.map((useCase) => (
                        <Typography key={useCase} variant="caption">
                          • {useCase}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">
                      Tips
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                      {pattern.tips.map((tip) => (
                        <Typography key={tip} variant="caption">
                          💡 {tip}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Paper>
        ))}
      </Box>

      {/* Summary Stats */}
      <Paper sx={{ p: 2, mt: 3, bgcolor: 'background.default' }}>
        <Typography variant="subtitle2" gutterBottom>
          Quick Reference: MUI Component Selection
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Box sx={{ p: 1.5, bgcolor: alpha(COMPONENT_COLORS.Box, 0.2), borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ color: COMPONENT_COLORS.Box }}>
                Box
              </Typography>
              <Typography variant="caption">
                CSS Grid, Flexbox, Custom layouts, Wrappers
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Box sx={{ p: 1.5, bgcolor: alpha(COMPONENT_COLORS.Container, 0.2), borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ color: COMPONENT_COLORS.Container }}>
                Container
              </Typography>
              <Typography variant="caption">
                Centered content, Max-width, Page wrappers
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Box sx={{ p: 1.5, bgcolor: alpha(COMPONENT_COLORS.Grid, 0.2), borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ color: COMPONENT_COLORS.Grid }}>
                Grid
              </Typography>
              <Typography variant="caption">
                12-column system, Responsive layouts, Cards
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Box sx={{ p: 1.5, bgcolor: alpha(COMPONENT_COLORS.Stack, 0.2), borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ color: COMPONENT_COLORS.Stack }}>
                Stack
              </Typography>
              <Typography variant="caption">
                1D layouts, Lists, Forms, Spacing
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Box sx={{ p: 1.5, bgcolor: alpha(COMPONENT_COLORS.Masonry, 0.2), borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ color: COMPONENT_COLORS.Masonry }}>
                Masonry
              </Typography>
              <Typography variant="caption">
                Pinterest-style, Variable heights, Galleries
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default LayoutPatternsMUIGuide
