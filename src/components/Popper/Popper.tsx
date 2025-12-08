import MUIPopper from '@mui/material/Popper'
import React from 'react'

import type { PopperProps as MUIPopperProps } from '@mui/material/Popper'

export type PopperProps = MUIPopperProps

const Popper: React.FC<PopperProps> = (props) => {
  return <MUIPopper {...props} />
}

export default Popper
