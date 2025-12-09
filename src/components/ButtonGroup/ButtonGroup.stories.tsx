import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import {
  muiColorArgType,
  muiSizeArgType,
  muiDisabledArgType,
  muiVariantArgType,
  muiOrientationArgType,
  createBooleanArgType,
} from '../../../.storybook/argTypeTemplates'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/ButtonGroup',
  component: ButtonGroup,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    variant: muiVariantArgType(['text', 'outlined', 'contained'], 'outlined'),
    color: muiColorArgType,
    size: muiSizeArgType,
    disabled: muiDisabledArgType,
    orientation: muiOrientationArgType,
    disableElevation: createBooleanArgType(
      'If true, no elevation is used.',
      false,
      'Appearance',
    ),
    disableRipple: createBooleanArgType(
      'If true, the ripple effect is disabled.',
      false,
      'Appearance',
    ),
    fullWidth: createBooleanArgType(
      'If true, the buttons will take up the full width of its container.',
      false,
      'Layout',
    ),
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the ButtonGroup component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    disabled: false,
    orientation: 'horizontal',
  },
  render: (args) => (
    <ButtonGroup {...args} aria-label="playground button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
}

export const Default: Story = {
  args: {} as never,
  render: () => (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
}

export const Variants: Story = {
  args: {} as never,
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="contained" aria-label="contained button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Box>
  ),
}

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
]

export function GroupSizesColors() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small" aria-label="small button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup color="secondary" aria-label="medium secondary button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup size="large" aria-label="large button group">
        {buttons}
      </ButtonGroup>
    </Box>
  )
}

export function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  )
}

const options = [
  'Create a merge commit',
  'Squash and merge',
  'Rebase and merge',
]

export function SplitButton() {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
  }

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

export function DisableElevation() {
  return (
    <ButtonGroup disableElevation variant="contained">
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  )
}

export const InteractionTest: Story = {
  render: () => {
    const handleClick1 = fn()
    const handleClick2 = fn()
    const handleClick3 = fn()

    return (
      <ButtonGroup variant="contained" aria-label="test button group">
        <Button onClick={handleClick1}>First</Button>
        <Button onClick={handleClick2}>Second</Button>
        <Button onClick={handleClick3}>Third</Button>
      </ButtonGroup>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify ButtonGroup renders with all buttons', async () => {
      const firstButton = canvas.getByRole('button', { name: /first/i })
      const secondButton = canvas.getByRole('button', { name: /second/i })
      const thirdButton = canvas.getByRole('button', { name: /third/i })

      expect(firstButton).toBeInTheDocument()
      expect(secondButton).toBeInTheDocument()
      expect(thirdButton).toBeInTheDocument()
    })

    await step('Test clicking each button in the group', async () => {
      const firstButton = canvas.getByRole('button', { name: /first/i })
      const secondButton = canvas.getByRole('button', { name: /second/i })
      const thirdButton = canvas.getByRole('button', { name: /third/i })

      await userEvent.click(firstButton)
      await userEvent.click(secondButton)
      await userEvent.click(thirdButton)
    })

    await step('Verify ButtonGroup structure', async () => {
      const buttonGroup = canvas.getByRole('group')
      expect(buttonGroup).toBeInTheDocument()
      expect(buttonGroup).toHaveClass('MuiButtonGroup-root')
    })
  },
}
