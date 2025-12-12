import ArticleIcon from '@mui/icons-material/Article'
import CodeIcon from '@mui/icons-material/Code'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles'

/**
 * Column ratio options for two-column layout.
 * - 'equal': 50% / 50% split
 * - 'left-heavy': 60% / 40% split
 * - 'right-heavy': 40% / 60% split
 */
export type ColumnRatio = 'equal' | 'left-heavy' | 'right-heavy'

/**
 * Props for the TwoColumnLayout component.
 */
export interface TwoColumnLayoutProps {
  /**
   * Content for the left column.
   */
  leftColumn: React.ReactNode
  /**
   * Content for the right column.
   */
  rightColumn: React.ReactNode
  /**
   * Ratio between the two columns.
   * @default 'equal'
   */
  ratio?: ColumnRatio
  /**
   * Gap between columns in MUI spacing units (multiplied by 8px).
   * @default 4
   */
  gap?: number
  /**
   * Maximum width of the container.
   * @default 'lg'
   */
  maxWidth?: Breakpoint | false
  /**
   * Padding around the container in MUI spacing units.
   * @default 3
   */
  padding?: number
  /**
   * Whether columns should stack vertically on mobile.
   * @default true
   */
  responsive?: boolean
  /**
   * Breakpoint at which columns stack vertically.
   * @default 'md'
   */
  stackAt?: Breakpoint
  /**
   * Additional sx props for the outer container.
   */
  sx?: SxProps<Theme>
}

/**
 * Calculates flex values based on column ratio.
 *
 * @param ratio - The desired column ratio.
 * @returns Object containing left and right flex values.
 *
 * @example
 * getFlexValues('equal') // => { left: 1, right: 1 }
 * getFlexValues('left-heavy') // => { left: 3, right: 2 }
 */
const getFlexValues = (ratio: ColumnRatio): { left: number; right: number } => {
  switch (ratio) {
    case 'left-heavy':
      return { left: 3, right: 2 }
    case 'right-heavy':
      return { left: 2, right: 3 }
    case 'equal':
    default:
      return { left: 1, right: 1 }
  }
}

/**
 * TwoColumnLayout provides an equal-width two-column layout for balanced content presentation.
 *
 * This layout pattern is ideal for:
 * - Documentation sites with TOC sidebar and content
 * - Comparison pages showing side-by-side content
 * - About sections with image and text
 * - Feature lists with icons and descriptions
 * - Product pages with details and specifications
 *
 * The layout uses CSS Flexbox for robust column sizing and includes responsive
 * behavior to stack columns on smaller screens.
 *
 * @param props - The component props.
 * @returns A two-column layout container.
 *
 * @example
 * // Basic equal-width columns
 * <TwoColumnLayout
 *   leftColumn={<Typography>Left content</Typography>}
 *   rightColumn={<Typography>Right content</Typography>}
 * />
 *
 * @example
 * // Documentation layout with TOC
 * <TwoColumnLayout
 *   ratio="right-heavy"
 *   leftColumn={<TableOfContents />}
 *   rightColumn={<DocumentContent />}
 * />
 *
 * @example
 * // Full width with larger gap
 * <TwoColumnLayout
 *   maxWidth={false}
 *   gap={6}
 *   leftColumn={<FeatureImage />}
 *   rightColumn={<FeatureDescription />}
 * />
 */
const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  ratio = 'equal',
  gap = 4,
  maxWidth = 'lg',
  padding = 3,
  responsive = true,
  stackAt = 'md',
  sx,
}) => {
  const flexValues = getFlexValues(ratio)

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        ...sx,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          px: padding,
          py: padding,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: responsive
              ? { xs: 'column', [stackAt]: 'row' }
              : 'row',
            gap,
          }}
        >
          {/* Left Column */}
          <Box
            sx={{
              flex: responsive
                ? { xs: '1 1 auto', [stackAt]: `${flexValues.left} 1 0` }
                : `${flexValues.left} 1 0`,
              minWidth: 0, // Prevent flex item overflow
            }}
          >
            {leftColumn}
          </Box>

          {/* Right Column */}
          <Box
            sx={{
              flex: responsive
                ? { xs: '1 1 auto', [stackAt]: `${flexValues.right} 1 0` }
                : `${flexValues.right} 1 0`,
              minWidth: 0, // Prevent flex item overflow
            }}
          >
            {rightColumn}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TwoColumnLayout

// ============================================================================
// Real-World Example Components
// ============================================================================

/**
 * Navigation item type for documentation sidebar.
 */
interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode
  children?: NavItem[]
}

/**
 * Props for the DocumentationPage example component.
 */
export interface DocumentationPageProps {
  /**
   * Documentation title.
   */
  title?: string
  /**
   * Current page description.
   */
  description?: string
  /**
   * Navigation items for the sidebar.
   */
  navItems?: NavItem[]
  /**
   * Content sections for the main area.
   */
  sections?: Array<{
    id: string
    title: string
    content: string
  }>
}

/**
 * DocumentationPage demonstrates a real-world two-column layout for documentation sites.
 *
 * This example showcases:
 * - Sticky sidebar navigation with expandable sections
 * - Main content area with scrollable sections
 * - Active state indicators
 * - Responsive stacking on mobile
 *
 * @param props - The documentation page props.
 * @returns A complete documentation page layout.
 *
 * @example
 * <DocumentationPage
 *   title="Getting Started"
 *   sections={[
 *     { id: 'install', title: 'Installation', content: '...' },
 *     { id: 'usage', title: 'Basic Usage', content: '...' },
 *   ]}
 * />
 */
export const DocumentationPage: React.FC<DocumentationPageProps> = ({
  title = 'TwoColumnLayout Documentation',
  description = 'A comprehensive guide to using the TwoColumnLayout component in your applications.',
  navItems = [
    {
      id: 'getting-started',
      label: 'Getting Started',
      icon: <HomeIcon fontSize="small" />,
      children: [
        { id: 'installation', label: 'Installation' },
        { id: 'quick-start', label: 'Quick Start' },
      ],
    },
    {
      id: 'components',
      label: 'Components',
      icon: <CodeIcon fontSize="small" />,
      children: [
        { id: 'single-column', label: 'SingleColumnLayout' },
        { id: 'two-column', label: 'TwoColumnLayout' },
        { id: 'three-column', label: 'ThreeColumnLayout' },
      ],
    },
    {
      id: 'guides',
      label: 'Guides',
      icon: <ArticleIcon fontSize="small" />,
      children: [
        { id: 'responsive', label: 'Responsive Design' },
        { id: 'theming', label: 'Theming' },
        { id: 'accessibility', label: 'Accessibility' },
      ],
    },
    {
      id: 'api',
      label: 'API Reference',
      icon: <SettingsIcon fontSize="small" />,
    },
  ],
  sections = [
    {
      id: 'overview',
      title: 'Overview',
      content:
        'TwoColumnLayout provides a flexible two-column structure for presenting balanced content. It is built on CSS Flexbox and includes responsive behavior to stack columns on smaller screens.',
    },
    {
      id: 'when-to-use',
      title: 'When to Use',
      content:
        'Use TwoColumnLayout for documentation sites, comparison pages, and any content that benefits from side-by-side presentation. The equal-width columns create visual balance and improve content organization.',
    },
    {
      id: 'column-ratios',
      title: 'Column Ratios',
      content:
        'Choose from three ratio options: equal (50/50), left-heavy (60/40), or right-heavy (40/60). The ratio prop makes it easy to adjust the visual weight of each column based on your content needs.',
    },
    {
      id: 'responsive-behavior',
      title: 'Responsive Behavior',
      content:
        'By default, columns stack vertically on screens smaller than the md breakpoint (900px). You can customize this behavior with the stackAt and responsive props.',
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      content:
        'The layout uses semantic HTML and maintains proper reading order when columns stack. Ensure your content follows a logical heading hierarchy and includes appropriate ARIA labels where needed.',
    },
  ],
}) => {
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState<string | false>(
    'getting-started',
  )

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  // Sidebar Navigation
  const sidebar = (
    <Paper
      variant="outlined"
      sx={{
        position: 'sticky',
        top: 16,
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Documentation
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {navItems.map((item) =>
        item.children ? (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleAccordionChange(item.id)}
            disableGutters
            elevation={0}
            sx={{
              '&:before': { display: 'none' },
              bgcolor: 'transparent',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: 40,
                '& .MuiAccordionSummary-content': { my: 0.5 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.icon}
                <Typography variant="body2" fontWeight={500}>
                  {item.label}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 0 }}>
              <List dense disablePadding>
                {item.children.map((child) => (
                  <ListItem key={child.id} disablePadding>
                    <ListItemButton
                      sx={{
                        py: 0.5,
                        pl: 4,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemText
                        primary={child.label}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: 'text.secondary',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ) : (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{
                py: 1,
                borderRadius: 1,
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ),
      )}
    </Paper>
  )

  // Main Content
  const content = (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Chip label="Layouts" size="small" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <Box
          key={section.id}
          id={section.id}
          sx={{
            mb: 4,
            pb: 4,
            borderBottom:
              index < sections.length - 1
                ? `1px solid ${theme.palette.divider}`
                : 'none',
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {section.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            {section.content}
          </Typography>
        </Box>
      ))}

      {/* Code Example */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: theme.palette.grey[900],
          borderRadius: 1,
        }}
      >
        <Typography
          variant="body2"
          component="pre"
          sx={{
            m: 0,
            fontFamily: 'monospace',
            color: '#e1e1e1',
            whiteSpace: 'pre-wrap',
          }}
        >
          {`import { TwoColumnLayout } from '@mui/layouts'

<TwoColumnLayout
  ratio="right-heavy"
  gap={4}
  leftColumn={<Sidebar />}
  rightColumn={<Content />}
/>`}
        </Typography>
      </Paper>
    </Box>
  )

  return (
    <TwoColumnLayout
      ratio="right-heavy"
      gap={4}
      leftColumn={sidebar}
      rightColumn={content}
    />
  )
}
