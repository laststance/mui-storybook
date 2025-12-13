/**
 * Authentication store using TanStack Store.
 * Manages user authentication state across the application.
 */

import { Store } from '@tanstack/react-store'

import type { User } from '../types'

// ════════════════════════════════════════════════════════════
// Auth State Types
// ════════════════════════════════════════════════════════════

/**
 * Authentication state shape.
 */
export interface AuthState {
  /** Currently authenticated user, null if not logged in */
  user: User | null
  /** JWT token for API authentication */
  token: string | null
  /** Whether an auth operation is in progress */
  isLoading: boolean
  /** Whether the user is authenticated */
  isAuthenticated: boolean
  /** Error message from last auth operation */
  error: string | null
}

// ════════════════════════════════════════════════════════════
// Initial State
// ════════════════════════════════════════════════════════════

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
}

// ════════════════════════════════════════════════════════════
// Auth Store
// ════════════════════════════════════════════════════════════

/**
 * Global authentication store instance.
 * Use with useStore hook for reactive state access.
 *
 * @example
 * ```tsx
 * const user = useStore(authStore, (state) => state.user)
 * const isAuthenticated = useStore(authStore, (state) => state.isAuthenticated)
 * ```
 */
export const authStore = new Store<AuthState>(initialAuthState)

// ════════════════════════════════════════════════════════════
// Auth Actions
// ════════════════════════════════════════════════════════════

/**
 * Set loading state for auth operations.
 */
export const setAuthLoading = (isLoading: boolean): void => {
  authStore.setState((state) => ({
    ...state,
    isLoading,
    error: isLoading ? null : state.error,
  }))
}

/**
 * Set authenticated user after successful login/registration.
 */
export const setAuthUser = (user: User, token: string): void => {
  authStore.setState((state) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  }))
}

/**
 * Set authentication error.
 */
export const setAuthError = (error: string): void => {
  authStore.setState((state) => ({
    ...state,
    error,
    isLoading: false,
  }))
}

/**
 * Clear authentication state (logout).
 */
export const clearAuth = (): void => {
  authStore.setState(() => initialAuthState)
}

/**
 * Update user profile information.
 */
export const updateUserProfile = (updates: Partial<User>): void => {
  authStore.setState((state) => ({
    ...state,
    user: state.user ? { ...state.user, ...updates } : null,
  }))
}

// ════════════════════════════════════════════════════════════
// Selectors
// ════════════════════════════════════════════════════════════

/**
 * Select the current user from auth state.
 */
export const selectUser = (state: AuthState): User | null => state.user

/**
 * Select authentication status.
 */
export const selectIsAuthenticated = (state: AuthState): boolean =>
  state.isAuthenticated

/**
 * Select loading status.
 */
export const selectIsLoading = (state: AuthState): boolean => state.isLoading

/**
 * Select error message.
 */
export const selectError = (state: AuthState): string | null => state.error

/**
 * Select auth token.
 */
export const selectToken = (state: AuthState): string | null => state.token
