import MUICard, { type CardProps } from '@mui/material/Card'

/**
 * Card component wrapper around MUI Card.
 * Supports all standard MUI Card props.
 */
const Card: React.FC<CardProps> = (props) => {
  return <MUICard {...props} />
}

export default Card
