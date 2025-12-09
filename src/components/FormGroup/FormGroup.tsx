import MUIFormGroup from '@mui/material/FormGroup'
import React from 'react'

import type { FormGroupProps as MUIFormGroupProps } from '@mui/material/FormGroup'

export interface FormGroupProps extends MUIFormGroupProps {
  /**
   * The content of the form group, typically checkboxes or switches.
   */
  children?: React.ReactNode
}

const FormGroup: React.FC<FormGroupProps> = (props) => {
  return <MUIFormGroup {...props} />
}

export default FormGroup
