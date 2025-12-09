import MUIIconButton from '@mui/material/IconButton'
import React from 'react'

import type { IconButtonProps as MUIIconButtonProps } from '@mui/material/IconButton'

export interface IconButtonProps extends MUIIconButtonProps {
  /**
   * The icon to display.
   */
  children?: React.ReactNode
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MUIIconButton {...props} />
}

export default IconButton
