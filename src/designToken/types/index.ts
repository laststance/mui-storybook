import type {
  Theme,
  ThemeOptions,
  Palette as DefaultPalette,
  PaletteColor,
  Components,
  Mixins,
  Transitions,
  TypographyVariants,
  Shadows,
  ZIndex,
  Breakpoints,
  BreakpointsOptions,
  Shape,
  ShapeOptions,
  Direction,
} from '@mui/material/styles'
import type { Spacing, SpacingOptions } from '@mui/system'
import type { Color } from '@mui/material'

export function assertCast<T>(_v: unknown): asserts _v is T {}

// https://mui.com/customization/color/#color-palette
export interface Palette extends DefaultPalette {
  tertiary: PaletteColor
  oneOff: Color
  red: Color
  pink: Color
  purple: Color
  deepPurple: Color
  indigo: Color
  blue: Color
  lightBlue: Color
  cyan: Color
  teal: Color
  green: Color
  lightGreen: Color
  lime: Color
  yellow: Color
  amber: Color
  orange: Color
  deepOrange: Color
  brown: Color
  blueGrey: Color
}

export interface DesignToken extends Omit<Theme, 'palette'> {
  shape: Shape
  breakpoints: Breakpoints
  direction: Direction
  mixins: Mixins
  spacing: Spacing
  components?: Components
  palette: Palette
  shadows: Shadows
  transitions: Transitions
  typography: TypographyVariants
  zIndex: ZIndex
  unstable_strictMode?: boolean
}

export interface DesignTokenOptions extends ThemeOptions {
  shape?: ShapeOptions
  breakpoints?: BreakpointsOptions
  direction?: Direction
  mixins?: Partial<Mixins>
  palette?: Record<string, unknown>
  shadows?: Shadows
  spacing?: SpacingOptions
  transitions?: Partial<Transitions>
  components?: Components
  typography?: Partial<TypographyVariants>
  zIndex?: Partial<ZIndex>
}

export type CreateDesignToken = (
  options: DesignTokenOptions,
  ...args: object[]
) => DesignToken
