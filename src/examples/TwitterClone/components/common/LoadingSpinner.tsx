/**
 * Loading spinner component for async state indicators.
 */

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export interface LoadingSpinnerProps {
  /** Optional message to display below spinner */
  message?: string
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large'
  /** Whether to center in full viewport */
  fullScreen?: boolean
}

const sizeMap = {
  small: 24,
  medium: 40,
  large: 56,
}

/**
 * A centered loading spinner with optional message.
 * Use for loading states throughout the application.
 *
 * @example
 * ```tsx
 * if (isLoading) {
 *   return <LoadingSpinner message="Loading tweets..." />
 * }
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'medium',
  fullScreen = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 4,
        ...(fullScreen && {
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.default',
          zIndex: 9999,
        }),
      }}
    >
      <CircularProgress size={sizeMap[size]} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  )
}
