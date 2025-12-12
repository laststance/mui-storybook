import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

/**
 * Represents an element in the non-grid layout.
 */
export interface NonGridElement {
  /** Unique identifier for the element */
  id: string
  /** Content to render */
  content: React.ReactNode
  /** X position as percentage (0-100) */
  x: number
  /** Y position as percentage (0-100) */
  y: number
  /** Width as percentage or 'auto' */
  width?: number | 'auto'
  /** Height as percentage or 'auto' */
  height?: number | 'auto'
  /** Z-index for layering */
  zIndex?: number
  /** Rotation in degrees */
  rotation?: number
  /** Scale factor */
  scale?: number
  /** Optional animation */
  animation?: 'none' | 'float' | 'pulse' | 'rotate'
}

/**
 * Props for the NonGridLayout component.
 */
export interface NonGridLayoutProps {
  /** Elements to display in the layout */
  elements: NonGridElement[]
  /** Background color or gradient */
  background?: string
  /** Minimum height of the container */
  minHeight?: string | number
  /** Whether to enable element interactions */
  interactive?: boolean
  /** Callback when an element is clicked */
  onElementClick?: (id: string) => void
  /** Additional styles for the container */
  sx?: object
}

/**
 * NonGridLayout provides a free-form layout where elements can be
 * placed anywhere without following a grid structure.
 *
 * This layout is ideal for creative, artistic, or experimental designs
 * where traditional grid constraints don't apply.
 *
 * @param props - The component props
 * @returns A React component with free-form positioned elements
 *
 * @example
 * // Basic usage with positioned elements
 * <NonGridLayout
 *   elements={[
 *     { id: '1', content: <Card>First</Card>, x: 10, y: 20 },
 *     { id: '2', content: <Card>Second</Card>, x: 60, y: 40, rotation: 15 },
 *   ]}
 *   minHeight="500px"
 * />
 *
 * @example
 * // Interactive art gallery
 * <NonGridLayout
 *   elements={artPieces.map((art) => ({
 *     id: art.id,
 *     content: <img src={art.src} alt={art.title} />,
 *     x: art.position.x,
 *     y: art.position.y,
 *     rotation: art.rotation,
 *     animation: 'float',
 *   }))}
 *   interactive
 *   onElementClick={(id) => openArtDetail(id)}
 * />
 */
const NonGridLayout: React.FC<NonGridLayoutProps> = ({
  elements,
  background = 'transparent',
  minHeight = 400,
  interactive = false,
  onElementClick,
  sx,
}) => {
  const theme = useTheme()

  const getAnimationStyles = (animation: NonGridElement['animation']) => {
    switch (animation) {
      case 'float':
        return {
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        }
      case 'pulse':
        return {
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.7 },
          },
        }
      case 'rotate':
        return {
          animation: 'rotate 10s linear infinite',
          '@keyframes rotate': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
        }
      default:
        return {}
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight,
        background,
        overflow: 'hidden',
        borderRadius: 1,
        ...sx,
      }}
    >
      {elements.map((element) => (
        <Box
          key={element.id}
          onClick={
            interactive && onElementClick
              ? () => onElementClick(element.id)
              : undefined
          }
          sx={{
            position: 'absolute',
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.width === 'auto' ? 'auto' : `${element.width}%`,
            height: element.height === 'auto' ? 'auto' : `${element.height}%`,
            zIndex: element.zIndex || 1,
            transform: `
              translate(-50%, -50%)
              rotate(${element.rotation || 0}deg)
              scale(${element.scale || 1})
            `,
            cursor: interactive ? 'pointer' : 'default',
            transition: interactive
              ? 'transform 0.3s ease, box-shadow 0.3s ease'
              : undefined,
            '&:hover': interactive
              ? {
                  transform: `
                    translate(-50%, -50%)
                    rotate(${element.rotation || 0}deg)
                    scale(${(element.scale || 1) * 1.05})
                  `,
                  boxShadow: theme.shadows[8],
                }
              : undefined,
            ...getAnimationStyles(element.animation),
          }}
        >
          {element.content}
        </Box>
      ))}
    </Box>
  )
}

/**
 * Real-world example: Interactive Art Gallery
 * Demonstrates a museum-style gallery with floating art pieces
 */
export const InteractiveArtGallery: React.FC = () => {
  const theme = useTheme()
  const [selectedArt, setSelectedArt] = React.useState<string | null>(null)

  const artPieces: NonGridElement[] = [
    {
      id: 'art1',
      content: (
        <Box
          sx={{
            width: 180,
            height: 240,
            bgcolor: theme.palette.primary.main,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 4,
            border: '8px solid white',
          }}
        >
          <Typography variant="h5" color="white">
            Abstract I
          </Typography>
        </Box>
      ),
      x: 20,
      y: 30,
      rotation: -5,
      animation: 'float',
    },
    {
      id: 'art2',
      content: (
        <Box
          sx={{
            width: 200,
            height: 150,
            bgcolor: theme.palette.secondary.main,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 4,
            border: '8px solid white',
          }}
        >
          <Typography variant="h5" color="white">
            Landscape
          </Typography>
        </Box>
      ),
      x: 55,
      y: 25,
      rotation: 8,
      zIndex: 2,
    },
    {
      id: 'art3',
      content: (
        <Box
          sx={{
            width: 160,
            height: 160,
            bgcolor: theme.palette.warning.main,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 4,
          }}
        >
          <Typography variant="h6" color="white">
            Circle
          </Typography>
        </Box>
      ),
      x: 80,
      y: 60,
      animation: 'pulse',
    },
    {
      id: 'art4',
      content: (
        <Box
          sx={{
            width: 140,
            height: 200,
            bgcolor: theme.palette.info.main,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 4,
            border: '8px solid white',
          }}
        >
          <Typography variant="h6" color="white">
            Portrait
          </Typography>
        </Box>
      ),
      x: 30,
      y: 70,
      rotation: 3,
    },
    {
      id: 'art5',
      content: (
        <Box
          sx={{
            width: 220,
            height: 140,
            bgcolor: theme.palette.success.main,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 4,
            border: '8px solid white',
          }}
        >
          <Typography variant="h5" color="white">
            Nature
          </Typography>
        </Box>
      ),
      x: 60,
      y: 75,
      rotation: -3,
      zIndex: 3,
    },
  ]

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Interactive Art Gallery
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Click on any artwork to view details. Pieces float and respond to hover.
      </Typography>

      <NonGridLayout
        elements={artPieces}
        background={`linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`}
        minHeight={500}
        interactive
        onElementClick={(id) => setSelectedArt(id)}
      />

      {selectedArt && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: theme.palette.background.paper,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6">
            Selected: {artPieces.find((a) => a.id === selectedArt)?.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click another piece to change selection
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default NonGridLayout
