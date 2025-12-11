import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'

import * as previewAnnotations from './preview'

// This applies Storybook's decorators and parameters to Vitest tests
setProjectAnnotations([a11yAddonAnnotations, previewAnnotations])
