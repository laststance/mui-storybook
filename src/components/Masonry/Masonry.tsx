import MUIMasonry from '@mui/lab/Masonry'
import React from 'react'

import type { MasonryProps as MUIMasonryProps } from '@mui/lab/Masonry'

export type MasonryProps = MUIMasonryProps

const Masonry: React.FC<MasonryProps> = (props) => {
  return <MUIMasonry {...props} />
}

export default Masonry
