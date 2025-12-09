import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import {
  muiColorArgType,
  muiSizeArgType,
  muiDisabledArgType,
  muiVariantArgType,
  createBooleanArgType,
} from '../../../.storybook/argTypeTemplates'

import Chip from './Chip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Chip',
  component: Chip,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    color: muiColorArgType,
    size: muiSizeArgType,
    disabled: muiDisabledArgType,
    variant: muiVariantArgType(['filled', 'outlined'], 'filled'),
    clickable: createBooleanArgType(
      'If true, the chip will appear clickable.',
      false,
      'Behavior',
    ),
    label: {
      control: 'text',
      description: 'The content of the label.',
      table: { category: 'Content' },
    },
    // Disable props that require JSX
    avatar: { control: false },
    deleteIcon: { control: false },
    icon: { control: false },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Chip component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    label: 'Chip Label',
    color: 'primary',
    size: 'medium',
    variant: 'filled',
    disabled: false,
    clickable: false,
  },
}

export const Default: Story = {
  args: {
    label: 'Default Chip',
  },
}

export const BasicChip: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <Chip label="Chip Filled" />
      <Chip label="Chip Outlined" variant="outlined" />
    </Stack>
  ),
}

export function ColorChips() {
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" />
        <Chip label="success" color="success" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="primary" color="primary" variant="outlined" />
        <Chip label="success" color="success" variant="outlined" />
      </Stack>
    </Stack>
  )
}

export const Clickable: Story = {
  render: () => {
    const handleClick = () => {
      alert('You clicked the Chip.')
    }

    return (
      <Stack direction="row" spacing={1}>
        {/* @ts-ignore */}
        <Chip label="Clickable" onClick={handleClick} />
        {/* @ts-ignore */}
        <Chip label="Clickable" variant="outlined" onClick={handleClick} />
      </Stack>
    )
  },
}

export function Deletable() {
  const handleDelete = () => {
    alert('You clicked the delete icon.')
  }

  return (
    <Stack direction="row" spacing={1}>
      {/* @ts-ignore */}
      <Chip label="Deletable" onDelete={handleDelete} />
      {/* @ts-ignore */}
      <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
    </Stack>
  )
}

export function ClickableAndDeletable() {
  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Clickable Deletable"
        /* @ts-ignore */
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="Clickable Deletable"
        variant="outlined"
        /* @ts-ignore */
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </Stack>
  )
}

export function ClickableLink() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Clickable Link"
        component={'a' as const}
        {...{ href: '#basic-chip' }}
        clickable
      />
      <Chip
        label="Clickable Link"
        component={'a' as const}
        {...{ href: '#basic-chip' }}
        variant="outlined"
        clickable
      />
    </Stack>
  )
}

export function CustomDeleteIcon() {
  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Custom delete icon"
        /* @ts-ignore */
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      <Chip
        label="Custom delete icon"
        /* @ts-ignore */
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DeleteIcon />}
        variant="outlined"
      />
    </Stack>
  )
}

export function SizesChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Small" size="small" />
      <Chip label="Small" size="small" variant="outlined" />
    </Stack>
  )
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

export function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ])

  const handleDelete = (chipToDelete: { key: any; label?: string }) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    )
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon

        if (data.label === 'React') {
          icon = <TagFacesIcon />
        }

        return (
          <ListItem key={data.key}>
            <Chip
              /* @ts-ignore */
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        )
      })}
    </Paper>
  )
}

export const InteractionTest: Story = {
  args: {},
  render: () => {
    const handleClick = fn()
    const handleDelete = fn()
    return (
      <Stack direction="row" spacing={1}>
        <Chip label="Basic Chip" />
        <Chip
          label="Clickable Chip"
          /* @ts-ignore */
          onClick={handleClick}
        />
        <Chip
          label="Deletable Chip"
          /* @ts-ignore */
          onDelete={handleDelete}
        />
        <Chip
          label="Custom Icon Delete"
          /* @ts-ignore */
          onDelete={handleDelete}
          deleteIcon={<DoneIcon />}
        />
      </Stack>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify chips render correctly', async () => {
      const basicChip = canvas.getByText('Basic Chip')
      await expect(basicChip).toBeInTheDocument()

      const clickableChip = canvas.getByText('Clickable Chip')
      await expect(clickableChip).toBeInTheDocument()

      const deletableChip = canvas.getByText('Deletable Chip')
      await expect(deletableChip).toBeInTheDocument()
    })

    await step('Test chip click interaction', async () => {
      const clickableChip = canvas.getByText('Clickable Chip')
      await userEvent.click(clickableChip)
    })

    await step('Test chip delete button', async () => {
      const deleteButtons = canvas.getAllByTestId('CancelIcon')
      await expect(deleteButtons.length).toBeGreaterThan(0)
      await userEvent.click(deleteButtons[0])
    })

    await step('Test custom delete icon', async () => {
      const customDeleteIcon = canvas.getByTestId('DoneIcon')
      await expect(customDeleteIcon).toBeInTheDocument()
    })
  },
}
