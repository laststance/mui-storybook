import MUITextareaAutosize from '@mui/material/TextareaAutosize'
import React from 'react'

import type { TextareaAutosizeProps as MUITextareaAutosizeProps } from '@mui/material/TextareaAutosize'

export type TextareaAutosizeProps = MUITextareaAutosizeProps

const TextareaAutosize: React.FC<TextareaAutosizeProps> = (props) => {
  return <MUITextareaAutosize {...props} />
}

export default TextareaAutosize
