/**
 * User profile hooks using TanStack Query.
 * Provides profile data, follow management, and user tweets.
 */

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as api from '../../lib/api'
import { queryKeys } from '../../lib/queryClient'
import { showToast } from '../../stores/uiStore'

import type { FeedResponse, User } from '../../types'

// ════════════════════════════════════════════════════════════
// Profile Query Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook to fetch a user's profile by username.
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useUserProfile('johndoe')
 *
 * if (data) {
 *   const { user, isFollowing } = data
 * }
 * ```
 */
export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(username),
    queryFn: () => api.getUserByUsername(username),
    enabled: !!username,
  })
}

/**
 * Hook to fetch a user's tweets with infinite scrolling.
 */
export const useUserTweets = (username: string, enabled = true) => {
  return useInfiniteQuery({
    queryKey: queryKeys.users.tweets(username),
    queryFn: async ({ pageParam }) => {
      return api.getUserTweets(username, { cursor: pageParam, limit: 10 })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: FeedResponse) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: !!username && enabled,
  })
}

/**
 * Hook to fetch a user's followers.
 */
export const useUserFollowers = (username: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.followers(username),
    queryFn: () => api.getUserFollowers(username),
    enabled: !!username && enabled,
  })
}

/**
 * Hook to fetch users that a user is following.
 */
export const useUserFollowing = (username: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.users.following(username),
    queryFn: () => api.getUserFollowing(username),
    enabled: !!username && enabled,
  })
}

// ════════════════════════════════════════════════════════════
// Follow Mutation Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook for following/unfollowing a user.
 *
 * @example
 * ```tsx
 * const { mutate: toggleFollow, isPending } = useFollowUser()
 *
 * const handleFollow = () => {
 *   toggleFollow({ username: 'johndoe', isFollowing: false })
 * }
 * ```
 */
export const useFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      username,
      isFollowing,
    }: {
      username: string
      isFollowing: boolean
    }) => {
      if (isFollowing) {
        return api.unfollowUser(username)
      }
      return api.followUser(username)
    },
    onMutate: async ({ username, isFollowing }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.users.detail(username),
      })

      // Snapshot previous value
      const previousData = queryClient.getQueryData<{
        user: User
        isFollowing: boolean
      }>(queryKeys.users.detail(username))

      // Optimistically update
      if (previousData) {
        queryClient.setQueryData(queryKeys.users.detail(username), {
          ...previousData,
          isFollowing: !isFollowing,
          user: {
            ...previousData.user,
            followersCount: isFollowing
              ? previousData.user.followersCount - 1
              : previousData.user.followersCount + 1,
          },
        })
      }

      return { previousData, username }
    },
    onError: (error, { username }, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.users.detail(username),
          context.previousData,
        )
      }
      const message =
        error instanceof api.ApiError
          ? error.message
          : 'Failed to update follow'
      showToast(message, 'error')
    },
    onSuccess: (data, { isFollowing }) => {
      // Invalidate followers/following lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.followers(data.user.username),
      })
      showToast(isFollowing ? 'Unfollowed' : 'Following!', 'success')
    },
  })
}
