import DeleteIcon from '@mui/icons-material/Delete'
import DraftsIcon from '@mui/icons-material/Drafts'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FolderIcon from '@mui/icons-material/Folder'
import InboxIcon from '@mui/icons-material/Inbox'
import LabelIcon from '@mui/icons-material/Label'
import MailIcon from '@mui/icons-material/Mail'
import SendIcon from '@mui/icons-material/Send'
import StarIcon from '@mui/icons-material/Star'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles'

/**
 * Sidebar width options for the left-right layout.
 */
export type SidebarWidth = 'narrow' | 'standard' | 'wide' | number

/**
 * Props for the LeftRightLayout component.
 */
export interface LeftRightLayoutProps {
  /**
   * Content for the left sidebar (navigation/folder tree).
   */
  sidebar: React.ReactNode
  /**
   * Content for the main area (list/preview).
   */
  main: React.ReactNode
  /**
   * Width of the sidebar.
   * - 'narrow': 200px
   * - 'standard': 280px
   * - 'wide': 360px
   * - number: Custom pixel width
   * @default 'standard'
   */
  sidebarWidth?: SidebarWidth
  /**
   * Gap between sidebar and main content in MUI spacing units.
   * @default 0
   */
  gap?: number
  /**
   * Minimum height of the layout.
   * @default '100vh'
   */
  minHeight?: string | number
  /**
   * Whether the sidebar should be collapsible.
   * @default false
   */
  collapsible?: boolean
  /**
   * Whether the sidebar is currently collapsed (controlled).
   */
  collapsed?: boolean
  /**
   * Callback when sidebar collapse state changes.
   */
  onCollapseChange?: (collapsed: boolean) => void
  /**
   * Width when sidebar is collapsed.
   * @default 64
   */
  collapsedWidth?: number
  /**
   * Whether sidebar should hide completely on mobile.
   * @default true
   */
  hideSidebarOnMobile?: boolean
  /**
   * Breakpoint at which sidebar hides on mobile.
   * @default 'sm'
   */
  mobileBreakpoint?: Breakpoint
  /**
   * Additional sx props for the outer container.
   */
  sx?: SxProps<Theme>
}

/**
 * Resolves sidebar width value to pixel string.
 *
 * @param width - The sidebar width option.
 * @returns Width in pixels or CSS value.
 *
 * @example
 * resolveSidebarWidth('standard') // => 280
 * resolveSidebarWidth(300) // => 300
 */
const resolveSidebarWidth = (width: SidebarWidth): number => {
  switch (width) {
    case 'narrow':
      return 200
    case 'wide':
      return 360
    case 'standard':
      return 280
    default:
      return width
  }
}

/**
 * LeftRightLayout provides an asymmetric sidebar navigation layout.
 *
 * This layout pattern is ideal for:
 * - Email clients with folder tree, list, and preview
 * - File managers with directory tree and file list
 * - Documentation with navigation and content
 * - Admin panels with menu and main content
 * - IDE-style interfaces with project tree and editor
 *
 * The layout uses CSS Flexbox with a fixed-width sidebar and flexible
 * main content area. It supports collapsible sidebars and responsive
 * behavior for mobile devices.
 *
 * @param props - The component props.
 * @returns A left-right asymmetric layout container.
 *
 * @example
 * // Basic email client layout
 * <LeftRightLayout
 *   sidebar={<FolderTree />}
 *   main={<EmailList />}
 * />
 *
 * @example
 * // Collapsible sidebar with custom width
 * <LeftRightLayout
 *   sidebarWidth={300}
 *   collapsible
 *   sidebar={<Navigation />}
 *   main={<Content />}
 * />
 *
 * @example
 * // Admin panel with wide sidebar
 * <LeftRightLayout
 *   sidebarWidth="wide"
 *   hideSidebarOnMobile
 *   sidebar={<AdminMenu />}
 *   main={<Dashboard />}
 * />
 */
const LeftRightLayout: React.FC<LeftRightLayoutProps> = ({
  sidebar,
  main,
  sidebarWidth = 'standard',
  gap = 0,
  minHeight = '100vh',
  collapsible = false,
  collapsed: controlledCollapsed,
  onCollapseChange,
  collapsedWidth = 64,
  hideSidebarOnMobile = true,
  mobileBreakpoint = 'sm',
  sx,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isCollapsed = controlledCollapsed ?? internalCollapsed

  const resolvedWidth = resolveSidebarWidth(sidebarWidth)
  const currentWidth = isCollapsed ? collapsedWidth : resolvedWidth

  const handleToggleCollapse = () => {
    const newValue = !isCollapsed
    if (onCollapseChange) {
      onCollapseChange(newValue)
    } else {
      setInternalCollapsed(newValue)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight,
        width: '100%',
        ...sx,
      }}
    >
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          width: currentWidth,
          flexShrink: 0,
          transition: 'width 0.2s ease-in-out',
          ...(hideSidebarOnMobile && {
            display: { xs: 'none', [mobileBreakpoint]: 'block' },
          }),
        }}
      >
        <Box
          sx={{
            width: currentWidth,
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'width 0.2s ease-in-out',
          }}
        >
          {collapsible && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: isCollapsed ? 'center' : 'flex-end',
                p: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={handleToggleCollapse}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Box>
          )}
          {sidebar}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          ml: gap,
        }}
      >
        {main}
      </Box>
    </Box>
  )
}

export default LeftRightLayout

// ============================================================================
// Real-World Example Components
// ============================================================================

/**
 * Email message type for the email client example.
 */
interface EmailMessage {
  id: string
  from: string
  fromEmail: string
  avatar: string
  subject: string
  preview: string
  date: string
  isRead: boolean
  isStarred: boolean
  labels: string[]
}

/**
 * Folder type for the email client sidebar.
 */
interface EmailFolder {
  id: string
  name: string
  icon: React.ReactNode
  count?: number
  subfolders?: EmailFolder[]
}

/**
 * Props for the EmailClient example component.
 */
export interface EmailClientProps {
  /**
   * Email messages to display.
   */
  emails?: EmailMessage[]
  /**
   * Folders for the sidebar.
   */
  folders?: EmailFolder[]
  /**
   * Currently selected folder ID.
   */
  selectedFolder?: string
  /**
   * Currently selected email ID.
   */
  selectedEmail?: string
}

/**
 * EmailClient demonstrates a real-world left-right layout for email applications.
 *
 * This example showcases:
 * - Folder tree navigation with nested folders
 * - Email list with read/unread states
 * - Email preview panel
 * - Star and label functionality
 * - Responsive behavior for mobile
 *
 * @param props - The email client props.
 * @returns A complete email client layout.
 *
 * @example
 * <EmailClient
 *   emails={[...]}
 *   folders={[...]}
 *   selectedFolder="inbox"
 * />
 */
export const EmailClient: React.FC<EmailClientProps> = ({
  emails = [
    {
      id: '1',
      from: 'GitHub',
      fromEmail: 'notifications@github.com',
      avatar:
        'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      subject: '[mui-storybook] Pull request merged: feat(layouts)',
      preview:
        'The pull request #42 has been successfully merged. Thank you for your contribution to the project!',
      date: '10:30 AM',
      isRead: false,
      isStarred: true,
      labels: ['GitHub', 'Important'],
    },
    {
      id: '2',
      from: 'Alex Johnson',
      fromEmail: 'alex@example.com',
      avatar: 'https://i.pravatar.cc/150?img=33',
      subject: 'Re: Project Update Meeting',
      preview:
        'Thanks for the update! I have reviewed the changes and everything looks good. Let me know if you need any help with the deployment.',
      date: '9:15 AM',
      isRead: false,
      isStarred: false,
      labels: ['Work'],
    },
    {
      id: '3',
      from: 'Vercel',
      fromEmail: 'notifications@vercel.com',
      avatar:
        'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
      subject: 'Deployment successful: mui-storybook',
      preview:
        'Your deployment to production was successful. The changes are now live at https://mui-storybook.vercel.app',
      date: 'Yesterday',
      isRead: true,
      isStarred: false,
      labels: ['Deployment'],
    },
    {
      id: '4',
      from: 'Sarah Chen',
      fromEmail: 'sarah@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      subject: 'Design Review Feedback',
      preview:
        'I have finished reviewing the new layout components. Overall the designs look great! I have a few suggestions for the color contrast...',
      date: 'Yesterday',
      isRead: true,
      isStarred: true,
      labels: ['Design', 'Review'],
    },
    {
      id: '5',
      from: 'npm',
      fromEmail: 'support@npmjs.com',
      avatar:
        'https://static.npmjs.com/attachments/ck3uwed1cmso79y74pjugy10f-gak-logo-black.png',
      subject: 'Package @mui/material updated',
      preview:
        'A new version of @mui/material (v7.0.0) is now available. Check out the changelog for new features and breaking changes.',
      date: 'Dec 10',
      isRead: true,
      isStarred: false,
      labels: ['Updates'],
    },
  ],
  folders = [
    { id: 'inbox', name: 'Inbox', icon: <InboxIcon />, count: 12 },
    { id: 'starred', name: 'Starred', icon: <StarIcon />, count: 3 },
    { id: 'sent', name: 'Sent', icon: <SendIcon /> },
    { id: 'drafts', name: 'Drafts', icon: <DraftsIcon />, count: 2 },
    { id: 'trash', name: 'Trash', icon: <DeleteIcon /> },
    {
      id: 'folders',
      name: 'Folders',
      icon: <FolderIcon />,
      subfolders: [
        { id: 'work', name: 'Work', icon: <FolderIcon /> },
        { id: 'personal', name: 'Personal', icon: <FolderIcon /> },
        { id: 'projects', name: 'Projects', icon: <FolderIcon /> },
      ],
    },
    {
      id: 'labels',
      name: 'Labels',
      icon: <LabelIcon />,
      subfolders: [
        { id: 'important', name: 'Important', icon: <LabelIcon /> },
        { id: 'work-label', name: 'Work', icon: <LabelIcon /> },
        { id: 'personal-label', name: 'Personal', icon: <LabelIcon /> },
      ],
    },
  ],
  selectedFolder = 'inbox',
  selectedEmail,
}) => {
  const theme = useTheme()
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(['folders', 'labels']),
  )
  const [selected, setSelected] = useState<string | undefined>(selectedEmail)
  const [checkedEmails, setCheckedEmails] = useState<Set<string>>(new Set())

  const handleFolderToggle = (folderId: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const handleCheckEmail = (emailId: string) => {
    setCheckedEmails((prev) => {
      const next = new Set(prev)
      if (next.has(emailId)) {
        next.delete(emailId)
      } else {
        next.add(emailId)
      }
      return next
    })
  }

  const selectedEmailData = emails.find((e) => e.id === selected)

  // Sidebar: Folder Tree
  const sidebarContent = (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.grey[50],
        ...(theme.palette.mode === 'dark' && {
          bgcolor: theme.palette.grey[900],
        }),
      }}
    >
      {/* Compose Button */}
      <Box sx={{ p: 2 }}>
        <Paper
          sx={{
            py: 1.5,
            px: 3,
            textAlign: 'center',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <MailIcon fontSize="small" />
          <Typography variant="button">Compose</Typography>
        </Paper>
      </Box>

      <Divider />

      {/* Folder List */}
      <List component="nav" dense>
        {folders.map((folder) => (
          <React.Fragment key={folder.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={folder.id === selectedFolder}
                onClick={() =>
                  folder.subfolders ? handleFolderToggle(folder.id) : undefined
                }
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'inherit',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{folder.icon}</ListItemIcon>
                <ListItemText primary={folder.name} />
                {folder.count && (
                  <Typography variant="caption" color="text.secondary">
                    {folder.count}
                  </Typography>
                )}
                {folder.subfolders &&
                  (openFolders.has(folder.id) ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  ))}
              </ListItemButton>
            </ListItem>
            {folder.subfolders && (
              <Collapse
                in={openFolders.has(folder.id)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding dense>
                  {folder.subfolders.map((subfolder) => (
                    <ListItemButton key={subfolder.id} sx={{ pl: 4 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {subfolder.icon}
                      </ListItemIcon>
                      <ListItemText primary={subfolder.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  )

  // Main: Email List + Preview
  const mainContent = (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Email List */}
      <Box
        sx={{
          width: selected ? { xs: '100%', md: 360 } : '100%',
          borderRight: selected ? `1px solid ${theme.palette.divider}` : 'none',
          display: { xs: selected ? 'none' : 'block', md: 'block' },
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Inbox</Typography>
          <Typography variant="body2" color="text.secondary">
            {emails.filter((e) => !e.isRead).length} unread
          </Typography>
        </Box>

        <List disablePadding>
          {emails.map((email, index) => (
            <React.Fragment key={email.id}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="Star"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StarIcon
                      fontSize="small"
                      sx={{
                        color: email.isStarred
                          ? 'warning.main'
                          : 'action.disabled',
                      }}
                    />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={email.id === selected}
                  onClick={() => setSelected(email.id)}
                  sx={{
                    py: 2,
                    bgcolor: email.isRead ? 'transparent' : 'action.hover',
                  }}
                >
                  <Checkbox
                    checked={checkedEmails.has(email.id)}
                    onChange={() => handleCheckEmail(email.id)}
                    onClick={(e) => e.stopPropagation()}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Avatar
                    src={email.avatar}
                    alt={email.from}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={email.isRead ? 400 : 600}
                        noWrap
                      >
                        {email.from}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {email.date}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      fontWeight={email.isRead ? 400 : 600}
                      noWrap
                    >
                      {email.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ maxWidth: 250 }}
                    >
                      {email.preview}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              {index < emails.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Email Preview */}
      {selected && selectedEmailData && (
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: { xs: 'block', md: 'block' },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
              sx={{ mb: 3 }}
            >
              <Avatar
                src={selectedEmailData.avatar}
                alt={selectedEmailData.from}
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {selectedEmailData.from}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedEmailData.date}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {selectedEmailData.fromEmail}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="h5" gutterBottom>
              {selectedEmailData.subject}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              {selectedEmailData.labels.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {selectedEmailData.preview}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mt: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mt: 2 }}>
              Best regards,
              <br />
              {selectedEmailData.from}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )

  return (
    <LeftRightLayout
      sidebarWidth={280}
      sidebar={sidebarContent}
      main={mainContent}
      hideSidebarOnMobile
    />
  )
}
