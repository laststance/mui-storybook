/**
 * API client functions for the Twitter Clone application.
 * Type-safe fetch wrappers for all API endpoints.
 */

import type {
  AuthResponse,
  CreateTweetData,
  FeedParams,
  FeedResponse,
  FollowListResponse,
  LoginCredentials,
  NotificationResponse,
  RegisterData,
  Tweet,
  User,
} from '../types'

// ════════════════════════════════════════════════════════════
// API Client Configuration
// ════════════════════════════════════════════════════════════

const API_BASE = '/api'

/**
 * Custom error class for API errors.
 */
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public field?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Generic fetch wrapper with error handling.
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ApiError(
      data.error?.code || 'UNKNOWN_ERROR',
      data.error?.message || 'An unexpected error occurred',
      response.status,
      data.error?.field,
    )
  }

  return data
}

// ════════════════════════════════════════════════════════════
// Auth API
// ════════════════════════════════════════════════════════════

/**
 * Log in with email and password.
 */
export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

/**
 * Register a new user account.
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Log out the current user.
 */
export const logout = async (): Promise<void> => {
  await fetchApi('/auth/logout', { method: 'POST' })
}

/**
 * Get the current authenticated user.
 */
export const getCurrentUser = async (): Promise<{ user: User }> => {
  return fetchApi<{ user: User }>('/auth/me')
}

// ════════════════════════════════════════════════════════════
// Tweet API
// ════════════════════════════════════════════════════════════

/**
 * Get paginated feed of tweets.
 */
export const getTweets = async (
  params: FeedParams = {},
): Promise<FeedResponse> => {
  const searchParams = new URLSearchParams()

  if (params.cursor) searchParams.set('cursor', params.cursor)
  if (params.limit) searchParams.set('limit', params.limit.toString())
  if (params.type) searchParams.set('type', params.type)
  if (params.userId) searchParams.set('userId', params.userId)

  const query = searchParams.toString()
  return fetchApi<FeedResponse>(`/tweets${query ? `?${query}` : ''}`)
}

/**
 * Get a single tweet by ID.
 */
export const getTweetById = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}`)
}

/**
 * Create a new tweet.
 */
export const createTweet = async (
  data: CreateTweetData,
): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>('/tweets', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Delete a tweet.
 */
export const deleteTweet = async (id: string): Promise<void> => {
  await fetchApi(`/tweets/${id}`, { method: 'DELETE' })
}

/**
 * Like a tweet.
 */
export const likeTweet = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}/like`, { method: 'POST' })
}

/**
 * Unlike a tweet.
 */
export const unlikeTweet = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}/like`, { method: 'DELETE' })
}

/**
 * Retweet a tweet.
 */
export const retweet = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}/retweet`, { method: 'POST' })
}

/**
 * Undo retweet.
 */
export const undoRetweet = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}/retweet`, {
    method: 'DELETE',
  })
}

/**
 * Bookmark a tweet.
 */
export const bookmarkTweet = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}/bookmark`, {
    method: 'POST',
  })
}

/**
 * Remove bookmark.
 */
export const removeBookmark = async (id: string): Promise<{ tweet: Tweet }> => {
  return fetchApi<{ tweet: Tweet }>(`/tweets/${id}/bookmark`, {
    method: 'DELETE',
  })
}

// ════════════════════════════════════════════════════════════
// User API
// ════════════════════════════════════════════════════════════

/**
 * Get user profile by username.
 */
export const getUserByUsername = async (
  username: string,
): Promise<{ user: User; isFollowing: boolean }> => {
  return fetchApi<{ user: User; isFollowing: boolean }>(`/users/${username}`)
}

/**
 * Get tweets by a specific user.
 */
export const getUserTweets = async (
  username: string,
  params: { cursor?: string; limit?: number } = {},
): Promise<FeedResponse> => {
  const searchParams = new URLSearchParams()

  if (params.cursor) searchParams.set('cursor', params.cursor)
  if (params.limit) searchParams.set('limit', params.limit.toString())

  const query = searchParams.toString()
  return fetchApi<FeedResponse>(
    `/users/${username}/tweets${query ? `?${query}` : ''}`,
  )
}

/**
 * Follow a user.
 */
export const followUser = async (
  username: string,
): Promise<{ user: User; isFollowing: boolean }> => {
  return fetchApi<{ user: User; isFollowing: boolean }>(
    `/users/${username}/follow`,
    {
      method: 'POST',
    },
  )
}

/**
 * Unfollow a user.
 */
export const unfollowUser = async (
  username: string,
): Promise<{ user: User; isFollowing: boolean }> => {
  return fetchApi<{ user: User; isFollowing: boolean }>(
    `/users/${username}/follow`,
    {
      method: 'DELETE',
    },
  )
}

/**
 * Get followers of a user.
 */
export const getUserFollowers = async (
  username: string,
  limit?: number,
): Promise<FollowListResponse> => {
  const searchParams = new URLSearchParams()
  if (limit) searchParams.set('limit', limit.toString())
  const query = searchParams.toString()

  return fetchApi<FollowListResponse>(
    `/users/${username}/followers${query ? `?${query}` : ''}`,
  )
}

/**
 * Get users that a user is following.
 */
export const getUserFollowing = async (
  username: string,
  limit?: number,
): Promise<FollowListResponse> => {
  const searchParams = new URLSearchParams()
  if (limit) searchParams.set('limit', limit.toString())
  const query = searchParams.toString()

  return fetchApi<FollowListResponse>(
    `/users/${username}/following${query ? `?${query}` : ''}`,
  )
}

// ════════════════════════════════════════════════════════════
// Notification API
// ════════════════════════════════════════════════════════════

/**
 * Get user notifications.
 */
export const getNotifications = async (
  limit?: number,
): Promise<NotificationResponse> => {
  const searchParams = new URLSearchParams()
  if (limit) searchParams.set('limit', limit.toString())
  const query = searchParams.toString()

  return fetchApi<NotificationResponse>(
    `/notifications${query ? `?${query}` : ''}`,
  )
}

/**
 * Mark all notifications as read.
 */
export const markAllNotificationsRead = async (): Promise<void> => {
  await fetchApi('/notifications/read-all', { method: 'POST' })
}
