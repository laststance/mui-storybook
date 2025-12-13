/**
 * Tweet card component displaying a single tweet with actions.
 */

import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RepeatIcon from '@mui/icons-material/Repeat'
import VerifiedIcon from '@mui/icons-material/Verified'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { useCurrentUser } from '../../auth'
import {
  useBookmark,
  useDeleteTweet,
  useLikeTweet,
  useRetweet,
} from '../../features/feed/useFeed'
import { openModal } from '../../stores/uiStore'

import type { Tweet } from '../../types'

export interface TweetCardProps {
  /** Tweet data to display */
  tweet: Tweet
  /** Handler for navigating to profile */
  onProfileClick?: (username: string) => void
  /** Handler for navigating to tweet detail */
  onTweetClick?: (tweetId: string) => void
}

/**
 * Format relative time (e.g., "5m", "2h", "3d").
 */
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Format number for display (e.g., 1234 -> "1.2K").
 */
const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

/**
 * Tweet card displaying content, author info, and engagement actions.
 */
export const TweetCard: React.FC<TweetCardProps> = ({
  tweet,
  onProfileClick,
  onTweetClick,
}) => {
  const currentUser = useCurrentUser()
  const { mutate: toggleLike, isPending: isLiking } = useLikeTweet()
  const { mutate: toggleRetweet, isPending: isRetweeting } = useRetweet()
  const { mutate: toggleBookmark, isPending: isBookmarking } = useBookmark()
  const { mutate: deleteTweet, isPending: isDeleting } = useDeleteTweet()

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(menuAnchor)

  const isOwnTweet = currentUser?.id === tweet.author.id

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLiking) {
      toggleLike({ tweetId: tweet.id, isLiked: tweet.isLiked })
    }
  }

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isRetweeting) {
      toggleRetweet({ tweetId: tweet.id, isRetweeted: tweet.isRetweeted })
    }
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isBookmarking) {
      toggleBookmark({ tweetId: tweet.id, isBookmarked: tweet.isBookmarked })
    }
  }

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation()
    openModal('reply', tweet.id)
  }

  const handleDelete = () => {
    setMenuAnchor(null)
    if (!isDeleting) {
      deleteTweet(tweet.id)
    }
  }

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setMenuAnchor(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  return (
    <Box
      onClick={() => onTweetClick?.(tweet.id)}
      sx={{
        display: 'flex',
        gap: 1.5,
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      {/* Avatar */}
      <Avatar
        src={tweet.author.avatar}
        alt={tweet.author.displayName}
        onClick={(e) => {
          e.stopPropagation()
          onProfileClick?.(tweet.author.username)
        }}
        sx={{
          width: 48,
          height: 48,
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
        }}
      >
        {tweet.author.displayName[0]}
      </Avatar>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            onClick={(e) => {
              e.stopPropagation()
              onProfileClick?.(tweet.author.username)
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {tweet.author.displayName}
          </Typography>
          {tweet.author.isVerified && (
            <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          )}
          <Typography variant="body2" color="text.secondary">
            @{tweet.author.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ·
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatRelativeTime(tweet.createdAt)}
          </Typography>

          {/* Menu */}
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ ml: 'auto' }}
            aria-label="Tweet options"
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
          >
            {isOwnTweet && (
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <DeleteOutlineIcon sx={{ mr: 1 }} fontSize="small" />
                Delete
              </MenuItem>
            )}
            {!isOwnTweet && (
              <MenuItem onClick={handleMenuClose}>Report</MenuItem>
            )}
          </Menu>
        </Box>

        {/* Tweet Content */}
        <Typography
          variant="body1"
          sx={{
            mt: 0.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {tweet.content}
        </Typography>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1.5,
            maxWidth: 425,
          }}
        >
          {/* Reply */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={handleReply}
              aria-label="Reply"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.main',
                  opacity: 0.1,
                },
              }}
            >
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            {tweet.repliesCount > 0 && (
              <Typography variant="caption" color="text.secondary">
                {formatCount(tweet.repliesCount)}
              </Typography>
            )}
          </Box>

          {/* Retweet */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={handleRetweet}
              disabled={isRetweeting}
              aria-label={tweet.isRetweeted ? 'Undo retweet' : 'Retweet'}
              sx={{
                color: tweet.isRetweeted ? 'success.main' : 'inherit',
                '&:hover': {
                  color: 'success.main',
                  bgcolor: 'success.main',
                  opacity: 0.1,
                },
              }}
            >
              <RepeatIcon fontSize="small" />
            </IconButton>
            {tweet.retweetsCount > 0 && (
              <Typography
                variant="caption"
                color={tweet.isRetweeted ? 'success.main' : 'text.secondary'}
              >
                {formatCount(tweet.retweetsCount)}
              </Typography>
            )}
          </Box>

          {/* Like */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={handleLike}
              disabled={isLiking}
              aria-label={tweet.isLiked ? 'Unlike' : 'Like'}
              sx={{
                color: tweet.isLiked ? 'error.main' : 'inherit',
                '&:hover': {
                  color: 'error.main',
                  bgcolor: 'error.main',
                  opacity: 0.1,
                },
              }}
            >
              {tweet.isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            {tweet.likesCount > 0 && (
              <Typography
                variant="caption"
                color={tweet.isLiked ? 'error.main' : 'text.secondary'}
              >
                {formatCount(tweet.likesCount)}
              </Typography>
            )}
          </Box>

          {/* Bookmark */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="small"
              onClick={handleBookmark}
              disabled={isBookmarking}
              aria-label={tweet.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              sx={{
                color: tweet.isBookmarked ? 'primary.main' : 'inherit',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.main',
                  opacity: 0.1,
                },
              }}
            >
              {tweet.isBookmarked ? (
                <BookmarkIcon fontSize="small" />
              ) : (
                <BookmarkBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
