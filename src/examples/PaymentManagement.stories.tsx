import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ReceiptIcon from '@mui/icons-material/Receipt'
import SecurityIcon from '@mui/icons-material/Security'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Switch from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Examples/Payment Management',
  parameters: {
    layout: 'padded',
    // Disable a11y testing for complex example demos
    a11y: { disable: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

interface PaymentMethod {
  id: string
  type: 'card' | 'bank'
  name: string
  last4: string
  expiry?: string
  isDefault: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'card',
    name: 'Mastercard',
    last4: '8888',
    expiry: '08/26',
    isDefault: false,
  },
  {
    id: '3',
    type: 'bank',
    name: 'Chase Bank',
    last4: '1234',
    isDefault: false,
  },
]

const transactions = [
  {
    id: 'TXN001',
    date: '2024-01-15',
    description: 'Premium Subscription',
    amount: -29.99,
    status: 'completed',
  },
  {
    id: 'TXN002',
    date: '2024-01-12',
    description: 'Refund - Order #1234',
    amount: 15.0,
    status: 'completed',
  },
  {
    id: 'TXN003',
    date: '2024-01-10',
    description: 'Pro Plan Upgrade',
    amount: -99.0,
    status: 'completed',
  },
  {
    id: 'TXN004',
    date: '2024-01-08',
    description: 'API Credits',
    amount: -50.0,
    status: 'pending',
  },
  {
    id: 'TXN005',
    date: '2024-01-05',
    description: 'Initial Deposit',
    amount: 200.0,
    status: 'completed',
  },
]

/**
 * Complete payment management interface with cards, transactions, and billing
 */
export const PaymentCenter: Story = {
  render: () => {
    const [tabValue, setTabValue] = useState(0)
    const [addCardOpen, setAddCardOpen] = useState(false)
    const [showCardNumber, setShowCardNumber] = useState(false)
    const [activeStep, setActiveStep] = useState(0)

    const steps = ['Card Details', 'Billing Address', 'Confirm']

    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Payment Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Manage your payment methods, view transactions, and update billing
            settings.
          </Typography>

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab icon={<CreditCardIcon />} label="Payment Methods" />
            <Tab icon={<ReceiptIcon />} label="Transactions" />
            <Tab icon={<SecurityIcon />} label="Security" />
          </Tabs>

          {/* Payment Methods Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">Your Payment Methods</Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setAddCardOpen(true)}
                      >
                        Add New
                      </Button>
                    </Box>

                    <List>
                      {paymentMethods.map((method, index) => (
                        <Box key={method.id}>
                          {index > 0 && <Divider />}
                          <ListItem sx={{ py: 2 }}>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  bgcolor:
                                    method.type === 'card'
                                      ? 'primary.main'
                                      : 'success.main',
                                }}
                              >
                                {method.type === 'card' ? (
                                  <CreditCardIcon />
                                ) : (
                                  <AccountBalanceIcon />
                                )}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                  }}
                                >
                                  <Typography variant="subtitle1">
                                    {method.name}
                                  </Typography>
                                  {method.isDefault && (
                                    <Chip
                                      label="Default"
                                      size="small"
                                      color="primary"
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                <>
                                  •••• {method.last4}
                                  {method.expiry &&
                                    ` • Expires ${method.expiry}`}
                                </>
                              }
                            />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" sx={{ mr: 1 }}>
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end" color="error">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Box>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{ bgcolor: 'primary.main', color: 'white', mb: 2 }}>
                  <CardContent>
                    <Typography variant="overline">Current Balance</Typography>
                    <Typography variant="h3" sx={{ my: 1 }}>
                      $136.01
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Next billing: Jan 15, 2024
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button variant="contained" color="secondary" fullWidth>
                      Add Funds
                    </Button>
                  </CardActions>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Billing Summary
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Pro Plan
                      </Typography>
                      <Typography variant="body2">$29.99/mo</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        API Credits
                      </Typography>
                      <Typography variant="body2">$50.00</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography variant="subtitle1">Total</Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 'bold' }}
                      >
                        $79.99
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Transactions Tab */}
          {tabValue === 1 && (
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Transaction History</Typography>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select label="Filter" defaultValue="all">
                      <MenuItem value="all">All Transactions</MenuItem>
                      <MenuItem value="payments">Payments</MenuItem>
                      <MenuItem value="refunds">Refunds</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <List>
                  {transactions.map((txn, index) => (
                    <Box key={txn.id}>
                      {index > 0 && <Divider />}
                      <ListItem sx={{ py: 2 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor:
                                txn.amount > 0 ? 'success.light' : 'grey.200',
                            }}
                          >
                            <ReceiptIcon
                              color={txn.amount > 0 ? 'success' : 'action'}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={txn.description}
                          secondary={
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <Typography variant="caption">
                                {txn.date}
                              </Typography>
                              <Chip
                                label={txn.status}
                                size="small"
                                color={
                                  txn.status === 'completed'
                                    ? 'success'
                                    : 'warning'
                                }
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                        <Typography
                          variant="subtitle1"
                          color={
                            txn.amount > 0 ? 'success.main' : 'text.primary'
                          }
                          sx={{ fontWeight: 'medium' }}
                        >
                          {txn.amount > 0 ? '+' : ''}
                          {txn.amount.toFixed(2)}
                        </Typography>
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', py: 2 }}>
                <Button>Load More Transactions</Button>
              </CardActions>
            </Card>
          )}

          {/* Security Tab */}
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Security Settings
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Two-Factor Authentication"
                          secondary="Add an extra layer of security to your account"
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText
                          primary="Payment Notifications"
                          secondary="Receive alerts for all transactions"
                        />
                        <Switch defaultChecked />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText
                          primary="Suspicious Activity Alerts"
                          secondary="Get notified about unusual account activity"
                        />
                        <Switch defaultChecked />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Your account is protected with industry-standard encryption.
                </Alert>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Security Events
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: 'success.light',
                              width: 32,
                              height: 32,
                            }}
                          >
                            <CheckCircleIcon color="success" fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Successful login"
                          secondary="Today, 10:30 AM • Chrome, macOS"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: 'success.light',
                              width: 32,
                              height: 32,
                            }}
                          >
                            <CheckCircleIcon color="success" fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Password changed"
                          secondary="Yesterday, 3:45 PM"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: 'success.light',
                              width: 32,
                              height: 32,
                            }}
                          >
                            <CheckCircleIcon color="success" fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="New payment method added"
                          secondary="Jan 10, 2024"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Add Card Dialog */}
          <Dialog
            open={addCardOpen}
            onClose={() => setAddCardOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogContent>
              <Stepper activeStep={activeStep} sx={{ my: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <TextField
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCardNumber(!showCardNumber)}
                          >
                            {showCardNumber ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="Expiry Date"
                      placeholder="MM/YY"
                      sx={{ flex: 1 }}
                    />
                    <TextField label="CVV" placeholder="123" sx={{ flex: 1 }} />
                  </Box>
                  <TextField
                    label="Name on Card"
                    placeholder="John Doe"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Set as default payment method"
                  />
                </Box>
              )}

              {activeStep === 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <TextField label="Address Line 1" fullWidth />
                  <TextField label="Address Line 2" fullWidth />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField label="City" sx={{ flex: 2 }} />
                    <TextField label="ZIP Code" sx={{ flex: 1 }} />
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select label="Country" defaultValue="us">
                      <MenuItem value="us">United States</MenuItem>
                      <MenuItem value="ca">Canada</MenuItem>
                      <MenuItem value="uk">United Kingdom</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {activeStep === 2 && (
                <Box sx={{ mt: 2 }}>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Your card is ready to be added!
                  </Alert>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Card Details
                    </Typography>
                    <Typography variant="body1">Visa •••• 4242</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expires 12/25
                    </Typography>
                  </Paper>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddCardOpen(false)}>Cancel</Button>
              {activeStep > 0 && (
                <Button onClick={() => setActiveStep(activeStep - 1)}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    setAddCardOpen(false)
                    setActiveStep(0)
                  } else {
                    setActiveStep(activeStep + 1)
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 'Add Card' : 'Next'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    )
  },
}

/**
 * Checkout form with validation
 */
export const CheckoutForm: Story = {
  render: () => (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Checkout
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Alert severity="info">
            Test mode: Use card number 4242 4242 4242 4242
          </Alert>

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            defaultValue="user@example.com"
          />

          <Divider>
            <Chip label="Payment Details" />
          </Divider>

          <TextField
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expiry"
              placeholder="MM/YY"
              required
              sx={{ flex: 1 }}
            />
            <TextField
              label="CVV"
              placeholder="123"
              required
              sx={{ flex: 1 }}
            />
          </Box>

          <TextField label="Name on Card" fullWidth required />

          <Divider />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Total</Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              $99.99
            </Typography>
          </Box>

          <Button variant="contained" size="large" fullWidth>
            Pay Now
          </Button>

          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}
          >
            <SecurityIcon color="action" fontSize="small" />
            <Typography variant="caption" color="text.secondary">
              Secured by 256-bit SSL encryption
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  ),
}
