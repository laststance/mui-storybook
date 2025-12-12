import { expect, userEvent, within } from 'storybook/test'

import ComparisonLayout from './ComparisonLayout'

import type { ComparisonFeature, ComparisonOption } from './ComparisonLayout'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * ComparisonLayout provides side-by-side feature and pricing comparison tables.
 *
 * This layout pattern is essential for helping users make informed decisions
 * by comparing multiple options at a glance:
 *
 * - **SaaS pricing pages**: Plan tier comparisons with features and pricing
 * - **Product comparisons**: Spec sheets comparing similar products
 * - **Service packages**: Different service levels and what they include
 * - **Tool evaluations**: Comparing software or vendor capabilities
 * - **Subscription tiers**: Free vs Pro vs Enterprise features
 *
 * ## Features
 * - Highlighted/recommended option column
 * - Sticky headers and first column
 * - Boolean values as check/cross icons
 * - Category grouping for features
 * - CTA buttons with callbacks
 * - Responsive design
 *
 * ## Accessibility
 * - Proper table semantics
 * - Clear visual hierarchy
 * - Tooltips for feature descriptions
 * - Keyboard navigable CTAs
 *
 * @example
 * ```tsx
 * import { ComparisonLayout } from './ComparisonLayout'
 *
 * const options = [
 *   { id: 'basic', name: 'Basic', price: '$9', pricePeriod: '/mo' },
 *   { id: 'pro', name: 'Pro', price: '$29', highlighted: true },
 * ]
 *
 * const features = [
 *   { id: 'users', name: 'Users', values: { basic: '1', pro: '10' } },
 * ]
 *
 * <ComparisonLayout options={options} features={features} />
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/Comparison',
  component: ComparisonLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ComparisonLayout provides side-by-side comparison tables for pricing and features.

## Features
- **Highlighted options**: Visually emphasize recommended choice
- **Sticky navigation**: Keep headers and feature column visible
- **Boolean icons**: Check/cross icons for feature availability
- **Category grouping**: Organize features into logical groups
- **CTA buttons**: Call-to-action buttons with click handlers
- **Responsive**: Adapts to different screen sizes

## Option Configuration
Each option (column) can include:
- \`id\`: Unique identifier
- \`name\`: Display name (e.g., "Pro Plan")
- \`subtitle\`: Tagline or description
- \`price\`/\`pricePeriod\`: Pricing display
- \`originalPrice\`: Strikethrough price for discounts
- \`highlighted\`: Make this the recommended option
- \`badge\`: "Most Popular", "Best Value", etc.
- \`ctaText\`/\`ctaVariant\`: Call-to-action button

## Feature Configuration
Each feature (row) includes:
- \`id\`: Unique identifier
- \`name\`: Feature display name
- \`description\`: Tooltip text
- \`category\`: For grouping
- \`values\`: Object mapping option IDs to values

## Use Cases
1. **SaaS Pricing**: Plan comparisons
2. **Product Specs**: Feature matrices
3. **Service Tiers**: Package comparisons
4. **Tool Evaluation**: Vendor comparisons
        `,
      },
    },
  },
  argTypes: {
    options: {
      description: 'Comparison options (columns)',
      table: {
        category: 'Content',
        type: { summary: 'ComparisonOption[]' },
      },
    },
    features: {
      description: 'Features to compare (rows)',
      table: {
        category: 'Content',
        type: { summary: 'ComparisonFeature[]' },
      },
    },
    title: {
      control: 'text',
      description: 'Title for the comparison table',
      table: {
        category: 'Content',
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle or description',
      table: {
        category: 'Content',
      },
    },
    groupByCategory: {
      control: 'boolean',
      description: 'Group features by category',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    stickyFirstColumn: {
      control: 'boolean',
      description: 'Make feature column sticky',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Make header row sticky',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    maxHeight: {
      control: { type: 'number', min: 300, max: 800 },
      description: 'Maximum height for scrollable container',
      table: {
        category: 'Layout',
      },
    },
    showIcons: {
      control: 'boolean',
      description: 'Show check/cross icons for booleans',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'true' },
      },
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24 },
      description: 'Paper elevation',
      table: {
        category: 'Appearance',
        defaultValue: { summary: '0' },
      },
    },
    dense: {
      control: 'boolean',
      description: 'Use dense table styling',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    onCtaClick: {
      action: 'ctaClicked',
      description: 'Callback when CTA button is clicked',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof ComparisonLayout>

export default meta
type Story = StoryObj<typeof meta>

// Sample pricing options
const pricingOptions: ComparisonOption[] = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'For individuals',
    price: '$0',
    pricePeriod: '/month',
    ctaText: 'Get Started',
    ctaVariant: 'outlined',
  },
  {
    id: 'pro',
    name: 'Professional',
    subtitle: 'For growing teams',
    price: '$29',
    pricePeriod: '/month',
    originalPrice: '$49',
    highlighted: true,
    badge: 'Most Popular',
    badgeColor: 'primary',
    ctaText: 'Start Free Trial',
    ctaVariant: 'contained',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    subtitle: 'For large organizations',
    price: 'Custom',
    ctaText: 'Contact Sales',
    ctaVariant: 'outlined',
  },
]

// Sample features
const pricingFeatures: ComparisonFeature[] = [
  {
    id: 'users',
    name: 'Team members',
    description: 'Number of users who can access the platform',
    category: 'Usage',
    values: { starter: '1', pro: '10', enterprise: 'Unlimited' },
  },
  {
    id: 'storage',
    name: 'Storage',
    description: 'Cloud storage for files and assets',
    category: 'Usage',
    values: { starter: '1 GB', pro: '100 GB', enterprise: '1 TB' },
  },
  {
    id: 'projects',
    name: 'Projects',
    category: 'Usage',
    values: { starter: '3', pro: '50', enterprise: 'Unlimited' },
  },
  {
    id: 'api',
    name: 'API Access',
    description: 'Programmatic access to platform features',
    category: 'Features',
    values: { starter: false, pro: true, enterprise: true },
  },
  {
    id: 'sso',
    name: 'Single Sign-On (SSO)',
    description: 'Enterprise authentication integration',
    category: 'Features',
    values: { starter: false, pro: false, enterprise: true },
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    category: 'Features',
    values: { starter: false, pro: true, enterprise: true },
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Customer support response time',
    category: 'Support',
    values: { starter: 'Community', pro: '24-hour', enterprise: 'Priority' },
  },
  {
    id: 'sla',
    name: 'SLA',
    description: 'Service Level Agreement guarantee',
    category: 'Support',
    values: { starter: false, pro: '99.9%', enterprise: '99.99%' },
  },
  {
    id: 'training',
    name: 'Training',
    category: 'Support',
    values: { starter: 'Docs', pro: 'Webinars', enterprise: 'Dedicated' },
  },
]

/**
 * Interactive playground for the ComparisonLayout component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    options: pricingOptions,
    features: pricingFeatures,
    title: 'Choose Your Plan',
    subtitle: 'Start free and scale as you grow',
    groupByCategory: false,
    stickyFirstColumn: true,
    stickyHeader: true,
    showIcons: true,
    elevation: 0,
    dense: false,
  },
}

/**
 * Basic pricing comparison with three tiers.
 */
export const Basic: Story = {
  args: {
    options: pricingOptions,
    features: pricingFeatures.slice(0, 4),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic comparison table with pricing tiers and feature rows.',
      },
    },
  },
}

/**
 * SaaS pricing page with full features and category grouping.
 * Demonstrates a real-world pricing page use case.
 */
export const RealWorld: Story = {
  args: {
    options: pricingOptions,
    features: pricingFeatures,
    title: 'Simple, Transparent Pricing',
    subtitle: 'No hidden fees. Cancel anytime.',
    groupByCategory: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Real-world SaaS pricing page with:
- Three pricing tiers (Starter, Pro, Enterprise)
- Highlighted recommended option with "Most Popular" badge
- Features grouped by category (Usage, Features, Support)
- Strikethrough original price showing discount
- Call-to-action buttons for each plan

The Pro plan is highlighted as the recommended choice.
        `,
      },
    },
  },
}

/**
 * Product specification comparison.
 */
export const ProductComparison: Story = {
  args: {
    options: [
      { id: 'model-a', name: 'Model A', price: '$499' },
      {
        id: 'model-b',
        name: 'Model B',
        price: '$699',
        highlighted: true,
        badge: 'Best Value',
      },
      { id: 'model-c', name: 'Model C', price: '$999' },
    ],
    features: [
      {
        id: 'screen',
        name: 'Screen Size',
        values: { 'model-a': '6.1"', 'model-b': '6.5"', 'model-c': '6.7"' },
      },
      {
        id: 'storage',
        name: 'Storage',
        values: { 'model-a': '128GB', 'model-b': '256GB', 'model-c': '512GB' },
      },
      {
        id: 'camera',
        name: 'Camera',
        values: { 'model-a': '12MP', 'model-b': '48MP', 'model-c': '48MP Pro' },
      },
      {
        id: 'battery',
        name: 'Battery',
        values: {
          'model-a': '3200mAh',
          'model-b': '4000mAh',
          'model-c': '4500mAh',
        },
      },
      {
        id: '5g',
        name: '5G Support',
        values: { 'model-a': false, 'model-b': true, 'model-c': true },
      },
      {
        id: 'wireless',
        name: 'Wireless Charging',
        values: { 'model-a': false, 'model-b': true, 'model-c': true },
      },
    ],
    title: 'Compare Models',
  },
  parameters: {
    docs: {
      description: {
        story: 'Product specification comparison for different model variants.',
      },
    },
  },
}

/**
 * Comparison with category grouping.
 */
export const WithCategories: Story = {
  args: {
    options: pricingOptions.slice(0, 2),
    features: pricingFeatures,
    groupByCategory: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Features organized into categories with section headers.',
      },
    },
  },
}

/**
 * Compact dense table styling.
 */
export const DenseTable: Story = {
  args: {
    options: pricingOptions,
    features: pricingFeatures,
    dense: true,
    elevation: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dense table styling for more compact display.',
      },
    },
  },
}

/**
 * Scrollable table with max height.
 */
export const ScrollableTable: Story = {
  args: {
    options: pricingOptions,
    features: [
      ...pricingFeatures,
      {
        id: 'audit',
        name: 'Audit Logs',
        values: { starter: false, pro: true, enterprise: true },
      },
      {
        id: 'backup',
        name: 'Automatic Backups',
        values: { starter: 'Daily', pro: 'Hourly', enterprise: 'Real-time' },
      },
      {
        id: 'export',
        name: 'Data Export',
        values: { starter: 'CSV', pro: 'CSV, JSON', enterprise: 'All formats' },
      },
      {
        id: 'custom',
        name: 'Custom Branding',
        values: { starter: false, pro: true, enterprise: true },
      },
      {
        id: 'roles',
        name: 'Custom Roles',
        values: { starter: false, pro: false, enterprise: true },
      },
    ],
    maxHeight: 400,
    stickyHeader: true,
    stickyFirstColumn: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Scrollable table with sticky header and first column.',
      },
    },
  },
}

/**
 * Text-only values without icons.
 */
export const TextOnly: Story = {
  args: {
    options: pricingOptions.slice(0, 2),
    features: pricingFeatures.slice(0, 5),
    showIcons: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Boolean values displayed as "Yes"/"No" text instead of icons.',
      },
    },
  },
}

/**
 * Simple two-column comparison.
 */
export const TwoColumnComparison: Story = {
  args: {
    options: [
      { id: 'free', name: 'Free', price: '$0', ctaText: 'Sign Up Free' },
      {
        id: 'premium',
        name: 'Premium',
        price: '$19',
        pricePeriod: '/mo',
        highlighted: true,
        ctaText: 'Go Premium',
      },
    ],
    features: [
      {
        id: 'ads',
        name: 'Ad-free experience',
        values: { free: false, premium: true },
      },
      {
        id: 'downloads',
        name: 'Offline downloads',
        values: { free: false, premium: true },
      },
      {
        id: 'quality',
        name: 'Audio quality',
        values: { free: 'Standard', premium: 'Hi-Fi' },
      },
      {
        id: 'skips',
        name: 'Skip limit',
        values: { free: '6/hour', premium: 'Unlimited' },
      },
    ],
    title: 'Free vs Premium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple two-column comparison for free vs paid plans.',
      },
    },
  },
}

/**
 * Interaction test: Verifies table structure and CTA functionality.
 */
export const InteractionTest: Story = {
  args: {
    options: [
      { id: 'basic', name: 'Basic Plan', price: '$9', ctaText: 'Select Basic' },
      {
        id: 'pro',
        name: 'Pro Plan',
        price: '$29',
        highlighted: true,
        badge: 'Recommended',
        ctaText: 'Select Pro',
      },
    ],
    features: [
      {
        id: 'feature-1',
        name: 'Feature One',
        values: { basic: true, pro: true },
      },
      {
        id: 'feature-2',
        name: 'Feature Two',
        values: { basic: false, pro: true },
      },
      {
        id: 'feature-3',
        name: 'Feature Three',
        values: { basic: '5', pro: '50' },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify option names are displayed
    const basicPlan = canvas.getByText('Basic Plan')
    const proPlan = canvas.getByText('Pro Plan')
    await expect(basicPlan).toBeInTheDocument()
    await expect(proPlan).toBeInTheDocument()

    // Verify prices are displayed
    const basicPrice = canvas.getByText('$9')
    const proPrice = canvas.getByText('$29')
    await expect(basicPrice).toBeInTheDocument()
    await expect(proPrice).toBeInTheDocument()

    // Verify badge is displayed
    const badge = canvas.getByText('Recommended')
    await expect(badge).toBeInTheDocument()

    // Verify feature names
    const feature1 = canvas.getByText('Feature One')
    const feature2 = canvas.getByText('Feature Two')
    const feature3 = canvas.getByText('Feature Three')
    await expect(feature1).toBeInTheDocument()
    await expect(feature2).toBeInTheDocument()
    await expect(feature3).toBeInTheDocument()

    // Verify CTA buttons exist
    const selectBasic = canvas.getByRole('button', { name: /select basic/i })
    const selectPro = canvas.getByRole('button', { name: /select pro/i })
    await expect(selectBasic).toBeInTheDocument()
    await expect(selectPro).toBeInTheDocument()

    // Click a CTA button
    await userEvent.click(selectPro)
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interaction test verifying table structure, content display, and CTA buttons.',
      },
    },
  },
}
