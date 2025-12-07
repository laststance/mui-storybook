import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FeaturesIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import CloudIcon from '@mui/icons-material/Cloud'
import ContactIcon from '@mui/icons-material/Email'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MenuIcon from '@mui/icons-material/Menu'
import PricingIcon from '@mui/icons-material/Payments'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SecurityIcon from '@mui/icons-material/Security'
import SendIcon from '@mui/icons-material/Send'
import SpeedIcon from '@mui/icons-material/Speed'
import StarIcon from '@mui/icons-material/Star'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Examples/Mobile Landing',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const features = [
  {
    icon: <SpeedIcon />,
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-second load times',
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure by Default',
    description: 'End-to-end encryption for all your data',
  },
  {
    icon: <CloudIcon />,
    title: 'Cloud Sync',
    description: 'Access your data anywhere, anytime',
  },
  {
    icon: <PhoneIphoneIcon />,
    title: 'Mobile First',
    description: 'Designed for the best mobile experience',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    rating: 5,
    comment: 'This app has transformed how our team works!',
  },
  {
    name: 'Mike Chen',
    role: 'Developer',
    rating: 5,
    comment: "Best developer experience I've ever had.",
  },
  {
    name: 'Emily Davis',
    role: 'Designer',
    rating: 4,
    comment: 'Beautiful UI and intuitive to use.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    features: ['5 Projects', '1GB Storage', 'Basic Support'],
  },
  {
    name: 'Pro',
    price: 19,
    features: [
      'Unlimited Projects',
      '100GB Storage',
      'Priority Support',
      'Advanced Analytics',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 49,
    features: [
      'Everything in Pro',
      'Custom Integrations',
      'Dedicated Support',
      'SLA',
    ],
  },
]

const faqs = [
  {
    question: 'How do I get started?',
    answer:
      "Simply download the app from the App Store or Google Play, create an account, and you're ready to go!",
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! All paid plans come with a 14-day free trial. No credit card required.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. You can cancel your subscription at any time with no questions asked.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
]

/**
 * Complete mobile landing page with all sections
 */
export const CompleteLanding: Story = {
  render: () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [bottomNav, setBottomNav] = useState(0)

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
      <Box sx={{ pb: 7, bgcolor: 'background.default' }}>
        {/* Header */}
        <AppBar position="sticky" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <RocketLaunchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              AppLaunch
            </Typography>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 280, pt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Menu
              </Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <List>
              {['Home', 'Features', 'Pricing', 'FAQ', 'Contact'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Button variant="contained" fullWidth size="large">
                Download Now
              </Button>
            </Box>
          </Box>
        </Drawer>

        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 6,
            px: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Build Amazing Apps
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            The fastest way to launch your mobile app with beautiful UI
            components.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<AppleIcon />}
            >
              App Store
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<AndroidIcon />}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Play Store
            </Button>
          </Stack>
          <Box sx={{ mt: 4 }}>
            <Chip
              icon={<StarIcon />}
              label="4.9 Rating • 10K+ Downloads"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Box>

        {/* Features Section */}
        <Container sx={{ py: 5 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 6 }} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.light',
                        mx: 'auto',
                        mb: 2,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'medium' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Pricing Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 5 }}>
          <Container>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: 'bold', mb: 4 }}
            >
              Simple Pricing
            </Typography>
            <Stack spacing={2}>
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  sx={{
                    border: plan.popular ? 2 : 0,
                    borderColor: 'primary.main',
                    position: 'relative',
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  )}
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography variant="h6">{plan.name}</Typography>
                        <Typography variant="h4" color="primary">
                          ${plan.price}
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            /mo
                          </Typography>
                        </Typography>
                      </Box>
                      <Button
                        variant={plan.popular ? 'contained' : 'outlined'}
                        endIcon={<ArrowForwardIcon />}
                      >
                        Select
                      </Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={1}>
                      {plan.features.map((feature, i) => (
                        <Box
                          key={i}
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <CheckCircleIcon color="success" fontSize="small" />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Testimonials */}
        <Container sx={{ py: 5 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            What Users Say
          </Typography>
          <Stack spacing={2}>
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {testimonial.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} readOnly size="small" />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>

        {/* FAQ Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 5 }}>
          <Container>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: 'bold', mb: 4 }}
            >
              FAQ
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>

        {/* Newsletter Section */}
        <Container sx={{ py: 5 }}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Stay Updated
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Get the latest news and updates
              </Typography>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  mb: 2,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="primary">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Card>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: 'grey.900', color: 'grey.400', py: 4 }}>
          <Container>
            <Typography variant="body2" align="center">
              © 2024 AppLaunch. All rights reserved.
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button size="small" sx={{ color: 'grey.400' }}>
                Privacy
              </Button>
              <Button size="small" sx={{ color: 'grey.400' }}>
                Terms
              </Button>
              <Button size="small" sx={{ color: 'grey.400' }}>
                Contact
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Scroll to Top FAB */}
        <Fab
          size="small"
          color="primary"
          onClick={scrollToTop}
          sx={{ position: 'fixed', bottom: 70, right: 16 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>

        {/* Bottom Navigation */}
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={bottomNav}
            onChange={(_, newValue) => setBottomNav(newValue)}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Features" icon={<FeaturesIcon />} />
            <BottomNavigationAction label="Pricing" icon={<PricingIcon />} />
            <BottomNavigationAction label="Contact" icon={<ContactIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    )
  },
}

/**
 * Hero section only - for testing in isolation
 */
export const HeroSection: Story = {
  render: () => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 6,
        px: 2,
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <RocketLaunchIcon sx={{ fontSize: 64, mb: 3 }} />
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        Build Amazing Apps
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
        The fastest way to launch your mobile app with beautiful UI components.
      </Typography>
      <Stack direction="column" spacing={2} sx={{ px: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          startIcon={<AppleIcon />}
        >
          Download for iOS
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<AndroidIcon />}
          sx={{ color: 'white', borderColor: 'white' }}
        >
          Download for Android
        </Button>
      </Stack>
    </Box>
  ),
}
