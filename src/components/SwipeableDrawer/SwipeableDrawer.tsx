import MUISwipeableDrawer from '@mui/material/SwipeableDrawer'
import React from 'react'

import type { SwipeableDrawerProps as MUISwipeableDrawerProps } from '@mui/material/SwipeableDrawer'

export type SwipeableDrawerProps = MUISwipeableDrawerProps

const SwipeableDrawer: React.FC<SwipeableDrawerProps> = (props) => {
  return <MUISwipeableDrawer {...props} />
}

export default SwipeableDrawer
