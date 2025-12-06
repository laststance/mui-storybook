import MUIChip, { type ChipProps } from '@mui/material/Chip'

/**
 * Chip component wrapper around MUI Chip.
 * Supports all standard MUI Chip props.
 */
const Chip: React.FC<ChipProps> = ({ label = 'Chip Filled', ...rest }) => {
  return <MUIChip label={label} {...rest} />
}

export default Chip
