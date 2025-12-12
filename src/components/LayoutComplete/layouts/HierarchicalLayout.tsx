import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CodeIcon from '@mui/icons-material/Code'
import DescriptionIcon from '@mui/icons-material/Description'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import ImageIcon from '@mui/icons-material/Image'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback, useMemo } from 'react'

/**
 * File type definitions.
 */
export type FileType =
  | 'folder'
  | 'file'
  | 'document'
  | 'code'
  | 'image'
  | 'config'

/**
 * Represents a file or folder in the hierarchy.
 */
export interface FileNode {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Node type */
  type: FileType
  /** Child nodes for folders */
  children?: FileNode[]
  /** File size in bytes (for files) */
  size?: number
  /** Last modified date */
  modified?: string
  /** Whether the node is disabled */
  disabled?: boolean
}

/**
 * Props for the HierarchicalLayout component.
 */
export interface HierarchicalLayoutProps {
  /**
   * Root nodes of the file tree.
   */
  nodes?: FileNode[]
  /**
   * IDs of nodes that should be expanded by default.
   */
  defaultExpanded?: string[]
  /**
   * ID of the currently selected node.
   */
  selectedId?: string
  /**
   * Whether to show file icons.
   * @default true
   */
  showIcons?: boolean
  /**
   * Whether to show file sizes.
   * @default true
   */
  showSizes?: boolean
  /**
   * Whether to show modified dates.
   * @default false
   */
  showDates?: boolean
  /**
   * Whether multiple nodes can be expanded simultaneously.
   * @default true
   */
  multiExpand?: boolean
  /**
   * Indentation per level in pixels.
   * @default 24
   */
  indentSize?: number
  /**
   * Maximum depth to display.
   * @default 10
   */
  maxDepth?: number
  /**
   * Callback when a node is selected.
   */
  onSelect?: (nodeId: string, node: FileNode) => void
  /**
   * Callback when a folder is expanded/collapsed.
   */
  onToggle?: (nodeId: string, isExpanded: boolean) => void
  /**
   * Width of the file browser panel.
   * @default 350
   */
  width?: number
  /**
   * Maximum height of the file browser.
   * @default 500
   */
  maxHeight?: number
}

/**
 * Get icon component for a file type.
 * @param type - The file type.
 * @param isOpen - Whether the folder is open (for folder type).
 * @returns The appropriate icon component.
 */
const getFileIcon = (type: FileType, isOpen = false): React.ReactNode => {
  const iconProps = { fontSize: 'small' as const }

  switch (type) {
    case 'folder':
      return isOpen ? (
        <FolderOpenIcon {...iconProps} color="warning" />
      ) : (
        <FolderIcon {...iconProps} color="warning" />
      )
    case 'document':
      return <DescriptionIcon {...iconProps} color="primary" />
    case 'code':
      return <CodeIcon {...iconProps} color="success" />
    case 'image':
      return <ImageIcon {...iconProps} color="secondary" />
    case 'config':
      return <SettingsIcon {...iconProps} color="action" />
    case 'file':
    default:
      return <InsertDriveFileIcon {...iconProps} color="action" />
  }
}

/**
 * Format file size to human-readable string.
 * @param bytes - Size in bytes.
 * @returns Formatted size string (e.g., "1.5 KB").
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = bytes / Math.pow(1024, unitIndex)

  return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`
}

/**
 * Default file tree for demonstration.
 */
const DEFAULT_NODES: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        children: [
          {
            id: 'button',
            name: 'Button',
            type: 'folder',
            children: [
              {
                id: 'button-tsx',
                name: 'Button.tsx',
                type: 'code',
                size: 2048,
                modified: '2024-12-10',
              },
              {
                id: 'button-stories',
                name: 'Button.stories.tsx',
                type: 'code',
                size: 1536,
                modified: '2024-12-09',
              },
              {
                id: 'button-test',
                name: 'Button.test.tsx',
                type: 'code',
                size: 1024,
                modified: '2024-12-08',
              },
            ],
          },
          {
            id: 'card',
            name: 'Card',
            type: 'folder',
            children: [
              {
                id: 'card-tsx',
                name: 'Card.tsx',
                type: 'code',
                size: 3072,
                modified: '2024-12-10',
              },
              {
                id: 'card-stories',
                name: 'Card.stories.tsx',
                type: 'code',
                size: 2560,
                modified: '2024-12-09',
              },
            ],
          },
        ],
      },
      {
        id: 'assets',
        name: 'assets',
        type: 'folder',
        children: [
          {
            id: 'logo',
            name: 'logo.svg',
            type: 'image',
            size: 4096,
            modified: '2024-12-01',
          },
          {
            id: 'hero',
            name: 'hero.png',
            type: 'image',
            size: 524288,
            modified: '2024-12-05',
          },
        ],
      },
      {
        id: 'app-tsx',
        name: 'App.tsx',
        type: 'code',
        size: 1280,
        modified: '2024-12-10',
      },
      {
        id: 'index-tsx',
        name: 'index.tsx',
        type: 'code',
        size: 256,
        modified: '2024-12-01',
      },
    ],
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    children: [
      {
        id: 'index-html',
        name: 'index.html',
        type: 'document',
        size: 1024,
        modified: '2024-12-01',
      },
      {
        id: 'favicon',
        name: 'favicon.ico',
        type: 'image',
        size: 4096,
        modified: '2024-11-15',
      },
    ],
  },
  {
    id: 'package-json',
    name: 'package.json',
    type: 'config',
    size: 2048,
    modified: '2024-12-10',
  },
  {
    id: 'tsconfig',
    name: 'tsconfig.json',
    type: 'config',
    size: 512,
    modified: '2024-12-01',
  },
  {
    id: 'readme',
    name: 'README.md',
    type: 'document',
    size: 8192,
    modified: '2024-12-05',
  },
]

/**
 * Individual tree node component.
 */
interface TreeNodeProps {
  node: FileNode
  depth: number
  expanded: Set<string>
  selected: string | null
  showIcons: boolean
  showSizes: boolean
  showDates: boolean
  indentSize: number
  maxDepth: number
  onSelect: (nodeId: string, node: FileNode) => void
  onToggle: (nodeId: string) => void
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  depth,
  expanded,
  selected,
  showIcons,
  showSizes,
  showDates,
  indentSize,
  maxDepth,
  onSelect,
  onToggle,
}) => {
  const theme = useTheme()
  const isFolder = node.type === 'folder' && node.children
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id
  const hasChildren = isFolder && node.children && node.children.length > 0

  if (depth >= maxDepth) return null

  const handleClick = () => {
    onSelect(node.id, node)
    if (isFolder) {
      onToggle(node.id)
    }
  }

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        disabled={node.disabled}
        selected={isSelected}
        data-testid={`tree-node-${node.id}`}
        sx={{
          pl: (depth * indentSize) / 8 + 1,
          py: 0.75,
          minHeight: 36,
          borderRadius: 1,
          mx: 0.5,
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main + '20',
            '&:hover': {
              backgroundColor: theme.palette.primary.main + '30',
            },
          },
        }}
      >
        {/* Expand/Collapse Icon */}
        {isFolder && (
          <ListItemIcon
            sx={{
              minWidth: 24,
              color: 'action.active',
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )
            ) : (
              <Box sx={{ width: 20 }} />
            )}
          </ListItemIcon>
        )}

        {/* File/Folder Icon */}
        {showIcons && (
          <ListItemIcon sx={{ minWidth: 32 }}>
            {getFileIcon(node.type, isExpanded)}
          </ListItemIcon>
        )}

        {/* Name and Metadata */}
        <ListItemText
          primary={node.name}
          secondary={
            (showSizes && node.size) || (showDates && node.modified)
              ? `${showSizes && node.size ? formatFileSize(node.size) : ''}${
                  showSizes && showDates && node.size && node.modified
                    ? ' | '
                    : ''
                }${showDates && node.modified ? node.modified : ''}`
              : undefined
          }
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: isFolder ? 500 : 400,
            noWrap: true,
          }}
          secondaryTypographyProps={{
            variant: 'caption',
            noWrap: true,
          }}
        />
      </ListItemButton>

      {/* Children */}
      {isFolder && hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children?.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                expanded={expanded}
                selected={selected}
                showIcons={showIcons}
                showSizes={showSizes}
                showDates={showDates}
                indentSize={indentSize}
                maxDepth={maxDepth}
                onSelect={onSelect}
                onToggle={onToggle}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

/**
 * HierarchicalLayout demonstrates a tree structure layout pattern.
 *
 * This layout pattern displays data in a hierarchical tree structure,
 * showing parent-child relationships with expandable/collapsible nodes.
 * Commonly used for file browsers, navigation menus, and organizational charts.
 *
 * @param props - The component props.
 * @returns A React component demonstrating the hierarchical layout pattern.
 *
 * @example
 * // Basic file browser
 * <HierarchicalLayout
 *   nodes={fileTree}
 *   onSelect={(id, node) => console.log('Selected:', node.name)}
 * />
 *
 * @example
 * // With specific expanded folders
 * <HierarchicalLayout
 *   nodes={fileTree}
 *   defaultExpanded={['src', 'components']}
 *   showSizes={true}
 * />
 */
const HierarchicalLayout: React.FC<HierarchicalLayoutProps> = ({
  nodes = DEFAULT_NODES,
  defaultExpanded = ['src', 'components'],
  selectedId,
  showIcons = true,
  showSizes = true,
  showDates = false,
  multiExpand = true,
  indentSize = 24,
  maxDepth = 10,
  onSelect,
  onToggle,
  width = 350,
  maxHeight = 500,
}) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(defaultExpanded),
  )
  const [selected, setSelected] = useState<string | null>(selectedId || null)

  const handleToggle = useCallback(
    (nodeId: string) => {
      setExpanded((prev) => {
        const next = new Set(prev)
        const isExpanding = !next.has(nodeId)

        if (isExpanding) {
          if (!multiExpand) {
            next.clear()
          }
          next.add(nodeId)
        } else {
          next.delete(nodeId)
        }

        onToggle?.(nodeId, isExpanding)
        return next
      })
    },
    [multiExpand, onToggle],
  )

  const handleSelect = useCallback(
    (nodeId: string, node: FileNode) => {
      setSelected(nodeId)
      onSelect?.(nodeId, node)
    },
    [onSelect],
  )

  // Count total items
  const countNodes = useMemo(() => {
    const count = (
      nodeList: FileNode[],
    ): { files: number; folders: number } => {
      let files = 0
      let folders = 0

      for (const node of nodeList) {
        if (node.type === 'folder') {
          folders++
          if (node.children) {
            const childCounts = count(node.children)
            files += childCounts.files
            folders += childCounts.folders
          }
        } else {
          files++
        }
      }

      return { files, folders }
    }

    return count(nodes)
  }, [nodes])

  return (
    <Box data-testid="hierarchical-layout-container">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          File Browser
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: 600 }}
        >
          Click folders to expand/collapse. Select files to view details. This
          pattern is commonly used in IDEs, file managers, and navigation menus.
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          width,
          maxHeight,
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper,
        }}
        data-testid="file-browser"
      >
        <Box
          sx={{
            p: 1.5,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.action.hover,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            Project Files
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {countNodes.folders} folders, {countNodes.files} files
          </Typography>
        </Box>

        <List component="nav" dense sx={{ py: 1 }} data-testid="file-tree">
          {nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              selected={selected}
              showIcons={showIcons}
              showSizes={showSizes}
              showDates={showDates}
              indentSize={indentSize}
              maxDepth={maxDepth}
              onSelect={handleSelect}
              onToggle={handleToggle}
            />
          ))}
        </List>
      </Paper>

      {/* Selection info */}
      {selected && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Selected: <strong>{selected}</strong>
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default HierarchicalLayout
