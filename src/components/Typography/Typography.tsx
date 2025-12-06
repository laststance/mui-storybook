import MUITypography, { type TypographyProps } from '@mui/material/Typography'

const Typography: React.FC<TypographyProps> = ({ children = 'Typography', ...props }) => {
  return <MUITypography {...props}>{children}</MUITypography>
}

export default Typography
