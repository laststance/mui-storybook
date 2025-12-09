import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MUIStack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { expect, within } from 'storybook/test'

import {
  createSelectArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Stack from './Stack'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    direction: createSelectArgType(
      ['row', 'row-reverse', 'column', 'column-reverse'],
      'column',
      'Defines the flex-direction style property.',
      'Layout',
    ),
    spacing: createNumberArgType(
      'Defines the space between children.',
      2,
      0,
      10,
      'Layout',
    ),
    alignItems: createSelectArgType(
      ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      'stretch',
      'Defines the align-items style property.',
      'Layout',
    ),
    justifyContent: createSelectArgType(
      [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      'flex-start',
      'Defines the justify-content style property.',
      'Layout',
    ),
    // Disable divider and children as they require JSX
    divider: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

/**
 * Interactive playground for the Stack component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  render: (args) => (
    <Stack {...args}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  ),
}

export const Default: Story = {
  render: () => (
    <MUIStack spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  ),
}

export function Horizontal() {
  return (
    <MUIStack direction="row" spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  )
}

export function DifferentSpacing() {
  return (
    <MUIStack spacing={4}>
      <div>
        <div style={{ marginBottom: 8 }}>spacing=1</div>
        <MUIStack direction="row" spacing={1}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>spacing=2</div>
        <MUIStack direction="row" spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>spacing=4</div>
        <MUIStack direction="row" spacing={4}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
    </MUIStack>
  )
}

export function WithDividers() {
  return (
    <MUIStack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  )
}

export function ResponsiveDirection() {
  return (
    <MUIStack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </MUIStack>
  )
}

export function WithAlignItems() {
  return (
    <MUIStack spacing={4}>
      <div>
        <div style={{ marginBottom: 8 }}>alignItems=center</div>
        <MUIStack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ height: 100, backgroundColor: 'grey.100', p: 1 }}
        >
          <Item sx={{ height: 40 }}>Short</Item>
          <Item sx={{ height: 60 }}>Medium</Item>
          <Item sx={{ height: 80 }}>Tall</Item>
        </MUIStack>
      </div>
    </MUIStack>
  )
}

export function WithJustifyContent() {
  return (
    <MUIStack spacing={4}>
      <div>
        <div style={{ marginBottom: 8 }}>justifyContent=space-between</div>
        <MUIStack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ backgroundColor: 'grey.100', p: 1 }}
        >
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </MUIStack>
      </div>
    </MUIStack>
  )
}

export const InteractionTest: Story = {
  render: () => (
    <MUIStack spacing={2} data-testid="stack-container">
      <Item data-testid="stack-item-1">Item 1</Item>
      <Item data-testid="stack-item-2">Item 2</Item>
      <Item data-testid="stack-item-3">Item 3</Item>
    </MUIStack>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify Stack container renders', async () => {
      const container = canvas.getByTestId('stack-container')
      expect(container).toBeInTheDocument()
    })

    await step('Verify all Stack items render', async () => {
      const item1 = canvas.getByTestId('stack-item-1')
      const item2 = canvas.getByTestId('stack-item-2')
      const item3 = canvas.getByTestId('stack-item-3')

      expect(item1).toBeInTheDocument()
      expect(item2).toBeInTheDocument()
      expect(item3).toBeInTheDocument()

      expect(item1).toHaveTextContent('Item 1')
      expect(item2).toHaveTextContent('Item 2')
      expect(item3).toHaveTextContent('Item 3')
    })
  },
}
