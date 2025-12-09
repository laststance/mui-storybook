import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import PhoneIcon from '@mui/icons-material/Phone'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MUITabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import {
  createBooleanArgType,
  createSelectArgType,
} from '../../../.storybook/argTypeTemplates'

import Tabs from './Tabs'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'The value of the currently selected Tab.',
      table: { category: 'State' },
    },
    orientation: createSelectArgType(
      ['horizontal', 'vertical'],
      'horizontal',
      'The component orientation.',
      'Layout',
    ),
    variant: createSelectArgType(
      ['standard', 'scrollable', 'fullWidth'],
      'standard',
      'Determines additional display behavior of the tabs.',
      'Appearance',
    ),
    centered: createBooleanArgType(
      'If true, the tabs are centered.',
      false,
      'Layout',
    ),
    textColor: createSelectArgType(
      ['inherit', 'primary', 'secondary'],
      'inherit',
      'Determines the color of the Tab.',
      'Appearance',
    ),
    indicatorColor: createSelectArgType(
      ['primary', 'secondary'],
      'primary',
      'Determines the color of the indicator.',
      'Appearance',
    ),
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

/**
 * Interactive playground for the Tabs component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    value: 0,
    orientation: 'horizontal',
    variant: 'standard',
    centered: false,
    textColor: 'primary',
    indicatorColor: 'primary',
  },
  render: (args) => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs {...args}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
    </Box>
  ),
}

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(0)
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <MUITabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </MUITabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One Content
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two Content
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three Content
        </TabPanel>
      </Box>
    )
  },
}

export function Basic() {
  const [value, setValue] = React.useState(0)
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MUITabs value={value} onChange={(_, newValue) => setValue(newValue)}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </MUITabs>
      </Box>
      <TabPanel value={value} index={0}>
        Content for Tab One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content for Tab Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Content for Tab Three
      </TabPanel>
    </Box>
  )
}

export function Centered() {
  const [value, setValue] = React.useState(0)
  return (
    <Box sx={{ width: '100%' }}>
      <MUITabs
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        centered
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </MUITabs>
    </Box>
  )
}

export function Scrollable() {
  const [value, setValue] = React.useState(0)
  return (
    <Box sx={{ maxWidth: 480 }}>
      <MUITabs
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </MUITabs>
    </Box>
  )
}

export function IconTabs() {
  const [value, setValue] = React.useState(0)
  return (
    <MUITabs value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tab icon={<PhoneIcon />} aria-label="phone" />
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<PersonPinIcon />} aria-label="person" />
    </MUITabs>
  )
}

export function IconLabelTabs() {
  const [value, setValue] = React.useState(0)
  return (
    <MUITabs value={value} onChange={(_, newValue) => setValue(newValue)}>
      <Tab icon={<PhoneIcon />} label="RECENTS" />
      <Tab icon={<FavoriteIcon />} label="FAVORITES" />
      <Tab icon={<PersonPinIcon />} label="NEARBY" />
    </MUITabs>
  )
}

export function Vertical() {
  const [value, setValue] = React.useState(0)
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 224,
      }}
    >
      <MUITabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
      </MUITabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  )
}

export function Colors() {
  const [value, setValue] = React.useState(0)
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <MUITabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Primary" />
          <Tab label="Primary" />
        </MUITabs>
      </Box>
      <Box>
        <MUITabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Secondary" />
          <Tab label="Secondary" />
        </MUITabs>
      </Box>
    </Box>
  )
}

export const InteractionTest: Story = {
  render: () => {
    const [value, setValue] = React.useState(0)
    const handleChange = fn((_, newValue: number) => setValue(newValue))

    return (
      <Box sx={{ width: '100%' }} data-testid="tabs-container">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <MUITabs value={value} onChange={handleChange} aria-label="test tabs">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </MUITabs>
        </Box>
        <TabPanel value={value} index={0}>
          Content for Tab One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Content for Tab Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Content for Tab Three
        </TabPanel>
      </Box>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify initial render with first tab selected', async () => {
      const tab1 = canvas.getByRole('tab', { name: /item one/i })
      const tab2 = canvas.getByRole('tab', { name: /item two/i })
      const tab3 = canvas.getByRole('tab', { name: /item three/i })

      await expect(tab1).toBeInTheDocument()
      await expect(tab2).toBeInTheDocument()
      await expect(tab3).toBeInTheDocument()
      await expect(tab1).toHaveAttribute('aria-selected', 'true')
      await expect(canvas.getByText('Content for Tab One')).toBeVisible()
    })

    await step('Click second tab and verify content changes', async () => {
      const tab2 = canvas.getByRole('tab', { name: /item two/i })
      await userEvent.click(tab2)

      await expect(tab2).toHaveAttribute('aria-selected', 'true')
      await expect(canvas.getByText('Content for Tab Two')).toBeVisible()
      // Old content is removed from DOM when tab changes (conditional render)
      expect(canvas.queryByText('Content for Tab One')).toBeNull()
    })

    await step('Click third tab and verify navigation', async () => {
      const tab3 = canvas.getByRole('tab', { name: /item three/i })
      await userEvent.click(tab3)

      await expect(tab3).toHaveAttribute('aria-selected', 'true')
      await expect(canvas.getByText('Content for Tab Three')).toBeVisible()
      await expect(canvas.queryByText('Content for Tab Two')).not.toBeVisible()
    })

    await step('Navigate back to first tab', async () => {
      const tab1 = canvas.getByRole('tab', { name: /item one/i })
      await userEvent.click(tab1)

      await expect(tab1).toHaveAttribute('aria-selected', 'true')
      await expect(canvas.getByText('Content for Tab One')).toBeVisible()
    })
  },
}
