/**
 * Layout Pattern Components
 *
 * A collection of layout patterns for organizing content flow
 * with responsive behavior and flexible configurations.
 * Built with MUI v7 components and WCAG AA accessibility guidelines.
 */

// ============================================================================
// Column-Based Layouts
// ============================================================================

// Single Column Layout - Centered content for reading/mobile
export {
  default as SingleColumnLayout,
  BlogArticle,
} from './SingleColumnLayout'
export type {
  SingleColumnLayoutProps,
  BlogArticleProps,
} from './SingleColumnLayout'

// Two Column Layout - Equal width columns
export {
  default as TwoColumnLayout,
  DocumentationPage,
} from './TwoColumnLayout'
export type {
  TwoColumnLayoutProps,
  DocumentationPageProps,
} from './TwoColumnLayout'

// Three Column Layout - Main content with sidebars
export { default as ThreeColumnLayout, NewsPortal } from './ThreeColumnLayout'
export type {
  ThreeColumnLayoutProps,
  NewsPortalProps,
} from './ThreeColumnLayout'

// Left Right Layout - Asymmetric sidebar navigation
export { default as LeftRightLayout, EmailClient } from './LeftRightLayout'
export type { LeftRightLayoutProps, EmailClientProps } from './LeftRightLayout'

// Multi Column Layout - CSS columns for magazine-style
export {
  default as MultiColumnLayout,
  MagazineArticle,
} from './MultiColumnLayout'
export type {
  MultiColumnLayoutProps,
  MagazineArticleProps,
} from './MultiColumnLayout'

// ============================================================================
// Container/Flow Layouts
// ============================================================================

export { default as StackLayout } from './StackLayout'
export { default as RibbonLayout } from './RibbonLayout'
export { default as SplitScreenLayout } from './SplitScreenLayout'
export { default as OffCanvasLayout } from './OffCanvasLayout'
export { default as LiquidResponsiveLayout } from './LiquidResponsiveLayout'

// Re-export types
export type { StackLayoutProps } from './StackLayout'
export type { RibbonLayoutProps, RibbonBand } from './RibbonLayout'
export type { SplitScreenLayoutProps } from './SplitScreenLayout'
export type { OffCanvasLayoutProps } from './OffCanvasLayout'
export type {
  LiquidResponsiveLayoutProps,
  ResponsivePanel,
} from './LiquidResponsiveLayout'

// ============================================================================
// Data Display Layouts
// ============================================================================

// Tabbed Layout - Switchable panels for organized content
export { default as TabbedLayout, a11yProps } from './TabbedLayout'
export type { TabbedLayoutProps, TabConfig } from './TabbedLayout'

// Multi-Panel Layout - IDE-style resizable panes
export { default as MultiPanelLayout } from './MultiPanelLayout'
export type { MultiPanelLayoutProps, PanelConfig } from './MultiPanelLayout'

// Timeline Layout - Chronological event sequence
export { default as TimelineLayout } from './TimelineLayout'
export type { TimelineLayoutProps, TimelineEvent } from './TimelineLayout'

// Catalog Layout - Filterable list with thumbnails
export { default as CatalogLayout } from './CatalogLayout'
export type {
  CatalogLayoutProps,
  CatalogItem,
  FilterConfig,
  FilterOption,
  SortOption,
} from './CatalogLayout'

// Comparison Layout - Side-by-side feature/pricing tables
export { default as ComparisonLayout } from './ComparisonLayout'
export type {
  ComparisonLayoutProps,
  ComparisonOption,
  ComparisonFeature,
} from './ComparisonLayout'

// Form-Based Layout - Structured input fields with sections
export { default as FormBasedLayout } from './FormBasedLayout'
export type { FormBasedLayoutProps, FormSection } from './FormBasedLayout'

// ============================================================================
// Grid-Based Layouts
// ============================================================================

// Grid Layout - Structured rows and columns
export { default as GridLayout } from './GridLayout'
export type { GridLayoutProps } from './GridLayout'

// Masonry Layout - Pinterest-style variable height items
export { default as MasonryLayout } from './MasonryLayout'
export type { MasonryLayoutProps } from './MasonryLayout'

// Broken Grid Layout - Overlapping elements for creative impact
export { default as BrokenGridLayout } from './BrokenGridLayout'
export type {
  BrokenGridLayoutProps,
  BrokenGridStyle,
  OverlapIntensity,
} from './BrokenGridLayout'

// Non-Grid Layout - Free-form placement breaking traditional structure
export {
  default as NonGridLayout,
  InteractiveArtGallery,
} from './NonGridLayout'
export type { NonGridLayoutProps, NonGridElement } from './NonGridLayout'

// ============================================================================
// Scroll/Flow Layouts
// ============================================================================

// Full-Screen Layout - Immersive viewport-height sections
export { default as FullScreenLayout } from './FullScreenLayout'
export type {
  FullScreenLayoutProps,
  FullScreenSection,
} from './FullScreenLayout'

// Card-Based Layout - Self-contained content cards
export { default as CardBasedLayout } from './CardBasedLayout'
export type { CardBasedLayoutProps } from './CardBasedLayout'

// Infinite Scroll Layout - Continuous content loading
export { default as InfiniteScrollLayout } from './InfiniteScrollLayout'
export type { InfiniteScrollLayoutProps } from './InfiniteScrollLayout'

// Parallax Layout - Multi-layer depth effect
export { default as ParallaxLayout } from './ParallaxLayout'
export type { ParallaxLayoutProps } from './ParallaxLayout'

// ============================================================================
// Special Layouts
// ============================================================================

// FAB Layout - Floating action button for primary action
export { default as FABLayout } from './FABLayout'
export type {
  FABLayoutProps,
  FABAction,
  FABPosition,
  FABVariant,
} from './FABLayout'

// Overlay Layout - Modal/popup content layer
export { default as OverlayLayout } from './OverlayLayout'
export type { OverlayLayoutProps, GalleryImage } from './OverlayLayout'

// Circular Layout - Radial arrangement around center
export { default as CircularLayout } from './CircularLayout'
export type { CircularLayoutProps, CircularAction } from './CircularLayout'

// Canvas Layout - Free drawing/manipulation workspace
export { default as CanvasLayout } from './CanvasLayout'
export type { CanvasLayoutProps, StickyNote } from './CanvasLayout'

// Hierarchical Layout - Tree structure parent-child relationships
export { default as HierarchicalLayout } from './HierarchicalLayout'
export type {
  HierarchicalLayoutProps,
  FileNode,
  FileType,
} from './HierarchicalLayout'

// Scattered Layout - Randomly positioned elements (Freeform)
export { default as ScatteredLayout } from './ScatteredLayout'
export type { ScatteredLayoutProps, FloatingElement } from './ScatteredLayout'
