import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import Card from './Card'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Surfaces/Card',
  component: Card,
  tags: [], // autodocs disabled - using custom MDX documentation,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

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
