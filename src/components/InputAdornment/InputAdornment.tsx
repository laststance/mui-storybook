import MUIInputAdornment from '@mui/material/InputAdornment'
import React from 'react'

import type { InputAdornmentProps as MUIInputAdornmentProps } from '@mui/material/InputAdornment'

export type InputAdornmentProps = MUIInputAdornmentProps

const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  return <MUIInputAdornment {...props} />
}

export default InputAdornment
