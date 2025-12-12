import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Button from '@mui/material/Button'
import { expect, userEvent, within } from 'storybook/test'

import CatalogLayout from './CatalogLayout'

import type { CatalogItem, FilterConfig, SortOption } from './CatalogLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * CatalogLayout provides a filterable list with thumbnails for product listings.
 *
 * This layout pattern is essential for any application that displays collections
 * of items that users need to browse, filter, and sort:
 *
 * - **E-commerce**: Product listings with category filters and price sorting
 * - **Media galleries**: Image/video collections with tags and dates
 * - **File managers**: Document browsers with type filters and previews
 * - **Portfolios**: Project showcases with filtering by technology/category
 * - **Search results**: Filterable results with relevance sorting
 *
 * ## Features
 * - Grid and list view toggle
 * - Multiple filter dropdowns
 * - Sort by various criteria
 * - Pagination support
 * - Loading skeletons
 * - Responsive grid columns
 *
 * ## Best Practices
 * - Provide sensible default filters
 * - Show item counts in filter options
 * - Use consistent image aspect ratios
 * - Include clear empty state messages
 *
 * @example
 * ```tsx
 * import { CatalogLayout } from './CatalogLayout'
 *
 * const products = [
 *   { id: '1', title: 'Product', price: '$99', imageUrl: '...' },
 * ]
 *
 * <CatalogLayout
 *   items={products}
 *   filters={[{ id: 'category', label: 'Category', options: [...] }]}
 *   sortOptions={[{ value: 'price', label: 'Price' }]}
 * />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/Catalog',
  component: CatalogLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CatalogLayout provides a filterable list with thumbnails and grid/list toggle.

## Features
- **View modes**: Toggle between grid and list views
- **Filtering**: Multiple filter dropdowns with item counts
- **Sorting**: Customizable sort options
- **Pagination**: Built-in pagination with configurable page size
- **Loading states**: Skeleton placeholders during data fetch
- **Responsive**: Configurable columns for different breakpoints

## Item Configuration
Each catalog item can include:
- \`id\`: Unique identifier
- \`title\`: Item heading
- \`subtitle\`: Secondary text (category, brand)
- \`description\`: Longer description text
- \`imageUrl\`: Thumbnail image
- \`price\`/\`originalPrice\`: Price display with strikethrough
- \`badge\`/\`badgeColor\`: Featured/sale badges
- \`action\`: Custom action element (button, link)

## Use Cases
1. **Product Listings**: E-commerce catalogs
2. **Image Galleries**: Photo/video collections
3. **File Browsers**: Document managers
4. **Portfolios**: Project showcases
5. **Search Results**: Filterable search output
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of catalog items to display',
      table: {
        category: 'Content',
        type: { summary: 'CatalogItem[]' },
      },
    },
    filters: {
      description: 'Filter configuration array',
      table: {
        category: 'Controls',
        type: { summary: 'FilterConfig[]' },
      },
    },
    sortOptions: {
      description: 'Sort options array',
      table: {
        category: 'Controls',
        type: { summary: 'SortOption[]' },
      },
    },
    defaultViewMode: {
      control: 'radio',
      options: ['grid', 'list'],
      description: 'Default view mode',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'grid' },
      },
    },
    showViewToggle: {
      control: 'boolean',
      description: 'Show grid/list toggle',
      table: {
        category: 'Controls',
        defaultValue: { summary: 'true' },
      },
    },
    showSort: {
      control: 'boolean',
      description: 'Show sort dropdown',
      table: {
        category: 'Controls',
        defaultValue: { summary: 'true' },
      },
    },
    showFilters: {
      control: 'boolean',
      description: 'Show filter dropdowns',
      table: {
        category: 'Controls',
        defaultValue: { summary: 'true' },
      },
    },
    itemsPerPage: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Items per page (0 for no pagination)',
      table: {
        category: 'Pagination',
        defaultValue: { summary: '12' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeletons',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Card elevation',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '1' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no items match filters',
      table: {
        category: 'Content',
        defaultValue: { summary: 'No items found' },
      },
    },
    onFilterChange: {
      action: 'filterChanged',
      description: 'Callback when filter changes',
      table: { category: 'Events' },
    },
    onSortChange: {
      action: 'sortChanged',
      description: 'Callback when sort changes',
      table: { category: 'Events' },
    },
    onItemClick: {
      action: 'itemClicked',
      description: 'Callback when item is clicked',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof CatalogLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample product images (placeholder URLs)
const sampleImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=300&fit=crop',
]

// Sample products for stories
const sampleProducts: CatalogItem[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    subtitle: 'Audio',
    description:
      'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    imageUrl: sampleImages[0],
    price: '$199.99',
    originalPrice: '$249.99',
    badge: 'Sale',
    badgeColor: 'error',
  },
  {
    id: '2',
    title: 'Smart Watch Pro',
    subtitle: 'Wearables',
    description: 'Advanced fitness tracking with heart rate monitor and GPS.',
    imageUrl: sampleImages[1],
    price: '$349.99',
    badge: 'New',
    badgeColor: 'primary',
  },
  {
    id: '3',
    title: 'Portable Speaker',
    subtitle: 'Audio',
    description: 'Waterproof Bluetooth speaker with 360-degree sound.',
    imageUrl: sampleImages[2],
    price: '$79.99',
  },
  {
    id: '4',
    title: 'Sunglasses',
    subtitle: 'Accessories',
    description: 'UV400 protection polarized sunglasses with premium frames.',
    imageUrl: sampleImages[3],
    price: '$129.99',
    originalPrice: '$159.99',
    badge: '20% Off',
    badgeColor: 'warning',
  },
  {
    id: '5',
    title: 'Running Shoes',
    subtitle: 'Footwear',
    description: 'Lightweight running shoes with responsive cushioning.',
    imageUrl: sampleImages[4],
    price: '$119.99',
  },
  {
    id: '6',
    title: 'Skincare Set',
    subtitle: 'Beauty',
    description:
      'Complete skincare routine with cleanser, toner, and moisturizer.',
    imageUrl: sampleImages[5],
    price: '$89.99',
    badge: 'Best Seller',
    badgeColor: 'success',
  },
]

// Sample filters
const sampleFilters: FilterConfig[] = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { value: 'audio', label: 'Audio', count: 2 },
      { value: 'wearables', label: 'Wearables', count: 1 },
      { value: 'accessories', label: 'Accessories', count: 1 },
      { value: 'footwear', label: 'Footwear', count: 1 },
      { value: 'beauty', label: 'Beauty', count: 1 },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    options: [
      { value: 'under-100', label: 'Under $100', count: 2 },
      { value: '100-200', label: '$100 - $200', count: 2 },
      { value: 'over-200', label: 'Over $200', count: 2 },
    ],
  },
]

// Sample sort options
const sampleSortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
]

/**
 * Interactive playground for the CatalogLayout component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    items: sampleProducts,
    filters: sampleFilters,
    sortOptions: sampleSortOptions,
    defaultViewMode: 'grid',
    showViewToggle: true,
    showSort: true,
    showFilters: true,
    itemsPerPage: 12,
    loading: false,
    elevation: 1,
    emptyMessage: 'No products found',
  },
}

/**
 * Basic catalog with products and minimal controls.
 */
export const Basic: Story = {
  args: {
    items: sampleProducts,
    showFilters: false,
    showSort: false,
    showViewToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic catalog with grid/list toggle and no filtering or sorting.',
      },
    },
  },
}

/**
 * E-commerce product listing with full features.
 * Demonstrates a real-world shopping page use case.
 */
export const RealWorld: Story = {
  args: {
    items: [],
  },
  render: () => {
    const products: CatalogItem[] = sampleProducts.map((product) => ({
      ...product,
      action: (
        <Button
          variant="contained"
          size="small"
          startIcon={<AddShoppingCartIcon />}
          fullWidth
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          Add to Cart
        </Button>
      ),
    }))

    return (
      <CatalogLayout
        items={products}
        filters={sampleFilters}
        sortOptions={sampleSortOptions}
        defaultSort="featured"
        itemsPerPage={6}
        gridColumns={{ xs: 1, sm: 2, md: 3 }}
        onItemClick={(item) => console.log('View product:', item.id)}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `
Real-world e-commerce catalog with:
- Category and price range filters
- Multiple sort options
- Add to Cart button on each product
- Sale badges and discounted prices
- Pagination for large catalogs

Click products to view details or use the Add to Cart button.
        `,
      },
    },
  },
}

/**
 * List view mode for detailed item display.
 */
export const ListView: Story = {
  args: {
    items: sampleProducts,
    defaultViewMode: 'list',
    filters: sampleFilters,
    sortOptions: sampleSortOptions,
  },
  parameters: {
    docs: {
      description: {
        story:
          'List view provides more space for descriptions and horizontal layout.',
      },
    },
  },
}

/**
 * Loading state with skeleton placeholders.
 */
export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    skeletonCount: 6,
    gridColumns: { xs: 1, sm: 2, md: 3 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton placeholders shown while data is loading.',
      },
    },
  },
}

/**
 * Empty state when no items match filters.
 */
export const EmptyState: Story = {
  args: {
    items: [],
    filters: sampleFilters,
    emptyMessage:
      'No products match your filters. Try adjusting your search criteria.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with helpful message when no items are found.',
      },
    },
  },
}

/**
 * Catalog with pagination for large datasets.
 */
export const WithPagination: Story = {
  args: {
    items: Array.from({ length: 24 }, (_, i) => ({
      id: `product-${i + 1}`,
      title: `Product ${i + 1}`,
      subtitle: `Category ${(i % 4) + 1}`,
      description: `Description for product ${i + 1}. Great quality and value.`,
      imageUrl: sampleImages[i % sampleImages.length],
      price: `$${(Math.random() * 200 + 50).toFixed(2)}`,
    })),
    itemsPerPage: 8,
    gridColumns: { xs: 1, sm: 2, md: 4 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pagination appears automatically when items exceed the page size.',
      },
    },
  },
}

/**
 * Catalog without images.
 */
export const NoImages: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    items: sampleProducts.map(({ imageUrl, ...rest }) => rest),
    showFilters: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Catalog items without images, useful for text-based listings.',
      },
    },
  },
}

/**
 * Compact grid with more columns.
 */
export const CompactGrid: Story = {
  args: {
    items: sampleProducts,
    gridColumns: { xs: 2, sm: 3, md: 4, lg: 6 },
    elevation: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact grid layout with smaller cards and no elevation.',
      },
    },
  },
}

/**
 * Interaction test: Verifies view toggle and filter functionality.
 */
export const InteractionTest: Story = {
  args: {
    items: sampleProducts.slice(0, 3),
    filters: [
      {
        id: 'test-category',
        label: 'Category',
        options: [
          { value: 'audio', label: 'Audio' },
          { value: 'wearables', label: 'Wearables' },
        ],
      },
    ],
    showViewToggle: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify items are displayed
    const firstProduct = canvas.getByText('Wireless Headphones')
    await expect(firstProduct).toBeInTheDocument()

    // Verify item count is shown
    const itemCount = canvas.getByText(/3 items/i)
    await expect(itemCount).toBeInTheDocument()

    // Find and click the list view toggle
    const listViewButton = canvas.getByRole('button', { name: /list view/i })
    await expect(listViewButton).toBeInTheDocument()

    await userEvent.click(listViewButton)

    // Verify the button is now pressed (selected)
    await expect(listViewButton).toHaveAttribute('aria-pressed', 'true')

    // Switch back to grid view
    const gridViewButton = canvas.getByRole('button', { name: /grid view/i })
    await userEvent.click(gridViewButton)

    await expect(gridViewButton).toHaveAttribute('aria-pressed', 'true')
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test verifying view toggle and item display.',
      },
    },
  },
}
