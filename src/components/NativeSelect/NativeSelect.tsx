import MUINativeSelect from '@mui/material/NativeSelect'
import React from 'react'

import type { NativeSelectProps as MUINativeSelectProps } from '@mui/material/NativeSelect'

export type NativeSelectProps = MUINativeSelectProps

const NativeSelect: React.FC<NativeSelectProps> = (props) => {
  return <MUINativeSelect {...props} />
}

export default NativeSelect
