import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

/** Type definition for the four CRAP design principles */
type PrincipleType = 'proximity' | 'alignment' | 'repetition' | 'contrast'

/**
 * Props interface for the DesignPrinciples component.
 * @property showInteractive - Whether to show interactive controls (default: true)
 * @property defaultPrinciple - Which principle tab to show initially (default: 'proximity')
 */
export interface DesignPrinciplesProps {
  showInteractive?: boolean
  defaultPrinciple?: PrincipleType
}

/** Color scheme for each design principle */
const PRINCIPLE_COLORS: Record<PrincipleType, string> = {
  proximity: '#2196F3',
  alignment: '#4CAF50',
  repetition: '#FF9800',
  contrast: '#9C27B0',
}

/** Japanese translations for principle names */
const PRINCIPLE_LABELS: Record<PrincipleType, { en: string; ja: string }> = {
  proximity: { en: 'Proximity', ja: '近接の原則' },
  alignment: { en: 'Alignment', ja: '整列の原則' },
  repetition: { en: 'Repetition', ja: '反復の原則' },
  contrast: { en: 'Contrast', ja: '強弱の原則' },
}

/**
 * Calculates a design quality score based on the active states of all principles.
 * @param states - Object containing boolean states for each principle
 * @returns Score from 0 to 100
 */
const calculateScore = (states: Record<PrincipleType, boolean>): number => {
  const activeCount = Object.values(states).filter(Boolean).length
  return Math.round((activeCount / 4) * 100)
}

/**
 * Renders the Proximity principle demo.
 * Shows grouped vs ungrouped elements to demonstrate visual relationships.
 * @param applied - Whether the proximity principle is applied
 */
const ProximityDemo: React.FC<{ applied: boolean }> = ({ applied }) => {
  const items = [
    { group: 'Contact', items: ['Email', 'Phone', 'Address'] },
    { group: 'Social', items: ['Twitter', 'LinkedIn', 'GitHub'] },
  ]

  return (
    <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', py: 2 }}>
      {applied ? (
        <Box sx={{ display: 'flex', gap: 4 }}>
          {items.map((group) => (
            <Paper
              key={group.group}
              elevation={0}
              sx={{
                p: 2,
                bgcolor: 'action.hover',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}
              >
                {group.group}
              </Typography>
              {group.items.map((item) => (
                <Typography key={item} variant="body2" sx={{ py: 0.25 }}>
                  {item}
                </Typography>
              ))}
            </Paper>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 300 }}>
          {items.flatMap((group) =>
            [group.group, ...group.items].map((item, index) => (
              <Paper
                key={`${item}-${index}`}
                elevation={0}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2">{item}</Typography>
              </Paper>
            )),
          )}
        </Box>
      )}
    </Box>
  )
}

/**
 * Renders the Alignment principle demo.
 * Shows aligned vs misaligned elements with optional grid overlay.
 * @param applied - Whether the alignment principle is applied
 * @param showGrid - Whether to show the alignment grid overlay
 */
const AlignmentDemo: React.FC<{ applied: boolean; showGrid: boolean }> = ({
  applied,
  showGrid,
}) => {
  const formFields = ['Name', 'Email', 'Company', 'Message']

  return (
    <Box sx={{ position: 'relative', py: 2 }}>
      {showGrid && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(76, 175, 80, 0.15) 23px, rgba(76, 175, 80, 0.15) 24px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: applied ? 1.5 : 1,
          maxWidth: 280,
          mx: 'auto',
        }}
      >
        {formFields.map((field, index) => (
          <Box
            key={field}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              ml: applied ? 0 : `${(index % 3) * 12}px`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                minWidth: applied ? 70 : 'auto',
                textAlign: applied ? 'right' : 'left',
                fontWeight: 500,
              }}
            >
              {field}:
            </Typography>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                height: 32,
                bgcolor: 'action.hover',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * Renders the Repetition principle demo.
 * Shows consistent vs inconsistent styling patterns.
 * @param applied - Whether the repetition principle is applied
 */
const RepetitionDemo: React.FC<{ applied: boolean }> = ({ applied }) => {
  const items = [
    { icon: 'A', title: 'Analytics', desc: 'Track your metrics' },
    { icon: 'B', title: 'Billing', desc: 'Manage payments' },
    { icon: 'C', title: 'Contacts', desc: 'Organize users' },
  ]

  const inconsistentStyles = [
    { bg: '#E3F2FD', radius: 1, iconSize: 36 },
    { bg: '#FFF3E0', radius: 3, iconSize: 28 },
    { bg: '#E8F5E9', radius: 0, iconSize: 42 },
  ]

  return (
    <Box
      sx={{ display: 'flex', gap: 2, justifyContent: 'center', py: 2, px: 1 }}
    >
      {items.map((item, index) => (
        <Paper
          key={item.title}
          elevation={0}
          sx={{
            p: applied ? 2 : 1.5,
            flex: 1,
            maxWidth: 140,
            bgcolor: applied ? 'action.hover' : inconsistentStyles[index].bg,
            borderRadius: applied ? 2 : inconsistentStyles[index].radius,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: applied ? 40 : inconsistentStyles[index].iconSize,
              height: applied ? 40 : inconsistentStyles[index].iconSize,
              borderRadius: '50%',
              bgcolor: applied ? 'primary.main' : 'grey.400',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1,
              fontSize: applied ? 18 : 14 + index * 2,
              fontWeight: 600,
            }}
          >
            {item.icon}
          </Box>
          <Typography
            variant={applied ? 'subtitle2' : index === 1 ? 'body1' : 'caption'}
            sx={{ fontWeight: applied ? 600 : 400 + index * 100 }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', fontSize: applied ? 12 : 10 + index }}
          >
            {item.desc}
          </Typography>
        </Paper>
      ))}
    </Box>
  )
}

/**
 * Renders the Contrast principle demo.
 * Shows hierarchy through size, color, and weight differences.
 * @param contrastLevel - Contrast intensity from 0 to 100
 */
const ContrastDemo: React.FC<{ contrastLevel: number }> = ({
  contrastLevel,
}) => {
  const baseSize = 14
  const basePadding = 8
  const maxSizeIncrease = 24
  const maxPaddingIncrease = 16

  const factor = contrastLevel / 100

  const headingSize = baseSize + maxSizeIncrease * factor
  const headingWeight = 400 + Math.round(500 * factor)
  const buttonPadding = basePadding + maxPaddingIncrease * factor
  const buttonOpacity = 0.3 + 0.7 * factor

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: headingSize,
          fontWeight: headingWeight,
          color: `rgba(0, 0, 0, ${0.4 + 0.6 * factor})`,
          transition: 'all 0.2s ease',
        }}
      >
        Main Heading
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 280,
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        Supporting text that provides additional context and details about the
        main topic.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            px: `${buttonPadding}px`,
            py: `${buttonPadding / 2}px`,
            bgcolor: `rgba(33, 150, 243, ${buttonOpacity})`,
            color: factor > 0.5 ? 'white' : 'primary.main',
            borderRadius: 1,
            fontWeight: 500,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Primary Action
        </Paper>
        <Paper
          elevation={0}
          sx={{
            px: `${basePadding}px`,
            py: `${basePadding / 2}px`,
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            fontSize: 14,
            color: 'text.secondary',
            cursor: 'pointer',
          }}
        >
          Secondary
        </Paper>
      </Box>
    </Box>
  )
}

/**
 * Renders the design quality score indicator.
 * @param score - Score from 0 to 100
 */
const ScoreIndicator: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 75) return '#4CAF50'
    if (score >= 50) return '#FF9800'
    return '#F44336'
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1,
        bgcolor: 'action.hover',
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        Design Quality:
      </Typography>
      <Box sx={{ flex: 1, position: 'relative', height: 8, borderRadius: 4 }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'grey.200',
            borderRadius: 4,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${score}%`,
            bgcolor: getColor(),
            borderRadius: 4,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: getColor(), minWidth: 40 }}
      >
        {score}%
      </Typography>
    </Paper>
  )
}

/**
 * DesignPrinciples - An educational component explaining the 4 fundamental design principles (CRAP).
 *
 * This component provides interactive demonstrations of:
 * - Proximity (grouping related elements)
 * - Alignment (creating visual connections)
 * - Repetition (maintaining consistency)
 * - Contrast (establishing hierarchy)
 *
 * Each principle has a before/after toggle and visual demonstrations.
 *
 * @param props - Component props
 * @param props.showInteractive - Whether to show interactive controls (default: true)
 * @param props.defaultPrinciple - Which principle to show initially (default: 'proximity')
 * @returns React component
 *
 * @example
 * // Basic usage
 * <DesignPrinciples />
 *
 * @example
 * // Start with contrast principle
 * <DesignPrinciples defaultPrinciple="contrast" />
 *
 * @example
 * // Non-interactive mode
 * <DesignPrinciples showInteractive={false} />
 */
const DesignPrinciples: React.FC<DesignPrinciplesProps> = ({
  showInteractive = true,
  defaultPrinciple = 'proximity',
}) => {
  const [activeTab, setActiveTab] = useState<PrincipleType>(defaultPrinciple)
  const [principleStates, setPrincipleStates] = useState<
    Record<PrincipleType, boolean>
  >({
    proximity: true,
    alignment: true,
    repetition: true,
    contrast: true,
  })
  const [showAlignmentGrid, setShowAlignmentGrid] = useState(false)
  const [contrastLevel, setContrastLevel] = useState(75)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue as PrincipleType)
  }

  const handleToggle = (principle: PrincipleType) => {
    setPrincipleStates((prev) => ({
      ...prev,
      [principle]: !prev[principle],
    }))
  }

  const score = calculateScore(principleStates)

  const renderPrincipleContent = () => {
    switch (activeTab) {
      case 'proximity':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Related items should be grouped together. Items that are not
              related should be separated. This creates visual organization and
              helps users understand information hierarchy.
            </Typography>
            <ProximityDemo applied={principleStates.proximity} />
            {showInteractive && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={principleStates.proximity}
                      onChange={() => handleToggle('proximity')}
                      color="primary"
                    />
                  }
                  label={principleStates.proximity ? 'Grouped' : 'Ungrouped'}
                />
              </Box>
            )}
          </Box>
        )

      case 'alignment':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Every element should have a visual connection with another element
              on the page. Proper alignment creates a cleaner, more
              sophisticated design.
            </Typography>
            <AlignmentDemo
              applied={principleStates.alignment}
              showGrid={showAlignmentGrid}
            />
            {showInteractive && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={principleStates.alignment}
                      onChange={() => handleToggle('alignment')}
                      color="primary"
                    />
                  }
                  label={principleStates.alignment ? 'Aligned' : 'Misaligned'}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showAlignmentGrid}
                      onChange={(e) => setShowAlignmentGrid(e.target.checked)}
                      color="secondary"
                    />
                  }
                  label="Show Grid"
                />
              </Box>
            )}
          </Box>
        )

      case 'repetition':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Repeat visual elements throughout the design. Consistency in
              colors, fonts, shapes, and spacing creates a cohesive and
              professional appearance.
            </Typography>
            <RepetitionDemo applied={principleStates.repetition} />
            {showInteractive && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={principleStates.repetition}
                      onChange={() => handleToggle('repetition')}
                      color="primary"
                    />
                  }
                  label={
                    principleStates.repetition ? 'Consistent' : 'Inconsistent'
                  }
                />
              </Box>
            )}
          </Box>
        )

      case 'contrast':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              If two elements are not the same, make them very different.
              Contrast creates visual interest and establishes hierarchy through
              size, color, and weight differences.
            </Typography>
            <ContrastDemo contrastLevel={contrastLevel} />
            {showInteractive && (
              <Box sx={{ mt: 2, px: 4 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                >
                  Contrast Level
                </Typography>
                <Slider
                  value={contrastLevel}
                  onChange={(_e, value) => setContrastLevel(value as number)}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  sx={{ color: PRINCIPLE_COLORS.contrast }}
                />
              </Box>
            )}
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Design Principles
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        The four fundamental principles of visual design (CRAP): Contrast,
        Repetition, Alignment, and Proximity.
      </Typography>

      {showInteractive && (
        <Box sx={{ mb: 3 }}>
          <ScoreIndicator score={score} />
        </Box>
      )}

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
            },
          }}
        >
          {(['proximity', 'alignment', 'repetition', 'contrast'] as const).map(
            (principle) => (
              <Tab
                key={principle}
                value={principle}
                label={
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {PRINCIPLE_LABELS[principle].en}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ fontSize: 10, opacity: 0.85 }} // Improved from 0.7 for better contrast
                    >
                      {PRINCIPLE_LABELS[principle].ja}
                    </Typography>
                  </Box>
                }
                sx={{
                  '&.Mui-selected': {
                    color: PRINCIPLE_COLORS[principle],
                  },
                }}
              />
            ),
          )}
        </Tabs>

        <Box
          sx={{
            p: 3,
            minHeight: 280,
            borderTop: '3px solid',
            borderColor: PRINCIPLE_COLORS[activeTab],
          }}
        >
          {renderPrincipleContent()}
        </Box>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Toggle the switches to see before/after comparisons. Each principle
          contributes to the overall design quality score.
        </Typography>
      </Box>
    </Box>
  )
}

export default DesignPrinciples
