import MUISelect, { type SelectProps } from '@mui/material/Select'

/**
 * Select component wrapper around MUI Select.
 * Supports all standard MUI Select props.
 */
const Select = <T,>(props: SelectProps<T>) => {
  return <MUISelect {...props} />
}

export default Select
