import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Global ignores (migrated from .eslintignore)
  {
    ignores: [
      'dist/**',
      'storybook-static/**',
      'generators/**',
      'node_modules/**',
    ],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Storybook flat config
  ...storybook.configs['flat/recommended'],

  // JSX Accessibility recommended rules
  jsxA11y.flatConfigs.recommended,

  // Main configuration for TypeScript and JavaScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
      prettier: prettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
        JSX: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',

      // Prettier integration
      'prettier/prettier': [
        'warn',
        {},
        {
          usePrettierrc: true,
        },
      ],

      // Import ordering
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-duplicates': 'error',

      // TypeScript rules
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },

  // Override for JavaScript files
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Override for story files
  {
    files: ['**/*.stories.*'],
    rules: {
      'import/no-anonymous-default-export': 'off',
      // Storybook render functions use hooks but aren't recognized as React components
      'react-hooks/rules-of-hooks': 'off',
      // Allow autoFocus in story examples for demonstration purposes
      'jsx-a11y/no-autofocus': 'warn',
    },
  },

  // Include .storybook folder
  {
    ignores: ['!.storybook'],
  },
)
