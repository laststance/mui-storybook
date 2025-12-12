import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'

/**
 * A single feature in the comparison table.
 */
export interface ComparisonFeature {
  /** Unique identifier for the feature */
  id: string
  /** Display name of the feature */
  name: string
  /** Optional description or tooltip */
  description?: string
  /** Category for grouping features */
  category?: string
  /** Values for each option (keyed by option id) */
  values: Record<string, boolean | string | number | React.ReactNode>
}

/**
 * An option (column) in the comparison table.
 */
export interface ComparisonOption {
  /** Unique identifier for the option */
  id: string
  /** Display name (e.g., plan name) */
  name: string
  /** Subtitle or tagline */
  subtitle?: string
  /** Price display */
  price?: string
  /** Price period (e.g., "/month") */
  pricePeriod?: string
  /** Original price for showing discount */
  originalPrice?: string
  /** Whether this is the recommended/highlighted option */
  highlighted?: boolean
  /** Badge text (e.g., "Most Popular") */
  badge?: string
  /** Badge color */
  badgeColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  /** Call to action button text */
  ctaText?: string
  /** Call to action button variant */
  ctaVariant?: 'text' | 'outlined' | 'contained'
  /** Whether the CTA is disabled */
  ctaDisabled?: boolean
  /** Header background color */
  headerColor?: string
}

/**
 * Props for the ComparisonLayout component.
 */
export interface ComparisonLayoutProps {
  /** Comparison options (columns) */
  options: ComparisonOption[]
  /** Features to compare (rows) */
  features: ComparisonFeature[]
  /** Title for the comparison table */
  title?: string
  /** Subtitle or description */
  subtitle?: string
  /** Whether to group features by category */
  groupByCategory?: boolean
  /** Whether to show feature names in a sticky column */
  stickyFirstColumn?: boolean
  /** Whether to show the header row as sticky */
  stickyHeader?: boolean
  /** Maximum height for scrollable container */
  maxHeight?: number | string
  /** Whether to show check/cross icons for boolean values */
  showIcons?: boolean
  /** Callback when CTA button is clicked */
  onCtaClick?: (optionId: string) => void
  /** Custom renderer for feature values */
  renderValue?: (
    value: boolean | string | number | React.ReactNode,
    feature: ComparisonFeature,
    option: ComparisonOption,
  ) => React.ReactNode
  /** Elevation of the container */
  elevation?: number
  /** Whether to use dense table styling */
  dense?: boolean
}

/**
 * ComparisonLayout provides side-by-side feature and pricing comparison tables.
 *
 * This layout pattern is ideal for:
 * - SaaS pricing pages with plan comparisons
 * - Product spec comparisons
 * - Service tier comparisons
 * - Feature matrices
 * - Vendor/tool comparisons
 *
 * @param props - ComparisonLayout configuration
 * @returns A comparison table with options and features
 *
 * @example
 * // Basic pricing comparison
 * <ComparisonLayout
 *   options={[
 *     { id: 'basic', name: 'Basic', price: '$9', pricePeriod: '/mo' },
 *     { id: 'pro', name: 'Pro', price: '$29', pricePeriod: '/mo', highlighted: true },
 *     { id: 'enterprise', name: 'Enterprise', price: 'Custom' },
 *   ]}
 *   features={[
 *     { id: 'users', name: 'Users', values: { basic: '1', pro: '5', enterprise: 'Unlimited' } },
 *     { id: 'storage', name: 'Storage', values: { basic: '5GB', pro: '50GB', enterprise: '500GB' } },
 *   ]}
 * />
 *
 * @example
 * // Feature comparison with boolean values
 * <ComparisonLayout
 *   options={products}
 *   features={[
 *     { id: 'api', name: 'API Access', values: { basic: false, pro: true, enterprise: true } },
 *   ]}
 *   showIcons={true}
 * />
 */
const ComparisonLayout: React.FC<ComparisonLayoutProps> = ({
  options,
  features,
  title,
  subtitle,
  groupByCategory = false,
  stickyFirstColumn = true,
  stickyHeader = true,
  maxHeight,
  showIcons = true,
  onCtaClick,
  renderValue,
  elevation = 0,
  dense = false,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Group features by category if enabled
  const groupedFeatures = React.useMemo(() => {
    if (!groupByCategory) {
      return [{ category: '', features }]
    }

    const groups: Record<string, ComparisonFeature[]> = {}
    features.forEach((feature) => {
      const category = feature.category ?? 'Other'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(feature)
    })

    return Object.entries(groups).map(([category, categoryFeatures]) => ({
      category,
      features: categoryFeatures,
    }))
  }, [features, groupByCategory])

  /**
   * Render a feature value with appropriate formatting.
   *
   * @param value - The value to render
   * @param feature - The feature configuration
   * @param option - The option configuration
   * @returns Rendered value node
   */
  const defaultRenderValue = (
    value: boolean | string | number | React.ReactNode,
    feature: ComparisonFeature,
    option: ComparisonOption,
  ): React.ReactNode => {
    if (renderValue) {
      return renderValue(value, feature, option)
    }

    if (typeof value === 'boolean') {
      if (showIcons) {
        return value ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <CloseIcon color="disabled" fontSize="small" />
        )
      }
      return value ? 'Yes' : 'No'
    }

    if (value === null || value === undefined || value === '') {
      return <RemoveIcon color="disabled" fontSize="small" />
    }

    return value
  }

  return (
    <Box>
      {/* Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          {title && (
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight={700}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Comparison Table */}
      <TableContainer
        component={Paper}
        elevation={elevation}
        sx={{
          maxHeight,
          border: elevation === 0 ? 1 : 0,
          borderColor: 'divider',
        }}
      >
        <Table
          stickyHeader={stickyHeader}
          size={dense ? 'small' : 'medium'}
          aria-label="Comparison table"
        >
          {/* Table Header with Options */}
          <TableHead>
            <TableRow>
              {/* Empty cell for feature column */}
              <TableCell
                sx={{
                  position: stickyFirstColumn ? 'sticky' : 'static',
                  left: 0,
                  bgcolor: 'background.paper',
                  zIndex:
                    stickyHeader && stickyFirstColumn
                      ? 3
                      : stickyFirstColumn
                        ? 1
                        : 0,
                  minWidth: isMobile ? 120 : 180,
                  borderRight: 1,
                  borderColor: 'divider',
                }}
              />

              {/* Option Headers */}
              {options.map((option) => (
                <TableCell
                  key={option.id}
                  align="center"
                  sx={{
                    minWidth: isMobile ? 140 : 180,
                    bgcolor: option.highlighted
                      ? (option.headerColor ?? 'primary.main')
                      : (option.headerColor ?? 'background.paper'),
                    color: option.highlighted
                      ? 'primary.contrastText'
                      : 'text.primary',
                    position: 'relative',
                    pt: option.badge ? 4 : 2,
                    pb: 2,
                  }}
                >
                  {/* Badge */}
                  {option.badge && (
                    <Chip
                      label={option.badge}
                      color={option.badgeColor ?? 'primary'}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  )}

                  {/* Option Name */}
                  <Typography variant="h6" component="div" fontWeight={700}>
                    {option.name}
                  </Typography>

                  {/* Subtitle */}
                  {option.subtitle && (
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.8,
                        mb: 1,
                      }}
                    >
                      {option.subtitle}
                    </Typography>
                  )}

                  {/* Price */}
                  {option.price && (
                    <Box sx={{ my: 1 }}>
                      {option.originalPrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            opacity: 0.6,
                          }}
                        >
                          {option.originalPrice}
                        </Typography>
                      )}
                      <Typography
                        variant="h4"
                        component="span"
                        fontWeight={700}
                      >
                        {option.price}
                      </Typography>
                      {option.pricePeriod && (
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ opacity: 0.8 }}
                        >
                          {option.pricePeriod}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* CTA Button */}
                  {option.ctaText && (
                    <Button
                      variant={
                        option.ctaVariant ??
                        (option.highlighted ? 'contained' : 'outlined')
                      }
                      color={option.highlighted ? 'inherit' : 'primary'}
                      size="small"
                      disabled={option.ctaDisabled}
                      onClick={() => onCtaClick?.(option.id)}
                      sx={{
                        mt: 1,
                        ...(option.highlighted && {
                          bgcolor: 'background.paper',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'grey.100',
                          },
                        }),
                      }}
                    >
                      {option.ctaText}
                    </Button>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body with Features */}
          <TableBody>
            {groupedFeatures.map((group) => (
              <React.Fragment key={group.category}>
                {/* Category Header */}
                {groupByCategory && group.category && (
                  <TableRow>
                    <TableCell
                      colSpan={options.length + 1}
                      sx={{
                        bgcolor: 'action.hover',
                        fontWeight: 700,
                        py: 1,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={700}>
                        {group.category}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {/* Feature Rows */}
                {group.features.map((feature, index) => (
                  <TableRow
                    key={feature.id}
                    sx={{
                      '&:nth-of-type(odd)': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    {/* Feature Name */}
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        position: stickyFirstColumn ? 'sticky' : 'static',
                        left: 0,
                        bgcolor:
                          index % 2 === 0 ? 'action.hover' : 'background.paper',
                        zIndex: 1,
                        borderRight: 1,
                        borderColor: 'divider',
                        fontWeight: 500,
                      }}
                    >
                      {feature.description ? (
                        <Tooltip title={feature.description} arrow>
                          <Typography
                            variant="body2"
                            sx={{
                              cursor: 'help',
                              textDecoration: 'underline',
                              textDecorationStyle: 'dotted',
                              textUnderlineOffset: 3,
                            }}
                          >
                            {feature.name}
                          </Typography>
                        </Tooltip>
                      ) : (
                        <Typography variant="body2">{feature.name}</Typography>
                      )}
                    </TableCell>

                    {/* Feature Values */}
                    {options.map((option) => (
                      <TableCell
                        key={option.id}
                        align="center"
                        sx={{
                          bgcolor: option.highlighted
                            ? 'primary.50'
                            : 'inherit',
                        }}
                      >
                        {defaultRenderValue(
                          feature.values[option.id],
                          feature,
                          option,
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ComparisonLayout
