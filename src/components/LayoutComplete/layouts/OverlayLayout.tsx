import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Modal from '@mui/material/Modal'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback } from 'react'

/**
 * Image item for the gallery.
 */
export interface GalleryImage {
  /** Unique identifier */
  id: string
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Optional title */
  title?: string
  /** Optional description */
  description?: string
}

/**
 * Props for the OverlayLayout component.
 */
export interface OverlayLayoutProps {
  /**
   * Images to display in the gallery.
   */
  images?: GalleryImage[]
  /**
   * Number of columns in the gallery grid.
   * @default 3
   */
  columns?: number
  /**
   * Gap between gallery items in pixels.
   * @default 8
   */
  gap?: number
  /**
   * Height of gallery row in pixels.
   * @default 200
   */
  rowHeight?: number
  /**
   * Whether to show image title in lightbox.
   * @default true
   */
  showTitle?: boolean
  /**
   * Whether to show navigation arrows.
   * @default true
   */
  showNavigation?: boolean
  /**
   * Whether to show zoom controls.
   * @default true
   */
  showZoomControls?: boolean
  /**
   * Callback when an image is opened.
   */
  onImageOpen?: (image: GalleryImage) => void
  /**
   * Callback when lightbox is closed.
   */
  onClose?: () => void
  /**
   * Callback when navigating to next/previous image.
   */
  onNavigate?: (direction: 'next' | 'prev', image: GalleryImage) => void
  /**
   * Initial zoom level (1 = 100%).
   * @default 1
   */
  initialZoom?: number
  /**
   * Maximum zoom level.
   * @default 3
   */
  maxZoom?: number
  /**
   * Backdrop opacity when lightbox is open.
   * @default 0.9
   */
  backdropOpacity?: number
}

/**
 * Default sample images for demonstration.
 */
const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=300&fit=crop',
    alt: 'Breakfast with coffee and pastries',
    title: 'Morning Breakfast',
    description: 'A delicious breakfast spread with fresh coffee and pastries',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop',
    alt: 'Burger with fries',
    title: 'Classic Burger',
    description: 'Juicy burger with crispy fries',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=300&fit=crop',
    alt: 'Camera equipment',
    title: 'Photography Gear',
    description: 'Professional camera and lenses',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=400&h=300&fit=crop',
    alt: 'Coffee cup',
    title: 'Espresso',
    description: 'Rich and bold espresso coffee',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=400&h=300&fit=crop',
    alt: 'Hats collection',
    title: 'Hat Collection',
    description: 'Stylish hats for every occasion',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop',
    alt: 'Honey jar',
    title: 'Natural Honey',
    description: 'Pure organic honey from local farms',
  },
]

/**
 * OverlayLayout demonstrates the modal/popup overlay layout pattern.
 *
 * This layout pattern displays content in a layer above the main view,
 * commonly used for image lightboxes, dialogs, and popup content.
 * It includes gallery navigation, zoom controls, and keyboard support.
 *
 * @param props - The component props.
 * @returns A React component demonstrating the overlay layout pattern.
 *
 * @example
 * // Basic image gallery with lightbox
 * <OverlayLayout
 *   images={[
 *     { id: '1', src: '/image1.jpg', alt: 'Image 1' },
 *     { id: '2', src: '/image2.jpg', alt: 'Image 2' },
 *   ]}
 *   onImageOpen={(img) => console.log('Opened:', img.id)}
 * />
 *
 * @example
 * // Gallery with custom columns and row height
 * <OverlayLayout
 *   images={myImages}
 *   columns={4}
 *   rowHeight={180}
 *   showZoomControls={false}
 * />
 */
const OverlayLayout: React.FC<OverlayLayoutProps> = ({
  images = DEFAULT_IMAGES,
  columns = 3,
  gap = 8,
  rowHeight = 200,
  showTitle = true,
  showNavigation = true,
  showZoomControls = true,
  onImageOpen,
  onClose,
  onNavigate,
  initialZoom = 1,
  maxZoom = 3,
  backdropOpacity = 0.9,
}) => {
  const theme = useTheme()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [zoom, setZoom] = useState(initialZoom)

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  const handleImageClick = useCallback(
    (index: number) => {
      setSelectedIndex(index)
      setZoom(initialZoom)
      onImageOpen?.(images[index])
    },
    [images, initialZoom, onImageOpen],
  )

  const handleClose = useCallback(() => {
    setSelectedIndex(null)
    setZoom(initialZoom)
    onClose?.()
  }, [initialZoom, onClose])

  const handlePrevious = useCallback(() => {
    if (selectedIndex === null || images.length <= 1) return
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
    setZoom(initialZoom)
    onNavigate?.('prev', images[newIndex])
  }, [selectedIndex, images, initialZoom, onNavigate])

  const handleNext = useCallback(() => {
    if (selectedIndex === null || images.length <= 1) return
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
    setZoom(initialZoom)
    onNavigate?.('next', images[newIndex])
  }, [selectedIndex, images, initialZoom, onNavigate])

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, maxZoom))
  }, [maxZoom])

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5))
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'Escape':
          handleClose()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
      }
    },
    [handlePrevious, handleNext, handleClose, handleZoomIn, handleZoomOut],
  )

  return (
    <Box data-testid="overlay-layout-container">
      {/* Gallery Grid */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Image Gallery with Lightbox
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: 600 }}
        >
          Click any image to open the lightbox overlay. Use arrow keys to
          navigate, +/- to zoom, and Escape to close.
        </Typography>
      </Box>

      <ImageList
        cols={columns}
        gap={gap}
        rowHeight={rowHeight}
        data-testid="image-gallery"
      >
        {images.map((image, index) => (
          <ImageListItem
            key={image.id}
            sx={{
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[8],
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: 2,
              },
            }}
            onClick={() => handleImageClick(index)}
            onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}
            tabIndex={0}
            role="button"
            aria-label={`View ${image.title || image.alt}`}
            data-testid={`gallery-image-${image.id}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox Modal */}
      <Modal
        open={selectedIndex !== null}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: {
              backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
            },
          },
        }}
        data-testid="lightbox-modal"
      >
        <Fade in={selectedIndex !== null}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
            }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              aria-label="Close lightbox"
              data-testid="lightbox-close"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                zIndex: 10,
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Zoom Controls */}
            {showZoomControls && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  display: 'flex',
                  gap: 1,
                  zIndex: 10,
                }}
              >
                <IconButton
                  onClick={handleZoomOut}
                  aria-label="Zoom out"
                  data-testid="zoom-out"
                  disabled={zoom <= 0.5}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    '&:disabled': {
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  <ZoomOutIcon />
                </IconButton>
                <Typography
                  sx={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: 1,
                    fontSize: '0.875rem',
                  }}
                >
                  {Math.round(zoom * 100)}%
                </Typography>
                <IconButton
                  onClick={handleZoomIn}
                  aria-label="Zoom in"
                  data-testid="zoom-in"
                  disabled={zoom >= maxZoom}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    '&:disabled': {
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>
            )}

            {/* Navigation Arrows */}
            {showNavigation && images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevious}
                  aria-label="Previous image"
                  data-testid="nav-previous"
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 10,
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  aria-label="Next image"
                  data-testid="nav-next"
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 10,
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}

            {/* Image */}
            {selectedImage && (
              <Box
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={selectedImage.src.replace('w=400&h=300', 'w=1200&h=900')}
                  alt={selectedImage.alt}
                  data-testid="lightbox-image"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    transform: `scale(${zoom})`,
                    transition: 'transform 0.2s ease-out',
                    borderRadius: 1,
                  }}
                />

                {/* Image Info */}
                {showTitle && selectedImage.title && (
                  <Box
                    sx={{
                      mt: 2,
                      textAlign: 'center',
                      color: 'white',
                    }}
                    data-testid="lightbox-info"
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {selectedImage.title}
                    </Typography>
                    {selectedImage.description && (
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {selectedImage.description}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      {selectedIndex !== null &&
                        `${selectedIndex + 1} / ${images.length}`}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default OverlayLayout
