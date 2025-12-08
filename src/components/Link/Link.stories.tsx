import MUILink from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import {
  muiColorArgType,
  createSelectArgType,
} from '../../../.storybook/argTypeTemplates'

import Link from './Link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Link',
  component: Link,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    underline: createSelectArgType(
      ['always', 'hover', 'none'],
      'always',
      'Controls when the link should have an underline.',
      'Appearance',
    ),
    variant: createSelectArgType(
      [
        'body1',
        'body2',
        'button',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'inherit',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
      'inherit',
      'Applies the theme typography styles.',
      'Appearance',
    ),
    href: {
      control: 'text',
      description: 'The URL to link to.',
      table: { category: 'Content' },
    },
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Link component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    href: 'https://mui.com',
    children: 'Playground Link',
    color: 'primary',
    underline: 'always',
  },
}

export const Default: Story = {
  args: {
    href: 'https://mui.com',
    children: 'Default Link',
  },
}

export function UnderlineVariants() {
  return (
    <Stack spacing={2}>
      <MUILink href="https://mui.com" underline="always">
        underline always
      </MUILink>
      <MUILink href="https://mui.com" underline="hover">
        underline hover
      </MUILink>
      <MUILink href="https://mui.com" underline="none">
        underline none
      </MUILink>
    </Stack>
  )
}

export function Colors() {
  return (
    <Stack spacing={2}>
      <MUILink href="https://mui.com" color="primary">
        Primary
      </MUILink>
      <MUILink href="https://mui.com" color="secondary">
        Secondary
      </MUILink>
      <MUILink href="https://mui.com" color="inherit">
        Inherit
      </MUILink>
      <MUILink href="https://mui.com" color="error">
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
      This is some text with a <MUILink href="https://mui.com">link</MUILink>{' '}
      inside it.
    </Typography>
  )
}
