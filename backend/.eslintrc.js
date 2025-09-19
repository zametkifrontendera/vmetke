import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': ts },
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' }
    },
    rules: {
      ...ts.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
]