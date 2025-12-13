/**
 * Toast notification provider using MUI Snackbar.
 * Displays toast notifications from the UI store.
 */

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useStore } from '@tanstack/react-store'

import { dismissToast, selectToasts, uiStore } from '../../stores/uiStore'

import type { Toast } from '../../types'

/**
 * Single toast item component.
 */
const ToastItem: React.FC<{ toast: Toast; index: number }> = ({
  toast,
  index,
}) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dismissToast(toast.id)
  }

  return (
    <Snackbar
      key={toast.id}
      open
      autoHideDuration={toast.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        // Stack multiple toasts
        bottom: `${24 + index * 60}px !important`,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        variant="filled"
        sx={{ width: '100%', minWidth: 280 }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  )
}

/**
 * Provider component that renders all active toast notifications.
 * Place at the root of your application.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <ToastProvider />
 *     </>
 *   )
 * }
 * ```
 */
export const ToastProvider: React.FC = () => {
  const toasts = useStore(uiStore, selectToasts)

  // Only show the latest 3 toasts to avoid overwhelming the UI
  const visibleToasts = toasts.slice(-3)

  return (
    <>
      {visibleToasts.map((toast, index) => (
        <ToastItem key={toast.id} toast={toast} index={index} />
      ))}
    </>
  )
}
