/**
 * Compose tweet component for creating new tweets.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm, useWatch } from 'react-hook-form'

import { tweetSchema } from '../../auth/schemas'
import { useCurrentUser } from '../../auth/useAuth'
import { useCreateTweet } from '../../features/feed/useFeed'

import type { TweetFormData } from '../../auth/schemas'

export interface ComposeTweetProps {
  /** Placeholder text */
  placeholder?: string
  /** Tweet ID if replying */
  replyToId?: string
  /** Callback after successful post */
  onSuccess?: () => void
  /** Whether to show avatar */
  showAvatar?: boolean
  /** Compact variant for inline use */
  compact?: boolean
}

const MAX_CHARS = 280

/**
 * Character count indicator with color coding.
 */
const CharacterCount: React.FC<{ count: number; max: number }> = ({
  count,
  max,
}) => {
  const remaining = max - count
  const percentage = (count / max) * 100

  let color = 'text.secondary'
  if (remaining <= 0) color = 'error.main'
  else if (remaining <= 20) color = 'warning.main'

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {count > 0 && (
        <>
          <Box sx={{ position: 'relative', width: 20, height: 20 }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={20}
              sx={{ color: 'divider', position: 'absolute' }}
            />
            <CircularProgress
              variant="determinate"
              value={Math.min(percentage, 100)}
              size={20}
              sx={{
                color:
                  remaining <= 0
                    ? 'error.main'
                    : remaining <= 20
                      ? 'warning.main'
                      : 'primary.main',
                position: 'absolute',
              }}
            />
          </Box>
          {remaining <= 20 && (
            <Typography variant="caption" sx={{ color }}>
              {remaining}
            </Typography>
          )}
        </>
      )}
    </Box>
  )
}

/**
 * Tweet composition form with character limit and validation.
 */
export const ComposeTweet: React.FC<ComposeTweetProps> = ({
  placeholder = "What's happening?",
  replyToId,
  onSuccess,
  showAvatar = true,
  compact = false,
}) => {
  const user = useCurrentUser()
  const { mutate: createTweet, isPending } = useCreateTweet()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<TweetFormData>({
    resolver: zodResolver(tweetSchema),
    defaultValues: { content: '' },
    mode: 'onChange',
  })

  const content = useWatch({ control, name: 'content' })
  const charCount = content?.length || 0

  const onSubmit = (data: TweetFormData) => {
    createTweet(
      {
        content: data.content,
        replyToId,
      },
      {
        onSuccess: () => {
          reset()
          onSuccess?.()
        },
      },
    )
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        gap: 1.5,
        p: compact ? 1 : 2,
        borderBottom: compact ? 0 : 1,
        borderColor: 'divider',
      }}
    >
      {showAvatar && user && (
        <Avatar
          src={user.avatar}
          alt={user.displayName}
          sx={{ width: 48, height: 48 }}
        >
          {user.displayName[0]}
        </Avatar>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          {...register('content')}
          placeholder={placeholder}
          multiline
          minRows={compact ? 1 : 2}
          maxRows={10}
          variant="standard"
          fullWidth
          disabled={isPending}
          error={!!errors.content}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: compact ? '1rem' : '1.25rem',
              lineHeight: 1.5,
            },
          }}
          sx={{
            '& .MuiInputBase-root': {
              p: 0,
            },
          }}
        />

        {errors.content && (
          <Typography variant="caption" color="error">
            {errors.content.message}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Box>{/* Placeholder for media buttons */}</Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CharacterCount count={charCount} max={MAX_CHARS} />
            <Button
              type="submit"
              variant="contained"
              disabled={
                isPending ||
                !isValid ||
                charCount === 0 ||
                charCount > MAX_CHARS
              }
              sx={{
                borderRadius: 9999,
                fontWeight: 'bold',
                px: 3,
              }}
            >
              {isPending ? 'Posting...' : replyToId ? 'Reply' : 'Post'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
