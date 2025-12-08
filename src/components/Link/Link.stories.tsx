import MUILink from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Link from './Link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Link',
  component: Link,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
}

export function UnderlineVariants() {
  return (
    <Stack spacing={2}>
      <MUILink href="#" underline="always">
        underline always
      </MUILink>
      <MUILink href="#" underline="hover">
        underline hover
      </MUILink>
      <MUILink href="#" underline="none">
        underline none
      </MUILink>
    </Stack>
  )
}

export function Colors() {
  return (
    <Stack spacing={2}>
      <MUILink href="#" color="primary">
        Primary
      </MUILink>
      <MUILink href="#" color="secondary">
        Secondary
      </MUILink>
      <MUILink href="#" color="inherit">
        Inherit
      </MUILink>
      <MUILink href="#" color="error">
        Error
      </MUILink>
    </Stack>
  )
}

export function ButtonBehavior() {
  return (
    <MUILink
      component="button"
      variant="body2"
      onClick={() => alert('Link clicked!')}
    >
      Button Link
    </MUILink>
  )
}

export function WithinText() {
  return (
    <Typography>
      This is some text with a <MUILink href="#">link</MUILink> inside it.
    </Typography>
  )
}
