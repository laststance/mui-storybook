/**
 * MSW request handlers for the Twitter Clone API.
 * Simulates a RESTful API for authentication, tweets, users, and notifications.
 */

import { delay, http, HttpResponse } from 'msw'

import { clearAuth, setAuthUser } from '../stores/authStore'

import {
  findUserByEmail,
  findUserById,
  findUserByUsername,
  isFollowing,
  mockFollowRelations,
  mockNotifications,
  mockTweets,
  mockUsers,
} from './mockData'

import type {
  AuthResponse,
  CreateTweetData,
  FeedResponse,
  Tweet,
  User,
} from '../types'

// ════════════════════════════════════════════════════════════
// In-Memory State (for mutations)
// ════════════════════════════════════════════════════════════

let tweets = [...mockTweets]
let followRelations = [...mockFollowRelations]
let notifications = [...mockNotifications]
let nextTweetId = tweets.length + 1

// Current authenticated user (simulated session)
let currentUser: User | null = null

// ════════════════════════════════════════════════════════════
// Authentication Handlers
// ════════════════════════════════════════════════════════════

const authHandlers = [
  /**
   * POST /api/auth/login
   * Authenticate user with email and password.
   */
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500) // Simulate network latency

    const body = (await request.json()) as { email: string; password: string }
    const { email, password } = body

    // Find user by email
    const user = findUserByEmail(email)

    if (!user) {
      return HttpResponse.json(
        {
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 },
      )
    }

    // Simulate password check (any password works for demo)
    if (password.length < 6) {
      return HttpResponse.json(
        {
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 },
      )
    }

    currentUser = user
    const token = `mock-jwt-token-${user.id}-${Date.now()}`

    const response: AuthResponse = { user, token }
    return HttpResponse.json(response)
  }),

  /**
   * POST /api/auth/register
   * Register a new user account.
   */
  http.post('/api/auth/register', async ({ request }) => {
    await delay(700)

    const body = (await request.json()) as {
      email: string
      password: string
      username: string
      displayName: string
    }
    const { email, password, username, displayName } = body

    // Validate password length
    if (password.length < 6) {
      return HttpResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Password must be at least 6 characters',
            field: 'password',
          },
        },
        { status: 400 },
      )
    }

    // Check if email already exists
    if (findUserByEmail(email)) {
      return HttpResponse.json(
        {
          error: {
            code: 'EMAIL_EXISTS',
            message: 'Email already registered',
            field: 'email',
          },
        },
        { status: 400 },
      )
    }

    // Check if username already exists
    if (findUserByUsername(username)) {
      return HttpResponse.json(
        {
          error: {
            code: 'USERNAME_EXISTS',
            message: 'Username already taken',
            field: 'username',
          },
        },
        { status: 400 },
      )
    }

    // Create new user
    const newUser: User = {
      id: `user-${mockUsers.length + 1}`,
      email,
      username,
      displayName,
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      bio: '',
      location: '',
      website: '',
      joinedAt: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0,
      isVerified: false,
    }

    mockUsers.push(newUser)
    currentUser = newUser
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

    const response: AuthResponse = { user: newUser, token }
    return HttpResponse.json(response, { status: 201 })
  }),

  /**
   * POST /api/auth/logout
   * Log out the current user.
   */
  http.post('/api/auth/logout', async () => {
    await delay(200)
    currentUser = null
    return HttpResponse.json({ success: true })
  }),

  /**
   * GET /api/auth/me
   * Get current authenticated user.
   */
  http.get('/api/auth/me', async () => {
    await delay(300)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 },
      )
    }

    return HttpResponse.json({ user: currentUser })
  }),
]

// ════════════════════════════════════════════════════════════
// Tweet Handlers
// ════════════════════════════════════════════════════════════

const tweetHandlers = [
  /**
   * GET /api/tweets
   * Get paginated feed of tweets.
   */
  http.get('/api/tweets', async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const type = url.searchParams.get('type') || 'home'
    const userId = url.searchParams.get('userId')

    let filteredTweets = [...tweets]

    // Filter by type
    if (type === 'user' && userId) {
      filteredTweets = filteredTweets.filter((t) => t.author.id === userId)
    } else if (type === 'likes' && currentUser) {
      filteredTweets = filteredTweets.filter((t) => t.isLiked)
    } else if (type === 'bookmarks' && currentUser) {
      filteredTweets = filteredTweets.filter((t) => t.isBookmarked)
    }

    // Sort by creation date (newest first)
    filteredTweets.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    // Apply cursor-based pagination
    let startIndex = 0
    if (cursor) {
      const cursorIndex = filteredTweets.findIndex((t) => t.id === cursor)
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1
      }
    }

    const paginatedTweets = filteredTweets.slice(startIndex, startIndex + limit)
    const hasMore = startIndex + limit < filteredTweets.length
    const nextCursor = hasMore
      ? paginatedTweets[paginatedTweets.length - 1]?.id
      : null

    const response: FeedResponse = {
      tweets: paginatedTweets,
      nextCursor,
      hasMore,
    }

    return HttpResponse.json(response)
  }),

  /**
   * GET /api/tweets/:id
   * Get a single tweet by ID.
   */
  http.get('/api/tweets/:id', async ({ params }) => {
    await delay(300)

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    return HttpResponse.json({ tweet })
  }),

  /**
   * POST /api/tweets
   * Create a new tweet.
   */
  http.post('/api/tweets', async ({ request }) => {
    await delay(500)

    if (!currentUser) {
      return HttpResponse.json(
        {
          error: {
            code: 'UNAUTHORIZED',
            message: 'Must be logged in to tweet',
          },
        },
        { status: 401 },
      )
    }

    const body = (await request.json()) as CreateTweetData
    const { content, replyToId } = body

    if (!content || content.trim().length === 0) {
      return HttpResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Tweet content is required',
            field: 'content',
          },
        },
        { status: 400 },
      )
    }

    if (content.length > 280) {
      return HttpResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Tweet must be 280 characters or less',
            field: 'content',
          },
        },
        { status: 400 },
      )
    }

    const newTweet: Tweet = {
      id: `tweet-${nextTweetId++}`,
      content: content.trim(),
      author: currentUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likesCount: 0,
      retweetsCount: 0,
      repliesCount: 0,
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false,
      replyToId: replyToId || null,
      media: [],
    }

    tweets.unshift(newTweet)

    // Update parent tweet's reply count
    if (replyToId) {
      const parentTweet = tweets.find((t) => t.id === replyToId)
      if (parentTweet) {
        parentTweet.repliesCount++
      }
    }

    return HttpResponse.json({ tweet: newTweet }, { status: 201 })
  }),

  /**
   * DELETE /api/tweets/:id
   * Delete a tweet.
   */
  http.delete('/api/tweets/:id', async ({ params }) => {
    await delay(300)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweetIndex = tweets.findIndex((t) => t.id === params.id)

    if (tweetIndex === -1) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    const tweet = tweets[tweetIndex]

    if (tweet.author.id !== currentUser.id) {
      return HttpResponse.json(
        {
          error: {
            code: 'FORBIDDEN',
            message: 'Cannot delete another user`s tweet',
          },
        },
        { status: 403 },
      )
    }

    tweets.splice(tweetIndex, 1)

    return HttpResponse.json({ success: true })
  }),

  /**
   * POST /api/tweets/:id/like
   * Like a tweet.
   */
  http.post('/api/tweets/:id/like', async ({ params }) => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    if (!tweet.isLiked) {
      tweet.isLiked = true
      tweet.likesCount++
    }

    return HttpResponse.json({ tweet })
  }),

  /**
   * DELETE /api/tweets/:id/like
   * Unlike a tweet.
   */
  http.delete('/api/tweets/:id/like', async ({ params }) => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    if (tweet.isLiked) {
      tweet.isLiked = false
      tweet.likesCount = Math.max(0, tweet.likesCount - 1)
    }

    return HttpResponse.json({ tweet })
  }),

  /**
   * POST /api/tweets/:id/retweet
   * Retweet a tweet.
   */
  http.post('/api/tweets/:id/retweet', async ({ params }) => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    if (!tweet.isRetweeted) {
      tweet.isRetweeted = true
      tweet.retweetsCount++
    }

    return HttpResponse.json({ tweet })
  }),

  /**
   * DELETE /api/tweets/:id/retweet
   * Undo retweet.
   */
  http.delete('/api/tweets/:id/retweet', async ({ params }) => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    if (tweet.isRetweeted) {
      tweet.isRetweeted = false
      tweet.retweetsCount = Math.max(0, tweet.retweetsCount - 1)
    }

    return HttpResponse.json({ tweet })
  }),

  /**
   * POST /api/tweets/:id/bookmark
   * Bookmark a tweet.
   */
  http.post('/api/tweets/:id/bookmark', async ({ params }) => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    tweet.isBookmarked = true

    return HttpResponse.json({ tweet })
  }),

  /**
   * DELETE /api/tweets/:id/bookmark
   * Remove bookmark.
   */
  http.delete('/api/tweets/:id/bookmark', async ({ params }) => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const tweet = tweets.find((t) => t.id === params.id)

    if (!tweet) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Tweet not found' } },
        { status: 404 },
      )
    }

    tweet.isBookmarked = false

    return HttpResponse.json({ tweet })
  }),
]

// ════════════════════════════════════════════════════════════
// User Handlers
// ════════════════════════════════════════════════════════════

const userHandlers = [
  /**
   * GET /api/users/:username
   * Get user profile by username.
   */
  http.get('/api/users/:username', async ({ params }) => {
    await delay(300)

    const user = findUserByUsername(params.username as string)

    if (!user) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 },
      )
    }

    // Check if current user is following this user
    const isFollowingUser = currentUser
      ? isFollowing(currentUser.id, user.id)
      : false

    return HttpResponse.json({ user, isFollowing: isFollowingUser })
  }),

  /**
   * GET /api/users/:username/tweets
   * Get tweets by a specific user.
   */
  http.get('/api/users/:username/tweets', async ({ params, request }) => {
    await delay(400)

    const user = findUserByUsername(params.username as string)

    if (!user) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 },
      )
    }

    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)

    const userTweets = tweets.filter((t) => t.author.id === user.id)
    userTweets.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    let startIndex = 0
    if (cursor) {
      const cursorIndex = userTweets.findIndex((t) => t.id === cursor)
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1
      }
    }

    const paginatedTweets = userTweets.slice(startIndex, startIndex + limit)
    const hasMore = startIndex + limit < userTweets.length
    const nextCursor = hasMore
      ? paginatedTweets[paginatedTweets.length - 1]?.id
      : null

    const response: FeedResponse = {
      tweets: paginatedTweets,
      nextCursor,
      hasMore,
    }

    return HttpResponse.json(response)
  }),

  /**
   * POST /api/users/:username/follow
   * Follow a user.
   */
  http.post('/api/users/:username/follow', async ({ params }) => {
    await delay(300)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const userToFollow = findUserByUsername(params.username as string)

    if (!userToFollow) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 },
      )
    }

    if (userToFollow.id === currentUser.id) {
      return HttpResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Cannot follow yourself' } },
        { status: 400 },
      )
    }

    // Check if already following
    if (!isFollowing(currentUser.id, userToFollow.id)) {
      followRelations.push({
        followerId: currentUser.id,
        followingId: userToFollow.id,
      })
      userToFollow.followersCount++
      currentUser.followingCount++
    }

    return HttpResponse.json({ user: userToFollow, isFollowing: true })
  }),

  /**
   * DELETE /api/users/:username/follow
   * Unfollow a user.
   */
  http.delete('/api/users/:username/follow', async ({ params }) => {
    await delay(300)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const userToUnfollow = findUserByUsername(params.username as string)

    if (!userToUnfollow) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 },
      )
    }

    // Remove follow relation
    const relationIndex = followRelations.findIndex(
      (r) =>
        r.followerId === currentUser!.id && r.followingId === userToUnfollow.id,
    )

    if (relationIndex !== -1) {
      followRelations.splice(relationIndex, 1)
      userToUnfollow.followersCount = Math.max(
        0,
        userToUnfollow.followersCount - 1,
      )
      currentUser.followingCount = Math.max(0, currentUser.followingCount - 1)
    }

    return HttpResponse.json({ user: userToUnfollow, isFollowing: false })
  }),

  /**
   * GET /api/users/:username/followers
   * Get followers of a user.
   */
  http.get('/api/users/:username/followers', async ({ params, request }) => {
    await delay(400)

    const user = findUserByUsername(params.username as string)

    if (!user) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 },
      )
    }

    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '20', 10)

    const followerIds = followRelations
      .filter((r) => r.followingId === user.id)
      .map((r) => r.followerId)

    const followers = followerIds
      .map((id) => findUserById(id))
      .filter(Boolean) as User[]

    return HttpResponse.json({
      users: followers.slice(0, limit),
      hasMore: followers.length > limit,
      nextCursor: null,
    })
  }),

  /**
   * GET /api/users/:username/following
   * Get users that a user is following.
   */
  http.get('/api/users/:username/following', async ({ params, request }) => {
    await delay(400)

    const user = findUserByUsername(params.username as string)

    if (!user) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 },
      )
    }

    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '20', 10)

    const followingIds = followRelations
      .filter((r) => r.followerId === user.id)
      .map((r) => r.followingId)

    const following = followingIds
      .map((id) => findUserById(id))
      .filter(Boolean) as User[]

    return HttpResponse.json({
      users: following.slice(0, limit),
      hasMore: following.length > limit,
      nextCursor: null,
    })
  }),
]

// ════════════════════════════════════════════════════════════
// Notification Handlers
// ════════════════════════════════════════════════════════════

const notificationHandlers = [
  /**
   * GET /api/notifications
   * Get user notifications.
   */
  http.get('/api/notifications', async ({ request }) => {
    await delay(300)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '20', 10)

    const unreadCount = notifications.filter((n) => !n.isRead).length

    return HttpResponse.json({
      notifications: notifications.slice(0, limit),
      unreadCount,
      hasMore: notifications.length > limit,
      nextCursor: null,
    })
  }),

  /**
   * POST /api/notifications/read-all
   * Mark all notifications as read.
   */
  http.post('/api/notifications/read-all', async () => {
    await delay(200)

    if (!currentUser) {
      return HttpResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 },
      )
    }

    notifications = notifications.map((n) => ({ ...n, isRead: true }))

    return HttpResponse.json({ success: true })
  }),
]

// ════════════════════════════════════════════════════════════
// Export All Handlers
// ════════════════════════════════════════════════════════════

/**
 * All MSW handlers for the Twitter Clone API.
 * Use with msw-storybook-addon's parameters.msw.handlers
 */
export const handlers = [
  ...authHandlers,
  ...tweetHandlers,
  ...userHandlers,
  ...notificationHandlers,
]

/**
 * Reset all mock data to initial state.
 * Useful for test cleanup.
 */
export const resetMockData = (): void => {
  tweets = [...mockTweets]
  followRelations = [...mockFollowRelations]
  notifications = [...mockNotifications]
  nextTweetId = mockTweets.length + 1
  currentUser = null
}

/**
 * Set current user for testing authenticated scenarios.
 * Also updates the TanStack Store's auth state for React components.
 */
export const setCurrentUser = (user: User | null): void => {
  currentUser = user
  // Also update the TanStack Store's auth state
  if (user) {
    setAuthUser(user, 'mock-token')
  } else {
    clearAuth()
  }
}
