import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FilterListIcon from '@mui/icons-material/FilterList'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import StarIcon from '@mui/icons-material/Star'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { useState, useCallback } from 'react'

/**
 * Configuration options for GridLayout column count.
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Gap size options for grid spacing.
 */
export type GridGap = 'none' | 'small' | 'medium' | 'large'

/**
 * Props for the GridLayout component.
 */
export interface GridLayoutProps {
  /**
   * Number of columns in the grid layout.
   * @default 3
   */
  columns?: GridColumns
  /**
   * Gap size between grid items.
   * @default 'medium'
   */
  gap?: GridGap
  /**
   * Number of items to display in the grid.
   * @default 6
   */
  itemCount?: number
  /**
   * Whether to show the filter panel.
   * @default true
   */
  showFilters?: boolean
  /**
   * Whether to show pagination controls.
   * @default true
   */
  showPagination?: boolean
  /**
   * Callback when an item is clicked.
   */
  onItemClick?: (itemId: number) => void
  /**
   * Callback when add to cart is clicked.
   */
  onAddToCart?: (itemId: number) => void
}

/**
 * Maps gap size names to pixel values.
 * @param gap - The gap size name.
 * @returns The corresponding pixel value.
 */
const getGapValue = (gap: GridGap): number => {
  const gapMap: Record<GridGap, number> = {
    none: 0,
    small: 8,
    medium: 16,
    large: 24,
  }
  return gapMap[gap]
}

/**
 * Sample product data for the e-commerce grid.
 */
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 129.99,
    rating: 4.5,
    image: 'https://picsum.photos/seed/headphones/300/200',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    rating: 4.8,
    image: 'https://picsum.photos/seed/watch/300/200',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 3,
    name: 'Leather Backpack',
    price: 89.99,
    rating: 4.2,
    image: 'https://picsum.photos/seed/backpack/300/200',
    category: 'Fashion',
    inStock: false,
  },
  {
    id: 4,
    name: 'Running Shoes',
    price: 149.99,
    rating: 4.6,
    image: 'https://picsum.photos/seed/shoes/300/200',
    category: 'Sports',
    inStock: true,
  },
  {
    id: 5,
    name: 'Coffee Maker',
    price: 79.99,
    rating: 4.3,
    image: 'https://picsum.photos/seed/coffee/300/200',
    category: 'Home',
    inStock: true,
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 45.99,
    rating: 4.1,
    image: 'https://picsum.photos/seed/lamp/300/200',
    category: 'Home',
    inStock: true,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 69.99,
    rating: 4.4,
    image: 'https://picsum.photos/seed/speaker/300/200',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 8,
    name: 'Yoga Mat',
    price: 35.99,
    rating: 4.7,
    image: 'https://picsum.photos/seed/yoga/300/200',
    category: 'Sports',
    inStock: true,
  },
  {
    id: 9,
    name: 'Sunglasses',
    price: 159.99,
    rating: 4.0,
    image: 'https://picsum.photos/seed/sunglasses/300/200',
    category: 'Fashion',
    inStock: false,
  },
  {
    id: 10,
    name: 'Mechanical Keyboard',
    price: 189.99,
    rating: 4.9,
    image: 'https://picsum.photos/seed/keyboard/300/200',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 11,
    name: 'Plant Pot Set',
    price: 29.99,
    rating: 4.2,
    image: 'https://picsum.photos/seed/plant/300/200',
    category: 'Home',
    inStock: true,
  },
  {
    id: 12,
    name: 'Fitness Tracker',
    price: 99.99,
    rating: 4.5,
    image: 'https://picsum.photos/seed/fitness/300/200',
    category: 'Sports',
    inStock: true,
  },
]

/**
 * GridLayout demonstrates a structured rows and columns grid pattern,
 * commonly used in e-commerce product grids, image galleries, and card layouts.
 *
 * This component showcases CSS Grid implementation with MUI components,
 * featuring responsive column counts, customizable gaps, filtering, and pagination.
 *
 * @param props - The component props.
 * @returns A React component displaying a grid-based product layout.
 *
 * @example
 * // Basic usage with default settings
 * <GridLayout />
 *
 * @example
 * // Custom grid with 4 columns and large gaps
 * <GridLayout columns={4} gap="large" itemCount={12} />
 *
 * @example
 * // Minimal grid without filters or pagination
 * <GridLayout showFilters={false} showPagination={false} />
 */
const GridLayout: React.FC<GridLayoutProps> = ({
  columns = 3,
  gap = 'medium',
  itemCount = 6,
  showFilters = true,
  showPagination = true,
  onItemClick,
  onAddToCart,
}) => {
  const theme = useTheme()
  const [category, setCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [currentPage, setCurrentPage] = useState(1)

  const gapValue = getGapValue(gap)
  const displayedProducts = SAMPLE_PRODUCTS.slice(0, itemCount)

  const handleItemClick = useCallback(
    (itemId: number) => {
      onItemClick?.(itemId)
    },
    [onItemClick],
  )

  const handleAddToCart = useCallback(
    (itemId: number) => {
      onAddToCart?.(itemId)
    },
    [onAddToCart],
  )

  return (
    <Box sx={{ width: '100%' }}>
      {/* Filter Panel */}
      {showFilters && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            backgroundColor: theme.palette.grey[50],
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: theme.palette.grey[900],
            }),
          }}
        >
          <FilterListIcon color="action" />
          <Typography variant="body2" fontWeight={600} sx={{ mr: 2 }}>
            Filters:
          </Typography>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Top Rated</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="body2" color="text.secondary">
            Showing {displayedProducts.length} of {SAMPLE_PRODUCTS.length}{' '}
            products
          </Typography>
        </Paper>
      )}

      {/* Product Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gapValue}px`,
        }}
      >
        {displayedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              },
            }}
            onClick={() => handleItemClick(product.id)}
            role="article"
            aria-label={`Product: ${product.name}`}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                sx={{
                  backgroundColor: theme.palette.grey[200],
                }}
              />
              {!product.inStock && (
                <Chip
                  label="Out of Stock"
                  size="small"
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                  }}
                />
              )}
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: theme.palette.error.main,
                  },
                }}
                aria-label={`Add ${product.name} to favorites`}
                onClick={(e) => e.stopPropagation()}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
              <Chip
                label={product.category}
                size="small"
                variant="outlined"
                sx={{ mb: 1, fontSize: '0.7rem' }}
              />
              <Typography
                variant="subtitle1"
                component="h3"
                fontWeight={600}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  mb: 0.5,
                }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Rating
                  value={product.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography variant="body2" color="text.secondary">
                  ({product.rating})
                </Typography>
              </Box>
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                sx={{ mt: 1 }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                startIcon={<AddShoppingCartIcon />}
                disabled={!product.inStock}
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToCart(product.id)
                }}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      {showPagination && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
            gap: 2,
          }}
        >
          <IconButton
            disabled={currentPage === 1}
            aria-label="Previous page"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Pagination
            count={5}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            showFirstButton
            showLastButton
          />
          <IconButton
            disabled={currentPage === 5}
            aria-label="Next page"
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default GridLayout
