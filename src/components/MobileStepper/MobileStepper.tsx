import MUIMobileStepper from '@mui/material/MobileStepper'
import React from 'react'

import type { MobileStepperProps as MUIMobileStepperProps } from '@mui/material/MobileStepper'

export type MobileStepperProps = MUIMobileStepperProps

const MobileStepper: React.FC<MobileStepperProps> = (props) => {
  return <MUIMobileStepper {...props} />
}

export default MobileStepper
