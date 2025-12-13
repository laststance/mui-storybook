/**
 * UI state store using TanStack Store.
 * Manages application-wide UI state like modals, toasts, and theme.
 */

import { Store } from '@tanstack/react-store'

import type { ModalState, Toast } from '../types'

// ════════════════════════════════════════════════════════════
// UI State Types
// ════════════════════════════════════════════════════════════

/**
 * UI state shape.
 */
export interface UIState {
  /** Active modal state */
  modal: ModalState
  /** Queue of toast notifications */
  toasts: Toast[]
  /** Sidebar collapsed state */
  isSidebarCollapsed: boolean
  /** Current theme mode */
  themeMode: 'light' | 'dark'
}

// ════════════════════════════════════════════════════════════
// Initial State
// ════════════════════════════════════════════════════════════

const initialUIState: UIState = {
  modal: {
    isOpen: false,
    type: null,
  },
  toasts: [],
  isSidebarCollapsed: false,
  themeMode: 'light',
}

// ════════════════════════════════════════════════════════════
// UI Store
// ════════════════════════════════════════════════════════════

/**
 * Global UI state store instance.
 *
 * @example
 * ```tsx
 * const toasts = useStore(uiStore, (state) => state.toasts)
 * const modal = useStore(uiStore, (state) => state.modal)
 * ```
 */
export const uiStore = new Store<UIState>(initialUIState)

// ════════════════════════════════════════════════════════════
// Modal Actions
// ════════════════════════════════════════════════════════════

/**
 * Open a modal with the specified type.
 */
export const openModal = (type: ModalState['type'], tweetId?: string): void => {
  uiStore.setState((state) => ({
    ...state,
    modal: {
      isOpen: true,
      type,
      tweetId,
    },
  }))
}

/**
 * Close the currently open modal.
 */
export const closeModal = (): void => {
  uiStore.setState((state) => ({
    ...state,
    modal: {
      isOpen: false,
      type: null,
      tweetId: undefined,
    },
  }))
}

// ════════════════════════════════════════════════════════════
// Toast Actions
// ════════════════════════════════════════════════════════════

/**
 * Generate a unique ID for toasts.
 */
const generateToastId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Show a toast notification.
 */
export const showToast = (
  message: string,
  severity: Toast['severity'] = 'info',
  duration: number = 5000,
): string => {
  const id = generateToastId()
  const toast: Toast = { id, message, severity, duration }

  uiStore.setState((state) => ({
    ...state,
    toasts: [...state.toasts, toast],
  }))

  // Auto-dismiss toast after duration
  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }

  return id
}

/**
 * Dismiss a specific toast by ID.
 */
export const dismissToast = (id: string): void => {
  uiStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((toast) => toast.id !== id),
  }))
}

/**
 * Clear all toasts.
 */
export const clearAllToasts = (): void => {
  uiStore.setState((state) => ({
    ...state,
    toasts: [],
  }))
}

// ════════════════════════════════════════════════════════════
// Sidebar Actions
// ════════════════════════════════════════════════════════════

/**
 * Toggle sidebar collapsed state.
 */
export const toggleSidebar = (): void => {
  uiStore.setState((state) => ({
    ...state,
    isSidebarCollapsed: !state.isSidebarCollapsed,
  }))
}

/**
 * Set sidebar collapsed state explicitly.
 */
export const setSidebarCollapsed = (isCollapsed: boolean): void => {
  uiStore.setState((state) => ({
    ...state,
    isSidebarCollapsed: isCollapsed,
  }))
}

// ════════════════════════════════════════════════════════════
// Theme Actions
// ════════════════════════════════════════════════════════════

/**
 * Toggle theme mode between light and dark.
 */
export const toggleTheme = (): void => {
  uiStore.setState((state) => ({
    ...state,
    themeMode: state.themeMode === 'light' ? 'dark' : 'light',
  }))
}

/**
 * Set theme mode explicitly.
 */
export const setThemeMode = (mode: 'light' | 'dark'): void => {
  uiStore.setState((state) => ({
    ...state,
    themeMode: mode,
  }))
}

// ════════════════════════════════════════════════════════════
// Selectors
// ════════════════════════════════════════════════════════════

/**
 * Select modal state.
 */
export const selectModal = (state: UIState): ModalState => state.modal

/**
 * Select toasts array.
 */
export const selectToasts = (state: UIState): Toast[] => state.toasts

/**
 * Select sidebar collapsed state.
 */
export const selectIsSidebarCollapsed = (state: UIState): boolean =>
  state.isSidebarCollapsed

/**
 * Select current theme mode.
 */
export const selectThemeMode = (state: UIState): 'light' | 'dark' =>
  state.themeMode
