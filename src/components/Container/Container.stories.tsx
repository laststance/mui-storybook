import type { Meta, StoryObj } from '@storybook/react-vite'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

/**
 * Default fluid container
 */
export const Default: Story = {
  args: {
    children: (
      <Box sx={{ bgcolor: 'primary.light', p: 2 }}>
        <Typography>Default Container</Typography>
      </Box>
    ),
  },
}

/**
 * Fixed container with max width
 */
export const Fixed: Story = {
  args: {
    fixed: true,
    children: (
      <Box sx={{ bgcolor: 'primary.light', p: 2 }}>
        <Typography>Fixed Container</Typography>
      </Box>
    ),
  },
}

/**
 * Container with different max widths
 */
export const MaxWidths: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Container maxWidth="xs">
        <Box sx={{ bgcolor: 'error.light', p: 2 }}>
          <Typography>maxWidth="xs" (444px)</Typography>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'warning.light', p: 2 }}>
          <Typography>maxWidth="sm" (600px)</Typography>
        </Box>
      </Container>

      <Container maxWidth="md">
        <Box sx={{ bgcolor: 'info.light', p: 2 }}>
          <Typography>maxWidth="md" (900px)</Typography>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'success.light', p: 2 }}>
          <Typography>maxWidth="lg" (1200px)</Typography>
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ bgcolor: 'secondary.light', p: 2 }}>
          <Typography>maxWidth="xl" (1536px)</Typography>
        </Box>
      </Container>

      <Container maxWidth={false}>
        <Box sx={{ bgcolor: 'grey.300', p: 2 }}>
          <Typography>maxWidth=false (no max width)</Typography>
        </Box>
      </Container>
    </Box>
  ),
}

/**
 * Container with disabled gutters
 */
export const DisableGutters: Story = {
  args: {
    disableGutters: true,
    maxWidth: 'md',
    children: (
      <Box sx={{ bgcolor: 'primary.light', p: 2 }}>
        <Typography>Container without gutters (no horizontal padding)</Typography>
      </Box>
    ),
  },
}

/**
 * Nested containers
 */
export const NestedContainers: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'grey.200', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Outer Container (lg)
        </Typography>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: 'primary.light', p: 2 }}>
            <Typography>
              Inner Container (sm) - useful for centered content sections
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  ),
}
