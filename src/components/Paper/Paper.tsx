import MUIPaper, { type PaperProps } from '@mui/material/Paper'

/**
 * Paper component wrapper around MUI Paper.
 * Supports all standard MUI Paper props.
 */
const Paper: React.FC<PaperProps> = (props) => {
  return <MUIPaper {...props} />
}

export default Paper
