/**
 * Registration form component with react-hook-form and zod validation.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import { registerSchema, useRegister } from '../../auth'

import type { RegisterFormData } from '../../auth'

export interface RegisterFormProps {
  /** Callback when user wants to switch to login */
  onSwitchToLogin: () => void
}

/**
 * Registration form with email, password, username, and display name.
 * Validates input using zod schema and handles submission via TanStack Query.
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
}) => {
  const { mutate: register, isPending, error } = useRegister()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      displayName: '',
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    register(data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        textAlign="center"
      >
        Create your account
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 2 }}
      >
        Join Twitter Clone today
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error.message}
        </Alert>
      )}

      <TextField
        {...registerField('displayName')}
        label="Display Name"
        autoComplete="name"
        error={!!errors.displayName}
        helperText={errors.displayName?.message}
        disabled={isPending}
        fullWidth
      />

      <TextField
        {...registerField('username')}
        label="Username"
        autoComplete="username"
        error={!!errors.username}
        helperText={errors.username?.message || 'This will be your @handle'}
        disabled={isPending}
        fullWidth
        InputProps={{
          startAdornment: <Typography color="text.secondary">@</Typography>,
        }}
      />

      <TextField
        {...registerField('email')}
        label="Email"
        type="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isPending}
        fullWidth
      />

      <TextField
        {...registerField('password')}
        label="Password"
        type="password"
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        disabled={isPending}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isPending}
        fullWidth
        sx={{ mt: 1, borderRadius: 9999 }}
      >
        {isPending ? 'Creating account...' : 'Create account'}
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link
          component="button"
          type="button"
          onClick={onSwitchToLogin}
          sx={{ cursor: 'pointer' }}
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  )
}
