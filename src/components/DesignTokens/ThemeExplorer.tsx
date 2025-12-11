import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useMemo, useState, useCallback } from 'react'

import type { Theme } from '@mui/material/styles'

/**
 * Represents the type classification for theme values.
 */
type ValueType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'function'
  | 'object'
  | 'array'
  | 'null'
  | 'undefined'
  | 'color'

/**
 * Represents a node in the theme tree structure.
 */
interface ThemeNode {
  key: string
  path: string
  value: unknown
  valueType: ValueType
  children?: ThemeNode[]
}

/**
 * Props for the ThemeExplorer component.
 */
export interface ThemeExplorerProps {
  /**
   * Optional custom theme object to explore. If not provided, uses the current MUI theme.
   */
  customTheme?: Theme
  /**
   * Maximum initial depth to expand by default.
   * @default 1
   */
  defaultExpandedDepth?: number
  /**
   * Whether to show the search input.
   * @default true
   */
  showSearch?: boolean
  /**
   * Whether to show expand/collapse all controls.
   * @default true
   */
  showControls?: boolean
  /**
   * Maximum height of the tree container.
   * @default '600px'
   */
  maxHeight?: string
}

/**
 * Checks if a string value represents a CSS color.
 * @param value - The value to check.
 * @returns True if the value is a valid CSS color string.
 */
const isColorValue = (value: unknown): boolean => {
  if (typeof value !== 'string') return false
  const colorPatterns = [
    /^#([0-9A-Fa-f]{3}){1,2}$/,
    /^#([0-9A-Fa-f]{4}){1,2}$/,
    /^rgb\(/,
    /^rgba\(/,
    /^hsl\(/,
    /^hsla\(/,
    /^(transparent|currentColor|inherit)$/i,
  ]
  return colorPatterns.some((pattern) => pattern.test(value))
}

/**
 * Determines the type classification of a value.
 * @param value - The value to classify.
 * @returns The ValueType classification.
 */
const getValueType = (value: unknown): ValueType => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'function') return 'function'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'string') {
    if (isColorValue(value)) return 'color'
    return 'string'
  }
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'object'
  return 'string'
}

/**
 * Formats a value for display in the tree view.
 * @param value - The value to format.
 * @param valueType - The type classification of the value.
 * @returns A string representation of the value.
 */
const formatValue = (value: unknown, valueType: ValueType): string => {
  switch (valueType) {
    case 'null':
      return 'null'
    case 'undefined':
      return 'undefined'
    case 'function':
      return 'function()'
    case 'boolean':
      return String(value)
    case 'number':
      return String(value)
    case 'string':
    case 'color':
      return `"${value}"`
    case 'array':
      return `Array(${(value as unknown[]).length})`
    case 'object':
      return `{${Object.keys(value as object).length} keys}`
    default:
      return String(value)
  }
}

/**
 * Converts a theme object into a hierarchical tree structure.
 * @param obj - The object to convert.
 * @param parentPath - The path prefix for nested properties.
 * @returns An array of ThemeNode objects.
 */
const buildThemeTree = (
  obj: Record<string, unknown>,
  parentPath = '',
): ThemeNode[] => {
  const nodes: ThemeNode[] = []

  const sortedKeys = Object.keys(obj).sort((a, b) => {
    const aIsObject =
      obj[a] !== null &&
      typeof obj[a] === 'object' &&
      !Array.isArray(obj[a]) &&
      typeof obj[a] !== 'function'
    const bIsObject =
      obj[b] !== null &&
      typeof obj[b] === 'object' &&
      !Array.isArray(obj[b]) &&
      typeof obj[b] !== 'function'
    if (aIsObject && !bIsObject) return -1
    if (!aIsObject && bIsObject) return 1
    return a.localeCompare(b)
  })

  for (const key of sortedKeys) {
    const value = obj[key]
    const path = parentPath ? `${parentPath}.${key}` : key
    const valueType = getValueType(value)

    const node: ThemeNode = {
      key,
      path,
      value,
      valueType,
    }

    if (
      valueType === 'object' &&
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      node.children = buildThemeTree(value as Record<string, unknown>, path)
    }

    nodes.push(node)
  }

  return nodes
}

/**
 * Collects all node paths from the tree structure.
 * @param nodes - The tree nodes to process.
 * @returns A Set of all path strings.
 */
const collectAllPaths = (nodes: ThemeNode[]): Set<string> => {
  const paths = new Set<string>()

  const traverse = (nodeList: ThemeNode[]) => {
    for (const node of nodeList) {
      if (node.children && node.children.length > 0) {
        paths.add(node.path)
        traverse(node.children)
      }
    }
  }

  traverse(nodes)
  return paths
}

/**
 * Collects paths up to a specified depth.
 * @param nodes - The tree nodes to process.
 * @param maxDepth - Maximum depth to include.
 * @returns A Set of path strings within the depth limit.
 */
const collectPathsToDepth = (
  nodes: ThemeNode[],
  maxDepth: number,
): Set<string> => {
  const paths = new Set<string>()

  const traverse = (nodeList: ThemeNode[], depth: number) => {
    if (depth >= maxDepth) return
    for (const node of nodeList) {
      if (node.children && node.children.length > 0) {
        paths.add(node.path)
        traverse(node.children, depth + 1)
      }
    }
  }

  traverse(nodes, 0)
  return paths
}

/**
 * Filters nodes based on a search query, returning matching nodes and their ancestors.
 * @param nodes - The tree nodes to filter.
 * @param query - The search string.
 * @returns Filtered nodes containing matches.
 */
const filterNodes = (nodes: ThemeNode[], query: string): ThemeNode[] => {
  const lowerQuery = query.toLowerCase()

  const filter = (nodeList: ThemeNode[]): ThemeNode[] => {
    const result: ThemeNode[] = []

    for (const node of nodeList) {
      const keyMatches = node.key.toLowerCase().includes(lowerQuery)
      const valueMatches =
        node.valueType !== 'object' &&
        node.valueType !== 'array' &&
        formatValue(node.value, node.valueType)
          .toLowerCase()
          .includes(lowerQuery)
      const pathMatches = node.path.toLowerCase().includes(lowerQuery)

      const filteredChildren = node.children ? filter(node.children) : undefined

      if (
        keyMatches ||
        valueMatches ||
        pathMatches ||
        (filteredChildren && filteredChildren.length > 0)
      ) {
        result.push({
          ...node,
          children: filteredChildren,
        })
      }
    }

    return result
  }

  return filter(nodes)
}

/**
 * Color type chip styling.
 */
const TYPE_COLORS: Record<ValueType, string> = {
  string: '#22c55e',
  number: '#3b82f6',
  boolean: '#f59e0b',
  function: '#a855f7',
  object: '#6b7280',
  array: '#06b6d4',
  null: '#9ca3af',
  undefined: '#9ca3af',
  color: '#ec4899',
}

/**
 * Value types to display in the legend footer.
 * Excludes null and undefined as they represent absent values.
 */
const LEGEND_TYPES: ValueType[] = [
  'string',
  'number',
  'boolean',
  'function',
  'object',
  'array',
  'color',
]

/**
 * Props for the TreeNode component.
 */
interface TreeNodeProps {
  node: ThemeNode
  expandedPaths: Set<string>
  onToggle: (path: string) => void
  depth: number
}

/**
 * Renders a single node in the theme tree.
 */
const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  expandedPaths,
  onToggle,
  depth,
}) => {
  const theme = useTheme()
  const isExpanded = expandedPaths.has(node.path)
  const hasChildren = node.children && node.children.length > 0

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          py: 0.5,
          pl: depth * 2.5,
          pr: 1,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          borderRadius: 1,
          cursor: hasChildren ? 'pointer' : 'default',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}
        onClick={() => hasChildren && onToggle(node.path)}
        role={hasChildren ? 'button' : undefined}
        tabIndex={hasChildren ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onToggle(node.path)
          }
        }}
      >
        {hasChildren ? (
          <IconButton
            size="small"
            sx={{ p: 0.25, mr: 0.5 }}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )}
          </IconButton>
        ) : (
          <Box sx={{ width: 28 }} />
        )}

        <Typography
          component="span"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 600,
            color: theme.palette.primary.main,
            mr: 0.5,
          }}
        >
          {node.key}
        </Typography>

        {!hasChildren && (
          <>
            <Typography
              component="span"
              sx={{
                fontFamily: 'monospace',
                color: theme.palette.text.secondary,
                mx: 0.5,
              }}
            >
              :
            </Typography>

            {node.valueType === 'color' && (
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 0.5,
                  backgroundColor: String(node.value),
                  border: `1px solid ${theme.palette.divider}`,
                  mr: 0.5,
                  flexShrink: 0,
                }}
                title={String(node.value)}
              />
            )}

            <Typography
              component="span"
              sx={{
                fontFamily: 'monospace',
                color:
                  node.valueType === 'string' || node.valueType === 'color'
                    ? '#22c55e'
                    : node.valueType === 'number'
                      ? '#3b82f6'
                      : node.valueType === 'boolean'
                        ? '#f59e0b'
                        : theme.palette.text.primary,
                wordBreak: 'break-word',
              }}
            >
              {formatValue(node.value, node.valueType)}
            </Typography>

            <Chip
              label={node.valueType}
              size="small"
              sx={{
                ml: 1,
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 500,
                backgroundColor: TYPE_COLORS[node.valueType],
                color: '#ffffff',
                '& .MuiChip-label': {
                  px: 1.25,
                },
              }}
            />
          </>
        )}

        {hasChildren && (
          <Typography
            component="span"
            sx={{
              fontFamily: 'monospace',
              color: theme.palette.text.secondary,
              fontSize: '0.75rem',
              ml: 1,
            }}
          >
            {`{${node.children?.length} keys}`}
          </Typography>
        )}
      </Box>

      {hasChildren && (
        <Collapse in={isExpanded}>
          {node.children?.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </Collapse>
      )}
    </Box>
  )
}

/**
 * ThemeExplorer displays an interactive tree view of the entire MUI theme object.
 * Features include:
 * - Expandable/collapsible nodes
 * - Color swatches for color values
 * - Search/filter functionality
 * - Expand All / Collapse All controls
 * - Type indicators for each value
 *
 * @param props - The component props.
 * @returns A React component displaying the theme structure.
 *
 * @example
 * // Basic usage - displays the current theme
 * <ThemeExplorer />
 *
 * @example
 * // With custom configuration
 * <ThemeExplorer
 *   defaultExpandedDepth={2}
 *   showSearch={true}
 *   maxHeight="800px"
 * />
 */
const ThemeExplorer: React.FC<ThemeExplorerProps> = ({
  customTheme,
  defaultExpandedDepth = 1,
  showSearch = true,
  showControls = true,
  maxHeight = '600px',
}) => {
  const muiTheme = useTheme()
  const theme = customTheme || muiTheme

  const themeTree = useMemo(
    () => buildThemeTree(theme as unknown as Record<string, unknown>),
    [theme],
  )

  const allPaths = useMemo(() => collectAllPaths(themeTree), [themeTree])

  const initialPaths = useMemo(
    () => collectPathsToDepth(themeTree, defaultExpandedDepth),
    [themeTree, defaultExpandedDepth],
  )

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(initialPaths)
  const [searchQuery, setSearchQuery] = useState('')

  const handleToggle = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }, [])

  const handleExpandAll = useCallback(() => {
    setExpandedPaths(allPaths)
  }, [allPaths])

  const handleCollapseAll = useCallback(() => {
    setExpandedPaths(new Set())
  }, [])

  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return themeTree
    return filterNodes(themeTree, searchQuery.trim())
  }, [themeTree, searchQuery])

  const filteredPaths = useMemo(() => {
    if (!searchQuery.trim()) return expandedPaths
    return collectAllPaths(filteredTree)
  }, [filteredTree, searchQuery, expandedPaths])

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {(showSearch || showControls) && (
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {showSearch && (
            <TextField
              size="small"
              placeholder="Search theme properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 200 }}
              slotProps={{
                input: {
                  sx: { fontFamily: 'monospace' },
                },
              }}
            />
          )}

          {showControls && (
            <ButtonGroup size="small" variant="outlined">
              <Button
                onClick={handleExpandAll}
                startIcon={<UnfoldMoreIcon />}
                aria-label="Expand all nodes"
              >
                Expand All
              </Button>
              <Button
                onClick={handleCollapseAll}
                startIcon={<UnfoldLessIcon />}
                aria-label="Collapse all nodes"
              >
                Collapse All
              </Button>
            </ButtonGroup>
          )}
        </Box>
      )}

      <Box
        sx={{
          maxHeight,
          overflow: 'auto',
          p: 1,
        }}
      >
        {filteredTree.length === 0 ? (
          <Typography
            sx={{
              p: 2,
              textAlign: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            No matching properties found.
          </Typography>
        ) : (
          filteredTree.map((node) => (
            <TreeNode
              key={node.path}
              node={node}
              expandedPaths={searchQuery.trim() ? filteredPaths : expandedPaths}
              onToggle={handleToggle}
              depth={0}
            />
          ))
        )}
      </Box>

      <Box
        sx={{
          p: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
          Types:
        </Typography>
        {LEGEND_TYPES.map((type) => (
          <Chip
            key={type}
            label={type}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.7rem',
              fontWeight: 500,
              backgroundColor: TYPE_COLORS[type],
              color: '#ffffff',
              '& .MuiChip-label': {
                px: 1.25,
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default ThemeExplorer
