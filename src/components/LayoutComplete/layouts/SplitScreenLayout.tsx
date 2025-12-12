import Box from '@mui/material/Box'
import { useTheme, type SxProps, type Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'

/**
 * Split direction options.
 */
type SplitDirection = 'horizontal' | 'vertical'

/**
 * Split ratio presets.
 */
type SplitRatio = '50-50' | '40-60' | '60-40' | '30-70' | '70-30' | 'custom'

/**
 * Responsive behavior options.
 */
type ResponsiveBehavior = 'stack' | 'hide-left' | 'hide-right' | 'maintain'

/**
 * Props for the SplitScreenLayout component.
 */
export interface SplitScreenLayoutProps {
  /**
   * Content for the left (or top in vertical mode) panel.
   */
  leftContent: React.ReactNode
  /**
   * Content for the right (or bottom in vertical mode) panel.
   */
  rightContent: React.ReactNode
  /**
   * Split direction.
   * @default 'horizontal'
   */
  direction?: SplitDirection
  /**
   * Predefined split ratio.
   * @default '50-50'
   */
  ratio?: SplitRatio
  /**
   * Custom left panel width/height percentage (used when ratio is 'custom').
   * @default 50
   */
  customRatio?: number
  /**
   * Gap between panels in pixels.
   * @default 0
   */
  gap?: number
  /**
   * Minimum height of the layout.
   * @default '100vh'
   */
  minHeight?: string | number
  /**
   * Responsive behavior on mobile screens.
   * @default 'stack'
   */
  responsiveBehavior?: ResponsiveBehavior
  /**
   * Breakpoint for responsive behavior.
   * @default 'md'
   */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Whether to reverse the order when stacking on mobile.
   * @default false
   */
  reverseOnStack?: boolean
  /**
   * Background color for the left panel.
   */
  leftBackground?: string
  /**
   * Background color for the right panel.
   */
  rightBackground?: string
  /**
   * Additional styles for the left panel.
   */
  leftSx?: SxProps<Theme>
  /**
   * Additional styles for the right panel.
   */
  rightSx?: SxProps<Theme>
}

/**
 * Mapping from ratio presets to actual percentages.
 */
const RATIO_MAP: Record<Exclude<SplitRatio, 'custom'>, [number, number]> = {
  '50-50': [50, 50],
  '40-60': [40, 60],
  '60-40': [60, 40],
  '30-70': [30, 70],
  '70-30': [70, 30],
}

/**
 * SplitScreenLayout divides the viewport into two panels, ideal for
 * contrasting content like authentication pages or comparison views.
 *
 * This layout is commonly used for login/signup pages where one side
 * shows branding and the other shows the form.
 *
 * @param props - Component props.
 * @returns A split screen layout with two panels.
 *
 * @example
 * // Authentication page layout
 * <SplitScreenLayout
 *   leftContent={<BrandingPanel />}
 *   rightContent={<LoginForm />}
 *   ratio="40-60"
 *   leftBackground="#1976d2"
 *   responsiveBehavior="hide-left"
 * />
 *
 * @example
 * // Before/after comparison
 * <SplitScreenLayout
 *   leftContent={<BeforeImage />}
 *   rightContent={<AfterImage />}
 *   gap={4}
 * />
 */
const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({
  leftContent,
  rightContent,
  direction = 'horizontal',
  ratio = '50-50',
  customRatio = 50,
  gap = 0,
  minHeight = '100vh',
  responsiveBehavior = 'stack',
  breakpoint = 'md',
  reverseOnStack = false,
  leftBackground,
  rightBackground,
  leftSx,
  rightSx,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint))

  // Calculate ratios
  const [leftRatio, rightRatio] =
    ratio === 'custom' ? [customRatio, 100 - customRatio] : RATIO_MAP[ratio]

  // Determine if we should show panels based on responsive behavior
  const showLeft = !isMobile || responsiveBehavior !== 'hide-left'
  const showRight = !isMobile || responsiveBehavior !== 'hide-right'
  const shouldStack =
    isMobile && (responsiveBehavior === 'stack' || !showLeft || !showRight)

  // Calculate flex values for panels
  const getFlexValue = (
    panelRatio: number,
    isLeft: boolean,
  ): string | number => {
    if (shouldStack && responsiveBehavior === 'stack') {
      return 'none'
    }
    if (!isMobile || responsiveBehavior === 'maintain') {
      return `0 0 calc(${panelRatio}% - ${gap / 2}px)`
    }
    // Hidden panel case
    if ((isLeft && !showLeft) || (!isLeft && !showRight)) {
      return 0
    }
    return '1 1 100%'
  }

  const isHorizontal = direction === 'horizontal'

  const containerStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: shouldStack
      ? reverseOnStack
        ? 'column-reverse'
        : 'column'
      : isHorizontal
        ? 'row'
        : 'column',
    minHeight: shouldStack ? 'auto' : minHeight,
    gap: `${gap}px`,
    width: '100%',
    overflow: 'hidden',
  }

  const leftPanelStyles: SxProps<Theme> = {
    flex: getFlexValue(leftRatio, true),
    display: showLeft ? 'flex' : 'none',
    flexDirection: 'column',
    backgroundColor: leftBackground || 'transparent',
    overflow: 'auto',
    minHeight: shouldStack
      ? 'auto'
      : isHorizontal
        ? minHeight
        : `${leftRatio}%`,
    ...(shouldStack && { width: '100%' }),
    ...leftSx,
  }

  const rightPanelStyles: SxProps<Theme> = {
    flex: getFlexValue(rightRatio, false),
    display: showRight ? 'flex' : 'none',
    flexDirection: 'column',
    backgroundColor: rightBackground || 'transparent',
    overflow: 'auto',
    minHeight: shouldStack
      ? 'auto'
      : isHorizontal
        ? minHeight
        : `${rightRatio}%`,
    ...(shouldStack && { width: '100%' }),
    ...rightSx,
  }

  return (
    <Box sx={containerStyles}>
      <Box component="section" aria-label="Left panel" sx={leftPanelStyles}>
        {leftContent}
      </Box>
      <Box component="section" aria-label="Right panel" sx={rightPanelStyles}>
        {rightContent}
      </Box>
    </Box>
  )
}

export default SplitScreenLayout
