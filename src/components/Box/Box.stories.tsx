import MUIBox from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Box from './Box'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MUIBox sx={{ width: 300, height: 300, backgroundColor: 'primary.main' }} />
  ),
}

export function BasicBox() {
  return (
    <MUIBox
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  )
}

export function BoxWithSxProp() {
  return (
    <MUIBox
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'success.light',
        borderRadius: 2,
        border: '2px solid',
        borderColor: 'success.dark',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Typography variant="h6" color="white">
        Box with sx styling
      </Typography>
    </MUIBox>
  )
}

export function FlexboxContainer() {
  return (
    <MUIBox
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        p: 2,
        border: '1px solid grey',
        borderRadius: 1,
      }}
    >
      <MUIBox sx={{ p: 2, backgroundColor: 'primary.light', flex: 1 }}>
        Flex Item 1
      </MUIBox>
      <MUIBox sx={{ p: 2, backgroundColor: 'secondary.light', flex: 2 }}>
        Flex Item 2 (flex: 2)
      </MUIBox>
      <MUIBox sx={{ p: 2, backgroundColor: 'error.light', flex: 1 }}>
        Flex Item 3
      </MUIBox>
    </MUIBox>
  )
}

export function GridLayout() {
  return (
    <MUIBox
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        p: 2,
      }}
    >
      <MUIBox sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
        Grid Item 1
      </MUIBox>
      <MUIBox
        sx={{ p: 2, backgroundColor: 'secondary.light', borderRadius: 1 }}
      >
        Grid Item 2
      </MUIBox>
      <MUIBox sx={{ p: 2, backgroundColor: 'success.light', borderRadius: 1 }}>
        Grid Item 3
      </MUIBox>
    </MUIBox>
  )
}

export function ResponsiveBox() {
  return (
    <MUIBox
      sx={{
        width: {
          xs: '100%',
          sm: '75%',
          md: '50%',
          lg: '33%',
        },
        height: 200,
        backgroundColor: {
          xs: 'error.light',
          sm: 'warning.light',
          md: 'info.light',
          lg: 'success.light',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="white" textAlign="center">
        Resize window to see changes
      </Typography>
    </MUIBox>
  )
}
