import BookmarkIcon from '@mui/icons-material/Bookmark'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles'

/**
 * Column distribution options for three-column layout.
 * - 'equal': 33.3% / 33.3% / 33.3% split
 * - 'center-heavy': 25% / 50% / 25% split
 * - 'left-heavy': 40% / 35% / 25% split
 * - 'right-heavy': 25% / 35% / 40% split
 */
export type ThreeColumnDistribution =
  | 'equal'
  | 'center-heavy'
  | 'left-heavy'
  | 'right-heavy'

/**
 * Props for the ThreeColumnLayout component.
 */
export interface ThreeColumnLayoutProps {
  /**
   * Content for the left column (sidebar).
   */
  leftColumn: React.ReactNode
  /**
   * Content for the center column (main content).
   */
  centerColumn: React.ReactNode
  /**
   * Content for the right column (secondary sidebar).
   */
  rightColumn: React.ReactNode
  /**
   * Distribution of column widths.
   * @default 'center-heavy'
   */
  distribution?: ThreeColumnDistribution
  /**
   * Gap between columns in MUI spacing units (multiplied by 8px).
   * @default 3
   */
  gap?: number
  /**
   * Maximum width of the container.
   * @default 'xl'
   */
  maxWidth?: Breakpoint | false
  /**
   * Padding around the container in MUI spacing units.
   * @default 2
   */
  padding?: number
  /**
   * Whether columns should collapse responsively.
   * @default true
   */
  responsive?: boolean
  /**
   * Breakpoint at which all columns stack vertically.
   * @default 'md'
   */
  stackAt?: Breakpoint
  /**
   * Whether to hide sidebars on mobile and show only center content.
   * @default false
   */
  hideSidebarsOnMobile?: boolean
  /**
   * Additional sx props for the outer container.
   */
  sx?: SxProps<Theme>
}

/**
 * Calculates flex values based on column distribution.
 *
 * @param distribution - The desired column distribution.
 * @returns Object containing left, center, and right flex values.
 *
 * @example
 * getFlexValues('equal') // => { left: 1, center: 1, right: 1 }
 * getFlexValues('center-heavy') // => { left: 1, center: 2, right: 1 }
 */
const getFlexValues = (
  distribution: ThreeColumnDistribution,
): { left: number; center: number; right: number } => {
  switch (distribution) {
    case 'center-heavy':
      return { left: 1, center: 2, right: 1 }
    case 'left-heavy':
      return { left: 8, center: 7, right: 5 }
    case 'right-heavy':
      return { left: 5, center: 7, right: 8 }
    case 'equal':
    default:
      return { left: 1, center: 1, right: 1 }
  }
}

/**
 * ThreeColumnLayout provides a classic web layout with main content and sidebars.
 *
 * This layout pattern is ideal for:
 * - News portals with ads, articles, and trending content
 * - Dashboards with navigation, content, and widgets
 * - E-commerce sites with filters, products, and cart
 * - Social media feeds with navigation, posts, and suggestions
 * - Admin panels with menus, data, and actions
 *
 * The layout uses CSS Flexbox for flexible column sizing and includes
 * responsive behavior to collapse sidebars on smaller screens.
 *
 * @param props - The component props.
 * @returns A three-column layout container.
 *
 * @example
 * // Basic three-column layout
 * <ThreeColumnLayout
 *   leftColumn={<Navigation />}
 *   centerColumn={<MainContent />}
 *   rightColumn={<Widgets />}
 * />
 *
 * @example
 * // News portal with center-heavy distribution
 * <ThreeColumnLayout
 *   distribution="center-heavy"
 *   leftColumn={<Ads />}
 *   centerColumn={<Articles />}
 *   rightColumn={<Trending />}
 * />
 *
 * @example
 * // Dashboard hiding sidebars on mobile
 * <ThreeColumnLayout
 *   hideSidebarsOnMobile
 *   leftColumn={<Sidebar />}
 *   centerColumn={<Dashboard />}
 *   rightColumn={<Activity />}
 * />
 */
const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  leftColumn,
  centerColumn,
  rightColumn,
  distribution = 'center-heavy',
  gap = 3,
  maxWidth = 'xl',
  padding = 2,
  responsive = true,
  stackAt = 'md',
  hideSidebarsOnMobile = false,
  sx,
}) => {
  const flexValues = getFlexValues(distribution)

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        ...sx,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          px: padding,
          py: padding,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: responsive
              ? { xs: 'column', [stackAt]: 'row' }
              : 'row',
            gap,
          }}
        >
          {/* Left Column */}
          <Box
            sx={{
              flex: responsive
                ? { xs: '1 1 auto', [stackAt]: `${flexValues.left} 1 0` }
                : `${flexValues.left} 1 0`,
              minWidth: 0,
              ...(hideSidebarsOnMobile &&
                responsive && {
                  display: { xs: 'none', [stackAt]: 'block' },
                }),
            }}
          >
            {leftColumn}
          </Box>

          {/* Center Column */}
          <Box
            sx={{
              flex: responsive
                ? { xs: '1 1 auto', [stackAt]: `${flexValues.center} 1 0` }
                : `${flexValues.center} 1 0`,
              minWidth: 0,
            }}
          >
            {centerColumn}
          </Box>

          {/* Right Column */}
          <Box
            sx={{
              flex: responsive
                ? { xs: '1 1 auto', [stackAt]: `${flexValues.right} 1 0` }
                : `${flexValues.right} 1 0`,
              minWidth: 0,
              ...(hideSidebarsOnMobile &&
                responsive && {
                  display: { xs: 'none', [stackAt]: 'block' },
                }),
            }}
          >
            {rightColumn}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ThreeColumnLayout

// ============================================================================
// Real-World Example Components
// ============================================================================

/**
 * Article type for news portal.
 */
interface Article {
  id: string
  title: string
  excerpt: string
  author: string
  authorAvatar: string
  date: string
  category: string
  imageUrl: string
  commentCount: number
}

/**
 * Trending item type for sidebar.
 */
interface TrendingItem {
  id: string
  title: string
  views: string
  category: string
}

/**
 * Ad item type for sidebar.
 */
interface AdItem {
  id: string
  title: string
  description: string
  bgColor: string
}

/**
 * Props for the NewsPortal example component.
 */
export interface NewsPortalProps {
  /**
   * Featured articles to display.
   */
  articles?: Article[]
  /**
   * Trending items for right sidebar.
   */
  trendingItems?: TrendingItem[]
  /**
   * Advertisements for left sidebar.
   */
  ads?: AdItem[]
}

/**
 * NewsPortal demonstrates a real-world three-column layout for news websites.
 *
 * This example showcases:
 * - Left sidebar with advertisements
 * - Center column with main articles
 * - Right sidebar with trending content
 * - Responsive behavior for mobile
 * - Sticky sidebars
 *
 * @param props - The news portal props.
 * @returns A complete news portal layout.
 *
 * @example
 * <NewsPortal
 *   articles={[...]}
 *   trendingItems={[...]}
 *   ads={[...]}
 * />
 */
export const NewsPortal: React.FC<NewsPortalProps> = ({
  articles = [
    {
      id: '1',
      title: 'The Future of Web Development: What to Expect in 2025',
      excerpt:
        'Discover the emerging trends and technologies that will shape the future of web development, from AI-powered tools to new frameworks.',
      author: 'Sarah Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=1',
      date: 'Dec 12, 2025',
      category: 'Technology',
      imageUrl: 'https://picsum.photos/seed/tech1/800/400',
      commentCount: 42,
    },
    {
      id: '2',
      title: 'Understanding Modern CSS Layout Techniques',
      excerpt:
        'A comprehensive guide to mastering CSS Grid and Flexbox for creating responsive, accessible web layouts.',
      author: 'Marcus Johnson',
      authorAvatar: 'https://i.pravatar.cc/150?img=2',
      date: 'Dec 11, 2025',
      category: 'Design',
      imageUrl: 'https://picsum.photos/seed/css1/800/400',
      commentCount: 28,
    },
    {
      id: '3',
      title: 'Building Accessible React Applications',
      excerpt:
        'Learn best practices for creating inclusive web applications that work for everyone, regardless of ability.',
      author: 'Emma Williams',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
      date: 'Dec 10, 2025',
      category: 'Accessibility',
      imageUrl: 'https://picsum.photos/seed/a11y1/800/400',
      commentCount: 35,
    },
  ],
  trendingItems = [
    {
      id: '1',
      title: 'React 19 Release Notes',
      views: '12.5K',
      category: 'React',
    },
    {
      id: '2',
      title: 'TypeScript 5.4 Features',
      views: '8.2K',
      category: 'TypeScript',
    },
    {
      id: '3',
      title: 'Next.js 15 Migration Guide',
      views: '6.8K',
      category: 'Next.js',
    },
    { id: '4', title: 'CSS Container Queries', views: '5.4K', category: 'CSS' },
    {
      id: '5',
      title: 'Bun vs Node.js 2025',
      views: '4.9K',
      category: 'Runtime',
    },
  ],
  ads = [
    {
      id: '1',
      title: 'Learn Web Development',
      description: 'Start your coding journey today with our free courses.',
      bgColor: '#1976d2',
    },
    {
      id: '2',
      title: 'Cloud Hosting Sale',
      description: 'Get 50% off your first 3 months of hosting.',
      bgColor: '#9c27b0',
    },
  ],
}) => {
  const theme = useTheme()

  // Left Column: Ads
  const leftSidebar = (
    <Stack spacing={2} sx={{ position: 'sticky', top: 16 }}>
      <Typography variant="overline" color="text.secondary">
        Sponsored
      </Typography>
      {ads.map((ad) => (
        <Paper
          key={ad.id}
          sx={{
            p: 2,
            bgcolor: ad.bgColor,
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {ad.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {ad.description}
          </Typography>
        </Paper>
      ))}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          textAlign: 'center',
          bgcolor: theme.palette.grey[50],
          ...(theme.palette.mode === 'dark' && {
            bgcolor: theme.palette.grey[900],
          }),
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Advertisement
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: 200,
            bgcolor: theme.palette.grey[200],
            ...(theme.palette.mode === 'dark' && {
              bgcolor: theme.palette.grey[800],
            }),
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            300x250
          </Typography>
        </Box>
      </Paper>
    </Stack>
  )

  // Center Column: Articles
  const mainContent = (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" component="h1" fontWeight={600}>
          Latest Articles
        </Typography>
        <Chip label="Today" size="small" color="primary" variant="outlined" />
      </Box>

      {articles.map((article, index) => (
        <Paper
          key={article.id}
          variant="outlined"
          sx={{
            overflow: 'hidden',
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
            transition: 'box-shadow 0.2s',
          }}
        >
          {index === 0 && (
            <Box
              sx={{
                width: '100%',
                height: 200,
                backgroundImage: `url(${article.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          <Box sx={{ p: 2 }}>
            <Chip
              label={article.category}
              size="small"
              color="primary"
              sx={{ mb: 1 }}
            />
            <Typography variant="h6" gutterBottom>
              {article.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              {article.excerpt}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src={article.authorAvatar}
                  alt={article.author}
                  sx={{ width: 32, height: 32 }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {article.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.date}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <IconButton size="small" aria-label="Comment">
                  <CommentIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {article.commentCount}
                </Typography>
                <IconButton size="small" aria-label="Bookmark">
                  <BookmarkIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label="Share">
                  <ShareIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      ))}
    </Stack>
  )

  // Right Column: Trending
  const rightSidebar = (
    <Stack spacing={2} sx={{ position: 'sticky', top: 16 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TrendingUpIcon color="primary" />
        <Typography variant="h6">Trending</Typography>
      </Stack>

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        {trendingItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Box
              sx={{
                p: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ opacity: 0.5, fontWeight: 700 }}
                >
                  {index + 1}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={500} gutterBottom>
                    {item.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={item.category}
                      size="small"
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {item.views} views
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            {index < trendingItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Subscribe to Newsletter
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
          Get the latest articles delivered to your inbox.
        </Typography>
        <Paper
          sx={{
            py: 1,
            textAlign: 'center',
            bgcolor: 'background.paper',
            color: 'text.primary',
            cursor: 'pointer',
          }}
        >
          Subscribe
        </Paper>
      </Paper>
    </Stack>
  )

  return (
    <ThreeColumnLayout
      distribution="center-heavy"
      gap={3}
      leftColumn={leftSidebar}
      centerColumn={mainContent}
      rightColumn={rightSidebar}
      hideSidebarsOnMobile
    />
  )
}
