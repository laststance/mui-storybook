import MUICheckbox, { type CheckboxProps } from '@mui/material/Checkbox'

/**
 * Checkbox component wrapper around MUI Checkbox.
 * Supports all standard MUI Checkbox props.
 */
const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MUICheckbox {...props} />
}

export default Checkbox
