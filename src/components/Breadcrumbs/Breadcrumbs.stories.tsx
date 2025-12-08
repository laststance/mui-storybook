import GrainIcon from '@mui/icons-material/Grain'
import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import MUIBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import Breadcrumbs from './Breadcrumbs'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="/products">
        Products
      </Link>
      <Typography color="text.primary">Details</Typography>
    </MUIBreadcrumbs>
  ),
}

export function WithIcons() {
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/"
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Trending
      </Link>
      <Typography
        sx={{ display: 'flex', alignItems: 'center' }}
        color="text.primary"
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Details
      </Typography>
    </MUIBreadcrumbs>
  )
}

export function CustomSeparator() {
  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="/products">
        Products
      </Link>
      <Typography color="text.primary">Details</Typography>
    </MUIBreadcrumbs>
  )
}

export function Collapsed() {
  return (
    <MUIBreadcrumbs maxItems={3} aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="/category">
        Category
      </Link>
      <Link underline="hover" color="inherit" href="/subcategory">
        Subcategory
      </Link>
      <Link underline="hover" color="inherit" href="/product">
        Product
      </Link>
      <Typography color="text.primary">Details</Typography>
    </MUIBreadcrumbs>
  )
}
