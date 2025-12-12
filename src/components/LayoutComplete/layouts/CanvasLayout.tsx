import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback, useRef } from 'react'

/**
 * Represents a sticky note on the canvas.
 */
export interface StickyNote {
  /** Unique identifier */
  id: string
  /** Note content text */
  content: string
  /** X position on canvas */
  x: number
  /** Y position on canvas */
  y: number
  /** Background color */
  color: string
  /** Z-index for stacking order */
  zIndex: number
  /** Width in pixels */
  width?: number
  /** Height in pixels */
  height?: number
}

/**
 * Props for the CanvasLayout component.
 */
export interface CanvasLayoutProps {
  /**
   * Initial sticky notes on the canvas.
   */
  notes?: StickyNote[]
  /**
   * Width of the canvas in pixels.
   * @default 800
   */
  width?: number
  /**
   * Height of the canvas in pixels.
   * @default 500
   */
  height?: number
  /**
   * Whether to show the grid background.
   * @default true
   */
  showGrid?: boolean
  /**
   * Grid size in pixels.
   * @default 20
   */
  gridSize?: number
  /**
   * Whether notes are editable.
   * @default true
   */
  editable?: boolean
  /**
   * Whether notes are draggable.
   * @default true
   */
  draggable?: boolean
  /**
   * Available colors for new notes.
   */
  noteColors?: string[]
  /**
   * Default width for new notes.
   * @default 200
   */
  noteWidth?: number
  /**
   * Default height for new notes.
   * @default 150
   */
  noteHeight?: number
  /**
   * Callback when a note is moved.
   */
  onNoteMove?: (noteId: string, x: number, y: number) => void
  /**
   * Callback when a note is updated.
   */
  onNoteUpdate?: (noteId: string, content: string) => void
  /**
   * Callback when a note is deleted.
   */
  onNoteDelete?: (noteId: string) => void
  /**
   * Callback when a new note is added.
   */
  onNoteAdd?: (note: StickyNote) => void
  /**
   * Background color of the canvas.
   */
  backgroundColor?: string
}

/**
 * Default sticky note colors (pastel palette).
 */
const DEFAULT_COLORS = [
  '#fff59d', // Yellow
  '#ffcc80', // Orange
  '#ef9a9a', // Red
  '#ce93d8', // Purple
  '#90caf9', // Blue
  '#a5d6a7', // Green
  '#80deea', // Cyan
  '#f48fb1', // Pink
]

/**
 * Default sticky notes for demonstration.
 */
const DEFAULT_NOTES: StickyNote[] = [
  {
    id: '1',
    content: 'Welcome to the whiteboard!\n\nDrag notes to move them around.',
    x: 50,
    y: 50,
    color: '#fff59d',
    zIndex: 1,
    width: 220,
    height: 160,
  },
  {
    id: '2',
    content: 'Click the + button to add new notes.',
    x: 300,
    y: 80,
    color: '#90caf9',
    zIndex: 2,
    width: 200,
    height: 120,
  },
  {
    id: '3',
    content: 'Double-click to edit note content.',
    x: 180,
    y: 250,
    color: '#a5d6a7',
    zIndex: 3,
    width: 200,
    height: 100,
  },
  {
    id: '4',
    content: 'Use the X button to delete a note.',
    x: 520,
    y: 200,
    color: '#ef9a9a',
    zIndex: 4,
    width: 200,
    height: 100,
  },
]

/**
 * Generates a unique ID for new notes.
 * @returns A unique string ID.
 */
const generateId = (): string => {
  return `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * CanvasLayout demonstrates a free-form canvas workspace pattern.
 *
 * This layout pattern provides a whiteboard-like space where users can
 * create, move, and organize draggable elements freely. It's commonly
 * used for brainstorming, design tools, and collaborative workspaces.
 *
 * @param props - The component props.
 * @returns A React component demonstrating the canvas layout pattern.
 *
 * @example
 * // Basic whiteboard with default notes
 * <CanvasLayout
 *   onNoteMove={(id, x, y) => console.log('Moved:', id, x, y)}
 *   onNoteAdd={(note) => console.log('Added:', note)}
 * />
 *
 * @example
 * // Custom canvas with specific dimensions
 * <CanvasLayout
 *   width={1000}
 *   height={600}
 *   showGrid={true}
 *   gridSize={25}
 * />
 */
const CanvasLayout: React.FC<CanvasLayoutProps> = ({
  notes: initialNotes = DEFAULT_NOTES,
  width = 800,
  height = 500,
  showGrid = true,
  gridSize = 20,
  editable = true,
  draggable = true,
  noteColors = DEFAULT_COLORS,
  noteWidth = 200,
  noteHeight = 150,
  onNoteMove,
  onNoteUpdate,
  onNoteDelete,
  onNoteAdd,
  backgroundColor,
}) => {
  const theme = useTheme()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [notes, setNotes] = useState<StickyNote[]>(initialNotes)
  const [dragState, setDragState] = useState<{
    noteId: string | null
    offsetX: number
    offsetY: number
  }>({ noteId: null, offsetX: 0, offsetY: 0 })
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [colorIndex, setColorIndex] = useState(0)
  const [highestZIndex, setHighestZIndex] = useState(
    Math.max(...initialNotes.map((n) => n.zIndex), 0),
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, noteId: string) => {
      if (!draggable) return

      const note = notes.find((n) => n.id === noteId)
      if (!note) return

      // Bring note to front
      const newZIndex = highestZIndex + 1
      setHighestZIndex(newZIndex)
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, zIndex: newZIndex } : n)),
      )

      const rect = e.currentTarget.getBoundingClientRect()
      setDragState({
        noteId,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      })
    },
    [draggable, notes, highestZIndex],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState.noteId || !canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const note = notes.find((n) => n.id === dragState.noteId)
      if (!note) return

      const newX = Math.max(
        0,
        Math.min(
          e.clientX - canvasRect.left - dragState.offsetX,
          width - (note.width || noteWidth),
        ),
      )
      const newY = Math.max(
        0,
        Math.min(
          e.clientY - canvasRect.top - dragState.offsetY,
          height - (note.height || noteHeight),
        ),
      )

      setNotes((prev) =>
        prev.map((n) =>
          n.id === dragState.noteId ? { ...n, x: newX, y: newY } : n,
        ),
      )
    },
    [dragState, notes, width, height, noteWidth, noteHeight],
  )

  const handleMouseUp = useCallback(() => {
    if (dragState.noteId) {
      const note = notes.find((n) => n.id === dragState.noteId)
      if (note) {
        onNoteMove?.(dragState.noteId, note.x, note.y)
      }
    }
    setDragState({ noteId: null, offsetX: 0, offsetY: 0 })
  }, [dragState, notes, onNoteMove])

  const handleAddNote = useCallback(() => {
    const newNote: StickyNote = {
      id: generateId(),
      content: 'New note\n\nDouble-click to edit',
      x: Math.random() * (width - noteWidth),
      y: Math.random() * (height - noteHeight),
      color: noteColors[colorIndex % noteColors.length],
      zIndex: highestZIndex + 1,
      width: noteWidth,
      height: noteHeight,
    }

    setHighestZIndex((prev) => prev + 1)
    setColorIndex((prev) => prev + 1)
    setNotes((prev) => [...prev, newNote])
    onNoteAdd?.(newNote)
  }, [
    width,
    height,
    noteWidth,
    noteHeight,
    noteColors,
    colorIndex,
    highestZIndex,
    onNoteAdd,
  ])

  const handleDeleteNote = useCallback(
    (noteId: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== noteId))
      onNoteDelete?.(noteId)
    },
    [onNoteDelete],
  )

  const handleNoteContentChange = useCallback(
    (noteId: string, content: string) => {
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, content } : n)),
      )
    },
    [],
  )

  const handleNoteBlur = useCallback(
    (noteId: string) => {
      const note = notes.find((n) => n.id === noteId)
      if (note) {
        onNoteUpdate?.(noteId, note.content)
      }
      setEditingNoteId(null)
    },
    [notes, onNoteUpdate],
  )

  const handleDoubleClick = useCallback(
    (noteId: string) => {
      if (editable) {
        setEditingNoteId(noteId)
      }
    },
    [editable],
  )

  const gridPattern = showGrid
    ? `repeating-linear-gradient(
        0deg,
        transparent,
        transparent ${gridSize - 1}px,
        ${theme.palette.divider} ${gridSize - 1}px,
        ${theme.palette.divider} ${gridSize}px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent ${gridSize - 1}px,
        ${theme.palette.divider} ${gridSize - 1}px,
        ${theme.palette.divider} ${gridSize}px
      )`
    : 'none'

  return (
    <Box data-testid="canvas-layout-container">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Whiteboard Canvas
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: 600 }}
        >
          Drag sticky notes to organize your ideas. Double-click to edit
          content. Use the + button to add new notes.
        </Typography>
      </Box>

      <Box
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-testid="canvas-area"
        sx={{
          position: 'relative',
          width,
          height,
          backgroundColor: backgroundColor || theme.palette.background.paper,
          backgroundImage: gridPattern,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          cursor: dragState.noteId ? 'grabbing' : 'default',
          userSelect: 'none',
        }}
      >
        {/* Sticky Notes */}
        {notes.map((note) => (
          <Card
            key={note.id}
            data-testid={`sticky-note-${note.id}`}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
            onDoubleClick={() => handleDoubleClick(note.id)}
            sx={{
              position: 'absolute',
              left: note.x,
              top: note.y,
              width: note.width || noteWidth,
              height: note.height || noteHeight,
              zIndex: note.zIndex,
              backgroundColor: note.color,
              cursor: draggable
                ? dragState.noteId === note.id
                  ? 'grabbing'
                  : 'grab'
                : 'default',
              boxShadow:
                dragState.noteId === note.id
                  ? theme.shadows[12]
                  : theme.shadows[4],
              transition:
                dragState.noteId === note.id
                  ? 'box-shadow 0.2s'
                  : 'box-shadow 0.2s, left 0.1s, top 0.1s',
              transform:
                dragState.noteId === note.id ? 'scale(1.02)' : 'scale(1)',
              '&:hover': {
                boxShadow: theme.shadows[8],
              },
            }}
          >
            {/* Drag handle */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1,
                py: 0.5,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <DragIndicatorIcon
                sx={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.4)' }}
              />
              <Tooltip title="Delete note">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteNote(note.id)
                  }}
                  data-testid={`delete-note-${note.id}`}
                  sx={{
                    p: 0.25,
                    color: 'rgba(0, 0, 0, 0.4)',
                    '&:hover': {
                      color: 'error.main',
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Note content */}
            <CardContent
              sx={{
                p: 1.5,
                height: 'calc(100% - 32px)',
                overflow: 'hidden',
                '&:last-child': { pb: 1.5 },
              }}
            >
              {editingNoteId === note.id ? (
                <TextField
                  multiline
                  fullWidth
                  value={note.content}
                  onChange={(e) =>
                    handleNoteContentChange(note.id, e.target.value)
                  }
                  onBlur={() => handleNoteBlur(note.id)}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  data-testid={`note-input-${note.id}`}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontSize: '0.875rem',
                      fontFamily: '"Segoe UI", system-ui, sans-serif',
                    },
                  }}
                  sx={{
                    height: '100%',
                    '& .MuiInputBase-root': {
                      height: '100%',
                      alignItems: 'flex-start',
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      overflow: 'auto !important',
                    },
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '0.875rem',
                    fontFamily: '"Segoe UI", system-ui, sans-serif',
                    color: 'rgba(0, 0, 0, 0.87)',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {note.content}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Note FAB */}
        <Tooltip title="Add new note">
          <Fab
            color="primary"
            size="small"
            onClick={handleAddNote}
            data-testid="add-note-button"
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: highestZIndex + 100,
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        {/* Delete Zone (visual hint) */}
        {dragState.noteId && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              borderRadius: 2,
              opacity: 0.8,
              zIndex: highestZIndex + 100,
            }}
          >
            <DeleteIcon fontSize="small" />
            <Typography variant="body2">Drop to delete</Typography>
          </Box>
        )}
      </Box>

      {/* Instructions */}
      <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Drag:</strong> Move notes around the canvas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Double-click:</strong> Edit note content
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Notes:</strong> {notes.length}
        </Typography>
      </Box>
    </Box>
  )
}

export default CanvasLayout
