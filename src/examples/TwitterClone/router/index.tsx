/**
 * TanStack Router configuration for the Twitter Clone.
 * Defines all routes and navigation logic.
 */

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { useState } from 'react'

import { useCurrentUser, useIsAuthenticated } from '../auth'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'
import { MainLayout } from '../components/layout/MainLayout'
import { NotificationList } from '../components/notifications/NotificationList'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ComposeModal } from '../components/tweet/ComposeModal'
import { ComposeTweet } from '../components/tweet/ComposeTweet'
import { Feed } from '../components/tweet/Feed'

// ════════════════════════════════════════════════════════════
// Root Route
// ════════════════════════════════════════════════════════════

const rootRoute = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return <Outlet />
}

// ════════════════════════════════════════════════════════════
// Auth Routes
// ════════════════════════════════════════════════════════════

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
})

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      {isLogin ? (
        <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </Box>
  )
}

// ════════════════════════════════════════════════════════════
// Home Route
// ════════════════════════════════════════════════════════════

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
  component: HomePage,
})

function HomePage() {
  const isAuthenticated = useIsAuthenticated()
  const [activeRoute, setActiveRoute] = useState('/home')

  // Navigation handler that updates state instead of actual navigation
  const handleNavigate = (path: string) => {
    setActiveRoute(path)
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <MainLayout activeRoute={activeRoute} onNavigate={handleNavigate}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          p: 2,
          zIndex: 10,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Home
        </Typography>
      </Box>
      <ComposeTweet />
      <Feed
        type="home"
        onProfileClick={(username) => handleNavigate(`/profile/${username}`)}
      />
      <ComposeModal />
    </MainLayout>
  )
}

// ════════════════════════════════════════════════════════════
// Notifications Route
// ════════════════════════════════════════════════════════════

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notifications',
  component: NotificationsPage,
})

function NotificationsPage() {
  const isAuthenticated = useIsAuthenticated()
  const [activeRoute, setActiveRoute] = useState('/notifications')

  const handleNavigate = (path: string) => {
    setActiveRoute(path)
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <MainLayout activeRoute={activeRoute} onNavigate={handleNavigate}>
      <NotificationList
        onProfileClick={(username) => handleNavigate(`/profile/${username}`)}
      />
      <ComposeModal />
    </MainLayout>
  )
}

// ════════════════════════════════════════════════════════════
// Bookmarks Route
// ════════════════════════════════════════════════════════════

const bookmarksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bookmarks',
  component: BookmarksPage,
})

function BookmarksPage() {
  const isAuthenticated = useIsAuthenticated()
  const user = useCurrentUser()
  const [activeRoute, setActiveRoute] = useState('/bookmarks')

  const handleNavigate = (path: string) => {
    setActiveRoute(path)
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <MainLayout activeRoute={activeRoute} onNavigate={handleNavigate}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          p: 2,
          zIndex: 10,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Bookmarks
        </Typography>
        <Typography variant="caption" color="text.secondary">
          @{user?.username}
        </Typography>
      </Box>
      <Feed
        type="bookmarks"
        onProfileClick={(username) => handleNavigate(`/profile/${username}`)}
        emptyMessage="You haven't added any tweets to your Bookmarks yet"
      />
      <ComposeModal />
    </MainLayout>
  )
}

// ════════════════════════════════════════════════════════════
// Profile Route
// ════════════════════════════════════════════════════════════

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile/$username',
  component: ProfilePage,
})

function ProfilePage() {
  const isAuthenticated = useIsAuthenticated()
  const { username } = profileRoute.useParams()
  const [activeRoute, setActiveRoute] = useState(`/profile/${username}`)

  const handleNavigate = (path: string) => {
    setActiveRoute(path)
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <MainLayout activeRoute={activeRoute} onNavigate={handleNavigate}>
      <ProfileHeader
        username={username}
        onBack={() => handleNavigate('/home')}
      />
      <Feed
        type="user"
        userId={username}
        onProfileClick={(username) => handleNavigate(`/profile/${username}`)}
        emptyMessage="No tweets yet"
      />
      <ComposeModal />
    </MainLayout>
  )
}

// ════════════════════════════════════════════════════════════
// Index Route (Redirect to home or auth)
// ════════════════════════════════════════════════════════════

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

function IndexPage() {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <HomePage />
  }

  return <AuthPage />
}

// ════════════════════════════════════════════════════════════
// Route Tree & Router
// ════════════════════════════════════════════════════════════

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  homeRoute,
  notificationsRoute,
  bookmarksRoute,
  profileRoute,
])

/**
 * Create a router instance with memory history.
 * Uses memory history to work correctly in Storybook iframe environment.
 * Should be called once per app instance.
 */
export const createAppRouter = () => {
  // Use memory history for Storybook compatibility
  // This ensures the router works in iframes and isolated environments
  const memoryHistory = createMemoryHistory({
    initialEntries: ['/'],
  })

  return createRouter({
    routeTree,
    history: memoryHistory,
    defaultPreload: 'intent',
  })
}

// Type for the router
export type AppRouter = ReturnType<typeof createAppRouter>

// Register router types for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter
  }
}
