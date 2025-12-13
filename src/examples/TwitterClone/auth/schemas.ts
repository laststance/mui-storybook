/**
 * Zod validation schemas for authentication forms.
 * Used with react-hook-form via @hookform/resolvers.
 */

import { z } from 'zod'

// ════════════════════════════════════════════════════════════
// Common Validation Rules
// ════════════════════════════════════════════════════════════

const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email')

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password must be less than 100 characters')

const usernameSchema = z
  .string()
  .min(1, 'Username is required')
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be less than 20 characters')
  .regex(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores',
  )

const displayNameSchema = z
  .string()
  .min(1, 'Display name is required')
  .max(50, 'Display name must be less than 50 characters')

// ════════════════════════════════════════════════════════════
// Login Schema
// ════════════════════════════════════════════════════════════

/**
 * Validation schema for login form.
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

/**
 * TypeScript type inferred from login schema.
 */
export type LoginFormData = z.infer<typeof loginSchema>

// ════════════════════════════════════════════════════════════
// Registration Schema
// ════════════════════════════════════════════════════════════

/**
 * Validation schema for registration form.
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  displayName: displayNameSchema,
})

/**
 * TypeScript type inferred from registration schema.
 */
export type RegisterFormData = z.infer<typeof registerSchema>

// ════════════════════════════════════════════════════════════
// Tweet Schema
// ════════════════════════════════════════════════════════════

/**
 * Validation schema for composing tweets.
 */
export const tweetSchema = z.object({
  content: z
    .string()
    .min(1, 'Tweet cannot be empty')
    .max(280, 'Tweet must be 280 characters or less'),
})

/**
 * TypeScript type inferred from tweet schema.
 */
export type TweetFormData = z.infer<typeof tweetSchema>
