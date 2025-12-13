/**
 * Feed and timeline hooks using TanStack Query.
 * Provides infinite scrolling and real-time updates for tweet feeds.
 */

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import * as api from '../../lib/api'
import { queryKeys } from '../../lib/queryClient'
import { showToast } from '../../stores/uiStore'

import type { FeedParams, FeedResponse } from '../../types'

// ════════════════════════════════════════════════════════════
// Feed Query Types
// ════════════════════════════════════════════════════════════

export type FeedType = 'home' | 'user' | 'likes' | 'bookmarks'

export interface UseFeedOptions {
  type?: FeedType
  userId?: string
  enabled?: boolean
}

// ════════════════════════════════════════════════════════════
// Feed Query Hook
// ════════════════════════════════════════════════════════════

/**
 * Infinite query hook for fetching paginated tweet feeds.
 * Supports cursor-based pagination and multiple feed types.
 *
 * @example
 * ```tsx
 * const {
 *   data,
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isLoading,
 * } = useFeed({ type: 'home' })
 *
 * // All tweets flattened
 * const tweets = data?.pages.flatMap(page => page.tweets) ?? []
 * ```
 */
export const useFeed = ({
  type = 'home',
  userId,
  enabled = true,
}: UseFeedOptions = {}) => {
  return useInfiniteQuery({
    queryKey: queryKeys.tweets.list({ type, userId }),
    queryFn: async ({ pageParam }) => {
      const params: FeedParams = {
        type,
        userId,
        cursor: pageParam,
        limit: 10,
      }
      return api.getTweets(params)
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: FeedResponse) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled,
    staleTime: 1000 * 60, // 1 minute
  })
}

// ════════════════════════════════════════════════════════════
// Tweet Mutation Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook for creating a new tweet.
 */
export const useCreateTweet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.createTweet,
    onSuccess: () => {
      // Invalidate all tweet lists to refetch with new tweet
      queryClient.invalidateQueries({ queryKey: queryKeys.tweets.lists() })
      showToast('Tweet posted!', 'success')
    },
    onError: (error) => {
      const message =
        error instanceof api.ApiError ? error.message : 'Failed to post tweet'
      showToast(message, 'error')
    },
  })
}

/**
 * Hook for deleting a tweet.
 */
export const useDeleteTweet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tweets.lists() })
      showToast('Tweet deleted', 'success')
    },
    onError: (error) => {
      const message =
        error instanceof api.ApiError ? error.message : 'Failed to delete tweet'
      showToast(message, 'error')
    },
  })
}

/**
 * Hook for liking/unliking a tweet.
 */
export const useLikeTweet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      tweetId,
      isLiked,
    }: {
      tweetId: string
      isLiked: boolean
    }) => {
      if (isLiked) {
        return api.unlikeTweet(tweetId)
      }
      return api.likeTweet(tweetId)
    },
    onMutate: async ({ tweetId, isLiked }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.tweets.lists() })

      // Optimistically update the tweet in all cached feeds
      queryClient.setQueriesData<{ pages: FeedResponse[] }>(
        { queryKey: queryKeys.tweets.lists() },
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              tweets: page.tweets.map((tweet) =>
                tweet.id === tweetId
                  ? {
                      ...tweet,
                      isLiked: !isLiked,
                      likesCount: isLiked
                        ? tweet.likesCount - 1
                        : tweet.likesCount + 1,
                    }
                  : tweet,
              ),
            })),
          }
        },
      )

      return { tweetId, isLiked }
    },
    onError: (_error, _variables, context) => {
      // Rollback optimistic update
      if (context) {
        queryClient.setQueriesData<{ pages: FeedResponse[] }>(
          { queryKey: queryKeys.tweets.lists() },
          (oldData) => {
            if (!oldData) return oldData

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                tweets: page.tweets.map((tweet) =>
                  tweet.id === context.tweetId
                    ? {
                        ...tweet,
                        isLiked: context.isLiked,
                        likesCount: context.isLiked
                          ? tweet.likesCount + 1
                          : tweet.likesCount - 1,
                      }
                    : tweet,
                ),
              })),
            }
          },
        )
      }
      showToast('Failed to update like', 'error')
    },
  })
}

/**
 * Hook for retweeting/un-retweeting a tweet.
 */
export const useRetweet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      tweetId,
      isRetweeted,
    }: {
      tweetId: string
      isRetweeted: boolean
    }) => {
      if (isRetweeted) {
        return api.undoRetweet(tweetId)
      }
      return api.retweet(tweetId)
    },
    onMutate: async ({ tweetId, isRetweeted }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tweets.lists() })

      queryClient.setQueriesData<{ pages: FeedResponse[] }>(
        { queryKey: queryKeys.tweets.lists() },
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              tweets: page.tweets.map((tweet) =>
                tweet.id === tweetId
                  ? {
                      ...tweet,
                      isRetweeted: !isRetweeted,
                      retweetsCount: isRetweeted
                        ? tweet.retweetsCount - 1
                        : tweet.retweetsCount + 1,
                    }
                  : tweet,
              ),
            })),
          }
        },
      )

      return { tweetId, isRetweeted }
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueriesData<{ pages: FeedResponse[] }>(
          { queryKey: queryKeys.tweets.lists() },
          (oldData) => {
            if (!oldData) return oldData

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                tweets: page.tweets.map((tweet) =>
                  tweet.id === context.tweetId
                    ? {
                        ...tweet,
                        isRetweeted: context.isRetweeted,
                        retweetsCount: context.isRetweeted
                          ? tweet.retweetsCount + 1
                          : tweet.retweetsCount - 1,
                      }
                    : tweet,
                ),
              })),
            }
          },
        )
      }
      showToast('Failed to retweet', 'error')
    },
    onSuccess: (_, { isRetweeted }) => {
      showToast(isRetweeted ? 'Retweet removed' : 'Retweeted!', 'success')
    },
  })
}

/**
 * Hook for bookmarking/un-bookmarking a tweet.
 */
export const useBookmark = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      tweetId,
      isBookmarked,
    }: {
      tweetId: string
      isBookmarked: boolean
    }) => {
      if (isBookmarked) {
        return api.removeBookmark(tweetId)
      }
      return api.bookmarkTweet(tweetId)
    },
    onMutate: async ({ tweetId, isBookmarked }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.tweets.lists() })

      queryClient.setQueriesData<{ pages: FeedResponse[] }>(
        { queryKey: queryKeys.tweets.lists() },
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              tweets: page.tweets.map((tweet) =>
                tweet.id === tweetId
                  ? { ...tweet, isBookmarked: !isBookmarked }
                  : tweet,
              ),
            })),
          }
        },
      )

      return { tweetId, isBookmarked }
    },
    onError: (_error, _variables, context) => {
      if (context) {
        queryClient.setQueriesData<{ pages: FeedResponse[] }>(
          { queryKey: queryKeys.tweets.lists() },
          (oldData) => {
            if (!oldData) return oldData

            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                tweets: page.tweets.map((tweet) =>
                  tweet.id === context.tweetId
                    ? { ...tweet, isBookmarked: context.isBookmarked }
                    : tweet,
                ),
              })),
            }
          },
        )
      }
      showToast('Failed to update bookmark', 'error')
    },
    onSuccess: (_, { isBookmarked }) => {
      showToast(
        isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
        'success',
      )
    },
  })
}
