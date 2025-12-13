/**
 * Mock data for the Twitter Clone application.
 * Used by MSW handlers to simulate API responses.
 */

import type { Notification, Tweet, User } from '../types'

// ════════════════════════════════════════════════════════════
// Mock Users
// ════════════════════════════════════════════════════════════

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=johndoe',
    bio: 'Software engineer passionate about React and TypeScript. Building cool stuff at @TechCorp',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    joinedAt: '2020-03-15T10:30:00Z',
    followersCount: 1234,
    followingCount: 567,
    isVerified: true,
  },
  {
    id: 'user-2',
    email: 'jane@example.com',
    username: 'janesmith',
    displayName: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?u=janesmith',
    bio: 'Product designer | UX enthusiast | Coffee lover',
    location: 'New York, NY',
    website: 'https://janesmith.design',
    joinedAt: '2019-08-20T14:15:00Z',
    followersCount: 8765,
    followingCount: 432,
    isVerified: true,
  },
  {
    id: 'user-3',
    email: 'bob@example.com',
    username: 'bobwilson',
    displayName: 'Bob Wilson',
    avatar: 'https://i.pravatar.cc/150?u=bobwilson',
    bio: 'Full-stack developer | Open source contributor',
    location: 'Austin, TX',
    website: '',
    joinedAt: '2021-01-10T09:00:00Z',
    followersCount: 456,
    followingCount: 234,
    isVerified: false,
  },
  {
    id: 'user-4',
    email: 'alice@example.com',
    username: 'alicejohnson',
    displayName: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?u=alicejohnson',
    bio: 'Tech writer | Documentation enthusiast | Always learning',
    location: 'Seattle, WA',
    website: 'https://alicewrites.io',
    joinedAt: '2020-11-05T16:45:00Z',
    followersCount: 2345,
    followingCount: 876,
    isVerified: false,
  },
  {
    id: 'user-5',
    email: 'mike@example.com',
    username: 'mikedev',
    displayName: 'Mike Developer',
    avatar: 'https://i.pravatar.cc/150?u=mikedev',
    bio: 'DevOps engineer | Cloud architect | Kubernetes fan',
    location: 'Denver, CO',
    website: '',
    joinedAt: '2021-06-22T11:30:00Z',
    followersCount: 987,
    followingCount: 543,
    isVerified: false,
  },
]

// ════════════════════════════════════════════════════════════
// Mock Tweets
// ════════════════════════════════════════════════════════════

export const mockTweets: Tweet[] = [
  {
    id: 'tweet-1',
    content:
      'Just shipped a new feature using React Server Components! The performance improvements are incredible. The future of web development is here.',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    likesCount: 42,
    retweetsCount: 12,
    repliesCount: 5,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-2',
    content:
      'Design tip of the day: Always test your designs with real users, not just colleagues. You`ll be surprised by what you learn!',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likesCount: 128,
    retweetsCount: 45,
    repliesCount: 23,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-3',
    content:
      'Working on a new open source project! Stay tuned for the announcement. It`s going to make developer lives so much easier.',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    likesCount: 89,
    retweetsCount: 34,
    repliesCount: 12,
    isLiked: false,
    isRetweeted: true,
    isBookmarked: false,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-4',
    content:
      'Just finished writing documentation for our API. Remember folks: good docs = happy developers = successful product!',
    author: mockUsers[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likesCount: 67,
    retweetsCount: 21,
    repliesCount: 8,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: false,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-5',
    content:
      'Deployed our microservices to Kubernetes today. The auto-scaling capabilities are amazing! Handled 10x traffic with no issues.',
    author: mockUsers[4],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likesCount: 156,
    retweetsCount: 67,
    repliesCount: 31,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: true,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-6',
    content:
      'Thread: 10 things I wish I knew when starting my software engineering career. Let`s dive in... 1. It`s okay to not know everything.',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likesCount: 523,
    retweetsCount: 234,
    repliesCount: 89,
    isLiked: true,
    isRetweeted: true,
    isBookmarked: true,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-7',
    content:
      'The new Figma features are game-changing! Auto-layout updates make responsive design so much easier. Time to update my workflow.',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likesCount: 234,
    retweetsCount: 78,
    repliesCount: 45,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false,
    replyToId: null,
    media: [],
  },
  {
    id: 'tweet-8',
    content: 'Coffee count today: 4. Bugs fixed: 7. Correlation? Definitely.',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    likesCount: 312,
    retweetsCount: 89,
    repliesCount: 56,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: false,
    replyToId: null,
    media: [],
  },
]

// ════════════════════════════════════════════════════════════
// Mock Notifications
// ════════════════════════════════════════════════════════════

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    actor: mockUsers[1],
    tweet: mockTweets[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'retweet',
    actor: mockUsers[2],
    tweet: mockTweets[0],
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'follow',
    actor: mockUsers[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'reply',
    actor: mockUsers[4],
    tweet: mockTweets[5],
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    isRead: true,
  },
  {
    id: 'notif-5',
    type: 'mention',
    actor: mockUsers[1],
    tweet: mockTweets[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: true,
  },
]

// ════════════════════════════════════════════════════════════
// Mock Follow Relations
// ════════════════════════════════════════════════════════════

export const mockFollowRelations = [
  { followerId: 'user-1', followingId: 'user-2' },
  { followerId: 'user-1', followingId: 'user-3' },
  { followerId: 'user-2', followingId: 'user-1' },
  { followerId: 'user-3', followingId: 'user-1' },
  { followerId: 'user-3', followingId: 'user-2' },
  { followerId: 'user-4', followingId: 'user-1' },
  { followerId: 'user-4', followingId: 'user-2' },
  { followerId: 'user-5', followingId: 'user-1' },
]

// ════════════════════════════════════════════════════════════
// Helper Functions
// ════════════════════════════════════════════════════════════

/**
 * Find a user by their username.
 */
export const findUserByUsername = (username: string): User | undefined => {
  return mockUsers.find((user) => user.username === username)
}

/**
 * Find a user by their email.
 */
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email)
}

/**
 * Find a user by their ID.
 */
export const findUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id)
}

/**
 * Find a tweet by its ID.
 */
export const findTweetById = (id: string): Tweet | undefined => {
  return mockTweets.find((tweet) => tweet.id === id)
}

/**
 * Get tweets by a specific user.
 */
export const getTweetsByUser = (userId: string): Tweet[] => {
  return mockTweets.filter((tweet) => tweet.author.id === userId)
}

/**
 * Check if a user is following another user.
 */
export const isFollowing = (
  followerId: string,
  followingId: string,
): boolean => {
  return mockFollowRelations.some(
    (rel) => rel.followerId === followerId && rel.followingId === followingId,
  )
}
