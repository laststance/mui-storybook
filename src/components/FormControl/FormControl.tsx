import MUIFormControl from '@mui/material/FormControl'
import React from 'react'

import type { FormControlProps as MUIFormControlProps } from '@mui/material/FormControl'

export interface FormControlProps extends MUIFormControlProps {
  /**
   * The content of the form control.
   */
  children?: React.ReactNode
}

const FormControl: React.FC<FormControlProps> = (props) => {
  return <MUIFormControl {...props} />
}

export default FormControl
