/**
 * Notification list component.
 */

import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import RepeatIcon from '@mui/icons-material/Repeat'
import ReplyIcon from '@mui/icons-material/Reply'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import {
  useMarkAllNotificationsRead,
  useNotifications,
} from '../../features/notifications/useNotifications'
import { LoadingSpinner } from '../common/LoadingSpinner'

import type { Notification, NotificationType } from '../../types'

export interface NotificationListProps {
  /** Handler for navigating to profile */
  onProfileClick?: (username: string) => void
  /** Handler for navigating to tweet */
  onTweetClick?: (tweetId: string) => void
}

/**
 * Get icon for notification type.
 */
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return <FavoriteIcon sx={{ color: 'error.main' }} />
    case 'retweet':
      return <RepeatIcon sx={{ color: 'success.main' }} />
    case 'reply':
    case 'mention':
      return <ReplyIcon sx={{ color: 'primary.main' }} />
    case 'follow':
      return <PersonAddIcon sx={{ color: 'primary.main' }} />
    default:
      return null
  }
}

/**
 * Get message for notification type.
 */
const getNotificationMessage = (notification: Notification): string => {
  const { type, actor } = notification

  switch (type) {
    case 'like':
      return `${actor.displayName} liked your tweet`
    case 'retweet':
      return `${actor.displayName} retweeted your tweet`
    case 'reply':
      return `${actor.displayName} replied to your tweet`
    case 'mention':
      return `${actor.displayName} mentioned you`
    case 'follow':
      return `${actor.displayName} followed you`
    default:
      return 'New notification'
  }
}

/**
 * Format relative time.
 */
const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Single notification item.
 */
const NotificationItem: React.FC<{
  notification: Notification
  onProfileClick?: (username: string) => void
  onTweetClick?: (tweetId: string) => void
}> = ({ notification, onProfileClick, onTweetClick }) => {
  const handleClick = () => {
    if (notification.tweet) {
      onTweetClick?.(notification.tweet.id)
    } else {
      onProfileClick?.(notification.actor.username)
    }
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        cursor: 'pointer',
        bgcolor: notification.isRead ? 'transparent' : 'action.hover',
        '&:hover': {
          bgcolor: 'action.selected',
        },
      }}
    >
      <Box sx={{ pt: 0.5 }}>{getNotificationIcon(notification.type)}</Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Avatar
            src={notification.actor.avatar}
            alt={notification.actor.displayName}
            sx={{ width: 32, height: 32 }}
          >
            {notification.actor.displayName[0]}
          </Avatar>
        </Box>

        <Typography variant="body2">
          {getNotificationMessage(notification)}
        </Typography>

        {notification.tweet && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {notification.tweet.content}
          </Typography>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: 'block' }}
        >
          {formatTime(notification.createdAt)}
        </Typography>
      </Box>
    </Box>
  )
}

/**
 * List of notifications with mark-all-read functionality.
 */
export const NotificationList: React.FC<NotificationListProps> = ({
  onProfileClick,
  onTweetClick,
}) => {
  const { data, isLoading, error } = useNotifications()
  const { mutate: markAllRead, isPending } = useMarkAllNotificationsRead()

  if (isLoading) {
    return <LoadingSpinner message="Loading notifications..." />
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">Failed to load notifications</Typography>
      </Box>
    )
  }

  const notifications = data?.notifications ?? []
  const unreadCount = data?.unreadCount ?? 0

  if (notifications.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No notifications yet</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 10,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Notifications
          {unreadCount > 0 && (
            <Typography
              component="span"
              variant="body2"
              color="primary.main"
              sx={{ ml: 1 }}
            >
              ({unreadCount} new)
            </Typography>
          )}
        </Typography>
        {unreadCount > 0 && (
          <Button
            size="small"
            onClick={() => markAllRead()}
            disabled={isPending}
          >
            Mark all read
          </Button>
        )}
      </Box>

      {/* Notification list */}
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onProfileClick={onProfileClick}
          onTweetClick={onTweetClick}
        />
      ))}
    </Box>
  )
}
