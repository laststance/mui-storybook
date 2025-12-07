import { createTheme as createDesignToken } from '@mui/material/styles'

import tokenJson from './tokenJson'
import { assertCast } from './types'

import type { CreateDesignToken, DesignToken } from './types'
assertCast<CreateDesignToken>(createDesignToken)

export const designToken: DesignToken = createDesignToken(tokenJson)

export default createDesignToken
