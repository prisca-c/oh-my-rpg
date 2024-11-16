import { configApp } from '@adonisjs/eslint-config'
import UnoCss from '@unocss/eslint-config/flat'
import unusedImports from 'eslint-plugin-unused-imports'
import reactEslint from 'eslint-plugin-react'

export default configApp({
  extends: [UnoCss],
  plugins: {
    'unused-imports': unusedImports,
    'react': reactEslint,
  },
  rules: {
    'no-unused-vars': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  files: ['**/*.ts', '**/*.tsx'],
})
