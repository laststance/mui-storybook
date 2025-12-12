import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import React from 'react'

/**
 * Available spacing sizes for the stack layout.
 */
type StackSpacing = 'none' | 'small' | 'medium' | 'large' | 'xlarge'

/**
 * Divider style options between stack sections.
 */
type DividerStyle = 'none' | 'light' | 'full'

/**
 * Props for the StackLayout component.
 */
export interface StackLayoutProps {
  /**
   * The content sections to stack vertically.
   */
  children: React.ReactNode
  /**
   * Spacing between sections.
   * @default 'medium'
   */
  spacing?: StackSpacing
  /**
   * Maximum width of the container. Set to false for full width.
   * @default 'lg'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  /**
   * Whether to center the container.
   * @default true
   */
  centered?: boolean
  /**
   * Divider style between sections.
   * @default 'none'
   */
  dividerStyle?: DividerStyle
  /**
   * Padding around the entire stack.
   * @default 'medium'
   */
  padding?: StackSpacing
  /**
   * Background color of the stack.
   */
  backgroundColor?: string
}

/**
 * Mapping from spacing names to MUI spacing values.
 */
const SPACING_MAP: Record<StackSpacing, number> = {
  none: 0,
  small: 2,
  medium: 4,
  large: 6,
  xlarge: 8,
}

/**
 * StackLayout provides a vertically stacked layout for organizing content sections
 * with consistent spacing and optional dividers between sections.
 *
 * This layout is ideal for settings pages, long-form content, and any page
 * with grouped vertical sections that need consistent visual hierarchy.
 *
 * @param props - Component props.
 * @returns A vertically stacked layout container.
 *
 * @example
 * // Basic settings page layout
 * <StackLayout spacing="large" dividerStyle="light">
 *   <ProfileSection />
 *   <NotificationSection />
 *   <PrivacySection />
 * </StackLayout>
 *
 * @example
 * // Full-width landing page sections
 * <StackLayout maxWidth={false} spacing="xlarge">
 *   <HeroSection />
 *   <FeaturesSection />
 *   <TestimonialsSection />
 * </StackLayout>
 */
const StackLayout: React.FC<StackLayoutProps> = ({
  children,
  spacing = 'medium',
  maxWidth = 'lg',
  centered = true,
  dividerStyle = 'none',
  padding = 'medium',
  backgroundColor,
}) => {
  const theme = useTheme()
  const spacingValue = SPACING_MAP[spacing]
  const paddingValue = SPACING_MAP[padding]

  const childArray = React.Children.toArray(children)

  const content = (
    <Stack
      spacing={spacingValue}
      divider={
        dividerStyle !== 'none' ? (
          <Divider
            flexItem
            sx={{
              borderColor:
                dividerStyle === 'light'
                  ? theme.palette.divider
                  : theme.palette.grey[400],
              mx: dividerStyle === 'light' ? 2 : 0,
            }}
          />
        ) : undefined
      }
      sx={{
        width: '100%',
      }}
    >
      {childArray.map((child, index) => (
        <Box key={index} sx={{ width: '100%' }}>
          {child}
        </Box>
      ))}
    </Stack>
  )

  if (maxWidth === false) {
    return (
      <Box
        sx={{
          width: '100%',
          py: paddingValue,
          backgroundColor: backgroundColor || 'transparent',
        }}
      >
        {content}
      </Box>
    )
  }

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        py: paddingValue,
        backgroundColor: backgroundColor || 'transparent',
        ...(centered && {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }),
      }}
    >
      {content}
    </Container>
  )
}

export default StackLayout
