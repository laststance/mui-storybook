import MUITextField, { type TextFieldProps } from '@mui/material/TextField'
import React from 'react'

const TextField: React.FC<TextFieldProps> = (props) => {
  return <MUITextField {...props} />
}

export default TextField
