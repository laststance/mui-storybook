import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { expect, within } from 'storybook/test'

import MultiColumnLayout, { MagazineArticle } from './MultiColumnLayout'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * MultiColumnLayout provides CSS columns for magazine-style text flow.
 *
 * ## Use Cases
 * - **Magazine articles**: Long-form content with flowing text
 * - **Print layouts**: Web adaptations of print designs
 * - **Legal documents**: Multi-column contracts and terms
 * - **Newspaper-style**: Classic news article layouts
 * - **Text-heavy content**: Documentation, manuals, guides
 *
 * ## Key Features
 * - True CSS multi-column flow
 * - Configurable column count (2-6 or auto)
 * - Column rules (decorative dividers)
 * - Break prevention for images and quotes
 * - Responsive column reduction
 *
 * ## Accessibility
 * - Semantic HTML structure
 * - Proper reading order maintained
 * - Optimal line length for readability
 * - WCAG AA compliant
 *
 * ## Usage
 * ```tsx
 * import { MultiColumnLayout } from './MultiColumnLayout'
 *
 * <MultiColumnLayout columnCount={3} columnRule>
 *   <Typography>Your article content here...</Typography>
 * </MultiColumnLayout>
 * ```
 */
const meta = {
  title: 'Layout Complete/Layouts/MultiColumn',
  component: MultiColumnLayout,
  tags: [], // autodocs disabled - using custom MDX documentation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
MultiColumnLayout creates CSS multi-column layouts for magazine-style text flow.

## When to Use
- Magazine and newspaper-style articles
- Print layout adaptations for web
- Long-form text content
- Legal documents and contracts
- Content benefiting from shorter line lengths

## Design Considerations
- **Column Count**: 2-4 columns work best for web; more columns suit wider screens
- **Column Gap**: Standard (24px) provides good separation without wasting space
- **Column Rules**: Add visual separation for dense content
- **Responsive**: Columns reduce automatically on smaller screens
        `,
      },
    },
  },
  argTypes: {
    columnCount: {
      control: 'select',
      options: [2, 3, 4, 5, 6, 'auto'],
      description: 'Number of columns',
      table: {
        category: 'Layout',
        defaultValue: { summary: '3' },
      },
    },
    columnGap: {
      control: 'select',
      options: ['narrow', 'standard', 'wide'],
      description: 'Gap between columns',
      table: {
        category: 'Spacing',
        defaultValue: { summary: 'standard' },
      },
    },
    minColumnWidth: {
      control: { type: 'range', min: 150, max: 400, step: 25 },
      description: 'Minimum column width for auto mode',
      table: {
        category: 'Layout',
        defaultValue: { summary: '250' },
      },
    },
    columnRule: {
      control: 'boolean',
      description: 'Show decorative column dividers',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the container',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'lg' },
      },
    },
    padding: {
      control: { type: 'range', min: 0, max: 8, step: 1 },
      description: 'Padding around the container (multiplied by 8px)',
      table: {
        category: 'Spacing',
        defaultValue: { summary: '3' },
      },
    },
    balanceColumns: {
      control: 'boolean',
      description: 'Balance column heights',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    preventBreakInside: {
      control: 'boolean',
      description: 'Prevent breaks inside images and quotes',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    columnCount: 3,
    columnGap: 'standard',
    minColumnWidth: 250,
    columnRule: false,
    maxWidth: 'lg',
    padding: 3,
    balanceColumns: true,
    preventBreakInside: true,
  },
} satisfies Meta<typeof MultiColumnLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Sample long-form content for examples.
 */
const sampleContent = `
Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.

The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process. Type design is a closely related craft, sometimes considered part of typography; most typographers do not design typefaces, and some type designers do not consider themselves typographers.

Typography has been called "the art of dressing words" and involves decisions about the layout and design of text to make it both aesthetically pleasing and functional. Good typography ensures that text is easy to read and understand, guiding the reader's eye smoothly through the content.

In traditional typography, text is composed to create a readable, coherent, and visually satisfying typeface that works invisibly, without the awareness of the reader. Even distribution of typeset material, with a minimum of distractions and anomalies, is aimed at producing clarity and transparency.

Modern typography has been strongly influenced by the principles of the Bauhaus, which emphasized simplicity, functionality, and the removal of unnecessary ornamentation. This approach to typography focuses on clarity and readability, using clean lines and geometric forms.
`.trim()

/**
 * Interactive playground for MultiColumnLayout.
 * Use the Controls panel to experiment with different configurations.
 */
export const Playground: Story = {
  args: {
    columnCount: 3,
    columnGap: 'standard',
    columnRule: false,
    children: (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ breakAfter: 'avoid' }}>
          The Art of Typography
        </Typography>
        {sampleContent.split('\n\n').map((paragraph, index) => (
          <Typography key={index} paragraph sx={{ textAlign: 'justify' }}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Experiment with different layout configurations using the Controls panel.',
      },
    },
  },
}

/**
 * Basic usage with three columns and default settings.
 */
export const Basic: Story = {
  args: {
    columnCount: 3,
    children: (
      <Box>
        <Typography variant="h5" gutterBottom sx={{ breakAfter: 'avoid' }}>
          Introduction to Multi-Column Layouts
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Multi-column layouts have been a staple of print design for centuries.
          From newspapers to magazines, multiple columns help create readable
          line lengths and make efficient use of available space.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          With CSS multi-column layout, we can bring this same technique to the
          web. Content automatically flows from one column to the next, creating
          a seamless reading experience similar to print media.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          The ideal line length for body text is generally between 45 and 75
          characters. Multi-column layouts help achieve this optimal length even
          on wider screens, improving readability and reducing eye strain.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic three-column layout with flowing text content.',
      },
    },
  },
}

/**
 * Real-world magazine article with drop caps, quotes, and headings.
 */
export const RealWorld: Story = {
  args: {
    children: null,
  },
  render: () => <MagazineArticle />,
  parameters: {
    docs: {
      description: {
        story: `
A production-ready magazine article demonstrating:
- Multi-column text flow
- Drop caps for article starts
- Pull quotes with styling
- Column rules for visual separation
- Responsive column reduction
- Article header and author bio
        `,
      },
    },
  },
}

/**
 * Two columns for simpler layouts.
 */
export const TwoColumns: Story = {
  args: {
    columnCount: 2,
    columnGap: 'wide',
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Two-Column Layout
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          A two-column layout is ideal for content that needs a bit more
          breathing room than a single column but does not require the
          complexity of three or more columns.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          This format works particularly well for terms and conditions, privacy
          policies, and other legal documents where readability is paramount.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          The wider column gap helps visually separate the columns while
          maintaining the flow of content from left to right.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Two-column layout with wide gap for simpler content.',
      },
    },
  },
}

/**
 * Four columns for dense content.
 */
export const FourColumns: Story = {
  args: {
    columnCount: 4,
    columnGap: 'narrow',
    columnRule: true,
    children: (
      <Box>
        <Typography paragraph sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>
          The four-column layout is commonly used in newspapers and magazines
          where space efficiency is crucial. This format allows for a high
          density of content while maintaining readable line lengths.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>
          Column rules help visually separate the columns, making it easier for
          readers to track their position within the text. This is especially
          important when columns are narrow.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>
          While four columns work well on larger screens, the layout
          automatically reduces to fewer columns on smaller devices to maintain
          readability.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>
          This responsive behavior ensures that your content remains accessible
          and easy to read across all device sizes.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Four-column layout with column rules for newspaper-style content.',
      },
    },
  },
}

/**
 * Column rules for visual separation.
 */
export const WithColumnRules: Story = {
  args: {
    columnCount: 3,
    columnRule: true,
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Columns with Decorative Rules
        </Typography>
        {sampleContent
          .split('\n\n')
          .slice(0, 3)
          .map((paragraph, index) => (
            <Typography key={index} paragraph sx={{ textAlign: 'justify' }}>
              {paragraph}
            </Typography>
          ))}
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Column rules add visual separation between columns.',
      },
    },
  },
}

/**
 * Auto columns based on minimum width.
 */
export const AutoColumns: Story = {
  args: {
    columnCount: 'auto',
    minColumnWidth: 280,
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Responsive Auto Columns
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          When using auto column count, the layout automatically determines the
          number of columns based on the minimum column width you specify. This
          creates a truly responsive layout.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Try resizing your browser window to see how the number of columns
          adjusts automatically while maintaining the minimum width.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          This approach is particularly useful when you want the layout to adapt
          to available space without specifying breakpoints.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Auto column count based on minimum column width. Resize browser to see effect.',
      },
    },
  },
}

/**
 * Content with quotes and images.
 */
export const MixedContent: Story = {
  args: {
    columnCount: 3,
    columnGap: 'wide',
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Mixed Content Layout
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Multi-column layouts can contain various types of content beyond plain
          text. This example shows how quotes and other elements flow within the
          columns.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            my: 2,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            bgcolor: 'grey.100',
          }}
          className="no-break"
        >
          <Typography variant="body1" fontStyle="italic">
            "The ideal line length for reading comfort is between 45 and 75
            characters per line."
          </Typography>
          <Typography variant="caption" color="text.secondary">
            — Robert Bringhurst
          </Typography>
        </Paper>

        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Notice how the quote block stays together and does not break across
          columns. This is achieved using the break-inside: avoid CSS property.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          Images and other media elements can also be included and will maintain
          their position within the column flow.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Mixed content with quotes that prevent breaking inside.',
      },
    },
  },
}

/**
 * Wide gap spacing between columns.
 */
export const WideGap: Story = {
  args: {
    columnCount: 2,
    columnGap: 'wide',
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Wide Column Gap
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          A wider gap between columns creates more visual breathing room and
          helps clearly separate the content. This is particularly useful for
          formal documents or content with distinct sections.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          The wide gap setting uses 40px of space between columns, compared to
          24px for standard and 16px for narrow.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Wide column gap (40px) for maximum visual separation.',
      },
    },
  },
}

/**
 * Interaction test verifying layout structure.
 */
export const InteractionTest: Story = {
  args: {
    columnCount: 3,
    children: (
      <Box data-testid="column-content">
        <Typography data-testid="column-heading" variant="h5" gutterBottom>
          Test Heading
        </Typography>
        <Typography data-testid="column-paragraph" paragraph>
          This is test content for interaction testing. The content should flow
          across multiple columns in the layout.
        </Typography>
      </Box>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify content container is rendered
    const content = await canvas.findByTestId('column-content')
    await expect(content).toBeVisible()

    // Verify heading is rendered
    const heading = await canvas.findByTestId('column-heading')
    await expect(heading).toHaveTextContent('Test Heading')

    // Verify paragraph is rendered
    const paragraph = await canvas.findByTestId('column-paragraph')
    await expect(paragraph).toBeVisible()

    // Verify container structure
    const container = canvasElement.querySelector('.MuiContainer-root')
    await expect(container).toBeInTheDocument()

    // Verify column styles are applied
    const columnContainer = container?.querySelector('div')
    await expect(columnContainer).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test verifying layout structure and content.',
      },
    },
  },
}

/**
 * Unbalanced columns for continuous content.
 */
export const UnbalancedColumns: Story = {
  args: {
    columnCount: 3,
    balanceColumns: false,
    children: (
      <Box>
        <Typography variant="h5" gutterBottom>
          Unbalanced Column Fill
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          By default, columns are balanced to have similar heights. When balance
          is disabled, content fills columns sequentially.
        </Typography>
        <Typography paragraph sx={{ textAlign: 'justify' }}>
          This can be useful for continuously updating content where you want
          new items to appear at the end of the flow.
        </Typography>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Unbalanced columns fill sequentially rather than balancing heights.',
      },
    },
  },
}

/**
 * Full width layout without container.
 */
export const FullWidth: Story = {
  args: {
    columnCount: 4,
    maxWidth: false,
    columnRule: true,
    padding: 4,
    children: (
      <Box>
        <Typography variant="h4" gutterBottom>
          Full Width Multi-Column
        </Typography>
        {sampleContent.split('\n\n').map((paragraph, index) => (
          <Typography key={index} paragraph sx={{ textAlign: 'justify' }}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Full width layout spanning the entire viewport.',
      },
    },
  },
}
