import { configApp } from '@adonisjs/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'
import UnoCss from '@unocss/eslint-config/flat'
import unusedImports from 'eslint-plugin-unused-imports'
import reactEslint from 'eslint-plugin-react'

import noCrossLayerImports from './config/eslint_rules/no-cross-layer-imports.js'

export default configApp(...pluginQuery.configs['flat/recommended'], {
  extends: [UnoCss],
  plugins: {
    'unused-imports': unusedImports,
    'react': reactEslint,
    'custom': {
      rules: {
        'no-cross-layer-imports': noCrossLayerImports,
      },
    },
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
    'custom/no-cross-layer-imports': 'error',
  },
  settings: {
    layersConfig: [
      {
        layer: 'domain',
        pathPattern: 'domain',
        restrictedImports: ['infrastructure', 'application', 'core'],
      },
      {
        layer: 'backend',
        pathPattern: 'backend',
        restrictedImports: ['frontend'],
      },
    ],
  },
  files: ['**/*.ts', '**/*.tsx'],
})
