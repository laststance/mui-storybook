import MUIToolbar from '@mui/material/Toolbar'
import React from 'react'

import type { ToolbarProps as MUIToolbarProps } from '@mui/material/Toolbar'

export interface ToolbarProps extends MUIToolbarProps {
  /**
   * The content of the toolbar.
   */
  children?: React.ReactNode
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return <MUIToolbar {...props} />
}

export default Toolbar
