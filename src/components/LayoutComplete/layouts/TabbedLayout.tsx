import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { useState } from 'react'

/**
 * Props for the TabPanel helper component.
 */
interface TabPanelProps {
  /** Content to render inside the panel */
  children?: React.ReactNode
  /** Index of this panel */
  index: number
  /** Currently active tab value */
  value: number
  /** Accessible ID prefix */
  idPrefix?: string
}

/**
 * TabPanel renders content for a single tab.
 * Only visible when the parent Tabs value matches this panel's index.
 *
 * @param props - TabPanel configuration
 * @returns Hidden or visible panel content
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, idPrefix = 'tabbed-layout', ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${idPrefix}-tabpanel-${index}`}
      aria-labelledby={`${idPrefix}-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

/**
 * Configuration for a single tab.
 */
export interface TabConfig {
  /** Unique identifier for the tab */
  id: string
  /** Display label for the tab */
  label: string
  /** Optional icon to display with or instead of label */
  icon?: React.ReactElement
  /** Whether to show icon only (no label) */
  iconOnly?: boolean
  /** Whether this tab is disabled */
  disabled?: boolean
  /** Content to render when this tab is selected */
  content: React.ReactNode
}

/**
 * Props for the TabbedLayout component.
 */
export interface TabbedLayoutProps {
  /** Array of tab configurations */
  tabs: TabConfig[]
  /** Initially selected tab index */
  defaultTab?: number
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Whether tabs should be centered (horizontal only) */
  centered?: boolean
  /** Tab variant for handling overflow */
  variant?: 'standard' | 'scrollable' | 'fullWidth'
  /** Color of the tab text */
  textColor?: 'inherit' | 'primary' | 'secondary'
  /** Color of the active tab indicator */
  indicatorColor?: 'primary' | 'secondary'
  /** Accessible label for the tablist */
  ariaLabel?: string
  /** Unique ID prefix for accessibility attributes */
  idPrefix?: string
  /** Callback when tab changes */
  onTabChange?: (index: number) => void
  /** Minimum height for vertical layout */
  minHeight?: number | string
  /** Whether to show divider between tabs and content */
  showDivider?: boolean
}

/**
 * TabbedLayout provides switchable panels for organized content display.
 *
 * This layout pattern is ideal for:
 * - Product pages with Overview, Specifications, Reviews sections
 * - Settings pages with categorized options
 * - Documentation with multiple topics
 * - Dashboard widgets with different data views
 *
 * @param props - TabbedLayout configuration
 * @returns A tabbed interface with switchable content panels
 *
 * @example
 * // Basic usage with simple tabs
 * <TabbedLayout
 *   tabs={[
 *     { id: 'overview', label: 'Overview', content: <Overview /> },
 *     { id: 'specs', label: 'Specifications', content: <Specs /> },
 *     { id: 'reviews', label: 'Reviews', content: <Reviews /> },
 *   ]}
 * />
 *
 * @example
 * // Vertical tabs with custom styling
 * <TabbedLayout
 *   orientation="vertical"
 *   tabs={tabs}
 *   minHeight={400}
 *   textColor="primary"
 * />
 */
const TabbedLayout: React.FC<TabbedLayoutProps> = ({
  tabs,
  defaultTab = 0,
  orientation = 'horizontal',
  centered = false,
  variant = 'standard',
  textColor = 'primary',
  indicatorColor = 'primary',
  ariaLabel = 'Content tabs',
  idPrefix = 'tabbed-layout',
  onTabChange,
  minHeight = 300,
  showDivider = true,
}) => {
  const [value, setValue] = useState(defaultTab)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    onTabChange?.(newValue)
  }

  const isVertical = orientation === 'vertical'

  return (
    <Box
      sx={{
        display: isVertical ? 'flex' : 'block',
        minHeight: isVertical ? minHeight : 'auto',
        bgcolor: 'background.paper',
        width: '100%',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        orientation={orientation}
        variant={variant}
        centered={!isVertical && centered}
        textColor={textColor}
        indicatorColor={indicatorColor}
        aria-label={ariaLabel}
        sx={{
          ...(isVertical && {
            borderRight: showDivider ? 1 : 0,
            borderColor: 'divider',
            minWidth: 160,
          }),
          ...(!isVertical && {
            borderBottom: showDivider ? 1 : 0,
            borderColor: 'divider',
          }),
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            id={`${idPrefix}-tab-${index}`}
            aria-controls={`${idPrefix}-tabpanel-${index}`}
            label={tab.iconOnly ? undefined : tab.label}
            icon={tab.icon}
            iconPosition="start"
            disabled={tab.disabled}
            sx={{
              minHeight: 48,
              textTransform: 'none',
              fontWeight: 500,
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {tabs.map((tab, index) => (
          <TabPanel
            key={tab.id}
            value={value}
            index={index}
            idPrefix={idPrefix}
          >
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}

export default TabbedLayout

/**
 * Helper function to generate accessible tab props.
 *
 * @param idPrefix - Prefix for IDs
 * @param index - Tab index
 * @returns Accessibility props for a Tab component
 *
 * @example
 * const props = a11yProps('product', 0)
 * // { id: 'product-tab-0', 'aria-controls': 'product-tabpanel-0' }
 */
export function a11yProps(idPrefix: string, index: number) {
  return {
    id: `${idPrefix}-tab-${index}`,
    'aria-controls': `${idPrefix}-tabpanel-${index}`,
  }
}
