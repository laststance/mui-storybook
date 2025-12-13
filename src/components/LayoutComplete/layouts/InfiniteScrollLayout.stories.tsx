import LocationOnIcon from '@mui/icons-material/LocationOn'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { useCallback, useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import InfiniteScrollLayout from './InfiniteScrollLayout'

import type { InfiniteScrollItem } from './InfiniteScrollLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * InfiniteScrollLayout provides continuous content loading as users scroll.
 *
 * ## Use Cases
 * - **Search Results Pages**: Paginated results with relevance scoring
 * - **Activity Feeds**: Chronological content loading
 * - **Product Listings**: E-commerce with lazy loading
 * - **Content Discovery**: Explore interfaces with endless scroll
 *
 * ## Key Features
 * - Intersection Observer-based loading detection
 * - Configurable load threshold for prefetching
 * - Skeleton placeholders during loading
 * - Built-in search functionality
 * - Accessible feed navigation
 *
 * @example
 * ```tsx
 * import { InfiniteScrollLayout } from './InfiniteScrollLayout'
 *
 * const [items, setItems] = useState<InfiniteScrollItem[]>([])
 * const [isLoading, setIsLoading] = useState(false)
 *
 * const loadMore = async () => {
 *   setIsLoading(true)
 *   const newItems = await fetchItems()
 *   setItems(prev => [...prev, ...newItems])
 *   setIsLoading(false)
 * }
 *
 * <InfiniteScrollLayout
 *   items={items}
 *   isLoading={isLoading}
 *   onLoadMore={loadMore}
 * />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/InfiniteScroll',
  component: InfiniteScrollLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
InfiniteScrollLayout enables continuous content loading using Intersection Observer for efficient scroll detection.

## When to Use
- Displaying large datasets without pagination controls
- Building activity or news feeds
- Creating search results interfaces
- Implementing product listing pages

## Implementation Details
- Uses Intersection Observer for efficient scroll detection
- Configurable threshold for prefetch timing
- Skeleton loading states for smooth UX
- Built-in search with callback support

## Accessibility
- Proper ARIA attributes for feed navigation
- Loading state announcements
- Keyboard navigation support
- Screen reader friendly result counts

## Performance
- Efficient re-renders with proper memoization
- Lazy loading only when approaching end
- Configurable prefetch threshold
- Optimized skeleton rendering
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of items to display',
      control: false,
      table: { category: 'Content' },
    },
    hasMore: {
      description: 'Whether more items are available to load',
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'true' },
      },
    },
    isLoading: {
      description: 'Whether items are currently being loaded',
      control: 'boolean',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    onLoadMore: {
      description: 'Callback to load more items',
      action: 'onLoadMore',
      table: { category: 'Events' },
    },
    loadThreshold: {
      description: 'Threshold in pixels before the end to trigger loading',
      control: { type: 'range', min: 50, max: 500 },
      table: {
        category: 'Behavior',
        defaultValue: { summary: '200' },
      },
    },
    skeletonCount: {
      description: 'Number of skeleton placeholders while loading',
      control: { type: 'range', min: 1, max: 10 },
      table: {
        category: 'Display',
        defaultValue: { summary: '3' },
      },
    },
    showSearch: {
      description: 'Whether to show a search input',
      control: 'boolean',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    searchPlaceholder: {
      description: 'Placeholder text for the search input',
      control: 'text',
      table: {
        category: 'Display',
        defaultValue: { summary: 'Search...' },
      },
    },
    onSearch: {
      description: 'Callback when search query changes',
      action: 'onSearch',
      table: { category: 'Events' },
    },
    totalCount: {
      description: 'Total count of items for display',
      control: 'number',
      table: { category: 'Display' },
    },
    onItemClick: {
      description: 'Callback when an item is clicked',
      action: 'onItemClick',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof InfiniteScrollLayout>

export default meta
type Story = StoryObj<typeof meta>

// Generate sample items
const generateItems = (count: number, startIndex = 0): InfiniteScrollItem[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: `item-${startIndex + i}`,
    title: `Search Result ${startIndex + i + 1}`,
    description: `This is a detailed description for search result ${startIndex + i + 1}. It contains relevant information about the item that helps users understand what they will find.`,
    category: ['Technology', 'Business', 'Science', 'Design'][i % 4],
    tags: [
      ['React', 'JavaScript'],
      ['Strategy', 'Growth'],
      ['Research', 'Innovation'],
      ['UI', 'UX'],
    ][i % 4],
    relevance: Math.max(40, 100 - (startIndex + i) * 5),
    metadata: [
      { label: 'Updated', value: `${(i % 7) + 1} days ago` },
      {
        label: 'Views',
        value: Math.floor(Math.random() * 10000).toLocaleString(),
      },
    ],
  }))

const sampleItems = generateItems(5)

/**
 * Interactive playground for the InfiniteScrollLayout component.
 * Use the Controls panel to experiment with all configuration options.
 *
 * @example
 * ```tsx
 * <InfiniteScrollLayout
 *   items={items}
 *   hasMore={true}
 *   isLoading={false}
 *   showSearch={true}
 *   totalCount={100}
 * />
 * ```
 */
export const Playground: Story = {
  args: {
    items: sampleItems,
    hasMore: true,
    isLoading: false,
    loadThreshold: 200,
    skeletonCount: 3,
    showSearch: true,
    searchPlaceholder: 'Search results...',
    totalCount: 156,
    onLoadMore: fn(),
    onSearch: fn(),
    onItemClick: fn(),
  },
}

/**
 * Basic usage showing a simple list of items.
 */
export const Basic: Story = {
  args: {
    items: generateItems(3),
    hasMore: true,
    showSearch: false,
    onLoadMore: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic implementation with a simple list of items and infinite scroll enabled.',
      },
    },
  },
}

/**
 * Production-ready search results page with all features.
 * Demonstrates a complete implementation with search, filtering, and relevance scoring.
 */
export const RealWorld: Story = {
  args: {
    items: [],
  },
  render: function RealWorldStory() {
    const [items, setItems] = useState<InfiniteScrollItem[]>([
      {
        id: 'job-1',
        title: 'Senior React Developer',
        description:
          'We are looking for an experienced React developer to join our growing team. You will work on cutting-edge projects using React 19, TypeScript, and modern tooling.',
        category: 'Engineering',
        tags: ['React', 'TypeScript', 'Remote'],
        relevance: 95,
        metadata: [
          { label: 'Location', value: 'Remote' },
          { label: 'Salary', value: '$150K - $200K' },
        ],
        customContent: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              San Francisco, CA (Remote-first)
            </Typography>
          </Box>
        ),
      },
      {
        id: 'job-2',
        title: 'Product Designer',
        description:
          'Join our design team to create beautiful and intuitive user experiences. Experience with Figma, design systems, and user research required.',
        category: 'Design',
        tags: ['UI/UX', 'Figma', 'Hybrid'],
        relevance: 88,
        metadata: [
          { label: 'Location', value: 'New York' },
          { label: 'Salary', value: '$120K - $160K' },
        ],
        customContent: (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={4.5} precision={0.5} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                4.5 (128 reviews)
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        id: 'job-3',
        title: 'DevOps Engineer',
        description:
          'Help us scale our infrastructure to millions of users. Experience with Kubernetes, AWS, and CI/CD pipelines is essential.',
        category: 'Infrastructure',
        tags: ['Kubernetes', 'AWS', 'On-site'],
        relevance: 82,
        metadata: [
          { label: 'Location', value: 'Seattle' },
          { label: 'Salary', value: '$140K - $180K' },
        ],
      },
      {
        id: 'job-4',
        title: 'Data Scientist',
        description:
          'Work with our data team to build ML models and extract insights from large datasets. Python and ML framework experience required.',
        category: 'Data',
        tags: ['Python', 'ML', 'Remote'],
        relevance: 75,
        metadata: [
          { label: 'Location', value: 'Remote' },
          { label: 'Salary', value: '$130K - $170K' },
        ],
      },
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const loadMore = useCallback(() => {
      if (isLoading) return
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        if (page >= 3) {
          setHasMore(false)
        } else {
          const newItems: InfiniteScrollItem[] = [
            {
              id: `job-${page * 4 + 1}`,
              title: 'Frontend Engineer',
              description:
                'Build responsive web applications using modern JavaScript frameworks.',
              category: 'Engineering',
              tags: ['JavaScript', 'CSS', 'Remote'],
              relevance: 70 - page * 5,
              metadata: [
                { label: 'Location', value: 'Austin' },
                { label: 'Salary', value: '$110K - $150K' },
              ],
            },
            {
              id: `job-${page * 4 + 2}`,
              title: 'Backend Developer',
              description:
                'Design and implement scalable backend services using Node.js and databases.',
              category: 'Engineering',
              tags: ['Node.js', 'PostgreSQL', 'Hybrid'],
              relevance: 65 - page * 5,
              metadata: [
                { label: 'Location', value: 'Denver' },
                { label: 'Salary', value: '$120K - $160K' },
              ],
            },
          ]
          setItems((prev) => [...prev, ...newItems])
          setPage((p) => p + 1)
        }
        setIsLoading(false)
      }, 1500)
    }, [isLoading, page])

    const handleSearch = useCallback((query: string) => {
      console.log('Searching for:', query)
    }, [])

    return (
      <InfiniteScrollLayout
        items={items}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={loadMore}
        showSearch={true}
        searchPlaceholder="Search jobs..."
        totalCount={items.length}
        onSearch={handleSearch}
        onItemClick={(id) => console.log('Clicked:', id)}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
A production-ready job search results page featuring:
- **Search Integration**: Real-time search with result count
- **Relevance Scoring**: Visual indicators for result matching
- **Rich Metadata**: Salary, location, and company ratings
- **Custom Content**: Additional UI elements per result
- **Infinite Loading**: Automatic pagination on scroll

This demonstrates how to build a complete search interface using the InfiniteScrollLayout component.
        `,
      },
    },
  },
}

/**
 * Interaction test story that verifies search and loading functionality.
 */
export const InteractionTest: Story = {
  args: {
    items: sampleItems,
    hasMore: true,
    isLoading: false,
    showSearch: true,
    totalCount: 156,
    onLoadMore: fn(),
    onSearch: fn(),
    onItemClick: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('Verify layout renders correctly', async () => {
      const layout = canvas.getByTestId('infinite-scroll-layout')
      await expect(layout).toBeInTheDocument()
    })

    await step('Verify items are displayed', async () => {
      const firstItem = canvas.getByTestId('item-item-0')
      await expect(firstItem).toBeInTheDocument()

      const title = canvas.getByText('Search Result 1')
      await expect(title).toBeInTheDocument()
    })

    await step('Test search input', async () => {
      const searchInput = canvas.getByRole('textbox', { name: /search/i })
      await expect(searchInput).toBeInTheDocument()

      await userEvent.type(searchInput, 'test query')
      await expect(args.onSearch).toHaveBeenCalled()
    })

    await step('Verify total count display', async () => {
      const countText = canvas.getByText(/156 results found/i)
      await expect(countText).toBeInTheDocument()
    })

    await step('Test item click', async () => {
      const firstItem = canvas.getByTestId('item-item-0')
      await userEvent.click(firstItem)
      await expect(args.onItemClick).toHaveBeenCalledWith('item-0')
    })

    await step('Verify relevance chips are displayed', async () => {
      const relevanceChips = canvas.getAllByText(/%\s*match/i)
      await expect(relevanceChips.length).toBeGreaterThan(0)
    })
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests search functionality, item interactions, and proper rendering.',
      },
    },
  },
}

/**
 * Loading state with skeleton placeholders.
 */
export const LoadingState: Story = {
  args: {
    items: generateItems(3),
    hasMore: true,
    isLoading: true,
    skeletonCount: 3,
    showSearch: true,
    totalCount: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the loading state with skeleton placeholders and loading indicator.',
      },
    },
  },
}

/**
 * Empty state when no results are found.
 */
export const EmptyState: Story = {
  args: {
    items: [],
    hasMore: false,
    isLoading: false,
    showSearch: true,
    searchPlaceholder: 'Search products...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the empty state when no results match the search criteria.',
      },
    },
  },
}

/**
 * End of results state.
 */
export const EndOfResults: Story = {
  args: {
    items: generateItems(5),
    hasMore: false,
    isLoading: false,
    showSearch: true,
    totalCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the end of results message when all items have been loaded.',
      },
    },
  },
}

/**
 * Without search functionality.
 */
export const WithoutSearch: Story = {
  args: {
    items: sampleItems,
    hasMore: true,
    isLoading: false,
    showSearch: false,
    onLoadMore: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Layout without the search input for simpler feed-style interfaces.',
      },
    },
  },
}
