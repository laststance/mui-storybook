/**
 * Modal for composing tweets and replies.
 */

import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { useStore } from '@tanstack/react-store'

import { closeModal, selectModal, uiStore } from '../../stores/uiStore'

import { ComposeTweet } from './ComposeTweet'

/**
 * Modal dialog for composing new tweets or replies.
 * State is managed via the UI store.
 */
export const ComposeModal: React.FC = () => {
  const modal = useStore(uiStore, selectModal)
  const isOpen =
    modal.isOpen && (modal.type === 'compose' || modal.type === 'reply')

  const handleClose = () => {
    closeModal()
  }

  const title = modal.type === 'reply' ? 'Reply' : 'Compose'
  const placeholder =
    modal.type === 'reply' ? 'Post your reply' : "What's happening?"

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          position: 'absolute',
          top: 50,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          p: 1,
        }}
      >
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ mr: 2 }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <ComposeTweet
          placeholder={placeholder}
          replyToId={modal.tweetId}
          onSuccess={handleClose}
          showAvatar
          compact={false}
        />
      </DialogContent>
    </Dialog>
  )
}
