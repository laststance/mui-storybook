import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { expect, fn, userEvent, within } from 'storybook/test'

import {
  createSelectArgType,
  createBooleanArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import Card from './Card'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Surfaces/Card',
  component: Card,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    variant: createSelectArgType(
      ['elevation', 'outlined'],
      'elevation',
      'The variant to use.',
      'Appearance',
    ),
    raised: createBooleanArgType(
      'If true, the card will use raised styling.',
      false,
      'Appearance',
    ),
    elevation: createNumberArgType(
      'Shadow depth, corresponds to dp in the spec.',
      1,
      0,
      24,
      'Appearance',
    ),
    square: createBooleanArgType(
      'If true, rounded corners are disabled.',
      false,
      'Appearance',
    ),
    // Disable children as it requires JSX
    children: { control: false },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Card component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    variant: 'elevation',
    raised: false,
    elevation: 1,
    square: false,
  },
  render: (args) => (
    <Card {...args} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Playground Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the Controls panel to experiment with Card props like variant,
          elevation, and raised.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
}

export const Default: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a default card with CardContent and Typography. It
          demonstrates the basic structure of a Material-UI Card component.
        </Typography>
      </CardContent>
    </Card>
  ),
}

export const MediaCard: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=300"
        alt="Sample image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Media Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card includes CardMedia to display images or videos along with
          content and actions.
        </Typography>
      </CardContent>
    </Card>
  ),
}

export const ActionCard: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Action Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card includes CardActions with interactive buttons for user
          engagement.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
}

export const OutlinedCard: Story = {
  render: () => (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Outlined Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card uses the variant="outlined" prop to display with a border
          instead of elevation shadow.
        </Typography>
      </CardContent>
    </Card>
  ),
}

export const InteractionTest: Story = {
  args: {},
  render: () => {
    const handleClick = fn()
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Interactive Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This card includes interactive elements for testing.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Share
          </Button>
          <Button size="small" onClick={handleClick}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify card structure renders', async () => {
      const heading = canvas.getByText('Interactive Card')
      await expect(heading).toBeInTheDocument()

      const description = canvas.getByText(
        /This card includes interactive elements/,
      )
      await expect(description).toBeInTheDocument()
    })

    await step('Test card action buttons', async () => {
      const shareButton = canvas.getByRole('button', { name: /share/i })
      const learnMoreButton = canvas.getByRole('button', {
        name: /learn more/i,
      })

      await expect(shareButton).toBeInTheDocument()
      await expect(learnMoreButton).toBeInTheDocument()

      await userEvent.click(shareButton)
      await userEvent.click(learnMoreButton)
    })
  },
}
