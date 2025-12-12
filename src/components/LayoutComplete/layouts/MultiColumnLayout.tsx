import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles'

/**
 * Column count options for multi-column layout.
 */
export type ColumnCount = 2 | 3 | 4 | 5 | 6 | 'auto'

/**
 * Column gap options for the layout.
 */
export type ColumnGap = 'narrow' | 'standard' | 'wide' | number

/**
 * Props for the MultiColumnLayout component.
 */
export interface MultiColumnLayoutProps {
  /**
   * The content to flow across columns.
   */
  children: React.ReactNode
  /**
   * Number of columns or 'auto' for responsive.
   * @default 3
   */
  columnCount?: ColumnCount
  /**
   * Gap between columns.
   * - 'narrow': 16px
   * - 'standard': 24px
   * - 'wide': 40px
   * - number: Custom pixel value
   * @default 'standard'
   */
  columnGap?: ColumnGap
  /**
   * Minimum width for each column when using 'auto'.
   * @default 250
   */
  minColumnWidth?: number
  /**
   * Whether to add decorative column rules (dividers).
   * @default false
   */
  columnRule?: boolean
  /**
   * Color of the column rule (if enabled).
   * @default 'divider'
   */
  columnRuleColor?: string
  /**
   * Maximum width of the container.
   * @default 'lg'
   */
  maxWidth?: Breakpoint | false
  /**
   * Padding around the container.
   * @default 3
   */
  padding?: number
  /**
   * Whether to balance column heights.
   * @default true
   */
  balanceColumns?: boolean
  /**
   * Prevent break inside specific elements (images, quotes, etc.).
   * @default true
   */
  preventBreakInside?: boolean
  /**
   * Additional sx props for the outer container.
   */
  sx?: SxProps<Theme>
}

/**
 * Resolves column gap value to pixels.
 *
 * @param gap - The column gap option.
 * @returns Gap in pixels.
 *
 * @example
 * resolveColumnGap('standard') // => 24
 * resolveColumnGap(32) // => 32
 */
const resolveColumnGap = (gap: ColumnGap): number => {
  switch (gap) {
    case 'narrow':
      return 16
    case 'wide':
      return 40
    case 'standard':
      return 24
    default:
      return gap
  }
}

/**
 * MultiColumnLayout provides CSS columns for magazine-style text flow.
 *
 * This layout pattern is ideal for:
 * - Magazine articles with flowing text
 * - Print layouts adapted for web
 * - Text-heavy content like legal documents
 * - Newspaper-style multi-column articles
 * - Content that benefits from shorter line lengths
 *
 * The layout uses CSS `column-count` and `column-gap` for true multi-column
 * text flow, where content automatically flows from one column to the next.
 *
 * @param props - The component props.
 * @returns A multi-column layout container.
 *
 * @example
 * // Basic three-column layout
 * <MultiColumnLayout>
 *   <Typography>Long text content that flows across columns...</Typography>
 * </MultiColumnLayout>
 *
 * @example
 * // Magazine layout with column rules
 * <MultiColumnLayout columnCount={4} columnRule>
 *   <Typography>Article content...</Typography>
 * </MultiColumnLayout>
 *
 * @example
 * // Auto columns based on minimum width
 * <MultiColumnLayout columnCount="auto" minColumnWidth={300}>
 *   <Typography>Responsive column content...</Typography>
 * </MultiColumnLayout>
 */
const MultiColumnLayout: React.FC<MultiColumnLayoutProps> = ({
  children,
  columnCount = 3,
  columnGap = 'standard',
  minColumnWidth = 250,
  columnRule = false,
  columnRuleColor,
  maxWidth = 'lg',
  padding = 3,
  balanceColumns = true,
  preventBreakInside = true,
  sx,
}) => {
  const theme = useTheme()
  const resolvedGap = resolveColumnGap(columnGap)
  const ruleColor = columnRuleColor || theme.palette.divider

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
            columnCount: columnCount === 'auto' ? undefined : columnCount,
            columnWidth: columnCount === 'auto' ? minColumnWidth : undefined,
            columnGap: `${resolvedGap}px`,
            columnFill: balanceColumns ? 'balance' : 'auto',
            ...(columnRule && {
              columnRule: `1px solid ${ruleColor}`,
            }),
            ...(preventBreakInside && {
              '& > *': {
                breakInside: 'avoid',
              },
              '& img, & figure, & blockquote, & pre, & .no-break': {
                breakInside: 'avoid',
              },
            }),
            // Responsive behavior
            [theme.breakpoints.down('md')]: {
              columnCount:
                columnCount === 'auto'
                  ? undefined
                  : Math.min(Number(columnCount), 2),
            },
            [theme.breakpoints.down('sm')]: {
              columnCount: 1,
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}

export default MultiColumnLayout

// ============================================================================
// Real-World Example Components
// ============================================================================

/**
 * Section type for magazine article.
 */
interface ArticleSection {
  type: 'heading' | 'paragraph' | 'quote' | 'image' | 'dropcap'
  content: string
  author?: string
}

/**
 * Props for the MagazineArticle example component.
 */
export interface MagazineArticleProps {
  /**
   * Article title.
   */
  title?: string
  /**
   * Article subtitle.
   */
  subtitle?: string
  /**
   * Author name.
   */
  author?: string
  /**
   * Publication date.
   */
  date?: string
  /**
   * Article sections.
   */
  sections?: ArticleSection[]
  /**
   * Number of columns.
   */
  columnCount?: ColumnCount
  /**
   * Whether to show column rules.
   */
  showRules?: boolean
}

/**
 * MagazineArticle demonstrates a real-world multi-column layout for magazine-style content.
 *
 * This example showcases:
 * - Multi-column text flow
 * - Drop caps for article starts
 * - Pull quotes that span columns
 * - Column rules for visual separation
 * - Responsive column reduction
 *
 * @param props - The article props.
 * @returns A complete magazine article layout.
 *
 * @example
 * <MagazineArticle
 *   title="The Art of Typography"
 *   author="Jane Designer"
 *   columnCount={3}
 *   showRules
 * />
 */
export const MagazineArticle: React.FC<MagazineArticleProps> = ({
  title = 'The Evolution of Web Typography',
  subtitle = 'How modern CSS transformed the way we read on screens',
  author = 'Emily Chen',
  date = 'December 2025',
  sections = [
    {
      type: 'dropcap',
      content:
        'Typography on the web has undergone a remarkable transformation over the past decade. What was once a landscape dominated by a handful of web-safe fonts has blossomed into a rich typographic playground, thanks to advances in CSS and the widespread adoption of web fonts.',
    },
    {
      type: 'paragraph',
      content:
        'The introduction of CSS3 brought with it a host of new typographic tools. Properties like text-shadow, letter-spacing, and word-spacing gave designers unprecedented control over the appearance of text. But perhaps the most significant advancement was the @font-face rule, which allowed designers to embed custom fonts directly into their websites.',
    },
    {
      type: 'heading',
      content: 'The Rise of Variable Fonts',
    },
    {
      type: 'paragraph',
      content:
        'Variable fonts represent the next evolution in web typography. Instead of requiring multiple font files for different weights and styles, a single variable font file can contain an entire family of typefaces. This not only reduces page load times but also opens up new possibilities for responsive typography.',
    },
    {
      type: 'quote',
      content:
        'Variable fonts are to typography what responsive design was to layout. They give us the flexibility to adapt type to any context.',
      author: 'Tim Brown, Head of Typography at Adobe',
    },
    {
      type: 'paragraph',
      content:
        'With variable fonts, designers can now create smooth transitions between font weights, widths, and other axes. Imagine text that becomes bolder as the user scrolls, or type that subtly adjusts its weight based on the ambient light conditions detected by the device.',
    },
    {
      type: 'heading',
      content: 'Readability in the Digital Age',
    },
    {
      type: 'paragraph',
      content:
        'As screens have become our primary reading medium, the importance of digital readability cannot be overstated. Research has shown that proper line length, adequate line height, and appropriate font size significantly impact reading comprehension and reduce eye strain.',
    },
    {
      type: 'paragraph',
      content:
        'The ideal line length for body text is generally considered to be between 45 and 75 characters. Multi-column layouts, like the one you are reading now, help achieve this optimal line length even on wider screens, making content more comfortable to read.',
    },
    {
      type: 'paragraph',
      content:
        'Color contrast is another crucial factor in digital readability. The Web Content Accessibility Guidelines (WCAG) recommend a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. These guidelines help ensure that content is readable for users with visual impairments.',
    },
    {
      type: 'heading',
      content: 'The Future of Web Typography',
    },
    {
      type: 'paragraph',
      content:
        'Looking ahead, the future of web typography appears bright. Emerging technologies like CSS Houdini promise even greater control over text rendering. Meanwhile, advances in artificial intelligence are making it possible to automatically optimize typography based on content type and user preferences.',
    },
    {
      type: 'paragraph',
      content:
        'As we continue to spend more time reading on screens, the importance of thoughtful typography will only grow. The best web typography does not call attention to itself. Instead, it creates an invisible framework that makes content effortless to read and understand.',
    },
    {
      type: 'quote',
      content:
        'Good typography is invisible. Great typography is unforgettable.',
      author: 'Unknown',
    },
    {
      type: 'paragraph',
      content:
        'Whether you are designing a news website, an e-commerce platform, or a personal blog, investing in quality typography pays dividends in user engagement and satisfaction. The tools are more powerful than ever. The fonts are more beautiful than ever. The only limit is our imagination.',
    },
  ],
  columnCount = 3,
  showRules = true,
}) => {
  const theme = useTheme()

  return (
    <Box>
      {/* Article Header */}
      <Container maxWidth="lg" sx={{ pt: 6, pb: 4, textAlign: 'center' }}>
        <Typography
          variant="overline"
          color="primary"
          sx={{ letterSpacing: 3, mb: 2, display: 'block' }}
        >
          Design & Technology
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By <strong>{author}</strong> | {date}
        </Typography>
      </Container>

      <Divider />

      {/* Multi-Column Content */}
      <MultiColumnLayout
        columnCount={columnCount}
        columnGap="wide"
        columnRule={showRules}
        padding={4}
      >
        {sections.map((section, index) => {
          switch (section.type) {
            case 'dropcap':
              return (
                <Typography
                  key={index}
                  paragraph
                  sx={{
                    '&::first-letter': {
                      float: 'left',
                      fontSize: '4rem',
                      lineHeight: 0.8,
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mr: 1,
                      mt: 0.5,
                    },
                    lineHeight: 1.8,
                    textAlign: 'justify',
                  }}
                >
                  {section.content}
                </Typography>
              )
            case 'heading':
              return (
                <Typography
                  key={index}
                  variant="h5"
                  component="h2"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontWeight: 600,
                    breakAfter: 'avoid',
                  }}
                >
                  {section.content}
                </Typography>
              )
            case 'quote':
              return (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    my: 3,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    bgcolor: theme.palette.grey[50],
                    ...(theme.palette.mode === 'dark' && {
                      bgcolor: theme.palette.grey[900],
                    }),
                    breakInside: 'avoid',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="blockquote"
                    sx={{
                      fontStyle: 'italic',
                      mb: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    "{section.content}"
                  </Typography>
                  {section.author && (
                    <Typography variant="body2" color="text.secondary">
                      — {section.author}
                    </Typography>
                  )}
                </Paper>
              )
            case 'paragraph':
            default:
              return (
                <Typography
                  key={index}
                  paragraph
                  sx={{
                    lineHeight: 1.8,
                    textAlign: 'justify',
                    hyphens: 'auto',
                  }}
                >
                  {section.content}
                </Typography>
              )
          }
        })}
      </MultiColumnLayout>

      <Divider />

      {/* Article Footer */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.primary.contrastText,
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            {author.charAt(0)}
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Senior Design Editor specializing in typography and visual design.
              Previously at Type Network and Google Fonts.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
