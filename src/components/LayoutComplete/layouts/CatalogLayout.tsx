import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useState, useMemo } from 'react'

import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Configuration for a filter option.
 */
export interface FilterOption {
  /** Unique value for this option */
  value: string
  /** Display label */
  label: string
  /** Number of items matching this filter */
  count?: number
}

/**
 * Configuration for a filter category.
 */
export interface FilterConfig {
  /** Unique identifier for this filter */
  id: string
  /** Display label for the filter */
  label: string
  /** Available options */
  options: FilterOption[]
  /** Currently selected value */
  value?: string
}

/**
 * Configuration for sorting options.
 */
export interface SortOption {
  /** Unique value for this sort option */
  value: string
  /** Display label */
  label: string
}

/**
 * Configuration for a catalog item.
 */
export interface CatalogItem {
  /** Unique identifier */
  id: string
  /** Item title */
  title: string
  /** Optional subtitle or category */
  subtitle?: string
  /** Description text */
  description?: string
  /** Image URL for thumbnail */
  imageUrl?: string
  /** Price or value display */
  price?: string
  /** Original price for showing discount */
  originalPrice?: string
  /** Badge or tag to display */
  badge?: string
  /** Badge color */
  badgeColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  /** Rating value (0-5) */
  rating?: number
  /** Number of reviews */
  reviewCount?: number
  /** Additional metadata */
  metadata?: Record<string, string | number>
  /** Custom action element */
  action?: React.ReactNode
}

/**
 * Props for the CatalogLayout component.
 */
export interface CatalogLayoutProps {
  /** Array of catalog items to display */
  items: CatalogItem[]
  /** Filter configurations */
  filters?: FilterConfig[]
  /** Sort options */
  sortOptions?: SortOption[]
  /** Default sort value */
  defaultSort?: string
  /** Default view mode */
  defaultViewMode?: 'grid' | 'list'
  /** Whether to show view toggle */
  showViewToggle?: boolean
  /** Whether to show sort dropdown */
  showSort?: boolean
  /** Whether to show filters */
  showFilters?: boolean
  /** Number of columns in grid view */
  gridColumns?: { xs?: number; sm?: number; md?: number; lg?: number }
  /** Items per page (0 for no pagination) */
  itemsPerPage?: number
  /** Loading state */
  loading?: boolean
  /** Number of skeleton items to show when loading */
  skeletonCount?: number
  /** Image aspect ratio */
  imageAspectRatio?: string
  /** Callback when filter changes */
  onFilterChange?: (filterId: string, value: string) => void
  /** Callback when sort changes */
  onSortChange?: (value: string) => void
  /** Callback when item is clicked */
  onItemClick?: (item: CatalogItem) => void
  /** Empty state message */
  emptyMessage?: string
  /** Whether items should be elevated */
  elevation?: number
}

/**
 * CatalogLayout provides a filterable list with thumbnails for product listings.
 *
 * This layout pattern is ideal for:
 * - E-commerce product listings
 * - Image galleries with filtering
 * - File browsers with thumbnails
 * - Portfolio showcases
 * - Search results pages
 *
 * @param props - CatalogLayout configuration
 * @returns A filterable catalog with grid/list toggle
 *
 * @example
 * // Basic product catalog
 * <CatalogLayout
 *   items={products}
 *   filters={[
 *     { id: 'category', label: 'Category', options: categories },
 *   ]}
 *   sortOptions={[
 *     { value: 'price-asc', label: 'Price: Low to High' },
 *     { value: 'price-desc', label: 'Price: High to Low' },
 *   ]}
 * />
 *
 * @example
 * // Gallery with grid view
 * <CatalogLayout
 *   items={images}
 *   showViewToggle={true}
 *   gridColumns={{ xs: 2, sm: 3, md: 4 }}
 * />
 */
const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  items,
  filters = [],
  sortOptions = [],
  defaultSort = '',
  defaultViewMode = 'grid',
  showViewToggle = true,
  showSort = true,
  showFilters = true,
  gridColumns = { xs: 1, sm: 2, md: 3, lg: 4 },
  itemsPerPage = 12,
  loading = false,
  skeletonCount = 8,
  imageAspectRatio = '56.25%', // 16:9
  onFilterChange,
  onSortChange,
  onItemClick,
  emptyMessage = 'No items found',
  elevation = 1,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(defaultViewMode)
  const [sortValue, setSortValue] = useState(defaultSort)
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {}
      filters.forEach((filter) => {
        if (filter.value) {
          initial[filter.id] = filter.value
        }
      })
      return initial
    },
  )
  const [currentPage, setCurrentPage] = useState(1)

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: 'grid' | 'list' | null,
  ) => {
    if (newView !== null) {
      setViewMode(newView)
    }
  }

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setSortValue(value)
    onSortChange?.(value)
  }

  const handleFilterChange = (filterId: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
    setCurrentPage(1)
    onFilterChange?.(filterId, value)
  }

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page)
  }

  // Calculate pagination
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(items.length / itemsPerPage) : 1
  const displayedItems = useMemo(() => {
    if (itemsPerPage <= 0) return items
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }, [items, currentPage, itemsPerPage])

  const renderSkeleton = () => (
    <Grid container spacing={2}>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Grid size={viewMode === 'grid' ? gridColumns : { xs: 12 }} key={index}>
          <Card elevation={elevation}>
            <Skeleton
              variant="rectangular"
              sx={{ paddingTop: imageAspectRatio }}
            />
            <CardContent>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )

  const renderGridItem = (item: CatalogItem) => (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onItemClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onItemClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: 6,
            }
          : {},
      }}
      onClick={() => onItemClick?.(item)}
    >
      {item.imageUrl && (
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={item.imageUrl}
            alt={item.title}
            sx={{
              aspectRatio: '16/9',
              objectFit: 'cover',
            }}
          />
          {item.badge && (
            <Chip
              label={item.badge}
              color={item.badgeColor ?? 'primary'}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            />
          )}
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          component="h3"
          fontWeight={600}
          gutterBottom
        >
          {item.title}
        </Typography>
        {item.subtitle && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.subtitle}
          </Typography>
        )}
        {item.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.description}
          </Typography>
        )}
        {(item.price || item.originalPrice) && (
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.price && (
              <Typography variant="h6" color="primary" fontWeight={700}>
                {item.price}
              </Typography>
            )}
            {item.originalPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {item.originalPrice}
              </Typography>
            )}
          </Box>
        )}
        {item.action && <Box sx={{ mt: 2 }}>{item.action}</Box>}
      </CardContent>
    </Card>
  )

  const renderListItem = (item: CatalogItem) => (
    <Card
      elevation={elevation}
      sx={{
        display: 'flex',
        cursor: onItemClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s',
        '&:hover': onItemClick ? { boxShadow: 4 } : {},
      }}
      onClick={() => onItemClick?.(item)}
    >
      {item.imageUrl && (
        <CardMedia
          component="img"
          image={item.imageUrl}
          alt={item.title}
          sx={{
            width: 200,
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography variant="h6" component="h3" fontWeight={600}>
              {item.title}
            </Typography>
            {item.subtitle && (
              <Typography variant="body2" color="text.secondary">
                {item.subtitle}
              </Typography>
            )}
          </Box>
          {item.badge && (
            <Chip
              label={item.badge}
              color={item.badgeColor ?? 'primary'}
              size="small"
            />
          )}
        </Box>
        {item.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, flexGrow: 1 }}
          >
            {item.description}
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          {(item.price || item.originalPrice) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.price && (
                <Typography variant="h6" color="primary" fontWeight={700}>
                  {item.price}
                </Typography>
              )}
              {item.originalPrice && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {item.originalPrice}
                </Typography>
              )}
            </Box>
          )}
          {item.action}
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      {/* Toolbar */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Filters */}
        {showFilters && filters.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flexGrow: 1 }}>
            {filters.map((filter) => (
              <FormControl key={filter.id} size="small" sx={{ minWidth: 150 }}>
                <InputLabel id={`${filter.id}-label`}>
                  {filter.label}
                </InputLabel>
                <Select
                  labelId={`${filter.id}-label`}
                  value={filterValues[filter.id] ?? ''}
                  label={filter.label}
                  onChange={(e) =>
                    handleFilterChange(filter.id, e.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {filter.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                      {option.count !== undefined && ` (${option.count})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        )}

        {/* Sort */}
        {showSort && sortOptions.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              value={sortValue}
              label="Sort by"
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* View Toggle */}
        {showViewToggle && (
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            size="small"
            aria-label="View mode"
          >
            <ToggleButton value="grid" aria-label="Grid view">
              <Tooltip title="Grid view">
                <GridViewIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="list" aria-label="List view">
              <Tooltip title="List view">
                <ViewListIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        )}

        {/* Results count */}
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </Typography>
      </Paper>

      {/* Content */}
      {loading ? (
        renderSkeleton()
      ) : displayedItems.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">{emptyMessage}</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {displayedItems.map((item) => (
            <Grid
              size={viewMode === 'grid' ? gridColumns : { xs: 12 }}
              key={item.id}
            >
              {viewMode === 'grid'
                ? renderGridItem(item)
                : renderListItem(item)}
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {itemsPerPage > 0 && totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  )
}

export default CatalogLayout
