/**
 * Profile header component displaying user information and stats.
 */

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LinkIcon from '@mui/icons-material/Link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import VerifiedIcon from '@mui/icons-material/Verified'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useCurrentUser } from '../../auth'
import {
  useFollowUser,
  useUserProfile,
} from '../../features/profile/useProfile'
import { LoadingSpinner } from '../common/LoadingSpinner'

export interface ProfileHeaderProps {
  /** Username to display profile for */
  username: string
  /** Handler for back navigation */
  onBack?: () => void
}

/**
 * Format join date.
 */
const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/**
 * Profile header with user info, stats, and follow button.
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  onBack,
}) => {
  const currentUser = useCurrentUser()
  const { data, isLoading, error } = useUserProfile(username)
  const { mutate: toggleFollow, isPending: isFollowPending } = useFollowUser()

  if (isLoading) {
    return <LoadingSpinner message="Loading profile..." />
  }

  if (error || !data) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">User not found</Typography>
      </Box>
    )
  }

  const { user, isFollowing } = data
  const isOwnProfile = currentUser?.id === user.id

  const handleFollow = () => {
    if (!isFollowPending) {
      toggleFollow({ username: user.username, isFollowing })
    }
  }

  return (
    <Box>
      {/* Header with back button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 1,
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 10,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={onBack} size="small" aria-label="Go back">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {user.displayName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.followersCount.toLocaleString()} followers
          </Typography>
        </Box>
      </Box>

      {/* Cover image placeholder */}
      <Box
        sx={{
          height: 200,
          bgcolor: 'primary.main',
          opacity: 0.3,
        }}
      />

      {/* Profile info */}
      <Box sx={{ px: 2, pb: 2 }}>
        {/* Avatar and follow button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mt: -8,
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.displayName}
            sx={{
              width: 134,
              height: 134,
              border: 4,
              borderColor: 'background.paper',
            }}
          >
            {user.displayName[0]}
          </Avatar>

          {!isOwnProfile && currentUser && (
            <Button
              variant={isFollowing ? 'outlined' : 'contained'}
              onClick={handleFollow}
              disabled={isFollowPending}
              sx={{
                mt: 8,
                borderRadius: 9999,
                fontWeight: 'bold',
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}

          {isOwnProfile && (
            <Button
              variant="outlined"
              sx={{
                mt: 8,
                borderRadius: 9999,
                fontWeight: 'bold',
              }}
            >
              Edit profile
            </Button>
          )}
        </Box>

        {/* Name and username */}
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="h5" fontWeight="bold">
              {user.displayName}
            </Typography>
            {user.isVerified && <VerifiedIcon sx={{ color: 'primary.main' }} />}
          </Box>
          <Typography color="text.secondary">@{user.username}</Typography>
        </Box>

        {/* Bio */}
        {user.bio && (
          <Typography sx={{ mt: 1.5, whiteSpace: 'pre-wrap' }}>
            {user.bio}
          </Typography>
        )}

        {/* Meta info */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 1.5,
            color: 'text.secondary',
          }}
        >
          {user.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{user.location}</Typography>
            </Box>
          )}
          {user.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LinkIcon fontSize="small" />
              <Typography
                variant="body2"
                component="a"
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {user.website.replace(/^https?:\/\//, '')}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">
              Joined {formatJoinDate(user.joinedAt)}
            </Typography>
          </Box>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 3, mt: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <Typography fontWeight="bold">
              {user.followingCount.toLocaleString()}
            </Typography>
            <Typography color="text.secondary">Following</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <Typography fontWeight="bold">
              {user.followersCount.toLocaleString()}
            </Typography>
            <Typography color="text.secondary">Followers</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
