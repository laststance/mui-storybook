import { setProjectAnnotations } from '@storybook/react-vite'

import * as previewAnnotations from './preview'

// This applies Storybook's decorators and parameters to Vitest tests
setProjectAnnotations([previewAnnotations])
