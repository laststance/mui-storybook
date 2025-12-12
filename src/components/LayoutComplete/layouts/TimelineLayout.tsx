import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React from 'react'

/**
 * Configuration for a single timeline event.
 */
export interface TimelineEvent {
  /** Unique identifier for the event */
  id: string
  /** Title of the event */
  title: string
  /** Description or details of the event */
  description?: string
  /** Timestamp or date string to display */
  timestamp: string
  /** Secondary time info (e.g., "2 hours ago") */
  secondaryTime?: string
  /** Icon to display in the timeline dot */
  icon?: React.ReactNode
  /** Color of the timeline dot */
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'grey'
  /** Variant of the timeline dot */
  variant?: 'filled' | 'outlined'
  /** Additional content to render below the description */
  content?: React.ReactNode
  /** Status indicator for styling */
  status?: 'completed' | 'current' | 'pending' | 'error'
}

/**
 * Props for the TimelineLayout component.
 */
export interface TimelineLayoutProps {
  /** Array of timeline events in chronological order */
  events: TimelineEvent[]
  /** Position of the timeline content relative to the line */
  position?: 'left' | 'right' | 'alternate' | 'alternate-reverse'
  /** Whether to show opposite content (timestamps on the other side) */
  showOppositeContent?: boolean
  /** Maximum width of the timeline container */
  maxWidth?: number | string
  /** Whether to show connectors between events */
  showConnectors?: boolean
  /** Custom connector style */
  connectorColor?: string
  /** Elevation of content cards */
  elevation?: number
  /** Whether content should be in cards */
  cardStyle?: boolean
  /** Gap between the dot and content */
  contentGap?: number
}

/**
 * TimelineLayout displays a chronological sequence of events.
 *
 * This layout pattern is ideal for:
 * - Order tracking and delivery status updates
 * - Activity feeds and audit logs
 * - Project milestones and roadmaps
 * - Historical timelines and event sequences
 * - Onboarding progress indicators
 *
 * @param props - TimelineLayout configuration
 * @returns A vertical timeline with event cards
 *
 * @example
 * // Basic order tracking timeline
 * <TimelineLayout
 *   events={[
 *     { id: '1', title: 'Order Placed', timestamp: '10:30 AM', status: 'completed' },
 *     { id: '2', title: 'Processing', timestamp: '11:00 AM', status: 'completed' },
 *     { id: '3', title: 'Shipped', timestamp: '2:00 PM', status: 'current' },
 *     { id: '4', title: 'Delivered', timestamp: 'Expected', status: 'pending' },
 *   ]}
 *   position="right"
 * />
 *
 * @example
 * // Alternating timeline with icons
 * <TimelineLayout
 *   events={events}
 *   position="alternate"
 *   showOppositeContent={true}
 * />
 */
const TimelineLayout: React.FC<TimelineLayoutProps> = ({
  events,
  position = 'right',
  showOppositeContent = false,
  maxWidth = 800,
  showConnectors = true,
  connectorColor,
  elevation = 0,
  cardStyle = true,
  contentGap = 2,
}) => {
  /**
   * Get the appropriate dot color based on event status.
   *
   * @param event - Timeline event configuration
   * @returns MUI color for the TimelineDot
   */
  const getDotColor = (event: TimelineEvent) => {
    if (event.color) return event.color
    switch (event.status) {
      case 'completed':
        return 'success'
      case 'current':
        return 'primary'
      case 'error':
        return 'error'
      case 'pending':
      default:
        return 'grey'
    }
  }

  /**
   * Get the dot variant based on event status.
   *
   * @param event - Timeline event configuration
   * @returns 'filled' or 'outlined'
   */
  const getDotVariant = (event: TimelineEvent) => {
    if (event.variant) return event.variant
    return event.status === 'pending' ? 'outlined' : 'filled'
  }

  return (
    <Box
      sx={{
        maxWidth,
        mx: 'auto',
        width: '100%',
      }}
    >
      <Timeline position={position}>
        {events.map((event, index) => {
          const isLast = index === events.length - 1

          return (
            <TimelineItem key={event.id}>
              {/* Opposite content (timestamps on other side) */}
              {(showOppositeContent ||
                position === 'alternate' ||
                position === 'alternate-reverse') && (
                <TimelineOppositeContent
                  sx={{
                    m: 'auto 0',
                    flex:
                      position === 'left' || position === 'right'
                        ? 0.3
                        : undefined,
                  }}
                  color="text.secondary"
                  variant="body2"
                >
                  <Typography variant="body2" fontWeight={500}>
                    {event.timestamp}
                  </Typography>
                  {event.secondaryTime && (
                    <Typography variant="caption" color="text.secondary">
                      {event.secondaryTime}
                    </Typography>
                  )}
                </TimelineOppositeContent>
              )}

              {/* Timeline separator (dot and connector) */}
              <TimelineSeparator>
                <TimelineDot
                  color={getDotColor(event)}
                  variant={getDotVariant(event)}
                  sx={{
                    boxShadow: event.status === 'current' ? 3 : 0,
                  }}
                >
                  {event.icon}
                </TimelineDot>
                {showConnectors && !isLast && (
                  <TimelineConnector
                    sx={{
                      bgcolor:
                        connectorColor ??
                        (event.status === 'completed'
                          ? 'success.main'
                          : 'grey.300'),
                    }}
                  />
                )}
              </TimelineSeparator>

              {/* Main content */}
              <TimelineContent sx={{ py: `${contentGap * 8}px`, px: 2 }}>
                {cardStyle ? (
                  <Paper
                    elevation={elevation}
                    sx={{
                      p: 2,
                      bgcolor:
                        event.status === 'current'
                          ? 'action.selected'
                          : 'background.paper',
                      border: elevation === 0 ? 1 : 0,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      fontWeight={600}
                      sx={{
                        color:
                          event.status === 'pending'
                            ? 'text.secondary'
                            : 'text.primary',
                      }}
                    >
                      {event.title}
                    </Typography>
                    {!showOppositeContent &&
                      position !== 'alternate' &&
                      position !== 'alternate-reverse' && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {event.timestamp}
                          {event.secondaryTime && ` - ${event.secondaryTime}`}
                        </Typography>
                      )}
                    {event.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {event.description}
                      </Typography>
                    )}
                    {event.content && <Box sx={{ mt: 2 }}>{event.content}</Box>}
                  </Paper>
                ) : (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      fontWeight={600}
                      sx={{
                        color:
                          event.status === 'pending'
                            ? 'text.secondary'
                            : 'text.primary',
                      }}
                    >
                      {event.title}
                    </Typography>
                    {!showOppositeContent && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        {event.timestamp}
                      </Typography>
                    )}
                    {event.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {event.description}
                      </Typography>
                    )}
                    {event.content}
                  </Box>
                )}
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </Box>
  )
}

export default TimelineLayout
