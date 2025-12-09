import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import PrintIcon from '@mui/icons-material/Print'
import SaveIcon from '@mui/icons-material/Save'
import ShareIcon from '@mui/icons-material/Share'
import Box from '@mui/material/Box'
import MUISpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import React from 'react'

import {
  createBooleanArgType,
  createSelectArgType,
} from '../../../.storybook/argTypeTemplates'

import SpeedDial from './SpeedDial'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/SpeedDial',
  component: SpeedDial,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    open: createBooleanArgType(
      'If true, the component is shown.',
      false,
      'State',
    ),
    hidden: createBooleanArgType(
      'If true, the SpeedDial is hidden.',
      false,
      'State',
    ),
    direction: createSelectArgType(
      ['up', 'down', 'left', 'right'],
      'up',
      'The direction the actions open relative to the floating action button.',
      'Layout',
    ),
    ariaLabel: {
      control: 'text',
      description: 'The aria-label of the button element.',
      table: { category: 'Accessibility' },
    },
    // Disable icon and children as they require JSX
    icon: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof SpeedDial>

export default meta
type Story = StoryObj<typeof meta>

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
]

/**
 * Interactive playground for the SpeedDial component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    open: false,
    hidden: false,
    direction: 'up',
    ariaLabel: 'SpeedDial playground',
  },
  render: (args) => (
    <Box sx={{ height: 320, position: 'relative' }}>
      <SpeedDial
        {...args}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  ),
}

export const Default: Story = {
  args: {} as never,
  render: () => (
    <Box sx={{ height: 320, position: 'relative' }}>
      <MUISpeedDial
        ariaLabel="SpeedDial example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </MUISpeedDial>
    </Box>
  ),
}

export function DirectionUp() {
  return (
    <Box sx={{ height: 320, position: 'relative' }}>
      <MUISpeedDial
        ariaLabel="SpeedDial up"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </MUISpeedDial>
    </Box>
  )
}

export function DirectionLeft() {
  return (
    <Box sx={{ height: 100, position: 'relative' }}>
      <MUISpeedDial
        ariaLabel="SpeedDial left"
        sx={{ position: 'absolute', top: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </MUISpeedDial>
    </Box>
  )
}

export function Controlled() {
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ height: 320, position: 'relative' }}>
      <MUISpeedDial
        ariaLabel="Controlled SpeedDial"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setOpen(false)}
          />
        ))}
      </MUISpeedDial>
    </Box>
  )
}

export function WithTooltips() {
  return (
    <Box sx={{ height: 320, position: 'relative' }}>
      <MUISpeedDial
        ariaLabel="SpeedDial with tooltips"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
          />
        ))}
      </MUISpeedDial>
    </Box>
  )
}
