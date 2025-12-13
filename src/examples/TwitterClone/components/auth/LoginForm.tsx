/**
 * Login form component with react-hook-form and zod validation.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import { loginSchema, useLogin } from '../../auth'

import type { LoginFormData } from '../../auth'

export interface LoginFormProps {
  /** Callback when user wants to switch to register */
  onSwitchToRegister: () => void
}

/**
 * Login form with email and password fields.
 * Validates input using zod schema and handles submission via TanStack Query.
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { mutate: login, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
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
        Sign in to Twitter Clone
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 2 }}
      >
        Enter your credentials to access your account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error.message}
        </Alert>
      )}

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isPending}
        fullWidth
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        autoComplete="current-password"
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
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link
          component="button"
          type="button"
          onClick={onSwitchToRegister}
          sx={{ cursor: 'pointer' }}
        >
          Sign up
        </Link>
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 2 }}
      >
        Demo credentials: john@example.com / any password (6+ chars)
      </Typography>
    </Box>
  )
}
