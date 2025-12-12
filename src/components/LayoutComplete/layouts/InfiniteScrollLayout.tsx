import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useRef, useState } from 'react'

import type React from 'react'

/**
 * Props for the InfiniteScrollLayout component.
 */
export interface InfiniteScrollLayoutProps {
  /**
   * Array of items to display.
   */
  items: InfiniteScrollItem[]
  /**
   * Whether more items are available to load.
   * @default true
   */
  hasMore?: boolean
  /**
   * Whether items are currently being loaded.
   * @default false
   */
  isLoading?: boolean
  /**
   * Callback to load more items when scrolling near the end.
   */
  onLoadMore?: () => void
  /**
   * Threshold in pixels before the end to trigger loading.
   * @default 200
   */
  loadThreshold?: number
  /**
   * Number of skeleton placeholders to show while loading.
   * @default 3
   */
  skeletonCount?: number
  /**
   * Whether to show a search input.
   * @default true
   */
  showSearch?: boolean
  /**
   * Placeholder text for the search input.
   * @default 'Search...'
   */
  searchPlaceholder?: string
  /**
   * Callback when search query changes.
   */
  onSearch?: (query: string) => void
  /**
   * Total count of items for display.
   */
  totalCount?: number
  /**
   * Callback when an item is clicked.
   */
  onItemClick?: (itemId: string) => void
}

/**
 * Item configuration for infinite scroll.
 */
export interface InfiniteScrollItem {
  /** Unique identifier */
  id: string
  /** Item title */
  title: string
  /** Item description */
  description: string
  /** Category or type */
  category?: string
  /** Tags for filtering */
  tags?: string[]
  /** Metadata to display */
  metadata?: {
    label: string
    value: string | number
  }[]
  /** Relevance score (0-100) */
  relevance?: number
  /** Custom content */
  customContent?: React.ReactNode
}

/**
 * InfiniteScrollLayout provides continuous content loading as users scroll.
 *
 * This layout pattern is ideal for:
 * - Search results pages with paginated data
 * - Activity feeds with chronological content
 * - Product listings with lazy loading
 * - Content discovery interfaces
 *
 * @example
 * ```tsx
 * const [items, setItems] = useState<InfiniteScrollItem[]>([])
 * const [hasMore, setHasMore] = useState(true)
 * const [isLoading, setIsLoading] = useState(false)
 *
 * const handleLoadMore = async () => {
 *   setIsLoading(true)
 *   const newItems = await fetchMoreItems()
 *   setItems(prev => [...prev, ...newItems])
 *   setHasMore(newItems.length > 0)
 *   setIsLoading(false)
 * }
 *
 * <InfiniteScrollLayout
 *   items={items}
 *   hasMore={hasMore}
 *   isLoading={isLoading}
 *   onLoadMore={handleLoadMore}
 *   showSearch={true}
 *   onSearch={(query) => console.log(query)}
 * />
 * ```
 *
 * @param props - Component props
 * @returns Infinite scroll layout component
 */
const InfiniteScrollLayout: React.FC<InfiniteScrollLayoutProps> = ({
  items,
  hasMore = true,
  isLoading = false,
  onLoadMore,
  loadThreshold = 200,
  skeletonCount = 3,
  showSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  totalCount,
  onItemClick,
}) => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const sentinelRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore?.()
        }
      },
      {
        root: null,
        rootMargin: `${loadThreshold}px`,
        threshold: 0,
      },
    )

    const sentinel = sentinelRef.current
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [hasMore, isLoading, loadThreshold, onLoadMore])

  /**
   * Handles search input changes.
   * @param event - The input change event
   */
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value
      setSearchQuery(query)
      onSearch?.(query)
    },
    [onSearch],
  )

  /**
   * Renders a skeleton loading placeholder.
   * @param index - The skeleton index for key generation
   * @returns Skeleton card component
   */
  const renderSkeleton = (index: number) => (
    <Card
      key={`skeleton-${index}`}
      sx={{ mb: 2 }}
      data-testid={`skeleton-${index}`}
    >
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Container maxWidth="md" data-testid="infinite-scroll-layout">
      {/* Search header */}
      {showSearch && (
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: theme.palette.background.default,
            py: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: theme.palette.background.paper,
              },
            }}
            inputProps={{
              'aria-label': 'Search',
            }}
          />
          {totalCount !== undefined && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
              role="status"
              aria-live="polite"
            >
              {totalCount.toLocaleString()} results found
            </Typography>
          )}
        </Box>
      )}

      {/* Results list */}
      <Box
        ref={containerRef}
        sx={{ py: 2 }}
        role="feed"
        aria-busy={isLoading}
        aria-label="Search results"
      >
        {items.length === 0 && !isLoading ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              color: 'text.secondary',
            }}
          >
            <Typography variant="h6" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body2">
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          items.map((item, index) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                cursor: onItemClick ? 'pointer' : 'default',
                transition: theme.transitions.create(
                  ['box-shadow', 'transform'],
                  {
                    duration: theme.transitions.duration.short,
                  },
                ),
                '&:hover': onItemClick
                  ? {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                    }
                  : {},
              }}
              data-testid={`item-${item.id}`}
              onClick={() => onItemClick?.(item.id)}
              role={onItemClick ? 'button' : 'article'}
              tabIndex={onItemClick ? 0 : undefined}
              aria-posinset={index + 1}
              aria-setsize={hasMore ? -1 : items.length}
              onKeyDown={(e) => {
                if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  onItemClick(item.id)
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.relevance !== undefined && (
                    <Chip
                      label={`${item.relevance}% match`}
                      size="small"
                      color={
                        item.relevance >= 80
                          ? 'success'
                          : item.relevance >= 50
                            ? 'warning'
                            : 'default'
                      }
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>

                {item.category && (
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{
                      display: 'block',
                      mb: 1,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {item.category}
                  </Typography>
                )}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  {item.description}
                </Typography>

                {item.customContent && (
                  <Box sx={{ mb: 2 }}>{item.customContent}</Box>
                )}

                {item.metadata && item.metadata.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                    {item.metadata.map((meta) => (
                      <Box key={meta.label}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {meta.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {meta.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {item.tags && item.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {item.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <Box aria-label="Loading more results" role="status">
            {Array.from({ length: skeletonCount }).map((_, index) =>
              renderSkeleton(index),
            )}
          </Box>
        )}

        {/* Load more sentinel */}
        <Box
          ref={sentinelRef}
          sx={{
            height: 1,
            visibility: 'hidden',
          }}
          aria-hidden="true"
        />

        {/* Loading indicator */}
        {isLoading && items.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}

        {/* End of results message */}
        {!hasMore && items.length > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', py: 4 }}
          >
            You have reached the end of the results
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default InfiniteScrollLayout
