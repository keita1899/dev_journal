import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import jestDomPlugin from 'eslint-plugin-jest-dom'
import testingLibraryPlugin from 'eslint-plugin-testing-library'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
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
    },
  },

  {
    plugins: {
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      ...tailwindcssPlugin.configs.recommended.rules,
    },
  },

  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibraryPlugin,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...jestDomPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  prettierConfig,
]

export default eslintConfig
