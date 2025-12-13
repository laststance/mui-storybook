/**
 * Authentication hooks using TanStack Query.
 * Provides login, register, logout, and session management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'

import * as api from '../lib/api'
import { queryKeys } from '../lib/queryClient'
import {
  authStore,
  clearAuth,
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
  setAuthError,
  setAuthLoading,
  setAuthUser,
} from '../stores/authStore'
import { showToast } from '../stores/uiStore'

import type { LoginCredentials, RegisterData, User } from '../types'

// ════════════════════════════════════════════════════════════
// Auth State Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook to access the current authenticated user.
 */
export const useCurrentUser = (): User | null => {
  return useStore(authStore, selectUser)
}

/**
 * Hook to check if user is authenticated.
 */
export const useIsAuthenticated = (): boolean => {
  return useStore(authStore, selectIsAuthenticated)
}

/**
 * Hook to check if auth is loading.
 */
export const useIsAuthLoading = (): boolean => {
  return useStore(authStore, selectIsLoading)
}

// ════════════════════════════════════════════════════════════
// Auth Query Hooks
// ════════════════════════════════════════════════════════════

/**
 * Query hook to fetch and sync current user session.
 * Useful for rehydrating auth state on app load.
 */
export const useSessionQuery = () => {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      setAuthLoading(true)
      try {
        const { user } = await api.getCurrentUser()
        setAuthUser(user, 'session-token')
        return user
      } catch {
        clearAuth()
        return null
      }
    },
    staleTime: Infinity,
    retry: false,
  })
}

// ════════════════════════════════════════════════════════════
// Auth Mutation Hooks
// ════════════════════════════════════════════════════════════

/**
 * Hook for user login.
 *
 * @example
 * ```tsx
 * const { mutate: login, isPending } = useLogin()
 *
 * const handleSubmit = (credentials) => {
 *   login(credentials, {
 *     onSuccess: () => navigate('/home'),
 *   })
 * }
 * ```
 */
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => api.login(credentials),
    onMutate: () => {
      setAuthLoading(true)
    },
    onSuccess: ({ user, token }) => {
      setAuthUser(user, token)
      queryClient.setQueryData(queryKeys.auth.me(), user)
      showToast(`Welcome back, ${user.displayName}!`, 'success')
    },
    onError: (error) => {
      const message =
        error instanceof api.ApiError ? error.message : 'Login failed'
      setAuthError(message)
      showToast(message, 'error')
    },
  })
}

/**
 * Hook for user registration.
 *
 * @example
 * ```tsx
 * const { mutate: register, isPending } = useRegister()
 *
 * const handleSubmit = (data) => {
 *   register(data, {
 *     onSuccess: () => navigate('/home'),
 *   })
 * }
 * ```
 */
export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => api.register(data),
    onMutate: () => {
      setAuthLoading(true)
    },
    onSuccess: ({ user, token }) => {
      setAuthUser(user, token)
      queryClient.setQueryData(queryKeys.auth.me(), user)
      showToast(`Welcome to Twitter Clone, ${user.displayName}!`, 'success')
    },
    onError: (error) => {
      const message =
        error instanceof api.ApiError ? error.message : 'Registration failed'
      setAuthError(message)
      showToast(message, 'error')
    },
  })
}

/**
 * Hook for user logout.
 *
 * @example
 * ```tsx
 * const { mutate: logout } = useLogout()
 *
 * const handleLogout = () => {
 *   logout(undefined, {
 *     onSuccess: () => navigate('/login'),
 *   })
 * }
 * ```
 */
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => {
      clearAuth()
      // Clear all cached data
      queryClient.clear()
      showToast('You have been logged out', 'info')
    },
    onError: () => {
      // Force logout even if API call fails
      clearAuth()
      queryClient.clear()
    },
  })
}
