/**
 * Feed component displaying a list of tweets with infinite scroll.
 */

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'

import { useFeed } from '../../features/feed/useFeed'
import { LoadingSpinner } from '../common/LoadingSpinner'

import { TweetCard } from './TweetCard'

import type { FeedType } from '../../features/feed/useFeed'

export interface FeedProps {
  /** Type of feed to display */
  type?: FeedType
  /** User ID for user-specific feeds */
  userId?: string
  /** Handler for navigating to profile */
  onProfileClick?: (username: string) => void
  /** Handler for navigating to tweet detail */
  onTweetClick?: (tweetId: string) => void
  /** Empty state message */
  emptyMessage?: string
}

/**
 * Infinite scroll tweet feed with loading states.
 */
export const Feed: React.FC<FeedProps> = ({
  type = 'home',
  userId,
  onProfileClick,
  onTweetClick,
  emptyMessage = 'No tweets yet',
}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFeed({ type, userId })

  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    const currentRef = loadMoreRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Loading state
  if (isLoading) {
    return <LoadingSpinner message="Loading tweets..." />
  }

  // Error state
  if (isError) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          {error instanceof Error ? error.message : 'Failed to load tweets'}
        </Typography>
        <Button variant="outlined" onClick={() => refetch()}>
          Try again
        </Button>
      </Box>
    )
  }

  // Flatten all tweets from all pages
  const tweets = data?.pages.flatMap((page) => page.tweets) ?? []

  // Empty state
  if (tweets.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          onProfileClick={onProfileClick}
          onTweetClick={onTweetClick}
        />
      ))}

      {/* Load more trigger */}
      <Box ref={loadMoreRef} sx={{ py: 2, textAlign: 'center' }}>
        {isFetchingNextPage && <LoadingSpinner size="small" />}
        {!hasNextPage && tweets.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            You've reached the end
          </Typography>
        )}
      </Box>
    </Box>
  )
}
