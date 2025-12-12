import DownloadIcon from '@mui/icons-material/Download'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback } from 'react'

/**
 * Number of columns for the masonry layout.
 */
export type MasonryColumns = 2 | 3 | 4 | 5

/**
 * Gap size options for masonry spacing.
 */
export type MasonryGap = 'none' | 'small' | 'medium' | 'large'

/**
 * Props for the MasonryLayout component.
 */
export interface MasonryLayoutProps {
  /**
   * Number of columns in the masonry layout.
   * @default 3
   */
  columns?: MasonryColumns
  /**
   * Gap size between masonry items.
   * @default 'medium'
   */
  gap?: MasonryGap
  /**
   * Number of images to display.
   * @default 12
   */
  imageCount?: number
  /**
   * Whether to show image metadata (photographer, tags).
   * @default true
   */
  showMetadata?: boolean
  /**
   * Whether to enable image zoom on click.
   * @default true
   */
  enableZoom?: boolean
  /**
   * Callback when an image is liked.
   */
  onLike?: (imageId: number) => void
  /**
   * Callback when an image is downloaded.
   */
  onDownload?: (imageId: number) => void
}

/**
 * Maps gap size names to pixel values.
 * @param gap - The gap size name.
 * @returns The corresponding pixel value.
 */
const getGapValue = (gap: MasonryGap): number => {
  const gapMap: Record<MasonryGap, number> = {
    none: 0,
    small: 8,
    medium: 16,
    large: 24,
  }
  return gapMap[gap]
}

/**
 * Sample image data for the photo gallery.
 * Heights are varied to demonstrate masonry effect.
 */
const SAMPLE_IMAGES = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/nature1/400/300',
    height: 300,
    photographer: 'Alex Chen',
    tags: ['nature', 'forest', 'green'],
    likes: 1234,
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/city1/400/500',
    height: 500,
    photographer: 'Maya Johnson',
    tags: ['urban', 'architecture', 'night'],
    likes: 892,
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/ocean1/400/350',
    height: 350,
    photographer: 'Sam Wilson',
    tags: ['ocean', 'beach', 'sunset'],
    likes: 2456,
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/mountain1/400/450',
    height: 450,
    photographer: 'Jordan Lee',
    tags: ['mountain', 'snow', 'adventure'],
    likes: 1567,
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/portrait1/400/600',
    height: 600,
    photographer: 'Taylor Smith',
    tags: ['portrait', 'people', 'lifestyle'],
    likes: 3210,
  },
  {
    id: 6,
    src: 'https://picsum.photos/seed/food1/400/280',
    height: 280,
    photographer: 'Casey Brown',
    tags: ['food', 'cuisine', 'delicious'],
    likes: 765,
  },
  {
    id: 7,
    src: 'https://picsum.photos/seed/abstract1/400/380',
    height: 380,
    photographer: 'Riley Davis',
    tags: ['abstract', 'art', 'creative'],
    likes: 1890,
  },
  {
    id: 8,
    src: 'https://picsum.photos/seed/travel1/400/520',
    height: 520,
    photographer: 'Morgan White',
    tags: ['travel', 'explore', 'adventure'],
    likes: 2134,
  },
  {
    id: 9,
    src: 'https://picsum.photos/seed/animal1/400/320',
    height: 320,
    photographer: 'Jamie Garcia',
    tags: ['wildlife', 'animal', 'nature'],
    likes: 4567,
  },
  {
    id: 10,
    src: 'https://picsum.photos/seed/sunset1/400/400',
    height: 400,
    photographer: 'Drew Martinez',
    tags: ['sunset', 'sky', 'beautiful'],
    likes: 3890,
  },
  {
    id: 11,
    src: 'https://picsum.photos/seed/vintage1/400/550',
    height: 550,
    photographer: 'Avery Thompson',
    tags: ['vintage', 'retro', 'classic'],
    likes: 1023,
  },
  {
    id: 12,
    src: 'https://picsum.photos/seed/minimal1/400/260',
    height: 260,
    photographer: 'Quinn Robinson',
    tags: ['minimal', 'simple', 'clean'],
    likes: 2345,
  },
  {
    id: 13,
    src: 'https://picsum.photos/seed/street1/400/480',
    height: 480,
    photographer: 'Reese Clark',
    tags: ['street', 'urban', 'life'],
    likes: 1678,
  },
  {
    id: 14,
    src: 'https://picsum.photos/seed/flower1/400/340',
    height: 340,
    photographer: 'Skyler Lewis',
    tags: ['flower', 'garden', 'spring'],
    likes: 2890,
  },
  {
    id: 15,
    src: 'https://picsum.photos/seed/space1/400/420',
    height: 420,
    photographer: 'Parker Hall',
    tags: ['space', 'cosmos', 'stars'],
    likes: 5123,
  },
]

/**
 * MasonryLayout demonstrates a Pinterest-style variable height grid layout,
 * commonly used in photo galleries, social feeds, and portfolio displays.
 *
 * This component uses CSS column-based masonry for browser-native performance,
 * featuring image overlays, likes, downloads, and zoom functionality.
 *
 * @param props - The component props.
 * @returns A React component displaying a masonry photo gallery.
 *
 * @example
 * // Basic usage with default settings
 * <MasonryLayout />
 *
 * @example
 * // Custom masonry with 4 columns and small gaps
 * <MasonryLayout columns={4} gap="small" imageCount={15} />
 *
 * @example
 * // Simple gallery without metadata
 * <MasonryLayout showMetadata={false} enableZoom={false} />
 */
const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  columns = 3,
  gap = 'medium',
  imageCount = 12,
  showMetadata = true,
  enableZoom = true,
  onLike,
  onDownload,
}) => {
  const theme = useTheme()
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())
  const [zoomedImage, setZoomedImage] = useState<
    (typeof SAMPLE_IMAGES)[0] | null
  >(null)

  const gapValue = getGapValue(gap)
  const displayedImages = SAMPLE_IMAGES.slice(0, imageCount)

  const handleLike = useCallback(
    (imageId: number) => {
      setLikedImages((prev) => {
        const next = new Set(prev)
        if (next.has(imageId)) {
          next.delete(imageId)
        } else {
          next.add(imageId)
        }
        return next
      })
      onLike?.(imageId)
    },
    [onLike],
  )

  const handleDownload = useCallback(
    (imageId: number) => {
      onDownload?.(imageId)
    },
    [onDownload],
  )

  const handleZoom = useCallback(
    (image: (typeof SAMPLE_IMAGES)[0]) => {
      if (enableZoom) {
        setZoomedImage(image)
      }
    },
    [enableZoom],
  )

  return (
    <Box sx={{ width: '100%' }}>
      {/* Gallery Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Photo Gallery
        </Typography>
        <Chip
          label={`${displayedImages.length} photos`}
          size="small"
          color="primary"
          variant="outlined"
        />
        <Box sx={{ flexGrow: 1 }} />
        <ButtonGroup variant="outlined" size="small">
          <Button>All</Button>
          <Button>Nature</Button>
          <Button>Urban</Button>
          <Button>Portrait</Button>
        </ButtonGroup>
      </Box>

      {/* Masonry Grid using CSS Columns */}
      <Box
        sx={{
          columnCount: columns,
          columnGap: `${gapValue}px`,
        }}
      >
        {displayedImages.map((image) => (
          <Paper
            key={image.id}
            elevation={2}
            sx={{
              breakInside: 'avoid',
              mb: `${gapValue}px`,
              overflow: 'hidden',
              borderRadius: 2,
              position: 'relative',
              cursor: enableZoom ? 'pointer' : 'default',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[8],
                '& .image-overlay': {
                  opacity: 1,
                },
              },
            }}
            onClick={() => handleZoom(image)}
            role="img"
            aria-label={`Photo by ${image.photographer}: ${image.tags.join(', ')}`}
          >
            <Box
              component="img"
              src={image.src}
              alt={`Photo by ${image.photographer}`}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                backgroundColor: theme.palette.grey[200],
              }}
            />

            {/* Overlay with actions */}
            <Box
              className="image-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
                opacity: 0,
                transition: 'opacity 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 1.5,
              }}
            >
              {/* Top actions */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': { backgroundColor: 'white' },
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike(image.id)
                  }}
                  aria-label={
                    likedImages.has(image.id) ? 'Unlike photo' : 'Like photo'
                  }
                >
                  {likedImages.has(image.id) ? (
                    <FavoriteIcon fontSize="small" color="error" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': { backgroundColor: 'white' },
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(image.id)
                  }}
                  aria-label="Download photo"
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': { backgroundColor: 'white' },
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Share photo"
                >
                  <ShareIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Bottom metadata */}
              {showMetadata && (
                <Box sx={{ color: 'white' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Avatar
                      sx={{ width: 28, height: 28, fontSize: '0.75rem' }}
                      alt={image.photographer}
                    >
                      {image.photographer.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {image.photographer}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {image.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          '& .MuiChip-label': { px: 1 },
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    <FavoriteIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">
                      {(
                        image.likes + (likedImages.has(image.id) ? 1 : 0)
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Zoom indicator */}
            {enableZoom && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                  '.MuiPaper-root:hover &': {
                    opacity: 1,
                  },
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': { backgroundColor: 'white' },
                  }}
                  aria-label="Zoom in"
                >
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Paper>
        ))}
      </Box>

      {/* Zoom Dialog */}
      <Dialog
        open={!!zoomedImage}
        onClose={() => setZoomedImage(null)}
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {zoomedImage && (
            <>
              <Box
                component="img"
                src={zoomedImage.src.replace('/400/', '/800/')}
                alt={`Photo by ${zoomedImage.photographer}`}
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  borderRadius: 2,
                  display: 'block',
                }}
              />
              {showMetadata && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: 'white',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {zoomedImage.photographer}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    {zoomedImage.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default MasonryLayout
