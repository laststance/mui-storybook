import MUIDivider, { type DividerProps } from '@mui/material/Divider'

/**
 * Divider component wrapper around MUI Divider.
 * A thin line that groups content in lists and layouts.
 * Supports all standard MUI Divider props.
 */
const Divider: React.FC<DividerProps> = (props) => {
  return <MUIDivider {...props} />
}

export default Divider
