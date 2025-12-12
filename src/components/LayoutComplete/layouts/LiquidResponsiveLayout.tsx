import Box from '@mui/material/Box'
import {
  useTheme,
  type Breakpoint,
  type SxProps,
  type Theme,
} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'

/**
 * Responsive panel configuration.
 */
export interface ResponsivePanel {
  /**
   * Unique identifier for the panel.
   */
  id: string
  /**
   * Content to render in the panel.
   */
  content: React.ReactNode
  /**
   * Flex grow value at each breakpoint.
   * Higher values take more available space.
   */
  flex?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  /**
   * Minimum width of the panel.
   */
  minWidth?: number | string
  /**
   * Maximum width of the panel.
   */
  maxWidth?: number | string
  /**
   * Whether to hide the panel at specific breakpoints.
   */
  hideAt?: Breakpoint[]
  /**
   * Order of the panel at each breakpoint.
   */
  order?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  /**
   * Additional styles for the panel.
   */
  sx?: SxProps<Theme>
}

/**
 * Props for the LiquidResponsiveLayout component.
 */
export interface LiquidResponsiveLayoutProps {
  /**
   * Array of panel configurations.
   */
  panels: ResponsivePanel[]
  /**
   * Gap between panels at each breakpoint.
   */
  gap?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  /**
   * Direction of the layout.
   * @default 'row'
   */
  direction?: 'row' | 'column'
  /**
   * Whether to wrap panels when they overflow.
   * @default true
   */
  wrap?: boolean
  /**
   * Alignment of panels along the cross axis.
   * @default 'stretch'
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  /**
   * Justification of panels along the main axis.
   * @default 'flex-start'
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  /**
   * Minimum height of the layout.
   */
  minHeight?: string | number
  /**
   * Padding around the layout at each breakpoint.
   */
  padding?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  /**
   * Background color of the layout.
   */
  backgroundColor?: string
}

/**
 * LiquidResponsiveLayout provides a fluid layout with flexible panels that
 * adapt to any screen size, perfect for responsive dashboards.
 *
 * This layout uses CSS flexbox to create truly fluid layouts where panels
 * grow and shrink based on available space and configured flex values.
 *
 * @param props - Component props.
 * @returns A liquid responsive layout with flexible panels.
 *
 * @example
 * // Responsive dashboard with sidebar and main content
 * <LiquidResponsiveLayout
 *   panels={[
 *     { id: 'sidebar', content: <Sidebar />, flex: { xs: 0, md: 1 }, minWidth: 200, maxWidth: 300 },
 *     { id: 'main', content: <Dashboard />, flex: { xs: 1, md: 3 } },
 *     { id: 'widgets', content: <Widgets />, flex: { xs: 0, lg: 1 }, hideAt: ['xs', 'sm'] },
 *   ]}
 *   gap={{ xs: 2, md: 3 }}
 * />
 *
 * @example
 * // Holy grail layout with header, footer, and three columns
 * <LiquidResponsiveLayout
 *   direction="column"
 *   panels={[
 *     { id: 'header', content: <Header />, flex: { xs: 0 } },
 *     {
 *       id: 'body',
 *       content: (
 *         <LiquidResponsiveLayout
 *           panels={[
 *             { id: 'nav', content: <Nav />, flex: { xs: 1, md: 1 } },
 *             { id: 'content', content: <Content />, flex: { xs: 1, md: 4 } },
 *             { id: 'aside', content: <Aside />, flex: { xs: 1, md: 1 } },
 *           ]}
 *         />
 *       ),
 *       flex: { xs: 1 },
 *     },
 *     { id: 'footer', content: <Footer />, flex: { xs: 0 } },
 *   ]}
 * />
 */
const LiquidResponsiveLayout: React.FC<LiquidResponsiveLayoutProps> = ({
  panels,
  gap = { xs: 2 },
  direction = 'row',
  wrap = true,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  minHeight,
  padding = { xs: 2 },
  backgroundColor,
}) => {
  const theme = useTheme()

  // Create responsive gap values
  const gapValues: Record<string, number | undefined> = {
    xs: gap.xs,
    sm: gap.sm ?? gap.xs,
    md: gap.md ?? gap.sm ?? gap.xs,
    lg: gap.lg ?? gap.md ?? gap.sm ?? gap.xs,
    xl: gap.xl ?? gap.lg ?? gap.md ?? gap.sm ?? gap.xs,
  }

  // Create responsive padding values
  const paddingValues: Record<string, number | undefined> = {
    xs: padding.xs,
    sm: padding.sm ?? padding.xs,
    md: padding.md ?? padding.sm ?? padding.xs,
    lg: padding.lg ?? padding.md ?? padding.sm ?? padding.xs,
    xl: padding.xl ?? padding.lg ?? padding.md ?? padding.sm ?? padding.xs,
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems,
        justifyContent,
        gap: {
          xs: gapValues.xs,
          sm: gapValues.sm,
          md: gapValues.md,
          lg: gapValues.lg,
          xl: gapValues.xl,
        },
        p: {
          xs: paddingValues.xs,
          sm: paddingValues.sm,
          md: paddingValues.md,
          lg: paddingValues.lg,
          xl: paddingValues.xl,
        },
        minHeight: minHeight,
        backgroundColor: backgroundColor || 'transparent',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {panels.map((panel) => (
        <PanelWrapper key={panel.id} panel={panel} theme={theme} />
      ))}
    </Box>
  )
}

/**
 * Internal panel wrapper component.
 */
const PanelWrapper: React.FC<{ panel: ResponsivePanel; theme: Theme }> = ({
  panel,
  theme,
}) => {
  const {
    id,
    content,
    flex = {},
    minWidth,
    maxWidth,
    hideAt = [],
    order = {},
    sx,
  } = panel

  // Check visibility for each breakpoint
  const isXsHidden =
    useMediaQuery(theme.breakpoints.only('xs')) && hideAt.includes('xs')
  const isSmHidden =
    useMediaQuery(theme.breakpoints.only('sm')) && hideAt.includes('sm')
  const isMdHidden =
    useMediaQuery(theme.breakpoints.only('md')) && hideAt.includes('md')
  const isLgHidden =
    useMediaQuery(theme.breakpoints.only('lg')) && hideAt.includes('lg')
  const isXlHidden =
    useMediaQuery(theme.breakpoints.only('xl')) && hideAt.includes('xl')

  if (isXsHidden || isSmHidden || isMdHidden || isLgHidden || isXlHidden) {
    return null
  }

  // Calculate flex values with cascade
  const flexValues = {
    xs: flex.xs ?? 1,
    sm: flex.sm ?? flex.xs ?? 1,
    md: flex.md ?? flex.sm ?? flex.xs ?? 1,
    lg: flex.lg ?? flex.md ?? flex.sm ?? flex.xs ?? 1,
    xl: flex.xl ?? flex.lg ?? flex.md ?? flex.sm ?? flex.xs ?? 1,
  }

  // Calculate order values with cascade
  const orderValues = {
    xs: order.xs ?? 0,
    sm: order.sm ?? order.xs ?? 0,
    md: order.md ?? order.sm ?? order.xs ?? 0,
    lg: order.lg ?? order.md ?? order.sm ?? order.xs ?? 0,
    xl: order.xl ?? order.lg ?? order.md ?? order.sm ?? order.xs ?? 0,
  }

  return (
    <Box
      data-panel-id={id}
      sx={{
        flex: {
          xs: flexValues.xs,
          sm: flexValues.sm,
          md: flexValues.md,
          lg: flexValues.lg,
          xl: flexValues.xl,
        },
        order: {
          xs: orderValues.xs,
          sm: orderValues.sm,
          md: orderValues.md,
          lg: orderValues.lg,
          xl: orderValues.xl,
        },
        minWidth: minWidth ?? 0,
        maxWidth: maxWidth ?? 'none',
        display: {
          xs: hideAt.includes('xs') ? 'none' : 'block',
          sm: hideAt.includes('sm') ? 'none' : 'block',
          md: hideAt.includes('md') ? 'none' : 'block',
          lg: hideAt.includes('lg') ? 'none' : 'block',
          xl: hideAt.includes('xl') ? 'none' : 'block',
        },
        ...sx,
      }}
    >
      {content}
    </Box>
  )
}

export default LiquidResponsiveLayout
