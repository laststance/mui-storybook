import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Utils/Transitions',
  parameters: {
    layout: 'padded',
  },
  tags: [], // autodocs disabled - using custom MDX documentation,
}

export default meta
type Story = StoryObj

const TransitionBox = () => (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography>Content</Typography>
    </Box>
  </Paper>
)

/**
 * Collapse transition - animate height
 */
export const CollapseTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Collapse in={checked}>
            <TransitionBox />
          </Collapse>
          <Collapse in={checked} collapsedSize={40}>
            <TransitionBox />
          </Collapse>
          <Collapse orientation="horizontal" in={checked}>
            <TransitionBox />
          </Collapse>
        </Box>
      </Box>
    )
  },
}

/**
 * Fade transition - animate opacity
 */
export const FadeTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Fade in={checked}>
            <TransitionBox />
          </Fade>
          <Fade
            in={checked}
            style={{ transitionDelay: checked ? '500ms' : '0ms' }}
          >
            <TransitionBox />
          </Fade>
        </Box>
      </Box>
    )
  },
}

/**
 * Grow transition - scale and fade
 */
export const GrowTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Grow in={checked}>
            <TransitionBox />
          </Grow>
          <Grow in={checked} style={{ transformOrigin: '0 0 0' }}>
            <TransitionBox />
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <TransitionBox />
          </Grow>
        </Box>
      </Box>
    )
  },
}

/**
 * Slide transition - slide from edge
 */
export const SlideTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <TransitionBox />
          </Slide>
          <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
            <TransitionBox />
          </Slide>
          <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
            <TransitionBox />
          </Slide>
          <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
            <TransitionBox />
          </Slide>
        </Box>
      </Box>
    )
  },
}

/**
 * Zoom transition - scale from center
 */
export const ZoomTransition: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Box sx={{ height: 180 }}>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
        />
        <Box sx={{ display: 'flex' }}>
          <Zoom in={checked}>
            <TransitionBox />
          </Zoom>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? '200ms' : '0ms' }}
          >
            <TransitionBox />
          </Zoom>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? '400ms' : '0ms' }}
          >
            <TransitionBox />
          </Zoom>
        </Box>
      </Box>
    )
  },
}

/**
 * All transitions comparison
 */
export const AllTransitions: Story = {
  render: () => {
    const [show, setShow] = useState(false)

    return (
      <Box>
        <Button
          variant="contained"
          onClick={() => setShow(!show)}
          sx={{ mb: 2 }}
        >
          Toggle All Transitions
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="caption">Collapse</Typography>
            <Collapse in={show}>
              <TransitionBox />
            </Collapse>
          </Box>
          <Box>
            <Typography variant="caption">Fade</Typography>
            <Fade in={show}>
              <TransitionBox />
            </Fade>
          </Box>
          <Box>
            <Typography variant="caption">Grow</Typography>
            <Grow in={show}>
              <TransitionBox />
            </Grow>
          </Box>
          <Box>
            <Typography variant="caption">Slide</Typography>
            <Slide direction="up" in={show} mountOnEnter unmountOnExit>
              <TransitionBox />
            </Slide>
          </Box>
          <Box>
            <Typography variant="caption">Zoom</Typography>
            <Zoom in={show}>
              <TransitionBox />
            </Zoom>
          </Box>
        </Box>
      </Box>
    )
  },
}
