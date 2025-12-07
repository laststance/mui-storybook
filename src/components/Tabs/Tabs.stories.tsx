import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import PhoneIcon from '@mui/icons-material/Phone'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MUITabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import React from 'react'

import Tabs from './Tabs'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
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
