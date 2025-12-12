import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles'

/**
 * Maximum width options for the single column layout.
 * Maps to MUI Container maxWidth values.
 */
export type SingleColumnMaxWidth = Breakpoint | false

/**
 * Content alignment options for the single column layout.
 */
export type ContentAlignment = 'left' | 'center' | 'right'

/**
 * Props for the SingleColumnLayout component.
 */
export interface SingleColumnLayoutProps {
  /**
   * The content to display in the single column.
   */
  children: React.ReactNode
  /**
   * Maximum width of the content column.
   * @default 'md'
   */
  maxWidth?: SingleColumnMaxWidth
  /**
   * Horizontal padding around the content.
   * Uses MUI spacing values (multiplied by 8px).
   * @default 3
   */
  padding?: number
  /**
   * Vertical padding at top and bottom.
   * Uses MUI spacing values (multiplied by 8px).
   * @default 4
   */
  verticalPadding?: number
  /**
   * Text alignment for content.
   * @default 'left'
   */
  textAlign?: ContentAlignment
  /**
   * Whether to center the entire container.
   * @default true
   */
  centered?: boolean
  /**
   * Additional sx props for the outer container.
   */
  sx?: SxProps<Theme>
}

/**
 * SingleColumnLayout provides a centered content column optimized for reading and mobile views.
 *
 * This layout pattern is ideal for:
 * - Blog posts and articles
 * - Landing pages with focused content
 * - Mobile-first designs
 * - Reading-focused content like documentation
 * - Form pages and checkout flows
 *
 * The layout uses MUI Container to manage responsive max-widths while keeping
 * content centered and readable across all screen sizes.
 *
 * @param props - The component props.
 * @returns A single column layout container.
 *
 * @example
 * // Basic usage with default settings
 * <SingleColumnLayout>
 *   <Typography variant="h1">Article Title</Typography>
 *   <Typography>Article content goes here...</Typography>
 * </SingleColumnLayout>
 *
 * @example
 * // Narrow column for focused reading
 * <SingleColumnLayout maxWidth="sm" textAlign="center">
 *   <Typography variant="h2">Welcome</Typography>
 *   <Typography>Centered introduction text</Typography>
 * </SingleColumnLayout>
 *
 * @example
 * // Full width without max constraint
 * <SingleColumnLayout maxWidth={false} padding={6}>
 *   <Typography>Full width content</Typography>
 * </SingleColumnLayout>
 */
const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  children,
  maxWidth = 'md',
  padding = 3,
  verticalPadding = 4,
  textAlign = 'left',
  centered = true,
  sx,
}) => {
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
          py: verticalPadding,
          textAlign,
          ...(centered && {
            mx: 'auto',
          }),
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

export default SingleColumnLayout

// ============================================================================
// Real-World Example Components
// ============================================================================

/**
 * Props for the BlogArticle example component.
 */
export interface BlogArticleProps {
  /**
   * Article title.
   */
  title?: string
  /**
   * Article subtitle or excerpt.
   */
  subtitle?: string
  /**
   * Author name.
   */
  author?: string
  /**
   * Author avatar URL.
   */
  authorAvatar?: string
  /**
   * Publication date string.
   */
  date?: string
  /**
   * Article tags/categories.
   */
  tags?: string[]
  /**
   * Hero image URL.
   */
  heroImage?: string
  /**
   * Article content paragraphs.
   */
  content?: string[]
}

/**
 * BlogArticle demonstrates a real-world single column layout for article pages.
 *
 * This example showcases:
 * - Hero image section
 * - Article metadata (author, date, tags)
 * - Readable content width
 * - Author bio section
 *
 * @param props - The article content props.
 * @returns A complete blog article layout.
 *
 * @example
 * <BlogArticle
 *   title="Understanding CSS Grid"
 *   author="Jane Developer"
 *   date="December 2025"
 *   content={['First paragraph...', 'Second paragraph...']}
 * />
 */
export const BlogArticle: React.FC<BlogArticleProps> = ({
  title = 'The Complete Guide to Modern CSS Layouts',
  subtitle = 'Understanding Grid, Flexbox, and when to use each approach in your web projects.',
  author = 'Alex Johnson',
  authorAvatar = 'https://i.pravatar.cc/150?img=33',
  date = 'December 12, 2025',
  tags = ['CSS', 'Web Development', 'Tutorial'],
  heroImage = 'https://picsum.photos/seed/layout/1200/400',
  content = [
    'Modern CSS layout techniques have revolutionized how we build web interfaces. With CSS Grid and Flexbox, developers now have powerful tools to create complex, responsive layouts without relying on floats or positioning hacks.',
    'CSS Grid excels at two-dimensional layouts, where you need to control both rows and columns simultaneously. It is perfect for page-level layouts, card grids, and any design where items need to align across both axes.',
    'Flexbox, on the other hand, shines in one-dimensional layouts. Use it for navigation bars, card content alignment, and any situation where items flow in a single direction with flexible sizing.',
    'The key to mastering modern layouts is understanding when to use each tool. Grid for the overall page structure, Flexbox for component-level layouts, and often both working together for complex UIs.',
    'In this guide, we will explore practical examples of both techniques, showing real-world patterns you can apply to your projects immediately.',
  ],
}) => {
  const theme = useTheme()

  return (
    <SingleColumnLayout maxWidth="md" padding={2} verticalPadding={0}>
      {/* Hero Image */}
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          height: { xs: 200, sm: 300, md: 400 },
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 4,
        }}
      />

      {/* Tags */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>

      {/* Title */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mb: 3,
          fontWeight: 400,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </Typography>

      {/* Author Info */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Avatar
          src={authorAvatar}
          alt={author}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Article Content */}
      <Box
        component="article"
        sx={{
          '& p': {
            fontSize: '1.125rem',
            lineHeight: 1.8,
            mb: 3,
            color: theme.palette.text.primary,
          },
        }}
      >
        {content.map((paragraph, index) => (
          <Typography key={index} component="p">
            {paragraph}
          </Typography>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Author Bio */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          bgcolor: theme.palette.grey[50],
          ...(theme.palette.mode === 'dark' && {
            bgcolor: theme.palette.grey[900],
          }),
        }}
      >
        <Avatar
          src={authorAvatar}
          alt={author}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            About {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A passionate web developer and educator with over 10 years of
            experience building modern web applications. Specializes in frontend
            development, CSS architecture, and developer experience.
          </Typography>
        </Box>
      </Paper>
    </SingleColumnLayout>
  )
}
