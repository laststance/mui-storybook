import { addons } from 'storybook/manager-api'
import muiBrandTheme from './MuiBrandTheme'

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: false,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  theme: muiBrandTheme,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
})
