import MUIAvatarGroup from '@mui/material/AvatarGroup'
import React from 'react'

import type { AvatarGroupProps as MUIAvatarGroupProps } from '@mui/material/AvatarGroup'

export interface AvatarGroupProps extends MUIAvatarGroupProps {
  /**
   * The avatars to stack.
   */
  children?: React.ReactNode
}

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  return <MUIAvatarGroup {...props} />
}

export default AvatarGroup
