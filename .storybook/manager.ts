import { addons } from 'storybook/manager-api'

import muiBrandTheme from './MuiBrandTheme'

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
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
