/**
 * TanStack Query client configuration.
 * Centralized query client with default options.
 */

import { QueryClient } from '@tanstack/react-query'

/**
 * Default stale time for queries (5 minutes).
 * Data is considered fresh for this duration.
 */
const DEFAULT_STALE_TIME = 1000 * 60 * 5

/**
 * Default garbage collection time (30 minutes).
 * Inactive queries are removed after this duration.
 */
const DEFAULT_GC_TIME = 1000 * 60 * 30

/**
 * Create a configured QueryClient instance.
 * Used by the main App component to provide query context.
 *
 * @example
 * ```tsx
 * const queryClient = createQueryClient()
 *
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       <YourApp />
 *     </QueryClientProvider>
 *   )
 * }
 * ```
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_GC_TIME,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors
          if (error instanceof Error && 'status' in error) {
            const status = (error as { status: number }).status
            if (status >= 400 && status < 500) {
              return false
            }
          }
          return failureCount < 2
        },
      },
      mutations: {
        retry: false,
      },
    },
  })
}

/**
 * Query keys factory for consistent key management.
 * Enables proper cache invalidation and organization.
 */
export const queryKeys = {
  /** Auth-related queries */
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  /** Tweet-related queries */
  tweets: {
    all: ['tweets'] as const,
    lists: () => [...queryKeys.tweets.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.tweets.lists(), filters] as const,
    details: () => [...queryKeys.tweets.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tweets.details(), id] as const,
  },

  /** User-related queries */
  users: {
    all: ['users'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (username: string) =>
      [...queryKeys.users.details(), username] as const,
    tweets: (username: string) =>
      [...queryKeys.users.detail(username), 'tweets'] as const,
    followers: (username: string) =>
      [...queryKeys.users.detail(username), 'followers'] as const,
    following: (username: string) =>
      [...queryKeys.users.detail(username), 'following'] as const,
  },

  /** Notification-related queries */
  notifications: {
    all: ['notifications'] as const,
    list: () => [...queryKeys.notifications.all, 'list'] as const,
  },
} as const
