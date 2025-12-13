/**
 * Main App component for the Twitter Clone application.
 * Sets up providers and router for the entire application.
 */

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { useMemo } from 'react'

import { ToastProvider } from './components/common/ToastProvider'
import { createQueryClient } from './lib/queryClient'
import { createAppRouter } from './router'

/**
 * Twitter Clone application root component.
 * This component sets up all necessary providers:
 * - QueryClientProvider: TanStack Query for server state
 * - RouterProvider: TanStack Router for navigation
 * - ToastProvider: Snackbar notifications
 *
 * @example
 * ```tsx
 * // In a Storybook story
 * export const Default: Story = {
 *   render: () => <App />,
 * }
 * ```
 */
export const App: React.FC = () => {
  // Create stable instances of query client and router
  const queryClient = useMemo(() => createQueryClient(), [])
  const router = useMemo(() => createAppRouter(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastProvider />
    </QueryClientProvider>
  )
}

export default App
