/* eslint-env node */

'use strict';

module.exports = {
  extends: [require.resolve('./base'), 'plugin:react/recommended'],
  plugins: ['filenames'],
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'import/extensions': 'off',
    'no-console': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],
    'sort-vars': 'error',
  },
  overrides: [
    {
      files: ['src/components/**/*'],
      rules: {
        'filenames/match-regex': [
          'error',
          '^([A-Z]+[a-z0-9\\.]*)+(.[tj]sx?)?$',
        ],
      },
    },
    {
      files: ['src/setupTests.*'],
      rules: {
        'filenames/match-regex': 'off',
      },
    },
  ],
};
