import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { expect, fn, userEvent, within } from 'storybook/test'

import CardBasedLayout from './CardBasedLayout'

import type { CardItem } from './CardBasedLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * CardBasedLayout displays self-contained content cards in various arrangements.
 *
 * ## Use Cases
 * - **Social Media Feeds**: Posts with likes, comments, and shares
 * - **Blog/Article Listings**: Content previews with authors
 * - **Product Catalogs**: Item cards with images and details
 * - **News Aggregators**: Story cards with sources and timestamps
 *
 * ## Key Features
 * - Feed, Grid, and Masonry layout variants
 * - Interactive actions (like, comment, share)
 * - Author information with avatars
 * - Tag support for categorization
 * - Responsive column configuration
 *
 * @example
 * ```tsx
 * import { CardBasedLayout } from './CardBasedLayout'
 *
 * const cards = [
 *   {
 *     id: '1',
 *     title: 'My Post',
 *     content: 'Content here...',
 *     author: { name: 'John', timestamp: '2 hours ago' }
 *   }
 * ]
 *
 * <CardBasedLayout cards={cards} variant="feed" />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/CardBased',
  component: CardBasedLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CardBasedLayout provides a flexible system for displaying content cards in various arrangements.

## When to Use
- Displaying collections of similar content items
- Building social media-style feeds
- Creating product or article listings
- Showing user-generated content

## Layout Variants
- **Feed**: Single column, centered, social media style
- **Grid**: Multi-column grid with equal card heights
- **Masonry**: Pinterest-style staggered layout

## Accessibility
- Cards can be interactive with keyboard support
- Action buttons have proper ARIA labels
- Visual hierarchy maintained with semantic headings
- Focus indicators for interactive elements

## Performance
- Efficient rendering with proper keys
- Lazy loading support for images
- Minimal re-renders with callback memoization
        `,
      },
    },
  },
  argTypes: {
    cards: {
      description: 'Array of card items to display',
      control: false,
      table: { category: 'Content' },
    },
    variant: {
      description: 'Layout variant for the cards',
      control: 'select',
      options: ['feed', 'grid', 'masonry'],
      table: {
        category: 'Layout',
        defaultValue: { summary: 'feed' },
      },
    },
    columns: {
      description: 'Number of columns for grid/masonry layout',
      control: { type: 'range', min: 1, max: 4 },
      table: {
        category: 'Layout',
        defaultValue: { summary: '2' },
      },
    },
    gap: {
      description: 'Gap between cards in pixels',
      control: { type: 'range', min: 8, max: 32 },
      table: {
        category: 'Layout',
        defaultValue: { summary: '16' },
      },
    },
    showActions: {
      description: 'Whether to show card actions (like, comment, share)',
      control: 'boolean',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    showAuthor: {
      description: 'Whether to show author information',
      control: 'boolean',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    onAction: {
      description: 'Callback when a card action is triggered',
      action: 'onAction',
      table: { category: 'Events' },
    },
    onCardClick: {
      description: 'Callback when a card is clicked',
      action: 'onCardClick',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof CardBasedLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample cards for stories
const sampleCards: CardItem[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    content:
      'React 19 introduces exciting new features including improved concurrent rendering, automatic batching, and the new use() hook. This article covers everything you need to know to get started.',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    author: {
      name: 'Sarah Chen',
      timestamp: '2 hours ago',
    },
    tags: ['React', 'JavaScript', 'Tutorial'],
    metrics: { likes: 142, comments: 23, shares: 8 },
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for 2025',
    content:
      'Explore the latest CSS features including container queries, cascade layers, and the new color functions. Learn how to build more maintainable stylesheets.',
    image:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop',
    author: {
      name: 'Alex Rivera',
      timestamp: '5 hours ago',
    },
    tags: ['CSS', 'Web Design', 'Frontend'],
    metrics: { likes: 89, comments: 15, shares: 5 },
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications',
    content:
      'Accessibility is not just a nice-to-have, it is a requirement. This guide walks through the essential practices for building inclusive web experiences.',
    author: {
      name: 'Jordan Kim',
      timestamp: '1 day ago',
    },
    tags: ['Accessibility', 'UX', 'Best Practices'],
    metrics: { likes: 256, comments: 42, shares: 31 },
  },
]

const extendedCards: CardItem[] = [
  ...sampleCards,
  {
    id: '4',
    title: 'TypeScript Best Practices',
    content:
      'Master advanced TypeScript patterns including conditional types, template literals, and proper generic constraints.',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    author: {
      name: 'Emily Watson',
      timestamp: '3 days ago',
    },
    tags: ['TypeScript', 'Programming'],
    metrics: { likes: 312, comments: 56, shares: 22 },
  },
  {
    id: '5',
    title: 'State Management in 2025',
    content:
      'Compare modern state management solutions including Zustand, Jotai, and the latest React server components patterns.',
    author: {
      name: 'Marcus Johnson',
      timestamp: '1 week ago',
    },
    tags: ['State Management', 'React'],
    metrics: { likes: 178, comments: 34, shares: 12 },
  },
  {
    id: '6',
    title: 'Performance Optimization Tips',
    content:
      'Learn how to identify and fix performance bottlenecks in your web applications using modern browser tools.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    author: {
      name: 'Lisa Park',
      timestamp: '2 weeks ago',
    },
    tags: ['Performance', 'Optimization'],
    metrics: { likes: 423, comments: 67, shares: 45 },
  },
]

/**
 * Interactive playground for the CardBasedLayout component.
 * Use the Controls panel to experiment with all configuration options.
 *
 * @example
 * ```tsx
 * <CardBasedLayout
 *   cards={cards}
 *   variant="feed"
 *   showActions={true}
 *   showAuthor={true}
 * />
 * ```
 */
export const Playground: Story = {
  args: {
    cards: sampleCards,
    variant: 'feed',
    columns: 2,
    gap: 16,
    showActions: true,
    showAuthor: true,
    onAction: fn(),
    onCardClick: fn(),
  },
}

/**
 * Basic feed layout showing cards in a single column.
 * The most common layout for social media and blog feeds.
 */
export const Basic: Story = {
  args: {
    cards: sampleCards.slice(0, 2),
    variant: 'feed',
    showActions: true,
    showAuthor: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic feed layout with two cards demonstrating the essential card structure.',
      },
    },
  },
}

/**
 * Production-ready social media feed with all features.
 * Demonstrates a complete implementation with likes, comments, and shares.
 */
export const RealWorld: Story = {
  args: {
    cards: [
      {
        id: 'post-1',
        title: 'Just shipped a new feature!',
        content:
          'Really excited to announce that our team has just released the new dashboard feature. It has been months in the making and we cannot wait to hear your feedback. Check it out and let us know what you think!',
        image:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        author: {
          name: 'Tech Startup',
          avatar:
            'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop',
          timestamp: '30 minutes ago',
        },
        tags: ['Product Update', 'Release'],
        metrics: { likes: 234, comments: 45, shares: 12 },
        isLiked: true,
      },
      {
        id: 'post-2',
        title: 'Weekly Dev Tips',
        content:
          'This week tip: Always use semantic HTML elements. They improve accessibility, SEO, and make your code more maintainable. Replace those div soups with proper article, section, and nav elements!',
        author: {
          name: 'Dev Community',
          avatar:
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
          timestamp: '2 hours ago',
        },
        tags: ['Tips', 'HTML', 'Accessibility'],
        metrics: { likes: 567, comments: 89, shares: 156 },
        customContent: (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Weekly Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ flexGrow: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                75%
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        id: 'post-3',
        title: 'Conference Highlights',
        content:
          'Had an amazing time at the React Conference this year. Met so many talented developers and learned about the future of web development. Here are my top 5 takeaways from the event.',
        image:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
        imageAspect: '16:9',
        author: {
          name: 'Conference Attendee',
          timestamp: '1 day ago',
        },
        tags: ['Conference', 'React', 'Networking'],
        metrics: { likes: 892, comments: 134, shares: 67 },
      },
    ],
    variant: 'feed',
    showActions: true,
    showAuthor: true,
    onAction: fn(),
    onCardClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-ready social media feed featuring:
- **Rich Content**: Posts with images, custom components, and tags
- **Engagement Metrics**: Likes, comments, and shares with counts
- **Author Information**: Avatars, names, and timestamps
- **Interactive Actions**: Like toggle, comment, and share buttons

This demonstrates how to build a complete social feed using the CardBasedLayout component.
        `,
      },
    },
  },
}

/**
 * Interaction test story that verifies card actions and accessibility.
 */
export const InteractionTest: Story = {
  args: {
    cards: sampleCards.slice(0, 2),
    variant: 'feed',
    showActions: true,
    showAuthor: true,
    onAction: fn(),
    onCardClick: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('Verify layout renders correctly', async () => {
      const layout = canvas.getByTestId('card-based-layout')
      await expect(layout).toBeInTheDocument()
    })

    await step('Verify cards are displayed', async () => {
      const card1 = canvas.getByTestId('card-1')
      await expect(card1).toBeInTheDocument()

      const title = canvas.getByText('Getting Started with React 19')
      await expect(title).toBeInTheDocument()
    })

    await step('Test like button interaction', async () => {
      const likeButtons = canvas.getAllByRole('button', { name: /like/i })
      await expect(likeButtons.length).toBeGreaterThan(0)

      await userEvent.click(likeButtons[0])
      await expect(args.onAction).toHaveBeenCalledWith('1', 'like')
    })

    await step('Test comment button interaction', async () => {
      const commentButtons = canvas.getAllByRole('button', { name: /comment/i })
      await expect(commentButtons.length).toBeGreaterThan(0)

      await userEvent.click(commentButtons[0])
      await expect(args.onAction).toHaveBeenCalledWith('1', 'comment')
    })

    await step('Test share button interaction', async () => {
      const shareButtons = canvas.getAllByRole('button', { name: /share/i })
      await expect(shareButtons.length).toBeGreaterThan(0)

      await userEvent.click(shareButtons[0])
      await expect(args.onAction).toHaveBeenCalledWith('1', 'share')
    })

    await step('Verify author information is displayed', async () => {
      const authorName = canvas.getByText('Sarah Chen')
      await expect(authorName).toBeInTheDocument()
    })
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests card interactions including like, comment, and share actions.',
      },
    },
  },
}

/**
 * Grid layout with multiple columns for catalog-style displays.
 */
export const GridLayout: Story = {
  args: {
    cards: extendedCards,
    variant: 'grid',
    columns: 3,
    gap: 24,
    showActions: true,
    showAuthor: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Grid layout with three columns, ideal for product catalogs and article listings.',
      },
    },
  },
}

/**
 * Masonry layout for varied content heights.
 */
export const MasonryLayout: Story = {
  args: {
    cards: extendedCards,
    variant: 'masonry',
    columns: 3,
    gap: 16,
    showActions: true,
    showAuthor: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pinterest-style masonry layout that accommodates varying card heights.',
      },
    },
  },
}

/**
 * Minimal cards without author information and actions.
 */
export const MinimalCards: Story = {
  args: {
    cards: sampleCards,
    variant: 'grid',
    columns: 2,
    showActions: false,
    showAuthor: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal card display without author info or action buttons for clean presentations.',
      },
    },
  },
}

/**
 * Cards with click handlers for navigation.
 */
export const ClickableCards: Story = {
  args: {
    cards: sampleCards,
    variant: 'grid',
    columns: 2,
    showActions: false,
    onCardClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cards with click handlers for navigation to detail pages. Includes hover effects and keyboard accessibility.',
      },
    },
  },
}
