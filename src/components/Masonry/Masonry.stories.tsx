import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { expect, within } from 'storybook/test'

import {
  createNumberArgType,
  createBooleanArgType,
} from '../../../.storybook/argTypeTemplates'

import Masonry from './Masonry'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Masonry',
  component: Masonry,
  tags: ['autodocs'],
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    columns: createNumberArgType('Number of columns.', 4, 1, 12),
    spacing: createNumberArgType('Spacing between items.', 1, 0, 10),
    sequential: createBooleanArgType(
      'If true, items are ordered from left to right (default is optimal packing).',
      false,
      'Layout',
    ),
    defaultHeight: createNumberArgType(
      'Default height for items before measurement.',
      0,
      0,
      500,
    ),
    defaultColumns: createNumberArgType(
      'Default number of columns before measurement.',
      4,
      1,
      12,
    ),
    defaultSpacing: createNumberArgType(
      'Default spacing before measurement.',
      1,
      0,
      10,
    ),
    // Children requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Masonry>

export default meta
type Story = StoryObj<typeof meta>

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const heights = [150, 90, 130, 110, 80, 180, 100, 120, 160, 140, 95, 170]

export const Default: Story = {
  args: {
    columns: 4,
    spacing: 2,
    children: heights.map((height, index) => (
      <Item key={index} sx={{ height }}>
        {index + 1}
      </Item>
    )),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 500, minHeight: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export const Columns: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Box sx={{ mb: 1 }}>2 Columns</Box>
        <Box sx={{ width: 400 }}>
          <Masonry columns={2} spacing={2}>
            {heights.slice(0, 6).map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1 }}>3 Columns</Box>
        <Box sx={{ width: 400 }}>
          <Masonry columns={3} spacing={2}>
            {heights.slice(0, 6).map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1 }}>4 Columns</Box>
        <Box sx={{ width: 500 }}>
          <Masonry columns={4} spacing={2}>
            {heights.map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      </Box>
    </Box>
  ),
}

export const Spacing: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Box sx={{ mb: 1 }}>Spacing: 1</Box>
        <Box sx={{ width: 400 }}>
          <Masonry columns={3} spacing={1}>
            {heights.slice(0, 6).map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      </Box>
      <Box>
        <Box sx={{ mb: 1 }}>Spacing: 3</Box>
        <Box sx={{ width: 400 }}>
          <Masonry columns={3} spacing={3}>
            {heights.slice(0, 6).map((height, index) => (
              <Item key={index} sx={{ height }}>
                {index + 1}
              </Item>
            ))}
          </Masonry>
        </Box>
      </Box>
    </Box>
  ),
}

const imageUrls = [
  'https://picsum.photos/200/300?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/250?random=3',
  'https://picsum.photos/200/180?random=4',
  'https://picsum.photos/200/320?random=5',
  'https://picsum.photos/200/220?random=6',
]

export const ImageGallery: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ width: 600 }}>
      <Masonry columns={3} spacing={2}>
        {imageUrls.map((url, index) => (
          <Paper key={index} elevation={3} sx={{ overflow: 'hidden' }}>
            <img
              src={url}
              alt={`Gallery item ${index + 1}`}
              loading="lazy"
              style={{ display: 'block', width: '100%' }}
            />
          </Paper>
        ))}
      </Masonry>
    </Box>
  ),
}

export const ResponsiveColumns: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {heights.map((height, index) => (
          <Item key={index} sx={{ height }}>
            {index + 1}
          </Item>
        ))}
      </Masonry>
    </Box>
  ),
}

export const SequentialOrder: Story = {
  args: {
    columns: 3,
    spacing: 2,
    sequential: true,
    children: heights.slice(0, 9).map((height, index) => (
      <Item key={index} sx={{ height }}>
        {index + 1}
      </Item>
    )),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export const InteractionTest: Story = {
  args: {
    columns: 3,
    spacing: 2,
    children: [
      <Item key={1} sx={{ height: 100 }} data-testid="masonry-item-1">
        1
      </Item>,
      <Item key={2} sx={{ height: 120 }} data-testid="masonry-item-2">
        2
      </Item>,
      <Item key={3} sx={{ height: 80 }} data-testid="masonry-item-3">
        3
      </Item>,
    ],
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 400 }}>
        <Story />
      </Box>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify masonry items are rendered', async () => {
      const item1 = canvas.getByTestId('masonry-item-1')
      const item2 = canvas.getByTestId('masonry-item-2')
      const item3 = canvas.getByTestId('masonry-item-3')

      await expect(item1).toBeInTheDocument()
      await expect(item2).toBeInTheDocument()
      await expect(item3).toBeInTheDocument()
    })

    await step('Verify items have content', async () => {
      await expect(canvas.getByText('1')).toBeInTheDocument()
      await expect(canvas.getByText('2')).toBeInTheDocument()
      await expect(canvas.getByText('3')).toBeInTheDocument()
    })
  },
}
