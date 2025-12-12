import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useCallback, useState } from 'react'

import type React from 'react'

/**
 * Props for the CardBasedLayout component.
 */
export interface CardBasedLayoutProps {
  /**
   * Array of card items to display.
   */
  cards: CardItem[]
  /**
   * Layout variant for the cards.
   * @default 'feed'
   */
  variant?: 'feed' | 'grid' | 'masonry'
  /**
   * Number of columns for grid/masonry layout.
   * @default 2
   */
  columns?: 1 | 2 | 3 | 4
  /**
   * Gap between cards in pixels.
   * @default 16
   */
  gap?: number
  /**
   * Whether to show card actions (like, comment, share).
   * @default true
   */
  showActions?: boolean
  /**
   * Whether to show author information.
   * @default true
   */
  showAuthor?: boolean
  /**
   * Callback when a card action is triggered.
   */
  onAction?: (cardId: string, action: CardAction) => void
  /**
   * Callback when a card is clicked.
   */
  onCardClick?: (cardId: string) => void
}

/**
 * Card item configuration.
 */
export interface CardItem {
  /** Unique identifier */
  id: string
  /** Card title */
  title: string
  /** Card content/description */
  content: string
  /** Optional image URL */
  image?: string
  /** Image aspect ratio */
  imageAspect?: '16:9' | '4:3' | '1:1' | 'auto'
  /** Author information */
  author?: {
    name: string
    avatar?: string
    timestamp?: string
  }
  /** Tags/categories */
  tags?: string[]
  /** Interaction metrics */
  metrics?: {
    likes?: number
    comments?: number
    shares?: number
  }
  /** Whether the card is liked by the user */
  isLiked?: boolean
  /** Custom content to render */
  customContent?: React.ReactNode
}

/**
 * Card action types.
 */
export type CardAction = 'like' | 'comment' | 'share' | 'more'

/**
 * CardBasedLayout displays self-contained content cards in various arrangements.
 *
 * This layout pattern is ideal for:
 * - Social media feeds with posts and interactions
 * - Blog/article listings with previews
 * - Product catalogs with item cards
 * - News aggregators with story cards
 *
 * @example
 * ```tsx
 * <CardBasedLayout
 *   cards={[
 *     {
 *       id: '1',
 *       title: 'Post Title',
 *       content: 'Post content here...',
 *       author: { name: 'John Doe', avatar: 'url' },
 *       metrics: { likes: 42, comments: 5 }
 *     }
 *   ]}
 *   variant="feed"
 *   showActions={true}
 *   onAction={(cardId, action) => console.log(cardId, action)}
 * />
 * ```
 *
 * @param props - Component props
 * @returns Card-based layout component
 */
const CardBasedLayout: React.FC<CardBasedLayoutProps> = ({
  cards,
  variant = 'feed',
  columns = 2,
  gap = 16,
  showActions = true,
  showAuthor = true,
  onAction,
  onCardClick,
}) => {
  const theme = useTheme()
  const [likedCards, setLikedCards] = useState<Set<string>>(() => {
    const initialLiked = new Set<string>()
    cards.forEach((card) => {
      if (card.isLiked) initialLiked.add(card.id)
    })
    return initialLiked
  })

  /**
   * Handles like action toggle.
   * @param cardId - The ID of the card being liked/unliked
   */
  const handleLike = useCallback(
    (cardId: string) => {
      setLikedCards((prev) => {
        const next = new Set(prev)
        if (next.has(cardId)) {
          next.delete(cardId)
        } else {
          next.add(cardId)
        }
        return next
      })
      onAction?.(cardId, 'like')
    },
    [onAction],
  )

  /**
   * Gets the container styles based on the variant.
   * @returns Container style object
   */
  const getContainerStyles = (): Record<string, unknown> => {
    switch (variant) {
      case 'grid':
        return {
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: columns >= 2 ? 'repeat(2, 1fr)' : '1fr',
            md: `repeat(${Math.min(columns, 3)}, 1fr)`,
            lg: `repeat(${columns}, 1fr)`,
          },
          gap: `${gap}px`,
        }
      case 'masonry':
        return {
          columnCount: { xs: 1, sm: Math.min(columns, 2), md: columns },
          columnGap: `${gap}px`,
          '& > *': {
            breakInside: 'avoid',
            marginBottom: `${gap}px`,
          },
        }
      case 'feed':
      default:
        return {
          display: 'flex',
          flexDirection: 'column' as const,
          gap: `${gap}px`,
          maxWidth: 600,
          mx: 'auto',
        }
    }
  }

  /**
   * Gets image height based on aspect ratio.
   * @param aspect - The aspect ratio setting
   * @returns Height value for the image
   */
  const getImageHeight = (aspect: CardItem['imageAspect']) => {
    switch (aspect) {
      case '16:9':
        return 180
      case '4:3':
        return 225
      case '1:1':
        return 300
      case 'auto':
        return 'auto'
      default:
        return 200
    }
  }

  return (
    <Container maxWidth="lg" data-testid="card-based-layout">
      <Box sx={getContainerStyles()}>
        {cards.map((card) => {
          const isLiked = likedCards.has(card.id)
          const likeCount =
            (card.metrics?.likes || 0) + (isLiked && !card.isLiked ? 1 : 0)

          return (
            <Card
              key={card.id}
              sx={{
                cursor: onCardClick ? 'pointer' : 'default',
                transition: theme.transitions.create(
                  ['box-shadow', 'transform'],
                  {
                    duration: theme.transitions.duration.short,
                  },
                ),
                '&:hover': onCardClick
                  ? {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                    }
                  : {},
              }}
              data-testid={`card-${card.id}`}
              onClick={() => onCardClick?.(card.id)}
              role={onCardClick ? 'button' : undefined}
              tabIndex={onCardClick ? 0 : undefined}
              onKeyDown={(e) => {
                if (onCardClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  onCardClick(card.id)
                }
              }}
            >
              {showAuthor && card.author && (
                <CardHeader
                  avatar={
                    <Avatar
                      src={card.author.avatar}
                      alt={card.author.name}
                      sx={{ bgcolor: theme.palette.primary.main }}
                    >
                      {card.author.name[0]}
                    </Avatar>
                  }
                  action={
                    <IconButton
                      aria-label="more options"
                      onClick={(e) => {
                        e.stopPropagation()
                        onAction?.(card.id, 'more')
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={card.author.name}
                  subheader={card.author.timestamp}
                />
              )}

              {card.image && (
                <CardMedia
                  component="img"
                  height={getImageHeight(card.imageAspect)}
                  image={card.image}
                  alt={card.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}

              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {card.content}
                </Typography>

                {card.customContent && (
                  <Box sx={{ mt: 2 }}>{card.customContent}</Box>
                )}

                {card.tags && card.tags.length > 0 && (
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}
                  >
                    {card.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>

              {showActions && (
                <CardActions
                  disableSpacing
                  sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      aria-label={isLiked ? 'unlike' : 'like'}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(card.id)
                      }}
                      color={isLiked ? 'error' : 'default'}
                    >
                      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {likeCount}
                    </Typography>

                    <IconButton
                      aria-label="comment"
                      sx={{ ml: 1 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onAction?.(card.id, 'comment')
                      }}
                    >
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {card.metrics?.comments || 0}
                    </Typography>
                  </Box>

                  <IconButton
                    aria-label="share"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAction?.(card.id, 'share')
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          )
        })}
      </Box>
    </Container>
  )
}

export default CardBasedLayout
