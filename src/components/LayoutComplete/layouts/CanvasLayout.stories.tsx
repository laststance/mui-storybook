import { expect, fn, userEvent, within } from 'storybook/test'

import CanvasLayout from './CanvasLayout'

import type { StickyNote } from './CanvasLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * CanvasLayout demonstrates the free-form canvas workspace pattern.
 *
 * ## Overview
 * The canvas layout pattern provides a whiteboard-like workspace where
 * users can create, move, and organize draggable elements freely. This
 * pattern is essential for brainstorming, design tools, and collaborative
 * workspaces.
 *
 * ## Use Cases
 * - **Brainstorming**: Sticky notes for ideation sessions
 * - **Design tools**: Figma-like workspaces
 * - **Project planning**: Kanban-style boards
 * - **Mind mapping**: Visual idea organization
 * - **Whiteboarding**: Collaborative drawing spaces
 *
 * ## Accessibility
 * - Keyboard-accessible note editing
 * - Clear focus indicators
 * - Screen reader support for note content
 * - Sufficient contrast on all note colors
 *
 * ## Best Practices
 * - Provide clear visual feedback during drag
 * - Allow undo/redo for accidental moves
 * - Auto-save changes to prevent data loss
 * - Support touch gestures for mobile
 */
const meta = {
  title: 'Layout Complete/Layouts/Canvas',
  component: CanvasLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CanvasLayout demonstrates a whiteboard canvas with draggable sticky notes for brainstorming and organization.

## Key Features
- **Draggable notes**: Click and drag to reposition
- **Editable content**: Double-click to edit note text
- **Color variety**: Multiple pastel colors for categorization
- **Z-index management**: Clicked notes come to front
- **Grid background**: Optional alignment grid

## Real-World Examples
- Miro and FigJam whiteboards
- Trello cards (draggable organization)
- Sticky notes apps
- Mind mapping tools

## Technical Details
- Pure React drag implementation (no external library)
- Optimistic UI updates for smooth dragging
- Configurable grid snapping
- Event callbacks for integration
        `,
      },
    },
  },
  argTypes: {
    width: {
      control: { type: 'range', min: 400, max: 1200, step: 50 },
      description: 'Width of the canvas in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '800' },
      },
    },
    height: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
      description: 'Height of the canvas in pixels.',
      table: {
        category: 'Layout',
        defaultValue: { summary: '500' },
      },
    },
    showGrid: {
      control: 'boolean',
      description: 'Whether to show the grid background.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    gridSize: {
      control: { type: 'range', min: 10, max: 50, step: 5 },
      description: 'Grid size in pixels.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '20' },
      },
    },
    editable: {
      control: 'boolean',
      description: 'Whether notes are editable.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    draggable: {
      control: 'boolean',
      description: 'Whether notes are draggable.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'true' },
      },
    },
    noteWidth: {
      control: { type: 'range', min: 100, max: 300, step: 20 },
      description: 'Default width for new notes.',
      table: {
        category: 'Notes',
        defaultValue: { summary: '200' },
      },
    },
    noteHeight: {
      control: { type: 'range', min: 80, max: 250, step: 10 },
      description: 'Default height for new notes.',
      table: {
        category: 'Notes',
        defaultValue: { summary: '150' },
      },
    },
    onNoteMove: { action: 'note moved' },
    onNoteUpdate: { action: 'note updated' },
    onNoteDelete: { action: 'note deleted' },
    onNoteAdd: { action: 'note added' },
    notes: { control: false },
    noteColors: { control: false },
    backgroundColor: { control: 'color' },
  },
  args: {
    width: 800,
    height: 500,
    showGrid: true,
    gridSize: 20,
    editable: true,
    draggable: true,
    noteWidth: 200,
    noteHeight: 150,
  },
} satisfies Meta<typeof CanvasLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the CanvasLayout component.
 * Use the Controls panel to experiment with all configuration options.
 */
export const Playground: Story = {
  args: {
    width: 800,
    height: 500,
    showGrid: true,
    gridSize: 20,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground. Drag notes around, double-click to edit, and use the + button to add more.',
      },
    },
  },
}

/**
 * Basic whiteboard with default sticky notes.
 */
export const Basic: Story = {
  args: {
    width: 800,
    height: 500,
    showGrid: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic whiteboard canvas with 4 starter notes. Demonstrates core drag and edit functionality.',
      },
    },
  },
}

/**
 * Real-world example: Sprint planning board with categorized notes.
 */
export const RealWorld: Story = {
  args: {
    width: 900,
    height: 550,
    showGrid: true,
    gridSize: 25,
  },
  render: (args) => {
    const sprintNotes: StickyNote[] = [
      {
        id: 'header-todo',
        content: 'TODO',
        x: 50,
        y: 20,
        color: '#fff59d',
        zIndex: 1,
        width: 180,
        height: 50,
      },
      {
        id: 'header-progress',
        content: 'IN PROGRESS',
        x: 280,
        y: 20,
        color: '#90caf9',
        zIndex: 1,
        width: 180,
        height: 50,
      },
      {
        id: 'header-done',
        content: 'DONE',
        x: 510,
        y: 20,
        color: '#a5d6a7',
        zIndex: 1,
        width: 180,
        height: 50,
      },
      {
        id: 'task-1',
        content:
          'Implement user authentication\n\nPriority: High\nEstimate: 5 pts',
        x: 50,
        y: 90,
        color: '#fff59d',
        zIndex: 2,
        width: 180,
        height: 120,
      },
      {
        id: 'task-2',
        content: 'Design dashboard layout\n\nPriority: Medium\nEstimate: 3 pts',
        x: 50,
        y: 230,
        color: '#fff59d',
        zIndex: 2,
        width: 180,
        height: 120,
      },
      {
        id: 'task-3',
        content: 'API integration\n\nPriority: High\nAssigned: @dev1',
        x: 280,
        y: 90,
        color: '#90caf9',
        zIndex: 3,
        width: 180,
        height: 120,
      },
      {
        id: 'task-4',
        content: 'Database schema\n\nCompleted: Dec 10\nReview: Approved',
        x: 510,
        y: 90,
        color: '#a5d6a7',
        zIndex: 4,
        width: 180,
        height: 120,
      },
      {
        id: 'task-5',
        content: 'Setup CI/CD\n\nCompleted: Dec 8\nReview: Approved',
        x: 510,
        y: 230,
        color: '#a5d6a7',
        zIndex: 4,
        width: 180,
        height: 120,
      },
    ]

    return <CanvasLayout {...args} notes={sprintNotes} />
  },
  parameters: {
    docs: {
      description: {
        story: `
A real-world sprint planning board featuring:
- **Column headers**: TODO, In Progress, Done
- **Task cards**: Draggable between columns
- **Priority indicators**: Color-coded by status
- **Task details**: Description, priority, estimates

This pattern is commonly seen in tools like Trello, Jira, and Monday.com.
        `,
      },
    },
  },
}

/**
 * Interaction test: Verifies note deletion functionality.
 */
export const InteractionTest: Story = {
  args: {
    width: 600,
    height: 400,
    onNoteDelete: fn(),
    onNoteAdd: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify canvas is rendered
    const canvasArea = canvas.getByTestId('canvas-area')
    await expect(canvasArea).toBeInTheDocument()

    // Find a sticky note
    const note = canvas.getByTestId('sticky-note-1')
    await expect(note).toBeInTheDocument()

    // Find and click the delete button
    const deleteButton = canvas.getByTestId('delete-note-1')
    await userEvent.click(deleteButton)

    // Verify the callback was called
    await expect(args.onNoteDelete).toHaveBeenCalledWith('1')

    // Verify the note is removed
    await expect(canvas.queryByTestId('sticky-note-1')).not.toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test that verifies note deletion functionality.',
      },
    },
  },
}

/**
 * Add note interaction test.
 */
export const AddNoteInteractionTest: Story = {
  args: {
    width: 600,
    height: 400,
    notes: [],
    onNoteAdd: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Find and click the add button
    const addButton = canvas.getByTestId('add-note-button')
    await expect(addButton).toBeInTheDocument()

    await userEvent.click(addButton)

    // Verify the callback was called
    await expect(args.onNoteAdd).toHaveBeenCalled()

    // Verify a new note appears (check for any sticky note)
    const notes = canvas.getAllByTestId(/sticky-note-/)
    await expect(notes.length).toBeGreaterThan(0)
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test that verifies adding new notes.',
      },
    },
  },
}

/**
 * Empty canvas state.
 */
export const EmptyCanvas: Story = {
  args: {
    notes: [],
    width: 800,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty canvas ready for new notes. Click the + button to start adding.',
      },
    },
  },
}

/**
 * Canvas without grid.
 */
export const NoGrid: Story = {
  args: {
    showGrid: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean canvas without alignment grid. For free-form layouts.',
      },
    },
  },
}

/**
 * Large grid pattern.
 */
export const LargeGrid: Story = {
  args: {
    showGrid: true,
    gridSize: 40,
  },
  parameters: {
    docs: {
      description: {
        story: 'Canvas with larger grid cells for easier alignment.',
      },
    },
  },
}

/**
 * Small dense grid pattern.
 */
export const SmallGrid: Story = {
  args: {
    showGrid: true,
    gridSize: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Canvas with smaller grid cells for precise positioning.',
      },
    },
  },
}

/**
 * Read-only canvas (no editing or dragging).
 */
export const ReadOnly: Story = {
  args: {
    editable: false,
    draggable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Read-only mode. Notes cannot be edited or moved. Useful for presentations.',
      },
    },
  },
}

/**
 * Draggable but not editable.
 */
export const DraggableOnly: Story = {
  args: {
    editable: false,
    draggable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Notes can be moved but not edited. Good for organization-only tasks.',
      },
    },
  },
}

/**
 * Wide canvas for more space.
 */
export const WideCanvas: Story = {
  args: {
    width: 1100,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra-wide canvas for horizontal workflows and timelines.',
      },
    },
  },
}

/**
 * Tall canvas for vertical layouts.
 */
export const TallCanvas: Story = {
  args: {
    width: 600,
    height: 600,
  },
  parameters: {
    docs: {
      description: {
        story: 'Taller canvas for vertical hierarchies and flows.',
      },
    },
  },
}

/**
 * Compact notes for dense information.
 */
export const CompactNotes: Story = {
  args: {
    noteWidth: 140,
    noteHeight: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Smaller notes for fitting more information on the canvas.',
      },
    },
  },
}

/**
 * Large notes for detailed content.
 */
export const LargeNotes: Story = {
  args: {
    noteWidth: 280,
    noteHeight: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger notes for detailed content and longer text.',
      },
    },
  },
}

/**
 * Brainstorming session with many notes.
 */
export const BrainstormingSession: Story = {
  args: {
    width: 900,
    height: 600,
    showGrid: true,
  },
  render: (args) => {
    const brainstormNotes: StickyNote[] = [
      {
        id: 'idea-1',
        content: 'Core Idea:\nImprove user onboarding',
        x: 350,
        y: 250,
        color: '#fff59d',
        zIndex: 10,
        width: 200,
        height: 100,
      },
      {
        id: 'idea-2',
        content: 'Tutorial videos',
        x: 150,
        y: 100,
        color: '#90caf9',
        zIndex: 2,
        width: 160,
        height: 80,
      },
      {
        id: 'idea-3',
        content: 'Interactive walkthrough',
        x: 550,
        y: 80,
        color: '#90caf9',
        zIndex: 2,
        width: 160,
        height: 80,
      },
      {
        id: 'idea-4',
        content: 'Simplified first run',
        x: 100,
        y: 350,
        color: '#a5d6a7',
        zIndex: 2,
        width: 160,
        height: 80,
      },
      {
        id: 'idea-5',
        content: 'Progress indicators',
        x: 600,
        y: 380,
        color: '#a5d6a7',
        zIndex: 2,
        width: 160,
        height: 80,
      },
      {
        id: 'idea-6',
        content: 'Email drip campaign',
        x: 200,
        y: 480,
        color: '#ce93d8',
        zIndex: 2,
        width: 160,
        height: 80,
      },
      {
        id: 'idea-7',
        content: 'Gamification elements',
        x: 500,
        y: 500,
        color: '#ce93d8',
        zIndex: 2,
        width: 160,
        height: 80,
      },
      {
        id: 'idea-8',
        content: 'User feedback loop',
        x: 700,
        y: 220,
        color: '#ffcc80',
        zIndex: 2,
        width: 160,
        height: 80,
      },
    ]

    return <CanvasLayout {...args} notes={brainstormNotes} />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Brainstorming session layout with ideas radiating from a central concept.',
      },
    },
  },
}

/**
 * Dark background canvas.
 */
export const DarkBackground: Story = {
  args: {
    backgroundColor: '#1a1a2e',
    showGrid: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Canvas with dark background for low-light environments.',
      },
    },
  },
}

/**
 * Custom note colors.
 */
export const CustomColors: Story = {
  args: {
    noteColors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
    notes: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom color palette for new notes. Add notes to see the color rotation.',
      },
    },
  },
}
