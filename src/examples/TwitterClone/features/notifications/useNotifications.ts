/**
 * Notification hooks using TanStack Query.
 * Provides notification list and mark-as-read functionality.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import * as api from '../../lib/api'
import { queryKeys } from '../../lib/queryClient'
import { showToast } from '../../stores/uiStore'

// ════════════════════════════════════════════════════════════
// Notification Query Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook to fetch user notifications.
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useNotifications()
 *
 * if (data) {
 *   const { notifications, unreadCount } = data
 * }
 * ```
 */
export const useNotifications = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(),
    queryFn: () => api.getNotifications(),
    enabled,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

// ════════════════════════════════════════════════════════════
// Notification Mutation Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook to mark all notifications as read.
 */
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.markAllNotificationsRead,
    onSuccess: () => {
      // Update cache to reflect read state
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.list(),
      })
      showToast('All notifications marked as read', 'success')
    },
    onError: () => {
      showToast('Failed to mark notifications as read', 'error')
    },
  })
}
