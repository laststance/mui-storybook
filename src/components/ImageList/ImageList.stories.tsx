import InfoIcon from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * Sample image data for ImageList stories
 */
const itemData = [
  {
    img: 'https://picsum.photos/seed/1/400/300',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://picsum.photos/seed/2/400/300',
    title: 'Burger',
  },
  {
    img: 'https://picsum.photos/seed/3/400/300',
    title: 'Camera',
  },
  {
    img: 'https://picsum.photos/seed/4/400/300',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://picsum.photos/seed/5/400/300',
    title: 'Hats',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://picsum.photos/seed/6/400/300',
    title: 'Honey',
  },
  {
    img: 'https://picsum.photos/seed/7/400/300',
    title: 'Basketball',
  },
  {
    img: 'https://picsum.photos/seed/8/400/300',
    title: 'Fern',
  },
  {
    img: 'https://picsum.photos/seed/9/400/300',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://picsum.photos/seed/10/400/300',
    title: 'Tomato basil',
  },
  {
    img: 'https://picsum.photos/seed/11/400/300',
    title: 'Sea star',
  },
  {
    img: 'https://picsum.photos/seed/12/400/300',
    title: 'Bike',
    cols: 2,
  },
]

const meta: Meta<typeof ImageList> = {
  title: 'Components/ImageList',
  component: ImageList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ImageList>

/**
 * Default ImageList with basic configuration
 */
export const Default: Story = {
  args: {
    sx: { width: 500, height: 450 },
    cols: 3,
    rowHeight: 164,
  },
  render: (args) => (
    <ImageList {...args}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}

/**
 * Standard ImageList displaying images in a basic grid layout
 */
export const Standard: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}

/**
 * Quilted ImageList with images spanning multiple rows/columns
 */
export const Quilted: Story = {
  render: () => (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}

/**
 * Woven ImageList with alternating image heights
 */
export const Woven: Story = {
  render: () => (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="woven"
      cols={3}
      gap={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}

/**
 * Masonry ImageList with variable height images
 */
export const Masonry: Story = {
  render: () => (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="masonry"
      cols={3}
      gap={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}

/**
 * ImageList with title bars and action icons
 */
export const WithTitlebar: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: Unknown</span>}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}

/**
 * ImageList with title bars positioned below images
 */
export const WithTitlebarBelow: Story = {
  render: () => (
    <ImageList sx={{ width: 500, height: 450 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            position="below"
            actionIcon={
              <IconButton aria-label={`info about ${item.title}`}>
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  ),
}
