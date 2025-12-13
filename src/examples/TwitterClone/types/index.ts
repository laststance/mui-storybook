/**
 * Core type definitions for the Twitter Clone application.
 * These types represent the data models used throughout the application.
 */

// ════════════════════════════════════════════════════════════
// User Types
// ════════════════════════════════════════════════════════════

/**
 * Represents a user in the system.
 * Contains profile information and follower/following counts.
 */
export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatar: string
  bio: string
  location: string
  website: string
  joinedAt: string
  followersCount: number
  followingCount: number
  isVerified: boolean
}

/**
 * Credentials for user authentication.
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Data required for user registration.
 */
export interface RegisterData {
  email: string
  password: string
  username: string
  displayName: string
}

/**
 * Response from authentication endpoints.
 */
export interface AuthResponse {
  user: User
  token: string
}

// ════════════════════════════════════════════════════════════
// Tweet Types
// ════════════════════════════════════════════════════════════

/**
 * Represents a single tweet in the system.
 * Contains content, engagement metrics, and metadata.
 */
export interface Tweet {
  id: string
  content: string
  author: User
  createdAt: string
  updatedAt: string
  likesCount: number
  retweetsCount: number
  repliesCount: number
  isLiked: boolean
  isRetweeted: boolean
  isBookmarked: boolean
  replyToId: string | null
  media: TweetMedia[]
}

/**
 * Media attachment for a tweet.
 */
export interface TweetMedia {
  id: string
  type: 'image' | 'video' | 'gif'
  url: string
  altText: string
}

/**
 * Data required to create a new tweet.
 */
export interface CreateTweetData {
  content: string
  replyToId?: string
  mediaIds?: string[]
}

/**
 * Data for updating an existing tweet.
 */
export interface UpdateTweetData {
  content: string
}

// ════════════════════════════════════════════════════════════
// Feed & Timeline Types
// ════════════════════════════════════════════════════════════

/**
 * Paginated response for tweet feeds.
 */
export interface FeedResponse {
  tweets: Tweet[]
  nextCursor: string | null
  hasMore: boolean
}

/**
 * Parameters for fetching feed data.
 */
export interface FeedParams {
  cursor?: string
  limit?: number
  type?: 'home' | 'user' | 'likes' | 'bookmarks'
  userId?: string
}

// ════════════════════════════════════════════════════════════
// Follow Types
// ════════════════════════════════════════════════════════════

/**
 * Represents a follow relationship between users.
 */
export interface FollowRelation {
  followerId: string
  followingId: string
  createdAt: string
}

/**
 * Response for followers/following list endpoints.
 */
export interface FollowListResponse {
  users: User[]
  nextCursor: string | null
  hasMore: boolean
}

// ════════════════════════════════════════════════════════════
// Notification Types
// ════════════════════════════════════════════════════════════

/**
 * Types of notifications in the system.
 */
export type NotificationType =
  | 'like'
  | 'retweet'
  | 'reply'
  | 'follow'
  | 'mention'

/**
 * Represents a notification for user activity.
 */
export interface Notification {
  id: string
  type: NotificationType
  actor: User
  tweet?: Tweet
  createdAt: string
  isRead: boolean
}

/**
 * Paginated response for notifications.
 */
export interface NotificationResponse {
  notifications: Notification[]
  unreadCount: number
  nextCursor: string | null
  hasMore: boolean
}

// ════════════════════════════════════════════════════════════
// API Response Types
// ════════════════════════════════════════════════════════════

/**
 * Standard API error response.
 */
export interface ApiError {
  code: string
  message: string
  field?: string
}

/**
 * Generic API response wrapper.
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: ApiError
}

// ════════════════════════════════════════════════════════════
// UI State Types
// ════════════════════════════════════════════════════════════

/**
 * Toast notification for user feedback.
 */
export interface Toast {
  id: string
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

/**
 * Modal state for dialog management.
 */
export interface ModalState {
  isOpen: boolean
  type: 'compose' | 'reply' | 'retweet' | 'edit' | 'delete' | null
  tweetId?: string
}
